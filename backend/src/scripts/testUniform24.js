import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { STAGE2_BANKS, scoreStage2 } from "../services/stage2Selector.js";

// Exact 24 options configuration (4 Qs of 6 options):
// Size 7: 21 own (3 each) + 3 outside = 24
const config7 = [
  [1, 2, 3, 4, 5, 6], // 6
  [0, 2, 3, 4, 5, -1], // 5 own + 1 out
  [0, 1, 3, 5, 6, -1], // 5 own + 1 out
  [0, 1, 2, 4, 6, -1], // 5 own + 1 out
];

// Size 5: 20 own (4 each) + 4 outside = 24
const config5 = [
  [0, 1, 2, 3, 4, -1],
  [0, 1, 2, 3, 4, -1],
  [0, 1, 2, 3, 4, -1],
  [0, 1, 2, 3, 4, -1],
];

// Size 4: 16 own (4 each) + 8 outside = 24
const config4 = [
  [0, 1, 2, 3, -1, -1],
  [0, 1, 2, 3, -1, -1],
  [0, 1, 2, 3, -1, -1],
  [0, 1, 2, 3, -1, -1],
];

// Size 3: 15 own (5 each) + 9 outside = 24
const config3 = [
  [0, 1, 2, 0, -1, -1],
  [0, 1, 2, 1, -1, -1],
  [0, 1, 2, 2, -1, -1],
  [0, 1, 2, -1, -1, -1],
];

// Size 2: 14 own (7 each) + 10 outside = 24
const config2 = [
  [0, 0, 1, 1, -1, -1],
  [0, 0, 1, 1, -1, -1],
  [0, 0, 1, 1, -1, -1],
  [0, 1, -1, -1, -1, -1],
];

// Safe pool of 13 roadmaps with high base counts (from size 2 and 3 domains):
const safeOutsidePool = [
  "mechanical-engineer", // engineering (2)
  "civil-engineer",      // engineering (2)
  "physicist",           // science (2)
  "biotechnologist",     // science (2)
  "lawyer",              // law_gov (3)
  "civil-services",      // law_gov (3)
  "army-officer",        // law_gov (3)
  "teacher",             // education_social (3)
  "professor",           // education_social (3)
  "social-worker",       // education_social (3)
  "pilot",               // aviation_hospitality (3)
  "cabin-crew",          // aviation_hospitality (3)
  "hotel-management",    // aviation_hospitality (3)
];

const customBanks = {};
for (const dom of DOMAINS) {
  const bank = STAGE2_BANKS[dom];
  const roadmaps = getRoadmapsByDomain(dom);
  const n = roadmaps.length;
  const plan = n === 7 ? config7 : n === 5 ? config5 : n === 4 ? config4 : n === 3 ? config3 : config2;

  const outsideSlugs = safeOutsidePool.filter((s) => !roadmaps.includes(s));
  let outIdx = 0;

  const newQs = bank.questions.slice(0, 4).map((q, qIdx) => {
    const row = plan[qIdx];
    const opts = [];
    for (let oIdx = 0; oIdx < 6; oIdx++) {
      const target = row[oIdx];
      if (target >= 0) {
        const s = roadmaps[target];
        opts.push({ id: `${q.id}_opt${oIdx + 1}`, weights: { [s]: 3 }, text: "Option text" });
      } else {
        const s = outsideSlugs[outIdx % outsideSlugs.length];
        outIdx++;
        opts.push({ id: `${q.id}_opt${oIdx + 1}`, weights: { [s]: 3 }, text: "Option text" });
      }
    }
    return { ...q, options: opts, blendCore: true };
  });
  customBanks[dom] = { ...bank, questions: newQs };
}

console.log("Simulating 20,000 runs across all 55 pairs with 24-option uniform model...");

let passDomain = 0;
let passRatio = 0;
let passBoth = 0;
const pairResults = [];

for (let i = 0; i < DOMAINS.length; i++) {
  for (let j = i + 1; j < DOMAINS.length; j++) {
    const domA = DOMAINS[i];
    const domB = DOMAINS[j];
    const roadmapsA = getRoadmapsByDomain(domA);
    const roadmapsB = getRoadmapsByDomain(domB);
    const pool = [...roadmapsA, ...roadmapsB];

    const coreA = customBanks[domA].questions;
    const coreB = customBanks[domB].questions;
    const servedSet = [];
    for (let k = 0; k < 4; k++) {
      servedSet.push(coreA[k]);
      servedSet.push(coreB[k]);
    }

    let winsA = 0;
    let winsB = 0;
    const slugWins = {};
    for (const s of pool) slugWins[s] = 0;

    const runs = 20000;
    for (let r = 0; r < runs; r++) {
      const answers = {};
      for (const q of servedSet) {
        const idx = Math.floor(Math.random() * q.options.length);
        answers[q.id] = q.options[idx].id;
      }
      const res = scoreStage2(answers, servedSet, {
        stage1Result: { topDomains: [domA, domB], domainScores: { [domA]: 1.0, [domB]: 1.0 }, isBlended: true },
        seed: r,
      });
      if (roadmapsA.includes(res.topSlug)) {
        winsA++;
        slugWins[res.topSlug]++;
      } else if (roadmapsB.includes(res.topSlug)) {
        winsB++;
        slugWins[res.topSlug]++;
      }
    }

    const shareA = (winsA / runs) * 100;
    const ownWinsA = roadmapsA.map((s) => slugWins[s]);
    const ratioA = Math.max(...ownWinsA) / Math.min(...ownWinsA);
    const ownWinsB = roadmapsB.map((s) => slugWins[s]);
    const ratioB = Math.max(...ownWinsB) / Math.min(...ownWinsB);

    const dPass = shareA >= 42.0 && shareA <= 58.0;
    const rPass = ratioA <= 2.0 && ratioB <= 2.0;
    if (dPass) passDomain++;
    if (rPass) passRatio++;
    if (dPass && rPass) passBoth++;

    pairResults.push({ domA, domB, shareA, shareB: 100 - shareA, ratioA, ratioB, dPass, rPass });
  }
}

console.log(`\nDomain Pass (42-58%): ${passDomain} / 55`);
console.log(`Ratio Pass (<= 2.0x): ${passRatio} / 55`);
console.log(`Both Pass: ${passBoth} / 55`);

pairResults.sort((a, b) => Math.abs(b.shareA - 50) - Math.abs(a.shareA - 50));
console.log("\nWorst 10 Pairs by Domain Balance:");
for (let i = 0; i < 10; i++) {
  const p = pairResults[i];
  console.log(
    `${p.domA.padEnd(20)} + ${p.domB.padEnd(20)} | A: ${p.shareA.toFixed(1)}% B: ${p.shareB.toFixed(1)}% | Ratios: [A: ${p.ratioA.toFixed(2)}x, B: ${p.ratioB.toFixed(2)}x]`
  );
}

const failed = pairResults.filter((p) => !p.dPass || !p.rPass);
if (failed.length > 0) {
  console.log("\nAll failing pairs:");
  failed.forEach((f) =>
    console.log(
      `${f.domA} + ${f.domB} | shareA: ${f.shareA.toFixed(1)}% | ratioA: ${f.ratioA.toFixed(2)} ratioB: ${f.ratioB.toFixed(2)}`
    )
  );
}
