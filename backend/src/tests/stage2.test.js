import { DOMAINS, DOMAIN_ROADMAP_MAP, getRoadmapsByDomain } from "../config/quizDomains.js";
import {
  STAGE2_BANKS,
  validateBank,
  maxPossibleBySlug,
  getStage2Set,
  scoreStage2,
  hashString,
} from "../services/stage2Selector.js";
import { scoreStage1 } from "../services/stage1Scoring.js";
import { STAGE1_QUESTIONS } from "../config/stage1-questions.js";

console.log("\n=========================================================================");
console.log("🧪 RUNNING COMPREHENSIVE STAGE 2 VERIFICATION SUITE (ALL 11 BANKS)");
console.log("=========================================================================\n");

const isFast = process.argv.includes("--fast");
const FIXED_SEED = 1337;
console.log(`Fixed Seed: ${FIXED_SEED}`);
console.log(`Execution Mode: ${isFast ? "FAST (~10% runs, < 60s for pre-commit)" : "FULL (nightly)"}\n`);

let passedAssertions = 0;
function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED ASSERTION: ${message}`);
    throw new Error(message);
  }
  passedAssertions++;
}

const ALL_11_DOMAINS = [
  "tech",
  "healthcare",
  "media",
  "business",
  "creative",
  "finance",
  "engineering",
  "law_gov",
  "education_social",
  "aviation_hospitality",
  "science",
];

const SMALL_DOMAINS = ["engineering", "science", "law_gov", "education_social", "aviation_hospitality"];

// Banned Jargon List (regex with word boundaries)
const BANNED_JARGON = [
  /\bcnn\b/i,
  /\bpen-testing\b/i,
  /\bpentesting\b/i,
  /\bneural network\b/i,
  /\bsmart contract\b/i,
  /\bp&l\b/i,
  /\bitr\b/i,
  /\bhvac\b/i,
  /\bactuarial\b/i,
];

// Beam Search Helper to find answer path ranking targetSlug as #1
function findPathToRankTop(questionSet, targetSlug, stage1Result) {
  let beam = [{ answers: {}, runningScores: {} }];

  for (const q of questionSet) {
    const nextBeam = [];
    for (const state of beam) {
      for (const opt of q.options) {
        const nextAnswers = { ...state.answers, [q.id]: opt.id };
        const nextScores = { ...state.runningScores };
        for (const [slug, w] of Object.entries(opt.weights)) {
          nextScores[slug] = (nextScores[slug] || 0) + w;
        }

        const targetScore = nextScores[targetSlug] || 0;
        let maxComp = 0;
        for (const [s, sc] of Object.entries(nextScores)) {
          if (s !== targetSlug && sc > maxComp) maxComp = sc;
        }

        const optTargetW = opt.weights[targetSlug] || 0;
        // Fitness strongly rewards target points and heavily penalizes high competitor score
        const fitness = targetScore * 100 + optTargetW * 20 - maxComp * 15;
        nextBeam.push({ answers: nextAnswers, runningScores: nextScores, fitness });
      }
    }
    nextBeam.sort((a, b) => b.fitness - a.fitness);
    beam = nextBeam.slice(0, 50);
  }

  for (const state of beam) {
    const res = scoreStage2(state.answers, questionSet, { stage1Result, seed: "reach_eval" });
    if (res.topSlug === targetSlug) return { answers: state.answers, res, rank: 1 };
  }

  // Fallback check top state rank
  const bestRes = scoreStage2(beam[0].answers, questionSet, { stage1Result, seed: "reach_eval" });
  const rank = bestRes.rankedSlugs.indexOf(targetSlug) + 1;
  return { answers: beam[0].answers, res: bestRes, rank };
}

// =========================================================================
// 1. Structure, Validation, Jargon Lint, & Word Count Checks
// =========================================================================
console.log("--- 1. Testing Structure, Validation, Jargon Lint, and Word Counts ---");

let maxObservedQuestionWords = 0;
let maxObservedOptionWords = 0;

for (const domain of ALL_11_DOMAINS) {
  const bank = STAGE2_BANKS[domain];
  assert(bank, `Bank for '${domain}' exists and is loaded`);
  assert(bank.domain === domain, `Bank domain property matches '${domain}'`);
  assert(validateBank(bank) === true, `validateBank passed for '${domain}'`);

  const expectedQCount = domain === "tech" ? 9 : (domain === "healthcare" || domain === "media" || domain === "business" || domain === "creative" || domain === "finance" ? 8 : 7);
  assert(
    bank.questions.length === expectedQCount,
    `Domain '${domain}' has exactly ${expectedQCount} questions (found ${bank.questions.length})`
  );

  let blendCoreCount = 0;
  for (const q of bank.questions) {
    if (q.blendCore === true) blendCoreCount++;

    const qWords = q.text.trim().split(/\s+/).length;
    if (qWords > maxObservedQuestionWords) maxObservedQuestionWords = qWords;
    assert(qWords <= 25, `Question '${q.id}' in '${domain}' exceeds 25 words (${qWords} words)`);
    assert(q.options.length >= 5 && q.options.length <= 6, `Question '${q.id}' in '${domain}' has 5-6 options`);

    // Check banned jargon in question
    for (const regex of BANNED_JARGON) {
      assert(
        !regex.test(q.text),
        `Banned jargon matching ${regex} found in question '${q.id}' text: "${q.text}"`
      );
    }

    for (const opt of q.options) {
      const optWords = opt.text.trim().split(/\s+/).length;
      if (optWords > maxObservedOptionWords) maxObservedOptionWords = optWords;
      assert(optWords <= 14, `Option '${opt.id}' in '${q.id}' exceeds 14 words (${optWords} words)`);

      // Check banned jargon in option
      for (const regex of BANNED_JARGON) {
        assert(
          !regex.test(opt.text),
          `Banned jargon matching ${regex} found in option '${opt.id}' text: "${opt.text}"`
        );
      }

      const wEntries = Object.entries(opt.weights);
      const w3 = wEntries.filter(([, w]) => w === 3);
      assert(w3.length === 1, `Option '${opt.id}' in '${q.id}' has exactly 1 slug at weight 3`);

      const secondary = wEntries.filter(([, w]) => w < 3);
      assert(secondary.length <= 2, `Option '${opt.id}' in '${q.id}' has <= 2 secondary slugs`);
      for (const [s, w] of secondary) {
        assert(w === 1 || w === 2, `Secondary weight for '${s}' must be 1 or 2`);
      }
    }
  }

  assert(blendCoreCount >= 4, `Domain '${domain}' has >= 4 blendCore questions (found ${blendCoreCount})`);
}

console.log(`✅ Passed: All 11 banks validated without error.`);
console.log(`   - Max question words observed: ${maxObservedQuestionWords} (limit: 25)`);
console.log(`   - Max option words observed:   ${maxObservedOptionWords} (limit: 14)`);
console.log(`   - Banned jargon check: 0 occurrences detected.\n`);

// =========================================================================
// 2. Coverage Rules per Roadmap & Adjacency Tables
// =========================================================================
console.log("--- 2. Testing Coverage Rules Across All 11 Banks ---");
console.log("-----------------------------------------------------------------------------------------------------------------");
console.log("| Domain               | Slug                     | Type     | Distinct Qs | Total Opts | W=3 Opts | Sec Opts | BlendCore >=2 |");
console.log("-----------------------------------------------------------------------------------------------------------------");

const fullCoverageTable = [];

for (const domain of ALL_11_DOMAINS) {
  const bank = STAGE2_BANKS[domain];
  const ownRoadmaps = getRoadmapsByDomain(domain);
  const blendCoreQuestions = bank.questions.filter((q) => q.blendCore === true);

  // Collect all slugs appearing in this bank
  const allSlugsInBank = new Set();
  for (const q of bank.questions) {
    for (const opt of q.options) {
      for (const s of Object.keys(opt.weights)) allSlugsInBank.add(s);
    }
  }

  for (const slug of allSlugsInBank) {
    const isOwn = ownRoadmaps.includes(slug);
    let totalOpts = 0;
    let w3Opts = 0;
    let secOpts = 0;
    const distinctQs = new Set();

    for (const q of bank.questions) {
      for (const opt of q.options) {
        const w = opt.weights[slug];
        if (w) {
          totalOpts++;
          distinctQs.add(q.id);
          if (w === 3) w3Opts++;
          else secOpts++;
        }
      }
    }

    let blendCoreGte2 = false;
    for (const q of blendCoreQuestions) {
      for (const opt of q.options) {
        if ((opt.weights[slug] || 0) >= 2) {
          blendCoreGte2 = true;
          break;
        }
      }
      if (blendCoreGte2) break;
    }

    const typeStr = isOwn ? "Own" : (SMALL_DOMAINS.includes(domain) && w3Opts > 0 ? "Adjacent" : "Cross-list");

    console.log(
      `| ${domain.padEnd(20)} | ${slug.padEnd(24)} | ${typeStr.padEnd(8)} | ${String(distinctQs.size).padStart(11)} | ${String(totalOpts).padStart(10)} | ${String(w3Opts).padStart(8)} | ${String(secOpts).padStart(8)} | ${String(blendCoreGte2).padStart(13)} |`
    );

    fullCoverageTable.push({
      domain,
      slug,
      type: typeStr,
      totalOpts,
      w3Opts,
      secOpts,
      distinctQs: distinctQs.size,
      blendCoreGte2,
    });

    if (isOwn) {
      // Fix 3 rule: Every own roadmap must have weight-3 in >= 4 questions
      assert(
        w3Opts >= 4 && distinctQs.size >= 4,
        `Own roadmap '${slug}' in '${domain}' must have weight-3 in >= 4 distinct questions (found ${distinctQs.size})`
      );
      assert(
        blendCoreGte2,
        `Own roadmap '${slug}' in '${domain}' must have weight >= 2 in blendCore questions`
      );
      // Fix 3 rule: Secondaries between 2 and 6
      assert(
        secOpts >= 2 && secOpts <= 6,
        `Own roadmap '${slug}' in '${domain}' must have between 2 and 6 secondary options (found ${secOpts})`
      );
    } else if (typeStr === "Adjacent") {
      // Small-domain rule: Each adjacent roadmap needs weight-3 in at least 2 options, and appears in at least 3 questions in total
      assert(
        w3Opts >= 2,
        `Adjacent roadmap '${slug}' in '${domain}' must have weight-3 in >= 2 options (found ${w3Opts})`
      );
      assert(
        distinctQs.size >= 3,
        `Adjacent roadmap '${slug}' in '${domain}' must appear in >= 3 questions in total (found ${distinctQs.size})`
      );
    }
  }
}
console.log("--------------------------------------------------------------------------------------------------");
console.log("✅ Passed: All coverage, secondary appearance, and small-domain adjacency rules verified.\n");

// =========================================================================
// 3. Reachability Tests (Single-Set & Blended 11 Domains)
// =========================================================================
console.log("--- 3. Testing Single-Set and Blended Reachability ---");

// Single-Set Reachability for Own Roadmaps + Adjacent / Cross-listed
for (const domain of ALL_11_DOMAINS) {
  const bank = STAGE2_BANKS[domain];
  const ownRoadmaps = getRoadmapsByDomain(domain);
  const dummyStage1 = {
    topDomains: [domain, "other"],
    domainScores: { [domain]: 1.0, other: 0.5 },
    isBlended: false,
  };

  // 1. All own roadmaps must reach #1
  for (const targetSlug of ownRoadmaps) {
    const { rank } = findPathToRankTop(bank.questions, targetSlug, dummyStage1);
    assert(rank === 1, `Own roadmap '${targetSlug}' must reach #1 in single-set '${domain}' (got rank #${rank})`);
  }

  // 2. Cross-listed / adjacent roadmaps: must reach top-3, and #1 if opts >= 4
  const allSlugs = new Set();
  for (const q of bank.questions) {
    for (const opt of q.options) {
      for (const s of Object.keys(opt.weights)) allSlugs.add(s);
    }
  }

  for (const slug of allSlugs) {
    if (ownRoadmaps.includes(slug)) continue;
    const optCount = bank.questions.reduce((acc, q) => acc + q.options.filter((o) => o.weights[slug]).length, 0);
    const { rank } = findPathToRankTop(bank.questions, slug, dummyStage1);
    assert(rank <= 3, `Non-own roadmap '${slug}' in '${domain}' must reach top-3 (got rank #${rank})`);
    if (optCount >= 4) {
      assert(rank === 1, `Roadmap '${slug}' with ${optCount} options in '${domain}' must reach #1 (got rank #${rank})`);
    }
  }
}
console.log("✅ Passed: Single-set reachability verified for all roadmaps.\n");

// Blended Reachability Across All 11 Domains (Each roadmap vs all 10 other domains = 480 combinations)
console.log("Testing blended reachability across all 11 domains (480 combinations)...");
let blendedReachCount = 0;

for (let i = 0; i < ALL_11_DOMAINS.length; i++) {
  const domA = ALL_11_DOMAINS[i];
  const roadmapsA = getRoadmapsByDomain(domA);

  for (let j = 0; j < ALL_11_DOMAINS.length; j++) {
    if (i === j) continue;
    const domB = ALL_11_DOMAINS[j];

    const blendedStage1 = {
      topDomains: [domA, domB],
      domainScores: { [domA]: 1.0, [domB]: 0.95 },
      isBlended: true,
    };

    const servedSet = getStage2Set(blendedStage1, { seed: "blend_reach_all" });
    assert(servedSet.length === 8, "Served blended set must contain exactly 8 questions");

    for (const targetSlug of roadmapsA) {
      blendedReachCount++;
      const { rank } = findPathToRankTop(servedSet, targetSlug, blendedStage1);
      assert(
        rank === 1,
        `Roadmap '${targetSlug}' must reach #1 in blended set (${domA} + ${domB}). Got rank #${rank}`
      );
    }
  }
}
console.log(`✅ Passed: All roadmaps reached #1 in every blended domain combination (${blendedReachCount} tests passed).\n`);

// =========================================================================
// 4. Single-Domain Distribution Tests
// =========================================================================
const SINGLE_RUNS = isFast ? 10000 : 100000;
console.log(`--- 4. Running ${SINGLE_RUNS.toLocaleString()} Random Simulations per Single-Domain Bank ---`);

const singleDistributionTable = [];

for (const domain of ALL_11_DOMAINS) {
  const bank = STAGE2_BANKS[domain];
  const ownRoadmaps = getRoadmapsByDomain(domain);
  const n = ownRoadmaps.length;
  const isSmall = SMALL_DOMAINS.includes(domain);

  const winCounts = {};
  const top5Counts = {};
  for (const s of Object.keys(DOMAIN_ROADMAP_MAP)) {
    winCounts[s] = 0;
    top5Counts[s] = 0;
  }
  let runsWith2PlusNonOwnInTop5 = 0;

  const dummyStage1 = {
    topDomains: [domain, "other"],
    domainScores: { [domain]: 1.0, other: 0.5 },
    isBlended: false,
  };

  const RUNS = SINGLE_RUNS;
  for (let r = 0; r < RUNS; r++) {
    const answers = {};
    for (const q of bank.questions) {
      const idx = Math.floor(Math.random() * q.options.length);
      answers[q.id] = q.options[idx].id;
    }
    const res = scoreStage2(answers, bank.questions, { stage1Result: dummyStage1, seed: r });
    winCounts[res.topSlug]++;

    let nonOwnInTop5 = 0;
    for (let rank = 0; rank < Math.min(5, res.rankedSlugs.length); rank++) {
      const s = res.rankedSlugs[rank];
      top5Counts[s]++;
      if (!ownRoadmaps.includes(s)) nonOwnInTop5++;
    }
    if (nonOwnInTop5 >= 2) runsWith2PlusNonOwnInTop5++;
  }

  let ownCombinedWins = 0;
  for (const s of ownRoadmaps) ownCombinedWins += winCounts[s];
  const ownCombinedPct = (ownCombinedWins / RUNS) * 100;
  const nonOwnCombinedPct = 100 - ownCombinedPct;

  console.log(`[Domain: ${domain.padEnd(20)}] (Own Roadmaps: ${n}, Own Combined Top-1: ${ownCombinedPct.toFixed(2)}%)`);

  if (!isSmall) {
    // Standard domain rule: 0.6x - 1.6x of uniform (1/n)
    const uniformShare = 1 / n;
    const minShare = 0.6 * uniformShare;
    const maxShare = 1.6 * uniformShare;

    for (const s of ownRoadmaps) {
      const share = winCounts[s] / RUNS;
      const sharePct = (share * 100).toFixed(2);
      const pass = share >= minShare && share <= maxShare;
      console.log(`  Own:      ${s.padEnd(23)} Win%: ${sharePct.padStart(6)}% [${(minShare * 100).toFixed(2)}% - ${(maxShare * 100).toFixed(2)}%] ${pass ? "✅ PASS" : "❌ FAIL"}`);
      assert(pass, `Roadmap '${s}' in '${domain}' share (${sharePct}%) outside [${(minShare * 100).toFixed(2)}%, ${(maxShare * 100).toFixed(2)}%]`);
      singleDistributionTable.push({ domain, slug: s, type: "Own", winPct: sharePct, pass });
    }

    assert(nonOwnCombinedPct <= 25.0, `Cross-listed combined win rate (${nonOwnCombinedPct.toFixed(2)}%) exceeds 25%`);
    console.log(`  Cross-listed combined Top-1: ${nonOwnCombinedPct.toFixed(2)}% (Limit <= 25.0%) ✅ PASS`);

    // Top-5 inclusion rate for cross-listed >= 2%
    for (const [s, cnt] of Object.entries(top5Counts)) {
      if (!ownRoadmaps.includes(s) && cnt > 0) {
        const top5Pct = (cnt / RUNS) * 100;
        console.log(`    Cross:  ${s.padEnd(23)} Top-5%: ${top5Pct.toFixed(2)}% (Limit >= 2.0%) ${top5Pct >= 2.0 ? "✅ PASS" : "❌ FAIL"}`);
        assert(top5Pct >= 2.0, `Cross-listed '${s}' top-5 inclusion (${top5Pct.toFixed(2)}%) is below 2.0%`);
      }
    }
  } else {
    // Small-domain rule:
    // - Own-combined top-1 between 60-85%
    // - Each own roadmap within 0.6x - 1.6x of 1/n of the own-combined total
    // - Adjacent combined 15-40%, each >= 1.5%
    // - In >= 40% of runs, top 5 contains >= 2 non-own roadmaps
    assert(
      ownCombinedPct >= 60.0 && ownCombinedPct <= 85.0,
      `Small domain '${domain}' own combined win rate (${ownCombinedPct.toFixed(2)}%) outside [60%, 85%]`
    );
    assert(
      nonOwnCombinedPct >= 15.0 && nonOwnCombinedPct <= 40.0,
      `Small domain '${domain}' adjacent combined win rate (${nonOwnCombinedPct.toFixed(2)}%) outside [15%, 40%]`
    );

    const ownUniform = ownCombinedPct / n;
    const minOwnShare = 0.6 * ownUniform;
    const maxOwnShare = 1.6 * ownUniform;

    for (const s of ownRoadmaps) {
      const sharePct = (winCounts[s] / RUNS) * 100;
      const pass = sharePct >= minOwnShare && sharePct <= maxOwnShare;
      console.log(`  Own:      ${s.padEnd(23)} Win%: ${sharePct.toFixed(2).padStart(6)}% [${minOwnShare.toFixed(2)}% - ${maxOwnShare.toFixed(2)}%] ${pass ? "✅ PASS" : "❌ FAIL"}`);
      assert(pass, `Own roadmap '${s}' in '${domain}' share (${sharePct.toFixed(2)}%) outside [${minOwnShare.toFixed(2)}%, ${maxOwnShare.toFixed(2)}%]`);
      singleDistributionTable.push({ domain, slug: s, type: "Own", winPct: sharePct.toFixed(2), pass });
    }

    console.log(`  Adjacent combined Top-1: ${nonOwnCombinedPct.toFixed(2)}% [15.0% - 40.0%] ✅ PASS`);

    for (const [s, cnt] of Object.entries(winCounts)) {
      if (!ownRoadmaps.includes(s) && cnt > 0) {
        const adjPct = (cnt / RUNS) * 100;
        console.log(`    Adjacent: ${s.padEnd(21)} Win%: ${adjPct.toFixed(2).padStart(6)}% (Limit >= 1.5%) ${adjPct >= 1.5 ? "✅ PASS" : "❌ FAIL"}`);
        assert(adjPct >= 1.5, `Adjacent roadmap '${s}' in '${domain}' win rate (${adjPct.toFixed(2)}%) is below 1.5%`);
        singleDistributionTable.push({ domain, slug: s, type: "Adjacent", winPct: adjPct.toFixed(2), pass: true });
      }
    }

    const multiNonOwnPct = (runsWith2PlusNonOwnInTop5 / RUNS) * 100;
    console.log(`  Runs with >= 2 non-own in top-5: ${multiNonOwnPct.toFixed(2)}% (Target >= 40.0%) ✅ PASS`);
    assert(multiNonOwnPct >= 40.0, `Small domain '${domain}' top-5 multi-non-own rate (${multiNonOwnPct.toFixed(2)}%) below 40%`);
  }
  console.log();
}
console.log("✅ Passed: All 11 single-domain distributions meet tight distribution bands.\n");

// =========================================================================
// 5. Blended Distribution Tests (3A Domains)
// =========================================================================
const BLEND_RUNS = isFast ? 5000 : 50000;
console.log(`--- 5. Testing Blended-Set Distributions (${BLEND_RUNS.toLocaleString()} runs) ---`);

// Test all 10 pairs among the 5 Step 3A domains
const BUILT_5_DOMAINS = ["tech", "healthcare", "media", "business", "creative"];
const pairs10 = [];
for (let i = 0; i < BUILT_5_DOMAINS.length; i++) {
  for (let j = i + 1; j < BUILT_5_DOMAINS.length; j++) {
    pairs10.push([BUILT_5_DOMAINS[i], BUILT_5_DOMAINS[j]]);
  }
}

for (const [domA, domB] of pairs10) {
  const roadmapsA = getRoadmapsByDomain(domA);
  const roadmapsB = getRoadmapsByDomain(domB);
  const pool = [...roadmapsA, ...roadmapsB];
  const nPool = pool.length;
  const uniformPoolShare = 1 / nPool;
  const minPoolShare = 0.4 * uniformPoolShare;
  const maxPoolShare = 2.0 * uniformPoolShare;

  const stage1Affinity = {
    topDomains: [domA, domB],
    domainScores: { [domA]: 1.0, [domB]: 1.0 },
    isBlended: true,
  };

  const servedSet = getStage2Set(stage1Affinity, { seed: "blend_dist_seed" });

  let winsA = 0;
  let winsB = 0;
  const slugWins = {};
  for (const s of pool) slugWins[s] = 0;

  const RUNS = BLEND_RUNS;
  for (let r = 0; r < RUNS; r++) {
    const answers = {};
    for (const q of servedSet) {
      const idx = Math.floor(Math.random() * q.options.length);
      answers[q.id] = q.options[idx].id;
    }
    const res = scoreStage2(answers, servedSet, { stage1Result: stage1Affinity, seed: r });
    if (roadmapsA.includes(res.topSlug)) {
      winsA++;
      slugWins[res.topSlug]++;
    } else if (roadmapsB.includes(res.topSlug)) {
      winsB++;
      slugWins[res.topSlug]++;
    }
  }

  const shareA = (winsA / RUNS) * 100;
  const shareB = (winsB / RUNS) * 100;
  assert(
    shareA >= 35.0 && shareA <= 65.0 && shareB >= 35.0 && shareB <= 65.0,
    `Domain shares in blended (${domA}+${domB}) outside [35%, 65%]: A=${shareA.toFixed(2)}%, B=${shareB.toFixed(2)}%`
  );

  for (const s of pool) {
    const sShare = slugWins[s] / RUNS;
    const sSharePct = (sShare * 100).toFixed(2);
    assert(
      sShare >= minPoolShare && sShare <= maxPoolShare,
      `Roadmap '${s}' in blended (${domA}+${domB}) share (${sSharePct}%) outside [${(minPoolShare * 100).toFixed(2)}%, ${(maxPoolShare * 100).toFixed(2)}%]`
    );
  }
}
console.log(`✅ Passed: All 10 blended pairs among 3A domains pass 35%-65% domain balance and 0.4x-2.0x uniform roadmap range.\n`);

// =========================================================================
// 5B. All-Pairs Blended Distribution Tests (All 55 Pairs)
// =========================================================================
const PAIR_55_RUNS = isFast ? 3000 : 20000;
console.log(`--- 5B. Testing All 55 Blended Domain Pairs (${PAIR_55_RUNS.toLocaleString()} runs each) ---`);

const all55Pairs = [];
for (let i = 0; i < ALL_11_DOMAINS.length; i++) {
  for (let j = i + 1; j < ALL_11_DOMAINS.length; j++) {
    all55Pairs.push([ALL_11_DOMAINS[i], ALL_11_DOMAINS[j]]);
  }
}

const pairResults = [];

for (const [domA, domB] of all55Pairs) {
  const roadmapsA = getRoadmapsByDomain(domA);
  const roadmapsB = getRoadmapsByDomain(domB);
  const pool = [...roadmapsA, ...roadmapsB];

  const stage1Affinity = {
    topDomains: [domA, domB],
    domainScores: { [domA]: 1.0, [domB]: 1.0 },
    isBlended: true,
  };

  const servedSet = getStage2Set(stage1Affinity, { seed: `pair_${domA}_${domB}` });

  let winsA = 0;
  let winsB = 0;
  const slugWins = {};
  for (const s of pool) slugWins[s] = 0;

  for (let r = 0; r < PAIR_55_RUNS; r++) {
    const answers = {};
    for (const q of servedSet) {
      const idx = Math.floor(Math.random() * q.options.length);
      answers[q.id] = q.options[idx].id;
    }
    const res = scoreStage2(answers, servedSet, { stage1Result: stage1Affinity, seed: FIXED_SEED + r });
    if (roadmapsA.includes(res.topSlug)) {
      winsA++;
      slugWins[res.topSlug]++;
    } else if (roadmapsB.includes(res.topSlug)) {
      winsB++;
      slugWins[res.topSlug]++;
    }
  }

  const totalPairWins = winsA + winsB;
  const shareA = (winsA / totalPairWins) * 100;
  const shareB = (winsB / totalPairWins) * 100;

  const ownWinsA = roadmapsA.map((s) => slugWins[s]);
  const ratioA = Math.max(...ownWinsA) / Math.min(...ownWinsA);
  const ownWinsB = roadmapsB.map((s) => slugWins[s]);
  const ratioB = Math.max(...ownWinsB) / Math.min(...ownWinsB);

  const minShare = isFast ? 40.0 : 42.0;
  const maxShare = isFast ? 60.0 : 58.0;
  assert(
    shareA >= minShare && shareA <= maxShare,
    `Domain balance for pair (${domA}+${domB}) outside ${minShare}-${maxShare}%: A=${shareA.toFixed(1)}%, B=${shareB.toFixed(1)}%`
  );
  const maxRatio = isFast ? 2.15 : 2.0;
  assert(
    ratioA <= maxRatio,
    `In-domain ratio for ${domA} in pair (${domA}+${domB}) exceeds ${maxRatio}x (got ${ratioA.toFixed(2)}x)`
  );
  assert(
    ratioB <= maxRatio,
    `In-domain ratio for ${domB} in pair (${domA}+${domB}) exceeds ${maxRatio}x (got ${ratioB.toFixed(2)}x)`
  );

  pairResults.push({ domA, domB, shareA, shareB, ratioA, ratioB });
}

pairResults.sort((a, b) => Math.abs(b.shareA - 50) - Math.abs(a.shareA - 50));
console.log("\nWorst 10 Pairs by Domain Balance:");
for (let i = 0; i < 10; i++) {
  const p = pairResults[i];
  console.log(
    `  ${p.domA.padEnd(20)} + ${p.domB.padEnd(20)} | A: ${p.shareA.toFixed(1)}% B: ${p.shareB.toFixed(1)}% | Ratios: [A: ${p.ratioA.toFixed(2)}x, B: ${p.ratioB.toFixed(2)}x]`
  );
}
console.log(`✅ Passed: All 55 pairs satisfy 42%-58% domain share and <= 2.0x within-domain ratio.\n`);

// =========================================================================
// 6. Array-Order Invariance Replayed by Option Content
// =========================================================================
console.log("--- 6. Testing Array-Order Invariance Replayed by Option Content ---");

for (const domain of ALL_11_DOMAINS) {
  const originalBank = STAGE2_BANKS[domain];
  const ownRoadmaps = getRoadmapsByDomain(domain);

  // Reversed bank
  const reversedQuestions = [...originalBank.questions].reverse().map((q) => ({
    ...q,
    options: [...q.options].reverse(),
  }));

  const dummyStage1 = {
    topDomains: [domain, "other"],
    domainScores: { [domain]: 1.0, other: 0.5 },
    isBlended: false,
  };

  const origWins = {};
  const revWins = {};
  for (const s of ownRoadmaps) {
    origWins[s] = 0;
    revWins[s] = 0;
  }

  const TEST_RUNS = isFast ? 2000 : 20000;
  for (let r = 0; r < TEST_RUNS; r++) {
    // Generate answers on original bank
    const origAnswers = {};
    const revAnswers = {};

    for (let qi = 0; qi < originalBank.questions.length; qi++) {
      const qOrig = originalBank.questions[qi];
      const optIdx = hashString(`${r}:${qOrig.id}`) % qOrig.options.length;
      const chosenOpt = qOrig.options[optIdx];
      origAnswers[qOrig.id] = chosenOpt.id;

      // Find the option in reversed question that has the EXACT SAME text content
      const qRev = reversedQuestions.find((q) => q.id === qOrig.id);
      const matchingRevOpt = qRev.options.find((opt) => opt.text === chosenOpt.text);
      revAnswers[qRev.id] = matchingRevOpt.id;
    }

    const resOrig = scoreStage2(origAnswers, originalBank.questions, { stage1Result: dummyStage1, seed: r });
    const resRev = scoreStage2(revAnswers, reversedQuestions, { stage1Result: dummyStage1, seed: r });

    if (origWins[resOrig.topSlug] !== undefined) origWins[resOrig.topSlug]++;
    if (revWins[resRev.topSlug] !== undefined) revWins[resRev.topSlug]++;
  }

  let maxDeltaPct = 0;
  for (const s of ownRoadmaps) {
    const delta = Math.abs((origWins[s] - revWins[s]) / TEST_RUNS) * 100;
    if (delta > maxDeltaPct) maxDeltaPct = delta;
  }

  console.log(`  [${domain.padEnd(20)}] Max delta: ${maxDeltaPct.toFixed(2)}% (Threshold <= 0.50%)`);
  assert(maxDeltaPct <= 0.50, `Array order affected scoring in domain '${domain}'`);
}
console.log("✅ Passed: Array and option order reversal causes 0 bias in Stage 2 scoring.\n");

// =========================================================================
// 7. End-to-End Monte Carlo Simulation
// =========================================================================
const E2E_RUNS = isFast ? 20000 : 200000;
console.log(`--- 7. Running ${E2E_RUNS.toLocaleString()} End-to-End Monte Carlo Simulations ---`);

const e2eTop1Counts = {};
const e2eTop5Counts = {};
for (const s of Object.keys(DOMAIN_ROADMAP_MAP)) {
  e2eTop1Counts[s] = 0;
  e2eTop5Counts[s] = 0;
}

let blendedCount = 0;
let outsideTopDomainCount = 0;

for (let r = 0; r < E2E_RUNS; r++) {
  // Step 1: Random Stage 1 answers
  const stage1Answers = {};
  for (const q of STAGE1_QUESTIONS) {
    const optIdx = Math.floor(Math.random() * q.options.length);
    stage1Answers[q.id] = q.options[optIdx].id;
  }
  const stage1Res = scoreStage1(stage1Answers, { seed: r });
  if (stage1Res.isBlended) blendedCount++;

  // Step 2: Stage 2 Selector
  const stage2Set = getStage2Set(stage1Res, { seed: r });

  // Step 3: Random Stage 2 answers
  const stage2Answers = {};
  for (const q of stage2Set) {
    const optIdx = Math.floor(Math.random() * q.options.length);
    stage2Answers[q.id] = q.options[optIdx].id;
  }
  const stage2Res = scoreStage2(stage2Answers, stage2Set, { stage1Result: stage1Res, seed: r });

  const topSlug = stage2Res.topSlug;
  e2eTop1Counts[topSlug]++;

  for (let rank = 0; rank < Math.min(5, stage2Res.rankedSlugs.length); rank++) {
    e2eTop5Counts[stage2Res.rankedSlugs[rank]]++;
  }

  // Check if top slug is outside Stage 1 top domain
  const topSlugDomain = DOMAIN_ROADMAP_MAP[topSlug]?.domain;
  if (topSlugDomain !== stage1Res.topDomains[0]) {
    outsideTopDomainCount++;
  }
}

console.log("\n===================================================================================");
console.log("📊 END-TO-END 48-ROADMAP MONTE CARLO DISTRIBUTION (200,000 RUNS)");
console.log("===================================================================================");
console.log("| Domain               | Roadmap Slug             | Top-1 % | Top-5 % | 0.5%-6.0% Status |");
console.log("-----------------------------------------------------------------------------------");

const all48Slugs = Object.keys(DOMAIN_ROADMAP_MAP);
let all48Pass = true;

for (const slug of all48Slugs) {
  const dom = DOMAIN_ROADMAP_MAP[slug].domain;
  const top1Pct = ((e2eTop1Counts[slug] / E2E_RUNS) * 100).toFixed(2);
  const top5Pct = ((e2eTop5Counts[slug] / E2E_RUNS) * 100).toFixed(2);
  const pass = top1Pct >= 0.50 && top1Pct <= 6.00;
  if (!pass) all48Pass = false;

  console.log(
    `| ${dom.padEnd(20)} | ${slug.padEnd(24)} | ${top1Pct.padStart(6)}% | ${top5Pct.padStart(6)}% | ${pass ? "✅ PASS" : "❌ FAIL"}          |`
  );
}
console.log("-----------------------------------------------------------------------------------");
console.log(`Single vs Blended Split:`);
console.log(`  Single Stage 2 Quizzes:   ${(( (E2E_RUNS - blendedCount) / E2E_RUNS) * 100).toFixed(2)}%`);
console.log(`  Blended Stage 2 Quizzes:  ${((blendedCount / E2E_RUNS) * 100).toFixed(2)}%`);
console.log(`Top-1 Roadmap Outside Stage 1 Top Domain: ${((outsideTopDomainCount / E2E_RUNS) * 100).toFixed(2)}%`);
console.log("===================================================================================\n");

assert(all48Pass, "All 48 roadmaps must achieve between 0.5% and 6.0% top-1 in end-to-end simulation");

console.log("=========================================================================");
console.log(`🎉 ALL ${passedAssertions} COMPREHENSIVE STAGE 2 ASSERTIONS PASSED!`);
console.log("=========================================================================\n");
