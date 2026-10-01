import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.resolve(__dirname, "../config/stage2-banks");

// 1. LAW_GOV TEXTS
const lawTexts = {
  law_q1_opt1: "Argue constitutional civil rights challenges before the High Court defending citizen liberties.",
  law_q1_opt2: "Draft executive administrative orders addressing citizen grievances and reforming municipal compliance.",
  law_q1_opt3: "Deploy military police detachments to secure critical infrastructure and maintain public order.",
  law_q1_opt4: "File urgent judicial review petitions restraining arbitrary enforcement of unlawful civic penalties.",
  law_q1_opt5: "Convene tripartite consultations between municipal authorities, trade unions, and civic associations.",
  law_q1_opt6: "Audit municipal revenue records to verify whether regulatory fee increases are fiscally justified.",

  law_q2_opt1: "Command frontline helicopter rescue sorties and establish tactical supply airheads under adverse conditions.",
  law_q2_opt2: "Draft emergency legal ordinances granting indemnities while safeguarding fundamental civil rights.",
  law_q2_opt3: "Coordinate inter-departmental relief supply chains ensuring grain and medicine reach remote tehsils.",
  law_q2_opt4: "Mobilize military engineer task forces to erect temporary pontoon bridges across flooded rivers.",
  law_q2_opt5: "Review statutory disaster powers to prevent administrative overreach during crisis response.",
  law_q2_opt6: "Supervise emergency shelter hospitality operations organizing food service and lodging for evacuees.",

  law_q3_opt1: "Streamline bureaucratic approval workflows to eliminate red tape across public welfare delivery.",
  law_q3_opt2: "Modernize veteran resettlement programs and strengthen border garrison welfare facilities.",
  law_q3_opt3: "Codify legal aid accessibility frameworks providing free counsel for impoverished defendants.",
  law_q3_opt4: "Digitize land registry archives to eradicate fraudulent title deeds across rural districts.",
  law_q3_opt5: "Upgrade tactical defensive doctrine and counter-insurgency training standards for young cadets.",
  law_q3_opt6: "Model demographic pension statistical solvency projections for municipal retirement benefit schemes.",

  law_q4_opt1: "Represent national interests before international human rights tribunals and maritime treaty courts.",
  law_q4_opt2: "Negotiate bilateral inter-governmental accords on cross-border labor mobility and vocational standards.",
  law_q4_opt3: "Serve as military defense attaché liaising with multinational peacekeeping staff commands.",
  law_q4_opt4: "Evaluate shared trans-boundary hydropower turbine engineering standards and joint grid protocols.",
  law_q4_opt5: "Advise international biosecurity working groups on agricultural pathogen surveillance treaties.",
  law_q4_opt6: "Organize protocol logistics for international heads-of-state diplomatic banquets and summit proceedings.",

  law_q5_opt1: "Build a watertight courtroom prosecution brief demanding punitive damages and corporate penalties.",
  law_q5_opt2: "Subpoena corporate balance sheets to uncover clandestine payments concealing toxic dumping operations.",
  law_q5_opt3: "Audit corporate hospitality accounts to verify whether executive retreat expenditures concealed kickbacks.",
  law_q5_opt4: "Calculate long-term health risk liabilities and environmental cleanup indemnity valuations.",
  law_q5_opt5: "Inspect factory effluent treatment pumps and piping schematics to identify illegal bypass lines.",
  law_q5_opt6: "Analyze soil toxicity assays and microbiological indicators to prove ecological contamination severity.",

  law_q6_opt1: "Serving as District Collector transforming an underdeveloped rural region into a literacy benchmark.",
  law_q6_opt2: "Developing luxury heritage properties that stimulate sustainable tourism revenue across backward provinces.",
  law_q6_opt3: "Structuring the solvency reserves of national social security funds protecting millions of retirees.",
  law_q6_opt4: "Designing durable rural canal control gates and solar water pump networks across parched districts.",
  law_q6_opt5: "Developing drought-resistant staple crops distributed through government agricultural seed programs.",
  law_q6_opt6: "Orchestrating national Republic Day ceremonial parades managing protocol, security, and broadcast coordination.",

  law_q7_opt1: "Uncompromising personal integrity, valor, and selfless devotion to protecting the motherland.",
  law_q7_opt2: "Quantitative rigor in evaluating public risk and ensuring financial promises remain solvent.",
  law_q7_opt3: "Precision craftsmanship and engineering ethics when constructing infrastructure the public relies on.",
  law_q7_opt4: "Scientific inquiry and ethical responsibility when applying life sciences for human welfare.",
  law_q7_opt5: "Meticulous organizational preparation and calm crisis leadership under high-pressure public visibility.",
  law_q7_opt6: "Fiscal stewardship and honest accounting to ensure public funds enrich citizens, not elites.",
};

// 2. EDUCATION_SOCIAL TEXTS
const eduTexts = {
  edu_q1_opt1: "Deliver engaging interactive classroom lessons and personalized after-school tutoring for struggling learners.",
  edu_q1_opt2: "Deploy low-bandwidth mobile learning modules providing gamified foundational math practice offline.",
  edu_q1_opt3: "Visit student households to counsel parents and remove socio-economic barriers to school attendance.",
  edu_q1_opt4: "Form classroom study circles and peer mentoring groups that boost student academic confidence.",
  edu_q1_opt5: "Build automated progress dashboards alerting teachers early when students show comprehension lapses.",
  edu_q1_opt6: "Construct safe, weather-proof village schoolrooms with sanitary sanitation blocks for girls.",

  edu_q2_opt1: "Establish community rehabilitation workshops equipping vulnerable youth with marketable vocational skills.",
  edu_q2_opt2: "Design rigorous hands-on apprenticeship syllabi and instruct trainees in technical workshop crafts.",
  edu_q2_opt3: "Develop interactive digital simulations enabling students to practice machinery operation virtually.",
  edu_q2_opt4: "Connect marginalized youth with subsidized housing, mental health counseling, and wage employment.",
  edu_q2_opt5: "Coach trainees in communication etiquette, interview confidence, and professional workplace standards.",
  edu_q2_opt6: "Document uplifting trainee success stories through photojournalism exhibitions that attract donor funding.",

  edu_q3_opt1: "Design computer lab software learning paths teaching computational logic and keyboard literacy.",
  edu_q3_opt2: "Run family crisis counseling rooms supporting households experiencing poverty, domestic stress, or addiction.",
  edu_q3_opt3: "Direct literacy reading circles helping first-generation learners discover joy in storybooks.",
  edu_q3_opt4: "Configure open-source digital audiobooks and localized language apps for adult literacy classes.",
  edu_q3_opt5: "Coordinate local volunteer networks providing nutritious evening snacks and basic healthcare checkups.",
  edu_q3_opt6: "Equip maker workshops with hands-on mechanical tools and basic electronics repair benches.",

  edu_q4_opt1: "Differentiated pedagogy techniques that inspire curiosity and critical thinking in diverse classrooms.",
  edu_q4_opt2: "AI-powered adaptive learning algorithms personalizing homework difficulty to student mastery levels.",
  edu_q4_opt3: "Trauma-informed community support systems protecting children in disadvantaged and vulnerable neighborhoods.",
  edu_q4_opt4: "Financial governance and transparent accounting standards for public school district budget allocations.",
  edu_q4_opt5: "Integrating hands-on biology laboratory modules that teach plant genetics in rural schools.",
  edu_q4_opt6: "Organizing large-scale regional science expos where thousands of students display collaborative inventions.",

  edu_q5_opt1: "A network of model high schools where exceptional educators nurture underprivileged talents.",
  edu_q5_opt2: "A free multilingual online learning platform reaching ten million students across rural towns.",
  edu_q5_opt3: "A microfinance endowment fund providing zero-interest loans for students pursuing higher vocational diplomas.",
  edu_q5_opt4: "An educational scholarship fund utilizing predictive risk models to guarantee multi-year student grants.",
  edu_q5_opt5: "An experiential outdoor ecology academy teaching school children biodiversity conservation through field projects.",
  edu_q5_opt6: "A vocational culinary and hotel training institute providing underprivileged youth premier career pathways.",

  edu_q6_opt1: "Build bite-sized interactive mobile puzzles where students gain self-confidence through iterative mastery.",
  edu_q6_opt2: "Teach them personal budgeting fundamentals, banking literacy, and prudent financial independence habits.",
  edu_q6_opt3: "Analyze socio-economic risk factors to design targeted drop-out prevention safety net policies.",
  edu_q6_opt4: "Engage them in urban forestry restoration projects that foster environmental responsibility and teamwork.",
  edu_q6_opt5: "Mentor them in customer service hospitality disciplines and professional teamwork on hotel floors.",
  edu_q6_opt6: "Introduce them to aviation cadet simulators and disciplined STEM aerodynamics navigation principles.",

  edu_q7_opt1: "Uplifting hundreds of vulnerable families from generational poverty through tireless social advocacy.",
  edu_q7_opt2: "Structuring sustainable community micro-insurance frameworks that shield low-income families during economic crises.",
  edu_q7_opt3: "Restoring polluted river basins that supply clean drinking water to hundreds of villages.",
  edu_q7_opt4: "Mentoring thousands of hospitality apprentices who rise to manage premier international resorts.",
  edu_q7_opt5: "Inspiring rural students to become commercial aviators through youth flight simulation academies.",
  edu_q7_opt6: "Designing affordable, disaster-resilient community schools that withstand earthquakes and monsoon floods.",
};

// 3. AVIATION_HOSPITALITY TEXTS
const avTexts = {
  av_q1_opt1: "Pilot VIP transport aircraft safely through congested airspace and inclement weather patterns.",
  av_q1_opt2: "Oversee five-star hotel operations ensuring flawless guest concierge services and VIP luxury suites.",
  av_q1_opt3: "Coordinate stadium opening ceremonies, stage lighting, international broadcasting, and spectator crowd flows.",
  av_q1_opt4: "Calculate flight diversion routes and fuel burn margins for incoming international charter fleets.",
  av_q1_opt5: "Manage luxury dining banquets and international culinary menus for visiting heads of state.",
  av_q1_opt6: "Design rapid bus transit lanes and passenger flow walkways connecting airport to stadium.",

  av_q2_opt1: "Re-sequence conference agendas and arrange entertainment lounges so delayed delegates remain engaged.",
  av_q2_opt2: "Execute precision instrument approaches and review autoland runway visual range minimums calmly.",
  av_q2_opt3: "Quickly arrange hundreds of hotel transit rooms and hot meals for stranded passengers.",
  av_q2_opt4: "Coordinate airport terminal volunteer desks managing passenger crowds and live transport information.",
  av_q2_opt5: "Conduct thorough pre-flight aircraft walkarounds checking de-icing fluids, wing surfaces, and tire pressures.",
  av_q2_opt6: "Calculate financial compensation liabilities and rebooking loss exposures across cancelled airline schedules.",

  av_q3_opt1: "Curate bespoke butler service experiences, wellness spas, and personalized luxury guest amenities.",
  av_q3_opt2: "Produce vibrant outdoor music festivals, artisan cultural fairs, and beachfront sporting tournaments.",
  av_q3_opt3: "Establish an on-site seaplane charter service offering scenic aerial excursions over islands.",
  av_q3_opt4: "Train hospitality staff in elite multilingual etiquette, housekeeping hygiene, and guest satisfaction.",
  av_q3_opt5: "Design grand wedding banquet setups with themed floral decor, sound stages, and pyrotechnics.",
  av_q3_opt6: "Ensure resort zoning adheres strictly to coastal ecological regulations and public beach access.",

  av_q4_opt1: "Navigate vessel maritime airways and coordinate harbor pilot docking maneuvers in dense fog.",
  av_q4_opt2: "Supervise stateroom housekeeping operations, gourmet dining galleys, and round-the-clock guest concierge services.",
  av_q4_opt3: "Direct nightly theater productions, live concerts, and poolside gala events across decks.",
  av_q4_opt4: "Monitor marine diesel propulsion engines, stabilizer fins, and automated desalinization plant systems.",
  av_q4_opt5: "Audit onboard casino cash flows, luxury retail duty-free concessions, and cruise ticketing revenue.",
  av_q4_opt6: "Verify drinking water purification standards and food safety microbiological assays across galley kitchens.",

  av_q5_opt1: "Commanding widebody international flights across oceans with complete mastery of flight decks.",
  av_q5_opt2: "Designing modern eco-friendly airport terminal concourses with seamless passenger transit gate layouts.",
  av_q5_opt3: "Structuring multi-million dollar airline aircraft fleet leasing contracts and route profitability models.",
  av_q5_opt4: "Developing national civil aviation safety policies and expanding regional airport connectivity schemes.",
  av_q5_opt5: "Engineering high-bypass turbofan jet engine overhauls that improve aircraft fuel efficiency.",
  av_q5_opt6: "Managing global hotel chain financial auditing and luxury property acquisition investment portfolios.",

  av_q6_opt1: "Calmly resolving emergency VIP lodging crises and kitchen disruptions without guests sensing distress.",
  av_q6_opt2: "Quickly reconciling refund disputes and insurance claim liabilities during unexpected event cancellations.",
  av_q6_opt3: "Liaising with police, fire services, and municipal regulators to enforce emergency protocols.",
  av_q6_opt4: "Troubleshooting aircraft auxiliary power units and hydraulic leaks before departure with precision.",
  av_q6_opt5: "Auditing immediate emergency procurement invoices to avoid price gouging during emergency operations.",
  av_q6_opt6: "Managing rapid food hygiene containment protocols when suspected foodborne contamination is reported.",

  av_q7_opt1: "Directing world-class cultural expos and Olympic ceremonies celebrated globally for flawless execution.",
  av_q7_opt2: "Pioneering national tourism infrastructure corridors that bring economic prosperity to rural villages.",
  av_q7_opt3: "Pioneering hydrogen fuel cell propulsion designs for the next generation of regional aircraft.",
  av_q7_opt4: "Establishing premier financial auditing standards across the international commercial aviation sector.",
  av_q7_opt5: "Developing sustainable aviation biofuels derived from non-food agricultural waste to reduce emissions.",
  av_q7_opt6: "Constructing landmark international airport terminals praised globally for architectural beauty and efficiency.",
};

function updateBank(dom, texts) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bank = JSON.parse(fs.readFileSync(filePath, "utf8").replace(/^export default\s+/, "").replace(/;\s*$/, ""));

  for (const q of bank.questions) {
    for (const opt of q.options) {
      if (texts[opt.id]) {
        opt.text = texts[opt.id];
        const w3 = Object.entries(opt.weights).find(([s, w]) => w === 3)?.[0];
        opt.reason = `Option directly exercises the distinctive core practices and methodologies of ${w3}.`;
      }
    }
  }

  fs.writeFileSync(filePath, `export default ${JSON.stringify(bank, null, 2)};\n`);
  console.log(`Updated bank ${dom} with semantically authentic option texts.`);
}

updateBank("law_gov", lawTexts);
updateBank("education_social", eduTexts);
updateBank("aviation_hospitality", avTexts);
