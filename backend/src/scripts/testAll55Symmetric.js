// Simulate 55 pairs with perfectly balanced inside-bank options in Q1..Q4

const DOMAIN_ROADMAPS = {
  tech: ["engineer", "ai-ml-engineer", "data-scientist", "cybersecurity", "cloud-architect", "blockchain-developer", "game-developer"],
  healthcare: ["doctor", "dentist", "physiotherapist", "pharmacist", "nutritionist", "psychologist", "fitness-trainer"],
  business: ["startup-founder", "product-manager", "mba-manager", "marketing-manager", "digital-marketer", "human-resources", "supply-chain"],
  creative: ["designer", "graphic-designer", "architect", "interior-designer", "fashion-designer"],
  media: ["content-creator", "film-director", "photographer", "journalist", "public-relations"],
  finance: ["chartered-accountant", "investment-banker", "financial-analyst", "actuary"],
  engineering: ["mechanical-engineer", "civil-engineer"],
  law_gov: ["lawyer", "civil-services", "army-officer"],
  education_social: ["teacher", "social-worker", "ed-tech"],
  aviation_hospitality: ["pilot", "hotel-management", "event-manager"],
  science: ["biotechnologist", "environmental-scientist"],
};

const domNames = Object.keys(DOMAIN_ROADMAPS);

// Generate Q1..Q4 options for each domain
function getQ1Q4Options(domain) {
  const roadmaps = DOMAIN_ROADMAPS[domain];
  const n = roadmaps.length;
  const questions = [[], [], [], []]; // 4 questions, 6 options each

  if (n === 2) {
    // 3 options for each of the 2 roadmaps in all 4 questions
    for (let q = 0; q < 4; q++) {
      questions[q].push({ [roadmaps[0]]: 3 }, { [roadmaps[0]]: 3 }, { [roadmaps[0]]: 3 });
      questions[q].push({ [roadmaps[1]]: 3 }, { [roadmaps[1]]: 3 }, { [roadmaps[1]]: 3 });
    }
  } else if (n === 3) {
    // 2 options for each of the 3 roadmaps in all 4 questions
    for (let q = 0; q < 4; q++) {
      questions[q].push({ [roadmaps[0]]: 3 }, { [roadmaps[0]]: 3 });
      questions[q].push({ [roadmaps[1]]: 3 }, { [roadmaps[1]]: 3 });
      questions[q].push({ [roadmaps[2]]: 3 }, { [roadmaps[2]]: 3 });
    }
  } else if (n === 4) {
    // In each question, 4 roadmaps get 1 option (4 opts).
    // Remaining 2 opts: Q0: r0,r1; Q1: r2,r3; Q2: r0,r2; Q3: r1,r3
    // Across 4 questions, each of the 4 roadmaps gets exactly 4 + 2 = 6 options!
    const extras = [
      [roadmaps[0], roadmaps[1]],
      [roadmaps[2], roadmaps[3]],
      [roadmaps[0], roadmaps[2]],
      [roadmaps[1], roadmaps[3]],
    ];
    for (let q = 0; q < 4; q++) {
      for (let r = 0; r < 4; r++) questions[q].push({ [roadmaps[r]]: 3 });
      for (const extra of extras[q]) questions[q].push({ [extra]: 3 });
    }
  } else if (n === 5) {
    // 5 roadmaps get 1 option each per question (5 opts).
    // Remaining 1 option per question: Q0: r0; Q1: r1; Q2: r2; Q3: r3
    // r4 gets secondary w=1 in each question or similar
    // Or each roadmap gets 4 options of w=3, and 6th option is a secondary w=1!
    for (let q = 0; q < 4; q++) {
      for (let r = 0; r < 5; r++) questions[q].push({ [roadmaps[r]]: 3 });
      // 6th option gives w=1 to 2 roadmaps
      const rA = roadmaps[q % 5];
      const rB = roadmaps[(q + 1) % 5];
      questions[q].push({ [rA]: 1, [rB]: 1 });
    }
  } else if (n === 7) {
    // 7 roadmaps: across 4 questions, 24 options.
    // 3 roadmaps appear 4 times, 4 appear 3 times.
    // The 4 that appear 3 times get a secondary w=1 or w=2 in the question where they don't appear!
    // Let's test:
    const appearMap = [
      [0, 1, 2, 3, 4, 5], // missing 6
      [6, 0, 1, 2, 3, 4], // missing 5
      [5, 6, 0, 1, 2, 3], // missing 4
      [4, 5, 6, 0, 1, 2], // missing 3
    ];
    const missing = [6, 5, 4, 3];
    for (let q = 0; q < 4; q++) {
      for (const idx of appearMap[q]) {
        questions[q].push({ [roadmaps[idx]]: 3 });
      }
      // Add secondary for the missing roadmap on option 0 of that question
      questions[q][0][roadmaps[missing[q]]] = 2; // w=2 secondary
    }
  }
  return questions;
}

const banks = {};
for (const dom of domNames) {
  banks[dom] = getQ1Q4Options(dom);
}

// Now test all 55 pairs!
const RUNS = 20000;
let passedPairs = 0;
const results = [];

for (let i = 0; i < domNames.length; i++) {
  for (let j = i + 1; j < domNames.length; j++) {
    const domA = domNames[i];
    const domB = domNames[j];
    const roadmapsA = DOMAIN_ROADMAPS[domA];
    const roadmapsB = DOMAIN_ROADMAPS[domB];
    const qA = banks[domA];
    const qB = banks[domB];

    let winsA = 0;
    let winsB = 0;
    const slugWinsA = {};
    const slugWinsB = {};
    for (const s of roadmapsA) slugWinsA[s] = 0;
    for (const s of roadmapsB) slugWinsB[s] = 0;

    for (let r = 0; r < RUNS; r++) {
      const scoresA = {};
      const scoresB = {};
      for (const s of roadmapsA) scoresA[s] = 0;
      for (const s of roadmapsB) scoresB[s] = 0;

      // 4 questions from A
      for (let q = 0; q < 4; q++) {
        const opt = qA[q][Math.floor(Math.random() * 6)];
        for (const [s, w] of Object.entries(opt)) {
          if (scoresA[s] !== undefined) scoresA[s] += w;
        }
      }

      // 4 questions from B
      for (let q = 0; q < 4; q++) {
        const opt = qB[q][Math.floor(Math.random() * 6)];
        for (const [s, w] of Object.entries(opt)) {
          if (scoresB[s] !== undefined) scoresB[s] += w;
        }
      }

      let maxA = -1, topA = null;
      for (const s of roadmapsA) {
        if (scoresA[s] > maxA) { maxA = scoresA[s]; topA = s; }
      }
      let maxB = -1, topB = null;
      for (const s of roadmapsB) {
        if (scoresB[s] > maxB) { maxB = scoresB[s]; topB = s; }
      }

      if (maxA > maxB) {
        winsA++;
        slugWinsA[topA]++;
      } else if (maxB > maxA) {
        winsB++;
        slugWinsB[topB]++;
      } else if (maxA === maxB && maxA > 0) {
        if (Math.random() < 0.5) {
          winsA++;
          slugWinsA[topA]++;
        } else {
          winsB++;
          slugWinsB[topB]++;
        }
      }
    }

    const shareA = (winsA / (winsA + winsB)) * 100;
    const shareB = (winsB / (winsA + winsB)) * 100;

    const wA = roadmapsA.map(s => slugWinsA[s]);
    const ratioA = Math.max(...wA) / Math.min(...wA);

    const wB = roadmapsB.map(s => slugWinsB[s]);
    const ratioB = Math.max(...wB) / Math.min(...wB);

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
