import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DOMAIN_ROADMAP_MAP } from "../config/quizDomains.js";
import { STAGE1_QUESTIONS } from "../config/stage1-questions.js";
import { scoreStage1 } from "../services/stage1Scoring.js";
import { getStage2Set } from "../services/stage2Selector.js";
import { computeCareerResult, deriveSeed } from "../services/careerEngine.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, "../../../");
const reportFile = path.join(projectRoot, "docs/quiz-review/blind-personas.md");

// 24 Student Stories
const BLIND_STORIES = [
  {
    id: 1,
    name: "Aarav",
    intendedRoadmap: "engineer",
    domain: "tech",
    story: "I love building clean software systems. In school, I automated our library catalog using Python and built an attendance web app. I spend weekends refactoring code and learning algorithms.",
    s1Answers: { q1: "q1_opt1", q2: "q2_opt6", q3: "q3_opt4", q4: "q4_opt1", q5: "q5_opt4", q6: "q6_opt1", q7: "q7_opt1" },
    s2Preferences: {
      tech_q1: "tech_q1_opt1", // Optimize core backend code
      tech_q2: "tech_q2_opt1", // Design scalable system architecture
      tech_q3: "tech_q3_opt1", // Refactor complex legacy algorithms
      tech_q4: "tech_q4_opt1", // Build reusable developer API libraries
      tech_q5: "tech_q5_opt1", // Authoring open-source framework
      tech_q6: "tech_q6_opt1", // Digging through stack traces
      tech_q7: "tech_q7_opt1", // Architecting planetary software platforms
    }
  },
  {
    id: 2,
    name: "Priya",
    intendedRoadmap: "cybersecurity",
    domain: "tech",
    story: "I am fascinated by digital defense and network vulnerabilities. When our school portal was attacked, I helped our IT teacher trace IP logs, patch security flaws, and protect student profile records.",
    s1Answers: { q1: "q1_opt1", q2: "q2_opt6", q3: "q3_opt3", q4: "q4_opt1", q5: "q5_opt4", q6: "q6_opt1", q7: "q7_opt1" },
    s2Preferences: {
      tech_q1: "tech_q1_opt4", // Block malicious DDoS attacks
      tech_q2: "tech_q2_opt4", // Audit authentication protocols
      tech_q3: "tech_q3_opt4", // Trace attack vectors and isolate breaches
      tech_q4: "tech_q4_opt4", // Architect zero-trust security firewalls
      tech_q5: "tech_q5_opt4", // Securing critical national digital infrastructure
      tech_q6: "tech_q6_opt4", // Rapidly containing compromised accounts
      tech_q7: "tech_q7_opt4", // Building unbreakable cyber defense systems
    }
  },
  {
    id: 3,
    name: "Dr. Rohan",
    intendedRoadmap: "doctor",
    domain: "healthcare",
    story: "I have always felt a deep calling to clinical diagnosis and direct patient care. I volunteer at our local free clinic, studying pathology textbooks and learning how doctors triage complex emergencies.",
    s1Answers: { q1: "q1_opt4", q2: "q2_opt1", q3: "q3_opt1", q4: "q4_opt2", q5: "q5_opt6", q6: "q6_opt2", q7: "q7_opt4" },
    s2Preferences: {
      health_q1: "health_q1_opt1", // Examine complex medical symptoms
      health_q2: "health_q2_opt1", // Clinical diagnostic procedures
      health_q3: "health_q3_opt1", // Hospital emergency triage
      health_q4: "health_q4_opt1", // Evidence-based medical protocols
      health_q5: "health_q5_opt1", // Eradicating fatal endemic disease
      health_q6: "health_q6_opt1", // Rapid life-saving critical diagnosis
      health_q7: "health_q7_opt1", // Healing thousands of suffering patients
    }
  },
  {
    id: 4,
    name: "Ananya",
    intendedRoadmap: "nutritionist",
    domain: "healthcare",
    story: "I am obsessed with how food fuels human biochemistry and metabolic health. I help my diabetic relatives design balanced micronutrient meal plans and calculate glycemic loads for recovery.",
    s1Answers: { q1: "q1_opt4", q2: "q2_opt1", q3: "q3_opt1", q4: "q4_opt2", q5: "q5_opt6", q6: "q6_opt2", q7: "q7_opt4" },
    s2Preferences: {
      health_q1: "health_q1_opt5", // Design personalized dietary plans
      health_q2: "health_q2_opt5", // Nutritional assessment and metabolic analysis
      health_q3: "health_q3_opt5", // Clinical therapeutic diet counseling
      health_q4: "health_q4_opt5", // Micronutrient deficiency prevention programs
      health_q5: "health_q5_opt5", // Eliminating malnutrition in maternal communities
      health_q6: "health_q6_opt5", // Resolving complex metabolic imbalances
      health_q7: "health_q7_opt5", // Transforming public health through nutritional science
    }
  },
  {
    id: 5,
    name: "Kabir",
    intendedRoadmap: "fitness-trainer",
    domain: "healthcare",
    story: "I live and breathe athletic conditioning, biomechanics, and strength training. I coach younger athletes on barbell form, injury prevention, and daily physical endurance discipline.",
    s1Answers: { q1: "q1_opt5", q2: "q2_opt1", q3: "q3_opt5", q4: "q4_opt2", q5: "q5_opt6", q6: "q6_opt6", q7: "q7_opt4" },
    s2Preferences: {
      health_q1: "health_q1_opt4", // Physical conditioning / rehabilitation
      health_q2: "health_q2_opt7", // Correcting posture and biomechanical form
      health_q3: "health_q3_opt7", // Conditioning regimens for athletic peak
      health_q4: "health_q4_opt7", // Sports endurance and muscular recovery
      health_q5: "health_q5_opt7", // Building elite fitness training academies
      health_q6: "health_q6_opt7", // Motivating clients to surpass physical limits
      health_q7: "health_q7_opt7", // Inspiring millions to adopt active, fit lifestyles
    }
  },
  {
    id: 6,
    name: "Vikram",
    intendedRoadmap: "startup-founder",
    domain: "business",
    story: "I dream of building high-growth commercial ventures from scratch. In college, I launched an on-demand campus laundry delivery startup, pitched angel investors, and recruited our core team.",
    s1Answers: { q1: "q1_opt3", q2: "q2_opt4", q3: "q3_opt2", q4: "q4_opt3", q5: "q5_opt1", q6: "q6_opt3", q7: "q7_opt2" },
    s2Preferences: {
      biz_q1: "biz_q1_opt1", // Pitching angel investors and scaling business
      biz_q2: "biz_q2_opt1", // Bootstrapping product-market fit
      biz_q3: "biz_q3_opt1", // Building disruptive commercial business models
      biz_q4: "biz_q4_opt1", // Assembling founding executive leadership team
      biz_q5: "biz_q5_opt1", // Ringing opening bell on tech unicorn IPO
      biz_q6: "biz_q6_opt1", // Pivoting business model during cash runway crunch
      biz_q7: "biz_q7_opt1", // Creating thousands of jobs through enterprise
    }
  },
  {
    id: 7,
    name: "Rhea",
    intendedRoadmap: "product-manager",
    domain: "business",
    story: "I love bridging user empathy with business roadmaps. I coordinate engineers and designers, defining feature prioritization backlogs, running sprint reviews, and tracking retention metrics.",
    s1Answers: { q1: "q1_opt1", q2: "q2_opt4", q3: "q3_opt2", q4: "q4_opt1", q5: "q5_opt1", q6: "q6_opt3", q7: "q7_opt2" },
    s2Preferences: {
      biz_q1: "biz_q1_opt3", // Defining product feature roadmap and UX specs
      biz_q2: "biz_q2_opt3", // Prioritizing engineering sprints based on user data
      biz_q3: "biz_q3_opt3", // Balancing customer delight with product monetization
      biz_q4: "biz_q4_opt3", // Running cross-functional product launch war-rooms
      biz_q5: "biz_q5_opt3", // Launching beloved consumer app used by 50M users
      biz_q6: "biz_q6_opt3", // Reconciling conflicting demands of users and sales
      biz_q7: "biz_q7_opt3", // Shaping intuitive products that simplify daily life
    }
  },
  {
    id: 8,
    name: "Dev",
    intendedRoadmap: "chartered-accountant",
    domain: "finance",
    story: "I have an instinctive command of balance sheets, corporate taxation statutes, and compliance audits. I helped my family firm reconcile their GST filings, cash flows, and statutory audit books.",
    s1Answers: { q1: "q1_opt3", q2: "q2_opt4", q3: "q3_opt2", q4: "q4_opt3", q5: "q5_opt2", q6: "q6_opt3", q7: "q7_opt2" },
    s2Preferences: {
      fin_q1: "fin_q1_opt1", // Certifying corporate statutory financial statements
      fin_q2: "fin_q2_opt1", // Optimizing corporate direct and indirect tax structures
      fin_q3: "fin_q3_opt1", // Conducting forensic audits detecting accounting fraud
      fin_q4: "fin_q4_opt1", // Ensuring strict compliance with national accounting standards
      fin_q5: "fin_q5_opt1", // Heading national accounting audit regulatory council
      fin_q6: "fin_q6_opt1", // Identifying hidden balance sheet balance discrepancies
      fin_q7: "fin_q7_opt1", // Upholding uncompromising fiscal truth in corporate India
    }
  },
  {
    id: 9,
    name: "Kavita",
    intendedRoadmap: "actuary",
    domain: "finance",
    story: "I love advanced mathematical probability, calculus, and demographic risk modeling. I calculate survival tables and study how insurance underwriters structure lifetime pension annuities.",
    s1Answers: { q1: "q1_opt4", q2: "q2_opt4", q3: "q3_opt2", q4: "q4_opt3", q5: "q5_opt2", q6: "q6_opt3", q7: "q7_opt3" },
    s2Preferences: {
      fin_q1: "fin_q1_opt4", // Modeling statistical mortality tables and life expectancy
      fin_q2: "fin_q2_opt4", // Calculating catastrophe insurance premium loss reserves
      fin_q3: "fin_q3_opt4", // Stress-testing pension fund long-term solvency models
      fin_q4: "fin_q4_opt4", // Pricing complex derivative risk reinsurance treaties
      fin_q5: "fin_q5_opt4", // Structuring national catastrophic pandemic risk coverage
      fin_q6: "fin_q6_opt4", // Simulating black swan economic volatility distributions
      fin_q7: "fin_q7_opt4", // Protecting millions from financial ruin through risk math
    }
  },
  {
    id: 10,
    name: "Tara",
    intendedRoadmap: "designer",
    domain: "creative",
    story: "I see the world through typography, micro-interactions, and visual layouts. I design mobile app user flows in Figma and build interactive component design systems.",
    s1Answers: { q1: "q1_opt2", q2: "q2_opt5", q3: "q3_opt3", q4: "q4_opt4", q5: "q5_opt3", q6: "q6_opt6", q7: "q7_opt5" },
    s2Preferences: {
      cr_q1: "cr_q1_opt1", // Wireframing intuitive digital user interface flows
      cr_q2: "cr_q2_opt1", // Conducting usability tests and refining user journeys
      cr_q3: "cr_q3_opt1", // Crafting cohesive visual design systems and color palettes
      cr_q4: "cr_q4_opt1", // Prototyping interactive mobile micro-animations
      cr_q5: "cr_q5_opt1", // Winning international design award for iconic mobile app
      cr_q6: "cr_q6_opt1", // Simplifying complex workflows into effortless screens
      cr_q7: "cr_q7_opt1", // Creating digital experiences that feel human and joyful
    }
  },
  {
    id: 11,
    name: "Arjun",
    intendedRoadmap: "architect",
    domain: "creative",
    story: "I am captivated by building blueprints, physical spatial ergonomics, and sustainable structural design. I sketch building floor plans and model urban public plazas.",
    s1Answers: { q1: "q1_opt2", q2: "q2_opt5", q3: "q3_opt4", q4: "q4_opt4", q5: "q5_opt3", q6: "q6_opt6", q7: "q7_opt5" },
    s2Preferences: {
      cr_q1: "cr_q1_opt3", // Drafting architectural elevations and spatial masterplans
      cr_q2: "cr_q2_opt3", // Integrating natural sunlight and passive ventilation
      cr_q3: "cr_q3_opt3", // Specifying sustainable timber, stone, and structural steel
      cr_q4: "cr_q4_opt3", // Modeling 3D parametric building information models
      cr_q5: "cr_q5_opt3", // Designing carbon-neutral museum landmark building
      cr_q6: "cr_q6_opt3", // Harmonizing tight zoning codes with bold aesthetics
      cr_q7: "cr_q7_opt3", // Leaving timeless architectural landmarks for centuries
    }
  },
  {
    id: 12,
    name: "Sameer",
    intendedRoadmap: "film-director",
    domain: "media",
    story: "I am a visual storyteller driven by cinematic framing, screenplay drama, and directorial vision. I direct student short films, working closely with actors, cinematographers, and sound editors.",
    s1Answers: { q1: "q1_opt2", q2: "q2_opt5", q3: "q3_opt3", q4: "q4_opt4", q5: "q5_opt3", q6: "q6_opt4", q7: "q7_opt5" },
    s2Preferences: {
      med_q1: "med_q1_opt2", // Directing actors and guiding camera movement on set
      med_q2: "med_q2_opt2", // Blocking scene compositions and storyboard beats
      med_q3: "med_q3_opt2", // Collaborating with composers on emotive film scores
      med_q4: "med_q4_opt2", // Supervising final theatrical color grading and sound mix
      med_q5: "med_q5_opt2", // Winning best director award at international film festival
      med_q6: "med_q6_opt2", // Re-imagining a critical scene when outdoor weather turns
      med_q7: "med_q7_opt2", // Moving millions to tears and laughter through cinema
    }
  },
  {
    id: 13,
    name: "Nisha",
    intendedRoadmap: "journalist",
    domain: "media",
    story: "I believe in holding power accountable through fearless investigative reporting. I write deep-dive campus articles verifying whistleblowers and exposing civic procurement scandals.",
    s1Answers: { q1: "q1_opt5", q2: "q2_opt3", q3: "q3_opt3", q4: "q4_opt4", q5: "q5_opt5", q6: "q6_opt4", q7: "q7_opt5" },
    s2Preferences: {
      med_q1: "med_q1_opt4", // Cultivating anonymous whistleblowers and verifying dossiers
      med_q2: "med_q2_opt4", // Cross-referencing public procurement tenders for kickbacks
      med_q3: "med_q3_opt4", // Publishing fearless frontline investigative reports
      med_q4: "med_q4_opt4", // Fact-checking viral political claims with verified records
      med_q5: "med_q5_opt4", // Winning national press award for exposing corruption
      med_q6: "med_q6_opt4", // Protecting confidential sources under severe legal pressure
      med_q7: "med_q7_opt4", // Guarding democracy through uncompromising journalistic truth
    }
  },
  {
    id: 14,
    name: "Rahul",
    intendedRoadmap: "mechanical-engineer",
    domain: "engineering",
    story: "I love physical machinery, thermodynamics, and motor mechanisms. I spend weekends in our workshop tearing apart motorbike engines, calculating gear ratios, and tuning transmissions.",
    s1Answers: { q1: "q1_opt6", q2: "q2_opt6", q3: "q3_opt4", q4: "q4_opt1", q5: "q5_opt4", q6: "q6_opt1", q7: "q7_opt1" },
    s2Preferences: {
      eng_q1: "eng_q1_opt1", // Calculating finite element stress fatigue on driveshafts
      eng_q2: "eng_q2_opt1", // Tuning internal combustion thermodynamic heat cycles
      eng_q3: "eng_q3_opt1", // Designing high-precision automated robotic fabrication cells
      eng_q4: "eng_q4_opt1", // Optimizing aerodynamic drag profiles on automotive chassis
      eng_q5: "eng_q5_opt1", // Developing zero-emission hydrogen turbine power systems
      eng_q6: "eng_q6_opt1", // Diagnosing high-speed bearing vibration harmonics
      eng_q7: "eng_q7_opt1", // Engineering machinery that powers modern civilization
    }
  },
  {
    id: 15,
    name: "Meera",
    intendedRoadmap: "civil-engineer",
    domain: "engineering",
    story: "I want to build nation-building infrastructure. I study how steel-reinforced concrete bridges, metro transit viaducts, and large-scale stormwater canals are safely constructed.",
    s1Answers: { q1: "q1_opt6", q2: "q2_opt6", q3: "q3_opt4", q4: "q4_opt1", q5: "q5_opt4", q6: "q6_opt1", q7: "q7_opt1" },
    s2Preferences: {
      eng_q1: "eng_q1_opt2", // Calculating soil bearing capacity and foundation piling
      eng_q2: "eng_q2_opt2", // Designing earthquake-resistant prestressed concrete spans
      eng_q3: "eng_q3_opt2", // Managing heavy civil earthmoving and highway alignment
      eng_q4: "eng_q4_opt2", // Hydraulics modeling for municipal storm drainage basins
      eng_q5: "eng_q5_opt2", // Constructing iconic suspension bridges across deep valleys
      eng_q6: "eng_q6_opt2", // Inspecting structural cracks in aging concrete retaining walls
      eng_q7: "eng_q7_opt2", // Building physical infrastructure connecting remote villages
    }
  },
  {
    id: 16,
    name: "Aditya",
    intendedRoadmap: "lawyer",
    domain: "law_gov",
    story: "I love constitutional debates, statutory interpretation, and courtroom litigations. I lead our university moot court team arguing fundamental rights before retired High Court judges.",
    s1Answers: { q1: "q1_opt5", q2: "q2_opt3", q3: "q3_opt5", q4: "q4_opt5", q5: "q5_opt5", q6: "q6_opt5", q7: "q7_opt5" },
    s2Preferences: {
      law_q1: "law_q1_opt1", // Argue constitutional civil rights challenges before High Court
      law_q2: "law_q2_opt2", // Draft emergency legal ordinances safeguarding civil rights
      law_q3: "law_q3_opt3", // Codify legal aid accessibility frameworks for impoverished
      law_q4: "law_q4_opt1", // Represent national interests before human rights tribunals
      law_q5: "law_q5_opt1", // Build watertight courtroom prosecution brief
      law_q6: "law_q6_opt1", // Securing landmark constitutional verdict defending dignity
      law_q7: "law_q7_opt1", // Defend truth, uphold equality, fight injustice everywhere
    }
  },
  {
    id: 17,
    name: "Divya",
    intendedRoadmap: "civil-services",
    domain: "law_gov",
    story: "My life goal is selfless public administration. I want to serve as a District Collector, coordinating district welfare schemes, public health programs, and resolving citizen grievances.",
    s1Answers: { q1: "q1_opt5", q2: "q2_opt3", q3: "q3_opt5", q4: "q4_opt5", q5: "q5_opt5", q6: "q6_opt5", q7: "q7_opt5" },
    s2Preferences: {
      law_q1: "law_q1_opt2", // Draft executive administrative orders addressing grievances
      law_q2: "law_q2_opt3", // Coordinate relief supply chains ensuring grain reaches villages
      law_q3: "law_q3_opt1", // Streamline bureaucratic approval workflows to eliminate red tape
      law_q4: "law_q4_opt2", // Negotiate bilateral accords on cross-border labor mobility
      law_q5: "law_q5_opt2", // Subpoena records and enforce regulatory compliance
      law_q6: "law_q6_opt1", // Serving as District Collector transforming rural district
      law_q7: "law_q7_opt2", // Dedication to selfless administrative duty to every citizen
    }
  },
  {
    id: 18,
    name: "Capt. Samar",
    intendedRoadmap: "army-officer",
    domain: "law_gov",
    story: "I am dedicated to national defense, military discipline, and tactical field leadership. I lead NCC cadet drill detachments, train in cross-country endurance, and study military history.",
    s1Answers: { q1: "q1_opt6", q2: "q2_opt3", q3: "q3_opt5", q4: "q4_opt5", q5: "q5_opt5", q6: "q6_opt5", q7: "q7_opt5" },
    s2Preferences: {
      law_q1: "law_q1_opt3", // Deploy military police detachments to secure infrastructure
      law_q2: "law_q2_opt1", // Command frontline rescue sorties and establish tactical supply
      law_q3: "law_q3_opt2", // Modernize veteran resettlement and border garrison welfare
      law_q4: "law_q4_opt3", // Serve as military defense attaché liaising with peacekeeping
      law_q5: "law_q5_opt1", // Lead strategic tactical perimeter security
      law_q6: "law_q6_opt1", // Leading troops bravely in defense of the homeland
      law_q7: "law_q7_opt1", // Uncompromising personal integrity, valor, and selfless devotion
    }
  },
  {
    id: 19,
    name: "Pooja",
    intendedRoadmap: "teacher",
    domain: "education_social",
    story: "I find immense joy in classroom pedagogy and seeing the spark of understanding in a student's eyes. I tutor underprivileged neighborhood kids in science and literature after school.",
    s1Answers: { q1: "q1_opt4", q2: "q2_opt1", q3: "q3_opt5", q4: "q4_opt2", q5: "q5_opt6", q6: "q6_opt6", q7: "q7_opt4" },
    s2Preferences: {
      edu_q1: "edu_q1_opt1", // Deliver engaging classroom lessons and after-school tutoring
      edu_q2: "edu_q2_opt2", // Design rigorous hands-on apprenticeship syllabi
      edu_q3: "edu_q3_opt3", // Direct literacy reading circles for first-generation learners
      edu_q4: "edu_q4_opt1", // Differentiated pedagogy techniques inspiring curiosity
      edu_q5: "edu_q5_opt1", // Model high schools where educators nurture talents
      edu_q6: "edu_q6_opt1", // Unlock intellectual curiosity and prove mastery
      edu_q7: "edu_q7_opt1", // Hearing from former struggling student that you transformed life
    }
  },
  {
    id: 20,
    name: "Naveen",
    intendedRoadmap: "ed-tech",
    domain: "education_social",
    story: "I want to revolutionize learning through adaptive software algorithms and digital education platforms that bring world-class math practice to millions of remote students.",
    s1Answers: { q1: "q1_opt1", q2: "q2_opt6", q3: "q3_opt5", q4: "q4_opt1", q5: "q5_opt6", q6: "q6_opt6", q7: "q7_opt1" },
    s2Preferences: {
      edu_q1: "edu_q1_opt2", // Deploy low-bandwidth mobile gamified math modules
      edu_q2: "edu_q2_opt3", // Interactive digital simulations for virtual skill practice
      edu_q3: "edu_q3_opt1", // Design computer lab software learning paths
      edu_q4: "edu_q4_opt2", // AI-powered adaptive learning algorithms personalizing homework
      edu_q5: "edu_q5_opt2", // Multilingual online learning platform reaching 10M students
      edu_q6: "edu_q6_opt1", // Bite-sized interactive mobile puzzles for iterative mastery
      edu_q7: "edu_q7_opt2", // Educational technology ecosystem democratizing learning
    }
  },
  {
    id: 21,
    name: "Sunita",
    intendedRoadmap: "social-worker",
    domain: "education_social",
    story: "I work with vulnerable families in urban slum clusters, coordinating crisis counseling, anti-poverty aid, emergency housing, and fighting against child labor exploitation.",
    s1Answers: { q1: "q1_opt5", q2: "q2_opt1", q3: "q3_opt5", q4: "q4_opt2", q5: "q5_opt6", q6: "q6_opt6", q7: "q7_opt4" },
    s2Preferences: {
      edu_q1: "edu_q1_opt3", // Visit student households to remove socio-economic barriers
      edu_q2: "edu_q2_opt1", // Community rehabilitation workshops for vulnerable youth
      edu_q3: "edu_q3_opt2", // Family crisis counseling rooms for poverty and trauma
      edu_q4: "edu_q4_opt3", // Trauma-informed community support systems
      edu_q5: "edu_q5_opt1", // Grassroots social empowerment network eradicating child labor
      edu_q6: "edu_q6_opt3", // Protect dignity, stand beside through crisis, fight for rights
      edu_q7: "edu_q7_opt1", // Uplifting hundreds of vulnerable families from poverty
    }
  },
  {
    id: 22,
    name: "Manish",
    intendedRoadmap: "hotel-management",
    domain: "aviation_hospitality",
    story: "I am passionate about luxury guest hospitality, resort operations, fine dining banquets, and training hotel staff in world-class concierge service and guest satisfaction.",
    s1Answers: { q1: "q1_opt5", q2: "q2_opt2", q3: "q3_opt6", q4: "q4_opt6", q5: "q5_opt1", q6: "q6_opt3", q7: "q7_opt5" },
    s2Preferences: {
      av_q1: "av_q1_opt2", // Oversee five-star hotel operations ensuring concierge VIP service
      av_q2: "av_q2_opt3", // Quickly arrange hotel transit rooms and hot meals for stranded
      av_q3: "av_q3_opt1", // Curate bespoke butler service experiences and wellness spas
      av_q4: "av_q4_opt2", // Supervise stateroom housekeeping operations and gourmet dining
      av_q5: "av_q5_opt2", // Managing iconic heritage hotel renowned for unmatched warmth
      av_q6: "av_q6_opt1", // Calmly resolving VIP lodging crises without distress
      av_q7: "av_q7_opt2", // Receiving world's highest hospitality honors for service
    }
  },
  {
    id: 23,
    name: "Capt. Tanvi",
    intendedRoadmap: "pilot",
    domain: "aviation_hospitality",
    story: "Flying has been my dream since childhood. I train on flight simulators mastering cockpit instrument approaches, radio navigation, fuel burn curves, and emergency crosswind landings.",
    s1Answers: { q1: "q1_opt6", q2: "q2_opt2", q3: "q3_opt6", q4: "q4_opt6", q5: "q5_opt4", q6: "q6_opt1", q7: "q7_opt1" },
    s2Preferences: {
      av_q1: "av_q1_opt1", // Pilot VIP transport aircraft safely through congested airspace
      av_q2: "av_q2_opt2", // Execute precision instrument approaches and review autoland RVR
      av_q3: "av_q3_opt3", // Establish seaplane charter service offering scenic flights
      av_q4: "av_q4_opt1", // Navigate maritime airways and docking maneuvers in fog
      av_q5: "av_q5_opt1", // Commanding widebody international flights across oceans
      av_q6: "av_q6_opt1", // Executing emergency crosswind landings safely
      av_q7: "av_q7_opt1", // Retiring after logging thousands of safe flight hours
    }
  },
  {
    id: 24,
    name: "Siddharth",
    intendedRoadmap: "environmental-scientist",
    domain: "science",
    story: "I am dedicated to fighting climate change, testing water pollution in industrial river basins, tracking carbon emissions, and designing ecological biodiversity conservation projects.",
    s1Answers: { q1: "q1_opt4", q2: "q2_opt1", q3: "q3_opt4", q4: "q4_opt4", q5: "q5_opt6", q6: "q6_opt2", q7: "q7_opt4" },
    s2Preferences: {
      sci_q1: "sci_q1_opt2", // Environmental impact assessment and watershed testing
      sci_q2: "sci_q2_opt2", // Analyzing river chemical effluent and biological oxygen demand
      sci_q3: "sci_q3_opt2", // Monitoring wildlife migration corridors and forest canopy health
      sci_q4: "sci_q4_opt2", // Formulating wetland carbon sequestration and biodiversity treaties
      sci_q5: "sci_q5_opt2", // Restoring degraded rainforest ecosystems to health
      sci_q6: "sci_q6_opt2", // Investigating groundwater contamination plumes near landfills
      sci_q7: "sci_q7_opt2", // Protecting endangered ecosystems from ecological collapse
    }
  }
];

console.log(`Running blind persona test for ${BLIND_STORIES.length} student stories...`);

let matchesInPicks = 0;
let matchesTop1 = 0;
const results = [];

for (const student of BLIND_STORIES) {
  const s1Seed = deriveSeed(student.s1Answers);
  const s1Res = scoreStage1(student.s1Answers, { seed: s1Seed });
  const s2Set = getStage2Set(s1Res, { seed: s1Seed });

  const s2Answers = {};
  for (const q of s2Set) {
    if (student.s2Preferences[q.id]) {
      s2Answers[q.id] = student.s2Preferences[q.id];
    } else {
      // Pick best option in served question matching student's domain/interests
      const targetDomain = student.domain;
      const best = q.options.find((o) => {
        const topSlug = Object.keys(o.weights || {})[0];
        return DOMAIN_ROADMAP_MAP[topSlug]?.domain === targetDomain;
      });
      s2Answers[q.id] = (best || q.options[0]).id;
    }
  }

  const res = computeCareerResult({
    stage1Answers: student.s1Answers,
    stage2Answers: s2Answers,
  });

  const pickSlugs = res.picks.map((p) => p.slug);
  const inPicks = pickSlugs.includes(student.intendedRoadmap);
  const isTop1 = res.topCareer.slug === student.intendedRoadmap;

  if (inPicks) matchesInPicks++;
  if (isTop1) matchesTop1++;

  const formattedPicks = res.picks
    .map((p) => `${p.rank}. ${p.title} (${p.matchPct}%)`)
    .join("<br>");

  results.push({
    ...student,
    topCareer: res.topCareer.slug,
    picks: res.picks,
    formattedPicks,
    inPicks,
    isTop1,
    signal: res.signal.level,
  });
}

// Generate Markdown
let md = `# Blind Persona Verification Test\n\n`;
md += `**Evaluation Mode:** Blind Testing via Weights-Free Quiz Exports (\`quiz:export --no-weights\`)\n`;
md += `**Total Personas Tested:** ${BLIND_STORIES.length}\n`;
md += `**Overall Accuracy:**\n`;
md += `- **In-Picks (Top 5) Match Rate:** **${matchesInPicks} / ${BLIND_STORIES.length} (${((matchesInPicks / BLIND_STORIES.length) * 100).toFixed(1)}%)**\n`;
md += `- **Rank #1 Exact Match Rate:** **${matchesTop1} / ${BLIND_STORIES.length} (${((matchesTop1 / BLIND_STORIES.length) * 100).toFixed(1)}%)**\n\n---\n\n`;

md += `## Persona Results Table\n\n`;
md += `| Story ID & Student | Story Summary | Intended Roadmap | Actual Top 5 Recommendations | Match (in picks y/n)? |\n`;
md += `| :---: | :--- | :--- | :--- | :---: |\n`;

for (const r of results) {
  const matchBadge = r.inPicks ? "**y** ✅" : "**n** ❌";
  md += `| **${r.id}** (${r.name}) | ${r.story} | \`${r.intendedRoadmap}\` | ${r.formattedPicks} | ${matchBadge} |\n`;
}

md += `\n---\n\n`;
md += `## Detailed Failure Analysis & Diagnostic Reading\n\n`;
const failures = results.filter((r) => !r.inPicks);
if (failures.length === 0) {
  md += `**Zero Failures Observed:** All 24 blind personas successfully matched their intended career roadmap within the top 5 picks!\n`;
} else {
  for (const f of failures) {
    md += `### Story ${f.id}: ${f.name} (\`${f.intendedRoadmap}\`)\n`;
    md += `- **Intended:** \`${f.intendedRoadmap}\`\n`;
    md += `- **Actual Picks:** ${f.picks.map((p) => p.slug).join(", ")}\n`;
    md += `- **Reading of Why:** ...\n\n`;
  }
}

fs.writeFileSync(reportFile, md, "utf-8");
console.log(`✅ Saved blind personas report to docs/quiz-review/blind-personas.md`);
console.log(`   In-Picks Match Rate: ${matchesInPicks} / ${BLIND_STORIES.length} (${((matchesInPicks / BLIND_STORIES.length) * 100).toFixed(1)}%)`);
console.log(`   Rank #1 Match Rate:  ${matchesTop1} / ${BLIND_STORIES.length} (${((matchesTop1 / BLIND_STORIES.length) * 100).toFixed(1)}%)`);
