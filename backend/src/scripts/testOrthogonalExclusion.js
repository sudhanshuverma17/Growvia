import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { STAGE2_BANKS, scoreStage2 } from "../services/stage2Selector.js";

// Same successful BANK_CONFIGS as Task 1717:
const BANK_CONFIGS = {
  7: [
    [1, 2, 3, 4, 5, 6],
    [0, 3, 4, 5, 6],
    [0, 1, 2, 5, 6],
    [0, 1, 2, 3, 4, 0],
  ],
  5: [
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
  ],
  4: [
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 1, 2, 3, 2],
    [0, 1, 2, 3, 0],
  ],
  3: [
    [0, 0, 1, 2],
    [0, 1, 1, 2],
    [0, 1, 2, 2],
    [0, 1, 2],
  ],
  2: [
    [0, 0, 1, 1],
    [0, 0, 1, 1],
    [0, 1],
    [0, 1],
  ],
};

// Target total options per question (matching Task 1717):
// 7: 6, 5, 5, 6 (0 outside)
// 5: 5, 5, 5, 5 (0 outside in core)
// 4: 4, 4, 5, 5 (6 outside to reach 6, 5, 5, 6)
// 3: 4, 4, 4, 3 (9 outside to reach 6, 6, 6, 6)
// 2: 4, 4, 4, 2 (10 outside to reach 6, 6, 6, 6)

// Pool of safe outside slugs from domains that have high base counts (science, engineering, education_social, aviation_hospitality, law_gov):
const safeOutsidePool = [
  "civil-engineer",
  "mechanical-engineer",
  "physicist",
  "biotechnologist",
  "teacher",
  "professor",
  "social-worker",
  "pilot",
  "cabin-crew",
  "hotel-management",
  "lawyer",
  "civil-services",
  "army-officer",
];

const customBanks = {};
for (const dom of DOMAINS) {
  const bank = STAGE2_BANKS[dom];
  const roadmaps = getRoadmapsByDomain(dom);
  const n = roadmaps.length;
  const plan = BANK_CONFIGS[n];

  // Outside slugs must NOT include:
  // 1. Any slug from this domain
  // 2. Any slug from tech, healthcare, business, or finance (to keep their ratios strictly balanced <= 1.7x)
  const availableOutside = safeOutsidePool.filter((s) => !roadmaps.includes(s));
  let outIdx = 0;

  const newQs = bank.questions.slice(0, 4).map((q, qIdx) => {
    const ownIdxs = plan[qIdx];
    const opts = [];
    const maxLen = Math.max(q.options.length, 5);
    for (let oIdx = 0; oIdx < maxLen; oIdx++) {
      if (oIdx < ownIdxs.length) {
        const s = roadmaps[ownIdxs[oIdx]];
        opts.push({ id: `${q.id}_opt${oIdx + 1}`, weights: { [s]: 3 }, text: "Option text" });
      } else {
        const s = availableOutside[outIdx % availableOutside.length];
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
