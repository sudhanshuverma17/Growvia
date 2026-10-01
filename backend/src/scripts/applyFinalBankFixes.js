import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.join(__dirname, "../config/stage2-banks");

// Update Q3 and Q4 in engineering.js and science.js so that own roadmaps have exactly 6 appearances across Q1..Q4 (2, 2, 1, 1)
// and outside slugs appear at most ONCE.

const engFilePath = path.join(banksDir, "engineering.js");
const engModule = await import(`file://${engFilePath}`);
const engBank = engModule.default;

// Engineering: mech (0), civil (1)
// Q1: [0, 0, 1, 1, journalist, hotel-management]
// Q2: [0, 0, 1, 1, chartered-accountant, lawyer]
// Q3: [0, 1, doctor, teacher, photographer, digital-marketer]
// Q4: [0, 1, psychologist, fashion-designer, pilot, financial-analyst]
engBank.questions[2].options[2].weights = { "doctor": 3 };
engBank.questions[2].options[2].reason = "Clinical diagnosis connects biomechanical ergonomics with medical practice.";
engBank.questions[2].options[3].weights = { "teacher": 3 };
engBank.questions[2].options[3].reason = "Technical instruction connects mechanical engineering with STEM education.";
engBank.questions[2].options[4].weights = { "photographer": 3 };
engBank.questions[2].options[4].reason = "High-speed optical imaging connects materials testing with technical photography.";
engBank.questions[2].options[5].weights = { "digital-marketer": 3 };
engBank.questions[2].options[5].reason = "Industrial technology marketing connects engineering innovations with digital communication.";

engBank.questions[3].options[2].weights = { "psychologist": 3 };
engBank.questions[3].options[2].reason = "Cognitive ergonomics connects machinery safety interfaces with human factors psychology.";
engBank.questions[3].options[3].weights = { "fashion-designer": 3 };
engBank.questions[3].options[3].reason = "Wearable protective gear connects material stress engineering with apparel design.";
engBank.questions[3].options[4].weights = { "pilot": 3 };
engBank.questions[3].options[4].reason = "Cockpit avionics and aerodynamics connects mechanical propulsion with commercial aviation.";
engBank.questions[3].options[5].weights = { "financial-analyst": 3 };
engBank.questions[3].options[5].reason = "Capital expenditure forecasting connects infrastructure engineering with financial analysis.";

fs.writeFileSync(engFilePath, `export default ${JSON.stringify(engBank, null, 2)};\n`, "utf-8");
console.log("Updated engineering.js Q3 & Q4 options!");

// Science: bio (0), env (1)
// Q1: [0, 0, 1, 1, lawyer, graphic-designer]
// Q2: [0, 0, 1, 1, pilot, civil-services]
// Q3: [0, 1, teacher, chartered-accountant, content-creator, hotel-management]
// Q4: [0, 1, journalist, fashion-designer, mba-manager, investment-banker]
const sciFilePath = path.join(banksDir, "science.js");
const sciModule = await import(`file://${sciFilePath}`);
const sciBank = sciModule.default;

sciBank.questions[2].options[2].weights = { "teacher": 3 };
sciBank.questions[2].options[2].reason = "Science education pedagogy connects biological research with classroom instruction.";
sciBank.questions[2].options[3].weights = { "chartered-accountant": 3 };
sciBank.questions[2].options[3].reason = "Research laboratory grant auditing connects scientific research with financial accounting.";
sciBank.questions[2].options[4].weights = { "content-creator": 3 };
sciBank.questions[2].options[4].reason = "Science communication videos connect microbiological discoveries with digital media.";
sciBank.questions[2].options[5].weights = { "hotel-management": 3 };
sciBank.questions[2].options[5].reason = "Eco-resort water recycling connects environmental conservation with sustainable hospitality.";

sciBank.questions[3].options[2].weights = { "journalist": 3 };
sciBank.questions[3].options[2].reason = "Environmental investigative reporting connects ecological monitoring with journalism.";
sciBank.questions[3].options[3].weights = { "fashion-designer": 3 };
sciBank.questions[3].options[3].reason = "Bio-fabricated plant-based textiles connect biotechnology with sustainable fashion design.";
sciBank.questions[3].options[4].weights = { "mba-manager": 3 };
sciBank.questions[3].options[4].reason = "Commercializing biotech patents connects laboratory discovery with corporate management.";
sciBank.questions[3].options[5].weights = { "investment-banker": 3 };
sciBank.questions[3].options[5].reason = "Green bond issuance connects environmental impact assessment with investment banking.";

fs.writeFileSync(sciFilePath, `export default ${JSON.stringify(sciBank, null, 2)};\n`, "utf-8");
console.log("Updated science.js Q3 & Q4 options!");

// Tech, Healthcare, Business: give 22 options for own roadmaps (6, 6, 5, 5)
// Tech: 7 roadmaps
// Q4 opt 5: give engineer (3) so Q4 has 5 own roadmaps!
const techFilePath = path.join(banksDir, "tech.js");
const techModule = await import(`file://${techFilePath}`);
const techBank = techModule.default;
techBank.questions[3].options[4].weights = { "engineer": 3 };
techBank.questions[3].options[4].reason = "Front-end interface accessibility refactoring defines specialized software engineering.";
fs.writeFileSync(techFilePath, `export default ${JSON.stringify(techBank, null, 2)};\n`, "utf-8");
console.log("Updated tech.js Q4 option 5!");

// Healthcare: 7 roadmaps
// Q4 opt 5: give doctor (3) so Q4 has 5 own roadmaps!
const healthFilePath = path.join(banksDir, "healthcare.js");
const healthModule = await import(`file://${healthFilePath}`);
const healthBank = healthModule.default;
healthBank.questions[3].options[4].weights = { "doctor": 3 };
healthBank.questions[3].options[4].reason = "Surgical ergonomics and clinical operating standards define medical doctor practice.";
fs.writeFileSync(healthFilePath, `export default ${JSON.stringify(healthBank, null, 2)};\n`, "utf-8");
console.log("Updated healthcare.js Q4 option 5!");

// Business: 7 roadmaps
// Q4 opt 5: give startup-founder (3) so Q4 has 5 own roadmaps!
const bizFilePath = path.join(banksDir, "business.js");
const bizModule = await import(`file://${bizFilePath}`);
const bizBank = bizModule.default;
bizBank.questions[3].options[4].weights = { "startup-founder": 3 };
bizBank.questions[3].options[4].reason = "Standardizing commercial terms and client contracts defines early-stage startup leadership.";
fs.writeFileSync(bizFilePath, `export default ${JSON.stringify(bizBank, null, 2)};\n`, "utf-8");
console.log("Updated business.js Q4 option 5!");

console.log("All updates written successfully!");
