import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { scoreStage2 } from "../services/stage2Selector.js";

// Domain sizes
const DOMAIN_SIZES = {
  tech: 7, healthcare: 7, business: 7,
  media: 5, creative: 5,
  finance: 4,
  law_gov: 3, education_social: 3, aviation_hospitality: 3,
  engineering: 2, science: 2
};

const allRoadmaps = [];
for (const d of DOMAINS) allRoadmaps.push(...getRoadmapsByDomain(d));

export function buildTestBanks(bankConfig) {
  // bankConfig[dom] = { ownOptsCount, outsideSlugs }
  const banksQ4 = {};
  for (const dom of DOMAINS) {
    const size = DOMAIN_SIZES[dom];
    const ownRoadmaps = getRoadmapsByDomain(dom);
    const { optsCount, outsideSlugs, secWeights } = bankConfig[dom];
    const outsideCount = 24 - (size * optsCount);

    const qList = [
      { id: dom + '_q1', blendCore: true, options: [] },
      { id: dom + '_q2', blendCore: true, options: [] },
      { id: dom + '_q3', blendCore: true, options: [] },
      { id: dom + '_q4', blendCore: true, options: [] },
    ];

    let optIdx = 0;
    for (let r = 0; r < size; r++) {
      const slug = ownRoadmaps[r];
      for (let o = 0; o < optsCount; o++) {
        const qIdx = optIdx % 4;
        const weights = { [slug]: 3 };
        if (secWeights && secWeights[r] && secWeights[r][o]) {
          Object.assign(weights, secWeights[r][o]);
        }
        qList[qIdx].options.push({
          id: `${dom}_q${qIdx + 1}_opt${qList[qIdx].options.length + 1}`,
          weights
        });
        optIdx++;
      }
    }

    for (let o = 0; o < outsideCount; o++) {
      const qIdx = optIdx % 4;
      const slug = outsideSlugs[o % outsideSlugs.length];
      qList[qIdx].options.push({
        id: `${dom}_q${qIdx + 1}_opt${qList[qIdx].options.length + 1}`,
        weights: { [slug]: 3 }
      });
      optIdx++;
    }

    banksQ4[dom] = qList;
  }
  return banksQ4;
}

export function evaluate55Pairs(banksQ4, runs = 2000) {
  let failed = 0;
  const results = [];

  for (let i = 0; i < DOMAINS.length; i++) {
    for (let j = i + 1; j < DOMAINS.length; j++) {
      const domA = DOMAINS[i];
      const domB = DOMAINS[j];
      const roadmapsA = getRoadmapsByDomain(domA);
      const roadmapsB = getRoadmapsByDomain(domB);

      const qA = banksQ4[domA];
      const qB = banksQ4[domB];
      const questions = [];
      for (let k = 0; k < 4; k++) {
        questions.push(qA[k]);
        questions.push(qB[k]);
      }

      const dummyStage1 = {
        topDomains: [domA, domB],
        domainScores: { [domA]: 1.0, [domB]: 1.0 },
        isBlended: true,
      };

      let winsA = 0;
      let winsB = 0;
      const slugWinsA = {};
      const slugWinsB = {};
      for (const s of roadmapsA) slugWinsA[s] = 0;
      for (const s of roadmapsB) slugWinsB[s] = 0;

      for (let r = 0; r < runs; r++) {
        const answers = {};
        for (const q of questions) {
          answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;
        }
        const res = scoreStage2(answers, questions, { stage1Result: dummyStage1, seed: 1337 + r });
        if (slugWinsA[res.topSlug] !== undefined) {
          winsA++;
          slugWinsA[res.topSlug]++;
        } else if (slugWinsB[res.topSlug] !== undefined) {
          winsB++;
          slugWinsB[res.topSlug]++;
        }
      }

      const totalPairWins = winsA + winsB;
      const shareA = (winsA / totalPairWins) * 100;
      const shareB = (winsB / totalPairWins) * 100;

      const valsA = Object.values(slugWinsA);
      const valsB = Object.values(slugWinsB);
      const ratioA = Math.max(...valsA) / Math.max(1, Math.min(...valsA));
      const ratioB = Math.max(...valsB) / Math.max(1, Math.min(...valsB));

      const pass = shareA >= 42.0 && shareA <= 58.0 && ratioA <= 2.0 && ratioB <= 2.0;
      if (!pass) failed++;
      results.push({ domA, domB, shareA, shareB, ratioA, ratioB, pass });
    }
  }

  results.sort((a, b) => Math.abs(b.shareA - 50) - Math.abs(a.shareA - 50));
  return { failed, results };
}

// Test initial config
console.log("Searching for 100% compliant 55-pair configuration...");
