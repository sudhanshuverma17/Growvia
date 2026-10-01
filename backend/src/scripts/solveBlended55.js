import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { STAGE2_BANKS } from "../services/stage2Selector.js";

// Let's examine what happens when tech, healthcare, media, creative, finance, business are tuned
// First, let's look at why tech+media puts 62% on media in testBlendSim.js:
// In testBlendSim.js:
// tech (7) + media (5)
// Tech has 6 options per question in Q1..Q4.
// Media has 5 options per question in Q1..Q4.

console.log("Analyzing media and tech blendCore structure...");
const techCore = STAGE2_BANKS.tech.questions.filter(q => q.blendCore);
const mediaCore = STAGE2_BANKS.media.questions.filter(q => q.blendCore);

console.log("Tech Q options counts:", techCore.map(q => q.options.length));
console.log("Media Q options counts:", mediaCore.map(q => q.options.length));
