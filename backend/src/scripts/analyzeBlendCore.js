import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { STAGE2_BANKS } from "../services/stage2Selector.js";

for (const dom of DOMAINS) {
  const bank = STAGE2_BANKS[dom];
  const core = bank.questions.filter((q) => q.blendCore === true).slice(0, 4);
  const ownRoadmaps = getRoadmapsByDomain(dom);

  console.log(`=== Domain: ${dom} (Roadmaps: ${ownRoadmaps.length}) ===`);
  const stats = {};
  for (const s of ownRoadmaps) stats[s] = { w3: 0, w2: 0, w1: 0, expPoints: 0, maxPossible: 0 };

  for (const q of core) {
    const maxInQ = {};
    for (const opt of q.options) {
      for (const [slug, w] of Object.entries(opt.weights)) {
        if (stats[slug]) {
          if (w === 3) stats[slug].w3++;
          if (w === 2) stats[slug].w2++;
          if (w === 1) stats[slug].w1++;
          stats[slug].expPoints += w / q.options.length;
        }
        if (!maxInQ[slug] || w > maxInQ[slug]) maxInQ[slug] = w;
      }
    }
    for (const [s, m] of Object.entries(maxInQ)) {
      if (stats[s]) stats[s].maxPossible += m;
    }
  }

  let totalDomainExp = 0;
  for (const s of ownRoadmaps) {
    totalDomainExp += stats[s].expPoints;
    console.log(
      `  ${s.padEnd(24)}: w3=${stats[s].w3}, w2=${stats[s].w2}, w1=${stats[s].w1}, max=${stats[s].maxPossible}, exp=${stats[s].expPoints.toFixed(2)}`
    );
  }
  console.log(`  TOTAL Domain Expected Points across 4 Qs: ${totalDomainExp.toFixed(2)}\n`);
}
