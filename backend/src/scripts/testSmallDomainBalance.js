// Test own combined win rate in a 7-question bank with 2 own and 4 adjacent roadmaps

function testWinRate(ownOptsPerQ14, ownOptsPerQ57, runs = 50000) {
  // 7 questions, 6 options each
  // Q1..Q4: 2 own (each has ownOptsPerQ14), remaining are adjacent (each has 1 or 0)
  // Q5..Q7: 2 own (each has ownOptsPerQ57), remaining are adjacent
  let ownWins = 0;
  const adjWins = [0, 0, 0, 0];

  for (let r = 0; r < runs; r++) {
    const scores = { own0: 0, own1: 0, adj0: 0, adj1: 0, adj2: 0, adj3: 0 };
    
    // Q1..Q4
    for (let q = 0; q < 4; q++) {
      // 6 options
      const opts = [];
      for (let i = 0; i < ownOptsPerQ14; i++) opts.push("own0", "own1");
      const rem = 6 - opts.length;
      for (let i = 0; i < rem; i++) opts.push(`adj${(q * rem + i) % 4}`);
      
      const pick = opts[Math.floor(Math.random() * 6)];
      scores[pick] += 3;
    }

    // Q5..Q7
    for (let q = 4; q < 7; q++) {
      const opts = [];
      for (let i = 0; i < ownOptsPerQ57; i++) opts.push("own0", "own1");
      const rem = 6 - opts.length;
      for (let i = 0; i < rem; i++) opts.push(`adj${((q - 4) * rem + i) % 4}`);
      
      const pick = opts[Math.floor(Math.random() * 6)];
      scores[pick] += 3;
    }

    // Top slug
    let max = -1, top = null, ties = [];
    for (const [k, v] of Object.entries(scores)) {
      if (v > max) { max = v; top = k; ties = [k]; }
      else if (v === max && max > 0) ties.push(k);
    }
    const winner = ties[Math.floor(Math.random() * ties.length)];
    if (winner && winner.startsWith("own")) ownWins++;
    else if (winner && winner.startsWith("adj")) adjWins[Number(winner.slice(3))]++;
  }

  const ownPct = (ownWins / runs) * 100;
  console.log(`ownQ14=${ownOptsPerQ14}, ownQ57=${ownOptsPerQ57} => Own Combined: ${ownPct.toFixed(2)}% | Adjacent: ${(100 - ownPct).toFixed(2)}% (each ~${((100 - ownPct) / 4).toFixed(2)}%)`);
  return ownPct;
}

testWinRate(2, 1);
testWinRate(2, 2);
testWinRate(3, 1);
testWinRate(1, 1);
