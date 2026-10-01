import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { getStage2Set, scoreStage2, maxPossibleBySlug } from "../services/stage2Selector.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.resolve(__dirname, "../config/stage2-banks");

export function loadAllBanks() {
  const banks = {};
  for (const dom of DOMAINS) {
    const p = path.join(banksDir, `${dom}.js`);
    const content = fs.readFileSync(p, "utf8");
    const start = content.indexOf("{");
    const end = content.lastIndexOf("}");
    banks[dom] = JSON.parse(content.substring(start, end + 1));
  }
  return banks;
}

export function saveAllBanks(banks) {
  for (const [dom, bank] of Object.entries(banks)) {
    const p = path.join(banksDir, `${dom}.js`);
    fs.writeFileSync(p, `export default ${JSON.stringify(bank, null, 2)};\n`, "utf8");
  }
  console.log("All banks saved successfully.");
}

console.log("calibrateBanks helper loaded.");
