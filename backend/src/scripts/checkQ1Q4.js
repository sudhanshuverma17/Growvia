import { getRoadmapsByDomain } from "../config/quizDomains.js";

async function main() {
  for (const dom of ["tech", "healthcare", "business", "finance", "media", "creative"]) {
    const mod = await import(`../config/stage2-banks/${dom}.js`);
    const q4 = mod.default.questions.filter((q) => q.blendCore);
    const own = getRoadmapsByDomain(dom);
    const counts = {};
    for (const s of own) counts[s] = { w3: 0, w2: 0, w1: 0 };
    for (const q of q4) {
      for (const opt of q.options) {
        for (const [s, w] of Object.entries(opt.weights)) {
          if (counts[s]) {
            if (w === 3) counts[s].w3++;
            else if (w === 2) counts[s].w2++;
            else if (w === 1) counts[s].w1++;
          }
        }
      }
    }
    console.log(`\n=== ${dom} ===`);
    for (const [s, c] of Object.entries(counts)) {
      console.log(`  ${s.padEnd(25)}: w3=${c.w3}, w2=${c.w2}, w1=${c.w1}`);
    }
  }
}
main();
