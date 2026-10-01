import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getRoadmapsByDomain } from "../config/quizDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.join(__dirname, "../config/stage2-banks");

const CURATED_ADJACENT = {
  engineering: ["civil-services", "pilot", "social-worker", "teacher"],
  science: ["civil-services", "pilot", "social-worker", "teacher"],
  law_gov: ["social-worker", "teacher", "pilot"],
  education_social: ["lawyer", "civil-services", "hotel-management"],
  aviation_hospitality: ["civil-services", "army-officer", "social-worker"],
};

for (const [dom, adjList] of Object.entries(CURATED_ADJACENT)) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bank = (await import(`file://${filePath}`)).default;
  const ownRoadmaps = getRoadmapsByDomain(dom);
  const allowedW3 = [...ownRoadmaps, ...adjList];

  let adjIdx = 0;
  for (let qIdx = 4; qIdx < bank.questions.length; qIdx++) {
    const q = bank.questions[qIdx];
    for (const opt of q.options) {
      const w3Entry = Object.entries(opt.weights).find(([, w]) => w === 3);
      if (w3Entry && !allowedW3.includes(w3Entry[0])) {
        // Replace orphan w3 with an adjacent or own roadmap
        const replacement = allowedW3[adjIdx % allowedW3.length];
        adjIdx++;
        delete opt.weights[w3Entry[0]];
        opt.weights[replacement] = 3;
        opt.reason = `Option directly exercises the distinctive core practices of ${replacement}.`;
      }
    }
  }

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`, "utf-8");
  console.log(`Cleaned Q5-Q7 in ${dom}.js`);
}

console.log("Q5-Q7 cleaning complete!");
