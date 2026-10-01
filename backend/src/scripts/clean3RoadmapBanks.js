import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getRoadmapsByDomain } from "../config/quizDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.resolve(__dirname, "../config/stage2-banks");

const small3Domains = {
  law_gov: ["social-worker", "teacher", "pilot"],
  education_social: ["lawyer", "civil-services", "hotel-management"],
  aviation_hospitality: ["civil-services", "army-officer", "social-worker"],
};

for (const [dom, adjList] of Object.entries(small3Domains)) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const mod = await import(`file://${filePath}?t=${Date.now()}`);
  const bank = JSON.parse(JSON.stringify(mod.default));
  const own = getRoadmapsByDomain(dom);

  // In Q1..Q4 (indices 0..3):
  // 6 options per question: exactly 2 for own[0], 2 for own[1], 2 for own[2]
  // With 1 secondary per question rotated across the 3 own roadmaps
  for (let q = 0; q < 4; q++) {
    const quest = bank.questions[q];
    quest.options[0].weights = { [own[0]]: 3, [own[1]]: 1 };
    quest.options[1].weights = { [own[0]]: 3 };
    quest.options[2].weights = { [own[1]]: 3, [own[2]]: 1 };
    quest.options[3].weights = { [own[1]]: 3 };
    quest.options[4].weights = { [own[2]]: 3, [own[0]]: 1 };
    quest.options[5].weights = { [own[2]]: 3 };
  }

  // In Q5..Q7 (indices 4..6):
  // 6 options per question:
  // opt 0 -> own[0]
  // opt 1 -> own[1]
  // opt 2 -> own[2]
  // opt 3 -> adjList[0]
  // opt 4 -> adjList[1]
  // opt 5 -> adjList[2]
  for (let q = 4; q < 7; q++) {
    const quest = bank.questions[q];
    quest.options[0].weights = { [own[0]]: 3 };
    quest.options[1].weights = { [own[1]]: 3 };
    quest.options[2].weights = { [own[2]]: 3 };
    quest.options[3].weights = { [adjList[0]]: 3 };
    quest.options[4].weights = { [adjList[1]]: 3 };
    quest.options[5].weights = { [adjList[2]]: 3 };
  }

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Cleaned 3-roadmap bank: ${dom}`);
}
