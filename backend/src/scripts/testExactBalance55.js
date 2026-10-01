// Test the exact mathematical scaling across all 55 pairs:
// 7-roadmap domain: 6 options per question distributed among 7 (0.857 opts/q)
// 5-roadmap domain: 5 options per question for 5 roadmaps (1.0 opts/q), 1 neutral opt
// 4-roadmap domain: 5 options per question for 4 roadmaps (1.25 opts/q), 1 neutral opt
// 3-roadmap domain: 4 options per question for 3 roadmaps (1.33 opts/q), 2 neutral opts
// 2-roadmap domain: 3 options per question for 2 roadmaps (1.5 opts/q), 3 neutral opts

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

    const getBankOpts = (n) => {
      const opts = [];
      for (let q = 0; q < 4; q++) {
        if (n === 7) {
          // 3 options for each of the 7 roadmaps = 21 options, plus 3 neutral (-1)
          // Q0: 0,1,2,3,4, -1
          // Q1: 5,6,0,1,2, -1
          // Q2: 3,4,5,6,0, -1
          // Q3: 1,2,3,4,5, 6
          const qOpts = [
            [0, 1, 2, 3, 4, -1],
            [5, 6, 0, 1, 2, -1],
            [3, 4, 5, 6, 0, -1],
            [1, 2, 3, 4, 5, 6],
          ];
          for (const opt of qOpts[q]) opts.push(opt);
        } else if (n === 5) {
          // 5 options for 5 roadmaps (0..4), 1 neutral (-1)
          opts.push(0, 1, 2, 3, 4, -1);
        } else if (n === 4) {
          // 5 options for 4 roadmaps: 4 roadmaps get 1, 1 gets 2, 1 neutral (-1)
          opts.push(0, 1, 2, 3, q % 4, -1);
        } else if (n === 3) {
          // 4 options for 3 roadmaps: 3 get 1, 1 gets 2, 2 neutral (-1, -1)
          opts.push(0, 1, 2, q % 3, -1, -1);
        } else if (n === 2) {
          // 3 options for 2 roadmaps: 0, 1, and alternating 0/1, plus 3 neutral (-1, -1, -1)
          opts.push(0, 1, q % 2, -1, -1, -1);
        }
      }
      return opts;
    };

    const optsA = getBankOpts(nA);
    const optsB = getBankOpts(nB);

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
    const shareA = totalWins > 0 ? (winsA / totalWins) * 100 : 50;
    const shareB = totalWins > 0 ? (winsB / totalWins) * 100 : 50;

    const minA = Math.min(...winsMapA);
    const maxA = Math.max(...winsMapA);
    const ratioA = minA > 0 ? maxA / minA : 999;

    const minB = Math.min(...winsMapB);
    const maxB = Math.max(...winsMapB);
    const ratioB = minB > 0 ? maxB / minB : 999;

    const passDomain = shareA >= 42.0 && shareA <= 58.0;
    const passRatio = ratioA <= 2.0 && ratioB <= 2.0;

    results.push({ domA, domB, shareA, shareB, ratioA, ratioB, passDomain, passRatio });
  }
}

const passingDomain = results.filter((r) => r.passDomain).length;
const passingRatio = results.filter((r) => r.passRatio).length;
const passingBoth = results.filter((r) => r.passDomain && r.passRatio).length;

console.log(`Passing Domain Balance (42-58%): ${passingDomain} / 55`);
console.log(`Passing Ratio (<= 2.0x within domain): ${passingRatio} / 55`);
console.log(`Passing Both: ${passingBoth} / 55`);

results.sort((a, b) => Math.abs(b.shareA - 50) - Math.abs(a.shareA - 50));
console.log("\nTop 10 Most Unequal Pairs:");
for (let i = 0; i < 10; i++) {
  const p = results[i];
  console.log(
    `${p.domA.padEnd(20)} + ${p.domB.padEnd(20)} | A: ${p.shareA.toFixed(1)}% B: ${p.shareB.toFixed(1)}% | Ratios: [A: ${p.ratioA.toFixed(2)}x, B: ${p.ratioB.toFixed(2)}x]`
  );
}
