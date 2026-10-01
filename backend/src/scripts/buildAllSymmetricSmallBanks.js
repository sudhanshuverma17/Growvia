import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { evaluateBank } from "./testSmallTuning.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.join(__dirname, "../config/stage2-banks");

const smallBanksConfig = {
  engineering: {
    own: ["mechanical-engineer", "civil-engineer"],
    adj: ["architect", "pilot", "supply-chain", "environmental-scientist", "engineer", "army-officer"],
  },
  science: {
    own: ["biotechnologist", "environmental-scientist"],
    adj: ["pharmacist", "doctor", "data-scientist", "nutritionist", "civil-engineer", "social-worker", "teacher"],
  },
  law_gov: {
    own: ["lawyer", "civil-services", "army-officer"],
    adj: ["journalist", "public-relations", "social-worker", "pilot", "teacher", "human-resources"],
  },
  education_social: {
    own: ["teacher", "ed-tech", "social-worker"],
    adj: ["psychologist", "content-creator", "human-resources", "civil-services", "journalist", "fitness-trainer"],
  },
  aviation_hospitality: {
    own: ["pilot", "hotel-management", "event-manager"],
    adj: ["army-officer", "mechanical-engineer", "supply-chain", "marketing-manager", "public-relations", "startup-founder"],
  },
};

function buildSymmetricBank(domain, config) {
  const filePath = path.join(banksDir, `${domain}.js`);
  const rawContent = fs.readFileSync(filePath, "utf-8");
  // Parse existing JSON/object
  const bank = JSON.parse(rawContent.replace(/^export default\s+/, "").replace(/;\s*$/, ""));

  const ownSlugs = config.own;
  const adjSlugs = config.adj;
  const nOwn = ownSlugs.length;
  const nAdj = adjSlugs.length;

  let ownCycle = 0;
  let adjCycle = 0;
  let adjSecCycle = 0;

  for (let qi = 0; qi < 7; qi++) {
    const numOwn = qi < 3 ? 4 : 3;
    const numAdj = 6 - numOwn;

    const qOwn = [];
    for (let k = 0; k < numOwn; k++) {
      qOwn.push(ownSlugs[ownCycle % nOwn]);
      ownCycle++;
    }

    const qAdj = [];
    for (let k = 0; k < numAdj; k++) {
      qAdj.push(adjSlugs[adjCycle % nAdj]);
      adjCycle++;
    }

    const optionsPrimaries = [];
    let oi = 0, ai = 0;
    while (oi < qOwn.length || ai < qAdj.length) {
      if (oi < qOwn.length) optionsPrimaries.push(qOwn[oi++]);
      if (ai < qAdj.length) optionsPrimaries.push(qAdj[ai++]);
    }

    for (let optIdx = 0; optIdx < 6; optIdx++) {
      const pSlug = optionsPrimaries[optIdx];
      const opt = bank.questions[qi].options[optIdx];
      opt.weights = { [pSlug]: 3 };

      if (ownSlugs.includes(pSlug)) {
        const secSlug = adjSlugs[adjSecCycle % nAdj];
        adjSecCycle++;
        opt.weights[secSlug] = 2;
      }
    }
  }

  // Ensure each own roadmap has blendCore >= 2
  for (const s of ownSlugs) {
    let hasBlendCore = false;
    for (let qi = 0; qi < 4; qi++) {
      for (const opt of bank.questions[qi].options) {
        if ((opt.weights[s] || 0) >= 2) {
          hasBlendCore = true;
          break;
        }
      }
      if (hasBlendCore) break;
    }
    if (!hasBlendCore) {
      bank.questions[0].options[0].weights[s] = 2;
    }
  }

  // Ensure each own roadmap has between 2 and 6 secondaries
  // Assign 2 or 3 secondaries of weight 1 on adjacent primary options
  for (let i = 0; i < nOwn; i++) {
    const s = ownSlugs[i];
    // Find options where primary is an adjacent slug
    let secCount = 0;
    for (let qi = 0; qi < 7; qi++) {
      for (const opt of bank.questions[qi].options) {
        const pSlug = Object.keys(opt.weights).find(k => opt.weights[k] === 3);
        if (adjSlugs.includes(pSlug) && !opt.weights[s] && Object.keys(opt.weights).length === 1) {
          opt.weights[s] = 1;
          secCount++;
          if (secCount >= 3) break;
        }
      }
      if (secCount >= 3) break;
    }
  }

  return bank;
}

// Build and test all 5
for (const [domain, config] of Object.entries(smallBanksConfig)) {
  console.log(`\n======================================================`);
  console.log(`Building & Evaluating Symmetrical Bank: ${domain}`);
  console.log(`======================================================`);
  const bank = buildSymmetricBank(domain, config);
  const res = evaluateBank(bank, config.own, config.adj, domain);
  fs.writeFileSync(path.join(banksDir, `${domain}.js`), `export default ${JSON.stringify(bank, null, 2)};\n`, "utf-8");
  console.log(`Saved: ${domain}.js`);
}
