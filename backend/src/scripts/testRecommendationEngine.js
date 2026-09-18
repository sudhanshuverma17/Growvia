/**
 * Automated Verification Suite for Growvia Career Recommendation Engine
 * Tests Medicine, Law, Technology, Design, and Tie-Breaker profiles with Weighted Score Vectors.
 */

import {
  calculateWeightedCategoryVectors,
  normalizeCategoryScores,
  rankCategoriesAndDetectTies,
  processAssessment,
} from "../services/scoringEngine.js";
import { seedCareers } from "../data/seedData.js";

console.log("\n==================================================================");
console.log("🚀 Starting Growvia Weighted Score Vector Recommendation Test Suite");
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

// 1. Profile: Healthcare & Medicine
console.log("--- 1. Testing Profile: Healthcare & Medicine ---");
const medAnswers = {
  q1: "q1_opt1", // Biology and human anatomy
  q2: "q2_opt1", // Diagnosing real medical or biological examples
  q3: "q3_opt1", // A health survey or biology experiment
  q4: "q4_opt1", // Medical breakthroughs and health tips
  q5: "q5_opt1", // Treat an injured pet or someone hurting
  q6: "q6_opt1", // Volunteer at a community health camp
  q7: "q7_opt1", // A modern hospital or wellness clinic
  q8: "q8_opt1", // Finding why someone feels unwell or sick
  q9: "q9_opt1", // Caring for everyone and helping them succeed
  q10: "q10_opt1", // Helping patients heal and recover their health
};
const medResult = processAssessment(medAnswers, seedCareers, { recommendationCount: 4 });
console.log(`   Top Match: ${medResult.topMatch.title} (${medResult.topMatch.matchPercentage}%)`);
console.log(`   #1 Category: ${medResult.rankedCategories[0].category} (${medResult.rankedCategories[0].score}%)`);
assert(medResult.rankedCategories[0].category === "medicine", "Medical profile ranks medicine as #1");
assert(medResult.topMatch.roadmapId === "doctor" || medResult.topMatch.categoryKey === "medicine", "Top match is a medical profession");

// 2. Profile: Law & Governance
console.log("\n--- 2. Testing Profile: Law & Governance ---");
const lawAnswers = {
  q1: "q1_opt2", // History, civics, and political debate
  q2: "q2_opt2", // Finding legal or ethical arguments in texts
  q3: "q3_opt2", // A mock court trial or debate
  q4: "q4_opt2", // Court trials and human rights cases
  q5: "q5_opt2", // Settle a dispute and defend fair rules
  q6: "q6_opt2", // Watch court trials and legal documentaries
  q7: "q7_opt2", // A high-court room or law office
  q8: "q8_opt2", // Settling an argument between two opposing sides
  q9: "q9_opt2", // Defending our points and arguing for fairness
  q10: "q10_opt2", // Defending an innocent person in court
};
const lawResult = processAssessment(lawAnswers, seedCareers, { recommendationCount: 4 });
console.log(`   Top Match: ${lawResult.topMatch.title} (${lawResult.topMatch.matchPercentage}%)`);
console.log(`   #1 Category: ${lawResult.rankedCategories[0].category} (${lawResult.rankedCategories[0].score}%)`);
assert(lawResult.rankedCategories[0].category === "law", "Law profile ranks law as #1");
assert(lawResult.topMatch.roadmapId === "lawyer" || lawResult.topMatch.categoryKey === "law", "Top match is a legal profession");

// 3. Profile: Software & Technology
console.log("\n--- 3. Testing Profile: Software & Technology ---");
const techAnswers = {
  q1: "q1_opt3", // Computer science and coding logic
  q2: "q2_opt3", // Writing code or step-by-step logic formulas
  q3: "q3_opt3", // A working website or computer app
  q4: "q4_opt3", // Code snippets and algorithm charts
  q5: "q5_opt3", // Fix computer software or write new code
  q6: "q6_opt3", // Build a video game or website
  q7: "q7_opt3", // A software company building smart apps
  q8: "q8_opt3", // Finding and fixing bugs in a program
  q9: "q9_opt3", // Managing the computer code and tech tools
  q10: "q10_opt3", // Building an app downloaded by millions
};
const techResult = processAssessment(techAnswers, seedCareers, { recommendationCount: 4 });
console.log(`   Top Match: ${techResult.topMatch.title} (${techResult.topMatch.matchPercentage}%)`);
console.log(`   #1 Category: ${techResult.rankedCategories[0].category} (${techResult.rankedCategories[0].score}%)`);
assert(techResult.rankedCategories[0].category === "technology", "Tech profile ranks technology as #1");
assert(techResult.topMatch.roadmapId === "engineer" || techResult.topMatch.categoryKey === "technology", "Top match is a technology profession");

// 4. Profile: Creative & Design
console.log("\n--- 4. Testing Profile: Creative & Design ---");
const designAnswers = {
  q1: "q1_opt4", // Art, drafting, and graphic design
  q2: "q2_opt4", // Drawing diagrams, sketches, and visual mind-maps
  q3: "q3_opt4", // An art portfolio or fashion showcase
  q4: "q4_opt4", // Visual photos, typography, and page layout
  q5: "q5_opt4", // Sketch a logo, room layout, or outfit
  q6: "q6_opt4", // Paint, take photos, or edit creative videos
  q7: "q7_opt4", // A design studio or film set
  q8: "q8_opt4", // Redesigning an ugly poster or messy room
  q9: "q9_opt4", // Designing the slides, graphics, and visual look
  q10: "q10_opt4", // Creating an iconic artwork or building
};
const designResult = processAssessment(designAnswers, seedCareers, { recommendationCount: 4 });
console.log(`   Top Match: ${designResult.topMatch.title} (${designResult.topMatch.matchPercentage}%)`);
console.log(`   #1 Category: ${designResult.rankedCategories[0].category} (${designResult.rankedCategories[0].score}%)`);
assert(designResult.rankedCategories[0].category === "design", "Design profile ranks design as #1");
assert(designResult.topMatch.roadmapId === "designer" || designResult.topMatch.categoryKey === "design", "Top match is a design profession");

// 5. Profile: Tie-Breaker Profile (Business & Finance)
console.log("\n--- 5. Testing Profile: Tie-Breaker (Business & Finance) ---");
const tieAnswers = {
  q1: "q1_opt5", // Math, business studies, and economics (finance: 3, business: 2)
  q2: "q2_opt5", // Calculating numbers and spreadsheets for business
  q3: "q3_opt5", // A business plan selling a product
  q4: "q4_opt5", // Company revenue tables and market trends
  q5: "q5_opt5", // Sell items online to make a profit
  q6: "q6_opt5", // Research stock prices or startup ideas
  q7: "q7_opt5", // A stock exchange or corporate office
  q8: "q8_opt5", // Finding ways to invest and grow money
  q9: "q9_opt5", // Leading the team and planning the budget
  q10: "q10_opt5", // Growing a company into a thriving business
};
const tieResult = processAssessment(tieAnswers, seedCareers, { recommendationCount: 4, marginThreshold: 10 });
console.log(`   #1 Category: ${tieResult.rankedCategories[0].category} (${tieResult.rankedCategories[0].score}%)`);
console.log(`   #2 Category: ${tieResult.rankedCategories[1].category} (${tieResult.rankedCategories[1].score}%)`);
console.log(`   Score Margin: ${tieResult.tieBreaker.margin}%`);
console.log(`   Is Tie: ${tieResult.tieBreaker.isTie}`);
assert(tieResult.tieBreaker.isTie === true, "Tie-breaker triggers when two categories are within margin");
assert(tieResult.topRecommendations[0].isTie === true, "Top recommendation 1 is flagged as isTie");
assert(tieResult.topRecommendations[1].isTie === true, "Top recommendation 2 is flagged as isTie");

// 6. Determinism & Repeatability Test
console.log("\n--- 6. Testing Determinism Across 50 Repeated Runs ---");
const baselineResult = processAssessment(techAnswers, seedCareers, { recommendationCount: 4 });
const baselineKey = baselineResult.topRecommendations.map((r) => `${r.roadmapId}:${r.matchPercentage}`).join(",");
let isIdentical = true;
for (let run = 1; run <= 50; run++) {
  const current = processAssessment(techAnswers, seedCareers, { recommendationCount: 4 });
  const currentKey = current.topRecommendations.map((r) => `${r.roadmapId}:${r.matchPercentage}`).join(",");
  if (currentKey !== baselineKey) {
    isIdentical = false;
    break;
  }
}
assert(isIdentical, "Scoring results are 100% deterministic across 50 runs with identical inputs");

console.log("\n==================================================================");
console.log(`🎉 All ${passedTests} / ${totalTests} Automated Tests Passed Successfully!`);
console.log("==================================================================\n");
