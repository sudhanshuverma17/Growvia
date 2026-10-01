import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.join(__dirname, "../config/stage2-banks");

// Exact rotation definitions for Q1..Q4:
const BANK_CONFIGS = {
  // Size 7: 22 options (6, 5, 5, 6) -> 2 outside (0, 1, 1, 0)
  7: [
    [1, 2, 3, 4, 5, 6],
    [0, 3, 4, 5, 6],
    [0, 1, 2, 5, 6],
    [0, 1, 2, 3, 4, 0],
  ],
  // Size 5: 20 options (5, 5, 5, 5) -> 4 outside (1 per Q)
  5: [
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
  ],
  // Size 4: 18 options (4, 4, 5, 5) -> 6 outside (2, 2, 1, 1)
  4: [
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 1, 2, 3, 2],
    [0, 1, 2, 3, 0],
  ],
  // Size 3: 15 options (4, 4, 4, 3) -> 9 outside (2, 2, 2, 3) -> 5 each
  3: [
    [0, 0, 1, 2],
    [0, 1, 1, 2],
    [0, 1, 2, 2],
    [0, 1, 2],
  ],
  // Size 2: 14 options (4, 4, 4, 2) -> 10 outside (2, 2, 2, 4) -> 7 each
  2: [
    [0, 0, 1, 1],
    [0, 0, 1, 1],
    [0, 0, 1, 1],
    [0, 1],
  ],
};

// For each domain, define outside slugs
function getOrthogonalOutsideSlugs(dom) {
  if (dom === "creative") {
    return ["mechanical-engineer", "civil-services", "social-worker", "hotel-management"];
  }
  if (dom === "media") {
    return ["civil-engineer", "lawyer", "teacher", "pilot"];
  }
  if (dom === "finance") {
    return [
      "mechanical-engineer", "civil-engineer",
      "lawyer", "civil-services",
      "teacher", "social-worker",
      "pilot", "hotel-management"
    ];
  }

  const otherDomains = DOMAINS.filter((d) => d !== dom);
  const domIdx = DOMAINS.indexOf(dom);

  return otherDomains.map((otherD) => {
    const roadmaps = getRoadmapsByDomain(otherD);
    const slugIdx = (domIdx + DOMAINS.indexOf(otherD)) % roadmaps.length;
    return roadmaps[slugIdx];
  });
}

console.log("Applying strictly orthogonal outside options to all banks...");

for (const dom of DOMAINS) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bankModule = await import(`file://${filePath}`);
  const bank = bankModule.default;
  const roadmaps = getRoadmapsByDomain(dom);
  const n = roadmaps.length;
  const plan = BANK_CONFIGS[n];
  const outsideList = getOrthogonalOutsideSlugs(dom);
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
        const outSlug = outsideList[outsideIdx];
        outsideIdx++;
        opt.weights = { [outSlug]: 3 };
        opt.reason = `Cross-domain exploratory perspective connecting ${dom} with ${outSlug}.`;
      }
    }
  }

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`, "utf-8");
  console.log(`Updated ${dom}.js with ${outsideIdx} unique orthogonal outside options`);
}

console.log("Strictly orthogonal configuration applied successfully!");
