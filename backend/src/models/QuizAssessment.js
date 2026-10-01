import mongoose from "mongoose";

const careerMatchSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    careerId: { type: String, default: "" },
    roadmapId: { type: String, default: "" },
    title: { type: String, required: true },
    category: { type: String, default: "" },
    family: { type: String, default: "" },
    score: { type: Number, required: true },
    matchPercentage: { type: Number, default: 0 },
    icon: { type: String, default: "Briefcase" },
    description: { type: String, default: "" },
    roadmapUrl: { type: String, default: "" },
    keyStrengths: { type: [String], default: [] },
    skillsToDevelop: { type: [String], default: [] },
    reason: { type: String, default: "" },
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
      default: "career-assessment-v3",
      required: true,
      index: true,
    },
    engineVersion: {
      type: String,
      default: "2.0.0",
    },
    answers: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    stage1Answers: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    stage2Answers: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    domainScores: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    topDomains: {
      type: [String],
      default: [],
    },
    servedQuestionIds: {
      type: [String],
      default: [],
    },
    isBlended: {
      type: Boolean,
      default: false,
    },
    bankVersion: {
      type: String,
      default: null,
    },
    model: {
      type: String,
      default: null,
    },
    promptVersion: {
      type: String,
      default: null,
    },
    fallbackReason: {
      type: String,
      default: null,
    },
    signal: {
      level: {
        type: String,
        enum: ["clear", "mixed", "open"],
        default: "mixed",
      },
    },
    tie: {
      isTie: { type: Boolean, default: false },
      gap: { type: Number, default: 0 },
      slugs: { type: [String], default: [] },
    },
    picks: [
      {
        rank: { type: Number, required: true },
        overallRank: { type: Number },
        slug: { type: String, required: true },
        title: { type: String, required: true },
        domain: { type: String, required: true },
        matchPct: { type: Number, required: true },
        kind: { type: String, enum: ["core", "explore", "wildcard"], required: true },
        roadmapUrl: { type: String, default: "" },
        whyMatch: { type: String, default: "" },
        _id: false,
      },
    ],
    shortlist: [
      {
        rank: { type: Number },
        overallRank: { type: Number },
        slug: { type: String },
        title: { type: String },
        domain: { type: String },
        matchPct: { type: Number },
        _id: false,
      },
    ],
    analysis: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    traitScores: {
      technical: { type: Number, default: 50 },
      analytical: { type: Number, default: 50 },
      creative: { type: Number, default: 50 },
      business: { type: Number, default: 50 },
      communication: { type: Number, default: 50 },
      leadership: { type: Number, default: 50 },
      research: { type: Number, default: 50 },
      people: { type: Number, default: 50 },
      structured: { type: Number, default: 50 },
      riskTaking: { type: Number, default: 50 },
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
      logicalProfile: {
        primaryStyle: { type: String, default: "" },
        reasoningStrength: { type: String, default: "" },
        decisionStrategy: { type: String, default: "" },
        cognitiveSummary: { type: String, default: "" },
      },
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
