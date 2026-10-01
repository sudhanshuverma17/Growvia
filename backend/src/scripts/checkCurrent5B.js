import { DOMAINS, getRoadmapsByDomain, DOMAIN_ROADMAP_MAP } from "../config/quizDomains.js";
import { STAGE2_BANKS, getStage2Set, scoreStage2, validateBank } from "../services/stage2Selector.js";

const SMALL_DOMAINS = ["engineering", "law_gov", "education_social", "aviation_hospitality", "science"];

console.log("Checking current STAGE2_BANKS in stage2.test.js requirements...");

// Let's check which pair failed in 5B:
const pairs = [];
for (let i = 0; i < DOMAINS.length; i++) {
  for (let j = i + 1; j < DOMAINS.length; j++) {
    pairs.push([DOMAINS[i], DOMAINS[j]]);
  }
}

let fail5BCount = 0;
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

  for (let r = 0; r < 3000; r++) {
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

  const totalPairWins = winsA + winsB;
  const shareA = (winsA / totalPairWins) * 100;
  const shareB = (winsB / totalPairWins) * 100;

  const ownWinsA = roadmapsA.map((s) => slugWins[s]);
  const ratioA = Math.max(...ownWinsA) / Math.min(...ownWinsA);
  const ownWinsB = roadmapsB.map((s) => slugWins[s]);
  const ratioB = Math.max(...ownWinsB) / Math.min(...ownWinsB);

  const pass = shareA >= 42.0 && shareA <= 58.0 && ratioA <= 2.0 && ratioB <= 2.0;
  if (!pass) {
    fail5BCount++;
    console.log(`FAIL 5B: ${domA}+${domB} | shareA=${shareA.toFixed(1)}% shareB=${shareB.toFixed(1)}% | ratioA=${ratioA.toFixed(2)}x ratioB=${ratioB.toFixed(2)}x`);
  }
}
console.log(`Total 5B failures with current banks: ${fail5BCount} / 55`);
