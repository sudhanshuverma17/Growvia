import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { STAGE2_BANKS, getStage2Set, scoreStage2 } from "../services/stage2Selector.js";

// Build banks in memory with the exact curated allocation
const banks = JSON.parse(JSON.stringify(STAGE2_BANKS));

// 1. Tech, Healthcare, Business:
// 24 options in Q1..Q4: 100% own roadmaps.
// 3 get 4 opts, 4 get 3 opts.
// Each of the 7 roadmaps gets 1 secondary w=1.
for (const dom of ["tech", "healthcare", "business"]) {
  const own = getRoadmapsByDomain(dom);
  const q4 = banks[dom].questions.filter(q => q.blendCore);
  const seq = [
    [0, 1, 2, 3, 4, 5],
    [6, 0, 1, 2, 3, 4],
    [5, 6, 0, 1, 2, 3],
    [4, 5, 6, 0, 1, 2]
  ];
  for (let q = 0; q < 4; q++) {
    for (let o = 0; o < 6; o++) {
      q4[q].options[o].weights = { [own[seq[q][o]]]: 3 };
    }
  }
  // Secondary w=1 for each of the 7 roadmaps
  for (let i = 0; i < 7; i++) {
    const qIdx = i % 4;
    const optIdx = (i * 2) % 6;
    const prim = Object.keys(q4[qIdx].options[optIdx].weights)[0];
    if (prim !== own[i]) {
      q4[qIdx].options[optIdx].weights[own[i]] = 1;
    } else {
      q4[qIdx].options[(optIdx + 1) % 6].weights[own[i]] = 1;
    }
  }
}

// 2. Creative and Media:
// In Q1..Q4: 5 own get 1 opt per Q (20 opts).
// Option 6:
// Media: Q0: digital-marketer, Q1: ed-tech, Q2: digital-marketer, Q3: ed-tech
// Creative: Q0: photographer, Q1: film-director, Q2: game-developer, Q3: civil-engineer
{
  const ownMedia = getRoadmapsByDomain("media");
  const q4Media = banks.media.questions.filter(q => q.blendCore);
  const mediaCross = ["digital-marketer", "ed-tech", "digital-marketer", "ed-tech"];
  for (let q = 0; q < 4; q++) {
    for (let o = 0; o < 5; o++) q4Media[q].options[o].weights = { [ownMedia[o]]: 3 };
    q4Media[q].options[5].weights = { [mediaCross[q]]: 3 };
  }

  const ownCreative = getRoadmapsByDomain("creative");
  const q4Creative = banks.creative.questions.filter(q => q.blendCore);
  const creatCross = ["photographer", "film-director", "game-developer", "civil-engineer"];
  for (let q = 0; q < 4; q++) {
    for (let o = 0; o < 5; o++) q4Creative[q].options[o].weights = { [ownCreative[o]]: 3 };
    q4Creative[q].options[5].weights = { [creatCross[q]]: 3 };
  }
}

// 3. Finance:
// 4 own get 1 opt per Q (16 opts).
// Options 4 and 5 in each Q:
// Q0: data-scientist, lawyer
// Q1: startup-founder, data-scientist
// Q2: lawyer, startup-founder
// Q3: data-scientist, lawyer
{
  const ownFinance = getRoadmapsByDomain("finance");
  const q4Fin = banks.finance.questions.filter(q => q.blendCore);
  const finCross = [
    ["data-scientist", "lawyer"],
    ["startup-founder", "data-scientist"],
    ["lawyer", "startup-founder"],
    ["data-scientist", "lawyer"],
  ];
  for (let q = 0; q < 4; q++) {
    for (let o = 0; o < 4; o++) q4Fin[q].options[o].weights = { [ownFinance[o]]: 3 };
    q4Fin[q].options[4].weights = { [finCross[q][0]]: 3 };
    q4Fin[q].options[5].weights = { [finCross[q][1]]: 3 };
  }
}

// 4. Engineering and Science:
// 2 own get 2 opts per Q (16 opts).
// 2 opts per Q from civil-services, pilot, social-worker, teacher
{
  for (const dom of ["engineering", "science"]) {
    const own = getRoadmapsByDomain(dom);
    const q4 = banks[dom].questions.filter(q => q.blendCore);
    const adjPairs = [
      ["civil-services", "pilot"],
      ["social-worker", "teacher"],
      ["civil-services", "social-worker"],
      ["pilot", "teacher"],
    ];
    for (let q = 0; q < 4; q++) {
      q4[q].options[0].weights = { [own[0]]: 3 };
      q4[q].options[1].weights = { [own[0]]: 3 };
      q4[q].options[2].weights = { [own[1]]: 3 };
      q4[q].options[3].weights = { [own[1]]: 3 };
      q4[q].options[4].weights = { [adjPairs[q][0]]: 3 };
      q4[q].options[5].weights = { [adjPairs[q][1]]: 3 };
    }
  }
}

// 5. Law_gov, Education_social, Aviation_hospitality:
// 3 own get 1 opt per Q + 1 extra own (16 opts).
// 2 opts per Q from their curated adjacent list.
{
  const small3 = {
    law_gov: ["social-worker", "teacher", "pilot"],
    education_social: ["lawyer", "civil-services", "hotel-management"],
    aviation_hospitality: ["civil-services", "army-officer", "social-worker"],
  };
  for (const [dom, adjList] of Object.entries(small3)) {
    const own = getRoadmapsByDomain(dom);
    const q4 = banks[dom].questions.filter(q => q.blendCore);
    for (let q = 0; q < 4; q++) {
      q4[q].options[0].weights = { [own[0]]: 3 };
      q4[q].options[1].weights = { [own[1]]: 3 };
      q4[q].options[2].weights = { [own[2]]: 3 };
      q4[q].options[3].weights = { [own[q % 3]]: 3 };
      q4[q].options[4].weights = { [adjList[q % 3]]: 3 };
      q4[q].options[5].weights = { [adjList[(q + 1) % 3]]: 3 };
    }
  }
}

// Run all 55 pairs at 20,000 runs
const pairs = [];
for (let i = 0; i < DOMAINS.length; i++) {
  for (let j = i + 1; j < DOMAINS.length; j++) {
    pairs.push([DOMAINS[i], DOMAINS[j]]);
  }
}

console.log(`Simulating all ${pairs.length} pairs (20,000 runs each)...`);

const RUNS = 20000;
let passedPairs = 0;
const results = [];

for (const [domA, domB] of pairs) {
  const roadmapsA = getRoadmapsByDomain(domA);
  const roadmapsB = getRoadmapsByDomain(domB);
  const qA = banks[domA].questions.filter(q => q.blendCore).slice(0, 4);
  const qB = banks[domB].questions.filter(q => q.blendCore).slice(0, 4);
  const questions = [];
  for (let k = 0; k < 4; k++) { questions.push(qA[k]); questions.push(qB[k]); }
  const dummyStage1 = { topDomains: [domA, domB], domainScores: { [domA]: 1.0, [domB]: 1.0 }, isBlended: true };

  let winsA = 0, winsB = 0;
  const slugWinsA = {}, slugWinsB = {};
  for (const s of roadmapsA) slugWinsA[s] = 0;
  for (const s of roadmapsB) slugWinsB[s] = 0;

  for (let r = 0; r < RUNS; r++) {
    const answers = {};
    for (const q of questions) answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;
    const res = scoreStage2(answers, questions, { stage1Result: dummyStage1, seed: 1337 + r });
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
  if (pass) passedPairs++;
  results.push({ domA, domB, shareA, shareB, ratioA, ratioB, pass });
}

console.log(`Passed Pairs: ${passedPairs} / 55`);
results.sort((a, b) => Math.abs(b.shareA - 50) - Math.abs(a.shareA - 50));
console.log("\nTop 15 Most Unequal Pairs:");
for (let i = 0; i < 15; i++) {
  const p = results[i];
  console.log(`  ${p.domA.padEnd(20)} + ${p.domB.padEnd(20)} | A: ${p.shareA.toFixed(1)}% B: ${p.shareB.toFixed(1)}% | Ratios: [A: ${p.ratioA.toFixed(2)}x, B: ${p.ratioB.toFixed(2)}x] | ${p.pass ? "✅ PASS" : "❌ FAIL"}`);
}
