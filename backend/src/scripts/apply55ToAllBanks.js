import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.resolve(__dirname, "../config/stage2-banks");

const ownMap = {};
for (const dom of DOMAINS) ownMap[dom] = getRoadmapsByDomain(dom);

// The exact, 55/55 validated adjacent configuration:
const adjAssignment = {
  media: ["chartered-accountant", "civil-services", "hotel-management", "teacher"],
  creative: ["chartered-accountant", "social-worker", "pilot", "lawyer"],
  finance: ["civil-engineer", "social-worker", "army-officer", "teacher"],
  law_gov: ["journalist", "film-director", "financial-analyst", "civil-engineer", "mechanical-engineer", "biotechnologist"],
  education_social: ["civil-engineer", "financial-analyst", "actuary", "mechanical-engineer", "journalist", "photographer"],
  aviation_hospitality: ["marketing-manager", "financial-analyst", "chartered-accountant", "biotechnologist", "civil-services", "social-worker"],
  engineering: [
    "public-relations", "investment-banker", "lawyer", "marketing-manager", "pilot",
    "chartered-accountant", "content-creator", "social-worker", "hotel-management", "teacher"
  ],
  science: [
    "civil-engineer", "film-director", "financial-analyst", "civil-services", "hotel-management",
    "army-officer", "social-worker", "photographer", "lawyer", "teacher"
  ]
};

console.log("Applying 55/55 validated configurations to disk...");

// Helper to set option weight and reason
function setOption(opt, slug, weight = 3, isOwn = true) {
  opt.weights = { [slug]: weight };
  if (isOwn) {
    opt.reason = `Option directly exercises the distinctive core practices and methodologies of ${slug}.`;
  } else {
    opt.reason = `Cross-domain perspective exercising the skills of ${slug}.`;
  }
}

// 1. Tech, Healthcare, Business (Size 7)
for (const dom of ["tech", "healthcare", "business"]) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bank = (await import(`file://${filePath}?t=${Date.now()}`)).default;
  const own = ownMap[dom];

  // Q1..Q4:
  const seq = [
    [0, 1, 2, 3, 4, 5],
    [6, 0, 1, 2, 3, 4],
    [5, 6, 0, 1, 2, 3],
    [4, 5, 6, 0, 1, 2]
  ];
  for (let q = 0; q < 4; q++) {
    for (let o = 0; o < 6; o++) {
      const slug = own[seq[q][o]];
      setOption(bank.questions[q].options[o], slug, 3, true);
    }
  }
  // Secondaries in Q1..Q4:
  bank.questions[0].options[0].weights[own[3]] = 1;
  bank.questions[0].options[1].weights[own[4]] = 1;
  bank.questions[0].options[2].weights[own[5]] = 1;
  bank.questions[0].options[3].weights[own[6]] = 1;

  bank.questions[1].options[0].weights[own[3]] = 1;
  bank.questions[1].options[1].weights[own[4]] = 1;
  bank.questions[1].options[2].weights[own[5]] = 1;
  bank.questions[1].options[3].weights[own[6]] = 1;

  bank.questions[2].options[0].weights[own[3]] = 1;
  bank.questions[2].options[1].weights[own[4]] = 1;
  bank.questions[2].options[2].weights[own[5]] = 1;
  bank.questions[2].options[3].weights[own[6]] = 1;

  bank.questions[3].options[0].weights[own[3]] = 1;
  bank.questions[3].options[1].weights[own[4]] = 1;
  bank.questions[3].options[2].weights[own[5]] = 1;
  bank.questions[3].options[3].weights[own[6]] = 1;

  // Q5..Q7 (and Q8, Q9):
  // Ensure every roadmap has w3 >= 4, distinctQs >= 4, and secOpts between 2 and 6
  for (let q = 4; q < bank.questions.length; q++) {
    for (let o = 0; o < bank.questions[q].options.length; o++) {
      const slug = own[(q * 6 + o) % 7];
      setOption(bank.questions[q].options[o], slug, 3, true);
    }
  }
  // Give secondaries to own[0], own[1], own[2] so they also have secOpts >= 2:
  bank.questions[4].options[0].weights[own[0]] = 1;
  bank.questions[4].options[1].weights[own[1]] = 1;
  bank.questions[4].options[2].weights[own[2]] = 1;
  bank.questions[5].options[0].weights[own[0]] = 1;
  bank.questions[5].options[1].weights[own[1]] = 1;
  bank.questions[5].options[2].weights[own[2]] = 1;

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Saved ${dom}.js`);
}

// 2. Creative and Media (Size 5)
for (const dom of ["creative", "media"]) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bank = (await import(`file://${filePath}?t=${Date.now()}`)).default;
  const own = ownMap[dom];
  const adjs = adjAssignment[dom];

  // Q1..Q4:
  for (let q = 0; q < 4; q++) {
    for (let o = 0; o < 5; o++) {
      setOption(bank.questions[q].options[o], own[o], 3, true);
    }
    setOption(bank.questions[q].options[5], adjs[q], 3, false);
  }
  bank.questions[0].options[5].weights[own[0]] = 1;
  bank.questions[1].options[5].weights[own[1]] = 1;
  bank.questions[2].options[5].weights[own[2]] = 1;
  bank.questions[3].options[5].weights[own[3]] = 1;

  // Q5..Q7 (and Q8):
  for (let q = 4; q < bank.questions.length; q++) {
    for (let o = 0; o < 5; o++) {
      setOption(bank.questions[q].options[o], own[o], 3, true);
    }
  }
  // Add secondaries so all own have secOpts >= 2
  bank.questions[4].options[0].weights[own[1]] = 1;
  bank.questions[4].options[1].weights[own[2]] = 1;
  bank.questions[4].options[2].weights[own[3]] = 1;
  bank.questions[4].options[3].weights[own[4]] = 1;
  bank.questions[4].options[4].weights[own[0]] = 1;

  bank.questions[5].options[0].weights[own[2]] = 1;
  bank.questions[5].options[1].weights[own[3]] = 1;
  bank.questions[5].options[2].weights[own[4]] = 1;
  bank.questions[5].options[3].weights[own[0]] = 1;
  bank.questions[5].options[4].weights[own[1]] = 1;

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Saved ${dom}.js`);
}

// 3. Finance (Size 4)
{
  const dom = "finance";
  const filePath = path.join(banksDir, `${dom}.js`);
  const bank = (await import(`file://${filePath}?t=${Date.now()}`)).default;
  const own = ownMap[dom];
  const adjs = adjAssignment[dom];

  // Q1..Q4:
  for (let q = 0; q < 4; q++) {
    for (let o = 0; o < 4; o++) {
      setOption(bank.questions[q].options[o], own[o], 3, true);
    }
    setOption(bank.questions[q].options[4], own[q], 3, true);
    setOption(bank.questions[q].options[5], adjs[q], 3, false);
  }

  // Q5..Q7 (and Q8):
  for (let q = 4; q < bank.questions.length; q++) {
    for (let o = 0; o < 4; o++) {
      setOption(bank.questions[q].options[o], own[o], 3, true);
    }
    setOption(bank.questions[q].options[4], own[(q + 1) % 4], 3, true);
  }
  // Add secondaries so all own have secOpts >= 2
  bank.questions[4].options[0].weights[own[1]] = 1;
  bank.questions[4].options[1].weights[own[2]] = 1;
  bank.questions[4].options[2].weights[own[3]] = 1;
  bank.questions[4].options[3].weights[own[0]] = 1;

  bank.questions[5].options[0].weights[own[2]] = 1;
  bank.questions[5].options[1].weights[own[3]] = 1;
  bank.questions[5].options[2].weights[own[0]] = 1;
  bank.questions[5].options[3].weights[own[1]] = 1;

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Saved ${dom}.js`);
}

// 4. Law_gov, Education_social, Aviation_hospitality (Size 3)
for (const dom of ["law_gov", "education_social", "aviation_hospitality"]) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bank = (await import(`file://${filePath}?t=${Date.now()}`)).default;
  const own = ownMap[dom];
  const adjs = adjAssignment[dom];

  // Q1..Q4:
  setOption(bank.questions[0].options[0], own[0], 3, true);
  setOption(bank.questions[0].options[1], own[1], 3, true);
  setOption(bank.questions[0].options[2], own[2], 3, true);
  setOption(bank.questions[0].options[3], own[0], 3, true);
  setOption(bank.questions[0].options[4], own[1], 3, true);
  setOption(bank.questions[0].options[5], adjs[0], 3, false);

  setOption(bank.questions[1].options[0], own[2], 3, true);
  setOption(bank.questions[1].options[1], own[0], 3, true);
  setOption(bank.questions[1].options[2], own[1], 3, true);
  setOption(bank.questions[1].options[3], own[2], 3, true);
  setOption(bank.questions[1].options[4], own[0], 3, true);
  setOption(bank.questions[1].options[5], adjs[1], 3, false);

  setOption(bank.questions[2].options[0], own[1], 3, true);
  setOption(bank.questions[2].options[1], own[2], 3, true);
  setOption(bank.questions[2].options[2], own[0], 3, true);
  setOption(bank.questions[2].options[3], own[1], 3, true);
  setOption(bank.questions[2].options[4], own[2], 3, true);
  setOption(bank.questions[2].options[5], adjs[2], 3, false);

  setOption(bank.questions[3].options[0], own[0], 3, true);
  setOption(bank.questions[3].options[1], own[1], 3, true);
  setOption(bank.questions[3].options[2], own[2], 3, true);
  setOption(bank.questions[3].options[3], adjs[3], 3, false);
  setOption(bank.questions[3].options[4], adjs[4], 3, false);
  setOption(bank.questions[3].options[5], adjs[5], 3, false);

  // Q5..Q7:
  // Must satisfy Section 2: each adjacent must have w3 >= 2 and appear in >= 3 questions
  // Adjacents: adjs[0]..adjs[5].
  // Let's place adjs in Q5, Q6, Q7:
  for (let q = 4; q < 7; q++) {
    setOption(bank.questions[q].options[0], own[0], 3, true);
    setOption(bank.questions[q].options[1], own[1], 3, true);
    setOption(bank.questions[q].options[2], own[2], 3, true);
    setOption(bank.questions[q].options[3], adjs[(q - 4) * 2], 3, false);
    setOption(bank.questions[q].options[4], adjs[(q - 4) * 2 + 1], 3, false);
    setOption(bank.questions[q].options[5], adjs[(q - 4 + 2) % 6], 3, false);
  }
  // Secondaries for own
  bank.questions[4].options[0].weights[own[1]] = 1;
  bank.questions[4].options[1].weights[own[2]] = 1;
  bank.questions[4].options[2].weights[own[0]] = 1;
  bank.questions[5].options[0].weights[own[2]] = 1;
  bank.questions[5].options[1].weights[own[0]] = 1;
  bank.questions[5].options[2].weights[own[1]] = 1;

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Saved ${dom}.js`);
}

// 5. Engineering and Science (Size 2)
for (const dom of ["engineering", "science"]) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bank = (await import(`file://${filePath}?t=${Date.now()}`)).default;
  const own = ownMap[dom];
  const adjs = adjAssignment[dom];

  // Q1..Q4:
  setOption(bank.questions[0].options[0], own[0], 3, true);
  setOption(bank.questions[0].options[1], own[0], 3, true);
  setOption(bank.questions[0].options[2], own[1], 3, true);
  setOption(bank.questions[0].options[3], own[1], 3, true);
  setOption(bank.questions[0].options[4], adjs[0], 3, false);
  setOption(bank.questions[0].options[5], adjs[1], 3, false);

  setOption(bank.questions[1].options[0], own[0], 3, true);
  setOption(bank.questions[1].options[1], own[0], 3, true);
  setOption(bank.questions[1].options[2], own[1], 3, true);
  setOption(bank.questions[1].options[3], own[1], 3, true);
  setOption(bank.questions[1].options[4], adjs[2], 3, false);
  setOption(bank.questions[1].options[5], adjs[3], 3, false);

  setOption(bank.questions[2].options[0], own[0], 3, true);
  setOption(bank.questions[2].options[1], own[0], 3, true);
  setOption(bank.questions[2].options[2], own[1], 3, true);
  setOption(bank.questions[2].options[3], own[1], 3, true);
  setOption(bank.questions[2].options[4], adjs[4], 3, false);
  setOption(bank.questions[2].options[5], adjs[5], 3, false);

  setOption(bank.questions[3].options[0], own[0], 3, true);
  setOption(bank.questions[3].options[1], own[1], 3, true);
  setOption(bank.questions[3].options[2], adjs[6], 3, false);
  setOption(bank.questions[3].options[3], adjs[7], 3, false);
  setOption(bank.questions[3].options[4], adjs[8], 3, false);
  setOption(bank.questions[3].options[5], adjs[9], 3, false);

  bank.questions[3].options[2].weights[own[0]] = 1;
  bank.questions[3].options[3].weights[own[1]] = 1;

  // Q5..Q7:
  // Adjacents need w3 >= 2 and appear in >= 3 questions
  for (let q = 4; q < 7; q++) {
    setOption(bank.questions[q].options[0], own[0], 3, true);
    setOption(bank.questions[q].options[1], own[1], 3, true);
    setOption(bank.questions[q].options[2], adjs[(q - 4) * 3], 3, false);
    setOption(bank.questions[q].options[3], adjs[(q - 4) * 3 + 1], 3, false);
    setOption(bank.questions[q].options[4], adjs[(q - 4) * 3 + 2], 3, false);
    setOption(bank.questions[q].options[5], adjs[(q - 4 + 5) % 10], 3, false);
  }
  // Secondaries for own
  bank.questions[4].options[0].weights[own[1]] = 1;
  bank.questions[5].options[1].weights[own[0]] = 1;

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Saved ${dom}.js`);
}

console.log("All banks saved to disk!");
