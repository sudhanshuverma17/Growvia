import { scoreStage1 } from "../services/stage1Scoring.js";
import { STAGE1_QUESTIONS } from "../config/stage1-questions.js";
import { getStage2Set, scoreStage2 } from "../services/stage2Selector.js";
import { DOMAIN_ROADMAP_MAP } from "../config/quizDomains.js";

const RUNS = 50000;
const top1Counts = {};
const top5Counts = {};
for (const s of Object.keys(DOMAIN_ROADMAP_MAP)) {
  top1Counts[s] = 0;
  top5Counts[s] = 0;
}

let blendedCount = 0;
let outsideTopDomainCount = 0;

for (let r = 0; r < RUNS; r++) {
  const stage1Answers = {};
  for (const q of STAGE1_QUESTIONS) {
    const idx = Math.floor(Math.random() * q.options.length);
    stage1Answers[q.id] = q.options[idx].id;
  }
  const s1Res = scoreStage1(stage1Answers, { seed: r });
  if (s1Res.isBlended) blendedCount++;

  const s2Set = getStage2Set(s1Res, { seed: r });
  const s2Answers = {};
  for (const q of s2Set) {
    const idx = Math.floor(Math.random() * q.options.length);
    s2Answers[q.id] = q.options[idx].id;
  }
  const s2Res = scoreStage2(s2Answers, s2Set, { stage1Result: s1Res, seed: r });

  top1Counts[s2Res.topSlug]++;
  for (let rank = 0; rank < Math.min(5, s2Res.rankedSlugs.length); rank++) {
    top5Counts[s2Res.rankedSlugs[rank]]++;
  }

  const topDomain = DOMAIN_ROADMAP_MAP[s2Res.topSlug]?.domain;
  if (topDomain !== s1Res.topDomains[0]) {
    outsideTopDomainCount++;
  }
}

console.log("\n===================================================================================");
console.log("📊 QUICK END-TO-END 48-ROADMAP MONTE CARLO (50,000 RUNS)");
console.log("===================================================================================");
console.log("| Domain               | Roadmap Slug             | Top-1 % | Top-5 % | 0.5%-6.0% Status |");
console.log("-----------------------------------------------------------------------------------");

let fails = 0;
for (const [slug, meta] of Object.entries(DOMAIN_ROADMAP_MAP)) {
  const dom = meta.domain;
  const top1Pct = ((top1Counts[slug] / RUNS) * 100).toFixed(2);
  const top5Pct = ((top5Counts[slug] / RUNS) * 100).toFixed(2);
  const pass = top1Pct >= 0.50 && top1Pct <= 6.00;
  if (!pass) fails++;

  console.log(
    `| ${dom.padEnd(20)} | ${slug.padEnd(24)} | ${top1Pct.padStart(6)}% | ${top5Pct.padStart(6)}% | ${pass ? "✅ PASS" : "❌ FAIL"}          |`
  );
}

console.log("-----------------------------------------------------------------------------------");
console.log(`Single vs Blended: Single=${((RUNS - blendedCount)/RUNS*100).toFixed(1)}%, Blended=${(blendedCount/RUNS*100).toFixed(1)}%`);
console.log(`Outside Stage 1 Top Domain: ${(outsideTopDomainCount/RUNS*100).toFixed(1)}%`);
console.log(`Total Fails: ${fails} / 48`);
