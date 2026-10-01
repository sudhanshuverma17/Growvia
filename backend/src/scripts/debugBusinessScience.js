import { getRoadmapsByDomain } from "../config/quizDomains.js";
import { getStage2Set, scoreStage2 } from "../services/stage2Selector.js";

async function main() {
  const domA = "business";
  const domB = "science";
  const stage1Affinity = {
    topDomains: [domA, domB],
    domainScores: { [domA]: 1.0, [domB]: 1.0 },
    isBlended: true,
  };

  const servedSet = getStage2Set(stage1Affinity, { seed: `pair_${domA}_${domB}` });
  console.log(`Served ${servedSet.length} questions:`, servedSet.map(q => q.id));

  // Count max score and option counts for each business roadmap in the served set!
  const roadmapsA = getRoadmapsByDomain(domA);
  const roadmapsB = getRoadmapsByDomain(domB);

  console.log("\n--- Breakdown of weights in served set for Business roadmaps ---");
  for (const s of roadmapsA) {
    let w3Count = 0;
    let w1Count = 0;
    let maxPts = 0;
    const qList = [];
    for (const q of servedSet) {
      let qMax = 0;
      for (const opt of q.options) {
        const w = opt.weights[s] || 0;
        if (w === 3) w3Count++;
        if (w === 1) w1Count++;
        if (w > qMax) qMax = w;
      }
      maxPts += qMax;
      if (qMax > 0) qList.push(`${q.id}(${qMax})`);
    }
    console.log(`  ${s.padEnd(20)}: maxPts=${maxPts}, w3=${w3Count}, w1=${w1Count} | Qs: ${qList.join(', ')}`);
  }

  console.log("\n--- Breakdown of weights in served set for Science roadmaps ---");
  for (const s of roadmapsB) {
    let w3Count = 0;
    let w1Count = 0;
    let maxPts = 0;
    const qList = [];
    for (const q of servedSet) {
      let qMax = 0;
      for (const opt of q.options) {
        const w = opt.weights[s] || 0;
        if (w === 3) w3Count++;
        if (w === 1) w1Count++;
        if (w > qMax) qMax = w;
      }
      maxPts += qMax;
      if (qMax > 0) qList.push(`${q.id}(${qMax})`);
    }
    console.log(`  ${s.padEnd(25)}: maxPts=${maxPts}, w3=${w3Count}, w1=${w1Count} | Qs: ${qList.join(', ')}`);
  }
}
main();
