export const servicesPart1 = {
  lawyer: [
    {
      year: "Class 11-12",
      title: "Any Stream",
      desc: "Arts/Humanities is advantageous but not mandatory.",
      investment: {
        time: "15-20 hrs/week for CLAT prep alongside board exams",
        cost: "₹30,000 - ₹1,20,000 (CLAT coaching, mock test series, study material)",
        difficulty: "Hard (Intense speed-reading, legal reasoning, and current affairs required)"
      },
      actionItems: [
        "Read editorial pages of 'The Hindu' or 'The Indian Express' daily to cultivate 300+ wpm reading speed and critical analysis",
        "Master CLAT core sections: Legal Reasoning, English Comprehension, Current Affairs & GK, Logical Reasoning, and Quantitative Techniques",
        "Take 40+ full-length CLAT & AILET timed mock tests to build mental stamina for the 2-hour 120-question pattern",
        "Join high school Model United Nations (MUN) or debate societies to build public speaking, argument formulation, and rhetorical structure"
      ],
      resources: [
        { name: "CLAT Consortium Official Mock Tests & Question Bank", type: "practice", url: "https://consortiumofnlus.ac.in", isFree: false },
        { name: "The Hindu Editorial & Opinion Analysis", type: "reading", url: "https://www.thehindu.com", isFree: true },
        { name: "LegalEdge / Career Launcher CLAT Prep Series", type: "course", url: "https://toprankers.com", isFree: false },
        { name: "LiveLaw & Bar and Bench News Portals", type: "tool", url: "https://www.livelaw.in", isFree: true }
      ],
      checkpoint: "Score in the 98+ percentile in CLAT (Rank < 1,500) or 99+ percentile in AILET for NLU Delhi admission.",
      decisionPoints: [
        "National Law Universities (NLUs) vs Private Law Colleges (Symbiosis SLS, Jindal Global Law School, ILS Pune)",
        "5-Year Integrated BA LLB (ideal for litigation/judiciary) vs BBA LLB (ideal for corporate M&A, banking, and finance)"
      ],
      warning: "CLAT is purely a test of comprehension speed and deduction. Memorizing static legal sections without speed comprehension leads to incomplete papers.",
      fallbackPlan: "If top NLUs are missed, target tier-2 NLUs, Symbiosis Law School Pune (SLAT), Christ University, or state universities through MHCET-Law, which also provide strong corporate campus placements.",
      realWorldStats: {
        avgSalary: "₹0 (Prep phase; Top NLU graduates command ₹14 - 20 LPA starting packages)",
        timelineToHire: "5-6 years (post-12th through 5-year integrated law degree)",
        competitionRatio: "1:70 (70,000+ candidates for ~1,000 tier-1 NLU seats)"
      }
    },
    {
      year: "Year 1-5",
      title: "BA LLB / BBA LLB",
      desc: "Integrated 5-year law degree.",
      investment: {
        time: "40-50 hrs/week (academics, moot courts, research papers, internships)",
        cost: "₹12,00,000 - ₹25,00,000 (Tuition, hostel, library fees over 5 years across NLUs/private institutes)",
        difficulty: "Very Hard (Rigorous case-law analysis, continuous moots, journal publications, and high GPA pressure)"
      },
      actionItems: [
        "Participate in national and international moot court competitions (Jessup, Willem C. Vis, Stetson, Bar Council of India Trust)",
        "Publish 3+ research papers in peer-reviewed law journals on corporate governance, securities law, or competition law",
        "Complete mandatory tiered internships: Year 1 (NGO/Human Rights), Year 2 (District Court litigator), Year 3 (High Court/Appellate advocate), Year 4 & 5 (Tier-1 Law Firms like SAM, CAM, Trilegal, Khaitan)",
        "Specialize in high-demand corporate disciplines: Mergers & Acquisitions (M&A), Private Equity, White-Collar Crime, Intellectual Property, or Tax Law"
      ],
      resources: [
        { name: "SCC Online & Manupatra Legal Databases", type: "tool", url: "https://www.scconline.com", isFree: false },
        { name: "Jindal / Harvard Corporate Law Blogs", type: "reading", url: "https://corpgov.law.harvard.edu", isFree: true },
        { name: "Willem C. Vis International Commercial Arbitration Moot", type: "practice", url: "https://www.vismoot.org", isFree: true },
        { name: "Companies Act & SEBI Regulations Handbook by Taxmann", type: "book", url: "https://www.taxmann.com", isFree: false }
      ],
      checkpoint: "Secure a pre-placement offer (PPO) or Day-Zero corporate law firm placement with a top-tier firm during your 4th or 5th year.",
      decisionPoints: [
        "Tier-1 Corporate Law Firm (Shardul Amarchand, Cyril Amarchand, Trilegal, AZB) vs Corporate In-House Counsel vs Chambers Litigation",
        "Transactional Practice (General Corporate, PE, Finance) vs Dispute Resolution (Arbitration, Commercial Litigation)"
      ],
      warning: "Law school grades (GPA) and published legal writing matter significantly. Neglecting grades for too many extracurriculars can disqualify you from Day-Zero law firm shortlists.",
      fallbackPlan: "If tier-1 law firm Day-Zero placement is not attained, target mid-tier boutique law firms, corporate legal departments as in-house trainees, or state public prosecutor and judicial service exams.",
      realWorldStats: {
        avgSalary: "₹14,00,000 - ₹20,00,000/yr (Tier-1 Law Firm starting associate package)",
        timelineToHire: "Day-Zero campus placements (Year 4-5)",
        competitionRatio: "1:8 (Top 10-15% of NLU batch secures Tier-1 corporate law placements)"
      }
    },
    {
      year: "Year 5",
      title: "Bar Council Exam",
      desc: "Clear AIBE to practice.",
      investment: {
        time: "10-15 hrs/week review over 2 months",
        cost: "₹3,500 - ₹5,000 (AIBE registration fee, State Bar Council enrollment fees)",
        difficulty: "Moderate (Open-book / bare-act based examination testing procedural and substantive law)"
      },
      actionItems: [
        "Enroll as an advocate provisionally with your State Bar Council (e.g., Bar Council of Delhi, Bar Council of Maharashtra & Goa)",
        "Appear for and pass the All India Bar Examination (AIBE) within 2 years of provisional enrollment to obtain Certificate of Practice (COP)",
        "Master the use of Bare Acts, Code of Civil Procedure (CPC), Code of Criminal Procedure (CrPC/BNSS), Evidence Act (BSA), and Arbitration & Conciliation Act",
        "Register for e-filing portals across Supreme Court of India, High Courts, and NCLT (National Company Law Tribunal)"
      ],
      resources: [
        { name: "Bar Council of India Official Portal", type: "certification", url: "https://www.barcouncilofindia.org", isFree: false },
        { name: "Universal's Bare Acts Collection", type: "book", url: "https://lexisnexis.in", isFree: false },
        { name: "e-Courts Services Portal & NCLT Portal", type: "tool", url: "https://services.ecourts.gov.in", isFree: true },
        { name: "AIBE Prep Master Question Bank", type: "practice", url: "https://allindiabarexamination.com", isFree: true }
      ],
      checkpoint: "Receive permanent Certificate of Practice (COP) and Bar Council enrollment number.",
      decisionPoints: [
        "Corporate Law firm practice (non-litigation advisory, drafting due diligence) vs Courtroom Litigation practice",
        "Practicing before Specialized Tribunals (NCLT, ITAT, CCI, NGT) vs Traditional Civil/Criminal District & High Courts"
      ],
      warning: "Failure to clear AIBE within 2 years of State Bar Council enrollment will void your provisional license to argue before courts.",
      fallbackPlan: "Continue corporate transactional advisory and contract management where COP is not strictly required for internal drafting, while re-sitting for the next biannual AIBE cycle.",
      realWorldStats: {
        avgSalary: "₹15,00,000 - ₹24,00,000/yr (Tier-1 Associate) / ₹4,00,000 - ₹8,00,000/yr (Independent Litigation)",
        timelineToHire: "1-3 months post graduation",
        competitionRatio: "Pass rate ~60-70% for AIBE"
      }
    },
    {
      year: "Post-grad",
      title: "LLM (Optional)",
      desc: "For specialized knowledge or academia.",
      investment: {
        time: "1-2 years full-time or part-time",
        cost: "₹2,00,000 - ₹5,00,000 (Indian NLUs) / ₹40,00,000 - ₹75,00,000 (Foreign Ivy League / Oxbridge LLM)",
        difficulty: "Hard (Heavy academic research, thesis defense, and cross-border doctrinal jurisprudence)"
      },
      actionItems: [
        "Evaluate necessity: Pursue foreign LLM (Harvard, NYU, Cambridge, LSE) if targeting international cross-border arbitration, Wall Street/London firms, or multilateral bodies",
        "Target specialized domestic/foreign disciplines: International Commercial Arbitration, FinTech & Cyber Law, Competition Law, or Maritime Law",
        "Author and submit an authoritative master's thesis under a recognized international jurist",
        "Sit for qualifying bar exams abroad (New York Bar Exam or England & Wales SQE) if planning global practice"
      ],
      resources: [
        { name: "CLAT PG / AILET PG Official Portals", type: "certification", url: "https://consortiumofnlus.ac.in", isFree: false },
        { name: "New York State Board of Law Examiners (BOLE)", type: "certification", url: "https://www.nybarexam.org", isFree: false },
        { name: "Solicitors Regulation Authority (SQE UK)", type: "certification", url: "https://www.sra.org.uk", isFree: false },
        { name: "Oxford University Comparative Law Research Database", type: "reading", url: "https://www.law.ox.ac.uk", isFree: true }
      ],
      checkpoint: "Attain Senior Associate or Principal Associate status in a law firm, or transition to Global Legal Counsel.",
      decisionPoints: [
        "International Law Firm relocation (London, Singapore, Dubai) vs Equity Partnership track in Indian Law Firms",
        "Executive General Counsel (GC) track in multinational corporations vs Academic tenure / Judicial clerkship"
      ],
      warning: "An LLM is not required for Indian corporate law advancement; 2 years of high-volume deal execution experience at an Indian tier-1 law firm often carries more commercial value than an Indian LLM.",
      fallbackPlan: "Remain in active corporate practice; leverage practical transactional volume, deal accolades, and Chambers & Partners rankings over academic degrees.",
      realWorldStats: {
        avgSalary: "₹35,00,000 - ₹75,00,000+/yr (Senior Associate / Partner track in top tier law firm)",
        timelineToHire: "Direct progression or 3-6 months post-LLM",
        competitionRatio: "1:25 (Partner admission ratio from junior associate pool)"
      }
    }
  ],

  "digital-marketer": [
    {
      year: "Month 1-3",
      title: "Learn the Basics",
      desc: "Google Digital Garage, Meta Blueprint, HubSpot courses.",
      investment: {
        time: "15-20 hrs/week dedicated study",
        cost: "₹0 - ₹10,000 (Free certifications, domain & hosting for portfolio website)",
        difficulty: "Easy to Moderate (Foundational concepts across SEO, SEM, content, and analytics)"
      },
      actionItems: [
        "Complete Google Ads Certifications (Search, Display, Video, Measurement) and Google Analytics 4 (GA4) certification",
        "Earn the HubSpot Inbound Marketing and Content Marketing certifications",
        "Launch a personal WordPress or Ghost blog on a custom domain to practice on-page SEO, schema markup, and meta tags",
        "Learn basic copywriting formulas (AIDA, PAS) and Canva / Figma fundamentals for ad creatives"
      ],
      resources: [
        { name: "Google Skillshop & GA4 Certification", type: "certification", url: "https://skillshop.docebosaas.com", isFree: true },
        { name: "HubSpot Academy Inbound Marketing", type: "course", url: "https://academy.hubspot.com", isFree: true },
        { name: "Meta Certified Digital Marketing Associate", type: "certification", url: "https://www.facebook.com/business/learn/certification", isFree: false },
        { name: "Ahrefs SEO Course for Beginners", type: "video", url: "https://ahrefs.com/academy/seo-training-course", isFree: true }
      ],
      checkpoint: "Have an active WordPress/Ghost website indexed on Google Search Console with GA4 tracking correctly recording events.",
      decisionPoints: [
        "Organic Acquisition (SEO, Content, Social) vs Paid Acquisition (Performance Marketing, Google Ads, Meta Ads)",
        "B2B Demand Generation vs B2C / E-commerce Growth Marketing"
      ],
      warning: "Collecting certificates without managing real ad budgets or ranking real articles will result in failing technical marketing interviews.",
      fallbackPlan: "If self-learning stalls, join a guided cohort-based live program (like GrowthX, UpGrad, or Kraftshala) with guaranteed live capstone client projects.",
      realWorldStats: {
        avgSalary: "₹0 (Learning stage; Entry-level salaries start at ₹3.5 - 6 LPA)",
        timelineToHire: "3-6 months to junior placement",
        competitionRatio: "1:30 for entry-level digital marketing analyst roles"
      }
    },
    {
      year: "Month 3-6",
      title: "Hands-on Practice",
      desc: "Run small campaigns, manage social accounts.",
      investment: {
        time: "20-25 hrs/week hands-on experimentation",
        cost: "₹5,000 - ₹15,000 (Self-funded ad spend for testing campaigns, premium SEO tools)",
        difficulty: "Moderate (Understanding bidding strategies, ROAS, CAC, CTR, and attribution models)"
      },
      actionItems: [
        "Deploy ₹3,000 - ₹5,000 of personal or local business budget on Meta Ads Manager and Google Ads to test A/B creatives and custom audiences",
        "Implement Facebook Pixel / Conversions API (CAPI) and Google Tag Manager (GTM) custom event tags",
        "Perform a comprehensive SEO audit for a local business using Screaming Frog, Ubersuggest, or Ahrefs free webmaster tools",
        "Write 10 high-converting email sequences using Mailchimp, Klaviyo, or Substack with automated welcome funnels"
      ],
      resources: [
        { name: "Google Tag Manager Fundamentals", type: "course", url: "https://analytics.google.com/analytics/academy", isFree: true },
        { name: "Screaming Frog SEO Spider", type: "tool", url: "https://www.screamingfrog.co.uk/seo-spider", isFree: true },
        { name: "Meta Ads Manager Guides & Blueprint", type: "tool", url: "https://business.facebook.com", isFree: true },
        { name: "CXL Performance Marketing Mini-degree", type: "course", url: "https://cxl.com", isFree: false }
      ],
      checkpoint: "Generate quantifiable campaign outcomes: achieve a ROAS > 2.5x on a paid campaign or rank a blog post in Google's Top 5 for a long-tail keyword.",
      decisionPoints: [
        "Specializing in Media Buying / Performance Marketing (high math & data) vs Creative Growth Marketing (hooks, virality, reels)",
        "Specializing in E-Commerce (Shopify, Amazon Ads) vs SaaS / B2B (LinkedIn Ads, Account-Based Marketing)"
      ],
      warning: "Avoid 'boost post' buttons. Real digital marketing happens inside Meta Ads Manager and Google Ads Editor with custom event tracking.",
      fallbackPlan: "Offer free 30-day marketing management to friends, campus clubs, or local retail shops in exchange for verified case study data and testimonials.",
      realWorldStats: {
        avgSalary: "₹3,50,000 - ₹5,50,000/yr (Junior Marketing Executive / SEO Analyst)",
        timelineToHire: "1-2 months after publishing live campaign proofs",
        competitionRatio: "1:20 (Candidates with real ad spend proof stand out immediately)"
      }
    },
    {
      year: "Month 6-12",
      title: "Freelancing / Internship",
      desc: "Real clients = real experience + portfolio.",
      investment: {
        time: "30-40 hrs/week client work and campaign management",
        cost: "₹10,000 - ₹30,000 (Subscriptions to Semrush, Canva Pro, Loom, invoicing tools)",
        difficulty: "Hard (Managing client expectations, deliverables, ad spend burn, and attribution reporting)"
      },
      actionItems: [
        "Cold pitch 30+ SME founders or agencies with a 3-minute personalized Loom video auditing their current ad funnels or website speed/SEO",
        "Acquire 2-3 retained clients or secure a 6-month digital agency internship managing monthly ad budgets exceeding ₹2,00,000",
        "Build live automated reporting dashboards in Looker Studio (Google Data Studio) tracking CAC, CPL, Blended ROAS, and LTV",
        "Draft 3 detailed Notion / PDF case studies breaking down problem, hypothesis, creative testing, data results, and revenue impact"
      ],
      resources: [
        { name: "Google Looker Studio (Data Studio)", type: "tool", url: "https://lookerstudio.google.com", isFree: true },
        { name: "Semrush Academy & SEO Toolkit", type: "tool", url: "https://www.semrush.com/academy", isFree: false },
        { name: "Klaviyo E-Commerce Masterclass", type: "course", url: "https://www.klaviyo.com/academy", isFree: true },
        { name: "GrowthX Community & Frameworks", type: "community", url: "https://growthx.club", isFree: false }
      ],
      checkpoint: "Manage at least ₹5,00,000 cumulative ad spend or drive 50,000+ organic monthly sessions documented in verifiable case studies.",
      decisionPoints: [
        "Agency Side (high learning curve, exposure to multiple industries) vs In-House Brand / Startup (deep product immersion)",
        "Freelance Solopreneurship / Scaling an Agency vs Full-Time Career Progression"
      ],
      warning: "Do not hide behind vanity metrics like impressions and reach. Business founders hire digital marketers to drive verified leads, revenue, and ROAS.",
      fallbackPlan: "If independent client closing is difficult, join a fast-paced boutique performance marketing agency as an apprentice or junior media buyer.",
      realWorldStats: {
        avgSalary: "₹5,00,000 - ₹9,00,000/yr (or ₹40,000 - ₹80,000/month freelance billings)",
        timelineToHire: "Immediate upon delivering successful client audits",
        competitionRatio: "Top 15% of applicants have documented case studies with revenue impact"
      }
    },
    {
      year: "Year 1+",
      title: "Full-time Role",
      desc: "Join a startup, agency, or go full freelance.",
      investment: {
        time: "45-50 hrs/week full-time leadership",
        cost: "₹20,000 - ₹50,000 (Advanced masterclasses, networking communities)",
        difficulty: "Very Hard (Cross-functional alignment with engineering, product, and sales for holistic pipeline growth)"
      },
      actionItems: [
        "Lead omnichannel growth strategy managing monthly ad budgets of ₹10,00,000+ across Google, Meta, Programmatic, and Affiliate channels",
        "Master marketing automation stacks (HubSpot, Marketo, WebEngage, CleverTap) for push, SMS, and lifecycle retention loops",
        "Collaborate with product designers to run conversion rate optimization (CRO) landing page tests using VWO or Optimizely",
        "Recruit, mentor, and lead a squad of content writers, video editors, and media buyers"
      ],
      resources: [
        { name: "Reforge Growth Series & Marketing Strategy", type: "course", url: "https://www.reforge.com", isFree: false },
        { name: "VWO Conversion Optimization Guide", type: "tool", url: "https://vwo.com", isFree: true },
        { name: "CleverTap Retention Masterclass", type: "reading", url: "https://clevertap.com", isFree: true },
        { name: "Demand Curve Growth Newsletter", type: "reading", url: "https://www.demandcurve.com", isFree: true }
      ],
      checkpoint: "Promoted to Growth Lead, Performance Marketing Lead, or Head of Digital Marketing with revenue P&L ownership.",
      decisionPoints: [
        "Chief Marketing Officer (CMO) track vs Starting an independent Performance Marketing Agency",
        "Specialized Growth Consultant / Advisor for venture-backed startups"
      ],
      warning: "Ad platform algorithms and privacy shifts (iOS updates, cookie depreciation) disrupt ad performance overnight. Marketers must build first-party data and brand moats.",
      fallbackPlan: "Diversify expertise into Lifecycle / CRM marketing and product-led growth (PLG) where retention metrics are independent of third-party ad algorithms.",
      realWorldStats: {
        avgSalary: "₹12,00,000 - ₹28,00,000+/yr (Senior Growth Marketer / Head of Marketing)",
        timelineToHire: "1-2 months for experienced growth marketers",
        competitionRatio: "1:5 for proven marketers with verifiable track records of scaling ARR"
      }
    }
  ],

  "army-officer": [
    {
      year: "Class 11-12",
      title: "PCM / Any Stream",
      desc: "NDA requires PCM. CDS is open to all graduates.",
      investment: {
        time: "15-20 hrs/week academic study + 7 hrs/week physical conditioning",
        cost: "₹5,000 - ₹40,000 (Physical training shoes, NCERT books, NDA mock test series)",
        difficulty: "Hard (Balancing class 12 board marks, UPSC syllabus, and physical fitness)"
      },
      actionItems: [
        "Study Physics, Chemistry, and Mathematics (mandatory for NDA Air Force/Navy and highly recommended for Army)",
        "Build foundational stamina: Achieve 2.4 km run in under 10 minutes, 30 push-ups, 40 sit-ups, and 8-10 chin-ups/pull-ups",
        "Read daily news to master General Ability Test (GAT) covering Indian History, Geography, Polity, General Science, and Current Affairs",
        "Practice Officer Intelligence Rating (OIR) verbal and non-verbal reasoning test sets weekly"
      ],
      resources: [
        { name: "UPSC Official NDA Examination Syllabus & Past Papers", type: "practice", url: "https://upsc.gov.in", isFree: true },
        { name: "Pathfinder for NDA & NA by Arihant Publications", type: "book", url: "https://arihantbooks.com", isFree: false },
        { name: "SSBCrack Written Exam & OIR Preparation Guide", type: "tool", url: "https://ssbcrack.com", isFree: true },
        { name: "National Defence Academy Official Portal", type: "reading", url: "https://nda.nic.in", isFree: true }
      ],
      checkpoint: "Clear the UPSC NDA written examination (Cutoff ~350-360 / 900) and receive call letter for SSB Interview.",
      decisionPoints: [
        "NDA direct entry right after Class 12 vs CDS / TGC / AFCAT entry after obtaining a civilian university degree (B.Tech / B.Sc)",
        "Choosing preferred arm of Armed Forces: Indian Army vs Navy vs Air Force"
      ],
      warning: "Medical standards are uncompromising. Uncorrected vision issues, flat feet, knock knees, or ear perforation can cause immediate medical rejection despite passing the written exam.",
      fallbackPlan: "If NDA written or SSB is not cleared, pursue an undergraduate degree (like B.Tech, B.Sc, or BA) and attempt CDS (Combined Defence Services) or AFCAT exams which have higher age limits (up to 24-25 years).",
      realWorldStats: {
        avgSalary: "₹0 (School stage; Cadet stipend in final year is ₹56,100/month)",
        timelineToHire: "4 years of military academy training prior to commission",
        competitionRatio: "1:80 (Around 5,00,000 applicants for ~400 NDA seats per course)"
      }
    },
    {
      year: "After Class 12",
      title: "NDA Exam",
      desc: "Clear NDA written exam + SSB interview for direct entry.",
      investment: {
        time: "Full-time 5-day SSB interview + 2 months focused psychological & GTO prep",
        cost: "₹15,000 - ₹35,000 (SSB coaching / mock obstacle course training, travel)",
        difficulty: "Extremely Hard (5-Day rigorous assessment of 15 Officer Like Qualities / OLQs)"
      },
      actionItems: [
        "Clear Day 1 Screening: Master Picture Perception and Discussion Test (PPDT) with clear narration and collaborative group consensus",
        "Perform in Psychological Tests: Thematic Apperception Test (TAT), Word Association Test (WAT), Situation Reaction Test (SRT), and Self Description (SD)",
        "Excel in Group Testing Officer (GTO) tasks: Progressive Group Task (PGT), Half Group Task (HGT), Command Task, and Snake Race/Group Obstacle Race",
        "Undergo Personal Interview with the Board President, demonstrating integrity, conviction, leadership, and emotional resilience"
      ],
      resources: [
        { name: "SSB Interview: The Complete Guide by Dr. N.K. Natarajan", type: "book", url: "https://jaicobooks.com", isFree: false },
        { name: "Join Indian Army Official Recruitment Portal", type: "tool", url: "https://joinindianarmy.nic.in", isFree: true },
        { name: "Services Selection Board Guidelines & OLQ Assessment", type: "reading", url: "https://upsc.gov.in", isFree: true },
        { name: "Olive Greens Institute SSB Prep Modules", type: "course", url: "https://olivegreens.co.in", isFree: false }
      ],
      checkpoint: "Receive recommendation from the SSB Board and clear the Special Medical Board (SMB) at an Armed Forces hospital.",
      decisionPoints: [
        "Accepting NDA allotment vs Choosing civilian engineering/degree college if placed in reserve merit list",
        "Service selection choice: Infantry, Armoured Corps, Artillery, Signals, Engineers, or Aviation"
      ],
      warning: "Coaching institutes that encourage rehearsed/canned answers are quickly caught by SSB psychologists. The board rewards natural, honest, and decisive problem-solving.",
      fallbackPlan: "If merit list cutoff is missed despite SSB recommendation, prepare immediately for the next UPSC CDS/AFCAT exam or university direct-entry NCC / TGC schemes.",
      realWorldStats: {
        avgSalary: "₹0 (Stipend kicks in at IMA: ₹56,100/month)",
        timelineToHire: "All India Merit List released within 3-4 months after medicals",
        competitionRatio: "1:30 recommendation rate at SSB (Only 2-5 recommended out of ~100 screened-in candidates)"
      }
    },
    {
      year: "Year 1-3",
      title: "NDA Training",
      desc: "3-year joint training at NDA, Pune.",
      investment: {
        time: "24/7 military regimen (academics, physical drills, cross-country runs, weapon training)",
        cost: "₹0 (Government sponsored; uniform and initial pocket deposit of ~₹40,000 refundable)",
        difficulty: "Extremely High (Supreme physical endurance, mental grit, academic rigor for BA/B.Sc/B.Tech degree)"
      },
      actionItems: [
        "Maintain elite physical fitness standards: Clear 10-km squad runs, horse riding, 10-meter diving, and obstacle courses",
        "Complete academic curriculum affiliated with JNU (Jawaharlal Nehru University) for BA, B.Sc, or B.Tech degree",
        "Master weapon handling, fieldcraft, navigation, military map reading, and radio telephony",
        "Participate in squadron inter-battalion sports (boxing, football, cross-country) and military leadership exercises"
      ],
      resources: [
        { name: "National Defence Academy Academy Standing Orders", type: "reading", url: "https://nda.nic.in", isFree: true },
        { name: "JNU Academic Curriculum for NDA Cadets", type: "reading", url: "https://www.jnu.ac.in", isFree: true },
        { name: "Indian Military History & Tactics Compendium", type: "book", url: "https://claws.in", isFree: true },
        { name: "Armed Forces Physical Training Manual", type: "practice", url: "https://joinindianarmy.nic.in", isFree: true }
      ],
      checkpoint: "Successfully complete 6 terms at NDA Khadakwasla, earn the NDA Khukri/trophy and graduate to IMA Dehradun.",
      decisionPoints: [
        "Choosing service corps specialization during final term (Combat Arms: Infantry, Armoured, Mech Inf vs Combat Support Arms: Artillery, Engineers, Signals)",
        "Pursuing competitive academy appointments (Academy Cadet Captain, Battalion Cadet Captain)"
      ],
      warning: "Academic failure or severe disciplinary infractions can lead to being relegated by a term or boarded out of the academy.",
      fallbackPlan: "Cadets medically boarded out due to training injury receive ex-servicemen benefits or disability pensions and specialized civilian rehabilitation counseling.",
      realWorldStats: {
        avgSalary: "Cadet stipend ₹56,100/month (credited during final training year)",
        timelineToHire: "Progresses directly into 1-year IMA training",
        competitionRatio: "Completion rate > 95% for admitted cadets"
      }
    },
    {
      year: "Year 4+",
      title: "IMA Training",
      desc: "1-year officer training at Indian Military Academy, Dehradun.",
      investment: {
        time: "24/7 intense tactical, jungle warfare, and counter-insurgency training",
        cost: "₹0 (Fully sponsored by Ministry of Defence)",
        difficulty: "Extreme (Advanced jungle warfare, tactical night navigation, leadership under fire)"
      },
      actionItems: [
        "Complete advanced counter-insurgency and tactical jungle warfare camp (Camp Pahla Kadam, Camp Shivalik)",
        "Master section and platoon level battle drills, tactical offensive and defensive maneuvers, and live firing drills",
        "Lead Gentlemen Cadets in high-stress simulation exercises evaluating ethical decision-making under intense exhaustion",
        "Pass the final Passing Out Parade (POP), receive commissioning stars as Lieutenant, and take the oath of service to the Constitution of India"
      ],
      resources: [
        { name: "Indian Military Academy Dehradun Official Guide", type: "reading", url: "https://joinindianarmy.nic.in", isFree: true },
        { name: "Indian Army Doctrine & Counter-Insurgency Manuals (CLAWS)", type: "reading", url: "https://claws.in", isFree: true },
        { name: "High Altitude Warfare & Special Forces Tactics", type: "book", url: "https://bharat-rakshak.com", isFree: true },
        { name: "7th Central Pay Commission Defence Pay Matrix", type: "tool", url: "https://mod.gov.in", isFree: true }
      ],
      checkpoint: "Receive the President's Commission as a Lieutenant in the Indian Army with official gazette notification and unit posting.",
      decisionPoints: [
        "Volunteering for Special Forces (Para SF probation) vs Regimental career progression in assigned battalion",
        "Posting choices: Counter-Insurgency (Rashtriya Rifles / J&K / North East) vs High Altitude Border Management (Ladakh, Sikkim)"
      ],
      warning: "Commissioned service demands unwavering discipline and selfless devotion. Physical fitness and integrity are evaluated continuously throughout career promotions.",
      fallbackPlan: "Postings and promotions follow a structured defence career hierarchy (Lieutenant -> Captain -> Major -> Lt Colonel -> Colonel); option to take Short Service Commission release after 10-14 years for corporate security/operations leadership.",
      realWorldStats: {
        avgSalary: "₹12,00,000 - ₹18,00,000/yr (Lieutenant: Basic ₹56,100 + Military Service Pay ₹15,500 + High Altitude / Field Allowances + Ration/Housing)",
        timelineToHire: "Commissioned immediately upon Passing Out Parade",
        competitionRatio: "1:1 among cadets completing IMA training"
      }
    }
  ],

  "civil-engineer": [
    {
      year: "Class 11-12",
      title: "PCM Stream",
      desc: "Physics and Math are critical.",
      investment: {
        time: "20-25 hrs/week dedicated to JEE prep",
        cost: "₹25,000 - ₹1,50,000 (Coaching, mock tests, school tuition)",
        difficulty: "Hard (Rigorous mechanics, calculus, and spatial vectors)"
      },
      actionItems: [
        "Focus on core Classical Mechanics, Statics, Fluid Dynamics, Trigonometry, and Calculus",
        "Solve 10 years of JEE Main and JEE Advanced past question papers with timed test environments",
        "Develop an early understanding of structural design and construction by reviewing architectural and engineering case studies",
        "Score > 75% aggregate in 12th board exams to meet eligibility criteria for IITs/NITs"
      ],
      resources: [
        { name: "Concepts of Physics by H.C. Verma (Vol 1 & 2)", type: "book", url: "https://bharatbharti.in", isFree: false },
        { name: "NTA JEE Main Official Portal", type: "tool", url: "https://jeemain.nta.ac.in", isFree: true },
        { name: "Mohit Tyagi (Competishun) YouTube Channel", type: "video", url: "https://youtube.com/@MohitTyagi", isFree: true },
        { name: "IIT JEE Advanced Past Papers Archive", type: "practice", url: "https://jeeadv.ac.in", isFree: true }
      ],
      checkpoint: "Secure a rank in JEE Main (< 35,000 for top NITs Civil) or JEE Advanced (< 7,000 for top IITs Civil).",
      decisionPoints: [
        "IIT/NIT Civil Engineering vs State Government Engineering Colleges (COEP, VJTI, Jadavpur)",
        "Core Civil Engineering vs Allied Infrastructure disciplines (Environmental, Water Resources, Transportation)"
      ],
      warning: "Overlooking foundational mechanics in physics will make structural analysis and solid mechanics in university engineering extremely difficult.",
      fallbackPlan: "If IIT/NIT ranks are missed, target state engineering entrance exams (MHT-CET, WBJEE, COMEDK) or top government-aided institutions offering accredited civil engineering programs.",
      realWorldStats: {
        avgSalary: "₹0 (School stage; Starting graduate packages range from ₹5 - 10 LPA)",
        timelineToHire: "4 years to B.Tech degree completion",
        competitionRatio: "1:40 for premier government engineering seats"
      }
    },
    {
      year: "Year 1-4",
      title: "B.Tech Civil Engineering",
      desc: "IIT, NIT, or government engineering colleges.",
      investment: {
        time: "35-45 hrs/week (lectures, surveying labs, CAD design, site visits)",
        cost: "₹4,00,000 - ₹10,00,000 (Tuition and hostel across 4 years in NITs/IITs)",
        difficulty: "Hard (Structural Analysis, Soil Mechanics, Reinforced Concrete Design, Hydraulics)"
      },
      actionItems: [
        "Master industry CAD & BIM software: AutoCAD Civil 3D, Revit, STAAD.Pro, and ETABS for structural modeling",
        "Excel in core technical subjects: Strength of Materials, Fluid Mechanics, Soil Mechanics & Foundation Engineering, and Geotechnical Engineering",
        "Complete hands-on total station surveying fieldwork and material testing labs (tensile, compression, slump tests)",
        "Secure two 6-8 week summer internships with infrastructure majors (L&T Construction, Tata Projects, Afcons, Shapoorji Pallonji)"
      ],
      resources: [
        { name: "NPTEL Civil Engineering Courses (IIT Madras / IIT Roorkee)", type: "course", url: "https://nptel.ac.in", isFree: true },
        { name: "AutoCAD & Revit Student Access (Autodesk)", type: "tool", url: "https://www.autodesk.com/education", isFree: true },
        { name: "Bentley STAAD.Pro Learning Portal", type: "tool", url: "https://www.bentley.com", isFree: false },
        { name: "IS 456:2000 (Plain and Reinforced Concrete Code of Practice)", type: "reading", url: "https://bis.gov.in", isFree: true }
      ],
      checkpoint: "Complete an industry-ready capstone project (e.g., G+15 Seismic-Resistant High-Rise Design in ETABS with foundation design).",
      decisionPoints: [
        "Structural Engineering & Computational Modeling vs Site Execution & Project Management",
        "Private Infrastructure Sector (L&T, Tata Projects) vs Public Sector Undertakings (PSUs via GATE)"
      ],
      warning: "Civil engineering cannot be learned solely from textbooks. Lack of hands-on software fluency (AutoCAD, STAAD.Pro) leaves candidates unemployable for design consultant roles.",
      fallbackPlan: "Focus on BIM (Building Information Modeling) and digital construction management certifications (Primavera P6, MS Project) which have high demand in international Gulf and European engineering consulting firms.",
      realWorldStats: {
        avgSalary: "₹4,50,000 - ₹9,00,000/yr (Campus placement package)",
        timelineToHire: "Campus placement drive during 7th and 8th semesters",
        competitionRatio: "1:6 placement ratio for premier engineering graduates"
      }
    },
    {
      year: "Year 4",
      title: "GATE / Campus Placements",
      desc: "GATE for PSU or M.Tech. Campus for consulting/construction firms.",
      investment: {
        time: "20-25 hrs/week for GATE prep or placement technical interviews",
        cost: "₹15,000 - ₹45,000 (GATE test series, interview grooming, mock exams)",
        difficulty: "Very Hard (GATE Civil is highly competitive with comprehensive syllabus coverage)"
      },
      actionItems: [
        "Prepare for GATE Civil Engineering: Geotechnical, Environmental, Transportation, and Structural engineering carry 60%+ weightage",
        "Target PSU recruitment notifications: NHAI, DMRC, NTPC, BHEL, IOCL, RITES, and Engineers India Limited (EIL)",
        "Participate in campus placement interviews for consulting giants (Jacobs, AECOM, WSP, Atkins, Mott MacDonald) and EPC contractors (L&T)",
        "Master project scheduling tools: Primavera P6 and Microsoft Project for project planning trainee roles"
      ],
      resources: [
        { name: "GATE Civil Official Portal (IIT Organising Institute)", type: "practice", url: "https://gate2025.iitr.ac.in", isFree: true },
        { name: "Made Easy / ACE Engineering Academy Postal & Test Series", type: "course", url: "https://onlinetestseries.madeeasy.in", isFree: false },
        { name: "Oracle Primavera P6 Project Management Guide", type: "tool", url: "https://www.oracle.com/construction-engineering/primavera-p6", isFree: false },
        { name: "Indian Roads Congress (IRC) Specifications & Standards", type: "reading", url: "https://irc.nic.in", isFree: true }
      ],
      checkpoint: "Secure a GATE All India Rank < 300 for direct PSU recruitment, or receive an offer letter from an EPC major or design consultancy.",
      decisionPoints: [
        "Joining PSU (Job security, work-life balance, executive engineer cadre) vs Private Consulting Firm (faster international career growth)",
        "Pursuing M.Tech in Structural / Geotechnical Engineering from IIT vs Immediate corporate employment"
      ],
      warning: "PSU hiring quotas via GATE fluctuate year-to-year based on infrastructure capital outlays. Relying solely on GATE without campus placement backups is risky.",
      fallbackPlan: "If PSU cutoff is missed, join EPC contractors (L&T, Shapoorji) or design consulting firms as a Graduate Engineer Trainee (GET); gain 2 years of field experience and apply for overseas positions.",
      realWorldStats: {
        avgSalary: "₹6,00,000 - ₹14,00,000/yr (PSU Starting CTC ~₹12-16 LPA; Private GET ~₹5-7.5 LPA)",
        timelineToHire: "April - July post final exam results",
        competitionRatio: "1:100 for top PSU executive engineer selection via GATE"
      }
    },
    {
      year: "Year 5+",
      title: "Site Experience",
      desc: "2-3 years of site work is essential for growth.",
      investment: {
        time: "50-60 hrs/week on-site execution, safety audits, subcontractor coordination",
        cost: "₹10,000 - ₹30,000 (PMP preparation, Chartered Engineer license fees)",
        difficulty: "Very Hard (Demanding on-site physical environments, weather conditions, stringent project deadlines)"
      },
      actionItems: [
        "Manage end-to-end execution: Bar bending schedules (BBS), concrete pouring, quality control testing, and scaffolding safety",
        "Coordinate between client consultants, structural architects, MEP engineers, and labor subcontractors",
        "Control site budgets, material wastage, monthly billing, and measurement book (MB) records",
        "Earn the Project Management Professional (PMP) credential or Chartered Engineer (CEng) accreditation from Institution of Engineers India"
      ],
      resources: [
        { name: "Project Management Institute (PMI PMP Certification)", type: "certification", url: "https://www.pmi.org", isFree: false },
        { name: "The Institution of Engineers (India) - Chartered Engineer", type: "certification", url: "https://www.ieindia.org", isFree: false },
        { name: "FIDIC Contracts Guide (International Construction Contracts)", type: "book", url: "https://fidic.org", isFree: false },
        { name: "Autodesk BIM 360 & Construction Cloud", type: "tool", url: "https://construction.autodesk.com", isFree: true }
      ],
      checkpoint: "Promoted to Senior Project Engineer, Construction Manager, or Structural Design Lead managing projects valued at ₹50+ Crores.",
      decisionPoints: [
        "Transitioning to International Megaprojects (Middle East / Gulf / Australia) vs Scaling up to Project Director in Indian EPCs",
        "Founding an independent Civil Contracting / PMC (Project Management Consultancy) firm"
      ],
      warning: "Engineers who avoid site experience early in their careers lack ground reality and struggle to become successful project directors or structural consultants.",
      fallbackPlan: "Pivot to digital construction: BIM Management, Quantity Surveying (RICS certification), or Techno-Commercial Contract Management where office-based analytical roles thrive.",
      realWorldStats: {
        avgSalary: "₹12,00,000 - ₹24,00,000/yr (Senior Project Manager / Structural Lead in India; ₹35 - 60 LPA in Middle East)",
        timelineToHire: "3-5 years of documented on-site execution experience",
        competitionRatio: "High demand for experienced civil engineers with PMP and FIDIC contract expertise"
      }
    }
  ],

  "mechanical-engineer": [
    {
      year: "Class 11-12",
      title: "PCM Stream",
      desc: "Physics and Math are critical.",
      investment: {
        time: "20-25 hrs/week dedicated to JEE prep",
        cost: "₹25,000 - ₹1,50,000 (Class 12 coaching, reference books, mock test series)",
        difficulty: "Hard (Rotational mechanics, thermodynamics, kinetic theory, calculus)"
      },
      actionItems: [
        "Master Newtonian Mechanics, Thermodynamics, Work-Energy-Power, Rotational Dynamics, and Fluid Mechanics",
        "Solve numerical physics problems from Irodov and H.C. Verma to develop intuitive mechanical problem-solving",
        "Build a strong foundation in differential calculus, vector algebra, and coordinate geometry",
        "Aim for a high percentile in JEE Main (> 97 percentile) for top NITs/IIITs or clear JEE Advanced for IIT Mechanical"
      ],
      resources: [
        { name: "Concepts of Physics by Dr. H.C. Verma (Vol 1 & 2)", type: "book", url: "https://bharatbharti.in", isFree: false },
        { name: "Problems in General Physics by I.E. Irodov", type: "book", url: "https://mir-titles.eu", isFree: false },
        { name: "NTA JEE Main Preparation Portal", type: "tool", url: "https://jeemain.nta.ac.in", isFree: true },
        { name: "Physics Galaxy by Ashish Arora", type: "video", url: "https://www.physicsgalaxy.com", isFree: true }
      ],
      checkpoint: "Secure a competitive rank in JEE Main or JEE Advanced (Rank < 6,000 for top IITs Mechanical).",
      decisionPoints: [
        "IITs / NITs vs BITS Pilani vs Premier State Colleges (COEP Pune, VJTI Mumbai, DTU Delhi)",
        "Pure Mechanical Engineering vs Interdisciplinary Mechatronics / Automation"
      ],
      warning: "Relying on rote memorization in physics will lead to immediate failure in JEE Advanced mechanics problems.",
      fallbackPlan: "If top ranks are missed, consider premier state colleges (DTU, COEP, PSG Tech, Thapar) or private universities with renowned mechanical labs and student Formula racing teams.",
      realWorldStats: {
        avgSalary: "₹0 (School stage; Graduate starting salaries range from ₹5.5 - 12 LPA)",
        timelineToHire: "4 years of engineering undergraduate studies",
        competitionRatio: "1:45 for premier tier-1 mechanical seats"
      }
    },
    {
      year: "Year 1-4",
      title: "B.Tech Mechanical",
      desc: "IIT, NIT, or BITS. Core engineering curriculum.",
      investment: {
        time: "40-50 hrs/week (academics, workshop, CAD labs, collegiate racing teams)",
        cost: "₹4,00,000 - ₹12,00,000 (Tuition, living expenses across 4 years in government/private universities)",
        difficulty: "Hard (Thermodynamics, Heat Transfer, Machine Design, Finite Element Analysis, Kinematics)"
      },
      actionItems: [
        "Master 3D CAD and simulation software: SolidWorks, CATIA, Autodesk Fusion 360, and ANSYS Mechanical / Fluent",
        "Join university competition teams: SAE BAJA (all-terrain vehicles), Formula Student (FSAE), or Robocon to design, fabricate, and test real machines",
        "Gain hands-on machining skills in lathe operations, CNC milling, welding, 3D printing (additive manufacturing), and sheet metal work",
        "Complete 2 industrial internships in manufacturing plants, automotive OEMs (Tata Motors, Mahindra, Maruti Suzuki), or heavy engineering (L&T, Thermax)"
      ],
      resources: [
        { name: "NPTEL Mechanical Engineering Lectures (IIT Kharagpur / IIT Kanpur)", type: "course", url: "https://nptel.ac.in", isFree: true },
        { name: "SolidWorks Student Edition & CSWA Certification", type: "certification", url: "https://www.solidworks.com", isFree: false },
        { name: "ANSYS Student Simulation Software & Tutorials", type: "tool", url: "https://www.ansys.com/academic/free-student-products", isFree: true },
        { name: "Design of Machine Elements by V.B. Bhandari", type: "book", url: "https://mheducation.co.in", isFree: false }
      ],
      checkpoint: "Earn the CSWA (Certified SolidWorks Associate) certification and complete a running prototype vehicle or automated robotic subsystem.",
      decisionPoints: [
        "Automotive & Internal Combustion / EV powertrain vs HVAC & Energy systems vs Aerospace & Defence manufacturing",
        "Hardware Design & CAD/CAE modeling vs Manufacturing Shop-floor & Quality Control"
      ],
      warning: "Theoretical study without practical CAD/CAE software proficiency and fabrication experience leaves graduates uncompetitive in top R&D hiring drives.",
      fallbackPlan: "Upskill in Mechatronics and embedded systems (PLC programming, ROS, Arduino, Python) to qualify for high-growth robotics and smart manufacturing sectors.",
      realWorldStats: {
        avgSalary: "₹6,00,000 - ₹11,00,000/yr (Campus placement package)",
        timelineToHire: "Placements during 7th and 8th semesters",
        competitionRatio: "1:7 for top core engineering campus recruiters"
      }
    },
    {
      year: "Year 4",
      title: "GATE / Placements",
      desc: "GATE for PSU or M.Tech. Campus for auto/manufacturing firms.",
      investment: {
        time: "20-25 hrs/week exam preparation or technical interview rounds",
        cost: "₹15,000 - ₹45,000 (GATE test series, technical training material)",
        difficulty: "Very Hard (GATE Mechanical has high cutoffs; core placement tests require rigorous fundamentals)"
      },
      actionItems: [
        "Prepare extensively for GATE Mechanical Engineering: Thermal sciences, manufacturing engineering, and mechanics carry 70%+ weightage",
        "Participate in campus interviews for automotive OEMs (Tata Motors, Mahindra, Bajaj, Hero MotoCorp) and energy/manufacturing giants",
        "Target PSU recruitment via GATE: ONGC, IOCL, NTPC, BHEL, GAIL, HPCL, and BARC scientific officer positions",
        "Develop proficiency in coding/scripting (MATLAB / Python) for mechanical data analysis and automated simulation workflows"
      ],
      resources: [
        { name: "GATE Mechanical Engineering Official Syllabus & Papers", type: "practice", url: "https://gate2025.iitr.ac.in", isFree: true },
        { name: "Made Easy / ACE Engineering GATE Mechanical Test Series", type: "practice", url: "https://onlinetestseries.madeeasy.in", isFree: false },
        { name: "MATLAB & Simulink for Mechanical Engineering", type: "tool", url: "https://www.mathworks.com/learn/tutorials/matlab-onramp.html", isFree: true },
        { name: "Tata Motors / Mahindra GET Preparation Question Banks", type: "reading", url: "https://indiabix.com", isFree: true }
      ],
      checkpoint: "Secure an AIR < 250 in GATE Mechanical or receive an offer as a Graduate Engineer Trainee (GET) in a leading core engineering multinational.",
      decisionPoints: [
        "Direct PSU job (executive engineer status, tenure stability) vs Private R&D (faster exposure to EVs, aerospace, automation)",
        "M.Tech / MS in Mechanical / Thermal / Design from IIT / IISc / Germany vs Immediate industry immersion"
      ],
      warning: "PSU hiring quotas vary widely. Preparing for GATE without concurrently maintaining campus placement technical readiness can result in lost private placement windows.",
      fallbackPlan: "If GATE ranks fall short of PSUs, accept a private core engineering GET role or pursue Master's programs in Germany (TU9 universities) which offer tuition-free world-class mechanical engineering education.",
      realWorldStats: {
        avgSalary: "₹6,50,000 - ₹14,50,000/yr (PSU CTC: ₹12-16 LPA; Auto OEM GET: ₹6.5-9 LPA)",
        timelineToHire: "April - August post graduation",
        competitionRatio: "1:120 for top PSU executive selection via GATE"
      }
    },
    {
      year: "Year 5+",
      title: "Specialization",
      desc: "Robotics, automotive, aerospace, or industrial design.",
      investment: {
        time: "45-50 hrs/week professional R&D and team leadership",
        cost: "₹50,000 - ₹2,00,000 (Advanced simulation credentials, Six Sigma Black Belt, PMP)",
        difficulty: "Very Hard (Complex multi-physics simulations, EV battery thermal management, high precision tolerances)"
      },
      actionItems: [
        "Specialize in high-growth engineering domains: Electric Vehicle (EV) battery pack thermal design, motor drives, autonomous robotics, or aerospace structures",
        "Lead multi-physics Computational Fluid Dynamics (CFD) and crashworthiness FEA simulations using LS-DYNA or ANSYS",
        "Attain professional certifications: Lean Six Sigma Green/Black Belt, GD&T (Geometric Dimensioning and Tolerancing ASME Y14.5), or PMP",
        "File engineering patents or publish technical papers in SAE (Society of Automotive Engineers) or ASME journals"
      ],
      resources: [
        { name: "Society of Automotive Engineers (SAE International)", type: "community", url: "https://www.sae.org", isFree: false },
        { name: "ASME Y14.5 GD&T Standards Guide", type: "book", url: "https://www.asme.org", isFree: false },
        { name: "Coursera / University of Colorado Boulder: Electric Vehicles Specialization", type: "course", url: "https://www.coursera.org", isFree: false },
        { name: "Six Sigma Black Belt Certification (ASQ)", type: "certification", url: "https://asq.org", isFree: false }
      ],
      checkpoint: "Promoted to Lead Mechanical Engineer, Chief R&D Engineer, or Vehicle Program Manager managing end-to-end product delivery.",
      decisionPoints: [
        "Automotive EV / Autonomous Mobility track vs Aerospace & Defence (ISRO, DRDO, Boeing, Airbus) vs Medical Devices Engineering",
        "Technical Specialist / Fellow track vs Engineering Management & Plant Operations Leadership"
      ],
      warning: "Traditional ICE (internal combustion engine) design roles are contracting. Mechanical engineers must re-skill into EV systems, lightweight composites, and robotics.",
      fallbackPlan: "Transition into product management, manufacturing supply chain leadership, or technical consultancy for international engineering service firms.",
      realWorldStats: {
        avgSalary: "₹14,00,000 - ₹30,00,000+/yr (Lead Design Engineer / R&D Manager in India; $95,000 - $140,000 abroad)",
        timelineToHire: "Continuous progression based on patent portfolio and successful product launches",
        competitionRatio: "High industry demand for specialists in EV battery thermal dynamics and robotics"
      }
    }
  ]
};
