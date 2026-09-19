import fs from 'fs';

const mechanicalEngineer = [
  {
    investment: {
      time: "2 Years (Class 11-12 PCM + engineering entrance prep)",
      cost: "₹30,000 - ₹90,000 (School tuition, entrance study material)"
    },
    actionItems: [
      {
        task: "Score 75%+ in Class 12 Boards with Physics, Chemistry, and Mathematics.",
        detail: "Focus on classical mechanics, laws of thermodynamics, rotational dynamics, and calculus."
      },
      {
        task: "Appear for JEE Main, JEE Advanced, and state engineering entrance tests.",
        detail: "Target top mechanical engineering institutes: IIT Madras, IIT Bombay, IIT Kharagpur, BITS Pilani, and NIT Surathkal."
      },
      {
        task: "Explore 3D CAD modeling basics using free student tools like Fusion 360 or Onshape.",
        detail: "Understand parametric sketches, extrusions, revolves, and basic assembly constraints."
      }
    ],
    resources: [
      {
        name: "American Society of Mechanical Engineers (ASME)",
        type: "documentation",
        url: "https://www.asme.org",
        note: "Global engineering organization establishing boiler and pressure vessel codes and mechanical standards."
      },
      {
        name: "Autodesk Fusion 360 for Students",
        type: "tool",
        url: "https://www.autodesk.com/products/fusion-360",
        note: "Cloud-based 3D CAD, CAM, and CAE software for product design and generative modeling."
      },
      {
        name: "Engineering Mechanics: Statics and Dynamics (Hibbeler)",
        type: "book",
        url: "https://www.pearson.com",
        note: "The quintessential worldwide engineering mechanics textbook for force equilibrium and rigid body dynamics."
      }
    ],
    checkpoint: {
      criteria: "Securing qualifying rank in engineering entrance and getting admitted into an accredited Mechanical Engineering program.",
      deliverable: "Class 12 Marksheet and B.Tech Mechanical Engineering Admission Offer."
    },
    decisionPoints: [
      {
        question: "Automotive & Electric Vehicle (EV) Track vs Aerospace & Thermal Energy Track",
        options: [
          {
            choice: "Automotive & EV Mobility",
            pros: "Massive transformation into electric vehicles, battery thermal management, chassis dynamics, high job volume.",
            cons: "Traditional internal combustion engine (ICE) jobs are steadily declining."
          },
          {
            choice: "Aerospace & Energy Systems",
            pros: "Rocket propulsion, gas turbines, renewable wind/solar energy, working with ISRO/DRDO/defense.",
            cons: "Strict defense security clearances and fewer private sector job openings."
          }
        ]
      }
    ],
    warning: "Assuming mechanical engineering is obsolete in the software era: Every physical device (EV batteries, surgical robots, smartphones, aircraft, wind turbines) requires mechanical engineering design, heat dissipation, and precision manufacturing.",
    fallbackPlan: "If top B.Tech mechanical seats are missed, pursue Mechanical Diploma with lateral entry into engineering, or enroll in Mechatronics.",
    realWorldStats: [
      {
        label: "Global EV Engineering Growth",
        value: "25% CAGR",
        context: "Rapid demand for battery pack, motor, and thermal mechanical engineers"
      },
      {
        label: "Mechanical Campus Starting CTC",
        value: "₹5.5L - ₹14L/yr",
        context: "Starting packages at top tier-1 engineering institutions"
      }
    ]
  },
  {
    investment: {
      time: "4 Years (Undergraduate degree + machine shop practicals + formula student projects)",
      cost: "₹2,00,000 (Govt NIT/IIT) to ₹8,00,000 - ₹16,00,000 (Private universities)"
    },
    actionItems: [
      {
        task: "Master core subjects: Thermodynamics, Heat Transfer, Fluid Mechanics, Kinematics of Machines, and Strength of Materials.",
        detail: "Calculate Carnot efficiencies, heat exchanger coefficients, Navier-Stokes equations, and gear train ratios."
      },
      {
        task: "Master industrial CAD/CAE software: SolidWorks / CATIA for 3D modeling and ANSYS for Finite Element Analysis (FEA) and CFD.",
        detail: "Simulate structural stress concentrations, aerodynamic drag coefficients, and thermal heat sink dissipation."
      },
      {
        task: "Participate in college automotive engineering competitions: BAJA SAE India or Formula Student India.",
        detail: "Design, fabricate, and race an all-terrain vehicle (ATV) or open-wheel electric race car."
      }
    ],
    resources: [
      {
        name: "Shigley's Mechanical Engineering Design (Budynas & Nisbett)",
        type: "book",
        url: "https://www.mheducation.com",
        note: "The undisputed international standard bible on machine components, fatigue failure, shafts, and gears."
      },
      {
        name: "ANSYS Student Simulation Software & Learning",
        type: "tool",
        url: "https://www.ansys.com/academic/students",
        note: "Industry-standard engineering simulation platform for finite element analysis (FEA) and computational fluid dynamics (CFD)."
      },
      {
        name: "SAE INDIA (Society of Automotive Engineers)",
        type: "platform",
        url: "https://saeindia.org",
        note: "Apex professional automotive society organizing BAJA SAE and Supra collegiate design competitions."
      }
    ],
    checkpoint: {
      criteria: "Completing a fully validated mechanical design project with FEA stress analysis and operating machine shop tools (lathe, milling, CNC).",
      deliverable: "Bachelor of Technology (B.Tech) in Mechanical Engineering Degree and 3D CAD/FEA simulation portfolio."
    },
    decisionPoints: [
      {
        question: "Core Product Design & R&D (CAD/CAE) vs Manufacturing Plant Operations (Production/Quality)",
        options: [
          {
            choice: "Product Design & R&D (Office / Tech Center - Tata Tech, Mercedes R&D)",
            pros: "Air-conditioned corporate R&D centers, high creative innovation, CAD/CAE simulation focus.",
            cons: "High competition from specialized Master's degree holders."
          },
          {
            choice: "Plant Operations & Manufacturing (Factory Floor - Tata Motors, Maruti Suzuki)",
            pros: "Hands-on assembly line authority, managing industrial robotics and workers, direct factory production.",
            cons: "Located in industrial manufacturing belts; rotating factory shift schedules."
          }
        ]
      }
    ],
    warning: "Designing parts without understanding Design for Manufacturing and Assembly (DFMA): Designing 3D shapes that cannot be machined on a CNC mill or cast in a foundry makes you look inexperienced to senior manufacturing tooling engineers.",
    fallbackPlan: "Transition into HVAC (Heating, Ventilation, and Air Conditioning) design for commercial data centers and real estate, where mechanical heat dissipation skills command steady pay.",
    realWorldStats: [
      {
        label: "BAJA SAE Alumni Placement",
        value: "80%+ Recruited by Top OEMs",
        context: "Auto companies heavily prioritize candidates with real formula racing fabrication experience"
      },
      {
        label: "Core Auto GET Starting Pay",
        value: "₹6L - ₹11L/yr",
        context: "Offered by Tata Motors, Mahindra, Maruti, and Hero MotoCorp"
      }
    ]
  },
  {
    investment: {
      time: "1 Year (GATE exam preparation or campus placement transition)",
      cost: "₹20,000 - ₹60,000 (GATE test series & coaching)"
    },
    actionItems: [
      {
        task: "Crack GATE (Graduate Aptitude Test in Engineering - Mechanical) with Top 200 rank.",
        detail: "Qualify for Executive Trainee recruitments in Maharatna PSUs: ONGC, IOCL, BHEL, NTPC, SAIL, HPCL, and BPCL."
      },
      {
        task: "Appear for scientific recruitment exams: ISRO (ICRB) and DRDO (RAC) Scientist 'SC' examinations.",
        detail: "Join India's premier space and defense research agencies designing rocket engines, satellites, and missile propulsion."
      },
      {
        task: "Secure placements with leading automotive and heavy engineering multinational corporations (Cummins, Caterpillar, L&T, Bosch).",
        detail: "Undergo rotational Graduate Engineer Trainee (GET) programs across testing, prototyping, and assembly."
      }
    ],
    resources: [
      {
        name: "GATE Mechanical Engineering Official Syllabus & PYQs",
        type: "documentation",
        url: "https://gate.iitk.ac.in",
        note: "Official syllabus covering engineering mechanics, thermal engineering, manufacturing, and industrial engineering."
      },
      {
        name: "ISRO Centralised Recruitment Board (ICRB)",
        type: "platform",
        url: "https://www.isro.gov.in/Careers.html",
        note: "Official portal for Scientist/Engineer 'SC' recruitment examinations for Indian Space Research Organisation."
      },
      {
        name: "Internal Combustion Engines by V. Ganesan",
        type: "book",
        url: "https://www.mheducation.co.in",
        note: "The classic Indian textbook on engine cycles, combustion phenomena, fuel injection, and emissions."
      }
    ],
    checkpoint: {
      criteria: "Securing AIR < 300 in GATE-ME or appointment as Scientist 'SC' at ISRO/DRDO or GET at a leading automotive OEM.",
      deliverable: "Official GATE Scorecard or Government Appointment Order / Corporate Offer Letter."
    },
    decisionPoints: [
      {
        question: "Maharatna PSU / ISRO Scientist (Govt) vs Global Auto R&D Tech Center (Mercedes-Benz, Bosch, John Deere)",
        options: [
          {
            choice: "Maharatna PSU / ISRO / DRDO",
            pros: "National pride, working on space exploration (Chandrayaan/Gaganyaan), high job security, government quarters.",
            cons: "Fixed government 7th Pay Commission pay bands with slower compensation growth than private tech."
          },
          {
            choice: "Global Automotive R&D Tech Center (Mercedes MBRDI, Stellantis, Bosch)",
            pros: "Cutting-edge autonomous driving sensors, high corporate pay, international travel to Germany/US headquarters.",
            cons: "Subject to global corporate restructuring and automotive demand downturns."
          }
        ]
      }
    ],
    warning: "Ignoring programming and electronics: Modern mechanical systems are Mechatronic (controlled by microcontrollers, CAN-bus, sensors, and firmware); mechanical engineers who refuse to learn Python or MATLAB will fall behind.",
    fallbackPlan: "Pursue M.Tech in Thermal, Design, or Robotics at IITs through GATE to enter specialized advanced R&D labs.",
    realWorldStats: [
      {
        label: "PSU Starting CTC (via GATE)",
        value: "₹14L - ₹20L/yr",
        context: "CTC offered to top GATE mechanical rankers by ONGC and IOCL"
      },
      {
        label: "GATE Mechanical Applicants",
        value: "1.3+ Lakh Engineers",
        context: "One of India's most competitive engineering exams"
      }
    ]
  },
  {
    investment: {
      time: "3-7 Years (Senior R&D Engineer to Chief Mechanical Engineer / Plant Head)",
      cost: "₹40,000 - ₹1,20,000 (Six Sigma Black Belt certification, ASME professional credentials)"
    },
    actionItems: [
      {
        task: "Lead engineering R&D for next-generation platforms: EV Battery Thermal Management Systems (BTMS) or Precision Robotics.",
        detail: "Solve extreme heat dissipation challenges under high-voltage fast charging (150kW+) and crash safety structural integrity."
      },
      {
        task: "Implement Industry 4.0 Smart Manufacturing: IoT predictive maintenance, digital twins, and automated CNC machining cells.",
        detail: "Reduce factory downtime by 30% using vibration sensors and machine learning anomaly detection on stamping presses."
      },
      {
        task: "Earn Lean Six Sigma Black Belt and lead multi-crore operational cost reduction initiatives.",
        detail: "Eliminate manufacturing scrap, optimize die-casting cycle times, and ensure zero-defect supplier quality."
      }
    ],
    resources: [
      {
        name: "Toyota Production System: Beyond Large-Scale Production (Taiichi Ohno)",
        type: "book",
        url: "https://www.routledge.com",
        note: "The legendary foundational text on Lean manufacturing, Just-In-Time (JIT), and Kaizen continuous improvement."
      },
      {
        name: "ASME Journal of Mechanical Design",
        type: "platform",
        url: "https://asmedigitalcollection.asme.org/mechanicaldesign",
        note: "Leading peer-reviewed journal on algorithmic design, structural optimization, and mechanism synthesis."
      },
      {
        name: "MATLAB & Simulink for Model-Based Design (MathWorks)",
        type: "tool",
        url: "https://www.mathworks.com/products/simulink.html",
        note: "The global automotive and aerospace standard for powertrain modeling and control loop simulations."
      }
    ],
    checkpoint: {
      criteria: "Successfully launching an automotive vehicle platform or industrial machinery into commercial serial production.",
      deliverable: "Approved Engineering Release Notice (ERN), granted patents, and verified production yield sign-off."
    },
    decisionPoints: [
      {
        question: "Automotive Plant Head (Manufacturing Operations) vs Chief Technology Officer (Product R&D)",
        options: [
          {
            choice: "Plant Head / Operations Director",
            pros: "Ultimate authority over a 2,000-person manufacturing facility, multi-thousand-crore budget control, direct P&L.",
            cons: "High stress managing factory labor unions and 24/7 continuous production targets."
          },
          {
            choice: "Chief Technology Officer / VP of Engineering (R&D Track)",
            pros: "Shaping technological intellectual property, filing patents, leading global engineering centers.",
            cons: "Corporate headquarters pressure to commercialize innovations within tight model-year deadlines."
          }
        ]
      }
    ],
    warning: "Over-relying on pure computer simulations without verifying on physical test rigs: FEA and CFD simulations are only as good as their boundary conditions; failing to validate with physical shake and thermal chamber tests causes catastrophic recall failures.",
    fallbackPlan: "Operate as an independent Forensic Engineering Consultant investigating industrial boiler explosions, machinery failures, and insurance claims.",
    realWorldStats: [
      {
        label: "Plant Head / Engineering VP CTC",
        value: "₹45L - ₹95L+/yr",
        context: "Senior leadership at BSE-listed automotive and manufacturing corporations"
      },
      {
        label: "Six Sigma Black Belt ROI",
        value: "₹50 Lakhs+ Cost Savings",
        context: "Average annual operational savings per black belt project"
      }
    ]
  }
];

const pilot = [
  {
    investment: {
      time: "1-2 Years (Class 11-12 PCM + Class 2 and Class 1 DGCA medical certifications)",
      cost: "₹25,000 - ₹60,000 (DGCA Class 2 medical exam ₹10,000 + Class 1 medical at Air Force Centre ₹15,000)"
    },
    actionItems: [
      {
        task: "Score 50%+ in Class 12 Boards with Physics and Mathematics (non-negotiable DGCA requirement).",
        detail: "If you did not take PCM in 12th, you must pass Physics and Math through the National Institute of Open Schooling (NIOS) on-demand exams."
      },
      {
        task: "Undergo and pass the DGCA Class 2 Medical Examination with an authorized DGCA Medical Examiner.",
        detail: "Check eyesight (6/6 vision with or without glasses), audiometry hearing, ECG, blood sugar, and general health."
      },
      {
        task: "Undergo and pass the DGCA Class 1 Initial Medical Examination at an authorized Indian Air Force Medical Centre (AFCME Delhi, IAM Bangalore).",
        detail: "Stringent military-grade medical tests: EEG brain scan, pure tone audiometry, eye refraction, and spine X-rays."
      }
    ],
    resources: [
      {
        name: "Directorate General of Civil Aviation (DGCA) India Official Portal",
        type: "documentation",
        url: "https://www.dgca.gov.in",
        note: "Statutory civil aviation authority regulating pilot licensing, flight training, and civil aviation requirements (CAR)."
      },
      {
        name: "DGCA eGCA Portal (e-Governance for Civil Aviation)",
        type: "platform",
        url: "https://egca.dgca.gov.in",
        note: "Single-window online platform for medical appointments, exam applications, and pilot license issuances."
      },
      {
        name: "From the Ground Up: Aviation Weather and Theory",
        type: "book",
        url: "https://www.aviationworld.net",
        note: "The classic foundational international textbook on basic aerodynamics, aircraft systems, and weather."
      }
    ],
    checkpoint: {
      criteria: "Receiving valid DGCA Class 1 Medical Assessment with 'Fit for Commercial Flying' certification and Class 12 PCM marksheet.",
      deliverable: "DGCA Class 1 Medical Assessment File (CA-35) and Computer Number issued by DGCA Central Examination Organisation (CEO)."
    },
    decisionPoints: [
      {
        question: "Conventional Flying School Route vs Airline Cadet Pilot Program (IndiGo, Air India, SpiceJet)",
        options: [
          {
            choice: "Airline Cadet Pilot Program (IndiGo Cadet / Air India Cadet)",
            pros: "Guaranteed Letter of Intent (LOI) for Junior First Officer job upon completion; structured end-to-end pathway.",
            cons: "Extremely expensive (₹1 Crore - ₹1.2 Crore total cost upfront); high financial burden on family."
          },
          {
            choice: "Conventional Route (Flying School in India or Abroad)",
            pros: "Much lower cost (₹40L - ₹65L for CPL); flexibility to train at your own pace and choose flying schools.",
            cons: "No guaranteed airline job; must clear airline entrance tests and pay separately for Type Rating."
          }
        ]
      }
    ],
    warning: "Spending money on flying schools before securing your DGCA Class 1 Medical: If military doctors find an uncorrectable medical disqualification (like congenital heart defect or abnormal EEG), you cannot legally fly commercially.",
    fallbackPlan: "If Class 1 medical is failed on minor eyesight parameters, correct via permissible DGCA PRK/LASIK eye surgery guidelines; if permanently disqualified, transition to Flight Dispatcher or Air Traffic Controller (ATC).",
    realWorldStats: [
      {
        label: "DGCA Class 1 Medical Rejection Rate",
        value: "8% - 12%",
        context: "Candidates disqualified due to spine, vision, or neurological benchmarks"
      },
      {
        label: "Cadet Program Total Cost",
        value: "₹95 Lakhs - ₹1.25 Crores",
        context: "Comprehensive cost including CPL, Type Rating, and accommodation"
      }
    ]
  },
  {
    investment: {
      time: "1 Year (DGCA ground school theory exams)",
      cost: "₹1,50,000 - ₹3,00,000 (Ground school coaching fees for 5 DGCA papers + exam fees)"
    },
    actionItems: [
      {
        task: "Clear all 5 mandatory DGCA Pilot Theory Examinations: Air Navigation, Aviation Meteorology, Air Regulations, Technical General, and Technical Specific.",
        detail: "Exams require 70%+ passing marks; questions test flight planning, wind drift, thunderstorm hazards, and aircraft engines."
      },
      {
        task: "Clear the RTR(A) - Radio Telephony Restricted (Aeronautical) Examination conducted by the Ministry of Communications (WPC).",
        detail: "Demonstrate standardized ICAO radio phraseology, emergency Mayday / Pan-Pan transmissions, and air traffic control readbacks."
      },
      {
        task: "Obtain Student Pilot License (SPL) and Flight Radio Telephone Operator License (FRTOL).",
        detail: "Qualify legally to take controls of a single-engine training aircraft and communicate on aviation frequencies."
      }
    ],
    resources: [
      {
        name: "Oxford Aviation Academy ATPL Manuals (Air Nav, Met, Instruments)",
        type: "book",
        url: "https://www.cae.com",
        note: "The international gold standard curriculum for professional pilot ground school theory."
      },
      {
        name: "Wireless Planning & Coordination (WPC) Wing Portal",
        type: "documentation",
        url: "https://dot.gov.in/spectrum/wireless-planning-coordination",
        note: "Statutory authority conducting the famously rigorous RTR(A) radio license examination in India."
      },
      {
        name: "Aviation Meteorology by I.C. Joshi",
        type: "book",
        url: "https://www.himalayanbooks.com",
        note: "The essential Indian textbook for cracking the DGCA Aviation Meteorology theory exam."
      }
    ],
    checkpoint: {
      criteria: "Passing all 5 DGCA ground theory papers and securing the WPC RTR(A) Radio License.",
      deliverable: "DGCA Ground Exam Pass Result Slips and official WPC RTR(A) License."
    },
    decisionPoints: [
      {
        question: "Clearing DGCA Exams Before Flying vs Studying Theory Alongside Flying Hours",
        options: [
          {
            choice: "Clear All DGCA Exams Before Stepping into Aircraft",
            pros: "100% focus on flight training once at the flying school; no risk of expired medicals or exams while logging hours.",
            cons: "Delays the excitement of actually flying an airplane by 6-9 months."
          },
          {
            choice: "Fly First, Clear Exams Later",
            pros: "Get into the cockpit immediately; build physical airmanship early.",
            cons: "Many pilots finish their 200 hours and then spend 2 frustrating years stuck on ground exams."
          }
        ]
      }
    ],
    warning: "Relying on outdated question banks for DGCA exams: The DGCA has transitioned to dynamic, conceptual question banks; rote memorization leads to repeated exam failures.",
    fallbackPlan: "If RTR(A) is stuck in India (known for notoriously low pass rates), appear for the UK or Australian RTR exam and convert it to Indian DGCA via reciprocal verification.",
    realWorldStats: [
      {
        label: "DGCA Theory Exam Passing Score",
        value: "70% Minimum",
        context: "Strict qualifying cutoff across all papers"
      },
      {
        label: "Indian RTR(A) Pass Percentage",
        value: "10% - 15%",
        context: "Fierce oral communication exam with low national pass rate"
      }
    ]
  },
  {
    investment: {
      time: "12-18 Months (200 Hours flight training for Commercial Pilot License)",
      cost: "₹35,00,000 - ₹55,00,000 (Aircraft fuel, flight instructor hours, simulator sessions, lodging at airfield)"
    },
    actionItems: [
      {
        task: "Log 200 total flight hours on training aircraft (Cessna 172, Diamond DA40, Piper Seneca) adhering to DGCA CAR Section 7.",
        detail: "Fulfill: 100 hours Pilot-in-Command (PIC), 50 hours cross-country flying, 10 hours night flying, and 5 hours solo night."
      },
      {
        task: "Master basic and advanced instrument flight: Instrument Flight Rules (IFR) using VOR, ILS, and GPS navigation.",
        detail: "Fly aircraft under 'the hood' (blind cockpit vision) relying 100% on attitude indicators, altimeters, and compass."
      },
      {
        task: "Earn Multi-Engine Rating (MER) and Instrument Rating (IR) on twin-engine aircraft (Diamond DA42 or Piper Seminole).",
        detail: "Master engine-out emergency procedures, asymmetric thrust recovery, feathering props, and single-engine go-arounds."
      }
    ],
    resources: [
      {
        name: "Indira Gandhi Rashtriya Uran Akademi (IGRUA) Raebareli",
        type: "platform",
        url: "https://igrua.gov.in",
        note: "India's premier autonomous national flying academy under the Ministry of Civil Aviation."
      },
      {
        name: "Federal Aviation Administration (FAA) Airplane Flying Handbook",
        type: "documentation",
        url: "https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/airplane_handbook",
        note: "The official manual on maneuvers, takeoffs, crosswind landings, stalls, and spins."
      },
      {
        name: "Jeppesen Airways Manual & Enroute Navigation Charts",
        type: "tool",
        url: "https://www.jeppesen.com",
        note: "The international professional standard for instrument approach plates (IAPs) and airport taxi diagrams."
      }
    ],
    checkpoint: {
      criteria: "Passing DGCA Day and Night Skill Tests with a DGCA Flight Operations Inspector (FOI).",
      deliverable: "Commercial Pilot License (CPL) with Multi-Engine and Instrument Ratings stamped in your DGCA Logbook."
    },
    decisionPoints: [
      {
        question: "Flight Training in India (IGRUA / Chimes / NFTI) vs Training Abroad (USA, South Africa, New Zealand)",
        options: [
          {
            choice: "Flight Training in the USA (Florida / Texas FAA 141 Schools)",
            pros: "Consistent sunshine weather, finish 200 hours in 6-8 months, advanced radar ATC exposure, modern glass cockpits.",
            cons: "Requires license conversion exams back in India; foreign exchange currency volatility."
          },
          {
            choice: "Flight Training in India (IGRUA / Flying Clubs)",
            pros: "No foreign license conversion needed, direct DGCA license issuance, training in Indian monsoon airspace.",
            cons: "Weather delays (monsoons and North India winter fog can stretch training to 2 years)."
          }
        ]
      }
    ],
    warning: "Logging fake hours in unverified flying clubs: The DGCA conducts strict radar log and fuel invoice audits; fraudulent flight hour logs result in permanent CPL cancellation and criminal investigation.",
    fallbackPlan: "If airline hiring is in a seasonal lull, work as a certified Flight Instructor (AFIR / FIR) building flight hours while earning a monthly salary.",
    realWorldStats: [
      {
        label: "Mandatory CPL Flight Time",
        value: "200 Verified Hours",
        context: "Statutory flight hours required by DGCA"
      },
      {
        label: "Twin-Engine Flight Cost",
        value: "₹40,000 - ₹65,000 / Hour",
        context: "Hourly operating cost of multi-engine trainer (DA42/Seneca)"
      }
    ]
  },
  {
    investment: {
      time: "6-12 Months (Type Rating on Airbus A320 / Boeing 737 + Airline Line Training)",
      cost: "₹20,00,000 - ₹30,00,000 (Self-sponsored Type Rating on Level D Full Flight Simulator)"
    },
    actionItems: [
      {
        task: "Complete Multi-Crew Cooperation (MCC) and Jet Orientation Course (JOC).",
        detail: "Transition from single-pilot light aircraft to multi-crew airline cockpit communication, threat and error management (TEM)."
      },
      {
        task: "Complete Type Rating on commercial passenger jet (Airbus A320neo or Boeing 737 MAX) at an approved TRTO.",
        detail: "Log 36 hours in Level D Full Flight Simulators: catastrophic engine failures, hydraulic loss, windshear, and emergency evacuation."
      },
      {
        task: "Clear Airline Induction Pilot Assessments: Compass psychometric test, simulator evaluation, and technical board interview.",
        detail: "IndiGo, Air India, Akasa Air, and SpiceJet evaluate SOP adherence, situational awareness, and crew resource management (CRM)."
      }
    ],
    resources: [
      {
        name: "CAE / FlightSafety International Simulator Training",
        type: "platform",
        url: "https://www.cae.com",
        note: "The world's premier commercial airline simulator training organization with centers in Greater Noida and Bengaluru."
      },
      {
        name: "Airbus Flight Crew Operating Manual (FCOM) - A320",
        type: "documentation",
        url: "https://www.airbus.com",
        note: "The operational operating manual detailing system logic (Fly-By-Wire, ECAM) for the world's most popular commercial jet."
      },
      {
        name: "ICAO Doc 9995 - Manual of Evidence-based Training",
        type: "documentation",
        url: "https://www.icao.int",
        note: "International standards for competence-based pilot assessment and threat management in airline operations."
      }
    ],
    checkpoint: {
      criteria: "Passing the DGCA Type Rating Check Ride in Level D simulator and receiving Line Release as Junior First Officer.",
      deliverable: "Type Endorsement on CPL and first official scheduled commercial airline flight landing with passengers."
    },
    decisionPoints: [
      {
        question: "Airbus A320 Type Rating vs Boeing 737 Type Rating",
        options: [
          {
            choice: "Airbus A320 Family Type Rating",
            pros: "Dominates Indian domestic skies (IndiGo has 300+ A320s with 500+ on order, Air India expanding fleet).",
            cons: "High volume of self-sponsored A320 type-rated pilots competing for entry-level airline slots."
          },
          {
            choice: "Boeing 737 Family Type Rating",
            pros: "Flown by Akasa Air, Air India Express, and SpiceJet; high demand for certified 737 First Officers.",
            cons: "Slightly smaller domestic fleet size compared to the massive A320 market share in India."
          }
        ]
      }
    ],
    warning: "Self-sponsoring a Type Rating without active airline hiring notifications: Type ratings expire if you don't fly the aircraft within 12 months; never spend ₹25 Lakhs on a Type Rating without clear visibility into airline vacancies.",
    fallbackPlan: "Fly in Non-Scheduled Operator Permit (NSOP) corporate private jets, air ambulance, or cargo charter operations while waiting for scheduled airline openings.",
    realWorldStats: [
      {
        label: "Commercial Fleet on Order",
        value: "1,500+ Aircraft",
        context: "Record orders by IndiGo and Air India requiring 10,000+ pilots over next decade"
      },
      {
        label: "Junior First Officer Starting Pay",
        value: "₹1.5L - ₹2.5L/month",
        context: "Starting salary upon joining commercial airline; scales to ₹4L - ₹6L after line release"
      }
    ]
  }
];

export { mechanicalEngineer, pilot };
console.log('Mechanical Engineer & Pilot prepared.');
