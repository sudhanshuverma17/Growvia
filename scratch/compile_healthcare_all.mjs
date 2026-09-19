import fs from 'fs';
import { dentist } from './generate_healthcare.mjs';

const pharmacist = [
  {
    investment: {
      time: "2 Years (Class 11-12 PCB or PCM stream + state entrance prep)",
      cost: "₹30,000 - ₹90,000 (School tuition & entrance coaching)"
    },
    actionItems: [
      {
        task: "Score 50%+ in Class 12 Boards with Physics, Chemistry, and Biology or Mathematics.",
        detail: "Pharmacy is unique: both medical (PCB) and engineering (PCM) students are eligible for admission."
      },
      {
        task: "Prepare for state pharmacy entrance exams (MHT-CET, KCET, WBJEE) or central CUET / NEET.",
        detail: "Focus on organic chemistry reaction mechanisms, mole concepts, and biology physiology."
      },
      {
        task: "Research PCI (Pharmacy Council of India) approved institutions.",
        detail: "Verify that the college has active PCI approval; degrees from non-PCI recognized colleges cannot receive pharmacist licenses."
      }
    ],
    resources: [
      {
        name: "Pharmacy Council of India (PCI) Official Portal",
        type: "documentation",
        url: "https://www.pci.nic.in",
        note: "Statutory body regulating pharmacy education and the profession of pharmacy in India."
      },
      {
        name: "National Institute of Pharmaceutical Education and Research (NIPER)",
        type: "platform",
        url: "https://www.niper.gov.in",
        note: "India's premier autonomous institute of excellence in pharmaceutical sciences."
      },
      {
        name: "Indian Pharmacopoeia Commission (IPC)",
        type: "documentation",
        url: "https://ipc.gov.in",
        note: "Official body establishing standards for all drugs manufactured and marketed in India."
      }
    ],
    checkpoint: {
      criteria: "Scoring qualifying ranks in state pharmacy entrance and securing admission to a PCI-approved B.Pharm program.",
      deliverable: "Class 12 Passing Marksheet and verified PCI College Allotment Letter."
    },
    decisionPoints: [
      {
        question: "B.Pharm (4 Years) vs D.Pharm (2 Year Diploma) vs Pharm.D (6 Year Doctor of Pharmacy)",
        options: [
          {
            choice: "Bachelor of Pharmacy (B.Pharm - 4 Years)",
            pros: "Standard degree opening all doors: industrial manufacturing, clinical research, drug discovery, and retail licensure.",
            cons: "Four years duration; lacks direct clinical patient prescribing authority."
          },
          {
            choice: "Doctor of Pharmacy (Pharm.D - 6 Years)",
            pros: "Intense hospital clinical pharmacy focus, ward rounds alongside medical doctors, global clinical equivalence.",
            cons: "High tuition cost and limited formal clinical pharmacist posts in Indian government hospitals."
          }
        ]
      }
    ],
    warning: "Enrolling in a private college whose PCI approval is pending or expired: If the college is not recognized by the Pharmacy Council of India, state councils will reject your registration as a Registered Pharmacist.",
    fallbackPlan: "If B.Pharm admission cutoff is missed, enroll in D.Pharm (Diploma in Pharmacy) and enter B.Pharm directly into the 2nd year through the Lateral Entry route.",
    realWorldStats: [
      {
        label: "Indian Pharma Market Position",
        value: "3rd Largest Globally by Volume",
        context: "The 'Pharmacy of the World' supplying 20%+ of global generic medicines"
      },
      {
        label: "B.Pharm Colleges in India",
        value: "2,500+ PCI-Approved Colleges",
        context: "Producing 1.5+ lakh pharmacy graduates annually"
      }
    ]
  },
  {
    investment: {
      time: "4 Years (8 Semesters of academic theory, practical wet-labs, and industrial training)",
      cost: "₹1,50,000 - ₹8,00,000 (Tuition fees across government and private pharmacy institutes)"
    },
    actionItems: [
      {
        task: "Master core subjects: Pharmacology, Pharmaceutics, Pharmaceutical Chemistry, and Pharmacognosy.",
        detail: "Understand drug action mechanisms (pharmacodynamics), absorption/elimination (pharmacokinetics), and tablet formulation."
      },
      {
        task: "Operate analytical lab instruments: HPLC (High-Performance Liquid Chromatography), UV-Vis Spectrophotometer, and Dissolution testers.",
        detail: "Hands-on calibration and chromatography troubleshooting are critical for Quality Control (QC) jobs."
      },
      {
        task: "Complete 1-month mandatory industrial plant training in a GMP-certified pharmaceutical manufacturing plant.",
        detail: "Observe cleanroom protocols, HVAC air-handling units, sterile filling lines, and batch manufacturing records (BMR)."
      }
    ],
    resources: [
      {
        name: "Essentials of Medical Pharmacology by K.D. Tripathi",
        type: "book",
        url: "https://www.jaypeebrothers.com",
        note: "The undisputed gold standard medical pharmacology textbook across medical and pharmacy colleges in India."
      },
      {
        name: "Aulton's Pharmaceutics: The Design and Manufacture of Medicines",
        type: "book",
        url: "https://www.elsevier.com",
        note: "Comprehensive textbook on dosage form design, solid-dosage manufacturing, and biopharmaceutics."
      },
      {
        name: "US FDA Current Good Manufacturing Practice (cGMP) Regulations",
        type: "documentation",
        url: "https://www.fda.gov/drugs/pharmaceutical-quality-resources",
        note: "Global regulatory guidelines governing sterile manufacturing and quality control standards."
      }
    ],
    checkpoint: {
      criteria: "Passing all 8 semester university examinations without active backlogs and logging 150+ hours of industrial training.",
      deliverable: "Bachelor of Pharmacy (B.Pharm) Degree Certificate and Industrial Training Completion Certificate."
    },
    decisionPoints: [
      {
        question: "Industrial Manufacturing / QA-QC vs Pharmacovigilance & Clinical Research (CRO)",
        options: [
          {
            choice: "Pharmacovigilance (PV) & Medical Writing (IT/Pharma MNCs)",
            pros: "Air-conditioned corporate desk environment, high starting CTC (₹4.5L - ₹8L), strong hiring by Cognizant/IQVIA.",
            cons: "Purely desk and database triage work; detached from wet-lab formulation science."
          },
          {
            choice: "Manufacturing Plant (Production / QA / QC)",
            pros: "Hands-on drug formulation, fast trajectory to Plant Operations Head, essential industry core.",
            cons: "Located in remote industrial pharma clusters (Baddi, Vapi, Hyderabad pharma city); rotating shifts."
          }
        ]
      }
    ],
    warning: "Neglecting data integrity and cGMP documentation: In pharmaceutical manufacturing, faking or pre-dating logbook entries is a criminal offence that can result in immediate termination and FDA import alerts.",
    fallbackPlan: "Apply for Medical Representative (MR) / Territory Business Manager roles in top pharma companies (Sun Pharma, Cipla, Mankind); top sales reps make ₹6L - ₹12L within 2 years.",
    realWorldStats: [
      {
        label: "B.Pharm Graduate Starting CTC",
        value: "₹3.5L - ₹7.5L/yr",
        context: "Entry-level roles in QA/QC, production, and pharmacovigilance"
      },
      {
        label: "US FDA Approved Plants in India",
        value: "650+ Facilities",
        context: "Highest number of FDA-compliant plants outside the United States"
      }
    ]
  },
  {
    investment: {
      time: "2 Years (Postgraduate Master of Pharmacy degree + original research thesis)",
      cost: "₹1,00,000 - ₹5,00,000 (Subsidized by AICTE/GPAT monthly scholarship of ₹12,400/mo)"
    },
    actionItems: [
      {
        task: "Crack GPAT (Graduate Pharmacy Aptitude Test) with top national rank.",
        detail: "Earn the central AICTE monthly postgraduate stipend of ₹12,400 per month for 24 months."
      },
      {
        task: "Specialize in high-demand disciplines: Pharmaceutics (NDDS), Pharmacology, or Regulatory Affairs.",
        detail: "Design novel drug delivery systems (nanoparticles, liposomes) or conduct in-vivo preclinical animal toxicity assays."
      },
      {
        task: "Publish research papers in SCI/Scopus-indexed journals and draft an original formulation patent.",
        detail: "Demonstrate independent scientific methodology and data analysis using statistical software (GraphPad Prism)."
      }
    ],
    resources: [
      {
        name: "GPAT Official Portal (National Testing Agency)",
        type: "platform",
        url: "https://gpat.nta.nic.in",
        note: "National entrance examination for admission into postgraduate pharmacy programs and AICTE scholarships."
      },
      {
        name: "Goodman & Gilman's The Pharmacological Basis of Therapeutics",
        type: "book",
        url: "https://www.accesspharmacy.mhmedical.com",
        note: "The international bible of pharmacology and molecular drug targets."
      },
      {
        name: "Indian Journal of Pharmaceutical Sciences (IJPS)",
        type: "platform",
        url: "https://www.ijpsonline.com",
        note: "Premier peer-reviewed scientific journal of the Indian Pharmaceutical Association."
      }
    ],
    checkpoint: {
      criteria: "Passing M.Pharm thesis viva-voce and securing campus placement in Pharma Formulation R&D or Global Regulatory Affairs.",
      deliverable: "Master of Pharmacy (M.Pharm) Degree Certificate and published peer-reviewed research paper."
    },
    decisionPoints: [
      {
        question: "Formulation R&D (Formulation Development - F&D) vs Global Regulatory Affairs (DRA)",
        options: [
          {
            choice: "Global Regulatory Affairs (DRA)",
            pros: "Prepare eCTD dossiers (ANDAs) for US FDA, EMA, and MHRA approvals; corporate desk hours, high global demand.",
            cons: "Requires intense reading of dry statutory guidelines; zero laboratory experimentation."
          },
          {
            choice: "Formulation & Development (F&D / R&D)",
            pros: "Inventing new drug formulations, developing non-infringing patents, high scientific prestige.",
            cons: "High pressure to crack stability testing deadlines; requires daily wet-lab experimentation."
          }
        ]
      }
    ],
    warning: "Publishing in predatory, non-indexed journals: Reputable pharma R&D employers verify research on Scopus/PubMed; fake journal citations will disqualify you from R&D interviews.",
    fallbackPlan: "Transition into Clinical Data Management (CDM) or Healthcare Analytics at global IT and healthcare consulting firms.",
    realWorldStats: [
      {
        label: "GPAT AICTE Scholarship",
        value: "₹12,400/month",
        context: "Monthly government stipend paid to all GPAT-qualified M.Pharm students"
      },
      {
        label: "M.Pharm R&D Starting CTC",
        value: "₹5.5L - ₹11L/yr",
        context: "Offered by Dr. Reddy's, Lupin, Sun Pharma, and Glenmark"
      }
    ]
  },
  {
    investment: {
      time: "Ongoing career advancement / retail pharmacy setup (1-2 Years)",
      cost: "₹15,000 (State council license) to ₹8,00,000 - ₹20,00,000 (If opening retail medical store)"
    },
    actionItems: [
      {
        task: "Register as a Registered Pharmacist with the State Pharmacy Council (SPC).",
        detail: "Submit verified B.Pharm marksheet, affidavit, and character certificates to receive official registration number and green book."
      },
      {
        task: "Secure wholesale drug license (Form 20-B, 21-B) or retail pharmacy license (Form 20, 21) from State Drug Control Department.",
        detail: "Fulfill statutory norms: 150 sq ft area, refrigerated cold chain storage (2-8°C), and mandatory pharmacist presence."
      },
      {
        task: "Advance into Lead Auditor or Plant Quality Assurance Manager inspecting global supply chains.",
        detail: "Conduct vendor audits, manage US FDA inspections, and ensure 21 CFR Part 11 electronic data compliance."
      }
    ],
    resources: [
      {
        name: "Central Drugs Standard Control Organization (CDSCO) Sugam Portal",
        type: "documentation",
        url: "https://cdsco.gov.in",
        note: "National regulatory portal for drug approvals, clinical trials, and medical device registrations in India."
      },
      {
        name: "Remington: The Science and Practice of Pharmacy",
        type: "book",
        url: "https://www.sciencedirect.com",
        note: "The definitive reference manual covering all facets of pharmaceutical practice and compounding."
      },
      {
        name: "All India Organization of Chemists and Druggists (AIOCD)",
        type: "platform",
        url: "https://www.aiocd.net",
        note: "Apex body representing 1.2+ million retail chemists and pharmaceutical distributors in India."
      }
    ],
    checkpoint: {
      criteria: "Maintaining an active Registered Pharmacist license in good standing or successfully operating a profitable retail pharmacy.",
      deliverable: "Official State Pharmacy Council Registration Certificate (R.Ph.) and Retail Drug License."
    },
    decisionPoints: [
      {
        question: "Corporate Pharma Career (R&D / QA / Regulatory) vs Own Retail / Wholesale Pharmacy Business",
        options: [
          {
            choice: "Own Retail / Wholesale Pharmacy Business",
            pros: "Total business autonomy, recurring community customer base, 15-25% gross margins on pharmaceuticals.",
            cons: "High inventory investment (₹10L - ₹20L); long 14-hour daily shop presence."
          },
          {
            choice: "Corporate Pharma Executive (Head of QA / Regulatory Affairs)",
            pros: "Structured corporate hierarchy, international travel to audit overseas manufacturing sites, multi-lakh monthly pay.",
            cons: "Corporate liability during regulatory audits and product recall crises."
          }
        ]
      }
    ],
    warning: "Renting out your Pharmacist License without being physically present at the medical store: This illegal practice ('license lending') is punishable by license cancellation and criminal prosecution under the Pharmacy Act.",
    fallbackPlan: "Serve as a Hospital Pharmacy Manager in a 500-bed corporate hospital (Apollo, Fortis, Max) overseeing sterile compounding and clinical formulary management.",
    realWorldStats: [
      {
        label: "Established Retail Pharmacy Profit",
        value: "₹80,000 - ₹2.5L+/month",
        context: "Net monthly earnings of established retail chemist shop"
      },
      {
        label: "VP of Quality / Regulatory CTC",
        value: "₹45L - ₹90L/yr",
        context: "Senior leadership at BSE-listed Indian pharmaceutical corporations"
      }
    ]
  }
];

const physiotherapist = [
  {
    investment: {
      time: "2 Years (Class 11-12 PCB stream + state entrance prep)",
      cost: "₹30,000 - ₹80,000 (School tuition & foundational biology books)"
    },
    actionItems: [
      {
        task: "Score 50%+ in Class 12 Boards with Physics, Chemistry, and Biology (PCB).",
        detail: "Build strong clarity in human physiology, musculoskeletal mechanics, and nervous system pathways."
      },
      {
        task: "Appear for NEET-UG or State Paramedical Entrance Examinations (e.g. Maharashtra CET, IPU CET).",
        detail: "Most state government physiotherapy colleges admit students through state NEET counseling."
      },
      {
        task: "Develop physical stamina, empathy, and positive interpersonal encouragement skills.",
        detail: "Physiotherapy requires continuous physical mobilization, patient manual therapy, and patient emotional support."
      }
    ],
    resources: [
      {
        name: "Indian Association of Physiotherapists (IAP)",
        type: "documentation",
        url: "https://www.physiotherapyindia.org",
        note: "The oldest and largest professional body representing physiotherapists across India."
      },
      {
        name: "National Commission for Allied and Healthcare Professions (NCAHP) Act",
        type: "documentation",
        url: "https://main.mohfw.gov.in",
        note: "Statutory landmark law regulating physiotherapy as an independent healthcare profession."
      },
      {
        name: "Trail Guide to the Body by Andrew Biel",
        type: "book",
        url: "https://www.booksofdiscovery.com",
        note: "The premier visual handbook for palpating human muscles, bones, and ligamentous landmarks."
      }
    ],
    checkpoint: {
      criteria: "Securing qualifying marks in entrance exams and obtaining admission into an NCAHP/UGC-recognized BPT institute.",
      deliverable: "Class 12 Passing Certificate and College BPT Admission Letter."
    },
    decisionPoints: [
      {
        question: "Government Medical College Physiotherapy School vs Private University",
        options: [
          {
            choice: "Government College (KEM Mumbai, IPGMER Kolkata, GMCs)",
            pros: "Extremely affordable fees (₹15,000 - ₹50,000/yr), massive inpatient and ICU clinical case exposure.",
            cons: "High cutoff rank; physically demanding hospital ward duties."
          },
          {
            choice: "Private Physiotherapy College (Manipal, Jamia Hamdard, DY Patil)",
            pros: "Modern gait analysis labs, advanced electrotherapy machines, aquatic therapy pools.",
            cons: "Tuition fees range from ₹1.5L - ₹4L/yr (total ₹6L - ₹16L for degree)."
          }
        ]
      }
    ],
    warning: "Enrolling in unauthorized or unaccredited institutions offering diploma courses falsely claiming degree equivalence: Only a 4.5-year Bachelor of Physiotherapy (BPT) confers full professional clinical autonomy.",
    fallbackPlan: "If BPT admission is missed, consider Allied Health Sciences like Occupational Therapy (BOT) or Prosthetics & Orthotics (BPO) which share high clinical synergy.",
    realWorldStats: [
      {
        label: "BPT Colleges in India",
        value: "350+ Recognized Institutes",
        context: "Offering 4.5-year professional degree programs"
      },
      {
        label: "Physiotherapy Market Demand",
        value: "Rising 12% Annually",
        context: "Driven by aging population, sedentary desk lifestyles, and sports injuries"
      }
    ]
  },
  {
    investment: {
      time: "4.5 Years (4 Years academic curriculum + 6 Months compulsory clinical internship)",
      cost: "₹1,00,000 (Govt) to ₹6,00,000 - ₹14,00,000 (Private University programs)"
    },
    actionItems: [
      {
        task: "Master Human Anatomy, Biomechanics, Kinesiology, Exercise Therapy, and Electrotherapy.",
        detail: "Perform surface anatomy palpation and operate ultrasound, TENS, IFT, and traction modalities."
      },
      {
        task: "Perform clinical assessments of joint range of motion (goniometry) and manual muscle testing (MMT).",
        detail: "Formulate differential diagnoses for musculoskeletal, neurological (stroke, spinal cord injury), and cardiopulmonary conditions."
      },
      {
        task: "Complete 6-month compulsory rotatory clinical internship across Ortho, Neuro, Pediatrics, and ICU wards.",
        detail: "Provide chest physiotherapy in ICUs, mobilize post-surgical joint replacement patients, and train stroke hemiplegics."
      }
    ],
    resources: [
      {
        name: "Brunnstrom's Clinical Kinesiology",
        type: "book",
        url: "https://www.fadavis.com",
        note: "The authoritative textbook on human joint movement, biomechanics, and muscle function."
      },
      {
        name: "Physiopedia Knowledge Repository",
        type: "platform",
        url: "https://www.physio-pedia.com",
        note: "The world's largest collaborative evidence-based physiotherapy encyclopedia and clinical tests."
      },
      {
        name: "Therapeutic Exercise: Foundations and Techniques (Kisner & Colby)",
        type: "book",
        url: "https://www.fadavis.com",
        note: "The clinical manual for stretching, strengthening, and joint mobilization protocols."
      }
    ],
    checkpoint: {
      criteria: "Completing 6-month clinical internship logbook verified by Medical Superintendent and passing final BPT university exams.",
      deliverable: "Bachelor of Physiotherapy (BPT) Degree Certificate and State Council / IAP Membership Registration."
    },
    decisionPoints: [
      {
        question: "Immediate Hospital Clinical Practice vs Preparing for Master of Physiotherapy (MPT)",
        options: [
          {
            choice: "Join Multi-Specialty Hospital or Rehab Center as Staff Physiotherapist",
            pros: "Immediate clinical salary (₹25,000 - ₹45,000/mo), treat diverse post-operative patients, gain real confidence.",
            cons: "Lower salary ceiling without postgraduate specialization."
          },
          {
            choice: "Pursue Master of Physiotherapy (MPT - 2 Years)",
            pros: "Super-specialist status in Orthopedics, Sports, or Neurology; eligibility for assistant professor academic posts.",
            cons: "Two additional years of academic tuition and opportunity cost."
          }
        ]
      }
    ],
    warning: "Over-relying on passive electrotherapy machines (TENS/heating pads) instead of active exercise therapy: Passive modalities provide temporary relief, but active exercise rehabilitation is what actually cures patient biomechanics.",
    fallbackPlan: "Work as an in-home rehabilitation specialist treating post-stroke and orthopedic patients; home visits earn ₹600 - ₹1,500 per 45-minute session.",
    realWorldStats: [
      {
        label: "Staff Physiotherapist Starting Pay",
        value: "₹25,000 - ₹45,000/month",
        context: "Junior physiotherapists in private hospitals"
      },
      {
        label: "Home Visit Session Charges",
        value: "₹700 - ₹1,500 / Session",
        context: "Direct per-patient clinical fees in Indian tier-1 metros"
      }
    ]
  },
  {
    investment: {
      time: "2 Years (Postgraduate MPT residency + clinical dissertation)",
      cost: "₹1,50,000 - ₹6,00,000 (Tuition fees across government and private institutions)"
    },
    actionItems: [
      {
        task: "Select clinical specialization: MPT Orthopedics, MPT Sports, MPT Neurology, or MPT Cardiopulmonary.",
        detail: "Sports physiotherapists master dry needling, kinesiology taping, concussion protocols, and return-to-play criteria."
      },
      {
        task: "Master advanced manual therapy concepts: Maitland, Mulligan mobilization with movement, and McKenzie method.",
        detail: "Perform precision joint glide mobilizations to restore pain-free spine and peripheral joint mobility."
      },
      {
        task: "Conduct clinical research study and publish in an indexed rehabilitation journal (PubMed / Scopus).",
        detail: "Compare clinical efficacy of novel rehabilitation protocols in randomized controlled trials."
      }
    ],
    resources: [
      {
        name: "Maitland's Vertebral Manipulation & Peripheral Manipulation",
        type: "book",
        url: "https://www.elsevier.com",
        note: "The international gold standard for joint mobilization grades and passive oscillatory techniques."
      },
      {
        name: "British Journal of Sports Medicine (BJSM)",
        type: "platform",
        url: "https://bjsm.bmj.com",
        note: "The world's highest impact journal in sports medicine and athletic injury rehabilitation."
      },
      {
        name: "David J. Magee's Orthopedic Physical Assessment",
        type: "book",
        url: "https://www.elsevier.com",
        note: "Comprehensive encyclopedia of special tests for shoulder, knee, spine, and hip pathologies."
      }
    ],
    checkpoint: {
      criteria: "Passing MPT final clinical and practical examinations with accepted thesis defense.",
      deliverable: "Master of Physiotherapy (MPT) Degree Certificate and Specialist Clinical Endorsement."
    },
    decisionPoints: [
      {
        question: "MPT Sports Physiotherapy vs MPT Neuro-Physiotherapy",
        options: [
          {
            choice: "MPT Sports Physiotherapy",
            pros: "Exciting travel with sports teams (cricket, football, badminton), high athletic prestige, lucrative consultation.",
            cons: "High travel, unpredictable tournament hours, fierce competition for limited elite sporting league slots."
          },
          {
            choice: "MPT Neuro-Physiotherapy",
            pros: "Deeply rewarding long-term patient recovery (stroke, Parkinson's, cerebral palsy), high chronic demand.",
            cons: "Physically exhausting patient transfers; patient recovery takes months of slow progress."
          }
        ]
      }
    ],
    warning: "Practicing invasive procedures like dry needling without certified postgraduate certification: Performing dry needling without proper anatomy training risks causing pneumothorax (collapsed lung) or nerve damage.",
    fallbackPlan: "Partner with corporate ergonomic consulting firms assessing workstation setups and conducting spine-care workshops for IT corporate employees.",
    realWorldStats: [
      {
        label: "Sports Physio Match Fee",
        value: "₹5,000 - ₹20,000/day",
        context: "State/National athletic tournaments and domestic sports leagues"
      },
      {
        label: "MPT Specialist Salary",
        value: "₹5L - ₹12L/yr",
        context: "Senior clinical specialist in multi-specialty hospitals"
      }
    ]
  },
  {
    investment: {
      time: "1-3 Years clinic setup and multidisciplinary practice expansion",
      cost: "₹6,00,000 - ₹20,00,000 (Treatment plinths, electrotherapy modalities, rehab gym equipment, clinic interior & lease)"
    },
    actionItems: [
      {
        task: "Set up a specialized Physiotherapy & Sports Rehabilitation Clinic with dedicated active rehab space.",
        detail: "Equip with resistance bands, balance boards, squat racks, traction units, and combo electrotherapy machines."
      },
      {
        task: "Build referral networks with Orthopedic Surgeons, Neurologists, and Pediatricians in your city.",
        detail: "Surgeons eagerly refer post-ACL reconstruction and joint replacement patients to reliable physiotherapists."
      },
      {
        task: "Implement evidence-based telerehabilitation and home-exercise prescription apps (Physitrack / MedBridge).",
        detail: "Provide patients with clear HD video exercise routines to ensure home compliance between clinic visits."
      }
    ],
    resources: [
      {
        name: "World Physiotherapy (formerly WCPT)",
        type: "platform",
        url: "https://world.physio",
        note: "Global voice for physiotherapy representing over 600,000 physiotherapists worldwide."
      },
      {
        name: "Journal of Orthopaedic & Sports Physical Therapy (JOSPT)",
        type: "platform",
        url: "https://www.jospt.org",
        note: "Clinical practice guidelines for musculoskeletal conditions, low back pain, and knee rehabilitation."
      },
      {
        name: "Physitrack Patient Exercise Prescription Software",
        type: "tool",
        url: "https://www.physitrack.com",
        note: "Digital clinical platform for exercise tracking, outcomes analysis, and tele-rehab consultations."
      }
    ],
    checkpoint: {
      criteria: "Achieving clinic profitability with 15-25 active patient treatment sessions daily.",
      deliverable: "Licensed private rehabilitation clinic with positive monthly operational net cash flows."
    },
    decisionPoints: [
      {
        question: "Standalone Physical Rehab Clinic vs Sports Academy Embedded Center",
        options: [
          {
            choice: "Standalone Community Physiotherapy Clinic",
            pros: "Captures broad demographic: elderly arthritic patients, desk workers with neck pain, post-surgical rehab.",
            cons: "Requires independent marketing and street-level footfall acquisition."
          },
          {
            choice: "Sports Academy / Gym Attached Rehabilitation Facility",
            pros: "Built-in pipeline of athletic injuries, gym members with strains, younger motivated patients.",
            cons: "Dependent on gym footfall and facility revenue-sharing terms."
          }
        ]
      }
    ],
    warning: "Promising complete anatomical cures for chronic degenerative conditions (severe Grade 4 Osteoarthritis) that require surgical joint replacement: Dishonest claims erode trust with both patients and referring surgeons.",
    fallbackPlan: "Serve as Chief of Rehabilitation in an elite corporate hospital chain or Head Physiotherapist for a professional sports franchise (IPL, ISL, PKL).",
    realWorldStats: [
      {
        label: "Established Private Clinic Income",
        value: "₹1.2L - ₹3.5L+/month",
        context: "Net earnings of established multi-bed physiotherapy clinic"
      },
      {
        label: "Average Patient Treatment Course",
        value: "10 - 15 Sessions",
        context: "Standard clinical rehabilitation cycle per orthopedic case"
      }
    ]
  }
];

export { pharmacist, physiotherapist };
console.log('Pharmacist & Physiotherapist prepared.');
