import fs from 'fs';

// Read existing actuary from business.js or recreate full businessRoadmaps
import { businessRoadmaps as partial } from '../backend/src/data/enriched/business.js';

const actuary = partial.actuary;

const financialAnalyst = [
  {
    investment: {
      time: "2 Years (High school commerce/math curriculum + financial news reading)",
      cost: "₹25,000 - ₹80,000 (School tuition & accounting reference books)"
    },
    actionItems: [
      {
        task: "Build strong command over Class 11-12 Accountancy and Economics.",
        detail: "Understand the three financial statements (Balance Sheet, P&L, Cash Flow) and macroeconomic indicators (GDP, Repo Rate, CPI Inflation)."
      },
      {
        task: "Read The Economic Times or Mint daily to track corporate earnings and RBI monetary policy.",
        detail: "Understand quarterly earnings calls (Q1/Q2/Q3/Q4), EBITDA margins, and debt-to-equity ratios."
      },
      {
        task: "Practice financial mathematics in Excel: PMT, NPV, IRR, CAGR, and compound growth formulas.",
        detail: "Calculate loan amortization tables and discounted future cash flows."
      }
    ],
    resources: [
      {
        name: "Financial Statements: A Step-by-Step Guide by Thomas Ittelson",
        type: "book",
        url: "https://www.careerpress.com",
        note: "The best intuitive visual breakdown of how transactions flow through the three financial statements."
      },
      {
        name: "Zerodha Varsity (Modules on Fundamental Analysis & Markets)",
        type: "platform",
        url: "https://zerodha.com/varsity",
        note: "Free, high-quality practical market guide covering financial ratios and equity valuation."
      },
      {
        name: "Livemint & The Economic Times Markets Section",
        type: "platform",
        url: "https://www.livemint.com",
        note: "Daily tracking of Indian capital markets, sectoral indices, and corporate governance."
      }
    ],
    checkpoint: {
      criteria: "Scoring 85%+ in Class 12 Board Commerce/Math and writing a 500-word analysis of an Indian blue-chip annual report.",
      deliverable: "Class 12 Passing Marksheet and handwritten fundamental analysis of a Nifty 50 company."
    },
    decisionPoints: [
      {
        question: "B.Com Honours vs BBA in Finance vs Economics Honours",
        options: [
          {
            choice: "B.Com (Hons) / BBA (Finance) at top tier college (SRCC, Loyola, NMIMS)",
            pros: "Direct alignment with financial accounting, taxation, and corporate campus placement.",
            cons: "Heavier focus on accounting mechanics rather than econometric modeling."
          },
          {
            choice: "BA Economics (Hons) (St. Stephen's, Hindu, Christ)",
            pros: "Deep econometric and mathematical rigor; high prestige for global master's programs.",
            cons: "Less direct training in accounting standards and financial statement line items."
          }
        ]
      }
    ],
    warning: "Confusing stock trading tips with fundamental financial analysis: Day-trading penny stocks teaches gambling, not valuation, discounted cash flows, or business moats.",
    fallbackPlan: "If top commerce college cutoffs are missed, join a recognized university and immediately register for CFA Level 1 during college senior year.",
    realWorldStats: [
      {
        label: "Top Commerce College Cutoffs",
        value: "97% - 99% CUET Percentile",
        context: "SRCC and Hindu College general category admissions"
      },
      {
        label: "BFSI Sector Contribution",
        value: "12% - 14% of Indian GDP",
        context: "Banking, Financial Services, and Insurance"
      }
    ]
  },
  {
    investment: {
      time: "3 Years (Undergraduate degree + 10 hrs/week financial modeling practice)",
      cost: "₹1,50,000 - ₹6,00,000 (Degree tuition fees across accredited colleges)"
    },
    actionItems: [
      {
        task: "Build 3-statement integrated financial models from scratch in Microsoft Excel.",
        detail: "Dynamically link Income Statement, Balance Sheet, and Cash Flow Statement with working capital schedules."
      },
      {
        task: "Perform Discounted Cash Flow (DCF) and Comparable Company Analysis (Comps).",
        detail: "Calculate WACC (Weighted Average Cost of Capital), terminal value multiples, and enterprise value adjustments."
      },
      {
        task: "Secure finance internships in equity research, wealth management, or corporate finance FP&A.",
        detail: "Conduct industry peer bench-marking, variance analysis, and pitch deck financial slides."
      }
    ],
    resources: [
      {
        name: "Damodaran Online (Prof. Aswath Damodaran - NYU Stern)",
        type: "course",
        url: "https://pages.stern.nyu.edu/~adamodar",
        note: "The undisputed 'Dean of Valuation'; free lectures, datasets, and valuation spreadsheets."
      },
      {
        name: "Valuation: Measuring and Managing the Value of Companies (McKinsey & Co.)",
        type: "book",
        url: "https://www.wiley.com",
        note: "The definitive corporate finance bible for institutional investors and analysts."
      },
      {
        name: "Wall Street Prep / Corporate Finance Institute (CFI)",
        type: "course",
        url: "https://corporatefinanceinstitute.com",
        note: "Industry-standard financial modeling certification (FMVA) and Excel shortcuts."
      }
    ],
    checkpoint: {
      criteria: "Submitting a complete 20-page Initiation of Coverage equity research report with dynamic DCF model on a listed company.",
      deliverable: "Excel financial model file with dynamic sensitivity tables and formatted equity research report."
    },
    decisionPoints: [
      {
        question: "Equity Research (Buy-Side/Sell-Side) vs Corporate FP&A (Financial Planning & Analysis)",
        options: [
          {
            choice: "Sell-Side Equity Research",
            pros: "Deep industry sector expertise, publishing public notes, direct exposure to institutional fund managers.",
            cons: "Long earnings season hours; earnings dependent on brokerage trading commissions."
          },
          {
            choice: "Corporate FP&A (In-House Finance at FMCG/Tech MNC)",
            pros: "Predictable working hours, high job stability, shaping internal business unit budgeting.",
            cons: "Less direct exposure to capital markets and public stock movements."
          }
        ]
      }
    ],
    warning: "Hardcoding numbers in Excel financial models: Hardcoding calculated values instead of dynamic cell formulas is the fastest way to get rejected from financial modeling tests.",
    fallbackPlan: "Accept a financial operations or risk analyst position at a captive Global Capability Center (JPMorgan, Morgan Stanley GCC) and leverage internal mobility programs.",
    realWorldStats: [
      {
        label: "Junior Financial Analyst Starting CTC",
        value: "₹6L - ₹14L/yr",
        context: "Metro campuses (Mumbai, Bengaluru, Gurgaon)"
      },
      {
        label: "Excel Modeling Test Duration",
        value: "2 - 3 Hours",
        context: "Standard technical interview assessment format"
      }
    ]
  },
  {
    investment: {
      time: "2-3 Years (CFA exam preparation or MBA entrance prep + full-time job)",
      cost: "₹1,50,000 - ₹3,50,000 (CFA registration fees Level 1 & 2 ₹2.2L + prep providers Schweser/Mark Meldrum)"
    },
    actionItems: [
      {
        task: "Clear CFA (Chartered Financial Analyst) Level 1 and Level 2 exams.",
        detail: "Master Ethical and Professional Standards, Quantitative Methods, Fixed Income, Derivatives, and Alternative Investments."
      },
      {
        task: "Operate financial data terminals: Bloomberg Terminal, FactSet, or Refinitiv Eikon.",
        detail: "Pull consensus estimates, debt maturity profiles, peer beta values, and macroeconomic indicators."
      },
      {
        task: "Master Python for financial data analysis (Pandas, yfinance, QuantConnect).",
        detail: "Automate financial ratio extraction, backtest portfolio rebalancing strategies, and calculate Value at Risk (VaR)."
      }
    ],
    resources: [
      {
        name: "CFA Institute Official Curriculum & Candidate Resources",
        type: "documentation",
        url: "https://www.cfainstitute.org",
        note: "The globally recognized gold-standard charter for investment and portfolio analysis."
      },
      {
        name: "Mark Meldrum CFA Prep Platform",
        type: "course",
        url: "https://www.markmeldrum.com",
        note: "Widely regarded as the top video lecture platform for conceptual CFA mastery."
      },
      {
        name: "Bloomberg Market Concepts (BMC) Certification",
        type: "course",
        url: "https://www.bloomberg.com/professional/product/bloomberg-market-concepts",
        note: "Interactive introduction to capital markets, currency, equities, and fixed income."
      }
    ],
    checkpoint: {
      criteria: "Passing CFA Level 2 (one of finance's toughest filters) on first or second attempt.",
      deliverable: "Official CFA Level 2 Pass Result and Bloomberg BMC Certification credential."
    },
    decisionPoints: [
      {
        question: "CFA Charter vs Full-Time Top MBA (IIM A/B/C or ISB)",
        options: [
          {
            choice: "CFA Charter (Self-Study alongside Job)",
            pros: "Much lower cost (₹3L vs ₹25L+ MBA), respected globally for portfolio management and equity research.",
            cons: "Does not provide campus placement recruitment pipeline like top IIMs."
          },
          {
            choice: "Full-Time MBA (IIM A/B/C, XLRI, FMS)",
            pros: "Direct campus placement into front-end private equity and investment banking roles.",
            cons: "Heavy 2-year opportunity cost and substantial educational loan burden."
          }
        ]
      }
    ],
    warning: "Procrastinating on CFA ethics modules: CFA Institute strictly enforces ethics; failing the ethics section will fail your entire exam even if your score is near the 90th percentile.",
    fallbackPlan: "If CFA Level 2 is stalled, highlight practical financial modeling and Python automation on LinkedIn; boutique valuation and M&A advisory firms value execution over certificates.",
    realWorldStats: [
      {
        label: "CFA Level 2 Pass Rate",
        value: "40% - 44%",
        context: "Global pass percentage for second tier"
      },
      {
        label: "CFA Charterholder Salary Boost",
        value: "30% - 50%",
        context: "Average increment upon completing all 3 levels"
      }
    ]
  },
  {
    investment: {
      time: "3-5 Years (Progressive career advancement to Senior Analyst / Portfolio Manager)",
      cost: "₹40,000 - ₹1,00,000 (Annual CFA Society membership, CAIA/FRM optional certifications)"
    },
    actionItems: [
      {
        task: "Manage multi-asset investment portfolios or lead corporate capital allocation strategies.",
        detail: "Balance risk-adjusted return (Sharpe Ratio, Sortino Ratio), liquidity buffers, and sectoral exposure limits."
      },
      {
        task: "Conduct executive management interviews with CXOs of public companies.",
        detail: "Probe management on capital expenditure (CapEx) guidance, working capital cycles, and competitive threats."
      },
      {
        task: "Earn the full CFA Charterholder designation after completing 4,000 hours of qualified work experience.",
        detail: "Fulfill statutory criteria to legally market oneself as a Chartered Financial Analyst."
      }
    ],
    resources: [
      {
        name: "Security Analysis by Benjamin Graham & David Dodd",
        type: "book",
        url: "https://www.mheducation.com",
        note: "The sacred foundation of value investing and margin of safety principles."
      },
      {
        name: "CFA Institute Financial Analysts Journal",
        type: "documentation",
        url: "https://www.cfainstitute.org/en/research/financial-analysts-journal",
        note: "Peer-reviewed research on asset allocation, quantitative factors, and behavioral finance."
      },
      {
        name: "Moneycontrol & Trendlyne Institutional Portals",
        type: "platform",
        url: "https://trendlyne.com",
        note: "Comprehensive Indian market data for tracking superstar portfolios, block deals, and DII/FII flows."
      }
    ],
    checkpoint: {
      criteria: "Awarded the official CFA Charter and delivering benchmark-beating annual portfolio returns (Alpha > 3%).",
      deliverable: "CFA Charter Certificate and audited track record of investment performance."
    },
    decisionPoints: [
      {
        question: "Mutual Fund / Asset Management Company (AMC) vs Wealth Management / Family Office",
        options: [
          {
            choice: "Public Asset Management Company (HDFC AMC, SBI Mutual Fund, Nippon)",
            pros: "Massive scale (managing ₹50,000+ Cr AUM), high public reputation, institutional stability.",
            cons: "Strict regulatory investment mandates (SEBI limits on single-stock concentration)."
          },
          {
            choice: "Single/Multi-Family Office for Ultra-HNIs",
            pros: "Flexible mandates (private equity, venture capital, real estate), high performance profit-sharing.",
            cons: "Smaller team size; performance dependent on high-net-worth family relationship dynamics."
          }
        ]
      }
    ],
    warning: "Falling into confirmation bias during company analysis: Falling in love with a stock and ignoring deteriorating balance sheet quality or accounting irregularities leads to catastrophic portfolio drawdowns.",
    fallbackPlan: "Transition into Chief Financial Officer (CFO) or Vice President of Investor Relations at a high-growth startup preparing for an IPO.",
    realWorldStats: [
      {
        label: "Senior Financial Analyst CTC",
        value: "₹22L - ₹45L/yr",
        context: "Tier-1 Asset Management & Institutional Research firms"
      },
      {
        label: "Portfolio Manager Compensation",
        value: "₹50L - ₹1.5 Cr+/yr",
        context: "Base salary plus performance-linked AUM bonus in Indian metros"
      }
    ]
  }
];

export { actuary, financialAnalyst };
console.log('Business partial prepared.');
