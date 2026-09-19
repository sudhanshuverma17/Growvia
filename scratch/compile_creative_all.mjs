import fs from 'fs';

const architect = [
  {
    investment: {
      time: "2 Years (Class 11-12 with Physics, Chemistry, Math + architectural sketching)",
      cost: "₹30,000 - ₹90,000 (School tuition & NATA entrance drawing prep)"
    },
    actionItems: [
      {
        task: "Score 50%+ in Class 12 Boards with Physics, Chemistry, and Mathematics (PCM).",
        detail: "Council of Architecture (CoA) regulations strictly mandate PCM for B.Arch eligibility in India."
      },
      {
        task: "Prepare for NATA (National Aptitude Test in Architecture) and JEE Main Paper 2.",
        detail: "Practice 2D/3D perspective drawing, scale visualization, architectural general knowledge, and aesthetic sensitivity."
      },
      {
        task: "Build architectural freehand sketching and observation drawing habits.",
        detail: "Sketch building facades, shadow projections, cross-hatching, and human scale proportions."
      }
    ],
    resources: [
      {
        name: "Council of Architecture (CoA) India",
        type: "documentation",
        url: "https://www.coa.gov.in",
        note: "Statutory regulatory body governing architectural education and professional registration in India."
      },
      {
        name: "NATA Official Portal (National Aptitude Test in Architecture)",
        type: "platform",
        url: "https://www.nata.in",
        note: "Official entrance exam portal conducted by CoA for admission into all accredited B.Arch colleges."
      },
      {
        name: "Architecture: Form, Space, and Order by Francis D.K. Ching",
        type: "book",
        url: "https://www.wiley.com",
        note: "The timeless visual dictionary and foundational bible of architectural design principles."
      }
    ],
    checkpoint: {
      criteria: "Passing NATA with a score of 120+/200 and securing admission into a premier B.Arch college (SPA Delhi, CEPT Ahmedabad, IIT Roorkee).",
      deliverable: "NATA Scorecard and verified B.Arch College Admission Letter."
    },
    decisionPoints: [
      {
        question: "School of Planning and Architecture (SPA Delhi/Bhopal) vs CEPT University vs IIT B.Arch",
        options: [
          {
            choice: "SPA Delhi / CEPT University Ahmedabad",
            pros: "Pure architectural focus, celebrated studio culture, legendary alumni network in global urbanism.",
            cons: "Intense 5-year studio workload with all-night drafting deadlines."
          },
          {
            choice: "IIT Architecture (IIT Roorkee / Kharagpur via JEE Advanced AAT)",
            pros: "Premier IIT brand, interdisciplinary engineering resources, strong campus placements.",
            cons: "Requires clearing both JEE Main Paper 2 and JEE Advanced Architecture Aptitude Test."
          }
        ]
      }
    ],
    warning: "Assuming architecture is just drawing pretty pictures: Architecture is rigorous engineering: structural load transfer, wind shear, building bye-laws, plumbing drainage, and electrical conduits.",
    fallbackPlan: "If B.Arch cutoffs are missed, consider B.Des in Interior Design or Urban Planning, which share strong spatial design synergies.",
    realWorldStats: [
      {
        label: "B.Arch Degree Duration",
        value: "5 Mandatory Years",
        context: "Strict statutory duration mandated by Council of Architecture"
      },
      {
        label: "Average NATA Cutoff for Premier SPAs",
        value: "135 - 150 / 200 Marks",
        context: "Combined with 90%+ Class 12 PCM board score"
      }
    ]
  },
  {
    investment: {
      time: "5 Years (10 Semesters of architectural design studios, juries, and wet-labs)",
      cost: "₹2,50,000 (Govt SPAs) to ₹12,00,000 - ₹22,00,000 (Private architecture colleges)"
    },
    actionItems: [
      {
        task: "Excel in Design Studio: progress from basic spatial pavilions to complex multi-story civic and hospital designs.",
        detail: "Present scaled physical balsa-wood models, hand-drafted sheets, and defend designs before external critique juries."
      },
      {
        task: "Master digital architectural software: AutoCAD, Revit (BIM), Rhino, Grasshopper, and V-Ray.",
        detail: "Building Information Modeling (BIM) is now non-negotiable for international architectural practices."
      },
      {
        task: "Master National Building Code (NBC) of India and local municipal bye-laws (FSI / FAR, setbacks, fire safety).",
        detail: "Design floor plans complying with statutory floor area ratios and disability accessibility norms."
      }
    ],
    resources: [
      {
        name: "National Building Code (NBC) of India - Bureau of Indian Standards",
        type: "documentation",
        url: "https://www.standardsbis.in",
        note: "The statutory standard governing building safety, fire exit egress, and structural specifications."
      },
      {
        name: "ArchDaily Architectural Knowledge Platform",
        type: "platform",
        url: "https://www.archdaily.com",
        note: "The world's most visited architecture website featuring global projects, details, and materials."
      },
      {
        name: "Autodesk Revit BIM Certification",
        type: "tool",
        url: "https://www.autodesk.com/products/revit",
        note: "Industry-standard Building Information Modeling software for coordinated architectural and structural drawings."
      }
    ],
    checkpoint: {
      criteria: "Successfully completing and defending the 10th-semester Architectural Thesis project before an external national jury.",
      deliverable: "Bachelor of Architecture (B.Arch) Degree Certificate and Comprehensive Thesis Portfolio."
    },
    decisionPoints: [
      {
        question: "Parametric & Computational Architecture (Rhino/Grasshopper) vs Sustainable & Vernacular Architecture",
        options: [
          {
            choice: "Parametric & Computational Architecture (Zaha Hadid style)",
            pros: "Complex futuristic geometries, algorithmic form-generation, highly valued in global firms in Dubai/London.",
            cons: "High software learning curve; harder to execute with traditional low-cost Indian construction masonry."
          },
          {
            choice: "Vernacular & Sustainable Architecture (Laurie Baker style)",
            pros: "Locally-sourced materials (rammed earth, CSEB, exposed brick), low carbon footprint, deep cultural resonance.",
            cons: "Requires educating modern commercial developers who prefer glass-and-steel boxes."
          }
        ]
      }
    ],
    warning: "Neglecting structural and MEP (Mechanical, Electrical, Plumbing) coordination: Designing ambitious cantilevered forms that cannot be engineered structurally will fail thesis juries and client budgets.",
    fallbackPlan: "Join an established architectural firm as an Architectural 3D Visualizer or BIM Specialist, commanding ₹4L - ₹8L while preparing for CoA licensing.",
    realWorldStats: [
      {
        label: "Junior Architect Starting Pay",
        value: "₹20,000 - ₹38,000/month",
        context: "Junior architects in Indian private design practices"
      },
      {
        label: "Global BIM Market Value",
        value: "$8+ Billion",
        context: "Rapid enterprise transition from 2D CAD to coordinated 3D BIM"
      }
    ]
  },
  {
    investment: {
      time: "1 Year (Mandatory practical training internship in an architectural practice)",
      cost: "₹0 (Interns earn a monthly stipend: ₹5,000 - ₹20,000/month depending on firm tier)"
    },
    actionItems: [
      {
        task: "Produce municipal sanction drawings and detailed Good For Construction (GFC) working drawings.",
        detail: "Draft section details, door-window schedules, toilet plumbing layouts, and staircase reinforcement cross-sections."
      },
      {
        task: "Conduct weekly on-site construction inspections and contractor coordination.",
        detail: "Check column rebar alignment, shuttering levels, concrete slump tests, and resolve site clashes."
      },
      {
        task: "Register with the Council of Architecture (CoA) upon graduation to receive your CA License Number.",
        detail: "Mandatory statutory credential granting legal authority to sign building sanction plans and practice as an Architect."
      }
    ],
    resources: [
      {
        name: "Council of Architecture Professional Practice Manual",
        type: "documentation",
        url: "https://www.coa.gov.in",
        note: "Statutory rules on architect fees, client agreements, copyright of drawings, and ethical conduct."
      },
      {
        name: "Building Construction Illustrated by Francis D.K. Ching",
        type: "book",
        url: "https://www.wiley.com",
        note: "The indispensable visual guide to foundation footings, masonry, thermal insulation, and roof waterproofing."
      },
      {
        name: "Indian Institute of Architects (IIA)",
        type: "platform",
        url: "https://www.indianinstituteofarchitects.com",
        note: "National body of registered architects fostering professional networking and design exhibitions."
      }
    ],
    checkpoint: {
      criteria: "Completion of practical training logbook signed by Registered Principal Architect and award of Council of Architecture license.",
      deliverable: "Official Council of Architecture (CoA) Registration Certificate (CA/YYYY/XXXXX) and Architect Stamp."
    },
    decisionPoints: [
      {
        question: "Boutique Design Studio vs Large Corporate Masterplanning Consultancy (Hafeez Contractor, RSP, Gensler)",
        options: [
          {
            choice: "Boutique Design Studio (5-15 Architects)",
            pros: "Hands-on exposure to entire lifecycle: client pitches, design concepts, vendor selection, site supervision.",
            cons: "Lower entry-level salaries and limited corporate benefits."
          },
          {
            choice: "Large Corporate Firm (Gensler, HOK, Hafeez Contractor)",
            pros: "Mega-scale projects (airports, commercial townships), structured career ladder, international opportunities.",
            cons: "High specialization; you might work for 6 months solely on fire-staircase details of a high-rise."
          }
        ]
      }
    ],
    warning: "Using the title 'Architect' without an active Council of Architecture registration: Under Section 37 of the Architects Act 1972, falsely using the title 'Architect' is a cognizable criminal offense.",
    fallbackPlan: "Work as an interior project manager or architectural photographer while saving initial capital to launch your design studio.",
    realWorldStats: [
      {
        label: "Registered Architects in India",
        value: "~1,30,000 Registered Architects",
        context: "Across a nation of 1.4 billion people (vast growth headroom)"
      },
      {
        label: "CoA Standard Minimum Fee",
        value: "2.5% - 5% of Project Cost",
        context: "Statutory recommended professional fee for comprehensive architectural services"
      }
    ]
  },
  {
    investment: {
      time: "2-5 Years (Master of Architecture - M.Arch or independent studio establishment)",
      cost: "₹2,00,000 - ₹8,00,000 (Higher studies) or ₹5,00,000 - ₹15,00,000 (Studio office setup, workstations, Plotter)"
    },
    actionItems: [
      {
        task: "Launch an independent Architectural Practice or pursue M.Arch in Urban Design, Sustainable Architecture, or Landscape.",
        detail: "Win initial private residential bungalow, villa, and boutique commercial cafe interior design commissions."
      },
      {
        task: "Lead end-to-end turnkey project execution: tender document drafting, bill of quantities (BOQ), and contractor billing.",
        detail: "Ensure projects complete within client budget and structural timelines."
      },
      {
        task: "Submit completed buildings for national architectural design awards (IIA National Awards, NDTV Design Awards).",
        detail: "Photograph completed projects professionally for publication in Architectural Digest, Elle Decor, and Dezeen."
      }
    ],
    resources: [
      {
        name: "Architectural Digest India",
        type: "platform",
        url: "https://www.architecturaldigest.in",
        note: "The leading publication showcasing the most innovative Indian residences, interior design, and architecture."
      },
      {
        name: "Dezeen International Architecture Magazine",
        type: "platform",
        url: "https://www.dezeen.com",
        note: "World's most influential architecture and design magazine featuring global avant-garde projects."
      },
      {
        name: "CPWD Specifications & Analysis of Rates",
        type: "documentation",
        url: "https://cpwd.gov.in",
        note: "The government benchmark for calculating Bill of Quantities (BOQ), material labor rates, and tender specs."
      }
    ],
    checkpoint: {
      criteria: "Successfully completing and handing over at least 3 independent built projects with verified client sign-off and publication.",
      deliverable: "Built Architecture Portfolio and profitable independent registered architectural practice."
    },
    decisionPoints: [
      {
        question: "Turnkey Architecture (Design + Construction Execution) vs Pure Consulting Architecture",
        options: [
          {
            choice: "Turnkey Practice (Design & Build)",
            pros: "Much higher revenue (earning margins on materials and construction labor, 15-20%), total quality control.",
            cons: "High financial cash-flow liability; handling contractor strikes and material price escalations."
          },
          {
            choice: "Pure Consulting Architectural Practice",
            pros: "Zero construction financial risk, clean professional fee model (5% of civil cost), focused solely on design.",
            cons: "Lower cash revenue; dependent on client timely fee releases."
          }
        ]
      }
    ],
    warning: "Signing structural stability or municipal drawings without verifying site soil bearing capacity (SBC) and structural engineer calculations: Structural collapse results in immediate license revocation and criminal liability.",
    fallbackPlan: "Partner with premier real estate developers (Godrej Properties, DLF, Prestige) as Principal In-House Design Director.",
    realWorldStats: [
      {
        label: "Established Studio Net Income",
        value: "₹2L - ₹8L+/month",
        context: "Net earnings of successful boutique architectural firm"
      },
      {
        label: "Design Fee on ₹2 Crore Villa",
        value: "₹10 Lakhs - ₹16 Lakhs",
        context: "5-8% professional design fee on luxury residential bungalow"
      }
    ]
  }
];

const designer = [
  {
    investment: {
      time: "6-12 Months intensive self-study or design bootcamp",
      cost: "₹10,000 - ₹50,000 (Design books, online courses, design community memberships)"
    },
    actionItems: [
      {
        task: "Master the fundamental principles of Visual Design: Hierarchy, Contrast, Alignment, Typography, and White Space.",
        detail: "Understand how human visual perception scans interfaces (F-Pattern, Z-Pattern) and cognitive load."
      },
      {
        task: "Study Don Norman's Design of Everyday Things and Nielsen Norman Group's 10 Usability Heuristics.",
        detail: "Learn mental models, affordances, signifiers, error prevention, and recognition over recall."
      },
      {
        task: "Conduct daily visual teardowns of top-tier mobile and web apps (Apple iOS, Airbnb, Linear, Stripe).",
        detail: "Recreate their layouts pixel-for-pixel to build intuitive understanding of 8pt grid systems and typographic scale."
      }
    ],
    resources: [
      {
        name: "The Design of Everyday Things by Don Norman",
        type: "book",
        url: "https://www.nngroup.com/books/design-everyday-things-revised",
        note: "The foundational bible of user-centered design, human affordances, and usability psychology."
      },
      {
        name: "Nielsen Norman Group (NN/g) Usability Heuristics",
        type: "platform",
        url: "https://www.nngroup.com/articles/ten-usability-heuristics",
        note: "The industry standard 10 general principles for interaction design and usability evaluation."
      },
      {
        name: "Refactoring UI by Adam Wathan & Steve Schoger",
        type: "book",
        url: "https://www.refactoringui.com",
        note: "Practical, visual manual for designing beautiful user interfaces without relying on vague artistic theory."
      }
    ],
    checkpoint: {
      criteria: "Completing 10 pixel-perfect UI screen recreations and writing a 500-word usability critique of a popular app.",
      deliverable: "Personal visual design workbook and documented heuristic evaluation report."
    },
    decisionPoints: [
      {
        question: "Formal Design College Degree (NID/IDC IIT/Srishti) vs Self-Taught UX Bootcamp",
        options: [
          {
            choice: "Self-Taught / Bootcamp Route",
            pros: "Fast entry into industry (6-12 months), low financial investment, focus on modern digital tools.",
            cons: "Requires intense personal discipline; must prove design taste through an undeniable portfolio."
          },
          {
            choice: "Formal B.Des / M.Des at Top Design Institute (NID, IDC IIT Bombay)",
            pros: "Deep foundational craft, physical prototyping, prestige alumni network, top campus placements.",
            cons: "Requires 4 years of study and cracking difficult entrance exams (UCEED / NID DAT)."
          }
        ]
      }
    ],
    warning: "Confusing graphic art with UI/UX product design: UI/UX design is not about making abstract art; it is about solving human usability problems with clean, functional clarity.",
    fallbackPlan: "Start as a Visual / Graphic Designer creating landing pages and marketing graphics, then transition laterally to UI/UX product design.",
    realWorldStats: [
      {
        label: "Mobile App Retention Benchmark",
        value: "75% Drop-off on Day 1",
        context: "Underscoring why frictionless UX onboarding is critical for businesses"
      },
      {
        label: "Design-Driven Companies ROI",
        value: "2x S&P 500 Performance",
        context: "McKinsey Design Index finding on companies that invest in design"
      }
    ]
  },
  {
    investment: {
      time: "6 Months dedicated tool mastery and interactive prototyping",
      cost: "₹0 - ₹15,000 (Figma professional subscription, premium UI icon sets)"
    },
    actionItems: [
      {
        task: "Master Figma at an expert level: Auto-Layout, Components, Variants, Component Properties, and Variables.",
        detail: "Build flexible, responsive UI layouts that dynamically adapt to different screen sizes and dark/light modes."
      },
      {
        task: "Build and document a scalable Design System from scratch.",
        detail: "Establish color tokens, typography scales, spacing units (8pt grid), button states, form inputs, and interactive modals."
      },
      {
        task: "Create advanced interactive prototypes with micro-interactions using Smart Animate.",
        detail: "Simulate realistic user flows, bottom-sheet interactions, tab switches, and loading skeleton states."
      }
    ],
    resources: [
      {
        name: "Figma Community & Official YouTube Tutorials",
        type: "platform",
        url: "https://www.youtube.com/c/Figmadesign",
        note: "Official masterclasses on design systems, variables, auto-layout, and prototyping."
      },
      {
        name: "Material Design 3 (Google Design System)",
        type: "documentation",
        url: "https://m3.material.io",
        note: "The industry benchmark design system for Android, web, and cross-platform token architecture."
      },
      {
        name: "Apple Human Interface Guidelines (HIG)",
        type: "documentation",
        url: "https://developer.apple.com/design/human-interface-guidelines",
        note: "The definitive design principles for building intuitive experiences across iOS, iPadOS, and macOS."
      }
    ],
    checkpoint: {
      criteria: "Building a comprehensive Design System in Figma containing 30+ responsive components with full auto-layout and interactive states.",
      deliverable: "Published Figma Community Design System file and interactive prototype link."
    },
    decisionPoints: [
      {
        question: "UX Research Specialization vs Product Designer (Full-Stack UI/UX)",
        options: [
          {
            choice: "Product Designer (End-to-End UI & UX)",
            pros: "Most widely hired role at startups and tech MNCs; owns the product from discovery wireframes to final pixel specs.",
            cons: "Must maintain both deep research rigor and high visual polishing speed."
          },
          {
            choice: "Dedicated UX Researcher (UXR)",
            pros: "Focus purely on user interviews, usability testing, cognitive psychology, and qualitative data synthesis.",
            cons: "Fewer openings; mostly hired only at large tech enterprises (Google, Microsoft, Uber)."
          }
        ]
      }
    ],
    warning: "Designing static screens without considering edge cases: Forgetting empty states, error states, long user names, and slow network loading screens will break in engineering implementation.",
    fallbackPlan: "Contribute UI designs to open-source software projects on GitHub to gain practical cross-functional experience with software engineers.",
    realWorldStats: [
      {
        label: "Figma Global Market Share",
        value: "80%+",
        context: "The undisputed primary interface design tool across tech companies"
      },
      {
        label: "Junior Product Designer Starting CTC",
        value: "₹6L - ₹15L/yr",
        context: "Fresh designers with polished Figma portfolios"
      }
    ]
  },
  {
    investment: {
      time: "6-12 Months building deep portfolio case studies and interviewing",
      cost: "₹5,000 - ₹20,000 (Custom portfolio domain, Webflow/Framer hosting, Dribbble Pro)"
    },
    actionItems: [
      {
        task: "Author 3 in-depth, original Product Design Case Studies on your portfolio website.",
        detail: "Follow the complete narrative: Problem Statement, User Research, Journey Maps, Wireframe Iterations, Usability Testing, and Business Impact."
      },
      {
        task: "Show the messy middle: document failed ideas, design pivots, and user testing feedback.",
        detail: "Hiring managers reject portfolios that only show pretty final mockups without demonstrating the rationale behind decisions."
      },
      {
        task: "Conduct live whiteboard design challenges and design critique interviews.",
        detail: "Practice structuring ambiguous problems in 45 minutes on a digital whiteboard with prospective peers."
      }
    ],
    resources: [
      {
        name: "Cofolios (Design Portfolios of Top Tech Interns)",
        type: "platform",
        url: "https://www.cofolios.com",
        note: "Curated collection of case study portfolios that landed jobs at Google, Apple, and Airbnb."
      },
      {
        name: "Framer (No-Code Interactive Portfolio Builder)",
        type: "tool",
        url: "https://www.framer.com",
        note: "The preferred tool for designers to publish responsive, interactive portfolio websites without code."
      },
      {
        name: "Solving Product Design Exercises by Artiom Dashinsky",
        type: "book",
        url: "https://productdesigninterview.com",
        note: "Preparation manual for whiteboard design challenges and take-home design assignments."
      }
    ],
    checkpoint: {
      criteria: "Publishing a live personal portfolio website with at least 3 deep case studies and receiving positive recruiter responses on LinkedIn.",
      deliverable: "Live portfolio URL (built on Framer/Webflow) and verified design offer letter."
    },
    decisionPoints: [
      {
        question: "Design Agency / Studio vs In-House Product Company",
        options: [
          {
            choice: "In-House Product Company (Tech Startup / SaaS MNC)",
            pros: "Deep ownership over one product, measuring real metric impact, high compensation, stock options (ESOPs).",
            cons: "Can become repetitive working on the same checkout funnel or dashboard for multiple years."
          },
          {
            choice: "Design Studio / Agency (Pentagram, Frog, Fjord, Lollypop)",
            pros: "Work on 10+ diverse client brands across fintech, healthcare, and e-commerce in a single year.",
            cons: "You hand off design files and rarely see long-term post-launch user data."
          }
        ]
      }
    ],
    warning: "Creating generic redesign case studies of Spotify or Instagram without real user research: Redesigning popular apps without access to their business metrics or technical constraints looks naive to senior design leaders.",
    fallbackPlan: "Work as an independent freelance UI/UX designer for early-stage founders on Contra or Upwork, converting successful freelance gigs into full-time offers.",
    realWorldStats: [
      {
        label: "Portfolio Review Drop-Off",
        value: "Average 30 Seconds",
        context: "Time a design manager spends deciding whether to interview a portfolio candidate"
      },
      {
        label: "Senior Product Designer CTC",
        value: "₹24L - ₹55L/yr",
        context: "Experienced product designers (4-7 years) in Indian tech hubs"
      }
    ]
  }
];

export { architect, designer };
console.log('Architect & Designer prepared.');
