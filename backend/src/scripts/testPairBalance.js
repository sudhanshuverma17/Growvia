import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { scoreStage2 } from "../services/stage2Selector.js";

const ownMap = {};
for (const dom of DOMAINS) ownMap[dom] = getRoadmapsByDomain(dom);

// Let's test pairs between Tech (size 7) and Law_gov (size 3) / Engineering (size 2)
// with different numbers of own vs adj options in Q1..Q4.

function testPair(domA, domB, qA, qB, runs = 5000) {
  const roadmapsA = ownMap[domA];
  const roadmapsB = ownMap[domB];
  const questions = [];
  for (let k = 0; k < 4; k++) {
    questions.push({ id: `qA_${k}`, options: qA[k].map((w, idx) => ({ id: `optA_${k}_${idx}`, weights: w })) });
    questions.push({ id: `qB_${k}`, options: qB[k].map((w, idx) => ({ id: `optB_${k}_${idx}`, weights: w })) });
  }

  const stage1Affinity = { topDomains: [domA, domB], domainScores: { [domA]: 1.0, [domB]: 1.0 }, isBlended: true };
  let winsA = 0, winsB = 0;
  const slugWinsA = {}, slugWinsB = {};
  for (const s of roadmapsA) slugWinsA[s] = 0;
  for (const s of roadmapsB) slugWinsB[s] = 0;

  for (let r = 0; r < runs; r++) {
    const answers = {};
    for (const q of questions) answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;
    const res = scoreStage2(answers, questions, { stage1Result: stage1Affinity, seed: 1337 + r });
    if (roadmapsA.includes(res.topSlug)) { winsA++; slugWinsA[res.topSlug]++; }
    else if (roadmapsB.includes(res.topSlug)) { winsB++; slugWinsB[res.topSlug]++; }
  }

  const total = winsA + winsB;
  const shareA = (winsA / total) * 100;
  const shareB = (winsB / total) * 100;
  const valsA = Object.values(slugWinsA);
  const valsB = Object.values(slugWinsB);
  const ratioA = Math.max(...valsA) / Math.min(...valsA);
  const ratioB = Math.max(...valsB) / Math.min(...valsB);

  console.log(`Pair (${domA}+${domB}) -> A: ${shareA.toFixed(1)}% B: ${shareB.toFixed(1)}% | Ratios: [A: ${ratioA.toFixed(2)}x, B: ${ratioB.toFixed(2)}x]`);
}

// Tech bank (same as always)
const ownTech = ownMap.tech;
const qTech = [
  [{ [ownTech[0]]: 3, [ownTech[3]]: 1 }, { [ownTech[1]]: 3, [ownTech[4]]: 1 }, { [ownTech[2]]: 3, [ownTech[5]]: 1 }, { [ownTech[3]]: 3, [ownTech[6]]: 1 }, { [ownTech[4]]: 3 }, { [ownTech[5]]: 3 }],
  [{ [ownTech[6]]: 3, [ownTech[3]]: 1 }, { [ownTech[0]]: 3, [ownTech[4]]: 1 }, { [ownTech[1]]: 3, [ownTech[5]]: 1 }, { [ownTech[2]]: 3, [ownTech[6]]: 1 }, { [ownTech[3]]: 3 }, { [ownTech[4]]: 3 }],
  [{ [ownTech[5]]: 3, [ownTech[3]]: 1 }, { [ownTech[6]]: 3, [ownTech[4]]: 1 }, { [ownTech[0]]: 3, [ownTech[5]]: 1 }, { [ownTech[1]]: 3, [ownTech[6]]: 1 }, { [ownTech[2]]: 3 }, { [ownTech[3]]: 3 }],
  [{ [ownTech[4]]: 3, [ownTech[3]]: 1 }, { [ownTech[5]]: 3, [ownTech[4]]: 1 }, { [ownTech[6]]: 3, [ownTech[5]]: 1 }, { [ownTech[0]]: 3, [ownTech[6]]: 1 }, { [ownTech[1]]: 3 }, { [ownTech[2]]: 3 }]
];

console.log("Testing Law_gov options...");
const ownLaw = ownMap.law_gov;
// Suppose law_gov has 3 adjs (A, B, C) from neutral domains (e.g. non-tech):
const qLaw = [
  [{ [ownLaw[0]]: 3 }, { [ownLaw[1]]: 3 }, { [ownLaw[2]]: 3 }, { [ownLaw[0]]: 3 }, { [ownLaw[1]]: 3 }, { "hotel-management": 3 }],
  [{ [ownLaw[2]]: 3 }, { [ownLaw[0]]: 3 }, { [ownLaw[1]]: 3 }, { [ownLaw[2]]: 3 }, { [ownLaw[0]]: 3 }, { "financial-analyst": 3 }],
  [{ [ownLaw[1]]: 3 }, { [ownLaw[2]]: 3 }, { [ownLaw[0]]: 3 }, { [ownLaw[1]]: 3 }, { [ownLaw[2]]: 3 }, { "civil-engineer": 3 }],
  [{ [ownLaw[0]]: 3 }, { [ownLaw[1]]: 3 }, { [ownLaw[2]]: 3 }, { [ownLaw[0]]: 3 }, { [ownLaw[1]]: 3 }, { [ownLaw[2]]: 3 }]
];
testPair("tech", "law_gov", qTech, qLaw);

console.log("Testing Engineering options...");
const ownEng = ownMap.engineering;
// In engineering: 2 roadmaps. If Q0..Q3 have 4 own, 2 adj:
const qEng = [
  [{ [ownEng[0]]: 3 }, { [ownEng[0]]: 3 }, { [ownEng[1]]: 3 }, { [ownEng[1]]: 3 }, { "hotel-management": 3 }, { "pilot": 3 }],
  [{ [ownEng[0]]: 3 }, { [ownEng[0]]: 3 }, { [ownEng[1]]: 3 }, { [ownEng[1]]: 3 }, { "civil-services": 3 }, { "lawyer": 3 }],
  [{ [ownEng[0]]: 3 }, { [ownEng[0]]: 3 }, { [ownEng[1]]: 3 }, { [ownEng[1]]: 3 }, { "hotel-management": 3 }, { "pilot": 3 }],
  [{ [ownEng[0]]: 3 }, { [ownEng[1]]: 3 }, { "civil-services": 3 }, { "lawyer": 3 }, { "hotel-management": 3 }, { "pilot": 3 }]
];
testPair("tech", "engineering", qTech, qEng);
