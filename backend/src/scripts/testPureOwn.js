// Test: In Q1..Q4 (each with 6 options):
// 7-roadmap domains: 24 options divided among 7 (3 each + 3 roadmaps get a 4th)
// 5-roadmap domains: 24 options divided among 5 (4 each + 4 roadmaps get a 5th)
// 4-roadmap domains: 24 options divided among 4 (6 each)
// 3-roadmap domains: 24 options divided among 3 (8 each = 2 per question)
// 2-roadmap domains: 24 options divided among 2 (12 each = 3 per question, or 2 per question + 2 neutral options)

function simulate55(twoRoadmapOpts = 2) {
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

  const domList = Object.keys(domains);
  const results = [];

  for (let i = 0; i < domList.length; i++) {
    for (let j = i + 1; j < domList.length; j++) {
      const domA = domList[i];
      const domB = domList[j];
      const nA = domains[domA];
      const nB = domains[domB];

      // Assign options per question for each domain:
      // For Bank A: 4 questions, 6 options each (24 options)
      // For Bank B: 4 questions, 6 options each (24 options)
      const buildBankOpts = (n) => {
        const opts = [];
        if (n === 7) {
          for (let k = 0; k < 24; k++) opts.push(k % 7);
        } else if (n === 5) {
          for (let k = 0; k < 24; k++) opts.push(k % 5);
        } else if (n === 4) {
          for (let k = 0; k < 24; k++) opts.push(k % 4);
        } else if (n === 3) {
          for (let k = 0; k < 24; k++) opts.push(k % 3);
        } else if (n === 2) {
          // If twoRoadmapOpts = 2 per question: 4 Qs * 2 each = 8 options for 0, 8 for 1, and 8 neutral (-1)
          if (twoRoadmapOpts === 2) {
            for (let q = 0; q < 4; q++) {
              opts.push(0, 0, 1, 1, -1, -1);
            }
          } else {
            for (let k = 0; k < 24; k++) opts.push(k % 2);
          }
        }
        return opts;
      };

      const optsA = buildBankOpts(nA);
      const optsB = buildBankOpts(nB);

      let winsA = 0;
      let winsB = 0;
      const winsMapA = new Array(nA).fill(0);
      const winsMapB = new Array(nB).fill(0);

      const RUNS = 20000;
      for (let r = 0; r < RUNS; r++) {
        const scoresA = new Array(nA).fill(0);
        const scoresB = new Array(nB).fill(0);

        for (let q = 0; q < 4; q++) {
          const pickA = q * 6 + Math.floor(Math.random() * 6);
          const slugA = optsA[pickA];
          if (slugA !== -1) scoresA[slugA] += 3;

          const pickB = q * 6 + Math.floor(Math.random() * 6);
          const slugB = optsB[pickB];
          if (slugB !== -1) scoresB[slugB] += 3;
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

      const totalWins = winsA + winsB;
      const shareA = (winsA / totalWins) * 100;
      const shareB = (winsB / totalWins) * 100;

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

  const passing = results.filter((r) => r.passDomain).length;
  console.log(`With twoRoadmapOpts = ${twoRoadmapOpts}: Passing Domain Balance: ${passing} / 55`);
  results.sort((a, b) => Math.abs(b.shareA - 50) - Math.abs(a.shareA - 50));
  for (let i = 0; i < 5; i++) {
    const p = results[i];
    console.log(`  ${p.domA.padEnd(20)} + ${p.domB.padEnd(20)} | A: ${p.shareA.toFixed(1)}% B: ${p.shareB.toFixed(1)}%`);
  }
}

simulate55(2);
simulate55(3);
