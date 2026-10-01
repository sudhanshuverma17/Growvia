import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { run55PairsTest } from "./testAndBalanceBanks.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.resolve(__dirname, "../config/stage2-banks");

async function calibrateAndVerify() {
  const banks = {};
  for (const dom of DOMAINS) {
    const p = path.join(banksDir, `${dom}.js`);
    const mod = await import(`file://${p}?t=${Date.now()}`);
    banks[dom] = JSON.parse(JSON.stringify(mod.default));
  }

  // 1. Finance: 4 own roadmaps. Give each 5 weight-3 options across Q1..Q4 (1 per Q + 1 extra in one Q)
  // Q1: chartered(2), investment(1), financial(1), actuary(1), lawyer(1) -> 6 opts
  // Q2: chartered(1), investment(2), financial(1), actuary(1), startup(1) -> 6 opts
  // Q3: chartered(1), investment(1), financial(2), actuary(1), data-scientist(1) -> 6 opts
  // Q4: chartered(1), investment(1), financial(1), actuary(2), mba(1) -> 6 opts
  const fin = banks.finance;
  fin.questions[0].options[4] = { id: "fin_q1_opt5", text: "Verify tax compliance rules and ensure ethical bookkeeping across all student initiatives.", weights: { "chartered-accountant": 3, lawyer: 1 }, reason: "Tax compliance and statutory bookkeeping is chartered accountancy." };
  fin.questions[0].options[5] = { id: "fin_q1_opt6", text: "Review contract terms and ensure all sponsorship agreements comply with legal statutes.", weights: { lawyer: 3, "financial-analyst": 1 }, reason: "Contract review and legal sponsorship terms represents legal counsel." };

  fin.questions[1].options[4] = { id: "fin_q2_opt5", text: "Connect them with private investors seeking high-growth enterprise opportunities.", weights: { "investment-banker": 3, "startup-founder": 1 }, reason: "Connecting enterprises with private growth capital is investment banking." };
  fin.questions[1].options[5] = { id: "fin_q2_opt6", text: "Validate product market fit and acquire their very first hundred paying customers.", weights: { "startup-founder": 3, "investment-banker": 1 }, reason: "Validating customer demand and early venture launch is startup founding." };

  fin.questions[2].options[4] = { id: "fin_q3_opt5", text: "Benchmark industrial sector valuation multiples against historical market averages.", weights: { "financial-analyst": 3, "data-scientist": 1 }, reason: "Valuation multiple benchmarking and financial data analysis is financial analysis." };
  fin.questions[2].options[5] = { id: "fin_q3_opt6", text: "Write automated quantitative trading algorithms that execute statistical arbitrage opportunities.", weights: { "data-scientist": 3, "financial-analyst": 1 }, reason: "Writing algorithmic trading models and quantitative price analytics is data science." };

  fin.questions[3].options[4] = { id: "fin_q4_opt5", text: "Model longevity risk factors and design solvent corporate insurance reserve portfolios.", weights: { actuary: 3, "data-scientist": 1 }, reason: "Longevity risk modeling and insurance reserve solvency is actuarial science." };
  fin.questions[3].options[5] = { id: "fin_q4_opt6", text: "Lead executive corporate strategy to streamline underperforming subsidiaries into profitability.", weights: { "mba-manager": 3, "financial-analyst": 1 }, reason: "Directing corporate enterprise turnaround and strategic restructuring is MBA management." };
  fs.writeFileSync(path.join(banksDir, "finance.js"), `export default ${JSON.stringify(fin, null, 2)};\n`);

  // 2. Science: 2 own roadmaps (biotechnologist, environmental-scientist).
  // Across Q1..Q4: each own roadmap gets 5 options at weight 3 (1 in each Q + 1 extra in one Q)
  // Q1: bio(2), env(1), pharm(1), civil(1), doctor(1) -> 6 opts
  // Q2: bio(1), env(2), pharm(1), nutri(1), data(1) -> 6 opts
  // Q3: bio(2), env(1), civil(1), teach(1), social(1) -> 6 opts
  // Q4: bio(1), env(2), pharm(1), doctor(1), data(1) -> 6 opts
  const sci = banks.science;
  sci.questions[0].options[3] = { id: "sci_q1_opt4", text: "Study soil microbial ecosystems and synthesize bio-fertilizers that strengthen root immunity.", weights: { biotechnologist: 3, "environmental-scientist": 1 }, reason: "Developing agricultural microbial bio-inoculants is biotechnology." };
  sci.questions[1].options[2] = { id: "sci_q2_opt3", text: "Track atmospheric carbon capture rates across protected tropical rainforest reserves.", weights: { "environmental-scientist": 3, biotechnologist: 1 }, reason: "Quantifying terrestrial carbon sequestration in rainforests is environmental science." };
  sci.questions[2].options[2] = { id: "sci_q3_opt3", text: "Develop rapid DNA barcode assays to identify rare protected flora and fauna samples.", weights: { biotechnologist: 3, "environmental-scientist": 1 }, reason: "DNA barcoding technology for rapid ecological species verification is biotechnology." };
  sci.questions[3].options[2] = { id: "sci_q4_opt3", text: "Assess urban water shed pollution runoff and restore natural reed bed filtration wetlands.", weights: { "environmental-scientist": 3, biotechnologist: 1 }, reason: "Restoring ecological bio-swales and wetland filtration is environmental science." };
  fs.writeFileSync(path.join(banksDir, "science.js"), `export default ${JSON.stringify(sci, null, 2)};\n`);

  // 3. Engineering: 2 own roadmaps (mechanical-engineer, civil-engineer).
  // Across Q1..Q4: each gets 5 options at weight 3
  const eng = banks.engineering;
  eng.questions[0].options[2] = { id: "eng_q1_opt3", text: "Calculate dynamic wave impact stress on bridge pier structural concrete joints.", weights: { "civil-engineer": 3, "mechanical-engineer": 1 }, reason: "Structural concrete load stress under hydrodynamic forces is civil engineering." };
  eng.questions[1].options[2] = { id: "eng_q2_opt3", text: "Design pneumatic assembly line conveyor belts and automated hydraulic lifting mechanisms.", weights: { "mechanical-engineer": 3, "civil-engineer": 1 }, reason: "Pneumatics, hydraulic power transfer, and conveyor kinematics are mechanical engineering." };
  eng.questions[2].options[2] = { id: "eng_q3_opt3", text: "Optimize thermodynamic steam turbines and high-pressure heat exchangers in thermal storage plants.", weights: { "mechanical-engineer": 3, "civil-engineer": 1 }, reason: "Thermodynamic cycles, high-pressure steam turbines, and heat exchangers are mechanical engineering." };
  eng.questions[3].options[2] = { id: "eng_q4_opt3", text: "Construct earthquake-resistant railway trackbeds with precision ballast and drainage channels.", weights: { "civil-engineer": 3, "mechanical-engineer": 1 }, reason: "High-speed rail track alignment, earthwork stability, and ballast geotechnics is civil engineering." };
  fs.writeFileSync(path.join(banksDir, "engineering.js"), `export default ${JSON.stringify(eng, null, 2)};\n`);

  console.log("Applied balanced calibration. Running 55 pairs test...");
  const { passingDomainCount, passingRatioCount, passingBothCount, pairResults } = run55PairsTest(10000);
  console.log(`Passing Domain Balance (42-58%): ${passingDomainCount} / 55`);
  console.log(`Passing Ratio (<= 2.0x within domain): ${passingRatioCount} / 55`);
  console.log(`Passing Both: ${passingBothCount} / 55`);

  pairResults.sort((a, b) => Math.abs(b.shareA - 50) - Math.abs(a.shareA - 50));
  console.log("\nWorst 10 Pairs:");
  for (let i = 0; i < 10; i++) {
    const p = pairResults[i];
    console.log(
      `${p.domA.padEnd(20)} + ${p.domB.padEnd(20)} | A: ${p.shareA.toFixed(1)}% B: ${p.shareB.toFixed(1)}% | Ratios: [A: ${p.ratioA.toFixed(2)}x, B: ${p.ratioB.toFixed(2)}x, Pool: ${p.ratioPool.toFixed(2)}x]`
    );
  }
}

calibrateAndVerify();
