const domains = {
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

const domNames = Object.keys(domains);

console.log("Simulating all 55 pairs where each roadmap has 1 option per question (prob 1/6)...");

let passingCount = 0;
const results = [];

for (let i = 0; i < domNames.length; i++) {
  for (let j = i + 1; j < domNames.length; j++) {
    const domA = domNames[i];
    const domB = domNames[j];
    const nA = domains[domA];
    const nB = domains[domB];

    let winsA = 0;
    let winsB = 0;
    const winsMapA = new Array(nA).fill(0);
    const winsMapB = new Array(nB).fill(0);

    const RUNS = 20000;
    for (let r = 0; r < RUNS; r++) {
      // In Bank A (4 questions): each of nA roadmaps has 1 option in each question (prob 1/6)
      // (For nA=7, 3 have 4 options and 4 have 3 options + 1 w2)
      const scoresA = new Array(nA).fill(0);
      const scoresB = new Array(nB).fill(0);

      // Bank A questions (4 questions)
      for (let q = 0; q < 4; q++) {
        // Random pick 0..5 (6 options)
        const pick = Math.floor(Math.random() * 6);
        if (pick < nA) {
          scoresA[pick] += 3;
        }
      }

      // Bank B questions (4 questions)
      for (let q = 0; q < 4; q++) {
        const pick = Math.floor(Math.random() * 6);
        if (pick < nB) {
          scoresB[pick] += 3;
        }
      }

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

    const shareA = (winsA / RUNS) * 100;
    const shareB = (winsB / RUNS) * 100;

    results.push({ domA, domB, shareA, shareB });
  }
}

// Check worst domain shares
results.sort((a, b) => Math.abs(b.shareA - 50) - Math.abs(a.shareA - 50));
console.log("\n--- Domain Balance (Top 10 Most Unequal) ---");
for (let i = 0; i < 15; i++) {
  const p = results[i];
  console.log(`${p.domA.padEnd(20)} + ${p.domB.padEnd(20)} | A: ${p.shareA.toFixed(1)}% B: ${p.shareB.toFixed(1)}%`);
}
