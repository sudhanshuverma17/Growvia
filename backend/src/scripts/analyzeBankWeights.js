import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { STAGE2_BANKS } from "../services/stage2Selector.js";

console.log("=== Q1..Q4 WEIGHT ANALYSIS FOR ALL 11 BANKS ===");

for (const dom of DOMAINS) {
  const bank = STAGE2_BANKS[dom];
  const roadmaps = getRoadmapsByDomain(dom);
  const q14 = bank.questions.filter((q) => q.blendCore);

  console.log(`\nDomain: ${dom.toUpperCase()} (${roadmaps.length} roadmaps, ${q14.length} blendCore Qs)`);
  const stats = {};
  for (const r of roadmaps) {
    stats[r] = { w3: 0, w2: 0, w1: 0, totalMax: 0 };
  }

  for (const q of q14) {
    for (const opt of q.options) {
      for (const [slug, w] of Object.entries(opt.weights)) {
        if (stats[slug]) {
          if (w === 3) stats[slug].w3++;
          else if (w === 2) stats[slug].w2++;
          else if (w === 1) stats[slug].w1++;
        }
      }
    }
    // Calculate max possible points across questions
    for (const r of roadmaps) {
      let maxQ = 0;
      for (const opt of q.options) {
        const w = opt.weights[r] || 0;
        if (w > maxQ) maxQ = w;
      }
      stats[r].totalMax += maxQ;
    }
  }

  for (const r of roadmaps) {
    const s = stats[r];
    console.log(
      `  ${r.padEnd(25)}: maxPoints=${s.totalMax}, w3_count=${s.w3}, w2_count=${s.w2}, w1_count=${s.w1}`
    );
  }
}
