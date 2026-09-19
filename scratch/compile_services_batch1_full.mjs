import fs from 'fs';
import { servicesBatch1 } from './compile_services_part1.mjs';

const civilEngineer = [
  {
    investment: {
      time: "2 Years (Class 11-12 PCM + engineering entrance preparation)",
      cost: "₹30,000 - ₹90,000 (School tuition, JEE prep books)"
    },
    actionItems: [
      {
        task: "Score 75%+ in Class 12 Boards with Physics, Chemistry, and Mathematics (PCM).",
        detail: "Master Newtonian mechanics, statics, vectors, and coordinate geometry for engineering entrance exams."
      },
      {
        task: "Appear for JEE Main & Advanced, BITSAT, and state engineering entrance tests.",
        detail: "Target top civil engineering departments: IIT Madras, IIT Bombay, IIT Roorkee, NIT Trichy, and CEG Anna University."
      },
      {
        task: "Observe mega infrastructure construction projects (metro rail, flyovers, bridges, tunneling).",
        detail: "Develop curiosity about deep foundation piles, pre-stressed concrete girders, and soil settlement."
      }
    ],
    resources: [
      {
        name: "National Programme on Technology Enhanced Learning (NPTEL Civil)",
        type: "course",
        url: "https://nptel.ac.in",
        note: "Free online video lectures by premier IIT professors covering structural mechanics and geotechnical engineering."
      },
      {
        name: "Institution of Engineers (India) - IEI",
        type: "documentation",
        url: "https://www.ieindia.org",
        note: "The largest multi-disciplinary professional body of engineers in India."
      },
      {
        name: "Concepts of Physics by H.C. Verma",
        type: "book",
        url: "https://www.bharatividyabhavan.org",
        note: "Foundational mastery of mechanics and equilibrium forces."
      }
    ],
    checkpoint: {
      criteria: "Scoring qualifying rank in engineering entrance and securing admission to an AICTE-approved Civil Engineering program.",
      deliverable: "Class 12 Marksheet and B.Tech Civil Engineering Admission Offer."
    },
    decisionPoints: [
      {
        question: "B.Tech in Civil Engineering at Top IIT/NIT vs Private Engineering College",
        options: [
          {
            choice: "Top IIT / NIT Civil Engineering",
            pros: "World-class structural testing labs (wind tunnels, shake tables), campus placement in top PSUs and global EPCs.",
            cons: "High entrance cutoff requirements in JEE Advanced."
          },
          {
            choice: "Accredited State / Private University",
            pros: "Easier admission, local regional industry network, practical site survey training.",
            cons: "Fewer core PSU on-campus recruitment visits; must crack GATE independently."
          }
        ]
      }
    ],
    warning: "Neglecting site surveying and concrete lab practicals: Civil engineering cannot be learned only from textbooks; you must know how to operate Total Station survey instruments and test concrete compressive strength.",
    fallbackPlan: "If B.Tech civil cutoffs are missed, pursue a 3-year Diploma in Civil Engineering and enter B.Tech through direct 2nd-year lateral entry.",
    realWorldStats: [
      {
        label: "India Infrastructure Spend",
        value: "₹111 Lakh Crores",
        context: "National Infrastructure Pipeline (NIP) investment targets"
      },
      {
        label: "Civil Engineering Campus Placement",
        value: "₹6L - ₹14L/yr",
        context: "Starting packages at top tier-1 engineering institutions"
      }
    ]
  },
  {
    investment: {
      time: "4 Years (Undergraduate engineering degree + field survey camps)",
      cost: "₹2,00,000 (Govt NIT/IIT) to ₹8,00,000 - ₹16,00,000 (Private engineering institutes)"
    },
    actionItems: [
      {
        task: "Master core disciplines: Strength of Materials, Structural Analysis, Geotechnical Soil Mechanics, and Fluid Mechanics.",
        detail: "Calculate shear force and bending moment diagrams (SFD/BMD), soil bearing capacities, and hydraulic flow."
      },
      {
        task: "Master structural modeling and drafting software: AutoCAD, STAAD.Pro, ETABS, and Revit Structure.",
        detail: "Model multi-story reinforced cement concrete (RCC) frames against seismic (IS 1893) and wind load (IS 875) codes."
      },
      {
        task: "Complete 1-month mandatory field survey camp and summer construction site internship.",
        detail: "Conduct contour leveling, theodolite traverse surveying, and inspect foundation rebar cages on site."
      }
    ],
    resources: [
      {
        name: "Design of Reinforced Concrete Structures by N. Krishna Raju",
        type: "book",
        url: "https://www.mheducation.co.in",
        note: "The definitive Indian textbook on limit state RCC design adhering strictly to IS 456:2000."
      },
      {
        name: "Bureau of Indian Standards (IS Codes - IS 456, IS 1893, IS 800)",
        type: "documentation",
        url: "https://www.standardsbis.in",
        note: "Mandatory statutory structural design codes governing Indian concrete, steel, and earthquake engineering."
      },
      {
        name: "Bentley STAAD.Pro Structural Analysis Software",
        type: "tool",
        url: "https://www.bentley.com/software/staad",
        note: "The industry standard structural engineering software for 3D frame analysis and steel/concrete design."
      }
    ],
    checkpoint: {
      criteria: "Passing all university structural design exams and completing a capstone multi-story building design project.",
      deliverable: "Bachelor of Technology (B.Tech) in Civil Engineering Degree Certificate and comprehensive structural calculation sheets."
    },
    decisionPoints: [
      {
        question: "Structural Design Engineering (Office Desk Track) vs On-Site Execution (Field Track)",
        options: [
          {
            choice: "Structural Design Engineer (Office / Consulting)",
            pros: "Air-conditioned corporate desk environment, designing skyscrapers and bridges using ETABS/STAAD.Pro.",
            cons: "Lower starting salary compared to on-site project management allowances."
          },
          {
            choice: "Site Construction Engineer (Execution Track - L&T, Tata Projects)",
            pros: "Hands-on authority managing hundreds of construction workers, rapid path to Project Director.",
            cons: "Demanding outdoor field conditions, dust, extreme weather, frequent relocations between project sites."
          }
        ]
      }
    ],
    warning: "Ignoring Indian Standard (IS) Code specifications on site: Pouring concrete without testing slump, water-cement ratio, or cube compressive strength leads to dangerous structural cracks and building condemnations.",
    fallbackPlan: "Work as an in-house Cost Estimator or Quantity Surveyor (QS) for real estate developers calculating material requirements.",
    realWorldStats: [
      {
        label: "Graduate Engineer Trainee (GET) Pay",
        value: "₹4L - ₹7.5L/yr",
        context: "Starting packages at major EPC contractors (L&T, Shapoorji, Afcons)"
      },
      {
        label: "Standard Concrete Grade for High-Rises",
        value: "M30 to M60 Grade",
        context: "High-performance concrete used in modern commercial urban towers"
      }
    ]
  },
  {
    investment: {
      time: "1 Year (GATE exam preparation or campus placement transition)",
      cost: "₹20,000 - ₹60,000 (GATE coaching institutes like Made Easy / ACE Academy + test series)"
    },
    actionItems: [
      {
        task: "Crack GATE (Graduate Aptitude Test in Engineering) with top All India Rank (AIR < 300).",
        detail: "Qualify for direct recruitment as Executive Engineer Trainee in premier PSUs: NHAI, NTPC, ONGC, IOCL, BHEL, and DMRC."
      },
      {
        task: "Appear for Indian Engineering Services (UPSC ESE) / Central Engineering Service (CPWD).",
        detail: "Compete for Group A Gazetted central government engineering posts managing national highway and border infrastructure."
      },
      {
        task: "Secure placements with leading EPC conglomerates (L&T Construction, Tata Projects, Shapoorji Pallonji).",
        detail: "Undergo management trainee rotations across procurement, planning, safety, and site execution."
      }
    ],
    resources: [
      {
        name: "Made Easy / ACE Engineering Academy GATE Test Series",
        type: "platform",
        url: "https://www.madeeasy.in",
        note: "The premier test series and postal study package taken by 90%+ of top GATE rankers."
      },
      {
        name: "UPSC Engineering Services Examination (ESE) Portal",
        type: "documentation",
        url: "https://upsc.gov.in",
        note: "Official portal for recruitment of Class-1 Gazetted engineers in Indian Railways, CPWD, and MES."
      },
      {
        name: "Primavera P6 Enterprise Project Portfolio Management",
        type: "tool",
        url: "https://www.oracle.com/construction-engineering/primavera-p6",
        note: "The industry standard project scheduling and critical path method (CPM) software used on mega infrastructure."
      }
    ],
    checkpoint: {
      criteria: "Securing AIR < 500 in GATE-CE or receiving a signed corporate placement offer from a leading infrastructure contractor.",
      deliverable: "Official GATE Scorecard and PSU / EPC Corporate Appointment Letter."
    },
    decisionPoints: [
      {
        question: "Public Sector Undertaking (PSU / CPWD via GATE/ESE) vs Private EPC Infrastructure (L&T, Tata Projects)",
        options: [
          {
            choice: "Public Sector Undertaking (NHAI, DMRC, NTPC) / Central Govt (CPWD)",
            pros: "Government job security, housing quarters, work-life balance, authority over multi-hundred crore public tenders.",
            cons: "Bureaucratic hierarchy and slower performance-linked promotion cycles."
          },
          {
            choice: "Private Infrastructure EPC (L&T Construction, Afcons)",
            pros: "Faster merit-based promotions, execution of cutting-edge iconic projects (bullet train, underwater tunnels).",
            cons: "Intense project delivery deadlines and demanding site working hours."
          }
        ]
      }
    ],
    warning: "Underestimating the Critical Path Method (CPM) in project scheduling: Delays in critical path activities (like foundation piling) cascade exponentially, leading to multi-crore project delay liquidated damages.",
    fallbackPlan: "Pursue M.Tech in Structural Engineering, Geotechnical, or Transportation Engineering at IITs/NITs through GATE score to unlock specialized consulting roles.",
    realWorldStats: [
      {
        label: "PSU Starting CTC (via GATE)",
        value: "₹12L - ₹18L/yr",
        context: "CTC offered to top GATE rankers by NTPC, ONGC, and IOCL"
      },
      {
        label: "GATE Civil Applicants",
        value: "1.2+ Lakh Engineers",
        context: "National annual competition for top PSU and M.Tech seats"
      }
    ]
  },
  {
    investment: {
      time: "3-7 Years (Project Engineer to Project Director / Chief Resident Engineer)",
      cost: "₹30,000 - ₹1,00,000 (PMP certification from PMI, Chartered Engineer credential from IEI)"
    },
    actionItems: [
      {
        task: "Earn the Project Management Professional (PMP) credential from PMI.",
        detail: "Master scope management, earned value management (EVM), cost variance, and procurement contracts (FIDIC)."
      },
      {
        task: "Manage multi-hundred-crore infrastructure projects: elevated highways, metro underground stations, or airport terminals.",
        detail: "Oversee quality assurance, environmental compliance, safety zero-incident targets, and client billing."
      },
      {
        task: "Obtain Chartered Engineer (CEng) and Chartered Structural Engineer status.",
        detail: "Earn statutory authority to certify structural safety certificates and evaluate vintage buildings."
      }
    ],
    resources: [
      {
        name: "Project Management Institute (PMI) - PMP Certification",
        type: "documentation",
        url: "https://www.pmi.org",
        note: "The globally recognized gold standard certification for construction and infrastructure project managers."
      },
      {
        name: "FIDIC (International Federation of Consulting Engineers) Contracts",
        type: "documentation",
        url: "https://fidic.org",
        note: "The international standard conditions of contract for construction and plant design-build projects."
      },
      {
        name: "Construction Management and Strategy (Griffith, Stephenson & Watson)",
        type: "book",
        url: "https://www.palgrave.com",
        note: "Executive textbook on risk management, supply chain integration, and lean construction."
      }
    ],
    checkpoint: {
      criteria: "Successfully completing and commissioning a major civil infrastructure project within budget and receiving client final completion certificate.",
      deliverable: "Project Practical Completion Certificate and verified PMP Credential."
    },
    decisionPoints: [
      {
        question: "International Infrastructure (Gulf / Dubai / Singapore) vs Indian Mega-Projects",
        options: [
          {
            choice: "Gulf & Overseas Infrastructure (Dubai, Saudi Arabia, Qatar)",
            pros: "Tax-free international compensation (₹25L - ₹60L), mega-scale futuristic projects (NEOM, skyscrapers).",
            cons: "Expatriate contract lifestyle; extreme desert climate."
          },
          {
            choice: "Indian Infrastructure Projects (Expressways, High-Speed Rail)",
            pros: "Booming domestic infrastructure cycle, staying close to family, high long-term career growth in India.",
            cons: "Complex local land acquisition challenges and contractual payment delays."
          }
        ]
      }
    ],
    warning: "Compromising on on-site safety standards (OSHA / IS safety norms): Construction site accidents (scaffolding collapse, crane failures) result in immediate project shutdown, criminal charges, and personal liability.",
    fallbackPlan: "Found an independent Civil Contracting Firm or Project Management Consultancy (PMC) bidding for state infrastructure tenders.",
    realWorldStats: [
      {
        label: "Project Director CTC",
        value: "₹35L - ₹80L+/yr",
        context: "Senior leadership running mega EPC infrastructure projects in India"
      },
      {
        label: "PMP Certified Salary Boost",
        value: "20% - 30%",
        context: "Average salary increment for certified construction project managers"
      }
    ]
  }
];

// Let's add mechanical-engineer, pilot, lawyer, teacher, journalist, digital-marketer to batch 1
export { civilEngineer };
console.log('Civil Engineer prepared.');
