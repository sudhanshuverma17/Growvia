import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { scoreStage2 } from "../services/stage2Selector.js";

const ownMap = {};
for (const dom of DOMAINS) ownMap[dom] = getRoadmapsByDomain(dom);

// Let's test the 4-adj layout for size 3 and size 2!
// In size 3 (law_gov, education_social, aviation_hospitality):
// 4 adjs.
// Q0: own0, own1, own2, own0, adj0, adj1
// Q1: own1, own2, own0, own1, adj2, adj3
// Q2: own2, own0, own1, own2, adj0, adj2
// Q3: own0, own1, own2, own0, adj1, adj3
// Total own = 16 (own0: 6, own1: 5, own2: 5).
// Add secondary weight 1 to own1 on Q0 and own2 on Q1 -> expected score: 18 each! Perfect!

// In size 2 (engineering, science):
// 4 adjs.
// Q0: own0, own0, own1, own1, adj0, adj1
// Q1: own0, own0, own1, own1, adj2, adj3
// Q2: own0, own0, own1, own1, adj0, adj2
// Q3: own0, own0, own1, own1, adj1, adj3
// Total own = 16 (8 each for own0 and own1).
// Each adj appears twice.

// Now: which 4 adjs should each domain have?
// We have 8 domains that need 4 adjs:
// media, creative, finance, law_gov, education_social, aviation_hospitality, engineering, science.

// Let's write a function to evaluate an adjacent mapping across ALL 55 PAIRS!
function evaluateAdjMap(adjMap, runs = 1500) {
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
    for (let q = 0; q < 4; q++) {
      questions.push(seq[q].map(idx => ({ [own[idx]]: 3 })));
    }
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
    const questions = [
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[0]]: 3 }, { [adjs[0]]: 3 }, { [adjs[1]]: 3 }],
      [{ [own[1]]: 3 }, { [own[2]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [adjs[2]]: 3 }, { [adjs[3]]: 3 }],
      [{ [own[2]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [adjs[0]]: 3 }, { [adjs[2]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[0]]: 3 }, { [adjs[1]]: 3 }, { [adjs[3]]: 3 }]
    ];
    questions[0][4][own[1]] = 1;
    questions[1][4][own[2]] = 1;
    q4[dom] = questions;
  }

  // 5. Engineering, Science (Size 2)
  for (const dom of ["engineering", "science"]) {
    const own = ownMap[dom];
    const adjs = adjMap[dom];
    const questions = [
      [{ [own[0]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[1]]: 3 }, { [adjs[0]]: 3 }, { [adjs[1]]: 3 }],
      [{ [own[0]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[1]]: 3 }, { [adjs[2]]: 3 }, { [adjs[3]]: 3 }],
      [{ [own[0]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[1]]: 3 }, { [adjs[0]]: 3 }, { [adjs[2]]: 3 }],
      [{ [own[0]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[1]]: 3 }, { [adjs[1]]: 3 }, { [adjs[3]]: 3 }]
    ];
    q4[dom] = questions;
  }

  const pairs = [];
  for (let i = 0; i < DOMAINS.length; i++) {
    for (let j = i + 1; j < DOMAINS.length; j++) pairs.push([DOMAINS[i], DOMAINS[j]]);
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

// Let's test a clean, non-colliding adj map:
// Rule:
// A domain of size S borrows only from domains that don't collide or cause ratio > 2.0x!
const testMap = {
  media: ["chartered-accountant", "civil-services", "mechanical-engineer", "environmental-scientist"],
  creative: ["chartered-accountant", "army-officer", "civil-engineer", "biotechnologist"],
  finance: ["lawyer", "mechanical-engineer", "civil-services", "environmental-scientist"],
  law_gov: ["hotel-management", "pilot", "biotechnologist", "environmental-scientist"],
  education_social: ["hotel-management", "event-manager", "mechanical-engineer", "civil-engineer"],
  aviation_hospitality: ["teacher", "social-worker", "mechanical-engineer", "civil-engineer"],
  engineering: ["hotel-management", "pilot", "teacher", "social-worker"],
  science: ["hotel-management", "event-manager", "lawyer", "army-officer"]
};

console.log("Evaluating balanced 4-adj layout...");
const r = evaluateAdjMap(testMap, 2500);
console.log(`Passed: ${r.passed} / 55`);
if (r.fails.length > 0) {
  for (const f of r.fails) {
    console.log(`  FAIL: ${f.domA}+${f.domB} | shareA=${f.shareA.toFixed(1)}% shareB=${f.shareB.toFixed(1)}% | ratioA=${f.ratioA.toFixed(2)}x ratioB=${f.ratioB.toFixed(2)}x`);
  }
}
