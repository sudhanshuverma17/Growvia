import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.join(__dirname, "../config/stage2-banks");

const BANK_CONFIGS = {
  7: [
    [1, 2, 3, 4, 5, 6],
    [0, 3, 4, 5, 6],
    [0, 1, 2, 5, 6],
    [0, 1, 2, 3, 4],
  ],
  5: [
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
  ],
  4: [
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 1, 2, 3],
  ],
  3: [
    [0, 0, 1, 2],
    [0, 1, 1, 2],
    [0, 1, 2, 2],
    [0, 1, 2],
  ],
  2: [
    [0, 0, 1, 1],
    [0, 0, 1, 1],
    [0, 1],
    [0, 1],
  ],
};

const CURATED_OUTSIDE = {
  engineering: ["civil-services", "pilot", "social-worker", "teacher"],
  science: ["civil-services", "pilot", "social-worker", "teacher"],
  law_gov: ["social-worker", "teacher", "pilot"],
  education_social: ["lawyer", "civil-services", "hotel-management"],
  aviation_hospitality: ["civil-services", "army-officer", "social-worker"],
  finance: ["civil-services", "pilot"],
  creative: ["social-worker", "teacher"],
  media: ["social-worker", "teacher"],
  tech: ["social-worker"],
  healthcare: ["social-worker"],
  business: ["teacher"],
};

console.log("Applying final balanced orthogonal configuration to all banks...");

for (const dom of DOMAINS) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bankModule = await import(`file://${filePath}`);
  const bank = bankModule.default;
  const roadmaps = getRoadmapsByDomain(dom);
  const n = roadmaps.length;
  const plan = BANK_CONFIGS[n];
  const outsidePool = CURATED_OUTSIDE[dom];
  let outIdx = 0;

  for (let qIdx = 0; qIdx < 4; qIdx++) {
    const q = bank.questions[qIdx];
    const ownIndices = plan[qIdx];
    const maxLen = Math.max(q.options.length, 5);

    for (let oIdx = 0; oIdx < maxLen; oIdx++) {
      const opt = q.options[oIdx];
      if (oIdx < ownIndices.length) {
        const slug = roadmaps[ownIndices[oIdx]];
        opt.weights = { [slug]: 3 };
        opt.reason = `Option directly exercises the distinctive core practices and methodologies of ${slug}.`;
      } else {
        const outSlug = outsidePool[outIdx % outsidePool.length];
        outIdx++;
        opt.weights = { [outSlug]: 3 };
        opt.reason = `Cross-domain exploratory perspective connecting ${dom} with ${outSlug}.`;
      }
    }
  }

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`, "utf-8");
  console.log(`Updated ${dom}.js with balanced options (outside used: ${outIdx})`);
}

console.log("All bank files successfully updated!");
