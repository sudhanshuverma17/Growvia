import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { STAGE2_BANKS } from "../services/stage2Selector.js";

// Let's inspect the exact performance of standard pairs right now
const standardDomains = ["tech", "healthcare", "business", "finance", "creative", "media"];
const stdPairs = [];
for (let i = 0; i < standardDomains.length; i++) {
  for (let j = i + 1; j < standardDomains.length; j++) {
    stdPairs.push([standardDomains[i], standardDomains[j]]);
  }
}

console.log("Analyzing standard domain pairs (15 pairs)...");

for (const [domA, domB] of stdPairs) {
  const bankA = STAGE2_BANKS[domA];
  const bankB = STAGE2_BANKS[domB];
  const coreA = bankA.questions.filter((q) => q.blendCore).slice(0, 4);
  const coreB = bankB.questions.filter((q) => q.blendCore).slice(0, 4);

  const servedSet = [];
  for (let i = 0; i < 4; i++) {
    servedSet.push(coreA[i]);
    servedSet.push(coreB[i]);
  }

  const roadmapsA = getRoadmapsByDomain(domA);
  const roadmapsB = getRoadmapsByDomain(domB);
  const pool = [...roadmapsA, ...roadmapsB];

  let winsA = 0;
  let winsB = 0;
  const slugWins = {};
  for (const s of pool) slugWins[s] = 0;

  const RUNS = 20000;
  for (let r = 0; r < RUNS; r++) {
    const scores = {};
    for (const s of pool) scores[s] = 0;

    for (const q of servedSet) {
      const idx = Math.floor(Math.random() * q.options.length);
      const opt = q.options[idx];
      for (const [slug, w] of Object.entries(opt.weights)) {
        if (scores[slug] !== undefined) scores[slug] += w;
      }
    }

    let topSlug = pool[0];
    let topScore = scores[topSlug];
    for (let k = 1; k < pool.length; k++) {
      const s = pool[k];
      if (scores[s] > topScore) {
        topScore = scores[s];
        topSlug = s;
      }
    }

    if (roadmapsA.includes(topSlug)) winsA++;
    else if (roadmapsB.includes(topSlug)) winsB++;
    slugWins[topSlug]++;
  }

  const shareA = (winsA / RUNS) * 100;
  const shareB = (winsB / RUNS) * 100;
  const ownWins = pool.map((s) => slugWins[s]);
  const minWin = Math.min(...ownWins);
  const maxWin = Math.max(...ownWins);
  const ratio = minWin > 0 ? maxWin / minWin : 999;

  const passDomain = shareA >= 42.0 && shareA <= 58.0;
  const passRatio = ratio <= 2.0;

  console.log(
    `${domA.padEnd(12)} (${roadmapsA.length}) + ${domB.padEnd(12)} (${roadmapsB.length}) | A: ${shareA.toFixed(1)}% B: ${shareB.toFixed(1)}% | Ratio: ${ratio.toFixed(2)}x | ${passDomain && passRatio ? "✅ PASS" : "❌ FAIL"}`
  );
}
