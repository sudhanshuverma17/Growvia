import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.resolve(__dirname, "../config/stage2-banks");

// Clean and normalize all banks so:
// 1. Each option has exactly 1 primary weight (w=3) and 0 to 2 secondary weights (w=1 or w=2).
// 2. Each own roadmap has between 2 and 6 secondary options across the bank.
// 3. For small domains, adjacent roadmaps have w=3 in >= 2 options and appear in >= 3 questions.

for (const dom of DOMAINS) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bank = (await import(`file://${filePath}?t=${Date.now()}`)).default;
  const own = getRoadmapsByDomain(dom);

  // First: strictly prune options so they have at most 1 primary (w=3) and at most 1 secondary (w=1 or w=2)
  for (const q of bank.questions) {
    for (const opt of q.options) {
      const primSlug = Object.keys(opt.weights).find(s => opt.weights[s] === 3) || Object.keys(opt.weights)[0];
      const secSlugs = Object.keys(opt.weights).filter(s => s !== primSlug);
      const newWeights = { [primSlug]: 3 };
      if (secSlugs.length > 0) {
        newWeights[secSlugs[0]] = opt.weights[secSlugs[0]] === 3 ? 1 : opt.weights[secSlugs[0]];
      }
      opt.weights = newWeights;
    }
  }

  // Count secondaries per own roadmap
  const secCounts = {};
  for (const s of own) secCounts[s] = 0;
  for (const q of bank.questions) {
    for (const opt of q.options) {
      for (const [s, w] of Object.entries(opt.weights)) {
        if (own.includes(s) && w < 3) secCounts[s]++;
      }
    }
  }

  // Ensure each own roadmap has between 3 and 5 secondaries
  for (const s of own) {
    while (secCounts[s] < 3) {
      // Find an option where s is not present and option has only 1 weight
      let added = false;
      for (const q of bank.questions) {
        for (const opt of q.options) {
          if (!opt.weights[s] && Object.keys(opt.weights).length === 1) {
            opt.weights[s] = 1;
            secCounts[s]++;
            added = true;
            break;
          }
        }
        if (added) break;
      }
      if (!added) break;
    }
  }

  console.log(`[${dom}] Secondaries count:`, secCounts);
  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
}
