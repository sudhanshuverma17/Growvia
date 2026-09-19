export const sampleCharteredAccountant = {
  id: "chartered-accountant",
  title: "Chartered Accountant",
  category: "Finance",
  timeline: [
    {
      year: "Class 11-12",
      title: "Commerce Stream & Foundations",
      desc: "Commerce with Mathematics or Informatics Practices preferred. Build rock-solid basics in double-entry bookkeeping, commercial law principles, and business economics.",
      investment: {
        time: "2 Years (School Curriculum + 1-2 hrs/day CA Foundation bridge)",
        cost: "₹30,000 - ₹1,00,000 (School tuition & foundational reference material)"
      },
      actionItems: [
        {
          task: "Master Class 11-12 Accountancy (Partnership, Company Accounts, Cash Flow Statements).",
          detail: "ICAI Foundation questions heavily test Class 11-12 accounting concepts with higher speed and negative marking."
        },
        {
          task: "Register for CA Foundation with ICAI during Class 12.",
          detail: "ICAI allows provisional registration after Class 10; register before the cutoff (Jan 1 for June exam, or July 1 for Dec/Jan exam)."
        },
        {
          task: "Practice Business Mathematics, Logical Reasoning, and Statistics without relying on manual steps.",
          detail: "Get familiar with ICAI-permitted financial calculators (ordinary non-scientific calculators with up to 12 digits, square root, and memory keys)."
        }
      ],
      resources: [
        {
          name: "ICAI Bos Knowledge Portal (Foundation Modules)",
          type: "documentation",
          url: "https://www.icai.org/post/bos-knowledge-portal",
          note: "Official ICAI modules are the single most authoritative source for exam questions."
        },
        {
          name: "Double Entry Book Keeping by T.S. Grewal",
          type: "book",
          url: "https://www.sultan-chand.com",
          note: "Gold-standard clarity on accounting standards, ledger entries, and final accounts."
        },
        {
          name: "Edu91 / Unacademy CA Foundation Prep",
          type: "course",
          url: "https://www.edu91.org",
          note: "Structured video lectures for quantitative aptitude and mercantile law."
        }
      ],
      checkpoint: {
        criteria: "Scoring 85%+ in Class 12 Board Commerce exams and 60%+ in ICAI Foundation mock test series.",
        deliverable: "Class 12 Board Marksheet and ICAI Foundation admit card issued."
      },
      decisionPoints: [
        {
          question: "Regular College (B.Com) vs Distance Education / Open Schooling",
          options: [
            {
              choice: "Regular B.Com College alongside CA",
              pros: "Campus life, backup degree, college networking and sports.",
              cons: "Attendance clashes during CA Intermediate and mandatory articleship timings."
            },
            {
              choice: "Correspondence B.Com (IGNOU / DU SOL) with Full-Time CA Focus",
              pros: "100% time dedicated to CA study routines, zero attendance conflicts with articleship.",
              cons: "Lacks traditional campus experience and peer exposure."
            }
          ]
        }
      ],
      warning: "Underestimating Business Law writing style: Many 12th-grade students fail Foundation Paper 2 because they write informal, bulleted answers instead of proper legal provision-fact-conclusion structuring.",
      fallbackPlan: "If CA Foundation is not cleared in the first 2 attempts, continue B.Com and enter CA through the ICAI Direct Entry Route after graduating with 55%+ (commerce) or 60%+ (non-commerce).",
      realWorldStats: [
        {
          label: "ICAI Foundation Pass Rate",
          value: "20% - 25%",
          context: "Across all national centers"
        },
        {
          label: "Annual Exam Candidates",
          value: "1.2+ Lakh students",
          context: "Appearing per exam cycle (June & Dec/Jan)"
        }
      ]
    },
    {
      year: "After 12th",
      title: "CA Foundation Examination",
      desc: "Clear the 4-paper national entrance examination conducted by the Institute of Chartered Accountants of India (ICAI).",
      investment: {
        time: "4 - 6 Months intensive study (8-10 hrs/day)",
        cost: "₹15,000 - ₹35,000 (ICAI registration ₹9,800 + exam fee + test series)"
      },
      actionItems: [
        {
          task: "Complete 100% coverage of all 4 papers: Accounting, Business Laws, Quantitative Aptitude, and Business Economics.",
          detail: "Focus on negative marking in Papers 3 & 4 (Objective MCQs: 0.25 penalty per wrong answer)."
        },
        {
          task: "Solve last 5 years' RTPs (Revision Test Papers) and MTPs (Mock Test Papers) under timed exam hall conditions.",
          detail: "Timed solving builds speed on 3-hour subjective papers (Papers 1 & 2)."
        },
        {
          task: "Secure aggregate 50%+ with minimum 40% in each individual paper.",
          detail: "Scoring 60+ in a subject grants exemption; aggregate failure despite passing individual papers is the most common trap."
        }
      ],
      resources: [
        {
          name: "ICAI Revision Test Papers (RTP) & Suggested Answers",
          type: "documentation",
          url: "https://www.icai.org",
          note: "Direct preview of ICAI paper-setting patterns and step-marking guidelines."
        },
        {
          name: "Taxmann CA Foundation Cracker Series",
          type: "book",
          url: "https://www.taxmann.com",
          note: "Chapter-wise compilation of past exam questions with verified model solutions."
        },
        {
          name: "Casio MS-120D / Orpat Calculator",
          type: "tool",
          url: "https://www.casio.com",
          note: "Standard non-programmable 12-digit commercial calculator permitted in ICAI exams."
        }
      ],
      checkpoint: {
        criteria: "Achieving aggregate 200+/400 marks with at least 40 marks in every single paper.",
        deliverable: "Official ICAI CA Foundation Pass Certificate & Roll Number confirmation."
      },
      decisionPoints: [
        {
          question: "Coaching Mode Selection: Self-Study vs Pen-Drive/Online vs Offline Coaching",
          options: [
            {
              choice: "Online / Google Drive Classes (Swapnil Patni, Aldine, Edu91)",
              pros: "Flexibility to watch at 1.5x speed, rewind difficult topics, saves daily commute.",
              cons: "Requires intense personal discipline; easy to accumulate backlog."
            },
            {
              choice: "Physical Offline Coaching Batches",
              pros: "Strict schedule, immediate doubt clearing, peer competitive environment.",
              cons: "2-3 hours wasted in travel, fixed inflexible schedules."
            }
          ]
        }
      ],
      warning: "Calculator dependency without conceptual clarity: Blindly memorizing calculator shortcut tricks without understanding annuity or permutation formulas results in complete freeze during twisted objective questions.",
      fallbackPlan: "If missed by 5-10 marks in aggregate, immediately register for the immediate next 6-month cycle while keeping concepts fresh; do not restart from zero.",
      realWorldStats: [
        {
          label: "Passing Benchmark",
          value: "50% Aggregate + 40% per Subject",
          context: "Strict qualifying threshold"
        },
        {
          label: "Average Study Hours",
          value: "600 - 800 Hours",
          context: "Recommended total dedicated prep time"
        }
      ]
    },
    {
      year: "Year 1-2",
      title: "CA Intermediate (Group 1 & Group 2)",
      desc: "The intellectual backbone of the CA curriculum: 6 intensive papers covering Advanced Accounting, Corporate Laws, Taxation, Cost & Management Accounting, Auditing & Ethics, and Financial Management.",
      investment: {
        time: "9 - 12 Months full-time study (10-12 hrs/day)",
        cost: "₹40,000 - ₹90,000 (ICAI registration ₹18,000 + specialized faculty video lectures)"
      },
      actionItems: [
        {
          task: "Complete Group 1 (Adv Accounting, Corporate Laws, Taxation - Direct & Indirect Taxes / GST).",
          detail: "GST and Income Tax changes happen every Finance Act; ensure latest assessment year materials."
        },
        {
          task: "Complete Group 2 (Cost & Management Accounting, Auditing & Ethics, Financial Management & Strategic Management).",
          detail: "Auditing requires verbatim adherence to ICAI Standards on Auditing (SAs) and code of ethics."
        },
        {
          task: "Complete ICAI ICITSS (Information Technology & Orientation Course) before starting Articleship.",
          detail: "Mandatory 4-week training covering Advanced Excel, TallyPrime, MCA portal filings, and soft skills."
        }
      ],
      resources: [
        {
          name: "ICAI Guidance Notes on Standards on Auditing (SAs)",
          type: "documentation",
          url: "https://www.icai.org",
          note: "Compulsory for scoring exemptions in Intermediate Paper 5 (Auditing & Ethics)."
        },
        {
          name: "Munish Bhandari's Corporate and Other Laws",
          type: "book",
          url: "https://www.taxmann.com",
          note: "Comprehensive section-wise analysis of Companies Act 2013 with case laws."
        },
        {
          name: "Bhanwar Borana (BB Sir) Direct Tax Fast Track",
          type: "course",
          url: "https://bbvirtuals.com",
          note: "Celebrated compact notes and revision charts for Income Tax computations."
        }
      ],
      checkpoint: {
        criteria: "Passing both Groups of CA Intermediate (either together or one by one) and completing mandatory ICITSS.",
        deliverable: "ICAI CA Intermediate Pass Certificate and ICITSS Completion Certificate."
      },
      decisionPoints: [
        {
          question: "Both Groups Together vs Single Group Strategy",
          options: [
            {
              choice: "Both Groups Together",
              pros: "Eligible for 'Set-Off' benefit (surplus marks in Group 1 compensate deficiency in Group 2); qualifies for All India Rank (AIR).",
              cons: "Extreme burnout risk handling 6 massive technical subjects concurrently."
            },
            {
              choice: "One Group at a Time (6 months apart)",
              pros: "Manageable syllabus, higher retention, higher certainty of clearing without multiple attempts.",
              cons: "Delays articleship commencement and forfeits national rank eligibility."
            }
          ]
        }
      ],
      warning: "Neglecting ICAI Study Material language: Self-made notes or coaching summaries often omit statutory ICAI keywords in Tax and Company Law, resulting in 30s instead of 60s from paper examiners.",
      fallbackPlan: "If stuck on one specific paper, claim subject exemption (60+ marks) which carries forward for the next 3 consecutive attempts.",
      realWorldStats: [
        {
          label: "Intermediate Pass Rate (Both Groups)",
          value: "10% - 15%",
          context: "One of India's most competitive professional hurdles"
        },
        {
          label: "Rank Eligibility",
          value: "Top 50 AIRs nationally",
          context: "Awarded only to both-group single-sitting candidates"
        }
      ]
    },
    {
      year: "Year 2-5",
      title: "Practical Training / Articleship (2-3 Years)",
      desc: "Mandatory on-the-job training under a practicing Chartered Accountant firm. Gain hands-on exposure to statutory audits, tax audits, forensic accounting, GST compliance, and corporate finance.",
      investment: {
        time: "2 Years under new ICAI scheme (35-45 hrs/week in office/client sites)",
        cost: "₹0 (Stipend earned: ₹3,000 - ₹25,000/month depending on firm tier)"
      },
      actionItems: [
        {
          task: "Secure articleship in a reputable firm: Big 4 (EY, PwC, Deloitte, KPMG), Mid-size, or Boutique Audit firm.",
          detail: "Draft a clean 1-page CV highlighting CA Inter scores, IT skills, and conduct mock technical interview prep."
        },
        {
          task: "Execute real-world Statutory Audits, Tax Audits (Form 3CD), and GST Reconciliation (GSTR-9/9C).",
          detail: "Verify trial balance vouchers, test internal controls, and draft audit management representation letters."
        },
        {
          task: "Complete Advanced ICITSS (Adv IT & Management Communication Skills) during the second year.",
          detail: "Mandatory 4-week advanced program covering Power BI, SAP ERP navigation, and board presentation skills."
        }
      ],
      resources: [
        {
          name: "ClearTax / Taxmann Web Portals",
          type: "tool",
          url: "https://cleartax.in",
          note: "Essential cloud platform for filing ITR, TDS, and GST returns on client accounts."
        },
        {
          name: "Microsoft Excel for Financial Modeling & Audits",
          type: "tool",
          url: "https://www.microsoft.com/excel",
          note: "Mastering VLOOKUP, INDEX-MATCH, XLOOKUP, Pivot Tables, and Macros is non-negotiable."
        },
        {
          name: "ICAI Technical Guide on Internal Audit",
          type: "documentation",
          url: "https://www.icai.org",
          note: "Standard operational manual for risk-based internal audit procedures."
        }
      ],
      checkpoint: {
        criteria: "Completion of required months of registered practical training with logged Form 108 signed by Principal.",
        deliverable: "Form 108 Discharge Certificate and Advanced ICITSS Completion Certificate."
      },
      decisionPoints: [
        {
          question: "Big 4 Firm vs Mid-Size CA Firm Articleship",
          options: [
            {
              choice: "Big 4 Firm (EY, Deloitte, PwC, KPMG)",
              pros: "Prestigious brand on resume, massive MNC clients, high stipend (₹15,000 - ₹25,000), global methodology.",
              cons: "Extreme specialization (you only see 1 line of audit), high overtime, less CA Final study leave flexibility."
            },
            {
              choice: "Mid-Size / Regional Top CA Firm",
              pros: "360-degree exposure (income tax, GST, litigation, company law, bank audits), closer mentorship, better exam leave.",
              cons: "Lower stipend (₹3,000 - ₹8,000), less corporate brand recognition for direct MNC placements."
            }
          ]
        }
      ],
      warning: "Sacrificing CA Final preparation for office work: Working 14-hour audit days without studying 2 hours every morning guarantees struggle when the 6-month study leave begins.",
      fallbackPlan: "If firm environment is toxic or non-compliant with ICAI norms, utilize ICAI Transfer provisions within the permitted initial window to shift to another authorized firm.",
      realWorldStats: [
        {
          label: "Articleship Stipend (Mid-Size)",
          value: "₹3,500 - ₹9,000/month",
          context: "Statutory ICAI minimum rates"
        },
        {
          label: "Articleship Stipend (Big 4 / Top 10)",
          value: "₹15,000 - ₹25,000/month",
          context: "Metro cities (Mumbai, Delhi, Bengaluru)"
        }
      ]
    },
    {
      year: "Year 5+",
      title: "CA Final Examination & ICAI Membership",
      desc: "The pinnacle stage of the Chartered Accountancy qualification: 6 advanced papers including Financial Reporting (Ind AS), Advanced Financial Management, Advanced Auditing, Direct Tax Laws, and Indirect Tax Laws.",
      investment: {
        time: "6 - 9 Months full-time dedicated study leave (12-14 hrs/day)",
        cost: "₹50,000 - ₹1,20,000 (CA Final registration ₹22,000 + national master faculty classes)"
      },
      actionItems: [
        {
          task: "Master Indian Accounting Standards (Ind AS / IFRS convergence) and Consolidation in Financial Reporting.",
          detail: "Paper 1 (FR) requires detailed journal entries for business combinations, financial instruments, and leases."
        },
        {
          task: "Study International Taxation, Transfer Pricing, and BEPS action plans in Direct Tax.",
          detail: "Case-study-based paper testing cross-border tax treaties (DTAA) and advance pricing agreements."
        },
        {
          task: "Attend ICAI Campus Placement Program upon qualification.",
          detail: "Held biannually in 27+ centers across India with 150+ recruiting enterprises, banks, and PSUs."
        }
      ],
      resources: [
        {
          name: "Compendium of Ind AS (ICAI)",
          type: "documentation",
          url: "https://www.icai.org",
          note: "Statutory standards required for corporate financial statements."
        },
        {
          name: "A.K. Jindal / Parveen Sharma Financial Reporting",
          type: "course",
          url: "https://www.aldine.edu.in",
          note: "Premier masterclass for cracking CA Final Financial Reporting."
        },
        {
          name: "CA Club India Knowledge Forum",
          type: "platform",
          url: "https://www.caclubindia.com",
          note: "Largest national community of CAs sharing case law summaries and interview experiences."
        }
      ],
      checkpoint: {
        criteria: "Passing both Groups of CA Final Examination and clearing ICAI Member Verification.",
        deliverable: "Fellow/Associate Chartered Accountant (ACA) Membership Certificate & COP (Certificate of Practice) if setting up independent firm."
      },
      decisionPoints: [
        {
          question: "Corporate Industry Career vs Big 4 Advisory vs Independent Practice",
          options: [
            {
              choice: "Corporate Industry (ITC, Tata, Reliance, HUL, MNC Banking)",
              pros: "Highest starting CTC (₹12L - ₹30L), structured corporate hours, stock options (ESOPs).",
              cons: "Slow bureaucratic climb, specialized role away from core tax/audit laws."
            },
            {
              choice: "Independent Practice / Partnership Firm",
              pros: "Total autonomy, unlimited equity upside as client book compounds over decades, high community prestige.",
              cons: "Low initial cash flow (₹3L - ₹6L first 2 years), constant hustle for business development."
            }
          ]
        }
      ],
      warning: "Ignoring self-examination through timed test series: Attempting CA Final without writing at least 2 full-length 3-hour mock papers per subject is the leading cause of multi-attempt fatigue.",
      fallbackPlan: "If one group is cleared, you are an semi-qualified CA eligible for Senior Accounting / Audit Manager roles paying ₹6L - ₹10L while clearing the second group.",
      realWorldStats: [
        {
          label: "CA Final Pass Percentage",
          value: "8% - 14%",
          context: "Both groups single sitting"
        },
        {
          label: "Campus Placement Average CTC",
          value: "₹10.5L - ₹15.5L/yr",
          context: "Top tier campus recruitment"
        },
        {
          label: "Highest Domestic CTC",
          value: "₹28L - ₹40L/yr",
          context: "Investment banks and top FMCG conglomerates"
        }
      ]
    }
  ]
};

export const sampleCivilServices = {
  id: "civil-services",
  title: "Civil Services (IAS / IPS)",
  category: "Government & Public Service",
  timeline: [
    {
      year: "Class 11-12",
      title: "Humanities or Any Stream Foundation",
      desc: "Any stream is valid. Cultivate deep reading habits, newspaper analysis, general knowledge, and clear written communication in English or Hindi.",
      investment: {
        time: "2 Years (Regular School + 1 hr daily newspaper & non-fiction reading)",
        cost: "₹10,000 - ₹30,000 (Newspaper subscriptions & foundational historical books)"
      },
      actionItems: [
        {
          task: "Read The Hindu or The Indian Express editorial page daily.",
          detail: "Learn to separate factual event reporting from political bias; maintain notes on constitutional debates, international treaties, and socioeconomic issues."
        },
        {
          task: "Build strong command over Class 6-12 NCERT textbooks in History, Geography, Polity, and Economics.",
          detail: "NCERTs form the direct factual basis of 30-40% of UPSC CSE General Studies Prelims questions."
        },
        {
          task: "Participate in debates, elocution, and Model United Nations (MUNs).",
          detail: "Develops articulated, balanced thinking necessary for the UPSC personality interview."
        }
      ],
      resources: [
        {
          name: "NCERT Official Textbooks (Class 6 to 12)",
          type: "book",
          url: "https://ncert.nic.in/textbook.php",
          note: "Free, foundational reading for Ancient/Medieval/Modern History, Geography, and Indian Constitution."
        },
        {
          name: "The Hindu & Indian Express Editorial Analysis",
          type: "platform",
          url: "https://www.thehindu.com",
          note: "The primary source for current affairs, editorial debate, and policy analysis."
        },
        {
          name: "Rajya Sabha TV / Sansad TV (Perspective & Vishesh)",
          type: "course",
          url: "https://sansadtv.nic.in",
          note: "High-caliber balanced panel discussions on national and international policy matters."
        }
      ],
      checkpoint: {
        criteria: "Scoring 75%+ in 12th Board exams and comfortable writing 300-word summaries of daily national news editorials.",
        deliverable: "Class 12 Passing Certificate with eligibility to enroll in any recognized undergraduate program."
      },
      decisionPoints: [
        {
          question: "Undergraduate Degree Selection for UPSC Aspirants",
          options: [
            {
              choice: "BA in History, Political Science, Economics, or Sociology",
              pros: "Syllabus directly overlaps 60%+ with UPSC GS Papers and Optional subject; ample time to prepare.",
              cons: "Fewer lucrative corporate private-sector backup career options if civil services is not cleared."
            },
            {
              choice: "Professional Degree (B.Tech, MBBS, B.Com, LLB)",
              pros: "Strong, reliable financial safety net in private/corporate sectors if exam attempts fail.",
              cons: "Heavy semester workload and lab hours leave less daily time for UPSC preparation."
            }
          ]
        }
      ],
      warning: "Starting intense UPSC coaching too early in school: Enrolling in commercial coaching institutes during Class 11 burns out students before they even reach the minimum eligibility age (21 years).",
      fallbackPlan: "Focus 100% on securing admission into a prestigious undergraduate college (Delhi University, IITs, NLUs, St. Xavier's) which provides unmatched peer environment.",
      realWorldStats: [
        {
          label: "Minimum Age Eligibility",
          value: "21 Years",
          context: "As of August 1st of examination year"
        },
        {
          label: "Graduation Requirement",
          value: "Any UGC-Recognized Degree",
          context: "No minimum college percentage required"
        }
      ]
    },
    {
      year: "Graduation (Year 1-3)",
      title: "Undergraduate Degree & Static Syllabus Mastery",
      desc: "Complete your college degree while systematically covering the static UPSC CSE syllabus (Polity, History, Geography, Economy, Environment, Ethics).",
      investment: {
        time: "3-4 Years (College classes + 3-4 hours daily UPSC preparation)",
        cost: "₹20,000 - ₹60,000 (Standard standard reference textbooks & online test subscriptions)"
      },
      actionItems: [
        {
          task: "Complete Indian Polity by M. Laxmikanth cover to cover at least 3 times.",
          detail: "The indisputable bible for Indian Constitution, Fundamental Rights, Parliament, and Judiciary."
        },
        {
          task: "Select and finalize your UPSC Optional Subject by the end of college Year 2.",
          detail: "Optional paper carries 500 marks (2 papers of 250 marks) and is the ultimate rank-decider."
        },
        {
          task: "Practice mapping: Indian physical geography, rivers, national parks, mountain passes, and global geopolitical hotspots.",
          detail: "Map-based questions contribute 6-10 questions in Prelims every year."
        }
      ],
      resources: [
        {
          name: "Indian Polity by M. Laxmikanth",
          type: "book",
          url: "https://www.mheducation.co.in",
          note: "Must-read textbook covering articles, constitutional amendments, and administrative bodies."
        },
        {
          name: "Certificate Physical and Human Geography by G.C. Leong",
          type: "book",
          url: "https://global.oup.com",
          note: "Essential guide for climate zones, geomorphology, and global weather systems."
        },
        {
          name: "Mrunal Patel Economy Lectures (Mrunal.org)",
          type: "course",
          url: "https://mrunal.org",
          note: "Unsurpassed clarity on monetary policy, inflation, banking, and government fiscal budgets."
        }
      ],
      checkpoint: {
        criteria: "Successfully completing college graduation with first class (60%+) and scoring 80+ marks in full-length static Prelims mock tests.",
        deliverable: "College Degree Certificate and finalized handwritten summary notes for all 4 General Studies papers."
      },
      decisionPoints: [
        {
          question: "Choosing an Optional Subject",
          options: [
            {
              choice: "Subject Overlapping with GS (PSIR, Sociology, Geography, History)",
              pros: "Saves massive time; PSIR aids GS-2 and Essay; Sociology aids GS-1 and GS-4 Ethics.",
              cons: "High competition, subjective marking variations across examiners."
            },
            {
              choice: "Technical / Science Optional (Mathematics, Electrical, Anthropology)",
              pros: "Objective grading: high scores (300+) achievable if solutions are correct.",
              cons: "Zero overlap with GS papers; takes enormous independent study time."
            }
          ]
        }
      ],
      warning: "Collecting infinite PDF study materials without revision: UPSC demands revising 1 book 10 times, not reading 10 books 1 time.",
      fallbackPlan: "Maintain strong academic grades in your degree so campus placements or master's degrees (CAT/GRE/GATE) remain open if you choose not to pursue civil services full-time.",
      realWorldStats: [
        {
          label: "Prelims Applicant Pool",
          value: "10 - 12 Lakh Applicants",
          context: "Annual candidates filling UPSC CSE form"
        },
        {
          label: "Appearing Candidates",
          value: "Approx 5 - 6 Lakhs",
          context: "Actually sit for Paper 1 & Paper 2 on exam day"
        }
      ]
    },
    {
      year: "Prep Year",
      title: "UPSC CSE Examination (Prelims & Mains)",
      desc: "The intense 1-year examination cycle: Stage 1 (Prelims: GS + CSAT) in May/June, followed by Stage 2 (Mains: 9 subjective written papers) in September.",
      investment: {
        time: "12 - 15 Months (8 - 12 hours daily disciplined study)",
        cost: "₹50,000 - ₹2,00,000 (Test series, optional coaching, accommodation in Delhi or study at home)"
      },
      actionItems: [
        {
          task: "Solve 40+ full-length Prelims mock tests with detailed negative-marking analysis.",
          detail: "Master elimination techniques for GS Paper 1 and ensure 33%+ qualifying score in CSAT (Paper 2)."
        },
        {
          task: "Write at least 2 Mains answers daily with strict timer (7-9 minutes per 10-marker, 11-14 minutes per 15-marker).",
          detail: "Learn intro-body-diagram-conclusion structure, incorporating committee reports and Supreme Court judgements."
        },
        {
          task: "Write 10 full-length GS Mains tests and 4 Optional tests with mentor feedback.",
          detail: "Build hand stamina to write 6 hours a day (two 3-hour papers) for 5 consecutive days in Mains."
        }
      ],
      resources: [
        {
          name: "Vision IAS / ForumIAS Mains Answer Writing & Test Series",
          type: "platform",
          url: "https://www.visionias.in",
          note: "Gold standard for evaluated mock tests, model answers, and monthly Current Affairs compilations."
        },
        {
          name: "UPSC Previous 10 Years Question Papers (PYQs)",
          type: "documentation",
          url: "https://upsc.gov.in/examinations/previous-question-papers",
          note: "The authentic compass for understanding examiner patterns and repeating themes."
        },
        {
          name: "Lexicon for Ethics, Integrity & Aptitude",
          type: "book",
          url: "https://www.chronicleindia.in",
          note: "Essential terminology, case studies, and philosopher quotes for GS Paper 4."
        }
      ],
      checkpoint: {
        criteria: "Clearing Prelims cutoff (typically 85-95 marks in GS-1, 66+ in CSAT) and scoring 750+ marks across 7 Mains merit papers.",
        deliverable: "UPSC Mains Qualifying Roll Number in official gazette and DAF-1 (Detailed Application Form) submitted."
      },
      decisionPoints: [
        {
          question: "Delhi (Old Rajinder Nagar / Mukherjee Nagar) vs Home Preparation",
          options: [
            {
              choice: "Online Preparation from Home",
              pros: "Saves ₹2L - ₹3L/year in living expenses, home-cooked food, lower stress, full access to online test series.",
              cons: "Can feel isolated; lacks immediate in-person peer discussion groups."
            },
            {
              choice: "Moving to Delhi Prep Hubs (ORN)",
              pros: "Surrounded by thousands of serious aspirants, 24/7 library culture, instant access to xerox notes.",
              cons: "Exorbitant rent, poor air quality/food hygiene, and high peer anxiety."
            }
          ]
        }
      ],
      warning: "The CSAT Trap: Overconfident candidates ignoring Paper 2 (CSAT math and reading comprehension) and failing the exam despite scoring 110+ in GS Paper 1.",
      fallbackPlan: "Simultaneously apply for State PCS (UPPSC, BPSC, MPSC, KPSC) and RBI Grade B / NABARD; 80% syllabus is identical to UPSC CSE.",
      realWorldStats: [
        {
          label: "Prelims Selection Rate",
          value: "~2.5% (13,000 candidates)",
          context: "Qualify for Mains out of 5+ lakh test-takers"
        },
        {
          label: "Mains Selection Rate",
          value: "~20% (2,800 candidates)",
          context: "Qualify for the Personality Interview"
        }
      ]
    },
    {
      year: "Interview & Service",
      title: "UPSC Personality Test & Foundation Academy (LBSNAA)",
      desc: "Stage 3: The 275-mark Personality Test at Dholpur House, New Delhi, followed by merit rank allotment, medical test, and training at LBSNAA Mussoorie.",
      investment: {
        time: "3 - 5 Months (DAF analysis, mock interviews, current affairs updates)",
        cost: "₹10,000 - ₹30,000 (Formal attire, travel to Delhi for UPSC interview, transcript reviews)"
      },
      actionItems: [
        {
          task: "Prepare every keyword on your Detailed Application Form (DAF): home state, hobbies, college degree, work experience.",
          detail: "UPSC interview board questions originate 70% from your personal DAF disclosures."
        },
        {
          task: "Attend 3-4 reputed mock interview panels with retired ambassadors, IAS officers, and psychologists.",
          detail: "Focus on humility, constitutional poise, body language, and graceful admission of 'I do not know, sir'."
        },
        {
          task: "Undergo mandatory medical examination at designated central hospitals in New Delhi.",
          detail: "Verification of height, eyesight, BMI, blood pressure, and physical benchmarks for IPS/IRS/IAS eligibility."
        }
      ],
      resources: [
        {
          name: "Lal Bahadur Shastri National Academy of Administration (LBSNAA)",
          type: "platform",
          url: "https://www.lbsnaa.gov.in",
          note: "Official portal of India's premier civil services training academy in Mussoorie."
        },
        {
          name: "Sardar Vallabhbhai Patel National Police Academy (SVPNPA)",
          type: "platform",
          url: "https://www.svpnpa.gov.in",
          note: "Elite training academy for Indian Police Service (IPS) probationers in Hyderabad."
        },
        {
          name: "Constitution of India (Ministry of Law and Justice)",
          type: "documentation",
          url: "https://legislative.gov.in/constitution-of-india",
          note: "The guiding constitutional beacon for an administrator's ethical decision making."
        }
      ],
      checkpoint: {
        criteria: "Securing AIR (All India Rank) within the service preference cutoff (typically Top 80-100 for IAS, Top 250 for IPS for general category).",
        deliverable: "President of India Gazetted Appointment Order and joining letter for the Foundation Course at LBSNAA."
      },
      decisionPoints: [
        {
          question: "Service Preference Selection (IAS vs IPS vs IFS vs IRS)",
          options: [
            {
              choice: "Indian Administrative Service (IAS)",
              pros: "Broadest administrative authority across healthcare, education, law & order, and district governance.",
              cons: "Frequent political interface, transfers across district postings."
            },
            {
              choice: "Indian Foreign Service (IFS)",
              pros: "Global diplomatic postings, diplomatic immunity, representing India at the UN and bilateral summits.",
              cons: "Long postings abroad away from family in India; distinct non-domestic administrative role."
            },
            {
              choice: "Indian Police Service (IPS)",
              pros: "Command of uniformed police force, immediate crime control, public safety, intelligence operations.",
              cons: "High-stress 24/7 operational duty, hazardous field emergencies."
            }
          ]
        }
      ],
      warning: "Bluffing or faking knowledge in the Interview: The board consists of seasoned bureaucrats with 35+ years of experience; attempting to misrepresent facts guarantees bottom-decile interview marks (under 120/275).",
      fallbackPlan: "If final rank is low (allotted Group B or Allied services), decide whether to join and prepare for an attempt from service, or take up State Deputy Collector post.",
      realWorldStats: [
        {
          label: "Final Selection Count",
          value: "900 - 1,100 Candidates",
          context: "Total appointments across all services annually"
        },
        {
          label: "Overall Exam Success Rate",
          value: "< 0.1%",
          context: "One of the most competitive public examinations in the world"
        },
        {
          label: "Starting Pay Band",
          value: "Pay Level 10 (₹56,100 basic + DA + HRA)",
          context: "Sub-Divisional Magistrate (SDM) / Assistant Collector"
        }
      ]
    }
  ]
};

export const sampleDoctor = {
  id: "doctor",
  title: "Medical Doctor",
  category: "Healthcare",
  timeline: [
    {
      year: "Class 11-12",
      title: "PCB Stream & NEET-UG Preparation",
      desc: "Focus on Physics, Chemistry, and Biology (Botany & Zoology). Secure 50%+ in Class 12 Boards and prepare for the national entrance exam (NEET-UG).",
      investment: {
        time: "2 Years (School + 4-6 hrs daily NEET preparation)",
        cost: "₹60,000 - ₹2,50,000 (School tuition, coaching institutes like Allen, Aakash, or PhysicsWallah)"
      },
      actionItems: [
        {
          task: "Memorize NCERT Biology line-by-line for both Class 11 and Class 12.",
          detail: "90 out of 100 questions in NEET Biology come verbatim or directly inferred from NCERT lines, diagrams, and summary boxes."
        },
        {
          task: "Solve 10,000+ numericals across Physics (Mechanics, Electrodynamics, Optics) and Chemistry (Physical, Organic mechanisms).",
          detail: "Physics is universally the rank-differentiating section in NEET-UG."
        },
        {
          task: "Take 30+ full 3-hour-20-minute OMR-based mock tests.",
          detail: "Practicing error-free bubbling on paper OMR sheets avoids careless negative marks (-1 per wrong answer)."
        }
      ],
      resources: [
        {
          name: "NCERT Biology (Class 11 & 12)",
          type: "book",
          url: "https://ncert.nic.in",
          note: "The single most critical book for NEET UG; must be revised 5-10 times."
        },
        {
          name: "Concepts of Physics by H.C. Verma (Vol 1 & 2)",
          type: "book",
          url: "https://www.bharatividyabhavan.org",
          note: "Mastering fundamental physics concepts and mechanics problem-solving."
        },
        {
          name: "PhysicsWallah / Allen Online Test Series",
          type: "course",
          url: "https://pw.live",
          note: "All-India ranking mock exams with detailed error logs and solutions."
        }
      ],
      checkpoint: {
        criteria: "Scoring 650+/720 marks in full-length mock tests to ensure an unreserved Government Medical College seat.",
        deliverable: "Class 12 PCB Marksheet (50%+ aggregate in PCB) and NEET-UG Scorecard."
      },
      decisionPoints: [
        {
          question: "Government Medical College (GMC) vs Private / Deemed University",
          options: [
            {
              choice: "Government Medical College (AIIMS, State GMCs, MAMC, KGMU)",
              pros: "Extremely affordable fees (₹5,000 - ₹50,000/yr), massive patient flow for clinical exposure.",
              cons: "Requires top 1-2% percentile in NEET UG; high patient-to-doctor stress."
            },
            {
              choice: "Private Medical College / Deemed University (KMC Manipal, DY Patil, SRM)",
              pros: "High-end infrastructure, modern laboratories, lower NEET cutoff requirement.",
              cons: "Exorbitant tuition costs (₹50 Lakhs - ₹1.2 Crore total 5-year cost)."
            }
          ]
        }
      ],
      warning: "Neglecting Physics: Spending 80% of study time on Biology because it's comfortable while ignoring Physics numericals results in a 550 score—just short of a government MBBS seat.",
      fallbackPlan: "If government MBBS cutoff is missed: consider BDS (Dental), BAMS (Ayurveda), B.Sc Nursing, or a dedicated 1-year drop if score was above 550; alternatively, consider authorized medical universities abroad (Uzbekistan, Georgia, Russia) that comply with NMC Foreign Medical Graduate Regulations.",
      realWorldStats: [
        {
          label: "NEET UG Aspirants",
          value: "24+ Lakh Students",
          context: "Annual candidates appearing nationally"
        },
        {
          label: "Government MBBS Seats",
          value: "~55,000 Seats",
          context: "Highly competitive < 3% acceptance rate"
        }
      ]
    },
    {
      year: "Year 1-5",
      title: "MBBS Degree (4.5 Years Academic Study)",
      desc: "Comprehensive 4.5-year medical curriculum divided into Pre-Clinical (Anatomy, Physiology, Biochemistry), Para-Clinical (Pathology, Microbiology, Pharmacology, Forensic), and Clinical phases (Medicine, Surgery, OBGYN, Pediatrics, ENT, Ophthalmology).",
      investment: {
        time: "4.5 Years (40-50 hours/week of lectures, cadaver dissection, lab practicals, and clinical ward postings)",
        cost: "₹25,000 - ₹2,50,000 (Govt Medical College) to ₹60 Lakhs - ₹1 Crore (Private Medical College)"
      },
      actionItems: [
        {
          task: "Complete 1st Year Anatomy cadaveric dissection, histology slides, and biochemical pathways.",
          detail: "Pass 1st Professional University MBBS examinations (Anatomy, Physiology, Biochemistry)."
        },
        {
          task: "Attend daily hospital clinical bedside postings in Medicine, General Surgery, and Obstetrics & Gynecology.",
          detail: "Learn systematic patient history taking, general physical examination, and systemic palpation/auscultation."
        },
        {
          task: "Build parallel conceptual prep for NEET PG / NExT (National Exit Test).",
          detail: "Begin solving clinical case vignettes and question banks (QBank) on Marrow or PrepLadder from 3rd year."
        }
      ],
      resources: [
        {
          name: "Robbins & Cotran Pathologic Basis of Disease",
          type: "book",
          url: "https://www.elsevier.com",
          note: "The international gold standard for pathology and disease pathophysiology."
        },
        {
          name: "Guyton and Hall Textbook of Medical Physiology",
          type: "book",
          url: "https://www.elsevier.com",
          note: "Unsurpassed textbook for understanding human organ systems and homeostasis."
        },
        {
          name: "Marrow / PrepLadder Medical App",
          type: "platform",
          url: "https://www.marrow.com",
          note: "Indispensable clinical QBank and video lectures tailored for Indian medical curriculum and NExT."
        },
        {
          name: "Littmann Classic III Stethoscope",
          type: "tool",
          url: "https://www.littmann.com",
          note: "The essential acoustic diagnostic tool for clinical ward postings."
        }
      ],
      checkpoint: {
        criteria: "Passing all four Professional University MBBS examinations (1st Prof, 2nd Prof, 3rd Prof Part 1, and Final Prof Part 2).",
        deliverable: "Provisional MBBS Degree Certificate and eligibility for Rotatory Clinical Internship."
      },
      decisionPoints: [
        {
          question: "Clinical Case Practice vs Exam-Oriented MCQ Cramming during MBBS",
          options: [
            {
              choice: "Deep Hospital Bedside Clinical Learning",
              pros: "Creates superior diagnostic acumen, builds patient rapport, invaluable during internship and residency.",
              cons: "Takes time away from memorizing factual MCQ test banks for entrance exams."
            },
            {
              choice: "App-First Digital Video Prep (Marrow / Dams / PrepLadder)",
              pros: "Maximizes NEET PG / NExT score, ensures high recall of high-yield facts.",
              cons: "Weak practical hands-on bedside skills if ward postings are bunked."
            }
          ]
        }
      ],
      warning: "Bunking clinical ward postings for video apps: You cannot learn patient palpation, heart murmurs, or emergency triage from a smartphone screen; hands-on examination is irreplaceable.",
      fallbackPlan: "If an academic university exam is failed in one subject, sit for the supplementary examination 6-8 weeks later without losing a full academic year.",
      realWorldStats: [
        {
          label: "Course Duration",
          value: "4.5 Years Academic + 1 Year Internship",
          context: "Total 5.5 Years minimum"
        },
        {
          label: "Total Medical Subjects",
          value: "19 Core Subjects",
          context: "Covered across 4 Professional exam phases"
        }
      ]
    },
    {
      year: "Year 6",
      title: "Compulsory Rotatory Internship (CRMI - 1 Year)",
      desc: "One year mandatory clinical rotation across Emergency Medicine, General Medicine, Surgery, Obstetrics & Gynecology, Pediatrics, Orthopedics, and Rural Health Centers (PHC/CHC).",
      investment: {
        time: "12 Months (60 - 80 hours/week including 24-hour and 36-hour night emergency calls)",
        cost: "₹0 (Interns earn a monthly stipend: ₹15,000 - ₹35,000 in Govt hospitals; ₹5,000 - ₹12,000 in private)"
      },
      actionItems: [
        {
          task: "Execute essential emergency procedures: IV cannulation, catheterization, Ryle's tube insertion, suturing, and arterial blood gas (ABG) sampling.",
          detail: "First line of management in casualty, ICU, and labor rooms under Senior Resident supervision."
        },
        {
          task: "Complete 2-3 months mandatory Rural Health Training at Primary Health Centers (PHC).",
          detail: "Gain ground-level community medicine experience in maternal-child health and national immunization drives."
        },
        {
          task: "Revise high-yield clinical subjects and solve 50-100 MCQs daily during off-duty hours for NEET PG / INI-CET.",
          detail: "Balancing exhausting night shifts with PG entrance revision is the biggest challenge of an intern's life."
        }
      ],
      resources: [
        {
          name: "National Medical Commission (NMC) CRMI Guidelines",
          type: "documentation",
          url: "https://www.nmc.org.in",
          note: "Statutory curriculum and mandatory logbook for medical intern rotations."
        },
        {
          name: "Oxford Handbook of Clinical Medicine",
          type: "book",
          url: "https://global.oup.com",
          note: "Pocket-sized bedside emergency protocol guide for ward calls."
        },
        {
          name: "UpToDate Clinical Decision Support",
          type: "platform",
          url: "https://www.uptodate.com",
          note: "Evidence-based point-of-care medical resource used in intensive care and ward rounds."
        }
      ],
      checkpoint: {
        criteria: "Satisfactory completion of all mandatory department rotations and signed internship logbook verified by Medical Superintendent.",
        deliverable: "Permanent MBBS Degree Certificate and Permanent State / National Medical Council (SMC/NMC) Registration Number (Medical License)."
      },
      decisionPoints: [
        {
          question: "Immediate PG Entrance Attempt vs Junior Residency (Non-Academic JR) vs Medical Officer (MO) Job",
          options: [
            {
              choice: "Full-Time Dedicated Study for NEET PG / INI-CET (Drop Year)",
              pros: "100% focus on securing desired MD/MS clinical branch (Dermatology, Radiology, General Medicine).",
              cons: "One year without clinical practice or active income."
            },
            {
              choice: "Work as Junior Resident (JR) / Medical Officer (MO)",
              pros: "Earn ₹60,000 - ₹95,000/month, gain real OPD and casualty experience, financial independence.",
              cons: "Exhausting hospital shifts leave very little energy for daily PG preparation."
            }
          ]
        }
      ],
      warning: "Burnout and sleep deprivation hazards: Working 36-hour continuous shifts leads to severe medical error risk; learn to seek senior help and prioritize sleep hygiene.",
      fallbackPlan: "If NEET PG is not cleared in the intern year, practice as a licensed General Physician (GP) or ICU Junior Resident while studying for the next exam cycle.",
      realWorldStats: [
        {
          label: "Internship Stipend (Central GMCs)",
          value: "₹25,000 - ₹32,000/month",
          context: "AIIMS, VMMC Safdarjung, MAMC Delhi"
        },
        {
          label: "Internship Stipend (State GMCs)",
          value: "₹12,000 - ₹20,000/month",
          context: "Varies by individual state government"
        }
      ]
    },
    {
      year: "Post-MBBS",
      title: "Postgraduate Specialization (MD / MS / DNB - 3 Years)",
      desc: "Clear NEET PG or INI-CET (AIIMS/PGI/JIPMER) to enter 3-year residency in specialized Doctor of Medicine (MD) or Master of Surgery (MS), followed by optional Super-Specialization (DM/MCh).",
      investment: {
        time: "3 Years Residency (70-90 hours/week in specialized surgical/medical units)",
        cost: "₹0 (Postgraduate junior residents earn full academic stipend: ₹65,000 - ₹1,20,000/month)"
      },
      actionItems: [
        {
          task: "Secure top rank in NEET-PG (1.8+ lakh MBBS doctors) or INI-CET.",
          detail: "Top 2,000 ranks required for clinical branches like Radiology, General Medicine, Pediatrics, and Dermatology."
        },
        {
          task: "Conduct independent clinical research thesis and publish at least 1 paper in an indexed peer-reviewed journal (PubMed/Scopus).",
          detail: "Mandatory requirement by NMC for award of MD/MS degree."
        },
        {
          task: "Perform independent surgeries (for MS) or manage complex tertiary care ICU/OPD cases (for MD).",
          detail: "Transition from observer to fully independent consulting clinician."
        }
      ],
      resources: [
        {
          name: "Harrison's Principles of Internal Medicine (21st Edition)",
          type: "book",
          url: "https://www.accessmedicine.mhmedical.com",
          note: "The definitive global authority for internal medicine specialists."
        },
        {
          name: "Bailey & Love's Short Practice of Surgery",
          type: "book",
          url: "https://www.crcpress.com",
          note: "The premier clinical and operative reference for general surgical residents."
        },
        {
          name: "PubMed / Medline (National Library of Medicine)",
          type: "platform",
          url: "https://pubmed.ncbi.nlm.nih.gov",
          note: "Primary repository for peer-reviewed clinical research and clinical trials."
        }
      ],
      checkpoint: {
        criteria: "Passing MD/MS Final Theory and Clinical/Practical examinations with accepted thesis defense.",
        deliverable: "Postgraduate Degree (MD/MS/DNB) and Specialist Registration with National Medical Commission."
      },
      decisionPoints: [
        {
          question: "Medical Branch (MD Medicine, Pediatrics) vs Surgical Branch (MS Surgery, Orthopedics, OBGYN) vs Non-Clinical",
          options: [
            {
              choice: "Clinical Medical Specialization (MD General Medicine, Pediatrics, Dermatology)",
              pros: "High diagnostic satisfaction, non-surgical clinic practice, strong long-term private OPD earnings.",
              cons: "Long wait for DM super-specialization (Cardio, Gastro, Neuro) to reach top tier."
            },
            {
              choice: "Surgical Specialization (MS General Surgery, Ortho, OBGYN)",
              pros: "High procedural revenue, surgical mastery, direct interventional patient recovery.",
              cons: "Extremely long learning curve; hand tremors, physical standing fatigue, medico-legal litigation risks."
            }
          ]
        }
      ],
      warning: "Choosing a branch based on someone else's prestige rather than personal lifestyle compatibility: Do not pick Neurosurgery or OBGYN if you want regular 9-to-5 working hours; surgical emergencies strike at 3 AM throughout life.",
      fallbackPlan: "DNB (Diplomate of National Board) programs run by the National Board of Examinations (NBE) in top private tertiary hospitals (Apollo, Fortis, Max) offer equivalent qualification, modern equipment, and identical pay.",
      realWorldStats: [
        {
          label: "PG Resident Monthly Stipend",
          value: "₹65,000 - ₹1,15,000/month",
          context: "Paid to all MD/MS residents across India"
        },
        {
          label: "Starting Specialist Salary",
          value: "₹18L - ₹36L/yr",
          context: "Fresh MD/MS consultant in private hospitals/metros"
        },
        {
          label: "Senior Consultant / Super-Specialist",
          value: "₹45L - ₹1.5 Cr+/yr",
          context: "Established DM/MCh consultants with private practice"
        }
      ]
    }
  ]
};
