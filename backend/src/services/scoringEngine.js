import {
  CAREER_CATEGORIES,
  CATEGORY_KEYS,
  QUIZ_QUESTIONS,
  CAREER_PROFILES,
  inferCourseProfile,
} from "../config/quizConfig.js";

/**
 * Computes maximum theoretical points achievable for each category across all questions
 * taking into account the 0.8x academic and 1.2x interest question multipliers.
 */
export const computeCategoryMaxPoints = () => {
  const maxPoints = {};
  CATEGORY_KEYS.forEach((cat) => {
    maxPoints[cat] = 0;
  });

  QUIZ_QUESTIONS.forEach((q) => {
    const multiplier = q.typeCategory === "academic" ? 0.8 : 1.2;
    const categoryMax = {};
    (q.options || []).forEach((opt) => {
      Object.entries(opt.scores || {}).forEach(([cat, pts]) => {
        categoryMax[cat] = Math.max(categoryMax[cat] || 0, pts);
      });
    });

    Object.entries(categoryMax).forEach(([cat, pts]) => {
      if (maxPoints[cat] !== undefined) {
        maxPoints[cat] += pts * multiplier;
      }
    });
  });

  // Ensure minimum threshold to avoid divide-by-zero or extreme spikes
  CATEGORY_KEYS.forEach((cat) => {
    if (!maxPoints[cat] || maxPoints[cat] < 4) {
      maxPoints[cat] = 12;
    }
  });

  return maxPoints;
};

const CATEGORY_MAX_POINTS = computeCategoryMaxPoints();

/**
 * 1. Accumulate Weighted Score Vectors across the 8 Career Categories
 * - Academic questions (Q1–Q4): 40% weight (Multiplier: 0.8)
 * - Interest questions (Q5–Q10): 60% weight (Multiplier: 1.2)
 *
 * @param {Object} answers - Map of { q1: "q1_opt1", ... }
 * @returns {Object} categoryTotals - Raw weighted sums per category
 */
export const calculateWeightedCategoryVectors = (answers = {}) => {
  const categoryTotals = {};
  CATEGORY_KEYS.forEach((cat) => {
    categoryTotals[cat] = 0;
  });

  QUIZ_QUESTIONS.forEach((q) => {
    const userAns = answers[q.id];
    if (!userAns) return;

    const multiplier = q.typeCategory === "academic" ? 0.8 : 1.2;
    const opt = (q.options || []).find((o) => o.id === userAns);
    if (opt && opt.scores) {
      Object.entries(opt.scores).forEach(([cat, pts]) => {
        if (categoryTotals[cat] !== undefined) {
          categoryTotals[cat] += pts * multiplier;
        }
      });
    }
  });

  return categoryTotals;
};

// Global maximum achievable points for a fully dominant category (4 * 3 * 0.8 + 6 * 3 * 1.2 = 31.2)
export const GLOBAL_MAX_POINTS = 31.2;

/**
 * 2. Normalize Category Scores to 0–100%
 * Calibrated against the global max achievable score so secondary categories
 * don't falsely inflate into ties.
 *
 * @param {Object} categoryTotals
 * @returns {Object} normalizedScores - Map of { [category]: 25..98 }
 */
export const normalizeCategoryScores = (categoryTotals = {}) => {
  const normalized = {};
  CATEGORY_KEYS.forEach((cat) => {
    const raw = categoryTotals[cat] || 0;
    const pct = Math.round((raw / GLOBAL_MAX_POINTS) * 100);
    normalized[cat] = Math.min(98, Math.max(25, pct));
  });
  return normalized;
};

/**
 * 3. Rank Categories Descending and Detect Tie-Breakers
 * If the difference between #1 and #2 is within the marginThreshold (e.g. 5%),
 * both are flagged as top matches.
 *
 * @param {Object} normalizedScores
 * @param {Object} categoryTotals - Raw sums for precise tie-breaking
 * @param {number} marginThreshold - Score margin to trigger a tie-breaker (default 5%)
 * @returns {Object} { ranked, isTie, margin, topCategories }
 */
export const rankCategoriesAndDetectTies = (normalizedScores = {}, categoryTotals = {}, marginThreshold = 5) => {
  const ranked = CATEGORY_KEYS.map((catKey) => {
    const meta = CAREER_CATEGORIES[catKey] || {};
    const score = normalizedScores[catKey] || 0;
    const raw = categoryTotals[catKey] || 0;
    return {
      category: catKey,
      label: meta.label || catKey,
      family: meta.family || "general",
      icon: meta.icon || "Briefcase",
      rawScore: raw,
      score,
      matchPercentage: score,
      defaultRoadmapId: meta.defaultRoadmapId,
      roadmaps: meta.roadmaps || [],
      description: meta.description || "",
      isTie: false,
    };
  }).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.rawScore !== a.rawScore) return b.rawScore - a.rawScore;
    return a.label.localeCompare(b.label);
  });

  const margin = ranked.length >= 2 ? (ranked[0].score - ranked[1].score) : 0;
  const isTie = margin <= marginThreshold && ranked[0].score > 30;

  if (isTie && ranked.length >= 2) {
    ranked[0].isTie = true;
    ranked[1].isTie = true;
  }

  return {
    ranked,
    isTie,
    margin,
    topCategories: ranked.slice(0, 3),
  };
};

/**
 * 4. Match Ranked Categories to Live MongoDB Roadmaps
 * Picks the best matching course per top category to guarantee diversity.
 *
 * @param {Array} rankedCategories - Output from rankCategoriesAndDetectTies
 * @param {Array} availableCourses - Live courses from MongoDB
 * @param {boolean} isTie - Whether top 2 are tied
 * @returns {Array} selectedRoadmaps - Array of enriched roadmap recommendations
 */
export const matchCategoriesToRoadmaps = (rankedCategories = [], availableCourses = [], isTie = false) => {
  const courseMap = new Map();
  if (Array.isArray(availableCourses)) {
    availableCourses.forEach((c) => courseMap.set(c.id, c));
  }

  const selectedRoadmaps = [];
  const addedIds = new Set();

  rankedCategories.forEach((catObj, rankIdx) => {
    const candidateSlugs = catObj.roadmaps || [catObj.defaultRoadmapId];

    for (const slug of candidateSlugs) {
      if (!slug || addedIds.has(slug)) continue;

      const dbCourse = courseMap.get(slug);
      const profile = CAREER_PROFILES[slug] || (dbCourse ? inferCourseProfile(dbCourse) : null);
      if (!dbCourse && !profile) continue;

      const title = dbCourse?.title || profile?.title || slug;
      const category = dbCourse?.category || profile?.category || catObj.label;
      const family = dbCourse?.family || profile?.family || catObj.family;
      const icon = dbCourse?.icon || profile?.icon || catObj.icon;
      const description = dbCourse?.description || profile?.description || catObj.description;
      const keyStrengths = profile?.keyStrengths || dbCourse?.skills?.slice(0, 3) || [];
      const skillsToDevelop = profile?.skillsToDevelop || ["Core Foundations", "Real-world projects"];

      const score = Math.max(45, Math.min(98, catObj.score - (selectedRoadmaps.length >= 3 ? 3 : 0)));

      selectedRoadmaps.push({
        id: slug,
        careerId: slug,
        roadmapId: slug,
        title,
        category,
        family,
        icon,
        description,
        score,
        matchPercentage: score,
        roadmapUrl: `/roadmaps/${slug}`,
        keyStrengths,
        skillsToDevelop,
        categoryKey: catObj.category,
        isTie: (rankIdx === 0 || rankIdx === 1) && isTie,
        reason: `Matches your strong interest in ${catObj.label} (${score}% compatibility).`,
      });

      addedIds.add(slug);
      break;
    }
  });

  return selectedRoadmaps;
};

/**
 * Backward compatibility helpers for older tests or controllers
 */
export const calculateRawDimensionScores = (answers = {}) => calculateWeightedCategoryVectors(answers);
export const normalizeDimensionScores = (rawScores = {}) => normalizeCategoryScores(rawScores);

/**
 * 5. Master Assessment Processor
 * Integrates weighted score vectors, 60/40 interest/academic weighting,
 * category normalization, ranking, tie-breaking, and roadmap selection.
 *
 * @param {Object} answers - User answers from frontend
 * @param {Array} availableCourses - Courses fetched from MongoDB
 * @param {Object} config - { recommendationCount: 4, marginThreshold: 5 }
 * @returns {Object} Comprehensive assessment result
 */
export const processAssessment = (answers = {}, availableCourses = [], config = {}) => {
  const categoryTotals = calculateWeightedCategoryVectors(answers);
  const categoryScores = normalizeCategoryScores(categoryTotals);
  const { ranked, isTie, margin, topCategories } = rankCategoriesAndDetectTies(
    categoryScores,
    categoryTotals,
    config.marginThreshold || 5
  );

  const coursePool = Array.isArray(availableCourses) && availableCourses.length > 0
    ? availableCourses
    : Object.entries(CAREER_PROFILES).map(([id, p]) => ({ id, ...p }));

  const topRecommendations = matchCategoriesToRoadmaps(ranked, coursePool, isTie);
  const topMatch = topRecommendations[0] || null;

  return {
    categoryTotals,
    categoryScores,
    rankedCategories: ranked,
    tieBreaker: {
      isTie,
      margin,
      tiedCategories: isTie ? [ranked[0], ranked[1]] : [ranked[0]],
    },
    // traitScores mapped to categoryScores for AI Service and legacy consumers
    traitScores: categoryScores,
    careerScores: topRecommendations,
    topRecommendations: topRecommendations.slice(0, config.recommendationCount || 4),
    topMatch,
  };
};
