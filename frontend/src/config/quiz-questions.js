/**
 * 10 Carefully Redesigned Career Assessment Questions for the Frontend
 * Standardized across 10 core career dimensions.
 */

export const QUIZ_QUESTIONS = [
  {
    id: "q1",
    category: "Problem Solving",
    question: "When faced with a complex, high-stakes challenge, which approach sounds most satisfying?",
    type: "single",
    description: "Your default problem-solving reflex under demanding conditions.",
    options: [
      {
        id: "q1_opt1",
        title: "Architecting a technical system or building a functional prototype to fix it",
        desc: "Designing logic, assembling digital mechanisms, and delivering a tangible technical solution.",
      },
      {
        id: "q1_opt2",
        title: "Analyzing underlying data, isolating patterns, and modeling root causes",
        desc: "Investigating datasets, calculating trends, and establishing empirical evidence before acting.",
      },
      {
        id: "q1_opt3",
        title: "Designing an intuitive, creative approach that reimagines the user experience",
        desc: "Creating aesthetic, human-friendly solutions that delight users and stand out visually.",
      },
      {
        id: "q1_opt4",
        title: "Aligning stakeholders, organizing resources, and negotiating a strategic solution",
        desc: "Uniting people, setting organizational priorities, and navigating commercial outcomes.",
      },
    ],
  },
  {
    id: "q2",
    category: "Work Preference",
    question: "Which type of challenge would you most enjoy immersing yourself in for several hours?",
    type: "single",
    description: "The domain of deep work where you naturally experience peak focus.",
    options: [
      {
        id: "q2_opt1",
        title: "Writing code, configuring systems, or debugging intricate workflows",
        desc: "Continuous technical focus on algorithms, codebases, or complex infrastructure.",
      },
      {
        id: "q2_opt2",
        title: "Exploring scientific literature, investigating theories, or running experiments",
        desc: "Methodological research, hypothesis validation, and uncovering core insights.",
      },
      {
        id: "q2_opt3",
        title: "Crafting visual layouts, conceptualizing media, or drafting storyboards",
        desc: "Visual composition, typography, interactive aesthetics, and storytelling.",
      },
      {
        id: "q2_opt4",
        title: "Developing market growth strategies, financial models, or venture roadmaps",
        desc: "Analyzing competitive dynamics, commercial viability, and product growth levers.",
      },
    ],
  },
  {
    id: "q3",
    category: "Decision Making",
    question: "When making an important decision with high uncertainty, what do you naturally prioritize?",
    type: "single",
    description: "The primary anchor you rely upon when the path forward is ambiguous.",
    options: [
      {
        id: "q3_opt1",
        title: "Objective metrics, statistical evidence, and quantifiable probabilities",
        desc: "Relying on numbers, quantitative rigor, and structured analytical validation.",
      },
      {
        id: "q3_opt2",
        title: "Systematic technical feasibility, architectural soundness, and reliability",
        desc: "Verifying engineering principles, structural stability, and system constraints.",
      },
      {
        id: "q3_opt3",
        title: "Direct human impact, empathy, and positive outcomes for people",
        desc: "Prioritizing psychological well-being, user fulfillment, and social values.",
      },
      {
        id: "q3_opt4",
        title: "Market opportunity, competitive advantage, and entrepreneurial upside",
        desc: "Capitalizing on business potential, strategic positioning, and bold innovation.",
      },
    ],
  },
  {
    id: "q4",
    category: "Project Preference",
    question: "Which type of project would excite you the most to lead or contribute to?",
    type: "single",
    description: "The type of initiative that makes you eager to see the end result.",
    options: [
      {
        id: "q4_opt1",
        title: "Launching a scalable software platform, automated pipeline, or secure network",
        desc: "Delivering powerful digital products, resilient services, or intelligent software tools.",
      },
      {
        id: "q4_opt2",
        title: "Uncovering scientific insights, discovering health breakthroughs, or analyzing complex datasets",
        desc: "Advancing knowledge in healthcare, scientific research, or predictive intelligence.",
      },
      {
        id: "q4_opt3",
        title: "Producing an iconic creative campaign, brand identity, or multimedia experience",
        desc: "Engaging wide audiences through visual artistry, compelling media, or interactive design.",
      },
      {
        id: "q4_opt4",
        title: "Building an entrepreneurial venture, closing high-value deals, or driving executive strategy",
        desc: "Founding an organization, scaling commercial operations, and negotiating key milestones.",
      },
    ],
  },
  {
    id: "q5",
    category: "Domain Curiosity",
    question: "Which subjects or areas spark your genuine intellectual curiosity?",
    type: "multiple",
    maxSelect: 4,
    description: "Select up to 4 fields that you find yourself reading about or discussing effortlessly.",
    options: [
      {
        id: "q5_opt1",
        title: "Software, Artificial Intelligence & Distributed Systems",
        tag: "Technology",
      },
      {
        id: "q5_opt2",
        title: "Data Science, Mathematics & Quantitative Economics",
        tag: "Data & Math",
      },
      {
        id: "q5_opt3",
        title: "Visual Design, Media Production & User Experience",
        tag: "Design & Arts",
      },
      {
        id: "q5_opt4",
        title: "Business Leadership, Finance & Corporate Strategy",
        tag: "Business",
      },
      {
        id: "q5_opt5",
        title: "Healthcare, Human Physiology & Mental Wellness",
        tag: "Healthcare",
      },
      {
        id: "q5_opt6",
        title: "Law, Governance, Ethics & Public Policy",
        tag: "Public Affairs",
      },
      {
        id: "q5_opt7",
        title: "Core Engineering, Architecture & Physical Construction",
        tag: "Engineering",
      },
      {
        id: "q5_opt8",
        title: "Venture Creation, Entrepreneurship & Product Innovation",
        tag: "Ventures",
      },
    ],
  },
  {
    id: "q6",
    category: "Collaboration Role",
    question: "In a collaborative team, which role do you naturally gravitate toward?",
    type: "single",
    description: "How you contribute your best energy when working alongside others.",
    options: [
      {
        id: "q6_opt1",
        title: "The Technical Problem Solver: Tackling intricate mechanisms and building the core engine",
        desc: "Focusing on functionality, writing code, and resolving technical bottlenecks.",
      },
      {
        id: "q6_opt2",
        title: "The Creative Innovator: Imagining novel visual concepts, storytelling, and divergent ideas",
        desc: "Infusing creative originality, user aesthetics, and out-of-the-box perspectives.",
      },
      {
        id: "q6_opt3",
        title: "The Strategist & Organizer: Coordinating timelines, priorities, and business execution",
        desc: "Setting clear milestones, unblocking team members, and aligning with broad goals.",
      },
      {
        id: "q6_opt4",
        title: "The Counselor & Communicator: Supporting people, resolving friction, and building empathy",
        desc: "Ensuring psychological safety, mentoring colleagues, and facilitating clear dialogue.",
      },
    ],
  },
  {
    id: "q7",
    category: "Career Motivations",
    question: "Which achievements and rewards would make you feel most proud of your career?",
    type: "multiple",
    maxSelect: 3,
    description: "Select up to 3 core drivers that matter most to your long-term fulfillment.",
    options: [
      {
        id: "q7_opt1",
        title: "Mastering complex intellectual challenges and cutting-edge technology",
        desc: "Continuous intellectual stimulation and deep technical craftsmanship.",
      },
      {
        id: "q7_opt2",
        title: "Transforming raw ideas into tangible products or captivating works of art",
        desc: "Bringing novel visual, literary, or functional creations to life.",
      },
      {
        id: "q7_opt3",
        title: "Scaling a business, generating high financial value, or steering company growth",
        desc: "Commercial expansion, high financial returns, and executive responsibility.",
      },
      {
        id: "q7_opt4",
        title: "Directly improving human health, saving lives, or empowering others through mentorship",
        desc: "Creating profound, measurable improvements in real people's lives.",
      },
      {
        id: "q7_opt5",
        title: "Discovering fundamental scientific truths, authoring research, or analytical breakthroughs",
        desc: "Expanding academic or scientific frontiers through rigorous inquiry.",
      },
      {
        id: "q7_opt6",
        title: "Directing organizational strategy, public policy, or industry-wide initiatives",
        desc: "Exercising high-level leadership and influential institutional governance.",
      },
      {
        id: "q7_opt7",
        title: "Establishing reliable, orderly, and highly stable operational processes",
        desc: "Creating structural certainty, regulatory compliance, and dependable order.",
      },
    ],
  },
  {
    id: "q8",
    category: "Work Environment",
    question: "Which working rhythm and operational environment brings out your peak output?",
    type: "single",
    description: "The physical and cultural setting where you do your best work.",
    options: [
      {
        id: "q8_opt1",
        title: "High autonomy, deep individual focus, minimal meetings, and technical clarity",
        desc: "Independent problem solving with deep concentration and quantitative milestones.",
      },
      {
        id: "q8_opt2",
        title: "A dynamic, fast-evolving venture setting where adaptability and risk are embraced",
        desc: "Agile, experimental environment with rapid pivots and high growth potential.",
      },
      {
        id: "q8_opt3",
        title: "A collaborative, empathetic setting centered around direct human interaction",
        desc: "Team rooms, consulting spaces, clinical settings, or teaching environments.",
      },
      {
        id: "q8_opt4",
        title: "A well-structured, methodical institution with clear standards and prestige",
        desc: "Established corporations, public institutions, or medical and legal centers.",
      },
    ],
  },
  {
    id: "q9",
    category: "Ambiguity & Risk",
    question: "How comfortable are you navigating uncertain requirements, unmapped goals, and real risk?",
    type: "rating",
    min: 1,
    max: 5,
    description: "Rate your comfort level from 1 (Strong preference for structure) to 5 (Thrive in high-risk ambiguity).",
    scaleLabels: [
      { value: 1, label: "Prefer Structured Certainty", note: "Best in well-defined roles with established procedures." },
      { value: 2, label: "Moderate Structure Preferred", note: "Comfortable with minor adaptations inside clear boundaries." },
      { value: 3, label: "Balanced Flexibility", note: "Navigate moderate uncertainty when backed by solid research." },
      { value: 4, label: "Energized by Exploration", note: "Welcome calculated risks and iterative trial-and-error." },
      { value: 5, label: "Thrive in High Ambiguity", note: "Excited by bold frontiers, pioneering ventures, and uncertainty." },
    ],
  },
  {
    id: "q10",
    category: "Long-Term Legacy",
    question: "Looking ahead over the arc of your career, which legacy would feel most fulfilling?",
    type: "scenario",
    description: "The signature contribution you wish to look back on with pride.",
    options: [
      {
        id: "q10_opt1",
        title: "Having engineered mission-critical technological infrastructure or software used by millions",
        desc: "Being recognized as a master builder of robust, high-impact digital systems.",
      },
      {
        id: "q10_opt2",
        title: "Having made pivotal scientific discoveries, authored influential research, or advanced healthcare",
        desc: "Contributing foundational knowledge, clinical healing, or deep analytical solutions.",
      },
      {
        id: "q10_opt3",
        title: "Having created iconic design works, artistic productions, or unforgettable brand experiences",
        desc: "Delighting millions through aesthetic brilliance, cultural storytelling, and visual creativity.",
      },
      {
        id: "q10_opt4",
        title: "Having founded and scaled successful enterprises or led major commercial transformations",
        desc: "Building sustainable organizations, creating jobs, and steering economic progress.",
      },
      {
        id: "q10_opt5",
        title: "Having saved lives, treated patients, educated students, or mentored people to their potential",
        desc: "Creating lasting personal transformations and uplifting human welfare directly.",
      },
      {
        id: "q10_opt6",
        title: "Having upheld justice, shaped ethical public policy, or reformed vital societal systems",
        desc: "Ensuring fairness, regulatory integrity, and societal progress through structured leadership.",
      },
    ],
  },
];
