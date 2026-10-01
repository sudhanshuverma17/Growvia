import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DOMAINS, getRoadmapsByDomain } from "../config/quizDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const banksDir = path.join(__dirname, "../config/stage2-banks");

// Domain-specific pristine options for Q1..Q4
// Each option has text, weights, reason
const DOMAIN_Q14_DATA = {
  tech: {
    // 7 roadmaps: engineer, ai-ml-engineer, data-scientist, cybersecurity, cloud-architect, blockchain-developer, game-developer
    q1: [
      {
        slug: "engineer",
        text: "Optimize the core backend code so user requests load instantly without crashing.",
        reason: "Refactoring application backend architecture and speed bottlenecks is software engineering."
      },
      {
        slug: "ai-ml-engineer",
        text: "Train machine learning models to automatically predict and smooth sudden traffic surges.",
        reason: "Training predictive algorithms for dynamic traffic patterns defines AI and machine learning."
      },
      {
        slug: "data-scientist",
        text: "Analyze user activity records to detect behavioral drop-offs and system bottlenecks.",
        reason: "Exploratory user behavior metrics and statistical log analysis is data science."
      },
      {
        slug: "cybersecurity",
        text: "Block malicious DDoS attacks and patch vulnerabilities safeguarding student profile records.",
        reason: "Defending against DDoS attacks and patching security vulnerabilities is cybersecurity."
      },
      {
        slug: "cloud-architect",
        text: "Scale containerized virtual servers across multiple geographic regions with load balancers.",
        reason: "Designing multi-region auto-scaling server architecture defines cloud architecture."
      },
      {
        slug: "blockchain-developer",
        text: "Write decentralized cryptographic ledgers to verify every payment and academic record securely.",
        reason: "Deploying cryptographic consensus protocols and verifiable ledgers is blockchain development."
      }
    ],
    q2: [
      {
        slug: "game-developer",
        text: "Build interactive 3D physics engines and fluid avatar movement for virtual worlds.",
        reason: "Developing real-time 3D physics environments and interactive player avatars is game development."
      },
      {
        slug: "engineer",
        text: "Construct clean modular APIs connecting the mobile app seamlessly with web services.",
        reason: "Building robust API endpoints and cross-platform backend integration is software engineering."
      },
      {
        slug: "ai-ml-engineer",
        text: "Develop real-time computer vision models that recognize student facial gestures accurately.",
        reason: "Training computer vision pipelines to recognize visual inputs is AI engineering."
      },
      {
        slug: "data-scientist",
        text: "Build recommendation engines matching students with personalized learning material from study patterns.",
        reason: "Developing recommendation algorithms from student historical data defines data science."
      },
      {
        slug: "cybersecurity",
        text: "Run penetration audits and automated security tests to stop unauthorized identity access.",
        reason: "Simulating access exploits and managing authorization protocols defines cybersecurity."
      },
      {
        slug: "cloud-architect",
        text: "Design disaster recovery pipelines ensuring 99.99% uptime during power grid disruptions.",
        reason: "Architecting high-availability failover and disaster recovery systems is cloud architecture."
      }
    ],
    q3: [
      {
        slug: "blockchain-developer",
        text: "Implement cryptographic zero-knowledge proofs to protect user privacy in peer transactions.",
        reason: "Designing zero-knowledge cryptographic authentication is blockchain development."
      },
      {
        slug: "game-developer",
        text: "Program multiplayer network synchronization minimizing latency in fast-paced collaborative arenas.",
        reason: "Optimizing real-time multiplayer network state synchronization is game development."
      },
      {
        slug: "engineer",
        text: "Refactor legacy database schemas to execute complex analytical queries in milliseconds.",
        reason: "Database query optimization and transactional reliability is core software engineering."
      },
      {
        slug: "ai-ml-engineer",
        text: "Fine-tune natural language models to answer complex student homework questions contextually.",
        reason: "Fine-tuning contextual language models for automated question answering is AI engineering."
      },
      {
        slug: "data-scientist",
        text: "Design automated A/B experimentation platforms evaluating which feature improves student retention.",
        reason: "Designing controlled A/B test experiments and statistical significance testing is data science."
      },
      {
        slug: null, // neutral cross-discipline
        text: "Evaluate intellectual property compliance for third-party open-source software libraries.",
        reason: "Auditing open source licenses and technology legal compliance connects tech and law.",
        adjWeights: { "lawyer": 1 }
      }
    ],
    q4: [
      {
        slug: "cybersecurity",
        text: "Set up hardware security keys and end-to-end encryption for campus communication.",
        reason: "Deploying end-to-end encryption and cryptographic hardware keys is cybersecurity."
      },
      {
        slug: "cloud-architect",
        text: "Automate continuous integration pipelines deploying software across Kubernetes clusters in seconds.",
        reason: "Automating CI/CD deployment pipelines on container clusters is cloud architecture."
      },
      {
        slug: "blockchain-developer",
        text: "Audit distributed smart contracts to eliminate reentrancy bugs before deployment.",
        reason: "Security auditing of decentralized self-executing contracts is blockchain development."
      },
      {
        slug: "game-developer",
        text: "Design procedural level generators and dynamic audio triggers for immersive gameplay.",
        reason: "Creating algorithmic level design and responsive game audio triggers is game development."
      },
      {
        slug: null,
        text: "Conduct usability interviews observing where students get confused by software interfaces.",
        reason: "Gathering empirical user feedback on digital usability connects tech and design.",
        adjWeights: { "designer": 1 }
      },
      {
        slug: null,
        text: "Calculate server cost forecasts comparing on-demand instances against reserved capacity.",
        reason: "Modeling infrastructure expense optimization connects tech infrastructure and finance.",
        adjWeights: { "financial-analyst": 1 }
      }
    ]
  },

  healthcare: {
    // 7 roadmaps: doctor, dentist, physiotherapist, pharmacist, nutritionist, psychologist, fitness-trainer
    q1: [
      {
        slug: "doctor",
        text: "Examine complex medical symptoms and prescribe evidence-based therapeutic medication plans.",
        reason: "Clinical diagnosis and prescribing therapeutic patient treatment defines physician practice."
      },
      {
        slug: "dentist",
        text: "Perform precision microscopic root canals and align jaw teeth for healthy bites.",
        reason: "Specialized oral surgery, endodontics, and dental occlusion alignment define dentistry."
      },
      {
        slug: "physiotherapist",
        text: "Guide post-surgery rehabilitation exercises restoring joint mobility and relieving neuromuscular pain.",
        reason: "Restoring musculoskeletal movement and neuromuscular recovery defines physiotherapy."
      },
      {
        slug: "pharmacist",
        text: "Formulate sterile intravenous compounds and verify patient drug combinations for interactions.",
        reason: "Compounding clinical medications and checking pharmacological interactions defines pharmacy."
      },
      {
        slug: "nutritionist",
        text: "Design personalized dietary plans balancing micronutrients for diabetic and hypertensive patients.",
        reason: "Calculating clinical nutrient requirements and managing metabolic health defines nutrition."
      },
      {
        slug: "psychologist",
        text: "Conduct cognitive behavioral therapy sessions helping teenagers overcome severe examination anxiety.",
        reason: "Administering evidence-based psychotherapy and psychological counseling defines psychology."
      }
    ],
    q2: [
      {
        slug: "fitness-trainer",
        text: "Design progressive athletic strength conditioning workouts improving speed, stamina, and posture.",
        reason: "Designing athletic conditioning and biomechanical strength regimens defines fitness training."
      },
      {
        slug: "doctor",
        text: "Interpret radiographic chest scans and ultrasound imagery to identify internal organ pathology.",
        reason: "Medical imaging interpretation and pathology diagnosis define medical practice."
      },
      {
        slug: "dentist",
        text: "Fabricate ceramic dental crowns and reconstruct damaged enamel using 3D oral scanners.",
        reason: "Prosthodontic crown reconstruction and digital dental scanning define dentistry."
      },
      {
        slug: "physiotherapist",
        text: "Use therapeutic ultrasound and manual spinal decompression therapy for athletic sports injuries.",
        reason: "Manual therapy and electro-physical sports injury rehabilitation define physiotherapy."
      },
      {
        slug: "pharmacist",
        text: "Manage hospital pharmacy inventory ensuring temperature-sensitive vaccines and antibiotics stay viable.",
        reason: "Maintaining pharmaceutical cold chains and critical drug logistics defines pharmacy."
      },
      {
        slug: "nutritionist",
        text: "Analyze blood lipid panels to prescribe anti-inflammatory meal schedules for cardiac patients.",
        reason: "Interpreting biochemical biomarkers to formulate therapeutic diets defines clinical nutrition."
      }
    ],
    q3: [
      {
        slug: "psychologist",
        text: "Analyze adolescent behavioral patterns to develop coping strategies for social anxiety.",
        reason: "Studying behavioral patterns and emotional coping mechanisms defines psychology."
      },
      {
        slug: "fitness-trainer",
        text: "Coach high-school athletes on sprint mechanics and cardiovascular endurance training.",
        reason: "Sprint biomechanics and cardiovascular conditioning coaching define fitness training."
      },
      {
        slug: "doctor",
        text: "Coordinate hospital trauma emergency response triaging patients during critical mass casualties.",
        reason: "Emergency department clinical triage and life support management define medical doctors."
      },
      {
        slug: "dentist",
        text: "Install orthodontic invisible aligners and correct pediatric tooth spacing abnormalities.",
        reason: "Pediatric orthodontics and corrective dental alignment define dentistry."
      },
      {
        slug: "physiotherapist",
        text: "Design ergonomic workstation posture adjustments to prevent chronic repetitive strain injuries.",
        reason: "Postural ergonomics and repetitive strain biomechanical prevention define physiotherapy."
      },
      {
        slug: null,
        text: "Research genetic mRNA sequences to identify targets for novel cancer immunotherapy drugs.",
        reason: "Molecular genetics and immunotherapy discovery connects health and biotechnology.",
        adjWeights: { "biotechnologist": 1 }
      }
    ],
    q4: [
      {
        slug: "pharmacist",
        text: "Review clinical trial pharmacokinetics data evaluating drug absorption rates in pediatric patients.",
        reason: "Analyzing drug bioavailability and pediatric pharmacokinetic curves defines pharmacy."
      },
      {
        slug: "nutritionist",
        text: "Create gut microbiome restoration meal strategies using fermented probiotic foods.",
        reason: "Formulating clinical microbiome dietary protocols defines specialized nutrition science."
      },
      {
        slug: "psychologist",
        text: "Facilitate group therapy workshops building emotional resilience and mindfulness for young adults.",
        reason: "Leading group mental health workshops and psychological resilience defines psychology."
      },
      {
        slug: "fitness-trainer",
        text: "Perform body composition body-fat impedance scans to calibrate personalized metabolic workouts.",
        reason: "Body composition diagnostics and personalized metabolic training define fitness training."
      },
      {
        slug: null,
        text: "Evaluate ergonomic medical equipment design for surgical operating theatre nurses.",
        reason: "Healthcare workplace physical design connects healthcare with industrial design.",
        adjWeights: { "designer": 1 }
      },
      {
        slug: null,
        text: "Organize community health education workshops teaching maternal hygiene in rural clinics.",
        reason: "Public community health awareness connects healthcare and social work.",
        adjWeights: { "social-worker": 1 }
      }
    ]
  },

  business: {
    // 7 roadmaps: startup-founder, product-manager, mba-manager, marketing-manager, digital-marketer, human-resources, supply-chain
    q1: [
      {
        slug: "startup-founder",
        text: "Pitch a disruptive venture business plan to angel investors for seed capital funding.",
        reason: "Venture pitch decks, fundraising, and early-stage company building define startup founders."
      },
      {
        slug: "product-manager",
        text: "Define feature roadmaps and coordinate engineering teams based on user interview feedback.",
        reason: "Product requirements, backlog prioritization, and engineering coordination define product management."
      },
      {
        slug: "mba-manager",
        text: "Restructure company operating units to maximize operating profit margins across global markets.",
        reason: "Strategic organizational restructuring and profit margin optimization define executive management."
      },
      {
        slug: "marketing-manager",
        text: "Direct national brand repositioning campaigns establishing luxury market differentiation.",
        reason: "Omnichannel brand positioning, market research, and advertising campaigns define marketing."
      },
      {
        slug: "digital-marketer",
        text: "Optimize search advertising bids and conversion funnels to reduce customer acquisition costs.",
        reason: "Pay-per-click advertising, funnel analytics, and CAC optimization define digital marketing."
      },
      {
        slug: "human-resources",
        text: "Design employee performance review matrices and merit-based talent promotion frameworks.",
        reason: "Talent performance appraisal systems and organizational growth ladders define HR management."
      }
    ],
    q2: [
      {
        slug: "supply-chain",
        text: "Optimize warehouse inventory logistics and container shipping routes minimizing delivery lead times.",
        reason: "Logistics network design, inventory velocity, and freight route optimization define supply chain."
      },
      {
        slug: "startup-founder",
        text: "Validate minimum viable product prototypes through rapid user feedback and customer interviews.",
        reason: "Customer discovery, product-market fit validation, and rapid iteration define startup founders."
      },
      {
        slug: "product-manager",
        text: "Analyze feature usage telemetry data to remove underperforming buttons and simplify navigation.",
        reason: "User telemetry analytics, UX metric tracking, and feature decluttering define product managers."
      },
      {
        slug: "mba-manager",
        text: "Lead corporate merger negotiations valuing acquired competitors and consolidating assets.",
        reason: "Corporate merger integration, valuation strategy, and asset consolidation define MBA leaders."
      },
      {
        slug: "marketing-manager",
        text: "Formulate seasonal multi-city festival promotional campaigns with celebrity brand ambassadors.",
        reason: "Celebrity endorsements, public relations synergies, and experiential campaigns define marketing."
      },
      {
        slug: "digital-marketer",
        text: "Conduct email marketing automation A/B split testing to increase user checkout rates.",
        reason: "Drip campaign automation and email conversion rate optimization define digital marketing."
      }
    ],
    q3: [
      {
        slug: "human-resources",
        text: "Mediate workplace interpersonal disputes and implement workplace mental wellness policies.",
        reason: "Employee conflict resolution and progressive workplace culture policies define human resources."
      },
      {
        slug: "supply-chain",
        text: "Negotiate vendor contracts with wholesale raw material suppliers securing bulk price discounts.",
        reason: "Strategic procurement, supplier vendor negotiations, and inventory buffers define supply chain."
      },
      {
        slug: "startup-founder",
        text: "Identify untackled customer problems in regional retail and recruit co-founders to solve it.",
        reason: "Identifying market opportunities and recruiting founding teams defines startup leadership."
      },
      {
        slug: "product-manager",
        text: "Write detailed user story acceptance criteria for engineers building an e-commerce checkout flow.",
        reason: "Scrum sprint planning and functional user story specifications define product management."
      },
      {
        slug: "mba-manager",
        text: "Perform competitive benchmarking across industry rivals to identify profitable blue-ocean expansion areas.",
        reason: "Strategic industry analysis and market expansion planning define corporate strategy."
      },
      {
        slug: null,
        text: "Audit financial balance sheets to ensure statutory tax compliance before external investor audits.",
        reason: "Balance sheet audits and statutory financial compliance connects business and finance.",
        adjWeights: { "chartered-accountant": 1 }
      }
    ],
    q4: [
      {
        slug: "marketing-manager",
        text: "Commission customer focus group studies to understand shifting demographic preferences.",
        reason: "Qualitative consumer research and demographic trend analysis define marketing management."
      },
      {
        slug: "digital-marketer",
        text: "Audit organic website search engine rankings and optimize on-page schema tags.",
        reason: "SEO keyword audits and technical search engine optimization define digital marketing."
      },
      {
        slug: "human-resources",
        text: "Organize campus university recruitment drives hiring top graduating engineering talent.",
        reason: "University recruitment pipelines and employer brand hiring define human resources."
      },
      {
        slug: "supply-chain",
        text: "Implement automated barcode scanning systems tracking package fulfillment inside distribution centers.",
        reason: "Warehouse fulfillment automation and RFID package tracking define supply chain operations."
      },
      {
        slug: null,
        text: "Draft standard terms of service contracts for customer dispute resolution and liability.",
        reason: "Commercial contracts and customer liability terms connects business and legal practice.",
        adjWeights: { "lawyer": 1 }
      },
      {
        slug: null,
        text: "Review video advertising scripts ensuring visual pacing resonates with Gen-Z audiences.",
        reason: "Creative video script pacing and consumer storytelling connects business and media.",
        adjWeights: { "content-creator": 1 }
      }
    ]
  },

  creative: {
    // 5 roadmaps: designer, graphic-designer, architect, interior-designer, fashion-designer
    q1: [
      {
        slug: "designer",
        text: "Design ergonomic handheld consumer devices with intuitive button placement and balanced grip.",
        reason: "Industrial ergonomics, physical product prototyping, and user grip analysis define product design."
      },
      {
        slug: "graphic-designer",
        text: "Craft distinctive corporate brand identities with typography, logo systems, and visual guidelines.",
        reason: "Corporate visual branding, typography systems, and logo style guides define graphic design."
      },
      {
        slug: "architect",
        text: "Design earthquake-resilient municipal cultural centers featuring sweeping curved concrete roofs.",
        reason: "Structural civic building design and seismic architectural forms define architecture."
      },
      {
        slug: "interior-designer",
        text: "Curate acoustic wall panels, lighting ambiance, and spatial ergonomics for concert halls.",
        reason: "Spatial layout, architectural acoustics, and experiential ambient lighting define interior design."
      },
      {
        slug: "fashion-designer",
        text: "Drape sustainable organic handloom textiles into modern avant-garde runway apparel collections.",
        reason: "Fabric draping, textile innovation, and fashion collection silhouettes define fashion design."
      },
      {
        slug: null,
        text: "Direct the cinematic lighting and artistic camera angles showcasing an art exhibition.",
        reason: "Visual camera composition and exhibition cinematography connects creative and film direction.",
        adjWeights: { "film-director": 1 }
      }
    ],
    q2: [
      {
        slug: "designer",
        text: "Prototype recyclable biomaterial water bottles with leak-proof magnetic flip caps.",
        reason: "Sustainable consumer packaging and injection-molded physical design define industrial design."
      },
      {
        slug: "graphic-designer",
        text: "Illustrate editorial infographics and engaging book covers for international science publications.",
        reason: "Editorial book covers, publication typography, and vector illustration define graphic design."
      },
      {
        slug: "architect",
        text: "Plan high-density eco-friendly residential housing integrating solar facades and rainwater courtyards.",
        reason: "Sustainable residential master plans and passive solar building envelopes define architecture."
      },
      {
        slug: "interior-designer",
        text: "Transform an industrial brick warehouse into an intimate contemporary fine-dining bistro.",
        reason: "Adaptive interior reuse, hospitality space planning, and mood lighting define interior design."
      },
      {
        slug: "fashion-designer",
        text: "Engineer technical waterproof outdoor sports apparel with heat-sealed seams and reflective trims.",
        reason: "Technical activewear construction and weather-resistant garment engineering define fashion design."
      },
      {
        slug: null,
        text: "Program interactive 3D digital sculptures that morph as museum visitors move past.",
        reason: "Real-time 3D interactive graphics and procedural animations connects design and game tech.",
        adjWeights: { "game-developer": 1 }
      }
    ],
    q3: [
      {
        slug: "designer",
        text: "Refine digital interface navigation components and accessibility color contrast standards.",
        reason: "Design system component libraries, wireframing, and accessible UX define digital product design."
      },
      {
        slug: "graphic-designer",
        text: "Create dynamic animated motion graphics and titles for national television broadcast packages.",
        reason: "Broadcast motion graphics, kinetic typography, and visual title sequences define graphic design."
      },
      {
        slug: "architect",
        text: "Draft technical structural blueprints for glass skywalk bridges connecting urban twin towers.",
        reason: "Elevated pedestrian bridge architecture and structural steel glazing define architecture."
      },
      {
        slug: "interior-designer",
        text: "Design calming sensory recovery rooms with soft textures and biophilic plant walls.",
        reason: "Therapeutic interior spatial zoning and biophilic interior environments define interior design."
      },
      {
        slug: "fashion-designer",
        text: "Illustrate bridal couture garments integrating traditional gold embroidery with modern cuts.",
        reason: "Haute couture garment sketching, embroidery patterning, and bridal wear define fashion design."
      },
      {
        slug: null,
        text: "Capture macro photographic close-ups highlighting the intricate weaves of handcrafted textiles.",
        reason: "High-resolution material texture photography connects creative design and photography.",
        adjWeights: { "photographer": 1 }
      }
    ],
    q4: [
      {
        slug: "designer",
        text: "Perform user usability testing observing where customers struggle with everyday kitchen appliances.",
        reason: "Observational usability testing and physical appliance ergonomics define product design."
      },
      {
        slug: "graphic-designer",
        text: "Design eye-catching sustainable retail product packaging that stands out on grocery shelves.",
        reason: "Consumer packaging shelf presence, dieline layout, and graphic labels define graphic design."
      },
      {
        slug: "architect",
        text: "Restore historic heritage palaces while retrofitting modern accessibility ramps and safety elevators.",
        reason: "Heritage conservation architecture and universal accessibility retrofitting define architecture."
      },
      {
        slug: "interior-designer",
        text: "Optimize office floor plans with modular workstations, phone booths, and collaborative zones.",
        reason: "Commercial workplace interior zoning and modular furniture specification define interior design."
      },
      {
        slug: "fashion-designer",
        text: "Develop zero-waste garment cutting patterns minimizing fabric scrap waste in garment factories.",
        reason: "Zero-waste apparel pattern drafting and sustainable production cutting define fashion design."
      },
      {
        slug: null,
        text: "Calculate structural foundation loads for timber pavilions exposed to monsoon wind storms.",
        reason: "Calculating timber joint loads connects architectural construction and civil engineering.",
        adjWeights: { "civil-engineer": 1 }
      }
    ]
  },

  media: {
    // 5 roadmaps: content-creator, film-director, photographer, journalist, public-relations
    q1: [
      {
        slug: "content-creator",
        text: "Produce engaging short-form educational videos breaking down complex topics for social feeds.",
        reason: "Short-form video storytelling, pacing, and creator community engagement define content creation."
      },
      {
        slug: "film-director",
        text: "Block dramatic scene staging, direct actors, and shape emotional visual tone on set.",
        reason: "Directing dramatic acting performances, camera blocking, and scene pacing define film direction."
      },
      {
        slug: "photographer",
        text: "Capture raw, candid wildlife action shots using high-speed telephoto lens shutter techniques.",
        reason: "Wildlife telephoto tracking, optical shutter timing, and natural exposure define photography."
      },
      {
        slug: "journalist",
        text: "Investigate official municipal budgets to uncover corruption and publish verified front-page exposés.",
        reason: "Investigative documentary reporting, source verification, and public accountability define journalism."
      },
      {
        slug: "public-relations",
        text: "Manage urgent corporate crisis communications and draft press releases countering false rumors.",
        reason: "Reputation crisis management, media releases, and spokesperson briefings define public relations."
      },
      {
        slug: null,
        text: "Design striking promotional posters combining bold typography and photo montages.",
        reason: "Promotional event poster graphics connects media communication with graphic design.",
        adjWeights: { "graphic-designer": 1 }
      }
    ],
    q2: [
      {
        slug: "content-creator",
        text: "Host a weekly technology podcast interviewing startup innovators on emerging consumer trends.",
        reason: "Podcast interviewing, audio show hosting, and conversational pacing define content creators."
      },
      {
        slug: "film-director",
        text: "Collaborate with cinematographers on lighting setups to evoke mystery in a thriller film.",
        reason: "Cinematographic lighting design and atmospheric visual narrative define film directors."
      },
      {
        slug: "photographer",
        text: "Shoot architectural interior portfolios utilizing wide-angle perspective control lenses.",
        reason: "Architectural perspective correction and interior ambient exposure define professional photography."
      },
      {
        slug: "journalist",
        text: "Interview eyewitnesses in disaster zones to report urgent, accurate humanitarian relief updates.",
        reason: "On-the-ground crisis reporting and humanitarian witness interviewing define field journalism."
      },
      {
        slug: "public-relations",
        text: "Pitch compelling human-interest brand stories to top national newspaper editors for feature coverage.",
        reason: "Media relations, pitching editorial desks, and securing organic press coverage define PR."
      },
      {
        slug: null,
        text: "Coordinate international press conferences with live multilingual translation audio feeds.",
        reason: "Press event audio logistics and live VIP scheduling connects media and event management.",
        adjWeights: { "event-manager": 1 }
      }
    ],
    q3: [
      {
        slug: "content-creator",
        text: "Script entertaining episodic YouTube essays examining cinema history with sharp visual humor.",
        reason: "Video essay scriptwriting, visual pacing, and digital audience engagement define content creation."
      },
      {
        slug: "film-director",
        text: "Guide the editing room assembly of footage to heighten tension during climactic story scenes.",
        reason: "Post-production narrative rhythm, montage editing, and story tension define film direction."
      },
      {
        slug: "photographer",
        text: "Photograph runway fashion models using studio strobe lights and high-contrast color gels.",
        reason: "Studio flash lighting, high-fashion portraiture, and color gel exposure define photography."
      },
      {
        slug: "journalist",
        text: "Analyze national election exit polling data to publish comprehensive political trend analyses.",
        reason: "Data journalism, statistical vote trend analysis, and political reporting define journalism."
      },
      {
        slug: "public-relations",
        text: "Organize exclusive media preview galas for brand launches with influencers and press critics.",
        reason: "Brand launch events, press preview orchestration, and VIP guest relations define PR."
      },
      {
        slug: null,
        text: "Draft strict ethical reporting guidelines protecting privacy of juvenile court witnesses.",
        reason: "Media legal ethics and juvenile privacy rights connects media reporting and legal ethics.",
        adjWeights: { "lawyer": 1 }
      }
    ],
    q4: [
      {
        slug: "content-creator",
        text: "Review analytics metrics to identify optimal posting schedules and audience retention peaks.",
        reason: "Content analytics, watch-time retention curves, and algorithmic distribution define creators."
      },
      {
        slug: "film-director",
        text: "Direct large crowd scenes with choreographed background movements in an epic period drama.",
        reason: "Directing complex crowd choreography and historical narrative scale defines film direction."
      },
      {
        slug: "photographer",
        text: "Document street life culture and historic heritage markets through black-and-white portraits.",
        reason: "Documentary street photography, monochrome tonal grading, and candid framing define photography."
      },
      {
        slug: "journalist",
        text: "File freedom-of-information requests to uncover environmental pollution records of factories.",
        reason: "Public records requests, legal document analysis, and investigative reporting define journalism."
      },
      {
        slug: "public-relations",
        text: "Coach corporate executives on body language and messaging before live televised interviews.",
        reason: "Executive media training, messaging prep, and television interview coaching define PR."
      },
      {
        slug: null,
        text: "Compose dramatic orchestral musical scores synchronized to emotional film scenes.",
        reason: "Scoring cinematic emotional music connects media storytelling and sound production.",
        adjWeights: { "content-creator": 1 }
      }
    ]
  },

  finance: {
    // 4 roadmaps: chartered-accountant, investment-banker, financial-analyst, actuary
    q1: [
      {
        slug: "chartered-accountant",
        text: "Audit corporate financial balance sheets ensuring strict adherence to statutory accounting standards.",
        reason: "Corporate financial auditing, statutory compliance, and balance sheet integrity define chartered accountancy."
      },
      {
        slug: "investment-banker",
        text: "Structure cross-border corporate mergers and value multinational acquisitions for investment clients.",
        reason: "Mergers and acquisitions advisory, corporate valuation, and deal structuring define investment banking."
      },
      {
        slug: "financial-analyst",
        text: "Build discounted cash flow valuation models to evaluate whether a public stock is underpriced.",
        reason: "Discounted cash flow modeling, equity research, and intrinsic stock valuation define financial analysts."
      },
      {
        slug: "actuary",
        text: "Calculate life insurance premium mortality tables using statistical probability and loss distributions.",
        reason: "Statistical loss probability, mortality tables, and insurance underwriting math define actuaries."
      },
      {
        slug: null,
        text: "Analyze macroeconomic inflation forecasts to project national interest rate trends.",
        reason: "Macroeconomic forecasting connects corporate finance and business analytics.",
        adjWeights: { "mba-manager": 1 }
      },
      {
        slug: null,
        text: "Automate quantitative trading algorithms that execute arbitrage orders within microseconds.",
        reason: "Automated algorithmic trading systems connects financial markets and software engineering.",
        adjWeights: { "engineer": 1 }
      }
    ],
    q2: [
      {
        slug: "chartered-accountant",
        text: "Formulate strategic tax reduction plans legally utilizing international tax treaty provisions.",
        reason: "Corporate taxation planning, treaty optimization, and statutory tax filings define chartered accountants."
      },
      {
        slug: "investment-banker",
        text: "Underwrite initial public offerings pitching new shares to institutional sovereign funds.",
        reason: "Equity capital market underwriting and IPO institutional roadshows define investment bankers."
      },
      {
        slug: "financial-analyst",
        text: "Forecast quarterly revenue earnings and profit margins for renewable energy corporate issuers.",
        reason: "Earnings forecasting, financial ratio analysis, and corporate credit rating define financial analysts."
      },
      {
        slug: "actuary",
        text: "Model catastrophic natural disaster insurance reserve requirements using extreme event risk math.",
        reason: "Catastrophic risk modeling and mathematical reserve solvency testing define actuaries."
      },
      {
        slug: null,
        text: "Verify anti-money laundering compliance across international customer remittance accounts.",
        reason: "Regulatory compliance and financial crime auditing connects finance with legal governance.",
        adjWeights: { "lawyer": 1 }
      },
      {
        slug: null,
        text: "Evaluate customer churn probabilities across banking apps using predictive data models.",
        reason: "Predictive consumer retention data models connects banking with data science.",
        adjWeights: { "data-scientist": 1 }
      }
    ],
    q3: [
      {
        slug: "chartered-accountant",
        text: "Investigate forensic accounting anomalies to expose concealed corporate embezzlement schemes.",
        reason: "Forensic accounting investigations, fraud detection, and asset tracing define chartered accountants."
      },
      {
        slug: "investment-banker",
        text: "Negotiate leveraged buyout financing with private equity funds and syndication loan banks.",
        reason: "Leveraged buyout debt structuring, loan syndication, and private equity deals define investment bankers."
      },
      {
        slug: "financial-analyst",
        text: "Analyze corporate balance sheet liquidity to publish institutional credit risk downgrade warnings.",
        reason: "Corporate credit risk analysis, debt service ratios, and bond default analysis define financial analysts."
      },
      {
        slug: "actuary",
        text: "Design corporate employee pension retirement fund liability models projected over thirty years.",
        reason: "Long-term pension fund solvency math and liability cash-flow modeling define actuaries."
      },
      {
        slug: null,
        text: "Structure tax incentives encouraging angel venture capital investments into local green tech.",
        reason: "Venture tax incentive structuring connects financial analysis and public economic policy.",
        adjWeights: { "civil-services": 1 }
      },
      {
        slug: null,
        text: "Develop interactive financial dashboard visualizations displaying real-time currency currency movements.",
        reason: "Financial data dashboard visualization connects finance and digital design.",
        adjWeights: { "designer": 1 }
      }
    ],
    q4: [
      {
        slug: "chartered-accountant",
        text: "Design internal accounting control protocols preventing unauthorized expenditures across enterprise divisions.",
        reason: "Internal financial controls, operational audit protocols, and governance define chartered accountants."
      },
      {
        slug: "investment-banker",
        text: "Advise boards of directors on defense strategies against hostile takeover bids from rivals.",
        reason: "Hostile takeover defense, shareholder rights plans, and board advisory define investment bankers."
      },
      {
        slug: "financial-analyst",
        text: "Publish sector thematic equity research reports recommending buy or sell ratings on tech stocks.",
        reason: "Thematic industry sector reports and equity stock recommendations define financial analysts."
      },
      {
        slug: "actuary",
        text: "Evaluate climate change flood frequency statistics to re-price coastal commercial property insurance.",
        reason: "Pricing environmental property catastrophe risks using statistical models defines actuaries."
      },
      {
        slug: null,
        text: "Assess venture capital unit economics and burn rates for early-stage logistics startups.",
        reason: "Unit economics and cash runway modeling connects financial analysis and startup founding.",
        adjWeights: { "startup-founder": 1 }
      },
      {
        slug: null,
        text: "Calculate cargo shipping insurance risks for international freight crossing pirated straits.",
        reason: "Freight risk underwriting connects financial risk calculation with global supply chains.",
        adjWeights: { "supply-chain": 1 }
      }
    ]
  },

  law_gov: {
    // 3 roadmaps: lawyer, civil-services, army-officer
    q1: [
      {
        slug: "lawyer",
        text: "Argue constitutional civil rights cases before the High Court defending fundamental liberties.",
        reason: "Constitutional litigation and courtroom oral arguments define senior legal advocates."
      },
      {
        slug: "lawyer",
        text: "Draft complex commercial dispute settlements protecting client intellectual property in arbitration.",
        reason: "Commercial contract arbitration and IP rights drafting define corporate legal practice."
      },
      {
        slug: "civil-services",
        text: "Administer district government disaster relief operations ensuring food and medical supplies reach villages.",
        reason: "District administrative governance, public relief logistics, and emergency services define civil services."
      },
      {
        slug: "army-officer",
        text: "Lead mountain infantry reconnaissance patrols along high-altitude border posts under extreme weather.",
        reason: "Tactical military command, border security, and high-altitude troop leadership define army officers."
      },
      {
        slug: null,
        text: "Broadcast verified investigative reports on civil rights violations in rural administrative blocks.",
        reason: "Civil rights investigative reporting connects legal governance and investigative journalism.",
        adjWeights: { "journalist": 1 }
      },
      {
        slug: null,
        text: "Design welfare rehabilitation programs supporting families affected by communal disasters.",
        reason: "Community disaster rehabilitation connects government administration and social work.",
        adjWeights: { "social-worker": 1 }
      }
    ],
    q2: [
      {
        slug: "lawyer",
        text: "Examine forensic evidence and cross-examine witnesses to prove innocence in criminal trials.",
        reason: "Criminal defense trial advocacy and witness cross-examination define trial lawyers."
      },
      {
        slug: "civil-services",
        text: "Formulate national clean energy subsidy policies balancing fiscal budgets with emissions targets.",
        reason: "Public policy design, national regulatory frameworks, and fiscal resource allocation define civil services."
      },
      {
        slug: "civil-services",
        text: "Supervise regional rural electrification and clean drinking water pipeline infrastructure delivery.",
        reason: "District developmental governance and rural utility infrastructure management define civil services."
      },
      {
        slug: "army-officer",
        text: "Coordinate combined arms mechanized logistics exercises ensuring combat readiness across brigades.",
        reason: "Operational military logistics and mechanized brigade command define army officers."
      },
      {
        slug: null,
        text: "Facilitate village council meetings resolving inter-community agricultural water distribution disputes.",
        reason: "Rural community mediation connects public governance and grassroots social work.",
        adjWeights: { "social-worker": 1 }
      },
      {
        slug: null,
        text: "Audit public municipal expenditure records to detect procurement fraud in government contracts.",
        reason: "Public expenditure financial audits connects public governance and forensic accounting.",
        adjWeights: { "chartered-accountant": 1 }
      }
    ],
    q3: [
      {
        slug: "lawyer",
        text: "Draft international bilateral trade agreements ensuring domestic patent protections remain inviolable.",
        reason: "International trade treaty law and patent protection clauses define international lawyers."
      },
      {
        slug: "civil-services",
        text: "Coordinate municipal urban planning zoning laws to curb illegal construction and traffic gridlock.",
        reason: "Urban governance, municipal regulatory enforcement, and civic town planning define civil services."
      },
      {
        slug: "army-officer",
        text: "Lead search and rescue operations airlifting stranded civilians during severe flash floods.",
        reason: "Disaster military relief operations and tactical search-and-rescue command define army officers."
      },
      {
        slug: "army-officer",
        text: "Establish secure encrypted battlefield tactical communications across forward defensive garrisons.",
        reason: "Military tactical communications and forward base defense readiness define army officers."
      },
      {
        slug: null,
        text: "Draft standard commercial arbitration clauses for public infrastructure public-private partnerships.",
        reason: "Infrastructure public-private partnership contracts connects government and corporate law.",
        adjWeights: { "lawyer": 1 }
      },
      {
        slug: null,
        text: "Direct televised municipal press briefings informing citizens during regional weather emergencies.",
        reason: "Emergency public communication connects civic administration and public relations.",
        adjWeights: { "public-relations": 1 }
      }
    ],
    q4: [
      {
        slug: "lawyer",
        text: "File public interest litigations compelling authorities to clean toxic industrial waste from rivers.",
        reason: "Public interest environmental litigation before high courts defines public advocacy lawyers."
      },
      {
        slug: "civil-services",
        text: "Supervise nationwide digital voter registration systems ensuring free, fair, and accessible elections.",
        reason: "Electoral administration and nationwide democratic machinery oversight define civil services."
      },
      {
        slug: "army-officer",
        text: "Plan strategic perimeter security and counter-infiltration deployments across rugged mountain passes.",
        reason: "Perimeter defense strategy and counter-infiltration tactical planning define army officers."
      },
      {
        slug: null,
        text: "Conduct sociological field research on public compliance with new traffic penalty legislation.",
        reason: "Socio-legal compliance research connects public policy and social science.",
        adjWeights: { "social-worker": 1 }
      },
      {
        slug: null,
        text: "Design cryptographic communication protocols securing defense ministry internal networks.",
        reason: "Military cybersecurity infrastructure connects defense and software engineering.",
        adjWeights: { "cybersecurity": 1 }
      },
      {
        slug: null,
        text: "Publish analytical columns in national newspapers evaluating new parliamentary crime bills.",
        reason: "Legislative journalistic analysis connects legal expertise and investigative journalism.",
        adjWeights: { "journalist": 1 }
      }
    ]
  },

  education_social: {
    // 3 roadmaps: teacher, ed-tech, social-worker
    q1: [
      {
        slug: "teacher",
        text: "Design hands-on science experiments explaining physics concepts clearly to curious middle-schoolers.",
        reason: "Classroom pedagogy, conceptual lesson design, and experiential student teaching define educators."
      },
      {
        slug: "teacher",
        text: "Mentor struggling students after school with personalized remedial learning plans and encouragement.",
        reason: "One-on-one student academic mentoring and personalized remedial coaching define teachers."
      },
      {
        slug: "ed-tech",
        text: "Develop adaptive gamified learning software adapting math difficulty to individual student speed.",
        reason: "Adaptive educational software algorithms and learning analytics define ed-tech specialists."
      },
      {
        slug: "social-worker",
        text: "Counsel homeless families and coordinate emergency housing, food subsidies, and healthcare access.",
        reason: "Grassroots crisis intervention and social welfare entitlement advocacy define social workers."
      },
      {
        slug: null,
        text: "Evaluate clinical psychological assessments for students showing signs of learning disabilities.",
        reason: "Student psychological disability assessments connects education and clinical psychology.",
        adjWeights: { "psychologist": 1 }
      },
      {
        slug: null,
        text: "Train classroom teachers on vocal projection and engaging public speaking techniques.",
        reason: "Vocal presence and public presentation training connects teaching and communication.",
        adjWeights: { "public-relations": 1 }
      }
    ],
    q2: [
      {
        slug: "teacher",
        text: "Lead interactive classroom literature discussions encouraging critical thinking and respectful debate.",
        reason: "Humanities pedagogy, critical thinking facilitation, and student debate leadership define teachers."
      },
      {
        slug: "ed-tech",
        text: "Build virtual science laboratory simulations allowing students to conduct experiments on mobile phones.",
        reason: "Interactive virtual laboratory simulations and mobile educational tools define ed-tech."
      },
      {
        slug: "ed-tech",
        text: "Analyze learning platform completion drop-off funnels to optimize lesson engagement videos.",
        reason: "Digital learning telemetry and curriculum video completion optimization define ed-tech."
      },
      {
        slug: "social-worker",
        text: "Intervene in child welfare cases protecting vulnerable minors from domestic neglect and exploitation.",
        reason: "Child protection legal advocacy and family welfare casework define licensed social workers."
      },
      {
        slug: null,
        text: "Organize community literacy circles and distribute free books in rural tribal villages.",
        reason: "Rural grassroots literacy organizing connects education and social impact.",
        adjWeights: { "teacher": 1 }
      },
      {
        slug: null,
        text: "Draft grant funding proposals requesting corporate philanthropic donations for school libraries.",
        reason: "Philanthropic fundraising and nonprofit grant writing connects social work and management.",
        adjWeights: { "mba-manager": 1 }
      }
    ],
    q3: [
      {
        slug: "teacher",
        text: "Organize inter-school science fairs inspiring teenagers to showcase solar energy models.",
        reason: "Co-curricular science exhibition organizing and student project mentoring define teachers."
      },
      {
        slug: "ed-tech",
        text: "Design intuitive user interfaces for accessible screen-reader compatible student quiz apps.",
        reason: "Accessible educational UI design and assistive learning technology define ed-tech."
      },
      {
        slug: "social-worker",
        text: "Facilitate substance abuse rehabilitation support circles rebuilding self-esteem and family bonds.",
        reason: "Addiction recovery group counseling and community rehabilitation define social workers."
      },
      {
        slug: "social-worker",
        text: "Lobby state education ministries to provide free midday meals and sanitary napkins in all schools.",
        reason: "Grassroots policy lobbying and public health rights advocacy define social workers."
      },
      {
        slug: null,
        text: "Produce educational documentary short films highlighting inspiring teachers in rural regions.",
        reason: "Documentary educational filmmaking connects social impact and film direction.",
        adjWeights: { "film-director": 1 }
      },
      {
        slug: null,
        text: "Design ergonomic, brightly-colored modular desks and chairs for early childhood classrooms.",
        reason: "Early childhood classroom physical design connects education and interior design.",
        adjWeights: { "designer": 1 }
      }
    ],
    q4: [
      {
        slug: "teacher",
        text: "Formulate progressive holistic student evaluation report cards measuring emotional growth.",
        reason: "Holistic student assessment design and developmental evaluation define educators."
      },
      {
        slug: "ed-tech",
        text: "Engineer offline-first learning tablets that synchronize assignments when connected to intermittent Wi-Fi.",
        reason: "Offline educational hardware engineering and low-bandwidth digital learning define ed-tech."
      },
      {
        slug: "social-worker",
        text: "Mobilize volunteer networks to rebuild community centers following devastating seasonal flooding.",
        reason: "Community disaster mobilization and grassroots volunteer coordination define social workers."
      },
      {
        slug: null,
        text: "Counsel high school seniors on university scholarship applications and career roadmaps.",
        reason: "Student academic pathway counseling connects teaching and human resource guidance.",
        adjWeights: { "human-resources": 1 }
      },
      {
        slug: null,
        text: "Audit public school building safety and fire escape clearances across urban districts.",
        reason: "School physical infrastructure safety audits connects education with civil engineering.",
        adjWeights: { "civil-engineer": 1 }
      },
      {
        slug: null,
        text: "Investigate systemic dropout rates among adolescent girls in rural agricultural districts.",
        reason: "Systemic sociological research connects social work and investigative journalism.",
        adjWeights: { "journalist": 1 }
      }
    ]
  },

  aviation_hospitality: {
    // 3 roadmaps: pilot, hotel-management, event-manager
    q1: [
      {
        slug: "pilot",
        text: "Execute precision instrument landings through heavy fog using automated radio navigation beacons.",
        reason: "Instrument flight ratings, cockpit avionics, and low-visibility aircraft landings define commercial pilots."
      },
      {
        slug: "pilot",
        text: "Calculate aircraft fuel burn curves and alternative diversion airport routes during turbulent storms.",
        reason: "Flight planning, fuel conservation physics, and storm diversion navigation define airline pilots."
      },
      {
        slug: "hotel-management",
        text: "Oversee five-star luxury hotel guest check-in operations ensuring flawless concierge VIP hospitality.",
        reason: "Luxury hotel operations, front-office guest relations, and VIP concierge services define hotel management."
      },
      {
        slug: "event-manager",
        text: "Orchestrate grand celebrity wedding receptions managing banquets, stage lighting, and performer cues.",
        reason: "Large-scale event production, vendor coordination, and live stage management define event managers."
      },
      {
        slug: null,
        text: "Draft emergency public relations announcements during unexpected airline flight cancellations.",
        reason: "Crisis airline communication connects travel hospitality with public relations.",
        adjWeights: { "public-relations": 1 }
      },
      {
        slug: null,
        text: "Coordinate international cargo flight logistics delivering perishable pharmaceutical vaccines.",
        reason: "Air freight cold-chain cargo coordination connects aviation and global supply chain.",
        adjWeights: { "supply-chain": 1 }
      }
    ],
    q2: [
      {
        slug: "pilot",
        text: "Perform rigorous pre-flight walkaround inspections checking wing flaps, tires, and hydraulic fluid levels.",
        reason: "Pre-flight airworthiness inspections and mechanical systems verification define commercial aviators."
      },
      {
        slug: "hotel-management",
        text: "Manage fine-dining banquet operations supervising master chefs, cellar pairings, and service staff.",
        reason: "Food and beverage hospitality management and culinary service leadership define hotel managers."
      },
      {
        slug: "hotel-management",
        text: "Optimize seasonal room pricing yields across luxury suites to maximize hotel revenue occupancy.",
        reason: "Hotel yield revenue management and dynamic room inventory pricing define hospitality leaders."
      },
      {
        slug: "event-manager",
        text: "Produce international technology conventions with multi-track keynote stages and sponsor exhibition booths.",
        reason: "Corporate convention management, exhibition floor design, and keynote scheduling define event managers."
      },
      {
        slug: null,
        text: "Design tranquil resort suite interiors incorporating sustainable teak wood and ambient water features.",
        reason: "Luxury resort guest room design connects hospitality and interior architecture.",
        adjWeights: { "interior-designer": 1 }
      },
      {
        slug: null,
        text: "Inspect airport terminal structural fire safety systems and wide passenger evacuation corridors.",
        reason: "Airport terminal safety engineering connects airport operations and civil engineering.",
        adjWeights: { "civil-engineer": 1 }
      }
    ],
    q3: [
      {
        slug: "pilot",
        text: "Communicate with air traffic controllers executing rapid altitude step-climbs over monsoon thunderstorm cells.",
        reason: "Air traffic control communications and weather avoidance navigation define airline captains."
      },
      {
        slug: "hotel-management",
        text: "Train resort front-desk staff in multilingual etiquette and conflict resolution for demanding guests.",
        reason: "Staff hospitality training, service quality assurance, and guest dispute resolution define hotel managers."
      },
      {
        slug: "event-manager",
        text: "Direct backstage operations at international live music festivals ensuring flawless artist transitions.",
        reason: "Festival stage production, acoustic timing, and artist hospitality define live event managers."
      },
      {
        slug: "event-manager",
        text: "Design safety crowd control barriers and emergency medical exit lanes for stadium concerts.",
        reason: "Stadium crowd safety planning and emergency exit logistics define event directors."
      },
      {
        slug: null,
        text: "Negotiate bulk corporate hotel room discount contracts with international business delegations.",
        reason: "Corporate hospitality procurement connects hotel sales with business management.",
        adjWeights: { "mba-manager": 1 }
      },
      {
        slug: null,
        text: "Photograph aerial panoramic view landscapes from chartered flights at sunrise.",
        reason: "Aerial landscape photography connects aviation and professional photography.",
        adjWeights: { "photographer": 1 }
      }
    ],
    q4: [
      {
        slug: "pilot",
        text: "Manage complex glass-cockpit flight management computers navigating international polar airway waypoints.",
        reason: "Long-haul flight management system programming and polar navigation define airline pilots."
      },
      {
        slug: "hotel-management",
        text: "Audit housekeeping sanitary hygiene standards across hundreds of guest suites ensuring pristine cleanliness.",
        reason: "Housekeeping quality audits and hotel sanitation standards define hospitality operations."
      },
      {
        slug: "event-manager",
        text: "Coordinate multi-city marathon races securing police road closures, hydration points, and timing chips.",
        reason: "Civic sports event coordination and municipal road closure logistics define event managers."
      },
      {
        slug: null,
        text: "Model aircraft jet engine fuel efficiency improvements on transcontinental routes.",
        reason: "Aero-engine fuel aerodynamics connects aviation with mechanical engineering.",
        adjWeights: { "mechanical-engineer": 1 }
      },
      {
        slug: null,
        text: "Design bespoke haute couture uniforms for premier international airline cabin crews.",
        reason: "Airline cabin crew apparel design connects hospitality and fashion design.",
        adjWeights: { "fashion-designer": 1 }
      },
      {
        slug: null,
        text: "Supervise automated baggage carousel conveyor belts and passenger flow tracking in airports.",
        reason: "Airport baggage handling logistics connects airport operations and supply chain.",
        adjWeights: { "supply-chain": 1 }
      }
    ]
  },

  engineering: {
    // 2 roadmaps: mechanical-engineer, civil-engineer
    q1: [
      {
        slug: "mechanical-engineer",
        text: "Design high-torque automotive transmission gearboxes and calculate gear tooth contact stress.",
        reason: "Gearbox mechanics, power transmission, and rotational fatigue stress define mechanical engineering."
      },
      {
        slug: "mechanical-engineer",
        text: "Analyze aerodynamic drag profiles on electric vehicle bodies using computational fluid dynamics.",
        reason: "Fluid dynamics, aerodynamic drag reduction, and vehicle thermal management define mechanical engineers."
      },
      {
        slug: "civil-engineer",
        text: "Design earthquake-resistant reinforced concrete foundations for eighty-story coastal skyscraper towers.",
        reason: "Seismic foundation piling, reinforced concrete mechanics, and skyscraper structures define civil engineers."
      },
      {
        slug: "civil-engineer",
        text: "Calculate dynamic storm surge hydrodynamic wave loads on offshore breakwater concrete caissons.",
        reason: "Coastal marine structural design and hydrodynamic wave impact calculation define civil engineering."
      },
      {
        slug: null,
        text: "Design the futuristic aesthetic structural glass atrium for an international airport hub.",
        reason: "Civic architectural glass forms connects structural engineering with architecture.",
        adjWeights: { "architect": 1 }
      },
      {
        slug: null,
        text: "Model traffic flow simulation algorithms to optimize urban flyover interchange signal timing.",
        reason: "Traffic flow optimization connects civil transportation and data science.",
        adjWeights: { "data-scientist": 1 }
      }
    ],
    q2: [
      {
        slug: "mechanical-engineer",
        text: "Fabricate lightweight titanium turbine blades operating under extreme temperature inside jet engines.",
        reason: "High-temperature aerospace metallurgy, thermal stress, and turbine thermodynamics define mechanical engineering."
      },
      {
        slug: "mechanical-engineer",
        text: "Program multi-axis robotic arms performing precision micro-welding on electric vehicle battery packs.",
        reason: "Robotic industrial automation, kinematic path planning, and welding mechanics define mechanical engineers."
      },
      {
        slug: "civil-engineer",
        text: "Survey underground geological rock strata before drilling high-speed subterranean railway tunnels.",
        reason: "Geotechnical strata surveys, tunnel boring mechanics, and underground soil stabilization define civil engineering."
      },
      {
        slug: "civil-engineer",
        text: "Design massive gravity dam spillways and reservoir concrete sluice gates controlling river floods.",
        reason: "Hydraulic water resource structures and massive concrete dam engineering define civil engineers."
      },
      {
        slug: null,
        text: "Prototype ergonomic shock-absorbing bicycle frames using carbon fiber composite molding.",
        reason: "Consumer sports equipment styling connects mechanical structures and industrial design.",
        adjWeights: { "designer": 1 }
      },
      {
        slug: null,
        text: "Audit supply chain vendor quality for imported high-tensile structural steel bridge cables.",
        reason: "Heavy industrial procurement connects structural construction and supply chain.",
        adjWeights: { "supply-chain": 1 }
      }
    ],
    q3: [
      {
        slug: "mechanical-engineer",
        text: "Design closed-loop refrigeration cooling cycles for supercomputing data centers using eco refrigerants.",
        reason: "Thermodynamic heat exchange, refrigeration cycles, and thermal cooling define mechanical engineering."
      },
      {
        slug: "civil-engineer",
        text: "Plan high-speed expressway interchange geometry with super-elevated curves preventing vehicle rollovers.",
        reason: "Highway geometric alignment, super-elevation slope math, and paving design define civil engineering."
      },
      {
        slug: null,
        text: "Calculate dynamic wind turbulence loads on curved architectural glass curtain walls.",
        reason: "Wind load structural modeling connects facade engineering with architecture.",
        adjWeights: { "architect": 1 }
      },
      {
        slug: null,
        text: "Inspect underground wastewater treatment plant aeration tanks for concrete chemical erosion.",
        reason: "Municipal water sanitation environmental testing connects civil works and environmental science.",
        adjWeights: { "environmental-scientist": 1 }
      },
      {
        slug: null,
        text: "Perform non-destructive ultrasonic acoustic crack testing on high-speed rail locomotive axles.",
        reason: "Acoustic materials testing connects mechanical engineering with materials science.",
        adjWeights: { "mechanical-engineer": 1 }
      },
      {
        slug: null,
        text: "Supervise heavy crane crane lifting operations hoisting pre-cast viaduct segments over busy streets.",
        reason: "Construction site crane rigging connects civil project execution with safety management.",
        adjWeights: { "civil-engineer": 1 }
      }
    ],
    q4: [
      {
        slug: "mechanical-engineer",
        text: "Optimize hydraulic cylinder actuators and proportional valves for heavy mining excavators.",
        reason: "Fluid power hydraulics, cylinder force kinematics, and heavy machinery define mechanical engineering."
      },
      {
        slug: "civil-engineer",
        text: "Design stormwater drainage culvert networks preventing catastrophic urban flash flooding during monsoons.",
        reason: "Urban stormwater hydrology, open channel culvert hydraulics, and flood mitigation define civil engineering."
      },
      {
        slug: null,
        text: "Test recyclable biomaterial composites to replace petroleum-based automotive interior dashboard plastics.",
        reason: "Automotive biomaterials development connects mechanical design with biotechnology.",
        adjWeights: { "biotechnologist": 1 }
      },
      {
        slug: null,
        text: "Assess flight deck cockpit vibration dampening for twin-engine regional turboprop aircraft.",
        reason: "Aircraft structural vibration mitigation connects mechanical engineering with aviation.",
        adjWeights: { "pilot": 1 }
      },
      {
        slug: null,
        text: "Calculate dynamic seismic soil liquefaction risks under proposed metropolitan metro station columns.",
        reason: "Seismic soil liquefaction calculation connects civil geotechnical engineering and safety.",
        adjWeights: { "civil-engineer": 1 }
      },
      {
        slug: null,
        text: "Design heat-recovery steam generators utilizing industrial factory exhaust waste heat.",
        reason: "Thermal waste heat recovery connects mechanical power engineering and green energy.",
        adjWeights: { "mechanical-engineer": 1 }
      }
    ]
  },

  science: {
    // 2 roadmaps: biotechnologist, environmental-scientist
    q1: [
      {
        slug: "biotechnologist",
        text: "Synthesize recombinant DNA plasmids to engineer bacteria producing human insulin affordably.",
        reason: "Recombinant gene cloning, microbial plasmid expression, and biopharmaceuticals define biotechnology."
      },
      {
        slug: "biotechnologist",
        text: "Cultivate drought-resistant genetically-modified crop varieties with fortified micronutrient levels.",
        reason: "Agricultural biotechnology, transgenic crop editing, and plant molecular genetics define biotechnologists."
      },
      {
        slug: "environmental-scientist",
        text: "Sample industrial river runoff water analyzing heavy metal toxicity parts-per-billion using mass spectrometry.",
        reason: "Environmental water quality sampling, aquatic toxicity metrics, and mass spectrometry define environmental science."
      },
      {
        slug: "environmental-scientist",
        text: "Map satellite remote sensing imagery tracking deforestation and loss of critical wetland bird habitats.",
        reason: "Geospatial satellite remote sensing, ecological habitat monitoring, and conservation define environmental scientists."
      },
      {
        slug: null,
        text: "Review clinical trial safety records for experimental mRNA vaccines before regulatory approval.",
        reason: "Clinical trial vaccine evaluation connects biotechnology with medical doctor practice.",
        adjWeights: { "doctor": 1 }
      },
      {
        slug: null,
        text: "Draft legal environmental impact petitions prohibiting oil drilling inside tiger conservation reserves.",
        reason: "Environmental law advocacy connects conservation science and legal litigation.",
        adjWeights: { "lawyer": 1 }
      }
    ],
    q2: [
      {
        slug: "biotechnologist",
        text: "Screen marine sponge fungal extracts using chromatography to discover novel antimicrobial antibiotic compounds.",
        reason: "Marine natural product drug discovery and chromatographic screening define biotechnology researchers."
      },
      {
        slug: "biotechnologist",
        text: "Program automated bioreactor fermenters growing therapeutic monoclonal antibodies for oncology treatments.",
        reason: "Bioprocess engineering, cell culture bioreactors, and monoclonal antibody production define biotechnology."
      },
      {
        slug: "environmental-scientist",
        text: "Monitor urban ambient air quality sensors measuring airborne particulate matter PM2.5 lung penetration.",
        reason: "Atmospheric aerosol monitoring, particulate toxicology, and urban air quality define environmental science."
      },
      {
        slug: "environmental-scientist",
        text: "Restore degraded mangrove salt marsh ecosystems to naturally absorb coastal cyclone storm energy.",
        reason: "Coastal ecosystem ecological restoration and blue-carbon wetland conservation define environmental science."
      },
      {
        slug: null,
        text: "Formulate sterile lipid nanoparticle carrier capsules for targeted cancer drug delivery.",
        reason: "Nanoparticle formulation chemistry connects biotechnology and pharmaceutical science.",
        adjWeights: { "pharmacist": 1 }
      },
      {
        slug: null,
        text: "Design solar-powered water filtration units purifying arsenic-contaminated well water in villages.",
        reason: "Potable water purification engineering connects environmental science and mechanical engineering.",
        adjWeights: { "mechanical-engineer": 1 }
      }
    ],
    q3: [
      {
        slug: "biotechnologist",
        text: "Sequence microbial gut genomes to engineer personalized probiotic therapies for inflammatory bowel disease.",
        reason: "Metagenomic sequencing and microbiome therapeutic engineering define specialized biotechnology."
      },
      {
        slug: "environmental-scientist",
        text: "Quantify soil carbon sequestration rates in regenerative agriculture farms using isotope spectroscopy.",
        reason: "Soil biogeochemistry, regenerative carbon accounting, and isotope analysis define environmental scientists."
      },
      {
        slug: null,
        text: "Evaluate clinical genetic screening reports explaining hereditary cancer risks to patient families.",
        reason: "Clinical genetic counseling connects biotechnology and medical diagnosis.",
        adjWeights: { "doctor": 1 }
      },
      {
        slug: null,
        text: "Analyze meteorological wind current data predicting seasonal dust storm trajectories across states.",
        reason: "Atmospheric meteorological tracking connects environmental science and climate analysis.",
        adjWeights: { "environmental-scientist": 1 }
      },
      {
        slug: null,
        text: "Design biodegradable fungal mycelium packaging replacing expanded polystyrene styrofoam boxes.",
        reason: "Mycelium biomaterial packaging connects biotechnology and sustainable industrial design.",
        adjWeights: { "designer": 1 }
      },
      {
        slug: null,
        text: "Audit industrial factory effluent pipelines ensuring zero toxic chemical discharge into civic drains.",
        reason: "Civic wastewater compliance connects environmental monitoring and civil municipal works.",
        adjWeights: { "civil-engineer": 1 }
      }
    ],
    q4: [
      {
        slug: "biotechnologist",
        text: "Engineer synthetic enzymes that break down polyethylene plastic ocean waste in hours.",
        reason: "Enzyme protein engineering and enzymatic plastic bioremediation define advanced biotechnology."
      },
      {
        slug: "environmental-scientist",
        text: "Model polar ice sheet glacier melt rates and global sea-level rise trajectories under warming scenarios.",
        reason: "Glaciology climate modeling, sea-level projections, and planetary boundary physics define environmental scientists."
      },
      {
        slug: null,
        text: "Formulate clinical intravenous electrolyte rehydration solutions for severe dehydration clinics.",
        reason: "Clinical fluid formulation connects biotechnology and hospital pharmacy.",
        adjWeights: { "pharmacist": 1 }
      },
      {
        slug: null,
        text: "Draft national carbon emissions cap-and-trade policy frameworks for heavy manufacturing sectors.",
        reason: "Carbon market regulatory frameworks connects environmental science and public administration.",
        adjWeights: { "civil-services": 1 }
      },
      {
        slug: null,
        text: "Optimize enzyme temperature stability inside high-throughput chemical production bioreactors.",
        reason: "Biochemical thermal kinetics connects biotechnology and mechanical engineering.",
        adjWeights: { "biotechnologist": 1 }
      },
      {
        slug: null,
        text: "Investigate groundwater pesticide contamination plumes spreading toward municipal drinking wells.",
        reason: "Hydrogeological contaminant transport modeling connects environmental science and water engineering.",
        adjWeights: { "environmental-scientist": 1 }
      }
    ]
  }
};

console.log("Applying complete pristine symmetric Q1..Q4 bank data across all 11 domains...");

for (const dom of DOMAINS) {
  const filePath = path.join(banksDir, `${dom}.js`);
  const bankModule = await import(`file://${filePath}`);
  const bank = bankModule.default;
  const domData = DOMAIN_Q14_DATA[dom];

  if (!domData) {
    console.log(`No data for ${dom}, skipping`);
    continue;
  }

  // Replace Q1..Q4
  const qKeys = ["q1", "q2", "q3", "q4"];
  for (let i = 0; i < 4; i++) {
    const qKey = qKeys[i];
    const qOptions = domData[qKey];
    const q = bank.questions[i];

    q.options = qOptions.map((optData, idx) => {
      const optId = `${q.id}_opt${idx + 1}`;
      let weights = {};
      if (optData.slug) {
        weights[optData.slug] = 3;
      } else if (optData.adjWeights) {
        // Use the first entry as weight 3
        const entries = Object.entries(optData.adjWeights);
        weights[entries[0][0]] = 3;
      }

      return {
        id: optId,
        text: optData.text,
        weights,
        reason: optData.reason
      };
    });
  }

  const fileContent = `export default ${JSON.stringify(bank, null, 2)};\n`;
  fs.writeFileSync(filePath, fileContent, "utf-8");
  console.log(`Successfully updated ${dom}.js with complete semantic symmetry!`);
}

console.log("All 11 banks updated with mathematically pristine Q1..Q4!");
