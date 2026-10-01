import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { STAGE2_BANKS, getStage2Set, scoreStage2 } from "../services/stage2Selector.js";

// Let's create candidate Q1..Q4 sets for all 11 domains and test all 55 pairs.

function makeBankQ4() {
  const q4 = {};

  // 1. Tech, Healthcare, Business (Size 7)
  // All 24 options are own roadmaps.
  // Seq for primaries (0..6):
  // Q0: 0, 1, 2, 3, 4, 5
  // Q1: 6, 0, 1, 2, 3, 4
  // Q2: 5, 6, 0, 1, 2, 3
  // Q3: 4, 5, 6, 0, 1, 2
  // Primaries count: 0,1,2 get 4; 3,4,5,6 get 3.
  // Add secondaries to boost avgMax to ~5.5-5.6 and balance in-domain ratio:
  for (const dom of ["tech", "healthcare", "business"]) {
    const own = getRoadmapsByDomain(dom);
    const questions = [
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[4]]: 3 }, { [own[5]]: 3 }],
      [{ [own[6]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[4]]: 3 }],
      [{ [own[5]]: 3 }, { [own[6]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }],
      [{ [own[4]]: 3 }, { [own[5]]: 3 }, { [own[6]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }]
    ];
    // Add secondaries
    questions[0][0][own[3]] = 1; questions[0][1][own[4]] = 1; questions[0][2][own[5]] = 1; questions[0][3][own[6]] = 1;
    questions[1][0][own[0]] = 1; questions[1][1][own[1]] = 1; questions[1][2][own[2]] = 1; questions[1][3][own[3]] = 1;
    questions[2][0][own[4]] = 1; questions[2][1][own[5]] = 1; questions[2][2][own[6]] = 1; questions[2][3][own[0]] = 1;
    questions[3][0][own[1]] = 1; questions[3][1][own[2]] = 1; questions[3][2][own[3]] = 1; questions[3][3][own[4]] = 1;
    q4[dom] = questions;
  }

  // 2. Creative and Media (Size 5)
  // Roadmaps 0, 1, 2, 3, 4
  // Q0: 0, 1, 2, 3, 4, 0
  // Q1: 0, 1, 2, 3, 4, 1
  // Q2: 0, 1, 2, 3, 4, 2
  // Q3: 0, 1, 2, 3, 4, 3
  // 0,1,2,3 get 5 opts. 4 gets 4 opts + two w=1 secondaries.
  for (const dom of ["creative", "media"]) {
    const own = getRoadmapsByDomain(dom);
    const questions = [
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[4]]: 3 }, { [own[0]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[4]]: 3 }, { [own[1]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[4]]: 3 }, { [own[2]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[4]]: 3 }, { [own[3]]: 3 }]
    ];
    questions[0][0][own[4]] = 1;
    questions[1][1][own[4]] = 1;
    q4[dom] = questions;
  }

  // 3. Finance (Size 4)
  // Own roadmaps: chartered-accountant, investment-banker, financial-analyst, risk-manager
  // 4 own options per question + 2 adjacents per question.
  // Adjacents: let's select 4 neutral roadmaps (e.g. from law, education, aviation)
  {
    const own = getRoadmapsByDomain("finance");
    const adj = ["teacher", "pilot", "hotel-management", "social-worker"];
    const questions = [
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [adj[0]]: 3 }, { [adj[1]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [adj[2]]: 3 }, { [adj[3]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [adj[0]]: 3 }, { [adj[2]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [adj[1]]: 3 }, { [adj[3]]: 3 }]
    ];
    // Add secondaries
    questions[0][4][own[0]] = 1; questions[0][5][own[1]] = 1;
    questions[1][4][own[2]] = 1; questions[1][5][own[3]] = 1;
    questions[2][4][own[0]] = 1; questions[2][5][own[1]] = 1;
    questions[3][4][own[2]] = 1; questions[3][5][own[3]] = 1;
    q4["finance"] = questions;
  }

  // 4. Law_gov, Education_social, Aviation_hospitality (Size 3)
  // 4 own options per question + 2 adjacents per question
  {
    const small3 = {
      law_gov: ["teacher", "pilot", "hotel-management"],
      education_social: ["lawyer", "hotel-management", "pilot"],
      aviation_hospitality: ["teacher", "civil-services", "social-worker"],
    };
    for (const [dom, adjList] of Object.entries(small3)) {
      const own = getRoadmapsByDomain(dom);
      const questions = [
        [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[0]]: 3 }, { [adjList[0]]: 3 }, { [adjList[1]]: 3 }],
        [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[1]]: 3 }, { [adjList[1]]: 3 }, { [adjList[2]]: 3 }],
        [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[2]]: 3 }, { [adjList[2]]: 3 }, { [adjList[0]]: 3 }],
        [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[0]]: 3 }, { [adjList[0]]: 3 }, { [adjList[1]]: 3 }]
      ];
      questions[3][4][own[1]] = 1;
      questions[3][5][own[2]] = 1;
      q4[dom] = questions;
    }
  }

  // 5. Engineering and Science (Size 2)
  // In Q0..Q2: 4 own options + 2 adjacents
  // In Q3: 2 own options + 4 adjacents
  // Total own options = 4 + 4 + 4 + 2 = 14 opts (7 for each)
  {
    const adjList = ["social-worker", "teacher", "hotel-management", "pilot"];
    for (const dom of ["engineering", "science"]) {
      const own = getRoadmapsByDomain(dom);
      const questions = [
        [{ [own[0]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[1]]: 3 }, { [adjList[0]]: 3 }, { [adjList[1]]: 3 }],
        [{ [own[0]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[1]]: 3 }, { [adjList[2]]: 3 }, { [adjList[3]]: 3 }],
        [{ [own[0]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[1]]: 3 }, { [adjList[0]]: 3 }, { [adjList[2]]: 3 }],
        [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [adjList[0]]: 3 }, { [adjList[1]]: 3 }, { [adjList[2]]: 3 }, { [adjList[3]]: 3 }]
      ];
      questions[3][2][own[0]] = 1;
      questions[3][3][own[1]] = 1;
      q4[dom] = questions;
    }
  }

  return q4;
}

const banksQ4 = makeBankQ4();

// Test all 55 pairs at 5000 runs (fast verification)
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
  const roadmapsA = getRoadmapsByDomain(domA);
  const roadmapsB = getRoadmapsByDomain(domB);
  const pool = [...roadmapsA, ...roadmapsB];
  const qA = banksQ4[domA];
  const qB = banksQ4[domB];
  
  // Interleave questions
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

  const RUNS = 5000;
  for (let r = 0; r < RUNS; r++) {
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

  const pass = shareA >= 42.0 && shareA <= 58.0 && ratioA <= 2.0 && ratioB <= 2.0;
  if (pass) passed++;
  results.push({ domA, domB, shareA, shareB, ratioA, ratioB, pass });
}

console.log(`Passed Pairs: ${passed} / ${pairs.length}`);
results.sort((a, b) => Math.abs(b.shareA - 50) - Math.abs(a.shareA - 50));
console.log("\nTop 15 Most Unequal Pairs:");
for (let i = 0; i < 15; i++) {
  const p = results[i];
  console.log(`  ${p.domA.padEnd(20)} + ${p.domB.padEnd(20)} | A: ${p.shareA.toFixed(1)}% B: ${p.shareB.toFixed(1)}% | Ratios: [A: ${p.ratioA.toFixed(2)}x, B: ${p.ratioB.toFixed(2)}x] | ${p.pass ? "✅ PASS" : "❌ FAIL"}`);
}
