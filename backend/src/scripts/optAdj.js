import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { scoreStage2 } from "../services/stage2Selector.js";

// Let's create an optimizer for the 55 pairs.
// We need to define for each domain: its 4 blendCore questions (each with 6 options of weights).
// Let's check which domains have adjacents in Q1..Q4:
// - tech (7): 0 adjacents (all 24 options are own)
// - healthcare (7): 0 adjacents
// - business (7): 0 adjacents
// - media (5): 4 adjacents (1 per question: 20 own, 4 adjacents)
// - creative (5): 4 adjacents (1 per question: 20 own, 4 adjacents)
// - finance (4): 4 adjacents (1 per question: 20 own, 4 adjacents)
// - law_gov (3): 6 adjacents (Q0..Q2: 1 adj; Q3: 3 adj -> 18 own, 6 adjacents)
// - education_social (3): 6 adjacents
// - aviation_hospitality (3): 6 adjacents
// - engineering (2): 9 adjacents (Q0..Q2: 2 adj; Q3: 3 adj -> 15 own, 9 adjacents)
// - science (2): 9 adjacents

// Notice:
// Tech, Healthcare, Business have 24 own options (each roadmap gets 3 or 4 options, avg = 3.43)
// Media, Creative have 20 own options (each roadmap gets 4 options, avg = 4.00)
// Finance has 20 own options (each roadmap gets 5 options, avg = 5.00)
// Law, Edu, Aviation have 18 own options (each roadmap gets 6 options, avg = 6.00)
// Engineering, Science have 15 own options (each roadmap gets 7 or 8 options, avg = 7.50)

// Notice how smooth that progression is:
// 3.43 -> 4.00 -> 5.00 -> 6.00 -> 7.50
// Now, who should the adjacents be?
// Let's test if we assign adjacents from a balanced cyclic graph or orthogonal sets!
console.log("Ready to optimize adjacents.");
