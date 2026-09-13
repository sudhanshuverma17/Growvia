import {
  DIMENSION_KEYS,
  DIMENSION_LABELS,
  DIMENSION_WEIGHTS,
  QUIZ_QUESTIONS,
  CAREER_PROFILES,
  inferCourseProfile,
} from "../config/quizConfig.js";

/**
 * Computes the theoretical maximum possible points for each dimension
 * across all 10 questions for accurate percentage normalization (0–100).
 */
const computeDimensionMaxPoints = () => {
  const maxPoints = {};
  DIMENSION_KEYS.forEach((k) => {
    maxPoints[k] = 0;
  });

  QUIZ_QUESTIONS.forEach((q) => {
    if (q.type === "single" || q.type === "scenario") {
      const questionMax = {};
      q.options.forEach((opt) => {
        Object.entries(opt.dimensions || {}).forEach(([dim, pts]) => {
          questionMax[dim] = Math.max(questionMax[dim] || 0, pts);
        });
      });
      Object.entries(questionMax).forEach(([d, pts]) => {
        maxPoints[d] = (maxPoints[d] || 0) + pts;
      });
    } else if (q.type === "multiple") {
      if (q.maxSelect) {
        DIMENSION_KEYS.forEach((d) => {
          const sortedPts = q.options
            .map((o) => (o.dimensions && o.dimensions[d]) || 0)
            .sort((a, b) => b - a);
          const topNPts = sortedPts.slice(0, q.maxSelect).reduce((a, b) => a + b, 0);
          maxPoints[d] = (maxPoints[d] || 0) + topNPts;
        });
      } else {
        q.options.forEach((opt) => {
          Object.entries(opt.dimensions || {}).forEach(([d, pts]) => {
            maxPoints[d] = (maxPoints[d] || 0) + pts;
          });
        });
      }
    } else if (q.type === "rating") {
      const ratingOptions = Object.values(q.ratingDimensions || {});
      const ratingMax = {};
      ratingOptions.forEach((dimMap) => {
        Object.entries(dimMap).forEach(([dim, pts]) => {
          ratingMax[dim] = Math.max(ratingMax[dim] || 0, pts);
        });
      });
      Object.entries(ratingMax).forEach(([d, pts]) => {
        maxPoints[d] = (maxPoints[d] || 0) + pts;
      });
    }
  });

  // Ensure minimum divisor to avoid division-by-zero or excessive inflation
  DIMENSION_KEYS.forEach((d) => {
    if (!maxPoints[d] || maxPoints[d] < 8) maxPoints[d] = 16;
  });

  return maxPoints;
};

const DIMENSION_MAX_POINTS = computeDimensionMaxPoints();

/**
 * 1. Calculate Raw Dimension Scores from User Answers
 * @param {Object} answers - e.g. { q1: "q1_opt1", q5: ["q5_opt1", "q5_opt2"], q9: 4, ... }
 * @returns {Object} rawScores - Map of accumulated points for each of the 10 dimensions
 */
export const calculateRawDimensionScores = (answers = {}) => {
  const rawScores = {};
  DIMENSION_KEYS.forEach((k) => {
    rawScores[k] = 0;
  });

  QUIZ_QUESTIONS.forEach((q) => {
    const userAnswer = answers[q.id];
    if (userAnswer === undefined || userAnswer === null) return;

    if (q.type === "single" || q.type === "scenario") {
      const option = q.options.find((o) => o.id === userAnswer);
      if (option && option.dimensions) {
        Object.entries(option.dimensions).forEach(([dim, pts]) => {
          if (rawScores[dim] !== undefined) {
            rawScores[dim] += pts;
          }
        });
      }
    } else if (q.type === "multiple") {
      const selectedArr = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
      const validArr = q.maxSelect ? selectedArr.slice(0, q.maxSelect) : selectedArr;

      validArr.forEach((optId) => {
        const option = q.options.find((o) => o.id === optId);
        if (option && option.dimensions) {
          Object.entries(option.dimensions).forEach(([dim, pts]) => {
            if (rawScores[dim] !== undefined) {
              rawScores[dim] += pts;
            }
          });
        }
      });
    } else if (q.type === "rating") {
      const numericVal = Math.min(5, Math.max(1, Math.round(Number(userAnswer) || 3)));
      const ratingMap = q.ratingDimensions && q.ratingDimensions[numericVal];
      if (ratingMap) {
        Object.entries(ratingMap).forEach(([dim, pts]) => {
          if (rawScores[dim] !== undefined) {
            rawScores[dim] += pts;
          }
        });
      }
    }
  });

  return rawScores;
};

/**
 * 2. Normalize Dimension Scores into clean 0–100 integer range
 * @param {Object} rawScores
 * @returns {Object} normalizedScores - Map of { [dim]: 0..100 }
 */
export const normalizeDimensionScores = (rawScores = {}) => {
  const normalized = {};

  DIMENSION_KEYS.forEach((dim) => {
    const raw = rawScores[dim] || 0;
    const max = DIMENSION_MAX_POINTS[dim] || 20;

    // Scale linearly and bound between 15% and 98%
    const calculated = Math.round((raw / max) * 100);
    normalized[dim] = Math.min(98, Math.max(15, calculated));
  });

  return normalized;
};

/**
 * 3. Calculate Multidimensional Compatibility Score
 * Uses career-defining importance weighting and deficit penalization.
 *
 * Each career's defining traits (careerVal >= 70) carry higher weight.
 * If a user is severely deficient in a defining trait, an appropriate deficit penalty
 * prevents mismatched careers from scoring artificially high.
 *
 * @param {Object} userProfile - Normalized 0–100 dimensions
 * @param {Object} careerDimensions - Target career 0–100 dimensions
 * @returns {number} matchPercentage (40–96)
 */
export const calculateSimilarity = (userProfile = {}, careerDimensions = {}) => {
  let weightedSimSum = 0;
  let weightSum = 0;

  DIMENSION_KEYS.forEach((dim) => {
    const userVal = userProfile[dim] ?? 50;
    const careerVal = careerDimensions[dim] ?? 50;

    // Career-importance exponent: traits central to this career carry higher decision weight
    const careerImportance = Math.pow(careerVal / 50, 1.8);
    const weight = (DIMENSION_WEIGHTS[dim] ?? 1.0) * careerImportance;

    const diff = Math.abs(userVal - careerVal);

    // Deficit penalty: if a career requires high competence (>=68) and user is significantly below it
    let deficitPenalty = 0;
    if (careerVal >= 68 && userVal < careerVal - 20) {
      deficitPenalty = (careerVal - userVal - 20) * 0.5;
    }

    const sim = Math.max(0, 100 - diff - deficitPenalty);

    weightedSimSum += sim * weight;
    weightSum += weight;
  });

  const rawScore = weightSum > 0 ? weightedSimSum / weightSum : weightedSimSum;
  // Scaled linearly for human-readable compatibility range (42% to 96%)
  const scaledScore = Math.round(40 + (rawScore / 100) * 58);
  return Math.min(96, Math.max(42, scaledScore));
};

/**
 * 4. Match User Profile against Available Database Roadmaps
 * Strictly matches against the courses actually provided from the database.
 * If a course is not in the database, it CANNOT be recommended.
 *
 * @param {Object} userProfile - Normalized user dimensions
 * @param {Array} availableCourses - Array of Course documents/objects from MongoDB
 * @returns {Array} scoredCandidates - All evaluated courses with scores, sorted descending
 */
export const matchProfileAgainstRoadmaps = (userProfile = {}, availableCourses = []) => {
  if (!Array.isArray(availableCourses) || availableCourses.length === 0) {
    return [];
  }

  const candidates = availableCourses.map((course) => {
    const roadmapId = course.id;
    // Look up curated profile or infer dynamically for newly added courses
    const profile = CAREER_PROFILES[roadmapId] || inferCourseProfile(course);

    const score = calculateSimilarity(userProfile, profile.dimensions);

    return {
      id: roadmapId,
      careerId: roadmapId,
      roadmapId: roadmapId,
      title: course.title || profile.title,
      category: course.category || profile.category,
      family: profile.family || "technology",
      icon: course.icon || profile.icon || "Briefcase",
      description: course.description || profile.description,
      score,
      matchPercentage: score,
      dimensions: profile.dimensions,
      roadmapUrl: `/roadmaps/${roadmapId}`,
      keyStrengths: profile.keyStrengths || course.skills?.slice(0, 3) || [],
      skillsToDevelop: profile.skillsToDevelop || ["Foundational concepts", "Guided projects"],
    };
  });

  // Deterministic sort: score descending, tie-break by title alphabetical
  candidates.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.title.localeCompare(b.title);
  });

  return candidates;
};

/**
 * 5. Diversity-Aware Recommendation Ranking Algorithm
 * Selects 3–5 diverse recommendations, preventing family over-representation.
 *
 * Rules:
 * - Deterministic, explainable, zero Math.random()
 * - Penalizes candidates whose family is already represented in the selected set
 * - Enforces max 2 careers per family unless pool is exhausted
 * - Preserves high-scoring matches: an exceptional 95% match won't be replaced by a 45% match
 *
 * @param {Array} rankedCandidates - Candidates sorted by score descending
 * @param {Object} options - { targetCount: 4, diversityPenalty: 8, maxPerFamily: 2 }
 * @returns {Array} selected - Top diverse recommendations (3 to 5 items)
 */
export const applyDiversityRanking = (rankedCandidates = [], options = {}) => {
  const { targetCount = 4, diversityPenalty = 8, maxPerFamily = 2 } = options;

  if (rankedCandidates.length <= targetCount) {
    return [...rankedCandidates];
  }

  const selected = [];
  const selectedFamilies = {};
  const remaining = [...rankedCandidates];

  while (selected.length < targetCount && remaining.length > 0) {
    let bestIdx = -1;
    let bestAdjustedScore = -Infinity;

    for (let i = 0; i < remaining.length; i++) {
      const candidate = remaining[i];
      const familyCount = selectedFamilies[candidate.family] || 0;

      // Calculate diversity penalty based on current family representation
      let penalty = 0;
      if (familyCount >= maxPerFamily) {
        // If family is already at max capacity, heavily penalize to prefer other families
        penalty = 35;
      } else if (familyCount > 0) {
        // Moderate penalty for 2nd career in same family
        penalty = diversityPenalty * familyCount;
      }

      const adjustedScore = candidate.score - penalty;

      if (adjustedScore > bestAdjustedScore) {
        bestAdjustedScore = adjustedScore;
        bestIdx = i;
      }
    }

    if (bestIdx >= 0) {
      const [chosen] = remaining.splice(bestIdx, 1);
      selected.push(chosen);
      selectedFamilies[chosen.family] = (selectedFamilies[chosen.family] || 0) + 1;
    } else {
      break;
    }
  }

  return selected;
};

/**
 * 6. Master Assessment Processor
 * Integrates dimension calculation, normalization, roadmap matching, and diversity ranking.
 *
 * @param {Object} answers - User answers from frontend
 * @param {Array} availableCourses - Courses fetched from MongoDB
 * @param {Object} config - { recommendationCount: 4 }
 * @returns {Object} { traitScores, careerScores, topRecommendations, topMatch }
 */
export const processAssessment = (answers = {}, availableCourses = [], config = {}) => {
  const rawTraits = calculateRawDimensionScores(answers);
  const traitScores = normalizeDimensionScores(rawTraits);

  // If no courses passed (e.g. offline test), fall back to CAREER_PROFILES keys
  const coursePool = Array.isArray(availableCourses) && availableCourses.length > 0
    ? availableCourses
    : Object.entries(CAREER_PROFILES).map(([id, p]) => ({ id, ...p }));

  const allCareerScores = matchProfileAgainstRoadmaps(traitScores, coursePool);

  const recommendationCount = Math.min(5, Math.max(3, config.recommendationCount || 4));
  const topRecommendations = applyDiversityRanking(allCareerScores, {
    targetCount: recommendationCount,
    diversityPenalty: 8,
    maxPerFamily: 2,
  });

  const topMatch = topRecommendations[0] || null;

  return {
    rawTraits,
    traitScores,
    careerScores: allCareerScores,
    topRecommendations,
    topMatch,
  };
};
