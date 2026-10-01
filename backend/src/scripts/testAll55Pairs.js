import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { getStage2Set, scoreStage2 } from "../services/stage2Selector.js";

const pairs = [];
for (let i = 0; i < DOMAINS.length; i++) {
  for (let j = i + 1; j < DOMAINS.length; j++) {
    pairs.push([DOMAINS[i], DOMAINS[j]]);
  }
}

console.log(`Simulating all ${pairs.length} pairs (20,000 runs each)...`);

const results = [];
const RUNS = 3000;

for (const [domA, domB] of pairs) {
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

  const ownWinsA = roadmapsA.map((s) => slugWins[s]);
  const ratioA = Math.max(...ownWinsA) / Math.min(...ownWinsA);
  const ownWinsB = roadmapsB.map((s) => slugWins[s]);
  const ratioB = Math.max(...ownWinsB) / Math.min(...ownWinsB);

  const ownWins = pool.map((s) => slugWins[s]);
  const minWin = Math.min(...ownWins);
  const maxWin = Math.max(...ownWins);
  const ratioAcrossAll = minWin > 0 ? (maxWin / minWin) : 999;

  const domainBalanced = shareA >= 42.0 && shareA <= 58.0;
  const inDomainBalanced = ratioA <= 2.0 && ratioB <= 2.0;

  results.push({
    domA,
    domB,
    shareA,
    shareB,
    ratioA,
    ratioB,
    ratioAcrossAll,
    domainBalanced,
    inDomainBalanced,
    pass: domainBalanced && inDomainBalanced,
  });
}

// Sort worst by domain deviation from 50% or ratio
results.sort((a, b) => {
  const maxR_A = Math.max(a.ratioA, a.ratioB);
  const maxR_B = Math.max(b.ratioA, b.ratioB);
  const devA = Math.max(Math.abs(a.shareA - 50), maxR_A > 2 ? maxR_A * 5 : 0);
  const devB = Math.max(Math.abs(b.shareA - 50), maxR_B > 2 ? maxR_B * 5 : 0);
  return devB - devA;
});

console.log("\n--- Worst 15 Pairs ---");
for (let i = 0; i < Math.min(15, results.length); i++) {
  const p = results[i];
  console.log(
    `${p.domA.padEnd(20)} + ${p.domB.padEnd(20)} | A: ${p.shareA.toFixed(1)}% B: ${p.shareB.toFixed(1)}% | Ratios: [A: ${p.ratioA.toFixed(2)}x, B: ${p.ratioB.toFixed(2)}x] | Across: ${p.ratioAcrossAll.toFixed(2)}x | ${p.pass ? "✅ PASS" : "❌ FAIL"}`
  );
}

const passing = results.filter((r) => r.pass).length;
console.log(`\nPassing (42-58% domain share AND <= 2.0x in-domain ratio): ${passing} / ${results.length}`);
