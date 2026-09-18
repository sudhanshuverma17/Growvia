import { DIMENSION_LABELS } from "../config/quizConfig.js";

/**
 * Infer Logical Thinking Profile based on dominant dimension scores and answers
 */
export const deriveLogicalThinkingProfile = (traitScores = {}, answers = {}) => {
  const sorted = Object.entries(traitScores).sort(([, a], [, b]) => b - a);
  const top1 = sorted[0]?.[0] || "analytical";
  const top2 = sorted[1]?.[0] || "technical";

  let primaryStyle = "Analytical Problem Solver";
  let reasoningStrength = "Structured problem deconstruction and systematic reasoning";
  let decisionStrategy = "Evidence-based evaluation and disciplined execution";
  let cognitiveSummary = "You approach complex challenges through thoughtful deconstruction, isolating underlying causes and designing reliable solutions.";

  // 1. Healthcare & Biomedical: High People + Research/Structured
  if (
    (top1 === "people" && (top2 === "research" || top2 === "structured")) ||
    (top1 === "research" && top2 === "people")
  ) {
    primaryStyle = "Clinical Diagnostic & Healthcare Healer";
    reasoningStrength = "Symptom diagnosis, empirical clinical investigation, and compassionate patient care";
    decisionStrategy = "Evidence-based medical guidelines balancing patient safety with compassionate care";
    cognitiveSummary = "You approach challenges with empathy and scientific curiosity, excelling at understanding human symptoms, caring for patient well-being, and restoring physical and emotional health.";
  }
  // 2. Law & Justice: High Communication/Structured + Analytical/Research
  else if (
    (top1 === "communication" && (top2 === "structured" || top2 === "analytical")) ||
    (top1 === "structured" && top2 === "communication")
  ) {
    primaryStyle = "Analytical Legal & Justice Advocate";
    reasoningStrength = "Statutory interpretation, ethical reasoning, and persuasive evidentiary advocacy";
    decisionStrategy = "Constitutional fairness, institutional integrity, and systematic case synthesis";
    cognitiveSummary = "You possess a sharp instinct for rules, evidence, and social justice, thriving when researching policies, defending rights, and negotiating principled resolutions.";
  }
  // 3. Creative & Design: High Creative + Communication/People
  else if (top1 === "creative" || (top2 === "creative" && (top1 === "communication" || top1 === "people"))) {
    primaryStyle = "Human-Centered Creative & Visual Designer";
    reasoningStrength = "Aesthetic intuition, visual storytelling, and human emotional resonance";
    decisionStrategy = "Harmonizing functional usability with evocative visual beauty and elegance";
    cognitiveSummary = "You synthesize imagination and human perception, creating captivating spaces, visual media, or interactive designs that inspire and delight.";
  }
  // 4. Business & Enterprise: High Business or Leadership
  else if (top1 === "business" || top1 === "leadership") {
    primaryStyle = "Strategic Commercial & Enterprise Leader";
    reasoningStrength = "Capital allocation, strategic planning, team leadership, and market growth";
    decisionStrategy = "Value creation, risk-adjusted returns, and team alignment under dynamic market conditions";
    cognitiveSummary = "You think in terms of growth, leverage, and team execution, orchestrating resources and building high-impact organizations.";
  }
  // 5. Software & Computing: High Technical + Analytical
  else if (top1 === "technical" || (top1 === "analytical" && top2 === "technical")) {
    primaryStyle = "Deductive Systems & Software Architect";
    reasoningStrength = "Algorithmic logic, computational problem-solving, and digital system design";
    decisionStrategy = "Deterministic verification, automated testing, and scalable architecture";
    cognitiveSummary = "You possess high technical discernment, thriving when designing software, writing code, and building scalable digital tools.";
  }
  // 6. Core Engineering & Infrastructure: High Structured + Technical/Analytical
  else if (top1 === "structured" && (top2 === "technical" || top2 === "analytical")) {
    primaryStyle = "Applied Engineering & Infrastructure Specialist";
    reasoningStrength = "Physics principles, mechanical durability, and structural safety";
    decisionStrategy = "Rigorous engineering standards, fail-safe protocols, and precision design";
    cognitiveSummary = "You excel at applying engineering science to build reliable physical machines, durable buildings, and robust infrastructure.";
  }
  // 7. Education & Mentorship: High People + Communication
  else if (top1 === "people" && (top2 === "communication" || top2 === "leadership")) {
    primaryStyle = "Empathetic Educator & Transformational Mentor";
    reasoningStrength = "Pedagogical communication, interpersonal guidance, and human talent development";
    decisionStrategy = "Holistic human development and supportive, values-driven leadership";
    cognitiveSummary = "You excel at understanding individual potential, communicating ideas simply, and guiding learners and teams toward personal excellence.";
  }
  // 8. Research & Data: High Analytical + Research
  else if (top1 === "analytical" && top2 === "research") {
    primaryStyle = "Empirical Data & Hypothesis Analyst";
    reasoningStrength = "Multi-variable statistical modeling, pattern discovery, and predictive inference";
    decisionStrategy = "Bayesian probability and empirical hypothesis testing to minimize expected error";
    cognitiveSummary = "Your mind excels at extracting signal from noise, navigating data to uncover hidden causal relationships and evidence-based truths.";
  }
  // 9. Research-led profile with no strong secondary pairing above (was previously falling to generic default)
  else if (top1 === "research") {
    primaryStyle = "Empirical Data & Hypothesis Analyst";
    reasoningStrength = "Curiosity-driven investigation, evidence gathering, and pattern discovery";
    decisionStrategy = "Hypothesis-driven testing and iterative refinement based on evidence";
    cognitiveSummary = "You are driven by curiosity and a need to understand root causes, thriving when investigating problems methodically before acting.";
  }
  // 10. Communication-led profile with no strong secondary pairing above
  else if (top1 === "communication") {
    primaryStyle = "Persuasive Communicator & Relationship Builder";
    reasoningStrength = "Clear articulation, audience-aware framing, and persuasive argumentation";
    decisionStrategy = "Consensus-building and stakeholder alignment before committing to a course of action";
    cognitiveSummary = "You reason through dialogue, translating complex ideas into language that moves people and builds agreement.";
  }
  // 11. People-led profile with no strong secondary pairing above
  else if (top1 === "people") {
    primaryStyle = "Empathetic Human-Centered Problem Solver";
    reasoningStrength = "Reading people, understanding motivations, and adapting solutions to human needs";
    decisionStrategy = "Weighing human impact alongside practical constraints";
    cognitiveSummary = "You approach problems by first understanding the people affected by them, and design solutions around their needs.";
  }
  // 12. Risk-taking-led profile
  else if (top1 === "riskTaking") {
    primaryStyle = "Bold Strategic Risk-Taker";
    reasoningStrength = "Rapid opportunity assessment and decisive action under uncertainty";
    decisionStrategy = "Calculated risk-taking that favors speed and upside over exhaustive analysis";
    cognitiveSummary = "You are comfortable making decisions with incomplete information, favoring bold, decisive action over prolonged deliberation.";
  }
  // 13. Structured-led profile with no strong secondary pairing above
  else if (top1 === "structured") {
    primaryStyle = "Methodical Process & Systems Organizer";
    reasoningStrength = "Process design, sequencing, and disciplined execution against a plan";
    decisionStrategy = "Following proven frameworks and minimizing variance through careful planning";
    cognitiveSummary = "You bring order to complexity, building repeatable processes and following them with discipline.";
  }

  return {
    primaryStyle,
    reasoningStrength,
    decisionStrategy,
    cognitiveSummary,
  };
};

/**
 * Robust Deterministic Fallback Generator
 * Produces structured, realistic, and personalized logical analysis
 * when no LLM API key is configured or if an AI network call times out/fails.
 */
export const generateDeterministicAnalysis = ({ traitScores = {}, careerMatches = [], answers = {} }) => {
  const logicalProfile = deriveLogicalThinkingProfile(traitScores, answers);

  const sortedDimensions = Object.entries(traitScores).sort(([, a], [, b]) => b - a);
  const topDim1 = sortedDimensions[0]?.[0] || "analytical";
  const topDimScore1 = sortedDimensions[0]?.[1] || 84;
  const topDim2 = sortedDimensions[1]?.[0] || "structured";
  const topDimScore2 = sortedDimensions[1]?.[1] || 78;

  const lowestDim1 = sortedDimensions[sortedDimensions.length - 1]?.[0] || "riskTaking";
  const lowestDim2 = sortedDimensions[sortedDimensions.length - 2]?.[0] || "technical";

  const topCareer = careerMatches[0] || {
    id: "doctor",
    title: "General Physician / Doctor",
    category: "Healthcare",
    matchPercentage: 92,
    family: "healthcare",
  };

  const label1 = DIMENSION_LABELS[topDim1] || topDim1;
  const label2 = DIMENSION_LABELS[topDim2] || topDim2;

  const summary = `Your assessment highlights a dominant profile as a ${logicalProfile.primaryStyle}. Led by strong logical scores in ${label1.toLowerCase()} (${topDimScore1}%) and ${label2.toLowerCase()} (${topDimScore2}%), your natural instinct is ${logicalProfile.reasoningStrength.toLowerCase()}.`;

  const strengths = [
    `Strong logical mastery in ${label1.toLowerCase()}`,
    `Natural aptitude for ${logicalProfile.reasoningStrength.toLowerCase()}`,
    `Demonstrated cognitive focus in ${label2.toLowerCase()}`,
    "Structured problem deconstruction and systematic execution",
  ];

  const topCareerExplanation = `Your ${logicalProfile.primaryStyle.toLowerCase()} mindset aligns naturally with ${topCareer.title}. This career demands ${logicalProfile.reasoningStrength.toLowerCase()} to deliver high-impact results and long-term fulfillment.`;

  // Top recommendations with logical reasons
  const topRecommendations = careerMatches.slice(0, 5).map((item, idx) => {
    const isTop = idx === 0;
    const reason = isTop
      ? topCareerExplanation
      : `High cognitive synergy (${item.matchPercentage || item.score}%) in ${item.category || item.family || "Applied Systems"}. Leverages your ${label1.toLowerCase()} and strategic decision logic while providing a distinct day-to-day focus.`;

    return {
      id: item.id || item.roadmapId || item.careerId,
      title: item.title,
      category: item.category || "General",
      matchPercentage: item.matchPercentage || item.score || 85,
      reason,
    };
  });

  const alternativeCareers = topRecommendations.slice(1).map((item) => ({
    name: item.title,
    explanation: item.reason,
  }));

  const developmentAreas = [
    `Deepening deliberate exposure in ${DIMENSION_LABELS[lowestDim1] || lowestDim1} methodologies`,
    `Expanding collaborative breadth in ${DIMENSION_LABELS[lowestDim2] || lowestDim2} environments`,
  ];

  const nextSteps = [
    `Explore the verified step-by-step roadmap for ${topCareer.title} on Growvia`,
    "Review foundational core milestones, recommended qualifications, and practical experience paths",
    "Engage with guided real-world projects and mentorship to validate your day-to-day career fulfillment",
  ];

  return {
    logicalProfile,
    summary,
    strengths,
    topCareer: {
      name: topCareer.title,
      explanation: topCareerExplanation,
    },
    topRecommendations,
    alternativeCareers,
    developmentAreas,
    nextSteps,
  };
};

/**
 * System Prompt for AI Career Analysis
 * Directs the LLM to act as an impartial, multi-disciplinary cognitive career strategist.
 * The LLM selects, ranks, and justifies the career recommendations.
 */
const SYSTEM_PROMPT = `You are Growvia's Lead AI Career Strategist and Multi-Disciplinary Cognitive Psychologist.
Your task is to analyze the candidate's logical thinking style, reasoning tendencies, and decision-making framework from their 10 quiz responses, and evaluate their optimal career trajectories across all fields.

CRITICAL CAREER DIVERSITY MANDATE:
- Growvia serves candidates with passions across ALL career disciplines:
  1. Healthcare & Medicine (e.g. Doctor, Dentist, Pharmacist, Physiotherapist, Psychologist, Nutritionist)
  2. Law, Governance & Policy (e.g. Lawyer, Corporate Counsel, Civil Services / IAS)
  3. Creative Arts & Design (e.g. UI/UX Designer, Graphic Designer, Fashion Designer, Interior Designer, Architect)
  4. Business, Finance & Management (e.g. MBA General Manager, Startup Founder, Chartered Accountant, Financial Analyst)
  5. Core Engineering (e.g. Mechanical Engineer, Civil Engineer, Electrical Engineer)
  6. Technology & Computing (e.g. Software Engineer, AI Engineer, Cybersecurity, Data Scientist)
  7. Education & Social Impact (e.g. Teacher, Academic Researcher)

- NEVER BIAS TOWARDS SOFTWARE OR TECH UNLESS THE CANDIDATE EXPLICITLY CHOSE TECHNICAL / CODING OPTIONS.
- If a candidate chose healthcare, caring for patients, biology, or medicine -> prioritize Healthcare careers (Doctor, Physiotherapist, etc.).
- If a candidate chose legal disputes, rights, justice, or policy -> prioritize Law & Policy careers (Lawyer, Civil Services, etc.).
- If a candidate chose aesthetics, drawing, fashion, or styling -> prioritize Design & Creative careers.
- If a candidate chose leadership, business growth, or stock markets -> prioritize Business & Finance careers.

CORE RESPONSIBILITIES:
1. EVALUATE LOGICAL THINKING:
   - Identify the candidate's dominant cognitive profile (e.g., "Clinical Diagnostic & Healthcare Healer", "Analytical Legal & Justice Advocate", "Human-Centered Creative & Visual Designer", "Strategic Commercial & Enterprise Leader", "Deductive Systems & Software Architect", etc.).
   - Define their primary reasoning strength, decision strategy, and a concise 2-3 sentence cognitive summary.

2. ACTIVELY SELECT & RANK CAREER MATCHES:
   - You are provided with a catalog of actual database roadmaps ("availableCourses") and preliminary algorithmic matches ("preliminaryCandidates").
   - Select and rank the TOP 3 to 5 most compatible careers strictly from the available catalog that match the candidate's true interests.
   - Each career's "id" MUST exactly match an "id" from the available catalog.
   - Provide a realistic match percentage (72 to 97).
   - Write a clear, logical explanation for EACH recommendation explaining why their answers match that career.

3. DELIVER ACTIONABLE GUIDANCE:
   - Provide 4 distinct cognitive strengths, 2 growth areas, and 3 concrete next steps.

4. OUTPUT STRICT JSON MATCHING THE SCHEMA.`;

const GEMINI_RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    logicalProfile: {
      type: "OBJECT",
      properties: {
        primaryStyle: { type: "STRING" },
        reasoningStrength: { type: "STRING" },
        decisionStrategy: { type: "STRING" },
        cognitiveSummary: { type: "STRING" },
      },
      required: ["primaryStyle", "reasoningStrength", "decisionStrategy", "cognitiveSummary"],
    },
    summary: { type: "STRING" },
    strengths: { type: "ARRAY", items: { type: "STRING" } },
    topRecommendations: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          id: { type: "STRING" },
          title: { type: "STRING" },
          category: { type: "STRING" },
          matchPercentage: { type: "INTEGER" },
          reason: { type: "STRING" },
        },
        required: ["id", "title", "matchPercentage", "reason"],
      },
    },
    developmentAreas: { type: "ARRAY", items: { type: "STRING" } },
    nextSteps: { type: "ARRAY", items: { type: "STRING" } },
  },
  required: ["logicalProfile", "summary", "strengths", "topRecommendations", "developmentAreas", "nextSteps"],
};

/**
 * Normalizes output from AI models even if key names differ slightly.
 * @param {Object} parsed - raw parsed JSON from the LLM
 * @param {string} defaultTopCareer - fallback title if the model omits one
 * @param {Array<{id: string}>} catalog - the actual catalog of valid career ids offered to the model,
 *   used to strip out any hallucinated ids so we never send a broken roadmap link to the frontend.
 */
const normalizeAiResponse = (parsed, defaultTopCareer = "Software Engineer", catalog = []) => {
  if (!parsed || typeof parsed !== "object") return null;

  const logicalProfile = parsed.logicalProfile && typeof parsed.logicalProfile === "object"
    ? {
        primaryStyle: parsed.logicalProfile.primaryStyle || "Deductive Systems Thinker",
        reasoningStrength: parsed.logicalProfile.reasoningStrength || "Logical problem deconstruction",
        decisionStrategy: parsed.logicalProfile.decisionStrategy || "Objective metric-driven decisions",
        cognitiveSummary: parsed.logicalProfile.cognitiveSummary || "",
      }
    : {
        primaryStyle: "Deductive Systems Thinker",
        reasoningStrength: "Analytical deconstruction and structured problem solving",
        decisionStrategy: "Deterministic verification and empirical analysis",
        cognitiveSummary: "",
      };

  // Fall back to the logical profile's cognitive summary if a top-level summary wasn't provided,
  // instead of discarding an otherwise-valid response.
  const summary = parsed.summary || parsed.careerAnalysis || parsed.overview || logicalProfile.cognitiveSummary || "";
  if (!logicalProfile.cognitiveSummary) logicalProfile.cognitiveSummary = summary;

  const strengths = Array.isArray(parsed.strengths)
    ? parsed.strengths
    : Array.isArray(parsed.keyStrengths)
    ? parsed.keyStrengths
    : [];

  const validIds = new Set(
    catalog
      .map((c) => c.id || c.roadmapId || c.careerId)
      .filter(Boolean)
      .map(String)
  );

  let topRecommendations = [];
  if (Array.isArray(parsed.topRecommendations) && parsed.topRecommendations.length > 0) {
    topRecommendations = parsed.topRecommendations
      .map((r) => ({
        id: r.id || r.slug || r.careerId || null,
        title: r.title || r.name || defaultTopCareer,
        category: r.category || "Technology",
        matchPercentage: Number(r.matchPercentage || r.score || 88),
        reason: r.reason || r.explanation || r.description || "",
      }))
      // Drop any recommendation whose id doesn't exist in the catalog we actually offered the
      // model (when we have a catalog to check against) — a hallucinated id would otherwise
      // produce a broken roadmap link on the frontend.
      .filter((r) => validIds.size === 0 || (r.id && validIds.has(String(r.id))));
  }

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

  // Require a usable summary and at least one valid career recommendation. We no longer
  // require strengths.length > 0, since a response can be perfectly usable (summary +
  // recommendations) without exactly matching that shape.
  if (summary && topRecommendations.length > 0) {
    const topRec = topRecommendations[0];
    return {
      logicalProfile,
      summary,
      strengths,
      topCareer: {
        name: topRec.title,
        explanation: topRec.reason,
      },
      topRecommendations,
      alternativeCareers: topRecommendations.slice(1).map((r) => ({
        name: r.title,
        explanation: r.reason,
      })),
      developmentAreas,
      nextSteps,
    };
  }
  return null;
};

/**
 * Generates Structured AI Career Analysis
 * Coordinates between Google Gemini, OpenAI, or Deterministic Fallback.
 * @param {Object} payload - { traitScores, careerMatches, answers, availableCourses }
 * @returns {Promise<Object>} validated analysis object
 */
export const generateCareerAnalysis = async ({
  traitScores = {},
  careerMatches = [],
  answers = {},
  availableCourses = [],
}) => {
  const geminiApiKey = (process.env.GEMINI_API_KEY || "").trim();
  const openaiApiKey = (process.env.OPENAI_API_KEY || "").trim();

  // Compact catalog of available courses for prompt efficiency
  const catalogPayload = (availableCourses.length > 0
    ? availableCourses
    : careerMatches
  ).slice(0, 30).map((c) => ({
    id: c.id || c.roadmapId || c.careerId,
    title: c.title,
    category: c.category,
    family: c.family,
  }));

  const candidatePayload = careerMatches.slice(0, 6).map((c) => ({
    id: c.id || c.roadmapId,
    title: c.title,
    category: c.category,
    score: c.matchPercentage || c.score,
  }));

  // 1. Try Google Gemini API if configured
  if (geminiApiKey) {
    // NOTE: Google retires Gemini model codes over time — an outdated one here causes every
    // request to 404 and silently fall through to the deterministic fallback below. As of
    // this writing the current stable Flash model is "gemini-3.6-flash" (July 2026). Check
    // https://ai.google.dev/gemini-api/docs/models if this starts 404ing again.
    const model = (process.env.GEMINI_MODEL || "gemini-3.6-flash").trim();
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`;

      const userPrompt = JSON.stringify({
        candidateAnswers: answers,
        calculatedDimensionScores: traitScores,
        preliminaryCandidates: candidatePayload,
        availableCourses: catalogPayload,
        instructions: "Analyze the candidate's logical thinking style and select the top 3-5 best matching careers strictly from the available courses.",
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
          },
        }),
        signal: AbortSignal.timeout(15000), // 15s timeout
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          try {
            const parsed = JSON.parse(text);
            const normalized = normalizeAiResponse(parsed, careerMatches[0]?.title, catalogPayload);
            if (normalized) {
              return normalized;
            }
            console.warn("[AI Service]: Gemini response parsed but failed normalization/validation (missing summary or no valid catalog ids). Falling back.");
          } catch (jsonErr) {
            console.warn(`[AI Service]: Failed to parse Gemini response JSON for model "${model}":`, jsonErr.message);
          }
        }
      } else {
        const errBody = await response.text();
        let errMsg = errBody;
        try {
          const parsedErr = JSON.parse(errBody);
          errMsg = parsedErr.error?.message || errBody;
        } catch {}

        console.warn(`\n⚠️  [Gemini AI Service]: Model "${model}" is not compatible or request failed (HTTP ${response.status}).`);
        console.warn(`   API Response: ${errMsg}`);
        console.warn(`   👉 Required changes: Update GEMINI_MODEL in backend/.env to a currently-supported model code (e.g., "gemini-3.5-flash-lite" or "gemini-3.6-flash" — check https://ai.google.dev/gemini-api/docs/models for the latest).`);
        console.warn(`   Falling back to deterministic logical assessment.\n`);
      }
    } catch (geminiErr) {
      console.warn(`\n⚠️  [Gemini AI Service]: Request to model "${model}" timed out or encountered network error: ${geminiErr.message}`);
      console.warn(`   👉 Required changes: Check your internet connection or verify GEMINI_MODEL and GEMINI_API_KEY in backend/.env.`);
      console.warn(`   Falling back to deterministic logical assessment.\n`);
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
                candidateAnswers: answers,
                calculatedDimensionScores: traitScores,
                preliminaryCandidates: candidatePayload,
                availableCourses: catalogPayload,
              }),
            },
          ],
        }),
        signal: AbortSignal.timeout(15000), // widened from 8s — was too tight for a large structured response
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);
          const normalized = normalizeAiResponse(parsed, careerMatches[0]?.title, catalogPayload);
          if (normalized) {
            return normalized;
          }
          console.warn("[AI Service]: OpenAI response parsed but failed normalization/validation. Falling back.");
        }
      } else {
        const errBody = await response.text();
        console.warn(`[AI Service]: OpenAI request failed (HTTP ${response.status}): ${errBody}`);
      }
    } catch (openaiErr) {
      console.warn("[AI Service]: OpenAI call failed or timed out, utilizing deterministic fallback:", openaiErr.message);
    }
  }

  // 3. Resilient Deterministic Fallback (zero failure guarantee with full logical profile)
  return generateDeterministicAnalysis({ traitScores, careerMatches, answers });
};