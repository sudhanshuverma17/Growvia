import { DOMAINS, DOMAIN_ROADMAP_MAP, getRoadmapsByDomain } from "../config/quizDomains.js";
import {
  STAGE2_BANKS,
  validateBank,
  getStage2Set,
  scoreStage2,
} from "../services/stage2Selector.js";

const BUILT_DOMAINS = ["tech", "healthcare", "media", "business", "creative"];

console.log("=========================================================================");
console.log("🧪 TESTING 3A FIXES: Single-Set (0.6x-1.6x) & Blended 10-Pair Distribution");
console.log("=========================================================================\n");

// 1. Single Set 0.6x - 1.6x Test
for (const domain of BUILT_DOMAINS) {
  const bank = STAGE2_BANKS[domain];
  const ownRoadmaps = getRoadmapsByDomain(domain);
  const n = ownRoadmaps.length;
  const uniformShare = 1 / n;
  const minShare = 0.6 * uniformShare;
  const maxShare = 1.6 * uniformShare;

  const winCounts = {};
  const top5Counts = {};
  for (const s of Object.keys(DOMAIN_ROADMAP_MAP)) {
    winCounts[s] = 0;
    top5Counts[s] = 0;
  }
  let crossListedWins = 0;

  const stage1Affinity = {
    topDomains: [domain, "dummy"],
    domainScores: { [domain]: 1.0, dummy: 0.5 },
    isBlended: false,
  };

  const RUNS = 50000;
  for (let r = 0; r < RUNS; r++) {
    const answers = {};
    for (const q of bank.questions) {
      const idx = Math.floor(Math.random() * q.options.length);
      answers[q.id] = q.options[idx].id;
    }
    const res = scoreStage2(answers, bank.questions, { stage1Result: stage1Affinity, seed: r });
    winCounts[res.topSlug]++;
    if (!ownRoadmaps.includes(res.topSlug)) crossListedWins++;

    for (let rank = 0; rank < Math.min(5, res.rankedSlugs.length); rank++) {
      top5Counts[res.rankedSlugs[rank]]++;
    }
  }

  console.log(`[Domain: ${domain}] (n=${n}, Uniform: ${(uniformShare * 100).toFixed(2)}%, Allowed: ${(minShare * 100).toFixed(2)}% - ${(maxShare * 100).toFixed(2)}%)`);
  for (const s of ownRoadmaps) {
    const pct = ((winCounts[s] / RUNS) * 100).toFixed(2);
    const pass = winCounts[s] / RUNS >= minShare && winCounts[s] / RUNS <= maxShare;
    console.log(`  ${s.padEnd(23)} Win%: ${pct}% ${pass ? "✅ PASS" : "❌ FAIL"}`);
  }
  const crossTop1Pct = ((crossListedWins / RUNS) * 100).toFixed(2);
  console.log(`  Cross-listed combined Top-1: ${crossTop1Pct}% (Limit <= 25%)`);

  // Cross-listed top-5 inclusion rates
  const crossInBank = Object.keys(winCounts).filter(
    (s) => !ownRoadmaps.includes(s) && top5Counts[s] > 0
  );
  console.log("  Cross-listed Top-5 inclusion rates:");
  for (const cs of crossInBank) {
    const top5Pct = ((top5Counts[cs] / RUNS) * 100).toFixed(2);
    const pass = top5Counts[cs] / RUNS >= 0.02;
    console.log(`    ${cs.padEnd(22)} Top-5%: ${top5Pct}% ${pass ? "✅ (>=2%)" : "❌ (<2%)"}`);
  }
  console.log();
}

// 2. Blended 10-Pair Distribution Test (50,000 runs each)
console.log("=========================================================================");
console.log("🧪 TESTING BLENDED 10-PAIR DISTRIBUTIONS (50,000 runs each)");
console.log("=========================================================================\n");

const pairs = [];
for (let i = 0; i < BUILT_DOMAINS.length; i++) {
  for (let j = i + 1; j < BUILT_DOMAINS.length; j++) {
    pairs.push([BUILT_DOMAINS[i], BUILT_DOMAINS[j]]);
  }
}

for (const [domA, domB] of pairs) {
  const roadmapsA = getRoadmapsByDomain(domA);
  const roadmapsB = getRoadmapsByDomain(domB);
  const poolRoadmaps = [...roadmapsA, ...roadmapsB];
  const nPool = poolRoadmaps.length;
  const uniformPoolShare = 1 / nPool;
  const minPoolShare = 0.4 * uniformPoolShare;
  const maxPoolShare = 2.0 * uniformPoolShare;

  const stage1Affinity = {
    topDomains: [domA, domB],
    domainScores: { [domA]: 1.0, [domB]: 1.0 }, // Equal Stage 1 affinity
    isBlended: true,
  };

  const servedSet = getStage2Set(stage1Affinity, { seed: "blend_eval" });

  let winsA = 0;
  let winsB = 0;
  let otherWins = 0;
  const slugWins = {};
  for (const s of poolRoadmaps) slugWins[s] = 0;

  const RUNS = 50000;
  for (let r = 0; r < RUNS; r++) {
    const answers = {};
    for (const q of servedSet) {
      const idx = Math.floor(Math.random() * q.options.length);
      answers[q.id] = q.options[idx].id;
    }
    const res = scoreStage2(answers, servedSet, { stage1Result: stage1Affinity, seed: r });
    const top = res.topSlug;

    if (roadmapsA.includes(top)) {
      winsA++;
      slugWins[top]++;
    } else if (roadmapsB.includes(top)) {
      winsB++;
      slugWins[top]++;
    } else {
      otherWins++;
    }
  }

  const shareA = (winsA / RUNS) * 100;
  const shareB = (winsB / RUNS) * 100;
  const passDomainShares = shareA >= 35.0 && shareA <= 65.0 && shareB >= 35.0 && shareB <= 65.0;

  console.log(`[Pair: ${domA} (${roadmapsA.length}) + ${domB} (${roadmapsB.length})]`);
  console.log(`  Domain A (${domA}) share: ${shareA.toFixed(2)}% | Domain B (${domB}) share: ${shareB.toFixed(2)}% ${passDomainShares ? "✅ PASS (35-65%)" : "❌ FAIL"}`);

  let allRoadmapsPass = true;
  for (const s of poolRoadmaps) {
    const sShare = slugWins[s] / RUNS;
    const sSharePct = (sShare * 100).toFixed(2);
    const pass = sShare >= minPoolShare && sShare <= maxPoolShare;
    if (!pass) {
      allRoadmapsPass = false;
      console.log(`    ⚠️ Roadmap '${s}' share ${sSharePct}% outside [${(minPoolShare * 100).toFixed(2)}%, ${(maxPoolShare * 100).toFixed(2)}%]`);
    }
  }
  if (allRoadmapsPass) {
    console.log(`  All ${nPool} pool roadmaps within 0.4x - 2.0x uniform ✅ PASS`);
  }
  console.log();
}
