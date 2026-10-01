import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";

const SMALL_DOMAINS = ["engineering", "law_gov", "education_social", "aviation_hospitality", "science"];
import { scoreStage2 } from "../services/stage2Selector.js";

const ownMap = {};
for (const dom of DOMAINS) ownMap[dom] = getRoadmapsByDomain(dom);

// Let's define the adjacent map for single-domain mode (only in Q5..Q7 / Q5..Q8)
const adjAssignment = {
  media: ["chartered-accountant", "civil-services", "mechanical-engineer", "environmental-scientist"],
  creative: ["chartered-accountant", "army-officer", "civil-engineer", "biotechnologist"],
  finance: ["lawyer", "mechanical-engineer", "civil-services", "environmental-scientist"],
  law_gov: ["financial-analyst", "hotel-management", "actuary"],
  education_social: ["civil-engineer", "financial-analyst", "actuary"],
  aviation_hospitality: ["architect", "financial-analyst", "civil-services"],
  engineering: ["hotel-management", "chartered-accountant", "pilot", "actuary"],
  science: ["hotel-management", "financial-analyst", "civil-services", "pilot"]
};

// Function to generate the full bank for a domain:
export function generateBank(dom) {
  const own = ownMap[dom];
  const questions = [];

  // Q1..Q4: BLENDCORE (EXCLUSIVELY OWN ROADMAPS)
  if (dom === "tech" || dom === "healthcare" || dom === "business") {
    // 7 roadmaps, 6 options
    const seq = [
      [0, 1, 2, 3, 4, 5],
      [6, 0, 1, 2, 3, 4],
      [5, 6, 0, 1, 2, 3],
      [4, 5, 6, 0, 1, 2]
    ];
    for (let q = 0; q < 4; q++) {
      const opts = seq[q].map((idx, o) => ({ id: `q${q}_o${o}`, weights: { [own[idx]]: 3 } }));
      questions.push({ id: `${dom}_q${q}`, blendCore: true, options: opts });
    }
    // Balance roadmaps 3,4,5,6 with secondaries in Q1..Q4
    questions[0].options[0].weights[own[3]] = 1;
    questions[0].options[1].weights[own[4]] = 1;
    questions[0].options[2].weights[own[5]] = 1;
    questions[0].options[3].weights[own[6]] = 1;

    questions[1].options[0].weights[own[3]] = 1;
    questions[1].options[1].weights[own[4]] = 1;
    questions[1].options[2].weights[own[5]] = 1;
    questions[1].options[3].weights[own[6]] = 1;

    questions[2].options[0].weights[own[3]] = 1;
    questions[2].options[1].weights[own[4]] = 1;
    questions[2].options[2].weights[own[5]] = 1;
    questions[2].options[3].weights[own[6]] = 1;

    questions[3].options[0].weights[own[3]] = 1;
    questions[3].options[1].weights[own[4]] = 1;
    questions[3].options[2].weights[own[5]] = 1;
    questions[3].options[3].weights[own[6]] = 1;

    // Q5..end:
    const numQ = dom === "tech" ? 9 : 8;
    for (let q = 4; q < numQ; q++) {
      const opts = [];
      for (let o = 0; o < 6; o++) {
        opts.push({ id: `q${q}_o${o}`, weights: { [own[(q * 6 + o) % 7]]: 3 } });
      }
      questions.push({ id: `${dom}_q${q}`, blendCore: false, options: opts });
    }
    // Secondaries in Q5..Q6 for roadmaps 0, 1, 2
    questions[4].options[0].weights[own[0]] = 1;
    questions[4].options[1].weights[own[1]] = 1;
    questions[4].options[2].weights[own[2]] = 1;
    questions[5].options[0].weights[own[0]] = 1;
    questions[5].options[1].weights[own[1]] = 1;
    questions[5].options[2].weights[own[2]] = 1;
  }
  else if (dom === "creative" || dom === "media") {
    // 5 roadmaps. In Q1..Q4: 6 options per question.
    // Roadmaps 0,1,2,3,4. 24 slots total.
    // 0 appears 5 times, 1 appears 5 times, 2 appears 5 times, 3 appears 5 times, 4 appears 4 times.
    // Options:
    // Q0: 0, 1, 2, 3, 4, 0
    // Q1: 1, 2, 3, 4, 0, 1
    // Q2: 2, 3, 4, 0, 1, 2
    // Q3: 3, 4, 0, 1, 2, 3
    // All 4 roadmaps (0,1,2,3) appear 5 times, roadmap 4 appears 4 times.
    // Add secondaries to roadmap 4 so it's perfectly balanced!
    for (let q = 0; q < 4; q++) {
      const opts = [];
      for (let o = 0; o < 6; o++) {
        const slug = own[(q + o) % 5];
        opts.push({ id: `q${q}_o${o}`, weights: { [slug]: 3 } });
      }
      // Give roadmap 4 a secondary weight on option 0 of Q0, Q1, Q2
      if (q < 3) opts[0].weights[own[4]] = 1;
      questions.push({ id: `${dom}_q${q}`, blendCore: true, options: opts });
    }

    // Q5..Q8: 8 questions total. Include cross-listed slugs in Q5..Q8!
    const adjs = adjAssignment[dom];
    for (let q = 4; q < 8; q++) {
      const opts = [];
      for (let o = 0; o < 5; o++) {
        opts.push({ id: `q${q}_o${o}`, weights: { [own[o]]: 3 } });
      }
      // 6th option is cross-listed
      const crossSlug = adjs[(q - 4) % 4];
      opts.push({ id: `q${q}_o5`, weights: { [crossSlug]: 3 } });
      questions.push({ id: `${dom}_q${q}`, blendCore: false, options: opts });
    }
    // Make sure each cross-listed slug appears in 2 questions in Q5..Q8
    questions[4].options[1].weights = { [adjs[1]]: 3 };
    questions[5].options[2].weights = { [adjs[2]]: 3 };
    questions[6].options[3].weights = { [adjs[3]]: 3 };
    questions[7].options[0].weights = { [adjs[0]]: 3 };

    // Secondaries for own roadmaps in Q5..Q8
    questions[4].options[0].weights[own[1]] = 1;
    questions[5].options[0].weights[own[2]] = 1;
    questions[6].options[0].weights[own[3]] = 1;
    questions[7].options[4].weights[own[0]] = 1;
    questions[4].options[4].weights[own[0]] = 1;
    questions[5].options[4].weights[own[1]] = 1;
    questions[6].options[4].weights[own[2]] = 1;
    questions[4].options[1].weights[own[4]] = 1;
    questions[5].options[1].weights[own[4]] = 1;
  }
  else if (dom === "finance") {
    // 4 roadmaps. In Q1..Q4: 6 options per question. 24 slots total.
    // Exactly 6 slots per roadmap!
    // Q0: 0, 1, 2, 3, 0, 1
    // Q1: 2, 3, 0, 1, 2, 3
    // Q2: 0, 1, 2, 3, 0, 1
    // Q3: 2, 3, 0, 1, 2, 3
    const pat = [
      [0, 1, 2, 3, 0, 1],
      [2, 3, 0, 1, 2, 3],
      [0, 1, 2, 3, 0, 1],
      [2, 3, 0, 1, 2, 3]
    ];
    for (let q = 0; q < 4; q++) {
      const opts = pat[q].map((idx, o) => ({ id: `q${q}_o${o}`, weights: { [own[idx]]: 3 } }));
      questions.push({ id: `${dom}_q${q}`, blendCore: true, options: opts });
    }

    // Q5..Q8: 8 questions total. Include cross-listed in Q5..Q8
    const adjs = adjAssignment[dom];
    for (let q = 4; q < 8; q++) {
      const opts = [];
      for (let o = 0; o < 4; o++) opts.push({ id: `q${q}_o${o}`, weights: { [own[o]]: 3 } });
      opts.push({ id: `q${q}_o4`, weights: { [own[(q + 1) % 4]]: 3 } });
      opts.push({ id: `q${q}_o5`, weights: { [adjs[(q - 4) % 4]]: 3 } });
      questions.push({ id: `${dom}_q${q}`, blendCore: false, options: opts });
    }
    // Extra options for cross-listed
    questions[4].options[1].weights = { [adjs[1]]: 3 };
    questions[5].options[2].weights = { [adjs[2]]: 3 };
    questions[6].options[3].weights = { [adjs[3]]: 3 };
    questions[7].options[0].weights = { [adjs[0]]: 3 };

    // Secondaries for own
    questions[4].options[0].weights[own[1]] = 1;
    questions[5].options[0].weights[own[2]] = 1;
    questions[6].options[0].weights[own[3]] = 1;
    questions[7].options[3].weights[own[0]] = 1;
    questions[4].options[2].weights[own[0]] = 1;
    questions[5].options[2].weights[own[1]] = 1;
    questions[6].options[3].weights[own[2]] = 1;
    questions[7].options[2].weights[own[3]] = 1;
  }
  else if (dom === "law_gov" || dom === "education_social" || dom === "aviation_hospitality") {
    // 3 roadmaps: 0, 1, 2. 6 options per question in Q1..Q4.
    // Q0..Q3: exactly two of 0, two of 1, two of 2 per question!
    for (let q = 0; q < 4; q++) {
      const opts = [
        { id: `q${q}_o0`, weights: { [own[0]]: 3 } },
        { id: `q${q}_o1`, weights: { [own[1]]: 3 } },
        { id: `q${q}_o2`, weights: { [own[2]]: 3 } },
        { id: `q${q}_o3`, weights: { [own[0]]: 3 } },
        { id: `q${q}_o4`, weights: { [own[1]]: 3 } },
        { id: `q${q}_o5`, weights: { [own[2]]: 3 } }
      ];
      questions.push({ id: `${dom}_q${q}`, blendCore: true, options: opts });
    }

    // Q5..Q7: 7 questions total.
    // Small domain rule: adjacents must get 15-40% combined top-1, each >= 1.5%.
    // In Q5..Q7 (3 questions):
    // 2 own options, 4 adjacent options
    const adjs = adjAssignment[dom]; // 3 adjacents
    const ownPairs = [[0, 1], [1, 2], [2, 0]];
    for (let q = 4; q < 7; q++) {
      const p = ownPairs[q - 4];
      const opts = [
        { id: `q${q}_o0`, weights: { [own[p[0]]]: 3 } },
        { id: `q${q}_o1`, weights: { [own[p[1]]]: 3 } },
        { id: `q${q}_o2`, weights: { [adjs[0]]: 3 } },
        { id: `q${q}_o3`, weights: { [adjs[1]]: 3 } },
        { id: `q${q}_o4`, weights: { [adjs[2]]: 3 } },
        { id: `q${q}_o5`, weights: { [adjs[(q - 4) % 3]]: 3 } }
      ];
      questions.push({ id: `${dom}_q${q}`, blendCore: false, options: opts });
    }

    // Secondaries for own roadmaps (each gets 2 secondaries in Q5..Q7)
    questions[4].options[0].weights[own[2]] = 1;
    questions[5].options[0].weights[own[0]] = 1;
    questions[6].options[0].weights[own[1]] = 1;
    questions[4].options[1].weights[own[2]] = 1;
    questions[5].options[1].weights[own[0]] = 1;
    questions[6].options[1].weights[own[1]] = 1;
  }
  else if (dom === "engineering" || dom === "science") {
    // 2 roadmaps: 0, 1. In Q1..Q4: 6 options per question.
    // Exactly 3 of 0, 3 of 1 per question!
    for (let q = 0; q < 4; q++) {
      const opts = [
        { id: `q${q}_o0`, weights: { [own[0]]: 3 } },
        { id: `q${q}_o1`, weights: { [own[1]]: 3 } },
        { id: `q${q}_o2`, weights: { [own[0]]: 3 } },
        { id: `q${q}_o3`, weights: { [own[1]]: 3 } },
        { id: `q${q}_o4`, weights: { [own[0]]: 3 } },
        { id: `q${q}_o5`, weights: { [own[1]]: 3 } }
      ];
      questions.push({ id: `${dom}_q${q}`, blendCore: true, options: opts });
    }

    // Q5..Q7: 7 questions total.
    // 4 adjacents. In Q5..Q7:
    // 2 own options, 4 adjacent options
    const adjs = adjAssignment[dom]; // 4 adjacents
    for (let q = 4; q < 7; q++) {
      const opts = [
        { id: `q${q}_o0`, weights: { [own[0]]: 3 } },
        { id: `q${q}_o1`, weights: { [own[1]]: 3 } },
        { id: `q${q}_o2`, weights: { [adjs[0]]: 3 } },
        { id: `q${q}_o3`, weights: { [adjs[1]]: 3 } },
        { id: `q${q}_o4`, weights: { [adjs[2]]: 3 } },
        { id: `q${q}_o5`, weights: { [adjs[3]]: 3 } }
      ];
      questions.push({ id: `${dom}_q${q}`, blendCore: false, options: opts });
    }

    // Secondaries for own roadmaps (each gets 2 secondaries in Q5..Q7)
    questions[4].options[0].weights[own[1]] = 1;
    questions[5].options[0].weights[own[1]] = 1;
    questions[4].options[1].weights[own[0]] = 1;
    questions[5].options[1].weights[own[0]] = 1;
  }

  return { domain: dom, questions };
}

console.log("Generator ready.");
