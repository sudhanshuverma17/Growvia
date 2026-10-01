import { DOMAIN_ROADMAP_MAP, QUIZ_PROFILES } from "../config/quizDomains.js";
import { STAGE1_QUESTIONS } from "../config/stage1-questions.js";
import { scoreStage1 } from "../services/stage1Scoring.js";
import { getStage2Set } from "../services/stage2Selector.js";
import { computeCareerResult, deriveSeed, TRAIT_KEYS } from "../services/careerEngine.js";

// Helper to simulate answers for a targeted domain/slug with probability p
function simulateStudent(targetDomain, targetSlug, p = 0.85) {
  const s1Answers = {};
  for (const q of STAGE1_QUESTIONS) {
    if (Math.random() < p) {
      let bestOpt = null;
      let maxW = 0;
      for (const opt of q.options) {
        const w = opt.weights?.[targetDomain] || 0;
        if (w > maxW) {
          maxW = w;
          bestOpt = opt;
        }
      }
      s1Answers[q.id] = (bestOpt || q.options[0]).id;
    } else {
      s1Answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;
    }
  }

  const s1Seed = deriveSeed(s1Answers);
  const s1Res = scoreStage1(s1Answers, { seed: s1Seed });
  const s2Set = getStage2Set(s1Res, { seed: s1Seed });

  const s2Answers = {};
  for (const q of s2Set) {
    if (Math.random() < p) {
      let bestOpt = null;
      let maxW = 0;
      for (const opt of q.options) {
        const w = opt.weights?.[targetSlug] || 0;
        if (w > maxW) {
          maxW = w;
          bestOpt = opt;
        }
      }
      if (bestOpt) {
        s2Answers[q.id] = bestOpt.id;
      } else {
        const domOpt = q.options.find((o) => {
          const top = Object.keys(o.weights || {})[0];
          return DOMAIN_ROADMAP_MAP[top]?.domain === targetDomain;
        });
        s2Answers[q.id] = (domOpt || q.options[0]).id;
      }
    } else {
      s2Answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;
    }
  }

  return computeCareerResult({ stage1Answers: s1Answers, stage2Answers: s2Answers });
}

// 6 Persona Samples
const samples = [
  {
    name: "Persona 1: Passionate Software & Systems Engineer (Tech Focus)",
    res: simulateStudent("tech", "engineer", 0.95),
  },
  {
    name: "Persona 2: Aspiring Clinical Physician (Healthcare Focus)",
    res: simulateStudent("healthcare", "doctor", 0.95),
  },
  {
    name: "Persona 3: Creative Technologist / Game Creator (Tech + Creative Blended)",
    res: simulateStudent("tech", "game-developer", 0.8),
  },
  {
    name: "Persona 4: Venture & Growth Strategist (Business + Finance Blended)",
    res: simulateStudent("business", "startup-founder", 0.8),
  },
  {
    name: "Persona 5: Justice & Public Policy Advocate (Law & Gov Focus)",
    res: simulateStudent("law_gov", "lawyer", 0.9),
  },
  {
    name: "Persona 6: Multi-Disciplinary Explorer (Exploratory / Balanced Answers)",
    res: simulateStudent(null, null, 0.0), // Pure exploratory random
  },
];

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outPath = path.resolve(__dirname, "../../../docs/quiz-review/step4_sample_outputs.json");
fs.writeFileSync(outPath, JSON.stringify(samples, null, 2), "utf8");
console.log(`Saved 6 sample persona results to ${outPath}`);

// Compute Trait Score Spread across 5,000 diverse runs
const traitStats = {};
for (const k of TRAIT_KEYS) {
  traitStats[k] = { min: 100, max: 0, sum: 0, count: 0, values: [] };
}

for (let i = 0; i < 5000; i++) {
  const s1Answers = {};
  for (const q of STAGE1_QUESTIONS) {
    s1Answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;
  }
  const s1Seed = deriveSeed(s1Answers);
  const s1Res = scoreStage1(s1Answers, { seed: s1Seed });
  const s2Set = getStage2Set(s1Res, { seed: s1Seed });
  const s2Answers = {};
  for (const q of s2Set) {
    s2Answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;
  }
  const res = computeCareerResult({ stage1Answers: s1Answers, stage2Answers: s2Answers });
  for (const k of TRAIT_KEYS) {
    const val = res.traits[k];
    traitStats[k].min = Math.min(traitStats[k].min, val);
    traitStats[k].max = Math.max(traitStats[k].max, val);
    traitStats[k].sum += val;
    traitStats[k].count++;
    traitStats[k].values.push(val);
  }
}

const summaryTable = [];
for (const k of TRAIT_KEYS) {
  const s = traitStats[k];
  const mean = s.sum / s.count;
  const variance = s.values.reduce((acc, v) => acc + (v - mean) ** 2, 0) / s.count;
  const std = Math.sqrt(variance);
  summaryTable.push({
    trait: k,
    min: s.min,
    max: s.max,
    mean: Math.round(mean),
    std: std.toFixed(1),
  });
}

console.log("\n=== TRAIT_STATS_START ===");
console.table(summaryTable);
console.log("=== TRAIT_STATS_END ===");
