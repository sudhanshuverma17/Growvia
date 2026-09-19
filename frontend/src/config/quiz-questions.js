/**
 * 10 High-Precision Career & Aptitude Assessment Questions for Growvia
 * Simplified, everyday language under 15 words per question, under 8 words per option.
 * 4 Academic Questions (40% weight) + 6 Interest Questions (60% weight).
 */

export const CAREER_CATEGORIES = {
  medicine: {
    id: "medicine",
    label: "Healthcare & Medicine",
    family: "healthcare",
    icon: "HeartPulse",
    defaultRoadmapId: "doctor",
    roadmaps: ["doctor", "physiotherapist", "pharmacist", "nutritionist", "psychologist"],
    description: "Diagnose, treat, heal, and improve physical and mental health.",
  },
  law: {
    id: "law",
    label: "Law & Governance",
    family: "legal",
    icon: "Scale",
    defaultRoadmapId: "lawyer",
    roadmaps: ["lawyer", "civil-services"],
    description: "Advise on legal rights, uphold justice, and shape public policy.",
  },
  technology: {
    id: "technology",
    label: "Software & Technology",
    family: "technology",
    icon: "Code",
    defaultRoadmapId: "engineer",
    roadmaps: ["engineer", "data-scientist", "cybersecurity", "ai-specialist", "devops"],
    description: "Build robust software, digital tools, AI platforms, and cloud systems.",
  },
  design: {
    id: "design",
    label: "Design & Creative Arts",
    family: "design",
    icon: "Palette",
    defaultRoadmapId: "designer",
    roadmaps: ["designer", "interior-designer", "fashion-designer", "animator", "architect"],
    description: "Create visual experiences, user interfaces, physical spaces, and media.",
  },
  business: {
    id: "business",
    label: "Business & Management",
    family: "business",
    icon: "Briefcase",
    defaultRoadmapId: "product-manager",
    roadmaps: ["product-manager", "digital-marketer", "hr-specialist", "supply-chain"],
    description: "Lead organizations, manage teams, launch products, and grow ventures.",
  },
  finance: {
    id: "finance",
    label: "Finance & Accounting",
    family: "finance",
    icon: "TrendingUp",
    defaultRoadmapId: "chartered-accountant",
    roadmaps: ["chartered-accountant", "financial-analyst", "investment-banker"],
    description: "Manage capital, analyze financial markets, optimize tax, and invest.",
  },
  engineering: {
    id: "engineering",
    label: "Core Engineering",
    family: "engineering",
    icon: "Wrench",
    defaultRoadmapId: "mechanical-engineer",
    roadmaps: ["mechanical-engineer", "civil-engineer", "electrical-engineer", "robotics-engineer"],
    description: "Design physical machines, durable buildings, robotics, and engines.",
  },
  education: {
    id: "education",
    label: "Education & Care",
    family: "education",
    icon: "GraduationCap",
    defaultRoadmapId: "teacher",
    roadmaps: ["teacher", "academic-researcher", "counselor"],
    description: "Teach concepts, mentor learners, and foster human development.",
  },
};

export const QUIZ_QUESTIONS = [
  {
    id: "q1",
    typeCategory: "academic",
    weight: 0.8,
    category: "School Interests",
    question: "Which school subject did you enjoy studying the most?",
    type: "single",
    description: "Pick the subject that felt easiest and most engaging to you.",
    options: [
      {
        id: "q1_opt1",
        title: "Biology and human anatomy",
        scores: { medicine: 3, education: 1 },
      },
      {
        id: "q1_opt2",
        title: "History, civics, and political debate",
        scores: { law: 3, education: 1 },
      },
      {
        id: "q1_opt3",
        title: "Computer science and coding logic",
        scores: { technology: 3, engineering: 2 },
      },
      {
        id: "q1_opt4",
        title: "Art, drafting, and graphic design",
        scores: { design: 3 },
      },
      {
        id: "q1_opt5",
        title: "Math, business studies, and economics",
        scores: { finance: 3, business: 2 },
      },
      {
        id: "q1_opt6",
        title: "Physics, machines, and mechanics",
        scores: { engineering: 3, technology: 1 },
      },
    ],
  },
  {
    id: "q2",
    typeCategory: "academic",
    weight: 0.8,
    category: "Learning Style",
    question: "How do you prefer solving a difficult homework assignment?",
    type: "single",
    description: "Your default problem-solving instinct when studying.",
    options: [
      {
        id: "q2_opt1",
        title: "Diagnosing real medical or biological examples",
        scores: { medicine: 3, education: 1 },
      },
      {
        id: "q2_opt2",
        title: "Finding legal or ethical arguments in texts",
        scores: { law: 3, business: 1 },
      },
      {
        id: "q2_opt3",
        title: "Writing code or step-by-step logic formulas",
        scores: { technology: 3, engineering: 2 },
      },
      {
        id: "q2_opt4",
        title: "Drawing diagrams, sketches, and visual mind-maps",
        scores: { design: 3, education: 1 },
      },
      {
        id: "q2_opt5",
        title: "Calculating numbers and spreadsheets for business",
        scores: { finance: 3, business: 2 },
      },
      {
        id: "q2_opt6",
        title: "Building physical models or testing equipment",
        scores: { engineering: 3, technology: 1 },
      },
    ],
  },
  {
    id: "q3",
    typeCategory: "academic",
    weight: 0.8,
    category: "Class Projects",
    question: "What kind of school project was most fun to present?",
    type: "single",
    description: "The topic where you enjoyed sharing your work with others.",
    options: [
      {
        id: "q3_opt1",
        title: "A health survey or biology experiment",
        scores: { medicine: 3, education: 2 },
      },
      {
        id: "q3_opt2",
        title: "A mock court trial or debate",
        scores: { law: 3, business: 1 },
      },
      {
        id: "q3_opt3",
        title: "A working website or computer app",
        scores: { technology: 3, design: 1 },
      },
      {
        id: "q3_opt4",
        title: "An art portfolio or fashion showcase",
        scores: { design: 3 },
      },
      {
        id: "q3_opt5",
        title: "A business plan selling a product",
        scores: { business: 3, finance: 2 },
      },
      {
        id: "q3_opt6",
        title: "A working robot or machine model",
        scores: { engineering: 3, technology: 1 },
      },
    ],
  },
  {
    id: "q4",
    typeCategory: "academic",
    weight: 0.8,
    category: "Reading & Curiosity",
    question: "When reading a textbook, what catches your interest first?",
    type: "single",
    description: "The sections or figures that immediately draw your eye.",
    options: [
      {
        id: "q4_opt1",
        title: "Medical breakthroughs and health tips",
        scores: { medicine: 3, education: 1 },
      },
      {
        id: "q4_opt2",
        title: "Court trials and human rights cases",
        scores: { law: 3, business: 1 },
      },
      {
        id: "q4_opt3",
        title: "Code snippets and algorithm charts",
        scores: { technology: 3, engineering: 1 },
      },
      {
        id: "q4_opt4",
        title: "Visual photos, typography, and page layout",
        scores: { design: 3 },
      },
      {
        id: "q4_opt5",
        title: "Company revenue tables and market trends",
        scores: { finance: 3, business: 3 },
      },
      {
        id: "q4_opt6",
        title: "Diagrams of engines, circuits, and bridges",
        scores: { engineering: 3, technology: 1 },
      },
    ],
  },
  {
    id: "q5",
    typeCategory: "interest",
    weight: 1.2,
    category: "Daily Preference",
    question: "Would you rather fix a broken gadget or write a story?",
    type: "single",
    description: "Choose the hands-on activity that sounds most appealing.",
    options: [
      {
        id: "q5_opt1",
        title: "Treat an injured pet or someone hurting",
        scores: { medicine: 3, education: 2 },
      },
      {
        id: "q5_opt2",
        title: "Settle a dispute and defend fair rules",
        scores: { law: 3, business: 1 },
      },
      {
        id: "q5_opt3",
        title: "Fix computer software or write new code",
        scores: { technology: 3, engineering: 1 },
      },
      {
        id: "q5_opt4",
        title: "Sketch a logo, room layout, or outfit",
        scores: { design: 3 },
      },
      {
        id: "q5_opt5",
        title: "Sell items online to make a profit",
        scores: { business: 3, finance: 2 },
      },
      {
        id: "q5_opt6",
        title: "Repair a broken motor, bicycle, or gadget",
        scores: { engineering: 3, technology: 1 },
      },
    ],
  },
  {
    id: "q6",
    typeCategory: "interest",
    weight: 1.2,
    category: "Weekend Activity",
    question: "If you had a free weekend, what would you do?",
    type: "single",
    description: "How you naturally love spending your leisure hours.",
    options: [
      {
        id: "q6_opt1",
        title: "Volunteer at a community health camp",
        scores: { medicine: 3, education: 2 },
      },
      {
        id: "q6_opt2",
        title: "Watch court trials and legal documentaries",
        scores: { law: 3, education: 1 },
      },
      {
        id: "q6_opt3",
        title: "Build a video game or website",
        scores: { technology: 3, design: 1 },
      },
      {
        id: "q6_opt4",
        title: "Paint, take photos, or edit creative videos",
        scores: { design: 3 },
      },
      {
        id: "q6_opt5",
        title: "Research stock prices or startup ideas",
        scores: { finance: 3, business: 3 },
      },
      {
        id: "q6_opt6",
        title: "Build a DIY drone or wooden furniture",
        scores: { engineering: 3, technology: 1 },
      },
    ],
  },
  {
    id: "q7",
    typeCategory: "interest",
    weight: 1.2,
    category: "Dream Workplace",
    question: "Which workplace would you enjoy visiting the most?",
    type: "single",
    description: "The work environment that makes you feel excited.",
    options: [
      {
        id: "q7_opt1",
        title: "A modern hospital or wellness clinic",
        scores: { medicine: 3, education: 1 },
      },
      {
        id: "q7_opt2",
        title: "A high-court room or law office",
        scores: { law: 3, business: 1 },
      },
      {
        id: "q7_opt3",
        title: "A software company building smart apps",
        scores: { technology: 3, engineering: 1 },
      },
      {
        id: "q7_opt4",
        title: "A design studio or film set",
        scores: { design: 3 },
      },
      {
        id: "q7_opt5",
        title: "A stock exchange or corporate office",
        scores: { business: 3, finance: 2 },
      },
      {
        id: "q7_opt6",
        title: "A robotics lab or construction site",
        scores: { engineering: 3, technology: 1 },
      },
    ],
  },
  {
    id: "q8",
    typeCategory: "interest",
    weight: 1.2,
    category: "Problem Solving",
    question: "What kind of problem do you love solving?",
    type: "single",
    description: "The challenges that spark your curiosity.",
    options: [
      {
        id: "q8_opt1",
        title: "Finding why someone feels unwell or sick",
        scores: { medicine: 3, education: 1 },
      },
      {
        id: "q8_opt2",
        title: "Settling an argument between two opposing sides",
        scores: { law: 3, business: 1 },
      },
      {
        id: "q8_opt3",
        title: "Finding and fixing bugs in a program",
        scores: { technology: 3, engineering: 1 },
      },
      {
        id: "q8_opt4",
        title: "Redesigning an ugly poster or messy room",
        scores: { design: 3 },
      },
      {
        id: "q8_opt5",
        title: "Finding ways to invest and grow money",
        scores: { finance: 3, business: 2 },
      },
      {
        id: "q8_opt6",
        title: "Fixing a broken machine or mechanical toy",
        scores: { engineering: 3, technology: 1 },
      },
    ],
  },
  {
    id: "q9",
    typeCategory: "interest",
    weight: 1.2,
    category: "Team Contribution",
    question: "In a group project with friends, what role fits you?",
    type: "single",
    description: "How you naturally help your team succeed.",
    options: [
      {
        id: "q9_opt1",
        title: "Caring for everyone and helping them succeed",
        scores: { medicine: 2, education: 3 },
      },
      {
        id: "q9_opt2",
        title: "Defending our points and arguing for fairness",
        scores: { law: 3, business: 1 },
      },
      {
        id: "q9_opt3",
        title: "Managing the computer code and tech tools",
        scores: { technology: 3, engineering: 1 },
      },
      {
        id: "q9_opt4",
        title: "Designing the slides, graphics, and visual look",
        scores: { design: 3 },
      },
      {
        id: "q9_opt5",
        title: "Leading the team and planning the budget",
        scores: { business: 3, finance: 2 },
      },
      {
        id: "q9_opt6",
        title: "Assembling physical models and testing equipment",
        scores: { engineering: 3, technology: 1 },
      },
    ],
  },
  {
    id: "q10",
    typeCategory: "interest",
    weight: 1.2,
    category: "Proud Achievement",
    question: "What accomplishment would make you feel most proud?",
    type: "single",
    description: "The long-term impact that means the most to you.",
    options: [
      {
        id: "q10_opt1",
        title: "Helping patients heal and recover their health",
        scores: { medicine: 3, education: 1 },
      },
      {
        id: "q10_opt2",
        title: "Defending an innocent person in court",
        scores: { law: 3, business: 1 },
      },
      {
        id: "q10_opt3",
        title: "Building an app downloaded by millions",
        scores: { technology: 3, design: 1 },
      },
      {
        id: "q10_opt4",
        title: "Creating an iconic artwork or building",
        scores: { design: 3, engineering: 1 },
      },
      {
        id: "q10_opt5",
        title: "Growing a company into a thriving business",
        scores: { business: 3, finance: 2 },
      },
      {
        id: "q10_opt6",
        title: "Designing a safe bridge or useful robot",
        scores: { engineering: 3, technology: 1 },
      },
    ],
  },
];

/**
 * Performs an unbiased Fisher-Yates (Knuth) shuffle on an array without mutating the original.
 * @param {Array<T>} array
 * @returns {Array<T>} A new shuffled array
 */
export function shuffleArray(array) {
  if (!Array.isArray(array) || array.length <= 1) {
    return Array.isArray(array) ? [...array] : [];
  }
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generates an independent randomized option order map for each question in the quiz.
 * Maps questionId -> array of optionIds in their shuffled display order.
 * @param {Array} questions
 * @returns {Record<string, string[]>}
 */
export function generateQuizOptionOrder(questions = QUIZ_QUESTIONS) {
  const orderMap = {};
  questions.forEach((q) => {
    if (Array.isArray(q.options) && q.options.length > 1) {
      const shuffledOptions = shuffleArray(q.options);
      orderMap[q.id] = shuffledOptions.map((opt) => opt.id);
    }
  });
  return orderMap;
}

/**
 * Reorders each question's options according to an option order map.
 * Ensures underlying option objects (and their score mappings) are preserved intact.
 * @param {Array} questions - Original or cloned question array
 * @param {Record<string, string[]>} orderMap - Map of questionId -> ordered array of optionIds
 * @returns {Array} New questions array with options reordered according to the orderMap
 */
export function applyQuizOptionOrder(questions = QUIZ_QUESTIONS, orderMap = {}) {
  if (!Array.isArray(questions)) return [];
  if (!orderMap || typeof orderMap !== "object" || Object.keys(orderMap).length === 0) {
    return questions;
  }

  return questions.map((q) => {
    if (!Array.isArray(q.options) || !orderMap[q.id]) {
      return q;
    }

    const savedOrder = orderMap[q.id];
    const optionMap = new Map(q.options.map((opt) => [opt.id, opt]));

    // Place options in the specified order
    const reordered = [];
    savedOrder.forEach((optId) => {
      if (optionMap.has(optId)) {
        reordered.push(optionMap.get(optId));
        optionMap.delete(optId);
      }
    });

    // Safety fallback: append any options that weren't present in savedOrder
    optionMap.forEach((opt) => {
      reordered.push(opt);
    });

    return {
      ...q,
      options: reordered,
    };
  });
}
