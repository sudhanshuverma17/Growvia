import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dir = path.resolve(__dirname, "../config/stage2-banks");

let badCount = 0;
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith(".js")) continue;
  const mod = await import(`file://${path.join(dir, f)}?t=${Date.now()}`);
  const bank = mod.default;
  for (const q of bank.questions) {
    for (const opt of q.options) {
      const w3 = Object.entries(opt.weights).filter(([s, w]) => w === 3);
      if (w3.length !== 1) {
        console.log(`${f} ${q.id} ${opt.id}: w3 count is ${w3.length}`, opt.weights);
        badCount++;
      }
    }
  }
}
console.log(`Total options with w3 !== 1: ${badCount}`);
