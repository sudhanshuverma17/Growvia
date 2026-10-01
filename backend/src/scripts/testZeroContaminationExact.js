import { DOMAINS, getRoadmapsByDomain, DOMAIN_ROADMAP_MAP } from "../config/quizDomains.js";
import { scoreStage2, validateBank, maxPossibleBySlug } from "../services/stage2Selector.js";

const SMALL_DOMAINS = ["engineering", "law_gov", "education_social", "aviation_hospitality", "science"];

const ownMap = {};
for (const dom of DOMAINS) ownMap[dom] = getRoadmapsByDomain(dom);

// Non-tech/healthcare/business 8 distinct adjs for Engineering:
const engAdjs = [
  "architect",              // creative
  "journalist",             // media (only 1 from media!)
  "chartered-accountant",   // finance
  "civil-services",         // law_gov
  "teacher",                // education_social
  "hotel-management",       // aviation_hospitality
  "environmental-scientist", // science
  "army-officer"            // law_gov
];

// Non-tech/healthcare/business 8 distinct adjs for Science:
const sciAdjs = [
  "fashion-designer",       // creative
  "public-relations",       // media (replaces film-director to balance secondaries)
  "financial-analyst",      // finance
  "lawyer",                 // law_gov
  "social-worker",          // education_social
  "pilot",                  // aviation_hospitality
  "graphic-designer",       // creative
  "photographer"            // media
];

// Size 3 domains adjs:
const lawAdjs = [
  "financial-analyst", "hotel-management", "actuary",
  "mechanical-engineer", "biotechnologist", "event-manager"
];
const eduAdjs = [
  "civil-engineer", "financial-analyst", "actuary",
  "environmental-scientist", "hotel-management", "pilot"
];
const avAdjs = [
  "civil-engineer", "financial-analyst", "civil-services",
  "mechanical-engineer", "chartered-accountant", "biotechnologist"
];

// Size 4 & 5 domains adjs:
const medAdjs = ["chartered-accountant", "civil-services", "mechanical-engineer", "environmental-scientist"];
const crAdjs = ["chartered-accountant", "army-officer", "civil-engineer", "biotechnologist"];
const finAdjs = ["lawyer", "mechanical-engineer", "civil-services", "environmental-scientist"];

const adjAssignment = {
  media: medAdjs,
  creative: crAdjs,
  finance: finAdjs,
  law_gov: lawAdjs,
  education_social: eduAdjs,
  aviation_hospitality: avAdjs,
  engineering: engAdjs,
  science: sciAdjs
};

export function buildBanks() {
  const banks = {};

  // 1. Tech, Healthcare, Business (Size 7)
  for (const dom of ["tech", "healthcare", "business"]) {
    const own = ownMap[dom];
    const questions = [];
    const seq = [
      [0, 1, 2, 3, 4, 5],
      [6, 0, 1, 2, 3, 4],
      [5, 6, 0, 1, 2, 3],
      [4, 5, 6, 0, 1, 2]
    ];
    for (let q = 0; q < 4; q++) {
      const opts = seq[q].map((idx, o) => ({ id: `${dom}_q${q+1}_opt${o+1}`, text: `Option for ${own[idx]}`, weights: { [own[idx]]: 3 } }));
      questions.push({ id: `${dom}_q${q+1}`, text: `Question ${q+1} in ${dom}`, blendCore: true, options: opts });
    }
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

    const numQ = dom === "tech" ? 9 : 8;
    for (let q = 4; q < numQ; q++) {
      const opts = [];
      for (let o = 0; o < 6; o++) {
        const slug = own[(q * 6 + o) % 7];
        opts.push({ id: `${dom}_q${q+1}_opt${o+1}`, text: `Option for ${slug}`, weights: { [slug]: 3 } });
      }
      questions.push({ id: `${dom}_q${q+1}`, text: `Question ${q+1} in ${dom}`, blendCore: false, options: opts });
    }
    questions[4].options[0].weights[own[0]] = 1;
    questions[4].options[1].weights[own[1]] = 1;
    questions[4].options[2].weights[own[2]] = 1;
    questions[5].options[0].weights[own[0]] = 1;
    questions[5].options[1].weights[own[1]] = 1;
    questions[5].options[2].weights[own[2]] = 1;

    banks[dom] = { domain: dom, questions };
  }

  // 2. Creative, Media (Size 5)
  for (const dom of ["creative", "media"]) {
    const own = ownMap[dom];
    const adjs = adjAssignment[dom];
    const questions = [];
    for (let q = 0; q < 4; q++) {
      const opts = [];
      for (let o = 0; o < 5; o++) {
        const secSlug = own[(q + o + 1) % 5];
        opts.push({
          id: `${dom}_q${q+1}_opt${o+1}`,
          text: `Option for ${own[o]}`,
          weights: { [own[o]]: 3, [secSlug]: 1 }
        });
      }
      opts.push({ id: `${dom}_q${q+1}_opt6`, text: `Option for ${adjs[q]}`, weights: { [adjs[q]]: 3 } });
      questions.push({ id: `${dom}_q${q+1}`, text: `Question ${q+1} in ${dom}`, blendCore: true, options: opts });
    }

    for (let q = 4; q < 8; q++) {
      const opts = [];
      for (let o = 0; o < 5; o++) opts.push({ id: `${dom}_q${q+1}_opt${o+1}`, text: `Option for ${own[o]}`, weights: { [own[o]]: 3 } });
      opts.push({ id: `${dom}_q${q+1}_opt6`, text: `Option for ${adjs[(q - 4) % 4]}`, weights: { [adjs[(q - 4) % 4]]: 3 } });
      questions.push({ id: `${dom}_q${q+1}`, text: `Question ${q+1} in ${dom}`, blendCore: false, options: opts });
    }
    questions[4].options[1].weights = { [adjs[1]]: 3 };
    questions[5].options[2].weights = { [adjs[2]]: 3 };
    questions[6].options[3].weights = { [adjs[3]]: 3 };
    questions[7].options[0].weights = { [adjs[0]]: 3 };

    // Symmetrical 1 secondary in Q4..Q7: each own roadmap gets 1 secondary (total secOpts = 5)
    for (let i = 0; i < 5; i++) {
      questions[4].options[i].weights[own[(i + 1) % 5]] = 1;
    }

    banks[dom] = { domain: dom, questions };
  }

  // 3. Finance (Size 4)
  {
    const dom = "finance";
    const own = ownMap[dom];
    const adjs = adjAssignment[dom];
    const questions = [];
    for (let q = 0; q < 4; q++) {
      const opts = [];
      for (let o = 0; o < 4; o++) opts.push({ id: `${dom}_q${q+1}_opt${o+1}`, text: `Option for ${own[o]}`, weights: { [own[o]]: 3 } });
      opts.push({ id: `${dom}_q${q+1}_opt5`, text: `Option for ${own[q]}`, weights: { [own[q]]: 3 } });
      opts.push({ id: `${dom}_q${q+1}_opt6`, text: `Option for ${adjs[q]}`, weights: { [adjs[q]]: 3 } });
      questions.push({ id: `${dom}_q${q+1}`, text: `Question ${q+1} in ${dom}`, blendCore: true, options: opts });
    }
    for (let q = 4; q < 8; q++) {
      const opts = [];
      for (let o = 0; o < 4; o++) opts.push({ id: `${dom}_q${q+1}_opt${o+1}`, text: `Option for ${own[o]}`, weights: { [own[o]]: 3 } });
      opts.push({ id: `${dom}_q${q+1}_opt5`, text: `Option for ${own[(q + 1) % 4]}`, weights: { [own[(q + 1) % 4]]: 3 } });
      opts.push({ id: `${dom}_q${q+1}_opt6`, text: `Option for ${adjs[(q - 4) % 4]}`, weights: { [adjs[(q - 4) % 4]]: 3 } });
      questions.push({ id: `${dom}_q${q+1}`, text: `Question ${q+1} in ${dom}`, blendCore: false, options: opts });
    }
    questions[4].options[1].weights = { [adjs[1]]: 3 };
    questions[5].options[2].weights = { [adjs[2]]: 3 };
    questions[6].options[3].weights = { [adjs[3]]: 3 };
    questions[7].options[0].weights = { [adjs[0]]: 3 };

    questions[4].options[0].weights[own[1]] = 1;
    questions[5].options[0].weights[own[2]] = 1;
    questions[6].options[0].weights[own[3]] = 1;
    questions[7].options[3].weights[own[0]] = 1;
    questions[4].options[2].weights[own[0]] = 1;
    questions[5].options[2].weights[own[1]] = 1;
    questions[6].options[3].weights[own[2]] = 1;
    questions[7].options[2].weights[own[3]] = 1;

    banks[dom] = { domain: dom, questions };
  }

  // 4. Law_gov, Education_social, Aviation_hospitality (Size 3)
  for (const dom of ["law_gov", "education_social", "aviation_hospitality"]) {
    const own = ownMap[dom];
    const adjs = adjAssignment[dom]; // 6 adjs
    const questions = [
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [adjs[0]]: 3 }],
      [{ [own[2]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[0]]: 3 }, { [adjs[1]]: 3 }],
      [{ [own[1]]: 3 }, { [own[2]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [adjs[2]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [adjs[3]]: 3 }, { [adjs[4]]: 3 }, { [adjs[5]]: 3 }]
    ].map((opts, q) => ({
      id: `${dom}_q${q+1}`,
      text: `Question ${q+1} in ${dom}`,
      blendCore: true,
      options: opts.map((w, o) => ({ id: `${dom}_q${q+1}_opt${o+1}`, text: `Option for ${Object.keys(w)[0]}`, weights: w }))
    }));

    const q4_6 = [
      [own[0], adjs[0], adjs[1], adjs[2], adjs[3], adjs[4]],
      [own[1], adjs[1], adjs[2], adjs[3], adjs[4], adjs[5]],
      [own[2], adjs[2], adjs[3], adjs[4], adjs[5], adjs[0]]
    ];
    for (let q = 4; q < 7; q++) {
      const opts = q4_6[q - 4].map((slug, o) => ({ id: `${dom}_q${q+1}_opt${o+1}`, text: `Option for ${slug}`, weights: { [slug]: 3 } }));
      questions.push({ id: `${dom}_q${q+1}`, text: `Question ${q+1} in ${dom}`, blendCore: false, options: opts });
    }

    questions[4].options[1].weights[own[1]] = 1;
    questions[5].options[1].weights[own[2]] = 1;
    questions[6].options[1].weights[own[0]] = 1;
    questions[4].options[2].weights[own[2]] = 1;
    questions[5].options[2].weights[own[0]] = 1;
    questions[6].options[2].weights[own[1]] = 1;

    banks[dom] = { domain: dom, questions };
  }

  // 5. Engineering, Science (Size 2)
  // 8 DISTINCT ADJS in Q0..Q3, each appears EXACTLY ONCE!
  for (const dom of ["engineering", "science"]) {
    const own = ownMap[dom];
    const adjs = adjAssignment[dom]; // 8 distinct adjs
    const questions = [
      [{ [own[0]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[1]]: 3 }, { [adjs[0]]: 3 }, { [adjs[1]]: 3 }],
      [{ [own[0]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[1]]: 3 }, { [adjs[2]]: 3 }, { [adjs[3]]: 3 }],
      [{ [own[0]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[1]]: 3 }, { [adjs[4]]: 3 }, { [adjs[5]]: 3 }],
      [{ [own[0]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[1]]: 3 }, { [adjs[6]]: 3 }, { [adjs[7]]: 3 }]
    ].map((opts, q) => ({
      id: `${dom}_q${q+1}`,
      text: `Question ${q+1} in ${dom}`,
      blendCore: true,
      options: opts.map((w, o) => ({ id: `${dom}_q${q+1}_opt${o+1}`, text: `Option for ${Object.keys(w)[0]}`, weights: w }))
    }));

    // Q4..Q6 (3 questions):
    // 8 adjs: each appears in 2 of the 3 questions Q4..Q6 so distinctQs = 3 and w3Opts = 3!
    const q4_6 = [
      [own[0], adjs[0], adjs[1], adjs[2], adjs[3], adjs[4]],
      [own[1], adjs[4], adjs[5], adjs[6], adjs[7], adjs[0]],
      [adjs[1], adjs[2], adjs[3], adjs[5], adjs[6], adjs[7]]
    ];
    for (let q = 4; q < 7; q++) {
      const opts = q4_6[q - 4].map((slug, o) => ({ id: `${dom}_q${q+1}_opt${o+1}`, text: `Option for ${slug}`, weights: { [slug]: 3 } }));
      questions.push({ id: `${dom}_q${q+1}`, text: `Question ${q+1} in ${dom}`, blendCore: false, options: opts });
    }

    // Secondaries for own roadmaps (2 secondaries each in Q4..Q6)
    questions[4].options[1].weights[own[0]] = 1;
    questions[4].options[2].weights[own[1]] = 1;
    questions[5].options[1].weights[own[0]] = 1;
    questions[5].options[2].weights[own[1]] = 1;

    banks[dom] = { domain: dom, questions };
  }

  return banks;
}

const banks = buildBanks();
console.log("Banks constructed successfully.");

// Validate all banks
for (const [dom, bank] of Object.entries(banks)) {
  validateBank(bank);
}
console.log("✅ All banks passed validateBank!");

// Check Coverage rules
let covErrors = 0;
for (const dom of DOMAINS) {
  const bank = banks[dom];
  const ownRoadmaps = ownMap[dom];
  const allSlugs = new Set();
  for (const q of bank.questions) for (const opt of q.options) for (const s of Object.keys(opt.weights)) allSlugs.add(s);

  for (const slug of allSlugs) {
    const isOwn = ownRoadmaps.includes(slug);
    let totalOpts = 0, w3Opts = 0, secOpts = 0;
    const distinctQs = new Set();
    for (const q of bank.questions) {
      for (const opt of q.options) {
        const w = opt.weights[slug];
        if (w) {
          totalOpts++;
          distinctQs.add(q.id);
          if (w === 3) w3Opts++;
          else secOpts++;
        }
      }
    }
    let blendCoreGte2 = false;
    for (const q of bank.questions.filter(q => q.blendCore)) {
      for (const opt of q.options) if ((opt.weights[slug] || 0) >= 2) { blendCoreGte2 = true; break; }
      if (blendCoreGte2) break;
    }

    if (isOwn) {
      if (w3Opts < 4 || distinctQs.size < 4) { console.log(`❌ Own ${slug} in ${dom}: w3=${w3Opts} distinct=${distinctQs.size}`); covErrors++; }
      if (!blendCoreGte2) { console.log(`❌ Own ${slug} in ${dom}: blendCoreGte2 false`); covErrors++; }
      if (secOpts < 2 || secOpts > 6) { console.log(`❌ Own ${slug} in ${dom}: secOpts=${secOpts}`); covErrors++; }
    } else if (SMALL_DOMAINS.includes(dom) && w3Opts > 0) {
      if (w3Opts < 2) { console.log(`❌ Adj ${slug} in ${dom}: w3=${w3Opts} < 2`); covErrors++; }
      if (distinctQs.size < 3) { console.log(`❌ Adj ${slug} in ${dom}: distinct=${distinctQs.size} < 3`); covErrors++; }
    }
  }
}
console.log(`Coverage errors: ${covErrors}`);

// Check Single distributions (5,000 runs)
console.log("\nChecking Single-Domain Distributions (5,000 runs)...");
let distErrors = 0;
for (const dom of DOMAINS) {
  const bank = banks[dom];
  const ownRoadmaps = ownMap[dom];
  const isSmall = SMALL_DOMAINS.includes(dom);
  const n = ownRoadmaps.length;
  const winCounts = {};
  for (const s of Object.keys(DOMAIN_ROADMAP_MAP)) winCounts[s] = 0;
  const dummyStage1 = { topDomains: [dom, "other"], domainScores: { [dom]: 1.0, other: 0.5 }, isBlended: false };

  const RUNS = 5000;
  for (let r = 0; r < RUNS; r++) {
    const answers = {};
    for (const q of bank.questions) answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;
    const res = scoreStage2(answers, bank.questions, { stage1Result: dummyStage1, seed: 1337 + r });
    winCounts[res.topSlug]++;
  }

  let ownCombined = 0;
  for (const s of ownRoadmaps) ownCombined += winCounts[s];
  const ownPct = (ownCombined / RUNS) * 100;
  const nonOwnPct = 100 - ownPct;

  console.log(`[${dom.padEnd(20)}] Own: ${ownPct.toFixed(1)}%, Non-own: ${nonOwnPct.toFixed(1)}%`);

  if (isSmall) {
    if (ownPct < 60 || ownPct > 85) { console.log(`❌ Small ${dom} ownPct=${ownPct.toFixed(1)}%`); distErrors++; }
    if (nonOwnPct < 15 || nonOwnPct > 40) { console.log(`❌ Small ${dom} nonOwnPct=${nonOwnPct.toFixed(1)}%`); distErrors++; }
    const ownUniform = ownPct / n;
    for (const s of ownRoadmaps) {
      const p = (winCounts[s] / RUNS) * 100;
      if (p < 0.6 * ownUniform || p > 1.6 * ownUniform) { console.log(`❌ Small ${dom} own ${s}=${p.toFixed(1)}%`); distErrors++; }
    }
    for (const [s, cnt] of Object.entries(winCounts)) {
      if (!ownRoadmaps.includes(s) && cnt > 0) {
        const p = (cnt / RUNS) * 100;
        if (p < 1.5) { console.log(`❌ Small ${dom} adj ${s}=${p.toFixed(2)}% < 1.5%`); distErrors++; }
      }
    }
  } else {
    const u = (1 / n) * 100;
    for (const s of ownRoadmaps) {
      const p = (winCounts[s] / RUNS) * 100;
      if (p < 0.6 * u || p > 1.6 * u) { console.log(`❌ Standard ${dom} own ${s}=${p.toFixed(1)}%`); distErrors++; }
    }
    if (nonOwnPct > 25.0) { console.log(`❌ Standard ${dom} nonOwnPct=${nonOwnPct.toFixed(1)}% > 25%`); distErrors++; }
  }
}
console.log(`Distribution errors: ${distErrors}`);

// Check 5B All 55 Pairs (3,000 runs)
console.log("\nChecking Section 5B All 55 Pairs (3,000 runs each)...");
const pairs = [];
for (let i = 0; i < DOMAINS.length; i++) for (let j = i + 1; j < DOMAINS.length; j++) pairs.push([DOMAINS[i], DOMAINS[j]]);

let pairFails = 0;
const results = [];
for (const [domA, domB] of pairs) {
  const bankA = banks[domA];
  const bankB = banks[domB];
  const roadmapsA = ownMap[domA];
  const roadmapsB = ownMap[domB];

  const coreA = bankA.questions.filter(q => q.blendCore).slice(0, 4);
  const coreB = bankB.questions.filter(q => q.blendCore).slice(0, 4);
  const servedSet = [];
  for (let i = 0; i < 4; i++) {
    servedSet.push(coreA[i]);
    servedSet.push(coreB[i]);
  }

  const stage1Affinity = { topDomains: [domA, domB], domainScores: { [domA]: 1.0, [domB]: 1.0 }, isBlended: true };
  let winsA = 0, winsB = 0;
  const slugWins = {};
  for (const s of [...roadmapsA, ...roadmapsB]) slugWins[s] = 0;

  for (let r = 0; r < 3000; r++) {
    const answers = {};
    for (const q of servedSet) answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;
    const res = scoreStage2(answers, servedSet, { stage1Result: stage1Affinity, seed: 1337 + r });
    if (roadmapsA.includes(res.topSlug)) { winsA++; slugWins[res.topSlug]++; }
    else if (roadmapsB.includes(res.topSlug)) { winsB++; slugWins[res.topSlug]++; }
  }

  const total = winsA + winsB;
  const shareA = (winsA / total) * 100;
  const shareB = (winsB / total) * 100;
  const valsA = roadmapsA.map(s => slugWins[s]);
  const valsB = roadmapsB.map(s => slugWins[s]);
  const ratioA = Math.max(...valsA) / Math.min(...valsA);
  const ratioB = Math.max(...valsB) / Math.min(...valsB);

  const pass = shareA >= 42.0 && shareA <= 58.0 && ratioA <= 2.0 && ratioB <= 2.0;
  if (!pass) {
    pairFails++;
    console.log(`❌ Pair (${domA}+${domB}) FAIL: shareA=${shareA.toFixed(1)}%, shareB=${shareB.toFixed(1)}%, ratioA=${ratioA.toFixed(2)}x, ratioB=${ratioB.toFixed(2)}x`);
  }
  results.push({ domA, domB, shareA, shareB, ratioA, ratioB, pass });
}
console.log(`\nPairs Passed: ${55 - pairFails} / 55`);

results.sort((a, b) => Math.abs(b.shareA - 50) - Math.abs(a.shareA - 50));
console.log("\nWorst 5 Pairs by Domain Share Margin:");
for (let i = 0; i < 5; i++) {
  const p = results[i];
  console.log(`  ${p.domA.padEnd(20)} + ${p.domB.padEnd(20)} | A: ${p.shareA.toFixed(1)}% B: ${p.shareB.toFixed(1)}% | Ratios: [A: ${p.ratioA.toFixed(2)}x, B: ${p.ratioB.toFixed(2)}x]`);
}

results.sort((a, b) => Math.max(b.ratioA, b.ratioB) - Math.max(a.ratioA, a.ratioB));
console.log("\nWorst 5 Pairs by Within-Domain Ratio (Limit <= 2.0x):");
for (let i = 0; i < 5; i++) {
  const p = results[i];
  console.log(`  ${p.domA.padEnd(20)} + ${p.domB.padEnd(20)} | MaxRatio: ${Math.max(p.ratioA, p.ratioB).toFixed(2)}x | [A: ${p.ratioA.toFixed(2)}x, B: ${p.ratioB.toFixed(2)}x]`);
}
