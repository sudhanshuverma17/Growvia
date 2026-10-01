import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.join(__dirname, "../config/stage2-banks");

// Configuration of roadmaps per bank
const bankConfigs = {
  engineering: {
    own: ["mechanical-engineer", "civil-engineer"],
    adjacent: ["architect", "pilot", "supply-chain", "environmental-scientist", "engineer", "army-officer"],
  },
  science: {
    own: ["biotechnologist", "environmental-scientist"],
    adjacent: ["pharmacist", "doctor", "data-scientist", "nutritionist", "civil-engineer", "social-worker", "teacher"],
  },
  law_gov: {
    own: ["lawyer", "civil-services", "army-officer"],
    adjacent: ["journalist", "public-relations", "social-worker", "pilot", "teacher", "human-resources"],
  },
  education_social: {
    own: ["teacher", "ed-tech", "social-worker"],
    adjacent: ["psychologist", "content-creator", "human-resources", "journalist", "civil-services", "fitness-trainer"],
  },
  aviation_hospitality: {
    own: ["pilot", "hotel-management", "event-manager"],
    adjacent: ["army-officer", "mechanical-engineer", "supply-chain", "marketing-manager", "public-relations", "startup-founder"],
  },
};

for (const [domain, config] of Object.entries(bankConfigs)) {
  const filePath = path.join(banksDir, `${domain}.js`);
  const content = fs.readFileSync(filePath, "utf-8");

  // Dynamically import bank object
  const bankModule = await import(`file://${filePath}`);
  const bank = bankModule.default;

  const allSlugs = [...config.own, ...config.adjacent];
  const targetSecondaries = {};
  for (const s of allSlugs) targetSecondaries[s] = 0;

  // Track secondary count
  let slugIdx = 0;

  for (const q of bank.questions) {
    for (const opt of q.options) {
      // Find weight 3 slug
      const w3Slug = Object.keys(opt.weights).find((s) => opt.weights[s] === 3);

      // Choose a sensible secondary slug that is NOT w3Slug
      // and has been used fewer than 4 times
      let chosenSec = null;
      for (let attempt = 0; attempt < allSlugs.length; attempt++) {
        const candidate = allSlugs[(slugIdx + attempt) % allSlugs.length];
        if (candidate !== w3Slug && targetSecondaries[candidate] < 4) {
          chosenSec = candidate;
          slugIdx = (slugIdx + attempt + 1) % allSlugs.length;
          break;
        }
      }

      if (chosenSec) {
        targetSecondaries[chosenSec]++;
        opt.weights = { [w3Slug]: 3, [chosenSec]: 1 };
      } else {
        opt.weights = { [w3Slug]: 3 };
      }
    }
  }

  // Ensure every slug has at least 3 secondaries
  for (const s of allSlugs) {
    while (targetSecondaries[s] < 3) {
      // Find an option where s is not primary and has only 1 weight
      let added = false;
      for (const q of bank.questions) {
        for (const opt of q.options) {
          const keys = Object.keys(opt.weights);
          if (!keys.includes(s) && keys.length === 2 && opt.weights[keys[0]] === 3) {
            // Can add secondary
            opt.weights[s] = 1;
            targetSecondaries[s]++;
            added = true;
            break;
          }
        }
        if (added) break;
      }
      if (!added) break;
    }
  }

  console.log(`[${domain}] Balanced Secondaries:`, targetSecondaries);

  // Re-serialize bank file cleanly
  const newContent = `/**
 * Stage 2 Question Bank: ${domain}
 * 7 Scenario-based questions for Indian students in grades 9-12.
 * Small domain (${config.own.length} own roadmaps + ${config.adjacent.length} adjacent roadmaps).
 */

export default ${JSON.stringify(bank, null, 2)};
`;
  fs.writeFileSync(filePath, newContent, "utf-8");
}

console.log("✅ Successfully balanced secondaries for all 5 small-domain banks!");
