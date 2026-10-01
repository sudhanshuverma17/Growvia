/**
 * Career Recommendation Engine (Stage 1 + Stage 2 Unified)
 *
 * Implements Step 4 of the Growvia assessment pipeline.
 * Pure function: takes raw Stage 1 and Stage 2 answers, recomputes all scores
 * from scratch (never trusting client-supplied scores), resolves served question sets,
 * calculates domain affinities, stage 2 fits, and combined rank scores with deterministic
 * seeded tie-breaking.
 *
 * Guaranteed invariants:
 * 1. Picks count: 4 or 5 roadmaps.
 * 2. Shortlist count: exactly 8 unique roadmaps from >= 3 distinct primary domains.
 * 3. Deterministic: same inputs produce identical results regardless of array or key order.
 * 4. Zero dependencies on legacy scoring or hardcoded roadmap indices.
 */

import crypto from "crypto";
import {
  DOMAINS,
  DOMAIN_LABELS,
  DOMAIN_ROADMAP_MAP,
  QUIZ_PROFILES,
} from "../config/quizDomains.js";
import { STAGE1_QUESTIONS } from "../config/stage1-questions.js";
import { scoreStage1, hashString } from "./stage1Scoring.js";
import { getStage2Set, scoreStage2, STAGE2_BANKS } from "./stage2Selector.js";

export { hashString };

let cachedBankVersion = null;
export function getBankVersion() {
  if (cachedBankVersion) return cachedBankVersion;
  const hash = crypto.createHash("sha256");
  hash.update(JSON.stringify(STAGE1_QUESTIONS));
  hash.update(JSON.stringify(QUIZ_PROFILES));
  hash.update(JSON.stringify(DOMAIN_ROADMAP_MAP));
  for (const domain of Object.keys(STAGE2_BANKS).sort()) {
    hash.update(domain);
    hash.update(JSON.stringify(STAGE2_BANKS[domain]));
  }
  cachedBankVersion = "bank_v3_" + hash.digest("hex").slice(0, 10);
  return cachedBankVersion;
}

export function deriveSeed(stage1Answers) {
  let rawKey1 = "";
  if (Array.isArray(stage1Answers)) {
    rawKey1 = [...stage1Answers]
      .sort()
      .map((item) => (typeof item === "object" ? JSON.stringify(item) : String(item)))
      .join("|");
  } else if (typeof stage1Answers === "object" && stage1Answers !== null) {
    const sortedKeys = Object.keys(stage1Answers).sort();
    rawKey1 = sortedKeys.map((k) => `${k}:${stage1Answers[k]}`).join("|");
  } else {
    rawKey1 = String(stage1Answers);
  }
  return hashString(`stage1:${rawKey1}`);
}

export const TRAIT_KEYS = [
  "technical",
  "analytical",
  "creative",
  "business",
  "communication",
  "leadership",
  "research",
  "people",
  "structured",
  "riskTaking",
];

/**
 * Pure calculation function for comprehensive career results.
 *
 * @param {Object} params
 * @param {Object|Array} params.stage1Answers - Raw student answers to Stage 1.
 * @param {Object|Array} params.stage2Answers - Raw student answers to served Stage 2 questions.
 * @param {Array} [params.roadmaps] - Optional roadmap documents from DB or cache for enrichment.
 * @param {Object} [options]
 * @param {string|number} [options.seed] - Optional tie-breaking seed.
 * @returns {Object} Comprehensive career recommendation result object.
 */
export function computeCareerResult(
  { stage1Answers, stage2Answers, roadmaps = [] } = {},
  options = {}
) {
  if (!stage1Answers || !stage2Answers) {
    throw new Error("computeCareerResult requires both stage1Answers and stage2Answers.");
  }

  // 1. Derive deterministic seeds
  // Stage 1 seed governs served question set selection; finalSeed includes stage2Answers for tie-breaking
  const stage1Seed =
    options.seed !== undefined && options.seed !== null
      ? options.seed
      : deriveSeed(stage1Answers);
  const finalSeed = hashString(`${stage1Seed}:${deriveSeed(stage2Answers)}`);

  // 2. Recompute Stage 1 from raw answers
  const stage1Result = scoreStage1(stage1Answers, { seed: stage1Seed });

  // 3. Recompute served Stage 2 set from Stage 1 result (never trust client)
  const servedSet = getStage2Set(stage1Result, { seed: stage1Seed });
  const questionsServed = servedSet.length;
  const setMax = 3 * questionsServed;

  // 4. Score Stage 2
  const stage2Result = scoreStage2(stage2Answers, servedSet, { stage1Result, seed: stage1Seed });

  // 5. Calculate Stage 2 Fit, Affinity, and RankScore for all 48 roadmaps
  const d = stage1Result.domainScores || {};
  const stage2Raw = stage2Result.slugScores || {};
  const allRoadmapSlugs = Object.keys(DOMAIN_ROADMAP_MAP);

  // Map any incoming roadmap DB documents by slug or id
  const roadmapMap = {};
  let activeRoadmapSlugs = allRoadmapSlugs;
  if (Array.isArray(roadmaps) && roadmaps.length > 0) {
    const validDbSlugs = new Set();
    for (const r of roadmaps) {
      const s = r?.slug || r?.id;
      if (s && r.isPublished !== false && r.published !== false) {
        validDbSlugs.add(s);
        roadmapMap[s] = r;
      }
    }
    // Only include roadmaps that are in the DB, published, and in configuration
    activeRoadmapSlugs = allRoadmapSlugs.filter((slug) => validDbSlugs.has(slug));
  }

  const scoredList = [];
  const rankScores = {};
  const affinities = {};
  const stage2Fits = {};

  for (const slug of activeRoadmapSlugs) {
    const meta = DOMAIN_ROADMAP_MAP[slug];
    const primary = meta.domain;
    const secondary = meta.secondaryDomain;

    const rawFit = (stage2Raw[slug] || 0) / setMax;
    stage2Fits[slug] = rawFit;

    const primaryScore = d[primary] || 0;
    const secondaryScore = secondary ? (d[secondary] || 0) * 0.5 : 0;
    const affinity = Math.max(primaryScore, secondaryScore);
    affinities[slug] = affinity;

    // Core 35% affinity / 65% Stage 2 fit rankScore formula
    const rankScore = 0.35 * affinity + 0.65 * rawFit;
    rankScores[slug] = rankScore;

    // Calibrated strictly monotone quadratic matchPct mapping to [25, 98]
    // Derivative 118 - 86x >= 32 > 0 everywhere on [0, 1.0], no premature saturation
    const rawMatchPct = Math.round(23 + 118 * rankScore - 43 * rankScore * rankScore);
    const matchPct = Math.min(98, Math.max(25, rawMatchPct));

    const dbObj = roadmapMap[slug] || {};

    scoredList.push({
      slug,
      title:
        dbObj.title ||
        slug
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
      domain: primary,
      secondaryDomain: secondary,
      rankScore,
      matchPct,
      stage2Raw: stage2Raw[slug] || 0,
      stage2Fit: rawFit,
      affinity,
      ...dbObj,
    });
  }

  // 6. Deterministic sorting by rankScore with finalSeed FNV-1a tie breaker
  scoredList.sort((a, b) => {
    const scoreDiff = b.rankScore - a.rankScore;
    if (Math.abs(scoreDiff) > 1e-9) {
      return scoreDiff;
    }
    return hashString(`${finalSeed}:${b.slug}`) - hashString(`${finalSeed}:${a.slug}`);
  });

  // Ensure strict monotonicity of matchPct along the rank-ordered list
  for (let i = 1; i < scoredList.length; i++) {
    if (scoredList[i].matchPct > scoredList[i - 1].matchPct) {
      scoredList[i].matchPct = scoredList[i - 1].matchPct;
    }
  }

  // Assign initial overallRank to all roadmaps in scoredList
  scoredList.forEach((r, idx) => {
    r.overallRank = idx + 1;
    r.rank = idx + 1;
  });

  // Tie detection on top 2: rankScore gap <= 0.03 AND pick 1 matchPct >= 60
  const top1 = scoredList[0];
  const top2 = scoredList[1];
  const rankGap = top1.rankScore - top2.rankScore;
  const isTie = rankGap <= 0.03 && top1.matchPct >= 60;
  const isTiedTop = Math.abs(top1.rankScore - top2.rankScore) < 1e-6;

  // 7. Picks selection (Top 4 or 5)
  // Fact-grounded whyMatch descriptions
  const top1WhyMatch = isTiedTop
    ? `Co-leading career match showing equal alignment with ${
        DOMAIN_LABELS[top1.domain] || top1.domain
      } alongside ${top2.title}.`
    : `Top career match based on highest alignment with ${
        DOMAIN_LABELS[top1.domain] || top1.domain
      } and strong quiz response patterns.`;

  const top2WhyMatch = isTiedTop
    ? `Co-leading career match showing equal alignment with ${
        DOMAIN_LABELS[top2.domain] || top2.domain
      } alongside ${top1.title}.`
    : `Strong alternative match with high potential in ${
        DOMAIN_LABELS[top2.domain] || top2.domain
      }.`;

  const picks = [
    {
      ...top1,
      kind: "core",
      pickType: "primary_top",
      whyMatch: top1WhyMatch,
    },
    {
      ...top2,
      kind: "core",
      pickType: "primary_runner_up",
      whyMatch: top2WhyMatch,
    },
    {
      ...scoredList[2],
      kind: "core",
      pickType: "primary_contender",
      whyMatch: `High-compatibility pathway reflecting your problem-solving strengths in ${
        DOMAIN_LABELS[scoredList[2].domain] || scoredList[2].domain
      }.`,
    },
  ];

  // Pick 4: top roadmap from a different primary domain with rankScore >= 0.5 * top1.rankScore
  // If stage1 #2 domain candidate is within 0.05 rankScore, prefer it
  // If none qualifies from a different domain, fallback: best remaining roadmap from any domain
  const primaryDomain = top1.domain;
  const stage1SecondDomain = stage1Result.topDomains?.[1] || null;

  const altDomainCandidates = scoredList.filter(
    (r) =>
      r.domain !== primaryDomain &&
      !picks.some((p) => p.slug === r.slug) &&
      r.rankScore >= 0.5 * top1.rankScore
  );

  let pick4Candidate = altDomainCandidates[0];
  if (stage1SecondDomain && stage1SecondDomain !== primaryDomain) {
    const stage1SecondDomRoadmap = altDomainCandidates.find(
      (r) => r.domain === stage1SecondDomain
    );
    if (stage1SecondDomRoadmap && pick4Candidate) {
      if (stage1SecondDomRoadmap.rankScore >= pick4Candidate.rankScore - 0.05) {
        pick4Candidate = stage1SecondDomRoadmap;
      }
    }
  }

  // Fallback if no different-domain roadmap meets rankScore >= 0.5 * top1.rankScore:
  let isPick4Fallback = false;
  if (!pick4Candidate) {
    pick4Candidate = scoredList.find((r) => !picks.some((p) => p.slug === r.slug));
    isPick4Fallback = true;
  }

  if (pick4Candidate) {
    const isDifferentDomain = pick4Candidate.domain !== primaryDomain;
    picks.push({
      ...pick4Candidate,
      kind: isDifferentDomain ? "explore" : "core",
      pickType: isDifferentDomain ? "diverse_domain" : "domain_depth",
      whyMatch: isDifferentDomain
        ? `Cross-domain recommendation expanding into ${
            DOMAIN_LABELS[pick4Candidate.domain] || pick4Candidate.domain
          }.`
        : `Strong specialized pathway expanding within ${
            DOMAIN_LABELS[primaryDomain] || primaryDomain
          }.`,
    });
  }

  // Pick 5: wildcard rule enforcement
  // Candidate domain must NOT be among domains of picks 1-4, OR must have a non-null secondaryDomain.
  // Must meet rankScore >= 0.60 * top1.rankScore. Otherwise cleanly omitted.
  const domainsInPicks = new Set(picks.map((p) => p.domain));
  const wildcardCandidates = scoredList.filter(
    (r) =>
      !picks.some((p) => p.slug === r.slug) &&
      (!domainsInPicks.has(r.domain) || r.secondaryDomain !== null)
  );

  const topWildcard = wildcardCandidates[0];
  if (topWildcard && topWildcard.rankScore >= 0.6 * top1.rankScore) {
    const isOutsideDomain = !domainsInPicks.has(topWildcard.domain);
    const wildcardWhyMatch = isOutsideDomain
      ? `Wildcard opportunity exploring unique strengths at the intersection of ${
          DOMAIN_LABELS[topWildcard.domain] || topWildcard.domain
        }.`
      : `Wildcard cross-discipline opportunity bridging ${
          DOMAIN_LABELS[topWildcard.domain]
        } with ${DOMAIN_LABELS[topWildcard.secondaryDomain] || topWildcard.secondaryDomain}.`;

    picks.push({
      ...topWildcard,
      kind: "wildcard",
      pickType: "wildcard",
      whyMatch: wildcardWhyMatch,
    });
  }

  // Ensure strict monotonicity of matchPct across picks
  for (let i = 1; i < picks.length; i++) {
    if (picks[i].matchPct > picks[i - 1].matchPct) {
      picks[i].matchPct = picks[i - 1].matchPct;
    }
  }

  // Set picks.rank strictly 1..n in array order, preserving overallRank
  picks.forEach((p, idx) => {
    p.overallRank = p.overallRank || p.rank;
    p.rank = idx + 1;

    // Attach evidence: up to 2 chosen answer texts contributing most weight to this roadmap
    const slug = p.slug;
    const meta = DOMAIN_ROADMAP_MAP[slug] || {};
    const primary = meta.domain;
    const contributions = [];

    // Stage 2 contributions
    for (const q of servedSet) {
      const chosenOptId = stage2Answers[q.id];
      const opt = q.options.find((o) => o.id === chosenOptId);
      if (opt && opt.weights && opt.weights[slug]) {
        contributions.push({
          text: opt.text,
          weight: opt.weights[slug],
          stage: 2,
        });
      }
    }

    // Stage 1 contributions
    for (const q of STAGE1_QUESTIONS) {
      const chosenOptId = stage1Answers[q.id];
      const opt = q.options.find((o) => o.id === chosenOptId);
      if (opt) {
        let w = (opt.weights && opt.weights[slug]) || 0;
        if (!w && opt.weights && opt.weights[primary]) {
          w = opt.weights[primary] * 0.5;
        }
        if (w > 0) {
          contributions.push({
            text: opt.text,
            weight: w,
            stage: 1,
          });
        }
      }
    }

    contributions.sort((a, b) => {
      if (b.weight !== a.weight) return b.weight - a.weight;
      return b.stage - a.stage;
    });

    p.evidence = contributions.slice(0, 2).map((c) => c.text);
  });

  // Alternatives: next 4 best roadmaps not in picks; ranks continue strictly after picks
  const pickSlugs = new Set(picks.map((p) => p.slug));
  const alternatives = scoredList
    .filter((r) => !pickSlugs.has(r.slug))
    .slice(0, 4)
    .map((a, idx) => ({
      ...a,
      overallRank: a.overallRank || a.rank,
      rank: picks.length + idx + 1,
    }));

  // Shortlist: exactly 8 unique roadmaps from >= 3 distinct domains
  const shortlist = [...picks];
  for (const r of scoredList) {
    if (shortlist.length >= 8) break;
    if (!shortlist.some((p) => p.slug === r.slug)) {
      shortlist.push(r);
    }
  }

  // Ensure >= 3 distinct domains in shortlist
  while (new Set(shortlist.map((r) => r.domain)).size < 3) {
    const currentDomains = new Set(shortlist.map((r) => r.domain));
    const outsideCandidate = scoredList.find(
      (r) => !shortlist.some((s) => s.slug === r.slug) && !currentDomains.has(r.domain)
    );
    if (!outsideCandidate) break;
    let replaceIdx = shortlist.length - 1;
    for (let i = shortlist.length - 1; i >= 0; i--) {
      const dom = shortlist[i].domain;
      const count = shortlist.filter((s) => s.domain === dom).length;
      if (count > 1) {
        replaceIdx = i;
        break;
      }
    }
    shortlist[replaceIdx] = outsideCandidate;
  }

  shortlist.forEach((s, idx) => {
    s.overallRank = s.overallRank || s.rank;
    s.rank = idx + 1;
  });

  // 8. Trait scores (rankScore-weighted average of picks, scaled 0-100)
  const traitScores = {};
  const totalPickWeight = picks.reduce((sum, p) => sum + p.rankScore, 0) || 1;

  for (const t of TRAIT_KEYS) {
    const weightedSum = picks.reduce((sum, p) => {
      const prof = QUIZ_PROFILES[p.slug]?.traits || {};
      const val = prof[t] !== undefined ? prof[t] : 0.5;
      return sum + p.rankScore * val;
    }, 0);
    traitScores[t] = Math.round(100 * (weightedSum / totalPickWeight));
  }

  // 9. Additive Evidence Calculation (for Step 6)
  // For each pick, collect up to 2 chosen answer option texts that contributed most weight
  const answerEntries = Object.entries(stage2Answers || {});
  const servedMap = new Map(servedSet.map((q) => [q.id, q]));

  for (const p of picks) {
    const matchedContributions = [];
    for (const [qId, optId] of answerEntries) {
      const q = servedMap.get(qId);
      if (!q) continue;
      const opt = q.options?.find((o) => o.id === optId);
      if (!opt) continue;
      const weight = opt.weights?.[p.slug] || 0;
      if (weight > 0) {
        matchedContributions.push({ text: opt.text, weight });
      }
    }
    matchedContributions.sort((a, b) => b.weight - a.weight);
    p.evidence = matchedContributions.slice(0, 2).map((m) => m.text);
  }

  // 10. Signal Level Calculation (Item B9)
  // Clear if pick 1 matchPct >= 75, mixed if 60-74, open if < 60
  const p1Match = picks[0]?.matchPct || 0;
  let signalLevel = "open";
  if (p1Match >= 75) {
    signalLevel = "clear";
  } else if (p1Match >= 60) {
    signalLevel = "mixed";
  } else {
    signalLevel = "open";
  }
  const signal = { level: signalLevel };

  return {
    stage1: {
      topDomains: stage1Result.topDomains,
      domainScores: stage1Result.domainScores,
      isBlended: stage1Result.isBlended,
      margin: stage1Result.margin,
      rawScores: stage1Result.rawScores,
    },
    stage2: {
      servedQuestionsCount: questionsServed,
      servedQuestionIds: servedSet.map((q) => q.id),
      stage2RawScores: stage2Raw,
      stage2FitScores: stage2Fits,
    },
    scoring: {
      rankScores,
      affinities,
      stage2Fits,
      isTie,
      tieDelta: Number(rankGap.toFixed(4)),
    },
    tie: {
      isTie,
      gap: Number(rankGap.toFixed(4)),
      slugs: isTie ? [top1.slug, top2.slug] : [],
    },
    signal,
    bankVersion: getBankVersion(),
    engineVersion: "2.0.0",
    topCareer: picks[0],
    picks,
    alternatives,
    shortlist,
    traitScores,
    traits: traitScores,
    meta: {
      seed: finalSeed,
      stage1Seed,
      algorithmVersion: "2.0.0",
      bankVersion: getBankVersion(),
      computedAt: new Date().toISOString(),
    },
  };
}
