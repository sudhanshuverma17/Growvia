import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.resolve(__dirname, "../config/stage2-banks");

// Format engineering.js
const engPath = path.join(banksDir, "engineering.js");
const eng = (await import(`file://${engPath}?t=${Date.now()}`)).default;

// In Q1..Q4 (indices 0..3):
// opt 0, 1, 2 -> mechanical-engineer (w=3)
// opt 3, 4, 5 -> civil-engineer (w=3)
// Add 1 secondary in each question
for (let q = 0; q < 4; q++) {
  const quest = eng.questions[q];
  quest.options[0].weights = { "mechanical-engineer": 3, "civil-engineer": 1 };
  quest.options[1].weights = { "mechanical-engineer": 3 };
  quest.options[2].weights = { "mechanical-engineer": 3 };
  quest.options[3].weights = { "civil-engineer": 3, "mechanical-engineer": 1 };
  quest.options[4].weights = { "civil-engineer": 3 };
  quest.options[5].weights = { "civil-engineer": 3 };
}

// In Q5..Q7 (indices 4..6):
// Ensure each of pilot, civil-services, social-worker, teacher has w=3 in >= 2 options and appears in 3 questions
// Q5: mech, civil, pilot, civil-services, social-worker, teacher
eng.questions[4].options[0].weights = { "mechanical-engineer": 3 };
eng.questions[4].options[1].weights = { "civil-engineer": 3 };
eng.questions[4].options[2].weights = { "pilot": 3 };
eng.questions[4].options[3].weights = { "civil-services": 3 };
eng.questions[4].options[4].weights = { "social-worker": 3 };
eng.questions[4].options[5].weights = { "teacher": 3 };

// Q6: mech, civil, pilot, civil-services, social-worker, teacher
eng.questions[5].options[0].weights = { "mechanical-engineer": 3 };
eng.questions[5].options[1].weights = { "civil-engineer": 3 };
eng.questions[5].options[2].weights = { "pilot": 3 };
eng.questions[5].options[3].weights = { "civil-services": 3 };
eng.questions[5].options[4].weights = { "social-worker": 3 };
eng.questions[5].options[5].weights = { "teacher": 3 };

// Q7: mech, civil, pilot, civil-services, social-worker, teacher
eng.questions[6].options[0].weights = { "mechanical-engineer": 3 };
eng.questions[6].options[1].weights = { "civil-engineer": 3 };
eng.questions[6].options[2].weights = { "pilot": 3 };
eng.questions[6].options[3].weights = { "civil-services": 3 };
eng.questions[6].options[4].weights = { "social-worker": 3 };
eng.questions[6].options[5].weights = { "teacher": 3 };

fs.writeFileSync(engPath, `export default ${JSON.stringify(eng, null, 2)};\n`);

// Format science.js
const sciPath = path.join(banksDir, "science.js");
const sci = (await import(`file://${sciPath}?t=${Date.now()}`)).default;

for (let q = 0; q < 4; q++) {
  const quest = sci.questions[q];
  quest.options[0].weights = { "biotechnologist": 3, "environmental-scientist": 1 };
  quest.options[1].weights = { "biotechnologist": 3 };
  quest.options[2].weights = { "biotechnologist": 3 };
  quest.options[3].weights = { "environmental-scientist": 3, "biotechnologist": 1 };
  quest.options[4].weights = { "environmental-scientist": 3 };
  quest.options[5].weights = { "environmental-scientist": 3 };
}

// Q5..Q7 for science
for (let q = 4; q < 7; q++) {
  const quest = sci.questions[q];
  quest.options[0].weights = { "biotechnologist": 3 };
  quest.options[1].weights = { "environmental-scientist": 3 };
  quest.options[2].weights = { "pilot": 3 };
  quest.options[3].weights = { "civil-services": 3 };
  quest.options[4].weights = { "social-worker": 3 };
  quest.options[5].weights = { "teacher": 3 };
}

fs.writeFileSync(sciPath, `export default ${JSON.stringify(sci, null, 2)};\n`);
console.log("Updated engineering.js and science.js cleanly!");
