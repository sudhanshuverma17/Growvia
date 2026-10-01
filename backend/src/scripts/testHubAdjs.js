import { DOMAINS, getRoadmapsByDomain, DOMAIN_ROADMAP_MAP } from "../config/quizDomains.js";
import { scoreStage2, validateBank } from "../services/stage2Selector.js";

const SMALL_DOMAINS = ["engineering", "law_gov", "education_social", "aviation_hospitality", "science"];

const ownMap = {};
for (const dom of DOMAINS) ownMap[dom] = getRoadmapsByDomain(dom);

// All adjacents come EXCLUSIVELY from tech, healthcare, and business!
// Tech: software-engineer, frontend-developer, backend-developer, fullstack-developer, data-scientist, ai-ml-engineer, cybersecurity
// Healthcare: doctor, dentist, physiotherapist, pharmacist, nutritionist, psychologist, fitness-trainer
// Business: startup-founder, product-manager, mba-manager, marketing-manager, digital-marketer, human-resources, supply-chain

const adjConfig = {
  media: ["digital-marketer", "frontend-developer", "marketing-manager", "psychologist"],
  creative: ["frontend-developer", "product-manager", "digital-marketer", "marketing-manager"],
  finance: ["data-scientist", "cybersecurity", "product-manager", "supply-chain"],
  
  law_gov: [
    "cybersecurity", "human-resources", "psychologist",
    "data-scientist", "supply-chain", "doctor"
  ],
  education_social: [
    "ai-ml-engineer", "psychologist", "human-resources",
    "software-engineer", "digital-marketer", "nutritionist"
  ],
  aviation_hospitality: [
    "supply-chain", "product-manager", "cybersecurity",
    "human-resources", "fitness-trainer", "mba-manager"
  ],

  engineering: [
    "software-engineer", "data-scientist", "supply-chain", "cybersecurity", "product-manager"
  ],
  science: [
    "data-scientist", "ai-ml-engineer", "pharmacist", "nutritionist", "doctor"
  ]
};

// Build all banks
function buildTestBanks() {
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

  // 2. Creative and Media (Size 5)
  for (const dom of ["creative", "media"]) {
    const own = ownMap[dom];
    const adjs = adjConfig[dom];
    const questions = [];
    for (let q = 0; q < 4; q++) {
      const opts = [];
      for (let o = 0; o < 5; o++) {
        opts.push({ id: `${dom}_q${q+1}_opt${o+1}`, text: `Option for ${own[o]}`, weights: { [own[o]]: 3 } });
      }
      opts.push({ id: `${dom}_q${q+1}_opt6`, text: `Option for ${adjs[q]}`, weights: { [adjs[q]]: 3 } });
      questions.push({ id: `${dom}_q${q+1}`, text: `Question ${q+1} in ${dom}`, blendCore: true, options: opts });
    }
    questions[0].options[5].weights[own[0]] = 1;
    questions[1].options[5].weights[own[1]] = 1;
    questions[2].options[5].weights[own[2]] = 1;
    questions[3].options[5].weights[own[3]] = 1;

    for (let q = 4; q < 8; q++) {
      const opts = [];
      for (let o = 0; o < 5; o++) {
        opts.push({ id: `${dom}_q${q+1}_opt${o+1}`, text: `Option for ${own[o]}`, weights: { [own[o]]: 3 } });
      }
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
    questions[7].options[4].weights[own[0]] = 1;
    questions[4].options[4].weights[own[0]] = 1;
    questions[5].options[4].weights[own[1]] = 1;
    questions[6].options[4].weights[own[2]] = 1;
    questions[4].options[1].weights[own[4]] = 1;
    questions[5].options[1].weights[own[4]] = 1;

    banks[dom] = { domain: dom, questions };
  }

  // 3. Finance (Size 4)
  {
    const dom = "finance";
    const own = ownMap[dom];
    const adjs = adjConfig[dom];
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
    const adjs = adjConfig[dom]; // 6 adjs
    const questions = [];

    // Q0..Q3:
    const q0_3 = [
      [own[0], own[1], own[2], own[0], own[1], adjs[0]],
      [own[2], own[0], own[1], own[2], own[0], adjs[1]],
      [own[1], own[2], own[0], own[1], own[2], adjs[2]],
      [own[0], own[1], own[2], adjs[3], adjs[4], adjs[5]]
    ];
    for (let q = 0; q < 4; q++) {
      const opts = q0_3[q].map((slug, o) => ({ id: `${dom}_q${q+1}_opt${o+1}`, text: `Option for ${slug}`, weights: { [slug]: 3 } }));
      questions.push({ id: `${dom}_q${q+1}`, text: `Question ${q+1} in ${dom}`, blendCore: true, options: opts });
    }

    // Q4..Q6 (Q5..Q7):
    const q4_6 = [
      [own[0], adjs[0], adjs[1], adjs[2], adjs[3], adjs[4]],
      [own[1], adjs[5], adjs[0], adjs[1], adjs[2], adjs[3]],
      [own[2], adjs[4], adjs[5], adjs[0], adjs[1], adjs[2]]
    ];
    for (let q = 4; q < 7; q++) {
      const opts = q4_6[q - 4].map((slug, o) => ({ id: `${dom}_q${q+1}_opt${o+1}`, text: `Option for ${slug}`, weights: { [slug]: 3 } }));
      questions.push({ id: `${dom}_q${q+1}`, text: `Question ${q+1} in ${dom}`, blendCore: false, options: opts });
    }

    questions[4].options[0].weights[own[2]] = 1;
    questions[5].options[0].weights[own[0]] = 1;
    questions[6].options[0].weights[own[1]] = 1;
    questions[4].options[1].weights[own[2]] = 1;
    questions[5].options[1].weights[own[0]] = 1;
    questions[6].options[1].weights[own[1]] = 1;

    banks[dom] = { domain: dom, questions };
  }

  // 5. Engineering and Science (Size 2)
  for (const dom of ["engineering", "science"]) {
    const own = ownMap[dom];
    const adjs = adjConfig[dom]; // 5 adjs
    const questions = [];

    // Q0..Q3:
    const q0_3 = [
      [own[0], own[0], own[1], own[1], adjs[0], adjs[1]],
      [own[0], own[0], own[1], own[1], adjs[2], adjs[3]],
      [own[0], own[0], own[1], own[1], adjs[4], adjs[0]],
      [own[0], own[1], adjs[1], adjs[2], adjs[3], adjs[4]]
    ];
    for (let q = 0; q < 4; q++) {
      const opts = q0_3[q].map((slug, o) => ({ id: `${dom}_q${q+1}_opt${o+1}`, text: `Option for ${slug}`, weights: { [slug]: 3 } }));
      questions.push({ id: `${dom}_q${q+1}`, text: `Question ${q+1} in ${dom}`, blendCore: true, options: opts });
    }
    questions[3].options[2].weights[own[0]] = 1;
    questions[3].options[3].weights[own[1]] = 1;

    // Q4..Q6 (Q5..Q7):
    const q4_6 = [
      [own[0], own[1], adjs[0], adjs[1], adjs[2], adjs[3]],
      [own[0], own[1], adjs[4], adjs[0], adjs[1], adjs[2]],
      [own[0], own[1], adjs[3], adjs[4], adjs[0], adjs[1]]
    ];
    for (let q = 4; q < 7; q++) {
      const opts = q4_6[q - 4].map((slug, o) => ({ id: `${dom}_q${q+1}_opt${o+1}`, text: `Option for ${slug}`, weights: { [slug]: 3 } }));
      questions.push({ id: `${dom}_q${q+1}`, text: `Question ${q+1} in ${dom}`, blendCore: false, options: opts });
    }
    questions[4].options[0].weights[own[1]] = 1;
    questions[5].options[0].weights[own[1]] = 1;
    questions[4].options[1].weights[own[0]] = 1;
    questions[5].options[1].weights[own[0]] = 1;

    banks[dom] = { domain: dom, questions };
  }

  return banks;
}

const banks = buildTestBanks();

// Run 5B simulation on all 55 pairs
console.log("Simulating all 55 pairs at 3,000 runs...");
const pairs = [];
for (let i = 0; i < DOMAINS.length; i++) {
  for (let j = i + 1; j < DOMAINS.length; j++) {
    pairs.push([DOMAINS[i], DOMAINS[j]]);
  }
}

let fails = 0;
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
    fails++;
    console.log(`❌ Pair (${domA}+${domB}) FAIL: shareA=${shareA.toFixed(1)}%, shareB=${shareB.toFixed(1)}%, ratioA=${ratioA.toFixed(2)}x, ratioB=${ratioB.toFixed(2)}x`);
  }
  results.push({ domA, domB, shareA, shareB, ratioA, ratioB, pass });
}

console.log(`\nResults: ${55 - fails} / 55 passed. Fails: ${fails}`);
results.sort((a, b) => Math.max(b.ratioA, b.ratioB) - Math.max(a.ratioA, a.ratioB));
console.log("Top 10 highest ratios:");
for (let i = 0; i < 10; i++) {
  const r = results[i];
  console.log(`  ${r.domA.padEnd(20)} + ${r.domB.padEnd(20)} | A: ${r.shareA.toFixed(1)}% B: ${r.shareB.toFixed(1)}% | Ratios: [A: ${r.ratioA.toFixed(2)}x, B: ${r.ratioB.toFixed(2)}x] | ${r.pass ? "✅ PASS" : "❌ FAIL"}`);
}
