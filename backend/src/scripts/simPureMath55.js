// Pure mathematical simulation of 55 pairs with 100% own options in Q1..Q4

const DOMAINS = {
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

const domList = Object.keys(DOMAINS);

// Build Q1..Q4 option model for each domain size
function getOpts(n) {
  const qOpts = [[], [], [], []];
  if (n === 2) {
    // 3 options each
    for (let q = 0; q < 4; q++) {
      qOpts[q] = [{0:3}, {0:3}, {0:3}, {1:3}, {1:3}, {1:3}];
    }
  } else if (n === 3) {
    // 2 options each
    for (let q = 0; q < 4; q++) {
      qOpts[q] = [{0:3}, {0:3}, {1:3}, {1:3}, {2:3}, {2:3}];
    }
  } else if (n === 4) {
    // 6 options each across 4 Qs (1.5 per Q)
    const extras = [[0, 1], [2, 3], [0, 2], [1, 3]];
    for (let q = 0; q < 4; q++) {
      qOpts[q] = [{0:3}, {1:3}, {2:3}, {3:3}, {[extras[q][0]]: 3}, {[extras[q][1]]: 3}];
    }
  } else if (n === 5) {
    // 5 roadmaps get 1 option per Q (20 opts). Extras: Q0: 0, Q1: 1, Q2: 2, Q3: 3.
    // Roadmap 4 gets secondaries in Q0..Q3!
    const extras = [0, 1, 2, 3];
    for (let q = 0; q < 4; q++) {
      qOpts[q] = [{0:3}, {1:3}, {2:3}, {3:3}, {4:3}, {[extras[q]]: 3, 4: 1}];
    }
  } else if (n === 7) {
    // 7 roadmaps:
    // 3 roadmaps get 4 opts, 4 roadmaps get 3 opts + two w=1 secondaries
    const seq = [
      [0, 1, 2, 3, 4, 5],
      [6, 0, 1, 2, 3, 4],
      [5, 6, 0, 1, 2, 3],
      [4, 5, 6, 0, 1, 2]
    ];
    for (let q = 0; q < 4; q++) {
      qOpts[q] = seq[q].map(s => ({ [s]: 3 }));
    }
    // Add secondaries for 3, 4, 5, 6 in questions where they don't appear
    qOpts[0][0][6] = 1; qOpts[0][1][6] = 1;
    qOpts[1][0][5] = 1; qOpts[1][1][5] = 1;
    qOpts[2][0][4] = 1; qOpts[2][1][4] = 1;
    qOpts[3][0][3] = 1; qOpts[3][1][3] = 1;
  }
  return qOpts;
}

const banks = {};
for (const [dom, n] of Object.entries(DOMAINS)) {
  banks[dom] = getOpts(n);
}

const RUNS = 20000;
const results = [];

for (let i = 0; i < domList.length; i++) {
  for (let j = i + 1; j < domList.length; j++) {
    const domA = domList[i];
    const domB = domList[j];
    const nA = DOMAINS[domA];
    const nB = DOMAINS[domB];
    const bA = banks[domA];
    const bB = banks[domB];

    let winsA = 0;
    let winsB = 0;
    const winsMapA = new Array(nA).fill(0);
    const winsMapB = new Array(nB).fill(0);

    for (let r = 0; r < RUNS; r++) {
      const scoresA = new Array(nA).fill(0);
      const scoresB = new Array(nB).fill(0);

      // Q from A
      for (let q = 0; q < 4; q++) {
        const opt = bA[q][Math.floor(Math.random() * 6)];
        for (const [s, w] of Object.entries(opt)) scoresA[Number(s)] += w;
      }
      // Q from B
      for (let q = 0; q < 4; q++) {
        const opt = bB[q][Math.floor(Math.random() * 6)];
        for (const [s, w] of Object.entries(opt)) scoresB[Number(s)] += w;
      }

      let maxA = -1, topA = -1;
      for (let a = 0; a < nA; a++) {
        if (scoresA[a] > maxA) { maxA = scoresA[a]; topA = a; }
      }
      let maxB = -1, topB = -1;
      for (let b = 0; b < nB; b++) {
        if (scoresB[b] > maxB) { maxB = scoresB[b]; topB = b; }
      }

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

    const shareA = (winsA / (winsA + winsB)) * 100;
    const shareB = (winsB / (winsA + winsB)) * 100;

    const minA = Math.min(...winsMapA);
    const maxA = Math.max(...winsMapA);
    const ratioA = minA > 0 ? maxA / minA : 999;

    const minB = Math.min(...winsMapB);
    const maxB = Math.max(...winsMapB);
    const ratioB = minB > 0 ? maxB / minB : 999;

    const pass = shareA >= 42.0 && shareA <= 58.0 && ratioA <= 2.0 && ratioB <= 2.0;
    results.push({ domA, domB, shareA, shareB, ratioA, ratioB, pass });
  }
}

const passing = results.filter(r => r.pass).length;
console.log(`Passing: ${passing} / 55`);
results.sort((a, b) => Math.abs(b.shareA - 50) - Math.abs(a.shareA - 50));
console.log("\nTop 15 Most Unequal Pairs:");
for (let i = 0; i < 15; i++) {
  const p = results[i];
  console.log(`  ${p.domA.padEnd(20)} + ${p.domB.padEnd(20)} | A: ${p.shareA.toFixed(1)}% B: ${p.shareB.toFixed(1)}% | Ratios: [A: ${p.ratioA.toFixed(2)}x, B: ${p.ratioB.toFixed(2)}x] | ${p.pass ? "✅ PASS" : "❌ FAIL"}`);
}
