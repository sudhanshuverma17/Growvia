import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { testConfiguration } from "./find55Config.js";

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

console.log("Simulating all 55 pairs at 5,000 runs...");
const res = testConfiguration(adjMap, 5000);
console.log(`Passed: ${res.passed} / 55`);
console.log("Failures:", res.fails.length);

for (const f of res.fails) {
  console.log(`  FAIL: ${f.domA}+${f.domB} | shareA=${f.shareA.toFixed(1)}% shareB=${f.shareB.toFixed(1)}% | ratioA=${f.ratioA.toFixed(2)}x ratioB=${f.ratioB.toFixed(2)}x`);
}
