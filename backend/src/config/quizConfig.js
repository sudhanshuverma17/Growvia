/**
 * Centralized Career Assessment Quiz Configuration
 * Contains:
 * 1. 10 Detailed Assessment Questions with Trait Weight Mappings
 * 2. 9 Primary Traits Definition
 * 3. Career Profiles with Normalized Trait Weights
 */

export const TRAIT_KEYS = [
  "technical",
  "analytical",
  "creative",
  "business",
  "social",
  "leadership",
  "research",
  "helping",
  "communication",
];

export const TRAIT_LABELS = {
  technical: "Technical Curiosity",
  analytical: "Analytical Thinking",
  creative: "Creative & Design Mindset",
  business: "Business & Strategy",
  social: "Social & Empathy",
  leadership: "Leadership & Initiative",
  research: "Research & Inquiry",
  helping: "Helping & Service",
  communication: "Communication & Expression",
};

/**
 * 10 Carefully Designed Quiz Questions
 */
export const QUIZ_QUESTIONS = [
  {
    id: "q1",
    category: "Interests",
    question: "Which activity would you most enjoy doing for several hours?",
    type: "single",
    options: [
      {
        id: "q1_opt1",
        label: "Building or coding something",
        traits: { technical: 5, analytical: 3, creative: 2 },
      },
      {
        id: "q1_opt2",
        label: "Designing something visually",
        traits: { creative: 5, communication: 2, technical: 1 },
      },
      {
        id: "q1_opt3",
        label: "Solving business or organizational problems",
        traits: { business: 5, leadership: 3, analytical: 2 },
      },
      {
        id: "q1_opt4",
        label: "Researching and discovering how things work",
        traits: { research: 5, analytical: 4, technical: 2 },
      },
    ],
  },
  {
    id: "q2",
    category: "Natural Strengths",
    question: "Which ability feels most natural to you?",
    type: "single",
    options: [
      {
        id: "q2_opt1",
        label: "Logical thinking and problem solving",
        traits: { analytical: 5, technical: 3 },
      },
      {
        id: "q2_opt2",
        label: "Creativity and coming up with new ideas",
        traits: { creative: 5, communication: 2 },
      },
      {
        id: "q2_opt3",
        label: "Communication and explaining ideas",
        traits: { communication: 5, social: 3, leadership: 2 },
      },
      {
        id: "q2_opt4",
        label: "Understanding and helping people",
        traits: { helping: 5, social: 4 },
      },
    ],
  },
  {
    id: "q3",
    category: "Problem Solving",
    question: "When you encounter a difficult problem, what do you usually do first?",
    type: "single",
    options: [
      {
        id: "q3_opt1",
        label: "Break it into smaller problems and analyze each part",
        traits: { analytical: 5, technical: 3 },
      },
      {
        id: "q3_opt2",
        label: "Research information until I understand the problem",
        traits: { research: 5, analytical: 3 },
      },
      {
        id: "q3_opt3",
        label: "Experiment with different possible solutions",
        traits: { creative: 4, technical: 3, business: 2 },
      },
      {
        id: "q3_opt4",
        label: "Discuss the problem with other people",
        traits: { communication: 4, social: 4, leadership: 2 },
      },
    ],
  },
  {
    id: "q4",
    category: "Work Preference",
    question: "What type of work would you prefer?",
    type: "single",
    options: [
      {
        id: "q4_opt1",
        label: "Working primarily with computers, technology or data",
        traits: { technical: 5, analytical: 4 },
      },
      {
        id: "q4_opt2",
        label: "Working primarily with people",
        traits: { social: 5, helping: 4, communication: 3 },
      },
      {
        id: "q4_opt3",
        label: "Working primarily with physical objects or equipment",
        traits: { technical: 4, research: 2, analytical: 2 },
      },
      {
        id: "q4_opt4",
        label: "Working primarily with ideas, research and information",
        traits: { research: 5, analytical: 4, creative: 2 },
      },
    ],
  },
  {
    id: "q5",
    category: "Domain Interests",
    question: "Which subjects or areas genuinely interest you?",
    type: "multiple",
    helperText: "Select all that genuinely interest you.",
    options: [
      {
        id: "q5_opt1",
        label: "Computer Science & Technology",
        traits: { technical: 4, analytical: 2 },
      },
      {
        id: "q5_opt2",
        label: "Mathematics & Data",
        traits: { analytical: 4, technical: 2 },
      },
      {
        id: "q5_opt3",
        label: "Science & Research",
        traits: { research: 4, analytical: 3 },
      },
      {
        id: "q5_opt4",
        label: "Business & Economics",
        traits: { business: 4, leadership: 2 },
      },
      {
        id: "q5_opt5",
        label: "Psychology & Human Behavior",
        traits: { social: 4, helping: 3, research: 2 },
      },
      {
        id: "q5_opt6",
        label: "Art & Design",
        traits: { creative: 4, communication: 2 },
      },
      {
        id: "q5_opt7",
        label: "Communication & Media",
        traits: { communication: 4, creative: 2, social: 2 },
      },
      {
        id: "q5_opt8",
        label: "Society, Law & Public Service",
        traits: { leadership: 3, helping: 3, communication: 3, business: 2 },
      },
    ],
  },
  {
    id: "q6",
    category: "Creativity vs Analytical Thinking",
    question: "Which type of task sounds more satisfying to you?",
    type: "single",
    options: [
      {
        id: "q6_opt1",
        label: "Finding the logical solution to a complex problem",
        traits: { analytical: 5, technical: 3 },
      },
      {
        id: "q6_opt2",
        label: "Creating something completely new",
        traits: { creative: 5, leadership: 2 },
      },
      {
        id: "q6_opt3",
        label: "Improving an existing product or idea",
        traits: { business: 4, creative: 3, analytical: 3 },
      },
      {
        id: "q6_opt4",
        label: "Understanding why something works",
        traits: { research: 5, analytical: 4 },
      },
    ],
  },
  {
    id: "q7",
    category: "Career Motivation",
    question: "What are the most important things you want from your career?",
    type: "multiple",
    maxSelect: 3,
    helperText: "Select up to 3 options that matter most to you.",
    options: [
      {
        id: "q7_opt1",
        label: "High earning potential",
        traits: { business: 4, leadership: 2 },
      },
      {
        id: "q7_opt2",
        label: "Job security",
        traits: { analytical: 3, helping: 2 },
      },
      {
        id: "q7_opt3",
        label: "Work-life balance",
        traits: { helping: 2, social: 2 },
      },
      {
        id: "q7_opt4",
        label: "Creativity and freedom",
        traits: { creative: 5, technical: 1 },
      },
      {
        id: "q7_opt5",
        label: "Career growth",
        traits: { leadership: 3, business: 3 },
      },
      {
        id: "q7_opt6",
        label: "Intellectual challenge",
        traits: { analytical: 4, research: 4, technical: 3 },
      },
      {
        id: "q7_opt7",
        label: "Making a positive impact",
        traits: { helping: 5, social: 4 },
      },
      {
        id: "q7_opt8",
        label: "Leadership opportunities",
        traits: { leadership: 5, business: 3, communication: 2 },
      },
      {
        id: "q7_opt9",
        label: "Independence",
        traits: { creative: 3, technical: 3, business: 2 },
      },
      {
        id: "q7_opt10",
        label: "Recognition and status",
        traits: { leadership: 4, business: 3 },
      },
    ],
  },
  {
    id: "q8",
    category: "Work Environment",
    question: "Which work environment sounds most comfortable to you?",
    type: "single",
    options: [
      {
        id: "q8_opt1",
        label: "Working independently with a high degree of freedom",
        traits: { creative: 4, technical: 3, research: 3 },
      },
      {
        id: "q8_opt2",
        label: "Working in a small collaborative team",
        traits: { social: 4, communication: 3, creative: 2, technical: 2 },
      },
      {
        id: "q8_opt3",
        label: "Working in a large organization with structured processes",
        traits: { business: 4, analytical: 3 },
      },
      {
        id: "q8_opt4",
        label: "Leading teams and making important decisions",
        traits: { leadership: 5, business: 4, communication: 3 },
      },
    ],
  },
  {
    id: "q9",
    category: "Career Importance Rating",
    question: "How important is it for you to have a career that matches your personal interests?",
    type: "rating",
    min: 1,
    max: 5,
    helperText: "Rate on a scale from 1 (Not important) to 5 (Extremely important)",
    scaleLabels: [
      { value: 1, label: "Not important" },
      { value: 2, label: "Slightly important" },
      { value: 3, label: "Moderately important" },
      { value: 4, label: "Very important" },
      { value: 5, label: "Extremely important" },
    ],
    // Rating influences weight multipliers: higher dedication to interest increases creative and passion traits
    traitMultiplier: {
      1: { business: 1.2, analytical: 1.1 },
      2: { business: 1.1, analytical: 1.1 },
      3: { business: 1.0, creative: 1.0 },
      4: { creative: 1.2, research: 1.1, technical: 1.1 },
      5: { creative: 1.3, research: 1.2, technical: 1.2, helping: 1.2 },
    },
  },
  {
    id: "q10",
    category: "Future Aspiration",
    question: "Imagine you have the skills and resources to pursue any career. Which role would feel most satisfying to you?",
    type: "scenario",
    options: [
      {
        id: "q10_opt1",
        label: "Becoming an expert who solves complex technical problems",
        traits: { technical: 5, analytical: 4, research: 2 },
      },
      {
        id: "q10_opt2",
        label: "Creating products, designs or creative experiences",
        traits: { creative: 5, technical: 2, communication: 2 },
      },
      {
        id: "q10_opt3",
        label: "Leading a business or team",
        traits: { leadership: 5, business: 5, communication: 3 },
      },
      {
        id: "q10_opt4",
        label: "Researching new ideas and discovering knowledge",
        traits: { research: 5, analytical: 4 },
      },
      {
        id: "q10_opt5",
        label: "Helping people directly through your profession",
        traits: { helping: 5, social: 5, communication: 3 },
      },
      {
        id: "q10_opt6",
        label: "Building something of your own",
        traits: { leadership: 4, business: 4, creative: 4, technical: 2 },
      },
    ],
  },
];

/**
 * Career Profiles Matrix
 * Maps career categories and titles to weighted trait vectors.
 * Trait weights sum to 1.0.
 * Directly links to Growvia course IDs for one-click roadmap exploration.
 */
export const CAREER_PROFILES = [
  // ── Technology ──────────────────────────────────────────────
  {
    id: "software-engineer",
    title: "Software Engineer",
    category: "Technology",
    icon: "Code",
    description: "Design, build, and maintain software systems, web platforms, and applications.",
    weights: {
      technical: 0.35,
      analytical: 0.25,
      research: 0.12,
      creative: 0.10,
      business: 0.06,
      communication: 0.05,
      leadership: 0.04,
      social: 0.02,
      helping: 0.01,
    },
    keyStrengths: [
      "Algorithmic & logical thinking",
      "System design architecture",
      "Curiosity for programming languages",
    ],
  },
  {
    id: "ai-ml-engineer",
    title: "AI/ML Engineer",
    category: "Technology",
    icon: "Brain",
    description: "Develop neural networks, machine learning models, and intelligent AI applications.",
    weights: {
      technical: 0.32,
      analytical: 0.30,
      research: 0.18,
      creative: 0.08,
      business: 0.05,
      communication: 0.04,
      leadership: 0.02,
      helping: 0.01,
      social: 0.00,
    },
    keyStrengths: [
      "Mathematical modelling",
      "Deep learning and data pipelines",
      "Continuous scientific inquiry",
    ],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    category: "Technology",
    icon: "BarChart2",
    description: "Transform complex data into actionable predictive insights and analytical systems.",
    weights: {
      analytical: 0.34,
      technical: 0.26,
      research: 0.18,
      business: 0.10,
      communication: 0.06,
      creative: 0.04,
      leadership: 0.01,
      social: 0.01,
      helping: 0.00,
    },
    keyStrengths: [
      "Statistical inference",
      "Data visualization & storytelling",
      "Analytical problem-solving",
    ],
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    category: "Technology",
    icon: "Shield",
    description: "Protect systems, networks, and confidential data from cyber threats and intrusions.",
    weights: {
      technical: 0.32,
      analytical: 0.30,
      research: 0.15,
      business: 0.08,
      communication: 0.05,
      leadership: 0.05,
      helping: 0.03,
      creative: 0.02,
      social: 0.00,
    },
    keyStrengths: [
      "Vulnerability assessment",
      "Threat modeling & defense",
      "High attention to security details",
    ],
  },
  {
    id: "cloud-engineer",
    title: "Cloud & DevOps Engineer",
    category: "Technology",
    icon: "Cloud",
    description: "Architect scalable cloud infrastructure, automated CI/CD pipelines, and high availability.",
    weights: {
      technical: 0.36,
      analytical: 0.24,
      business: 0.12,
      research: 0.10,
      communication: 0.08,
      leadership: 0.05,
      creative: 0.03,
      helping: 0.01,
      social: 0.01,
    },
    keyStrengths: [
      "Infrastructure automation",
      "Distributed systems design",
      "Reliability engineering",
    ],
  },

  // ── Design & Creative ───────────────────────────────────────
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    category: "Design & Creative",
    icon: "Palette",
    description: "Craft intuitive, aesthetically striking, and human-centered digital experiences.",
    weights: {
      creative: 0.35,
      social: 0.18,
      communication: 0.16,
      analytical: 0.12,
      technical: 0.10,
      business: 0.05,
      helping: 0.02,
      leadership: 0.01,
      research: 0.01,
    },
    keyStrengths: [
      "User empathy & wireframing",
      "Visual hierarchy & design systems",
      "Interactive prototyping",
    ],
  },
  {
    id: "product-designer",
    title: "Product Designer",
    category: "Design & Creative",
    icon: "PenTool",
    description: "Bridge user research, visual design, and business strategy to shape complete products.",
    weights: {
      creative: 0.30,
      business: 0.18,
      analytical: 0.16,
      social: 0.14,
      communication: 0.12,
      technical: 0.05,
      leadership: 0.03,
      research: 0.01,
      helping: 0.01,
    },
    keyStrengths: [
      "Holistic product strategy",
      "Design thinking methodology",
      "Cross-functional communication",
    ],
  },
  {
    id: "content-creator",
    title: "Content Creator",
    category: "Design & Creative",
    icon: "Film",
    description: "Produce engaging video, audio, and storytelling content that captivates digital audiences.",
    weights: {
      creative: 0.34,
      communication: 0.26,
      business: 0.14,
      social: 0.12,
      leadership: 0.06,
      technical: 0.04,
      helping: 0.02,
      analytical: 0.01,
      research: 0.01,
    },
    keyStrengths: [
      "Storytelling and narrative design",
      "Audience engagement",
      "Media production and editing",
    ],
  },

  // ── Business & Management ───────────────────────────────────
  {
    id: "product-manager",
    title: "Product Manager",
    category: "Business",
    icon: "Compass",
    description: "Guide products from inception to market launch, aligning engineers, designers, and executives.",
    weights: {
      leadership: 0.25,
      business: 0.24,
      communication: 0.18,
      analytical: 0.15,
      technical: 0.08,
      creative: 0.05,
      social: 0.03,
      research: 0.01,
      helping: 0.01,
    },
    keyStrengths: [
      "Roadmap prioritization",
      "Strategic cross-functional leadership",
      "User & market data synthesis",
    ],
  },
  {
    id: "entrepreneur",
    title: "Startup Founder / Entrepreneur",
    category: "Business",
    icon: "Lightbulb",
    description: "Build scalable ventures from the ground up, solving high-impact market needs.",
    weights: {
      leadership: 0.28,
      business: 0.26,
      creative: 0.16,
      communication: 0.12,
      analytical: 0.08,
      social: 0.04,
      technical: 0.03,
      research: 0.02,
      helping: 0.01,
    },
    keyStrengths: [
      "Resilience & venture building",
      "Visionary goal-setting",
      "Risk management and fundraising",
    ],
  },
  {
    id: "business-analyst",
    title: "Business Analyst",
    category: "Business",
    icon: "LineChart",
    description: "Analyze organizational workflows, identify growth bottlenecks, and propose data-driven solutions.",
    weights: {
      business: 0.30,
      analytical: 0.28,
      communication: 0.18,
      technical: 0.08,
      leadership: 0.08,
      social: 0.04,
      research: 0.02,
      creative: 0.01,
      helping: 0.01,
    },
    keyStrengths: [
      "Requirement documentation",
      "Process optimization",
      "Stakeholder communication",
    ],
  },

  // ── Finance ─────────────────────────────────────────────────
  {
    id: "financial-analyst",
    title: "Financial Analyst / CA",
    category: "Finance",
    icon: "Calculator",
    description: "Evaluate investment opportunities, corporate fiscal health, valuations, and financial planning.",
    weights: {
      analytical: 0.36,
      business: 0.30,
      research: 0.12,
      communication: 0.08,
      technical: 0.06,
      leadership: 0.04,
      helping: 0.02,
      creative: 0.01,
      social: 0.01,
    },
    keyStrengths: [
      "Financial modeling & Excel",
      "Risk assessment & compliance",
      "Quantitative precision",
    ],
  },

  // ── Research & Science ──────────────────────────────────────
  {
    id: "research-scientist",
    title: "Research Scientist",
    category: "Research & Science",
    icon: "FlaskConical",
    description: "Conduct systematic experiments, publish peer-reviewed papers, and pioneer scientific knowledge.",
    weights: {
      research: 0.40,
      analytical: 0.30,
      technical: 0.14,
      communication: 0.06,
      creative: 0.05,
      helping: 0.02,
      business: 0.01,
      leadership: 0.01,
      social: 0.01,
    },
    keyStrengths: [
      "Hypothesis testing",
      "Deep scientific methodology",
      "Peer review & technical writing",
    ],
  },

  // ── Healthcare ──────────────────────────────────────────────
  {
    id: "doctor",
    title: "Medical Doctor",
    category: "Healthcare",
    icon: "HeartPulse",
    description: "Diagnose, treat, and care for patients in clinical, hospital, or surgical settings.",
    weights: {
      helping: 0.35,
      analytical: 0.24,
      social: 0.18,
      communication: 0.10,
      research: 0.06,
      technical: 0.04,
      leadership: 0.02,
      business: 0.01,
      creative: 0.00,
    },
    keyStrengths: [
      "Clinical judgment & empathy",
      "Critical patient decision making",
      "Unwavering dedication to human care",
    ],
  },

  // ── Marketing & Communication ───────────────────────────────
  {
    id: "digital-marketer",
    title: "Digital Marketing Specialist",
    category: "Marketing & Communication",
    icon: "Megaphone",
    description: "Drive multi-channel growth, campaign optimization, performance marketing, and branding.",
    weights: {
      communication: 0.28,
      creative: 0.24,
      business: 0.22,
      analytical: 0.14,
      social: 0.05,
      technical: 0.04,
      leadership: 0.02,
      helping: 0.01,
      research: 0.00,
    },
    keyStrengths: [
      "Campaign ROI optimization",
      "Brand messaging & positioning",
      "Audience analytics & ad targeting",
    ],
  },

  // ── Social & Psychology ─────────────────────────────────────
  {
    id: "psychologist",
    title: "Psychologist / Counselor",
    category: "Social & Psychology",
    icon: "Smile",
    description: "Support mental health, behavioral clarity, emotional resilience, and personal guidance.",
    weights: {
      helping: 0.36,
      social: 0.25,
      communication: 0.18,
      analytical: 0.10,
      research: 0.06,
      leadership: 0.02,
      creative: 0.02,
      business: 0.01,
      technical: 0.00,
    },
    keyStrengths: [
      "Active empathetic listening",
      "Behavioral analysis & therapy",
      "Safe space communication",
    ],
  },

  // ── Law & Public Service ────────────────────────────────────
  {
    id: "corporate-lawyer",
    title: "Corporate Lawyer / Legal Advisor",
    category: "Law & Public Service",
    icon: "Scale",
    description: "Advise enterprises on regulatory compliance, intellectual property, contracts, and advocacy.",
    weights: {
      analytical: 0.28,
      communication: 0.26,
      business: 0.18,
      research: 0.14,
      leadership: 0.08,
      helping: 0.03,
      social: 0.02,
      technical: 0.01,
      creative: 0.00,
    },
    keyStrengths: [
      "Legal reasoning & negotiation",
      "Contractual precision",
      "Regulatory risk mitigation",
    ],
  },

  // ── Education ───────────────────────────────────────────────
  {
    id: "educator",
    title: "Educator & Academic Trainer",
    category: "Education",
    icon: "GraduationCap",
    description: "Inspire, teach, and mentor the next generation of professionals through structured pedagogy.",
    weights: {
      communication: 0.30,
      helping: 0.25,
      social: 0.18,
      research: 0.12,
      leadership: 0.08,
      analytical: 0.04,
      creative: 0.02,
      business: 0.01,
      technical: 0.00,
    },
    keyStrengths: [
      "Curriculum design & pedagogy",
      "Student mentorship & inspiration",
      "Patience and clear explanation",
    ],
  },
];
