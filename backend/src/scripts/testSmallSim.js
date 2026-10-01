import { STAGE2_BANKS } from "../services/stage2Selector.js";
import { getRoadmapsByDomain } from "../config/quizDomains.js";
import { scoreStage2 } from "../services/stage2Selector.js";

// Let's test a sample bank configuration for engineering
function simulate(bank, ownRoadmaps, adjacentRoadmaps) {
  const dummyStage1 = {
    topDomains: ["engineering", "other"],
    domainScores: { engineering: 1.0, other: 0.5 },
    isBlended: false,
  };

  const RUNS = 100000;
  const winCounts = {};
  const top5Counts = {};
  let runsWith2PlusNonOwn = 0;

  for (const s of [...ownRoadmaps, ...adjacentRoadmaps]) {
    winCounts[s] = 0;
    top5Counts[s] = 0;
  }

  for (let r = 0; r < RUNS; r++) {
    const answers = {};
    for (const q of bank.questions) {
      const idx = Math.floor(Math.random() * q.options.length);
      answers[q.id] = q.options[idx].id;
    }
    const res = scoreStage2(answers, bank.questions, { stage1Result: dummyStage1, seed: r });
    winCounts[res.topSlug]++;

    let nonOwnInTop5 = 0;
    for (let i = 0; i < Math.min(5, res.rankedSlugs.length); i++) {
      const s = res.rankedSlugs[i];
      top5Counts[s]++;
      if (!ownRoadmaps.includes(s)) nonOwnInTop5++;
    }
    if (nonOwnInTop5 >= 2) runsWith2PlusNonOwn++;
  }

  let ownWins = 0;
  for (const s of ownRoadmaps) ownWins += winCounts[s];
  const ownPct = (ownWins / RUNS) * 100;
  const adjPct = 100 - ownPct;

  console.log(`Own Combined: ${ownPct.toFixed(2)}% (Target: 60-85%)`);
  for (const s of ownRoadmaps) {
    console.log(`  Own ${s}: ${(winCounts[s]/RUNS*100).toFixed(2)}%`);
  }
  console.log(`Adjacent Combined: ${adjPct.toFixed(2)}% (Target: 15-40%)`);
  for (const s of adjacentRoadmaps) {
    console.log(`  Adj ${s}: ${(winCounts[s]/RUNS*100).toFixed(2)}% (Target: >=1.5%)`);
  }
  console.log(`Runs with >=2 non-own in top 5: ${(runsWith2PlusNonOwn/RUNS*100).toFixed(2)}% (Target: >=40%)`);
}

// Let's create an engineered bank with:
// mechanical-engineer: 14 w3
// civil-engineer: 14 w3
// 6 adjacent: 2 w3 each (total 12 w3)
// 2 options in Q7 have say 1 for an adjacent roadmap
const engBank = JSON.parse(JSON.stringify(STAGE2_BANKS.engineering));
const own = ["mechanical-engineer", "civil-engineer"];
const adj = ["architect", "pilot", "supply-chain", "environmental-scientist", "engineer", "army-officer"];

// Re-assign w3:
// Q1-Q6:
// opt 1: mechanical-engineer (3)
// opt 2: mechanical-engineer (3)
// opt 3: civil-engineer (3)
// opt 4: civil-engineer (3)
// opt 5: adj[i*2 % 6] (3)
// opt 6: adj[(i*2 + 1) % 6] (3)
// Q7:
// opt 1: mechanical-engineer (3)
// opt 2: mechanical-engineer (3)
// opt 3: civil-engineer (3)
// opt 4: civil-engineer (3)
// opt 5: mechanical-engineer (3)
// opt 6: civil-engineer (3)

for (let ownPerSlug = 8; ownPerSlug <= 12; ownPerSlug++) {
  const totalOwnW3 = ownPerSlug * 2;
  const totalAdjW3 = 42 - totalOwnW3;
  const adjPerSlug = totalAdjW3 / 6;

  console.log(`\nTesting ownPerSlug=${ownPerSlug} (Total Own W3=${totalOwnW3}, Adj W3=${totalAdjW3}, AdjPerSlug=${adjPerSlug.toFixed(2)})`);

  // Build a test bank
  const testBank = JSON.parse(JSON.stringify(STAGE2_BANKS.engineering));

  // Distribute W3:
  const w3List = [];
  for (let k = 0; k < ownPerSlug; k++) w3List.push("mechanical-engineer");
  for (let k = 0; k < ownPerSlug; k++) w3List.push("civil-engineer");
  let adjK = 0;
  while (w3List.length < 42) {
    w3List.push(adj[adjK % 6]);
    adjK++;
  }

  // Shuffle or place evenly into 7 questions x 6 options
  let optIndex = 0;
  for (let qi = 0; qi < 7; qi++) {
    for (let oi = 0; oi < 6; oi++) {
      const primarySlug = w3List[optIndex++];
      // Pick a secondary
      const isOwn = own.includes(primarySlug);
      const secCandidate = isOwn ? adj[(qi + oi) % 6] : own[(qi + oi) % 2];
      testBank.questions[qi].options[oi].weights = {
        [primarySlug]: 3,
        [secCandidate]: 1,
      };
    }
  }

  simulate(testBank, own, adj);
}
