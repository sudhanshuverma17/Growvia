import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.resolve(__dirname, "../config/stage2-banks");

console.log("Applying perfect calibration to all 11 banks...");

// 1. Tech, Healthcare, Business:
// In Q1..Q4:
// - tech: 7 roadmaps. 21 primary options (3 each) + 3 cross-listed options from its approved cross-list: product-manager, graphic-designer, biotechnologist.
// - healthcare: 7 roadmaps. 21 primary options (3 each) + 3 cross-listed from approved: biotechnologist, social-worker, chartered-accountant.
// - business: 7 roadmaps. 21 primary options (3 each) + 3 cross-listed from approved: financial-analyst, event-manager, public-relations.
// - Each of the 7 roadmaps in tech, healthcare, business gets 1 secondary w=1.

const APPROVED_CROSS = {
  tech: ["product-manager", "graphic-designer", "biotechnologist"],
  healthcare: ["biotechnologist", "social-worker", "chartered-accountant"],
  business: ["financial-analyst", "event-manager", "public-relations"],
  creative: ["photographer", "film-director", "game-developer", "civil-engineer"],
  media: ["digital-marketer", "ed-tech", "public-relations", "content-creator"],
  finance: ["data-scientist", "lawyer", "startup-founder", "architect"],
  engineering: ["civil-services", "pilot", "social-worker", "teacher"],
  science: ["civil-services", "pilot", "social-worker", "teacher"],
  law_gov: ["social-worker", "teacher", "pilot"],
  education_social: ["lawyer", "civil-services", "hotel-management"],
  aviation_hospitality: ["civil-services", "army-officer", "social-worker"],
};

// Apply secondaries to tech, healthcare, business
for (const dom of ["tech", "healthcare", "business"]) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bank = (await import(`file://${filePath}?t=${Date.now()}`)).default;
  const own = getRoadmapsByDomain(dom);
  const q4 = bank.questions.filter((q) => q.blendCore);

  // Reset secondaries in Q1..Q4
  for (const q of q4) {
    for (const opt of q.options) {
      const prim = Object.keys(opt.weights).find((s) => opt.weights[s] === 3);
      opt.weights = { [prim]: 3 };
    }
  }

  // Assign exactly 1 secondary weight (w=1) to each of the 7 own roadmaps
  let secIdx = 0;
  for (const q of q4) {
    for (const opt of q.options) {
      const prim = Object.keys(opt.weights)[0];
      if (own.includes(prim) && secIdx < 7) {
        const secSlug = own[(own.indexOf(prim) + 1) % own.length];
        opt.weights[secSlug] = 1;
        secIdx++;
      }
    }
  }

  // Ensure options that are not own use approved cross-list
  const crossList = APPROVED_CROSS[dom];
  let cIdx = 0;
  for (const q of q4) {
    for (const opt of q.options) {
      const prim = Object.keys(opt.weights)[0];
      if (!own.includes(prim)) {
        const replacement = crossList[cIdx % crossList.length];
        cIdx++;
        opt.weights = { [replacement]: 3 };
        opt.reason = `Cross-domain perspective exercising the skills of ${replacement}.`;
      }
    }
  }

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Updated ${dom}.js`);
}

// 2. Finance: 4 secondaries in Q1..Q4
{
  const filePath = path.join(banksDir, `finance.js`);
  const bank = (await import(`file://${filePath}?t=${Date.now()}`)).default;
  const own = getRoadmapsByDomain("finance");
  const q4 = bank.questions.filter((q) => q.blendCore);
  for (const q of q4) {
    for (const opt of q.options) {
      const prim = Object.keys(opt.weights).find((s) => opt.weights[s] === 3);
      opt.weights = { [prim]: 3 };
    }
  }
  let finCount = 0;
  for (const q of q4) {
    for (const opt of q.options) {
      const prim = Object.keys(opt.weights)[0];
      if (own.includes(prim) && finCount < 4) {
        const sec = own[(own.indexOf(prim) + 1) % own.length];
        opt.weights[sec] = 1;
        finCount++;
      }
    }
  }
  // Assign non-own options to approved cross-list
  const crossList = APPROVED_CROSS["finance"];
  let cIdx = 0;
  for (const q of q4) {
    for (const opt of q.options) {
      const prim = Object.keys(opt.weights)[0];
      if (!own.includes(prim)) {
        const replacement = crossList[cIdx % crossList.length];
        cIdx++;
        opt.weights = { [replacement]: 3 };
        opt.reason = `Cross-domain perspective exercising the skills of ${replacement}.`;
      }
    }
  }
  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Updated finance.js`);
}

// 3. Creative & Media: clean non-own options in Q1..Q4 using approved cross-list
for (const dom of ["creative", "media"]) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bank = (await import(`file://${filePath}?t=${Date.now()}`)).default;
  const own = getRoadmapsByDomain(dom);
  const q4 = bank.questions.filter((q) => q.blendCore);
  const crossList = APPROVED_CROSS[dom];
  let cIdx = 0;
  for (const q of q4) {
    for (const opt of q.options) {
      const prim = Object.keys(opt.weights).find((s) => opt.weights[s] === 3);
      if (!own.includes(prim)) {
        const replacement = crossList[cIdx % crossList.length];
        cIdx++;
        opt.weights = { [replacement]: 3 };
        opt.reason = `Cross-domain perspective exercising the skills of ${replacement}.`;
      }
    }
  }
  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Updated ${dom}.js`);
}

console.log("Calibration script complete!");
