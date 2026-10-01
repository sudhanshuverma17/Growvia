import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getRoadmapsByDomain } from "../config/quizDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.resolve(__dirname, "../config/stage2-banks");

// 1. Engineering and Science (2 own, 4 adjacent)
const size2Configs = {
  engineering: ["civil-services", "pilot", "social-worker", "teacher"],
  science: ["civil-services", "pilot", "social-worker", "teacher"],
};

for (const [dom, adjList] of Object.entries(size2Configs)) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bank = (await import(`file://${filePath}?t=${Date.now()}`)).default;
  const own = getRoadmapsByDomain(dom);

  // Q1..Q4: 2 for own[0], 2 for own[1], 2 adjacent
  const adjPairs = [
    [adjList[0], adjList[1]],
    [adjList[2], adjList[3]],
    [adjList[0], adjList[2]],
    [adjList[1], adjList[3]],
  ];

  for (let q = 0; q < 4; q++) {
    const quest = bank.questions[q];
    quest.options[0].weights = { [own[0]]: 3, [own[1]]: 1 };
    quest.options[1].weights = { [own[0]]: 3 };
    quest.options[2].weights = { [own[1]]: 3, [own[0]]: 1 };
    quest.options[3].weights = { [own[1]]: 3 };
    quest.options[4].weights = { [adjPairs[q][0]]: 3 };
    quest.options[4].reason = `Cross-domain perspective exercising the skills of ${adjPairs[q][0]}.`;
    quest.options[5].weights = { [adjPairs[q][1]]: 3 };
    quest.options[5].reason = `Cross-domain perspective exercising the skills of ${adjPairs[q][1]}.`;
  }

  // Q5..Q7: 1 for own[0], 1 for own[1], 4 adjacent
  for (let q = 4; q < 7; q++) {
    const quest = bank.questions[q];
    quest.options[0].weights = { [own[0]]: 3 };
    quest.options[1].weights = { [own[1]]: 3 };
    for (let a = 0; a < 4; a++) {
      quest.options[2 + a].weights = { [adjList[a]]: 3 };
      quest.options[2 + a].reason = `Cross-domain perspective exercising the skills of ${adjList[a]}.`;
    }
  }

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Calibrated 2-roadmap bank: ${dom}`);
}

// 2. Law_gov, Education_social, Aviation_hospitality (3 own, 3 adjacent)
const size3Configs = {
  law_gov: ["social-worker", "teacher", "pilot"],
  education_social: ["lawyer", "civil-services", "hotel-management"],
  aviation_hospitality: ["civil-services", "army-officer", "social-worker"],
};

for (const [dom, adjList] of Object.entries(size3Configs)) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bank = (await import(`file://${filePath}?t=${Date.now()}`)).default;
  const own = getRoadmapsByDomain(dom);

  // Q1..Q4: 4 own, 2 adjacent
  // 4 own: 1 for each of 3 own, plus own[q % 3] extra
  // 2 adjacent: adjList[q % 3], adjList[(q + 1) % 3]
  for (let q = 0; q < 4; q++) {
    const quest = bank.questions[q];
    quest.options[0].weights = { [own[0]]: 3, [own[(q + 1) % 3]]: 1 };
    quest.options[1].weights = { [own[1]]: 3 };
    quest.options[2].weights = { [own[2]]: 3 };
    const extraOwn = own[q % 3];
    quest.options[3].weights = { [extraOwn]: 3 };

    const adj1 = adjList[q % 3];
    const adj2 = adjList[(q + 1) % 3];
    quest.options[4].weights = { [adj1]: 3 };
    quest.options[4].reason = `Cross-domain perspective exercising the skills of ${adj1}.`;
    quest.options[5].weights = { [adj2]: 3 };
    quest.options[5].reason = `Cross-domain perspective exercising the skills of ${adj2}.`;
  }

  // Q5..Q7: 3 own, 3 adjacent
  for (let q = 4; q < 7; q++) {
    const quest = bank.questions[q];
    quest.options[0].weights = { [own[0]]: 3 };
    quest.options[1].weights = { [own[1]]: 3 };
    quest.options[2].weights = { [own[2]]: 3 };
    quest.options[3].weights = { [adjList[0]]: 3 };
    quest.options[3].reason = `Cross-domain perspective exercising the skills of ${adjList[0]}.`;
    quest.options[4].weights = { [adjList[1]]: 3 };
    quest.options[4].reason = `Cross-domain perspective exercising the skills of ${adjList[1]}.`;
    quest.options[5].weights = { [adjList[2]]: 3 };
    quest.options[5].reason = `Cross-domain perspective exercising the skills of ${adjList[2]}.`;
  }

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Calibrated 3-roadmap bank: ${dom}`);
}
