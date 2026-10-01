// Simulation to find the exact number of options per roadmap for sizes 7, 5, 4, 3, 2
// so that all 55 pairs have domain share in 42-58% and ratio <= 2.0

function simulatePair(nA, optsPerQ_A, nB, optsPerQ_B, runs = 40000) {
  // optsPerQ is an array of length 4, each is an array of roadmap indices chosen in that question
  let winsA = 0;
  let winsB = 0;
  const winsMapA = new Array(nA).fill(0);
  const winsMapB = new Array(nB).fill(0);

  for (let r = 0; r < runs; r++) {
    const scoresA = new Array(nA).fill(0);
    const scoresB = new Array(nB).fill(0);

    for (let q = 0; q < 4; q++) {
      // User picks 1 option out of 6 in question q of Bank A
      const rollA = Math.floor(Math.random() * 6);
      const listA = optsPerQ_A[q];
      if (rollA < listA.length) {
        scoresA[listA[rollA]] += 3;
      }

      // User picks 1 option out of 6 in question q of Bank B
      const rollB = Math.floor(Math.random() * 6);
      const listB = optsPerQ_B[q];
      if (rollB < listB.length) {
        scoresB[listB[rollB]] += 3;
      }
    }

    let maxA = -1;
    let topCandidatesA = [];
    for (let a = 0; a < nA; a++) {
      if (scoresA[a] > maxA) {
        maxA = scoresA[a];
        topCandidatesA = [a];
      } else if (scoresA[a] === maxA && maxA > 0) {
        topCandidatesA.push(a);
      }
    }

    let maxB = -1;
    let topCandidatesB = [];
    for (let b = 0; b < nB; b++) {
      if (scoresB[b] > maxB) {
        maxB = scoresB[b];
        topCandidatesB = [b];
      } else if (scoresB[b] === maxB && maxB > 0) {
        topCandidatesB.push(b);
      }
    }

    const topA = topCandidatesA.length > 0 ? topCandidatesA[Math.floor(Math.random() * topCandidatesA.length)] : -1;
    const topB = topCandidatesB.length > 0 ? topCandidatesB[Math.floor(Math.random() * topCandidatesB.length)] : -1;

    if (maxA > maxB) {
      winsA++;
      if (topA !== -1) winsMapA[topA]++;
    } else if (maxB > maxA) {
      winsB++;
      if (topB !== -1) winsMapB[topB]++;
    } else if (maxA === maxB && maxA > 0) {
      if (Math.random() < 0.5) {
        winsA++;
        if (topA !== -1) winsMapA[topA]++;
      } else {
        winsB++;
        if (topB !== -1) winsMapB[topB]++;
      }
    }
  }

  const shareA = (winsA / (winsA + winsB)) * 100;
  const shareB = (winsB / (winsA + winsB)) * 100;

  const maxWinA = Math.max(...winsMapA);
  const minWinA = Math.min(...winsMapA);
  const ratioA = minWinA > 0 ? maxWinA / minWinA : 999;

  const maxWinB = Math.max(...winsMapB);
  const minWinB = Math.min(...winsMapB);
  const ratioB = minWinB > 0 ? maxWinB / minWinB : 999;

  return { shareA, shareB, ratioA, ratioB };
}

// Grid search for optimal configurations:
// We want:
// 1. Every roadmap within a domain has the same (or within 1) number of options across the 4 questions.
// 2. The win rate between any pair of sizes is in [42%, 58%].
// 3. Within-domain ratios are <= 2.0.

// Candidate designs:
// For 7: 6 options per Q -> [ [0,1,2,3,4,5], [6,0,1,2,3,4], [5,6,0,1,2,3], [4,5,6,0,1,2] ]
// Size 7 with 22 options (6, 5, 5, 6)
const c7_22 = [
  [1, 2, 3, 4, 5, 6],
  [0, 3, 4, 5, 6],
  [0, 1, 2, 5, 6],
  [0, 1, 2, 3, 4, 0],
];

// Size 4 with 18 options (4, 4, 5, 5)
const c4_18 = [
  [0, 1, 2, 3],
  [0, 1, 2, 3],
  [0, 1, 2, 3, 2],
  [0, 1, 2, 3, 0],
];

const c5 = [
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4],
];

const c3_5 = [
  [0, 0, 1, 2],
  [0, 1, 1, 2],
  [0, 1, 2, 2],
  [0, 1, 2],
];

const c2_7 = [
  [0, 0, 1, 1],
  [0, 0, 1, 1],
  [0, 0, 1, 1],
  [0, 1],
];

const testConfigs = [
  { name: "7 with 22, 4 with 18, 3 with 15, 2 with 14", c7: c7_22, c5, c4: c4_18, c3: c3_5, c2: c2_7 },
];

for (const tc of testConfigs) {
  console.log(`\n=== Testing: ${tc.name} ===`);
  const cfgs = { 7: tc.c7, 5: tc.c5, 4: tc.c4, 3: tc.c3, 2: tc.c2 };
  const sizes = [7, 5, 4, 3, 2];
  let passCount = 0;

  for (let i = 0; i < sizes.length; i++) {
    for (let j = i; j < sizes.length; j++) {
      const sA = sizes[i];
      const sB = sizes[j];
      const res = simulatePair(sA, cfgs[sA], sB, cfgs[sB]);
      const pass = res.shareA >= 42 && res.shareA <= 58 && res.ratioA <= 2.0 && res.ratioB <= 2.0;
      if (pass) passCount++;
      console.log(
        `  Size ${sA} vs ${sB}: ${res.shareA.toFixed(1)}% / ${res.shareB.toFixed(1)}% | Ratios: [${res.ratioA.toFixed(2)}x, ${res.ratioB.toFixed(2)}x] | Pass: ${pass}`
      );
    }
  }
  console.log(`Total Passing: ${passCount} / 15`);
}
