// Test simulation: what if in 4 blendCore questions:
// Each own roadmap has:
// - 3 appearances at weight 3
// - 1 appearance at weight 2 (in the 4th question)
// Total max possible = 3*3 + 2 = 11 points for EVERY own roadmap in EVERY domain!

function simulateBlended(nRoadmapsA, nRoadmapsB, runs = 50000) {
  let winsA = 0;
  let winsB = 0;
  const slugWins = {};
  for (let i = 0; i < nRoadmapsA; i++) slugWins[`A_${i}`] = 0;
  for (let j = 0; j < nRoadmapsB; j++) slugWins[`B_${j}`] = 0;

  for (let r = 0; r < runs; r++) {
    const scores = {};
    for (const k of Object.keys(slugWins)) scores[k] = 0;

    // Bank A: 4 questions, 6 options each
    // Across 4 questions, each of the nRoadmapsA roadmaps has 3 weight-3s and 1 weight-2
    // Let's model a random student picking 1 of 6 options in each of the 4 questions:
    // For each question q in 1..4:
    // Exactly 6 options are chosen.
    // In each question, some roadmaps get 3, some get 2.
    // Over the 4 questions, each roadmap gets 3 pts in 3 questions and 2 pts in 1 question.
    // Total slots: 4 questions * 6 options = 24 options.
    // Each option picked has 1/6 probability.
    for (let q = 0; q < 4; q++) {
      // In question q, a random option (0..5) is picked
      // If we randomly distribute the options:
      // Prob of hitting roadmap i in question q:
      // Let's directly simulate the options array for Bank A:
    }
  }
}
console.log("Ready to test actual banks.");
