import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { scoreStage2, validateBank, getStage2Set } from "../services/stage2Selector.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.resolve(__dirname, "../config/stage2-banks");

const ownMap = {};
for (const dom of DOMAINS) ownMap[dom] = getRoadmapsByDomain(dom);

const engAdjs = [
  "architect",              // creative
  "journalist",             // media
  "chartered-accountant",   // finance
  "civil-services",         // law_gov
  "teacher",                // education_social
  "hotel-management",       // aviation_hospitality
  "environmental-scientist", // science
  "army-officer"            // law_gov
];

const sciAdjs = [
  "fashion-designer",       // creative
  "public-relations",       // media
  "financial-analyst",      // finance
  "lawyer",                 // law_gov
  "social-worker",          // education_social
  "pilot",                  // aviation_hospitality
  "graphic-designer",       // creative
  "photographer"            // media
];

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

function setOption(opt, slug, weight = 3, isOwn = true, secondarySlug = null, secondaryWeight = 1) {
  opt.weights = { [slug]: weight };
  if (secondarySlug) {
    opt.weights[secondarySlug] = secondaryWeight;
  }
  if (isOwn) {
    opt.reason = `Option directly exercises the distinctive core practices and methodologies of ${slug}.`;
  } else {
    opt.reason = `Cross-domain perspective exercising the skills of ${slug}.`;
  }
}

export async function generateAllBanks() {
  const banks = {};

  // 1. Tech, Healthcare, Business (Size 7)
  for (const dom of ["tech", "healthcare", "business"]) {
    const filePath = path.join(banksDir, `${dom}.js`);
    const bank = JSON.parse(JSON.stringify((await import(`file://${filePath}?t=${Date.now()}`)).default));
    const own = ownMap[dom];

    const seq = [
      [0, 1, 2, 3, 4, 5],
      [6, 0, 1, 2, 3, 4],
      [5, 6, 0, 1, 2, 3],
      [4, 5, 6, 0, 1, 2]
    ];
    for (let q = 0; q < 4; q++) {
      for (let o = 0; o < 6; o++) {
        setOption(bank.questions[q].options[o], own[seq[q][o]], 3, true);
      }
    }
    bank.questions[0].options[0].weights[own[3]] = 1;
    bank.questions[0].options[1].weights[own[4]] = 1;
    bank.questions[0].options[2].weights[own[5]] = 1;
    bank.questions[0].options[3].weights[own[6]] = 1;

    bank.questions[1].options[0].weights[own[3]] = 1;
    bank.questions[1].options[1].weights[own[4]] = 1;
    bank.questions[1].options[2].weights[own[5]] = 1;
    bank.questions[1].options[3].weights[own[6]] = 1;

    bank.questions[2].options[0].weights[own[3]] = 1;
    bank.questions[2].options[1].weights[own[4]] = 1;
    bank.questions[2].options[2].weights[own[5]] = 1;
    bank.questions[2].options[3].weights[own[6]] = 1;

    bank.questions[3].options[0].weights[own[3]] = 1;
    bank.questions[3].options[1].weights[own[4]] = 1;
    bank.questions[3].options[2].weights[own[5]] = 1;
    bank.questions[3].options[3].weights[own[6]] = 1;

    for (let q = 4; q < bank.questions.length; q++) {
      for (let o = 0; o < bank.questions[q].options.length; o++) {
        const slug = own[(q * 6 + o) % 7];
        setOption(bank.questions[q].options[o], slug, 3, true);
      }
    }
    bank.questions[4].options[0].weights[own[0]] = 1;
    bank.questions[4].options[1].weights[own[1]] = 1;
    bank.questions[4].options[2].weights[own[2]] = 1;
    bank.questions[5].options[0].weights[own[0]] = 1;
    bank.questions[5].options[1].weights[own[1]] = 1;
    bank.questions[5].options[2].weights[own[2]] = 1;

    banks[dom] = bank;
  }

  // 2. Creative, Media (Size 5)
  for (const dom of ["creative", "media"]) {
    const filePath = path.join(banksDir, `${dom}.js`);
    const bank = JSON.parse(JSON.stringify((await import(`file://${filePath}?t=${Date.now()}`)).default));
    const own = ownMap[dom];
    const adjs = adjAssignment[dom];

    // Q0..Q3 (6 options each)
    for (let q = 0; q < 4; q++) {
      for (let o = 0; o < 5; o++) {
        const secSlug = own[(q + o + 1) % 5];
        setOption(bank.questions[q].options[o], own[o], 3, true, secSlug, 1);
      }
      setOption(bank.questions[q].options[5], adjs[q], 3, false);
    }

    // Q4..Q7 (5 options each)
    const q4_7 = [
      [own[0], adjs[1], own[2], own[3], own[4]],
      [own[0], own[1], adjs[2], own[3], own[4]],
      [own[0], own[1], own[2], adjs[3], own[4]],
      [adjs[0], own[1], own[2], own[3], own[4]]
    ];
    for (let q = 4; q < 8; q++) {
      for (let o = 0; o < 5; o++) {
        const s = q4_7[q - 4][o];
        setOption(bank.questions[q].options[o], s, 3, own.includes(s));
      }
    }

    // 1 secondary each in Q4 to bring secOpts to exactly 5
    bank.questions[4].options[0].weights[own[1]] = 1;
    bank.questions[5].options[0].weights[own[2]] = 1;
    bank.questions[6].options[0].weights[own[3]] = 1;
    bank.questions[7].options[1].weights[own[4]] = 1;
    bank.questions[4].options[2].weights[own[0]] = 1;

    banks[dom] = bank;
  }

  // 3. Finance (Size 4)
  {
    const dom = "finance";
    const filePath = path.join(banksDir, `${dom}.js`);
    const bank = JSON.parse(JSON.stringify((await import(`file://${filePath}?t=${Date.now()}`)).default));
    const own = ownMap[dom];
    const adjs = adjAssignment[dom];

    // Q0..Q3 (6 options each)
    for (let q = 0; q < 4; q++) {
      for (let o = 0; o < 4; o++) setOption(bank.questions[q].options[o], own[o], 3, true);
      setOption(bank.questions[q].options[4], own[q], 3, true);
      setOption(bank.questions[q].options[5], adjs[q], 3, false);
    }

    // Q4..Q7 (5 options each)
    const q4_7 = [
      [own[0], adjs[1], own[2], own[3], own[1]],
      [own[0], own[1], adjs[2], own[3], own[2]],
      [own[0], own[1], own[2], adjs[3], own[3]],
      [adjs[0], own[1], own[2], own[3], own[0]]
    ];
    for (let q = 4; q < 8; q++) {
      for (let o = 0; o < 5; o++) {
        const s = q4_7[q - 4][o];
        setOption(bank.questions[q].options[o], s, 3, own.includes(s));
      }
    }

    bank.questions[4].options[0].weights[own[1]] = 1;
    bank.questions[5].options[0].weights[own[2]] = 1;
    bank.questions[6].options[0].weights[own[3]] = 1;
    bank.questions[7].options[1].weights[own[0]] = 1;
    bank.questions[4].options[2].weights[own[0]] = 1;
    bank.questions[5].options[2].weights[own[1]] = 1;
    bank.questions[6].options[1].weights[own[2]] = 1;
    bank.questions[7].options[2].weights[own[3]] = 1;

    banks[dom] = bank;
  }

  // 4. Law_gov, Education_social, Aviation_hospitality (Size 3)
  for (const dom of ["law_gov", "education_social", "aviation_hospitality"]) {
    const filePath = path.join(banksDir, `${dom}.js`);
    const bank = JSON.parse(JSON.stringify((await import(`file://${filePath}?t=${Date.now()}`)).default));
    const own = ownMap[dom];
    const adjs = adjAssignment[dom]; // 6 adjs

    // Q0..Q3:
    const q0_3 = [
      [own[0], own[1], own[2], own[0], own[1], adjs[0]],
      [own[2], own[0], own[1], own[2], own[0], adjs[1]],
      [own[1], own[2], own[0], own[1], own[2], adjs[2]],
      [own[0], own[1], own[2], adjs[3], adjs[4], adjs[5]]
    ];
    for (let q = 0; q < 4; q++) {
      for (let o = 0; o < 6; o++) {
        const s = q0_3[q][o];
        setOption(bank.questions[q].options[o], s, 3, own.includes(s));
      }
    }

    // Q4..Q6:
    const q4_6 = [
      [own[0], adjs[0], adjs[1], adjs[2], adjs[3], adjs[4]],
      [own[1], adjs[1], adjs[2], adjs[3], adjs[4], adjs[5]],
      [own[2], adjs[2], adjs[3], adjs[4], adjs[5], adjs[0]]
    ];
    for (let q = 4; q < 7; q++) {
      for (let o = 0; o < 6; o++) {
        const s = q4_6[q - 4][o];
        setOption(bank.questions[q].options[o], s, 3, own.includes(s));
      }
    }

    bank.questions[4].options[1].weights[own[1]] = 1;
    bank.questions[5].options[1].weights[own[2]] = 1;
    bank.questions[6].options[1].weights[own[0]] = 1;
    bank.questions[4].options[2].weights[own[2]] = 1;
    bank.questions[5].options[2].weights[own[0]] = 1;
    bank.questions[6].options[2].weights[own[1]] = 1;

    banks[dom] = bank;
  }

  // 5. Engineering, Science (Size 2)
  for (const dom of ["engineering", "science"]) {
    const filePath = path.join(banksDir, `${dom}.js`);
    const bank = JSON.parse(JSON.stringify((await import(`file://${filePath}?t=${Date.now()}`)).default));
    const own = ownMap[dom];
    const adjs = adjAssignment[dom]; // 8 distinct adjs

    // Q0..Q3:
    const q0_3 = [
      [own[0], own[0], own[1], own[1], adjs[0], adjs[1]],
      [own[0], own[0], own[1], own[1], adjs[2], adjs[3]],
      [own[0], own[0], own[1], own[1], adjs[4], adjs[5]],
      [own[0], own[0], own[1], own[1], adjs[6], adjs[7]]
    ];
    for (let q = 0; q < 4; q++) {
      for (let o = 0; o < 6; o++) {
        const s = q0_3[q][o];
        setOption(bank.questions[q].options[o], s, 3, own.includes(s));
      }
    }

    // Q4..Q6:
    const q4_6 = [
      [own[0], adjs[0], adjs[1], adjs[2], adjs[3], adjs[4]],
      [own[1], adjs[4], adjs[5], adjs[6], adjs[7], adjs[0]],
      [adjs[1], adjs[2], adjs[3], adjs[5], adjs[6], adjs[7]]
    ];
    for (let q = 4; q < 7; q++) {
      for (let o = 0; o < 6; o++) {
        const s = q4_6[q - 4][o];
        setOption(bank.questions[q].options[o], s, 3, own.includes(s));
      }
    }

    bank.questions[4].options[1].weights[own[0]] = 1;
    bank.questions[4].options[2].weights[own[1]] = 1;
    bank.questions[5].options[1].weights[own[0]] = 1;
    bank.questions[5].options[2].weights[own[1]] = 1;

    banks[dom] = bank;
  }

  return banks;
}

const banks = await generateAllBanks();
console.log("All banks generated from disk files. Validating...");
for (const [dom, bank] of Object.entries(banks)) {
  validateBank(bank);
}
console.log("✅ All banks passed validateBank!");

console.log("Checking Coverage Rules...");
const SMALL_DOMAINS = ["engineering", "law_gov", "education_social", "aviation_hospitality", "science"];
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

// Single-domain distributions (5,000 runs)
console.log("\nChecking Single-Domain Distributions (5,000 runs)...");
let distErrors = 0;
for (const dom of DOMAINS) {
  const bank = banks[dom];
  const ownRoadmaps = ownMap[dom];
  const isSmall = SMALL_DOMAINS.includes(dom);
  const n = ownRoadmaps.length;
  const winCounts = {};
  for (const s of Object.keys(ownMap)) for (const r of ownMap[s]) winCounts[r] = 0;
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

