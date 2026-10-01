import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.resolve(__dirname, "../config/stage2-banks");

console.log("Applying final unified calibration to Q1..Q4 of all 11 banks...");

// 1. Tech, Healthcare, Business (Size 7)
for (const dom of ["tech", "healthcare", "business"]) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bank = (await import(`file://${filePath}?t=${Date.now()}`)).default;
  const own = getRoadmapsByDomain(dom);

  const seq = [
    [0, 1, 2, 3, 4, 5],
    [6, 0, 1, 2, 3, 4],
    [5, 6, 0, 1, 2, 3],
    [4, 5, 6, 0, 1, 2]
  ];

  // Q1..Q4:
  for (let q = 0; q < 4; q++) {
    for (let optIdx = 0; optIdx < 6; optIdx++) {
      const slug = own[seq[q][optIdx]];
      bank.questions[q].options[optIdx].weights = { [slug]: 3 };
      bank.questions[q].options[optIdx].reason = `Option directly exercises the distinctive core practices and methodologies of ${slug}.`;
    }
  }

  // Secondaries for missing roadmaps in Q1..Q4
  bank.questions[0].options[0].weights[own[6]] = 1;
  bank.questions[0].options[1].weights[own[6]] = 1;
  bank.questions[1].options[0].weights[own[5]] = 1;
  bank.questions[1].options[1].weights[own[5]] = 1;
  bank.questions[2].options[0].weights[own[4]] = 1;
  bank.questions[2].options[1].weights[own[4]] = 1;
  bank.questions[3].options[0].weights[own[3]] = 1;
  bank.questions[3].options[1].weights[own[3]] = 1;

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Calibrated Q1..Q4 for ${dom}.js`);
}

// 2. Creative & Media (Size 5)
for (const dom of ["creative", "media"]) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bank = (await import(`file://${filePath}?t=${Date.now()}`)).default;
  const own = getRoadmapsByDomain(dom);

  // Q1..Q4:
  for (let q = 0; q < 4; q++) {
    for (let o = 0; o < 5; o++) {
      bank.questions[q].options[o].weights = { [own[o]]: 3 };
      bank.questions[q].options[o].reason = `Option directly exercises the distinctive core practices and methodologies of ${own[o]}.`;
    }
    const s1 = q % 5;
    const s2 = (q + 1) % 5;
    bank.questions[q].options[5].weights = { [own[s1]]: 1, [own[s2]]: 1 };
    bank.questions[q].options[5].reason = `Cross-functional perspective combining practices of ${own[s1]} and ${own[s2]}.`;
  }

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Calibrated Q1..Q4 for ${dom}.js`);
}

// 3. Finance (Size 4)
{
  const filePath = path.join(banksDir, `finance.js`);
  const bank = (await import(`file://${filePath}?t=${Date.now()}`)).default;
  const own = getRoadmapsByDomain("finance");

  // Q1..Q4:
  for (let q = 0; q < 4; q++) {
    for (let o = 0; o < 4; o++) {
      bank.questions[q].options[o].weights = { [own[o]]: 3 };
      bank.questions[q].options[o].reason = `Option directly exercises the distinctive core practices and methodologies of ${own[o]}.`;
    }
    const s1 = q % 4;
    const s2 = (q + 1) % 4;
    bank.questions[q].options[4].weights = { [own[s1]]: 2 };
    bank.questions[q].options[4].reason = `Option directly exercises the distinctive core practices and methodologies of ${own[s1]}.`;
    bank.questions[q].options[5].weights = { [own[s2]]: 2 };
    bank.questions[q].options[5].reason = `Option directly exercises the distinctive core practices and methodologies of ${own[s2]}.`;
  }

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Calibrated Q1..Q4 for finance.js`);
}

// 4. Law_gov, Education_social, Aviation_hospitality (Size 3)
for (const dom of ["law_gov", "education_social", "aviation_hospitality"]) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bank = (await import(`file://${filePath}?t=${Date.now()}`)).default;
  const own = getRoadmapsByDomain(dom);

  // Q1..Q4:
  for (let q = 0; q < 4; q++) {
    for (let o = 0; o < 3; o++) {
      bank.questions[q].options[o].weights = { [own[o]]: 3 };
      bank.questions[q].options[o].reason = `Option directly exercises the distinctive core practices and methodologies of ${own[o]}.`;
    }
    const s1 = q % 3;
    const s2 = (q + 1) % 3;
    const s3 = (q + 2) % 3;
    bank.questions[q].options[3].weights = { [own[s1]]: 2 };
    bank.questions[q].options[3].reason = `Option directly exercises the distinctive core practices and methodologies of ${own[s1]}.`;
    bank.questions[q].options[4].weights = { [own[s2]]: 1 };
    bank.questions[q].options[4].reason = `Option directly exercises the distinctive core practices and methodologies of ${own[s2]}.`;
    bank.questions[q].options[5].weights = { [own[s3]]: 1 };
    bank.questions[q].options[5].reason = `Option directly exercises the distinctive core practices and methodologies of ${own[s3]}.`;
  }

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Calibrated Q1..Q4 for ${dom}.js`);
}

// 5. Engineering and Science (Size 2)
for (const dom of ["engineering", "science"]) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bank = (await import(`file://${filePath}?t=${Date.now()}`)).default;
  const own = getRoadmapsByDomain(dom);

  // Q1..Q4:
  for (let q = 0; q < 4; q++) {
    bank.questions[q].options[0].weights = { [own[0]]: 3 };
    bank.questions[q].options[0].reason = `Option directly exercises the distinctive core practices and methodologies of ${own[0]}.`;
    bank.questions[q].options[1].weights = { [own[1]]: 3 };
    bank.questions[q].options[1].reason = `Option directly exercises the distinctive core practices and methodologies of ${own[1]}.`;
    const s1 = q % 2;
    const s2 = (q + 1) % 2;
    bank.questions[q].options[2].weights = { [own[s1]]: 2 };
    bank.questions[q].options[2].reason = `Option directly exercises the distinctive core practices and methodologies of ${own[s1]}.`;
    bank.questions[q].options[3].weights = { [own[0]]: 1 };
    bank.questions[q].options[3].reason = `Option directly exercises the distinctive core practices and methodologies of ${own[0]}.`;
    bank.questions[q].options[4].weights = { [own[1]]: 1 };
    bank.questions[q].options[4].reason = `Option directly exercises the distinctive core practices and methodologies of ${own[1]}.`;
    bank.questions[q].options[5].weights = { [own[s2]]: 1 };
    bank.questions[q].options[5].reason = `Option directly exercises the distinctive core practices and methodologies of ${own[s2]}.`;
  }

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Calibrated Q1..Q4 for ${dom}.js`);
}

console.log("All 11 banks Q1..Q4 calibrated successfully!");
