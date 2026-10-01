import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.resolve(__dirname, "../config/stage2-banks");

// For standard banks: tech, healthcare, business, creative, media, finance
// Ensure NO non-own slugs exist in weights!
const STANDARD_DOMAINS = ["tech", "healthcare", "business", "creative", "media", "finance"];

for (const dom of STANDARD_DOMAINS) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bank = (await import(`file://${filePath}?t=${Date.now()}`)).default;
  const own = getRoadmapsByDomain(dom);

  for (const q of bank.questions) {
    for (const opt of q.options) {
      const newWeights = {};
      for (const [s, w] of Object.entries(opt.weights)) {
        if (own.includes(s)) {
          newWeights[s] = w;
        }
      }
      // If all weights were non-own (should not happen), fallback to own[0]
      if (Object.keys(newWeights).length === 0) {
        newWeights[own[0]] = 3;
      }
      opt.weights = newWeights;
    }
  }

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Pruned non-own slugs from: ${dom}`);
}
