import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";

const SMALL_DOMAINS = ["engineering", "law_gov", "education_social", "aviation_hospitality", "science"];
import { scoreStage2 } from "../services/stage2Selector.js";
import { generateBank } from "./pureBankGen.js";

const banks = {};
for (const dom of DOMAINS) {
  banks[dom] = generateBank(dom);
}

const ownMap = {};
for (const dom of DOMAINS) ownMap[dom] = getRoadmapsByDomain(dom);

console.log("=== 1. Testing Single-Domain Distributions (10,000 runs) ===");
let singleFailures = 0;

for (const dom of DOMAINS) {
  const bank = banks[dom];
  const ownRoadmaps = ownMap[dom];
  const isSmall = SMALL_DOMAINS.includes(dom);
  const n = ownRoadmaps.length;

  const winCounts = {};
  for (const q of bank.questions) {
    for (const opt of q.options) {
      for (const s of Object.keys(opt.weights)) winCounts[s] = 0;
    }
  }

  const RUNS = 10000;
  const dummyStage1 = { topDomains: [dom, "other"], domainScores: { [dom]: 1.0, other: 0.5 }, isBlended: false };

  for (let r = 0; r < RUNS; r++) {
    const answers = {};
    for (const q of bank.questions) {
      const idx = Math.floor(Math.random() * q.options.length);
      answers[q.id] = q.options[idx].id;
    }
    const res = scoreStage2(answers, bank.questions, { stage1Result: dummyStage1, seed: 1337 + r });
    winCounts[res.topSlug]++;
  }

  let ownCombinedWins = 0;
  for (const s of ownRoadmaps) ownCombinedWins += winCounts[s];
  const ownCombinedPct = (ownCombinedWins / RUNS) * 100;
  const nonOwnCombinedPct = 100 - ownCombinedPct;

  console.log(`[${dom.padEnd(20)}] Own: ${ownCombinedPct.toFixed(1)}%, Non-own: ${nonOwnCombinedPct.toFixed(1)}%`);

  if (!isSmall) {
    const uniformShare = 1 / n;
    for (const s of ownRoadmaps) {
      const share = winCounts[s] / RUNS;
      if (share < 0.6 * uniformShare || share > 1.6 * uniformShare) {
        console.log(`  ❌ Own '${s}' share ${(share*100).toFixed(2)}% outside bounds`);
        singleFailures++;
      }
    }
    if (nonOwnCombinedPct > 25.0) {
      console.log(`  ❌ Non-own combined ${nonOwnCombinedPct.toFixed(1)}% > 25%`);
      singleFailures++;
    }
  } else {
    if (ownCombinedPct < 60.0 || ownCombinedPct > 85.0) {
      console.log(`  ❌ Small domain '${dom}' own combined ${ownCombinedPct.toFixed(1)}% outside [60, 85]`);
      singleFailures++;
    }
    const ownUniform = ownCombinedPct / n;
    for (const s of ownRoadmaps) {
      const sharePct = (winCounts[s] / RUNS) * 100;
      if (sharePct < 0.6 * ownUniform || sharePct > 1.6 * ownUniform) {
        console.log(`  ❌ Own '${s}' share ${sharePct.toFixed(2)}% outside bounds`);
        singleFailures++;
      }
    }
    for (const [s, cnt] of Object.entries(winCounts)) {
      if (!ownRoadmaps.includes(s) && cnt > 0) {
        const adjPct = (cnt / RUNS) * 100;
        if (adjPct < 1.5) {
          console.log(`  ❌ Adj '${s}' share ${adjPct.toFixed(2)}% < 1.5%`);
          singleFailures++;
        }
      }
    }
  }
}
console.log(`Single failures: ${singleFailures}`);

console.log("\n=== 2. Testing All 55 Blended Pairs (3,000 runs each) ===");
const pairs = [];
for (let i = 0; i < DOMAINS.length; i++) {
  for (let j = i + 1; j < DOMAINS.length; j++) {
    pairs.push([DOMAINS[i], DOMAINS[j]]);
  }
}

let pairFailures = 0;
const pairResults = [];

for (const [domA, domB] of pairs) {
  const bankA = banks[domA];
  const bankB = banks[domB];
  const roadmapsA = ownMap[domA];
  const roadmapsB = ownMap[domB];

  // Interleave 4 blendCore questions
  const coreA = bankA.questions.filter(q => q.blendCore).slice(0, 4);
  const coreB = bankB.questions.filter(q => q.blendCore).slice(0, 4);
  const servedSet = [];
  for (let i = 0; i < 4; i++) {
    servedSet.push(coreA[i]);
    servedSet.push(coreB[i]);
  }

  const stage1Affinity = {
    topDomains: [domA, domB],
    domainScores: { [domA]: 1.0, [domB]: 1.0 },
    isBlended: true
  };

  let winsA = 0, winsB = 0;
  const slugWins = {};
  for (const s of [...roadmapsA, ...roadmapsB]) slugWins[s] = 0;

  const RUNS = 3000;
  for (let r = 0; r < RUNS; r++) {
    const answers = {};
    for (const q of servedSet) {
      const idx = Math.floor(Math.random() * q.options.length);
      answers[q.id] = q.options[idx].id;
    }
    const res = scoreStage2(answers, servedSet, { stage1Result: stage1Affinity, seed: 1337 + r });
    if (roadmapsA.includes(res.topSlug)) {
      winsA++;
      slugWins[res.topSlug]++;
    } else if (roadmapsB.includes(res.topSlug)) {
      winsB++;
      slugWins[res.topSlug]++;
    }
  }

  const totalWins = winsA + winsB;
  const shareA = (winsA / totalWins) * 100;
  const shareB = (winsB / totalWins) * 100;

  const ownWinsA = roadmapsA.map(s => slugWins[s]);
  const ratioA = Math.max(...ownWinsA) / Math.min(...ownWinsA);
  const ownWinsB = roadmapsB.map(s => slugWins[s]);
  const ratioB = Math.max(...ownWinsB) / Math.min(...ownWinsB);

  const pass = shareA >= 42.0 && shareA <= 58.0 && ratioA <= 2.0 && ratioB <= 2.0;
  if (!pass) {
    pairFailures++;
    console.log(`❌ Pair (${domA}+${domB}) FAIL: shareA=${shareA.toFixed(1)}%, ratioA=${ratioA.toFixed(2)}x, ratioB=${ratioB.toFixed(2)}x`);
  }
  pairResults.push({ domA, domB, shareA, shareB, ratioA, ratioB, pass });
}

console.log(`Pair failures: ${pairFailures} / 55`);
