import fs from 'fs';
import { fullBusinessRoadmaps } from './compile_business_module.mjs';

const startupFounder = [
  {
    investment: {
      time: "3-6 Months intensive customer discovery and problem validation",
      cost: "₹10,000 - ₹50,000 (Domain registration, landing page tools, customer interview coffee chats)"
    },
    actionItems: [
      {
        task: "Conduct 50+ problem-discovery customer interviews following 'The Mom Test' methodology.",
        detail: "Never ask 'Would you buy this idea?'; ask about specific past experiences, current workarounds, and how much money/time the pain point cost them last month."
      },
      {
        task: "Launch a Smoke Test Landing Page (Carrd / Framer) with a clear value proposition and call-to-action.",
        detail: "Measure organic waitlist signups, click-through rates, and willingness to pay before writing a single line of backend code."
      },
      {
        task: "Find a complementary co-founder with aligned values and clear equity split.",
        detail: "Pair a technical builder (CTO) with a domain/commercial seller (CEO); formalize a 4-year vesting schedule with a 1-year cliff."
      }
    ],
    resources: [
      {
        name: "Y Combinator Startup School (Free Curriculum)",
        type: "course",
        url: "https://www.startupschool.org",
        note: "The world's best free curriculum for idea validation, talking to users, and finding co-founders."
      },
      {
        name: "The Lean Startup by Eric Ries",
        type: "book",
        url: "https://theleanstartup.com",
        note: "The modern framework for Build-Measure-Learn feedback loops and validated learning."
      },
      {
        name: "Paul Graham Essays (How to Get Startup Ideas, Do Things that Don't Scale)",
        type: "platform",
        url: "https://paulgraham.com/articles.html",
        note: "Foundational philosophy on organic startup genesis and customer obsession."
      }
    ],
    checkpoint: {
      criteria: "Identifying a hair-on-fire problem with at least 10 prospective customers committing advance deposits or LOIs (Letters of Intent).",
      deliverable: "Documented customer interview log, validated problem statement, and signed co-founder vesting agreement."
    },
    decisionPoints: [
      {
        question: "Solo Founder vs Finding a Technical/Commercial Co-Founder",
        options: [
          {
            choice: "Find a Co-Founder (Technical + Business Pairing)",
            pros: "Shared psychological burden, complementary skillsets, higher acceptance rate into top accelerators (YC).",
            cons: "Potential co-founder disputes (the #1 killer of early-stage startups); dilution of initial equity."
          },
          {
            choice: "Solo Founder Route",
            pros: "100% equity ownership, absolute decision-making speed without debate.",
            cons: "High emotional loneliness; must be a full-stack unicorn able to both code and sell."
          }
        ]
      }
    ],
    warning: "Building in secret for 9 months without showing your product to real customers: The biggest mistake founders make is building something nobody actually wants or pays for.",
    fallbackPlan: "If customer validation fails, pivot to an adjacent pain point discovered during interviews without emotional attachment to the initial idea.",
    realWorldStats: [
      {
        label: "Primary Reason for Startup Failure",
        value: "42% No Market Need",
        context: "CB Insights post-mortem analysis of failed startups"
      },
      {
        label: "Standard Co-Founder Vesting",
        value: "4 Years with 1-Year Cliff",
        context: "Industry legal standard to prevent equity abandonment"
      }
    ]
  },
  {
    investment: {
      time: "6-12 Months rapid iterative prototyping and customer onboarding",
      cost: "₹50,000 - ₹3,00,000 (Cloud hosting credits, developer tools, initial marketing experiments)"
    },
    actionItems: [
      {
        task: "Build a Minimum Viable Product (MVP) in under 6 weeks and launch to early adopters.",
        detail: "Cut all non-essential features; focus exclusively on the single core action that delivers the 'Aha!' moment."
      },
      {
        task: "Do things that don't scale: manually onboard your first 100 customers one by one.",
        detail: "Sit next to users, watch where they get confused, solve their issues via WhatsApp/Slack, and establish feedback loops."
      },
      {
        task: "Measure Product-Market Fit (PMF) via the Sean Ellis Survey.",
        detail: "Ask users: 'How would you feel if you could no longer use this product?' Target at least 40% answering 'Very Disappointed'."
      }
    ],
    resources: [
      {
        name: "Zero to One by Peter Thiel & Blake Masters",
        type: "book",
        url: "https://www.penguinrandomhouse.com",
        note: "How to build proprietary technology, capture monopolies, and escape destructive competition."
      },
      {
        name: "First Round Review (Startup Articles & Frameworks)",
        type: "platform",
        url: "https://review.firstround.com",
        note: "Tactical, operational case studies from the world's most successful tech operators."
      },
      {
        name: "Stripe Atlas Startup Incorporations & Guides",
        type: "platform",
        url: "https://stripe.com/atlas",
        note: "Seamless US/Delaware and international legal incorporation and banking for global startups."
      }
    ],
    checkpoint: {
      criteria: "Achieving consistent Month-over-Month organic revenue or user growth (>15% MoM) with 40%+ answering 'Very Disappointed' on PMF survey.",
      deliverable: "Live commercial product, active paying customer base, and automated cohort retention charts."
    },
    decisionPoints: [
      {
        question: "Bootstrapping (Profitable from Day 1) vs Venture Capital Track",
        options: [
          {
            choice: "Bootstrapping (Self-Funded / Customer-Funded)",
            pros: "Founders retain 100% control and ownership, no investor pressure, focus on sustainable cash flow (e.g. Zoho, Zerodha).",
            cons: "Slower initial growth; personal financial risk; limited capital for aggressive hiring."
          },
          {
            choice: "Venture Capital Track",
            pros: "Millions in growth capital, rapid scaling, ability to capture winner-take-all markets, prestige network.",
            cons: "Heavy dilution; board governance; pressure to grow 3x annually or face recapitalization."
          }
        ]
      }
    ],
    warning: "Confusing user signups with retention: A leaky bucket with 10,000 signups but 95% 30-day churn is not a business; fix retention before spending money on user acquisition.",
    fallbackPlan: "Run the product as a profitable lifestyle micro-SaaS or agency service business generating steady recurring revenue.",
    realWorldStats: [
      {
        label: "Product-Market Fit Benchmark",
        value: "40%+ 'Very Disappointed'",
        context: "Sean Ellis test benchmark indicating true product-market fit"
      },
      {
        label: "Typical Seed Round Size",
        value: "$500k - $2 Million",
        context: "Raised by top Indian and global early-stage startups"
      }
    ]
  },
  {
    investment: {
      time: "3-6 Months fundraising process (Seed / Series A)",
      cost: "₹1,00,000 - ₹5,00,000 (Legal corporate fees, SHA drafting, company valuation reports)"
    },
    actionItems: [
      {
        task: "Draft an irresistible 10-slide Pitch Deck and clean financial model.",
        detail: "Articulate Problem, Solution, Market Size (TAM/SAM/SOM), Traction Metrics, Business Model, Moat, and Team pedigree."
      },
      {
        task: "Build relationships with Angel Investors, Micro-VCs, and institutional Seed funds.",
        detail: "Run a disciplined, concurrent fundraising process over 4-6 weeks to create investor FOMO and clean term-sheet competition."
      },
      {
        task: "Negotiate Term Sheets, Shareholders' Agreements (SHA), and Cap Table dilution.",
        detail: "Avoid punitive liquidation preferences (ensure 1x non-participating); protect founder board control."
      }
    ],
    resources: [
      {
        name: "Venture Deals: Be Smarter Than Your Lawyer and Venture Capitalist (Brad Feld & Jason Mendelson)",
        type: "book",
        url: "https://www.venturedeals.com",
        note: "The definitive guide to understanding term sheets, valuations, liquidation preferences, and cap tables."
      },
      {
        name: "AngelList / Carta Cap Table Management",
        type: "tool",
        url: "https://carta.com",
        note: "Industry-standard platform for managing equity ownership, ESOP pools, and investor rounds."
      },
      {
        name: "Inc42 & YourStory Startup Ecosystem Coverage",
        type: "platform",
        url: "https://inc42.com",
        note: "Leading Indian startup ecosystem media tracking seed deals, policy reforms, and venture funds."
      }
    ],
    checkpoint: {
      criteria: "Closing a Seed or Pre-Series A funding round with capital wired to corporate bank account.",
      deliverable: "Signed Shareholders' Agreement (SHA), updated Carta cap table, and 24-month cash runway."
    },
    decisionPoints: [
      {
        question: "SAFE / Convertible Notes vs Priced Equity Round",
        options: [
          {
            choice: "SAFE (Simple Agreement for Future Equity) / Convertible Note",
            pros: "Fast execution, saves weeks of legal negotiations, postpones formal valuation discussion until Series A.",
            cons: "Cap table math can become surprisingly dilutive if multiple notes with different caps are stacked."
          },
          {
            choice: "Priced Equity Round",
            pros: "Clear valuation, fixed share allocation, formalized board structure and investor alignment.",
            cons: "Higher legal costs (₹3L - ₹10L) and longer due diligence closing period."
          }
        ]
      }
    ],
    warning: "Optimizing for the highest valuation at Seed stage: Setting an artificially high seed valuation creates massive down-round risk if you fail to hit aggressive milestones for Series A.",
    fallbackPlan: "If institutional VC funds pass, raise a smaller angel round from successful domain operators or rely strictly on customer prepayment cash flows.",
    realWorldStats: [
      {
        label: "Typical Seed Dilution",
        value: "10% - 20% Equity",
        context: "Standard equity given up in a healthy seed round"
      },
      {
        label: "Investor Pitch Conversion",
        value: "1% - 3%",
        context: "Founders typically pitch 50-100 investors to close 2-3 term sheets"
      }
    ]
  },
  {
    investment: {
      time: "2-5 Years hypergrowth scaling (Series A to Series C / Pre-IPO)",
      cost: "₹10,00,000 - ₹50,00,000+ (Corporate audit, executive search, global regulatory expansion)"
    },
    actionItems: [
      {
        task: "Hire executive leadership: VP of Engineering, VP of Sales, Head of Marketing, and Head of People.",
        detail: "Transition from doing the work yourself to building systems, accountability, and hiring operators better than you."
      },
      {
        task: "Optimize unit economics: Customer Acquisition Cost (CAC), Lifetime Value (LTV), Payback Period, and Net Dollar Retention (NDR).",
        detail: "Target an LTV/CAC ratio > 3x and customer payback period < 12 months for sustainable enterprise scalability."
      },
      {
        task: "Institutionalize company culture, core values, and transparent board reporting.",
        detail: "Maintain monthly investor updates, rigorous financial audits (Big 4), and high employee net promoter scores (eNPS)."
      }
    ],
    resources: [
      {
        name: "The Hard Thing About Hard Things by Ben Horowitz",
        type: "book",
        url: "https://www.harpercollins.com",
        note: "Brutally honest insights on firing executives, surviving peacetime vs wartime CEO decisions, and managing your own psychology."
      },
      {
        name: "High Output Management by Andrew S. Grove (Former CEO of Intel)",
        type: "book",
        url: "https://www.penguinrandomhouse.com",
        note: "The legendary operating manual on managerial leverage, meeting structures, and operational output."
      },
      {
        name: "SaaStr Community & Annual Conference (Jason Lemkin)",
        type: "platform",
        url: "https://www.saastr.com",
        note: "World's largest community for scaling B2B software companies from $1M to $100M+ ARR."
      }
    ],
    checkpoint: {
      criteria: "Reaching ₹100Cr+ Annual Recurring Revenue with positive operating cash flows or executing a major liquidity event (IPO / M&A acquisition).",
      deliverable: "Audited financial balance sheet, multi-million dollar annual revenue run rate, and liquid shareholder returns."
    },
    decisionPoints: [
      {
        question: "IPO on Indian Stock Exchanges (NSE/BSE) vs Strategic M&A Acquisition by Global Tech Giant",
        options: [
          {
            choice: "Public IPO (BSE / NSE Mainboard Listing)",
            pros: "Ultimate entrepreneurial independence, massive liquidity for founders and early employees, corporate legacy.",
            cons: "Quarterly public market scrutiny; high ongoing compliance and earnings disclosure obligations."
          },
          {
            choice: "Strategic Trade Sale / Acquisition",
            pros: "Guaranteed cash/stock exit, integration into global distribution, immediate founder liquidity.",
            cons: "Loss of product independence; cultural friction with acquiring conglomerate."
          }
        ]
      }
    ],
    warning: "Premature scaling before achieving unit economics: Spending venture capital on massive advertising campaigns when your churn is high will incinerate your bank account in 12 months.",
    fallbackPlan: "Execute a corporate restructuring, cut unprofitable business units to achieve default-alive profitability, and operate the company as a durable cash-generative enterprise.",
    realWorldStats: [
      {
        label: "Benchmark SaaS Unit Economics",
        value: "LTV/CAC > 3x, Payback < 12 Mo",
        context: "Golden standard for sustainable hypergrowth"
      },
      {
        label: "Founder Wealth at Liquidity",
        value: "₹50 Cr - ₹500 Cr+",
        context: "Value of equity stake for founders taking companies to successful IPOs"
      }
    ]
  }
];

const supplyChain = [
  {
    investment: {
      time: "2 Years (High school education + mathematics & commerce foundations)",
      cost: "₹20,000 - ₹60,000 (School tuition & foundational books)"
    },
    actionItems: [
      {
        task: "Master Class 11-12 Mathematics, Statistics, and Business Studies.",
        detail: "Linear programming, inventory optimization formulas, and commercial trade terms (Incoterms) require strong math basics."
      },
      {
        task: "Understand basic e-commerce logistics and warehousing networks (Amazon Fulfillment, Delhivery).",
        detail: "Learn how packages move from seller to hub, fulfillment center, sort center, and last-mile delivery."
      },
      {
        task: "Learn Microsoft Excel for logistics: VLOOKUP, pivot tables, and basic transportation problem modeling.",
        detail: "Excel remains the workhorse of operational dispatchers and supply chain planners worldwide."
      }
    ],
    resources: [
      {
        name: "Supply Chain Management: Strategy, Planning, and Operation (Sunil Chopra & Peter Meindl)",
        type: "book",
        url: "https://www.pearson.com",
        note: "The international academic bible for supply chain networks, forecasting, and inventory."
      },
      {
        name: "Council of Supply Chain Management Professionals (CSCMP)",
        type: "documentation",
        url: "https://cscmp.org",
        note: "Global professional association providing supply chain definitions, research, and career guides."
      },
      {
        name: "The Goal: A Process of Ongoing Improvement by Eliyahu M. Goldratt",
        type: "book",
        url: "https://www.toc-goldratt.com",
        note: "Transformative business novel introducing the Theory of Constraints (TOC) and manufacturing bottlenecks."
      }
    ],
    checkpoint: {
      criteria: "Scoring 80%+ in Class 12 Boards and completing an inventory analysis project for a local retail shop.",
      deliverable: "Class 12 Passing Marksheet and basic Excel inventory replenishment spreadsheet."
    },
    decisionPoints: [
      {
        question: "B.Tech in Industrial / Mechanical Engineering vs BBA in Supply Chain / Logistics",
        options: [
          {
            choice: "B.Tech in Industrial / Mechanical Engineering",
            pros: "Deep mathematical modeling, plant layout optimization, automation, robotics, high placement in manufacturing.",
            cons: "Heavier technical engineering syllabus outside of commercial trade."
          },
          {
            choice: "BBA / B.Com in Supply Chain & Logistics",
            pros: "Direct focus on procurement, customs compliance, freight forwarding, and commercial warehousing.",
            cons: "Less training in advanced manufacturing automation and operations research algorithms."
          }
        ]
      }
    ],
    warning: "Viewing logistics as merely driving trucks: Modern supply chain is a sophisticated mathematical science leveraging demand forecasting algorithms, RFID tracking, and multi-echelon inventory optimization.",
    fallbackPlan: "Pursue a standard degree in engineering, commerce, or economics; top supply chain firms recruit heavily from all quantitative backgrounds.",
    realWorldStats: [
      {
        label: "Indian Logistics Market Size",
        value: "$380+ Billion",
        context: "Critical backbone representing 13-14% of Indian GDP"
      },
      {
        label: "National Logistics Policy Target",
        value: "Reduce Logistics Cost < 10% GDP",
        context: "Government of India strategic economic priority"
      }
    ]
  },
  {
    investment: {
      time: "3-4 Years (Undergraduate degree + operational internships)",
      cost: "₹1,50,000 - ₹8,00,000 (Degree tuition fees across accredited universities)"
    },
    actionItems: [
      {
        task: "Master core inventory control models: Economic Order Quantity (EOQ), Safety Stock, Reorder Point (ROP), and ABC/XYZ analysis.",
        detail: "Calculate holding costs, stockout penalties, and lead-time variability across thousands of SKUs."
      },
      {
        task: "Learn warehouse management systems (WMS), transport management systems (TMS), and barcode/RFID operations.",
        detail: "Understand cross-docking, pick-and-pack routing, slotting optimization, and cold chain protocols."
      },
      {
        task: "Complete summer internships at logistics firms (Delhivery, Blue Dart), e-commerce giants (Flipkart, Amazon), or FMCG plants.",
        detail: "Participate in real warehouse shift audits, freight invoice reconciliations, and on-time in-full (OTIF) tracking."
      }
    ],
    resources: [
      {
        name: "Operations Management by William J. Stevenson",
        type: "book",
        url: "https://www.mheducation.com",
        note: "Comprehensive guide to capacity planning, quality control (Six Sigma), and aggregate scheduling."
      },
      {
        name: "MIT Center for Transportation & Logistics (MicroMasters on edX)",
        type: "course",
        url: "https://ctl.mit.edu",
        note: "World-leading online curriculum in supply chain design, dynamics, and technology."
      },
      {
        name: "Logistics Bureau Knowledge Hub",
        type: "platform",
        url: "https://www.logisticsbureau.com",
        note: "Pragmatic industry consulting articles on warehouse slotting, freight benchmarking, and 3PL contracts."
      }
    ],
    checkpoint: {
      criteria: "Successfully completing a 2-month warehouse operations internship with a documented project improving dock turnaround time or picking accuracy.",
      deliverable: "Internship Certificate and verified project presentation on warehouse operational efficiency."
    },
    decisionPoints: [
      {
        question: "3PL Logistics Service Providers (Delhivery, DHL) vs In-House Supply Chain (Unilever, P&G, Apple)",
        options: [
          {
            choice: "In-House Brand Supply Chain (FMCG / Electronics / Auto)",
            pros: "Strategic long-term demand planning, high corporate prestige, stable corporate environment.",
            cons: "Slower exposure to diverse freight transportation networks."
          },
          {
            choice: "Third-Party Logistics (3PL / 4PL Providers)",
            pros: "Fast-paced operational environment, managing logistics for hundreds of enterprise clients.",
            cons: "High-pressure operations with 24/7 dispatch escalations and tight delivery SLAs."
          }
        ]
      }
    ],
    warning: "Ignoring Bullwhip Effect in supply chains: Minor fluctuations in consumer demand amplify wildly up the supply chain, causing disastrous overproduction and massive dead inventory.",
    fallbackPlan: "Target Procurement Specialist or Freight Operations Coordinator roles at multinational trading or export-import houses.",
    realWorldStats: [
      {
        label: "Junior SCM Trainee CTC",
        value: "₹5L - ₹11L/yr",
        context: "Fresh undergraduate campus placements in manufacturing & e-commerce"
      },
      {
        label: "On-Time Delivery Benchmark",
        value: "98.5%+ OTIF",
        context: "Standard enterprise service-level agreement target"
      }
    ]
  },
  {
    investment: {
      time: "2 Years (Specialized MBA in Supply Chain / Operations at IIM Mumbai / NITIE, SPJIMR, or IIT Bombay)",
      cost: "₹12,00,000 - ₹24,00,000 (Tuition and campus hostel fees)"
    },
    actionItems: [
      {
        task: "Score in the 97th+ percentile in CAT to secure admission into premier operations institutes (IIM Mumbai / NITIE).",
        detail: "Excel in quantitative analysis and operations management case interviews."
      },
      {
        task: "Master Sales and Operations Planning (S&OP) and Integrated Business Planning (IBP).",
        detail: "Align unconstrained marketing sales forecasts with manufacturing plant capacity and working capital limits."
      },
      {
        task: "Earn Lean Six Sigma Green Belt / Black Belt certification.",
        detail: "Lead DMAIC (Define, Measure, Analyze, Improve, Control) statistical defect-reduction projects."
      }
    ],
    resources: [
      {
        name: "IIM Mumbai (formerly NITIE) Operations & SCM Curriculum",
        type: "documentation",
        url: "https://iimmumbai.ac.in",
        note: "India's undisputed 'Mecca of Supply Chain and Operations Management' education."
      },
      {
        name: "American Society for Quality (ASQ) Six Sigma Body of Knowledge",
        type: "documentation",
        url: "https://asq.org",
        note: "Authoritative international standards for Lean Six Sigma methodologies and quality engineering."
      },
      {
        name: "Supply Chain Digest & Supply Chain Dive",
        type: "platform",
        url: "https://www.supplychaindive.com",
        note: "Daily tracking of global container shipping rates, port congestions, and automation trends."
      }
    ],
    checkpoint: {
      criteria: "Securing a Day Zero Supply Chain Management Trainee placement at an FMCG/E-Commerce leader (Amazon, HUL, ITC, Asian Paints).",
      deliverable: "MBA Degree in Operations / SCM and signed corporate placement offer letter."
    },
    decisionPoints: [
      {
        question: "Manufacturing Plant Operations vs Strategic Global Procurement & Sourcing",
        options: [
          {
            choice: "Strategic Procurement / Direct Sourcing",
            pros: "Managing multi-hundred-crore vendor negotiations, global travel, corporate headquarters location.",
            cons: "Vulnerable to sudden raw material price shocks and geopolitical export tariffs."
          },
          {
            choice: "Plant Operations / Factory Logistics Manager",
            pros: "Hands-on industrial authority, managing hundreds of factory workers, direct production output.",
            cons: "Locations typically in industrial manufacturing zones outside major metro cities."
          }
        ]
      }
    ],
    warning: "Relying on single-source suppliers for critical components: Geopolitical embargos or factory fires at a single supplier will completely halt your entire assembly line (as seen during global chip shortages).",
    fallbackPlan: "If tier-1 operations MBA cutoffs are missed, join supply chain consulting at Big 4 (Deloitte, PwC Operations Advisory) and work on warehouse automation transformations.",
    realWorldStats: [
      {
        label: "IIM Mumbai (NITIE) Average CTC",
        value: "₹28L - ₹32L/yr",
        context: "Premier supply chain campus placements in India"
      },
      {
        label: "FMCG SCM Summer Stipend",
        value: "₹2.5L - ₹4L / 2 Months",
        context: "Paid to top MBA operations interns"
      }
    ]
  },
  {
    investment: {
      time: "3-6 Years (Senior Supply Chain Director to Chief Supply Chain Officer / VP of Operations)",
      cost: "₹50,000 - ₹2,00,000 (APICS CSCP certification ₹1.2L + SAP S/4HANA enterprise credentials)"
    },
    actionItems: [
      {
        task: "Earn the APICS CSCP (Certified Supply Chain Professional) credential from ASCM.",
        detail: "The globally recognized gold-standard charter for end-to-end supply chain mastery."
      },
      {
        task: "Architect enterprise Digital Supply Chain transformations using SAP S/4HANA, Kinaxis RapidResponse, or Blue Yonder.",
        detail: "Implement AI-driven demand sensing, dynamic control towers, and automated supplier network integration."
      },
      {
        task: "Lead Global Supply Chain Resilience and ESG Sustainable Sourcing strategies.",
        detail: "Achieve Scope 3 carbon emission reductions, circular packaging mandates, and dual-sourcing supply risk mitigation."
      }
    ],
    resources: [
      {
        name: "Association for Supply Chain Management (ASCM / APICS)",
        type: "platform",
        url: "https://www.ascm.org",
        note: "Global leader in supply chain organizational transformation, certifications (CSCP, CPIM), and benchmarks."
      },
      {
        name: "SAP S/4HANA Supply Chain Management Documentation",
        type: "documentation",
        url: "https://www.sap.com/products/scm.html",
        note: "The enterprise ERP standard governing global production planning, materials management (MM), and extended warehouse management (EWM)."
      },
      {
        name: "Gartner Supply Chain Top 25 Ranking & Research",
        type: "platform",
        url: "https://www.gartner.com",
        note: "Annual benchmark celebrating the world's most resilient and innovative corporate supply chains."
      }
    ],
    checkpoint: {
      criteria: "Passing the APICS CSCP exam and successfully leading an enterprise S/4HANA or control tower digital deployment.",
      deliverable: "Official APICS CSCP Credential and verified enterprise operational cost-reduction report."
    },
    decisionPoints: [
      {
        question: "Corporate VP of Supply Chain (FMCG/Auto) vs Country Operations Head (Amazon/Flipkart)",
        options: [
          {
            choice: "Country Operations Head at E-Commerce / Quick-Commerce (Amazon, Blinkit, Swiggy)",
            pros: "Massive speed of execution, hyper-scaling 10-minute delivery dark store networks, high equity compensation.",
            cons: "Extremely high operational stress; 24/7 on-call escalations during festive sales."
          },
          {
            choice: "VP of Global Supply Chain at FMCG/Manufacturing Conglomerate",
            pros: "Strategic global sourcing networks, predictable corporate cadence, massive multi-thousand-crore budget control.",
            cons: "Slower pace of technological change; complex legacy distribution distributor networks."
          }
        ]
      }
    ],
    warning: "Ignoring cyber risk in connected warehouse IoT and automated sorting facilities: Ransomware attacking automated WMS systems can freeze nationwide dispatches for weeks.",
    fallbackPlan: "Operate as an independent Global Logistics Consultant or supply chain partner at specialized private equity advisory firms.",
    realWorldStats: [
      {
        label: "Supply Chain Director CTC",
        value: "₹50L - ₹1.1 Cr+/yr",
        context: "Senior supply chain leadership at Indian enterprises & GCCs"
      },
      {
        label: "CSCP Certified Salary Premium",
        value: "27% Higher",
        context: "Average salary premium for APICS certified supply chain professionals (ASCM)"
      }
    ]
  }
];

const allBusiness = {
  ...fullBusinessRoadmaps,
  "startup-founder": startupFounder,
  "supply-chain": supplyChain
};

const code = `// Business & Finance domain enriched roadmap data
export const businessRoadmaps = ${JSON.stringify(allBusiness, null, 2)};
`;

fs.writeFileSync('./backend/src/data/enriched/business.js', code, 'utf8');
console.log('Successfully written complete backend/src/data/enriched/business.js with 8 roadmaps!');
