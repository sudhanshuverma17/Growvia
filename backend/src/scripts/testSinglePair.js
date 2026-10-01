import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { testConfiguration } from "./find55Config.js";

// Let's test different choices of adjs
// We need:
// media: 4 adjs
// creative: 4 adjs
// finance: 4 adjs
// law_gov: 6 adjs
// education_social: 6 adjs
// aviation_hospitality: 6 adjs
// engineering: 10 adjs
// science: 10 adjs

// Notice: In size 3 (law_gov, education_social, aviation_hospitality):
// In find55Config:
// Q0: 5 own, 1 adj0
// Q1: 5 own, 1 adj1
// Q2: 5 own, 1 adj2
// Q3: 3 own, 1 adj3, 1 adj4, 1 adj5
// Notice: Each adjacent appears EXACTLY ONCE!
// adj0 appears in Q0.
// adj1 appears in Q1.
// adj2 appears in Q2.
// adj3 appears in Q3.
// adj4 appears in Q3.
// adj5 appears in Q3.
// EVERY ADJACENT APPEARS ONLY ONCE!
// In applyFullPerfectBanks.js, adj0 appeared TWICE because only 3 adjs were given, and adj0 was reused!
// When an adjacent appears ONCE instead of TWICE, its effect is halved!
// Let's test giving 6 distinct adjs to size 3, and 10 distinct adjs to size 2!

const allSlugs = [];
for (const dom of DOMAINS) allSlugs.push(...getRoadmapsByDomain(dom));

// Let's define distinct adjs for each domain:
const adjMap = {
  media: ["chartered-accountant", "civil-services", "mechanical-engineer", "environmental-scientist"],
  creative: ["chartered-accountant", "army-officer", "civil-engineer", "biotechnologist"],
  finance: ["lawyer", "mechanical-engineer", "civil-services", "environmental-scientist"],
  
  law_gov: [
    "financial-analyst", "hotel-management", "actuary",
    "software-engineer", "doctor", "graphic-designer"
  ],
  education_social: [
    "civil-engineer", "financial-analyst", "actuary",
    "data-scientist", "psychologist", "journalist"
  ],
  aviation_hospitality: [
    "architect", "financial-analyst", "civil-services",
    "mechanical-engineer", "public-relations", "mba-manager"
  ],

  engineering: [
    "hotel-management", "chartered-accountant", "pilot", "actuary",
    "software-engineer", "doctor", "marketing-manager", "graphic-designer", "civil-services", "teacher"
  ],
  science: [
    "hotel-management", "financial-analyst", "civil-services", "pilot",
    "data-scientist", "pharmacist", "product-manager", "film-director", "actuary", "ed-tech"
  ]
};

console.log("Running test with distinct adjs...");
const res = testConfiguration(adjMap, 3000);
console.log(`Passed: ${res.passed} / 55`);
if (res.fails.length > 0) {
  console.log("Failures:");
  for (const f of res.fails) {
    console.log(`  ${f.domA} + ${f.domB} | A: ${f.shareA.toFixed(1)}% B: ${f.shareB.toFixed(1)}% | Ratios: [A: ${f.ratioA.toFixed(2)}x, B: ${f.ratioB.toFixed(2)}x]`);
  }
}
