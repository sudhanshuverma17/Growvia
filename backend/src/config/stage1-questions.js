import { DOMAINS } from "./quizDomains.js";

/**
 * Stage 1 Discovery Questions for Indian Students (Grades 9–12)
 *
 * Design constraints:
 * 1. Exactly 7 scenario-based questions focused on activities, values, and situations.
 * 2. Absolutely NO mentions of school subjects, academic streams (Science/Commerce/Arts), or competitive exams.
 * 3. Short and accessible: under 25 words per question, under 12 words per option.
 * 4. Free of jargon, gender bias, and class-specific assumptions.
 * 5. Exactly 6 options per question, each carrying weights (1–3) for 2–3 domains.
 * 6. Perfectly balanced: every domain has an identical maximum achievable score (12).
 */

export const BLEND_MARGIN_THRESHOLD = 8; // Score difference threshold (0-100 scale) for reference
export const BLEND_MARGIN_POINTS = 1; // Raw points difference threshold (blend if #1 minus #2 <= 1 raw point)

export const STAGE1_QUESTIONS = [
  // =========================================================================
  // Question 1: School Exhibition Role (13 words)
  // =========================================================================
  {
    id: "q1",
    text: "Your school is organizing a mega annual exhibition. Which role excites you most?",
    options: [
      {
        id: "q1_opt1",
        text: "Building an interactive tech gadget or coding a digital project.", // 9 words
        weights: { tech: 3, engineering: 1 },
      },
      {
        id: "q1_opt2",
        text: "Designing the stage visuals, banners, and artistic posters.", // 9 words
        weights: { creative: 3, tech: 1 },
      },
      {
        id: "q1_opt3",
        text: "Handling ticket sales, sponsorship deals, and keeping budgets.", // 9 words
        weights: { business: 3, education_social: 1 },
      },
      {
        id: "q1_opt4",
        text: "Running the science experiment booth or curiosity lab.", // 9 words
        weights: { science: 3, engineering: 1 },
      },
      {
        id: "q1_opt5",
        text: "Welcoming VIP guests, coordinating teams, and hosting attendees.", // 9 words
        weights: { education_social: 3, creative: 1 },
      },
      {
        id: "q1_opt6",
        text: "Assembling structural display frames and testing motorized rigs.", // 9 words
        weights: { engineering: 3, science: 1 },
      },
    ],
  },

  // =========================================================================
  // Question 2: Weekend Free Time (15 words)
  // =========================================================================
  {
    id: "q2",
    text: "You have an entire free Sunday with no study pressure. How do you spend it?",
    options: [
      {
        id: "q2_opt1",
        text: "Learning emergency first aid or volunteering at a wellness clinic.", // 10 words
        weights: { healthcare: 3, science: 3 },
      },
      {
        id: "q2_opt2",
        text: "Exploring flight simulators, travel vlogs, or planning vacation itineraries.", // 10 words
        weights: { aviation_hospitality: 3, creative: 1 },
      },
      {
        id: "q2_opt3",
        text: "Drafting petitions, debating civic rules, and discussing justice.", // 9 words
        weights: { law_gov: 3, healthcare: 1 },
      },
      {
        id: "q2_opt4",
        text: "Reviewing personal savings, investment apps, or budgeting tools.", // 9 words
        weights: { finance: 3, law_gov: 1 },
      },
      {
        id: "q2_opt5",
        text: "Sketching new design concepts, digital art, or custom fashion.", // 10 words
        weights: { creative: 3, aviation_hospitality: 1 },
      },
      {
        id: "q2_opt6",
        text: "Experimenting with home automation tools or coding useful scripts.", // 9 words
        weights: { tech: 3, finance: 1 },
      },
    ],
  },

  // =========================================================================
  // Question 3: Solving a Community Problem (14 words)
  // =========================================================================
  {
    id: "q3",
    text: "Your local community faces an urgent problem. How would you contribute to solving it?",
    options: [
      {
        id: "q3_opt1",
        text: "Organizing medical health camps and nutritional food distribution.", // 8 words
        weights: { healthcare: 3, education_social: 1 },
      },
      {
        id: "q3_opt2",
        text: "Mobilizing local donors, fundraising drives, and managing relief funds.", // 9 words
        weights: { business: 3, aviation_hospitality: 1 },
      },
      {
        id: "q3_opt3",
        text: "Producing informative news videos and social awareness broadcasts.", // 9 words
        weights: { media: 3, healthcare: 1 },
      },
      {
        id: "q3_opt4",
        text: "Designing rainwater harvesting units or repairing damaged pipelines.", // 9 words
        weights: { engineering: 3, business: 1 },
      },
      {
        id: "q3_opt5",
        text: "Teaching emergency survival workshops and reassuring worried families.", // 9 words
        weights: { education_social: 3, media: 1 },
      },
      {
        id: "q3_opt6",
        text: "Arranging transport logistics, temporary shelter, and guest care.", // 9 words
        weights: { aviation_hospitality: 3, engineering: 1 },
      },
    ],
  },

  // =========================================================================
  // Question 4: Group Competition Role (12 words)
  // =========================================================================
  {
    id: "q4",
    text: "In a group project competition, which responsibility do you instinctively take on?",
    options: [
      {
        id: "q4_opt1",
        text: "Programming digital prototypes and running automated software tests.", // 9 words
        weights: { tech: 3, science: 3 },
      },
      {
        id: "q4_opt2",
        text: "Ensuring team well-being, ergonomics, and calm emotional support.", // 9 words
        weights: { healthcare: 3, tech: 1 },
      },
      {
        id: "q4_opt3",
        text: "Crunching survey statistics, financial calculations, and cost models.", // 9 words
        weights: { finance: 3, healthcare: 1, science: 1 },
      },
      {
        id: "q4_opt4",
        text: "Writing the final project report and narrating the presentation.", // 10 words
        weights: { media: 3, law_gov: 1 },
      },
      {
        id: "q4_opt5",
        text: "Verifying competition rules, resolving disputes, and defending arguments.", // 9 words
        weights: { law_gov: 3, finance: 1 },
      },
      {
        id: "q4_opt6",
        text: "Managing timetable schedules, stage hospitality, and team coordination.", // 9 words
        weights: { aviation_hospitality: 3, media: 1 },
      },
    ],
  },

  // =========================================================================
  // Question 5: Exciting Work Environment (13 words)
  // =========================================================================
  {
    id: "q5",
    text: "Which work environment would make you look forward to waking up every morning?",
    options: [
      {
        id: "q5_opt1",
        text: "A fast-paced startup hub building bold commercial ventures.", // 9 words
        weights: { business: 3, finance: 1 },
      },
      {
        id: "q5_opt2",
        text: "A high-stakes investment boardroom or financial trading floor.", // 9 words
        weights: { finance: 3, creative: 1 },
      },
      {
        id: "q5_opt3",
        text: "A colorful design studio full of prototypes and creative moodboards.", // 11 words
        weights: { creative: 3, engineering: 1 },
      },
      {
        id: "q5_opt4",
        text: "A modern robotics workshop or physical machinery fabrication plant.", // 10 words
        weights: { engineering: 3, law_gov: 1 },
      },
      {
        id: "q5_opt5",
        text: "A respected courtroom, parliamentary chamber, or legal aid center.", // 10 words
        weights: { law_gov: 3, education_social: 1 },
      },
      {
        id: "q5_opt6",
        text: "An empowering learning campus or community youth leadership academy.", // 10 words
        weights: { education_social: 3, business: 1 },
      },
    ],
  },

  // =========================================================================
  // Question 6: Complex Problem Instinct (12 words)
  // =========================================================================
  {
    id: "q6",
    text: "When facing a complex, unfamiliar challenge, what is your first natural instinct?",
    options: [
      {
        id: "q6_opt1",
        text: "Write code to automate the puzzle and test digital outputs.", // 11 words
        weights: { tech: 3, media: 1 },
      },
      {
        id: "q6_opt2",
        text: "Observe human behavior, relieve stress, and diagnose underlying symptoms.", // 10 words
        weights: { healthcare: 3, business: 1 },
      },
      {
        id: "q6_opt3",
        text: "Draft strategic action steps, find partners, and manage resources.", // 10 words
        weights: { business: 3, education_social: 1 },
      },
      {
        id: "q6_opt4",
        text: "Investigate facts, record interviews, and broadcast the honest truth.", // 10 words
        weights: { media: 3, tech: 1 },
      },
      {
        id: "q6_opt5",
        text: "Analyze rights, check legal regulations, and ensure fair treatment.", // 10 words
        weights: { law_gov: 3, healthcare: 1 },
      },
      {
        id: "q6_opt6",
        text: "Gather affected people to share insights and learn collaboratively.", // 10 words
        weights: { education_social: 3, law_gov: 1 },
      },
    ],
  },

  // =========================================================================
  // Question 7: Proudest Achievement (14 words)
  // =========================================================================
  {
    id: "q7",
    text: "Looking back on a finished project, what gives you the deepest feeling of pride?",
    options: [
      {
        id: "q7_opt1",
        text: "Securing profitable financial returns and long-term financial stability.", // 9 words
        weights: { finance: 3, creative: 1 },
      },
      {
        id: "q7_opt2",
        text: "Crafting a stunning visual piece that captures people's imagination.", // 10 words
        weights: { creative: 3, media: 1 },
      },
      {
        id: "q7_opt3",
        text: "Reaching a wide audience with a compelling and viral documentary.", // 11 words
        weights: { media: 3, engineering: 1 },
      },
      {
        id: "q7_opt4",
        text: "Constructing a durable, tangible machine that works smoothly every time.", // 11 words
        weights: { engineering: 3, aviation_hospitality: 1 },
      },
      {
        id: "q7_opt5",
        text: "Delivering effortless guest hospitality and flawless live event coordination.", // 10 words
        weights: { aviation_hospitality: 3, science: 1 },
      },
      {
        id: "q7_opt6",
        text: "Proving a new scientific hypothesis through rigorous experimental discovery.", // 10 words
        weights: { science: 3, finance: 1 },
      },
    ],
  },
];

/**
 * Computes the maximum achievable Stage 1 score for each of the 11 domains.
 * Sums the maximum weight available for each domain across each question.
 */
export function getStage1MaxScores(questions = STAGE1_QUESTIONS) {
  const maxScores = {};
  for (const d of DOMAINS) maxScores[d] = 0;

  for (const q of questions) {
    const maxInQ = {};
    for (const d of DOMAINS) maxInQ[d] = 0;

    for (const opt of q.options) {
      for (const [dom, w] of Object.entries(opt.weights)) {
        if (!DOMAINS.includes(dom)) {
          throw new Error(`Invalid domain '${dom}' found in question ${q.id}, option ${opt.id}`);
        }
        if (w > maxInQ[dom]) maxInQ[dom] = w;
      }
    }

    for (const d of DOMAINS) {
      maxScores[d] += maxInQ[d];
    }
  }

  return maxScores;
}

export const STAGE1_MAX_SCORES = getStage1MaxScores(STAGE1_QUESTIONS);
