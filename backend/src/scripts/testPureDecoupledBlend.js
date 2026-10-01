import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";

// Let's test pure decoupled blendCore:
// In Q1..Q4, each domain serves only its own roadmaps in its 4 questions.
// Domain A has 4 questions, 6 options each.
// Domain B has 4 questions, 6 options each.
// For any domain with n roadmaps:
// The 24 options across 4 questions are distributed among the n roadmaps.
// For n=7: 3 roadmaps have 4 options, 4 have 3 options (plus 1 w2)
// For n=5: 4 roadmaps have 5 options, 1 has 4 options
// For n=4: each has 6 options
// For n=3: each has 8 options
// For n=2: each has 12 options

const domainCounts = {
  tech: 7,
  healthcare: 7,
  business: 7,
  creative: 5,
  media: 5,
  finance: 4,
  engineering: 2,
  law_gov: 3,
  education_social: 3,
  aviation_hospitality: 3,
  science: 2,
};

const domList = Object.keys(domainCounts);
const results = [];

for (let i = 0; i < domList.length; i++) {
  for (let j = i + 1; j < domList.length; j++) {
    const domA = domList[i];
    const domB = domList[j];
    const nA = domainCounts[domA];
    const nB = domainCounts[domB];

    // Build 24 options for A and B
    const optsA = [];
    for (let k = 0; k < 24; k++) optsA.push(k % nA);
    const optsB = [];
    for (let k = 0; k < 24; k++) optsB.push(k % nB);

    let winsA = 0;
    let winsB = 0;
    const winsMapA = new Array(nA).fill(0);
    const winsMapB = new Array(nB).fill(0);

    const RUNS = 20000;
    for (let r = 0; r < RUNS; r++) {
      const scoresA = new Array(nA).fill(0);
      const scoresB = new Array(nB).fill(0);

      // 4 questions in A
      for (let q = 0; q < 4; q++) {
        const pick = q * 6 + Math.floor(Math.random() * 6);
        scoresA[optsA[pick]] += 3;
      }
      // 4 questions in B
      for (let q = 0; q < 4; q++) {
        const pick = q * 6 + Math.floor(Math.random() * 6);
        scoresB[optsB[pick]] += 3;
      }

      // Max score
      let maxA = -1;
      let topA = -1;
      for (let a = 0; a < nA; a++) {
        if (scoresA[a] > maxA) {
          maxA = scoresA[a];
          topA = a;
        }
      }

      let maxB = -1;
      let topB = -1;
      for (let b = 0; b < nB; b++) {
        if (scoresB[b] > maxB) {
          maxB = scoresB[b];
          topB = b;
        }
      }

      if (maxA > maxB) {
        winsA++;
        winsMapA[topA]++;
      } else if (maxB > maxA) {
        winsB++;
        winsMapB[topB]++;
      } else {
        if (Math.random() < 0.5) {
          winsA++;
          winsMapA[topA]++;
        } else {
          winsB++;
          winsMapB[topB]++;
        }
      }
    }

    const shareA = (winsA / RUNS) * 100;
    const shareB = (winsB / RUNS) * 100;

    const minA = Math.min(...winsMapA);
    const maxA = Math.max(...winsMapA);
    const ratioA = minA > 0 ? maxA / minA : 999;

    const minB = Math.min(...winsMapB);
    const maxB = Math.max(...winsMapB);
    const ratioB = minB > 0 ? maxB / minB : 999;

    const passDomain = shareA >= 42.0 && shareA <= 58.0;
    results.push({ domA, domB, shareA, shareB, ratioA, ratioB, passDomain });
  }
}

console.log(`Passing Domain Balance (42-58%): ${results.filter((r) => r.passDomain).length} / 55`);
results.sort((a, b) => Math.abs(b.shareA - 50) - Math.abs(a.shareA - 50));
console.log("\nTop 15 Most Unequal Pairs:");
for (let i = 0; i < 15; i++) {
  const p = results[i];
  console.log(`${p.domA.padEnd(20)} + ${p.domB.padEnd(20)} | A: ${p.shareA.toFixed(1)}% B: ${p.shareB.toFixed(1)}%`);
}
