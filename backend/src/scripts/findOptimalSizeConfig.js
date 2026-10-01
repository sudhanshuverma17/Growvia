// Find the exact appearance counts for sizes 7, 5, 4, 3, 2 so that all 15 size pairs have win rates in 42-58%
function simulatePair(nA, bankConfigA, nB, bankConfigB, runs = 40000) {
  // bankConfig is an array of 24 options across 4 questions (6 per question)
  // Each option has weights for own roadmaps (indices 0..n-1) or neutral (-1)
  let winsA = 0;
  let winsB = 0;
  const winsMapA = new Array(nA).fill(0);
  const winsMapB = new Array(nB).fill(0);

  for (let r = 0; r < runs; r++) {
    const scoresA = new Array(nA).fill(0);
    const scoresB = new Array(nB).fill(0);

    for (let q = 0; q < 4; q++) {
      const optA = bankConfigA[q * 6 + Math.floor(Math.random() * 6)];
      for (const [slug, w] of Object.entries(optA)) {
        scoresA[slug] += w;
      }

      const optB = bankConfigB[q * 6 + Math.floor(Math.random() * 6)];
      for (const [slug, w] of Object.entries(optB)) {
        scoresB[slug] += w;
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
    const topA = topCandidatesA[Math.floor(Math.random() * topCandidatesA.length)];

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
    const topB = topCandidatesB[Math.floor(Math.random() * topCandidatesB.length)];

    if (maxA > maxB) {
      winsA++;
      winsMapA[topA]++;
    } else if (maxB > maxA) {
      winsB++;
      winsMapB[topB]++;
    } else if (maxA === maxB && maxA > 0) {
      if (Math.random() < 0.5) {
        winsA++;
        winsMapA[topA]++;
      } else {
        winsB++;
        winsMapB[topB]++;
      }
    }
  }

  if (nA === 7 && nB === 7) {
    console.log("Size 7 winsMap:", winsMapA);
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

// Let's test a design:
// 4 questions x 6 options = 24 options.
// For n = 7:
// Each question has 6 options. 24 options total.
// 21 options have a w3 for one of the 7 roadmaps (each roadmap gets 3 options with w3).
// The remaining 3 options (e.g. in Q1, Q2, Q3) have w3 for 3 roadmaps (so 3 roadmaps have 4 w3s, 4 have 3 w3s).
// PLUS each roadmap gets some w1 secondaries so that total expected points per roadmap are completely equalized!

// Let's create builders for size configs:
function makeConfig(n, w3PerQ, w1PerQ) {
  // w3PerQ: array of length 4, each is an array of roadmaps getting w3 in that question
  // w1PerQ: array of length 4, each is an array of roadmaps getting w1 in that question
  const config = [];
  for (let q = 0; q < 4; q++) {
    for (let o = 0; o < 6; o++) {
      config.push({});
    }
    // Place w3 roadmaps for this question
    const w3s = w3PerQ[q] || [];
    for (let i = 0; i < w3s.length; i++) {
      config[q * 6 + i][w3s[i]] = 3;
    }
    // Place w1 roadmaps on remaining options
    const w1s = w1PerQ[q] || [];
    for (let i = 0; i < w1s.length; i++) {
      const optIdx = q * 6 + ((w3s.length + i) % 6);
      config[optIdx][w1s[i]] = 1;
    }
  }
  return config;
}

// For n = 7:
// 4 questions x 6 options = 24 options.
// Q0: w3 for [0, 1, 2, 3, 4, 5], w1 for [6]
// Q1: w3 for [6, 0, 1, 2, 3, 4], w1 for [5]

// Pure own roadmaps for all 24 options (6 options per Q)
// For n = 7:
// Q0: [0, 1, 2, 3, 4, 5]
// Q1: [6, 0, 1, 2, 3, 4]
// Q2: [5, 6, 0, 1, 2, 3]
// Q3: [4, 5, 6, 0, 1, 2]
const c7_w3 = [
  [0, 1, 2, 3, 4, 5],
  [6, 0, 1, 2, 3, 4],
  [5, 6, 0, 1, 2, 3],
  [4, 5, 6, 0, 1, 2],
];
const c7_w1 = [[], [], [], []];

// For n = 5:
// 4 roadmaps get 5, 1 gets 4
// Q0: [0, 1, 2, 3, 4, 0]
// Q1: [0, 1, 2, 3, 4, 1]
// Q2: [0, 1, 2, 3, 4, 2]
// Q3: [0, 1, 2, 3, 4, 3]
const c5_w3 = [
  [0, 1, 2, 3, 4, 0],
  [0, 1, 2, 3, 4, 1],
  [0, 1, 2, 3, 4, 2],
  [0, 1, 2, 3, 4, 3],
];
const c5_w1 = [[], [], [], []];

// For n = 4: each gets 6 options
// In each Q: [0, 1, 2, 3, 0, 1], [0, 1, 2, 3, 2, 3], [0, 1, 2, 3, 0, 1], [0, 1, 2, 3, 2, 3]
const c4_w3 = [
  [0, 1, 2, 3, 0, 1],
  [0, 1, 2, 3, 2, 3],
  [0, 1, 2, 3, 0, 1],
  [0, 1, 2, 3, 2, 3],
];
const c4_w1 = [[], [], [], []];

// For n = 3: each gets 8 options (2 in each Q)
const c3_w3 = [
  [0, 0, 1, 1, 2, 2],
  [0, 0, 1, 1, 2, 2],
  [0, 0, 1, 1, 2, 2],
  [0, 0, 1, 1, 2, 2],
];
const c3_w1 = [[], [], [], []];

// For n = 2: each gets 12 options (3 in each Q)
const c2_w3 = [
  [0, 0, 0, 1, 1, 1],
  [0, 0, 0, 1, 1, 1],
  [0, 0, 0, 1, 1, 1],
  [0, 0, 0, 1, 1, 1],
];
const c2_w1 = [[], [], [], []];

const configs = {
  7: makeConfig(7, c7_w3, c7_w1),
  5: makeConfig(5, c5_w3, c5_w1),
  4: makeConfig(4, c4_w3, c4_w1),
  3: makeConfig(3, c3_w3, c3_w1),
  2: makeConfig(2, c2_w3, c2_w1),
};

const sizes = [7, 5, 4, 3, 2];
console.log("Testing all 15 size combinations:");
let allPass = true;
for (let i = 0; i < sizes.length; i++) {
  for (let j = i; j < sizes.length; j++) {
    const sA = sizes[i];
    const sB = sizes[j];
    const res = simulatePair(sA, configs[sA], sB, configs[sB]);
    const pass = res.shareA >= 42 && res.shareA <= 58 && res.ratioA <= 2.0 && res.ratioB <= 2.0;
    if (!pass) allPass = false;
    console.log(
      `Size ${sA} vs ${sB}: Share A: ${res.shareA.toFixed(1)}% | Ratios: [${res.ratioA.toFixed(2)}x, ${res.ratioB.toFixed(2)}x] | Pass: ${pass}`
    );
  }
}
console.log("All 15 size pairs pass?", allPass);
