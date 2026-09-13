import mongoose from "mongoose";

const careerMatchSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, default: "" },
    score: { type: Number, required: true },
    icon: { type: String, default: "Briefcase" },
    description: { type: String, default: "" },
    keyStrengths: { type: [String], default: [] },
  },
  { _id: false }
);

const quizAssessmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      default: null,
    },
    quizVersion: {
      type: String,
      default: "career-assessment-v1",
      required: true,
      index: true,
    },
    answers: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    traitScores: {
      technical: { type: Number, default: 50 },
      analytical: { type: Number, default: 50 },
      creative: { type: Number, default: 50 },
      business: { type: Number, default: 50 },
      social: { type: Number, default: 50 },
      leadership: { type: Number, default: 50 },
      research: { type: Number, default: 50 },
      helping: { type: Number, default: 50 },
      communication: { type: Number, default: 50 },
    },
    careerScores: {
      type: [careerMatchSchema],
      default: [],
    },
    topRecommendations: {
      type: [careerMatchSchema],
      default: [],
    },
    aiAnalysis: {
      summary: { type: String, default: "" },
      strengths: { type: [String], default: [] },
      topCareer: {
        name: { type: String, default: "" },
        explanation: { type: String, default: "" },
      },
      alternativeCareers: [
        {
          name: { type: String, default: "" },
          explanation: { type: String, default: "" },
          _id: false,
        },
      ],
      developmentAreas: { type: [String], default: [] },
      nextSteps: { type: [String], default: [] },
    },
  },
  {
    timestamps: true,
  }
);

// Optimize query for fetching user's latest assessment
quizAssessmentSchema.index({ userId: 1, createdAt: -1 });

export const QuizAssessment = mongoose.model(
  "QuizAssessment",
  quizAssessmentSchema
);
export default QuizAssessment;
