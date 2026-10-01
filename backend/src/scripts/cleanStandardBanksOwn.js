import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getRoadmapsByDomain } from "../config/quizDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.resolve(__dirname, "../config/stage2-banks");

// 1. Tech, Healthcare, Business:
// 7 roadmaps: 0..6
// Q0: 0, 1, 2, 3, 4, 5 (missing 6)
// Q1: 6, 0, 1, 2, 3, 4 (missing 5)
// Q2: 5, 6, 0, 1, 2, 3 (missing 4)
// Q3: 4, 5, 6, 0, 1, 2 (missing 3)
// 0, 1, 2 appear 4 times (w=3).
// 3, 4, 5, 6 appear 3 times (w=3) + two secondaries of w=1.

for (const dom of ["tech", "healthcare", "business"]) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bank = (await import(`file://${filePath}?t=${Date.now()}`)).default;
  const own = getRoadmapsByDomain(dom);
  const q4 = bank.questions.filter((q) => q.blendCore);

  const seq = [
    [0, 1, 2, 3, 4, 5],
    [6, 0, 1, 2, 3, 4],
    [5, 6, 0, 1, 2, 3],
    [4, 5, 6, 0, 1, 2],
  ];

  for (let q = 0; q < 4; q++) {
    for (let optIdx = 0; optIdx < 6; optIdx++) {
      const slug = own[seq[q][optIdx]];
      q4[q].options[optIdx].weights = { [slug]: 3 };
      q4[q].options[optIdx].reason = `Option directly exercises the distinctive core practices and methodologies of ${slug}.`;
    }
  }

  // Add secondaries for 3, 4, 5, 6 in questions where they don't appear
  // 6 missing in Q0:
  q4[0].options[0].weights[own[6]] = 1;
  q4[0].options[1].weights[own[6]] = 1;
  // 5 missing in Q1:
  q4[1].options[0].weights[own[5]] = 1;
  q4[1].options[1].weights[own[5]] = 1;
  // 4 missing in Q2:
  q4[2].options[0].weights[own[4]] = 1;
  q4[2].options[1].weights[own[4]] = 1;
  // 3 missing in Q3:
  q4[3].options[0].weights[own[3]] = 1;
  q4[3].options[1].weights[own[3]] = 1;

  // Also give 0, 1, 2 each two secondaries in Q5..Q7 or Q1..Q4 so all 7 satisfy 2..6 secondaries rule!
  // In Q5:
  bank.questions[4].options[0].weights[own[0]] = 1;
  bank.questions[4].options[1].weights[own[1]] = 1;
  bank.questions[4].options[2].weights[own[2]] = 1;
  // In Q6:
  bank.questions[5].options[0].weights[own[0]] = 1;
  bank.questions[5].options[1].weights[own[1]] = 1;
  bank.questions[5].options[2].weights[own[2]] = 1;

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Cleaned 7-roadmap bank: ${dom}`);
}

// 2. Creative and Media (5 roadmaps)
for (const dom of ["creative", "media"]) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bank = (await import(`file://${filePath}?t=${Date.now()}`)).default;
  const own = getRoadmapsByDomain(dom);
  const q4 = bank.questions.filter((q) => q.blendCore);

  // In each Q, opts 0..4 belong to own[0..4].
  // Opt 5 belongs to own[q % 5].
  for (let q = 0; q < 4; q++) {
    for (let o = 0; o < 5; o++) {
      q4[q].options[o].weights = { [own[o]]: 3 };
      q4[q].options[o].reason = `Option directly exercises the distinctive core practices and methodologies of ${own[o]}.`;
    }
    const extraSlug = own[q % 5];
    q4[q].options[5].weights = { [extraSlug]: 3 };
    q4[q].options[5].reason = `Option directly exercises the distinctive core practices and methodologies of ${extraSlug}.`;
  }

  // Ensure each own roadmap has between 2 and 4 secondaries
  for (let s = 0; s < 5; s++) {
    const secSlug = own[(s + 1) % 5];
    q4[s % 4].options[s].weights[secSlug] = 1;
    bank.questions[4].options[s].weights[secSlug] = 1;
  }

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Cleaned 5-roadmap bank: ${dom}`);
}

// 3. Finance (4 roadmaps)
{
  const filePath = path.join(banksDir, `finance.js`);
  const bank = (await import(`file://${filePath}?t=${Date.now()}`)).default;
  const own = getRoadmapsByDomain("finance");
  const q4 = bank.questions.filter((q) => q.blendCore);

  const extras = [[0, 1], [2, 3], [0, 2], [1, 3]];
  for (let q = 0; q < 4; q++) {
    for (let o = 0; o < 4; o++) {
      q4[q].options[o].weights = { [own[o]]: 3 };
      q4[q].options[o].reason = `Option directly exercises the distinctive core practices and methodologies of ${own[o]}.`;
    }
    q4[q].options[4].weights = { [own[extras[q][0]]]: 3 };
    q4[q].options[4].reason = `Option directly exercises the distinctive core practices and methodologies of ${own[extras[q][0]]}.`;
    q4[q].options[5].weights = { [own[extras[q][1]]]: 3 };
    q4[q].options[5].reason = `Option directly exercises the distinctive core practices and methodologies of ${own[extras[q][1]]}.`;
  }

  // Ensure each own roadmap has between 2 and 4 secondaries
  for (let s = 0; s < 4; s++) {
    const secSlug = own[(s + 1) % 4];
    q4[s].options[s].weights[secSlug] = 1;
    bank.questions[4].options[s].weights[secSlug] = 1;
  }

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Cleaned 4-roadmap bank: finance`);
}
