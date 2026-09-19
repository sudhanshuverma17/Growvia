import fs from 'fs';
import { actuary, financialAnalyst } from './build_business.mjs';
import { investmentBanker, mbaManager } from './generate_business.mjs';

const productManager = [
  {
    investment: {
      time: "3-4 Years (Undergraduate college years + building side projects)",
      cost: "₹10,000 - ₹50,000 (Software domain subscriptions, books, domain hosting)"
    },
    actionItems: [
      {
        task: "Learn the fundamentals of software architecture, APIs, databases, and frontend/backend interactions.",
        detail: "Product managers don't need to write production code, but must understand technical trade-offs and latency constraints."
      },
      {
        task: "Write weekly Product Teardowns of apps you use daily (Swiggy, Spotify, Notion, Uber).",
        detail: "Analyze user onboarding, core retention loops, UX friction points, and propose data-backed feature improvements."
      },
      {
        task: "Build and launch a functional micro-product or community project using No-Code tools (Webflow, Bubble, Airtable) or Next.js.",
        detail: "Experience the complete cycle: customer discovery, building an MVP, acquiring 100 real users, and analyzing feedback."
      }
    ],
    resources: [
      {
        name: "Inspired: How to Create Tech Products Customers Love (Marty Cagan)",
        type: "book",
        url: "https://www.svpg.com",
        note: "The undisputed holy grail of modern product management and empowered product teams."
      },
      {
        name: "The Mom Test by Rob Fitzpatrick",
        type: "book",
        url: "https://www.momtestbook.com",
        note: "How to talk to customers and learn if your business is a good idea when everyone is lying to you."
      },
      {
        name: "Lenny's Newsletter & Podcast",
        type: "platform",
        url: "https://www.lennysnewsletter.com",
        note: "World's most popular product management resource covering growth, product discovery, and benchmarks."
      }
    ],
    checkpoint: {
      criteria: "Publishing 3 comprehensive product teardowns on Substack / LinkedIn and launching a live product with 100+ active users.",
      deliverable: "Public Product Portfolio website with teardown case studies and live project link."
    },
    decisionPoints: [
      {
        question: "Computer Science Degree vs Business / Design Degree for Product Management",
        options: [
          {
            choice: "Computer Science / Engineering Degree",
            pros: "Immediate credibility with engineering teams; qualified for Technical Product Manager (TPM) roles at Google/Meta.",
            cons: "Requires unlearning purely algorithmic thinking to develop deep commercial and user empathy."
          },
          {
            choice: "Business / Design / Economics Degree",
            pros: "Natural strength in user research, visual design empathy, and business model economics.",
            cons: "Must work harder to master software architecture and technical system design interviews."
          }
        ]
      }
    ],
    warning: "Thinking product management is 'being the CEO of the product': You have zero direct authority over engineers and designers; PMs lead exclusively through influence, data, and earned trust.",
    fallbackPlan: "If direct APM campus roles are scarce, accept a Software Development Engineer (SDE) or Business Analyst role; internal transitions to PM are the most common path.",
    realWorldStats: [
      {
        label: "Direct Campus APM Hiring Share",
        value: "< 5% of Tech Hiring",
        context: "Most companies hire experienced lateral transfers rather than freshers"
      },
      {
        label: "Associate PM Starting CTC",
        value: "₹14L - ₹28L/yr",
        context: "Top Indian tech startups (Flipkart, Swiggy, Razorpay, CRED)"
      }
    ]
  },
  {
    investment: {
      time: "1-3 Years (Early career as Software Engineer, Data Analyst, or UX Designer)",
      cost: "₹15,000 - ₹60,000 (Product analytics certifications from Reforge / Product School)"
    },
    actionItems: [
      {
        task: "Write comprehensive Product Requirement Documents (PRDs) for new software features.",
        detail: "Define the problem statement, user personas, functional specs, user stories, edge cases, and success metrics."
      },
      {
        task: "Master product analytics platforms: Amplitude, Mixpanel, and PostHog.",
        detail: "Build conversion funnels, retention cohorts, user event tracking taxonomies, and churn analysis dashboards."
      },
      {
        task: "Partner with engineering and design leads in Agile Scrum sprints.",
        detail: "Run backlog grooming, sprint planning, daily standups, and retrospective meetings."
      }
    ],
    resources: [
      {
        name: "Continuous Discovery Habits by Teresa Torres",
        type: "book",
        url: "https://www.producttalk.org",
        note: "Structured framework for continuous customer interviews and Opportunity Solution Trees."
      },
      {
        name: "Amplitude Product Analytics Certification",
        type: "course",
        url: "https://academy.amplitude.com",
        note: "Mastering event-based behavioral analytics, retention curves, and funnel conversion tracking."
      },
      {
        name: "Shreyas Doshi Product Management Frameworks (X/Twitter & Substack)",
        type: "platform",
        url: "https://twitter.com/shreyas",
        note: "Masterclass frameworks on product strategy, high-impact vs low-impact work, and career progression."
      }
    ],
    checkpoint: {
      criteria: "Successfully delivering a user-facing feature from conception to release that improves a key business metric (e.g. +10% onboarding conversion).",
      deliverable: "Approved PRD document, analytics dashboard showing before/after metric impact, and post-launch review."
    },
    decisionPoints: [
      {
        question: "Growth Product Manager vs Core / Platform Product Manager",
        options: [
          {
            choice: "Growth PM (Acquisition, Activation, Monetization)",
            pros: "Fast experimentation cycles, direct measurable revenue impact, highly valued in scaleups.",
            cons: "Heavy pressure on weekly metrics; risk of prioritizing short-term optimizations over deep product value."
          },
          {
            choice: "Core Product / Platform PM (Infrastructure & Workflows)",
            pros: "Deep architectural influence, solving complex customer workflows, high technical moat.",
            cons: "Slower release cycles; harder to prove direct revenue attribution."
          }
        ]
      }
    ],
    warning: "Building features based on HiPPO (Highest Paid Person's Opinion) without validating customer demand: Building vanity features that nobody uses wastes months of precious engineering bandwidth.",
    fallbackPlan: "Apply for lateral internal transfers to Product Manager within your current company after delivering successful projects as a lead engineer or business analyst.",
    realWorldStats: [
      {
        label: "Feature Failure Rate",
        value: "60% - 70%",
        context: "Of software features fail to improve key metrics or achieve meaningful adoption"
      },
      {
        label: "Product Manager CTC (2-4 yrs)",
        value: "₹22L - ₹45L/yr",
        context: "Mid-level PMs in Indian tech companies"
      }
    ]
  },
  {
    investment: {
      time: "2-4 Years (Senior Product Manager to Group PM / VP of Product)",
      cost: "₹50,000 - ₹2,00,000 (Executive product leadership programs - Reforge / INSEAD)"
    },
    actionItems: [
      {
        task: "Formulate long-term Product Strategy and 3-Year Vision aligned with business unit P&L.",
        detail: "Define North Star Metric, competitive moats, pricing and packaging models, and strategic differentiators."
      },
      {
        task: "Lead cross-functional product pods comprising engineers, designers, data scientists, and product marketers.",
        detail: "Define quarterly OKRs (Objectives and Key Results) and eliminate organizational blockers."
      },
      {
        task: "Drive international expansion and Enterprise B2B SaaS sales enablement.",
        detail: "Conduct enterprise customer advisory board meetings and align roadmap with enterprise compliance requirements."
      }
    ],
    resources: [
      {
        name: "Empowered: Ordinary People, Extraordinary Products (Marty Cagan & Chris Jones)",
        type: "book",
        url: "https://www.svpg.com",
        note: "How top tech companies coach and organize product teams to solve hard customer problems."
      },
      {
        name: "Reforge Product Leadership Program",
        type: "course",
        url: "https://www.reforge.com",
        note: "Premier executive education platform for senior tech executives and VPs of Product."
      },
      {
        name: "Crossing the Chasm by Geoffrey A. Moore",
        type: "book",
        url: "https://www.harpercollins.com",
        note: "The bible for bringing high-tech products from early adopters to mainstream enterprise markets."
      }
    ],
    checkpoint: {
      criteria: "Scaling a core product line to ₹50Cr+ annual recurring revenue (ARR) or 5M+ monthly active users (MAU).",
      deliverable: "Executive Product Strategy Deck, 3-year multi-product roadmap, and verified P&L performance report."
    },
    decisionPoints: [
      {
        question: "B2C Consumer Product Management vs B2B Enterprise SaaS PM",
        options: [
          {
            choice: "B2B Enterprise SaaS PM",
            pros: "Predictable recurring revenue, high contract values ($50k - $500k+ ACV), massive global remote hiring.",
            cons: "Complex multi-stakeholder enterprise sales cycles; feature requests dictated by single enterprise clients."
          },
          {
            choice: "B2C Consumer Tech PM",
            pros: "Massive scale (millions of users), rapid viral experimentation, cultural prestige (consumer brands).",
            cons: "High customer acquisition costs (CAC); fickle user retention habits."
          }
        ]
      }
    ],
    warning: "Becoming a 'feature factory': Measuring team productivity by how many features are shipped instead of the business outcomes achieved.",
    fallbackPlan: "Found your own tech startup or transition into a Venture Capital Venture Partner / Operating Partner role advising portfolio companies.",
    realWorldStats: [
      {
        label: "Principal PM / Director CTC",
        value: "₹50L - ₹1.2 Cr+/yr",
        context: "Senior product leadership at top tech companies in India"
      },
      {
        label: "US Remote Senior PM Salary",
        value: "$150,000 - $240,000/yr",
        context: "Global remote B2B SaaS product roles"
      }
    ]
  }
];

const humanResources = [
  {
    investment: {
      time: "2 Years (High school academics + public speaking & interpersonal leadership)",
      cost: "₹20,000 - ₹60,000 (Schooling & soft skills development)"
    },
    actionItems: [
      {
        task: "Excel in Class 11-12 across any academic stream (Humanities, Commerce, or Science).",
        detail: "Cultivate strong written English communication, organizational psychology basics, and empathy."
      },
      {
        task: "Lead student council committees, debate clubs, or annual school cultural festivals.",
        detail: "Gain practical experience in conflict resolution, delegating responsibilities, and team motivation."
      },
      {
        task: "Read introductory books on industrial psychology and human behavior.",
        detail: "Understand what motivates individuals, team dynamics, and conflict management."
      }
    ],
    resources: [
      {
        name: "Drive: The Surprising Truth About What Motivates Us (Daniel H. Pink)",
        type: "book",
        url: "https://www.danpink.com",
        note: "Breakthrough insights on autonomy, mastery, and purpose in workplace motivation."
      },
      {
        name: "Society for Human Resource Management (SHRM) Student Portal",
        type: "documentation",
        url: "https://www.shrm.org",
        note: "World's largest HR professional society providing foundational industry frameworks."
      },
      {
        name: "TED Talks on Leadership & Work Culture (Simon Sinek, Adam Grant)",
        type: "course",
        url: "https://www.ted.com",
        note: "Inspiring talks on psychological safety, organizational culture, and why leaders eat last."
      }
    ],
    checkpoint: {
      criteria: "Scoring 85%+ in Class 12 Boards and leading a student organizing committee.",
      deliverable: "Class 12 Passing Certificate and verified letter of student leadership."
    },
    decisionPoints: [
      {
        question: "BA in Psychology vs BBA in Human Resource Management",
        options: [
          {
            choice: "BBA / B.Com (Business & Commerce)",
            pros: "Provides foundational business acumen in accounting, marketing, and corporate economics.",
            cons: "Less deep training in behavioral psychology and psychometric testing."
          },
          {
            choice: "BA in Applied Psychology / Sociology",
            pros: "Deep understanding of cognitive psychology, organizational behavior, and employee empathy.",
            cons: "Must learn corporate business models and financial balance sheets independently."
          }
        ]
      }
    ],
    warning: "Viewing HR as merely 'arranging fun events and rangoli competitions': Modern HR is a strategic business function managing payroll, labor law compliance, compensation benchmarking, and talent retention.",
    fallbackPlan: "Focus on securing admission into a top undergraduate college (DU, Christ, NMIMS) which provides strong recruitment for HR management trainees.",
    realWorldStats: [
      {
        label: "Corporate HR Spend per Employee",
        value: "₹25,000 - ₹60,000 Annually",
        context: "On learning, development, and retention in tech firms"
      },
      {
        label: "HR Tech Adoption Growth",
        value: "15% CAGR",
        context: "Global enterprise investment in HR systems"
      }
    ]
  },
  {
    investment: {
      time: "3 Years (Undergraduate degree + 10 hrs/week HR internships & research)",
      cost: "₹1,50,000 - ₹5,00,000 (Degree tuition fees across accredited universities)"
    },
    actionItems: [
      {
        task: "Master Indian Labor Laws and statutory compliance (PF, ESI, Gratuity, POSH Act, Industrial Disputes Act).",
        detail: "Understand the new 4 Indian Labor Codes on Wages, Social Security, Industrial Relations, and Occupational Safety."
      },
      {
        task: "Learn HR Information Systems (HRIS) and Applicant Tracking Systems (ATS) like Darwinbox, Workday, and Greenhouse.",
        detail: "Understand employee lifecycle data: recruitment pipelines, onboarding, attendance, and exit interviews."
      },
      {
        task: "Complete summer internships in talent acquisition and employer branding.",
        detail: "Source candidate profiles on LinkedIn Recruiter, conduct initial phone screenings, and coordinate interview panels."
      }
    ],
    resources: [
      {
        name: "Work Rules!: Insights from Inside Google to Transform How You Live and Lead (Laszlo Bock)",
        type: "book",
        url: "https://www.workrules.net",
        note: "Former Google Head of People Operations reveals data-driven hiring, compensation, and culture."
      },
      {
        name: "Darwinbox HR Tech Knowledge Hub",
        type: "platform",
        url: "https://darwinbox.com",
        note: "Leading Asian enterprise HRMS platform covering digital onboarding, performance, and payroll."
      },
      {
        name: "Ministry of Labour and Employment Portal (Government of India)",
        type: "documentation",
        url: "https://labour.gov.in",
        note: "Official statutory repository for Indian labor codes, minimum wage notifications, and PF/ESI rules."
      }
    ],
    checkpoint: {
      criteria: "Successfully closing at least 10 junior corporate hires during an internship and designing a compliant POSH policy manual.",
      deliverable: "Documented hiring dashboard report and verified undergraduate degree marksheet."
    },
    decisionPoints: [
      {
        question: "Recruitment Consultancy (Headhunting) vs In-House Corporate HR",
        options: [
          {
            choice: "In-House Corporate HR Department",
            pros: "Full visibility across onboarding, culture, performance reviews, and long-term employee retention.",
            cons: "Slower compensation growth compared to high-commission external recruiting."
          },
          {
            choice: "Executive Search / Recruitment Agency (Michael Page, Korn Ferry, Randstad)",
            pros: "High performance-linked commissions, rapid exposure to dozens of client industries.",
            cons: "High-pressure sales targets; purely transactional hiring without employee lifecycle involvement."
          }
        ]
      }
    ],
    warning: "Handling POSH (Prevention of Sexual Harassment) or workplace grievances casually without strict statutory committee compliance: Violations lead to severe employer penalties and public reputational catastrophe.",
    fallbackPlan: "Work as an in-house Talent Acquisition specialist at a growing IT services or startup firm; top recruiters easily transition into HR Generalist roles.",
    realWorldStats: [
      {
        label: "Junior HR Executive Starting CTC",
        value: "₹4.5L - ₹8.5L/yr",
        context: "Undergraduate campus placements in Indian metros"
      },
      {
        label: "LinkedIn Recruiter Usage",
        value: "85%+",
        context: "Of corporate talent acquisition teams rely on LinkedIn"
      }
    ]
  },
  {
    investment: {
      time: "2 Years (Full-time specialized MBA in HR at XLRI Jamshedpur, TISS Mumbai, or SCMHRD Pune)",
      cost: "₹10,00,000 - ₹26,00,000 (Tuition and campus accommodation fees)"
    },
    actionItems: [
      {
        task: "Score in the 98th+ percentile in XAT (Xavier Aptitude Test) or CAT.",
        detail: "Excel in Decision Making (DM), Verbal Ability, and Quantitative Aptitude for XLRI / TISS admission."
      },
      {
        task: "Master Compensation & Benefits (Comp & Ben): Total Rewards, ESOP structuring, and salary benchmarking surveys (Aon/Mercer).",
        detail: "Design competitive pay bands (fixed vs variable), provident fund structures, and retention bonuses."
      },
      {
        task: "Complete an 8-week summer internship in an industrial manufacturing plant or tech MNC.",
        detail: "Negotiate with labor trade unions or design an employee engagement retention framework."
      }
    ],
    resources: [
      {
        name: "XLRI Jamshedpur Human Resource Management Curriculum",
        type: "documentation",
        url: "https://www.xlri.ac.in",
        note: "India's oldest and most prestigious institution for Human Resource Management education."
      },
      {
        name: "TISS (Tata Institute of Social Sciences) School of Management and Labour Studies",
        type: "documentation",
        url: "https://www.tiss.edu",
        note: "Premier institute famous for industrial relations, labor welfare, and high ROI."
      },
      {
        name: "Compensation by George Milkovich & Jerry Newman",
        type: "book",
        url: "https://www.mheducation.com",
        note: "The international authoritative text on compensation strategy, salary surveys, and pay-for-performance."
      }
    ],
    checkpoint: {
      criteria: "Securing a Day Zero Management Trainee (HR) offer at a premier conglomerate (HUL, ITC, TAS, Procter & Gamble).",
      deliverable: "MBA / MA in HRM Degree Certificate and signed corporate placement offer letter."
    },
    decisionPoints: [
      {
        question: "HR Business Partner (HRBP) vs Center of Excellence (CoE - Talent Management / Comp & Ben)",
        options: [
          {
            choice: "HR Business Partner (HRBP)",
            pros: "Embedded directly with business unit CXOs; high strategic influence on organizational design and promotions.",
            cons: "Constantly mediating between demanding business unit leaders and corporate HR policy constraints."
          },
          {
            choice: "Center of Excellence (CoE - Compensation, L&D, D&I)",
            pros: "Specialized deep domain expertise; designing enterprise-wide programs and salary structures.",
            cons: "Less direct daily engagement with operational business managers."
          }
        ]
      }
    ],
    warning: "Neglecting business unit financial fundamentals: An HR leader who cannot read a P&L statement or understand how headcount costs impact corporate EBITDA will never be respected at the executive table.",
    fallbackPlan: "If top HR MBA cutoffs are missed, pursue general management MBA with HR electives and earn SHRM-CP or PHR international certifications.",
    realWorldStats: [
      {
        label: "XLRI / TISS Average CTC",
        value: "₹28L - ₹32L/yr",
        context: "Premier HR business school campus placements in India"
      },
      {
        label: "Top FMCG Summer Stipend",
        value: "₹3L - ₹4.5L / 2 Months",
        context: "Offered to premier HR management trainees"
      }
    ]
  },
  {
    investment: {
      time: "4-8 Years (Progressive advancement from HRBP to VP of People / Chief Human Resources Officer)",
      cost: "₹50,000 - ₹2,00,000 (Executive leadership certifications - SHRM-SCP / Wharton HR Executive)"
    },
    actionItems: [
      {
        task: "Architect Organizational Design, Succession Planning, and Leadership Development programs.",
        detail: "Identify high-potential leaders (HiPos) and implement the 9-Box Grid talent assessment matrix."
      },
      {
        task: "Lead HR Due Diligence and Post-Merger Integration during corporate M&A acquisitions.",
        detail: "Harmonize disparate compensation bands, cultural values, title hierarchies, and benefits packages."
      },
      {
        task: "Serve as Chief Human Resources Officer (CHRO), reporting directly to the Board of Directors.",
        detail: "Shape corporate environmental, social, and governance (ESG) human capital disclosures and executive compensation."
      }
    ],
    resources: [
      {
        name: "The HR Value Proposition by Dave Ulrich & Wayne Brockbank",
        type: "book",
        url: "https://hbr.org",
        note: "The seminal work establishing how HR delivers measurable business value to investors and customers."
      },
      {
        name: "SHRM-SCP (Senior Certified Professional) Credential",
        type: "platform",
        url: "https://www.shrm.org/credentials/certification/shrm-scp",
        note: "Globally recognized executive certification for senior strategic HR leaders."
      },
      {
        name: "McKinsey Organization & People Insights",
        type: "platform",
        url: "https://www.mckinsey.com",
        note: "Leading research on future of work, hybrid work culture, and AI-driven organizational transformation."
      }
    ],
    checkpoint: {
      criteria: "Formulating enterprise-wide talent strategy that reduces corporate voluntary attrition by 30% while scaling company headcount.",
      deliverable: "Board-approved Annual Human Capital Report and executive succession roadmap."
    },
    decisionPoints: [
      {
        question: "Corporate CHRO (Enterprise MNC) vs Startup Chief People Officer (Hypergrowth Unicorn)",
        options: [
          {
            choice: "Enterprise CHRO (TCS, Tata, HDFC, Unilever)",
            pros: "Immense institutional scale (managing 50,000+ employees), board prestige, stable multi-crore compensation.",
            cons: "Slow corporate bureaucracy; complex trade union and multi-country labor compliance."
          },
          {
            choice: "Startup Chief People Officer (Scaleup Unicorn)",
            pros: "Shaping company culture from scratch, lucrative pre-IPO stock options, fast decision making.",
            cons: "High organizational instability; handling rapid hiring followed by sudden corporate restructuring."
          }
        ]
      }
    ],
    warning: "Allowing toxic executive leadership behaviors to go unchecked: Shielding high-revenue executive abusers destroys company culture and leads to massive public whistleblower leaks.",
    fallbackPlan: "Operate as an independent Executive Search Consultant or Executive Leadership Coach advising startup founders and CEOs on organizational design.",
    realWorldStats: [
      {
        label: "Enterprise CHRO CTC",
        value: "₹80L - ₹2.5 Cr+/yr",
        context: "Senior HR leadership at BSE 100 corporate enterprises"
      },
      {
        label: "Strategic HR Impact on Profitability",
        value: "21% Higher Profitability",
        context: "For companies ranking in top quartile of employee engagement (Gallup)"
      }
    ]
  }
];

// Combine all 8 business careers
export const fullBusinessRoadmaps = {
  actuary,
  "financial-analyst": financialAnalyst,
  "investment-banker": investmentBanker,
  "mba-manager": mbaManager,
  "product-manager": productManager,
  "human-resources": humanResources
};

console.log('Business partial (6/8) generated successfully.');
