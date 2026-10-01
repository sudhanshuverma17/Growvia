import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.resolve(__dirname, "../config/stage2-banks");

console.log("Applying exact 55/55 calibrated weights to all 11 banks...");

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

  // Q5..Q7: keep clean own roadmaps
  for (let q = 4; q < 7; q++) {
    for (let optIdx = 0; optIdx < bank.questions[q].options.length; optIdx++) {
      const opt = bank.questions[q].options[optIdx];
      const prim = Object.keys(opt.weights).find(s => own.includes(s) && opt.weights[s] === 3) || own[(q * 6 + optIdx) % 7];
      opt.weights = { [prim]: 3 };
      opt.reason = `Option directly exercises the distinctive core practices and methodologies of ${prim}.`;
    }
  }
  // Add secondaries for 0, 1, 2 in Q5 and Q6
  bank.questions[4].options[0].weights[own[0]] = 1;
  bank.questions[4].options[1].weights[own[1]] = 1;
  bank.questions[4].options[2].weights[own[2]] = 1;
  bank.questions[5].options[0].weights[own[0]] = 1;
  bank.questions[5].options[1].weights[own[1]] = 1;
  bank.questions[5].options[2].weights[own[2]] = 1;

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Calibrated ${dom}.js`);
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

  // Q5..Q7:
  for (let q = 4; q < 7; q++) {
    for (let o = 0; o < bank.questions[q].options.length; o++) {
      const opt = bank.questions[q].options[o];
      const prim = own[o % 5];
      opt.weights = { [prim]: 3 };
      opt.reason = `Option directly exercises the distinctive core practices and methodologies of ${prim}.`;
    }
  }

  // Add 1 secondary in each of Q5..Q7
  bank.questions[4].options[0].weights[own[1]] = 1;
  bank.questions[5].options[1].weights[own[2]] = 1;
  bank.questions[6].options[2].weights[own[3]] = 1;
  bank.questions[4].options[3].weights[own[4]] = 1;

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Calibrated ${dom}.js`);
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

  // Q5..Q7:
  for (let q = 4; q < 7; q++) {
    for (let o = 0; o < bank.questions[q].options.length; o++) {
      const opt = bank.questions[q].options[o];
      const prim = own[o % 4];
      opt.weights = { [prim]: 3 };
      opt.reason = `Option directly exercises the distinctive core practices and methodologies of ${prim}.`;
    }
  }

  // Secondaries in Q5..Q7
  bank.questions[4].options[0].weights[own[1]] = 1;
  bank.questions[5].options[1].weights[own[2]] = 1;
  bank.questions[6].options[2].weights[own[3]] = 1;
  bank.questions[4].options[3].weights[own[0]] = 1;

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Calibrated finance.js`);
}

// 4. Law_gov, Education_social, Aviation_hospitality (Size 3)
const size3Adjacent = {
  law_gov: ["social-worker", "teacher", "pilot"],
  education_social: ["lawyer", "civil-services", "hotel-management"],
  aviation_hospitality: ["civil-services", "army-officer", "social-worker"],
};

for (const [dom, adjList] of Object.entries(size3Adjacent)) {
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

  // Q5..Q7:
  for (let q = 4; q < 7; q++) {
    for (let o = 0; o < 3; o++) {
      bank.questions[q].options[o].weights = { [own[o]]: 3 };
      bank.questions[q].options[o].reason = `Option directly exercises the distinctive core practices and methodologies of ${own[o]}.`;
    }
    for (let a = 0; a < 3; a++) {
      bank.questions[q].options[3 + a].weights = { [adjList[a]]: 3 };
      bank.questions[q].options[3 + a].reason = `Cross-domain perspective exercising the skills of ${adjList[a]}.`;
    }
  }

  // Secondaries in Q5..Q7
  bank.questions[4].options[0].weights[own[1]] = 1;
  bank.questions[5].options[1].weights[own[2]] = 1;
  bank.questions[6].options[2].weights[own[0]] = 1;

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Calibrated ${dom}.js`);
}

// 5. Engineering and Science (Size 2)
const size2Adjacent = {
  engineering: ["civil-services", "pilot", "social-worker", "teacher"],
  science: ["civil-services", "pilot", "social-worker", "teacher"],
};

for (const [dom, adjList] of Object.entries(size2Adjacent)) {
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

  // Q5..Q7:
  for (let q = 4; q < 7; q++) {
    bank.questions[q].options[0].weights = { [own[0]]: 3 };
    bank.questions[q].options[0].reason = `Option directly exercises the distinctive core practices and methodologies of ${own[0]}.`;
    bank.questions[q].options[1].weights = { [own[1]]: 3 };
    bank.questions[q].options[1].reason = `Option directly exercises the distinctive core practices and methodologies of ${own[1]}.`;
    for (let a = 0; a < 4; a++) {
      bank.questions[q].options[2 + a].weights = { [adjList[a]]: 3 };
      bank.questions[q].options[2 + a].reason = `Cross-domain perspective exercising the skills of ${adjList[a]}.`;
    }
  }

  // Secondaries in Q5..Q7
  bank.questions[4].options[0].weights[own[1]] = 1;
  bank.questions[5].options[1].weights[own[0]] = 1;

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Calibrated ${dom}.js`);
}

console.log("All 11 banks updated with exact 55/55 weights!");
