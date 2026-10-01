import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { scoreStage2 } from "../services/stage2Selector.js";

const ownMap = {};
for (const dom of DOMAINS) ownMap[dom] = getRoadmapsByDomain(dom);

// All 55 pairs
const pairs = [];
for (let i = 0; i < DOMAINS.length; i++) {
  for (let j = i + 1; j < DOMAINS.length; j++) {
    pairs.push([DOMAINS[i], DOMAINS[j]]);
  }
}

// Function to construct banks from an adjacent map and verify all 55 pairs
export function testConfiguration(adjMap, runs = 1500) {
  // Build Q1..Q4 for all domains
  const q4 = {};

  // 1. Tech, Healthcare, Business (Size 7)
  for (const dom of ["tech", "healthcare", "business"]) {
    const own = ownMap[dom];
    const questions = [
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[4]]: 3 }, { [own[5]]: 3 }],
      [{ [own[6]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[4]]: 3 }],
      [{ [own[5]]: 3 }, { [own[6]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }],
      [{ [own[4]]: 3 }, { [own[5]]: 3 }, { [own[6]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }]
    ];
    questions[0][0][own[3]] = 1; questions[0][1][own[4]] = 1; questions[0][2][own[5]] = 1; questions[0][3][own[6]] = 1;
    questions[1][0][own[3]] = 1; questions[1][1][own[4]] = 1; questions[1][2][own[5]] = 1; questions[1][3][own[6]] = 1;
    questions[2][0][own[3]] = 1; questions[2][1][own[4]] = 1; questions[2][2][own[5]] = 1; questions[2][3][own[6]] = 1;
    questions[3][0][own[3]] = 1; questions[3][1][own[4]] = 1; questions[3][2][own[5]] = 1; questions[3][3][own[6]] = 1;
    q4[dom] = questions;
  }

  // 2. Creative and Media (Size 5)
  for (const dom of ["creative", "media"]) {
    const own = ownMap[dom];
    const adjs = adjMap[dom];
    const questions = [
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[4]]: 3 }, { [adjs[0]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[4]]: 3 }, { [adjs[1]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[4]]: 3 }, { [adjs[2]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[4]]: 3 }, { [adjs[3]]: 3 }]
    ];
    questions[0][5][own[0]] = 1; questions[1][5][own[1]] = 1;
    questions[2][5][own[2]] = 1; questions[3][5][own[3]] = 1;
    q4[dom] = questions;
  }

  // 3. Finance (Size 4)
  {
    const dom = "finance";
    const own = ownMap[dom];
    const adjs = adjMap[dom];
    const questions = [
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[0]]: 3 }, { [adjs[0]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[1]]: 3 }, { [adjs[1]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[2]]: 3 }, { [adjs[2]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[3]]: 3 }, { [adjs[3]]: 3 }]
    ];
    q4[dom] = questions;
  }

  // 4. Law_gov, Education_social, Aviation_hospitality (Size 3)
  for (const dom of ["law_gov", "education_social", "aviation_hospitality"]) {
    const own = ownMap[dom];
    const adjs = adjMap[dom]; // 6 distinct adjs
    const questions = [
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [adjs[0]]: 3 }],
      [{ [own[2]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[0]]: 3 }, { [adjs[1]]: 3 }],
      [{ [own[1]]: 3 }, { [own[2]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [adjs[2]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [adjs[3]]: 3 }, { [adjs[4]]: 3 }, { [adjs[5]]: 3 }]
    ];
    q4[dom] = questions;
  }

  // 5. Engineering and Science (Size 2)
  for (const dom of ["engineering", "science"]) {
    const own = ownMap[dom];
    const adjs = adjMap[dom]; // 10 distinct adjs
    const questions = [
      [{ [own[0]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[1]]: 3 }, { [adjs[0]]: 3 }, { [adjs[1]]: 3 }],
      [{ [own[0]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[1]]: 3 }, { [adjs[2]]: 3 }, { [adjs[3]]: 3 }],
      [{ [own[0]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[1]]: 3 }, { [adjs[4]]: 3 }, { [adjs[5]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [adjs[6]]: 3 }, { [adjs[7]]: 3 }, { [adjs[8]]: 3 }, { [adjs[9]]: 3 }]
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
    const qA = q4[domA];
    const qB = q4[domB];

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

  return { passed, fails };
}

// Let's test what happens if we use VALID slugs for size 3 and size 2!
// Where can the adjacent slugs come from?
// Slugs can come from TECH, HEALTHCARE, BUSINESS!
// Wait! If domain A has adjacent slugs from Tech, Healthcare, Business:
// Can Tech, Healthcare, Business absorb 1 adjacent slug without exceeding ratio 2.0x?
// Tech has 7 roadmaps.
// Healthcare has 7 roadmaps.
// Business has 7 roadmaps.
// In Tech: 7 roadmaps. If ONE roadmap appears in another domain's bank, how much does its win rate increase?
// Let's test!
