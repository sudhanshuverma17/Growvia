import { STAGE2_BANKS } from "../services/stage2Selector.js";
import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { scoreStage2 } from "../services/stage2Selector.js";

function findPathToRankTop(questionSet, targetSlug, stage1Result) {
  let beam = [{ answers: {}, runningScores: {} }];

  for (const q of questionSet) {
    const nextBeam = [];
    for (const state of beam) {
      for (const opt of q.options) {
        const nextAnswers = { ...state.answers, [q.id]: opt.id };
        const nextScores = { ...state.runningScores };
        for (const [slug, w] of Object.entries(opt.weights)) {
          nextScores[slug] = (nextScores[slug] || 0) + w;
        }

        const targetScore = nextScores[targetSlug] || 0;
        let maxComp = 0;
        for (const [s, sc] of Object.entries(nextScores)) {
          if (s !== targetSlug && sc > maxComp) maxComp = sc;
        }

        const optTargetW = opt.weights[targetSlug] || 0;
        const fitness = targetScore * 100 + optTargetW * 20 - maxComp * 15;
        nextBeam.push({ answers: nextAnswers, runningScores: nextScores, fitness });
      }
    }
    nextBeam.sort((a, b) => b.fitness - a.fitness);
    beam = nextBeam.slice(0, 100);
  }

  for (const state of beam) {
    const res = scoreStage2(state.answers, questionSet, { stage1Result, seed: "reach_eval" });
    if (res.topSlug === targetSlug) return { rank: 1, res };
  }

  const bestRes = scoreStage2(beam[0].answers, questionSet, { stage1Result, seed: "reach_eval" });
  const rank = bestRes.rankedSlugs.indexOf(targetSlug) + 1;
  return { rank, res: bestRes };
}

const ALL_11_DOMAINS = [
  "tech", "healthcare", "media", "business", "creative", "finance",
  "engineering", "law_gov", "education_social", "aviation_hospitality", "science"
];

for (const domain of ALL_11_DOMAINS) {
  const bank = STAGE2_BANKS[domain];
  const ownRoadmaps = getRoadmapsByDomain(domain);
  const dummyStage1 = {
    topDomains: [domain, "other"],
    domainScores: { [domain]: 1.0, other: 0.5 },
    isBlended: false,
  };

  const allSlugs = new Set();
  for (const q of bank.questions) {
    for (const opt of q.options) {
      for (const s of Object.keys(opt.weights)) allSlugs.add(s);
    }
  }

  for (const slug of allSlugs) {
    if (ownRoadmaps.includes(slug)) continue;
    const optsWithSlug = [];
    for (const q of bank.questions) {
      for (const opt of q.options) {
        if (opt.weights[slug]) {
          const w3 = Object.entries(opt.weights).find(([, w]) => w === 3)?.[0];
          optsWithSlug.push({ qId: q.id, optId: opt.id, w: opt.weights[slug], primary: w3 });
        }
      }
    }

    const { rank, res } = findPathToRankTop(bank.questions, slug, dummyStage1);
    const pass = optsWithSlug.length >= 4 ? rank === 1 : rank <= 3;
    if (!pass) {
      console.log(`❌ FAIL in [${domain}]: slug='${slug}' (opts=${optsWithSlug.length}) got rank #${rank} (top is ${res.topSlug} with ${res.slugScores[res.topSlug]} pts, ${slug} has ${res.slugScores[slug]} pts)`);
      console.log(`   Appearances of ${slug}:`, optsWithSlug);
    } else {
      console.log(`✅ PASS in [${domain}]: slug='${slug}' (opts=${optsWithSlug.length}) got rank #${rank}`);
    }
  }
}
