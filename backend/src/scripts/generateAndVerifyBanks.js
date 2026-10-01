import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.resolve(__dirname, "../config/stage2-banks");

// Helper to count words
function countWords(str) {
  return str.trim().split(/\s+/).length;
}

// Banned terms check
const BANNED_REGEX = /\b(cnn|pen-testing|pentesting|neural\s+network|smart\s+contract|p&l|itr|hvac|actuarial)\b/i;

export function validateQuestion(q, domain) {
  const qWords = countWords(q.text);
  if (qWords > 25) throw new Error(`[${domain}] Q '${q.id}' has ${qWords} words (>25)`);
  if (BANNED_REGEX.test(q.text)) throw new Error(`[${domain}] Q '${q.id}' contains banned jargon`);
  if (![5, 6].includes(q.options.length)) throw new Error(`[${domain}] Q '${q.id}' has ${q.options.length} options (must be 5 or 6)`);

  for (const opt of q.options) {
    const optWords = countWords(opt.text);
    if (optWords > 14) throw new Error(`[${domain}] Opt '${opt.id}' has ${optWords} words (>14): "${opt.text}"`);
    if (BANNED_REGEX.test(opt.text)) throw new Error(`[${domain}] Opt '${opt.id}' contains banned jargon: "${opt.text}"`);
    const wEntries = Object.entries(opt.weights);
    const w3 = wEntries.filter(([_, w]) => w === 3);
    if (w3.length !== 1) throw new Error(`[${domain}] Opt '${opt.id}' must have exactly ONE weight-3 slug (found ${w3.length})`);
    const sec = wEntries.filter(([_, w]) => w === 1 || w === 2);
    if (sec.length > 2) throw new Error(`[${domain}] Opt '${opt.id}' has ${sec.length} secondaries (>2)`);
    if (!opt.reason || typeof opt.reason !== "string") {
      throw new Error(`[${domain}] Opt '${opt.id}' missing reason string`);
    }
  }
}

console.log("Validator helper ready.");
