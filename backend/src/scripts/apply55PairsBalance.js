import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.join(__dirname, "../config/stage2-banks");

console.log("Applying balanced 55-pair weights and outside options to all 11 banks...");

const techSlugs = getRoadmapsByDomain("tech");
const healthSlugs = getRoadmapsByDomain("healthcare");
const bizSlugs = getRoadmapsByDomain("business");
let tIdx = 0, hIdx = 0, bIdx = 0;

const repByDomain = (targetDom) => {
  if (targetDom === "tech") return techSlugs[(tIdx++) % techSlugs.length];
  if (targetDom === "healthcare") return healthSlugs[(hIdx++) % healthSlugs.length];
  if (targetDom === "business") return bizSlugs[(bIdx++) % bizSlugs.length];
  const map = {
    media: "content-creator",
    creative: "architect",
    finance: "actuary",
    engineering: "civil-engineer",
    law_gov: "army-officer",
    education_social: "ed-tech",
    aviation_hospitality: "event-manager",
    science: "environmental-scientist",
  };
  return map[targetDom];
};

for (const dom of DOMAINS) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const mod = await import(`file://${filePath}`);
  const bank = JSON.parse(JSON.stringify(mod.default));
  const own = getRoadmapsByDomain(dom);
  const q4 = bank.questions.filter((q) => q.blendCore);

  // 1. Reset secondaries in Q1..Q4 to clean state
  for (const q of q4) {
    for (const opt of q.options) {
      const prim = Object.keys(opt.weights)[0];
      opt.weights = { [prim]: 3 };
    }
  }

  // 2. Add calibrated secondary weights
  if (["tech", "healthcare", "business"].includes(dom)) {
    let secCount = 0;
    for (const q of q4) {
      for (const opt of q.options) {
        const prim = Object.keys(opt.weights)[0];
        if (own.includes(prim) && secCount < 7) {
          const sec = own[(own.indexOf(prim) + 1) % own.length];
          opt.weights[sec] = 1;
          secCount++;
        }
      }
    }
  } else if (dom === "finance") {
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
  } else if (dom === "law_gov") {
    q4[0].options[0].weights[own[1]] = 1;
    q4[0].options[1].weights[own[2]] = 1;
    q4[0].options[2].weights[own[0]] = 1;
  } else if (["engineering", "science"].includes(dom)) {
    q4[2].options[4].weights = { [own[0]]: 3 };
    q4[2].options[4].reason = `Option directly exercises the distinctive core practices and methodologies of ${own[0]}.`;
    q4[3].options[4].weights = { [own[1]]: 3 };
    q4[3].options[4].reason = `Option directly exercises the distinctive core practices and methodologies of ${own[1]}.`;
  }

  // 3. Assign balanced outside options in Q1..Q4
  const otherDomains = DOMAINS.filter((d) => d !== dom);
  let domIdx = 0;
  for (const q of q4) {
    for (const opt of q.options) {
      const prim = Object.keys(opt.weights)[0];
      if (!own.includes(prim)) {
        const targetDom = otherDomains[domIdx % otherDomains.length];
        const newSlug = repByDomain(targetDom);
        domIdx++;
        opt.weights = { [newSlug]: 3 };
        opt.reason = `Cross-domain exploratory perspective connecting ${dom} with ${newSlug}.`;
      }
    }
  }

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`✅ Updated ${dom}.js`);
}

console.log("All banks updated successfully.");
