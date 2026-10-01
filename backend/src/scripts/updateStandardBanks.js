import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.resolve(__dirname, "../config/stage2-banks");

// Read current banks
function getBank(domain) {
  const p = path.join(banksDir, `${domain}.js`);
  const content = fs.readFileSync(p, "utf8");
  // extract default export object
  const start = content.indexOf("{");
  const end = content.lastIndexOf("}");
  return JSON.parse(content.substring(start, end + 1));
}

function saveBank(domain, obj) {
  const p = path.join(banksDir, `${domain}.js`);
  fs.writeFileSync(p, `export default ${JSON.stringify(obj, null, 2)};\n`, "utf8");
  console.log(`Saved ${domain}.js`);
}

// 1. Update Media (ensure 6 options in Q1..Q4)
const media = getBank("media");
media.questions[0].options = [
  { id: "media_q1_opt1", text: "Produce energetic daily short-form reels showcasing behind-the-scenes school life.", weights: { "content-creator": 3, "graphic-designer": 2 }, reason: "Daily short-form video reels define digital content creation." },
  { id: "media_q1_opt2", text: "Direct a commemorative documentary film weaving nostalgic alumni interviews together.", weights: { "film-director": 3, "photographer": 1 }, reason: "Directing commemorative documentary films represents film direction." },
  { id: "media_q1_opt3", text: "Capture golden-hour portraits of retired teachers and celebration crowd highlights.", weights: { "photographer": 3, "film-director": 1 }, reason: "Portrait photography and celebration photojournalism define professional photography." },
  { id: "media_q1_opt4", text: "Investigate and write an inspiring commemorative newspaper article on school history.", weights: { "journalist": 3, "public-relations": 1 }, reason: "Investigating historical records for newspaper feature articles is journalism." },
  { id: "media_q1_opt5", text: "Draft official press releases and coordinate interviews with visiting city journalists.", weights: { "public-relations": 3, "digital-marketer": 2 }, reason: "Issuing official press releases and coordinating media interviews is public relations." },
  { id: "media_q1_opt6", text: "Design the vibrant jubilee logo, stage banners, and printed celebration booklets.", weights: { "graphic-designer": 3, "content-creator": 1 }, reason: "Designing jubilee celebration logos and graphic banners represents graphic design." }
];

media.questions[1].options = [
  { id: "media_q2_opt1", text: "Film an exciting vlog challenge that motivates teenagers to join Sunday cleanups.", weights: { "content-creator": 3, "digital-marketer": 2 }, reason: "Producing youth vlog challenges to drive community engagement is content creation." },
  { id: "media_q2_opt2", text: "Direct a cinematic short movie contrasting plastic pollution against pristine nature.", weights: { "film-director": 3, "graphic-designer": 2 }, reason: "Cinematic short movie direction with artistic visual contrast is film direction." },
  { id: "media_q2_opt3", text: "Shoot striking photojournalism images revealing industrial waste entering the river.", weights: { "photographer": 3, "journalist": 1 }, reason: "Shooting environmental photojournalism images on the ground is photography." },
  { id: "media_q2_opt4", text: "Uncover which factories dump waste illegally and interview local municipal authorities.", weights: { "journalist": 3, "public-relations": 1 }, reason: "Investigating corporate pollution and holding authorities accountable is journalism." },
  { id: "media_q2_opt5", text: "Manage public messaging and secure TV coverage for the cleanup organizers.", weights: { "public-relations": 3, "content-creator": 1 }, reason: "Securing national television coverage and managing campaign communication is PR." },
  { id: "media_q2_opt6", text: "Launch an engaging social media hashtag challenge driving massive youth attendance.", weights: { "digital-marketer": 3, "public-relations": 1 }, reason: "Launching targeted social media hashtag campaigns for attendance is digital marketing." }
];

media.questions[2].options = [
  { id: "media_q3_opt1", text: "A podcasting and video studio for engaging interviews with inspiring creators.", weights: { "content-creator": 3, "ed-tech": 2 }, reason: "Building podcasting and creator interview studios is digital content creation." },
  { id: "media_q3_opt2", text: "A film production soundstage with dramatic lighting rigs and actor sets.", weights: { "film-director": 3, "photographer": 1 }, reason: "Setting up theatrical film sets and lighting soundstages is film direction." },
  { id: "media_q3_opt3", text: "A darkroom and portrait studio with precision lenses and softbox lamps.", weights: { "photographer": 3, "graphic-designer": 2 }, reason: "Professional darkrooms and optical portrait studios define photography." },
  { id: "media_q3_opt4", text: "A live investigative newsroom tracking developing community stories on bulletin boards.", weights: { "journalist": 3, "content-creator": 1 }, reason: "Operating an investigative newsroom tracking developing stories is journalism." },
  { id: "media_q3_opt5", text: "A media communications briefing room holding press conferences and crisis briefings.", weights: { "public-relations": 3, "film-director": 1 }, reason: "Conducting press briefings and executive communications is public relations." },
  { id: "media_q3_opt6", text: "An interactive virtual media classroom where students learn digital broadcasting online.", weights: { "ed-tech": 3, "film-director": 1 }, reason: "Building interactive virtual media learning studios is educational technology." }
];

media.questions[3].options = [
  { id: "media_q4_opt1", text: "Publish an instant clarifying explainer video debunking the rumor on YouTube.", weights: { "content-creator": 3, "ed-tech": 1 }, reason: "Publishing immediate clarifying social video explainers is content creation." },
  { id: "media_q4_opt2", text: "Direct a short educational dramatization showing how fake news spreads online.", weights: { "film-director": 3, "ed-tech": 2 }, reason: "Directing dramatic educational films demonstrating fake news spread is film direction." },
  { id: "media_q4_opt3", text: "Capture honest photo evidence proving the rumor is completely false.", weights: { "photographer": 3, "journalist": 1 }, reason: "Documenting authentic photographic evidence to verify truth is photography." },
  { id: "media_q4_opt4", text: "Fact-check sources rigorously and publish a verified report with official statements.", weights: { "journalist": 3, "public-relations": 1 }, reason: "Rigorous fact-checking and published investigative reporting is journalism." },
  { id: "media_q4_opt5", text: "Issue an empathetic official statement calming parent concerns and protecting reputation.", weights: { "public-relations": 3, "content-creator": 1 }, reason: "Crisis communications, parent reassurance, and institutional reputation management is PR." },
  { id: "media_q4_opt6", text: "Design bold visual infographic posters breaking down the true facts for families.", weights: { "graphic-designer": 3, "journalist": 1 }, reason: "Designing fact-checking visual infographic posters represents graphic design." }
];

// Add reasons to Q5..Q8
for (let qIdx = 4; qIdx < media.questions.length; qIdx++) {
  const q = media.questions[qIdx];
  for (const opt of q.options) {
    const slug = Object.entries(opt.weights).find(([_, w]) => w === 3)?.[0];
    opt.reason = `Option directly exercises the distinctive skills of ${slug}.`;
  }
}
saveBank("media", media);

// 2. Update Creative (ensure 6 options in Q1..Q4)
const creative = getBank("creative");
creative.questions[0].options = [
  { id: "creat_q1_opt1", text: "Sketch versatile, ergonomic modular study desks that adapt to compact dorm rooms.", weights: { designer: 3, architect: 2 }, reason: "Ergonomic modular furniture and functional product sketching is industrial design." },
  { id: "creat_q1_opt2", text: "Craft expressive typography posters and modern geometric icons for a student festival.", weights: { "graphic-designer": 3, designer: 2 }, reason: "Expressive typography and geometric visual icon branding is graphic design." },
  { id: "creat_q1_opt3", text: "Plan an open-air sustainable courtyard pavilion capturing optimal natural daylight and breezes.", weights: { architect: 3, "civil-engineer": 2 }, reason: "Sustainable daylight planning and open-air pavilion structures define architecture." },
  { id: "creat_q1_opt4", text: "Transform a gloomy student common room with warm lighting, acoustics, and textiles.", weights: { "interior-designer": 3, designer: 2 }, reason: "Acoustic ambiance, lighting atmosphere, and spatial textiles define interior design." },
  { id: "creat_q1_opt5", text: "Drape sustainable upcycled khadi fabrics into a contemporary runway fashion collection.", weights: { "fashion-designer": 3, designer: 2 }, reason: "Upcycled fabric draping and runway apparel silhouettes define fashion design." },
  { id: "creat_q1_opt6", text: "Program interactive 3D character animations and responsive environments for visitors.", weights: { "game-developer": 3, designer: 1 }, reason: "Programming interactive 3D virtual characters and spaces is game development." }
];

creative.questions[1].options = [
  { id: "creat_q2_opt1", text: "Test recyclable biomaterials to engineer lightweight, durable reusable school lunchware.", weights: { designer: 3, architect: 1 }, reason: "Biomaterial testing and durable consumer product prototyping is industrial design." },
  { id: "creat_q2_opt2", text: "Design a clean, modern mobile app layout for discovering campus workshops.", weights: { "graphic-designer": 3, "game-developer": 2 }, reason: "Mobile interface layouts and clear digital visual systems define graphic design." },
  { id: "creat_q2_opt3", text: "Draft blueprints for an earthquake-resilient community library with vaulted reading spaces.", weights: { architect: 3, "interior-designer": 1 }, reason: "Drafting structural blueprints and vaulted public reading halls is architecture." },
  { id: "creat_q2_opt4", text: "Curate soothing indoor plant installations and ergonomic seating for quiet study zones.", weights: { "interior-designer": 3, architect: 1 }, reason: "Biophilic plant curation and tranquil spatial zoning define interior design." },
  { id: "creat_q2_opt5", text: "Illustrate hand-block textile prints inspired by regional biodiversity for ethical streetwear.", weights: { "fashion-designer": 3, "graphic-designer": 2 }, reason: "Hand-block textile print illustration and apparel collections define fashion design." },
  { id: "creat_q2_opt6", text: "Direct the cinematic lighting and artistic camera angles highlighting the exhibition.", weights: { "film-director": 3, "interior-designer": 1 }, reason: "Directing cinematic lighting and exhibition camera angles is film direction." }
];

creative.questions[2].options = [
  { id: "creat_q3_opt1", text: "Model sleek wearable fitness trackers with water-resistant magnetic wrist clasps.", weights: { designer: 3, "fashion-designer": 1 }, reason: "Wearable consumer electronics and hardware ergonomics define product design." },
  { id: "creat_q3_opt2", text: "Create bold, high-contrast packaging illustrations for an artisanal organic spice brand.", weights: { "graphic-designer": 3, designer: 1 }, reason: "High-contrast packaging design and illustrative brand packaging is graphic design." },
  { id: "creat_q3_opt3", text: "Design a waterfront promenade integrating pedestrian walkways, shade canopies, and plazas.", weights: { architect: 3, "interior-designer": 1 }, reason: "Urban waterfront master planning and civic promenade architecture is architecture." },
  { id: "creat_q3_opt4", text: "Reimagine a historic bookstore into an intimate, warm literary reading cafe.", weights: { "interior-designer": 3, architect: 1 }, reason: "Heritage interior conversions, ambient reading nooks, and cafes are interior design." },
  { id: "creat_q3_opt5", text: "Experiment with zero-waste pattern cutting techniques to craft modern formal jackets.", weights: { "fashion-designer": 3, designer: 1 }, reason: "Zero-waste pattern engineering and bespoke tailored garment construction is fashion." },
  { id: "creat_q3_opt6", text: "Capture stunning portfolio photographs showcasing the textural details of artworks.", weights: { "photographer": 3, "fashion-designer": 1 }, reason: "Capturing high-resolution portfolio photos of artistic textures is photography." }
];

creative.questions[3].options = [
  { id: "creat_q4_opt1", text: "Build clay and digital mockups for aerodynamic electric commuter bicycles.", weights: { designer: 3, architect: 1 }, reason: "Aerodynamic transportation modeling and physical mockups define industrial design." },
  { id: "creat_q4_opt2", text: "Produce interactive vector infographics illustrating complex climate change solutions clearly.", weights: { "graphic-designer": 3, designer: 1 }, reason: "Complex data visualization and educational vector infographics define graphic design." },
  { id: "creat_q4_opt3", text: "Design a high-altitude research observatory blending seamlessly into mountain rock faces.", weights: { architect: 3, "civil-engineer": 2 }, reason: "Topographic integration and complex climatic building design define architecture." },
  { id: "creat_q4_opt4", text: "Design sensory-friendly classroom interiors with adjustable acoustic panels for autistic students.", weights: { "interior-designer": 3, designer: 1 }, reason: "Sensory-friendly spatial design and specialized acoustic environments is interior design." },
  { id: "creat_q4_opt5", text: "Craft hand-woven organic accessories and footwear celebrating indigenous leather alternative crafts.", weights: { "fashion-designer": 3, "graphic-designer": 1 }, reason: "Sustainable accessory craftsmanship and cruelty-free footwear is fashion design." },
  { id: "creat_q4_opt6", text: "Engineer the foundational structural frames and load-bearing columns supporting the pavilion.", weights: { "civil-engineer": 3, architect: 1 }, reason: "Engineering load-bearing structural frames for an exhibition pavilion is civil engineering." }
];

for (let qIdx = 4; qIdx < creative.questions.length; qIdx++) {
  const q = creative.questions[qIdx];
  for (const opt of q.options) {
    const slug = Object.entries(opt.weights).find(([_, w]) => w === 3)?.[0];
    opt.reason = `Option directly exercises the distinctive skills of ${slug}.`;
  }
}
saveBank("creative", creative);

// 3. Update Finance (ensure 6 options in Q1..Q4, no duplicate weight 3s)
const finance = getBank("finance");
finance.questions[0].options = [
  { id: "fin_q1_opt1", text: "Audit every receipt and verify that school funds match expense reports accurately.", weights: { "chartered-accountant": 3, lawyer: 1 }, reason: "Auditing expense receipts and verifying accounts match reports is chartered accountancy." },
  { id: "fin_q1_opt2", text: "Pitch funding proposals to corporate sponsors and negotiate high-value festival partnerships.", weights: { "investment-banker": 3, "financial-analyst": 1 }, reason: "Pitching funding proposals and negotiating corporate partnerships is investment banking." },
  { id: "fin_q1_opt3", text: "Create monthly financial forecast spreadsheets tracking department spending trends.", weights: { "financial-analyst": 3, "data-scientist": 1 }, reason: "Creating monthly financial forecast spreadsheets is financial analysis." },
  { id: "fin_q1_opt4", text: "Calculate statistical financial risk models to protect against unexpected event rainy days.", weights: { actuary: 3, "mba-manager": 1 }, reason: "Calculating statistical risk models for event contingencies is actuarial science." },
  { id: "fin_q1_opt5", text: "Review contract terms and ensure all sponsorship agreements comply with legal statutes.", weights: { lawyer: 3, "chartered-accountant": 1 }, reason: "Reviewing contracts and statutory compliance across sponsorships represents legal counsel." },
  { id: "fin_q1_opt6", text: "Build an automated dashboard tracking budget variances and flagging spending spikes instantly.", weights: { "data-scientist": 3, "financial-analyst": 1 }, reason: "Building automated budget analytics dashboards and anomaly detection is data science." }
];

finance.questions[1].options = [
  { id: "fin_q2_opt1", text: "Structure legal company registrations, book records, and annual government tax filings.", weights: { "chartered-accountant": 3, "financial-analyst": 1 }, reason: "Structuring company tax filings and official bookkeeping records is chartered accountancy." },
  { id: "fin_q2_opt2", text: "Help them secure venture financing and value their business before talking to banks.", weights: { "investment-banker": 3, "startup-founder": 1 }, reason: "Valuing early-stage businesses and securing venture funding is investment banking." },
  { id: "fin_q2_opt3", text: "Study market pricing charts and competitor profit margins to ensure positive cashflow.", weights: { "financial-analyst": 3, "chartered-accountant": 1 }, reason: "Analyzing competitor pricing models and cashflow profit margins is financial analysis." },
  { id: "fin_q2_opt4", text: "Model potential business loss scenarios and recommend insurance protection plans.", weights: { actuary: 3, "data-scientist": 1 }, reason: "Modeling business risk probabilities and contingency insurance plans is actuarial science." },
  { id: "fin_q2_opt5", text: "Validate product market fit and acquire their very first hundred paying customers.", weights: { "startup-founder": 3, "investment-banker": 1 }, reason: "Validating customer demand and executing early venture launch is startup entrepreneurship." },
  { id: "fin_q2_opt6", text: "Design organizational operational workflows and supply management systems for their team.", weights: { "mba-manager": 3, "financial-analyst": 1 }, reason: "Structuring operational workflows and corporate organizational design is MBA management." }
];

finance.questions[2].options = [
  { id: "fin_q3_opt1", text: "Select steady dividend-paying public companies with consistent annual financial audit records.", weights: { "chartered-accountant": 3, "financial-analyst": 1 }, reason: "Selecting stable dividend-yielding companies with pristine balance sheets is chartered accountancy." },
  { id: "fin_q3_opt2", text: "Back high-growth tech companies undergoing acquisitions and global stock market listings.", weights: { "investment-banker": 3, "startup-founder": 1 }, reason: "Backing high-growth tech initial public offerings and cross-border acquisitions is investment banking." },
  { id: "fin_q3_opt3", text: "Study macroeconomic indicators, interest rates, and quarterly corporate earnings calls.", weights: { "financial-analyst": 3, "data-scientist": 1 }, reason: "Studying macroeconomic indicators, interest rates, and quarterly corporate earnings is financial analysis." },
  { id: "fin_q3_opt4", text: "Hedge market risks using statistical probability models and diversification matrices.", weights: { actuary: 3, "mba-manager": 1 }, reason: "Balancing high-risk derivatives against defensive treasury bonds using variance mathematics is actuarial science." },
  { id: "fin_q3_opt5", text: "Write automated quantitative trading algorithms that execute statistical arbitrage opportunities.", weights: { "data-scientist": 3, "financial-analyst": 1 }, reason: "Writing algorithmic trading models and quantitative price analytics is data science." },
  { id: "fin_q3_opt6", text: "Conduct due diligence to ensure investment selections follow international securities regulations.", weights: { lawyer: 3, "investment-banker": 1 }, reason: "Conducting regulatory securities compliance and investment due diligence is financial law." }
];

finance.questions[3].options = [
  { id: "fin_q4_opt1", text: "Eliminate operational accounting waste and restructure internal department book balances.", weights: { "chartered-accountant": 3, "financial-analyst": 1 }, reason: "Restructuring tax liabilities and optimizing working capital efficiency is chartered accountancy." },
  { id: "fin_q4_opt2", text: "Raise strategic turnaround financing and restructure long-term corporate commercial loans.", weights: { "investment-banker": 3, "startup-founder": 1 }, reason: "Arranging structured debt financing and negotiating syndication packages is investment banking." },
  { id: "fin_q4_opt3", text: "Perform detailed valuation benchmarks comparing their product lines with global market competitors.", weights: { "financial-analyst": 3, "chartered-accountant": 1 }, reason: "Benchmarking return on invested capital across competing industrial divisions is financial analysis." },
  { id: "fin_q4_opt4", text: "Calculate pension liability risks and design solvent retirement fund allocation plans.", weights: { actuary: 3, "data-scientist": 1 }, reason: "Calculating long-term pension liability reserve models for corporate employees is actuarial science." },
  { id: "fin_q4_opt5", text: "Pitch equity restructuring packages to institutional turnaround venture capital partners.", weights: { "startup-founder": 3, "investment-banker": 1 }, reason: "Pitching venture capital partners and restructuring equity stakes is startup entrepreneurship." },
  { id: "fin_q4_opt6", text: "Lead executive corporate strategy to streamline underperforming subsidiaries into profitability.", weights: { "mba-manager": 3, "financial-analyst": 1 }, reason: "Directing corporate enterprise turnaround and strategic restructuring is MBA management." }
];

for (let qIdx = 4; qIdx < finance.questions.length; qIdx++) {
  const q = finance.questions[qIdx];
  for (const opt of q.options) {
    const slug = Object.entries(opt.weights).find(([_, w]) => w === 3)?.[0];
    opt.reason = `Option directly exercises the distinctive skills of ${slug}.`;
  }
}
saveBank("finance", finance);

console.log("Updated media, creative, finance banks with 6 options per blendCore question.");
