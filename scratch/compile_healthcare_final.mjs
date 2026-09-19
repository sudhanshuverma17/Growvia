import fs from 'fs';
import { dentist } from './generate_healthcare.mjs';
import { pharmacist, physiotherapist } from './compile_healthcare_all.mjs';

const nutritionist = [
  {
    investment: {
      time: "2 Years (Class 11-12 with Science/Home Science + nutrition fundamentals)",
      cost: "₹20,000 - ₹60,000 (School tuition & foundational biology/chemistry books)"
    },
    actionItems: [
      {
        task: "Score 50%+ in Class 12 Boards with Biology, Chemistry, or Home Science.",
        detail: "Understand basic macronutrients (carbohydrates, proteins, fats) and micronutrients (vitamins, minerals)."
      },
      {
        task: "Appear for university entrance exams (CUET UG for central universities, state university entrance).",
        detail: "Target premier colleges: Lady Irwin College (DU), SNDT Women's University, Institute of Home Economics, Mount Carmel."
      },
      {
        task: "Read food labels and nutritional fact panels on commercial packaged food products.",
        detail: "Learn to identify hidden sugars, trans-fats, sodium preservatives, and glycemic index values."
      }
    ],
    resources: [
      {
        name: "National Institute of Nutrition (NIN) Hyderabad - ICMR",
        type: "documentation",
        url: "https://www.nin.res.in",
        note: "Apex Indian nutrition research institute formulating the Dietary Guidelines for Indians."
      },
      {
        name: "Food and Agriculture Organization (FAO) Food Composition Database",
        type: "platform",
        url: "https://www.fao.org/infoods",
        note: "Global scientific repository of nutrient composition of foods."
      },
      {
        name: "Nutrition Science by B. Srilakshmi",
        type: "book",
        url: "https://www.newagepublishers.com",
        note: "The classic foundational textbook used across Indian undergraduate nutrition curricula."
      }
    ],
    checkpoint: {
      criteria: "Scoring 80%+ in Class 12 Boards and gaining admission into a recognized B.Sc Nutrition & Dietetics program.",
      deliverable: "Class 12 Marksheet and College Admission Allotment Letter."
    },
    decisionPoints: [
      {
        question: "B.Sc in Clinical Nutrition & Dietetics vs B.Sc in Food Technology",
        options: [
          {
            choice: "B.Sc Clinical Nutrition & Dietetics",
            pros: "Focuses on medical patient disease diets, human metabolism, hospital counseling, direct path to Registered Dietitian (RD).",
            cons: "Less industrial food manufacturing and food engineering focus."
          },
          {
            choice: "B.Sc Food Technology / Food Science",
            pros: "Industrial focus: food preservation, packaging, factory processing, quality assurance in FMCG food brands.",
            cons: "Does not qualify for hospital clinical dietitian licensing."
          }
        ]
      }
    ],
    warning: "Enrolling in short 3-month online certificate courses claiming to make you a 'certified clinical nutritionist': Hospitals strictly require an accredited B.Sc + M.Sc degree and formal hospital internship for clinical hiring.",
    fallbackPlan: "If specialized nutrition college seats are filled, enroll in a general B.Sc Life Sciences / Chemistry and specialize in Food & Nutrition during master's.",
    realWorldStats: [
      {
        label: "Malnutrition & Lifestyle Disease Rate",
        value: "1 in 4 Indian Adults",
        context: "Affected by diabetes, hypertension, or obesity requiring dietary intervention"
      },
      {
        label: "Top College CUET Cutoffs",
        value: "85% - 92% Percentile",
        context: "Admission to Delhi University B.Sc Food & Nutrition programs"
      }
    ]
  },
  {
    investment: {
      time: "3 Years (Undergraduate degree + practical food science labs)",
      cost: "₹1,00,000 - ₹4,00,000 (Tuition fees across university programs)"
    },
    actionItems: [
      {
        task: "Master Human Physiology, Nutritional Biochemistry, Food Microbiology, and Diet Therapy.",
        detail: "Understand the biochemical metabolic pathways of carbs, lipids, proteins, and hormonal regulation of blood sugar."
      },
      {
        task: "Formulate specialized Medical Nutrition Therapy (MNT) diets for clinical conditions.",
        detail: "Calculate precise calories, macros, fluid restrictions, and renal exchanges for Diabetic, Hypertensive, and CKD patients."
      },
      {
        task: "Complete summer hospital internship in a multi-specialty hospital's dietary department.",
        detail: "Calculate enteral (Ryle's tube) and parenteral feeding feeds for ICU and burn ward patients."
      }
    ],
    resources: [
      {
        name: "Krause and Mahan's Food & the Nutrition Care Process",
        type: "book",
        url: "https://www.elsevier.com",
        note: "The international gold standard bible of clinical nutrition and medical nutrition therapy."
      },
      {
        name: "Indian Dietetic Association (IDA) Official Portal",
        type: "documentation",
        url: "https://idaindia.com",
        note: "Apex national body administering the Registered Dietitian (RD) examination and professional standards."
      },
      {
        name: "Dietary Guidelines for Indians (ICMR - NIN)",
        type: "documentation",
        url: "https://www.nin.res.in",
        note: "Official Indian reference guide for Recommended Dietary Allowances (RDA) and daily nutrient requirements."
      }
    ],
    checkpoint: {
      criteria: "Graduating with first-class honors (65%+ aggregate) and successfully completing 100 hours of clinical dietary case studies.",
      deliverable: "Bachelor of Science (B.Sc) in Nutrition & Dietetics Degree Certificate."
    },
    decisionPoints: [
      {
        question: "Hospital Clinical Nutritionist vs Sports & Fitness Nutritionist",
        options: [
          {
            choice: "Hospital Clinical Nutrition",
            pros: "Medical credibility, working alongside physicians and surgeons, high clinical impact on patient recovery.",
            cons: "Conservative starting hospital salaries in early junior years."
          },
          {
            choice: "Sports & Fitness Nutritionist",
            pros: "Lucrative private client consultation fees, working with athletes and fitness enthusiasts, flexible hours.",
            cons: "High reliance on social media personal branding and self-marketing to attract clients."
          }
        ]
      }
    ],
    warning: "Prescribing extreme fad diets (keto, extreme fasting) without checking patient kidney/liver function tests (KFT/LFT): Pushing high-protein or crash diets on undiagnosed kidney patients can trigger acute organ damage.",
    fallbackPlan: "Join wellness and digital healthcare startups (HealthifyMe, Cult.fit, Cure.fit) as an Associate Nutrition Coach managing app subscribers.",
    realWorldStats: [
      {
        label: "Junior Clinical Dietitian Starting Pay",
        value: "₹20,000 - ₹38,000/month",
        context: "Staff dietitians in private multi-specialty hospitals"
      },
      {
        label: "Digital Health Coach Pay",
        value: "₹3.5L - ₹6.5L/yr",
        context: "Tech-enabled preventive healthcare platforms"
      }
    ]
  },
  {
    investment: {
      time: "2 Years (Postgraduate Master of Science degree + mandatory hospital clinical internship)",
      cost: "₹1,00,000 - ₹4,50,000 (Tuition fees across accredited universities)"
    },
    actionItems: [
      {
        task: "Complete M.Sc in Foods & Nutrition, Clinical Nutrition, or Dietetics.",
        detail: "Study advanced clinical nutrition, pediatric nutrition, oncology diets, and epidemiology."
      },
      {
        task: "Complete 6-month full-time clinical dietetic internship in an IDA-recognized multi-specialty hospital (min 200 beds).",
        detail: "Rotate through Nephrology, Cardiology, Gastroenterology, Oncology, and Critical Care ICUs."
      },
      {
        task: "Crack the Registered Dietitian (RD) Examination conducted by the Indian Dietetic Association.",
        detail: "Clear Paper 1 (Physiology, Biochemistry, Microbiology) and Paper 2 (Clinical Nutrition, Diet Therapy, Food Service Management)."
      }
    ],
    resources: [
      {
        name: "IDA Registered Dietitian Examination Study Materials",
        type: "documentation",
        url: "https://idaindia.com/rd-board",
        note: "Official syllabus, previous question papers, and eligibility guidelines for the national RD exam."
      },
      {
        name: "Modern Nutrition in Health and Disease (A. Catharine Ross et al.)",
        type: "book",
        url: "https://www.wolterskluwer.com",
        note: "Authoritative medical textbook covering clinical nutrition in complex systemic pathologies."
      },
      {
        name: "American Society for Nutrition (ASN) Journals",
        type: "platform",
        url: "https://nutrition.org",
        note: "Global scientific research on micronutrient metabolism, clinical trials, and public health nutrition."
      }
    ],
    checkpoint: {
      criteria: "Passing the national Registered Dietitian (RD) exam and completing 6 months of hospital clinical internship.",
      deliverable: "Registered Dietitian (RD) License Certificate issued by the Indian Dietetic Association."
    },
    decisionPoints: [
      {
        question: "Registered Dietitian (RD) License vs Corporate Nutrition / FMCG Food Brand Advisory",
        options: [
          {
            choice: "Registered Dietitian (RD) Clinical Track",
            pros: "Statutory gold-standard license to independently practice clinical dietetics and head hospital departments.",
            cons: "Challenging exam with strict eligibility hurdles and low pass rate."
          },
          {
            choice: "Corporate Food Scientist / Nutrition Specialist (Nestle, Danone, Abbott)",
            pros: "High corporate salary packages (₹8L - ₹16L), regular corporate hours, shaping consumer food products.",
            cons: "Corporate marketing pressure; detached from direct individual patient care."
          }
        ]
      }
    ],
    warning: "Failing to complete the mandatory 6-month internship at an IDA-approved hospital: Unapproved hospital internships will disqualify you from sitting for the national RD examination.",
    fallbackPlan: "Work as an in-house Corporate Wellness Dietitian for IT corporate campuses or multinational insurance companies designing preventive employee health plans.",
    realWorldStats: [
      {
        label: "National RD Exam Pass Rate",
        value: "20% - 25%",
        context: "Rigorous national clinical credentialing filter"
      },
      {
        label: "Total Registered Dietitians in India",
        value: "< 3,000 Certified RDs",
        context: "High elite demand across 70,000+ hospitals in India"
      }
    ]
  },
  {
    investment: {
      time: "1-3 Years independent private practice setup and consulting expansion",
      cost: "₹2,00,000 - ₹8,00,000 (Body composition analyzer machine, clinic interior, digital consulting website)"
    },
    actionItems: [
      {
        task: "Set up a private Nutrition & Lifestyle Clinic equipped with medical-grade Bioelectrical Impedance Analysis (BIA - InBody).",
        detail: "Accurately measure visceral fat, skeletal muscle mass, intracellular water, and basal metabolic rate (BMR)."
      },
      {
        task: "Establish clinical referral partnerships with local Endocrinologists, Gynecologists (PCOS), and Bariatric Surgeons.",
        detail: "Doctors eagerly refer diabetic, thyroid, and gestational diabetes patients to licensed dietitians."
      },
      {
        task: "Scale digital personalized consulting programs for international NRI clients in US, UK, and Gulf countries.",
        detail: "Offer 3-month and 6-month lifestyle reversal programs with weekly video reviews and continuous WhatsApp meal tracking."
      }
    ],
    resources: [
      {
        name: "InBody Medical Body Composition Analyzers",
        type: "tool",
        url: "https://inbody.com",
        note: "Industry-standard clinical BIA machine for precision body fat and muscle distribution tracking."
      },
      {
        name: "Academy of Nutrition and Dietetics (AND)",
        type: "platform",
        url: "https://www.eatright.org",
        note: "World's largest organization of food and nutrition professionals."
      },
      {
        name: "Food Safety and Standards Authority of India (FSSAI) Portal",
        type: "documentation",
        url: "https://www.fssai.gov.in",
        note: "Statutory standards for nutraceuticals, health supplements, and food safety regulations."
      }
    ],
    checkpoint: {
      criteria: "Managing an active roster of 50+ monthly consulting clients with verified health biomarker improvements (HbA1c reduction, fatty liver reversal).",
      deliverable: "Documented client transformation case studies and profitable clinical practice."
    },
    decisionPoints: [
      {
        question: "Private Solo Clinic Practice vs Launching D2C Nutraceutical / Health Food Brand",
        options: [
          {
            choice: "Private Solo Clinical Practice",
            pros: "Low operational overhead, zero inventory risk, pure high-margin consulting service income.",
            cons: "Revenue is directly tied to your personal consulting hours."
          },
          {
            choice: "Launching D2C Functional Food / Supplement Brand",
            pros: "Scalable product revenue, potential to raise venture capital, building equity value.",
            cons: "High inventory costs, FSSAI regulatory compliance, fierce competition in supplement space."
          }
        ]
      }
    ],
    warning: "Diagnosing medical conditions or altering prescription medications (like insulin or statins): Dietitians are nutrition experts, not physicians; always co-manage medications in writing with the patient's treating doctor.",
    fallbackPlan: "Serve as Chief Clinical Dietitian at a premier corporate hospital or Head of Nutrition for national sports authorities (SAI) and Olympic athletes.",
    realWorldStats: [
      {
        label: "Established Private Practice Income",
        value: "₹1.5L - ₹4.5L+/month",
        context: "Senior Registered Dietitians with private client base"
      },
      {
        label: "Monthly Consultation Package Rate",
        value: "₹3,000 - ₹12,000 / Month",
        context: "Personalized clinical lifestyle coaching packages in Indian metros"
      }
    ]
  }
];

const biotechnologist = [
  {
    investment: {
      time: "2 Years (Class 11-12 PCB stream + competitive entrance prep)",
      cost: "₹30,000 - ₹90,000 (School tuition & foundational biology books)"
    },
    actionItems: [
      {
        task: "Master Class 11-12 Genetics, Cell Biology, and Biomolecules in NCERT Biology.",
        detail: "Mendelian genetics, DNA replication, transcription, translation, and enzyme kinetics form the bedrock of biotechnology."
      },
      {
        task: "Appear for engineering and science entrance exams: JEE Main, CUET-UG, or state entrance tests.",
        detail: "Target premier institutes: IIT Delhi/Roorkee/Kharagpur (Biochemical Engg), NITs, ICT Mumbai, and Anna University."
      },
      {
        task: "Explore bioinformatics software and biological databases (NCBI, PubMed, BLAST, PDB).",
        detail: "Learn how nucleotide and protein sequences are searched, aligned, and structurally modeled."
      }
    ],
    resources: [
      {
        name: "NCBI (National Center for Biotechnology Information)",
        type: "platform",
        url: "https://www.ncbi.nlm.nih.gov",
        note: "The world's primary repository for genomic data, BLAST alignment tools, and biomedical literature."
      },
      {
        name: "Department of Biotechnology (DBT) Government of India",
        type: "documentation",
        url: "https://dbtindia.gov.in",
        note: "Central government department promoting biotechnology research, scholarships, and biomanufacturing hubs."
      },
      {
        name: "Molecular Biology of the Cell (Alberts et al.)",
        type: "book",
        url: "https://www.garlandscience.com",
        note: "The international masterpiece textbook on cell structure, signaling pathways, and genetics."
      }
    ],
    checkpoint: {
      criteria: "Scoring 85%+ in Class 12 Boards and securing admission into a recognized B.Tech or B.Sc Biotechnology program.",
      deliverable: "Class 12 Passing Marksheet and College Admission Allotment Letter."
    },
    decisionPoints: [
      {
        question: "B.Tech in Biotechnology vs B.Sc in Biotechnology",
        options: [
          {
            choice: "B.Tech in Biotechnology (4 Years - Engineering)",
            pros: "Covers bioprocess engineering, bioreactor design, thermodynamics, and high corporate campus placement.",
            cons: "Requires mathematics in 12th board; heavier quantitative engineering syllabus."
          },
          {
            choice: "B.Sc in Biotechnology (3 Years - Pure Science)",
            pros: "Focuses purely on genetics, molecular biology, microbiology, and wet-lab techniques.",
            cons: "Must complete an M.Sc to secure meaningful scientific industry or research employment."
          }
        ]
      }
    ],
    warning: "Expecting high-paying wet-lab research jobs with just a 3-year B.Sc degree: In life sciences, an undergraduate degree is merely foundational; commercial R&D requires at least an M.Sc, M.Tech, or PhD.",
    fallbackPlan: "If top biotech institutes are missed, enroll in B.Sc Microbiology, Biochemistry, or Genetics; core wet-lab techniques are identical.",
    realWorldStats: [
      {
        label: "Indian Bioeconomy Value",
        value: "$130+ Billion",
        context: "Projected to reach $300B by 2030 (BIRAC Report)"
      },
      {
        label: "Vaccine Manufacturing Share",
        value: "60% of Global Vaccines",
        context: "Manufactured in India (Serum Institute, Bharat Biotech)"
      }
    ]
  },
  {
    investment: {
      time: "3-4 Years (Undergraduate degree + 15 hrs/week molecular biology labs)",
      cost: "₹1,50,000 - ₹8,00,000 (Tuition fees across accredited universities)"
    },
    actionItems: [
      {
        task: "Master essential recombinant DNA laboratory techniques: PCR, Gel Electrophoresis, Western Blotting, and Plasmid Cloning.",
        detail: "Isolate genomic and plasmid DNA, perform restriction digestion, ligate vectors, and transform E. coli competent cells."
      },
      {
        task: "Operate industrial bioreactors and downstream purification systems (FPLC / Chromatography).",
        detail: "Optimize cell culture growth kinetics, dissolved oxygen, pH control, and harvest therapeutic proteins."
      },
      {
        task: "Learn Python and R for Computational Biology and Next-Generation Sequencing (NGS) analysis.",
        detail: "Analyze RNA-Seq gene expression data, differential expression, and structural protein docking (AutoDock)."
      }
    ],
    resources: [
      {
        name: "Principles of Gene Manipulation and Genomics (Primrose & Twyman)",
        type: "book",
        url: "https://www.wiley.com",
        note: "Comprehensive textbook covering cloning vectors, recombinant expression systems, and genomics."
      },
      {
        name: "Bioprocess Engineering Principles by Pauline M. Doran",
        type: "book",
        url: "https://www.elsevier.com",
        note: "The definitive guide to bioreactor design, mass transfer, and cell culture kinetics."
      },
      {
        name: "Rosalind Bio-Informatics Problem Solving",
        type: "platform",
        url: "https://rosalind.info",
        note: "Interactive gamified platform for learning computational biology and sequence analysis algorithms."
      }
    ],
    checkpoint: {
      criteria: "Executing a complete recombinant cloning workflow from DNA isolation to recombinant protein expression in bacterial culture.",
      deliverable: "Bachelor's Degree Certificate and documented laboratory project thesis."
    },
    decisionPoints: [
      {
        question: "Biopharmaceutical Industry (Vaccines, Monoclonal Antibodies) vs Agricultural & Industrial Biotech",
        options: [
          {
            choice: "Biopharma & Therapeutics (Biocon, Dr. Reddy's, Serum Institute)",
            pros: "Highest industry investment, life-saving oncology therapeutics, high export market values.",
            cons: "Strict regulatory scrutiny (US FDA, cGMP); long clinical development timelines."
          },
          {
            choice: "Industrial & Agricultural Biotech (Enzymes, Biofuels, GM Crops)",
            pros: "Fast commercial turnaround, sustainable green bioeconomy, huge demand in fermentation (Novozymes).",
            cons: "Public controversies surrounding genetically modified organisms (GMOs)."
          }
        ]
      }
    ],
    warning: "Contaminating bacterial cultures through poor aseptic technique: A single bacterial spore contamination ruins an entire 5,000-liter bioreactor batch, costing the company millions.",
    fallbackPlan: "Work as an Application Specialist or Technical Sales Specialist for life science equipment vendors (Thermo Fisher, Bio-Rad, Merck Millipore).",
    realWorldStats: [
      {
        label: "Junior Biotech Analyst CTC",
        value: "₹4L - ₹8L/yr",
        context: "B.Tech/M.Sc campus hires in Indian biopharma hubs"
      },
      {
        label: "Bioprocess Fermentation Volume",
        value: "Up to 50,000 Liters",
        context: "Scale of commercial industrial bioreactors"
      }
    ]
  },
  {
    investment: {
      time: "2 Years (Master of Science / Master of Technology degree + thesis)",
      cost: "₹1,00,000 - ₹4,00,000 (Subsidized by DBT/MHRD monthly stipend of ₹12,400/mo for GATE/GAT-B)"
    },
    actionItems: [
      {
        task: "Crack GATE-BT (Biotechnology) or GAT-B (Graduate Aptitude Test - Biotechnology) with top ranks.",
        detail: "Secure admission into premier programs: IITs, JNU, ICT Mumbai, and earn central government monthly stipends."
      },
      {
        task: "Master mammalian cell culture (CHO cells) and monoclonal antibody (mAb) expression.",
        detail: "CHO (Chinese Hamster Ovary) cell lines manufacture 70%+ of the world's commercial therapeutic biologics."
      },
      {
        task: "Publish original research on CRISPR/Cas9 gene editing, metabolic engineering, or biocatalysis.",
        detail: "Design guide RNAs, execute knockouts, and publish in peer-reviewed scientific journals."
      }
    ],
    resources: [
      {
        name: "Biotechnology and Biological Sciences Research Council (BBSRC)",
        type: "platform",
        url: "https://www.ukri.org/councils/bbsrc",
        note: "Global benchmark research and funding council in biological and biotechnological sciences."
      },
      {
        name: "Culture of Animal Cells: A Manual of Basic Technique (Freshney)",
        type: "book",
        url: "https://www.wiley.com",
        note: "The international gold standard manual for sterile mammalian cell culture and cryopreservation."
      },
      {
        name: "Nature Biotechnology Journal",
        type: "platform",
        url: "https://www.nature.com/nbt",
        note: "The highest-impact commercial biotechnology research journal in the world."
      }
    ],
    checkpoint: {
      criteria: "Passing M.Tech / M.Sc thesis defense and successfully expressing a functional recombinant antibody or therapeutic enzyme.",
      deliverable: "Master's Degree Certificate and verified Scopus-indexed research publication."
    },
    decisionPoints: [
      {
        question: "Corporate Biopharma R&D vs Pursuing a PhD (Doctor of Philosophy)",
        options: [
          {
            choice: "Corporate Biopharma Industry (Scientist Track)",
            pros: "Immediate handsome salary (₹7L - ₹14L), solving commercial manufacturing hurdles, fast corporate climb.",
            cons: "Projects determined by corporate patent expiry rather than pure scientific curiosity."
          },
          {
            choice: "Pursue PhD (Academia / Frontier Research Labs)",
            pros: "Intellectual freedom, deep discovery, authoring patents, mandatory for Principal Scientist roles globally.",
            cons: "4-5 years of low doctoral stipends and high thesis publication pressure."
          }
        ]
      }
    ],
    warning: "Working in labs without strict Bio-Safety Level (BSL-2 / BSL-3) compliance: Inadequate safety precautions when handling viral vectors or pathogenic cultures poses severe personal health hazards.",
    fallbackPlan: "Transition into Patent Analytics or Life Sciences Intellectual Property (IP) firms drafting patent applications for global drug discovery firms.",
    realWorldStats: [
      {
        label: "GAT-B DBT Monthly Stipend",
        value: "₹12,000/month",
        context: "Provided by Government of India to all GAT-B qualified students"
      },
      {
        label: "R&D Scientist Starting Pay",
        value: "₹6.5L - ₹14L/yr",
        context: "Fresh M.Tech / M.Sc graduates entering biopharma R&D"
      }
    ]
  },
  {
    investment: {
      time: "4-6 Years (PhD / Senior Principal Scientist / Bioprocess Director trajectory)",
      cost: "₹0 (Doctoral research funded by CSIR-JRF / DBT-JRF fellowship of ₹37,000 - ₹42,000/mo + HRA)"
    },
    actionItems: [
      {
        task: "Earn CSIR-UGC NET JRF or DBT-JRF fellowship with Top 100 national rank.",
        detail: "Secure fully funded doctoral research fellowship at premier national labs (CCMB, NCL, IGIB, IISc)."
      },
      {
        task: "Lead translational biotechnology research: Synthetic Biology, CAR-T Cell Therapies, or mRNA Vaccines.",
        detail: "Design cell therapies for clinical trials and publish in high-impact international journals (Nature, Cell, PNAS)."
      },
      {
        task: "Serve as Principal Scientist or Bioprocess Director overseeing pilot-plant technology transfers.",
        detail: "Scale lab bench experiments (2L) to commercial manufacturing bioreactors (5,000L) complying with global ICH guidelines."
      }
    ],
    resources: [
      {
        name: "CSIR - Centre for Cellular and Molecular Biology (CCMB)",
        type: "platform",
        url: "https://www.ccmb.res.in",
        note: "India's premier national research institution for molecular biology, genetics, and biotechnology."
      },
      {
        name: "BIRAC (Biotechnology Industry Research Assistance Council)",
        type: "platform",
        url: "https://birac.nic.in",
        note: "Public enterprise empowering biotech startups through BIG grants, seed funding, and bio-incubators."
      },
      {
        name: "BioProcess International Magazine",
        type: "platform",
        url: "https://bioprocessintl.com",
        note: "Industry intelligence on biomanufacturing scaleup, continuous processing, and single-use technologies."
      }
    ],
    checkpoint: {
      criteria: "Awarded PhD in Biotechnology and filing at least 1 granted international patent or commercializing a recombinant biologic.",
      deliverable: "Doctor of Philosophy (PhD) Degree Certificate and registered commercial patent documentation."
    },
    decisionPoints: [
      {
        question: "Postdoctoral Fellowship Abroad (US/EU) vs Commercial Bio-Entrepreneurship (Founding a Biotech Startup)",
        options: [
          {
            choice: "Postdoctoral Research Abroad (Harvard, MIT, Max Planck)",
            pros: "Cutting-edge genomic technology, global academic prestige, gateway to US/European faculty or biotech tenure.",
            cons: "Temporary contract positions lasting 3-6 years before securing permanent faculty posts."
          },
          {
            choice: "Founding a Biotech Startup (with BIRAC BIG Grant)",
            pros: "Government grant funding up to ₹50 Lakhs equity-free, creating proprietary drugs, immense wealth upside.",
            cons: "High biological failure rates in clinical trials; long capital-intensive incubation (5-7 years)."
          }
        ]
      }
    ],
    warning: "Failing to protect intellectual property before public disclosure: Presenting your experimental data at a conference before filing a provisional patent permanently forfeits your commercial patent rights globally.",
    fallbackPlan: "Serve as a Regulatory Affairs Director or Chief Scientific Officer (CSO) at established biopharmaceutical corporations.",
    realWorldStats: [
      {
        label: "CSIR JRF Monthly Fellowship",
        value: "₹37,000 + 24% HRA",
        context: "Monthly government stipend paid to doctoral research scholars"
      },
      {
        label: "Principal Scientist CTC",
        value: "₹25L - ₹60L+/yr",
        context: "Senior R&D leaders in Indian biopharma enterprises"
      }
    ]
  }
];

const environmentalScientist = [
  {
    investment: {
      time: "2 Years (High school science education + environmental awareness)",
      cost: "₹20,000 - ₹60,000 (Schooling & science textbooks)"
    },
    actionItems: [
      {
        task: "Score 50%+ in Class 12 Boards with Physics, Chemistry, and Biology or Mathematics.",
        detail: "Environmental science requires interdisciplinary science: chemical reactions, ecology, and fluid mechanics."
      },
      {
        task: "Read IPCC (Intergovernmental Panel on Climate Change) synthesis reports and COP climate summits.",
        detail: "Understand greenhouse gas emissions, carbon cycle, biodiversity loss, and Paris Agreement targets."
      },
      {
        task: "Participate in local ecology preservation drives, water quality testing, or municipal solid waste audits.",
        detail: "Understand community-level air quality (PM2.5, PM10) and wastewater treatment challenges."
      }
    ],
    resources: [
      {
        name: "Intergovernmental Panel on Climate Change (IPCC) Reports",
        type: "documentation",
        url: "https://www.ipcc.ch",
        note: "The United Nations body for assessing the science related to global climate change."
      },
      {
        name: "Central Pollution Control Board (CPCB) India",
        type: "documentation",
        url: "https://cpcb.nic.in",
        note: "Statutory national organization monitoring air, water, and industrial environmental standards."
      },
      {
        name: "Environmental Science: Toward a Sustainable Future (Wright & Boorse)",
        type: "book",
        url: "https://www.pearson.com",
        note: "Comprehensive global textbook on ecosystems, biodiversity, atmospheric chemistry, and energy."
      }
    ],
    checkpoint: {
      criteria: "Scoring 80%+ in 12th Board Science and gaining admission to an accredited B.Sc Environmental Science program.",
      deliverable: "Class 12 Passing Marksheet and University Admission Letter."
    },
    decisionPoints: [
      {
        question: "B.Sc in Environmental Science vs B.Tech in Environmental Engineering",
        options: [
          {
            choice: "B.Tech in Environmental Engineering",
            pros: "Focus on wastewater treatment plant design, air scrubbers, sewage hydraulics, high corporate industrial demand.",
            cons: "Heavier mathematics, fluid mechanics, and civil engineering curriculum."
          },
          {
            choice: "B.Sc in Environmental Science",
            pros: "Broad ecology focus, conservation biology, climate policy, and environmental chemistry.",
            cons: "Requires a Master's degree to command senior consulting and regulatory roles."
          }
        ]
      }
    ],
    warning: "Viewing environmental science as purely theoretical activism: Industry environmental scientists do hard quantitative work: calculating flue gas emissions, chemical oxygen demand (COD), and regulatory compliance.",
    fallbackPlan: "Enroll in B.Sc Chemistry, Botany, or Geology; these foundational disciplines transition seamlessly into environmental science master's programs.",
    realWorldStats: [
      {
        label: "ESG & Climate Tech Investment",
        value: "$60+ Billion Annually",
        context: "Global venture and corporate capital dedicated to sustainability"
      },
      {
        label: "Mandatory Corporate BRSR Filings",
        value: "Top 1,000 Listed Companies",
        context: "Mandated by SEBI to report environmental and sustainability metrics in India"
      }
    ]
  },
  {
    investment: {
      time: "3 Years (Undergraduate degree + laboratory and field sampling)",
      cost: "₹1,00,000 - ₹4,00,000 (Tuition fees across accredited universities)"
    },
    actionItems: [
      {
        task: "Master laboratory water quality testing: Biological Oxygen Demand (BOD), Chemical Oxygen Demand (COD), pH, and heavy metals.",
        detail: "Perform titration, spectrophotometry, and atomic absorption spectroscopy (AAS) on industrial effluent samples."
      },
      {
        task: "Learn GIS (Geographic Information Systems) and Remote Sensing using QGIS or ArcGIS.",
        detail: "Analyze satellite imagery (Sentinel, Landsat) to map deforestation, watershed catchments, and urban heat islands."
      },
      {
        task: "Study Indian Environmental Laws: Environment (Protection) Act 1986, Air Act 1981, Water Act 1974, and NGT judgements.",
        detail: "Understand industrial Consent to Establish (CTE) and Consent to Operate (CTO) statutory clearances."
      }
    ],
    resources: [
      {
        name: "Standard Methods for the Examination of Water and Wastewater (APHA)",
        type: "book",
        url: "https://www.standardmethods.org",
        note: "The international authoritative manual for water and effluent analytical laboratory techniques."
      },
      {
        name: "QGIS Open Source Geographic Information System",
        type: "tool",
        url: "https://qgis.org",
        note: "The premier open-source GIS platform used for environmental mapping and spatial analysis."
      },
      {
        name: "Centre for Science and Environment (CSE India)",
        type: "platform",
        url: "https://www.cseindia.org",
        note: "India's leading public interest research and environmental policy advocacy think tank (Down To Earth)."
      }
    ],
    checkpoint: {
      criteria: "Conducting an independent environmental water/air quality monitoring study and generating a spatial GIS pollution map.",
      deliverable: "Bachelor of Science (B.Sc) Degree Certificate and verified GIS spatial research report."
    },
    decisionPoints: [
      {
        question: "Environmental Testing Laboratory (Field Sampling) vs GIS & Remote Sensing Analyst",
        options: [
          {
            choice: "GIS & Remote Sensing Track",
            pros: "Clean tech desk work, global remote job opportunities, strong application in forestry and urban planning.",
            cons: "Detached from hands-on biological sampling and chemical testing."
          },
          {
            choice: "Environmental Laboratory Analyst (Field Work)",
            pros: "Hands-on chemical analysis, industrial factory inspections, direct regulatory compliance monitoring.",
            cons: "Physically demanding field sampling around industrial chimneys and polluted water drains."
          }
        ]
      }
    ],
    warning: "Falsifying environmental test results to please factory clients: Submitting fraudulent effluent test reports to State Pollution Control Boards is a severe criminal offense leading to lab license cancellation.",
    fallbackPlan: "Work as an Environmental Health & Safety (EHS) Officer at manufacturing plants, ensuring factory worker safety and statutory waste compliance.",
    realWorldStats: [
      {
        label: "Junior Environmental Analyst CTC",
        value: "₹3.5L - ₹6.5L/yr",
        context: "Starting salaries in environmental laboratories and consulting firms"
      },
      {
        label: "National Green Tribunal (NGT) Fines",
        value: "Up to ₹100+ Crores",
        context: "Penalties imposed on polluting municipal bodies and industrial units"
      }
    ]
  },
  {
    investment: {
      time: "2 Years (Master of Science / Master of Technology degree + EIA internship)",
      cost: "₹1,00,000 - ₹3,50,000 (Tuition fees across accredited universities)"
    },
    actionItems: [
      {
        task: "Crack UGC-NET / GATE to secure admission into premier environmental postgraduate programs (JNU, TERI SAS, IITs).",
        detail: "Study environmental toxicology, environmental modeling, climate change adaptation, and life cycle assessment (LCA)."
      },
      {
        task: "Master Environmental Impact Assessment (EIA) methodology and public hearing procedures.",
        detail: "Prepare baseline environmental monitoring reports for mining, highway, infrastructure, and real estate projects."
      },
      {
        task: "Learn Life Cycle Assessment (LCA) software (SimaPro, openLCA) and Carbon Footprinting protocols (GHG Protocol).",
        detail: "Calculate Scope 1, Scope 2, and Scope 3 greenhouse gas emissions across corporate supply chains."
      }
    ],
    resources: [
      {
        name: "TERI School of Advanced Studies (TERI SAS)",
        type: "documentation",
        url: "https://www.terisas.ac.in",
        note: "India's premier specialized university dedicated to sustainable development, energy, and environment."
      },
      {
        name: "Ministry of Environment, Forest and Climate Change (MoEFCC) Parivesh Portal",
        type: "documentation",
        url: "https://parivesh.nic.in",
        note: "Single-window clearance hub for Environmental, Forest, Wildlife, and CRZ clearances in India."
      },
      {
        name: "GHG Protocol Corporate Standard",
        type: "documentation",
        url: "https://ghgprotocol.org",
        note: "The global accounting standard for measuring and managing enterprise greenhouse gas emissions."
      }
    ],
    checkpoint: {
      criteria: "Contributing to an accredited Environmental Impact Assessment report submitted for MoEFCC clearance.",
      deliverable: "Master of Science (M.Sc) Degree Certificate and completed EIA Baseline Monitoring Chapter."
    },
    decisionPoints: [
      {
        question: "Corporate Sustainability & ESG Consulting (Big 4 / ERM) vs Government Pollution Control Board",
        options: [
          {
            choice: "Corporate ESG & Sustainability Consulting (ERM, Deloitte, EY, PwC)",
            pros: "Air-conditioned corporate offices, high starting salary (₹7L - ₹14L), global ESG reporting frameworks.",
            cons: "High-pressure client deadlines; consulting decks rather than ecological field conservation."
          },
          {
            choice: "State / Central Pollution Control Board (SPCB / CPCB)",
            pros: "Government authority, statutory inspection powers, pension and job security.",
            cons: "Subject to bureaucratic procedures and political pressures from industrial lobbies."
          }
        ]
      }
    ],
    warning: "Copy-pasting baseline ecological data in EIA reports: MoEFCC expert appraisal committees blacklist environmental consulting firms caught plagiarizing ecological survey data.",
    fallbackPlan: "Transition into Carbon Offset Verification and Renewable Energy Project Development (solar/wind carbon credit auditing).",
    realWorldStats: [
      {
        label: "ESG Consultant Starting CTC",
        value: "₹6.5L - ₹13L/yr",
        context: "Offered by Big 4 and global sustainability consultancies"
      },
      {
        label: "EIA Mandate Threshold",
        value: "Category A & B Projects",
        context: "Statutory mandatory clearance required before breaking ground in India"
      }
    ]
  },
  {
    investment: {
      time: "3-6 Years (NABET accredited EIA Coordinator to Sustainability Director)",
      cost: "₹50,000 - ₹1,50,000 (NABET accreditation fees, certified Sustainability Practitioner credentials)"
    },
    actionItems: [
      {
        task: "Attain NABET (National Accreditation Board for Education and Training) accreditation as an EIA Coordinator (EC) / Functional Area Expert (FAE).",
        detail: "Fulfill statutory criteria to legally sign off on Environmental Clearance documents submitted to the Government of India."
      },
      {
        task: "Lead Enterprise Net-Zero and Decarbonization roadmaps for industrial conglomerates (Tata Steel, Reliance, Aditya Birla).",
        detail: "Architect Science-Based Targets (SBTi), carbon capture utilization (CCUS), and circular economy supply chains."
      },
      {
        task: "Present before State and National Expert Appraisal Committees (SEAC / EAC) for environmental clearances.",
        detail: "Defend environmental management plans (EMP), air dispersion modeling (AERMOD), and public hearing compliance."
      }
    ],
    resources: [
      {
        name: "Quality Council of India (QCI) - NABET EIA Accreditation Scheme",
        type: "documentation",
        url: "https://nabet.qci.org.in",
        note: "Statutory body accrediting EIA consultant organizations and functional area experts in India."
      },
      {
        name: "Science Based Targets initiative (SBTi)",
        type: "platform",
        url: "https://sciencebasedtargets.org",
        note: "Global standard enabling corporate enterprises to set verified emissions reduction targets in line with climate science."
      },
      {
        name: "Task Force on Climate-related Financial Disclosures (TCFD)",
        type: "documentation",
        url: "https://www.fsb-tcfd.org",
        note: "International guidelines on disclosing climate-related risks and financial opportunities to investors."
      }
    ],
    checkpoint: {
      criteria: "Successfully securing statutory Environmental Clearance for a major national infrastructure/industrial project as certified EIA Coordinator.",
      deliverable: "Official MoEFCC Environmental Clearance Letter and approved Environmental Management Plan."
    },
    decisionPoints: [
      {
        question: "Chief Sustainability Officer (CSO) at Enterprise Conglomerate vs Partner at Global Environmental Advisory",
        options: [
          {
            choice: "Chief Sustainability Officer (In-House Corporate CSO)",
            pros: "Direct board-level influence over corporate capital expenditure, driving genuine corporate green transition.",
            cons: "Can face internal pushback when environmental goals conflict with short-term profit margins."
          },
          {
            choice: "Partner / Director at Global Environmental Consultancy (ERM, Jacobs, AECOM)",
            pros: "Revenue sharing on multi-million dollar advisory contracts, working across global green infrastructure.",
            cons: "High business development pressure and continuous client acquisition targets."
          }
        ]
      }
    ],
    warning: "Engaging in 'Greenwashing': Making false or exaggerated corporate environmental claims without verifiable data brings severe regulatory penalties and brand destruction.",
    fallbackPlan: "Serve as an independent Expert Member on State Environmental Impact Assessment Authorities (SEIAA) or United Nations Development Programme (UNDP) climate consultant.",
    realWorldStats: [
      {
        label: "Chief Sustainability Officer Salary",
        value: "₹50L - ₹1.4 Cr+/yr",
        context: "Senior ESG and sustainability leadership at Indian BSE 100 conglomerates"
      },
      {
        label: "NABET Accredited Expert Daily Fee",
        value: "₹25,000 - ₹60,000/day",
        context: "Consulting retainers for accredited EIA Coordinators"
      }
    ]
  }
];

const psychologist = [
  {
    investment: {
      time: "2 Years (Class 11-12 with Psychology/Humanities/Science + reading)",
      cost: "₹20,000 - ₹60,000 (School tuition & psychology reference books)"
    },
    actionItems: [
      {
        task: "Excel in Class 11-12 with Psychology, Biology, or Humanities stream.",
        detail: "Build strong foundational understanding of psychological processes: sensation, perception, learning, memory, and personality theories."
      },
      {
        task: "Score high percentiles in CUET-UG (Common University Entrance Test).",
        detail: "Target India's premier psychology undergraduate colleges: Lady Shri Ram College (LSR), St. Xavier's Mumbai, Christ University, Fergusson Pune."
      },
      {
        task: "Cultivate active listening, emotional stability, and non-judgmental empathy.",
        detail: "A psychologist's primary diagnostic tool is their own mind and disciplined empathetic presence."
      }
    ],
    resources: [
      {
        name: "Psychology: An Introduction by Robert A. Baron",
        type: "book",
        url: "https://www.pearson.com",
        note: "The quintessential, engaging introductory textbook used across high schools and undergraduate colleges."
      },
      {
        name: "American Psychological Association (APA) Student Resources",
        type: "platform",
        url: "https://www.apa.org",
        note: "World's leading scientific and professional organization representing psychology."
      },
      {
        name: "CrashCourse Psychology (Hank Green on YouTube)",
        type: "course",
        url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtOPRKzVLY0jJY-uHOH9KVU6",
        note: "Engaging visual overview of the brain, mental health conditions, and social psychology."
      }
    ],
    checkpoint: {
      criteria: "Scoring 90%+ in Class 12 Boards and securing admission to an accredited BA / B.Sc Psychology program.",
      deliverable: "Class 12 Passing Marksheet and College Admission Allotment Letter."
    },
    decisionPoints: [
      {
        question: "BA in Psychology vs B.Sc in Psychology",
        options: [
          {
            choice: "B.Sc in Psychology (Neuropsychology & Biological Basis)",
            pros: "Heavier focus on cognitive neuroscience, psychophysiology, neuroanatomy, and statistical research methods.",
            cons: "Requires science stream background in high school at some universities."
          },
          {
            choice: "BA in Psychology (Humanities & Social Context)",
            pros: "Interdisciplinary context: sociology, philosophy, anthropology, strong counseling foundations.",
            cons: "Slightly less exposure to laboratory electroencephalogram (EEG) and neuropsychological instrumentation."
          }
        ]
      }
    ],
    warning: "Assuming a Bachelor's degree in psychology allows you to open a therapy clinic: In India, practicing therapy or clinical diagnosis with only a BA/B.Sc is illegal and unethical; advanced postgraduate training is mandatory.",
    fallbackPlan: "If top psychology colleges have cutoffs above reach, join a recognized university psychology department and build strong research and internship credentials.",
    realWorldStats: [
      {
        label: "Top College CUET Cutoffs",
        value: "98% - 99.5% Percentile",
        context: "LSR and Gargi College BA Psychology (Hons) general admissions"
      },
      {
        label: "Mental Health Professional Deficit in India",
        value: "< 1 Psychologist per 100,000",
        context: "Massive national healthcare shortage"
      }
    ]
  },
  {
    investment: {
      time: "3 Years (Undergraduate degree + psychology lab practicals + social internships)",
      cost: "₹1,00,000 - ₹5,00,000 (Tuition fees across university programs)"
    },
    actionItems: [
      {
        task: "Master core psychology disciplines: Abnormal Psychology, Cognitive Psychology, Developmental Psychology, and Research Methodology.",
        detail: "Understand the biological, psychological, and social etiologies of major mental health conditions."
      },
      {
        task: "Administer standard psychological assessment tools in the psychology laboratory.",
        detail: "Conduct testing using Raven's Progressive Matrices, 16PF Personality Questionnaire, Beck Depression Inventory (BDI), and MMPI."
      },
      {
        task: "Complete observer internships at psychiatric hospitals, special education schools, or NGOs.",
        detail: "Observe clinical case history taking, mental status examinations (MSE), and supportive counseling sessions."
      }
    ],
    resources: [
      {
        name: "Abnormal Psychology by James N. Butcher, Jill M. Hooley, Susan Mineka",
        type: "book",
        url: "https://www.pearson.com",
        note: "The international gold standard textbook on psychopathology, clinical assessment, and therapy."
      },
      {
        name: "Statistics in Psychology and Education (Henry E. Garrett)",
        type: "book",
        url: "https://www.paragonpublishers.com",
        note: "The classic manual for calculating correlation, ANOVA, t-tests, and reliability/validity metrics."
      },
      {
        name: "The Man Who Mistook His Wife for a Hat by Oliver Sacks",
        type: "book",
        url: "https://www.oliversacks.com",
        note: "Fascinating clinical case studies of patients navigating neurological and perceptual disorders."
      }
    ],
    checkpoint: {
      criteria: "Graduating with first-class honors (65%+ aggregate) and completing a laboratory testing portfolio with 10+ standardized psychometric tests.",
      deliverable: "Bachelor of Arts / Science Degree Certificate and documented psychometric testing logbook."
    },
    decisionPoints: [
      {
        question: "Clinical Psychology vs Counseling Psychology vs Industrial-Organizational (I/O) Psychology",
        options: [
          {
            choice: "Clinical Psychology Track",
            pros: "Diagnose and treat severe psychiatric illnesses (bipolar, schizophrenia, PTSD); hospital appointments.",
            cons: "Longest educational path: strictly requires RCI-licensed M.Phil (total 7-8 years of study)."
          },
          {
            choice: "Industrial-Organizational (I/O) Psychology Track",
            pros: "Corporate HR, organizational culture, executive coaching, high corporate salary right after Master's.",
            cons: "Does not involve clinical therapy or treating psychiatric disorders."
          }
        ]
      }
    ],
    warning: "Sharing confidential patient test records or case details on social media: Breaching patient confidentiality is a severe ethical violation that will permanently ruin your professional career.",
    fallbackPlan: "Work as an HR Talent Specialist, User Research (UX) Analyst, or School Counselor while preparing for competitive MA/M.Sc entrance exams.",
    realWorldStats: [
      {
        label: "Undergraduate Psychology Starting Pay",
        value: "₹20,000 - ₹35,000/month",
        context: "Junior positions in wellness centers, NGOs, and human resources"
      },
      {
        label: "Psychological Testing Laboratory Hours",
        value: "100+ Practical Hours",
        context: "Mandatory lab hours required during 3-year degree"
      }
    ]
  },
  {
    investment: {
      time: "2 Years (Postgraduate MA / M.Sc degree + hospital clinical rotations)",
      cost: "₹50,000 (Central University) to ₹4,00,000 (Private University programs)"
    },
    actionItems: [
      {
        task: "Score high ranks in CUET-PG to secure admission into premier MA/M.Sc Psychology departments (Delhi University, TISS Mumbai, Christ, BHU).",
        detail: "Specialize in Clinical Psychology, Counseling Psychology, or Neuropsychology."
      },
      {
        task: "Master the DSM-5-TR (Diagnostic and Statistical Manual) and ICD-11 diagnostic criteria.",
        detail: "Learn differential diagnosis for anxiety disorders, major depressive disorder, personality disorders, and neurodevelopmental conditions."
      },
      {
        task: "Conduct supervised counseling therapy sessions using Cognitive Behavioral Therapy (CBT) and Person-Centered Therapy.",
        detail: "Learn cognitive restructuring, behavioral activation, exposure hierarchies, and suicide risk assessment."
      }
    ],
    resources: [
      {
        name: "DSM-5-TR (Diagnostic and Statistical Manual of Mental Disorders - 5th Ed. Text Revision)",
        type: "documentation",
        url: "https://www.psychiatry.org",
        note: "The international psychiatric classification manual published by the American Psychiatric Association."
      },
      {
        name: "Cognitive Behavior Therapy: Basics and Beyond by Judith S. Beck",
        type: "book",
        url: "https://beckinstitute.org",
        note: "The premier step-by-step practical clinical handbook for conducting evidence-based CBT therapy."
      },
      {
        name: "TISS (Tata Institute of Social Sciences) School of Human Ecology",
        type: "documentation",
        url: "https://www.tiss.edu",
        note: "Premier Indian institution for applied psychology, mental health, and counseling."
      }
    ],
    checkpoint: {
      criteria: "Completing 300+ hours of supervised clinical counseling sessions and submitting an empirical postgraduate research dissertation.",
      deliverable: "Master of Arts / Science (MA/M.Sc) in Psychology Degree Certificate and Supervisor Letter."
    },
    decisionPoints: [
      {
        question: "Counseling Psychologist (MA/M.Sc) vs Clinical Psychologist (RCI Licensed M.Phil)",
        options: [
          {
            choice: "Counseling Psychologist (Practice with Master's Degree)",
            pros: "Can start practicing immediately post-MA in schools, wellness clinics, relationship therapy; no M.Phil needed.",
            cons: "Cannot clinically diagnose psychiatric disorders or use psychodiagnostic batteries for legal/disability certificates."
          },
          {
            choice: "Clinical Psychologist (Pursue RCI M.Phil / Psy.D)",
            pros: "Full statutory clinical license from Rehabilitation Council of India (RCI); work in psychiatric hospitals.",
            cons: "Intense 2-year entrance competition for limited national M.Phil seats (NIMHANS, CIP Ranchi)."
          }
        ]
      }
    ],
    warning: "Practicing therapy without regular personal therapy and clinical supervision: Taking on clients' traumatic experiences without emotional boundaries leads to severe secondary traumatic stress and therapist burnout.",
    fallbackPlan: "Work as an Employee Assistance Program (EAP) Counselor at corporate wellness firms (1to1Help, Mindhouse, Wysa) providing digital counseling.",
    realWorldStats: [
      {
        label: "Counseling Psychologist CTC",
        value: "₹4L - ₹8.5L/yr",
        context: "In-house psychologists at international schools and corporate clinics"
      },
      {
        label: "Therapy Session Charges",
        value: "₹1,200 - ₹3,000 / 50-Min Session",
        context: "Private counseling session rates in Indian tier-1 metros"
      }
    ]
  },
  {
    investment: {
      time: "2 Years (RCI-approved M.Phil in Clinical Psychology / Psy.D program)",
      cost: "₹0 (Subsidized by government monthly stipend of ₹25,000/mo at NIMHANS, CIP Ranchi, LGBRIMH)"
    },
    actionItems: [
      {
        task: "Crack the all-India entrance examination for RCI-recognized M.Phil Clinical Psychology programs.",
        detail: "Compete for ~20-30 seats at premier institutes: NIMHANS Bengaluru, Central Institute of Psychiatry (CIP) Ranchi, and IHBAS Delhi."
      },
      {
        task: "Treat severe psychiatric inpatients and outpatients under consultant psychiatrists.",
        detail: "Administer Rorschach Inkblot Test, WAIS-IV IQ batteries, and neuropsychological tests (NIMHANS Neuropsychology Battery)."
      },
      {
        task: "Obtain formal Registration with the Rehabilitation Council of India (RCI) as a Licensed Clinical Psychologist.",
        detail: "Receive statutory license number granting legal authority to issue clinical diagnostic disability certificates."
      }
    ],
    resources: [
      {
        name: "NIMHANS (National Institute of Mental Health and Neuro Sciences) Bengaluru",
        type: "platform",
        url: "https://nimhans.ac.in",
        note: "Institute of National Importance; the apex centre for mental health and neuroscience in India."
      },
      {
        name: "Rehabilitation Council of India (RCI) Official Portal",
        type: "documentation",
        url: "https://rehabcouncil.nic.in",
        note: "Statutory regulatory body governing professional qualifications and licensing of clinical psychologists."
      },
      {
        name: "Central Institute of Psychiatry (CIP) Ranchi",
        type: "platform",
        url: "https://cipranchi.nic.in",
        note: "Centenary premier national hospital and training institute for psychiatric and clinical psychological sciences."
      }
    ],
    checkpoint: {
      criteria: "Passing M.Phil final clinical practicals, viva-voce, and accepted research dissertation.",
      deliverable: "M.Phil in Clinical Psychology Degree Certificate and RCI Registration Certificate (Licensed Clinical Psychologist)."
    },
    decisionPoints: [
      {
        question: "Hospital Chief Clinical Psychologist vs Private Independent Therapy Practice",
        options: [
          {
            choice: "Hospital / Academic Clinical Psychologist (AIIMS, NIMHANS, Private Hospitals)",
            pros: "Prestige, handling complex clinical neuro-psychiatric referrals, training junior interns, high research grants.",
            cons: "High institutional caseloads (20+ psychiatric patients daily); rigid hospital hours."
          },
          {
            choice: "Private Solo / Group Therapy Practice",
            pros: "Total autonomy over caseload (4-6 clients daily), high hourly fees, flexible working schedule.",
            cons: "Requires business marketing, clinic rental overhead, and personal billing management."
          }
        ]
      }
    ],
    warning: "Prescribing psychiatric medications: In India, only MBBS/MD Psychiatrists can prescribe pharmacological drugs; a Clinical Psychologist uses psychotherapeutic and behavioral interventions; prescribing drugs is illegal.",
    fallbackPlan: "Serve as a Consulting Clinical Psychologist visiting psychiatric nursing homes, rehabilitation centers, and high-court family counseling benches.",
    realWorldStats: [
      {
        label: "NIMHANS M.Phil Acceptance Rate",
        value: "< 1.5%",
        context: "One of the most competitive healthcare entrance filters in India"
      },
      {
        label: "Licensed Clinical Psychologist Private Earnings",
        value: "₹1.5L - ₹4L+/month",
        context: "Established private practitioners in Indian metros"
      }
    ]
  }
];

const allHealthcare = {
  dentist,
  pharmacist,
  physiotherapist,
  nutritionist,
  biotechnologist,
  "environmental-scientist": environmentalScientist,
  psychologist
};

const code = `// Healthcare domain enriched roadmap data
export const healthcareRoadmaps = ${JSON.stringify(allHealthcare, null, 2)};
`;

fs.writeFileSync('./backend/src/data/enriched/healthcare.js', code, 'utf8');
console.log('Successfully written complete backend/src/data/enriched/healthcare.js with 7 roadmaps!');
