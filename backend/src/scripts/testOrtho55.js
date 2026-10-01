import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { scoreStage2 } from "../services/stage2Selector.js";
import { buildBanks } from "./searchAdj55.js";

const adjAssignment = {
  media: ["chartered-accountant", "civil-services", "mechanical-engineer", "environmental-scientist"],
  creative: ["chartered-accountant", "army-officer", "civil-engineer", "biotechnologist"],
  finance: ["lawyer", "mechanical-engineer", "civil-services", "environmental-scientist"],
  law_gov: ["financial-analyst", "hotel-management", "actuary"],
  education_social: ["civil-engineer", "financial-analyst", "actuary"],
  aviation_hospitality: ["architect", "financial-analyst", "civil-services"],
  engineering: ["hotel-management", "chartered-accountant", "pilot", "actuary"],
  science: ["hotel-management", "financial-analyst", "civil-services", "pilot"]
};

const banksQ4 = buildBanks(adjAssignment);
const ownMap = {};
for (const dom of DOMAINS) ownMap[dom] = getRoadmapsByDomain(dom);

const pairs = [];
for (let i = 0; i < DOMAINS.length; i++) {
  for (let j = i + 1; j < DOMAINS.length; j++) {
    pairs.push([DOMAINS[i], DOMAINS[j]]);
  }
}

console.log(`Simulating all ${pairs.length} pairs at 5,000 runs...`);
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
results.sort((a, b) => Math.abs(b.shareA - 50) - Math.abs(a.shareA - 50));
console.log("\nTop 15 Most Unequal Pairs:");
for (let i = 0; i < 15; i++) {
  const p = results[i];
  console.log(`  ${p.domA.padEnd(20)} + ${p.domB.padEnd(20)} | A: ${p.shareA.toFixed(1)}% B: ${p.shareB.toFixed(1)}% | Ratios: [A: ${p.ratioA.toFixed(2)}x, B: ${p.ratioB.toFixed(2)}x] | ${p.pass ? "✅ PASS" : "❌ FAIL"}`);
}
