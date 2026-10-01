import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { getStage2Set, scoreStage2 } from "../services/stage2Selector.js";

const RUNS_PER_PAIR = 20000;
console.log(`Running all 55 blended pairs at ${RUNS_PER_PAIR.toLocaleString()} runs each (full simulation)...`);

const all55Pairs = [];
for (let i = 0; i < DOMAINS.length; i++) {
  for (let j = i + 1; j < DOMAINS.length; j++) {
    all55Pairs.push([DOMAINS[i], DOMAINS[j]]);
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

  for (let r = 0; r < RUNS_PER_PAIR; r++) {
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

  const totalPairWins = winsA + winsB;
  const shareA = (winsA / totalPairWins) * 100;
  const shareB = (winsB / totalPairWins) * 100;

  const ownWinsA = roadmapsA.map((s) => slugWins[s]);
  const ratioA = Math.max(...ownWinsA) / Math.min(...ownWinsA);
  const ownWinsB = roadmapsB.map((s) => slugWins[s]);
  const ratioB = Math.max(...ownWinsB) / Math.min(...ownWinsB);

  const maxRatio = Math.max(ratioA, ratioB);
  const devFrom50 = Math.abs(shareA - 50);

  pairResults.push({
    domA,
    domB,
    shareA: shareA.toFixed(2),
    shareB: shareB.toFixed(2),
    ratioA: ratioA.toFixed(2),
    ratioB: ratioB.toFixed(2),
    maxRatio,
    devFrom50,
    passShare: shareA >= 42.0 && shareA <= 58.0,
    passRatio: ratioA <= 2.0 && ratioB <= 2.0,
  });
}

// 1. Worst 10 by share deviation
pairResults.sort((a, b) => b.devFrom50 - a.devFrom50);
const worst10Share = pairResults.slice(0, 10);

console.log("\n=========================================================================");
console.log("📊 55 BLENDED PAIRS (20,000 RUNS EACH) - WORST 10 BY SHARE DEVIATION");
console.log("=========================================================================");
console.log("| Pair (Domain A + Domain B)              | Share A | Share B | Ratio A | Ratio B | Status |");
console.log("-----------------------------------------------------------------------------------------");
for (const p of worst10Share) {
  const pairName = `${p.domA} + ${p.domB}`.padEnd(39);
  console.log(`| ${pairName} | ${p.shareA.padStart(6)}% | ${p.shareB.padStart(6)}% |   ${p.ratioA}x |   ${p.ratioB}x | ${p.passShare && p.passRatio ? "✅ PASS" : "❌ FAIL"} |`);
}

// 2. Worst 10 by within-domain ratio
pairResults.sort((a, b) => b.maxRatio - a.maxRatio);
const worst10Ratio = pairResults.slice(0, 10);

console.log("\n=========================================================================");
console.log("📊 55 BLENDED PAIRS (20,000 RUNS EACH) - WORST 10 BY WITHIN-DOMAIN RATIO");
console.log("=========================================================================");
console.log("| Pair (Domain A + Domain B)              | Share A | Share B | Ratio A | Ratio B | Status |");
console.log("-----------------------------------------------------------------------------------------");
for (const p of worst10Ratio) {
  const pairName = `${p.domA} + ${p.domB}`.padEnd(39);
  console.log(`| ${pairName} | ${p.shareA.padStart(6)}% | ${p.shareB.padStart(6)}% |   ${p.ratioA}x |   ${p.ratioB}x | ${p.passShare && p.passRatio ? "✅ PASS" : "❌ FAIL"} |`);
}

const allPass = pairResults.every((p) => p.passShare && p.passRatio);
console.log(`\nOverall Result: 55 pairs tested. All pairs within [42%, 58%] and <= 2.0x ratio? ${allPass ? "✅ YES (100% PASS)" : "❌ NO"}`);
