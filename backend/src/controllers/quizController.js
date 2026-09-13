import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { QUIZ_QUESTIONS } from "../config/quizConfig.js";
import { processAssessment } from "../services/scoringEngine.js";
import { generateCareerAnalysis } from "../services/aiService.js";
import { QuizAssessment } from "../models/QuizAssessment.js";

/**
 * Validates that all 10 quiz answers meet required formats and constraints
 * @param {Object} answers
 * @returns {{ isValid: boolean, error?: string }}
 */
const validateAnswers = (answers = {}) => {
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
 * @desc    Submit 10-Question Career Assessment Quiz
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

    // 2. Deterministic scoring engine calculates trait profile and career rankings
    const scoredData = processAssessment(answers);

    // 3. Generate structured AI analysis using LLM or deterministic fallback
    const aiAnalysis = await generateCareerAnalysis({
      traitScores: scoredData.traitScores,
      careerMatches: scoredData.careerScores,
      answers,
    });

    // 4. Persist to MongoDB Atlas (fault-tolerant)
    let assessmentDoc = null;
    try {
      if (mongoose.connection.readyState !== 1) {
        await connectDB();
      }
      if (mongoose.connection.readyState === 1) {
        const userId = req.user?._id || null;
        assessmentDoc = await QuizAssessment.create({
          userId,
          quizVersion: "career-assessment-v1",
          answers,
          traitScores: scoredData.traitScores,
          careerScores: scoredData.careerScores,
          topRecommendations: scoredData.topRecommendations,
          aiAnalysis,
        });
      }
    } catch (dbErr) {
      // Proceed silently - results are safely computed and returned
    }

    return res.status(200).json({
      success: true,
      message: "Career assessment processed successfully",
      data: {
        id: assessmentDoc?._id || `temp-${Date.now()}`,
        quizVersion: assessmentDoc?.quizVersion || "career-assessment-v1",
        traitScores: scoredData.traitScores,
        careerScores: scoredData.careerScores,
        topRecommendations: scoredData.topRecommendations,
        topMatch: scoredData.topMatch,
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
