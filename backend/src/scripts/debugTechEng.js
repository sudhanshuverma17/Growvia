import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { scoreStage2 } from "../services/stage2Selector.js";
import { buildBanks } from "./testExactFullSuite.js";

const banks = buildBanks();
const roadmapsTech = getRoadmapsByDomain("tech");
const roadmapsEng = getRoadmapsByDomain("engineering");
const coreTech = banks.tech.questions.filter(q => q.blendCore).slice(0, 4);
const coreEng = banks.engineering.questions.filter(q => q.blendCore).slice(0, 4);
const servedSet = [];
for (let i = 0; i < 4; i++) { servedSet.push(coreTech[i]); servedSet.push(coreEng[i]); }
const stage1Affinity = { topDomains: ["tech", "engineering"], domainScores: { tech: 1.0, engineering: 1.0 }, isBlended: true };
const wins = {};
for (const s of [...roadmapsTech, ...roadmapsEng]) wins[s] = 0;
for (let r = 0; r < 5000; r++) {
  const answers = {};
  for (const q of servedSet) answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;
  const res = scoreStage2(answers, servedSet, { stage1Result: stage1Affinity, seed: 1337 + r });
  wins[res.topSlug]++;
}
console.log("Tech wins:", roadmapsTech.map(s => `${s}: ${wins[s]}`));
console.log("Eng wins:", roadmapsEng.map(s => `${s}: ${wins[s]}`));
