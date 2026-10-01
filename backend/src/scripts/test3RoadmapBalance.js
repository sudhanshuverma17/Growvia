function test3Roadmaps(runs = 50000) {
  let ownWins = 0;
  const adjWins = [0, 0, 0];

  for (let r = 0; r < runs; r++) {
    const scores = { own0: 0, own1: 0, own2: 0, adj0: 0, adj1: 0, adj2: 0 };
    // 7 questions. In each question: 1 option for own0, own1, own2, adj0, adj1, adj2 (6 options total)
    for (let q = 0; q < 7; q++) {
      const opts = ["own0", "own1", "own2", "adj0", "adj1", "adj2"];
      const pick = opts[Math.floor(Math.random() * 6)];
      scores[pick] += 3;
    }
    let max = -1, ties = [];
    for (const [k, v] of Object.entries(scores)) {
      if (v > max) { max = v; ties = [k]; }
      else if (v === max && max > 0) ties.push(k);
    }
    const winner = ties[Math.floor(Math.random() * ties.length)];
    if (winner && winner.startsWith("own")) ownWins++;
    else if (winner && winner.startsWith("adj")) adjWins[Number(winner.slice(3))]++;
  }
  const ownPct = (ownWins / runs) * 100;
  console.log(`Equal 1-per-Q: Own Combined: ${ownPct.toFixed(2)}% | Adjacent: ${(100 - ownPct).toFixed(2)}%`);
}

test3Roadmaps();

function test3RoadmapsWeighted(runs = 50000) {
  // What if in Q1..Q4: 4 options are own (e.g. 1, 1, 2) and 2 are adjacent?
  // And in Q5..Q7: 3 own and 3 adjacent?
  let ownWins = 0;
  for (let r = 0; r < runs; r++) {
    const scores = { own0: 0, own1: 0, own2: 0, adj0: 0, adj1: 0, adj2: 0 };
    // Q1..Q4: 4 own, 2 adj
    for (let q = 0; q < 4; q++) {
      const opts = ["own0", "own1", "own2", `own${q % 3}`, `adj${q % 3}`, `adj${(q + 1) % 3}`];
      scores[opts[Math.floor(Math.random() * 6)]] += 3;
    }
    // Q5..Q7: 3 own, 3 adj
    for (let q = 0; q < 3; q++) {
      const opts = ["own0", "own1", "own2", "adj0", "adj1", "adj2"];
      scores[opts[Math.floor(Math.random() * 6)]] += 3;
    }
    let max = -1, ties = [];
    for (const [k, v] of Object.entries(scores)) {
      if (v > max) { max = v; ties = [k]; }
      else if (v === max && max > 0) ties.push(k);
    }
    const winner = ties[Math.floor(Math.random() * ties.length)];
    if (winner && winner.startsWith("own")) ownWins++;
  }
  const ownPct = (ownWins / runs) * 100;
  console.log(`4 own in Q1..Q4, 3 own in Q5..Q7: Own Combined: ${ownPct.toFixed(2)}% | Adjacent: ${(100 - ownPct).toFixed(2)}%`);
}

test3RoadmapsWeighted();
