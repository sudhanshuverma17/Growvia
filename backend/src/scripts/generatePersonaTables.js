import { DOMAINS, DOMAIN_ROADMAP_MAP, getRoadmapsByDomain } from "../config/quizDomains.js";
import { STAGE1_QUESTIONS } from "../config/stage1-questions.js";
import { scoreStage1 } from "../services/stage1Scoring.js";
import { getStage2Set } from "../services/stage2Selector.js";
import { computeCareerResult, deriveSeed } from "../services/careerEngine.js";

const P_LEVELS = [0.5, 0.7, 0.9];
const PERSONAS_PER_SET = 60; // 60 single + 60 blended = 120 per roadmap per p-level

console.log("Generating per-roadmap persona table (single & blended sets across p=0.5, 0.7, 0.9)...");

const allRoadmaps = Object.keys(DOMAIN_ROADMAP_MAP);

// Storage: stats[slug][p] = { single: { top1, picks, shortlist, total }, blended: { ... } }
const stats = {};
for (const slug of allRoadmaps) {
  stats[slug] = {};
  for (const p of P_LEVELS) {
    stats[slug][p] = {
      single: { top1: 0, inPicks: 0, inShortlist: 0, total: 0 },
      blended: { top1: 0, inPicks: 0, inShortlist: 0, total: 0 },
    };
  }
}

for (const targetSlug of allRoadmaps) {
  const targetDomain = DOMAIN_ROADMAP_MAP[targetSlug].domain;
  const otherDomains = DOMAINS.filter((d) => d !== targetDomain);

  for (const p of P_LEVELS) {
    // 1. Single Set Personas (Stage 1 strongly targets targetDomain only)
    for (let i = 0; i < PERSONAS_PER_SET; i++) {
      const s1Answers = {};
      for (const q of STAGE1_QUESTIONS) {
        if (Math.random() < p) {
          let bestOpt = null;
          let maxW = 0;
          for (const opt of q.options) {
            const w = opt.weights?.[targetDomain] || 0;
            if (w > maxW) {
              maxW = w;
              bestOpt = opt;
            }
          }
          s1Answers[q.id] = (bestOpt || q.options[Math.floor(Math.random() * q.options.length)]).id;
        } else {
          s1Answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;
        }
      }

      const s1Seed = deriveSeed(s1Answers);
      const s1Res = scoreStage1(s1Answers, { seed: s1Seed });
      const s2Set = getStage2Set(s1Res, { seed: s1Seed });

      const s2Answers = {};
      for (const q of s2Set) {
        if (Math.random() < p) {
          let bestOpt = null;
          let maxW = 0;
          for (const opt of q.options) {
            const w = opt.weights?.[targetSlug] || 0;
            if (w > maxW) {
              maxW = w;
              bestOpt = opt;
            }
          }
          if (bestOpt) {
            s2Answers[q.id] = bestOpt.id;
          } else {
            const domOpt = q.options.find((o) => {
              const topSlug = Object.keys(o.weights || {})[0];
              return DOMAIN_ROADMAP_MAP[topSlug]?.domain === targetDomain;
            });
            s2Answers[q.id] = (domOpt || q.options[Math.floor(Math.random() * q.options.length)]).id;
          }
        } else {
          s2Answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;
        }
      }

      const res = computeCareerResult({ stage1Answers: s1Answers, stage2Answers: s2Answers });
      const bucket = stats[targetSlug][p].single;
      bucket.total++;
      if (res.topCareer.slug === targetSlug) bucket.top1++;
      if (res.picks.some((pk) => pk.slug === targetSlug)) bucket.inPicks++;
      if (res.shortlist.some((sl) => sl.slug === targetSlug)) bucket.inShortlist++;
    }

    // 2. Blended Set Personas (Stage 1 blends targetDomain with a secondary partner domain)
    for (let i = 0; i < PERSONAS_PER_SET; i++) {
      const partnerDomain = otherDomains[i % otherDomains.length];
      const s1Answers = {};
      for (let qIdx = 0; qIdx < STAGE1_QUESTIONS.length; qIdx++) {
        const q = STAGE1_QUESTIONS[qIdx];
        const favDomain = qIdx % 2 === 0 ? targetDomain : partnerDomain;
        if (Math.random() < p) {
          let bestOpt = null;
          let maxW = 0;
          for (const opt of q.options) {
            const w = opt.weights?.[favDomain] || 0;
            if (w > maxW) {
              maxW = w;
              bestOpt = opt;
            }
          }
          s1Answers[q.id] = (bestOpt || q.options[Math.floor(Math.random() * q.options.length)]).id;
        } else {
          s1Answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;
        }
      }

      const s1Seed = deriveSeed(s1Answers);
      const s1Res = scoreStage1(s1Answers, { seed: s1Seed });
      const s2Set = getStage2Set(s1Res, { seed: s1Seed });

      const s2Answers = {};
      for (const q of s2Set) {
        if (Math.random() < p) {
          let bestOpt = null;
          let maxW = 0;
          for (const opt of q.options) {
            const w = opt.weights?.[targetSlug] || 0;
            if (w > maxW) {
              maxW = w;
              bestOpt = opt;
            }
          }
          if (bestOpt) {
            s2Answers[q.id] = bestOpt.id;
          } else {
            const domOpt = q.options.find((o) => {
              const topSlug = Object.keys(o.weights || {})[0];
              return (
                DOMAIN_ROADMAP_MAP[topSlug]?.domain === targetDomain ||
                DOMAIN_ROADMAP_MAP[topSlug]?.domain === partnerDomain
              );
            });
            s2Answers[q.id] = (domOpt || q.options[Math.floor(Math.random() * q.options.length)]).id;
          }
        } else {
          s2Answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;
        }
      }

      const res = computeCareerResult({ stage1Answers: s1Answers, stage2Answers: s2Answers });
      const bucket = stats[targetSlug][p].blended;
      bucket.total++;
      if (res.topCareer.slug === targetSlug) bucket.top1++;
      if (res.picks.some((pk) => pk.slug === targetSlug)) bucket.inPicks++;
      if (res.shortlist.some((sl) => sl.slug === targetSlug)) bucket.inShortlist++;
    }
  }
}

// Print Tables
function formatPct(cnt, tot) {
  return `${Math.round((cnt / tot) * 100)}%`;
}

console.log("\n========================================================================================================================");
console.log("📊 SINGLE-DOMAIN PERSONA RESULTS (Top-1 / In-Picks / In-Shortlist)");
console.log("========================================================================================================================");
console.log("| Domain               | Roadmap Slug             | p = 0.5 (T1 / Pk / SL) | p = 0.7 (T1 / Pk / SL) | p = 0.9 (T1 / Pk / SL) |");
console.log("------------------------------------------------------------------------------------------------------------------------");
for (const slug of allRoadmaps) {
  const dom = DOMAIN_ROADMAP_MAP[slug].domain;
  const p5 = stats[slug][0.5].single;
  const p7 = stats[slug][0.7].single;
  const p9 = stats[slug][0.9].single;

  const col5 = `${formatPct(p5.top1, p5.total).padStart(4)} / ${formatPct(p5.inPicks, p5.total).padStart(4)} / ${formatPct(p5.inShortlist, p5.total).padStart(4)}`;
  const col7 = `${formatPct(p7.top1, p7.total).padStart(4)} / ${formatPct(p7.inPicks, p7.total).padStart(4)} / ${formatPct(p7.inShortlist, p7.total).padStart(4)}`;
  const col9 = `${formatPct(p9.top1, p9.total).padStart(4)} / ${formatPct(p9.inPicks, p9.total).padStart(4)} / ${formatPct(p9.inShortlist, p9.total).padStart(4)}`;

  console.log(`| ${dom.padEnd(20)} | ${slug.padEnd(24)} |    ${col5}    |    ${col7}    |    ${col9}    |`);
}

console.log("\n========================================================================================================================");
console.log("📊 BLENDED-SET PERSONA RESULTS (Top-1 / In-Picks / In-Shortlist)");
console.log("========================================================================================================================");
console.log("| Domain               | Roadmap Slug             | p = 0.5 (T1 / Pk / SL) | p = 0.7 (T1 / Pk / SL) | p = 0.9 (T1 / Pk / SL) |");
console.log("------------------------------------------------------------------------------------------------------------------------");
for (const slug of allRoadmaps) {
  const dom = DOMAIN_ROADMAP_MAP[slug].domain;
  const p5 = stats[slug][0.5].blended;
  const p7 = stats[slug][0.7].blended;
  const p9 = stats[slug][0.9].blended;

  const col5 = `${formatPct(p5.top1, p5.total).padStart(4)} / ${formatPct(p5.inPicks, p5.total).padStart(4)} / ${formatPct(p5.inShortlist, p5.total).padStart(4)}`;
  const col7 = `${formatPct(p7.top1, p7.total).padStart(4)} / ${formatPct(p7.inPicks, p7.total).padStart(4)} / ${formatPct(p7.inShortlist, p7.total).padStart(4)}`;
  const col9 = `${formatPct(p9.top1, p9.total).padStart(4)} / ${formatPct(p9.inPicks, p9.total).padStart(4)} / ${formatPct(p9.inShortlist, p9.total).padStart(4)}`;

  console.log(`| ${dom.padEnd(20)} | ${slug.padEnd(24)} |    ${col5}    |    ${col7}    |    ${col9}    |`);
}
