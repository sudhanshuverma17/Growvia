// Test how to balance 7 roadmaps across 4 questions (24 options)

function simulate(config, runs = 100000) {
  // config is array of 24 option weights maps: [ { [slug]: w }, ... ]
  const wins = new Array(7).fill(0);
  for (let r = 0; r < runs; r++) {
    const scores = new Array(7).fill(0);
    for (let q = 0; q < 4; q++) {
      const pick = q * 6 + Math.floor(Math.random() * 6);
      const opt = config[pick];
      for (const [s, w] of Object.entries(opt)) {
        scores[Number(s)] += w;
      }
    }
    let max = -1;
    let top = -1;
    let ties = [];
    for (let i = 0; i < 7; i++) {
      if (scores[i] > max) {
        max = scores[i];
        top = i;
        ties = [i];
      } else if (scores[i] === max && max > 0) {
        ties.push(i);
      }
    }
    const winner = ties[Math.floor(Math.random() * ties.length)];
    if (winner !== undefined) wins[winner]++;
  }
  const min = Math.min(...wins);
  const max = Math.max(...wins);
  const ratio = max / min;
  console.log(`Wins: ${wins.map(w => (w/runs*100).toFixed(2) + '%').join(', ')} | Ratio: ${ratio.toFixed(2)}x`);
  return ratio;
}

console.log("--- Baseline: 3 roadmaps get 4 opts (w=3), 4 roadmaps get 3 opts (w=3) ---");
const base = [];
// 4 questions x 6 options = 24 options
// Sequence: 0,1,2,3,4,5, 6,0,1,2,3,4, 5,6,0,1,2,3, 4,5,6,...
// 0, 1, 2 appear 4 times. 3, 4, 5, 6 appear 3 times.
let seq = [
  0, 1, 2, 3, 4, 5,
  6, 0, 1, 2, 3, 4,
  5, 6, 0, 1, 2, 3,
  4, 5, 6, 0, 1, 2
];
const cfgBase = seq.map(s => ({ [s]: 3 }));
simulate(cfgBase);

console.log("\n--- Idea 1: Give roadmaps 3,4,5,6 one secondary w=1 ---");
const cfg1 = seq.map(s => ({ [s]: 3 }));
// Add w=1 for 3,4,5,6 in options where they don't appear
cfg1[0][3] = 1;
cfg1[1][4] = 1;
cfg1[2][5] = 1;
cfg1[3][6] = 1;
simulate(cfg1);

console.log("\n--- Idea 2: Give roadmaps 3,4,5,6 one secondary w=2 ---");
const cfg2 = seq.map(s => ({ [s]: 3 }));
cfg2[0][3] = 2;
cfg2[1][4] = 2;
cfg2[2][5] = 2;
cfg2[3][6] = 2;
simulate(cfg2);

console.log("\n--- Idea 3: Give roadmaps 3,4,5,6 two secondaries of w=1 ---");
const cfg3 = seq.map(s => ({ [s]: 3 }));
cfg3[0][3] = 1; cfg3[6][3] = 1;
cfg3[1][4] = 1; cfg3[7][4] = 1;
cfg3[2][5] = 1; cfg3[8][5] = 1;
cfg3[3][6] = 1; cfg3[9][6] = 1;
simulate(cfg3);

console.log("\n--- Idea 4: What if 3 options in each question are SHARED between 2 roadmaps? ---");
// 7 roadmaps: 21 slots if 3 each!
// In 24 options: 21 options have 1 primary (3 for each of the 7 roadmaps).
// The remaining 3 options are outside options (from adjacent domains) or neutral!
// Then ALL 7 roadmaps have EXACTLY 3 appearances of w=3!
console.log("--- Idea 5: EXACTLY 3 primary options of w=3 for all 7 roadmaps, and 3 neutral/outside options! ---");
const cfg5 = [];
// 21 primary options (3 for each of 0..6)
const pool21 = [
  0, 1, 2, 3, 4, 5, 6,
  0, 1, 2, 3, 4, 5, 6,
  0, 1, 2, 3, 4, 5, 6
];
// Shuffle or distribute: Q1 gets 5, Q2 gets 5, Q3 gets 5, Q4 gets 6.
// Or each question gets 5 own options and 1 outside option, and Q4 gets 6 own options!
// Let's test with 21 options of w=3 and 3 options that give 0 to these 7:
const cfg5Opts = [
  {0:3}, {1:3}, {2:3}, {3:3}, {4:3}, {}, // Q1 (5 own, 1 outside)
  {5:3}, {6:3}, {0:3}, {1:3}, {2:3}, {}, // Q2 (5 own, 1 outside)
  {3:3}, {4:3}, {5:3}, {6:3}, {0:3}, {}, // Q3 (5 own, 1 outside)
  {1:3}, {2:3}, {3:3}, {4:3}, {5:3}, {6:3} // Q4 (6 own)
];
simulate(cfg5Opts);
