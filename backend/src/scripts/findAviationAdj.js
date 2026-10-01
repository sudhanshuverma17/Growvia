import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { scoreStage2 } from "../services/stage2Selector.js";

const ownMap = {};
for (const dom of DOMAINS) ownMap[dom] = getRoadmapsByDomain(dom);

// Test candidates for aviation_hospitality's first adjacent (currently architect)
const candidates = [
  "civil-engineer", "mechanical-engineer", "biotechnologist", "environmental-scientist",
  "chartered-accountant", "investment-banker", "financial-analyst", "actuary",
  "lawyer", "civil-services", "army-officer", "teacher", "social-worker"
];

for (const cand of candidates) {
  const adjAssignment = {
    media: ["chartered-accountant", "civil-services", "mechanical-engineer", "environmental-scientist"],
    creative: ["chartered-accountant", "army-officer", "civil-engineer", "biotechnologist"],
    finance: ["lawyer", "mechanical-engineer", "civil-services", "environmental-scientist"],
    law_gov: ["financial-analyst", "hotel-management", "actuary"],
    education_social: ["civil-engineer", "financial-analyst", "actuary"],
    aviation_hospitality: [cand, "financial-analyst", "civil-services"],
    engineering: ["hotel-management", "chartered-accountant", "pilot", "actuary"],
    science: ["hotel-management", "financial-analyst", "civil-services", "pilot"]
  };

  // Build banks matching applyFullPerfectBanks.js exactly
  const q4 = {};

  // Tech, Healthcare, Business (Size 7)
  for (const dom of ["tech", "healthcare", "business"]) {
    const own = ownMap[dom];
    const seq = [
      [0, 1, 2, 3, 4, 5],
      [6, 0, 1, 2, 3, 4],
      [5, 6, 0, 1, 2, 3],
      [4, 5, 6, 0, 1, 2]
    ];
    const questions = [];
    for (let q = 0; q < 4; q++) {
      questions.push(seq[q].map(idx => ({ [own[idx]]: 3 })));
    }
    questions[0][0][own[3]] = 1; questions[0][1][own[4]] = 1; questions[0][2][own[5]] = 1; questions[0][3][own[6]] = 1;
    questions[1][0][own[3]] = 1; questions[1][1][own[4]] = 1; questions[1][2][own[5]] = 1; questions[1][3][own[6]] = 1;
    questions[2][0][own[3]] = 1; questions[2][1][own[4]] = 1; questions[2][2][own[5]] = 1; questions[2][3][own[6]] = 1;
    questions[3][0][own[3]] = 1; questions[3][1][own[4]] = 1; questions[3][2][own[5]] = 1; questions[3][3][own[6]] = 1;
    q4[dom] = questions;
  }

  // Creative and Media (Size 5)
  for (const dom of ["creative", "media"]) {
    const own = ownMap[dom];
    const adjs = adjAssignment[dom];
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

  // Finance (Size 4)
  {
    const dom = "finance";
    const own = ownMap[dom];
    const adjs = adjAssignment[dom];
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

  // Law_gov, Education_social, Aviation_hospitality (Size 3)
  for (const dom of ["law_gov", "education_social", "aviation_hospitality"]) {
    const own = ownMap[dom];
    const adjs = adjAssignment[dom];
    const questions = [
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [adjs[0]]: 3 }],
      [{ [own[2]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[0]]: 3 }, { [adjs[1]]: 3 }],
      [{ [own[1]]: 3 }, { [own[2]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [adjs[2]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [adjs[0]]: 3 }, { [adjs[1]]: 3 }, { [adjs[2]]: 3 }]
    ];
    q4[dom] = questions;
  }

  // Engineering and Science (Size 2)
  for (const dom of ["engineering", "science"]) {
    const own = ownMap[dom];
    const adjs = adjAssignment[dom];
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

  // Check all 55 pairs
  let passed = 0;
  const fails = [];
  const pairs = [];
  for (let i = 0; i < DOMAINS.length; i++) {
    for (let j = i + 1; j < DOMAINS.length; j++) {
      pairs.push([DOMAINS[i], DOMAINS[j]]);
    }
  }

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

    const RUNS = 1500;
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
    else fails.push({ domA, domB, shareA, shareB, ratioA, ratioB });
  }

  console.log(`Candidate '${cand}': Passed ${passed} / 55`);
  if (fails.length <= 3) {
    for (const f of fails) {
      console.log(`   Fail: ${f.domA}+${f.domB} A=${f.shareA.toFixed(1)}% B=${f.shareB.toFixed(1)}% rA=${f.ratioA.toFixed(2)} rB=${f.ratioB.toFixed(2)}`);
    }
  }
}
