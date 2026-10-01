import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { scoreStage2 } from "../services/stage2Selector.js";

// Let's create a builder that takes an adjacent map and evaluates all 55 pairs.
// We want to test different choices of adjacent slugs.

const ownMap = {};
for (const dom of DOMAINS) {
  ownMap[dom] = getRoadmapsByDomain(dom);
}

export function buildBanks(adjAssignment) {
  const q4 = {};

  // 1. Tech, Healthcare, Business (Size 7)
  for (const dom of ["tech", "healthcare", "business"]) {
    const own = ownMap[dom];
    const questions = [
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[4]]: 3 }, { [own[5]]: 3 }],
      [{ [own[6]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[4]]: 3 }],
      [{ [own[5]]: 3 }, { [own[6]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }],
      [{ [own[4]]: 3 }, { [own[5]]: 3 }, { [own[6]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }]
    ];
    // Add secondaries to roadmaps 3,4,5,6
    questions[0][0][own[3]] = 1; questions[0][1][own[4]] = 1; questions[0][2][own[5]] = 1; questions[0][3][own[6]] = 1;
    questions[1][0][own[3]] = 1; questions[1][1][own[4]] = 1; questions[1][2][own[5]] = 1; questions[1][3][own[6]] = 1;
    questions[2][0][own[3]] = 1; questions[2][1][own[4]] = 1; questions[2][2][own[5]] = 1; questions[2][3][own[6]] = 1;
    questions[3][0][own[3]] = 1; questions[3][1][own[4]] = 1; questions[3][2][own[5]] = 1; questions[3][3][own[6]] = 1;
    q4[dom] = questions;
  }

  // 2. Creative and Media (Size 5)
  // 4 adjacents (1 per Q)
  for (const dom of ["creative", "media"]) {
    const own = ownMap[dom];
    const adjs = adjAssignment[dom]; // array of 4 slugs
    const questions = [
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[4]]: 3 }, { [adjs[0]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[4]]: 3 }, { [adjs[1]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[4]]: 3 }, { [adjs[2]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[4]]: 3 }, { [adjs[3]]: 3 }]
    ];
    // Add secondaries
    questions[0][5][own[0]] = 1; questions[1][5][own[1]] = 1;
    questions[2][5][own[2]] = 1; questions[3][5][own[3]] = 1;
    q4[dom] = questions;
  }

  // 3. Finance (Size 4)
  // 4 own options per question + 1 extra own + 1 adj
  // Roadmaps: 0, 1, 2, 3
  {
    const dom = "finance";
    const own = ownMap[dom];
    const adjs = adjAssignment[dom]; // array of 4 slugs
    const questions = [
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[0]]: 3 }, { [adjs[0]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[1]]: 3 }, { [adjs[1]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[2]]: 3 }, { [adjs[2]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[3]]: 3 }, { [own[3]]: 3 }, { [adjs[3]]: 3 }]
    ];
    // No extra secondaries for finance
    q4[dom] = questions;
  }

  // 4. Law_gov, Education_social, Aviation_hospitality (Size 3)
  // 6 adjacents
  for (const dom of ["law_gov", "education_social", "aviation_hospitality"]) {
    const own = ownMap[dom];
    const adjs = adjAssignment[dom]; // array of 6 slugs
    const questions = [
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [adjs[0]]: 3 }],
      [{ [own[2]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[0]]: 3 }, { [adjs[1]]: 3 }],
      [{ [own[1]]: 3 }, { [own[2]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [adjs[2]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [adjs[3]]: 3 }, { [adjs[4]]: 3 }, { [adjs[5]]: 3 }]
    ];
    q4[dom] = questions;
  }

  // 5. Engineering and Science (Size 2)
  // 10 adjacents
  for (const dom of ["engineering", "science"]) {
    const own = ownMap[dom];
    const adjs = adjAssignment[dom]; // array of 10 slugs
    const questions = [
      [{ [own[0]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[1]]: 3 }, { [adjs[0]]: 3 }, { [adjs[1]]: 3 }],
      [{ [own[0]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[1]]: 3 }, { [adjs[2]]: 3 }, { [adjs[3]]: 3 }],
      [{ [own[0]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[1]]: 3 }, { [adjs[4]]: 3 }, { [adjs[5]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [adjs[6]]: 3 }, { [adjs[7]]: 3 }, { [adjs[8]]: 3 }, { [adjs[9]]: 3 }]
    ];
    questions[3][2][own[0]] = 1;
    questions[3][3][own[1]] = 1;
    q4[dom] = questions;
  }

  return q4;
}

console.log("Bank builder ready.");
