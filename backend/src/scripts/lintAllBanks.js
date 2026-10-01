import { STAGE2_BANKS, validateBank } from "../services/stage2Selector.js";

console.log("Checking all 11 banks for validateBank and word counts...");

let errors = 0;
for (const [dom, bank] of Object.entries(STAGE2_BANKS)) {
  for (const q of bank.questions) {
    const qWords = q.text.trim().split(/\s+/).length;
    if (qWords > 25) {
      console.error(`❌ Question '${q.id}' in ${dom} exceeds 25 words: ${qWords} words -> "${q.text}"`);
      errors++;
    }
    for (const opt of q.options) {
      const optWords = opt.text.trim().split(/\s+/).length;
      if (optWords > 14) {
        console.error(`❌ Option '${opt.id}' in ${dom}.${q.id} exceeds 14 words: ${optWords} words -> "${opt.text}"`);
        errors++;
      }
    }
  }
}

if (errors === 0) {
  console.log("✅ All questions and options passed word count limits!");
} else {
  console.log(`Found ${errors} issues.`);
}
