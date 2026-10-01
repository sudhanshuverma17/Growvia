/**
 * Deterministic Career Analysis Engine
 *
 * Synthesizes structured qualitative insights directly from the student's
 * quantitative quiz results (picks, domainScores, topDomains, traitScores).
 *
 * Adheres strictly to Step 5/6 design principles:
 * - Measures interests and preferences, NEVER ability or skills.
 * - Uses "your answers favor..." phrasing; no "you are good at" or "Technical Strength".
 * - Strengths: interest statements based on student's highest traits.
 * - Development areas: "Skills this path rewards" derived from top pick's quizProfile traits.
 * - Clean domain sentence templates (no concatenated noun-phrase grammar bugs).
 * - Multi-domain / blended archetypes when top picks span two domains.
 * - No mentions of "personalized dashboard" or "entrance exams".
 * - Fully pure: zero external network calls, zero LLMs, zero legacy engine imports.
 */

import { DOMAIN_LABELS, QUIZ_PROFILES } from "../config/quizDomains.js";

const SINGLE_ARCHETYPES = {
  tech: "Algorithmic & Systems Thinker",
  healthcare: "Clinical & Diagnostic Investigator",
  business: "Strategic Entrepreneurial Leader",
  finance: "Quantitative Risk & Capital Analyst",
  creative: "Aesthetic Visionary & Visual Architect",
  media: "Compelling Narrative Communicator",
  engineering: "Structural & Applied Problem Solver",
  law_gov: "Principled Policy & Legal Strategist",
  education_social: "Transformational Human Development Catalyst",
  aviation_hospitality: "Dynamic Operations & Service Commander",
  science: "Empirical Research Scientist",
};

const BLENDED_ARCHETYPES = {
  "tech+creative": "Interactive Experience & Digital Architect",
  "creative+tech": "Interactive Experience & Digital Architect",
  "tech+business": "Product Innovator & Systems Strategist",
  "business+tech": "Product Innovator & Systems Strategist",
  "tech+engineering": "Computational & Applied Systems Engineer",
  "engineering+tech": "Computational & Applied Systems Engineer",
  "tech+finance": "Fintech & Quantitative Systems Strategist",
  "finance+tech": "Fintech & Quantitative Systems Strategist",
  "tech+science": "Computational Data & Discovery Scientist",
  "science+tech": "Computational Data & Discovery Scientist",
  "healthcare+science": "Biomedical & Clinical Researcher",
  "science+healthcare": "Biomedical & Clinical Researcher",
  "business+finance": "Corporate Finance & Commercial Strategist",
  "finance+business": "Corporate Finance & Commercial Strategist",
  "law_gov+education_social": "Civic Advocate & Community Policy Strategist",
  "education_social+law_gov": "Civic Advocate & Community Policy Strategist",
  "media+creative": "Creative Media & Visual Storyteller",
  "creative+media": "Creative Media & Visual Storyteller",
  "engineering+aviation_hospitality": "Aerospace Operations & Technical Systems Manager",
  "aviation_hospitality+engineering": "Aerospace Operations & Technical Systems Manager",
};

const DOMAIN_SENTENCE_TEMPLATES = {
  tech: "deconstructing complex technical challenges into robust architectures and efficient software systems",
  healthcare: "clinical investigation, biological sciences, and patient-centered health problem solving",
  business: "evaluating commercial opportunities, organizational leadership, and strategic execution",
  finance: "financial modeling, capital allocation, and quantitative risk evaluation",
  creative: "visual expression, aesthetic formulation, and designing engaging human experiences",
  media: "audience-focused communication, public storytelling, and dynamic media creation",
  engineering: "physical design principles, precision mechanics, and structural systems problem solving",
  law_gov: "legal analysis, regulatory governance, and principled public policy formulation",
  education_social: "human learning, community mentorship, and long-term social impact initiatives",
  aviation_hospitality: "real-time operations, logistics coordination, and guest-centric service leadership",
  science: "empirical observation, hypothesis formulation, and structured scientific discovery",
};

const TRAIT_INTEREST_DESCRIPTIONS = {
  technical: "technological tools, code, and systems architecture",
  analytical: "structured logical reasoning and objective data interpretation",
  creative: "original creative thinking, lateral exploration, and novel aesthetic formulation",
  business: "commercial dynamics, market value creation, and organizational strategy",
  communication: "clear, persuasive verbal articulation and written storytelling",
  leadership: "coordinating initiatives, guiding teams, and driving purposeful outcomes",
  research: "sustained investigative curiosity and in-depth exploratory analysis",
  people: "interpersonal empathy, active listening, and collaborative community work",
  structured: "methodical discipline, organized frameworks, and planning",
  riskTaking: "bold exploration, agile experimentation, and embracing uncharted pathways",
};

const PATH_SKILL_REWARDS = {
  technical: "Technical Depth — building strong fluency with modern computing and digital engineering tools.",
  analytical: "Analytical Rigor — developing structured frameworks for complex data and logic problems.",
  creative: "Creative Ideation — cultivating original conceptual thinking and iterative prototyping.",
  business: "Commercial Insight — understanding cost economics, value propositions, and market execution.",
  communication: "Persuasive Articulation — presenting complex concepts with clarity and impact.",
  leadership: "Team Orchestration — organizing diverse contributors toward shared milestones.",
  research: "Investigative Methodology — verifying hypotheses through structured source examination.",
  people: "Interpersonal Collaboration — listening empathetically and harmonizing stakeholder needs.",
  structured: "Systematic Organization — tracking multi-stage deliverables with methodical discipline.",
  riskTaking: "Calculated Experimentation — testing innovative ideas and adapting swiftly from feedback.",
};

/**
 * Pure generator function for deterministic career assessment analysis.
 */
export function generateDeterministicAnalysis({
  picks = [],
  topDomains = [],
  domainScores = {},
  traitScores = {},
  isBlended = false,
  signal = { level: "mixed" },
  chosenAnswers = [],
  fallbackReason = null,
} = {}) {
  const topPick = picks[0] || {};
  const primaryDomain = topPick.domain || topDomains[0] || "tech";
  const secondaryDomain = topDomains[1] || picks[1]?.domain || null;
  const primaryLabel = DOMAIN_LABELS[primaryDomain] || primaryDomain;
  const secondaryLabel = secondaryDomain ? DOMAIN_LABELS[secondaryDomain] : null;

  // 1. Archetype selection (single vs blended/cross-domain)
  let primaryStyle = SINGLE_ARCHETYPES[primaryDomain] || "Versatile Strategic Explorer";
  if (secondaryDomain && (isBlended || picks.slice(0, 3).some((p) => p.domain === secondaryDomain))) {
    const pairKey1 = `${primaryDomain}+${secondaryDomain}`;
    const pairKey2 = `${secondaryDomain}+${primaryDomain}`;
    if (BLENDED_ARCHETYPES[pairKey1]) {
      primaryStyle = BLENDED_ARCHETYPES[pairKey1];
    } else if (BLENDED_ARCHETYPES[pairKey2]) {
      primaryStyle = BLENDED_ARCHETYPES[pairKey2];
    } else {
      primaryStyle = `${primaryStyle.split(" ")[0]} & ${
        (SINGLE_ARCHETYPES[secondaryDomain] || "Strategic Planner").split(" ")[0]
      } Specialist`;
    }
  }

  // 2. Strengths as Interest Statements
  const sortedTraits = Object.entries(traitScores).sort((a, b) => b[1] - a[1]);
  const topTraits = sortedTraits.slice(0, 2);

  const strengths = topTraits.map(([trait, score]) => {
    const traitCapitalized = trait.charAt(0).toUpperCase() + trait.slice(1);
    const desc = TRAIT_INTEREST_DESCRIPTIONS[trait] || "structured conceptual exploration";
    return `${traitCapitalized} Interest (${score}/100): Your answers favor ${desc}.`;
  });

  if (topPick.title) {
    strengths.push(
      `Strong Contextual Affinity for ${topPick.title}: Your quiz preferences align naturally with this pathway (${topPick.matchPct}% match).`
    );
  }

  // 3. Exactly 3 interest themes
  const trait1 = topTraits[0]?.[0] || "analytical";
  const trait2 = topTraits[1]?.[0] || "technical";
  const trait3 = sortedTraits[2]?.[0] || "structured";
  const t1Cap = trait1.charAt(0).toUpperCase() + trait1.slice(1);
  const t2Cap = trait2.charAt(0).toUpperCase() + trait2.slice(1);
  const t3Cap = trait3.charAt(0).toUpperCase() + trait3.slice(1);

  const interestThemes = [
    `${t1Cap} Inquiry & ${primaryLabel} Focus`,
    `${t2Cap} Methodology & Structured Problem Exploration`,
    secondaryLabel
      ? `Cross-disciplinary curiosity connecting ${primaryLabel} and ${secondaryLabel}`
      : `${t3Cap} Engagement in Applied ${primaryLabel} Scenarios`,
  ];

  // 4. Per-pick rationales fact-grounded in candidate evidence
  const pickRationales = picks.map((p) => {
    let reason = p.whyMatch || `Natural compatibility with ${primaryLabel}.`;
    if (p.evidence && p.evidence.length > 0) {
      const cleanEvidence = p.evidence[0].replace(/[.]+$/, "");
      reason += ` Your preference for "${cleanEvidence}" reflects core day-to-day engagement in this pathway.`;
    }
    return {
      slug: p.slug,
      reason,
    };
  });

  // 5. Exactly 2 development areas derived from the top pick's path rewards
  const pickProfile = QUIZ_PROFILES[topPick.slug] || {};
  const pickTraits = pickProfile.traits || {};
  const topPathTraits = Object.entries(pickTraits)
    .sort((a, b) => b[1] - a[1])
    .map(([t]) => t);

  const devTraits = topPathTraits.slice(0, 2);
  const developmentAreas = devTraits.map((t) => {
    return PATH_SKILL_REWARDS[t] || "Targeted practice and foundational milestone engagement.";
  });

  // Ensure exactly 2 development areas
  while (developmentAreas.length < 2) {
    developmentAreas.push("Continuous Skill Development — practicing core techniques through practical hands-on exercises.");
  }

  // 6. Exactly 3 actionable next steps (no banned phrases, no exams/dashboard)
  const nextSteps = [
    `Explore foundational milestones for ${topPick.title || "your top match"} on the Growvia interactive roadmap.`,
    `Undertake a targeted beginner-friendly project that connects ${primaryLabel} with practical applications.`,
    `Review the core day-to-day workflow and tools highlighted across your top recommended career pathways.`,
  ];

  // 7. Clean grammatical cognitive summary and summary text
  const domainAction = DOMAIN_SENTENCE_TEMPLATES[primaryDomain] || "structured exploration and methodical problem solving";

  const cognitiveSummary = `Your responses highlight a distinctive ${primaryStyle.toLowerCase()} profile. Your natural approach favors ${
    TRAIT_INTEREST_DESCRIPTIONS[topTraits[0]?.[0]] || "analytical reasoning"
  }, making you well-suited for pathways centered around ${primaryLabel}.`;

  const summary = `Your responses demonstrate strong interest in ${primaryLabel}, with highest alignment toward ${
    topPick.title || "your top recommendation"
  } (${topPick.matchPct || 85}% match). You thrive when exploring ${domainAction}.`;

  return {
    source: "deterministic",
    model: null,
    promptVersion: "3.0.0",
    fallbackReason: fallbackReason || null,
    logicalProfile: {
      primaryStyle,
      reasoningStrength: `Focuses on ${domainAction}`,
      decisionStrategy: `Guided by systematic evaluation and alignment with ${primaryLabel}`,
      cognitiveSummary,
    },
    summary,
    interestThemes,
    strengths,
    pickRationales,
    developmentAreas: developmentAreas.slice(0, 2),
    nextSteps: nextSteps.slice(0, 3),
  };
}
