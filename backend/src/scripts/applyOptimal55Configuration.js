import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.join(__dirname, "../config/stage2-banks");

// Exact rotation definitions for Q1..Q4:
const BANK_CONFIGS = {
  // Size 7: 24 options (6, 6, 6, 6)
  7: [
    [0, 1, 2, 3, 4, 5],
    [6, 0, 1, 2, 3, 4],
    [5, 6, 0, 1, 2, 3],
    [4, 5, 6, 0, 1, 2],
  ],
  // Size 5: 20 options (5, 5, 5, 5) + 1 outside per Q
  5: [
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
  ],
  // Size 4: 18 options (4, 4, 5, 5) + (2, 2, 1, 1) outside
  4: [
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 1, 2, 3, 0],
    [0, 1, 2, 3, 1],
  ],
  // Size 3: 15 options (4, 4, 4, 3) + (2, 2, 2, 3) outside -> 5 each
  3: [
    [0, 0, 1, 2],
    [0, 1, 1, 2],
    [0, 1, 2, 2],
    [0, 1, 2],
  ],
  // Size 2: 14 options (4, 4, 4, 2) + (2, 2, 2, 4) outside -> 7 each
  2: [
    [0, 0, 1, 1],
    [0, 0, 1, 1],
    [0, 0, 1, 1],
    [0, 1],
  ],
};

// Outside options: distinct across Q1..Q4 in each bank
const OUTSIDE_SLUGS = {
  creative: ["civil-services", "teacher", "pilot", "chartered-accountant"],
  media: ["mechanical-engineer", "biotechnologist", "dentist", "financial-analyst"],
  finance: ["journalist", "teacher", "photographer", "doctor"],
  law_gov: ["dentist", "photographer", "fashion-designer", "pilot", "teacher", "pharmacist"],
  education_social: ["pilot", "architect", "journalist", "dentist", "civil-engineer", "investment-banker"],
  aviation_hospitality: ["doctor", "biotechnologist", "civil-services", "data-scientist", "fashion-designer", "supply-chain"],
  engineering: [
    "journalist", "hotel-management",
    "chartered-accountant", "lawyer",
    "doctor", "photographer",
    "psychologist", "fashion-designer", "pilot", "financial-analyst"
  ],
  science: [
    "lawyer", "graphic-designer",
    "pilot", "civil-services",
    "teacher", "hotel-management",
    "journalist", "fashion-designer", "mba-manager", "investment-banker"
  ],
};

console.log("Applying mathematical 15/15 configuration to all 11 bank files...");

for (const dom of DOMAINS) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bankModule = await import(`file://${filePath}`);
  const bank = bankModule.default;
  const roadmaps = getRoadmapsByDomain(dom);
  const n = roadmaps.length;
  const plan = BANK_CONFIGS[n];
  const outsideList = OUTSIDE_SLUGS[dom] || [];
  let outsideIdx = 0;

  for (let qIdx = 0; qIdx < 4; qIdx++) {
    const q = bank.questions[qIdx];
    const ownIndices = plan[qIdx];

    for (let oIdx = 0; oIdx < 6; oIdx++) {
      const opt = q.options[oIdx];
      if (oIdx < ownIndices.length) {
        const slug = roadmaps[ownIndices[oIdx]];
        opt.weights = { [slug]: 3 };
        if (!opt.reason || !opt.reason.includes(slug)) {
          opt.reason = `Option directly exercises the distinctive skills and focus areas of ${slug}.`;
        }
      } else {
        const outSlug = outsideList[outsideIdx % outsideList.length];
        outsideIdx++;
        opt.weights = { [outSlug]: 3 };
        opt.reason = `Cross-domain exploratory perspective connecting ${dom} with ${outSlug}.`;
      }
    }
  }

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`, "utf-8");
  console.log(`Updated ${dom}.js (${n} roadmaps)`);
}

console.log("Done applying 55-pairs optimal configuration!");
