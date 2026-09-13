import { DIMENSION_LABELS } from "../config/quizConfig.js";

/**
 * Robust Deterministic Fallback Generator
 * Produces structured, realistic, and personalized career analysis
 * when no LLM API key is configured or if an AI network call times out/fails.
 */
export const generateDeterministicAnalysis = ({ traitScores = {}, careerMatches = [], answers = {} }) => {
  // Sort dimensions by score descending to identify user strengths
  const sortedDimensions = Object.entries(traitScores)
    .sort(([, a], [, b]) => b - a);

  const topDim1 = sortedDimensions[0]?.[0] || "analytical";
  const topDimScore1 = sortedDimensions[0]?.[1] || 82;
  const topDim2 = sortedDimensions[1]?.[0] || "technical";
  const topDimScore2 = sortedDimensions[1]?.[1] || 76;
  const topDim3 = sortedDimensions[2]?.[0] || "creative";

  const lowestDim1 = sortedDimensions[sortedDimensions.length - 1]?.[0] || "structured";
  const lowestDim2 = sortedDimensions[sortedDimensions.length - 2]?.[0] || "riskTaking";

  const topCareer = careerMatches[0] || { title: "Software Engineer", matchPercentage: 88, family: "technology" };
  const label1 = DIMENSION_LABELS[topDim1] || topDim1;
  const label2 = DIMENSION_LABELS[topDim2] || topDim2;
  const label3 = DIMENSION_LABELS[topDim3] || topDim3;

  const summary = `Your career profile is led by prominent strengths in ${label1.toLowerCase()} (${topDimScore1}%) and ${label2.toLowerCase()} (${topDimScore2}%). You thrive when applying disciplined problem-solving and structured methodology toward high-value, tangible outcomes.`;

  const strengths = [
    `Exceptional capability in ${label1.toLowerCase()}`,
    `Strong orientation toward ${label2.toLowerCase()}`,
    `Demonstrated aptitude in ${label3.toLowerCase()}`,
    "Methodical approach to complex, multi-stage problem solving",
  ];

  const topCareerExplanation = `Your strong ${label1.toLowerCase()} and high ${label2.toLowerCase()} create a natural fit for ${topCareer.title}. Professionals in this domain excel by synthesizing analytical clarity with practical execution to achieve tangible impact.`;

  // Provide explanations for all remaining recommendations (2 to 5)
  const alternativeCareers = careerMatches.slice(1).map((item) => ({
    name: item.title,
    explanation: `Offers strong compatibility (${item.matchPercentage || item.score}%) in the ${item.family || item.category || "applied"} family, leveraging your ${label2.toLowerCase()} while offering a distinct day-to-day focus.`,
  }));

  const developmentAreas = [
    `Deepening deliberate exposure in ${DIMENSION_LABELS[lowestDim1] || lowestDim1}`,
    `Refining strategic collaboration and workflows in ${DIMENSION_LABELS[lowestDim2] || lowestDim2}`,
  ];

  const nextSteps = [
    `Explore the detailed step-by-step roadmap for ${topCareer.title} on Growvia`,
    "Review foundational milestones, essential toolings, and entrance pathways",
    "Engage with guided hands-on practice projects to validate your day-to-day enjoyment",
    "Explore adjacent diverse recommendations to see which specialization best aligns with your goals",
  ];

  return {
    summary,
    strengths,
    topCareer: {
      name: topCareer.title,
      explanation: topCareerExplanation,
    },
    alternativeCareers,
    developmentAreas,
    nextSteps,
  };
};

/**
 * System Prompt for AI Career Analysis
 * Strictly enforces that the LLM NEVER changes or reorders the deterministic recommendations.
 */
const SYSTEM_PROMPT = `You are Growvia's expert career guidance psychologist.
Your job is to provide personalized, qualitative analysis based on the user's pre-calculated career assessment.
CRITICAL RULES:
1. The deterministic recommendation engine has ALREADY calculated the user's top 3–5 career recommendations and match scores.
2. DO NOT change the ranking order of the careers.
3. DO NOT invent or substitute different careers.
4. Explain WHY each calculated career matches the user's specific dimension profile.
5. Highlight the user's key strengths and practical skills they should develop.
6. Provide concrete, actionable next steps.
7. Return strictly a valid JSON object matching the requested schema.`;

const GEMINI_RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    summary: { type: "STRING" },
    strengths: { type: "ARRAY", items: { type: "STRING" } },
    topCareer: {
      type: "OBJECT",
      properties: {
        name: { type: "STRING" },
        explanation: { type: "STRING" },
      },
      required: ["name", "explanation"],
    },
    alternativeCareers: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          name: { type: "STRING" },
          explanation: { type: "STRING" },
        },
        required: ["name", "explanation"],
      },
    },
    developmentAreas: { type: "ARRAY", items: { type: "STRING" } },
    nextSteps: { type: "ARRAY", items: { type: "STRING" } },
  },
  required: ["summary", "strengths", "topCareer", "alternativeCareers", "developmentAreas", "nextSteps"],
};

/**
 * Normalizes output from AI models even if key names differ slightly
 */
const normalizeAiResponse = (parsed, defaultTopCareer = "Software Engineer") => {
  if (!parsed || typeof parsed !== "object") return null;

  const summary = parsed.summary || parsed.careerAnalysis || parsed.overview || "";
  const strengths = Array.isArray(parsed.strengths)
    ? parsed.strengths
    : Array.isArray(parsed.keyStrengths)
    ? parsed.keyStrengths
    : [];

  let topCareer = null;
  if (parsed.topCareer && typeof parsed.topCareer === "object") {
    topCareer = {
      name: parsed.topCareer.name || parsed.topCareer.title || defaultTopCareer,
      explanation: parsed.topCareer.explanation || parsed.topCareer.description || "",
    };
  } else if (typeof parsed.topCareer === "string") {
    topCareer = { name: parsed.topCareer, explanation: summary };
  }

  const alternativeCareers = Array.isArray(parsed.alternativeCareers)
    ? parsed.alternativeCareers.map((c) => ({
        name: c.name || c.title || "",
        explanation: c.explanation || c.description || "",
      }))
    : [];

  const developmentAreas = Array.isArray(parsed.developmentAreas)
    ? parsed.developmentAreas
    : Array.isArray(parsed.growthAreas)
    ? parsed.growthAreas
    : [];

  const nextSteps = Array.isArray(parsed.nextSteps)
    ? parsed.nextSteps
    : Array.isArray(parsed.actionableNextSteps)
    ? parsed.actionableNextSteps
    : [];

  if (summary && topCareer && strengths.length > 0) {
    return {
      summary,
      strengths,
      topCareer,
      alternativeCareers,
      developmentAreas,
      nextSteps,
    };
  }
  return null;
};

/**
 * Generates Structured AI Career Analysis
 * Coordinates between Google Gemini, OpenAI, or Deterministic Fallback.
 * @param {Object} payload - { traitScores, careerMatches, answers }
 * @returns {Promise<Object>} validated analysis object
 */
export const generateCareerAnalysis = async ({ traitScores = {}, careerMatches = [], answers = {} }) => {
  const geminiApiKey = (process.env.GEMINI_API_KEY || "").trim();
  const openaiApiKey = (process.env.OPENAI_API_KEY || "").trim();

  const candidatePayload = careerMatches.map((c) => ({
    title: c.title,
    category: c.category,
    family: c.family,
    score: c.matchPercentage || c.score,
  }));

  // 1. Try Google Gemini API if configured
  if (geminiApiKey) {
    try {
      const model = process.env.GEMINI_MODEL || "gemini-3.5-flash";
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`;

      const userPrompt = JSON.stringify({
        userDimensionScores: traitScores,
        deterministicRecommendations: candidatePayload,
        instructions: "Explain why these specific careers fit the user's profile and provide constructive strengths and growth areas.",
      });

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: [
            {
              role: "user",
              parts: [{ text: userPrompt }],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: GEMINI_RESPONSE_SCHEMA,
            temperature: 0.3,
            thinkingConfig: {
              thinkingBudget: 0,
            },
          },
        }),
        signal: AbortSignal.timeout(15000), // 15s timeout with fast thinkingBudget
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          try {
            const parsed = JSON.parse(text);
            const normalized = normalizeAiResponse(parsed, careerMatches[0]?.title);
            if (normalized) {
              return normalized;
            }
          } catch (jsonErr) {
            console.warn("[AI Service]: Failed to parse Gemini JSON:", jsonErr.message);
          }
        }
      } else {
        const errBody = await response.text();
        console.warn(`[AI Service]: Gemini returned status ${response.status}:`, errBody.slice(0, 200));
      }
    } catch (geminiErr) {
      console.warn("[AI Service]: Gemini API call failed or timed out, utilizing deterministic fallback:", geminiErr.message);
    }
  }

  // 2. Try OpenAI API if configured
  if (openaiApiKey) {
    try {
      const openaiUrl = `${process.env.OPENAI_BASE_URL || "https://api.openai.com/v1"}/chat/completions`;
      const response = await fetch(openaiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          response_format: { type: "json_object" },
          temperature: 0.3,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: JSON.stringify({
                userDimensionScores: traitScores,
                deterministicRecommendations: candidatePayload,
              }),
            },
          ],
        }),
        signal: AbortSignal.timeout(8000),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);
          if (parsed.summary && parsed.topCareer && Array.isArray(parsed.strengths)) {
            return parsed;
          }
        }
      }
    } catch (openaiErr) {
      console.warn("[AI Service]: OpenAI API call failed or timed out, utilizing deterministic fallback:", openaiErr.message);
    }
  }

  // 3. Resilient Deterministic Fallback (zero failure guarantee)
  return generateDeterministicAnalysis({ traitScores, careerMatches, answers });
};
