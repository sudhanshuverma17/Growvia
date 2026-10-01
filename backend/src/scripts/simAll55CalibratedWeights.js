// Simulate all 55 pairs using 100% own options with calibrated weights!

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

function getBank(n) {
  const qOpts = [[], [], [], []];
  if (n === 7) {
    const seq = [
      [0, 1, 2, 3, 4, 5],
      [6, 0, 1, 2, 3, 4],
      [5, 6, 0, 1, 2, 3],
      [4, 5, 6, 0, 1, 2]
    ];
    for (let q = 0; q < 4; q++) {
      qOpts[q] = seq[q].map(s => ({ [s]: 3 }));
    }
    qOpts[0][0][6] = 1; qOpts[0][1][6] = 1;
    qOpts[1][0][5] = 1; qOpts[1][1][5] = 1;
    qOpts[2][0][4] = 1; qOpts[2][1][4] = 1;
    qOpts[3][0][3] = 1; qOpts[3][1][3] = 1;
  } else if (n === 5) {
    // 5 own roadmaps. Each of 5 gets 1 option of w=3 in every Q (20 opts).
    // Option 6 gives w=1 to two roadmaps.
    for (let q = 0; q < 4; q++) {
      qOpts[q] = [{0:3}, {1:3}, {2:3}, {3:3}, {4:3}];
      const s1 = q % 5;
      const s2 = (q + 1) % 5;
      qOpts[q].push({ [s1]: 1, [s2]: 1 });
    }
  } else if (n === 4) {
    // 4 own roadmaps.
    for (let q = 0; q < 4; q++) {
      qOpts[q] = [{0:3}, {1:3}, {2:3}, {3:3}];
      // Add 2 options of w=2
      qOpts[q].push({ [q % 4]: 2 });
      qOpts[q].push({ [(q + 1) % 4]: 2 });
    }
  } else if (n === 3) {
    // 3 own roadmaps.
    for (let q = 0; q < 4; q++) {
      qOpts[q] = [{0:3}, {1:3}, {2:3}];
      // 1 option of w=2, 2 options of w=1
      qOpts[q].push({ [q % 3]: 2 });
      qOpts[q].push({ [(q + 1) % 3]: 1 });
      qOpts[q].push({ [(q + 2) % 3]: 1 });
    }
  } else if (n === 2) {
    // 2 own roadmaps.
    for (let q = 0; q < 4; q++) {
      qOpts[q] = [
        {0:3},
        {1:3},
        {[q % 2]: 2},
        {0:1},
        {1:1},
        {[(q + 1) % 2]: 1}
      ];
    }
  }
  return qOpts;
}

const banks = {};
for (const [dom, n] of Object.entries(DOMAINS)) {
  banks[dom] = getBank(n);
}

const RUNS = 20000;
let passedPairs = 0;
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

      for (let q = 0; q < 4; q++) {
        const optA = bA[q][Math.floor(Math.random() * 6)];
        for (const [s, w] of Object.entries(optA)) scoresA[Number(s)] += w;

        const optB = bB[q][Math.floor(Math.random() * 6)];
        for (const [s, w] of Object.entries(optB)) scoresB[Number(s)] += w;
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
    if (pass) passedPairs++;
    results.push({ domA, domB, shareA, shareB, ratioA, ratioB, pass });
  }
}

console.log(`Passed Pairs: ${passedPairs} / 55`);
results.sort((a, b) => Math.abs(b.shareA - 50) - Math.abs(a.shareA - 50));
console.log("\nTop 15 Most Unequal Pairs:");
for (let i = 0; i < 15; i++) {
  const p = results[i];
  console.log(`  ${p.domA.padEnd(20)} + ${p.domB.padEnd(20)} | A: ${p.shareA.toFixed(1)}% B: ${p.shareB.toFixed(1)}% | Ratios: [A: ${p.ratioA.toFixed(2)}x, B: ${p.ratioB.toFixed(2)}x] | ${p.pass ? "✅ PASS" : "❌ FAIL"}`);
}
