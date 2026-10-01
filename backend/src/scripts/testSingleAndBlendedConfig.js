import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";

// Test a bank configuration for education_social
// 7 questions, 6 options each
// Own: teacher, ed-tech, social-worker
// Adjacent: psychologist, content-creator, human-resources, journalist, civil-services, fitness-trainer

function simulateSingleDomain(bankQuestions, ownRoadmaps, runs = 50000) {
  let ownWins = 0;
  let nonOwnWins = 0;
  const slugWins = {};
  for (const q of bankQuestions) {
    for (const opt of q.options) {
      for (const s of Object.keys(opt.weights)) slugWins[s] = 0;
    }
  }

  let multiNonOwnInTop5 = 0;

  for (let r = 0; r < runs; r++) {
    const scores = {};
    for (const s of Object.keys(slugWins)) scores[s] = 0;

    for (const q of bankQuestions) {
      const idx = Math.floor(Math.random() * q.options.length);
      const opt = q.options[idx];
      for (const [slug, w] of Object.entries(opt.weights)) {
        scores[slug] += w;
      }
    }

    const sorted = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
    const topSlug = sorted[0];

    if (ownRoadmaps.includes(topSlug)) ownWins++;
    else nonOwnWins++;

    slugWins[topSlug]++;

    // Top 5 non-own check
    const top5 = sorted.slice(0, 5);
    const nonOwnInTop5 = top5.filter((s) => !ownRoadmaps.includes(s)).length;
    if (nonOwnInTop5 >= 2) multiNonOwnInTop5++;
  }

  const ownPct = (ownWins / runs) * 100;
  const nonOwnPct = (nonOwnWins / runs) * 100;
  const multiNonOwnPct = (multiNonOwnInTop5 / runs) * 100;

  console.log(`Single Domain: Own Combined = ${ownPct.toFixed(2)}% (Target: 60-85%)`);
  console.log(`Adjacent Combined = ${nonOwnPct.toFixed(2)}% (Target: 15-40%)`);
  console.log(`Multi Non-Own in Top 5 = ${multiNonOwnPct.toFixed(2)}% (Target: >=40%)`);

  for (const [s, cnt] of Object.entries(slugWins)) {
    const pct = (cnt / runs) * 100;
    console.log(`  ${s.padEnd(24)}: ${pct.toFixed(2)}%`);
  }
}

console.log("Ready to test single-domain and blended configs.");
