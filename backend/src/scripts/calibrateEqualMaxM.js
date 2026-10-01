function getDistribution(name, genOpts, runs = 100000) {
  const maxScores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let r = 0; r < runs; r++) {
    const qOpts = genOpts();
    const slugScores = {};
    for (let q = 0; q < 4; q++) {
      const pick = qOpts[q][Math.floor(Math.random() * 6)];
      for (const [s, w] of Object.entries(pick)) {
        slugScores[s] = (slugScores[s] || 0) + w;
      }
    }
    const max = Math.max(0, ...Object.values(slugScores));
    maxScores[max]++;
  }
  const mean = maxScores.reduce((acc, count, val) => acc + count * val, 0) / runs;
  console.log(`${name.padEnd(35)} | Mean: ${mean.toFixed(3)}`);
  return mean;
}

// Target: Mean ~ 5.43

// What if for n=2: 2 options w=3 for 0, 2 options w=3 for 1, and 2 options w=1?
getDistribution("n=2 (4 opts w=3, 2 opts w=1)", () => [
  [{0:3}, {0:3}, {1:3}, {1:3}, {0:1}, {1:1}],
  [{0:3}, {0:3}, {1:3}, {1:3}, {0:1}, {1:1}],
  [{0:3}, {0:3}, {1:3}, {1:3}, {0:1}, {1:1}],
  [{0:3}, {0:3}, {1:3}, {1:3}, {0:1}, {1:1}],
]);

// What if for n=2: 1 opt w=3 for 0, 1 opt w=3 for 1, 2 opts w=2, 2 opts w=1?
getDistribution("n=2 (2 opts w=3, 2 opts w=2, 2 w=1)", () => [
  [{0:3}, {1:3}, {0:2}, {1:2}, {0:1}, {1:1}],
  [{0:3}, {1:3}, {0:2}, {1:2}, {0:1}, {1:1}],
  [{0:3}, {1:3}, {0:2}, {1:2}, {0:1}, {1:1}],
  [{0:3}, {1:3}, {0:2}, {1:2}, {0:1}, {1:1}],
]);

// What if for n=3: 1 opt w=3 for each of 0,1,2, and 3 opts w=1?
getDistribution("n=3 (3 opts w=3, 3 opts w=1)", () => [
  [{0:3}, {1:3}, {2:3}, {0:1}, {1:1}, {2:1}],
  [{0:3}, {1:3}, {2:3}, {0:1}, {1:1}, {2:1}],
  [{0:3}, {1:3}, {2:3}, {0:1}, {1:1}, {2:1}],
  [{0:3}, {1:3}, {2:3}, {0:1}, {1:1}, {2:1}],
]);

// What if for n=3: 1 opt w=3 for 0,1,2, 1 opt w=2, 2 opts w=1?
getDistribution("n=3 (3 w=3, 1 w=2, 2 w=1)", () => [
  [{0:3}, {1:3}, {2:3}, {0:2}, {1:1}, {2:1}],
  [{0:3}, {1:3}, {2:3}, {1:2}, {2:1}, {0:1}],
  [{0:3}, {1:3}, {2:3}, {2:2}, {0:1}, {1:1}],
  [{0:3}, {1:3}, {2:3}, {0:2}, {1:1}, {2:1}],
]);
