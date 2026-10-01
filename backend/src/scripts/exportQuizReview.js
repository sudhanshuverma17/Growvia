import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { STAGE1_QUESTIONS } from "../config/stage1-questions.js";
import { STAGE2_BANKS } from "../services/stage2Selector.js";
import { DOMAINS, DOMAIN_LABELS } from "../config/quizDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, "../../../");
const exportDir = path.join(projectRoot, "docs/quiz-review");

// Ensure export directory exists
if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir, { recursive: true });
}

const noWeights = process.argv.includes("--no-weights");

console.log(`Generating human-review markdown export in docs/quiz-review/ (mode: ${noWeights ? "weights-free" : "with-weights"})...`);

// 1. Export Stage 1
let stage1Md = `# Stage 1 Discovery Quiz (All 11 Domains)\n\n`;
stage1Md += `Total Questions: ${STAGE1_QUESTIONS.length}\n`;
stage1Md += `Format: Scenario-based questions with 6 options each.\n\n---\n\n`;

STAGE1_QUESTIONS.forEach((q, idx) => {
  stage1Md += `### Q${idx + 1} (${q.id}): ${q.text}\n\n`;
  q.options.forEach((opt, oIdx) => {
    stage1Md += `- **Option ${oIdx + 1}** (${opt.id}): ${opt.text}\n`;
    if (!noWeights) {
      const weightsStr = Object.entries(opt.weights)
        .map(([slug, w]) => `${slug}(${w})`)
        .join(", ");
      stage1Md += `  - Weights: \`${weightsStr}\`\n\n`;
    } else {
      stage1Md += `\n`;
    }
  });
  stage1Md += `---\n\n`;
});

const stage1Filename = noWeights ? "stage1-no-weights.md" : "stage1.md";
fs.writeFileSync(path.join(exportDir, stage1Filename), stage1Md, "utf-8");
console.log(`✅ Generated docs/quiz-review/${stage1Filename}`);

// 2. Export Stage 2 Banks (all 11 domains)
for (const dom of DOMAINS) {
  const bank = STAGE2_BANKS[dom];
  const domLabel = DOMAIN_LABELS[dom] || dom;
  let domMd = `# Stage 2 Question Bank: ${domLabel} (\`${dom}\`)\n\n`;
  domMd += `Total Questions: ${bank.questions.length}\n`;
  if (!noWeights) {
    domMd += `Questions 1-4 are blended core (\`blendCore: true\`); Questions 5-7 are single-set specific (\`blendCore: false\`).\n\n---\n\n`;
  } else {
    domMd += `---\n\n`;
  }

  bank.questions.forEach((q, idx) => {
    domMd += `### Q${idx + 1} (${q.id})\n`;
    domMd += `**Text:** ${q.text}\n\n`;
    if (!noWeights) {
      domMd += `**blendCore:** \`${Boolean(q.blendCore)}\`\n\n`;
    }
    domMd += `**Options:**\n\n`;

    q.options.forEach((opt, oIdx) => {
      domMd += `${oIdx + 1}. **${opt.text}** (ID: \`${opt.id}\`)\n`;
      if (!noWeights) {
        const weightsStr = Object.entries(opt.weights)
          .map(([slug, w]) => `${slug}(${w})`)
          .join(", ");
        domMd += `   - Weights: \`${weightsStr}\`\n`;
        if (opt.reason) {
          domMd += `   - Reason: *${opt.reason}*\n`;
        }
      }
      domMd += `\n`;
    });
    domMd += `---\n\n`;
  });

  const domFilename = noWeights ? `${dom}-no-weights.md` : `${dom}.md`;
  fs.writeFileSync(path.join(exportDir, domFilename), domMd, "utf-8");
  console.log(`✅ Generated docs/quiz-review/${domFilename}`);
}

console.log("All human-review quiz exports generated successfully!");
