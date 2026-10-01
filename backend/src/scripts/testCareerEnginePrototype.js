import { DOMAINS, DOMAIN_LABELS, DOMAIN_ROADMAP_MAP, QUIZ_PROFILES, getRoadmapsByDomain } from "../config/quizDomains.js";
import { STAGE1_QUESTIONS } from "../config/stage1-questions.js";
import { scoreStage1 } from "../services/stage1Scoring.js";
import { getStage2Set, scoreStage2, STAGE2_BANKS } from "../services/stage2Selector.js";

export function hashString(str = "") {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

const TRAIT_KEYS = [
  "technical", "analytical", "creative", "business", "communication",
  "leadership", "research", "people", "structured", "riskTaking"
];

export function computeCareerResult({ stage1Answers, stage2Answers, roadmaps = [] } = {}, options = {}) {
  if (!stage1Answers || !stage2Answers) {
    throw new Error("computeCareerResult requires both stage1Answers and stage2Answers.");
  }

  // Derive deterministic seed from stage1Answers if not explicitly passed
  const rawKey1 = typeof stage1Answers === "object" ? JSON.stringify(stage1Answers) : String(stage1Answers);
  const seed = options.seed !== undefined && options.seed !== null
    ? options.seed
    : hashString(`stage1:${rawKey1}`);

  // 1. Recompute Stage 1 from raw answers
  const stage1Result = scoreStage1(stage1Answers, { seed });

  // 2. Recompute served Stage 2 set from Stage 1 result
  const servedSet = getStage2Set(stage1Result, { seed });
  const questionsServed = servedSet.length;
  const setMax = 3 * questionsServed;

  // 3. Score Stage 2
  const stage2Result = scoreStage2(stage2Answers, servedSet, { stage1Result, seed });

  // 4. Calculate Stage 2 Fit, Affinity, and RankScore for all 48 roadmaps
  const d = stage1Result.domainScores || {};
  const stage2Raw = stage2Result.slugScores || {};
  const allRoadmapSlugs = Object.keys(DOMAIN_ROADMAP_MAP);

  const roadmapMap = {};
  if (Array.isArray(roadmaps)) {
    for (const r of roadmaps) {
      if (r && r.slug) roadmapMap[r.slug] = r;
    }
  }

  const scoredList = [];
  const rankScores = {};
  const affinities = {};
  const stage2Fits = {};

  for (const slug of allRoadmapSlugs) {
    const meta = DOMAIN_ROADMAP_MAP[slug];
    const primary = meta.domain;
    const secondary = meta.secondaryDomain;

    const rawFit = (stage2Raw[slug] || 0) / setMax;
    stage2Fits[slug] = rawFit;

    const primaryScore = d[primary] || 0;
    const secondaryScore = secondary ? (d[secondary] || 0) * 0.5 : 0;
    const affinity = Math.max(primaryScore, secondaryScore);
    affinities[slug] = affinity;

    const rankScore = 0.35 * affinity + 0.65 * rawFit;
    rankScores[slug] = rankScore;

    const rawMatchPct = Math.round(19 + 156 * rankScore);
    const matchPct = Math.min(98, Math.max(25, rawMatchPct));

    const dbObj = roadmapMap[slug] || {};

    scoredList.push({
      slug,
      title: dbObj.title || slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
      domain: primary,
      secondaryDomain: secondary,
      rankScore,
      matchPct,
      stage2Raw: stage2Raw[slug] || 0,
      stage2Fit: rawFit,
      affinity,
      ...dbObj
    });
  }

  // 5. Deterministic sorting by rankScore with FNV-1a tie breaker
  scoredList.sort((a, b) => {
    const scoreDiff = b.rankScore - a.rankScore;
    if (Math.abs(scoreDiff) > 1e-9) {
      return scoreDiff;
    }
    return (hashString(`${seed}:${b.slug}`) - hashString(`${seed}:${a.slug}`));
  });

  // Ensure strict monotonicity of matchPct along the rank-ordered list
  for (let i = 1; i < scoredList.length; i++) {
    if (scoredList[i].matchPct > scoredList[i - 1].matchPct) {
      scoredList[i].matchPct = scoredList[i - 1].matchPct;
    }
  }

  // Assign ranks
  scoredList.forEach((r, idx) => {
    r.rank = idx + 1;
  });

  // Tie detection on top 2
  const top1 = scoredList[0];
  const top2 = scoredList[1];
  const tieDelta = Math.abs(top1.matchPct - top2.matchPct);
  const isTie = tieDelta <= 5;

  // 6. Picks selection (Top 5)
  // Picks 1-3: top 3 by rankScore
  const picks = [
    { ...top1, pickType: "primary_top", whyMatch: `Top career match based on highest alignment with ${DOMAIN_LABELS[top1.domain] || top1.domain} and strong quiz response patterns.` },
    { ...top2, pickType: "primary_runner_up", whyMatch: `Strong alternative match with high potential in ${DOMAIN_LABELS[top2.domain] || top2.domain}.` },
    { ...scoredList[2], pickType: "primary_contender", whyMatch: `High-compatibility pathway reflecting your problem-solving strengths.` }
  ];

  // Pick 4: top roadmap from a different primary domain
  // Prefer Stage 1 #2 / blended B if within 0.05 rankScore
  const primaryDomain = top1.domain;
  const stage1SecondDomain = stage1Result.topDomains?.[1] || null;

  const altDomainCandidates = scoredList.filter(
    r => r.domain !== primaryDomain && !picks.some(p => p.slug === r.slug)
  );

  let pick4Candidate = altDomainCandidates[0];
  if (stage1SecondDomain && stage1SecondDomain !== primaryDomain) {
    const stage1SecondDomRoadmap = altDomainCandidates.find(r => r.domain === stage1SecondDomain);
    if (stage1SecondDomRoadmap && pick4Candidate) {
      if (stage1SecondDomRoadmap.rankScore >= pick4Candidate.rankScore - 0.05) {
        pick4Candidate = stage1SecondDomRoadmap;
      }
    }
  }

  if (pick4Candidate) {
    picks.push({
      ...pick4Candidate,
      pickType: "diverse_domain",
      whyMatch: `Cross-domain recommendation expanding into ${DOMAIN_LABELS[pick4Candidate.domain] || pick4Candidate.domain}.`
    });
  }

  // Pick 5: wildcard from secondary domain (Stage 1 #2) or domain not in top 4 picks
  // if rankScore >= 0.60 * top1.rankScore, else omit
  const domainsInPicks = new Set(picks.map(p => p.domain));
  const wildcardCandidates = scoredList.filter(
    r => !picks.some(p => p.slug === r.slug) &&
         (r.domain === stage1SecondDomain ||
          !domainsInPicks.has(r.domain) ||
          (r.secondaryDomain && domainsInPicks.has(r.secondaryDomain)))
  );

  const topWildcard = wildcardCandidates[0];
  if (topWildcard && topWildcard.rankScore >= 0.60 * top1.rankScore) {
    picks.push({
      ...topWildcard,
      pickType: "wildcard",
      whyMatch: `Wildcard opportunity exploring unique strengths at the intersection of ${DOMAIN_LABELS[topWildcard.domain] || topWildcard.domain}.`
    });
  }

  // Alternatives: next 4 best roadmaps not in picks
  const pickSlugs = new Set(picks.map(p => p.slug));
  const alternatives = scoredList
    .filter(r => !pickSlugs.has(r.slug))
    .slice(0, 4);

  // Shortlist: exactly 8 unique roadmaps from >= 3 distinct domains
  const shortlist = [...picks];
  for (const r of scoredList) {
    if (shortlist.length >= 8) break;
    if (!shortlist.some(p => p.slug === r.slug)) {
      shortlist.push(r);
    }
  }

  // Ensure >= 3 distinct domains in shortlist
  const shortlistDomains = new Set(shortlist.map(r => r.domain));
  if (shortlistDomains.size < 3) {
    const outsideCandidate = scoredList.find(
      r => !shortlist.some(s => s.slug === r.slug) && !shortlistDomains.has(r.domain)
    );
    if (outsideCandidate) {
      shortlist[shortlist.length - 1] = outsideCandidate;
    }
  }

  // 7. Trait scores (rankScore-weighted average of 5 picks, scaled 0-100)
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

  return {
    stage1: {
      topDomains: stage1Result.topDomains,
      domainScores: stage1Result.domainScores,
      isBlended: stage1Result.isBlended,
      margin: stage1Result.margin,
      rawScores: stage1Result.rawScores
    },
    stage2: {
      servedQuestionsCount: questionsServed,
      servedQuestionIds: servedSet.map(q => q.id),
      stage2RawScores: stage2Raw,
      stage2FitScores: stage2Fits
    },
    scoring: {
      rankScores,
      affinities,
      stage2Fits,
      isTie,
      tieDelta
    },
    topCareer: picks[0],
    picks,
    alternatives,
    shortlist,
    traitScores,
    meta: {
      seed,
      algorithmVersion: "2.0.0",
      computedAt: new Date().toISOString()
    }
  };
}

// Quick validation of computeCareerResult with sample answers
console.log("Testing computeCareerResult prototype...");
const s1Answers = {};
for (const q of STAGE1_QUESTIONS) s1Answers[q.id] = q.options[0].id;

const s1Res = scoreStage1(s1Answers);
const s2Set = getStage2Set(s1Res);
const s2Answers = {};
for (const q of s2Set) s2Answers[q.id] = q.options[0].id;

console.log("Running 1,000 Monte Carlo simulations...");
const p1Matches = [];
const p5Matches = [];
let tieCount = 0;
let wildcardOmitted = 0;
const top1Counts = {};
for (const s of Object.keys(DOMAIN_ROADMAP_MAP)) top1Counts[s] = 0;

const r1Scores = [];
const r5Scores = [];
for (let i = 0; i < 1000; i++) {
  const s1Answers = {};
  for (const q of STAGE1_QUESTIONS) s1Answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;
  const seed = hashString(`stage1:${JSON.stringify(s1Answers)}`);
  const s1Res = scoreStage1(s1Answers, { seed });
  const s2Set = getStage2Set(s1Res, { seed });
  const s2Answers = {};
  for (const q of s2Set) s2Answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;

  const res = computeCareerResult({ stage1Answers: s1Answers, stage2Answers: s2Answers });
  p1Matches.push(res.picks[0].matchPct);
  r1Scores.push(res.picks[0].rankScore);
  if (res.picks[4]) {
    p5Matches.push(res.picks[4].matchPct);
    r5Scores.push(res.picks[4].rankScore);
  } else {
    wildcardOmitted++;
  }
  if (res.scoring.isTie) tieCount++;
  top1Counts[res.topCareer.slug]++;
}

r1Scores.sort((a, b) => a - b);
r5Scores.sort((a, b) => a - b);
console.log("Median #1 rankScore:", r1Scores[Math.floor(r1Scores.length / 2)].toFixed(4), `(Range: ${r1Scores[0].toFixed(4)} - ${r1Scores[r1Scores.length - 1].toFixed(4)})`);
console.log("Median #5 rankScore:", r5Scores[Math.floor(r5Scores.length / 2)].toFixed(4), `(Range: ${r5Scores[0].toFixed(4)} - ${r5Scores[r5Scores.length - 1].toFixed(4)})`);

p1Matches.sort((a, b) => a - b);
p5Matches.sort((a, b) => a - b);
console.log("Median #1 matchPct:", p1Matches[Math.floor(p1Matches.length / 2)], `(Range: ${p1Matches[0]}% - ${p1Matches[p1Matches.length - 1]}%)`);
console.log("Median #5 matchPct:", p5Matches[Math.floor(p5Matches.length / 2)], `(Range: ${p5Matches[0]}% - ${p5Matches[p5Matches.length - 1]}%)`);
console.log("Tie rate:", ((tieCount / 1000) * 100).toFixed(1) + "%");
console.log("Wildcard omission rate:", ((wildcardOmitted / 1000) * 100).toFixed(1) + "%");

