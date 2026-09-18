import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { QUIZ_QUESTIONS, CAREER_PROFILES } from "../config/quizConfig.js";
import { processAssessment } from "../services/scoringEngine.js";
import { generateCareerAnalysis } from "../services/aiService.js";
import { QuizAssessment } from "../models/QuizAssessment.js";
import { Course } from "../models/Course.js";

/**
 * Validates that all 10 quiz answers meet required formats and constraints
 * @param {Object} answers
 * @returns {{ isValid: boolean, error?: string }}
 */
export const validateAnswers = (answers = {}) => {
  if (!answers || typeof answers !== "object") {
    return { isValid: false, error: "Answers payload must be an object" };
  }

  for (const q of QUIZ_QUESTIONS) {
    const val = answers[q.id];

    if (val === undefined || val === null) {
      return { isValid: false, error: `Missing answer for question ${q.id} (${q.category})` };
    }

    if (q.type === "single" || q.type === "scenario") {
      if (typeof val !== "string" || !val.trim()) {
        return { isValid: false, error: `Invalid selection for question ${q.id}` };
      }
      // Ensure the option ID exists in the question options
      const optExists = q.options.some((o) => o.id === val.trim());
      if (!optExists) {
        return { isValid: false, error: `Unrecognized option ID "${val}" for question ${q.id}` };
      }
    } else if (q.type === "multiple") {
      if (!Array.isArray(val) || val.length === 0) {
        return { isValid: false, error: `Please select at least one option for question ${q.id}` };
      }
      if (q.maxSelect && val.length > q.maxSelect) {
        return {
          isValid: false,
          error: `Question ${q.id} allows a maximum of ${q.maxSelect} selections`,
        };
      }
      const validOptIds = new Set(q.options.map((o) => o.id));
      const hasInvalid = val.some((optId) => !validOptIds.has(optId));
      if (hasInvalid) {
        return { isValid: false, error: `Unrecognized option in selection for question ${q.id}` };
      }
    } else if (q.type === "rating") {
      const num = Number(val);
      if (isNaN(num) || num < 1 || num > 5) {
        return { isValid: false, error: `Rating for question ${q.id} must be between 1 and 5` };
      }
    }
  }

  return { isValid: true };
};

/**
 * @desc    Submit 10-Question Diverse Career Assessment Quiz
 * @route   POST /api/career-quiz/submit
 * @access  Public (Optional JWT attaches to User account)
 */
export const submitCareerQuiz = async (req, res) => {
  try {
    const { answers } = req.body;

    // 1. Strict answer validation
    const validation = validateAnswers(answers);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.error,
      });
    }

    // 2. Fetch live available courses/roadmaps from MongoDB
    let availableCourses = [];
    try {
      if (mongoose.connection.readyState !== 1) {
        await connectDB();
      }
      if (mongoose.connection.readyState === 1) {
        availableCourses = await Course.find(
          {},
          "id title category icon description skills stats"
        ).lean();
      }
    } catch (dbErr) {
      console.warn("[Quiz Controller DB Warning]: Could not fetch courses from DB:", dbErr.message);
    }

    // Build complete course pool from DB and static registry
    const coursePool = availableCourses.length > 0
      ? availableCourses
      : Object.entries(CAREER_PROFILES).map(([id, p]) => ({ id, ...p }));

    // 3. Multidimensional scoring and diversity-aware algorithmic baseline
    const scoredData = processAssessment(answers, coursePool, {
      recommendationCount: 4, // 3 to 5 recommendations
    });

    // 4. Generate structured cognitive AI analysis (LLM evaluates logical thinking and selects from catalog)
    const aiAnalysis = await generateCareerAnalysis({
      traitScores: scoredData.traitScores,
      careerMatches: scoredData.topRecommendations,
      answers,
      availableCourses: coursePool,
    });

    // 5. LLM Response directly determines career recommendations if returned
    let finalRecommendations = scoredData.topRecommendations;
    let finalTopMatch = scoredData.topMatch;

    if (aiAnalysis && Array.isArray(aiAnalysis.topRecommendations) && aiAnalysis.topRecommendations.length >= 3) {
      const courseMap = new Map();
      coursePool.forEach((c) => courseMap.set(c.id, c));
      Object.entries(CAREER_PROFILES).forEach(([id, p]) => {
        if (!courseMap.has(id)) courseMap.set(id, { id, ...p });
      });

      // Filter to recommendations that match valid roadmaps
      const validLlmRecs = aiAnalysis.topRecommendations.filter((rec) => courseMap.has(rec.id));

      if (validLlmRecs.length >= 3) {
        finalRecommendations = validLlmRecs.slice(0, 5).map((rec) => {
          const dbCourse = courseMap.get(rec.id) || {};
          const profile = CAREER_PROFILES[rec.id] || {};
          const matchPercentage = Math.min(98, Math.max(50, Number(rec.matchPercentage) || 85));

          return {
            id: rec.id,
            careerId: rec.id,
            roadmapId: rec.id,
            title: dbCourse.title || profile.title || rec.title,
            category: dbCourse.category || profile.category || rec.category || "Technology",
            family: dbCourse.family || profile.family || "technology",
            icon: dbCourse.icon || profile.icon || "Briefcase",
            description: rec.reason || dbCourse.description || profile.description,
            score: matchPercentage,
            matchPercentage,
            roadmapUrl: `/roadmaps/${rec.id}`,
            keyStrengths: profile.keyStrengths || dbCourse.skills?.slice(0, 3) || ["Logical deduction", "Systems thinking"],
            skillsToDevelop: profile.skillsToDevelop || ["Foundational concepts", "Hands-on projects"],
            reason: rec.reason,
          };
        });
        finalTopMatch = finalRecommendations[0];
      }
    }

    // 6. Persist to MongoDB Atlas (fault-tolerant)
    let assessmentDoc = null;
    try {
      if (mongoose.connection.readyState === 1) {
        const userId = req.user?._id || null;
        assessmentDoc = await QuizAssessment.create({
          userId,
          quizVersion: "career-assessment-v2",
          answers,
          traitScores: scoredData.traitScores,
          careerScores: scoredData.careerScores,
          topRecommendations: finalRecommendations,
          aiAnalysis,
        });
      }
    } catch (persistErr) {
      console.warn("[Quiz Controller Save Warning]: Could not save assessment to DB:", persistErr.message);
    }

    return res.status(200).json({
      success: true,
      message: "Career assessment processed successfully",
      data: {
        id: assessmentDoc?._id || `temp-${Date.now()}`,
        quizVersion: assessmentDoc?.quizVersion || "career-assessment-v2",
        categoryScores: scoredData.categoryScores,
        traitScores: scoredData.traitScores,
        careerScores: scoredData.careerScores,
        topRecommendations: finalRecommendations,
        topMatch: finalTopMatch,
        tieBreaker: scoredData.tieBreaker,
        aiAnalysis,
        createdAt: assessmentDoc?.createdAt || new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("[Career Quiz Submit Error]:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while evaluating your career assessment",
      error: error.message,
    });
  }
};

/**
 * @desc    Get user's latest career assessment
 * @route   GET /api/career-quiz/latest
 * @access  Private (Requires token)
 */
export const getLatestAssessment = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required to retrieve assessment history",
      });
    }

    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    const latest = await QuizAssessment.findOne({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    if (!latest) {
      return res.status(404).json({
        success: false,
        message: "No previous career assessment found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      data: latest,
    });
  } catch (error) {
    console.error("[Get Latest Assessment Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve latest assessment",
      error: error.message,
    });
  }
};

/**
 * @desc    Get career assessment by ID
 * @route   GET /api/career-quiz/:id
 * @access  Public
 */
export const getAssessmentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    const assessment = await QuizAssessment.findById(id).lean();

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: assessment,
    });
  } catch (error) {
    console.error("[Get Assessment By ID Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve assessment details",
      error: error.message,
    });
  }
};
