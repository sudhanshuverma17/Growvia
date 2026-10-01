import { QUIZ_PROFILES, DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";

const DIMENSION_KEYS = [
  "technical",
  "analytical",
  "creative",
  "business",
  "communication",
  "leadership",
  "research",
  "people",
  "structured",
  "riskTaking",
];

let totalPairs = 0;
const flagged = [];
const allPairsSummary = [];

for (const domain of DOMAINS) {
  const slugs = getRoadmapsByDomain(domain);
  for (let i = 0; i < slugs.length; i++) {
    for (let j = i + 1; j < slugs.length; j++) {
      totalPairs++;
      const s1 = slugs[i];
      const s2 = slugs[j];
      const t1 = QUIZ_PROFILES[s1]?.traits || {};
      const t2 = QUIZ_PROFILES[s2]?.traits || {};

      let diffGte30Count = 0;
      const bigDiffs = [];

      for (const k of DIMENSION_KEYS) {
        const val1 = Number(t1[k]) || 0;
        const val2 = Number(t2[k]) || 0;
        const diff = Math.abs(val1 - val2);
        // EXACT check: difference >= 0.30
        if (diff >= 0.299999) {
          diffGte30Count++;
          bigDiffs.push(`${k}: ${diff.toFixed(2)}`);
        }
      }

      allPairsSummary.push({
        domain,
        pair: `${s1} vs ${s2}`,
        diffGte30Count,
        bigDiffs,
      });

      if (diffGte30Count < 2) {
        flagged.push({
          domain,
          s1,
          s2,
          diffGte30Count,
          bigDiffs,
        });
      }
    }
  }
}

console.log("==================================================");
console.log("📊 Same-Domain Trait Difference Report (>= 0.30)");
console.log("==================================================");
console.log(`Total within-domain pairs evaluated: ${totalPairs}`);
console.log(`Pairs with FEWER than 2 dimensions differing by >= 0.30: ${flagged.length}`);

if (flagged.length > 0) {
  console.log("\n⚠️ Flagged Pairs (< 2 dims differing >= 0.30):");
  for (const f of flagged) {
    console.log(`- [${f.domain}] ${f.s1} vs ${f.s2}: only ${f.diffGte30Count} dim(s) >= 0.30 (${f.bigDiffs.join(", ") || "none"})`);
  }
} else {
  console.log("✅ All 100 same-domain pairs have at least 2 dimensions differing by >= 0.30!");
}

console.log("==================================================");
