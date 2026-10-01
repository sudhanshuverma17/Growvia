import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { scoreStage2 } from "../services/stage2Selector.js";
import { buildBanks } from "./searchAdj55.js";

const ownMap = {};
const allSlugs = [];
for (const dom of DOMAINS) {
  ownMap[dom] = getRoadmapsByDomain(dom);
  allSlugs.push(...ownMap[dom]);
}

const pairs = [];
for (let i = 0; i < DOMAINS.length; i++) {
  for (let j = i + 1; j < DOMAINS.length; j++) {
    pairs.push([DOMAINS[i], DOMAINS[j]]);
  }
}

function evaluateAssignment(adjAssignment, runs = 3000) {
  const banksQ4 = buildBanks(adjAssignment);
  let failed = 0;
  let totalPenalty = 0;

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

    const stage1Affinity = {
      topDomains: [domA, domB],
      domainScores: { [domA]: 1.0, [domB]: 1.0 },
      isBlended: true
    };

    let winsA = 0, winsB = 0;
    const slugWinsA = {}, slugWinsB = {};
    for (const s of roadmapsA) slugWinsA[s] = 0;
    for (const s of roadmapsB) slugWinsB[s] = 0;

    for (let r = 0; r < runs; r++) {
      const answers = {};
      for (const q of questions) {
        answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;
      }
      const res = scoreStage2(answers, questions, { stage1Result: stage1Affinity, seed: 1337 + r });
      if (roadmapsA.includes(res.topSlug)) {
        winsA++;
        slugWinsA[res.topSlug]++;
      } else if (roadmapsB.includes(res.topSlug)) {
        winsB++;
        slugWinsB[res.topSlug]++;
      }
    }

    const totalWins = winsA + winsB;
    const shareA = (winsA / totalWins) * 100;
    const shareB = (winsB / totalWins) * 100;

    const valsA = Object.values(slugWinsA);
    const valsB = Object.values(slugWinsB);
    const ratioA = Math.max(...valsA) / Math.min(...valsA);
    const ratioB = Math.max(...valsB) / Math.min(...valsB);

    let pairPenalty = 0;
    if (shareA < 42.0) pairPenalty += (42.0 - shareA) * 10;
    if (shareA > 58.0) pairPenalty += (shareA - 58.0) * 10;
    if (ratioA > 2.0) pairPenalty += (ratioA - 2.0) * 20;
    if (ratioB > 2.0) pairPenalty += (ratioB - 2.0) * 20;

    if (pairPenalty > 0) failed++;
    totalPenalty += pairPenalty;
  }

  return { failed, totalPenalty };
}

// Initial assignment
let bestAdj = {
  media: ["teacher", "chartered-accountant", "civil-services", "pilot"],
  creative: ["social-worker", "financial-analyst", "teacher", "hotel-management"],
  finance: ["civil-engineer", "content-creator", "social-worker", "army-officer"],
  law_gov: ["nutritionist", "film-director", "financial-analyst", "civil-engineer", "data-scientist", "doctor"],
  education_social: ["pharmacist", "photographer", "risk-manager", "mechanical-engineer", "ai-ml-engineer", "financial-analyst"],
  aviation_hospitality: ["psychologist", "journalist", "chartered-accountant", "biotechnologist", "cloud-architect", "physiotherapist"],
  engineering: [
    "fitness-trainer", "public-relations", "investment-banker", "lawyer", "teacher",
    "pilot", "chartered-accountant", "content-creator", "data-scientist", "social-worker"
  ],
  science: [
    "civil-engineer", "film-director", "financial-analyst", "civil-services", "hotel-management",
    "army-officer", "game-developer", "photographer", "lawyer", "teacher"
  ]
};

console.log("Evaluating initial assignment...");
let { failed, totalPenalty } = evaluateAssignment(bestAdj);
console.log(`Initial: failed = ${failed} / 55, penalty = ${totalPenalty.toFixed(2)}`);

if (failed === 0) {
  console.log("SUCCESS! All 55 pairs pass!");
  console.log(JSON.stringify(bestAdj, null, 2));
  process.exit(0);
}

// Local search
const domainsWithAdj = Object.keys(bestAdj);
for (let iter = 1; iter <= 50; iter++) {
  const dom = domainsWithAdj[Math.floor(Math.random() * domainsWithAdj.length)];
  const idx = Math.floor(Math.random() * bestAdj[dom].length);
  const oldVal = bestAdj[dom][idx];
  
  // Pick a candidate not in dom
  const validCandidates = allSlugs.filter(s => !ownMap[dom].includes(s));
  const newVal = validCandidates[Math.floor(Math.random() * validCandidates.length)];
  
  bestAdj[dom][idx] = newVal;
  const res = evaluateAssignment(bestAdj);
  
  if (res.totalPenalty < totalPenalty) {
    totalPenalty = res.totalPenalty;
    failed = res.failed;
    console.log(`Iter ${iter}: improved to failed = ${failed}, penalty = ${totalPenalty.toFixed(2)} (${dom}[${idx}]: ${oldVal} -> ${newVal})`);
    if (failed === 0) {
      console.log("SUCCESS! Found 100% passing assignment!");
      console.log(JSON.stringify(bestAdj, null, 2));
      break;
    }
  } else {
    // Revert
    bestAdj[dom][idx] = oldVal;
  }
}
