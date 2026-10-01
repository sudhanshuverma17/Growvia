import { STAGE2_BANKS, getStage2Set, scoreStage2 } from "../services/stage2Selector.js";
import { getRoadmapsByDomain } from "../config/quizDomains.js";

// Test tuning engineering blendCore questions
const engBank = JSON.parse(JSON.stringify(STAGE2_BANKS.engineering));

// In Q1-Q4, let's configure primaries:
// We want mechanical-engineer to have 2 w3 options (Q1, Q3)
// civil-engineer to have 2 w3 options (Q2, Q4)
// And adjacent roadmaps to have the remaining w3 options
const adj = ["architect", "pilot", "supply-chain", "environmental-scientist", "engineer", "army-officer"];

// Q1 (blendCore): mechanical-engineer (opt0), architect (opt1), pilot (opt2), supply-chain (opt3), environmental-scientist (opt4), engineer (opt5)
engBank.questions[0].options[0].weights = { "mechanical-engineer": 3, architect: 2 };
engBank.questions[0].options[1].weights = { architect: 3, "mechanical-engineer": 1 };
engBank.questions[0].options[2].weights = { pilot: 3, "civil-engineer": 1 };
engBank.questions[0].options[3].weights = { "supply-chain": 3, "mechanical-engineer": 1 };
engBank.questions[0].options[4].weights = { "environmental-scientist": 3, "civil-engineer": 1 };
engBank.questions[0].options[5].weights = { engineer: 3, "army-officer": 2 };

// Q2 (blendCore): civil-engineer (opt0), army-officer (opt1), pilot (opt2), supply-chain (opt3), environmental-scientist (opt4), engineer (opt5)
engBank.questions[1].options[0].weights = { "civil-engineer": 3, pilot: 2 };
engBank.questions[1].options[1].weights = { "army-officer": 3, "civil-engineer": 1 };
engBank.questions[1].options[2].weights = { pilot: 3, "mechanical-engineer": 1 };
engBank.questions[1].options[3].weights = { "supply-chain": 3, "civil-engineer": 1 };
engBank.questions[1].options[4].weights = { "environmental-scientist": 3, "mechanical-engineer": 1 };
engBank.questions[1].options[5].weights = { engineer: 3, architect: 2 };

// Q3 (blendCore): mechanical-engineer (opt0), civil-engineer (opt1), architect (opt2), army-officer (opt3), pilot (opt4), supply-chain (opt5)
engBank.questions[2].options[0].weights = { "mechanical-engineer": 3, "supply-chain": 2 };
engBank.questions[2].options[1].weights = { "civil-engineer": 3, "environmental-scientist": 2 };
engBank.questions[2].options[2].weights = { architect: 3, "civil-engineer": 1 };
engBank.questions[2].options[3].weights = { "army-officer": 3, "mechanical-engineer": 1 };
engBank.questions[2].options[4].weights = { pilot: 3, engineer: 2 };
engBank.questions[2].options[5].weights = { "supply-chain": 3, "army-officer": 2 };

// Q4 (blendCore): mechanical-engineer (opt0), civil-engineer (opt1), environmental-scientist (opt2), engineer (opt3), architect (opt4), army-officer (opt5)
engBank.questions[3].options[0].weights = { "mechanical-engineer": 3, engineer: 2 };
engBank.questions[3].options[1].weights = { "civil-engineer": 3, "army-officer": 2 };
engBank.questions[3].options[2].weights = { "environmental-scientist": 3, "civil-engineer": 1 };
engBank.questions[3].options[3].weights = { engineer: 3, "mechanical-engineer": 1 };
engBank.questions[3].options[4].weights = { architect: 3, pilot: 2 };
engBank.questions[3].options[5].weights = { "army-officer": 3, "supply-chain": 2 };

// Now test blended with tech (7 roadmaps)
STAGE2_BANKS.engineering = engBank;

const stage1Affinity = {
  topDomains: ["engineering", "tech"],
  domainScores: { engineering: 1.0, tech: 1.0 },
  isBlended: true,
};

const servedSet = getStage2Set(stage1Affinity, { seed: "blend_eval" });
const roadmapsA = ["mechanical-engineer", "civil-engineer"];
const roadmapsB = getRoadmapsByDomain("tech");
const pool = [...roadmapsA, ...roadmapsB];
const nPool = pool.length; // 9
const uniformShare = 1 / nPool;
const minShare = 0.4 * uniformShare;
const maxShare = 2.0 * uniformShare;

let winsA = 0;
let winsB = 0;
const slugWins = {};
for (const s of pool) slugWins[s] = 0;

const RUNS = 50000;
for (let r = 0; r < RUNS; r++) {
  const answers = {};
  for (const q of servedSet) {
    const idx = Math.floor(Math.random() * q.options.length);
    answers[q.id] = q.options[idx].id;
  }
  const res = scoreStage2(answers, servedSet, { stage1Result: stage1Affinity, seed: r });
  if (roadmapsA.includes(res.topSlug)) {
    winsA++;
    slugWins[res.topSlug]++;
  } else if (roadmapsB.includes(res.topSlug)) {
    winsB++;
    slugWins[res.topSlug]++;
  }
}

const shareA = (winsA / RUNS) * 100;
const shareB = (winsB / RUNS) * 100;
console.log(`Blended (engineering + tech): ShareA=${shareA.toFixed(2)}%, ShareB=${shareB.toFixed(2)}% [35-65%]`);
for (const s of pool) {
  const sPct = (slugWins[s] / RUNS * 100).toFixed(2);
  const pass = slugWins[s] / RUNS >= minShare && slugWins[s] / RUNS <= maxShare;
  console.log(`  ${s.padEnd(24)}: ${sPct}% [${(minShare*100).toFixed(2)}% - ${(maxShare*100).toFixed(2)}%] ${pass ? '✅' : '❌'}`);
}
