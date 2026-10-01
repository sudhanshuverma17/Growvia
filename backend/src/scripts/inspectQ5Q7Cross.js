import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";

async function main() {
  for (const dom of DOMAINS) {
    const mod = await import(`../config/stage2-banks/${dom}.js`);
    const own = getRoadmapsByDomain(dom);
    const nonOwnCounts = {};
    for (let i = 4; i < mod.default.questions.length; i++) {
      const q = mod.default.questions[i];
      for (const opt of q.options) {
        for (const [s, w] of Object.entries(opt.weights)) {
          if (!own.includes(s) && w === 3) {
            nonOwnCounts[s] = (nonOwnCounts[s] || 0) + 1;
          }
        }
      }
    }
    console.log(`[${dom}] Q5-Q7 cross-listed with w=3:`, nonOwnCounts);
  }
}
main();
