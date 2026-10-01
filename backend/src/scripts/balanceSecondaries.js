import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.join(__dirname, "../config/stage2-banks");

const targetBanks = ["engineering", "law_gov", "education_social", "aviation_hospitality", "science"];

for (const dom of targetBanks) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bankModule = await import(`file://${filePath}`);
  const bank = bankModule.default;
  const ownRoadmaps = getRoadmapsByDomain(dom);

  // BlendCore questions Q1..Q4 have weight-3 assignments and orthogonal outside options
  // Non-blendCore questions Q5..Q7 can have secondaries adjusted:
  for (const slug of ownRoadmaps) {
    // Count current secondaries in bank
    let currentSec = 0;
    for (const q of bank.questions) {
      for (const opt of q.options) {
        const w = opt.weights[slug];
        if (w === 1 || w === 2) currentSec++;
      }
    }

    // If currentSec > 4, remove some secondary occurrences in Q5..Q7
    if (currentSec > 4) {
      let excess = currentSec - 4;
      for (let qIdx = bank.questions.length - 1; qIdx >= 4 && excess > 0; qIdx--) {
        const q = bank.questions[qIdx];
        for (let oIdx = q.options.length - 1; oIdx >= 0 && excess > 0; oIdx--) {
          const opt = q.options[oIdx];
          if (opt.weights[slug] === 1 || opt.weights[slug] === 2) {
            delete opt.weights[slug];
            excess--;
          }
        }
      }
    } else if (currentSec < 3) {
      // Need more secondaries: add to Q5/Q6/Q7 options where slug is not already present
      let needed = 3 - currentSec;
      for (let qIdx = 4; qIdx < bank.questions.length && needed > 0; qIdx++) {
        const q = bank.questions[qIdx];
        for (const opt of q.options) {
          if (!opt.weights[slug] && Object.keys(opt.weights).length < 3 && needed > 0) {
            opt.weights[slug] = 1;
            needed--;
          }
        }
      }
    }
  }

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`, "utf-8");
  console.log(`Balanced secondaries in ${dom}.js`);
}

console.log("Secondary balancing complete!");
