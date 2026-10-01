import { STAGE2_BANKS, getStage2Set, scoreStage2 } from "../services/stage2Selector.js";
import { getRoadmapsByDomain } from "../config/quizDomains.js";

const ALL_11_DOMAINS = [
  "tech", "healthcare", "media", "business", "creative", "finance",
  "engineering", "law_gov", "education_social", "aviation_hospitality", "science"
];

const NEW_6_DOMAINS = ["finance", "engineering", "law_gov", "education_social", "aviation_hospitality", "science"];

for (const domA of NEW_6_DOMAINS) {
  const otherDomains = ALL_11_DOMAINS.filter(d => d !== domA);
  // Pick 8 deterministic pairs for domA
  const testPairs = otherDomains.slice(0, 8);

  for (const domB of testPairs) {
    const roadmapsA = getRoadmapsByDomain(domA);
    const roadmapsB = getRoadmapsByDomain(domB);
    const pool = [...roadmapsA, ...roadmapsB];
    const nPool = pool.length;
    const uniformShare = 1 / nPool;
    const minShare = 0.4 * uniformShare;
    const maxShare = 2.0 * uniformShare;

    const stage1Affinity = {
      topDomains: [domA, domB],
      domainScores: { [domA]: 1.0, [domB]: 1.0 },
      isBlended: true,
    };

    const servedSet = getStage2Set(stage1Affinity, { seed: "blend_eval" });

    let winsA = 0;
    let winsB = 0;
    const slugWins = {};
    for (const s of pool) slugWins[s] = 0;

    const RUNS = 20000;
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
    const domPass = shareA >= 35.0 && shareA <= 65.0 && shareB >= 35.0 && shareB <= 65.0;

    let slugFails = [];
    for (const s of pool) {
      const sShare = slugWins[s] / RUNS;
      if (sShare < minShare || sShare > maxShare) {
        slugFails.push({ s, share: (sShare * 100).toFixed(2), min: (minShare*100).toFixed(2), max: (maxShare*100).toFixed(2) });
      }
    }

    if (!domPass || slugFails.length > 0) {
      console.log(`❌ Pair (${domA} + ${domB}): ShareA=${shareA.toFixed(1)}%, ShareB=${shareB.toFixed(1)}% [35-65%], SlugFails=`, slugFails);
    } else {
      console.log(`✅ Pair (${domA} + ${domB}): ShareA=${shareA.toFixed(1)}%, ShareB=${shareB.toFixed(1)}%, all ${nPool} roadmaps in [${(minShare*100).toFixed(1)}%, ${(maxShare*100).toFixed(1)}%]`);
    }
  }
}
