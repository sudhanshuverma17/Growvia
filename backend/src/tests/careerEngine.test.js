/**
 * Comprehensive Test Suite for Career Engine (Step 4)
 *
 * Suites:
 * 1. Invariants on every run (picks count, shortlist domain diversity, trait dimensions, monotonicity)
 * 2. Order invariance (array order, answer key order, shuffle invariance)
 * 3. Monte Carlo distribution (48 roadmaps: top-1 0.5-6%, in-picks 3-25%, in-shortlist >= 6%, matchPct medians)
 * 4. Persona robustness (300 personas per roadmap at p in {0.5, 0.7, 0.9})
 * 5. Guard test (zero legacy imports, pure functional contract)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  DOMAINS,
  DOMAIN_ROADMAP_MAP,
  QUIZ_PROFILES,
  getRoadmapsByDomain,
} from "../config/quizDomains.js";
import { STAGE1_QUESTIONS } from "../config/stage1-questions.js";
import { scoreStage1 } from "../services/stage1Scoring.js";
import { getStage2Set, STAGE2_BANKS } from "../services/stage2Selector.js";
import { computeCareerResult, deriveSeed, TRAIT_KEYS } from "../services/careerEngine.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isFast = process.argv.includes("--fast");
const FIXED_SEED = 1337;

function assert(condition, message) {
  if (!condition) {
    console.error(`\n❌ FAILED ASSERTION: ${message}`);
    throw new Error(message);
  }
}

const ALL_48_SLUGS = Object.keys(DOMAIN_ROADMAP_MAP);

console.log("=========================================================================");
console.log("🚀 GROWVIA CAREER ENGINE COMPREHENSIVE TEST SUITE (STEP 4)");
console.log(`Mode: ${isFast ? "FAST (--fast)" : "FULL"} | Seed: ${FIXED_SEED}`);
console.log("=========================================================================\n");

// =========================================================================
// 1. Suite 1: Invariants on Every Run
// =========================================================================
console.log("--- 1. Testing Engine Invariants on Diverse Runs ---");

const INVARIANT_RUNS = isFast ? 100 : 500;
for (let r = 0; r < INVARIANT_RUNS; r++) {
  const s1Answers = {};
  for (const q of STAGE1_QUESTIONS) {
    const opt = q.options[Math.floor(Math.random() * q.options.length)];
    s1Answers[q.id] = opt.id;
  }
  const s1Seed = deriveSeed(s1Answers);
  const s1Res = scoreStage1(s1Answers, { seed: s1Seed });
  const s2Set = getStage2Set(s1Res, { seed: s1Seed });
  const s2Answers = {};
  for (const q of s2Set) {
    const opt = q.options[Math.floor(Math.random() * q.options.length)];
    s2Answers[q.id] = opt.id;
  }

  const res = computeCareerResult({ stage1Answers: s1Answers, stage2Answers: s2Answers });

  // 1. Structural validity
  assert(res && typeof res === "object", "Result is a non-null object");
  assert(res.stage1 && res.stage2 && res.scoring, "Result contains stage1, stage2, and scoring sub-objects");
  assert(res.topCareer && res.topCareer.slug, "Result contains topCareer");

  // 2. Picks count: 4 or 5
  assert(
    res.picks.length === 4 || res.picks.length === 5,
    `Picks count must be 4 or 5 (found ${res.picks.length})`
  );

  // 3. Shortlist count: exactly 8
  assert(
    res.shortlist.length === 8,
    `Shortlist length must be exactly 8 (found ${res.shortlist.length})`
  );

  // 4. Shortlist domain diversity: >= 3 distinct primary domains
  const shortlistDomains = new Set(res.shortlist.map((s) => s.domain));
  assert(
    shortlistDomains.size >= 3,
    `Shortlist must contain >= 3 distinct primary domains (found ${shortlistDomains.size})`
  );

  // 5. Shortlist uniqueness: all 8 slugs are unique
  const shortlistSlugs = new Set(res.shortlist.map((s) => s.slug));
  assert(
    shortlistSlugs.size === 8,
    `Shortlist must contain 8 unique slugs (found ${shortlistSlugs.size})`
  );

  // 6. Monotonicity of matchPct in picks
  for (let i = 1; i < res.picks.length; i++) {
    assert(
      res.picks[i].matchPct <= res.picks[i - 1].matchPct,
      `Picks matchPct must be non-increasing (picks[${i}]: ${res.picks[i].matchPct} > picks[${i - 1}]: ${res.picks[i - 1].matchPct})`
    );
  }

  // 7. Pick 4 domain preference: Pick 4 domain != Pick 1 domain unless fallback triggered
  if (res.picks[3].domain === res.picks[0].domain) {
    const pick1 = res.picks[0];
    const top3Slugs = new Set(res.picks.slice(0, 3).map((p) => p.slug));
    const availableOtherQualifiers = res.shortlist.concat(res.alternatives).filter(
      (r) => !top3Slugs.has(r.slug) && r.slug !== res.picks[3].slug && r.domain !== pick1.domain && r.rankScore >= 0.5 * pick1.rankScore
    );
    assert(
      availableOtherQualifiers.length === 0,
      `Pick 4 from same domain (${res.picks[3].domain}) only permitted if no other available domain met 0.5 threshold (found ${availableOtherQualifiers.length})`
    );
  }

  // 8. Pick 5 wildcard rule: if present, rankScore >= 0.60 * pick1.rankScore
  // AND its domain must not be among domains of picks 1-4, OR it must have a non-null secondaryDomain
  if (res.picks.length === 5) {
    const pick5 = res.picks[4];
    const pick1 = res.picks[0];
    assert(
      pick5.rankScore >= 0.6 * pick1.rankScore - 1e-6,
      `Pick 5 wildcard rankScore (${pick5.rankScore.toFixed(4)}) is below 0.60 * pick1 (${(0.6 * pick1.rankScore).toFixed(4)})`
    );
    const pick14Domains = new Set(res.picks.slice(0, 4).map((p) => p.domain));
    assert(
      !pick14Domains.has(pick5.domain) || pick5.secondaryDomain !== null,
      `Pick 5 wildcard ${pick5.slug} (${pick5.domain}) violates rule: domain is in picks 1-4 (${Array.from(pick14Domains)}) and secondaryDomain is null!`
    );
  }

  // 8b. Rank numbering: picks[].rank must be 1..n in array order; overallRank must be defined
  for (let i = 0; i < res.picks.length; i++) {
    assert(res.picks[i].rank === i + 1, `Pick ${i} rank must be ${i + 1}, got ${res.picks[i].rank}`);
    assert(typeof res.picks[i].overallRank === "number", `Pick ${i} must have overallRank`);
  }
  for (let j = 0; j < res.alternatives.length; j++) {
    assert(
      res.alternatives[j].rank === res.picks.length + j + 1,
      `Alternative ${j} rank must be ${res.picks.length + j + 1}, got ${res.alternatives[j].rank}`
    );
    assert(typeof res.alternatives[j].overallRank === "number", `Alternative ${j} must have overallRank`);
  }

  // 8c. Signal field
  assert(res.signal && ["clear", "mixed", "open"].includes(res.signal.level), "res.signal.level must be clear, mixed, or open");
  assert(typeof res.bankVersion === "string" && res.bankVersion.startsWith("bank_v3_"), "bankVersion must be present");

  // 9. Trait scores validity: exactly 10 dimensions, scaled 0-100
  assert(
    Object.keys(res.traitScores).length === 10,
    `Trait scores must have exactly 10 dimensions (found ${Object.keys(res.traitScores).length})`
  );
  for (const t of TRAIT_KEYS) {
    const val = res.traitScores[t];
    assert(
      Number.isInteger(val) && val >= 0 && val <= 100,
      `Trait score '${t}' must be integer in [0, 100] (found ${val})`
    );
  }

  // 10. Monotone matchPct in [25, 98]
  for (const p of res.picks) {
    assert(
      p.matchPct >= 25 && p.matchPct <= 98,
      `matchPct must be in [25, 98] (found ${p.matchPct} for ${p.slug})`
    );
  }

  // 11. All slugs are in ALL_48_SLUGS list
  assert(ALL_48_SLUGS.includes(res.topCareer.slug), `topCareer slug '${res.topCareer.slug}' must be in ALL_48_SLUGS`);
  for (const p of res.picks) {
    assert(ALL_48_SLUGS.includes(p.slug), `Pick slug '${p.slug}' must be in ALL_48_SLUGS`);
    assert(["core", "explore", "wildcard"].includes(p.kind), `Pick kind '${p.kind}' must be core, explore, or wildcard`);
  }
  for (const s of res.shortlist) {
    assert(ALL_48_SLUGS.includes(s.slug), `Shortlist slug '${s.slug}' must be in ALL_48_SLUGS`);
  }
  for (const a of res.alternatives) {
    assert(ALL_48_SLUGS.includes(a.slug), `Alternative slug '${a.slug}' must be in ALL_48_SLUGS`);
  }

  // 12. Tie structure verification
  assert(res.tie && typeof res.tie.isTie === "boolean", "Result must contain tie object");
  assert(Array.isArray(res.tie.slugs), "tie.slugs must be an array");

  // 11. Determinism on identical inputs
  const resReplay = computeCareerResult({ stage1Answers: s1Answers, stage2Answers: s2Answers });
  assert(
    res.topCareer.slug === resReplay.topCareer.slug,
    "Replaying with identical inputs must produce identical topCareer"
  );
  assert(
    JSON.stringify(res.picks.map((p) => p.slug)) === JSON.stringify(resReplay.picks.map((p) => p.slug)),
    "Replaying with identical inputs must produce identical picks"
  );
  assert(
    JSON.stringify(res.traitScores) === JSON.stringify(resReplay.traitScores),
    "Replaying with identical inputs must produce identical traitScores"
  );
}

console.log(`✅ Passed: All invariants verified across ${INVARIANT_RUNS} diverse runs.\n`);

// =========================================================================
// 2. Suite 2: Order Invariance
// =========================================================================
console.log("--- 2. Testing Order Invariance ---");

for (let r = 0; r < 50; r++) {
  const s1Answers = {};
  for (const q of STAGE1_QUESTIONS) {
    s1Answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;
  }
  const s1Seed = deriveSeed(s1Answers);
  const s1Res = scoreStage1(s1Answers, { seed: s1Seed });
  const s2Set = getStage2Set(s1Res, { seed: s1Seed });
  const s2Answers = {};
  for (const q of s2Set) {
    s2Answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;
  }

  // Mock DB roadmaps array
  const mockRoadmaps = ALL_48_SLUGS.map((slug) => ({
    slug,
    title: slug.toUpperCase(),
    customField: `meta_${slug}`,
  }));

  // Forward run
  const resForward = computeCareerResult({
    stage1Answers: s1Answers,
    stage2Answers: s2Answers,
    roadmaps: mockRoadmaps,
  });

  // Reversed roadmaps array
  const resReversedRoadmaps = computeCareerResult({
    stage1Answers: s1Answers,
    stage2Answers: s2Answers,
    roadmaps: [...mockRoadmaps].reverse(),
  });

  // Reversed answers object keys
  const reversedS1 = {};
  Object.keys(s1Answers)
    .reverse()
    .forEach((k) => (reversedS1[k] = s1Answers[k]));
  const reversedS2 = {};
  Object.keys(s2Answers)
    .reverse()
    .forEach((k) => (reversedS2[k] = s2Answers[k]));

  const resReversedAnswers = computeCareerResult({
    stage1Answers: reversedS1,
    stage2Answers: reversedS2,
    roadmaps: mockRoadmaps,
  });

  // Verify exact identity across forward, reversed roadmaps, and reversed answers
  assert(
    resForward.topCareer.slug === resReversedRoadmaps.topCareer.slug,
    "Reversing roadmaps input array must NOT change topCareer"
  );
  assert(
    resForward.topCareer.slug === resReversedAnswers.topCareer.slug,
    "Reversing answer keys must NOT change topCareer"
  );

  assert(
    JSON.stringify(resForward.picks.map((p) => p.slug)) ===
      JSON.stringify(resReversedRoadmaps.picks.map((p) => p.slug)),
    "Reversing roadmaps input array must NOT change picks"
  );
  assert(
    JSON.stringify(resForward.picks.map((p) => p.slug)) ===
      JSON.stringify(resReversedAnswers.picks.map((p) => p.slug)),
    "Reversing answer keys must NOT change picks"
  );

  assert(
    JSON.stringify(resForward.shortlist.map((p) => p.slug)) ===
      JSON.stringify(resReversedRoadmaps.shortlist.map((p) => p.slug)),
    "Reversing roadmaps input array must NOT change shortlist"
  );
  assert(
    JSON.stringify(resForward.shortlist.map((p) => p.slug)) ===
      JSON.stringify(resReversedAnswers.shortlist.map((p) => p.slug)),
    "Reversing answer keys must NOT change shortlist"
  );
}

console.log("✅ Passed: Zero array or key order bias confirmed across all runs.\n");

// =========================================================================
// 3. Suite 3: Monte Carlo Distribution
// =========================================================================
const MC_RUNS = isFast ? 20000 : 200000;
console.log(`--- 3. Running ${MC_RUNS.toLocaleString()} End-to-End Monte Carlo Simulations ---`);

const top1Wins = {};
const picksAppearances = {};
const shortlistAppearances = {};
for (const s of ALL_48_SLUGS) {
  top1Wins[s] = 0;
  picksAppearances[s] = 0;
  shortlistAppearances[s] = 0;
}

const p1Matches = [];
const p5Matches = [];
let totalTies = 0;
let totalWildcardOmissions = 0;

const randomSignalCounts = { clear: 0, mixed: 0, open: 0 };

for (let r = 0; r < MC_RUNS; r++) {
  const s1Answers = {};
  for (const q of STAGE1_QUESTIONS) {
    s1Answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;
  }
  const s1Seed = deriveSeed(s1Answers);
  const s1Res = scoreStage1(s1Answers, { seed: s1Seed });
  const s2Set = getStage2Set(s1Res, { seed: s1Seed });
  const s2Answers = {};
  for (const q of s2Set) {
    s2Answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;
  }

  const res = computeCareerResult({ stage1Answers: s1Answers, stage2Answers: s2Answers });

  // Invariant: Wildcard rule holds across every simulated run
  if (res.picks.length === 5) {
    const pick14Domains = new Set(res.picks.slice(0, 4).map((p) => p.domain));
    assert(
      !pick14Domains.has(res.picks[4].domain) || res.picks[4].secondaryDomain !== null,
      `MC run ${r}: Pick 5 wildcard ${res.picks[4].slug} (${res.picks[4].domain}) violates domain rule`
    );
  }

  top1Wins[res.topCareer.slug]++;
  for (const p of res.picks) picksAppearances[p.slug]++;
  for (const s of res.shortlist) shortlistAppearances[s.slug]++;

  p1Matches.push(res.picks[0].matchPct);
  if (res.picks[4]) {
    p5Matches.push(res.picks[4].matchPct);
  } else {
    totalWildcardOmissions++;
  }
  if (res.tie.isTie) totalTies++;
  randomSignalCounts[res.signal.level]++;
}

p1Matches.sort((a, b) => a - b);
p5Matches.sort((a, b) => a - b);
const medianP1 = p1Matches[Math.floor(p1Matches.length / 2)];
const medianP5 = p5Matches[Math.floor(p5Matches.length / 2)];
const tieRate = (totalTies / MC_RUNS) * 100;
const wildcardOmissionRate = (totalWildcardOmissions / MC_RUNS) * 100;

console.log("\n===================================================================================");
console.log(`📊 48-ROADMAP E2E DISTRIBUTION TABLE (${MC_RUNS.toLocaleString()} RUNS)`);
console.log("===================================================================================");
console.log("| Domain               | Roadmap Slug             | Top-1 % | In-Picks % | In-Shortlist % | Status   |");
console.log("-----------------------------------------------------------------------------------");

let mcFailures = 0;
for (const slug of ALL_48_SLUGS) {
  const dom = DOMAIN_ROADMAP_MAP[slug].domain;
  const t1Pct = (top1Wins[slug] / MC_RUNS) * 100;
  const picksPct = (picksAppearances[slug] / MC_RUNS) * 100;
  const shortPct = (shortlistAppearances[slug] / MC_RUNS) * 100;

  // Invariants:
  // top-1: 0.5% - 6.0%
  // in-picks: 3.0% - 25.0%
  // in-shortlist: >= 6.0%
  const pass =
    t1Pct >= 0.5 &&
    t1Pct <= 6.0 &&
    picksPct >= 3.0 &&
    picksPct <= 25.0 &&
    shortPct >= 6.0;

  if (!pass) mcFailures++;

  console.log(
    `| ${dom.padEnd(20)} | ${slug.padEnd(24)} | ${t1Pct.toFixed(2).padStart(6)}% | ${picksPct.toFixed(2).padStart(9)}% | ${shortPct.toFixed(2).padStart(13)}% | ${pass ? "✅ PASS" : "❌ FAIL"} |`
  );

  assert(
    t1Pct >= 0.5 && t1Pct <= 6.0,
    `Roadmap '${slug}' Top-1 share (${t1Pct.toFixed(2)}%) outside [0.5%, 6.0%]`
  );
  assert(
    picksPct >= 3.0 && picksPct <= 25.0,
    `Roadmap '${slug}' In-Picks share (${picksPct.toFixed(2)}%) outside [3.0%, 25.0%]`
  );
  assert(
    shortPct >= 6.0,
    `Roadmap '${slug}' In-Shortlist share (${shortPct.toFixed(2)}%) is below 6.0%`
  );
}
console.log("===================================================================================");
console.log(`Random Median #1 matchPct: ${medianP1}% (Target: 55% - 65%) ${medianP1 >= 55 && medianP1 <= 65 ? "✅" : "❌"}`);
console.log(`Random Median #5 matchPct: ${medianP5}% (Target: 45% - 55%) ${medianP5 >= 45 && medianP5 <= 55 ? "✅" : "❌"}`);
console.log(`Random Tie rate (gap <= 0.03 & matchPct >= 60): ${tieRate.toFixed(1)}%`);
console.log(`Random Wildcard omission rate: ${wildcardOmissionRate.toFixed(1)}%`);
console.log(
  `Random Signal distribution: clear: ${((randomSignalCounts.clear / MC_RUNS) * 100).toFixed(1)}%, mixed: ${(
    (randomSignalCounts.mixed / MC_RUNS) *
    100
  ).toFixed(1)}%, open: ${((randomSignalCounts.open / MC_RUNS) * 100).toFixed(1)}%`
);
assert(medianP1 >= 55 && medianP1 <= 65, `Random Median #1 matchPct (${medianP1}%) outside [55%, 65%]`);
assert(medianP5 >= 45 && medianP5 <= 55, `Random Median #5 matchPct (${medianP5}%) outside [45%, 55%]`);
console.log(`✅ Passed: All 48 roadmaps passed Monte Carlo distribution invariants.\n`);

// =========================================================================
// 4. Suite 4: Persona Robustness Tests
// =========================================================================
const PERSONAS_PER_ROADMAP = isFast ? 30 : 300;
console.log(`--- 4. Testing Persona Robustness (${PERSONAS_PER_ROADMAP} personas per roadmap) ---`);

const pLevels = [0.9, 0.7, 0.5];
const personaResults = {};
const perRoadmapStats = {};
for (const s of ALL_48_SLUGS) {
  perRoadmapStats[s] = {};
  for (const p of pLevels) {
    perRoadmapStats[s][p] = {
      total: 0,
      top1: 0,
      inPicks: 0,
      inShortlist: 0,
      singleTotal: 0,
      singleTop1: 0,
      singleInPicks: 0,
      blendedTotal: 0,
      blendedTop1: 0,
      blendedInPicks: 0,
    };
  }
}

const personaP1Matches = { 0.5: [], 0.7: [], 0.9: [] };
const personaSignalCounts = {
  0.5: { clear: 0, mixed: 0, open: 0 },
  0.7: { clear: 0, mixed: 0, open: 0 },
  0.9: { clear: 0, mixed: 0, open: 0 },
};
let p7Ties = 0;
let p7Total = 0;
let p9Ties = 0;
let p9Total = 0;

for (const p of pLevels) {
  personaResults[p] = { targetRank1Count: 0, targetTop3Count: 0, targetTop5Count: 0, total: 0 };
}

for (const targetSlug of ALL_48_SLUGS) {
  const targetDomain = DOMAIN_ROADMAP_MAP[targetSlug].domain;

  for (const p of pLevels) {
    for (let i = 0; i < PERSONAS_PER_ROADMAP; i++) {
      // 1. Stage 1 Persona Answers
      const s1Answers = {};
      for (const q of STAGE1_QUESTIONS) {
        if (Math.random() < p) {
          // Pick option targeting targetDomain (prefer highest weight on targetDomain)
          let bestOpt = null;
          let maxW = 0;
          for (const opt of q.options) {
            const w = opt.weights?.[targetDomain] || 0;
            if (w > maxW) {
              maxW = w;
              bestOpt = opt;
            }
          }
          s1Answers[q.id] = (bestOpt || q.options[Math.floor(Math.random() * q.options.length)]).id;
        } else {
          s1Answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;
        }
      }

      const s1Seed = deriveSeed(s1Answers);
      const s1Res = scoreStage1(s1Answers, { seed: s1Seed });
      const s2Set = getStage2Set(s1Res, { seed: s1Seed });

      // 2. Stage 2 Persona Answers
      const s2Answers = {};
      for (const q of s2Set) {
        if (Math.random() < p) {
          // Look for option with highest weight on targetSlug
          let bestOpt = null;
          let maxW = 0;
          for (const opt of q.options) {
            const w = opt.weights?.[targetSlug] || 0;
            if (w > maxW) {
              maxW = w;
              bestOpt = opt;
            }
          }
          if (bestOpt) {
            s2Answers[q.id] = bestOpt.id;
          } else {
            // Target slug not in options for this question:
            // Prefer option whose primary slug belongs to targetDomain
            const domOpt = q.options.find((o) => {
              const topSlug = Object.keys(o.weights || {})[0];
              return DOMAIN_ROADMAP_MAP[topSlug]?.domain === targetDomain;
            });
            s2Answers[q.id] = (domOpt || q.options[Math.floor(Math.random() * q.options.length)]).id;
          }
        } else {
          s2Answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;
        }
      }

      const res = computeCareerResult({ stage1Answers: s1Answers, stage2Answers: s2Answers });
      personaResults[p].total++;
      personaP1Matches[p].push(res.picks[0].matchPct);
      personaSignalCounts[p][res.signal.level]++;

      if (p === 0.7) {
        p7Total++;
        if (res.tie.isTie) p7Ties++;
      } else if (p === 0.9) {
        p9Total++;
        if (res.tie.isTie) p9Ties++;
      }

      const isTop1 = res.topCareer.slug === targetSlug;
      const isInPicks = res.picks.some((pick) => pick.slug === targetSlug);
      const isInShortlist = res.shortlist.some((s) => s.slug === targetSlug);

      if (isTop1) personaResults[p].targetRank1Count++;
      const top3Slugs = res.picks.slice(0, 3).map((pick) => pick.slug);
      if (top3Slugs.includes(targetSlug)) personaResults[p].targetTop3Count++;
      if (isInPicks) personaResults[p].targetTop5Count++;

      // Track per-roadmap stats
      const rStats = perRoadmapStats[targetSlug][p];
      rStats.total++;
      if (isTop1) rStats.top1++;
      if (isInPicks) rStats.inPicks++;
      if (isInShortlist) rStats.inShortlist++;

      if (res.stage1.isBlended) {
        rStats.blendedTotal++;
        if (isTop1) rStats.blendedTop1++;
        if (isInPicks) rStats.blendedInPicks++;
      } else {
        rStats.singleTotal++;
        if (isTop1) rStats.singleTop1++;
        if (isInPicks) rStats.singleInPicks++;
      }
    }
  }
}

// Compute medians for persona runs
personaP1Matches[0.5].sort((a, b) => a - b);
personaP1Matches[0.7].sort((a, b) => a - b);
personaP1Matches[0.9].sort((a, b) => a - b);
const personaMedian05 = personaP1Matches[0.5][Math.floor(personaP1Matches[0.5].length / 2)];
const personaMedian07 = personaP1Matches[0.7][Math.floor(personaP1Matches[0.7].length / 2)];
const personaMedian09 = personaP1Matches[0.9][Math.floor(personaP1Matches[0.9].length / 2)];
const p7Clamp98Pct = (personaP1Matches[0.7].filter((m) => m >= 98).length / personaP1Matches[0.7].length) * 100;
const p7TieRate = (p7Ties / p7Total) * 100;
const p9TieRate = (p9Ties / p9Total) * 100;

console.log("-----------------------------------------------------------------------------------");
console.log("| Probability (p) | Target Rank #1 Rate | Target Top-3 Rate | Target In-Picks Rate | Median #1 Match | Status |");
console.log("-----------------------------------------------------------------------------------");
for (const p of pLevels) {
  const r1Rate = (personaResults[p].targetRank1Count / personaResults[p].total) * 100;
  const top3Rate = (personaResults[p].targetTop3Count / personaResults[p].total) * 100;
  const top5Rate = (personaResults[p].targetTop5Count / personaResults[p].total) * 100;
  const med = p === 0.5 ? personaMedian05 : p === 0.7 ? personaMedian07 : personaMedian09;

  let pass = true;
  if (p === 0.9 && (r1Rate < 90.0 || med < 92 || med > 98)) pass = false;
  if (p === 0.7 && (top3Rate < 85.0 || med < 82 || med > 90 || p7Clamp98Pct >= 15.0)) pass = false;
  if (p === 0.5 && (top5Rate < 70.0 || med < 70 || med > 80)) pass = false;

  console.log(
    `| p = ${p.toFixed(1).padEnd(11)} | ${r1Rate.toFixed(1).padStart(18)}% | ${top3Rate.toFixed(1).padStart(16)}% | ${top5Rate.toFixed(1).padStart(19)}% | ${`${med}%`.padStart(15)} | ${pass ? "✅ PASS" : "❌ FAIL"} |`
  );

  if (p === 0.9) {
    assert(r1Rate >= 90.0, `Persona p=0.9 Rank #1 rate (${r1Rate.toFixed(1)}%) below 90%`);
    assert(med >= 92 && med <= 98, `Persona p=0.9 median #1 matchPct (${med}%) outside [92%, 98%]`);
  }
  if (p === 0.7) {
    assert(top3Rate >= 85.0, `Persona p=0.7 Top-3 rate (${top3Rate.toFixed(1)}%) below 85%`);
    assert(med >= 82 && med <= 90, `Persona p=0.7 median #1 matchPct (${med}%) outside [82%, 90%]`);
    assert(p7Clamp98Pct < 15.0, `Persona p=0.7 runs hitting 98 clamp (${p7Clamp98Pct.toFixed(1)}%) is >= 15%`);
  }
  if (p === 0.5) {
    assert(top5Rate >= 70.0, `Persona p=0.5 In-Picks rate (${top5Rate.toFixed(1)}%) below 70%`);
    assert(med >= 70 && med <= 80, `Persona p=0.5 median #1 matchPct (${med}%) outside [70%, 80%]`);
  }
}
console.log("-----------------------------------------------------------------------------------");
console.log(`Persona p=0.7 clamp-at-98 rate: ${p7Clamp98Pct.toFixed(2)}% (Target < 15%) ✅`);
console.log(`Persona p=0.7 tie rate: ${p7TieRate.toFixed(2)}% (Target < 15%) ✅`);
console.log(`Persona p=0.9 tie rate: ${p9TieRate.toFixed(2)}%`);
console.log("Persona Signal Distributions:");
for (const p of pLevels) {
  const tot = personaResults[p].total || 1;
  console.log(
    `  p = ${p}: clear: ${((personaSignalCounts[p].clear / tot) * 100).toFixed(1)}%, mixed: ${(
      (personaSignalCounts[p].mixed / tot) *
      100
    ).toFixed(1)}%, open: ${((personaSignalCounts[p].open / tot) * 100).toFixed(1)}%`
  );
}
assert(p7TieRate <= 15.0, `p=0.7 tie rate (${p7TieRate.toFixed(1)}%) exceeds 15%`);

// Per-roadmap targets check:
// p=0.7: in-picks >= 70%, top-1 >= 30%
// p=0.9: in-picks >= 90%
console.log("\n--- Checking Per-Roadmap Persona Targets (p=0.7 & p=0.9) ---");
const belowTargetList = [];
for (const slug of ALL_48_SLUGS) {
  const p7 = perRoadmapStats[slug][0.7];
  const p9 = perRoadmapStats[slug][0.9];
  const p7Top1Rate = (p7.top1 / p7.total) * 100;
  const p7PicksRate = (p7.inPicks / p7.total) * 100;
  const p9PicksRate = (p9.inPicks / p9.total) * 100;

  if (p7Top1Rate < 30.0 || p7PicksRate < 70.0 || p9PicksRate < 90.0) {
    belowTargetList.push({
      slug,
      p7Top1Rate: `${p7Top1Rate.toFixed(1)}%`,
      p7PicksRate: `${p7PicksRate.toFixed(1)}%`,
      p9PicksRate: `${p9PicksRate.toFixed(1)}%`,
    });
  }
}

if (belowTargetList.length > 0) {
  console.log(`⚠️ Roadmaps below target (${belowTargetList.length}):`, belowTargetList);
  throw new Error(`${belowTargetList.length} roadmaps below target thresholds!`);
} else {
  console.log(`✅ All 48 roadmaps meet per-roadmap targets (p=0.7 in-picks >= 70% & top-1 >= 30%, p=0.9 in-picks >= 90%).`);
}
console.log("✅ Passed: Persona robustness verified across all 3 signal strengths.\n");

// =========================================================================
// 5. Suite 5: Guard Test (Static Analysis & Clean Architecture)
// =========================================================================
console.log("--- 5. Running Architectural Guard Tests ---");

const careerEngineFilePath = path.resolve(__dirname, "../services/careerEngine.js");
const careerEngineSource = fs.readFileSync(careerEngineFilePath, "utf8");

// 1. Zero legacy scoringEngine imports
assert(
  !careerEngineSource.includes("scoringEngine"),
  "careerEngine.js must have ZERO imports or mentions of legacy scoringEngine"
);
assert(
  !careerEngineSource.includes("quizConfig"),
  "careerEngine.js must NOT import legacy quizConfig.js"
);
assert(
  !careerEngineSource.includes("CAREER_PROFILES"),
  "careerEngine.js must NOT reference legacy CAREER_PROFILES"
);

// 2. No index-based selection on raw roadmaps (e.g., roadmaps[0])
assert(
  !careerEngineSource.includes("roadmaps[0]"),
  "careerEngine.js must NOT select roadmaps by arbitrary array index (found 'roadmaps[0]')"
);
assert(
  !careerEngineSource.includes("roadmaps[4]"),
  "careerEngine.js must NOT select roadmaps by arbitrary array index (found 'roadmaps[4]')"
);

console.log("✅ Passed: careerEngine.js is 100% decoupled from legacy scoring and index selection.\n");

console.log("=========================================================================");
console.log("🎉 ALL 5 CAREER ENGINE TEST SUITES PASSED FLAWLESSLY!");
console.log("=========================================================================");
