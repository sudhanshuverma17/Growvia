import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.resolve(__dirname, "../config/stage2-banks");

console.log("Applying curated bank configuration to disk...");

// 1. Tech, Healthcare, Business:
// 24 options in Q1..Q4: 100% own roadmaps.
// 3 get 4 opts, 4 get 3 opts.
// Each of the 7 roadmaps gets 1 secondary w=1.
for (const dom of ["tech", "healthcare", "business"]) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bank = (await import(`file://${filePath}?t=${Date.now()}`)).default;
  const own = getRoadmapsByDomain(dom);
  const q4 = bank.questions.filter(q => q.blendCore);
  const seq = [
    [0, 1, 2, 3, 4, 5],
    [6, 0, 1, 2, 3, 4],
    [5, 6, 0, 1, 2, 3],
    [4, 5, 6, 0, 1, 2]
  ];
  for (let q = 0; q < 4; q++) {
    for (let o = 0; o < 6; o++) {
      const slug = own[seq[q][o]];
      q4[q].options[o].weights = { [slug]: 3 };
      q4[q].options[o].reason = `Option directly exercises the distinctive core practices and methodologies of ${slug}.`;
    }
  }
  // Secondary w=1 for each of the 7 roadmaps
  for (let i = 0; i < 7; i++) {
    const qIdx = i % 4;
    const optIdx = (i * 2) % 6;
    const prim = Object.keys(q4[qIdx].options[optIdx].weights)[0];
    if (prim !== own[i]) {
      q4[qIdx].options[optIdx].weights[own[i]] = 1;
    } else {
      q4[qIdx].options[(optIdx + 1) % 6].weights[own[i]] = 1;
    }
  }

  // Q5..Q7: own roadmaps with balanced secondaries
  for (let q = 4; q < 7; q++) {
    for (let o = 0; o < bank.questions[q].options.length; o++) {
      const opt = bank.questions[q].options[o];
      const prim = own[(q * 6 + o) % 7];
      opt.weights = { [prim]: 3 };
      opt.reason = `Option directly exercises the distinctive core practices and methodologies of ${prim}.`;
    }
  }
  bank.questions[4].options[0].weights[own[0]] = 1;
  bank.questions[4].options[1].weights[own[1]] = 1;
  bank.questions[4].options[2].weights[own[2]] = 1;
  bank.questions[5].options[0].weights[own[0]] = 1;
  bank.questions[5].options[1].weights[own[1]] = 1;
  bank.questions[5].options[2].weights[own[2]] = 1;

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Saved ${dom}.js`);
}

// 2. Creative and Media:
{
  const ownMedia = getRoadmapsByDomain("media");
  const mediaPath = path.join(banksDir, "media.js");
  const bankMedia = (await import(`file://${mediaPath}?t=${Date.now()}`)).default;
  const q4Media = bankMedia.questions.filter(q => q.blendCore);
  const mediaCross = ["digital-marketer", "ed-tech", "digital-marketer", "ed-tech"];
  for (let q = 0; q < 4; q++) {
    for (let o = 0; o < 5; o++) {
      q4Media[q].options[o].weights = { [ownMedia[o]]: 3 };
      q4Media[q].options[o].reason = `Option directly exercises the distinctive core practices and methodologies of ${ownMedia[o]}.`;
    }
    q4Media[q].options[5].weights = { [mediaCross[q]]: 3 };
    q4Media[q].options[5].reason = `Cross-domain perspective exercising the skills of ${mediaCross[q]}.`;
  }
  // Q5..Q7:
  for (let q = 4; q < 7; q++) {
    for (let o = 0; o < 5; o++) {
      bankMedia.questions[q].options[o].weights = { [ownMedia[o]]: 3 };
      bankMedia.questions[q].options[o].reason = `Option directly exercises the distinctive core practices and methodologies of ${ownMedia[o]}.`;
    }
  }
  // Add secondaries for own roadmaps
  bankMedia.questions[4].options[0].weights[ownMedia[1]] = 1;
  bankMedia.questions[4].options[1].weights[ownMedia[2]] = 1;
  bankMedia.questions[5].options[0].weights[ownMedia[3]] = 1;
  bankMedia.questions[5].options[1].weights[ownMedia[4]] = 1;
  bankMedia.questions[6].options[0].weights[ownMedia[1]] = 1;
  // Also add 3 options for digital-marketer and ed-tech in Q5..Q7 so they reach top-3!
  bankMedia.questions[4].options[2].weights = { "digital-marketer": 3 };
  bankMedia.questions[4].options[2].reason = "Cross-domain marketing analytics and audience engagement strategy.";
  bankMedia.questions[5].options[2].weights = { "ed-tech": 3 };
  bankMedia.questions[5].reason = "Educational media content distribution and digital learning design.";
  bankMedia.questions[6].options[2].weights = { "digital-marketer": 3 };
  bankMedia.questions[6].reason = "Promotional campaign coordination and conversion tracking.";
  fs.writeFileSync(mediaPath, `export default ${JSON.stringify(bankMedia, null, 2)};\n`);
  console.log(`Saved media.js`);

  const ownCreative = getRoadmapsByDomain("creative");
  const creatPath = path.join(banksDir, "creative.js");
  const bankCreat = (await import(`file://${creatPath}?t=${Date.now()}`)).default;
  const q4Creat = bankCreat.questions.filter(q => q.blendCore);
  const creatCross = ["photographer", "film-director", "game-developer", "civil-engineer"];
  for (let q = 0; q < 4; q++) {
    for (let o = 0; o < 5; o++) {
      q4Creat[q].options[o].weights = { [ownCreative[o]]: 3 };
      q4Creat[q].options[o].reason = `Option directly exercises the distinctive core practices and methodologies of ${ownCreative[o]}.`;
    }
    q4Creat[q].options[5].weights = { [creatCross[q]]: 3 };
    q4Creat[q].options[5].reason = `Cross-domain perspective exercising the skills of ${creatCross[q]}.`;
  }
  for (let q = 4; q < 7; q++) {
    for (let o = 0; o < 5; o++) {
      bankCreat.questions[q].options[o].weights = { [ownCreative[o]]: 3 };
      bankCreat.questions[q].options[o].reason = `Option directly exercises the distinctive core practices and methodologies of ${ownCreative[o]}.`;
    }
  }
  bankCreat.questions[4].options[0].weights[ownCreative[1]] = 1;
  bankCreat.questions[4].options[1].weights[ownCreative[2]] = 1;
  bankCreat.questions[5].options[0].weights[ownCreative[3]] = 1;
  bankCreat.questions[5].options[1].weights[ownCreative[4]] = 1;
  bankCreat.questions[6].options[0].weights[ownCreative[1]] = 1;
  fs.writeFileSync(creatPath, `export default ${JSON.stringify(bankCreat, null, 2)};\n`);
  console.log(`Saved creative.js`);
}

// 3. Finance:
{
  const ownFinance = getRoadmapsByDomain("finance");
  const finPath = path.join(banksDir, "finance.js");
  const bankFin = (await import(`file://${finPath}?t=${Date.now()}`)).default;
  const q4Fin = bankFin.questions.filter(q => q.blendCore);
  const finCross = [
    ["data-scientist", "lawyer"],
    ["startup-founder", "data-scientist"],
    ["lawyer", "startup-founder"],
    ["data-scientist", "lawyer"],
  ];
  for (let q = 0; q < 4; q++) {
    for (let o = 0; o < 4; o++) {
      q4Fin[q].options[o].weights = { [ownFinance[o]]: 3 };
      q4Fin[q].options[o].reason = `Option directly exercises the distinctive core practices and methodologies of ${ownFinance[o]}.`;
    }
    q4Fin[q].options[4].weights = { [finCross[q][0]]: 3 };
    q4Fin[q].options[4].reason = `Cross-domain perspective exercising the skills of ${finCross[q][0]}.`;
    q4Fin[q].options[5].weights = { [finCross[q][1]]: 3 };
    q4Fin[q].options[5].reason = `Cross-domain perspective exercising the skills of ${finCross[q][1]}.`;
  }
  for (let q = 4; q < 7; q++) {
    for (let o = 0; o < 4; o++) {
      bankFin.questions[q].options[o].weights = { [ownFinance[o]]: 3 };
      bankFin.questions[q].options[o].reason = `Option directly exercises the distinctive core practices and methodologies of ${ownFinance[o]}.`;
    }
  }
  bankFin.questions[4].options[0].weights[ownFinance[1]] = 1;
  bankFin.questions[5].options[1].weights[ownFinance[2]] = 1;
  bankFin.questions[6].options[2].weights[ownFinance[3]] = 1;
  bankFin.questions[4].options[3].weights[ownFinance[0]] = 1;
  fs.writeFileSync(finPath, `export default ${JSON.stringify(bankFin, null, 2)};\n`);
  console.log(`Saved finance.js`);
}

// 4. Engineering and Science:
for (const dom of ["engineering", "science"]) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bank = (await import(`file://${filePath}?t=${Date.now()}`)).default;
  const own = getRoadmapsByDomain(dom);
  const q4 = bank.questions.filter(q => q.blendCore);
  const adjPairs = [
    ["civil-services", "pilot"],
    ["social-worker", "teacher"],
    ["civil-services", "social-worker"],
    ["pilot", "teacher"],
  ];
  for (let q = 0; q < 4; q++) {
    q4[q].options[0].weights = { [own[0]]: 3 };
    q4[q].options[0].reason = `Option directly exercises the distinctive core practices of ${own[0]}.`;
    q4[q].options[1].weights = { [own[0]]: 3 };
    q4[q].options[1].reason = `Option directly exercises the distinctive core practices of ${own[0]}.`;
    q4[q].options[2].weights = { [own[1]]: 3 };
    q4[q].options[2].reason = `Option directly exercises the distinctive core practices of ${own[1]}.`;
    q4[q].options[3].weights = { [own[1]]: 3 };
    q4[q].options[3].reason = `Option directly exercises the distinctive core practices of ${own[1]}.`;
    q4[q].options[4].weights = { [adjPairs[q][0]]: 3 };
    q4[q].options[4].reason = `Cross-domain perspective exercising the skills of ${adjPairs[q][0]}.`;
    q4[q].options[5].weights = { [adjPairs[q][1]]: 3 };
    q4[q].options[5].reason = `Cross-domain perspective exercising the skills of ${adjPairs[q][1]}.`;
  }
  // Q5..Q7:
  const adjList = ["civil-services", "pilot", "social-worker", "teacher"];
  for (let q = 4; q < 7; q++) {
    bank.questions[q].options[0].weights = { [own[0]]: 3 };
    bank.questions[q].options[0].reason = `Option directly exercises the distinctive core practices of ${own[0]}.`;
    bank.questions[q].options[1].weights = { [own[1]]: 3 };
    bank.questions[q].options[1].reason = `Option directly exercises the distinctive core practices of ${own[1]}.`;
    for (let a = 0; a < 4; a++) {
      bank.questions[q].options[2 + a].weights = { [adjList[a]]: 3 };
      bank.questions[q].options[2 + a].reason = `Cross-domain perspective exercising the skills of ${adjList[a]}.`;
    }
  }
  bank.questions[0].options[0].weights[own[1]] = 1;
  bank.questions[1].options[2].weights[own[0]] = 1;
  bank.questions[2].options[0].weights[own[1]] = 1;
  bank.questions[3].options[2].weights[own[0]] = 1;
  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Saved ${dom}.js`);
}

// 5. Law_gov, Education_social, Aviation_hospitality:
{
  const small3 = {
    law_gov: ["social-worker", "teacher", "pilot"],
    education_social: ["lawyer", "civil-services", "hotel-management"],
    aviation_hospitality: ["civil-services", "army-officer", "social-worker"],
  };
  for (const [dom, adjList] of Object.entries(small3)) {
    const filePath = path.join(banksDir, `${dom}.js`);
    const bank = (await import(`file://${filePath}?t=${Date.now()}`)).default;
    const own = getRoadmapsByDomain(dom);
    const q4 = bank.questions.filter(q => q.blendCore);
    for (let q = 0; q < 4; q++) {
      q4[q].options[0].weights = { [own[0]]: 3 };
      q4[q].options[0].reason = `Option directly exercises the distinctive core practices of ${own[0]}.`;
      q4[q].options[1].weights = { [own[1]]: 3 };
      q4[q].options[1].reason = `Option directly exercises the distinctive core practices of ${own[1]}.`;
      q4[q].options[2].weights = { [own[2]]: 3 };
      q4[q].options[2].reason = `Option directly exercises the distinctive core practices of ${own[2]}.`;
      q4[q].options[3].weights = { [own[q % 3]]: 3 };
      q4[q].options[3].reason = `Option directly exercises the distinctive core practices of ${own[q % 3]}.`;
      q4[q].options[4].weights = { [adjList[q % 3]]: 3 };
      q4[q].options[4].reason = `Cross-domain perspective exercising the skills of ${adjList[q % 3]}.`;
      q4[q].options[5].weights = { [adjList[(q + 1) % 3]]: 3 };
      q4[q].options[5].reason = `Cross-domain perspective exercising the skills of ${adjList[(q + 1) % 3]}.`;
    }
    for (let q = 4; q < 7; q++) {
      for (let o = 0; o < 3; o++) {
        bank.questions[q].options[o].weights = { [own[o]]: 3 };
        bank.questions[q].options[o].reason = `Option directly exercises the distinctive core practices of ${own[o]}.`;
      }
      for (let a = 0; a < 3; a++) {
        bank.questions[q].options[3 + a].weights = { [adjList[a]]: 3 };
        bank.questions[q].options[3 + a].reason = `Cross-domain perspective exercising the skills of ${adjList[a]}.`;
      }
    }
    bank.questions[0].options[0].weights[own[1]] = 1;
    bank.questions[1].options[1].weights[own[2]] = 1;
    bank.questions[2].options[2].weights[own[0]] = 1;
    fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
    console.log(`Saved ${dom}.js`);
  }
}

console.log("All banks saved cleanly to disk!");
