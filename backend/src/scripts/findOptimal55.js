import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { scoreStage2 } from "../services/stage2Selector.js";

// Let's test a clean mathematical formulation where:
// For each domain size (7, 5, 4, 3, 2), we design the 4 blendCore questions (each with 6 options).
// Rules:
// 1. Every option has EXACTLY ONE slug at weight 3.
// 2. Every option has <= 2 secondary slugs (weight 1 or 2).
// 3. For any pair of domains, all 55 pairs must have domain share in 42-58%, and ratio <= 2.0x.

console.log("Searching for optimal blendCore weights...");
