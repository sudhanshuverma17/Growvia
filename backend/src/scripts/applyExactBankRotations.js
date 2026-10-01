import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.join(__dirname, "../config/stage2-banks");

// Exact rotation definitions for Q1..Q4:
const ROTATIONS = {
  7: {
    w3: [
      [0, 1, 2, 3, 4, 5],
      [6, 0, 1, 2, 3, 4],
      [5, 6, 0, 1, 2],
      [3, 4, 5, 6],
    ],
  },
  5: {
    w3: [
      [0, 1, 2, 3, 4],
      [0, 1, 2, 3, 4],
      [0, 1, 2, 3, 4],
      [0, 1, 2, 3, 4],
    ],
  },
  4: {
    w3: [
      [0, 1, 2, 3],
      [0, 1, 2, 3],
      [0, 1, 2, 3],
      [0, 1, 2, 3],
    ],
  },
  3: {
    w3: [
      [0, 0, 1, 2],
      [0, 1, 1, 2],
      [0, 1, 2, 2],
      [0, 1, 2],
    ],
  },
  2: {
    w3: [
      [0, 0, 1, 1],
      [0, 0, 1, 1],
      [0, 1],
      [0, 1],
    ],
  },
};

// Neutral / adjacent slugs pool per domain to fill the remaining options in Q1..Q4:
// Crucially, to avoid pair interference in blended sets, adjacent options in Q1..Q4
// should point to neutral cross-domain careers with weight 1 or 2, NOT own roadmaps.
const ADJACENT_ROADMAPS = {
  tech: ["chartered-accountant", "product-manager", "designer"],
  healthcare: ["teacher", "fitness-trainer", "biotechnologist"],
  business: ["data-scientist", "content-creator", "lawyer"],
  finance: ["data-scientist", "startup-founder", "engineer"],
  creative: ["architect", "civil-engineer", "game-developer"],
  media: ["photographer", "content-creator", "event-manager"],
  engineering: ["architect", "designer", "data-scientist"],
  law_gov: ["journalist", "social-worker", "mba-manager"],
  education_social: ["psychologist", "human-resources", "journalist"],
  aviation_hospitality: ["public-relations", "supply-chain", "event-manager"],
  science: ["doctor", "engineer", "pharmacist"],
};

console.log("Calibrating all 11 bank files to exact mathematical rotation...");

for (const dom of DOMAINS) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bankModule = await import(`file://${filePath}`);
  const bank = bankModule.default;
  const roadmaps = getRoadmapsByDomain(dom);
  const n = roadmaps.length;
  const rot = ROTATIONS[n];

  // Modify blendCore questions Q1..Q4 (indices 0..3)
  for (let qIdx = 0; qIdx < 4; qIdx++) {
    const q = bank.questions[qIdx];
    const w3Indices = rot.w3[qIdx];
    
    // Each question has 6 options
    while (q.options.length < 6) {
      q.options.push({
        id: `${q.id}_opt${q.options.length + 1}`,
        text: `Coordinate interdisciplinary cross-functional solutions connecting ${dom} with modern industry practices.`,
        weights: {},
        reason: `Cross-functional solution coordination option for ${dom}.`
      });
    }

    // Assign primary weights
    for (let oIdx = 0; oIdx < 6; oIdx++) {
      const opt = q.options[oIdx];
      if (oIdx < w3Indices.length) {
        const targetSlug = roadmaps[w3Indices[oIdx]];
        opt.weights = { [targetSlug]: 3 };
        // If option reason doesn't mention targetSlug, update it cleanly
        if (!opt.reason || !opt.reason.includes(targetSlug)) {
          opt.reason = `Option directly exercises the distinctive skills and focus areas of ${targetSlug}.`;
        }
      } else {
        // Remaining options are cross-listed / secondary fillers (weight 1 or 2, not own domain)
        const adjSlugs = ADJACENT_ROADMAPS[dom] || ["engineer"];
        const adjSlug = adjSlugs[(qIdx * 2 + oIdx) % adjSlugs.length];
        opt.weights = { [adjSlug]: 1 };
        opt.reason = `Cross-domain adjacent option supporting interdisciplinary perspective in ${adjSlug}.`;
      }
    }
  }

  // Write updated bank back to file
  const fileContent = `export default ${JSON.stringify(bank, null, 2)};\n`;
  fs.writeFileSync(filePath, fileContent, "utf-8");
  console.log(`Updated ${dom}.js (${n} roadmaps, rotation applied)`);
}

console.log("All 11 banks updated!");
