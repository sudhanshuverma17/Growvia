import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { scoreStage2 } from "../services/stage2Selector.js";
import { buildBanks } from "./searchAdj55.js";

const bestAdj = {
  media: ["supply-chain", "chartered-accountant", "civil-services", "ai-ml-engineer"],
  creative: ["social-worker", "financial-analyst", "teacher", "hotel-management"],
  finance: ["civil-engineer", "content-creator", "social-worker", "army-officer"],
  law_gov: ["nutritionist", "film-director", "financial-analyst", "civil-engineer", "data-scientist", "mechanical-engineer"],
  education_social: ["pharmacist", "photographer", "risk-manager", "mechanical-engineer", "ai-ml-engineer", "financial-analyst"],
  aviation_hospitality: ["psychologist", "journalist", "chartered-accountant", "biotechnologist", "cloud-architect", "physiotherapist"],
  engineering: [
    "fitness-trainer", "public-relations", "investment-banker", "lawyer", "marketing-manager",
    "pilot", "chartered-accountant", "content-creator", "data-scientist", "social-worker"
  ],
  science: [
    "civil-engineer", "film-director", "financial-analyst", "civil-services", "hotel-management",
    "army-officer", "game-developer", "photographer", "lawyer", "teacher"
  ]
};

const banksQ4 = buildBanks(bestAdj);
const ownMap = {};
for (const dom of DOMAINS) ownMap[dom] = getRoadmapsByDomain(dom);

const pairs = [];
for (let i = 0; i < DOMAINS.length; i++) {
  for (let j = i + 1; j < DOMAINS.length; j++) {
    pairs.push([DOMAINS[i], DOMAINS[j]]);
  }
}

let passed = 0;
const results = [];

for (const [domA, domB] of pairs) {
  const roadmapsA = ownMap[domA];
  const roadmapsB = ownMap[domB];
  const qA = banksQ4[domA];
  const qB = banksQ4[domB];

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

  const RUNS = 5000;
  for (let r = 0; r < RUNS; r++) {
    const answers = {};
    for (const q of questions) answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;
    const res = scoreStage2(answers, questions, { stage1Result: stage1Affinity, seed: 1337 + r });
    if (roadmapsA.includes(res.topSlug)) { winsA++; slugWinsA[res.topSlug]++; }
    else if (roadmapsB.includes(res.topSlug)) { winsB++; slugWinsB[res.topSlug]++; }
  }

  const totalWins = winsA + winsB;
  const shareA = (winsA / totalWins) * 100;
  const shareB = (winsB / totalWins) * 100;

  const valsA = Object.values(slugWinsA);
  const valsB = Object.values(slugWinsB);
  const ratioA = Math.max(...valsA) / Math.min(...valsA);
  const ratioB = Math.max(...valsB) / Math.min(...valsB);

  const pass = shareA >= 42.0 && shareA <= 58.0 && ratioA <= 2.0 && ratioB <= 2.0;
  if (pass) passed++;
  results.push({ domA, domB, shareA, shareB, ratioA, ratioB, pass });
}

console.log(`Passed Pairs: ${passed} / 55`);
const failedList = results.filter(p => !p.pass);
console.log(`Failed Pairs (${failedList.length}):`);
for (const p of failedList) {
  console.log(`  ${p.domA.padEnd(20)} + ${p.domB.padEnd(20)} | A: ${p.shareA.toFixed(1)}% B: ${p.shareB.toFixed(1)}% | Ratios: [A: ${p.ratioA.toFixed(2)}x, B: ${p.ratioB.toFixed(2)}x]`);
}
