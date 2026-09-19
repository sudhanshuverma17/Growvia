import fs from 'fs';
import { actuary, financialAnalyst } from './build_business.mjs';

const investmentBanker = [
  {
    investment: {
      time: "2 Years (High school commerce/math + financial news analysis)",
      cost: "₹30,000 - ₹90,000 (School tuition & foundational business economics)"
    },
    actionItems: [
      {
        task: "Excel in Class 11-12 Mathematics and Accountancy.",
        detail: "Top investment banks demand candidates with high quantitative aptitude and clean academic records (90%+ marks)."
      },
      {
        task: "Read Wall Street Journal, Financial Times, and Bloomberg daily.",
        detail: "Track major global and Indian M&A deals, private equity buyouts, and initial public offerings (IPOs)."
      },
      {
        task: "Participate in national debate competitions, Model United Nations, or case study challenges.",
        detail: "Develop exceptional poise, articulation, and persuasive client communication skills."
      }
    ],
    resources: [
      {
        name: "Mergers & Inquisitions (M&I) / Breaking Into Wall Street",
        type: "platform",
        url: "https://mergersandinquisitions.com",
        note: "The world's most authoritative resource on investment banking recruiting, networking, and technical guides."
      },
      {
        name: "Barbarians at the Gate by Bryan Burrough & John Helyar",
        type: "book",
        url: "https://www.harpercollins.com",
        note: "The classic account of the RJR Nabisco leveraged buyout; essential reading for aspiring dealmakers."
      },
      {
        name: "Financial Times DealBook / M&A Section",
        type: "platform",
        url: "https://www.ft.com",
        note: "Global daily reporting on corporate acquisitions, antitrust regulations, and capital markets."
      }
    ],
    checkpoint: {
      criteria: "Securing 95%+ in Class 12 Boards and gaining admission to a tier-1 undergraduate college (IIT, SRCC, St. Stephen's, Shaheed Sukhdev CBS).",
      deliverable: "Class 12 Passing Certificate and verified admission offer letter from a premier undergraduate institution."
    },
    decisionPoints: [
      {
        question: "Undergraduate Track: Engineering (IIT/NIT) vs Commerce/Finance (SRCC/SSCBS)",
        options: [
          {
            choice: "Engineering at Top IIT (IIT Bombay, Delhi, Kanpur)",
            pros: "Top IB firms (Goldman Sachs, Morgan Stanley) heavily recruit IITians for quantitative and analyst programs.",
            cons: "Four years of heavy technical engineering coursework outside of corporate finance."
          },
          {
            choice: "B.Com (Hons) or BMS at Premier Commerce College (SRCC, SSCBS)",
            pros: "Immediate 3-year finance curriculum, strong alumni network in investment banking and consulting.",
            cons: "Fewer slots compared to vast engineering talent pool."
          }
        ]
      }
    ],
    warning: "Believing investment banking has regular working hours: First-year analysts routinely work 80-100 hours per week including weekend pitch decks; mental and physical stamina is non-negotiable.",
    fallbackPlan: "If tier-1 college cutoff is missed, pursue standard undergraduate degree, maintain a 9.0+ CGPA, and focus on scoring 99.5%+ in CAT for top IIM admission.",
    realWorldStats: [
      {
        label: "Typical Weekly Work Hours",
        value: "80 - 100 Hours/Week",
        context: "Industry standard for bulge bracket IB analysts"
      },
      {
        label: "Tier 1 College Hiring Share",
        value: "85%+",
        context: "Of front-end investment banking analyst hiring in India"
      }
    ]
  },
  {
    investment: {
      time: "3-4 Years (Undergraduate degree + finance society leadership + modeling bootcamps)",
      cost: "₹2,00,000 - ₹12,00,000 (Tuition fees across university programs)"
    },
    actionItems: [
      {
        task: "Master financial valuation techniques: Discounted Cash Flow (DCF), Precedent Transactions, and LBO models.",
        detail: "Build dynamic debt paydown schedules, calculate sponsor returns (IRR, MoIC), and analyze accretion/dilution in M&A."
      },
      {
        task: "Lead college Finance and Investment societies; organize national case competitions.",
        detail: "Pitch investment theses, manage student-run mock funds, and build leadership presence."
      },
      {
        task: "Secure summer analyst internships at boutique advisory firms, private equity funds, or Big 4 deal advisory (M&A).",
        detail: "Prepare pitch decks, confidential information memorandums (CIM), and buyer target lists."
      }
    ],
    resources: [
      {
        name: "Investment Banking: Valuation, LBOs, M&A, and IPOs (Rosenbaum & Pearl)",
        type: "book",
        url: "https://www.wiley.com",
        note: "The practical operating manual used by investment banking training programs globally."
      },
      {
        name: "Wall Street Oasis (WSO) IB Forum & Guides",
        type: "platform",
        url: "https://www.wallstreetoasis.com",
        note: "Global community forum sharing company-specific interview questions, salary figures, and deal discussions."
      },
      {
        name: "Macabacus Financial Modeling Tutorials",
        type: "platform",
        url: "https://macabacus.com",
        note: "Free, comprehensive templates and best practices for institutional Excel modeling."
      }
    ],
    checkpoint: {
      criteria: "Winning a recognized national M&A case competition (e.g. Goldman Sachs Global Challenge) and securing a front-office summer internship.",
      deliverable: "Completed 50-slide pitch deck and fully functional LBO financial model spreadsheet."
    },
    decisionPoints: [
      {
        question: "Bulge Bracket Bank (Goldman, Morgan Stanley, J.P. Morgan) vs Boutique M&A Advisory (Avendus, Kotak, Rothschild)",
        options: [
          {
            choice: "Bulge Bracket Investment Bank (Global Deals)",
            pros: "Global brand cachet, international transfer opportunities, mega-cap cross-border transactions.",
            cons: "High division of labor; analysts often spend months formatting PowerPoint decks without client exposure."
          },
          {
            choice: "Leading Domestic / Boutique M&A Firm (Avendus, Kotak IB)",
            pros: "Immense deal volume in Indian startup/tech ecosystem, direct boardroom exposure early in career.",
            cons: "Less global brand recognition outside the Indian subcontinent."
          }
        ]
      }
    ],
    warning: "Formatting errors and misaligned logos in pitch books: In investment banking, a single misaligned number or font discrepancy in a client deck can get an analyst severely reprimanded.",
    fallbackPlan: "Accept an analyst role in an Investment Banking Knowledge Center / Global Capability Center (GCC) and aim for front-end onshore lateral transitions.",
    realWorldStats: [
      {
        label: "Front-Office Analyst Starting CTC",
        value: "₹20L - ₹40L/yr",
        context: "Base salary + performance bonus at bulge bracket banks in Mumbai"
      },
      {
        label: "Average Analyst Acceptance Rate",
        value: "< 1.5%",
        context: "Highly competitive front-end campus recruitment"
      }
    ]
  },
  {
    investment: {
      time: "2 Years (Full-time MBA at IIM Ahmedabad / Bangalore / Calcutta / ISB)",
      cost: "₹25,00,000 - ₹35,00,000 (Tuition, hostel, living expenses, international immersion)"
    },
    actionItems: [
      {
        task: "Score 99.5%+ percentile in CAT (Common Admission Test) or 720+ in GMAT.",
        detail: "Focus on Data Interpretation & Logical Reasoning (DILR) and Quantitative Aptitude."
      },
      {
        task: "Rank in the top 10-15% of the MBA cohort (Director's Merit List) in core finance courses.",
        detail: "Corporate finance, derivatives, advanced valuation, and private equity electives."
      },
      {
        task: "Crack Day Zero investment banking recruitment interviews on campus.",
        detail: "Undergo intense technical grilling on valuation, capital structure, accounting adjustments, and stress test cases."
      }
    ],
    resources: [
      {
        name: "IIM Ahmedabad / IIM Calcutta Placement Reports",
        type: "documentation",
        url: "https://www.iima.ac.in",
        note: "Official audited placement records detailing Day Zero finance recruitments and stipends."
      },
      {
        name: "Principles of Corporate Finance by Brealey, Myers, and Allen",
        type: "book",
        url: "https://www.mheducation.com",
        note: "The international academic authority on corporate financing, dividend policy, and capital budgeting."
      },
      {
        name: "Vault Career Guide to Investment Banking",
        type: "book",
        url: "https://www.vault.com",
        note: "In-depth guide to the banking hierarchy, culture, interview frameworks, and deal lifecycle."
      }
    ],
    checkpoint: {
      criteria: "Securing a Day Zero summer internship and subsequent PPO (Pre-Placement Offer) at a tier-1 investment bank.",
      deliverable: "Signed PPO offer letter and Master of Business Administration degree certificate."
    },
    decisionPoints: [
      {
        question: "Post-MBA Associate: Investment Banking vs Private Equity (PE) vs Venture Capital (VC)",
        options: [
          {
            choice: "Investment Banking Associate",
            pros: "Massive transaction volume, structured career ladder, highest cash bonuses in early years.",
            cons: "High stress advisory role; you advise clients but do not write checks or own portfolio equity."
          },
          {
            choice: "Private Equity Associate (Buy-Side)",
            pros: "Principal investor role, long-term wealth via carried interest (carry), superior work-life balance.",
            cons: "Extremely scarce openings (often 1-2 per fund annually); heavy pressure on portfolio returns."
          }
        ]
      }
    ],
    warning: "Failing to build deep peer and alumni relationships during MBA: Investment banking is fundamentally a relationship business; your classmates will be tomorrow's CFOs and startup founders generating your deal pipeline.",
    fallbackPlan: "If front-office IB recruitment is missed, join corporate strategy at a top conglomerate (Tata, Reliance, Aditya Birla) or management consulting (MBB) and transition into private equity later.",
    realWorldStats: [
      {
        label: "Day Zero Summer Stipend",
        value: "₹3L - ₹6L / 2 Months",
        context: "Paid to summer interns at top IIMs by bulge bracket banks"
      },
      {
        label: "Post-MBA Associate CTC",
        value: "₹40L - ₹80L/yr",
        context: "Base + annual deal bonus for fresh IIM A/B/C graduates"
      }
    ]
  },
  {
    investment: {
      time: "3-7 Years (Vice President to Managing Director career trajectory)",
      cost: "₹1,00,000 - ₹3,00,000 (Executive networking, international business conferences)"
    },
    actionItems: [
      {
        task: "Manage deal execution teams: supervise analysts and associates across valuation, due diligence, and legal documentation.",
        detail: "Liaise with corporate legal counsels, statutory auditors, and regulatory bodies (SEBI, CCI)."
      },
      {
        task: "Originate new deal mandates through executive client relationships.",
        detail: "Pitch strategic acquisition ideas to corporate boards, private equity general partners, and sovereign wealth funds."
      },
      {
        task: "Structure complex capital markets transactions (Qualified Institutional Placements, IPOs, Leveraged Debt Syndication).",
        detail: "Coordinate roadshows, price discovery, book-building, and anchor investor allocations."
      }
    ],
    resources: [
      {
        name: "SEBI (Securities and Exchange Board of India) Regulations",
        type: "documentation",
        url: "https://www.sebi.gov.in",
        note: "Statutory takeover codes, ICDR regulations, and insider trading prohibitions."
      },
      {
        name: "King of Capital: The Remarkable Rise of Steve Schwarzman and Blackstone",
        type: "book",
        url: "https://www.penguinrandomhouse.com",
        note: "Masterful biography detailing how alternative asset management and leveraged finance transformed Wall Street."
      },
      {
        name: "VCCircle & Entrackr Private Deals Portals",
        type: "platform",
        url: "https://www.vccircle.com",
        note: "Authoritative intelligence on Indian private equity investments, exits, and venture debt."
      }
    ],
    checkpoint: {
      criteria: "Successfully closing a $100M+ M&A transaction or leading a successful Indian mainboard IPO listing.",
      deliverable: "Official SEBI Red Herring Prospectus (RHP) with your bank listed as Lead Book Running Manager (BRLM)."
    },
    decisionPoints: [
      {
        question: "Managing Director at Global Investment Bank vs Transition to Private Equity Partner",
        options: [
          {
            choice: "Managing Director (MD) at Investment Bank",
            pros: "Consistent multi-crore annual cash compensation, senior corporate advisory influence, high public profile.",
            cons: "Constant mandate origination pressure; annual revenue targets resets to zero on January 1st."
          },
          {
            choice: "Partner at Private Equity / Sovereign Wealth Fund",
            pros: "Long-term compounding wealth through carried interest, direct operational control of portfolio companies.",
            cons: "Long illiquid capital lockup (7-10 years) before carry pays out."
          }
        ]
      }
    ],
    warning: "Over-promising unachievable valuations to win client mandates: Promising unrealistic IPO multiples will lead to failed book-building, public embarrassment, and regulatory scrutiny.",
    fallbackPlan: "Serve as Chief Financial Officer (CFO) or Group Head of M&A for large corporate conglomerates or unicorn scaleups.",
    realWorldStats: [
      {
        label: "Investment Banking VP CTC",
        value: "₹75L - ₹1.8 Cr/yr",
        context: "Base + annual bonus in Mumbai/Singapore"
      },
      {
        label: "Managing Director Compensation",
        value: "₹2.5 Cr - ₹8 Cr+/yr",
        context: "Senior dealmakers with strong mandate pipelines"
      }
    ]
  }
];

// Let's write the remaining 5 business roadmaps
const mbaManager = [
  {
    investment: {
      time: "2 Years (High school academics + extracurricular leadership)",
      cost: "₹20,000 - ₹60,000 (Schooling & personality development activities)"
    },
    actionItems: [
      {
        task: "Excel in Class 11-12 across any academic stream (Science, Commerce, or Humanities).",
        detail: "IIMs heavily weigh Class 10 and 12 marks (up to 20-30% of composite interview shortlisting criteria)."
      },
      {
        task: "Participate in sports, student government, or cultural clubs to build demonstrable leadership.",
        detail: "Elite business schools look for holistic achievers, not just one-dimensional test scorers."
      },
      {
        task: "Cultivate strong daily reading habits in business journalism and non-fiction.",
        detail: "Read The Ken, Mint, and Harvard Business Review to develop critical business intuition."
      }
    ],
    resources: [
      {
        name: "Harvard Business Review (HBR)",
        type: "platform",
        url: "https://hbr.org",
        note: "World's most influential management thinking on leadership, strategy, and organizational behavior."
      },
      {
        name: "The Ken - In-depth Business Stories",
        type: "platform",
        url: "https://the-ken.com",
        note: "Deep analytical long-form journalism on technology, business, and healthcare in India and Southeast Asia."
      },
      {
        name: "Word Power Made Easy by Norman Lewis",
        type: "book",
        url: "https://www.simonandschuster.com",
        note: "The quintessential vocabulary builder for cracking CAT/GMAT verbal reading comprehension."
      }
    ],
    checkpoint: {
      criteria: "Securing 90%+ in 10th and 12th Board examinations to build a flawless academic profile (9/9 profile).",
      deliverable: "Class 10 and 12 official marksheets and certificates of extracurricular leadership."
    },
    decisionPoints: [
      {
        question: "Integrated Program in Management (IPM - 5 Year at IIM Indore/Rohtak) vs Traditional 3/4-Year Graduation + MBA",
        options: [
          {
            choice: "IPM Direct Entry after 12th (IIM Indore, Rohtak, Ranchi)",
            pros: "Guaranteed IIM brand without writing CAT later; 5 years of continuous management immersion.",
            cons: "Locks you into management early; misses out on specialized engineering or liberal arts college experience."
          },
          {
            choice: "Standard Graduation (B.Tech, B.Com, BA) followed by CAT",
            pros: "Provides strong technical domain expertise and work experience before pursuing business school.",
            cons: "High stress of cracking CAT with 99%+ percentile amidst 3+ lakh candidates."
          }
        ]
      }
    ],
    warning: "Neglecting Class 12 board marks thinking 'only CAT matters later': Top IIMs reject thousands of 99.8%ile candidates every year because their 10th or 12th marks were below 80%.",
    fallbackPlan: "Focus on securing admission into a prestigious undergraduate college which provides excellent peer learning and strong campus placements.",
    realWorldStats: [
      {
        label: "IIM Academic Score Weightage",
        value: "20% - 30%",
        context: "10th and 12th board marks weight in IIM interview shortlisting"
      },
      {
        label: "Annual CAT Applicants",
        value: "3.2+ Lakh Candidates",
        context: "National competition for ~5,500 top-tier MBA seats"
      }
    ]
  },
  {
    investment: {
      time: "3-4 Years (Undergraduate degree + extracurricular clubs + case competitions)",
      cost: "₹1,50,000 - ₹8,00,000 (Degree tuition fees across accredited universities)"
    },
    actionItems: [
      {
        task: "Maintain a college CGPA above 8.5/10 across all semesters.",
        detail: "Undergraduate graduation marks carry direct weightage in IIM shortlisting criteria."
      },
      {
        task: "Participate in corporate business case competitions (HUL L.I.M.E., Tata Crucible, Reliance T.U.P.).",
        detail: "Solve unstructured market entry, supply chain, and pricing strategy problems."
      },
      {
        task: "Secure summer internships in corporate marketing, operations, or technology.",
        detail: "Gain practical business exposure and understand organizational dynamics."
      }
    ],
    resources: [
      {
        name: "Case in Point by Marc Cosentino",
        type: "book",
        url: "https://www.caseinterview.com",
        note: "The definitive guide to case interviews, frameworks, and market sizing estimation."
      },
      {
        name: "Unstop (formerly Dare2Compete)",
        type: "platform",
        url: "https://unstop.com",
        note: "Largest portal for student case competitions, corporate hackathons, and quizzes."
      },
      {
        name: "Victor Cheng's CaseInterview.com",
        type: "course",
        url: "https://www.caseinterview.com",
        note: "World-renowned video framework for structuring business case problem solving."
      }
    ],
    checkpoint: {
      criteria: "Graduating with first-class honors (8.0+ CGPA) and winning at least one inter-college business case competition.",
      deliverable: "College Degree Marksheet and verified case competition finalist/winner certificate."
    },
    decisionPoints: [
      {
        question: "Academic Diversity Advantage: Engineering vs Non-Engineering (Arts/Commerce/Science)",
        options: [
          {
            choice: "Non-Engineering Background (B.Com, BA, B.Sc)",
            pros: "Receives substantial 'Academic Diversity' points in IIM shortlisting formulas; lower CAT cutoff required (97-98%ile).",
            cons: "Must work harder on CAT Quantitative Aptitude section compared to engineering graduates."
          },
          {
            choice: "Engineering Background (B.Tech)",
            pros: "Strong quantitative foundations make CAT Quant section easier to score 99%+.",
            cons: "Heavy demographic competition; GEM (General Engineering Male) candidates often need 99.7%+ for IIM A/B/C calls."
          }
        ]
      }
    ],
    warning: "Ignoring campus placements because you plan to write CAT immediately: Having zero job offer creates immense anxiety during MBA entrance exams and leaves you with an empty gap year if percentiles drop.",
    fallbackPlan: "Accept a corporate campus placement offer; having 2 years of work experience actually boosts your composite score for IIM admissions significantly.",
    realWorldStats: [
      {
        label: "IIM Academic Diversity Points",
        value: "Up to 5 Extra Points",
        context: "Awarded to non-engineering candidates during composite score calculation"
      },
      {
        label: "Fresher vs Experienced Batch Ratio",
        value: "35% Freshers : 65% Experienced",
        context: "Typical student profile at IIM Ahmedabad, Bangalore, Calcutta"
      }
    ]
  },
  {
    investment: {
      time: "2-3 Years (Full-time corporate employment + 15 hrs/week CAT/GMAT prep)",
      cost: "₹30,000 - ₹80,000 (CAT coaching institutes like TIME, IMS, Career Launcher + test series)"
    },
    actionItems: [
      {
        task: "Deliver measurable business impact in your full-time corporate role (promotion, client recognition, process automation).",
        detail: "Work experience of 24-36 months maximizes points in IIM admission selection criteria."
      },
      {
        task: "Take 30+ full-length CAT mock tests with detailed sectional error analysis.",
        detail: "Target 99.5%+ percentile by mastering accuracy in VARC, DILR, and Quantitative Aptitude under strict 120-minute timers."
      },
      {
        task: "Prepare for Written Ability Test (WAT) and Personal Interview (PI).",
        detail: "Develop strong viewpoints on geopolitical conflicts, macroeconomic policies, Indian budget, and personal career goals."
      }
    ],
    resources: [
      {
        name: "TIME / IMS CAT Mock Test Series (AIMCAT / SimCAT)",
        type: "platform",
        url: "https://www.time4education.com",
        note: "The benchmark test series taken by 80%+ of serious CAT aspirants nationally."
      },
      {
        name: "Arun Sharma's Quantitative Aptitude for CAT",
        type: "book",
        url: "https://www.mheducation.co.in",
        note: "The most popular book for practicing Level 1, 2, and 3 difficulty math problems."
      },
      {
        name: "InsideIIM Community & Interview Experiences",
        type: "platform",
        url: "https://insideiim.com",
        note: "Real interview transcripts, conversion tips, and career journeys of top B-school alumni."
      }
    ],
    checkpoint: {
      criteria: "Scoring 99.0%+ percentile in CAT and converting an admission offer from a Top-10 Indian business school (IIM A/B/C/L/K/I, XLRI, FMS).",
      deliverable: "Official CAT Scorecard and formal admission offer letter from a premier business school."
    },
    decisionPoints: [
      {
        question: "Work Experience Sweet Spot: 2 Years vs 4+ Years for Indian MBA",
        options: [
          {
            choice: "24 - 36 Months Work Experience",
            pros: "The absolute sweet spot for 2-year PGP programs; maximum points in IIM criteria; prime target for management consulting and marketing.",
            cons: "Must balance exhausting daily corporate work with intense evening CAT preparation."
          },
          {
            choice: "48+ Months Work Experience",
            pros: "Mature perspective, eligible for 1-year Executive MBA programs (IIM PGPX, ISB, global MBAs).",
            cons: "Diminishing returns in traditional 2-year PGP campus placements."
          }
        ]
      }
    ],
    warning: "Quit your job to prepare for CAT full-time: Gap years create negative impressions in IIM interviews and destroy the 5-10 work experience points in selection criteria.",
    fallbackPlan: "If CAT percentiles are below top IIM cutoffs, apply with GMAT to Indian School of Business (ISB Hyderabad/Mohali) or SPJIMR, XLRI, and MDI Gurgaon.",
    realWorldStats: [
      {
        label: "Top IIM CAT Cutoff (General)",
        value: "99.2% - 99.8% Percentile",
        context: "Required for IIM Ahmedabad, Bangalore, Calcutta calls"
      },
      {
        label: "Sweet Spot Work Experience Points",
        value: "Max Points at 24 - 36 Months",
        context: "Work experience scoring table across major IIMs"
      }
    ]
  },
  {
    investment: {
      time: "2 Years (Full-time MBA program + summer internship)",
      cost: "₹20,00,000 - ₹30,00,000 (Tuition fees at IIMs, XLRI, FMS Delhi ₹2L is exception)"
    },
    actionItems: [
      {
        task: "Excel in core MBA curriculum: Marketing Management, Operations Strategy, Financial Accounting, and Macroeconomics.",
        detail: "Case method pedagogy: analyze 2-3 Harvard/IIM case studies daily with peer study groups."
      },
      {
        task: "Complete 8-10 week summer internship and secure a Pre-Placement Offer (PPO).",
        detail: "Execute a strategic project in FMCG brand management, management consulting, or general management leadership tracks."
      },
      {
        task: "Lead flagship campus committees (Placement Committee, Sports, Cultural Fest, Alumni Relations).",
        detail: "Managing multi-crore budgets and high-stakes corporate recruiter relations builds real operational grit."
      }
    ],
    resources: [
      {
        name: "Playing to Win: How Strategy Really Works (A.G. Lafley & Roger Martin)",
        type: "book",
        url: "https://hbr.org",
        note: "Practical strategic choices framework developed by former CEO of Procter & Gamble."
      },
      {
        name: "The Personal MBA by Josh Kaufman",
        type: "book",
        url: "https://personalmba.com",
        note: "Distillation of core business concepts: value creation, marketing, sales, value delivery, and finance."
      },
      {
        name: "IIM Ahmedabad Case Method Library",
        type: "documentation",
        url: "https://cases.iima.ac.in",
        note: "Extensive repository of Indian business case studies used across global business schools."
      }
    ],
    checkpoint: {
      criteria: "Graduating with Master of Business Administration / Post Graduate Diploma in Management (PGDM) with confirmed placement.",
      deliverable: "MBA Degree Certificate and signed corporate placement offer letter."
    },
    decisionPoints: [
      {
        question: "Management Consulting (McKinsey, BCG, Bain) vs General Management Leadership Tracks (TAS, Aditya Birla Group, Mahindra)",
        options: [
          {
            choice: "Management Consulting (MBB / Tier 2)",
            pros: "Highest starting compensation (₹35L - ₹50L), fast career progression, prestige, solve high-stakes CXO problems.",
            cons: "Extensive weekly travel (Monday-Thursday on client site); 65-75 hour work weeks."
          },
          {
            choice: "Conglomerate General Management Leadership (TAS, ABG, Mahindra GMC)",
            pros: "Rotations across diverse industries, direct fast-track to Business Unit CEO, balanced working hours.",
            cons: "Slightly lower initial cash starting salaries compared to management consulting."
          }
        ]
      }
    ],
    warning: "Getting caught in the peer comparison bubble during MBA: Trying to recruit for every domain (finance, marketing, consulting, product) without a clear focus leads to zero interview conversions.",
    fallbackPlan: "Accept a Business Development or Category Management role at an Indian tech unicorn; high performers scale to VP of Business within 5-7 years.",
    realWorldStats: [
      {
        label: "Top 3 IIM Average CTC",
        value: "₹32L - ₹36L/yr",
        context: "Audited placement reports across IIM Ahmedabad, Bangalore, Calcutta"
      },
      {
        label: "Summer Internship PPO Conversion",
        value: "45% - 55%",
        context: "Of MBA batches receive full-time offers before final year begins"
      }
    ]
  }
];

export { investmentBanker, mbaManager };
console.log('Investment Banker & MBA Manager prepared.');
