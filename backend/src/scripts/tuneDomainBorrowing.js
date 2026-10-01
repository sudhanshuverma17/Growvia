import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { scoreStage2 } from "../services/stage2Selector.js";

const ownMap = {};
for (const dom of DOMAINS) ownMap[dom] = getRoadmapsByDomain(dom);

const domainSets = {
  aviation: ["pilot", "hotel-management", "event-manager"], // 3
  education: ["teacher", "ed-tech", "social-worker"], // 3
  law_gov: ["lawyer", "civil-services", "army-officer"], // 3
  engineering: ["mechanical-engineer", "civil-engineer"], // 2
  science: ["biotechnologist", "environmental-scientist"], // 2
  finance: ["chartered-accountant", "investment-banker", "financial-analyst", "actuary"] // 4
};

// Let's test combinations of domain sets:
// creative (needs 4): can take eng (2) + sci (2) = 4
// media (needs 4): can take eng (2) + sci (2) = 4
// finance (needs 4): can take eng (2) + sci (2) = 4
// Wait! If creative, media, finance all take eng (2) + sci (2):
// Then eng and sci get extra options when paired with creative, media, finance!
// But when paired with each other, they are 50/50.

// Let's try:
// creative (4): aviation (3) + 1 from law_gov? No, complete sets!
// What if creative (4) takes: law_gov (3) + 1? Or finance (4)?
// Let's test multiple combinations systematically:

const configsToTest = [
  {
    name: "Config 1",
    creative: [...domainSets.engineering, ...domainSets.science], // 4
    media: [...domainSets.aviation, "lawyer"], // 4
    finance: [...domainSets.education, "civil-services"], // 4
    law_gov: [...domainSets.aviation, ...domainSets.education], // 6
    education_social: [...domainSets.engineering, ...domainSets.science, ...domainSets.aviation].slice(0, 6), // 7 -> 6
    aviation_hospitality: [...domainSets.engineering, ...domainSets.science, "teacher", "social-worker"], // 6
    engineering: [...domainSets.finance, ...domainSets.aviation, ...domainSets.law_gov], // 10
    science: [...domainSets.finance, ...domainSets.education, ...domainSets.law_gov] // 10
  },
  {
    name: "Config 2 - Balanced Mutual",
    creative: [...domainSets.engineering, ...domainSets.science], // 4
    media: [...domainSets.engineering, ...domainSets.science], // 4
    finance: [...domainSets.aviation, "teacher"], // 4
    law_gov: [...domainSets.education, ...domainSets.aviation], // 6
    education_social: [...domainSets.law_gov, ...domainSets.aviation], // 6
    aviation_hospitality: [...domainSets.law_gov, ...domainSets.education], // 6
    engineering: [...domainSets.aviation, ...domainSets.education, ...domainSets.finance], // 10
    science: [...domainSets.aviation, ...domainSets.education, ...domainSets.finance] // 10
  }
];

function buildAndEvaluate(cfg, runs = 1500) {
  const q4 = {};

  // Tech, Healthcare, Business
  for (const dom of ["tech", "healthcare", "business"]) {
    const own = ownMap[dom];
    const seq = [
      [0, 1, 2, 3, 4, 5],
      [6, 0, 1, 2, 3, 4],
      [5, 6, 0, 1, 2, 3],
      [4, 5, 6, 0, 1, 2]
    ];
    const questions = [];
    for (let q = 0; q < 4; q++) questions.push(seq[q].map(idx => ({ [own[idx]]: 3 })));
    questions[0][0][own[3]] = 1; questions[0][1][own[4]] = 1; questions[0][2][own[5]] = 1; questions[0][3][own[6]] = 1;
    questions[1][0][own[3]] = 1; questions[1][1][own[4]] = 1; questions[1][2][own[5]] = 1; questions[1][3][own[6]] = 1;
    questions[2][0][own[3]] = 1; questions[2][1][own[4]] = 1; questions[2][2][own[5]] = 1; questions[2][3][own[6]] = 1;
    questions[3][0][own[3]] = 1; questions[3][1][own[4]] = 1; questions[3][2][own[5]] = 1; questions[3][3][own[6]] = 1;
    q4[dom] = questions;
  }

  // Creative, Media
  for (const dom of ["creative", "media"]) {
    const own = ownMap[dom];
    const adjs = cfg[dom];
    const questions = [];
    for (let q = 0; q < 4; q++) {
      const opts = [];
      for (let o = 0; o < 5; o++) opts.push({ [own[o]]: 3 });
      opts.push({ [adjs[q]]: 3 });
      questions.push(opts);
    }
    questions[0][5][own[0]] = 1; questions[1][5][own[1]] = 1;
    questions[2][5][own[2]] = 1; questions[3][5][own[3]] = 1;
    q4[dom] = questions;
  }

  // Finance
  {
    const dom = "finance";
    const own = ownMap[dom];
    const adjs = cfg[dom];
    const questions = [];
    for (let q = 0; q < 4; q++) {
      const opts = [];
      for (let o = 0; o < 4; o++) opts.push({ [own[o]]: 3 });
      opts.push({ [own[q]]: 3 });
      opts.push({ [adjs[q]]: 3 });
      questions.push(opts);
    }
    q4[dom] = questions;
  }

  // Law_gov, Education_social, Aviation_hospitality
  for (const dom of ["law_gov", "education_social", "aviation_hospitality"]) {
    const own = ownMap[dom];
    const adjs = cfg[dom];
    const questions = [
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [adjs[0]]: 3 }],
      [{ [own[2]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [own[0]]: 3 }, { [adjs[1]]: 3 }],
      [{ [own[1]]: 3 }, { [own[2]]: 3 }, { [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [adjs[2]]: 3 }],
      [{ [own[0]]: 3 }, { [own[1]]: 3 }, { [own[2]]: 3 }, { [adjs[3]]: 3 }, { [adjs[4]]: 3 }, { [adjs[5]]: 3 }]
    ];
    q4[dom] = questions;
  }

  // Engineering, Science
  for (const dom of ["engineering", "science"]) {
    const own = ownMap[dom];
    const adjs = cfg[dom];
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

  const pairs = [];
  for (let i = 0; i < DOMAINS.length; i++) {
    for (let j = i + 1; j < DOMAINS.length; j++) pairs.push([DOMAINS[i], DOMAINS[j]]);
  }

  let passed = 0;
  const fails = [];
  for (const [domA, domB] of pairs) {
    const roadmapsA = ownMap[domA];
    const roadmapsB = ownMap[domB];
    const questions = [];
    for (let k = 0; k < 4; k++) {
      questions.push({ id: `qA_${k}`, options: q4[domA][k].map((w, idx) => ({ id: `optA_${k}_${idx}`, weights: w })) });
      questions.push({ id: `qB_${k}`, options: q4[domB][k].map((w, idx) => ({ id: `optB_${k}_${idx}`, weights: w })) });
    }
    const stage1Affinity = { topDomains: [domA, domB], domainScores: { [domA]: 1.0, [domB]: 1.0 }, isBlended: true };
    let winsA = 0, winsB = 0;
    const slugWinsA = {}, slugWinsB = {};
    for (const s of roadmapsA) slugWinsA[s] = 0;
    for (const s of roadmapsB) slugWinsB[s] = 0;

    for (let r = 0; r < runs; r++) {
      const answers = {};
      for (const q of questions) answers[q.id] = q.options[Math.floor(Math.random() * q.options.length)].id;
      const res = scoreStage2(answers, questions, { stage1Result: stage1Affinity, seed: 1337 + r });
      if (roadmapsA.includes(res.topSlug)) { winsA++; slugWinsA[res.topSlug]++; }
      else if (roadmapsB.includes(res.topSlug)) { winsB++; slugWinsB[res.topSlug]++; }
    }
    const total = winsA + winsB;
    const shareA = (winsA / total) * 100;
    const shareB = (winsB / total) * 100;
    const valsA = Object.values(slugWinsA);
    const valsB = Object.values(slugWinsB);
    const ratioA = Math.max(...valsA) / Math.min(...valsA);
    const ratioB = Math.max(...valsB) / Math.min(...valsB);

    const pass = shareA >= 42.0 && shareA <= 58.0 && ratioA <= 2.0 && ratioB <= 2.0;
    if (pass) passed++;
    else fails.push({ domA, domB, shareA, shareB, ratioA, ratioB });
  }

  return { passed, fails };
}

for (const cfg of configsToTest) {
  console.log(`Evaluating ${cfg.name}...`);
  const res = buildAndEvaluate(cfg, 2000);
  console.log(`Passed: ${res.passed} / 55`);
  for (const f of res.fails) {
    console.log(`  FAIL: ${f.domA}+${f.domB} | shareA=${f.shareA.toFixed(1)}% shareB=${f.shareB.toFixed(1)}% | ratioA=${f.ratioA.toFixed(2)}x ratioB=${f.ratioB.toFixed(2)}x`);
  }
}
