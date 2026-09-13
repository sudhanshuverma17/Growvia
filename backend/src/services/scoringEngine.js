import {
  QUIZ_QUESTIONS,
  TRAIT_KEYS,
  CAREER_PROFILES,
} from "../config/quizConfig.js";

/**
 * Computes the theoretical maximum possible points for each trait across all 10 questions.
 * Used for accurate percentage normalization (0–100).
 */
const computeTraitMaxPoints = () => {
  const maxPoints = {};
  TRAIT_KEYS.forEach((k) => {
    maxPoints[k] = 0;
  });

  QUIZ_QUESTIONS.forEach((q) => {
    if (q.type === "single" || q.type === "scenario") {
      // Find the highest point awarded for each trait in this question
      const questionMax = {};
      q.options.forEach((opt) => {
        Object.entries(opt.traits || {}).forEach(([trait, pts]) => {
          questionMax[trait] = Math.max(questionMax[trait] || 0, pts);
        });
      });
      Object.entries(questionMax).forEach(([t, pts]) => {
        maxPoints[t] = (maxPoints[t] || 0) + pts;
      });
    } else if (q.type === "multiple") {
      // If multi-select has maxSelect limit, take the sum of the top N options for each trait
      if (q.maxSelect) {
        TRAIT_KEYS.forEach((t) => {
          const sortedPts = q.options
            .map((o) => (o.traits && o.traits[t]) || 0)
            .sort((a, b) => b - a);
          const topNPts = sortedPts.slice(0, q.maxSelect).reduce((a, b) => a + b, 0);
          maxPoints[t] = (maxPoints[t] || 0) + topNPts;
        });
      } else {
        // Unlimited multi-select: sum across all options
        q.options.forEach((opt) => {
          Object.entries(opt.traits || {}).forEach(([t, pts]) => {
            maxPoints[t] = (maxPoints[t] || 0) + pts;
          });
        });
      }
    } else if (q.type === "rating") {
      // Rating multiplier: max multiplier is at rating 5
      const mults = q.traitMultiplier[5] || {};
      Object.entries(mults).forEach(([t, m]) => {
        maxPoints[t] = (maxPoints[t] || 0) + (m - 1.0) * 8;
      });
    }
  });

  // Ensure reasonable minimum divisors
  TRAIT_KEYS.forEach((t) => {
    if (!maxPoints[t] || maxPoints[t] < 10) maxPoints[t] = 18;
  });

  return maxPoints;
};

const TRAIT_MAX_POINTS = computeTraitMaxPoints();

/**
 * 1. Calculate Raw Trait Scores from User Answers
 * @param {Object} answers - Map of { q1: "q1_opt1", q5: ["q5_opt1", ...], q9: 5, ... }
 * @returns {Object} rawScores - Accumulated raw points for each of the 9 traits
 */
export const calculateRawTraitScores = (answers = {}) => {
  const rawScores = {};
  TRAIT_KEYS.forEach((k) => {
    rawScores[k] = 0;
  });

  let ratingMultiplier = {};

  QUIZ_QUESTIONS.forEach((q) => {
    const userAnswer = answers[q.id];
    if (userAnswer === undefined || userAnswer === null) return;

    if (q.type === "single" || q.type === "scenario") {
      const option = q.options.find((o) => o.id === userAnswer);
      if (option && option.traits) {
        Object.entries(option.traits).forEach(([trait, pts]) => {
          if (rawScores[trait] !== undefined) {
            rawScores[trait] += pts;
          }
        });
      }
    } else if (q.type === "multiple") {
      const selectedArr = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
      // Enforce maxSelect constraint if present
      const validArr = q.maxSelect ? selectedArr.slice(0, q.maxSelect) : selectedArr;

      validArr.forEach((optId) => {
        const option = q.options.find((o) => o.id === optId);
        if (option && option.traits) {
          Object.entries(option.traits).forEach(([trait, pts]) => {
            if (rawScores[trait] !== undefined) {
              rawScores[trait] += pts;
            }
          });
        }
      });
    } else if (q.type === "rating") {
      const numericVal = Math.min(5, Math.max(1, Number(userAnswer) || 3));
      if (q.traitMultiplier && q.traitMultiplier[numericVal]) {
        ratingMultiplier = q.traitMultiplier[numericVal];
      }
    }
  });

  // Apply rating question weighting adjustments
  if (ratingMultiplier && Object.keys(ratingMultiplier).length > 0) {
    Object.entries(ratingMultiplier).forEach(([trait, mult]) => {
      if (rawScores[trait] !== undefined) {
        rawScores[trait] = Math.round(rawScores[trait] * mult);
      }
    });
  }

  return rawScores;
};

/**
 * 2. Normalize Trait Scores into a clean 0–100 integer range
 * @param {Object} rawScores
 * @returns {Object} normalizedScores - Map of { trait: 0..100 }
 */
export const normalizeTraitScores = (rawScores = {}) => {
  const normalized = {};

  TRAIT_KEYS.forEach((trait) => {
    const raw = rawScores[trait] || 0;
    const max = TRAIT_MAX_POINTS[trait] || 20;

    // Normalization ratio bounded between 15% and 98% for realistic human variance
    const calculated = Math.round((raw / max) * 100);
    normalized[trait] = Math.min(98, Math.max(18, calculated));
  });

  return normalized;
};

/**
 * 3. Calculate Career Compatibility Scores using Weighted Compatibility Formula
 * @param {Object} normalizedTraits - { technical: 87, analytical: 81, ... }
 * @returns {Array} rankedCareers - Array of all evaluated career profiles sorted by match score descending
 */
export const calculateCareerCompatibility = (normalizedTraits = {}) => {
  const scoredCareers = CAREER_PROFILES.map((career) => {
    let compatibilityRaw = 0;
    let weightSum = 0;

    Object.entries(career.weights || {}).forEach(([trait, weight]) => {
      const userTraitScore = normalizedTraits[trait] || 50;
      compatibilityRaw += userTraitScore * weight;
      weightSum += weight;
    });

    // Normalize final career score to a percentage
    const finalScore = weightSum > 0
      ? Math.round(compatibilityRaw / weightSum)
      : Math.round(compatibilityRaw);

    // Bounded between 40% and 96% for realistic career alignment
    const boundedScore = Math.min(96, Math.max(42, finalScore));

    return {
      id: career.id,
      careerId: career.id,
      title: career.title,
      category: career.category,
      icon: career.icon,
      description: career.description,
      score: boundedScore,
      matchPercentage: boundedScore,
      compatibilityScore: boundedScore,
      roadmapUrl: `/roadmaps/${career.id}`,
      keyStrengths: career.keyStrengths || [],
    };
  });

  // Sort descending by score
  scoredCareers.sort((a, b) => b.score - a.score);

  return scoredCareers;
};

/**
 * 4. Master Assessment Processor
 * @param {Object} answers - raw answers from frontend
 * @returns {Object} { traitScores, careerScores, topRecommendations, topMatch }
 */
export const processAssessment = (answers = {}) => {
  const rawTraits = calculateRawTraitScores(answers);
  const traitScores = normalizeTraitScores(rawTraits);
  const careerScores = calculateCareerCompatibility(traitScores);

  // Return at least top 5 internally, display top 3 prominently
  const topRecommendations = careerScores.slice(0, 5);
  const topMatch = topRecommendations[0] || null;

  return {
    rawTraits,
    traitScores,
    careerScores,
    topRecommendations: topRecommendations.slice(0, 3), // prominent top 3
    topMatch,
  };
};
