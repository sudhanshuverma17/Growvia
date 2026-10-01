import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getRoadmapsByDomain } from "../config/quizDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.resolve(__dirname, "../config/stage2-banks");

// Clean secondaries in engineering and science
for (const dom of ["engineering", "science"]) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const mod = await import(`file://${filePath}?t=${Date.now()}`);
  const bank = JSON.parse(JSON.stringify(mod.default));
  const own = getRoadmapsByDomain(dom);

  // Count secondaries
  const secCounts = {};
  for (const s of own) secCounts[s] = 0;

  // In each option, if it has a secondary weight for an own roadmap,
  // only keep it if secCounts[s] < 4!
  for (const q of bank.questions) {
    for (const opt of q.options) {
      const prim = Object.keys(opt.weights).find(s => opt.weights[s] === 3);
      const newWeights = { [prim]: 3 };
      for (const [s, w] of Object.entries(opt.weights)) {
        if (w !== 3 && own.includes(s)) {
          if (secCounts[s] < 4) {
            newWeights[s] = w;
            secCounts[s]++;
          }
        } else if (w !== 3) {
          newWeights[s] = w;
        }
      }
      opt.weights = newWeights;
    }
  }

  // Ensure each own roadmap has at least 3 secondaries
  for (const s of own) {
    if (secCounts[s] < 3) {
      for (const q of bank.questions) {
        for (const opt of q.options) {
          const prim = Object.keys(opt.weights).find(k => opt.weights[k] === 3);
          if (prim !== s && !opt.weights[s] && secCounts[s] < 3) {
            opt.weights[s] = 1;
            secCounts[s]++;
          }
        }
      }
    }
  }

  console.log(`[${dom}] Secondaries count for own:`, secCounts);
  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
}
