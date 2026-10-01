import { scoreStage2 } from "../services/stage2Selector.js";

function evaluateBank(bank, ownRoadmaps, adjacentRoadmaps, domainName) {
  const dummyStage1 = {
    topDomains: [domainName, "other"],
    domainScores: { [domainName]: 1.0, other: 0.5 },
    isBlended: false,
  };

  const RUNS = 100000;
  const winCounts = {};
  const top5Counts = {};
  let runsWith2PlusNonOwn = 0;

  for (const s of [...ownRoadmaps, ...adjacentRoadmaps]) {
    winCounts[s] = 0;
    top5Counts[s] = 0;
  }

  for (let r = 0; r < RUNS; r++) {
    const answers = {};
    for (const q of bank.questions) {
      const idx = Math.floor(Math.random() * q.options.length);
      answers[q.id] = q.options[idx].id;
    }
    const res = scoreStage2(answers, bank.questions, { stage1Result: dummyStage1, seed: r });
    winCounts[res.topSlug]++;

    let nonOwnInTop5 = 0;
    for (let i = 0; i < Math.min(5, res.rankedSlugs.length); i++) {
      const s = res.rankedSlugs[i];
      top5Counts[s]++;
      if (!ownRoadmaps.includes(s)) nonOwnInTop5++;
    }
    if (nonOwnInTop5 >= 2) runsWith2PlusNonOwn++;
  }

  let ownWins = 0;
  for (const s of ownRoadmaps) ownWins += winCounts[s];
  const ownPct = (ownWins / RUNS) * 100;
  const adjPct = 100 - ownPct;

  console.log(`\n=== [${domainName}] Evaluation ===`);
  console.log(`Own Combined: ${ownPct.toFixed(2)}% [60-85%] ${ownPct >= 60 && ownPct <= 85 ? '✅' : '❌'}`);
  const ownUniform = ownPct / ownRoadmaps.length;
  for (const s of ownRoadmaps) {
    const sPct = (winCounts[s] / RUNS) * 100;
    const pass = sPct >= 0.6 * ownUniform && sPct <= 1.6 * ownUniform;
    console.log(`  Own ${s.padEnd(24)}: ${sPct.toFixed(2)}% (Target: ${(0.6*ownUniform).toFixed(2)}% - ${(1.6*ownUniform).toFixed(2)}%) ${pass ? '✅' : '❌'}`);
  }

  console.log(`Adjacent Combined: ${adjPct.toFixed(2)}% [15-40%] ${adjPct >= 15 && adjPct <= 40 ? '✅' : '❌'}`);
  let allAdjGte15 = true;
  for (const s of adjacentRoadmaps) {
    const sPct = (winCounts[s] / RUNS) * 100;
    const pass = sPct >= 1.5;
    if (!pass) allAdjGte15 = false;
    console.log(`  Adj ${s.padEnd(24)}: ${sPct.toFixed(2)}% (Target: >=1.50%) ${pass ? '✅' : '❌'}`);
  }

  const multiNonOwnPct = (runsWith2PlusNonOwn / RUNS) * 100;
  console.log(`Top 5 multi non-own: ${multiNonOwnPct.toFixed(2)}% [>=40%] ${multiNonOwnPct >= 40 ? '✅' : '❌'}`);
  return { ownPct, adjPct, allAdjGte15, multiNonOwnPct };
}

export { evaluateBank };
