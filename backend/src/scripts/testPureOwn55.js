const domainSizes = {
  tech: 7, healthcare: 7, business: 7,
  creative: 5, media: 5,
  finance: 4,
  law_gov: 3, education_social: 3, aviation_hospitality: 3,
  engineering: 2, science: 2
};
const domNames = Object.keys(domainSizes);

// Function to generate 4 questions for a domain of size S
function makeQuestions(S, secW2Count, secW1Count) {
  // S roadmaps (0..S-1)
  // 4 questions, 6 options each
  const questions = [];
  let primIdx = 0;
  for (let q = 0; q < 4; q++) {
    const opts = [];
    for (let o = 0; o < 6; o++) {
      const prim = primIdx % S;
      primIdx++;
      const weights = { [prim]: 3 };
      
      // Add secondaries if specified
      if (secW2Count > 0 && S > 1) {
        const sec1 = (prim + 1) % S;
        weights[sec1] = 2;
      }
      if (secW1Count > 0 && S > 2) {
        const sec2 = (prim + 2) % S;
        weights[sec2] = 1;
      }
      opts.push(weights);
    }
    questions.push(opts);
  }
  return questions;
}

// Let's test what configs for sizes 7, 5, 4, 3, 2 give matching max-score distributions
function evalDistribution(questions, S, runs = 10000) {
  const maxScores = [];
  const slugCounts = new Array(S).fill(0);
  for (let r = 0; r < runs; r++) {
    const scores = new Array(S).fill(0);
    for (let q = 0; q < 4; q++) {
      const opt = questions[q][Math.floor(Math.random() * 6)];
      for (const [s, w] of Object.entries(opt)) {
        scores[Number(s)] += w;
      }
    }
    let max = -1, top = -1;
    for (let i = 0; i < S; i++) {
      if (scores[i] > max) { max = scores[i]; top = i; }
    }
    maxScores.push(max);
    slugCounts[top]++;
  }
  const avgMax = maxScores.reduce((a, b) => a + b, 0) / runs;
  const ratio = Math.max(...slugCounts) / Math.min(...slugCounts);
  return { avgMax, ratio, slugCounts };
}

console.log("Evaluating different configurations...");
console.log("Size 7 with w2=1, w1=1:", evalDistribution(makeQuestions(7, 1, 1), 7));
console.log("Size 7 with w2=1, w1=0:", evalDistribution(makeQuestions(7, 1, 0), 7));
console.log("Size 7 with w2=0, w1=0:", evalDistribution(makeQuestions(7, 0, 0), 7));

console.log("Size 5 with w2=0, w1=0:", evalDistribution(makeQuestions(5, 0, 0), 5));
console.log("Size 4 with w2=0, w1=0:", evalDistribution(makeQuestions(4, 0, 0), 4));
console.log("Size 3 with w2=0, w1=0:", evalDistribution(makeQuestions(3, 0, 0), 3));
console.log("Size 2 with w2=0, w1=0:", evalDistribution(makeQuestions(2, 0, 0), 2));
