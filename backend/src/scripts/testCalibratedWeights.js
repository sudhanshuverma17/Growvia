import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";
import { run55PairsTest } from "./testAndBalanceBanks.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.resolve(__dirname, "../config/stage2-banks");

async function loadBanks() {
  const banks = {};
  for (const dom of DOMAINS) {
    const p = path.join(banksDir, `${dom}.js`);
    const mod = await import(`file://${p}?t=${Date.now()}`);
    banks[dom] = JSON.parse(JSON.stringify(mod.default));
  }
  return banks;
}

function saveBank(dom, bank) {
  const p = path.join(banksDir, `${dom}.js`);
  fs.writeFileSync(p, `export default ${JSON.stringify(bank, null, 2)};\n`, "utf8");
}

console.log("Ready to test and calibrate.");
