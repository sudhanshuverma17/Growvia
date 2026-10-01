import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { STAGE2_BANKS, scoreStage2 } from "../services/stage2Selector.js";

// Let's test the safe outside pool configuration across all 55 pairs
const config7 = [
  [1, 2, 3, 4, 5, 6], // 6 options
  [0, 2, 3, 4, 5],    // 5 options
  [0, 1, 3, 5, 6],    // 5 options
  [0, 1, 2, 4, 6],    // 5 options
];
const config5 = [
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4],
];
const config4 = [
  [0, 1, 2, 3],
  [0, 1, 2, 3],
  [0, 1, 2, 3],
  [0, 1, 2, 3],
];
const config3 = [
  [0, 1, 2, 0],
  [0, 1, 2, 1],
  [0, 1, 2, 2],
  [0, 1, 2],
];
const config2 = [
  [0, 0, 1, 1],
  [0, 0, 1, 1],
  [0, 0, 1, 1],
  [0, 1],
];

// Slugs exclusively from domains with high option counts (size 2 & 3)
const safeOutsidePool = [
  "mechanical-engineer",
  "biotechnologist",
  "pilot",
  "teacher",
  "civil-services",
  "civil-engineer",
  "physicist",
  "hotel-management",
  "social-worker",
  "lawyer",
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
    const ownIdxs = plan[qIdx];
    const opts = [];
    const totalCount = 5 + (n === 7 && qIdx === 0 ? 1 : 0);
    for (let oIdx = 0; oIdx < totalCount; oIdx++) {
      if (oIdx < ownIdxs.length) {
        const s = roadmaps[ownIdxs[oIdx]];
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

    const runs = 10000;
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

console.log(`Domain Pass (42-58%): ${passDomain} / 55`);
console.log(`Ratio Pass (<= 2.0x): ${passRatio} / 55`);
console.log(`Both Pass: ${passBoth} / 55`);
const failed = pairResults.filter((p) => !p.dPass || !p.rPass);
console.log("Failed pairs count:", failed.length);
failed.forEach((f) =>
  console.log(
    `${f.domA} + ${f.domB} | shareA: ${f.shareA.toFixed(1)}% | ratioA: ${f.ratioA.toFixed(2)} ratioB: ${f.ratioB.toFixed(2)}`
  )
);
