import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.resolve(__dirname, "../config/stage2-banks");

function saveBank(domain, obj) {
  const p = path.join(banksDir, `${domain}.js`);
  fs.writeFileSync(p, `export default ${JSON.stringify(obj, null, 2)};\n`, "utf8");
  console.log(`Saved ${domain}.js`);
}

// ============================================================================
// 4. Core Engineering (engineering)
// ============================================================================
const engineering = {
  domain: "engineering",
  questions: [
    {
      id: "eng_q1",
      text: "A major coastal bridge project is being planned for your state. Where would you contribute?",
      blendCore: true,
      options: [
        { id: "eng_q1_opt1", text: "Design heavy steel trusses and calculate wind vibration loads on suspension cables.", weights: { "mechanical-engineer": 3, "civil-engineer": 1 }, reason: "Vibration physics and steel cable tension calculations are mechanical engineering." },
        { id: "eng_q1_opt2", text: "Survey underwater soil strata and pour earthquake-resistant deep concrete foundations.", weights: { "civil-engineer": 3, "mechanical-engineer": 1 }, reason: "Soil mechanics, geotechnical surveys, and foundation piling define civil engineering." },
        { id: "eng_q1_opt3", text: "Calculate dynamic wave impact stress on bridge pier structural concrete joints.", weights: { "civil-engineer": 3, "mechanical-engineer": 1 }, reason: "Structural concrete load stress under hydrodynamic forces is civil engineering." },
        { id: "eng_q1_opt4", text: "Create the aesthetic bridge lighting towers and pedestrian promenade view decks.", weights: { architect: 3, "civil-engineer": 1 }, reason: "Aesthetic promenade forms, viewing decks, and visual architecture define architecture." },
        { id: "eng_q1_opt5", text: "Coordinate international cargo ships delivering giant pre-cast road sections on schedule.", weights: { "supply-chain": 3, "civil-engineer": 1 }, reason: "International heavy cargo maritime shipping and delivery schedules is supply chain." },
        { id: "eng_q1_opt6", text: "Test surrounding marine ecosystems to ensure coastal wildlife habitats remain unharmed.", weights: { "environmental-scientist": 3, "civil-engineer": 1 }, reason: "Marine ecosystem testing and environmental habitat preservation is environmental science." }
      ]
    },
    {
      id: "eng_q2",
      text: "You are visiting a high-tech manufacturing plant. Which innovation catches your eye?",
      blendCore: true,
      options: [
        { id: "eng_q2_opt1", text: "High-precision robotic cutting arms fabricating heat-resistant aircraft turbine parts.", weights: { "mechanical-engineer": 3, "civil-engineer": 1 }, reason: "Robotic fabrication, thermal metallurgy, and turbine mechanics define mechanical engineering." },
        { id: "eng_q2_opt2", text: "Massive industrial factory warehouses designed with natural ventilation and crane tracks.", weights: { "civil-engineer": 3, "mechanical-engineer": 1 }, reason: "Designing massive industrial clear-span warehouses with heavy crane tracks is civil engineering." },
        { id: "eng_q2_opt3", text: "Design pneumatic assembly line conveyor belts and automated hydraulic lifting mechanisms.", weights: { "mechanical-engineer": 3, "civil-engineer": 1 }, reason: "Pneumatics, hydraulic power transfer, and conveyor kinematics are mechanical engineering." },
        { id: "eng_q2_opt4", text: "Flight deck instrumentation and hydraulic rudder mechanisms tested in wind tunnels.", weights: { pilot: 3, "mechanical-engineer": 1 }, reason: "Cockpit instruments, wind tunnel flight dynamics, and rudder controls represent aviation." },
        { id: "eng_q2_opt5", text: "Automated warehouse forklifts moving materials between manufacturing assembly lines.", weights: { "supply-chain": 3, "mechanical-engineer": 1 }, reason: "Internal factory materials logistics and automated forklift routing is supply chain." },
        { id: "eng_q2_opt6", text: "Armored vehicle chassis fabrication built to withstand heavy battlefield ballistic impacts.", weights: { "army-officer": 3, "mechanical-engineer": 1 }, reason: "Ballistic armor testing and battlefield combat vehicle survivability is defense leadership." }
      ]
    },
    {
      id: "eng_q3",
      text: "A national renewable energy mega-project is underway. Where do you focus your skills?",
      blendCore: true,
      options: [
        { id: "eng_q3_opt1", text: "Aerodynamic wind turbine rotor blades maximizing energy capture in low-wind conditions.", weights: { "mechanical-engineer": 3, "civil-engineer": 1 }, reason: "Airfoil aerodynamics, rotor blade composite stress, and kinetic power capture is mechanical engineering." },
        { id: "eng_q3_opt2", text: "Deep foundations and structural pylons anchoring offshore turbines in stormy ocean waters.", weights: { "civil-engineer": 3, "mechanical-engineer": 1 }, reason: "Offshore marine geotechnics and underwater foundation anchoring define civil engineering." },
        { id: "eng_q3_opt3", text: "Optimize thermodynamic steam turbines and high-pressure heat exchangers in thermal storage plants.", weights: { "mechanical-engineer": 3, "civil-engineer": 1 }, reason: "Thermodynamic cycles, high-pressure steam turbines, and heat exchangers are mechanical engineering." },
        { id: "eng_q3_opt4", text: "Architectural solar-integrated glass facades transforming city skyscrapers into power generators.", weights: { architect: 3, "civil-engineer": 1 }, reason: "Integrating photovoltaic solar facades into high-rise architectural aesthetics is architecture." },
        { id: "eng_q3_opt5", text: "Automate sensor networks monitoring concrete expansion and power transmission substation health.", weights: { engineer: 3, "mechanical-engineer": 1 }, reason: "Automating industrial telemetry, sensor circuits, and electronic grid controls is engineering." },
        { id: "eng_q3_opt6", text: "Environmental impact assessments ensuring wind farms protect local bird migration routes.", weights: { "environmental-scientist": 3, "civil-engineer": 1 }, reason: "Wildlife migratory impact studies and ecological conservation assessments is environmental science." }
      ]
    },
    {
      id: "eng_q4",
      text: "A next-generation bullet train corridor is under construction. What challenge excites you?",
      blendCore: true,
      options: [
        { id: "eng_q4_opt1", text: "Aerodynamic nose cones reducing high-speed air drag and sonic tunnel booms.", weights: { "mechanical-engineer": 3, "civil-engineer": 1 }, reason: "Aerodynamic profiling, drag coefficient reduction, and acoustic wave control is mechanical engineering." },
        { id: "eng_q4_opt2", text: "Elevated concrete viaducts and precision tunnel boring through mountainous terrain.", weights: { "civil-engineer": 3, "mechanical-engineer": 1 }, reason: "TBM mountain tunneling and long-span elevated concrete railway viaducts is civil engineering." },
        { id: "eng_q4_opt3", text: "Construct earthquake-resistant railway trackbeds with precision ballast and drainage channels.", weights: { "civil-engineer": 3, "mechanical-engineer": 1 }, reason: "High-speed rail track alignment, earthwork stability, and ballast geotechnics is civil engineering." },
        { id: "eng_q4_opt4", text: "Cockpit navigation displays and automated fail-safe braking control computer systems.", weights: { pilot: 3, "mechanical-engineer": 1 }, reason: "High-speed navigation instruments and human-machine cockpit controls represent aviation piloting." },
        { id: "eng_q4_opt5", text: "Automated signaling software synchronizing trains traveling at three hundred kilometers per hour.", weights: { engineer: 3, "civil-engineer": 1 }, reason: "High-speed train control software and automated signal telemetry represents software/systems engineering." },
        { id: "eng_q4_opt6", text: "Emergency rapid response protocols protecting high-speed transport corridors from sabotage.", weights: { "army-officer": 3, "civil-engineer": 1 }, reason: "Critical transport corridor security defense and counter-sabotage readiness is military command." }
      ]
    },
    {
      id: "eng_q5",
      text: "During a natural disaster, critical transportation infrastructure collapses. How do you respond?",
      blendCore: false,
      options: [
        { id: "eng_q5_opt1", text: "Repairing fractured diesel locomotive engines and hydraulic braking lines under time pressure.", weights: { "mechanical-engineer": 3, "civil-engineer": 1 }, reason: "Emergency mechanical troubleshooting of heavy engines and hydraulic brakes is mechanical engineering." },
        { id: "eng_q5_opt2", text: "Constructing emergency temporary steel pontoon bridges across flooded river valleys.", weights: { "civil-engineer": 3, "mechanical-engineer": 1 }, reason: "Rapid deployment of modular pontoon bridges and river crossing structures is civil engineering." },
        { id: "eng_q5_opt3", text: "Coordinating transport flights delivering heavy replacement parts to remote mountain outposts.", weights: { pilot: 3, "supply-chain": 1 }, reason: "Aviation airlift logistics flying vital machinery into isolated mountain terrain is aviation." },
        { id: "eng_q5_opt4", text: "Sourcing replacement structural girders and heavy crane equipment across national suppliers.", weights: { "supply-chain": 3, "civil-engineer": 1 }, reason: "Emergency equipment sourcing, heavy crane dispatch, and procurement is supply chain." },
        { id: "eng_q5_opt5", text: "Restoring municipal water filtration plants to prevent post-flood waterborne epidemics.", weights: { "environmental-scientist": 3, "civil-engineer": 1 }, reason: "Emergency water quality testing and municipal water plant decontamination is environmental science." },
        { id: "eng_q5_opt6", text: "Deploying rapid combat engineer squads to clear landslide debris from vital mountain passes.", weights: { "army-officer": 3, "civil-engineer": 1 }, reason: "Leading tactical military combat engineers to clear vital mountain corridors is defense command." }
      ]
    },
    {
      id: "eng_q6",
      text: "You are invited to lead a visionary smart-infrastructure city project. What do you champion?",
      blendCore: false,
      options: [
        { id: "eng_q6_opt1", text: "District cooling networks using chilled water pipes to air-condition entire neighborhoods efficiently.", weights: { "mechanical-engineer": 3, "civil-engineer": 1 }, reason: "Centralized thermal district cooling piping, pumps, and fluid dynamics is mechanical engineering." },
        { id: "eng_q6_opt2", text: "Underground stormwater retention tunnels preventing urban flooding during cloudburst monsoons.", weights: { "civil-engineer": 3, "mechanical-engineer": 1 }, reason: "Hydraulic retention tunnels and deep stormwater drainage civil networks is civil engineering." },
        { id: "eng_q6_opt3", text: "Biophilic architectural sky-gardens providing shade, clean air, and community recreation.", weights: { architect: 3, "civil-engineer": 1 }, reason: "Urban biophilic sky-gardens, solar shading, and sustainable community aesthetics is architecture." },
        { id: "eng_q6_opt4", text: "Smart urban traffic control algorithms prioritizing electric buses and emergency ambulances.", weights: { engineer: 3, "civil-engineer": 1 }, reason: "Designing intelligent civic algorithms and electronic signal routing networks is systems engineering." },
        { id: "eng_q6_opt5", text: "Automated underground waste transport capsules shooting garbage to recycling centers.", weights: { "supply-chain": 3, "mechanical-engineer": 1 }, reason: "Automated capsule transit networks and municipal resource logistics is supply chain." },
        { id: "eng_q6_opt6", text: "Urban wetlands and mangrove corridors naturally cleansing wastewater before ocean discharge.", weights: { "environmental-scientist": 3, "civil-engineer": 1 }, reason: "Constructed wetlands and biological wastewater bio-remediation is environmental science." }
      ]
    },
    {
      id: "eng_q7",
      text: "Which lifetime engineering achievement would bring you the greatest enduring pride?",
      blendCore: false,
      options: [
        { id: "eng_q7_opt1", text: "Designing world-class automotive or aerospace engines celebrated for efficiency and power.", weights: { "mechanical-engineer": 3, "civil-engineer": 1 }, reason: "Pioneering high-efficiency automotive or aerospace engines is the mechanical engineer's pinnacle." },
        { id: "eng_q7_opt2", text: "Constructing monumental dams, tunnels, and bridges that serve society for a century.", weights: { "civil-engineer": 3, "mechanical-engineer": 1 }, reason: "Building multi-generational civic dams, tunnels, and bridges is the civil engineer's monumental legacy." },
        { id: "eng_q7_opt3", text: "Creating iconic city skylines and award-winning sustainable architectural landmarks.", weights: { architect: 3, "civil-engineer": 1 }, reason: "Creating celebrated sustainable architectural skyline landmarks is the architect's legacy." },
        { id: "eng_q7_opt4", text: "Piloting cutting-edge experimental aircraft pushing the boundaries of aviation speed.", weights: { pilot: 3, "mechanical-engineer": 1 }, reason: "Test-piloting groundbreaking experimental high-speed aircraft is the aviator's milestone." },
        { id: "eng_q7_opt5", text: "Building national smart grid infrastructure that eliminates carbon emissions permanently.", weights: { engineer: 3, "mechanical-engineer": 1 }, reason: "Modernizing national smart grid electrical/software infrastructure is systems engineering." },
        { id: "eng_q7_opt6", text: "Leading military defense modernization programs that safeguard national borders.", weights: { "army-officer": 3, "civil-engineer": 1 }, reason: "Leading strategic military defense technology and safeguarding sovereign borders is defense leadership." }
      ]
    }
  ]
};
saveBank("engineering", engineering);

// ============================================================================
// 5. Science & Environment (science)
// ============================================================================
const science = {
  domain: "science",
  questions: [
    {
      id: "sci_q1",
      text: "A mysterious plant disease is destroying local crop yields. What is your scientific contribution?",
      blendCore: true,
      options: [
        { id: "sci_q1_opt1", text: "Isolate crop DNA and culture disease-resistant crop seed strains inside the laboratory.", weights: { biotechnologist: 3, "environmental-scientist": 1 }, reason: "Isolating plant genetic sequences and culturing resistant cultivars is biotechnology." },
        { id: "sci_q1_opt2", text: "Collect soil and river samples to track agricultural fertilizer and runoff pollution.", weights: { "environmental-scientist": 3, biotechnologist: 1 }, reason: "Analyzing soil chemical composition and agricultural runoff toxicity is environmental science." },
        { id: "sci_q1_opt3", text: "Formulate non-toxic organic antifungal sprays that protect crops without killing pollinators.", weights: { pharmacist: 3, biotechnologist: 1 }, reason: "Formulating bio-chemical organic antifungal compounds is pharmaceutical chemistry." },
        { id: "sci_q1_opt4", text: "Study soil microbial ecosystems and synthesize bio-fertilizers that strengthen root immunity.", weights: { biotechnologist: 3, "environmental-scientist": 1 }, reason: "Developing agricultural microbial bio-inoculants and synthetic biology is biotechnology." },
        { id: "sci_q1_opt5", text: "Analyze satellite crop imagery and climate temperature charts to predict disease spread.", weights: { "data-scientist": 3, "environmental-scientist": 1 }, reason: "Satellite remote sensing imagery analysis and statistical disease spread modeling is data science." },
        { id: "sci_q1_opt6", text: "Design clean rainwater harvesting irrigation channels that prevent waterlogging in fields.", weights: { "civil-engineer": 3, "environmental-scientist": 1 }, reason: "Designing rainwater harvesting retention structures and farm irrigation channels is civil engineering." }
      ]
    },
    {
      id: "sci_q2",
      text: "You are given access to a modern scientific research lab. What investigation excites you?",
      blendCore: true,
      options: [
        { id: "sci_q2_opt1", text: "Engineer beneficial microbes that decompose plastic waste into harmless organic compounds.", weights: { biotechnologist: 3, "environmental-scientist": 1 }, reason: "Genetically engineering microbial enzymes for enzymatic bioremediation is biotechnology." },
        { id: "sci_q2_opt2", text: "Study migratory bird flight paths and forest cover changes across river basins.", weights: { "environmental-scientist": 3, biotechnologist: 1 }, reason: "Investigating wildlife migration corridors and river watershed ecology is environmental science." },
        { id: "sci_q2_opt3", text: "Track atmospheric carbon capture rates across protected tropical rainforest reserves.", weights: { "environmental-scientist": 3, biotechnologist: 1 }, reason: "Quantifying terrestrial carbon sequestration fluxes in rainforest biomes is environmental science." },
        { id: "sci_q2_opt4", text: "Synthesize stable peptide compounds that can preserve temperature-sensitive vaccine vials.", weights: { pharmacist: 3, biotechnologist: 1 }, reason: "Peptide synthesis and pharmaceutical vaccine stabilization chemistry is pharmaceutical science." },
        { id: "sci_q2_opt5", text: "Evaluate nutritional vitamin retention in bio-fortified staple rice and millets.", weights: { nutritionist: 3, biotechnologist: 1 }, reason: "Assessing bioavailable micronutrient retention in fortified grains is nutritional science." },
        { id: "sci_q2_opt6", text: "Model global ocean temperature patterns and carbon absorption rates using supercomputers.", weights: { "data-scientist": 3, "environmental-scientist": 1 }, reason: "Running computational hydrodynamic ocean climate models on supercomputers is data science." }
      ]
    },
    {
      id: "sci_q3",
      text: "A pristine biodiversity forest is threatened by illegal mining activity. Where do you act?",
      blendCore: true,
      options: [
        { id: "sci_q3_opt1", text: "Catalogue endangered medicinal plant species and preserve their germplasm in seed vaults.", weights: { biotechnologist: 3, "environmental-scientist": 1 }, reason: "Cryogenic seed banking and preserving plant genetic diversity is biotechnology." },
        { id: "sci_q3_opt2", text: "Map deforestation boundaries and measure soil heavy-metal toxicity levels scientifically.", weights: { "environmental-scientist": 3, biotechnologist: 1 }, reason: "Heavy metal soil assays and geographic deforestation boundary mapping is environmental science." },
        { id: "sci_q3_opt3", text: "Develop rapid DNA barcode assays to identify rare protected flora and fauna samples.", weights: { biotechnologist: 3, "environmental-scientist": 1 }, reason: "DNA barcoding technology for rapid ecological species verification is biotechnology." },
        { id: "sci_q3_opt4", text: "Design sustainable reforestation corridors restoring native trees and soil nitrogen balance.", weights: { "civil-engineer": 3, "environmental-scientist": 1 }, reason: "Engineering landscape restoration grading and reforestation earthworks is civil engineering." },
        { id: "sci_q3_opt5", text: "Publish peer-reviewed scientific studies documenting the forest's irreplaceable biodiversity.", weights: { teacher: 3, "environmental-scientist": 1 }, reason: "Authoring peer-reviewed educational literature and scientific dissemination is science education." },
        { id: "sci_q3_opt6", text: "Empower indigenous tribal communities with scientific legal evidence to defend their land.", weights: { "social-worker": 3, "environmental-scientist": 1 }, reason: "Translating ecological findings into community advocacy and tribal empowerment is social work." }
      ]
    },
    {
      id: "sci_q4",
      text: "An urban drinking water reservoir shows sudden chemical contamination. What is your priority?",
      blendCore: true,
      options: [
        { id: "sci_q4_opt1", text: "Deploy genetic bio-sensors that glow brightly when detecting pathogenic bacteria in tap water.", weights: { biotechnologist: 3, "environmental-scientist": 1 }, reason: "Designing synthetic bio-luminescent cellular sensors for pathogen detection is biotechnology." },
        { id: "sci_q4_opt2", text: "Identify industrial chemical discharge sources contaminating groundwater aquifers across the city.", weights: { "environmental-scientist": 3, biotechnologist: 1 }, reason: "Tracing industrial aquifer contamination sources and hydrogeological mapping is environmental science." },
        { id: "sci_q4_opt3", text: "Assess urban water shed pollution runoff and restore natural reed bed filtration wetlands.", weights: { "environmental-scientist": 3, biotechnologist: 1 }, reason: "Restoring ecological bio-swales and reed bed wetland filtration is environmental science." },
        { id: "sci_q4_opt4", text: "Formulate rapid water purification tablets and distribute them to vulnerable families.", weights: { pharmacist: 3, "environmental-scientist": 1 }, reason: "Formulating emergency chemical water disinfection tablets safely is pharmaceutical science." },
        { id: "sci_q4_opt5", text: "Establish emergency medical triage clinics treating dehydration and cholera patients.", weights: { doctor: 3, "environmental-scientist": 1 }, reason: "Clinical medical triage and treatment of acute waterborne diarrheal illness is medicine." },
        { id: "sci_q4_opt6", text: "Create interactive maps showing contamination heatmaps to warn neighborhood residents.", weights: { "data-scientist": 3, "environmental-scientist": 1 }, reason: "Geospatial data mapping and interactive contamination visualization is data science." }
      ]
    },
    {
      id: "sci_q5",
      text: "A global foundation offers funding for climate mitigation breakthroughs. What do you propose?",
      blendCore: false,
      options: [
        { id: "sci_q5_opt1", text: "Develop fast-growing gene-edited algae that capture industrial carbon emissions twenty times faster.", weights: { biotechnologist: 3, "environmental-scientist": 1 }, reason: "Gene editing algae strains to amplify photosynthetic carbon capture is biotechnology." },
        { id: "sci_q5_opt2", text: "Restore coastal mangrove wetlands that absorb storm surges and protect marine nurseries.", weights: { "environmental-scientist": 3, biotechnologist: 1 }, reason: "Restoring coastal blue carbon mangrove wetlands and marine ecology is environmental science." },
        { id: "sci_q5_opt3", text: "Design community nutrition programs fighting climate-induced child malnutrition.", weights: { nutritionist: 3, biotechnologist: 1 }, reason: "Public community dietary interventions addressing child malnutrition is nutritional science." },
        { id: "sci_q5_opt4", text: "Build massive seawalls and coastal drainage channels shielding vulnerable seaside towns.", weights: { "civil-engineer": 3, "environmental-scientist": 1 }, reason: "Constructing maritime seawalls, breakwaters, and flood channels is civil engineering." },
        { id: "sci_q5_opt5", text: "Create open-access climate simulation models predicting monsoons for smallholder farmers.", weights: { "data-scientist": 3, "environmental-scientist": 1 }, reason: "Developing open-access statistical meteorological forecasting algorithms is data science." },
        { id: "sci_q5_opt6", text: "Launch school environmental science clubs educating the next generation of climate defenders.", weights: { teacher: 3, "environmental-scientist": 1 }, reason: "Inspiring youth through hands-on ecological school curricula is environmental education." }
      ]
    },
    {
      id: "sci_q6",
      text: "Which scientific investigation methodology resonates most deeply with your curiosity?",
      blendCore: false,
      options: [
        { id: "sci_q6_opt1", text: "Growing artificial human skin tissue in petri dishes to test burn treatments ethically.", weights: { biotechnologist: 3, pharmacist: 1 }, reason: "Tissue engineering, stem cell culture, and regenerative bio-scaffolds define biotechnology." },
        { id: "sci_q6_opt2", text: "Measuring melting Himalayan glacier rates to forecast future freshwater river shortages.", weights: { "environmental-scientist": 3, biotechnologist: 1 }, reason: "Glaciology research and high-altitude watershed hydrological monitoring is environmental science." },
        { id: "sci_q6_opt3", text: "Formulating delayed-release oral insulin capsules eliminating painful daily injections.", weights: { pharmacist: 3, biotechnologist: 1 }, reason: "Formulating delayed-release oral drug delivery capsules is pharmaceutical science." },
        { id: "sci_q6_opt4", text: "Studying anti-inflammatory diets that prevent chronic heart disease in working populations.", weights: { nutritionist: 3, doctor: 1 }, reason: "Investigating dietary anti-inflammatory biochemical pathways is nutritional science." },
        { id: "sci_q6_opt5", text: "Developing machine learning algorithms that detect microscopic cancer cells in blood tests.", weights: { "data-scientist": 3, biotechnologist: 1 }, reason: "Developing computer vision AI for microscopic hematological cancer detection is data science." },
        { id: "sci_q6_opt6", text: "Mobilizing youth volunteer cleanups that remove hundreds of tons of river trash.", weights: { "social-worker": 3, "environmental-scientist": 1 }, reason: "Mobilizing community civic volunteer labor for environmental cleanup is social work." }
      ]
    },
    {
      id: "sci_q7",
      text: "Which lifetime achievement in science and discovery would bring you ultimate fulfillment?",
      blendCore: false,
      options: [
        { id: "sci_q7_opt1", text: "Inventing a breakthrough biotechnology therapy that eradicates a hereditary genetic disorder.", weights: { biotechnologist: 3, "environmental-scientist": 1 }, reason: "Developing transformative curative genomic therapies is the biotechnologist's pinnacle." },
        { id: "sci_q7_opt2", text: "Leading the global ecological restoration of a damaged river ecosystem back to life.", weights: { "environmental-scientist": 3, biotechnologist: 1 }, reason: "Reviving entire degraded river basin ecosystems to health is the environmental scientist's legacy." },
        { id: "sci_q7_opt3", text: "Discovering a life-saving antibiotic that saves millions from drug-resistant infections.", weights: { pharmacist: 3, biotechnologist: 1 }, reason: "Discovering novel anti-microbial pharmacological agents is pharmaceutical discovery." },
        { id: "sci_q7_opt4", text: "Eradicating severe childhood malnutrition across an entire state through smart nutrition.", weights: { nutritionist: 3, biotechnologist: 1 }, reason: "Eliminating statewide malnutrition via scientific dietary policy is nutritional science." },
        { id: "sci_q7_opt5", text: "Building the world's most accurate open-source climate and weather prediction model.", weights: { "data-scientist": 3, "environmental-scientist": 1 }, reason: "Authoring global planetary climate simulation codebases is data science." },
        { id: "sci_q7_opt6", text: "Inspiring tens of thousands of school students to pursue careers in scientific discovery.", weights: { teacher: 3, "environmental-scientist": 1 }, reason: "Nurturing generations of future scientific researchers is the science educator's legacy." }
      ]
    }
  ]
};
saveBank("science", science);

console.log("Updated engineering and science banks.");
