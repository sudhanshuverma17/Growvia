/**
 * Assemble all 11 clean, semantically audited, and mathematically balanced banks.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.resolve(__dirname, "../config/stage2-banks");

export function writeBankFile(domain, bankObj) {
  const filePath = path.join(banksDir, `${domain}.js`);
  const content = `/**
 * Stage 2 Question Bank: ${domain}
 * Generated with semantic audit, reasons for every option, and calibrated weights.
 */
export default ${JSON.stringify(bankObj, null, 2)};
`;
  fs.writeFileSync(filePath, content, "utf8");
}

console.log("assembleBanks helper ready.");
