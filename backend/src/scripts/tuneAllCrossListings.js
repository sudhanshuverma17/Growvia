import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.join(__dirname, "../config/stage2-banks");

// =========================================================================
// 1. TUNE HEALTHCARE.JS
// =========================================================================
const healthPath = path.join(banksDir, "healthcare.js");
const healthModule = await import(`file://${healthPath}`);
const healthBank = healthModule.default;

// Clean cross-listed secondaries
for (const q of healthBank.questions) {
  for (const opt of q.options) {
    for (const cross of ["biotechnologist", "environmental-scientist", "social-worker"]) {
      if (opt.weights[cross]) delete opt.weights[cross];
    }
  }
}

// biotechnologist: pharmacist (Q1), doctor (Q3), dentist (Q5), physiotherapist (Q7)
healthBank.questions[0].options[3].weights["biotechnologist"] = 2; // Q1 opt4 (pharmacist)
healthBank.questions[2].options[1].weights["biotechnologist"] = 2; // Q3 opt2 (doctor)
healthBank.questions[4].options[1].weights["biotechnologist"] = 2; // Q5 opt2 (dentist)
healthBank.questions[6].options[2].weights["biotechnologist"] = 2; // Q7 opt3 (physiotherapist)

// environmental-scientist: nutritionist (Q1), fitness-trainer (Q2), psychologist (Q4), doctor (Q6)
healthBank.questions[0].options[4].weights["environmental-scientist"] = 2; // Q1 opt5 (nutritionist)
healthBank.questions[1].options[0].weights["environmental-scientist"] = 2; // Q2 opt1 (fitness-trainer)
healthBank.questions[3].options[5].weights["environmental-scientist"] = 2; // Q4 opt6 (psychologist)
healthBank.questions[5].options[1].weights["environmental-scientist"] = 2; // Q6 opt2 (doctor)

// social-worker: doctor (Q2), psychologist (Q4), physiotherapist (Q6), nutritionist (Q8)
healthBank.questions[1].options[1].weights["social-worker"] = 2; // Q2 opt2 (doctor)
healthBank.questions[3].options[1].weights["social-worker"] = 2; // Q4 opt2 (psychologist)
healthBank.questions[5].options[0].weights["social-worker"] = 2; // Q6 opt1 (physiotherapist)
healthBank.questions[7].options[4].weights["social-worker"] = 2; // Q8 opt5 (nutritionist)

fs.writeFileSync(healthPath, `export default ${JSON.stringify(healthBank, null, 2)};\n`, "utf-8");
console.log("✅ Updated healthcare.js");

// =========================================================================
// 2. TUNE MEDIA.JS
// =========================================================================
const mediaPath = path.join(banksDir, "media.js");
const mediaModule = await import(`file://${mediaPath}`);
const mediaBank = mediaModule.default;

for (const q of mediaBank.questions) {
  for (const opt of q.options) {
    for (const cross of ["digital-marketer", "graphic-designer", "ed-tech"]) {
      if (opt.weights[cross]) delete opt.weights[cross];
    }
  }
}

// digital-marketer: public-relations (Q1), content-creator (Q2), photographer (Q5), journalist (Q7)
mediaBank.questions[0].options[4].weights["digital-marketer"] = 2; // Q1 opt5 (PR)
mediaBank.questions[1].options[0].weights["digital-marketer"] = 2; // Q2 opt1 (content-creator)
mediaBank.questions[4].options[2].weights["digital-marketer"] = 2; // Q5 opt3 (photographer)
mediaBank.questions[6].options[3].weights["digital-marketer"] = 2; // Q7 opt4 (journalist)

// ed-tech: content-creator (Q3), film-director (Q4), public-relations (Q6), journalist (Q8)
mediaBank.questions[2].options[0].weights["ed-tech"] = 2; // Q3 opt1 (content-creator)
mediaBank.questions[3].options[1].weights["ed-tech"] = 2; // Q4 opt2 (film-director)
mediaBank.questions[5].options[4].weights["ed-tech"] = 2; // Q6 opt5 (PR)
mediaBank.questions[7].options[3].weights["ed-tech"] = 2; // Q8 opt4 (journalist)

// graphic-designer: content-creator (Q1), film-director (Q2), photographer (Q3), public-relations (Q7)
mediaBank.questions[0].options[0].weights["graphic-designer"] = 2; // Q1 opt1 (content-creator)
mediaBank.questions[1].options[1].weights["graphic-designer"] = 2; // Q2 opt2 (film-director)
mediaBank.questions[2].options[2].weights["graphic-designer"] = 2; // Q3 opt3 (photographer)
mediaBank.questions[6].options[4].weights["graphic-designer"] = 2; // Q7 opt5 (PR)

fs.writeFileSync(mediaPath, `export default ${JSON.stringify(mediaBank, null, 2)};\n`, "utf-8");
console.log("✅ Updated media.js");

// =========================================================================
// 3. TUNE CREATIVE.JS
// =========================================================================
const creatPath = path.join(banksDir, "creative.js");
const creatModule = await import(`file://${creatPath}`);
const creatBank = creatModule.default;

for (const q of creatBank.questions) {
  for (const opt of q.options) {
    for (const cross of ["game-developer", "film-director", "photographer", "civil-engineer"]) {
      if (opt.weights[cross]) delete opt.weights[cross];
    }
  }
}

// game-developer: designer (Q1), graphic-designer (Q3), interior-designer (Q5), fashion-designer (Q7)
creatBank.questions[0].options[0].weights["game-developer"] = 2; // Q1 opt1 (designer)
creatBank.questions[2].options[1].weights["game-developer"] = 2; // Q3 opt2 (graphic-designer)
creatBank.questions[4].options[3].weights["game-developer"] = 2; // Q5 opt4 (interior-designer)
creatBank.questions[6].options[4].weights["game-developer"] = 2; // Q7 opt5 (fashion-designer)

// film-director: graphic-designer (Q2), interior-designer (Q4), fashion-designer (Q6), architect (Q8)
creatBank.questions[1].options[1].weights["film-director"] = 2; // Q2 opt2 (graphic-designer)
creatBank.questions[3].options[3].weights["film-director"] = 2; // Q4 opt4 (interior-designer)
creatBank.questions[5].options[4].weights["film-director"] = 2; // Q6 opt5 (fashion-designer)
creatBank.questions[7].options[2].weights["film-director"] = 2; // Q8 opt3 (architect)

// civil-engineer: architect (Q1), interior-designer (Q3), fashion-designer (Q5), designer (Q7)
creatBank.questions[0].options[2].weights["civil-engineer"] = 2; // Q1 opt3 (architect)
creatBank.questions[2].options[3].weights["civil-engineer"] = 2; // Q3 opt4 (interior-designer)
creatBank.questions[4].options[4].weights["civil-engineer"] = 2; // Q5 opt5 (fashion-designer)
creatBank.questions[6].options[0].weights["civil-engineer"] = 2; // Q7 opt1 (designer)

// photographer: interior-designer (Q2), fashion-designer (Q4), designer (Q6), graphic-designer (Q8)
creatBank.questions[1].options[3].weights["photographer"] = 2; // Q2 opt4 (interior-designer)
creatBank.questions[3].options[4].weights["photographer"] = 2; // Q4 opt5 (fashion-designer)
creatBank.questions[5].options[0].weights["photographer"] = 2; // Q6 opt1 (designer)
creatBank.questions[7].options[1].weights["photographer"] = 2; // Q8 opt2 (graphic-designer)

fs.writeFileSync(creatPath, `export default ${JSON.stringify(creatBank, null, 2)};\n`, "utf-8");
console.log("✅ Updated creative.js");

// =========================================================================
// 4. TUNE FINANCE.JS
// =========================================================================
const finPath = path.join(banksDir, "finance.js");
const finModule = await import(`file://${finPath}`);
const finBank = finModule.default;

for (const q of finBank.questions) {
  for (const opt of q.options) {
    for (const cross of ["lawyer", "startup-founder", "data-scientist", "mba-manager"]) {
      if (opt.weights[cross]) delete opt.weights[cross];
    }
  }
}

// lawyer: chartered-accountant (Q1), investment-banker (Q3), financial-analyst (Q5), actuary (Q7)
finBank.questions[0].options[0].weights["lawyer"] = 2; // Q1 opt1 (CA)
finBank.questions[2].options[1].weights["lawyer"] = 2; // Q3 opt2 (IB)
finBank.questions[4].options[2].weights["lawyer"] = 2; // Q5 opt3 (FA)
finBank.questions[6].options[3].weights["lawyer"] = 2; // Q7 opt4 (ACT)

// startup-founder: investment-banker (Q2), chartered-accountant (Q4), actuary (Q6), financial-analyst (Q7)
finBank.questions[1].options[1].weights["startup-founder"] = 2; // Q2 opt2 (IB)
finBank.questions[3].options[0].weights["startup-founder"] = 2; // Q4 opt1 (CA)
finBank.questions[5].options[3].weights["startup-founder"] = 2; // Q6 opt4 (ACT)
finBank.questions[6].options[2].weights["startup-founder"] = 2; // Q7 opt3 (FA)

// data-scientist: financial-analyst (Q1), actuary (Q2), investment-banker (Q5), chartered-accountant (Q6)
finBank.questions[0].options[2].weights["data-scientist"] = 2; // Q1 opt3 (FA)
finBank.questions[1].options[3].weights["data-scientist"] = 2; // Q2 opt4 (ACT)
finBank.questions[4].options[1].weights["data-scientist"] = 2; // Q5 opt2 (IB)
finBank.questions[5].options[0].weights["data-scientist"] = 2; // Q6 opt1 (CA)

// mba-manager: actuary (Q1), financial-analyst (Q3), investment-banker (Q4), chartered-accountant (Q7)
finBank.questions[0].options[3].weights["mba-manager"] = 2; // Q1 opt4 (ACT)
finBank.questions[2].options[2].weights["mba-manager"] = 2; // Q3 opt3 (FA)
finBank.questions[3].options[1].weights["mba-manager"] = 2; // Q4 opt2 (IB)
finBank.questions[6].options[0].weights["mba-manager"] = 2; // Q7 opt1 (CA)

fs.writeFileSync(finPath, `export default ${JSON.stringify(finBank, null, 2)};\n`, "utf-8");
console.log("✅ Updated finance.js");
