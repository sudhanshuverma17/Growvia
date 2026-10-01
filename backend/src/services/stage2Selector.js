import { DOMAINS, DOMAIN_ROADMAP_MAP } from "../config/quizDomains.js";
import techBank from "../config/stage2-banks/tech.js";
import healthcareBank from "../config/stage2-banks/healthcare.js";
import mediaBank from "../config/stage2-banks/media.js";
import businessBank from "../config/stage2-banks/business.js";
import creativeBank from "../config/stage2-banks/creative.js";
import financeBank from "../config/stage2-banks/finance.js";
import engineeringBank from "../config/stage2-banks/engineering.js";
import lawGovBank from "../config/stage2-banks/law_gov.js";
import educationSocialBank from "../config/stage2-banks/education_social.js";
import aviationHospitalityBank from "../config/stage2-banks/aviation_hospitality.js";
import scienceBank from "../config/stage2-banks/science.js";

/**
 * Registry of all 11 Stage 2 Domain Question Banks.
 */
export const STAGE2_BANKS = {
  tech: techBank,
  healthcare: healthcareBank,
  media: mediaBank,
  business: businessBank,
  creative: creativeBank,
  finance: financeBank,
  engineering: engineeringBank,
  law_gov: lawGovBank,
  education_social: educationSocialBank,
  aviation_hospitality: aviationHospitalityBank,
  science: scienceBank,
};

/**
 * 32-bit FNV-1a hash function for deterministic seeded tie-breaking.
 */
export function hashString(str = "") {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/**
 * Validates a Stage 2 question bank at load time.
 * Enforces slug validity against DOMAIN_ROADMAP_MAP, weight rules, and word count constraints.
 */
export function validateBank(bank) {
  if (!bank || typeof bank !== "object") {
    throw new Error("Invalid bank: must be an object.");
  }
  if (!DOMAINS.includes(bank.domain)) {
    throw new Error(`Invalid bank domain: '${bank.domain}'. Must be one of [${DOMAINS.join(", ")}].`);
  }
  if (!Array.isArray(bank.questions) || bank.questions.length === 0) {
    throw new Error(`Bank for '${bank.domain}' must contain a non-empty 'questions' array.`);
  }

  for (const q of bank.questions) {
    if (!q.id || typeof q.text !== "string") {
      throw new Error(`Question in '${bank.domain}' missing valid 'id' or 'text'.`);
    }
    const qWords = q.text.trim().split(/\s+/).length;
    if (qWords > 25) {
      throw new Error(`Question '${q.id}' in '${bank.domain}' exceeds 25 words (${qWords} words).`);
    }
    if (!Array.isArray(q.options) || q.options.length < 5 || q.options.length > 6) {
      throw new Error(`Question '${q.id}' in '${bank.domain}' must have 5 or 6 options (found ${q.options?.length}).`);
    }

    for (const opt of q.options) {
      if (!opt.id || typeof opt.text !== "string" || typeof opt.weights !== "object") {
        throw new Error(`Option in question '${q.id}' missing 'id', 'text', or 'weights'.`);
      }
      const optWords = opt.text.trim().split(/\s+/).length;
      if (optWords > 14) {
        throw new Error(`Option '${opt.id}' in '${q.id}' exceeds 14 words (${optWords} words).`);
      }

      const weightEntries = Object.entries(opt.weights);
      if (weightEntries.length === 0) {
        throw new Error(`Option '${opt.id}' in '${q.id}' has empty weights.`);
      }

      let weight3Count = 0;
      let secondaryCount = 0;

      for (const [slug, weight] of weightEntries) {
        if (!DOMAIN_ROADMAP_MAP[slug]) {
          throw new Error(
            `Option '${opt.id}' in '${q.id}' specifies unknown roadmap slug '${slug}' not in DOMAIN_ROADMAP_MAP.`
          );
        }
        if (![1, 2, 3].includes(weight)) {
          throw new Error(`Option '${opt.id}' in '${q.id}' has invalid weight '${weight}' for slug '${slug}'. Must be 1, 2, or 3.`);
        }
        if (weight === 3) weight3Count++;
        if (weight === 1 || weight === 2) secondaryCount++;
      }

      if (weight3Count !== 1) {
        throw new Error(
          `Option '${opt.id}' in '${q.id}' must have exactly ONE slug at weight 3 (found ${weight3Count}).`
        );
      }
      if (secondaryCount > 2) {
        throw new Error(
          `Option '${opt.id}' in '${q.id}' has ${secondaryCount} secondary slugs (maximum allowed is 2).`
        );
      }
    }
  }

  return true;
}

// Validate all registered banks at module load time
for (const [dom, bank] of Object.entries(STAGE2_BANKS)) {
  validateBank(bank);
}

/**
 * Computes maximum points each roadmap slug can earn from the served question set.
 *
 * @param {Array} set - Array of served Stage 2 questions.
 * @returns {Record<string, number>} Map of roadmap slug -> max achievable points.
 */
export function maxPossibleBySlug(set = []) {
  if (!Array.isArray(set)) return {};
  const maxPossible = {};

  for (const q of set) {
    const maxInQ = {};
    for (const opt of q.options || []) {
      for (const [slug, weight] of Object.entries(opt.weights || {})) {
        if (!maxInQ[slug] || weight > maxInQ[slug]) {
          maxInQ[slug] = weight;
        }
      }
    }

    for (const [slug, maxW] of Object.entries(maxInQ)) {
      maxPossible[slug] = (maxPossible[slug] || 0) + maxW;
    }
  }

  return maxPossible;
}

/**
 * Returns the Stage 2 served question set based on Stage 1 results.
 *
 * - If not blended: returns the full question bank of the top domain.
 * - If blended: returns the 4 blendCore questions from each of the top two domains,
 *   interleaved A, B, A, B... (8 questions total).
 * - For a 3+ way tie in Stage 1, resolves top two using tiedDomains and deterministic seeded hash.
 *
 * @param {Object} stage1Result - Output from scoreStage1().
 * @param {Object} [options]
 * @param {string|number} [options.seed] - Optional tie-breaking seed.
 * @returns {Array} Served questions.
 */
export function getStage2Set(stage1Result, { seed } = {}) {
  if (!stage1Result || typeof stage1Result !== "object") {
    throw new Error("stage1Result is required to determine the Stage 2 question set.");
  }

  let { topDomains, tiedDomains, isBlended } = stage1Result;

  // Resolve topDomains if tiedDomains has 3+ domains
  if (tiedDomains && tiedDomains.length > 2) {
    const seedStr = seed !== undefined && seed !== null ? String(seed) : "stage2_tie_break";
    const sortedTied = [...tiedDomains].sort((a, b) => {
      return hashString(`${seedStr}:${b}`) - hashString(`${seedStr}:${a}`);
    });
    topDomains = [sortedTied[0], sortedTied[1]];
  }

  if (!topDomains || topDomains.length === 0) {
    throw new Error("stage1Result does not contain valid topDomains.");
  }

  const primaryDomain = topDomains[0];
  const primaryBank = STAGE2_BANKS[primaryDomain];

  if (!primaryBank) {
    throw new Error(`Stage 2 bank for domain '${primaryDomain}' is not loaded or not yet built.`);
  }

  // Case 1: Unblended -> return full bank of top domain
  if (!isBlended) {
    return primaryBank.questions;
  }

  // Case 2: Blended -> top two domains interleaved
  const secondaryDomain = topDomains[1];
  const secondaryBank = STAGE2_BANKS[secondaryDomain];

  if (!secondaryBank) {
    throw new Error(`Stage 2 bank for domain '${secondaryDomain}' is not loaded or not yet built.`);
  }

  const coreA = primaryBank.questions.filter((q) => q.blendCore === true).slice(0, 4);
  const coreB = secondaryBank.questions.filter((q) => q.blendCore === true).slice(0, 4);

  if (coreA.length < 4) {
    throw new Error(`Domain bank '${primaryDomain}' has fewer than 4 blendCore questions (${coreA.length}).`);
  }
  if (coreB.length < 4) {
    throw new Error(`Domain bank '${secondaryDomain}' has fewer than 4 blendCore questions (${coreB.length}).`);
  }

  // Interleave A, B, A, B, A, B, A, B
  const interleaved = [];
  for (let i = 0; i < 4; i++) {
    interleaved.push(coreA[i]);
    interleaved.push(coreB[i]);
  }

  return interleaved;
}

/**
 * Pure scoring function for Stage 2 served question sets.
 *
 * - Ranks roadmaps primarily by raw points earned.
 * - Resolves ties using Stage 1 domain affinity (domainScores[domain]).
 * - Resolves remaining ties using deterministic seeded random (never array/DB order).
 *
 * @param {Object|Array} answers - User answers for the served Stage 2 set.
 * @param {Array} questionSet - The questions that were served to the user.
 * @param {Object} [options]
 * @param {Object} [options.stage1Result] - Full result from Stage 1 for domain affinity tie-breaking.
 * @param {string|number} [options.seed] - Seed for unbiased tie-breaking.
 * @returns {Object} {
 *   slugScores: Record<string, number>,
 *   normalizedScores: Record<string, number>,
 *   maxPossible: Record<string, number>,
 *   rankedSlugs: string[],
 *   topSlug: string,
 * }
 */
export function scoreStage2(answers, questionSet, { stage1Result, seed } = {}) {
  if (!answers || !Array.isArray(questionSet) || questionSet.length === 0) {
    throw new Error("scoreStage2 requires valid answers and non-empty questionSet.");
  }

  // Map answers to questionId -> chosenOptionId
  const answersMap = {};
  if (Array.isArray(answers)) {
    for (const item of answers) {
      if (typeof item === "string") {
        // e.g. "tech_q1_opt2"
        const lastUnderscore = item.lastIndexOf("_opt");
        if (lastUnderscore !== -1) {
          const qId = item.substring(0, lastUnderscore);
          answersMap[qId] = item;
        } else {
          answersMap[item] = item;
        }
      } else if (item && typeof item === "object") {
        const qId = item.questionId || item.qId || item.id;
        const optId = item.optionId || item.optId || item.value;
        if (qId && optId) answersMap[String(qId)] = String(optId);
      }
    }
  } else {
    for (const [qId, optId] of Object.entries(answers)) {
      if (optId) answersMap[String(qId)] = String(optId);
    }
  }

  // Validate all served questions are answered
  for (const q of questionSet) {
    if (!answersMap[q.id]) {
      throw new Error(`Incomplete Stage 2 answers: missing answer for question '${q.id}'.`);
    }
  }

  const slugScores = {};
  const maxPossible = maxPossibleBySlug(questionSet);

  // Initialize slugScores for all slugs appearing in questionSet
  for (const slug of Object.keys(maxPossible)) {
    slugScores[slug] = 0;
  }

  // Accumulate weights
  for (const q of questionSet) {
    const chosenOptId = answersMap[q.id];
    const validOption = q.options.find((opt) => opt.id === chosenOptId);

    if (!validOption) {
      throw new Error(`Invalid option ID '${chosenOptId}' for question '${q.id}'.`);
    }

    for (const [slug, weight] of Object.entries(validOption.weights)) {
      slugScores[slug] = (slugScores[slug] || 0) + weight;
    }
  }

  // Compute normalized scores (0.0 to 1.0)
  const normalizedScores = {};
  for (const [slug, score] of Object.entries(slugScores)) {
    const max = maxPossible[slug] || 1;
    normalizedScores[slug] = Number((score / max).toFixed(4));
  }

  // Seed for unbiased tie-breaking
  const seedString =
    seed !== undefined && seed !== null
      ? String(seed)
      : Object.keys(answersMap)
          .sort()
          .map((k) => `${k}:${answersMap[k]}`)
          .join(",");

  const getSlugTieBreakVal = (slug) => {
    return hashString(`${seedString}:${slug}`);
  };

  // Rank slugs descending:
  // 1. Raw score
  // 2. Stage 1 domain affinity (domainScores[domain])
  // 3. Deterministic seeded random (completely independent of array or DB order)
  const allSlugs = Object.keys(slugScores);
  const rankedSlugs = [...allSlugs].sort((a, b) => {
    // 1. Raw score
    const diff = slugScores[b] - slugScores[a];
    if (diff !== 0) return diff;

    // 2. Stage 1 domain affinity
    if (stage1Result?.domainScores) {
      const domA = DOMAIN_ROADMAP_MAP[a]?.domain;
      const domB = DOMAIN_ROADMAP_MAP[b]?.domain;
      const affA = stage1Result.domainScores[domA] || 0;
      const affB = stage1Result.domainScores[domB] || 0;
      const affDiff = affB - affA;
      if (Math.abs(affDiff) > 0.0001) return affDiff;
    }

    // 3. Seeded tie-breaker
    return getSlugTieBreakVal(b) - getSlugTieBreakVal(a);
  });

  return {
    slugScores,
    normalizedScores,
    maxPossible,
    rankedSlugs,
    topSlug: rankedSlugs[0] || null,
  };
}
