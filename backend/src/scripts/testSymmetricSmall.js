import { evaluateBank } from "./testSmallTuning.js";
import { STAGE2_BANKS } from "../services/stage2Selector.js";

// Let's test a symmetrical builder
function buildSymmetricBank(domain, ownSlugs, adjSlugs) {
  // Fresh copy from memory
  const bank = JSON.parse(JSON.stringify(STAGE2_BANKS[domain]));
  const nOwn = ownSlugs.length;
  const nAdj = adjSlugs.length;

  // In each question (total 7 questions, 6 options each):
  // For 2 own roadmaps (engineering, science):
  // 7 questions x 6 options = 42 options.
  // We want own roadmaps to have 24 primary options (12 each).
  // And adjacent roadmaps to have 18 primary options (3 each for 6 adj, or for 7 adj: 4 get 3, 3 get 2).
  // In 3 questions: 4 own, 2 adj.
  // In 4 questions: 3 own, 3 adj.
  // Total own = 3*4 + 4*3 = 24.
  // Total adj = 3*2 + 4*3 = 18.

  // Let's cycle primaries perfectly:
  let ownCycle = 0;
  let adjCycle = 0;
  let adjSecCycle = 0;

  for (let qi = 0; qi < 7; qi++) {
    const numOwn = qi < 3 ? 4 : 3;
    const numAdj = 6 - numOwn;

    // Pick own primaries
    const qOwn = [];
    for (let k = 0; k < numOwn; k++) {
      qOwn.push(ownSlugs[ownCycle % nOwn]);
      ownCycle++;
    }

    // Pick adj primaries
    const qAdj = [];
    for (let k = 0; k < numAdj; k++) {
      qAdj.push(adjSlugs[adjCycle % nAdj]);
      adjCycle++;
    }

    // Interleave own and adj in options: own, adj, own, adj...
    const optionsPrimaries = [];
    let oi = 0, ai = 0;
    while (oi < qOwn.length || ai < qAdj.length) {
      if (oi < qOwn.length) optionsPrimaries.push(qOwn[oi++]);
      if (ai < qAdj.length) optionsPrimaries.push(qAdj[ai++]);
    }

    // Now set weights
    for (let optIdx = 0; optIdx < 6; optIdx++) {
      const pSlug = optionsPrimaries[optIdx];
      const opt = bank.questions[qi].options[optIdx];
      opt.weights = { [pSlug]: 3 };

      // Secondary: if primary is own, give an adjacent slug weight 2
      if (ownSlugs.includes(pSlug)) {
        const secSlug = adjSlugs[adjSecCycle % nAdj];
        adjSecCycle++;
        opt.weights[secSlug] = 2;
      }
    }
  }

  // Ensure each own roadmap has a blendCore option >= 2
  for (const s of ownSlugs) {
    let hasBlendCore = false;
    for (let qi = 0; qi < 4; qi++) {
      for (const opt of bank.questions[qi].options) {
        if ((opt.weights[s] || 0) >= 2) {
          hasBlendCore = true;
          break;
        }
      }
      if (hasBlendCore) break;
    }
    if (!hasBlendCore) {
      bank.questions[0].options[0].weights[s] = 2;
    }
  }

  return bank;
}

const engOwn = ["mechanical-engineer", "civil-engineer"];
const engAdj = ["architect", "pilot", "supply-chain", "environmental-scientist", "engineer", "army-officer"];

const testBank = buildSymmetricBank("engineering", engOwn, engAdj);
evaluateBank(testBank, engOwn, engAdj, "engineering");
