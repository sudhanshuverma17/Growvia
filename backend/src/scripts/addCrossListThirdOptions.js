import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.join(__dirname, "../config/stage2-banks");

// 1. Creative
const creatFile = path.join(banksDir, "creative.js");
const creatBank = (await import(`file://${creatFile}`)).default;
creatBank.questions[4].options[0].weights["photographer"] = 2; // creat_q5_opt1
creatBank.questions[4].options[1].weights["film-director"] = 2; // creat_q5_opt2
creatBank.questions[7].options[3].weights["game-developer"] = 2; // creat_q8_opt4
fs.writeFileSync(creatFile, `export default ${JSON.stringify(creatBank, null, 2)};\n`, "utf-8");
console.log("Updated creative.js");

// 2. Finance
const finFile = path.join(banksDir, "finance.js");
const finBank = (await import(`file://${finFile}`)).default;
finBank.questions[7].options[0].weights["data-scientist"] = 2; // fin_q8_opt1
finBank.questions[7].options[1].weights["lawyer"] = 2; // fin_q8_opt2
finBank.questions[7].options[2].weights["startup-founder"] = 2; // fin_q8_opt3
fs.writeFileSync(finFile, `export default ${JSON.stringify(finBank, null, 2)};\n`, "utf-8");
console.log("Updated finance.js");

// 3. Business
const bizFile = path.join(banksDir, "business.js");
const bizBank = (await import(`file://${bizFile}`)).default;
bizBank.questions[5].options[2].weights["financial-analyst"] = 2; // biz_q6_opt3
bizBank.questions[5].options[3].weights["event-manager"] = 2; // biz_q6_opt4
bizBank.questions[7].options[1].weights["public-relations"] = 2; // biz_q8_opt2
fs.writeFileSync(bizFile, `export default ${JSON.stringify(bizBank, null, 2)};\n`, "utf-8");
console.log("Updated business.js");

console.log("All cross-list third options added successfully!");
