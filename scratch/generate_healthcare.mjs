import fs from 'fs';

const dentist = [
  {
    investment: {
      time: "2 Years (Class 11-12 + 4-6 hrs daily NEET-UG prep)",
      cost: "₹50,000 - ₹2,00,000 (Schooling, NCERT books, NEET test series)"
    },
    actionItems: [
      {
        task: "Master Class 11-12 NCERT Biology, Physics, and Chemistry for NEET-UG.",
        detail: "Secure a competitive NEET score (typically 500-580 for Government Dental Colleges, or 350+ for Private BDS)."
      },
      {
        task: "Develop high manual dexterity, fine-motor hand stability, and eye-hand coordination.",
        detail: "Dentistry is equal parts medical science and intricate micro-sculpting; practice sketching and delicate manual crafts."
      },
      {
        task: "Participate in state NEET-UG counseling conducted by state medical directorates (DME) and MCC.",
        detail: "Lock preferences for top dental colleges like Maulana Azad Institute of Dental Sciences (MAIDS), Manipal (MCODS), and Nair Dental."
      }
    ],
    resources: [
      {
        name: "Dental Council of India (DCI) Official Portal",
        type: "documentation",
        url: "https://dciindia.gov.in",
        note: "Statutory regulatory body governing dental education, college recognitions, and BDS curriculum."
      },
      {
        name: "NCERT Biology & Chemistry Textbooks",
        type: "book",
        url: "https://ncert.nic.in",
        note: "Primary textbook for clearing NEET-UG entrance examination."
      },
      {
        name: "Medical Counselling Committee (MCC) Portal",
        type: "platform",
        url: "https://mcc.nic.in",
        note: "Official allotment portal for 15% All India Quota and central dental seats."
      }
    ],
    checkpoint: {
      criteria: "Clearing NEET-UG cutoff with eligible rank and securing seat allotment in a DCI-recognized dental college.",
      deliverable: "NEET-UG Scorecard and DCI College Admission Allotment Letter."
    },
    decisionPoints: [
      {
        question: "Government Dental College (GDC) vs Private Dental College",
        options: [
          {
            choice: "Government Dental College (MAIDS, GDC Mumbai, PGIDS Rohtak)",
            pros: "Affordable tuition (₹15,000 - ₹60,000/yr), massive patient footfall ensuring high hands-on clinical cases.",
            cons: "High NEET score required; high patient-to-student pressure."
          },
          {
            choice: "Private Dental College / Deemed University (Manipal, Saveetha, DY Patil)",
            pros: "State-of-the-art dental simulation phantom labs, modern CAD/CAM equipment.",
            cons: "Higher tuition costs (₹3L - ₹8L/yr; total ₹15L - ₹35L 5-year cost)."
          }
        ]
      }
    ],
    warning: "Choosing a dental college with poor outpatient department (OPD) patient inflow: If patients don't visit the dental hospital, students never get to practice real fillings, root canals, or extractions on human patients.",
    fallbackPlan: "If BDS cutoff is narrowly missed, consider Allied Health Sciences (B.Sc Optometry, Radiology, Medical Lab Technology) or B.Pharm; alternatively take a focused 1-year drop for NEET.",
    realWorldStats: [
      {
        label: "BDS Seats in India",
        value: "~27,000 Seats",
        context: "Across 310+ DCI-approved dental colleges"
      },
      {
        label: "NEET Score for Govt BDS",
        value: "520 - 580 Marks",
        context: "General category cutoffs in top state dental colleges"
      }
    ]
  },
  {
    investment: {
      time: "5 Years (4 Years academic curriculum + 1 Year mandatory paid rotatory internship)",
      cost: "₹1,00,000 (Govt GDC) to ₹15,00,000 - ₹35,00,000 (Private Dental Colleges)"
    },
    actionItems: [
      {
        task: "Complete preclinical phantom head training (tooth carving in wax, cavity preparation on typhodont teeth).",
        detail: "Pass 1st and 2nd BDS exams in Anatomy, Physiology, Dental Materials, and Preclinical Conservative Dentistry."
      },
      {
        task: "Treat clinical patients across 9 dental departments during 3rd, 4th year, and internship.",
        detail: "Perform extractions in Oral Surgery, scaling in Periodontics, amalgam/composite restorations in Conservative, and full dentures in Prosthodontics."
      },
      {
        task: "Complete 1-year compulsory rotatory internship and secure permanent DCI / State Dental Council registration.",
        detail: "Rotate through emergency trauma, rural satellite clinics, and oral pathology biopsy units."
      }
    ],
    resources: [
      {
        name: "Wheeler's Dental Anatomy, Physiology, and Occlusion",
        type: "book",
        url: "https://www.elsevier.com",
        note: "The international gold standard textbook for tooth morphology and occlusion mechanics."
      },
      {
        name: "Phillips' Science of Dental Materials",
        type: "book",
        url: "https://www.elsevier.com",
        note: "Essential guide to dental composites, ceramics, impression materials, and bonding agents."
      },
      {
        name: "Dental Pulse (Pre-PG MCQ Compilation)",
        type: "book",
        url: "https://www.swapnamedicalbooks.com",
        note: "The most popular MCQ book used by dental interns preparing for NEET-MDS."
      }
    ],
    checkpoint: {
      criteria: "Completing all clinical department quotas (e.g. 50 extractions, 30 restorations, 5 complete dentures) and passing final BDS exams.",
      deliverable: "Bachelor of Dental Surgery (BDS) Degree and State Dental Council Registration Certificate (Dentist License)."
    },
    decisionPoints: [
      {
        question: "Immediate Clinical Associate Practice vs Preparing for NEET-MDS",
        options: [
          {
            choice: "Work as Associate Dentist in Private Clinic",
            pros: "Earn immediate clinical income (₹15,000 - ₹35,000/mo), master patient communication, understand business operations.",
            cons: "Limited time left for high-intensity NEET-MDS preparation."
          },
          {
            choice: "Dedicated Drop Year for NEET-MDS Prep",
            pros: "100% focus on securing a government MDS clinical seat (Orthodontics, Endodontics, Oral Surgery).",
            cons: "One year without active income; fierce competition for limited postgraduate seats."
          }
        ]
      }
    ],
    warning: "Skipping hands-on clinical quotas during internship: Working only on simulator models cannot teach you how to manage a bleeding socket, anxious pediatric patient, or broken instrument in root canals.",
    fallbackPlan: "Practice as an associate dentist under a senior practitioner while saving capital, or pursue clinical cosmetology and facial aesthetics certification courses.",
    realWorldStats: [
      {
        label: "Internship Stipend Range",
        value: "₹5,000 - ₹20,000/month",
        context: "Provided by government dental colleges during 5th year"
      },
      {
        label: "Associate Dentist Starting Pay",
        value: "₹18,000 - ₹40,000/month",
        context: "Junior BDS dentist in private multi-specialty dental clinics"
      }
    ]
  },
  {
    investment: {
      time: "3 Years (Postgraduate Master of Dental Surgery residency)",
      cost: "₹1,50,000 (Govt MDS) to ₹25,00,000 - ₹60,00,000 (Private MDS seats)"
    },
    actionItems: [
      {
        task: "Crack NEET-MDS with top national rank (Top 500 for Orthodontics, Conservative & Endodontics, or Oral Surgery).",
        detail: "Appear for 240-question national exam covering all 17 clinical and non-clinical dental subjects."
      },
      {
        task: "Execute specialized advanced procedures: rotary endodontics, surgical extractions, dental implants, and orthognathic surgery.",
        detail: "Treat complex referral cases under senior faculty mentorship and maintain an exhaustive surgical logbook."
      },
      {
        task: "Conduct an original clinical research dissertation and publish at least 1 paper in an indexed dental journal (PubMed).",
        detail: "Mandatory requirement by Dental Council of India for award of MDS degree."
      }
    ],
    resources: [
      {
        name: "Grossman's Endodontic Practice (14th Edition)",
        type: "book",
        url: "https://www.wolterskluwer.com",
        note: "The definitive guide to root canal therapy, microbiology, and pulp pathology."
      },
      {
        name: "Contemporary Oral and Maxillofacial Surgery (Hupp, Ellis, Tucker)",
        type: "book",
        url: "https://www.elsevier.com",
        note: "The leading textbook on surgical exodontia, implants, trauma, and jaw reconstruction."
      },
      {
        name: "Journal of Indian Dental Association (JIDA)",
        type: "platform",
        url: "https://jida.ida.org.in",
        note: "Peer-reviewed scientific journal publishing clinical case reports and original Indian dental research."
      }
    ],
    checkpoint: {
      criteria: "Passing MDS final clinical and viva examinations with accepted thesis defense.",
      deliverable: "Master of Dental Surgery (MDS) Degree and Specialist Dental Council Endorsement."
    },
    decisionPoints: [
      {
        question: "Conservative Dentistry & Endodontics vs Orthodontics vs Oral & Maxillofacial Surgery",
        options: [
          {
            choice: "Conservative Dentistry & Endodontics",
            pros: "Highest daily patient demand (Root Canal Treatments - RCTs), high private clinic revenue, predictable hours.",
            cons: "High repetitive strain on fingers, neck, and back from microscopic procedure posture."
          },
          {
            choice: "Orthodontics and Dentofacial Orthopedics",
            pros: "Clean procedures (braces, aligners), high per-patient ticket size (₹30,000 - ₹1,50,000), zero blood/emergencies.",
            cons: "Long treatment cycles (1-2 years per patient); high dependency on pediatric/teen footfall."
          }
        ]
      }
    ],
    warning: "Taking exorbitant multi-crore educational loans for private MDS seats without a clear clinic launch plan: Servicing a ₹50L loan on a ₹60,000/month private hospital salary creates severe financial crisis.",
    fallbackPlan: "Practice as a Consulting Visiting Specialist across 10-15 neighborhood dental clinics (freelance Endodontist/Orthodontist model) to earn high procedural fees without setup overhead.",
    realWorldStats: [
      {
        label: "MDS Resident Monthly Stipend",
        value: "₹45,000 - ₹95,000/month",
        context: "Paid to postgraduate residents in government dental colleges"
      },
      {
        label: "Visiting Consultant Fee Split",
        value: "50% - 60% of Procedure Fee",
        context: "Standard consultant revenue share per root canal or aligner case"
      }
    ]
  },
  {
    investment: {
      time: "1-3 Years setup and clinical practice compounding",
      cost: "₹12,00,000 - ₹35,00,000 (Hydraulic dental chair, digital RVG sensor, autoclave, clinic interior & rent deposit)"
    },
    actionItems: [
      {
        task: "Select clinic location with high residential density, ground-floor street visibility, and parking access.",
        detail: "Secure statutory local municipal licenses, Bio-Medical Waste (BMW) management registration, and AERB X-ray approval."
      },
      {
        task: "Procure high-quality dental equipment: programmable electrical dental chair, digital intraoral sensor (RVG), Class B autoclave, and rotary motors.",
        detail: "Strict autoclaving and visible sterilization protocols are the #1 driver of patient trust and word-of-mouth referrals."
      },
      {
        task: "Implement clinic management software (Practo Ray, Clinicea) and ethical Google My Business local SEO.",
        detail: "Maintain digital patient records, automated appointment reminders, and collect 5-star verified Google reviews."
      }
    ],
    resources: [
      {
        name: "Atomic Energy Regulatory Board (AERB) eLORA Portal",
        type: "documentation",
        url: "https://elora.aerb.gov.in",
        note: "Mandatory statutory registration portal for dental X-ray and CBCT equipment safety."
      },
      {
        name: "Indian Dental Association (IDA) Practice Management Guidelines",
        type: "platform",
        url: "https://www.ida.org.in",
        note: "Official association guidelines on clinic setup, ethical dental advertising, and infection control."
      },
      {
        name: "Dentistry Today & Dental Economics Magazine",
        type: "platform",
        url: "https://www.dentistrytoday.com",
        note: "Practical articles on clinic profitability, patient financing, digital dentistry, and practice growth."
      }
    ],
    checkpoint: {
      criteria: "Achieving operating cash-flow break-even within 6-9 months (treating 8-12 patients daily).",
      deliverable: "Fully licensed private dental clinic with positive monthly operating net income."
    },
    decisionPoints: [
      {
        question: "Solo Independent Practice vs Multi-Doctor Polyclinic Partnership",
        options: [
          {
            choice: "Solo Practice Clinic",
            pros: "Total autonomy over clinical standards, pricing, hours, and 100% profit retention.",
            cons: "High upfront capital burden (₹15L - ₹30L); clinic generates zero revenue when you are sick or on vacation."
          },
          {
            choice: "Partnership / Multi-Chair Polyclinic",
            pros: "Shared rent and capital expenses; ability to offer in-house general dentistry, orthodontics, and implants concurrently.",
            cons: "Requires formal partnership legal agreements and potential revenue distribution conflicts."
          }
        ]
      }
    ],
    warning: "Compromising on infection control and instrument sterilization: A single cross-infection case (Hepatitis B, HIV) will permanently ruin your clinical reputation and bring medical negligence lawsuits.",
    fallbackPlan: "Partner with corporate dental chains (Clove Dental, Apollo White) as a Clinical Head or join a multi-specialty hospital as Senior Dental Surgeon.",
    realWorldStats: [
      {
        label: "Established Clinic Monthly Income",
        value: "₹1.5L - ₹5L+/month",
        context: "Net profit of established private dental practice after year 3"
      },
      {
        label: "Average Cost of Modern Dental Chair",
        value: "₹1.8L - ₹5L",
        context: "Electric dental operatory unit with LED sensor light"
      }
    ]
  }
];

export { dentist };
console.log('Dentist prepared.');
