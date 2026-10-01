import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.resolve(__dirname, "../config/stage2-banks");

async function processAll() {
  for (const dom of ["tech", "healthcare", "business"]) {
    const p = path.join(banksDir, `${dom}.js`);
    const mod = await import(pathToFileURL(p).href);
    const bank = JSON.parse(JSON.stringify(mod.default));

    for (const q of bank.questions) {
      for (const opt of q.options) {
        if (!opt.reason) {
          const slug = Object.entries(opt.weights).find(([_, w]) => w === 3)?.[0];
          opt.reason = `Option directly exercises the distinctive skills and workflows of ${slug}.`;
        }
      }
    }

    fs.writeFileSync(p, `export default ${JSON.stringify(bank, null, 2)};\n`, "utf8");
    console.log(`Saved ${dom}.js with reasons.`);
  }
}

processAll();
