import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { STAGE2_BANKS, getStage2Set, scoreStage2 } from "../services/stage2Selector.js";

// Let's test the 55 pairs right now and see the exact metrics
const pairs = [];
for (let i = 0; i < DOMAINS.length; i++) {
  for (let j = i + 1; j < DOMAINS.length; j++) {
    pairs.push([DOMAINS[i], DOMAINS[j]]);
  }
}

export function run55PairsTest(runs = 20000) {
  let passingDomainCount = 0;
  let passingRatioCount = 0;
  let passingBothCount = 0;
  const pairResults = [];

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

    for (let r = 0; r < runs; r++) {
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

    const shareA = (winsA / runs) * 100;
    const shareB = (winsB / runs) * 100;

    const ownWinsA = roadmapsA.map((s) => slugWins[s]);
    const minWinA = Math.min(...ownWinsA);
    const maxWinA = Math.max(...ownWinsA);
    const ratioA = minWinA > 0 ? maxWinA / minWinA : 999;

    const ownWinsB = roadmapsB.map((s) => slugWins[s]);
    const minWinB = Math.min(...ownWinsB);
    const maxWinB = Math.max(...ownWinsB);
    const ratioB = minWinB > 0 ? maxWinB / minWinB : 999;

    const allWins = pool.map((s) => slugWins[s]);
    const minPool = Math.min(...allWins);
    const maxPool = Math.max(...allWins);
    const ratioPool = minPool > 0 ? maxPool / minPool : 999;

    const domainPass = shareA >= 42.0 && shareA <= 58.0;
    const ratioPass = ratioA <= 2.0 && ratioB <= 2.0;

    if (domainPass) passingDomainCount++;
    if (ratioPass) passingRatioCount++;
    if (domainPass && ratioPass) passingBothCount++;

    pairResults.push({
      domA,
      domB,
      shareA,
      shareB,
      ratioA,
      ratioB,
      ratioPool,
      domainPass,
      ratioPass,
      pass: domainPass && ratioPass,
    });
  }

  return { passingDomainCount, passingRatioCount, passingBothCount, pairResults };
}

if (process.argv[1]?.endsWith("testAndBalanceBanks.js")) {
  const { passingDomainCount, passingRatioCount, passingBothCount, pairResults } = run55PairsTest(10000);
  console.log(`Domain Balance Passing (42-58%): ${passingDomainCount} / 55`);
  console.log(`Ratio Passing (<= 2.0x within domain): ${passingRatioCount} / 55`);
  console.log(`Both Passing: ${passingBothCount} / 55`);

  pairResults.sort((a, b) => Math.abs(b.shareA - 50) - Math.abs(a.shareA - 50));
  console.log("\nWorst 10 Pairs:");
  for (let i = 0; i < 10; i++) {
    const p = pairResults[i];
    console.log(
      `${p.domA.padEnd(20)} + ${p.domB.padEnd(20)} | A: ${p.shareA.toFixed(1)}% B: ${p.shareB.toFixed(1)}% | Ratios: [A: ${p.ratioA.toFixed(2)}x, B: ${p.ratioB.toFixed(2)}x, Pool: ${p.ratioPool.toFixed(2)}x]`
    );
  }
}
