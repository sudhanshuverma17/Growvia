import { DOMAINS, getRoadmapsByDomain, DOMAIN_ROADMAP_MAP } from "../config/quizDomains.js";
import { scoreStage2 } from "../services/stage2Selector.js";

const SMALL_DOMAINS = ["engineering", "law_gov", "education_social", "aviation_hospitality", "science"];

const ownMap = {};
for (const dom of DOMAINS) ownMap[dom] = getRoadmapsByDomain(dom);

// All 55 pairs
const pairs = [];
for (let i = 0; i < DOMAINS.length; i++) {
  for (let j = i + 1; j < DOMAINS.length; j++) {
    pairs.push([DOMAINS[i], DOMAINS[j]]);
  }
}

// Function to build questions for a candidate bank configuration
// In each domain:
// Tech, Healthcare, Business: size 7 (0 adjs)
// Media, Creative: size 5 (4 adjs)
// Finance: size 4 (4 adjs)
// Law_gov, Education_social, Aviation_hospitality: size 3 (4 adjs or 3 adjs)
// Engineering, Science: size 2 (4 adjs)

export function evaluateBanks(adjMap, layoutType = "clean", runs = 2000) {
  const q4 = {};

  // 1. Tech, Healthcare, Business (Size 7)
  for (const dom of ["tech", "healthcare", "business"]) {
    const own = ownMap[dom];
    const seq = [
      [0, 1, 2, 3, 4, 5],
      [6, 0, 1, 2, 3, 4],
      [5, 6, 0, 1, 2, 3],
      [4, 5, 6, 0, 1, 2]
    ];
    const questions = [];
    for (let q = 0; q < 4; q++) questions.push(seq[q].map(idx => ({ [own[idx]]: 3 })));
    questions[0][0][own[3]] = 1; questions[0][1][own[4]] = 1; questions[0][2][own[5]] = 1; questions[0][3][own[6]] = 1;
    questions[1][0][own[3]] = 1; questions[1][1][own[4]] = 1; questions[1][2][own[5]] = 1; questions[1][3][own[6]] = 1;
    questions[2][0][own[3]] = 1; questions[2][1][own[4]] = 1; questions[2][2][own[5]] = 1; questions[2][3][own[6]] = 1;
    questions[3][0][own[3]] = 1; questions[3][1][own[4]] = 1; questions[3][2][own[5]] = 1; questions[3][3][own[6]] = 1;
    q4[dom] = questions;
  }

  // 2. Creative, Media (Size 5)
  for (const dom of ["creative", "media"]) {
    const own = ownMap[dom];
    const adjs = adjMap[dom];
    const questions = [];
    for (let q = 0; q < 4; q++) {
      const opts = [];
      for (let o = 0; o < 5; o++) opts.push({ [own[o]]: 3 });
      opts.push({ [adjs[q]]: 3 });
      questions.push(opts);
    }
    questions[0][5][own[0]] = 1; questions[1][5][own[1]] = 1;
    questions[2][5][own[2]] = 1; questions[3][5][own[3]] = 1;
    q4[dom] = questions;
  }

  // 3. Finance (Size 4)
  {
    const dom = "finance";
    const own = ownMap[dom];
    const adjs = adjMap[dom];
    const questions = [];
    for (let q = 0; q < 4; q++) {
      const opts = [];
      for (let o = 0; o < 4; o++) opts.push({ [own[o]]: 3 });
      opts.push({ [own[q]]: 3 });
      opts.push({ [adjs[q]]: 3 });
      questions.push(opts);
    }
    q4[dom] = questions;
  }

  // 4. Law_gov, Education_social, Aviation_hospitality (Size 3)
  for (const dom of ["law_gov", "education_social", "aviation_hospitality"]) {
    const own = ownMap[dom];
    const adjs = adjMap[dom];
    // Q0..Q2: 5 own, 1 adj
    // Q3: 3 own, 3 adj (adjs 0, 1, 2)
    const questions = [
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [adjs[0]]: 3 }],
      [{ [own[2]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[0]]: 3 }, { [adjs[1]]: 3 }],
      [{ [own[1]]: 3 }, { [own[2]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [adjs[2]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [adjs[0]]: 3 }, { [adjs[1]]: 3 }, { [adjs[2]]: 3 }]
    ];
    q4[dom] = questions;
  }

  // 5. Engineering, Science (Size 2)
  for (const dom of ["engineering", "science"]) {
    const own = ownMap[dom];
    const adjs = adjMap[dom];
    // Q0: 4 own, 2 adj (adjs[0], adjs[1])
    // Q1: 4 own, 2 adj (adjs[2], adjs[3])
    // Q2: 4 own, 2 adj (adjs[0], adjs[2])
    // Q3: 2 own, 4 adj (adjs[1], adjs[3], adjs[0], adjs[2])
    const questions = [
      [{ [own[0]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[1]]: 3 }, { [adjs[0]]: 3 }, { [adjs[1]]: 3 }],
      [{ [own[0]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[1]]: 3 }, { [adjs[2]]: 3 }, { [adjs[3]]: 3 }],
      [{ [own[0]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[1]]: 3 }, { [adjs[0]]: 3 }, { [adjs[2]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [adjs[1]]: 3 }, { [adjs[3]]: 3 }, { [adjs[0]]: 3 }, { [adjs[2]]: 3 }]
    ];
    questions[3][2][own[0]] = 1;
    questions[3][3][own[1]] = 1;
    q4[dom] = questions;
  }

  let passed = 0;
  const fails = [];
  for (const [domA, domB] of pairs) {
    const roadmapsA = ownMap[domA];
    const roadmapsB = ownMap[domB];
    const questions = [];
    for (let k = 0; k < 4; k++) {
      questions.push({ id: `qA_${k}`, options: q4[domA][k].map((w, idx) => ({ id: `optA_${k}_${idx}`, weights: w })) });
      questions.push({ id: `qB_${k}`, options: q4[domB][k].map((w, idx) => ({ id: `optB_${k}_${idx}`, weights: w })) });
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

    const pass = shareA >= 42.0 && shareA <= 58.0 && ratioA <= 2.0 && ratioB <= 2.0;
    if (pass) passed++;
    else fails.push({ domA, domB, shareA, shareB, ratioA, ratioB });
  }

  return { passed, fails };
}

// In checkCurrent5B.js earlier, there were 9 failures:
// 4 involving finance + (engineering, law_gov, education_social, science)
// creative + aviation_hospitality
// engineering + aviation_hospitality
// law_gov + aviation_hospitality
// law_gov + science
// aviation_hospitality + science

// Let's test replacements for the adjs of the 5 small domains:
// - law_gov (needs 3 adjs)
// - education_social (needs 3 adjs)
// - aviation_hospitality (needs 3 adjs)
// - engineering (needs 4 adjs)
// - science (needs 4 adjs)

const candidates = [
  "civil-engineer", "mechanical-engineer",
  "biotechnologist", "environmental-scientist",
  "teacher", "ed-tech", "social-worker",
  "pilot", "hotel-management", "event-manager"
];

console.log("Ready to search.");
