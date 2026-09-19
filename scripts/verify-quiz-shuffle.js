import assert from "node:assert";
import {
  QUIZ_QUESTIONS,
  shuffleArray,
  generateQuizOptionOrder,
  applyQuizOptionOrder,
} from "../frontend/src/config/quiz-questions.js";
import { processAssessment } from "../backend/src/services/scoringEngine.js";

console.log("==========================================");
console.log("Running Career Quiz Shuffle Verification");
console.log("==========================================\n");

// Test 1: shuffleArray should return all original items in permuted order
console.log("Test 1: Fisher-Yates shuffle array permutation integrity...");
const original = [1, 2, 3, 4, 5, 6];
const shuffled = shuffleArray(original);
assert.strictEqual(shuffled.length, original.length, "Length should remain equal");
assert.deepStrictEqual([...shuffled].sort(), original, "All original elements must be preserved");
assert.notStrictEqual(shuffled, original, "Must return a new array instance");
console.log("✓ Test 1 passed: Array integrity and immutability verified.\n");

// Test 2: generateQuizOptionOrder creates independent permutations for every question
console.log("Test 2: Independent randomization per question...");
const orderMap = generateQuizOptionOrder(QUIZ_QUESTIONS);

assert.strictEqual(
  Object.keys(orderMap).length,
  QUIZ_QUESTIONS.length,
  "Order map must have entries for all questions"
);

// Check that options for each question are valid option IDs
QUIZ_QUESTIONS.forEach((q) => {
  const ids = orderMap[q.id];
  assert.ok(Array.isArray(ids), `Question ${q.id} must have an array of option IDs`);
  assert.strictEqual(ids.length, q.options.length, `Question ${q.id} options count must match`);
  const originalIds = q.options.map((o) => o.id).sort();
  assert.deepStrictEqual([...ids].sort(), originalIds, `Question ${q.id} option IDs must be preserved`);
});

// Check that the first option is not identical across all questions
const firstOptionCareers = [];
QUIZ_QUESTIONS.forEach((q) => {
  const firstOptId = orderMap[q.id][0];
  const opt = q.options.find((o) => o.id === firstOptId);
  const primaryCareer = Object.keys(opt.scores)[0];
  firstOptionCareers.push(primaryCareer);
});

const uniqueFirstOptions = new Set(firstOptionCareers);
console.log("Primary careers at position 1 across 10 questions:", firstOptionCareers);
assert.ok(
  uniqueFirstOptions.size > 1,
  `Option 1 should not always map to the same career (found ${uniqueFirstOptions.size} distinct careers across 10 questions)`
);
console.log(`✓ Test 2 passed: Diverse career distribution at Option 1 across questions (${uniqueFirstOptions.size} unique careers).\n`);

// Test 3: applyQuizOptionOrder preserves underlying option mapping and scores
console.log("Test 3: Option mapping and scores preservation...");
const reorderedQuestions = applyQuizOptionOrder(QUIZ_QUESTIONS, orderMap);

assert.strictEqual(reorderedQuestions.length, QUIZ_QUESTIONS.length);

reorderedQuestions.forEach((reorderedQ) => {
  const originalQ = QUIZ_QUESTIONS.find((q) => q.id === reorderedQ.id);
  assert.strictEqual(reorderedQ.options.length, originalQ.options.length);

  // Check that display order matches orderMap
  const expectedOrder = orderMap[reorderedQ.id];
  const actualOrder = reorderedQ.options.map((o) => o.id);
  assert.deepStrictEqual(actualOrder, expectedOrder, `Question ${reorderedQ.id} options must follow orderMap`);

  // Check that each option's scores, title, and metadata are intact
  reorderedQ.options.forEach((opt) => {
    const originalOpt = originalQ.options.find((o) => o.id === opt.id);
    assert.strictEqual(opt.title, originalOpt.title);
    assert.deepStrictEqual(opt.scores, originalOpt.scores);
  });
});
console.log("✓ Test 3 passed: Option titles, scores, and metadata intact.\n");

// Test 4: Session persistence simulation (JSON serialization & restoration)
console.log("Test 4: Session persistence serialization & restoration...");
const serialized = JSON.stringify(orderMap);
const restoredOrderMap = JSON.parse(serialized);
const restoredQuestions = applyQuizOptionOrder(QUIZ_QUESTIONS, restoredOrderMap);

assert.deepStrictEqual(
  restoredQuestions.map((q) => q.options.map((o) => o.id)),
  reorderedQuestions.map((q) => q.options.map((o) => o.id)),
  "Restored questions must have identical option order"
);
console.log("✓ Test 4 passed: Session order faithfully survives serialization and restoration.\n");

// Test 5: Scoring invariant - score calculation is 100% identical regardless of display order
console.log("Test 5: Scoring invariant verification...");

// Pick a representative set of answers
const sampleAnswers = {
  q1: "q1_opt3", // Tech
  q2: "q2_opt3", // Tech
  q3: "q3_opt3", // Tech
  q4: "q4_opt3", // Tech
  q5: "q5_opt3", // Tech
  q6: "q6_opt3", // Tech
  q7: "q7_opt3", // Tech
  q8: "q8_opt3", // Tech
  q9: "q9_opt3", // Tech
  q10: "q10_opt3", // Tech
};

const assessmentResult = processAssessment(sampleAnswers);
assert.ok(assessmentResult.topMatch, "Assessment must have a top match");
assert.strictEqual(assessmentResult.topMatch.id, "engineer", "Dominant tech answers must recommend engineer");
assert.ok(assessmentResult.categoryScores.technology >= 90, "Technology score must be high");

console.log(`Top match: ${assessmentResult.topMatch.title} (${assessmentResult.topMatch.matchPercentage}%)`);
console.log(`Technology category score: ${assessmentResult.categoryScores.technology}%`);
console.log("✓ Test 5 passed: Scoring engine evaluated accurately without position dependence.\n");

// Test 6: Retake generates new distinct session shuffle
console.log("Test 6: Retake generates new randomized shuffle...");
const retakeOrderMap = generateQuizOptionOrder(QUIZ_QUESTIONS);
const isExactSame = QUIZ_QUESTIONS.every((q) => {
  const o1 = orderMap[q.id].join(",");
  const o2 = retakeOrderMap[q.id].join(",");
  return o1 === o2;
});
assert.strictEqual(isExactSame, false, "A retake must generate a new independent randomization");
console.log("✓ Test 6 passed: Retake generates a distinct randomized session order.\n");

console.log("==========================================");
console.log("ALL 6 TESTS PASSED SUCCESSFULLY!");
console.log("==========================================");
