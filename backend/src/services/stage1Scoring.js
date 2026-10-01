import { DOMAINS } from "../config/quizDomains.js";
import {
  STAGE1_QUESTIONS,
  STAGE1_MAX_SCORES,
  BLEND_MARGIN_THRESHOLD,
  BLEND_MARGIN_POINTS,
} from "../config/stage1-questions.js";

export { BLEND_MARGIN_THRESHOLD, BLEND_MARGIN_POINTS };

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
 * Pure scoring function for Stage 1 Domain Discovery.
 *
 * @param {Object|Array} answers - User answers. Can be:
 *   - Object: { q1: "q1_opt1", q2: "q2_opt3", ... }
 *   - Array of objects: [{ questionId: "q1", optionId: "q1_opt1" }, ...]
 *   - Array of option IDs: ["q1_opt1", "q2_opt3", ...]
 * @param {Object} [options] - Optional parameters.
 * @param {string|number} [options.seed] - Seed for tie-breaking. Defaults to a deterministic hash of student answers.
 * @returns {Object} {
 *   domainScores: Record<string, number>, // Normalized 0.0 - 1.0 per domain
 *   topDomains: [string, string],         // Top 2 domain keys
 *   tiedDomains: string[],                // All domains tied for the #1 position
 *   margin: number,                       // Difference between #1 and #2 on 0-100 scale
 *   marginPoints: number,                 // Difference between #1 and #2 in raw integer points
 *   isBlended: boolean,                   // True if marginPoints <= BLEND_MARGIN_POINTS (1 point)
 *   rawScores: Record<string, number>,    // Unnormalized point totals
 * }
 * @throws {Error} If answers are missing, incomplete, or contain invalid option IDs.
 */
export function scoreStage1(answers, { seed } = {}) {
  if (!answers || (typeof answers !== "object" && !Array.isArray(answers))) {
    throw new Error("Invalid answers: answers must be an object or array.");
  }

  // Build a lookup map of questionId -> chosenOptionId
  const answersMap = {};

  if (Array.isArray(answers)) {
    for (const item of answers) {
      if (typeof item === "string") {
        // e.g. "q1_opt3" -> infer questionId "q1"
        const match = item.match(/^(q\d+)/i);
        if (match) {
          answersMap[match[1].toLowerCase()] = item;
        } else {
          throw new Error(`Invalid option ID format: '${item}'`);
        }
      } else if (item && typeof item === "object") {
        const qId = item.questionId || item.qId || item.id;
        const optId = item.optionId || item.optId || item.value;
        if (qId && optId) {
          answersMap[String(qId).toLowerCase()] = String(optId);
        }
      }
    }
  } else {
    // Plain object: { q1: "q1_opt2", ... }
    for (const [qId, optId] of Object.entries(answers)) {
      if (optId) {
        answersMap[String(qId).toLowerCase()] = String(optId);
      }
    }
  }

  // Validate that all 7 questions are answered
  const requiredQuestions = STAGE1_QUESTIONS.map((q) => q.id);
  for (const qId of requiredQuestions) {
    if (!answersMap[qId]) {
      throw new Error(`Incomplete Stage 1 answers: missing answer for question '${qId}'.`);
    }
  }

  // Initialize raw scores
  const rawScores = {};
  for (const d of DOMAINS) rawScores[d] = 0;

  // Process answers and validate option IDs
  for (const question of STAGE1_QUESTIONS) {
    const chosenOptId = answersMap[question.id];
    const validOption = question.options.find((opt) => opt.id === chosenOptId);

    if (!validOption) {
      const validIds = question.options.map((o) => o.id).join(", ");
      throw new Error(
        `Invalid option ID '${chosenOptId}' for question '${question.id}'. Valid option IDs: [${validIds}].`
      );
    }

    // Accumulate weights
    for (const [dom, weight] of Object.entries(validOption.weights)) {
      if (!DOMAINS.includes(dom)) {
        throw new Error(`Encountered unknown domain key '${dom}' in question '${question.id}'.`);
      }
      rawScores[dom] += weight;
    }
  }

  // Normalize scores (0.0 to 1.0 against each domain's own max achievable score)
  const domainScores = {};
  for (const d of DOMAINS) {
    const max = STAGE1_MAX_SCORES[d] || 12;
    domainScores[d] = Number((rawScores[d] / max).toFixed(4));
  }

  // Seed for unbiased, deterministic tie-breaking (never dependent on DOMAINS array order)
  const seedString =
    seed !== undefined && seed !== null
      ? String(seed)
      : Object.keys(answersMap)
          .sort()
          .map((k) => `${k}:${answersMap[k]}`)
          .join(",");

  const getDomainTieBreakVal = (dom) => {
    return hashString(`${seedString}:${dom}`);
  };

  // Find all domains tied for the top score
  const maxScoreVal = Math.max(...Object.values(domainScores));
  const tiedDomains = DOMAINS.filter(
    (d) => Math.abs(domainScores[d] - maxScoreVal) < 0.00001
  );

  // Rank domains descending:
  // 1. normalized score
  // 2. unnormalized raw score
  // 3. deterministic seeded tie-breaker (completely independent of DOMAINS array order)
  const ranked = [...DOMAINS].sort((a, b) => {
    const diff = domainScores[b] - domainScores[a];
    if (Math.abs(diff) > 0.00001) return diff;
    const rawDiff = rawScores[b] - rawScores[a];
    if (rawDiff !== 0) return rawDiff;
    return getDomainTieBreakVal(b) - getDomainTieBreakVal(a);
  });

  const topDomains = [ranked[0], ranked[1]];

  // Difference between #1 and #2 in raw points and percentage points (0-100 scale)
  const marginPoints = rawScores[topDomains[0]] - rawScores[topDomains[1]];
  const margin = Number(((domainScores[topDomains[0]] - domainScores[topDomains[1]]) * 100).toFixed(2));
  const isBlended = marginPoints <= BLEND_MARGIN_POINTS;

  return {
    domainScores,
    topDomains,
    tiedDomains,
    margin,
    marginPoints,
    isBlended,
    rawScores,
  };
}
