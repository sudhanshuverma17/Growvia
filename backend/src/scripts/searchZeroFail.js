import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { scoreStage2 } from "../services/stage2Selector.js";
import { buildAllBanks } from "./testNewBankArchitecture.js";

// Let's search over potential adj assignments for engineering, science, aviation_hospitality, law_gov, education_social
// to find the one where Section 5B passes with 0 failures and all ratios <= 1.8x.

const pairs = [];
for (let i = 0; i < DOMAINS.length; i++) {
  for (let j = i + 1; j < DOMAINS.length; j++) {
    pairs.push([DOMAINS[i], DOMAINS[j]]);
  }
}

// All non-tech/healthcare/business roadmaps (to avoid inflating size 7):
const pool = [
  "designer", "graphic-designer", "architect", "interior-designer", "fashion-designer",
  "content-creator", "film-director", "photographer", "journalist", "public-relations",
  "chartered-accountant", "investment-banker", "financial-analyst", "actuary",
  "mechanical-engineer", "civil-engineer",
  "lawyer", "civil-services", "army-officer",
  "teacher", "ed-tech", "social-worker",
  "pilot", "hotel-management", "event-manager",
  "biotechnologist", "environmental-scientist"
];

console.log("Pool size:", pool.length);
