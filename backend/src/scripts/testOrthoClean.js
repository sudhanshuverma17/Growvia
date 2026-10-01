import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { testConfiguration } from "./find55Config.js";

// Let's test candidates for education_social, law_gov, aviation_hospitality, engineering, science
const candidates = [
  "chartered-accountant", "investment-banker", "financial-analyst", "actuary",
  "mechanical-engineer", "civil-engineer",
  "biotechnologist", "environmental-scientist",
  "lawyer", "civil-services", "army-officer",
  "pilot", "hotel-management", "event-manager",
  "teacher", "ed-tech", "social-worker"
];

// Let's test a clean, well-distributed assignment:
const adjMap = {
  media: ["chartered-accountant", "civil-services", "mechanical-engineer", "environmental-scientist"],
  creative: ["chartered-accountant", "army-officer", "civil-engineer", "biotechnologist"],
  finance: ["lawyer", "mechanical-engineer", "civil-services", "environmental-scientist"],
  
  law_gov: [
    "financial-analyst", "hotel-management", "actuary",
    "mechanical-engineer", "biotechnologist", "event-manager"
  ],
  education_social: [
    "civil-engineer", "financial-analyst", "actuary",
    "environmental-scientist", "hotel-management", "pilot"
  ],
  aviation_hospitality: [
    "civil-engineer", "financial-analyst", "civil-services",
    "mechanical-engineer", "chartered-accountant", "biotechnologist"
  ],

  engineering: [
    "hotel-management", "chartered-accountant", "pilot", "actuary",
    "financial-analyst", "civil-services", "lawyer", "event-manager", "teacher", "social-worker"
  ],
  science: [
    "hotel-management", "financial-analyst", "civil-services", "pilot",
    "chartered-accountant", "actuary", "lawyer", "army-officer", "ed-tech", "event-manager"
  ]
};

console.log("Testing clean orthogonal configuration...");
const res = testConfiguration(adjMap, 3000);
console.log(`Passed: ${res.passed} / 55`);

// Let's inspect the results in detail
console.log("Finished running all 55 pairs!");
if (res.fails.length > 0) {
  console.log("Failures:");
  for (const f of res.fails) {
    console.log(`  ${f.domA} + ${f.domB} | A: ${f.shareA.toFixed(1)}% B: ${f.shareB.toFixed(1)}% | Ratios: [A: ${f.ratioA.toFixed(2)}x, B: ${f.ratioB.toFixed(2)}x]`);
  }
}
