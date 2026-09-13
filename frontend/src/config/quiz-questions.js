/**
 * 10 Carefully Designed Career Assessment Questions for the Frontend
 */

export const QUIZ_QUESTIONS = [
  {
    id: "q1",
    category: "Interests",
    question: "Which activity would you most enjoy doing for several hours?",
    type: "single",
    description: "Think about which task makes you lose track of time.",
    options: [
      {
        id: "q1_opt1",
        title: "Building or coding something",
        desc: "Creating functional digital tools, web apps, or technical systems.",
      },
      {
        id: "q1_opt2",
        title: "Designing something visually",
        desc: "Crafting graphic visuals, user interfaces, branding, or digital art.",
      },
      {
        id: "q1_opt3",
        title: "Solving business or organizational problems",
        desc: "Analyzing operations, streamlining workflows, or strategizing growth.",
      },
      {
        id: "q1_opt4",
        title: "Researching and discovering how things work",
        desc: "Diving deep into scientific literature, data patterns, or core principles.",
      },
    ],
  },
  {
    id: "q2",
    category: "Natural Strengths",
    question: "Which ability feels most natural to you?",
    type: "single",
    description: "Choose the strength that comes to you with the least friction.",
    options: [
      {
        id: "q2_opt1",
        title: "Logical thinking and problem solving",
        desc: "Deconstructing puzzles, understanding algorithms, and structured logic.",
      },
      {
        id: "q2_opt2",
        title: "Creativity and coming up with new ideas",
        desc: "Imagining novel concepts, aesthetic innovations, and out-of-the-box thinking.",
      },
      {
        id: "q2_opt3",
        title: "Communication and explaining ideas",
        desc: "Articulating complex topics clearly, writing persuasively, and presenting.",
      },
      {
        id: "q2_opt4",
        title: "Understanding and helping people",
        desc: "Empathizing with individual struggles, active listening, and guidance.",
      },
    ],
  },
  {
    id: "q3",
    category: "Problem Solving",
    question: "When you encounter a difficult problem, what do you usually do first?",
    type: "single",
    description: "Your default problem-solving reflex under ambiguity.",
    options: [
      {
        id: "q3_opt1",
        title: "Break it into smaller problems and analyze each part",
        desc: "Step-by-step analytical decomposition to isolate variables.",
      },
      {
        id: "q3_opt2",
        title: "Research information until I understand the problem",
        desc: "Gathering documentation, benchmarks, case studies, and reference data.",
      },
      {
        id: "q3_opt3",
        title: "Experiment with different possible solutions",
        desc: "Hands-on trial-and-error, rapid prototyping, and empirical testing.",
      },
      {
        id: "q3_opt4",
        title: "Discuss the problem with other people",
        desc: "Brainstorming with peers, seeking diverse perspectives, and collaboration.",
      },
    ],
  },
  {
    id: "q4",
    category: "Work Preference",
    question: "What type of work would you prefer?",
    type: "single",
    description: "Your core medium of daily professional output.",
    options: [
      {
        id: "q4_opt1",
        title: "Working primarily with computers, technology or data",
        desc: "Building digital platforms, running queries, or architecting systems.",
      },
      {
        id: "q4_opt2",
        title: "Working primarily with people",
        desc: "Managing teams, client partnerships, counseling, or teaching.",
      },
      {
        id: "q4_opt3",
        title: "Working primarily with physical objects or equipment",
        desc: "Hardware, laboratory apparatus, machinery, or tangible products.",
      },
      {
        id: "q4_opt4",
        title: "Working primarily with ideas, research and information",
        desc: "Formulating strategies, writing analyses, or investigating theories.",
      },
    ],
  },
  {
    id: "q5",
    category: "Domain Interests",
    question: "Which subjects or areas genuinely interest you?",
    type: "multiple",
    description: "Select all subjects that spark your natural curiosity.",
    options: [
      {
        id: "q5_opt1",
        title: "Computer Science & Technology",
        tag: "Tech",
      },
      {
        id: "q5_opt2",
        title: "Mathematics & Data",
        tag: "Analytics",
      },
      {
        id: "q5_opt3",
        title: "Science & Research",
        tag: "Discovery",
      },
      {
        id: "q5_opt4",
        title: "Business & Economics",
        tag: "Markets",
      },
      {
        id: "q5_opt5",
        title: "Psychology & Human Behavior",
        tag: "Mind",
      },
      {
        id: "q5_opt6",
        title: "Art & Design",
        tag: "Creative",
      },
      {
        id: "q5_opt7",
        title: "Communication & Media",
        tag: "Storytelling",
      },
      {
        id: "q5_opt8",
        title: "Society, Law & Public Service",
        tag: "Impact",
      },
    ],
  },
  {
    id: "q6",
    category: "Creativity vs Analytical Thinking",
    question: "Which type of task sounds more satisfying to you?",
    type: "single",
    description: "Where you find your deepest sense of accomplishment.",
    options: [
      {
        id: "q6_opt1",
        title: "Finding the logical solution to a complex problem",
        desc: "Untangling intricacies until a clean, definitive answer emerges.",
      },
      {
        id: "q6_opt2",
        title: "Creating something completely new",
        desc: "Bringing an original concept, artwork, or product to life from scratch.",
      },
      {
        id: "q6_opt3",
        title: "Improving an existing product or idea",
        desc: "Refining efficiency, user experience, and practical performance.",
      },
      {
        id: "q6_opt4",
        title: "Understanding why something works",
        desc: "Uncovering the underlying mechanics, psychological factors, or science.",
      },
    ],
  },
  {
    id: "q7",
    category: "Career Motivation",
    question: "What are the most important things you want from your career?",
    type: "multiple",
    maxSelect: 3,
    description: "Select up to 3 priorities that drive your long-term goals.",
    options: [
      { id: "q7_opt1", title: "High earning potential", desc: "Top-tier compensation & wealth generation" },
      { id: "q7_opt2", title: "Job security", desc: "Stable, dependable career with low volatility" },
      { id: "q7_opt3", title: "Work-life balance", desc: "Sustainable hours with personal freedom" },
      { id: "q7_opt4", title: "Creativity and freedom", desc: "Space for self-expression and experimentation" },
      { id: "q7_opt5", title: "Career growth", desc: "Clear ladder for rapid professional progression" },
      { id: "q7_opt6", title: "Intellectual challenge", desc: "Continuous stimulation and solving hard puzzles" },
      { id: "q7_opt7", title: "Making a positive impact", desc: "Directly improving human lives and society" },
      { id: "q7_opt8", title: "Leadership opportunities", desc: "Directing teams, strategy, and vision" },
      { id: "q7_opt9", title: "Independence", desc: "Autonomy over your schedule and direction" },
      { id: "q7_opt10", title: "Recognition and status", desc: "Reputation, prestige, and industry standing" },
    ],
  },
  {
    id: "q8",
    category: "Work Environment",
    question: "Which work environment sounds most comfortable to you?",
    type: "single",
    description: "The setting where you produce your highest-quality output.",
    options: [
      {
        id: "q8_opt1",
        title: "Working independently with a high degree of freedom",
        desc: "Deep focus, self-directed timelines, and low administrative meetings.",
      },
      {
        id: "q8_opt2",
        title: "Working in a small collaborative team",
        desc: "Close-knit dynamic, rapid feedback, and shared accountability.",
      },
      {
        id: "q8_opt3",
        title: "Working in a large organization with structured processes",
        desc: "Established resources, standardized roles, and clear hierarchies.",
      },
      {
        id: "q8_opt4",
        title: "Leading teams and making important decisions",
        desc: "Ownership of roadmaps, coaching members, and driving execution.",
      },
    ],
  },
  {
    id: "q9",
    category: "Career Alignment",
    question: "How important is it for you to have a career that matches your personal interests?",
    type: "rating",
    min: 1,
    max: 5,
    description: "Rate from 1 (Not important) to 5 (Extremely important).",
    scaleLabels: [
      { value: 1, label: "Not Important", note: "A career is primarily a financial vehicle." },
      { value: 2, label: "Slightly Important", note: "Interests are nice, but practical factors come first." },
      { value: 3, label: "Moderately Important", note: "A reasonable balance between interest and practicality." },
      { value: 4, label: "Very Important", note: "High interest is required to stay motivated long-term." },
      { value: 5, label: "Extremely Important", note: "Essential: Passion and purpose are non-negotiable." },
    ],
  },
  {
    id: "q10",
    category: "Future Aspiration",
    question: "Imagine you have the skills and resources to pursue any career. Which role would feel most satisfying to you?",
    type: "scenario",
    description: "If all artificial barriers were removed, what is your dream role?",
    options: [
      {
        id: "q10_opt1",
        title: "Becoming an expert who solves complex technical problems",
        desc: "A recognized master of high-level engineering, algorithms, or architecture.",
      },
      {
        id: "q10_opt2",
        title: "Creating products, designs or creative experiences",
        desc: "Delighting millions with beautiful, functional, and meaningful designs.",
      },
      {
        id: "q10_opt3",
        title: "Leading a business or team",
        desc: "Directing strategic vision, scaling operations, and inspiring people.",
      },
      {
        id: "q10_opt4",
        title: "Researching new ideas and discovering knowledge",
        desc: "Pushing the frontiers of science, data analysis, or philosophy.",
      },
      {
        id: "q10_opt5",
        title: "Helping people directly through your profession",
        desc: "Directly elevating human well-being, health, or education.",
      },
      {
        id: "q10_opt6",
        title: "Building something of your own",
        desc: "Founding an independent venture, startup, or studio with total creative control.",
      },
    ],
  },
];
