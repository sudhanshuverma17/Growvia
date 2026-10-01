import { STAGE1_QUESTIONS } from "../config/stage1-questions.js";
import { DOMAIN_ROADMAP_MAP, QUIZ_PROFILES, DOMAIN_LABELS } from "../config/quizDomains.js";
import { scoreStage1 } from "../services/stage1Scoring.js";
import { getStage2Set } from "../services/stage2Selector.js";
import { computeCareerResult, deriveSeed } from "../services/careerEngine.js";
import { generateDeterministicAnalysis } from "../services/deterministicAnalysis.js";
import { generateCareerAnalysisV3 } from "../services/aiService.js";
import { QuizAssessment } from "../models/QuizAssessment.js";
import { Course } from "../models/Course.js";

// Set of valid Stage 1 Question IDs and Option Map
const STAGE1_MAP = new Map();
for (const q of STAGE1_QUESTIONS) {
  STAGE1_MAP.set(q.id, new Set(q.options.map((o) => o.id)));
}

/**
 * Validates Stage 1 answers dictionary.
 * Must contain all 7 questions with valid option IDs.
 */
function validateStage1Answers(answers) {
  if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
    return { valid: false, code: "INVALID_STAGE1_FORMAT", error: "stage1Answers must be a key-value object." };
  }
  const answerKeys = Object.keys(answers);
  if (answerKeys.length !== STAGE1_QUESTIONS.length) {
    return {
      valid: false,
      code: "INVALID_STAGE1_COUNT",
      error: `stage1Answers must contain exactly ${STAGE1_QUESTIONS.length} answers (received ${answerKeys.length}).`,
    };
  }
  for (const qId of STAGE1_MAP.keys()) {
    if (!answers[qId]) {
      return { valid: false, code: "MISSING_STAGE1_QUESTION", error: `Missing answer for question '${qId}'.` };
    }
    const val = answers[qId];
    if (typeof val !== "string") {
      return { valid: false, code: "INVALID_STAGE1_TYPE", error: `Answer for question '${qId}' must be a string.` };
    }
    const validOpts = STAGE1_MAP.get(qId);
    if (!validOpts.has(val)) {
      return {
        valid: false,
        code: "INVALID_STAGE1_OPTION",
        error: `Invalid option '${val}' for question '${qId}'.`,
      };
    }
  }
  for (const k of answerKeys) {
    if (!STAGE1_MAP.has(k)) {
      return { valid: false, code: "UNKNOWN_STAGE1_QUESTION", error: `Unknown question '${k}' in stage1Answers.` };
    }
  }
  return { valid: true };
}

/**
 * POST /api/career-quiz/v3/stage1
 *
 * Validates Stage 1 answers, computes domain affinities, and serves the sanitized
 * Stage 2 question bank for the client.
 * Stateless: stores nothing in the database.
 * Never leaks weights, target slugs, blendCore, or quizProfile data.
 */
export async function getStage1Questions(req, res) {
  try {
    const body = req.body || {};
    for (const key of Object.keys(body)) {
      if (key !== "stage1Answers") {
        return res.status(400).json({
          success: false,
          error: `Unknown field '${key}' in request body. Only 'stage1Answers' is accepted.`,
          code: "UNKNOWN_REQUEST_FIELD",
        });
      }
    }

    const { stage1Answers } = body;
    const validation = validateStage1Answers(stage1Answers);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: validation.error,
        code: validation.code,
      });
    }

    const seed = deriveSeed(stage1Answers);
    const stage1Result = scoreStage1(stage1Answers, { seed });
    const servedSet = getStage2Set(stage1Result, { seed });

    // Sanitize served questions: only return id, text, and options: [{ id, text }]
    const sanitizedQuestions = servedSet.map((q) => ({
      id: q.id,
      text: q.text,
      options: q.options.map((o) => ({
        id: o.id,
        text: o.text,
      })),
    }));

    return res.status(200).json({
      success: true,
      domainScores: stage1Result.domainScores,
      topDomains: stage1Result.topDomains,
      isBlended: stage1Result.isBlended,
      questions: sanitizedQuestions,
    });
  } catch (err) {
    console.error("[QuizV3 stage1 Error]:", err.message);
    return res.status(500).json({
      success: false,
      error: "An internal server error occurred while preparing Stage 2 questions.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

/**
 * POST /api/career-quiz/v3/submit
 *
 * Recomputes Stage 1 and Stage 2 from raw student answers, verifies exact
 * question and option identity, queries DB roadmaps, and saves assessment.
 */
export async function submitQuizV3(req, res) {
  try {
    const body = req.body || {};
    for (const key of Object.keys(body)) {
      if (key !== "stage1Answers" && key !== "stage2Answers") {
        // Ignored or rejected: we discard client-supplied fields like picks, matchPct, domainScores
      }
    }

    const { stage1Answers, stage2Answers } = body;

    // 1. Validate Stage 1 Answers
    const s1Validation = validateStage1Answers(stage1Answers);
    if (!s1Validation.valid) {
      return res.status(400).json({
        success: false,
        error: s1Validation.error,
        code: s1Validation.code,
      });
    }

    // 2. Recompute Stage 1 and the exact served set on server (never trust client)
    const seed = deriveSeed(stage1Answers);
    const stage1Result = scoreStage1(stage1Answers, { seed });
    const servedSet = getStage2Set(stage1Result, { seed });

    // 3. Validate Stage 2 Answers against the exact served set
    if (!stage2Answers || typeof stage2Answers !== "object" || Array.isArray(stage2Answers)) {
      return res.status(400).json({
        success: false,
        error: "stage2Answers must be a key-value object.",
        code: "INVALID_STAGE2_FORMAT",
      });
    }

    const servedMap = new Map();
    for (const q of servedSet) {
      servedMap.set(q.id, new Set(q.options.map((o) => o.id)));
    }

    // Check for missing served question IDs
    for (const qId of servedMap.keys()) {
      if (!stage2Answers[qId]) {
        return res.status(400).json({
          success: false,
          error: `Missing answer for served Stage 2 question '${qId}'.`,
          code: "STAGE2_MISSING_QUESTIONS",
        });
      }
    }

    // Check for extra/unserved question IDs and valid option IDs
    for (const [qId, optId] of Object.entries(stage2Answers)) {
      if (!servedMap.has(qId)) {
        return res.status(400).json({
          success: false,
          error: `stage2Answers contains unserved or unknown question ID '${qId}'.`,
          code: "STAGE2_UNSERVED_QUESTIONS",
        });
      }
      const validOptions = servedMap.get(qId);
      if (!validOptions.has(optId)) {
        return res.status(400).json({
          success: false,
          error: `Invalid option ID '${optId}' for question '${qId}'.`,
          code: "STAGE2_INVALID_OPTION",
        });
      }
    }

    // 4. Query active published roadmaps from database
    let dbRoadmaps = [];
    try {
      dbRoadmaps = await Course.find({
        quizProfile: { $ne: null },
        isPublished: { $ne: false },
      })
        .select("id title category description stats quizProfile isCustom isPublished")
        .lean();
    } catch (dbErr) {
      console.warn("[QuizV3]: Warning loading courses from DB:", dbErr.message);
    }

    // 5. Compute unified recommendations using careerEngine
    const careerResult = computeCareerResult({
      stage1Answers,
      stage2Answers,
      roadmaps: dbRoadmaps.map((c) => ({
        slug: c.id,
        title: c.title,
        ...c,
      })),
    });

    // Extract chosen answer texts for fact-grounded qualitative analysis
    const chosenAnswers = [];
    for (const q of STAGE1_QUESTIONS) {
      const optId = stage1Answers[q.id];
      const opt = q.options.find((o) => o.id === optId);
      if (opt?.text) chosenAnswers.push(opt.text);
    }
    for (const q of servedSet) {
      const optId = stage2Answers[q.id];
      const opt = q.options.find((o) => o.id === optId);
      if (opt?.text) chosenAnswers.push(opt.text);
    }

    // 6. Generate qualitative analysis (AI with deterministic fallback)
    const analysis = await generateCareerAnalysisV3({
      domainScores: careerResult.stage1.domainScores,
      picks: careerResult.picks,
      shortlist: careerResult.shortlist,
      isBlended: careerResult.stage1.isBlended,
      signal: careerResult.signal,
      chosenAnswers,
      traitScores: careerResult.traitScores,
    });

    // 7. Format picks and shortlist matching frozen v3 contract
    const formattedPicks = careerResult.picks.map((p) => ({
      rank: p.rank,
      overallRank: p.overallRank || p.rank,
      slug: p.slug,
      title: p.title,
      domain: p.domain,
      matchPct: p.matchPct,
      kind: p.kind || "core",
      roadmapUrl: `/roadmaps/${p.slug}`,
      whyMatch: p.whyMatch,
    }));

    const formattedAlternatives = careerResult.alternatives.map((a) => ({
      rank: a.rank,
      overallRank: a.overallRank || a.rank,
      slug: a.slug,
      title: a.title,
      domain: a.domain,
      matchPct: a.matchPct,
    }));

    const formattedShortlist = careerResult.shortlist.map((s) => ({
      rank: s.rank,
      overallRank: s.overallRank || s.rank,
      slug: s.slug,
      title: s.title,
      domain: s.domain,
      matchPct: s.matchPct,
    }));

    // 8. Attempt database persistence
    let saved = false;
    let assessmentId = null;
    try {
      const assessmentDoc = new QuizAssessment({
        userId: req.user?._id || null,
        quizVersion: "career-assessment-v3",
        engineVersion: careerResult.engineVersion || "2.0.0",
        bankVersion: careerResult.bankVersion || null,
        model: analysis.model || null,
        promptVersion: analysis.promptVersion || "3.0.0",
        fallbackReason: analysis.fallbackReason || null,
        signal: careerResult.signal || { level: "mixed" },
        stage1Answers,
        stage2Answers,
        domainScores: careerResult.stage1.domainScores,
        topDomains: careerResult.stage1.topDomains,
        servedQuestionIds: careerResult.stage2.servedQuestionIds,
        isBlended: careerResult.stage1.isBlended,
        tie: careerResult.tie,
        picks: formattedPicks,
        shortlist: formattedShortlist,
        traitScores: careerResult.traitScores,
        analysis,
      });

      const savedDoc = await assessmentDoc.save();
      saved = true;
      assessmentId = savedDoc._id.toString();
    } catch (saveErr) {
      console.error("[QuizV3]: DB persistence error (proceeding with saved=false):", saveErr.message);
      saved = false;
    }

    // 9. Respond with frozen v3 payload contract
    return res.status(200).json({
      quizVersion: "career-assessment-v3",
      saved,
      assessmentId,
      isBlended: careerResult.stage1.isBlended,
      signal: careerResult.signal,
      bankVersion: careerResult.bankVersion,
      domainScores: careerResult.stage1.domainScores,
      topDomains: careerResult.stage1.topDomains,
      picks: formattedPicks,
      tie: careerResult.tie,
      alternatives: formattedAlternatives,
      traitScores: careerResult.traitScores,
      analysis,
    });
  } catch (err) {
    console.error("[QuizV3 submit Error]:", err.message);
    return res.status(500).json({
      success: false,
      error: "An internal server error occurred while processing your career assessment.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

/**
 * GET /api/career-quiz/latest
 *
 * Strictly scoped to authenticated student.
 * Returns stored v3 or legacy v2 assessment directly without recomputing.
 */
export async function getLatestAssessmentV3(req, res) {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required to view your latest assessment.",
        code: "UNAUTHORIZED",
      });
    }

    const doc = await QuizAssessment.findOne({ userId })
      .sort({ createdAt: -1 })
      .lean();

    if (!doc) {
      return res.status(404).json({
        success: false,
        error: "No assessment found for this user.",
        code: "ASSESSMENT_NOT_FOUND",
      });
    }

    // If assessment is already v3: return stored result directly (never recompute)
    if (doc.quizVersion === "career-assessment-v3") {
      return res.status(200).json({
        quizVersion: doc.quizVersion,
        saved: true,
        assessmentId: doc._id.toString(),
        isBlended: doc.isBlended || false,
        signal: doc.signal || { level: "mixed" },
        bankVersion: doc.bankVersion || null,
        domainScores: doc.domainScores || {},
        topDomains: doc.topDomains || [],
        picks: doc.picks || [],
        tie: doc.tie || { isTie: false, slugs: [] },
        alternatives: doc.shortlist?.slice(doc.picks?.length || 4) || [],
        traitScores: doc.traitScores || {},
        analysis: doc.analysis || {},
      });
    }

    // If legacy v2 assessment: map into v3 contract with legacy: true
    const legacyRecs = doc.topRecommendations || doc.careerScores || [];
    const mappedPicks = legacyRecs.slice(0, 5).map((r, idx) => ({
      rank: idx + 1,
      slug: r.roadmapId || r.id || r.careerId || `career-${idx + 1}`,
      title: r.title || r.name || "Career Match",
      domain: r.category || r.family || "General",
      matchPct: r.matchPercentage || Math.round((r.score || 0.8) * 100) || 75,
      kind: idx < 3 ? "core" : idx === 3 ? "explore" : "wildcard",
      roadmapUrl: r.roadmapUrl || `/roadmaps/${r.roadmapId || r.id || ""}`,
      whyMatch: r.reason || "Legacy recommendation.",
    }));

    return res.status(200).json({
      quizVersion: doc.quizVersion || "career-assessment-v2",
      legacy: true,
      saved: true,
      assessmentId: doc._id.toString(),
      isBlended: false,
      domainScores: {},
      topDomains: mappedPicks.slice(0, 2).map((p) => p.domain),
      picks: mappedPicks,
      tie: { isTie: false, slugs: [] },
      alternatives: [],
      traitScores: doc.traitScores || {},
      analysis: {
        source: "legacy",
        logicalProfile: doc.aiAnalysis?.logicalProfile || {},
        summary: doc.aiAnalysis?.summary || "Legacy assessment report.",
        strengths: doc.aiAnalysis?.strengths || [],
        developmentAreas: doc.aiAnalysis?.developmentAreas || [],
        nextSteps: doc.aiAnalysis?.nextSteps || [],
      },
    });
  } catch (err) {
    console.error("[QuizV3 getLatest Error]:", err.message);
    return res.status(500).json({
      success: false,
      error: "An internal server error occurred while retrieving your latest assessment.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}
