// Test: small domains having 2 options per question, 3-roadmap domains having 1 or 2
function testOptionAllocation(smallDomOpts, threeDomOpts) {
  const domains = {
    tech: 7,
    healthcare: 7,
    business: 7,
    creative: 5,
    media: 5,
    finance: 4,
    engineering: 2,
    law_gov: 3,
    education_social: 3,
    aviation_hospitality: 3,
    science: 2,
  };
  const domNames = Object.keys(domains);
  const results = [];

  for (let i = 0; i < domNames.length; i++) {
    for (let j = i + 1; j < domNames.length; j++) {
      const domA = domNames[i];
      const domB = domNames[j];
      const nA = domains[domA];
      const nB = domains[domB];

      // Number of options each roadmap has in a 6-option question:
      const getOpts = (dom, n) => {
        if (n === 2) return smallDomOpts; // e.g. 2 options per roadmap (4 options total in 6-opt question)
        if (n === 3) return threeDomOpts; // e.g. 1.5 options per roadmap
        if (n === 4) return 1.25;
        if (n === 5) return 1.0;
        return 0.857; // 6 options / 7 roadmaps
      };

      const optA = getOpts(domA, nA);
      const optB = getOpts(domB, nB);

      let winsA = 0;
      let winsB = 0;
      const RUNS = 10000;

      for (let r = 0; r < RUNS; r++) {
        const scoresA = new Array(nA).fill(0);
        const scoresB = new Array(nB).fill(0);

        for (let q = 0; q < 4; q++) {
          for (let a = 0; a < nA; a++) {
            if (Math.random() < optA / 6) scoresA[a] += 3;
          }
        }
        for (let q = 0; q < 4; q++) {
          for (let b = 0; b < nB; b++) {
            if (Math.random() < optB / 6) scoresB[b] += 3;
          }
        }

        const maxA = Math.max(...scoresA);
        const maxB = Math.max(...scoresB);

        if (maxA > maxB) winsA++;
        else if (maxB > maxA) winsB++;
        else if (Math.random() < 0.5) winsA++;
        else winsB++;
      }

      const shareA = (winsA / RUNS) * 100;
      const shareB = (winsB / RUNS) * 100;
      results.push({ domA, domB, shareA, shareB });
    }
  }

  const bad = results.filter((r) => r.shareA < 42.0 || r.shareA > 58.0);
  console.log(`Opts (2-dom: ${smallDomOpts}, 3-dom: ${threeDomOpts}) => Failing 42-58%: ${bad.length} / 55`);
  if (bad.length < 10) {
    bad.forEach((b) => console.log(`  ${b.domA} + ${b.domB}: ${b.shareA.toFixed(1)}% / ${b.shareB.toFixed(1)}%`));
  }
}

for (let s = 1.4; s <= 2.2; s += 0.2) {
  for (let t = 1.1; t <= 1.6; t += 0.1) {
    testOptionAllocation(Number(s.toFixed(1)), Number(t.toFixed(1)));
  }
}
