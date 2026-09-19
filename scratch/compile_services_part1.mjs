import fs from 'fs';

const armyOfficer = [
  {
    investment: {
      time: "2 Years (Class 11-12 + physical fitness regimen & NDA written exam prep)",
      cost: "₹20,000 - ₹50,000 (School tuition, physical training gear, NDA books)"
    },
    actionItems: [
      {
        task: "Score 60%+ in Class 12 Boards with Mathematics and Physics (mandatory for Air Force/Navy wings; any stream for Army).",
        detail: "NDA written examination conducted by UPSC has two papers: Mathematics (300 marks) and General Ability Test (600 marks)."
      },
      {
        task: "Build rigorous physical stamina: 2.4 km run under 10 minutes, 15 pull-ups, 40 push-ups, and swimming.",
        detail: "Physical endurance is non-negotiable for clearing Services Selection Board (SSB) outdoor obstacle tasks."
      },
      {
        task: "Follow daily national and international defense developments, geopolitical alliances, and military history.",
        detail: "SSB Group Testing Officer (GTO) tasks and President interview heavily evaluate strategic awareness."
      }
    ],
    resources: [
      {
        name: "UPSC NDA & NA Examination Portal",
        type: "documentation",
        url: "https://upsc.gov.in",
        note: "Official portal for National Defence Academy and Naval Academy entrance notifications."
      },
      {
        name: "Pathfinder for NDA & NA Entrance Examination (Arihant)",
        type: "book",
        url: "https://www.arihantbooks.com",
        note: "The benchmark comprehensive study manual covering mathematics, English, physics, chemistry, and general studies."
      },
      {
        name: "SSBCrack Defence Aspirants Community",
        type: "platform",
        url: "https://www.ssbcrack.com",
        note: "India's largest defence portal for SSB interview preparation, TAT/WAT psychological tests, and medical standards."
      }
    ],
    checkpoint: {
      criteria: "Clearing the UPSC NDA written examination cutoff (typically 340-360 / 900 marks).",
      deliverable: "UPSC NDA Written Exam Result Roll Number gazette and SSB Interview Call Letter."
    },
    decisionPoints: [
      {
        question: "NDA Entry (After 12th) vs CDS / AFCAT Entry (After Graduation)",
        options: [
          {
            choice: "National Defence Academy (NDA - Direct after 12th)",
            pros: "Enter service at age 18-19, highest career seniority trajectory towards Army Commander / Chief of Army Staff (COAS).",
            cons: "Extremely demanding dual load of 12th board exams and NDA preparation."
          },
          {
            choice: "Combined Defence Services (CDS - After Graduation)",
            pros: "Enter after completing B.Tech / Degree; mature emotional and physical perspective.",
            cons: "Enters service 3-4 years later; shorter tenure towards top four-star general ranks."
          }
        ]
      }
    ],
    warning: "Failing medical standards due to uncorrectable physical benchmarks (knock knees, flat foot, color blindness, or ear perforation): Undergo a comprehensive defense medical pre-check before spending years preparing.",
    fallbackPlan: "Continue college degree in engineering or arts and prepare for CDS, AFCAT, or NCC Special Entry Scheme.",
    realWorldStats: [
      {
        label: "NDA Written Exam Candidates",
        value: "3 - 4 Lakh Aspirants",
        context: "Appearing biannually for ~400 cadet vacancies"
      },
      {
        label: "SSB Recommendation Rate",
        value: "~3% - 4%",
        context: "Candidates recommended by 5-day Services Selection Board"
      }
    ]
  },
  {
    investment: {
      time: "5 Days intensive psychological, obstacle, and personal interview testing",
      cost: "₹5,000 - ₹15,000 (Travel to SSB Selection Centre - Allahabad, Bhopal, Bangalore, Kapurthala)"
    },
    actionItems: [
      {
        task: "Clear Stage 1 Screening: Officer Intelligence Rating (OIR) test and Picture Perception & Discussion Test (PPDT).",
        detail: "Write a coherent, positive story in 4 minutes and participate constructively in the group narration without fish-market shouting."
      },
      {
        task: "Master Stage 2 Psychological Tests: Thematic Apperception Test (TAT), Word Association Test (WAT), Situation Reaction Test (SRT), and Self-Description (SD).",
        detail: "Demonstrate Officer Like Qualities (OLQs): initiative, social adaptability, sense of responsibility, and moral courage."
      },
      {
        task: "Excel in Group Testing Officer (GTO) ground tasks: Progressive Group Task (PGT), Half Group Task (HGT), and Command Task.",
        detail: "Apply cantilever principles with wooden planks, ropes, and load to bridge obstacles effectively as a team player."
      }
    ],
    resources: [
      {
        name: "Let's Crack SSB Interview by SSBCrack",
        type: "book",
        url: "https://www.ssbcrack.com",
        note: "Comprehensive practical guide to psychological tests, GTO tasks, and personal interview questions."
      },
      {
        name: "My Appointment with a Psychologist (Dr. N.K. Natarajan)",
        type: "book",
        url: "https://www.jaicobooks.com",
        note: "Insightful guide on understanding the 15 Officer Like Qualities (OLQs) and psychological assessment."
      },
      {
        name: "Indian Army Join Indian Army Portal",
        type: "documentation",
        url: "https://joinindianarmy.nic.in",
        note: "Official recruitment portal of the Indian Army for SSB dates, merit lists, and medical joining instructions."
      }
    ],
    checkpoint: {
      criteria: "Securing formal Recommendation from the SSB Board Conference and passing the Special Medical Board at Military Hospital.",
      deliverable: "SSB Recommendation Letter, Medical Fitness Certificate, and National Merit List Joining Instruction."
    },
    decisionPoints: [
      {
        question: "Army vs Navy vs Air Force Wing Preference at NDA",
        options: [
          {
            choice: "Indian Army Wing",
            pros: "Largest service branch, vast frontline combat arms (Infantry, Armoured Corps, Artillery), direct ground leadership.",
            cons: "Demanding physical conditions in extreme field stations (Siachen, High Altitude Ladakh, Deserts)."
          },
          {
            choice: "Indian Air Force / Navy Flying Branch",
            pros: "Flying supersonic fighter aircraft (Su-30MKI, Rafale) or naval aviation, state-of-the-art avionics technology.",
            cons: "Requires passing the Computerised Pilot Selection System (CPSS) - a once-in-a-lifetime test."
          }
        ]
      }
    ],
    warning: "Faking personality or reciting rehearsed coaching answers during SSB psychology tests: Seasoned military psychologists spot scripted stories within seconds and conference out artificial candidates.",
    fallbackPlan: "If conferenced out, analyze your performance, focus on real-world team leadership in college, and appear for the next CDS/AFCAT cycle.",
    realWorldStats: [
      {
        label: "Stage 1 Screening Out Rate",
        value: "60% - 70%",
        context: "Candidates screened out on Day 1 of SSB interview"
      },
      {
        label: "Officer Like Qualities (OLQs)",
        value: "15 Standard Qualities",
        context: "Assessed across Psychological, GTO, and Interview dimensions"
      }
    ]
  },
  {
    investment: {
      time: "3 Years (Tri-service military academy training at NDA Khadakwasla, Pune)",
      cost: "₹0 (100% covered by Government of India; cadets receive academic B.Sc/BA/B.Tech degree from JNU)"
    },
    actionItems: [
      {
        task: "Survive and excel in rigorous physical conditioning: cross-country runs, camp green-horn, camp torna, and weapon drill.",
        detail: "Transform physically and mentally into a resilient, disciplined military cadet."
      },
      {
        task: "Complete academic degree coursework (BA, B.Sc, or B.Tech in Applied Electronics/CS) awarded by Jawaharlal Nehru University (JNU).",
        detail: "Study military science, strategic geopolitics, foreign languages (Mandarin, Russian, Arabic), and ballistics."
      },
      {
        task: "Master equestrian horsemanship, small arms marksmanship (INSAS / Sig Sauer rifle), and outdoor navigation by night.",
        detail: "Night marching across rugged Sahyadri terrain using compass bearing and topographical maps."
      }
    ],
    resources: [
      {
        name: "National Defence Academy (NDA) Khadakwasla Official Portal",
        type: "documentation",
        url: "https://nda.nic.in",
        note: "The world's premier tri-service military training academy located in Pune, Maharashtra."
      },
      {
        name: "The Brave: Param Vir Chakra Stories by Rachna Bisht Rawat",
        type: "book",
        url: "https://www.penguinrandomhouse.com",
        note: "Inspiring real-life war chronicles of India's greatest military heroes and gallantry award winners."
      },
      {
        name: "Infantry Journal (Indian Army)",
        type: "documentation",
        url: "https://indianarmy.nic.in",
        note: "Official professional military journal covering tactical battlefield doctrine and low-intensity conflict."
      }
    ],
    checkpoint: {
      criteria: "Passing the final semester Passing Out Parade (POP) at Khetarpal Ground and receiving your JNU Graduation Degree.",
      deliverable: "JNU Degree Certificate and NDA Cadet Passing Out Certificate."
    },
    decisionPoints: [
      {
        question: "Combat Arms (Infantry, Armoured, Artillery) vs Combat Support Arms (Signals, Engineers, EME)",
        options: [
          {
            choice: "Combat Arms (Infantry, Armoured Corps, Special Forces)",
            pros: "Tip of the spear, frontline combat operations, highest prestige, direct pathway to senior general commands.",
            cons: "Hardest physical postings, extreme family separation, highest casualty and operational risk."
          },
          {
            choice: "Combat Support / Technical Arms (Corps of Engineers, Signals, EME)",
            pros: "Technical systems, cyber warfare, bridge engineering, high technical post-retirement corporate market value.",
            cons: "Support role rather than direct frontline infantry assault command."
          }
        ]
      }
    ],
    warning: "Violating the NDA Cadet Honor Code ('A cadet neither lies, cheats, nor steals, nor tolerates those who do'): Honor violations result in immediate withdrawal and relegation from the academy.",
    fallbackPlan: "Cadets medically boarded out due to training injuries receive ex-cadet disability pension support and lateral entry into government corporate PSUs.",
    realWorldStats: [
      {
        label: "Cadet Training Stipend",
        value: "₹56,100/month",
        context: "Stipend in the final year of pre-commission military training"
      },
      {
        label: "Camp Torna March Distance",
        value: "60+ Kilometers",
        context: "Endurance route march with full 20kg combat backpack and rifle"
      }
    ]
  },
  {
    investment: {
      time: "1 Year (Pre-commission training at Indian Military Academy - IMA Dehradun) + Commissioning",
      cost: "₹0 (Cadet is fully funded by the State; commissioned as Lieutenant with full military benefits)"
    },
    actionItems: [
      {
        task: "Complete 1-year advanced tactical and leadership training at IMA Dehradun (Chetwode Building).",
        detail: "Live-fire combat tactical exercises, counter-insurgency warfare (CIJW), section and platoon battle drills."
      },
      {
        task: "Step across the 'Antim Pag' (Final Step) at the Chetwode Hall Passing Out Parade.",
        detail: "Receive your commissioning pips (two bronze five-pointed stars) on your shoulders pinned by parents."
      },
      {
        task: "Assume command of an active combat Platoon (30-40 soldiers) as a commissioned Lieutenant.",
        detail: "Embody the Chetwode Motto: 'The safety, honour, and welfare of your country come first, always and every time...'"
      }
    ],
    resources: [
      {
        name: "Indian Military Academy (IMA) Dehradun",
        type: "documentation",
        url: "https://indianarmy.nic.in/about-us/training-establishments/ima",
        note: "India's premier officer training institution for the Indian Army, home to the historic Chetwode Building."
      },
      {
        name: "Chetwode Creed & Military Leadership Doctrine",
        type: "documentation",
        url: "https://indianarmy.nic.in",
        note: "The sacred code governing an Indian military officer's duty to nation, men, and self."
      },
      {
        name: "Centre for Land Warfare Studies (CLAWS)",
        type: "platform",
        url: "https://www.claws.in",
        note: "Autonomous think tank on strategic studies, national security, and military doctrine in New Delhi."
      }
    ],
    checkpoint: {
      criteria: "Successful completion of the Passing Out Parade and taking the Military Oath of Allegiance on the Constitution of India.",
      deliverable: "President of India Gazetted Officer Commission Scroll and Lieutenant rank pips."
    },
    decisionPoints: [
      {
        question: "Volunteering for Para (Special Forces) Probation vs Joining Parent Regiment",
        options: [
          {
            choice: "Volunteer for Para (SF) 90-Day Probation",
            pros: "Join elite Special Forces (Balidaan badge, maroon beret), direct covert operations, legendary prestige.",
            cons: "Brutal 90-day probation with 80%+ drop-out rate; extreme psychological and physical duress."
          },
          {
            choice: "Join Regimental Battalion (Gorkha, Sikh, Rajput, Mechanised)",
            pros: "Deep regimental heritage, brotherhood with troops, classic battalion command career track.",
            cons: "Standard frontline operational deployment rotation."
          }
        ]
      }
    ],
    warning: "Putting personal safety or comfort ahead of your soldiers: An officer eats last, sleeps last, and leads from the front; any failure of moral integrity permanently destroys your men's trust in combat.",
    fallbackPlan: "If combat injuries necessitate non-combat categorization, transition into military staff postings, intelligence corps, or defense procurement establishments.",
    realWorldStats: [
      {
        label: "Starting Pay Scale (Lieutenant)",
        value: "Level 10 (₹56,100 basic + ₹15,500 Military Service Pay + DA + HRA + Allowances)",
        context: "Total gross starting salary: ₹1.1L - ₹1.4L/month + full medical & canteen benefits"
      },
      {
        label: "High Altitude Allowance (Siachen)",
        value: "₹42,500/month Additional",
        context: "Hazard allowance for deployment on the Siachen Glacier"
      }
    ]
  }
];

// Combine Army Officer
export const servicesBatch1 = {
  "army-officer": armyOfficer
};

console.log('Army Officer prepared.');
