import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { STAGE2_BANKS } from "../services/stage2Selector.js";
import { evaluateBank } from "./testSmallTuning.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.join(__dirname, "../config/stage2-banks");

const smallBanksConfig = {
  engineering: {
    own: ["mechanical-engineer", "civil-engineer"],
    adj: ["architect", "pilot", "supply-chain", "environmental-scientist", "engineer", "army-officer"],
  },
  science: {
    own: ["biotechnologist", "environmental-scientist"],
    adj: ["pharmacist", "doctor", "data-scientist", "nutritionist", "civil-engineer", "social-worker", "teacher"],
  },
  law_gov: {
    own: ["lawyer", "civil-services", "army-officer"],
    adj: ["journalist", "public-relations", "social-worker", "pilot", "teacher", "human-resources"],
  },
  education_social: {
    own: ["teacher", "ed-tech", "social-worker"],
    adj: ["psychologist", "content-creator", "human-resources", "civil-services", "journalist", "fitness-trainer"],
  },
  aviation_hospitality: {
    own: ["pilot", "hotel-management", "event-manager"],
    adj: ["army-officer", "mechanical-engineer", "supply-chain", "marketing-manager", "public-relations", "startup-founder"],
  },
};

// Let's write an exact builder for a small bank
function buildSmallBank(domain, config, ownW3CountPerOwn, adjW3List) {
  const bank = JSON.parse(JSON.stringify(STAGE2_BANKS[domain]));
  const { own, adj } = config;
  const nOwn = own.length;
  const nAdj = adj.length;

  // Build the exact 42 primary slugs
  const primaryList = [];
  // For each own slug: ownW3CountPerOwn
  for (const s of own) {
    for (let k = 0; k < ownW3CountPerOwn; k++) primaryList.push(s);
  }
  // For each adj slug according to adjW3List
  for (let i = 0; i < nAdj; i++) {
    const count = typeof adjW3List === "number" ? adjW3List : adjW3List[i];
    for (let k = 0; k < count; k++) primaryList.push(adj[i]);
  }

  // Fill or trim to exactly 42
  let ownFillIdx = 0;
  while (primaryList.length < 42) {
    primaryList.push(own[ownFillIdx % nOwn]);
    ownFillIdx++;
  }

  // Interleave evenly across 7 questions
  // In each question: exactly Math.floor(ownTotal/7) own slugs, rest adjacent
  const ownList = primaryList.filter(s => own.includes(s));
  const adjList = primaryList.filter(s => adj.includes(s));

  const qPrimaries = Array.from({ length: 7 }, () => []);
  const ownPerQ = Math.floor(ownList.length / 7);
  const ownRemainder = ownList.length % 7;

  let ownIdx = 0;
  let adjIdx = 0;

  for (let qi = 0; qi < 7; qi++) {
    const numOwnThisQ = ownPerQ + (qi < ownRemainder ? 1 : 0);
    const numAdjThisQ = 6 - numOwnThisQ;

    for (let k = 0; k < numOwnThisQ; k++) {
      qPrimaries[qi].push(ownList[ownIdx++]);
    }
    for (let k = 0; k < numAdjThisQ; k++) {
      qPrimaries[qi].push(adjList[adjIdx++]);
    }
  }

  // Now assign weights to options in bank
  // Secondaries: each slug (own and adj) should appear 3 or 4 times as secondary (weight 1)
  const secCounts = {};
  for (const s of [...own, ...adj]) secCounts[s] = 0;
  const allSlugs = [...own, ...adj];
  let secSlugIdx = 0;

  for (let qi = 0; qi < 7; qi++) {
    const q = bank.questions[qi];
    for (let oi = 0; oi < 6; oi++) {
      const primarySlug = qPrimaries[qi][oi];
      const opt = q.options[oi];

      // Pick a secondary slug that is not primarySlug and has secCounts < 4
      let chosenSec = null;
      for (let attempt = 0; attempt < allSlugs.length; attempt++) {
        const candidate = allSlugs[(secSlugIdx + attempt) % allSlugs.length];
        if (candidate !== primarySlug && secCounts[candidate] < 4) {
          chosenSec = candidate;
          secSlugIdx = (secSlugIdx + attempt + 1) % allSlugs.length;
          break;
        }
      }

      opt.weights = { [primarySlug]: 3 };
      if (chosenSec) {
        opt.weights[chosenSec] = 1;
        secCounts[chosenSec]++;
      }
    }
  }

  // Ensure every slug has at least 3 secondaries
  for (const s of allSlugs) {
    while (secCounts[s] < 3) {
      let added = false;
      for (const q of bank.questions) {
        for (const opt of q.options) {
          if (!opt.weights[s] && Object.keys(opt.weights).length === 1) {
            opt.weights[s] = 1;
            secCounts[s]++;
            added = true;
            break;
          }
        }
        if (added) break;
      }
      if (!added) break;
    }
  }

  // Also ensure every own roadmap has blendCore >= 2
  for (const s of own) {
    let hasBlendCoreGte2 = false;
    for (let qi = 0; qi < 4; qi++) {
      const q = bank.questions[qi];
      for (const opt of q.options) {
        if ((opt.weights[s] || 0) >= 2) {
          hasBlendCoreGte2 = true;
          break;
        }
      }
      if (hasBlendCoreGte2) break;
    }
    if (!hasBlendCoreGte2) {
      // Put weight 2 on a blendCore question option
      bank.questions[0].options[0].weights[s] = 2;
    }
  }

  return bank;
}

function runSmallDomain(domain, config, adjW3Spec) {
  console.log(`\n======================================================`);
  console.log(`Testing Small Domain: ${domain}`);
  console.log(`======================================================`);
  const bank = JSON.parse(JSON.stringify(STAGE2_BANKS[domain]));
  const { own, adj } = config;
  const nOwn = own.length;
  const nAdj = adj.length;

  // Build 42 primaries
  const primaryList = [];
  for (let i = 0; i < nAdj; i++) {
    const count = typeof adjW3Spec === "number" ? adjW3Spec : adjW3Spec[i];
    for (let k = 0; k < count; k++) primaryList.push(adj[i]);
  }
  const ownTotal = 42 - primaryList.length;
  const ownPerSlug = Math.floor(ownTotal / nOwn);
  for (let i = 0; i < nOwn; i++) {
    const count = (i < ownTotal % nOwn) ? ownPerSlug + 1 : ownPerSlug;
    for (let k = 0; k < count; k++) primaryList.push(own[i]);
  }

  // Distribute evenly across 7 questions
  const qPrimaries = Array.from({ length: 7 }, () => []);
  let ownArr = primaryList.filter(s => own.includes(s));
  let adjArr = primaryList.filter(s => adj.includes(s));

  for (let qi = 0; qi < 7; qi++) {
    const numOwn = Math.floor(ownArr.length / (7 - qi));
    const numAdj = 6 - numOwn;
    for (let k = 0; k < numOwn; k++) qPrimaries[qi].push(ownArr.pop());
    for (let k = 0; k < numAdj; k++) qPrimaries[qi].push(adjArr.pop());
  }

  // Assign to options
  const secCounts = {};
  for (const s of [...own, ...adj]) secCounts[s] = 0;
  const allSlugs = [...own, ...adj];
  let sIdx = 0;

  for (let qi = 0; qi < 7; qi++) {
    const q = bank.questions[qi];
    for (let oi = 0; oi < 6; oi++) {
      const pSlug = qPrimaries[qi][oi];
      let chosenSec = null;
      for (let attempt = 0; attempt < allSlugs.length; attempt++) {
        const cand = allSlugs[(sIdx + attempt) % allSlugs.length];
        if (cand !== pSlug && secCounts[cand] < 4) {
          chosenSec = cand;
          sIdx = (sIdx + attempt + 1) % allSlugs.length;
          break;
        }
      }
      const opt = q.options[oi];
      const isAdjSec = adj.includes(chosenSec);
      opt.weights = { [pSlug]: 3 };
      if (chosenSec) {
        opt.weights[chosenSec] = isAdjSec ? 2 : 1;
        secCounts[chosenSec]++;
      }
    }
  }

  // Ensure every adjacent slug has at least 3 secondary appearances of weight 2
  for (const s of adj) {
    let countW2 = 0;
    for (const q of bank.questions) {
      for (const opt of q.options) {
        if (opt.weights[s] === 2) countW2++;
      }
    }
    while (countW2 < 3) {
      // Find an option where s is not primary and doesn't already have s
      for (const q of bank.questions) {
        for (const opt of q.options) {
          if (!opt.weights[s] && !opt.weights[s] && opt.weights[Object.keys(opt.weights)[0]] === 3) {
            // Replace or add secondary
            const keys = Object.keys(opt.weights);
            if (keys.length === 2 && keys[1] !== s) {
              const oldSec = keys[1];
              if (secCounts[oldSec] > 3) {
                delete opt.weights[oldSec];
                opt.weights[s] = 2;
                secCounts[oldSec]--;
                secCounts[s]++;
                countW2++;
                break;
              }
            }
          }
        }
        if (countW2 >= 3) break;
      }
      break;
    }
  }

  evaluateBank(bank, own, adj, domain);
  return bank;
}

const tunedBanks = {};
for (const [domain, config] of Object.entries(smallBanksConfig)) {
  const adjSpec = domain === "science" ? [3, 3, 3, 3, 3, 3, 3] : 3;
  const bank = runSmallDomain(domain, config, adjSpec);
  tunedBanks[domain] = bank;
  fs.writeFileSync(path.join(banksDir, `${domain}.js`), `export default ${JSON.stringify(bank, null, 2)};\n`, "utf-8");
  console.log(`Saved tuned bank: ${domain}.js`);
}




