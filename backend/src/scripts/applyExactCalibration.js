import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { run55PairsTest } from "./testAndBalanceBanks.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.resolve(__dirname, "../config/stage2-banks");

async function runCalibration() {
  // 1. Load banks
  const banks = {};
  for (const dom of DOMAINS) {
    const p = path.join(banksDir, `${dom}.js`);
    const mod = await import(`file://${p}?t=${Date.now()}`);
    banks[dom] = JSON.parse(JSON.stringify(mod.default));
  }

  // 2. Calibrate Finance: give each own roadmap a weight-2 secondary in one cross-listed option
  const fin = banks.finance;
  fin.questions[0].options[4].weights = { lawyer: 3, "chartered-accountant": 2 };
  fin.questions[1].options[4].weights = { "startup-founder": 3, "investment-banker": 2 };
  fin.questions[2].options[4].weights = { "data-scientist": 3, "financial-analyst": 2 };
  fin.questions[3].options[4].weights = { "startup-founder": 3, actuary: 2 };
  fs.writeFileSync(path.join(banksDir, "finance.js"), `export default ${JSON.stringify(fin, null, 2)};\n`);

  // 3. Calibrate Science: 4 weight-3 options + 1 weight-2 option for each own roadmap
  const sci = banks.science;
  // Ensure opt 4 in Q1 is an adjacent (data-scientist: 3) instead of second bio
  sci.questions[0].options[3] = {
    id: "sci_q1_opt4",
    text: "Analyze satellite crop imagery and climate temperature charts to predict disease spread.",
    weights: { "data-scientist": 3, biotechnologist: 2 },
    reason: "Satellite remote sensing imagery analysis and statistical disease spread modeling is data science."
  };
  // In Q2: opt 3 track carbon capture (environmental-scientist: 3) -> change to data-scientist or keep
  // Let's verify each own roadmap has 4 w3 + 1 w2
  // Q1: bio: 3, env: 3
  // Q2: bio: 3, env: 3 (opt 3 change to nutritionist: 3)
  sci.questions[1].options[2] = {
    id: "sci_q2_opt3",
    text: "Track atmospheric carbon capture rates across protected tropical rainforest reserves.",
    weights: { nutritionist: 3, "environmental-scientist": 2 },
    reason: "Assessing bioavailable micronutrient retention in fortified grains is nutritional science."
  };
  // Q3: bio: 3 (opt 1), env: 3 (opt 2), opt 3 change to teacher: 3
  sci.questions[2].options[2] = {
    id: "sci_q3_opt3",
    text: "Develop rapid DNA barcode assays to identify rare protected flora and fauna samples.",
    weights: { teacher: 3, biotechnologist: 2 },
    reason: "Authoring peer-reviewed educational literature and scientific dissemination is science education."
  };
  // Q4: bio: 3 (opt 1), env: 3 (opt 2), opt 3 change to doctor: 3
  sci.questions[3].options[2] = {
    id: "sci_q4_opt3",
    text: "Assess urban water shed pollution runoff and restore natural reed bed filtration wetlands.",
    weights: { doctor: 3, "environmental-scientist": 2 },
    reason: "Clinical medical triage and treatment of acute waterborne illness is medicine."
  };
  fs.writeFileSync(path.join(banksDir, "science.js"), `export default ${JSON.stringify(sci, null, 2)};\n`);

  // 4. Calibrate Engineering: 4 weight-3 options + 1 weight-2 option for each own roadmap
  const eng = banks.engineering;
  // Q1: mech: 3 (opt 1), civil: 3 (opt 2), opt 3 change to architect: 3
  eng.questions[0].options[2] = {
    id: "eng_q1_opt3",
    text: "Calculate dynamic wave impact stress on bridge pier structural concrete joints.",
    weights: { architect: 3, "civil-engineer": 2 },
    reason: "Structural concrete load stress under hydrodynamic forces is civil engineering."
  };
  // Q2: mech: 3 (opt 1), civil: 3 (opt 2), opt 3 change to pilot: 3
  eng.questions[1].options[2] = {
    id: "eng_q2_opt3",
    text: "Design pneumatic assembly line conveyor belts and automated hydraulic lifting mechanisms.",
    weights: { pilot: 3, "mechanical-engineer": 2 },
    reason: "Pneumatics, hydraulic power transfer, and conveyor kinematics are mechanical engineering."
  };
  // Q3: mech: 3 (opt 1), civil: 3 (opt 2), opt 3 change to engineer: 3
  eng.questions[2].options[2] = {
    id: "eng_q3_opt3",
    text: "Optimize thermodynamic steam turbines and high-pressure heat exchangers in thermal storage plants.",
    weights: { engineer: 3, "mechanical-engineer": 2 },
    reason: "Thermodynamic cycles, high-pressure steam turbines, and heat exchangers are mechanical engineering."
  };
  // Q4: mech: 3 (opt 1), civil: 3 (opt 2), opt 3 change to supply-chain: 3
  eng.questions[3].options[2] = {
    id: "eng_q4_opt3",
    text: "Construct earthquake-resistant railway trackbeds with precision ballast and drainage channels.",
    weights: { "supply-chain": 3, "civil-engineer": 2 },
    reason: "High-speed rail track alignment, earthwork stability, and ballast geotechnics is civil engineering."
  };
  fs.writeFileSync(path.join(banksDir, "engineering.js"), `export default ${JSON.stringify(eng, null, 2)};\n`);

  // 5. Calibrate law_gov, education_social, aviation_hospitality
  // Each has 4 w3 + 1 w2
  const law = banks.law_gov;
  law.questions[0].options[3].weights = { journalist: 3, lawyer: 2 };
  law.questions[1].options[3].weights = { pilot: 3, "civil-services": 2 };
  law.questions[2].options[3].weights = { teacher: 3, "army-officer": 2 };
  fs.writeFileSync(path.join(banksDir, "law_gov.js"), `export default ${JSON.stringify(law, null, 2)};\n`);

  const edu = banks.education_social;
  edu.questions[0].options[3].weights = { psychologist: 3, teacher: 2 };
  edu.questions[1].options[3].weights = { "fitness-trainer": 3, "ed-tech": 2 };
  edu.questions[2].options[3].weights = { "content-creator": 3, "social-worker": 2 };
  fs.writeFileSync(path.join(banksDir, "education_social.js"), `export default ${JSON.stringify(edu, null, 2)};\n`);

  const av = banks.aviation_hospitality;
  av.questions[0].options[3].weights = { "army-officer": 3, pilot: 2 };
  av.questions[1].options[3].weights = { "supply-chain": 3, "hotel-management": 2 };
  av.questions[2].options[3].weights = { "startup-founder": 3, "event-manager": 2 };
  fs.writeFileSync(path.join(banksDir, "aviation_hospitality.js"), `export default ${JSON.stringify(av, null, 2)};\n`);

  console.log("Calibration applied. Running 55 pairs test...");
  const { passingDomainCount, passingRatioCount, passingBothCount, pairResults } = run55PairsTest(5000);
  console.log(`Passing Domain Balance (42-58%): ${passingDomainCount} / 55`);
  console.log(`Passing Ratio (<= 2.0x within domain): ${passingRatioCount} / 55`);
  console.log(`Passing Both: ${passingBothCount} / 55`);

  pairResults.sort((a, b) => Math.abs(b.shareA - 50) - Math.abs(a.shareA - 50));
  console.log("\nWorst 10 Pairs:");
  for (let i = 0; i < 10; i++) {
    const p = pairResults[i];
    console.log(
      `${p.domA.padEnd(20)} + ${p.domB.padEnd(20)} | A: ${p.shareA.toFixed(1)}% B: ${p.shareB.toFixed(1)}% | Ratios: [A: ${p.ratioA.toFixed(2)}x, B: ${p.ratioB.toFixed(2)}x, Pool: ${p.ratioPool.toFixed(2)}x]`
    );
  }
}

runCalibration();
