import { TRAIT_LABELS } from "../config/quizConfig.js";

/**
 * Robust Deterministic Fallback Generator
 * Produces structured, realistic, and highly relevant career analysis
 * when no LLM API key is configured or if an AI network call times out/fails.
 */
export const generateDeterministicAnalysis = ({ traitScores, careerMatches, answers }) => {
  // Sort traits by score descending to identify strengths and development areas
  const sortedTraits = Object.entries(traitScores || {})
    .sort(([, a], [, b]) => b - a);

  const topTraitKey1 = sortedTraits[0]?.[0] || "analytical";
  const topTraitScore1 = sortedTraits[0]?.[1] || 80;
  const topTraitKey2 = sortedTraits[1]?.[0] || "technical";
  const topTraitScore2 = sortedTraits[1]?.[1] || 75;
  const topTraitKey3 = sortedTraits[2]?.[0] || "research";

  const lowestTraitKey1 = sortedTraits[sortedTraits.length - 1]?.[0] || "social";
  const lowestTraitKey2 = sortedTraits[sortedTraits.length - 2]?.[0] || "communication";

  const topCareer = careerMatches[0] || { title: "Software Engineer", score: 88, category: "Technology" };
  const secondCareer = careerMatches[1] || { title: "Data Scientist", score: 82, category: "Technology" };
  const thirdCareer = careerMatches[2] || { title: "AI/ML Engineer", score: 79, category: "Technology" };

  const traitLabel1 = TRAIT_LABELS[topTraitKey1] || topTraitKey1;
  const traitLabel2 = TRAIT_LABELS[topTraitKey2] || topTraitKey2;
  const traitLabel3 = TRAIT_LABELS[topTraitKey3] || topTraitKey3;

  const summary = `Your responses demonstrate prominent strengths in ${traitLabel1.toLowerCase()} (${topTraitScore1}%) and ${traitLabel2.toLowerCase()} (${topTraitScore2}%). You naturally gravitate toward structured problem-solving, goal clarity, and meaningful intellectual engagement.`;

  const strengths = [
    `Exceptional affinity for ${traitLabel1.toLowerCase()}`,
    `Strong capability in ${traitLabel2.toLowerCase()}`,
    `Demonstrated aptitude for ${traitLabel3.toLowerCase()}`,
    "Methodical approach to complex problem-solving",
  ];

  const topCareerExplanation = `Your strong ${traitLabel1.toLowerCase()} combined with high ${traitLabel2.toLowerCase()} aligns directly with what makes professionals thrive in ${topCareer.title}. Your responses indicate an enthusiasm for tackling multi-stage challenges, working with domain information, and delivering tangible results.`;

  const alternativeCareers = [
    {
      name: secondCareer.title,
      explanation: `Offers strong compatibility (${secondCareer.score}%) by emphasizing your ${traitLabel2.toLowerCase()} and strategic analytical capabilities.`,
    },
    {
      name: thirdCareer.title,
      explanation: `A compelling alternative (${thirdCareer.score}%) that channels your ${traitLabel3.toLowerCase()} in a fast-evolving domain.`,
    },
  ];

  const developmentAreas = [
    `Deepening deliberate practice in ${TRAIT_LABELS[lowestTraitKey1] || lowestTraitKey1}`,
    `Expanding hands-on collaborative exposure in ${TRAIT_LABELS[lowestTraitKey2] || lowestTraitKey2}`,
  ];

  const nextSteps = [
    `Explore the detailed step-by-step roadmap for ${topCareer.title} on Growvia`,
    "Identify core entrance requirements, essential technical skills, and foundational milestones",
    "Begin an introductory guided project to validate your day-to-day interest in this path",
    "Compare compensation trajectories and real-world day-in-the-life expectations",
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
 */
const SYSTEM_PROMPT = `You are Growvia's career guidance assistant.
Your job is to analyze a user's career assessment results and provide useful, realistic and personalized career guidance.
The deterministic scoring engine has already calculated the user's trait scores and career compatibility scores.
Do not ignore those scores and do not invent a completely different career recommendation.
Use the scores as the primary signal while using the user's answers to add nuance.
Do not claim that a career is guaranteed to be suitable.
Do not make decisions based on gender, race, religion, political beliefs, socioeconomic status or other sensitive personal characteristics.
Explain:
1. The user's strongest career traits.
2. Why their top career matches fit those traits.
3. What makes the top career especially suitable.
4. What alternative careers they should explore.
5. Any potential weaknesses or gaps they should work on.
6. Practical next steps.
Be encouraging but realistic. Do not tell the user that there is only one correct career.
Return strictly a valid JSON object with keys: summary, strengths (array), topCareer (object with name, explanation), alternativeCareers (array of {name, explanation}), developmentAreas (array), nextSteps (array).`;

/**
 * Generates Structured AI Career Analysis
 * Coordinates between Google Gemini, OpenAI, or Deterministic Fallback.
 * @param {Object} payload - { traitScores, careerMatches, answers }
 * @returns {Promise<Object>} validated analysis object
 */
export const generateCareerAnalysis = async ({ traitScores, careerMatches, answers }) => {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const openaiApiKey = process.env.OPENAI_API_KEY;

  // 1. Try Google Gemini API if configured
  if (geminiApiKey) {
    try {
      const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`;

      const userContent = JSON.stringify({
        traitScores,
        careerMatches: careerMatches.slice(0, 3).map((c) => ({
          career: c.title,
          category: c.category,
          score: c.score,
        })),
        answers,
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
              parts: [{ text: `User Assessment Data: ${userContent}\nPlease output strictly valid JSON according to instructions.` }],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.3,
          },
        }),
        signal: AbortSignal.timeout(8000), // 8s timeout
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = JSON.parse(text);
          if (parsed.summary && parsed.topCareer && Array.isArray(parsed.strengths)) {
            return parsed;
          }
        }
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
                traitScores,
                careerMatches: careerMatches.slice(0, 3),
                answers,
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
