import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { scoreStage2 } from "../services/stage2Selector.js";

const ownMap = {};
for (const dom of DOMAINS) ownMap[dom] = getRoadmapsByDomain(dom);

const ownCreative = ownMap.creative;
const ownEng = ownMap.engineering;
const ownSci = ownMap.science;

// Engineering with 8 distinct adjs (1 in each option of Q0..Q3):
const engAdjs = [
  "hotel-management", "chartered-accountant", "civil-services", "biotechnologist",
  "teacher", "journalist", "pilot", "investment-banker"
];
const qEng = [
  [{ [ownEng[0]]: 3 }, { [ownEng[0]]: 3 }, { [ownEng[1]]: 3 }, { [ownEng[1]]: 3 }, { [engAdjs[0]]: 3 }, { [engAdjs[1]]: 3 }],
  [{ [ownEng[0]]: 3 }, { [ownEng[0]]: 3 }, { [ownEng[1]]: 3 }, { [ownEng[1]]: 3 }, { [engAdjs[2]]: 3 }, { [engAdjs[3]]: 3 }],
  [{ [ownEng[0]]: 3 }, { [ownEng[0]]: 3 }, { [ownEng[1]]: 3 }, { [ownEng[1]]: 3 }, { [engAdjs[4]]: 3 }, { [engAdjs[5]]: 3 }],
  [{ [ownEng[0]]: 3 }, { [ownEng[0]]: 3 }, { [ownEng[1]]: 3 }, { [ownEng[1]]: 3 }, { [engAdjs[6]]: 3 }, { [engAdjs[7]]: 3 }]
];

// Creative:
// Test different secondary configurations on Creative Q0..Q3:
// Creative has 5 roadmaps: 0, 1, 2, 3, 4
// 4 questions.
// Option 5 is adj. Options 0..4 are own[0]..own[4].
const crAdjs = ["chartered-accountant", "army-officer", "civil-engineer", "biotechnologist"];

function buildCreativeQ(secondaryBoost = false) {
  const q = [];
  for (let i = 0; i < 4; i++) {
    const opts = [];
    for (let o = 0; o < 5; o++) opts.push({ [ownCreative[o]]: 3 });
    opts.push({ [crAdjs[i]]: 3 });
    if (secondaryBoost) {
      // Add secondaries to own roadmaps
      opts[0][ownCreative[(i + 1) % 5]] = 1;
      opts[1][ownCreative[(i + 2) % 5]] = 1;
      opts[2][ownCreative[(i + 3) % 5]] = 1;
      opts[3][ownCreative[(i + 4) % 5]] = 1;
      opts[4][ownCreative[i]] = 1;
    }
    q.push(opts);
  }
  return q;
}

function simPair(qA, qB, roadmapsA, roadmapsB, domA, domB, runs = 10000) {
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

console.log("Without boost:");
simPair(buildCreativeQ(false), qEng, ownCreative, ownEng, "creative", "engineering");

console.log("With boost:");
simPair(buildCreativeQ(true), qEng, ownCreative, ownEng, "creative", "engineering");
