import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.join(__dirname, "../config/stage2-banks");

// 1. Update tech.js pairings for designer, product-manager, ed-tech, actuary
const techPath = path.join(banksDir, "tech.js");
const techModule = await import(`file://${techPath}`);
const techBank = techModule.default;

// Distribute cross-listed in tech:
// designer: Q2 opt1 (game-developer), Q5 opt5 (engineer), Q6 opt1 (data-scientist), Q9 opt3 (ai-ml-engineer)
// product-manager: Q2 opt4 (data-scientist), Q5 opt3 (blockchain-developer), Q6 opt3 (cloud-architect), Q8 opt4 (cybersecurity)
// ed-tech: Q3 opt3 (engineer), Q4 opt4 (ai-ml-engineer), Q7 opt1 (ai-ml-engineer -> data-scientist), Q8 opt6 (blockchain-developer)
// actuary: Q1 opt1 (engineer), Q2 opt6 (cloud-architect), Q3 opt5 (data-scientist), Q4 opt6 (cybersecurity)

for (const q of techBank.questions) {
  for (const opt of q.options) {
    // Clear out cross-listed secondaries
    for (const cross of ["designer", "product-manager", "ed-tech", "actuary"]) {
      if (opt.weights[cross]) delete opt.weights[cross];
    }
  }
}

// Add diverse cross-listed appearances (weight 2 each)
// designer
techBank.questions[1].options[0].weights.designer = 2; // Q2 opt1 (game-dev)
techBank.questions[4].options[4].weights.designer = 2; // Q5 opt5 (engineer)
techBank.questions[5].options[0].weights.designer = 2; // Q6 opt1 (data-scientist)
techBank.questions[8].options[2].weights.designer = 2; // Q9 opt3 (ai-ml)

// product-manager
techBank.questions[1].options[3].weights["product-manager"] = 2; // Q2 opt4 (data-scientist)
techBank.questions[4].options[2].weights["product-manager"] = 2; // Q5 opt3 (blockchain)
techBank.questions[5].options[2].weights["product-manager"] = 2; // Q6 opt3 (cloud)
techBank.questions[7].options[3].weights["product-manager"] = 2; // Q8 opt4 (cybersecurity)

// ed-tech
techBank.questions[2].options[2].weights["ed-tech"] = 2; // Q3 opt3 (engineer)
techBank.questions[3].options[3].weights["ed-tech"] = 2; // Q4 opt4 (engineer -> game-dev)
techBank.questions[6].options[0].weights["ed-tech"] = 2; // Q7 opt1 (ai-ml)
techBank.questions[7].options[5].weights["ed-tech"] = 2; // Q8 opt6 (blockchain)

// actuary
techBank.questions[0].options[0].weights.actuary = 2; // Q1 opt1 (engineer)
techBank.questions[1].options[5].weights.actuary = 2; // Q2 opt6 (cloud)
techBank.questions[2].options[4].weights.actuary = 2; // Q3 opt5 (data-scientist)
techBank.questions[3].options[5].weights.actuary = 2; // Q4 opt6 (data-scientist -> cyber)

fs.writeFileSync(techPath, `export default ${JSON.stringify(techBank, null, 2)};\n`, "utf-8");
console.log("✅ Successfully updated tech.js cross-listings!");
