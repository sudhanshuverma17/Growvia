import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { STAGE2_BANKS } from "../services/stage2Selector.js";

// Let's test a clean mathematical weighting for blendCore questions
// We want to know: what makes a domain get 50% vs another domain?
// In a blended quiz:
// 4 questions from A, 4 questions from B (8 questions total).
// Let's test what happens if in each bank:
// Each own roadmap s has a point potential (sum of weights in the 4 questions).

console.log("Analyzing how point potentials translate to domain share in blended quizzes...");
