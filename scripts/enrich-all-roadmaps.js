import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Specific custom enrichment for fitness-trainer (Personal Trainer)
const FITNESS_TRAINER_ENRICHMENT = {
  pathsDetailed: {
    "Personal Trainer": [
      {
        milestone: "Step 1: Foundational Certifications & CPR/AED",
        detail: "Complete accredited certification (ACE CPT, ACSM, or Gold's Gym Fitness Institute) + First Aid & CPR/AED. Cost: ₹25,000–₹45,000."
      },
      {
        milestone: "Step 2: Gym Floor Mastery & Hours Logging",
        detail: "Work 9–12 months as in-house floor trainer at Cult.fit, Gold's Gym, or Anytime Fitness (₹18K–₹28K base + session incentives) to log 600+ client hours."
      },
      {
        milestone: "Step 3: Client Acquisition & Personal Brand",
        detail: "Acquire first 5 independent private clients via residential society word-of-mouth and Instagram exercise mechanics breakdown reels."
      },
      {
        milestone: "Step 4: Pricing Services & Retainers in India",
        detail: "Price 1-on-1 private training at ₹800–₹1,500/session in Tier-1 metros (₹400–₹700 in Tier-2). Offer 12-session packages for ₹12,000–₹25,000/month."
      }
    ],
    "Sports Coach": [
      {
        milestone: "Step 1: Sports Authority & Federation Badges",
        detail: "Obtain NIS Certificate / Diploma or AFC/BCCI/BWF Level 1 Coaching License for your sport."
      },
      {
        milestone: "Step 2: Academy Assistant Coaching",
        detail: "Join a recognized district sports academy or school sports department to manage youth development programs."
      },
      {
        milestone: "Step 3: Athlete Performance Benchmarking",
        detail: "Implement video biomechanics analysis and periodized speed-agility-quickness (SAQ) drills for competitive junior athletes."
      },
      {
        milestone: "Step 4: Professional Contracts & Private Batches",
        detail: "Run specialized weekend training camps (₹3,000–₹6,000/month per student) and target state/national federation consultancy contracts."
      }
    ],
    "Own Fitness Academy": [
      {
        milestone: "Step 1: Micro-Gym or Studio Feasibility",
        detail: "Design 1,500–2,500 sq.ft functional fitness/CrossFit box model with ₹15L–₹35L Capex (equipment leasing + commercial security deposit)."
      },
      {
        milestone: "Step 2: Pre-Launch Marketing & Founders Memberships",
        detail: "Sell 50 discounted 'Founding Member' annual passes 45 days before opening to recover initial operating deposit."
      },
      {
        milestone: "Step 3: Hybrid Online Coaching Layer",
        detail: "Launch subscription tier for nutrition guidance and workout logs on WhatsApp/Trainerize to generate 40% high-margin recurring revenue."
      },
      {
        milestone: "Step 4: Studio Unit Economics & Expansion",
        detail: "Target 120–150 active members @ ₹2,500–₹4,500/mo to generate ₹3.5L–₹6L gross monthly revenue with 35–45% net operating margin."
      }
    ]
  },
  incomeBreakdown: {
    tier1: "₹45,000 - ₹1,80,000 / month (Metro gyms, elite society home training & high-ticket online clients)",
    tier2: "₹25,000 - ₹75,000 / month (Tier-2 commercial fitness clubs + private residential clients)",
    tier3: "₹15,000 - ₹35,000 / month (Local gym floors, school fitness instruction & group aerobics)"
  },
  timelineToProfitability: "6 to 9 months to break even on ACE/CPT certification costs and build a recurring roster of 8-12 private personal training clients.",
  clientsNeededForTarget: "8 to 10 private clients paying ₹12,000 - ₹15,000/month (or 25 online coaching clients @ ₹4,000/month) to hit ₹1,00,000/month net target income.",
  actionPlan: [
    {
      month: "Month 1",
      title: "Biomechanics Foundations & CPT Registration",
      tasks: [
        "Benchmark baseline personal physical fitness, VO2 max, and movement mechanics",
        "Register for ACE CPT, ACSM, or K11 proctored certification exam",
        "Study foundational functional anatomy: joint actions, muscular origins, and insertions"
      ]
    },
    {
      month: "Month 2",
      title: "Exercise Technique & Cueing Mastery",
      tasks: [
        "Shadow an experienced senior coach for 30+ practical gym floor hours",
        "Master technical coaching cues for the big compound lifts (Squat, Deadlift, Overhead Press, Hip Hinge)",
        "Pass basic CPR / AED and First Aid life support certification"
      ]
    },
    {
      month: "Month 3",
      title: "Certification Exam & Social Proof Portfolio",
      tasks: [
        "Pass the accredited proctored CPT examination",
        "Film 10 educational Instagram reels analyzing common exercise form errors",
        "Conduct complimentary fitness assessments for 5 friends to build before-and-after transformation case studies"
      ]
    },
    {
      month: "Month 4",
      title: "Gym Floor Employment & Local Outreach",
      tasks: [
        "Join a Tier-1 commercial gym chain (Cult.fit, Anytime Fitness, Gold's) as a general floor trainer",
        "Deliver 20 high-value member interactions daily to establish trust and rapport",
        "Set up professional booking page and standardized client health questionnaire (PAR-Q)"
      ]
    },
    {
      month: "Month 5",
      title: "Private Client Conversion & Retention",
      tasks: [
        "Convert first 4 floor members into dedicated paid 1-on-1 personal training packages",
        "Draft tailored macro nutrition and habit periodization guidelines for every client",
        "Collect glowing video testimonials and WhatsApp feedback screenshots for marketing"
      ]
    },
    {
      month: "Month 6",
      title: "Scaling Retainers & Online Coaching Hybrid",
      tasks: [
        "Hit 8-10 recurring private personal training clients at ₹12,000–₹18,000/month",
        "Launch high-margin online remote training tier for busy corporate professionals",
        "Invest in Continuing Education Units (CEUs) in Sports Nutrition or Injury Rehabilitation"
      ]
    }
  ]
};

// Domain-level helper to generate realistic enriched data for all 48 careers
function getDomainPricing(career) {
  const cat = career.category || "";
  const title = career.title || "";
  const sal = career.stats?.salary || "₹5L - ₹20L+";

  if (cat.includes("Health") || cat.includes("Clinical")) {
    return {
      tier1: "₹60,000 - ₹2,50,000+ / month (Tier-1 private hospitals, corporate clinics, private practice)",
      tier2: "₹40,000 - ₹1,20,000 / month (Tier-2 district hospitals & established consulting chambers)",
      tier3: "₹25,000 - ₹65,000 / month (Community health centers, state clinics & entry roles)",
      timeline: "12 to 24 months post-internship/degree to establish consistent patient volume and private consults.",
      clientsNeeded: "20-30 outpatient consults daily or 8-12 high-care procedures monthly to surpass ₹1.5L/month target."
    };
  } else if (cat.includes("Tech") || cat.includes("Engineering")) {
    return {
      tier1: "₹70,000 - ₹3,00,000+ / month (Bengaluru, Hyderabad, Pune, Gurugram product firms & MNCs)",
      tier2: "₹35,000 - ₹90,000 / month (Tier-2 tech parks, mid-market IT service hubs & offshore teams)",
      tier3: "₹20,000 - ₹45,000 / month (Local software consultancies, hardware maintenance & remote junior gigs)",
      timeline: "3 to 6 months post-bootcamp / graduation to clear technical interviews and secure entry SDE/analyst role.",
      clientsNeeded: "1 full-time enterprise employment offer OR 2-3 international remote retainers ($1,500/mo) to hit ₹1.5L-₹2L/mo."
    };
  } else if (cat.includes("Finance") || cat.includes("Commerce") || cat.includes("Management")) {
    return {
      tier1: "₹65,000 - ₹2,80,000+ / month (Mumbai, BKC, Delhi-NCR investment banks, Big 4, top corporate houses)",
      tier2: "₹35,000 - ₹85,000 / month (Regional financial hubs, commercial bank branches, audit firms)",
      tier3: "₹20,000 - ₹40,000 / month (Local taxation consultancies, credit societies, cooperative banks)",
      timeline: "6 to 12 months post-qualification (CA, CFA, MBA) to clear campus hiring or corporate placement cycles.",
      clientsNeeded: "1 corporate analyst role OR 15-20 ongoing corporate tax/advisory retainers to achieve ₹1.2L+/month."
    };
  } else if (cat.includes("Creative") || cat.includes("Design") || cat.includes("Media")) {
    return {
      tier1: "₹50,000 - ₹2,00,000+ / month (Mumbai, Bengaluru, Delhi creative agencies, studio productions, high-ticket retainers)",
      tier2: "₹25,000 - ₹60,000 / month (Regional production houses, mid-tier branding studios, commercial shoots)",
      tier3: "₹15,000 - ₹35,000 / month (Local print agencies, freelance marketplace gigs, wedding media)",
      timeline: "6 to 9 months of active portfolio shipping to secure reliable monthly agency retainers.",
      clientsNeeded: "4-6 monthly retainers @ ₹25,000-₹40,000 each to achieve steady ₹1.2L-₹1.8L monthly net income."
    };
  } else {
    return {
      tier1: "₹50,000 - ₹1,80,000+ / month (Metro corporate employers, specialized academies & private consultancies)",
      tier2: "₹30,000 - ₹75,000 / month (State headquarters, established regional institutions)",
      tier3: "₹18,000 - ₹40,000 / month (District centers, local administrative and support roles)",
      timeline: "6 to 12 months of structured preparation and entry licensing to achieve steady revenue.",
      clientsNeeded: "1 primary institutional engagement + 2-3 advisory assignments to hit ₹1,00,000/month target."
    };
  }
}

function generateActionPlan(career) {
  const title = career.title || "Career";
  const cat = career.category || "Professional";

  return [
    {
      month: "Month 1",
      title: "Foundations & Diagnostic Assessment",
      tasks: [
        `Complete comprehensive baseline assessment of required core competencies in ${title}`,
        "Audit market demand, required licensing, and competitive salary benchmarks across target cities",
        "Set up structured daily 2-hour study routine and gather foundational reference material"
      ]
    },
    {
      month: "Month 2",
      title: "Core Practical Skills & Applied Drills",
      tasks: [
        "Complete 3 hands-on practical exercises or mini-case projects under simulated conditions",
        "Shadow an active industry practitioner or analyze 10 real-world professional case studies",
        "Master the primary software tools, frameworks, and workflows used by top practitioners"
      ]
    },
    {
      month: "Month 3",
      title: "Certifications & Proof of Work Artifacts",
      tasks: [
        "Register for and complete recognized entrance or professional certification milestones",
        "Package 2 polished, production-ready portfolio artifacts demonstrating problem-solving ability",
        "Optimize LinkedIn, GitHub, Behance, or industry profile with targeted search keywords"
      ]
    },
    {
      month: "Month 4",
      title: "Outreach & First Opportunity Pipeline",
      tasks: [
        "Send 30 personalized outreach pitches or internship applications to target organizations",
        "Conduct 5 informational coffee chats with senior professionals in the field",
        "Secure first live engagement: freelance gig, boutique agency internship, or junior role"
      ]
    },
    {
      month: "Month 5",
      title: "Execution, Feedback & Iteration",
      tasks: [
        "Deliver exceptional results on initial projects and gather quantifiable performance data",
        "Request written recommendations and social proof testimonials from supervisors or clients",
        "Refine your service offerings, code repository, or clinical/consulting workflow"
      ]
    },
    {
      month: "Month 6",
      title: "Scaling Retainers & Career Compounding",
      tasks: [
        "Negotiate a salary increase or raise freelance client retainer rates by 25-40%",
        "Build a repeatable system for inbound client inquiries or senior job referrals",
        "Select specialized niche Continuing Education to differentiate yourself from average practitioners"
      ]
    }
  ];
}

function generateSkillsData(career) {
  const skills = Array.isArray(career.skills) ? career.skills : [];
  return skills.map((skillName) => {
    return {
      name: skillName,
      howToLearn: {
        freeResources: [
          `Comprehensive ${skillName} foundational masterclass on YouTube & MIT OpenCourseWare`,
          `Official documentation, interactive open-source sandboxes & cheatsheets for ${skillName}`
        ],
        paidResources: [
          `Specialized ${skillName} Certificate on Coursera / Udemy / Professional Industry Institute`,
          `Advanced masterclass with 1-on-1 mentor code reviews & case studies`
        ],
        estimatedCost: "₹0 (Free self-study) to ₹9,999 (Certified specialized bootcamp)",
        estimatedTime: "4 - 8 weeks (6-8 hours / week)"
      }
    };
  });
}

function generateExamsData(career) {
  const exams = Array.isArray(career.exams) ? career.exams : [];
  return exams.map((examName) => {
    return {
      name: examName,
      syllabus: `Core domain subjects, quantitative aptitude, reasoning, and technical domain proficiency for ${examName}.`,
      cutoffTrend: "Top 2% - 8% percentile required for premier government institutions and merit quotas.",
      applicationDeadline: "Typically cycles open between March to July annually; verify on official portal.",
      prepResources: [
        `${examName} 10-Year Previous Solved Question Papers & Solutions`,
        "National Mock Test Series with All-India Percentile Rankings",
        "Standard NCERT / Official Council syllabus textbook references"
      ]
    };
  });
}

function generateCollegesData(career) {
  const colleges = Array.isArray(career.colleges) ? career.colleges : [];
  const budgetColleges = Array.isArray(career.budgetColleges) ? career.budgetColleges : [];
  const abroad = Array.isArray(career.abroad) ? career.abroad : [];

  return {
    topColleges: colleges.map((c) => ({
      name: c,
      category: "Top Colleges (India)",
      fees: "₹1,50,000 - ₹4,50,000 / year (Standard institutional tuition)",
      placementStats: "85% - 95% placement rate with top national and multinational recruiters",
      admissionSteps: "Merit in national/state entrance exam + GD/PI or counseling round",
      applyLink: "https://www.google.com/search?q=" + encodeURIComponent(c + " admissions")
    })),
    budgetColleges: budgetColleges.map((c) => ({
      name: c,
      category: "Budget / Govt Options",
      fees: "₹15,000 - ₹60,000 / year (Subsidized state tuition)",
      placementStats: "State service boards, regional corporate partnerships & public sector roles",
      admissionSteps: "State entrance quota counseling + 10+2 academic merit cutoff",
      applyLink: "https://www.google.com/search?q=" + encodeURIComponent(c + " admissions")
    })),
    abroad: abroad.map((c) => ({
      name: c,
      category: "Study Abroad Options",
      fees: "₹25,00,000 - ₹48,00,000 / year (Tuition + living allowances)",
      placementStats: "Global corporate placement with post-study work visa opportunities (1-3 yrs)",
      admissionSteps: "IELTS/TOEFL (6.5+) + GRE/GMAT/SAT + Statement of Purpose & Academic Transcripts",
      applyLink: "https://www.google.com/search?q=" + encodeURIComponent(c + " admissions")
    }))
  };
}

function generateDetailedPaths(career) {
  const paths = Array.isArray(career.paths) ? career.paths : [];
  return paths.map((pathItem) => {
    // If it already has detailedPath, keep it
    if (Array.isArray(pathItem.detailedPath) && pathItem.detailedPath.length > 0) {
      return pathItem;
    }

    const title = pathItem.title || "Specialisation";
    const desc = pathItem.desc || "";

    // If this is fitness-trainer, use our custom realistic roadmap
    if (career.id === "fitness-trainer" && FITNESS_TRAINER_ENRICHMENT.pathsDetailed[title]) {
      return {
        title,
        desc,
        detailedPath: FITNESS_TRAINER_ENRICHMENT.pathsDetailed[title]
      };
    }

    return {
      title,
      desc,
      detailedPath: [
        {
          milestone: "Step 1: Foundational Qualifications & Licensing",
          detail: `Complete mandatory academic credentials and specialized certifications required for ${title}.`
        },
        {
          milestone: "Step 2: On-the-Ground Apprenticeship & First-Year Role",
          detail: `Gain 12–18 months of intensive hands-on experience in a structured organization or entry team.`
        },
        {
          milestone: "Step 3: Client Acquisition & Project Delivery",
          detail: `Establish independent credibility, acquire dedicated client retainers or lead complex project modules.`
        },
        {
          milestone: "Step 4: Pricing Services & High-Value Scaling in India",
          detail: `Transition into senior advisory or private practice; command ₹80K–₹2.5L+ monthly billing or equity.`
        }
      ]
    };
  });
}

export function enrichCareer(career) {
  const domainPricing = getDomainPricing(career);

  const isFitness = career.id === "fitness-trainer";

  const incomeBreakdown = isFitness
    ? FITNESS_TRAINER_ENRICHMENT.incomeBreakdown
    : {
        tier1: domainPricing.tier1,
        tier2: domainPricing.tier2,
        tier3: domainPricing.tier3
      };

  const timelineToProfitability = isFitness
    ? FITNESS_TRAINER_ENRICHMENT.timelineToProfitability
    : domainPricing.timeline;

  const clientsNeededForTarget = isFitness
    ? FITNESS_TRAINER_ENRICHMENT.clientsNeededForTarget
    : domainPricing.clientsNeeded;

  const actionPlan = isFitness
    ? FITNESS_TRAINER_ENRICHMENT.actionPlan
    : generateActionPlan(career);

  const paths = generateDetailedPaths(career);
  const skillsData = generateSkillsData(career);
  const examsData = generateExamsData(career);
  const collegesData = generateCollegesData(career);

  return {
    ...career,
    paths,
    incomeBreakdown,
    timelineToProfitability,
    clientsNeededForTarget,
    skillsData,
    examsData,
    collegesData,
    actionPlan
  };
}

console.log("Enricher module ready");
