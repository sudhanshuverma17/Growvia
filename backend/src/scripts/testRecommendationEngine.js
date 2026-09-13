/**
 * Comprehensive Automated Verification Suite for Growvia Diverse Career Recommendation Engine
 * Tests Profiles A, B, C, D, Diversity Filtering, Determinism, and Database Roadmap Binding.
 */

import {
  calculateRawDimensionScores,
  normalizeDimensionScores,
  calculateSimilarity,
  matchProfileAgainstRoadmaps,
  applyDiversityRanking,
  processAssessment,
} from "../services/scoringEngine.js";
import { CAREER_PROFILES, DIMENSION_KEYS } from "../config/quizConfig.js";
import { seedCareers } from "../data/seedData.js";

console.log("\n==================================================================");
console.log("🚀 Starting Growvia Career Recommendation Engine Test Suite");
console.log("==================================================================\n");

let passedTests = 0;
let totalTests = 0;

const assert = (condition, testName) => {
  totalTests++;
  if (condition) {
    console.log(`✅ [PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`❌ [FAIL] ${testName}`);
    throw new Error(`Test assertion failed: ${testName}`);
  }
};

// ─────────────────────────────────────────────────────────────────
// TEST 1: PROFILE A — High Technical Specialist
// ─────────────────────────────────────────────────────────────────
console.log("--- 1. Testing Profile A: Technical Specialist ---");
const profileA_Answers = {
  q1: "q1_opt1", // Architecting technical system
  q2: "q2_opt1", // Coding, debugging systems
  q3: "q3_opt2", // Technical feasibility
  q4: "q4_opt1", // Scalable software platform
  q5: ["q5_opt1", "q5_opt2"], // CS, AI, Math
  q6: "q6_opt1", // Technical architect
  q7: ["q7_opt1", "q7_opt7"], // Complex tech challenge, stable processes
  q8: "q8_opt1", // High autonomy, deep individual focus
  q9: 2,         // Moderate structure
  q10: "q10_opt1", // Engineered mission-critical tech
};

const resultA = processAssessment(profileA_Answers, seedCareers, { recommendationCount: 4 });
console.log("Profile A Top 4 Recommendations:");
resultA.topRecommendations.forEach((r, i) => {
  console.log(`   ${i + 1}. ${r.title} (${r.family}) — ${r.matchPercentage}% match [slug: ${r.roadmapId}]`);
});

assert(
  resultA.traitScores.technical >= 75,
  "Profile A has high technical trait score (>=75%)"
);
assert(
  resultA.topRecommendations[0].family === "technology" ||
  resultA.topRecommendations[0].family === "data",
  "Profile A #1 recommendation is Technology or Data family"
);
assert(
  seedCareers.some((c) => c.id === resultA.topRecommendations[0].roadmapId),
  "Profile A #1 recommendation is a valid course in the Growvia database"
);

// ─────────────────────────────────────────────────────────────────
// TEST 2: PROFILE B — Creative & Design Innovator
// ─────────────────────────────────────────────────────────────────
console.log("\n--- 2. Testing Profile B: Creative & Design Innovator ---");
const profileB_Answers = {
  q1: "q1_opt3", // Creative approach & UX
  q2: "q2_opt3", // Visual layouts & storyboarding
  q3: "q3_opt3", // Human impact & empathy
  q4: "q4_opt3", // Iconic creative campaign & multimedia
  q5: ["q5_opt3", "q5_opt5"], // Design, Media, Psychology
  q6: "q6_opt2", // Creative visionary
  q7: ["q7_opt2", "q7_opt4"], // Tangible artistic works, human lives
  q8: "q8_opt3", // Collaborative empathetic setting
  q9: 4,         // Energized by exploration
  q10: "q10_opt3", // Iconic design works & artistic productions
};

const resultB = processAssessment(profileB_Answers, seedCareers, { recommendationCount: 4 });
console.log("Profile B Top 4 Recommendations:");
resultB.topRecommendations.forEach((r, i) => {
  console.log(`   ${i + 1}. ${r.title} (${r.family}) — ${r.matchPercentage}% match [slug: ${r.roadmapId}]`);
});

assert(
  resultB.traitScores.creative >= 75,
  "Profile B has high creative trait score (>=75%)"
);
assert(
  resultB.topRecommendations[0].family === "design" ||
  resultB.topRecommendations[0].family === "media",
  "Profile B #1 recommendation is Design or Media family"
);
assert(
  resultB.topRecommendations[0].roadmapId !== resultA.topRecommendations[0].roadmapId,
  "Profile B #1 career differs meaningfully from Profile A"
);

// ─────────────────────────────────────────────────────────────────
// TEST 3: PROFILE C — Business & Executive Leadership
// ─────────────────────────────────────────────────────────────────
console.log("\n--- 3. Testing Profile C: Business & Leadership Leader ---");
const profileC_Answers = {
  q1: "q1_opt4", // Aligning stakeholders, strategic solution
  q2: "q2_opt4", // Market growth plans & financial models
  q3: "q3_opt4", // Market opportunity & business upside
  q4: "q4_opt4", // Building entrepreneurial venture
  q5: ["q5_opt4", "q5_opt8"], // Business Strategy & Ventures
  q6: "q6_opt3", // Strategist & Organizer
  q7: ["q7_opt3", "q7_opt6"], // Scaling business & directing strategy
  q8: "q8_opt2", // Dynamic fast-evolving startup setting
  q9: 5,         // Thrive in high ambiguity
  q10: "q10_opt4", // Founded and scaled successful enterprises
};

const resultC = processAssessment(profileC_Answers, seedCareers, { recommendationCount: 4 });
console.log("Profile C Top 4 Recommendations:");
resultC.topRecommendations.forEach((r, i) => {
  console.log(`   ${i + 1}. ${r.title} (${r.family}) — ${r.matchPercentage}% match [slug: ${r.roadmapId}]`);
});

assert(
  resultC.traitScores.business >= 75 && resultC.traitScores.leadership >= 75,
  "Profile C has high business and leadership trait scores (>=75%)"
);
assert(
  resultC.topRecommendations[0].family === "business" ||
  resultC.topRecommendations[0].family === "operations" ||
  resultC.topRecommendations[0].family === "marketing",
  "Profile C #1 recommendation is Business, Operations, or Marketing family"
);

// ─────────────────────────────────────────────────────────────────
// TEST 4: PROFILE D — Analytical Researcher & Healthcare
// ─────────────────────────────────────────────────────────────────
console.log("\n--- 4. Testing Profile D: Analytical Researcher & Healthcare ---");
const profileD_Answers = {
  q1: "q1_opt2", // Analyzing data & root causes
  q2: "q2_opt2", // Scientific literature & experiments
  q3: "q3_opt1", // Objective metrics & statistics
  q4: "q4_opt2", // Scientific insights & health breakthroughs
  q5: ["q5_opt2", "q5_opt5"], // Data/Math & Healthcare
  q6: "q6_opt1", // Problem solver
  q7: ["q7_opt4", "q7_opt5"], // Directly improving human health & scientific truths
  q8: "q8_opt4", // Methodical institution
  q9: 2,         // Moderate structure preferred
  q10: "q10_opt2", // Scientific discoveries & healthcare advances
};

const resultD = processAssessment(profileD_Answers, seedCareers, { recommendationCount: 4 });
console.log("Profile D Top 4 Recommendations:");
resultD.topRecommendations.forEach((r, i) => {
  console.log(`   ${i + 1}. ${r.title} (${r.family}) — ${r.matchPercentage}% match [slug: ${r.roadmapId}]`);
});

assert(
  resultD.traitScores.analytical >= 70 && resultD.traitScores.research >= 70,
  "Profile D has high analytical and research trait scores (>=70%)"
);
assert(
  resultD.topRecommendations.some((r) => r.family === "science" || r.family === "data" || r.family === "healthcare"),
  "Profile D includes Science, Data, or Healthcare recommendations"
);

// ─────────────────────────────────────────────────────────────────
// TEST 5: DIVERSITY TEST — Family Saturation & Non-Duplication
// ─────────────────────────────────────────────────────────────────
console.log("\n--- 5. Testing Diversity Filtering (Family Saturation) ---");
// Simulate candidate pool where technology has top raw scores
const mockCandidates = [
  { id: "eng1", title: "Software Engineer", family: "technology", score: 91 },
  { id: "eng2", title: "Frontend Developer", family: "technology", score: 89 },
  { id: "eng3", title: "Backend Developer", family: "technology", score: 88 },
  { id: "eng4", title: "DevOps Engineer", family: "technology", score: 87 },
  { id: "ds1",  title: "Data Scientist", family: "data", score: 85 },
  { id: "pm1",  title: "Product Manager", family: "business", score: 84 },
  { id: "ux1",  title: "UI/UX Designer", family: "design", score: 82 },
  { id: "sec1", title: "Cybersecurity Analyst", family: "technology", score: 80 },
];

const diverseSelected = applyDiversityRanking(mockCandidates, {
  targetCount: 4,
  diversityPenalty: 8,
  maxPerFamily: 2,
});

console.log("Diversity-Filtered Output for 4 Slots:");
diverseSelected.forEach((c, idx) => {
  console.log(`   Slot ${idx + 1}: ${c.title} (${c.family}) - score: ${c.score}`);
});

// Count family occurrences in selected list
const familyDistribution = {};
diverseSelected.forEach((c) => {
  familyDistribution[c.family] = (familyDistribution[c.family] || 0) + 1;
});

assert(
  (familyDistribution["technology"] || 0) <= 2,
  "Technology family does not exceed max limit of 2 in diverse recommendations"
);
assert(
  Object.keys(familyDistribution).length >= 3,
  "Selected recommendations span at least 3 distinct career families"
);
assert(
  diverseSelected.some((c) => c.family === "data" || c.family === "business"),
  "High-scoring candidates from alternative families (Data/Business) are elevated"
);

// ─────────────────────────────────────────────────────────────────
// TEST 6: DETERMINISM & REPEATABILITY TEST (Zero Math.random())
// ─────────────────────────────────────────────────────────────────
console.log("\n--- 6. Testing Result Consistency Across 50 Repeated Runs ---");
const baselineResult = processAssessment(profileA_Answers, seedCareers, { recommendationCount: 4 });
const baselineIds = baselineResult.topRecommendations.map((r) => `${r.roadmapId}:${r.matchPercentage}`).join(",");

let isIdentical = true;
for (let run = 1; run <= 50; run++) {
  const current = processAssessment(profileA_Answers, seedCareers, { recommendationCount: 4 });
  const currentIds = current.topRecommendations.map((r) => `${r.roadmapId}:${r.matchPercentage}`).join(",");
  if (currentIds !== baselineIds) {
    isIdentical = false;
    break;
  }
}

assert(
  isIdentical,
  "Recommendations are 100% deterministic across 50 runs with identical inputs"
);

// ─────────────────────────────────────────────────────────────────
// TEST 7: ROADMAP DATABASE INTEGRATION (No Non-Existent Careers)
// ─────────────────────────────────────────────────────────────────
console.log("\n--- 7. Testing Roadmap Database Binding ---");
// Pass only a subset of 3 courses
const subsetCourses = [
  seedCareers.find((c) => c.id === "doctor"),
  seedCareers.find((c) => c.id === "lawyer"),
  seedCareers.find((c) => c.id === "designer"),
];

const restrictedResult = processAssessment(profileA_Answers, subsetCourses, { recommendationCount: 4 });
console.log("Restricted Pool Recommendations:");
restrictedResult.topRecommendations.forEach((r, idx) => {
  console.log(`   ${idx + 1}. ${r.title} [id: ${r.roadmapId}]`);
});

assert(
  restrictedResult.topRecommendations.length === 3,
  "When only 3 roadmaps exist in DB, exactly 3 are returned (no phantom careers invented)"
);
assert(
  restrictedResult.topRecommendations.every((r) => subsetCourses.some((sc) => sc.id === r.roadmapId)),
  "Every single recommendation corresponds to a provided database roadmap"
);

console.log("\n==================================================================");
console.log(`🎉 All ${passedTests} / ${totalTests} Automated Tests Passed Successfully!`);
console.log("==================================================================\n");
