import { Briefcase, Code, Compass, HeartPulse, LineChart, Lightbulb, Scale, Video, TrendingUp, Calculator, Building2, Brain, Cpu, Shield, Cloud, Palette, Film, Smile, Activity, DollarSign, BarChart2, Landmark, Star, HardHat, Settings, Users2, Megaphone, UserCheck, Plane, Scissors, Camera, CalendarDays, Hotel, Heart, BookOpen, Monitor, Newspaper, MessageSquare, Apple, Dumbbell, Gamepad2, Link2, Leaf, FlaskConical, Truck, Layers, PieChart, Pill } from "lucide-react";
export const careers = [
  {
    id: "doctor",
    title: "Medical Doctor",
    category: "Healthcare",
    description: "Diagnose, treat, and care for patients in a highly respected and essential profession.",
    icon: HeartPulse,
    stats: { salary: "\u20B98L - \u20B930L+", demand: "Very High", difficulty: "Very High" },
    whyChoose: ["Directly save lives", "High social respect", "Job security", "Continuous learning"],
    skills: ["Empathy", "Stamina", "Analytical Thinking", "Attention to Detail", "Decision Making under Pressure"],
    paths: [
      { title: "General Physician", desc: "First point of contact for patients." },
      { title: "Surgeon", desc: "Performs operations to treat injuries/diseases." },
      { title: "Specialist (Cardiology, Neuro, etc.)", desc: "Focuses on specific body systems." }
    ],
    timeline: [
      { year: "Class 11-12", title: "PCB Stream", desc: "Focus on Physics, Chemistry, Biology." },
      { year: "Year 1-5", title: "MBBS", desc: "Clear NEET, complete rigorous medical schooling." },
      { year: "Year 6", title: "Internship", desc: "One year mandatory clinical rotation." },
      { year: "Year 7-9", title: "MD/MS (Postgrad)", desc: "Specialize in a specific field." }
    ],
    exams: ["NEET-UG (National Eligibility cum Entrance Test)", "NEET-PG", "AIIMS Entrance"],
    colleges: ["AIIMS New Delhi", "CMC Vellore", "AFMC Pune", "JIPMER"],
    budgetColleges: ["Government Medical Colleges (via state quota)", "MAMC Pune"],
    abroad: ["Russia", "Philippines", "Georgia (Budget friendly)", "UK/USA (High cost, via PLAB/USMLE)"],
    investment: "\u20B95 Lakhs (Govt) to \u20B91 Crore+ (Private) for MBBS",
    salaryExpectations: [
      { level: "Junior Resident", amount: "\u20B940k - \u20B980k / month" },
      { level: "Medical Officer", amount: "\u20B980k - \u20B91.5L / month" },
      { level: "Specialist/Surgeon", amount: "\u20B92L - \u20B95L+ / month" }
    ],
    dailyWork: ["Patient consultations", "Analyzing test results", "Prescribing medications", "Updating medical records"],
    firstOpportunity: "Mandatory rural/urban internship post-MBBS, followed by Junior Residency in hospitals.",
    whoShould: ["People with immense patience", "Those who genuinely care for others", "Students willing to study for 10+ years"],
    whoShouldAvoid: ["Those seeking quick money", "People who can't handle long, irregular hours", "Squeamish individuals"],
    harshReality: "The study period is incredibly long and stressful. Work-life balance is almost non-existent in the early years. Dealing with patient loss takes a mental toll.",
    industryInsights: "Corporate hospitals are dominating the landscape. Having a superspecialty (DM/MCh) is becoming the norm to stand out in tier-1 cities."
  },
  {
    id: "engineer",
    title: "Software Engineer",
    category: "Technology",
    description: "Design, build, and maintain software systems, apps, and digital infrastructure.",
    icon: Code,
    stats: { salary: "\u20B96L - \u20B940L+", demand: "High", difficulty: "Medium" },
    whyChoose: ["High starting salaries", "Global opportunities", "Remote work flexibility", "Building things used by millions"],
    skills: ["Logic & Algorithms", "Programming (Python, JS, C++)", "Problem Solving", "System Design"],
    paths: [
      { title: "Frontend Developer", desc: "Builds user interfaces." },
      { title: "Backend Developer", desc: "Builds server-side logic and databases." },
      { title: "DevOps/SRE", desc: "Manages infrastructure and deployment." }
    ],
    timeline: [
      { year: "Class 11-12", title: "PCM Stream", desc: "Physics, Chemistry, Math." },
      { year: "Year 1-4", title: "B.Tech / B.E.", desc: "Computer Science or related field." },
      { year: "Year 4", title: "Internships & Projects", desc: "Crucial for securing the first job." },
      { year: "Post-grad", title: "Specialization (Optional)", desc: "M.Tech or MS abroad." }
    ],
    exams: ["JEE Main & Advanced", "BITSAT", "VITEEE", "State CETs"],
    colleges: ["IITs", "NITs", "IIITs", "BITS Pilani"],
    budgetColleges: ["State Government Engineering Colleges", "Jadavpur University"],
    abroad: ["USA (Silicon Valley)", "Canada", "Germany", "Singapore"],
    investment: "\u20B98 Lakhs to \u20B925 Lakhs for B.Tech in India.",
    salaryExpectations: [
      { level: "Entry Level (Fresher)", amount: "\u20B94L - \u20B912L / year" },
      { level: "Mid-Level (3-5 yrs)", amount: "\u20B915L - \u20B930L / year" },
      { level: "Senior (8+ yrs)", amount: "\u20B935L - \u20B980L+ / year" }
    ],
    dailyWork: ["Writing and reviewing code", "Attending daily standups", "Debugging issues", "System architecture planning"],
    firstOpportunity: "Campus placements, off-campus drives, or contributing to Open Source/hackathons.",
    whoShould: ["Logical thinkers", "People who enjoy continuous learning", "Those comfortable sitting at a desk for hours"],
    whoShouldAvoid: ["People who hate math/logic", "Those who prefer outdoor, physical work", "People wanting a static, unchanging job"],
    harshReality: "Technology changes rapidly. If you stop learning, you become obsolete in 3-5 years. Sitting for long hours leads to health issues.",
    industryInsights: "AI is writing basic code now. The real value of an engineer is in solving complex architectural problems, not just typing syntax.",
    courses: [
      {
        title: "CS50: Introduction to Computer Science",
        provider: "Harvard University (edX)",
        url: "https://pll.harvard.edu/course/cs50-introduction-computer-science",
        level: "Beginner",
        duration: "12 Weeks",
        price: "Free Audit",
        badge: "Foundational",
        description: "The gold standard introduction to algorithms, memory management, C, Python, SQL, and web fundamentals."
      },
      {
        title: "Full Stack Open (React, Node, TypeScript)",
        provider: "University of Helsinki",
        url: "https://fullstackopen.com/",
        level: "Intermediate",
        duration: "12 Weeks",
        price: "100% Free",
        badge: "Hands-on Project",
        description: "Deep dive into modern JavaScript, React, Node.js, Express, REST APIs, GraphQL, TypeScript, and CI/CD."
      },
      {
        title: "Meta Front-End Developer Professional Certificate",
        provider: "Meta (Coursera)",
        url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
        level: "Beginner to Pro",
        duration: "6 Months",
        price: "Paid / Financial Aid",
        badge: "Industry Certified",
        description: "Comprehensive front-end engineering program taught by Meta software engineers covering UI, React, and UX."
      }
    ]
  },
  {
    id: "lawyer",
    title: "Corporate Lawyer",
    category: "Legal",
    description: "Advise businesses on legal rights, responsibilities, and represent them in legal matters.",
    icon: Scale,
    stats: { salary: "\u20B95L - \u20B935L+", demand: "Medium", difficulty: "High" },
    whyChoose: ["Intellectually stimulating", "High prestige", "Lucrative corporate packages", "Diverse practice areas"],
    skills: ["Reading Comprehension", "Argumentation", "Attention to Detail", "Negotiation", "Public Speaking"],
    paths: [
      { title: "Litigation", desc: "Arguing cases in court." },
      { title: "Corporate Law", desc: "Mergers, acquisitions, and compliance." },
      { title: "Intellectual Property", desc: "Patents, trademarks, copyrights." }
    ],
    timeline: [
      { year: "Class 11-12", title: "Any Stream", desc: "Arts/Humanities is advantageous but not mandatory." },
      { year: "Year 1-5", title: "BA LLB / BBA LLB", desc: "Integrated 5-year law degree." },
      { year: "Year 5", title: "Bar Council Exam", desc: "Clear AIBE to practice." },
      { year: "Post-grad", title: "LLM (Optional)", desc: "For specialized knowledge or academia." }
    ],
    exams: ["CLAT (Common Law Admission Test)", "AILET", "LSAT India"],
    colleges: ["NLSIU Delhi", "NALSAR Bangalore", "Symbiosis Law School", "Jindal Global Law School"],
    budgetColleges: ["Delhi University Faculty of Law", "GLC Mumbai", "BHU Law School"],
    abroad: ["UK", "USA", "Australia (Requires clearing local bar exams to practice)"],
    investment: "\u20B92 Lakhs (Govt) to \u20B920 Lakhs+ (Private NLU/Symbiosis)",
    salaryExpectations: [
      { level: "Junior Associate", amount: "\u20B94L - \u20B915L / year (Highly variable)" },
      { level: "Senior Associate", amount: "\u20B915L - \u20B940L / year" },
      { level: "Partner", amount: "\u20B975L - \u20B92Cr+ / year" }
    ],
    dailyWork: ["Drafting contracts", "Legal research", "Client meetings", "Negotiating terms"],
    firstOpportunity: "Internships at law firms during college lead to Pre-Placement Offers (PPOs).",
    whoShould: ["Avid readers", "Highly articulate individuals", "Those with strong analytical skills"],
    whoShouldAvoid: ["People who hate reading long documents", "Those looking for a 9-to-5 job", "Conflict-averse individuals"],
    harshReality: "Corporate law firms are infamous for grueling 14-16 hour workdays and toxic work cultures in the initial years.",
    industryInsights: "Top tier firms (Tier-1) pay extraordinarily well but only hire from top 5-7 NLUs. Grads from lower-tier colleges struggle initially."
  },
  {
    id: "startup-founder",
    title: "Startup Founder",
    category: "Business",
    description: "Build a company from scratch, solving a problem and scaling a business model.",
    icon: Lightbulb,
    stats: { salary: "Highly Variable", demand: "N/A", difficulty: "Extreme" },
    whyChoose: ["Unlimited upside", "Be your own boss", "Create real impact", "Rapid personal growth"],
    skills: ["Sales", "Product Management", "Resilience", "Leadership", "Financial Literacy"],
    paths: [
      { title: "Tech Startup", desc: "Software, SaaS, AI." },
      { title: "D2C/E-commerce", desc: "Selling physical products to consumers." },
      { title: "Service Agency", desc: "B2B services, consulting." }
    ],
    timeline: [
      { year: "Phase 1", title: "Idea & Validation", desc: "Find a problem, talk to users." },
      { year: "Phase 2", title: "MVP & Traction", desc: "Build a basic product, get first paying customers." },
      { year: "Phase 3", title: "Funding (Optional)", desc: "Raise from Angels/VCs if scaling requires capital." },
      { year: "Phase 4", title: "Scaling", desc: "Hiring, marketing, expanding." }
    ],
    exams: ["None"],
    colleges: ["IITs/BITS/IIMs provide great networks, but not mandatory. Dropouts welcome."],
    budgetColleges: ["N/A"],
    abroad: ["N/A"],
    investment: "Zero to millions depending on the business model.",
    salaryExpectations: [
      { level: "Early Stage", amount: "\u20B90 - Minimum wage (Survival)" },
      { level: "Funded Stage", amount: "\u20B91L - \u20B92L / month (Founder salary)" },
      { level: "Exit/IPO", amount: "Millions/Billions (or zero if failed)" }
    ],
    dailyWork: ["Pitching to investors", "Selling to customers", "Hiring and firing", "Putting out fires/crisis management"],
    firstOpportunity: "Start building today. Launch a side project.",
    whoShould: ["Risk-takers", "Obsessive problem solvers", "People who can handle rejection well"],
    whoShouldAvoid: ["Those needing stability", "People who want a work-life balance", "Those who give up easily"],
    harshReality: "90% of startups fail. You will work 80+ hours a week and might make less money than your peers for years.",
    industryInsights: "Ideas are cheap; execution is everything. Investors invest in the founding team's resilience more than the initial idea."
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    category: "Technology",
    description: "Analyze complex data to help companies make better business decisions.",
    icon: LineChart,
    stats: { salary: "\u20B98L - \u20B935L+", demand: "Very High", difficulty: "High" },
    whyChoose: ["High demand", "Excellent pay", "Intellectual challenge", "At the forefront of AI"],
    skills: ["Python/R", "Statistics & Probability", "Machine Learning", "SQL", "Data Visualization"],
    paths: [
      { title: "Data Analyst", desc: "Focuses on reporting and BI." },
      { title: "Data Scientist", desc: "Builds predictive models." },
      { title: "Machine Learning Engineer", desc: "Puts ML models into production." }
    ],
    timeline: [
      { year: "Class 11-12", title: "PCM/Commerce with Math", desc: "Strong foundation in Mathematics." },
      { year: "Undergrad", title: "B.Tech/B.Sc Stats", desc: "CS, Statistics, or Math degree." },
      { year: "Self-Study", title: "Kaggle & Projects", desc: "Build a portfolio of data projects." }
    ],
    exams: ["JEE", "CUET (for B.Sc Stats)"],
    colleges: ["ISI Kolkata", "IITs", "Chennai Mathematical Institute"],
    budgetColleges: ["Delhi University (B.Sc Stats)"],
    abroad: ["USA, UK, Germany (Very popular for MS in Data Science)"],
    investment: "Standard college fees + courses.",
    salaryExpectations: [
      { level: "Entry Level", amount: "\u20B96L - \u20B912L / year" },
      { level: "Mid-Level", amount: "\u20B915L - \u20B925L / year" },
      { level: "Senior/Lead", amount: "\u20B930L - \u20B960L+ / year" }
    ],
    dailyWork: ["Cleaning messy data (80% of time)", "Building ML models", "Creating dashboards", "Presenting insights to stakeholders"],
    firstOpportunity: "Internships, Kaggle competitions, or transitioning internally from an Analyst role.",
    whoShould: ["Math nerds", "Curious investigators", "Those who love finding patterns"],
    whoShouldAvoid: ["People who hate statistics", "Those who want to build UI/visual apps"],
    harshReality: "Most of your time is spent cleaning messy data, not building cool AI models. Many companies hire data scientists without actually having the data infrastructure ready.",
    industryInsights: "The title 'Data Scientist' is overused. Knowing the underlying math is what separates true professionals from those who just import Python libraries."
  },
  {
    id: "product-manager",
    title: "Product Manager",
    category: "Technology",
    description: "Sit at the intersection of business, design, and tech to guide product development.",
    icon: Compass,
    stats: { salary: "\u20B910L - \u20B940L+", demand: "High", difficulty: "Medium" },
    whyChoose: ["Mini-CEO feel", "High impact", "No coding required (usually)", "Strategic role"],
    skills: ["User Empathy", "Data Analysis", "Communication", "Prioritization", "Business Strategy"],
    paths: [
      { title: "Growth PM", desc: "Focuses on user acquisition and retention." },
      { title: "Technical PM", desc: "Focuses on infrastructure and APIs." },
      { title: "Core PM", desc: "Focuses on user experience and features." }
    ],
    timeline: [
      { year: "College", title: "Any Degree", desc: "B.Tech and MBA are most common." },
      { year: "Early Career", title: "Engineer/Analyst", desc: "Most PMs transition from other roles." },
      { year: "Transition", title: "APM Role", desc: "Associate Product Manager programs." }
    ],
    exams: ["CAT, GMAT (if going via MBA route)"],
    colleges: ["IIMs, ISB, IITs (for tech background)"],
    budgetColleges: ["FMS Delhi"],
    abroad: ["USA, UK"],
    investment: "Varies wildly based on degree.",
    salaryExpectations: [
      { level: "Associate PM", amount: "\u20B98L - \u20B918L / year" },
      { level: "Product Manager", amount: "\u20B918L - \u20B935L / year" },
      { level: "Group PM / VP", amount: "\u20B945L - \u20B91Cr+ / year" }
    ],
    dailyWork: ["Writing PRDs (Product Requirement Docs)", "Meetings with engineers & designers", "Analyzing user data", "Prioritizing the roadmap"],
    firstOpportunity: "APM programs at tech companies or internal transfers from QA/Engineering/Marketing.",
    whoShould: ["Great communicators", "Organized generalists", "People who can say 'No' politely"],
    whoShouldAvoid: ["Those who want to just build quietly", "People who hate meetings", "Those who need direct authority"],
    harshReality: "You have all the responsibility for the product's success, but zero actual authority over the engineers and designers building it. It requires intense influence and persuasion.",
    industryInsights: "A technical background is becoming increasingly mandatory for PMs in top tech companies."
  },
  {
    id: "content-creator",
    title: "Content Creator",
    category: "Media",
    description: "Create engaging videos, writing, or audio for digital platforms to build an audience.",
    icon: Video,
    stats: { salary: "Highly Variable", demand: "High", difficulty: "Medium" },
    whyChoose: ["Creative freedom", "Potential for massive reach", "Be your own boss", "Monetize your passions"],
    skills: ["Storytelling", "Video Editing", "Copywriting", "SEO & Analytics", "Public Speaking"],
    paths: [
      { title: "YouTuber/Vlogger", desc: "Long-form or short-form video content." },
      { title: "Podcaster", desc: "Audio interviews and storytelling." },
      { title: "Newsletter Writer", desc: "Written niche content." }
    ],
    timeline: [
      { year: "Start", title: "Pick a Niche", desc: "Tech, Finance, Comedy, Education." },
      { year: "Growth", title: "Consistent Publishing", desc: "Post 1-2 times a week without fail." },
      { year: "Monetization", title: "Brand Deals", desc: "Sponsorships, Adsense, Merchandise." }
    ],
    exams: ["None"],
    colleges: ["Not required. Mass Comm degrees optional."],
    budgetColleges: ["N/A"],
    abroad: ["N/A"],
    investment: "Minimal (Phone camera) to Moderate (Pro camera, mic, lighting).",
    salaryExpectations: [
      { level: "Starting out", amount: "\u20B90" },
      { level: "Micro-Influencer", amount: "\u20B920k - \u20B91L / month" },
      { level: "Top Creator", amount: "\u20B95L - \u20B950L+ / month" }
    ],
    dailyWork: ["Scripting videos", "Filming", "Editing", "Analyzing algorithm metrics", "Emailing sponsors"],
    firstOpportunity: "Create an account and post your first piece of content.",
    whoShould: ["Creative individuals", "Consistent workers", "Those comfortable on camera/mic"],
    whoShouldAvoid: ["People who fear public judgment", "Those seeking guaranteed income", "Inconsistent workers"],
    harshReality: "Burnout is incredibly common. The algorithm dictates your income, and one policy change can halve your viewership overnight.",
    industryInsights: "Short-form content (Reels/Shorts) is great for discovery, but long-form content is where actual community trust and monetization lie."
  },
  {
    id: "designer",
    title: "UI/UX Designer",
    category: "Design",
    description: "Design digital interfaces that are beautiful, intuitive, and easy to use.",
    icon: Briefcase,
    stats: { salary: "\u20B95L - \u20B925L+", demand: "High", difficulty: "Medium" },
    whyChoose: ["Blend of art and tech", "High impact on product success", "Good pay scale", "Creative satisfaction"],
    skills: ["Figma", "User Research", "Wireframing", "Visual Design", "Prototyping"],
    paths: [
      { title: "UI Designer", desc: "Focuses on colors, typography, visuals." },
      { title: "UX Researcher", desc: "Focuses on user interviews and flows." },
      { title: "Product Designer", desc: "End-to-end design process." }
    ],
    timeline: [
      { year: "Foundation", title: "Learn Design Principles", desc: "Color theory, typography." },
      { year: "Tools", title: "Master Figma", desc: "Learn the industry standard tool." },
      { year: "Portfolio", title: "Build Case Studies", desc: "Redesign existing apps or create new ones." }
    ],
    exams: ["NID DAT, UCEED (If going for formal degree)"],
    colleges: ["NID", "IIT Bombay (IDC)", "Srishti Pune"],
    budgetColleges: ["Self-taught via YouTube/Bootcamps (Most common)"],
    abroad: ["Parsons (USA), RCA (USA)"],
    investment: "Zero (Self-taught) to \u20B915 Lakhs (Private college).",
    salaryExpectations: [
      { level: "Junior Designer", amount: "\u20B94L - \u20B98L / year" },
      { level: "Mid-Level", amount: "\u20B910L - \u20B918L / year" },
      { level: "Senior Product Designer", amount: "\u20B920L - \u20B940L+ / year" }
    ],
    dailyWork: ["Creating wireframes", "Designing high-fidelity screens in Figma", "Handing off designs to developers", "User testing"],
    firstOpportunity: "Freelance gigs, internships, or building a strong Behance/Dribbble portfolio.",
    whoShould: ["Visual thinkers", "Empathetic problem solvers", "Detail-oriented creatives"],
    whoShouldAvoid: ["People who can't take feedback", "Those looking for rigid right/wrong answers"],
    harshReality: "Your designs will constantly be critiqued and often changed by PMs or clients for business reasons, which can be frustrating.",
    industryInsights: "A degree matters less than your portfolio. A stunning, well-documented portfolio can get you into top tech companies even if you are a college dropout."
  },
  {
    id: "digital-marketer",
    title: "Digital Marketer",
    category: "Marketing",
    description: "Grow brands and businesses online through SEO, social media, paid ads, and content strategies.",
    icon: TrendingUp,
    stats: { salary: "\u20B93L - \u20B925L+", demand: "Very High", difficulty: "Medium" },
    whyChoose: ["Low entry barrier", "Huge demand from startups & businesses", "Remote-friendly career", "Constantly evolving field"],
    skills: ["SEO & SEM", "Meta & Google Ads", "Content Marketing", "Analytics (GA4)", "Email Marketing", "Copywriting"],
    paths: [
      { title: "SEO Specialist", desc: "Rank websites on Google organically." },
      { title: "Performance Marketer", desc: "Run paid ads on Meta, Google, YouTube." },
      { title: "Social Media Manager", desc: "Build & grow brand presence on social platforms." },
      { title: "Growth Hacker", desc: "Experiment with channels to grow user acquisition fast." }
    ],
    timeline: [
      { year: "Month 1-3", title: "Learn the Basics", desc: "Google Digital Garage, Meta Blueprint, HubSpot courses." },
      { year: "Month 3-6", title: "Hands-on Practice", desc: "Run small campaigns, manage social accounts." },
      { year: "Month 6-12", title: "Freelancing / Internship", desc: "Real clients = real experience + portfolio." },
      { year: "Year 1+", title: "Full-time Role", desc: "Join a startup, agency, or go full freelance." }
    ],
    exams: ["Google Ads Certification", "Meta Blueprint", "HubSpot Content Marketing Certification"],
    colleges: ["MICA Ahmedabad", "Symbiosis Institute of Media & Communication", "Xavier Institute of Communications"],
    budgetColleges: ["Google Digital Unlocked (Free)", "Coursera / Udemy (\u20B9500-2000)"],
    abroad: ["USA, UK, Canada (Digital Marketing MBA programs)"],
    investment: "Nearly zero to start (free certifications). Agency or full-time role needs no formal degree.",
    salaryExpectations: [
      { level: "Fresher / Intern", amount: "\u20B92.5L - \u20B95L / year" },
      { level: "Mid-Level (2-4 yrs)", amount: "\u20B96L - \u20B914L / year" },
      { level: "Senior / Growth Head", amount: "\u20B918L - \u20B935L+ / year" }
    ],
    dailyWork: ["Running & optimizing ad campaigns", "Writing content briefs", "Analyzing campaign dashboards", "A/B testing creatives", "Reporting ROI to clients/managers"],
    firstOpportunity: "Start with a free internship at a local business or build your own brand's presence \u2014 your results ARE your portfolio.",
    whoShould: ["Creative + analytical mix", "People curious about consumer psychology", "Those who like fast feedback loops"],
    whoShouldAvoid: ["People who hate writing/communication", "Those who want a stable 9-to-5 with no target pressure", "People resistant to change"],
    harshReality: "Platforms change their algorithms constantly. A strategy that works today may be irrelevant in 6 months. Agencies are notorious for low salaries and overwork in the early years.",
    industryInsights: "AI tools (ChatGPT, Jasper) are automating basic content tasks. The edge now lies in strategy, brand building, and data interpretation \u2014 not just content production."
  },
  {
    id: "chartered-accountant",
    title: "Chartered Accountant",
    category: "Finance",
    description: "Manage finances, auditing, taxation, and compliance for individuals, companies, and governments.",
    icon: Calculator,
    stats: { salary: "\u20B97L - \u20B940L+", demand: "High", difficulty: "Very High" },
    whyChoose: ["Recession-proof career", "High respect & job security", "Own practice option", "Diverse industries hire CAs"],
    skills: ["Accounting & Auditing", "Taxation (GST, Income Tax)", "Financial Reporting", "Company Law", "Analytical Thinking"],
    paths: [
      { title: "Audit & Assurance", desc: "Audit company financial statements." },
      { title: "Taxation", desc: "GST, income tax planning and compliance." },
      { title: "Finance Controller / CFO", desc: "Head of finance at a company." },
      { title: "Independent Practice", desc: "Own CA firm serving clients." }
    ],
    timeline: [
      { year: "Class 11-12", title: "Commerce Stream", desc: "Focus on Accounts, Economics, Maths." },
      { year: "After 12th", title: "CA Foundation", desc: "Register with ICAI, clear 4-paper exam." },
      { year: "Year 1-2", title: "CA Intermediate", desc: "8 papers across 2 groups, harder stage." },
      { year: "Year 2-5", title: "Articleship (3 Years)", desc: "Mandatory 3-year practical training under a CA." },
      { year: "Year 5+", title: "CA Final", desc: "8 papers \u2014 the hardest exam in India." }
    ],
    exams: ["CA Foundation", "CA Intermediate", "CA Final (ICAI)"],
    colleges: ["No specific college needed \u2014 ICAI regulates the entire course", "Commerce colleges help for foundation prep"],
    budgetColleges: ["B.Com from any govt college alongside CA prep"],
    abroad: ["ACCA (UK) \u2014 globally recognized alternative", "CPA (USA)"],
    investment: "\u20B91.5 Lakhs total ICAI fees + coaching (\u20B950K-\u20B92L).",
    salaryExpectations: [
      { level: "Fresher CA", amount: "\u20B97L - \u20B912L / year" },
      { level: "Experienced (3-5 yrs)", amount: "\u20B915L - \u20B925L / year" },
      { level: "CFO / Senior Partner", amount: "\u20B930L - \u20B91Cr+ / year" }
    ],
    dailyWork: ["Reviewing financial statements", "Filing GST/TDS returns", "Client meetings", "Preparing audit reports", "Tax planning sessions"],
    firstOpportunity: "Articleship under a practicing CA starts during Intermediate \u2014 this IS your first real job.",
    whoShould: ["Detail-oriented, patient people", "Students who are good with numbers", "Those willing to commit 5+ years to qualify"],
    whoShouldAvoid: ["People who want quick results", "Those who dislike paperwork and compliance", "Students with weak math foundation"],
    harshReality: "The pass rate for CA Final is around 10-15%. Most students take 2-3 attempts. Articleship salaries are shockingly low (\u20B92K-\u20B95K/month). The grind is real.",
    industryInsights: "Big 4 firms (Deloitte, PwC, EY, KPMG) are the dream employers post-CA. However, mid-sized firms offer faster growth and own-practice potential."
  },
  {
    id: "architect",
    title: "Architect",
    category: "Design & Construction",
    description: "Design functional and aesthetic buildings, spaces, and infrastructure that shape how people live and work.",
    icon: Building2,
    stats: { salary: "\u20B94L - \u20B930L+", demand: "Medium", difficulty: "High" },
    whyChoose: ["Creative + technical blend", "Lasting impact \u2014 your buildings stand for decades", "Diverse specializations", "Global opportunities"],
    skills: ["AutoCAD & Revit", "3D Visualization (SketchUp, Lumion)", "Structural Understanding", "Design Thinking", "Project Management"],
    paths: [
      { title: "Residential Architect", desc: "Design homes and housing projects." },
      { title: "Commercial Architect", desc: "Design offices, malls, hotels." },
      { title: "Urban Planner", desc: "Plan cities, townships, and public spaces." },
      { title: "Interior Designer", desc: "Focus on indoor spaces and aesthetics." }
    ],
    timeline: [
      { year: "Class 11-12", title: "PCM or Arts", desc: "Both work \u2014 good drawing skills help." },
      { year: "Year 1-5", title: "B.Arch (5 Years)", desc: "5-year professional architecture degree." },
      { year: "Year 5-6", title: "Internship", desc: "Mandatory internship at a firm or with a licensed architect." },
      { year: "Post-grad", title: "M.Arch (Optional)", desc: "Specialize in sustainable, urban, or heritage architecture." }
    ],
    exams: ["NATA (National Aptitude Test in Architecture)", "JEE Paper 2 (for NITs/IITs)"],
    colleges: ["IIT Kharagpur", "NIT Trichy", "SPA Delhi", "CEPT Ahmedabad"],
    budgetColleges: ["Government Schools of Architecture (via NATA)", "SPA Delhi (central university rates)"],
    abroad: ["USA, UK, Netherlands (Top arch schools globally)"],
    investment: "\u20B95 Lakhs (Govt) to \u20B935 Lakhs (Private).",
    salaryExpectations: [
      { level: "Junior Architect", amount: "\u20B93L - \u20B96L / year" },
      { level: "Project Architect (5+ yrs)", amount: "\u20B910L - \u20B920L / year" },
      { level: "Principal / Own Firm", amount: "\u20B920L - \u20B960L+ / year" }
    ],
    dailyWork: ["Drawing and revising design plans", "Site visits and inspections", "Client presentations", "Coordinating with engineers and contractors"],
    firstOpportunity: "Internship during B.Arch at a local architecture firm. Many freshers start at small studios and work up.",
    whoShould: ["Creative people who also like problem-solving", "Those patient enough for a 5-year degree", "People with strong spatial visualization"],
    whoShouldAvoid: ["Those seeking quick financial returns", "People who don't like field work or client interaction", "Students who hate technical drawing"],
    harshReality: "Architecture is a notoriously underpaid profession in India, especially in the early years. Many fresh graduates earn \u20B910K-\u20B915K/month. Own practice takes 10+ years to build.",
    industryInsights: "Sustainable and green architecture is booming in India post-2022. BIM (Building Information Modelling) skills are now mandatory in large firms."
  },
  {
    id: "psychologist",
    title: "Psychologist",
    category: "Mental Health",
    description: "Study human behavior and mental processes to help people overcome challenges and improve well-being.",
    icon: Brain,
    stats: { salary: "\u20B93L - \u20B920L+", demand: "Growing Fast", difficulty: "High" },
    whyChoose: ["Deep personal impact on people's lives", "Growing awareness of mental health in India", "Diverse settings \u2014 schools, hospitals, corporates", "Academically rich and meaningful"],
    skills: ["Active Listening", "Empathy", "Psychological Assessment", "Counselling Techniques", "Research Methods", "Report Writing"],
    paths: [
      { title: "Clinical Psychologist", desc: "Diagnose and treat mental health disorders." },
      { title: "Counselling Psychologist", desc: "Provide guidance for life challenges, not clinical disorders." },
      { title: "School/Child Psychologist", desc: "Work with children and adolescents in school settings." },
      { title: "Organizational Psychologist", desc: "Help companies with employee well-being and HR." }
    ],
    timeline: [
      { year: "Class 11-12", title: "Arts / Science", desc: "Either stream works. Psychology as a subject is helpful." },
      { year: "Year 1-3", title: "BA/B.Sc Psychology", desc: "3-year undergraduate degree." },
      { year: "Year 4-5", title: "MA/M.Sc Psychology", desc: "Master's is practically mandatory for practice." },
      { year: "Year 6+", title: "M.Phil / PhD (For Clinical)", desc: "RCI-recognized M.Phil needed to practice as Clinical Psychologist in India." }
    ],
    exams: ["CUET (for central universities)", "DUET (Delhi University)", "RCI M.Phil entrance (for clinical practice)"],
    colleges: ["NIMHANS Bangalore", "Delhi University", "Tata Institute of Social Sciences (TISS)", "Christ University Bangalore"],
    budgetColleges: ["Government colleges via CUET", "Delhi University colleges"],
    abroad: ["USA, UK, Australia (Strong psychology programs)"],
    investment: "\u20B91 Lakh (Govt) to \u20B910 Lakhs (Private). PhD funding often available.",
    salaryExpectations: [
      { level: "Fresh Counsellor", amount: "\u20B92.5L - \u20B95L / year" },
      { level: "Mid-Level (3-5 yrs)", amount: "\u20B96L - \u20B912L / year" },
      { level: "Senior / Private Practice", amount: "\u20B915L - \u20B930L+ / year" }
    ],
    dailyWork: ["One-on-one therapy sessions", "Psychological assessment & report writing", "Group therapy or workshops", "Referring clients to psychiatrists when needed"],
    firstOpportunity: "Internship at NGOs, hospitals, or school counselling programs during or after Master's.",
    whoShould: ["Deeply empathetic individuals", "Patient people who genuinely want to help others", "Those curious about human behavior"],
    whoShouldAvoid: ["People who get emotionally overwhelmed easily", "Those seeking high early income", "Students who dislike research and academic reading"],
    harshReality: "The mental health field in India is still underpaid and undervalued. Without the RCI-recognized M.Phil, you legally cannot practice as a Clinical Psychologist. The emotional toll of listening to trauma daily is real.",
    industryInsights: "Post-COVID, corporate wellness is a booming segment. Therapists who build an online presence (Instagram, YouTube) are building private practices 3x faster than traditional methods."
  },
  {
    id: "ai-ml-engineer",
    title: "AI / ML Engineer",
    category: "Technology",
    description: "Build intelligent systems and machine learning models that power the next generation of products.",
    icon: Cpu,
    stats: { salary: "\u20B98L - \u20B960L+", demand: "Very High", difficulty: "Very High" },
    whyChoose: ["Fastest growing field in tech", "Massive global demand", "Cutting-edge research opportunities", "High salaries from day one"],
    skills: ["Python", "TensorFlow / PyTorch", "Mathematics & Statistics", "Deep Learning", "NLP"],
    paths: [
      { title: "ML Engineer", desc: "Build and deploy machine learning models at scale." },
      { title: "Research Scientist", desc: "Push the boundaries of AI through academic or corporate research." },
      { title: "AI Product Lead", desc: "Bridge the gap between AI capabilities and real-world products." }
    ],
    timeline: [
      { year: "Class 11-12", title: "PCM + Computers", desc: "Strong maths foundation is non-negotiable." },
      { year: "Year 1-4", title: "B.Tech (CS/AI/Math)", desc: "IIT, BITS, or NIT with focus on ML electives." },
      { year: "Year 3-4", title: "Projects & Research", desc: "Kaggle competitions, open-source, internships at AI labs." },
      { year: "Post-grad", title: "M.Tech / MS / PhD", desc: "Research-focused Master's or PhD for deep specialization." }
    ],
    exams: ["JEE Main & Advanced", "BITSAT", "GATE (for M.Tech)"],
    colleges: ["IIT Delhi", "IIT Bombay", "IISc Bangalore", "IIIT Hyderabad", "IIT Madras"],
    budgetColleges: ["NIT Trichy", "IIIT Allahabad", "State engineering colleges with CS"],
    abroad: ["MIT", "Stanford", "Carnegie Mellon", "University of Cambridge", "ETH Zurich"],
    investment: "\u20B98L - \u20B920L for B.Tech in India. Fully funded MS/PhD abroad is common.",
    salaryExpectations: [
      { level: "Entry (0-2 yrs)", amount: "\u20B98L - \u20B918L / year" },
      { level: "Mid-Level (3-5 yrs)", amount: "\u20B925L - \u20B960L / year" },
      { level: "Senior / Staff", amount: "\u20B960L - \u20B92Cr / year" }
    ],
    dailyWork: ["Training and tuning ML models", "Writing Python pipelines", "Reading research papers", "Collaborating with product teams", "Deploying models to production"],
    firstOpportunity: "Internships at AI startups or FAANG. Kaggle rankings and GitHub projects open doors even without a degree.",
    whoShould: ["Strong math and statistics background", "Research-oriented thinkers", "People who love solving hard problems"],
    whoShouldAvoid: ["Those who want quick results", "People who dislike deep technical work", "Anyone uncomfortable with continuous learning"],
    harshReality: "AI is moving at breakneck speed \u2014 what you learn today may be outdated in 2 years. The field rewards researchers far more than implementers. Most 'AI jobs' in India are actually data preprocessing, not real ML.",
    industryInsights: "Generative AI has created a massive talent shortage. Engineers who understand both ML fundamentals and system design are worth 2x their peers."
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Analyst",
    category: "Technology",
    description: "Protect digital systems and networks from hackers, breaches, and cyber threats.",
    icon: Shield,
    stats: { salary: "\u20B94L - \u20B935L+", demand: "High", difficulty: "High" },
    whyChoose: ["Rapidly growing field with zero unemployment", "High salaries globally", "Intellectually stimulating cat-and-mouse work", "Critical to every industry"],
    skills: ["Networking & Linux", "Python", "Ethical Hacking", "CEH / CISSP Certifications", "Incident Response"],
    paths: [
      { title: "SOC Analyst", desc: "Monitor and respond to security incidents in real time." },
      { title: "Penetration Tester", desc: "Ethically hack systems to find vulnerabilities before attackers do." },
      { title: "CISO", desc: "Chief Information Security Officer \u2014 lead org-wide security strategy." }
    ],
    timeline: [
      { year: "Class 11-12", title: "PCM / CS", desc: "Strong computer science and networking basics." },
      { year: "Year 1-4", title: "B.Tech (CS) or BCA", desc: "Core degree + certifications like CEH, CompTIA Security+." },
      { year: "Year 3-4", title: "Bug Bounties & CTFs", desc: "Participate in HackerOne, Bugcrowd, Capture The Flag competitions." },
      { year: "Year 4+", title: "CISSP / OSCP", desc: "Advanced certifications for senior roles." }
    ],
    exams: ["JEE Main (for CS degree)", "CEH Exam", "OSCP Certification"],
    colleges: ["IIT Bombay", "NIT Trichy", "Amrita University", "CDAC", "VIT Vellore"],
    budgetColleges: ["Government engineering colleges", "CDAC certification programs"],
    abroad: ["Carnegie Mellon", "Georgia Tech", "MIT", "University of Maryland", "Purdue"],
    investment: "\u20B95L - \u20B915L for degree + \u20B950K-\u20B92L for certifications.",
    salaryExpectations: [
      { level: "Analyst (0-2 yrs)", amount: "\u20B94L - \u20B910L / year" },
      { level: "Security Engineer (3-5 yrs)", amount: "\u20B912L - \u20B930L / year" },
      { level: "CISO / Architect", amount: "\u20B935L - \u20B980L / year" }
    ],
    dailyWork: ["Monitoring security alerts", "Running vulnerability scans", "Incident response and forensics", "Writing security reports", "Staying updated on new threats"],
    firstOpportunity: "Bug bounty programs, internships at cybersecurity firms, or SOC analyst roles at IT companies.",
    whoShould: ["Detail-oriented, ethical individuals", "People who enjoy cracking puzzles", "Those comfortable with constant learning and grey-area thinking"],
    whoShouldAvoid: ["Those uncomfortable with rapid change", "People who need clear rules at all times", "Anyone looking for a 9-5 predictable job"],
    harshReality: "Many Indian cybersecurity 'professionals' are just certified but not skilled. Real employers look for hands-on experience from CTFs and bug bounties, not just certificates.",
    industryInsights: "With India's Digital India push and UPI-scale fintech, cybersecurity hiring is exploding. Cloud security and application security are the hottest sub-niches."
  },
  {
    id: "cloud-architect",
    title: "Cloud Architect",
    category: "Technology",
    description: "Design and manage large-scale cloud infrastructure on AWS, Azure, or GCP for enterprises.",
    icon: Cloud,
    stats: { salary: "\u20B98L - \u20B960L+", demand: "High", difficulty: "High" },
    whyChoose: ["Every company is moving to cloud", "High-paying niche with few experts", "Remote-friendly global demand", "Combine DevOps, networking, and system design"],
    skills: ["AWS / Azure / GCP", "Docker & Kubernetes", "Terraform", "DevOps & CI/CD", "Networking"],
    paths: [
      { title: "Cloud Engineer", desc: "Build and manage cloud infrastructure." },
      { title: "DevOps Engineer", desc: "Automate deployment pipelines and infrastructure as code." },
      { title: "Principal Cloud Architect", desc: "Design entire cloud strategy for large enterprises." }
    ],
    timeline: [
      { year: "Class 11-12", title: "PCM / CS", desc: "Strong math and CS fundamentals." },
      { year: "Year 1-4", title: "B.Tech (CS/ECE)", desc: "Focus on networking and systems courses." },
      { year: "Year 3+", title: "Cloud Certifications", desc: "AWS Solutions Architect, GCP Professional \u2014 these are highly valued." },
      { year: "Year 5+", title: "Senior Roles", desc: "5+ years experience to become an Architect." }
    ],
    exams: ["JEE Main", "BITSAT", "AWS Certification Exam", "GCP Professional Exam"],
    colleges: ["IIT Bombay", "IIT Delhi", "BITS Pilani", "NIT Surathkal", "Jadavpur University"],
    budgetColleges: ["Government engineering colleges", "Online certifications via AWS / Google"],
    abroad: ["MIT", "Stanford", "University of Washington", "Georgia Tech", "UC San Diego"],
    investment: "\u20B98L - \u20B920L for degree + \u20B920K-\u20B91L for cloud certifications.",
    salaryExpectations: [
      { level: "Cloud Engineer (0-3 yrs)", amount: "\u20B98L - \u20B915L / year" },
      { level: "Senior Cloud Eng (3-6 yrs)", amount: "\u20B920L - \u20B950L / year" },
      { level: "Principal Architect", amount: "\u20B960L - \u20B91.5Cr / year" }
    ],
    dailyWork: ["Designing cloud architecture diagrams", "Writing infrastructure-as-code", "Cost optimization reviews", "Incident management", "Vendor evaluation"],
    firstOpportunity: "Junior DevOps or cloud support roles at IT services companies like Infosys, TCS, or startups.",
    whoShould: ["System thinkers who love infrastructure and scale", "People who enjoy automation", "Those who want backend, invisible-but-critical roles"],
    whoShouldAvoid: ["Those who prefer front-end or people-facing roles", "Anyone who dislikes documentation", "People who need frequent visible output"],
    harshReality: "The cloud space changes every 6 months. Certifications go stale. Real architects must constantly rebuild their knowledge.",
    industryInsights: "Multi-cloud and cloud-cost optimization are the hottest areas right now. FinOps (cloud financial management) is an emerging high-paying niche."
  },
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    category: "Creative & Design",
    description: "Create visual communication \u2014 logos, brand identities, marketing materials, and print design.",
    icon: Palette,
    stats: { salary: "\u20B92.5L - \u20B920L+", demand: "Medium", difficulty: "Medium" },
    whyChoose: ["Creative freedom and expression", "Freelance opportunities globally", "Low barrier to entry", "Essential skill for all businesses"],
    skills: ["Adobe Illustrator & Photoshop", "Figma", "Typography", "Branding", "Illustration"],
    paths: [
      { title: "Brand Designer", desc: "Design logos, brand identities, and style guides." },
      { title: "Art Director", desc: "Lead visual direction for campaigns and studios." },
      { title: "Creative Director", desc: "Own the entire visual strategy for a brand or agency." }
    ],
    timeline: [
      { year: "Class 11-12", title: "Any Stream", desc: "Arts stream preferred, but not mandatory." },
      { year: "Year 1-3", title: "B.Des / BFA", desc: "Formal design education from NID, NIFT, or equivalent." },
      { year: "Year 2-3", title: "Portfolio Building", desc: "Work on real briefs, competitions, freelance projects." },
      { year: "Year 3+", title: "Specialize", desc: "Brand design, illustration, motion graphics, etc." }
    ],
    exams: ["NID DAT", "NIFT Entrance", "UCEED (for IIT design programs)"],
    colleges: ["NID Ahmedabad", "NIFT Delhi", "Symbiosis Pune", "MIT Pune", "Pearl Academy"],
    budgetColleges: ["State arts and design colleges", "Online: Skillshare, Behance portfolio route"],
    abroad: ["Parsons New York", "RISD", "School of Visual Arts NY", "Central Saint Martins", "ArtCenter"],
    investment: "\u20B93L - \u20B915L for B.Des in India. Self-taught + portfolio route is viable.",
    salaryExpectations: [
      { level: "Junior Designer (0-2 yrs)", amount: "\u20B92.5L - \u20B96L / year" },
      { level: "Mid Designer (3-5 yrs)", amount: "\u20B98L - \u20B918L / year" },
      { level: "Senior / Art Director", amount: "\u20B920L - \u20B950L / year" }
    ],
    dailyWork: ["Client briefs and mood boards", "Designing logos and brand assets", "Revision cycles with clients", "Staying updated on design trends"],
    firstOpportunity: "Freelance work on Fiverr/Upwork, internships at design agencies or marketing companies.",
    whoShould: ["Creative visual thinkers who love aesthetics", "People with an eye for detail and color", "Those who can handle client feedback"],
    whoShouldAvoid: ["Those who dislike criticism of their work", "People who need a 100% fixed income", "Anyone uncomfortable with subjective feedback"],
    harshReality: "AI tools like Midjourney and Adobe Firefly are automating basic design tasks. The future belongs to designers who can think strategically, not just execute visually.",
    industryInsights: "Brand identity and motion design are the premium niches right now. Designers who understand branding strategy \u2014 not just aesthetics \u2014 command 3x higher rates."
  },
  {
    id: "film-director",
    title: "Film Director / Filmmaker",
    category: "Creative & Media",
    description: "Bring stories to life on screen \u2014 direct films, web series, documentaries, or commercial content.",
    icon: Film,
    stats: { salary: "\u20B93L - \u20B950L+", demand: "Medium", difficulty: "Very High" },
    whyChoose: ["Creative expression at its highest", "Massive OTT boom in India", "International co-production opportunities", "High prestige and cultural impact"],
    skills: ["Screenplay Writing", "Direction", "Cinematography", "Editing", "Team Leadership"],
    paths: [
      { title: "Commercial Director", desc: "Direct ads and branded content \u2014 consistent income." },
      { title: "OTT / Web Series Director", desc: "Create content for Netflix, Amazon Prime, Hotstar." },
      { title: "Independent Filmmaker", desc: "Make passion projects, festival films, and art cinema." }
    ],
    timeline: [
      { year: "Class 11-12", title: "Any Stream", desc: "Start watching films critically. Write short scripts." },
      { year: "Year 1-3", title: "Film School / BFA", desc: "FTII, Satyajit Ray Film Institute, or Whistling Woods." },
      { year: "Year 3-5", title: "Short Films & ADs", desc: "Work as an Assistant Director on productions." },
      { year: "Year 6+", title: "First Feature", desc: "Debut with an independent short or web project." }
    ],
    exams: ["FTII Entrance Exam", "Satyajit Ray Film Institute Entrance", "Whistling Woods Entrance"],
    colleges: ["FTII Pune", "Satyajit Ray Film Institute Kolkata", "NSD Delhi", "Whistling Woods Mumbai"],
    budgetColleges: ["State film institutes", "YouTube/self-taught route with short films"],
    abroad: ["NYU Tisch School", "USC Cinematic Arts", "AFI Conservatory", "Columbia Film School"],
    investment: "\u20B92L - \u20B910L for film school in India. Equipment costs extra.",
    salaryExpectations: [
      { level: "AD / Short Film (0-4 yrs)", amount: "\u20B93L - \u20B98L / year" },
      { level: "Commercial Director (5-8 yrs)", amount: "\u20B910L - \u20B930L / year" },
      { level: "Feature Film Director", amount: "\u20B950L - \u20B9Crores / project" }
    ],
    dailyWork: ["Script breakdowns", "Location scouting", "Directing actors on set", "Post-production reviews", "Pitching projects to producers"],
    firstOpportunity: "Assist a known director, make short films for YouTube/OTT, or shoot music videos and corporate films.",
    whoShould: ["Visionary storytellers passionate about cinema", "Resilient people who can handle rejection", "Strong collaborators and communicators"],
    whoShouldAvoid: ["Those who dislike collaborative work", "People who need financial security early on", "Anyone uncomfortable with long, irregular hours"],
    harshReality: "95% of film school graduates never direct a feature film. The industry runs on connections, timing, and raw persistence. The OTT boom has created opportunities but also intense competition.",
    industryInsights: "India's OTT market is projected to reach \u20B935,000 Cr by 2030. Regional language content (Tamil, Telugu, Malayalam) is driving the biggest growth."
  },
  {
    id: "dentist",
    title: "Dentist (BDS)",
    category: "Healthcare",
    description: "Diagnose and treat oral health conditions, perform procedures, and build a clinical practice.",
    icon: Smile,
    stats: { salary: "\u20B94L - \u20B930L+", demand: "High", difficulty: "High" },
    whyChoose: ["High patient volume in India", "Own clinic potential from day one", "Better work-life balance than MBBS", "Respected medical profession"],
    skills: ["Manual Dexterity", "Patient Communication", "Oral Surgery", "Prosthodontics", "Clinical Diagnosis"],
    paths: [
      { title: "General Dentist", desc: "Run a full-service dental clinic." },
      { title: "Specialist (MDS)", desc: "Orthodontics, implantology, periodontics." },
      { title: "Academic / Research", desc: "Teach in dental colleges or pursue research." }
    ],
    timeline: [
      { year: "Class 11-12", title: "PCB Stream", desc: "Biology, Chemistry, Physics \u2014 NEET preparation." },
      { year: "Year 1-5", title: "BDS Degree", desc: "5-year degree including 1-year internship." },
      { year: "Year 6-8", title: "MDS (Optional)", desc: "Post-grad specialization via NEET-PG." },
      { year: "Year 6+", title: "Own Clinic", desc: "Many dentists open their own practice after BDS." }
    ],
    exams: ["NEET-UG", "NEET-PG (for MDS)"],
    colleges: ["Maulana Azad Dental College Delhi", "Manipal College of Dental Sciences", "KGMC Lucknow", "SRM Chennai"],
    budgetColleges: ["Government dental colleges via state quota (NEET rank-based)"],
    abroad: ["University of Michigan", "King's College London", "University of Melbourne", "NYU College of Dentistry"],
    investment: "\u20B910L - \u20B980L for BDS in India (govt vs private).",
    salaryExpectations: [
      { level: "Intern / Junior (0-2 yrs)", amount: "\u20B94L - \u20B910L / year" },
      { level: "Associate Dentist (3-5 yrs)", amount: "\u20B912L - \u20B930L / year" },
      { level: "Own Clinic / Specialist", amount: "\u20B930L - \u20B91Cr / year" }
    ],
    dailyWork: ["Patient consultations", "Fillings, extractions, root canals", "Making and fitting prosthetics", "Managing clinic operations"],
    firstOpportunity: "Work as an associate at an established dental clinic or dental chain like Clove or Sabka Dentist.",
    whoShould: ["People with precise, dexterous hands", "Patient-focused individuals", "Those interested in oral health and aesthetics"],
    whoShouldAvoid: ["Those who dislike close patient interaction", "People who can't handle standing for long hours", "Anyone squeamish about blood or pain"],
    harshReality: "Private dental college fees can be 70-80 Lakhs. Without MDS specialization, income growth is slow. Dental chains are squeezing solo practitioners with aggressive pricing.",
    industryInsights: "Cosmetic dentistry (veneers, aligners) is a booming premium segment. Dental chains like Clove and Sabka Dentist are expanding rapidly \u2014 good entry points for fresh BDS graduates."
  },
  {
    id: "physiotherapist",
    title: "Physiotherapist",
    category: "Healthcare",
    description: "Help patients recover from injuries and surgeries through physical rehabilitation and exercise therapy.",
    icon: Activity,
    stats: { salary: "\u20B93L - \u20B925L+", demand: "Medium", difficulty: "Medium" },
    whyChoose: ["Directly help people recover and heal", "Growing demand from sports and aging population", "Private practice freedom", "Lower study burden than MBBS"],
    skills: ["Anatomy & Exercise Science", "Manual Therapy", "Patient Communication", "Rehabilitation Planning", "Sports Physio"],
    paths: [
      { title: "Hospital Physiotherapist", desc: "Work in hospitals with post-surgical patients." },
      { title: "Sports Physiotherapist", desc: "Work with athletes and sports teams." },
      { title: "Own Clinic", desc: "Build a private rehabilitation practice." }
    ],
    timeline: [
      { year: "Class 11-12", title: "PCB Stream", desc: "Biology and chemistry focus." },
      { year: "Year 1-4.5", title: "BPT Degree", desc: "Bachelor of Physiotherapy \u2014 4.5 years including internship." },
      { year: "Year 5-6", title: "MPT (Optional)", desc: "Specialization in sports, neuro, or ortho physio." },
      { year: "Year 5+", title: "Clinical Practice", desc: "Join hospitals, clinics, or start own practice." }
    ],
    exams: ["NEET-UG (some colleges)", "State-level paramedical entrance exams"],
    colleges: ["AIIMS", "CMC Vellore", "Manipal", "MGM Mumbai", "NIMHANS Bangalore"],
    budgetColleges: ["Government physiotherapy colleges", "State medical university affiliated colleges"],
    abroad: ["McMaster Canada", "University of Melbourne", "Nottingham", "Western Ontario"],
    investment: "\u20B93L - \u20B920L for BPT in India.",
    salaryExpectations: [
      { level: "Junior PT (0-2 yrs)", amount: "\u20B93L - \u20B97L / year" },
      { level: "Senior PT (3-6 yrs)", amount: "\u20B98L - \u20B920L / year" },
      { level: "Sports PT / Own Clinic", amount: "\u20B925L - \u20B960L / year" }
    ],
    dailyWork: ["Patient assessments", "Designing rehabilitation programs", "Manual therapy sessions", "Tracking recovery progress", "Sports injury management"],
    firstOpportunity: "Hospital internships, sports club physio positions, or assisting senior practitioners.",
    whoShould: ["Empathetic people who love helping others recover", "Physically active individuals", "Those interested in sports medicine or rehabilitation"],
    whoShouldAvoid: ["Those who want desk jobs", "People who dislike physical work", "Anyone looking for very high early incomes"],
    harshReality: "Physiotherapy in India is still underpaid in hospitals. Private practice and sports physio are the only real paths to good income. Building a client base takes 3-5 years.",
    industryInsights: "India's sports ecosystem is booming post-Olympics and IPL. Sports physiotherapists working with clubs, teams, or academies are the highest earners in this field."
  },
  {
    id: "investment-banker",
    title: "Investment Banker",
    category: "Finance",
    description: "Advise corporations on fundraising, mergers, acquisitions, and capital markets.",
    icon: DollarSign,
    stats: { salary: "\u20B910L - \u20B91Cr+", demand: "Medium", difficulty: "Very High" },
    whyChoose: ["Among the highest starting salaries in finance", "Work on landmark deals", "Prestige and global exposure", "Fast track to financial mastery"],
    skills: ["Financial Modeling", "Valuation (DCF, Comps)", "Excel & PowerPoint", "Deal Execution", "Client Management"],
    paths: [
      { title: "Investment Banking Analyst", desc: "Build financial models and pitch books." },
      { title: "Vice President / Director", desc: "Manage client relationships and lead deal teams." },
      { title: "Managing Director", desc: "Originate deals and lead the firm's revenue." }
    ],
    timeline: [
      { year: "Class 11-12", title: "Commerce / PCM", desc: "Build math and analytical foundations." },
      { year: "Year 1-3", title: "B.Com / B.Tech / Economics", desc: "Top college matters a lot in IB recruitment." },
      { year: "Year 3-5", title: "MBA (IIM/Top MBA)", desc: "Most IBankers enter through top MBA programs." },
      { year: "Post-MBA", title: "Analyst / Associate", desc: "2-year analyst program at a bank." }
    ],
    exams: ["CAT / GMAT (for MBA)", "CFA (valuable certification)"],
    colleges: ["IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta", "XLRI", "ISB Hyderabad"],
    budgetColleges: ["FMS Delhi", "IIT + MBA route", "CFA self-study path"],
    abroad: ["Harvard Business", "Wharton", "London Business School", "INSEAD", "Columbia Business"],
    investment: "\u20B920L - \u20B940L for MBA in India. \u20B980L - \u20B91.5Cr for top MBA abroad.",
    salaryExpectations: [
      { level: "Analyst (0-2 yrs)", amount: "\u20B910L - \u20B925L / year" },
      { level: "Associate / VP (3-6 yrs)", amount: "\u20B930L - \u20B980L / year" },
      { level: "Director / MD", amount: "\u20B91Cr - \u20B9unlimited / year" }
    ],
    dailyWork: ["Building complex financial models", "Preparing pitch decks", "Client calls and meetings", "Due diligence on deals", "All-nighters before deal closings"],
    firstOpportunity: "Summer internships at banks during MBA \u2014 the most common entry point. Some enter via CFA + direct analyst programs.",
    whoShould: ["Highly driven individuals with finance obsession", "People who thrive under extreme pressure", "Competitive, ambitious, deal-hungry personalities"],
    whoShouldAvoid: ["Those who value work-life balance", "People who dislike high-pressure, long-hours culture", "Anyone looking for creativity in their daily work"],
    harshReality: "80-hour weeks are normal in the first 2 years. Burnout is an industry epidemic. The pay is exceptional, but your personal life essentially disappears during deal season.",
    industryInsights: "India's M&A market hit a record $100B+ in 2023. Private equity and venture capital are growing rapidly and often recruit directly from IB analyst programs."
  },
  {
    id: "financial-analyst",
    title: "Financial Analyst",
    category: "Finance",
    description: "Analyze financial data, market trends, and company performance to drive investment and business decisions.",
    icon: BarChart2,
    stats: { salary: "\u20B94L - \u20B935L+", demand: "High", difficulty: "Medium" },
    whyChoose: ["Stable, well-paying career", "Diverse industries to work in", "Strong CFA global certification pathway", "Foundation for investment management"],
    skills: ["Financial Modeling", "Excel", "CFA Preparation", "Bloomberg Terminal", "Data Analysis"],
    paths: [
      { title: "Equity Research Analyst", desc: "Analyze stocks and sectors for investment recommendations." },
      { title: "FP&A Analyst", desc: "Financial planning and analysis within corporations." },
      { title: "Portfolio Manager", desc: "Manage investment portfolios for clients or funds." }
    ],
    timeline: [
      { year: "Class 11-12", title: "Commerce / PCM", desc: "Math and accounts are critical foundations." },
      { year: "Year 1-3", title: "B.Com / BBA / Economics", desc: "SRCC, St. Xavier's, or reputed commerce colleges." },
      { year: "Year 3-5", title: "MBA / CFA", desc: "CFA is highly respected globally. IIM MBA is the premium path." },
      { year: "Year 4+", title: "Analyst Roles", desc: "Join banks, AMCs, or corporate finance teams." }
    ],
    exams: ["CAT / GMAT (for MBA)", "CFA Level 1, 2, 3"],
    colleges: ["SRCC Delhi", "St. Xavier's Mumbai", "Christ Bangalore", "IIM Indore", "Symbiosis Pune"],
    budgetColleges: ["FMS Delhi", "Delhi University B.Com", "Self-study CFA route"],
    abroad: ["NYU Stern", "University of Toronto", "LSE", "NUS Singapore", "HEC Paris"],
    investment: "\u20B92L - \u20B920L for graduation. CFA costs \u20B91.5L - \u20B93L for all 3 levels.",
    salaryExpectations: [
      { level: "Analyst (0-2 yrs)", amount: "\u20B94L - \u20B910L / year" },
      { level: "Senior Analyst (3-5 yrs)", amount: "\u20B912L - \u20B930L / year" },
      { level: "Manager / Director", amount: "\u20B935L - \u20B980L / year" }
    ],
    dailyWork: ["Building and updating financial models", "Market research and sector analysis", "Preparing investment reports", "Presenting to senior management", "Monitoring portfolio performance"],
    firstOpportunity: "Internships at AMCs, banks, or NBFCs. Many begin as research associates at equity research firms.",
    whoShould: ["Analytical minds who enjoy market research", "People comfortable with numbers and data", "Those who want to understand businesses deeply"],
    whoShouldAvoid: ["Those who dislike data-heavy, research work", "People who need creative expression", "Anyone who panics during market volatility"],
    harshReality: "The CFA is brutal \u2014 only 40-45% pass each level. Many financial analysts plateau at mid-management without an MBA from a top school.",
    industryInsights: "India's mutual fund industry crossed \u20B950 Lakh Cr in AUM. AMCs, PMS firms, and AIFs are all hiring analysts aggressively."
  },
  {
    id: "civil-services",
    title: "Civil Services (IAS / IPS)",
    category: "Government & Public Service",
    description: "Govern India \u2014 lead districts, implement policy, and shape public administration as an IAS or IPS officer.",
    icon: Landmark,
    stats: { salary: "\u20B956K - \u20B92.5L+/mo (+ perks)", demand: "Very High (competition)", difficulty: "Very High" },
    whyChoose: ["Unmatched power and authority", "Deep sense of public service", "Massive perks \u2014 bungalow, car, staff", "Stability and lifelong respect"],
    skills: ["Current Affairs", "Essay Writing", "Optional Subject Mastery", "Leadership", "Administrative Thinking"],
    paths: [
      { title: "IAS Officer", desc: "Collector, DM, Joint Secretary \u2014 administrative leadership." },
      { title: "IPS Officer", desc: "Police administration, law enforcement leadership." },
      { title: "IFS Officer", desc: "India's diplomatic corps \u2014 foreign postings." }
    ],
    timeline: [
      { year: "Class 11-12", title: "Any Stream", desc: "UPSC has no stream restriction \u2014 build reading habit early." },
      { year: "Year 1-3", title: "Graduation", desc: "Any degree works. History, Political Science, or Public Admin is useful." },
      { year: "Year 3-5", title: "UPSC Preparation", desc: "2-3 years of dedicated preparation is the average." },
      { year: "Year 5+", title: "Training at LBSNAA", desc: "Selected candidates train at the elite academy in Mussoorie." }
    ],
    exams: ["UPSC Civil Services Prelims", "UPSC Civil Services Mains", "UPSC Personality Test (Interview)"],
    colleges: ["St. Stephen's Delhi", "JNU", "Allahabad University \u2014 coaching: Vajiram, Vision IAS, Drishti IAS"],
    budgetColleges: ["Self-study route with free resources (NCERT, PYQs)", "Online coaching via Unacademy, Drishti"],
    abroad: ["N/A \u2014 India-specific exam"],
    investment: "\u20B950K - \u20B93L / year for coaching. Total preparation cost \u20B92L - \u20B910L.",
    salaryExpectations: [
      { level: "Probationer / SDM", amount: "\u20B956,000 - \u20B91L / month + perks" },
      { level: "DM / District Collector", amount: "\u20B91.2L - \u20B92L / month + perks" },
      { level: "Secretary / Senior IAS", amount: "\u20B92.5L / month + significant perks" }
    ],
    dailyWork: ["District administration", "Policy implementation", "Public grievance redressal", "Coordinating with government departments", "Media and public interface"],
    firstOpportunity: "The UPSC exam itself \u2014 there's no internship route. Foundation course at LBSNAA after selection.",
    whoShould: ["Service-minded, mission-driven individuals", "People with patience for long preparation journeys", "Those who love governance, law, and public policy"],
    whoShouldAvoid: ["Those who want fast financial returns", "People who dislike hierarchy and bureaucracy", "Anyone who can't sustain 2-3 years of intensive studying"],
    harshReality: "Only ~180 IAS officers are selected out of 1 million+ applicants per year. Most people take 3-5 attempts. If you're only in it for status, you won't survive the preparation.",
    industryInsights: "The average age of successful UPSC candidates is 26-27. Starting at Class 11 with newspaper reading and NCERT books gives a massive advantage."
  },
  {
    id: "army-officer",
    title: "Army Officer",
    category: "Government & Defence",
    description: "Lead and command Indian Army units \u2014 a life of discipline, adventure, and service to the nation.",
    icon: Star,
    stats: { salary: "\u20B956K - \u20B91.5L+/mo (+ allowances)", demand: "Stable", difficulty: "High" },
    whyChoose: ["Unmatched adventure and leadership experience", "High respect and prestige", "Excellent benefits \u2014 housing, healthcare, pension", "Structured career growth"],
    skills: ["Physical Fitness", "Leadership & Decision Making", "Weapons Training", "Military Strategy", "Team Management"],
    paths: [
      { title: "Combat Officer", desc: "Lead infantry, armoured, or artillery units." },
      { title: "Technical Officer", desc: "Engineers, signals, and EME corps." },
      { title: "Administrative / Staff", desc: "Education, legal, medical, and logistics branches." }
    ],
    timeline: [
      { year: "Class 11-12", title: "PCM / Any Stream", desc: "NDA requires PCM. CDS is open to all graduates." },
      { year: "After Class 12", title: "NDA Exam", desc: "Clear NDA written exam + SSB interview for direct entry." },
      { year: "Year 1-3", title: "NDA Training", desc: "3-year joint training at NDA, Pune." },
      { year: "Year 4+", title: "IMA Training", desc: "1-year officer training at Indian Military Academy, Dehradun." }
    ],
    exams: ["NDA Exam (UPSC)", "CDS Exam (UPSC)", "TES / SCO for technical entry"],
    colleges: ["NDA Pune", "IMA Dehradun", "OTA Chennai", "Indian Military Academy"],
    budgetColleges: ["Sainik Schools \u2014 excellent early preparation pathway"],
    abroad: ["Sandhurst UK (exchange)", "West Point USA (exchange)", "RMIT Australia"],
    investment: "Government-funded after selection. No tuition fees \u2014 stipend paid during training.",
    salaryExpectations: [
      { level: "Lieutenant / Captain", amount: "\u20B956K - \u20B91L / month + allowances" },
      { level: "Major / Colonel", amount: "\u20B91L - \u20B92L / month + allowances" },
      { level: "Brigadier / General", amount: "\u20B92.5L - \u20B95L / month + perks" }
    ],
    dailyWork: ["Physical training at 5 AM", "Commanding troops", "Planning operations and exercises", "Administrative duties", "Welfare of soldiers"],
    firstOpportunity: "NDA exam after Class 12 is the earliest entry. CDS exam after graduation is another route.",
    whoShould: ["Disciplined, patriotic, physically fit individuals", "Natural leaders who enjoy structure", "People who value service over salary"],
    whoShouldAvoid: ["Those who dislike physical fitness requirements", "People who need urban comforts", "Anyone who struggles with hierarchy"],
    harshReality: "Postings in remote areas (Kashmir, Northeast) are mandatory. Family separation is common. Promotions above Colonel are extremely competitive with many stagnating.",
    industryInsights: "The Agniveer scheme has changed short-term recruitment. Officer cadre remains prestigious. Ex-Army officers are highly valued in corporate security, logistics, and defense PSUs."
  },
  {
    id: "civil-engineer",
    title: "Civil Engineer",
    category: "Engineering",
    description: "Design, build, and maintain infrastructure \u2014 roads, bridges, buildings, dams, and water systems.",
    icon: HardHat,
    stats: { salary: "\u20B93.5L - \u20B930L+", demand: "High", difficulty: "Medium" },
    whyChoose: ["Physical, visible impact of your work", "Government and private sector opportunities", "GATE opens PSU and M.Tech doors", "Global infrastructure demand"],
    skills: ["AutoCAD", "STAAD Pro", "Structural Design", "Project Management", "Concrete & Steel Design"],
    paths: [
      { title: "Structural Engineer", desc: "Design buildings, bridges, and foundations." },
      { title: "Project Manager", desc: "Manage construction timelines and teams on site." },
      { title: "Government PSU Engineer", desc: "CPWD, NHAI, AAI \u2014 stable government roles via GATE." }
    ],
    timeline: [
      { year: "Class 11-12", title: "PCM Stream", desc: "Physics, Chemistry, Math \u2014 strong foundation needed." },
      { year: "Year 1-4", title: "B.Tech Civil Engineering", desc: "IIT, NIT, or government engineering colleges." },
      { year: "Year 4", title: "GATE / Campus Placements", desc: "GATE for PSU or M.Tech. Campus for consulting/construction firms." },
      { year: "Year 5+", title: "Site Experience", desc: "2-3 years of site work is essential for growth." }
    ],
    exams: ["JEE Main & Advanced", "GATE Civil Engineering"],
    colleges: ["IIT Roorkee", "IIT Bombay", "NIT Trichy", "BITS Pilani", "Delhi Technological University"],
    budgetColleges: ["State government engineering colleges", "NIT Warangal", "NIT Calicut"],
    abroad: ["MIT", "Imperial College London", "ETH Zurich", "University of Melbourne", "NTU Singapore"],
    investment: "\u20B95L - \u20B915L for B.Tech in India.",
    salaryExpectations: [
      { level: "Site Engineer (0-2 yrs)", amount: "\u20B93.5L - \u20B98L / year" },
      { level: "Senior Engineer (3-6 yrs)", amount: "\u20B910L - \u20B925L / year" },
      { level: "Project Manager / Director", amount: "\u20B930L - \u20B980L / year" }
    ],
    dailyWork: ["Reading construction drawings", "Site inspections", "Coordination with contractors", "Material testing", "Progress reporting"],
    firstOpportunity: "Site engineer with construction firms like L&T, Shapoorji, or government contractors. PSU via GATE.",
    whoShould: ["People who love building tangible things", "Those who enjoy outdoor project environments", "Analytical thinkers who want structural problem-solving"],
    whoShouldAvoid: ["Those who dislike outdoor work or site conditions", "People who prefer purely digital careers", "Anyone impatient with slow project timelines"],
    harshReality: "Civil engineering salaries in India are significantly lower than software engineering. Government PSU roles are stable but competitive via GATE. Private sector growth requires relocation to project sites.",
    industryInsights: "India's PM Gati Shakti and Smart Cities Mission are driving massive infrastructure investment. Real estate and urban infra are booming \u2014 creating strong demand for civil engineers."
  },
  {
    id: "mechanical-engineer",
    title: "Mechanical Engineer",
    category: "Engineering",
    description: "Design machines, manufacturing systems, and mechanical components that power industries.",
    icon: Settings,
    stats: { salary: "\u20B93.5L - \u20B930L+", demand: "Medium", difficulty: "High" },
    whyChoose: ["Foundation for many industries \u2014 auto, aerospace, manufacturing", "Gateway to IIT research and PSU roles", "Diverse specializations available", "Global manufacturing growth"],
    skills: ["CAD / CAM (SolidWorks, CATIA)", "Thermodynamics", "Manufacturing Processes", "ANSYS (FEA)", "Project Management"],
    paths: [
      { title: "Design Engineer", desc: "Design mechanical components and systems." },
      { title: "Manufacturing Engineer", desc: "Optimize production lines and manufacturing processes." },
      { title: "R&D Engineer", desc: "Research and develop new products in automotive or aerospace." }
    ],
    timeline: [
      { year: "Class 11-12", title: "PCM Stream", desc: "Physics and Math are critical." },
      { year: "Year 1-4", title: "B.Tech Mechanical", desc: "IIT, NIT, or BITS. Core engineering curriculum." },
      { year: "Year 4", title: "GATE / Placements", desc: "GATE for PSU or M.Tech. Campus for auto/manufacturing firms." },
      { year: "Year 5+", title: "Specialization", desc: "Robotics, automotive, aerospace, or industrial design." }
    ],
    exams: ["JEE Main & Advanced", "GATE Mechanical Engineering"],
    colleges: ["IIT Bombay", "IIT Delhi", "NIT Trichy", "BITS Pilani", "Jadavpur University"],
    budgetColleges: ["State engineering colleges", "NIT Warangal", "NIT Calicut"],
    abroad: ["MIT", "University of Michigan", "TU Munich", "ETH Zurich", "Imperial College London"],
    investment: "\u20B95L - \u20B915L for B.Tech in India.",
    salaryExpectations: [
      { level: "Graduate Engineer (0-2 yrs)", amount: "\u20B93.5L - \u20B98L / year" },
      { level: "Senior Engineer (3-6 yrs)", amount: "\u20B910L - \u20B925L / year" },
      { level: "Engineering Manager", amount: "\u20B930L - \u20B980L / year" }
    ],
    dailyWork: ["Creating CAD models", "Running simulations", "Factory floor coordination", "Vendor management", "Quality checks"],
    firstOpportunity: "Graduate Engineer Trainee (GET) programs at Tata Motors, Mahindra, L&T, or BHEL. PSU via GATE.",
    whoShould: ["People who love machines and how things work", "Hands-on, physical problem-solvers", "Math-oriented students interested in industry"],
    whoShouldAvoid: ["Those who dislike physical or manual technical work", "People who want purely desk-based careers", "Anyone uncomfortable with factory environments"],
    harshReality: "Mechanical engineering has lower starting salaries compared to CS. Automation and Industry 4.0 are reshaping the field. Those who add programming (Python, MATLAB) to their skill set earn significantly more.",
    industryInsights: "Electric vehicles (EV) and renewable energy are creating massive demand for mechanical engineers in new domains. ISRO, DRDO, and defense PSUs offer prestigious paths."
  },
  {
    id: "mba-manager",
    title: "MBA / Business Manager",
    category: "Business & Management",
    description: "Lead teams, manage business strategy, and drive organizational growth across functions.",
    icon: Users2,
    stats: { salary: "\u20B98L - \u20B960L+", demand: "High", difficulty: "High" },
    whyChoose: ["Opens doors across all industries", "Leadership fast-track", "High salaries post top MBA", "Network is the net worth"],
    skills: ["Strategic Thinking", "Leadership", "Financial Analysis", "Marketing", "Communication"],
    paths: [
      { title: "Management Consultant", desc: "Advise companies on strategy and operations." },
      { title: "General Manager", desc: "Run a P&L for a business unit or function." },
      { title: "Entrepreneur", desc: "Launch startups with an MBA's business acumen." }
    ],
    timeline: [
      { year: "Class 11-12", title: "Any Stream", desc: "MBA is a post-graduate degree \u2014 stream doesn't matter." },
      { year: "Year 1-3/4", title: "Any Graduation", desc: "Engineering is the most popular pre-MBA path in India." },
      { year: "Year 3-5", title: "Work Experience", desc: "2-3 years of work ex before MBA is ideal." },
      { year: "MBA (2 years)", title: "IIM / Top B-School", desc: "CAT is the gateway to IIMs. GMAT for abroad." }
    ],
    exams: ["CAT (for IIMs)", "GMAT (for abroad)", "XAT (for XLRI)", "SNAP (for Symbiosis)"],
    colleges: ["IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta", "FMS Delhi", "XLRI Jamshedpur"],
    budgetColleges: ["FMS Delhi (\u20B920K fees)", "IIM Indore / IIM Kozhikode", "NITIE Mumbai"],
    abroad: ["Harvard Business School", "Wharton", "INSEAD", "London Business School", "Stanford GSB"],
    investment: "\u20B920L - \u20B930L for IIMs. \u20B980L - \u20B91.5Cr for top MBA abroad.",
    salaryExpectations: [
      { level: "Management Trainee (0-2 yrs)", amount: "\u20B98L - \u20B920L / year" },
      { level: "Manager (3-6 yrs)", amount: "\u20B920L - \u20B960L / year" },
      { level: "Senior Manager / Director", amount: "\u20B960L - \u20B92Cr / year" }
    ],
    dailyWork: ["Strategic planning sessions", "Cross-functional team meetings", "Financial reviews", "Client or stakeholder presentations", "Hiring and team development"],
    firstOpportunity: "Campus placements at IIMs \u2014 consulting firms (McKinsey, BCG, Bain) and FMCG companies (HUL, P&G) are top recruiters.",
    whoShould: ["Leaders and strategic thinkers", "People who enjoy managing teams and business complexity", "Those who love networking and stakeholder management"],
    whoShouldAvoid: ["People who prefer purely technical, individual work", "Those who dislike networking", "Anyone not ready for the MBA investment"],
    harshReality: "Non-IIM MBAs often have poor ROI. The degree's value is 80% the network, not the curriculum. Without strong work experience or a top school, the MBA premium disappears.",
    industryInsights: "FMCG, consulting, and fintech are the top MBA recruiting sectors. Startup hiring from IIMs has tripled in the last 5 years."
  },
  {
    id: "marketing-manager",
    title: "Marketing Manager",
    category: "Business & Management",
    description: "Build and execute brand strategies, campaigns, and consumer engagement across digital and traditional channels.",
    icon: Megaphone,
    stats: { salary: "\u20B94L - \u20B935L+", demand: "High", difficulty: "Medium" },
    whyChoose: ["Creative + analytical blend", "Essential in every industry", "Fast-growing digital marketing boom", "Diverse specializations available"],
    skills: ["Digital Marketing", "Consumer Research", "Brand Strategy", "Analytics (Google/Meta)", "SEO / SEM / Content"],
    paths: [
      { title: "Brand Manager", desc: "Own the brand identity and communication strategy." },
      { title: "Performance Marketer", desc: "Run data-driven paid campaigns to acquire customers." },
      { title: "CMO", desc: "Lead the entire marketing function of an organization." }
    ],
    timeline: [
      { year: "Class 11-12", title: "Any Stream", desc: "Commerce or arts preferred, but engineers also excel in marketing." },
      { year: "Year 1-3", title: "BBA / B.Com / BA", desc: "Undergraduate degree + marketing internships." },
      { year: "Year 3-5", title: "MBA (Marketing)", desc: "MICA Ahmedabad is India's top specialized marketing school." },
      { year: "Year 3+", title: "Digital Certifications", desc: "Google, Meta, HubSpot certifications add real value." }
    ],
    exams: ["CAT / XAT (for MBA)", "MICAT (for MICA)"],
    colleges: ["IIM Ahmedabad", "IIM Bangalore", "MICA Ahmedabad", "Symbiosis", "IMT Ghaziabad"],
    budgetColleges: ["MICA Ahmedabad", "IMI Delhi", "IMT Ghaziabad"],
    abroad: ["Kellogg", "Wharton", "London Business School", "INSEAD", "Columbia Business"],
    investment: "\u20B910L - \u20B930L for MBA in India.",
    salaryExpectations: [
      { level: "Marketing Executive (0-2 yrs)", amount: "\u20B94L - \u20B910L / year" },
      { level: "Marketing Manager (3-6 yrs)", amount: "\u20B912L - \u20B930L / year" },
      { level: "Marketing Director / CMO", amount: "\u20B935L - \u20B91Cr / year" }
    ],
    dailyWork: ["Campaign planning and briefing", "Agency coordination", "Data analysis and reporting", "Brand reviews", "Consumer research and insights"],
    firstOpportunity: "Marketing trainee or associate roles at FMCG companies (HUL, P&G) or startups with growth teams.",
    whoShould: ["Creative + analytical thinkers", "People who love understanding consumers", "Those who enjoy working across teams"],
    whoShouldAvoid: ["Those who dislike both data and creativity", "People who want purely technical roles", "Anyone who can't handle ambiguous briefs"],
    harshReality: "Marketing is extremely results-driven. If your campaigns don't show ROI, you're out. Brand management at FMCG is prestigious but cut-throat.",
    industryInsights: "D2C (direct-to-consumer) brands are creating massive demand for digital-first marketers. Performance marketing specialists earn more than brand managers in many startups."
  },
  {
    id: "human-resources",
    title: "Human Resources (HR)",
    category: "Business & Management",
    description: "Attract, develop, and retain the people who make organizations thrive.",
    icon: UserCheck,
    stats: { salary: "\u20B93L - \u20B930L+", demand: "Medium", difficulty: "Medium" },
    whyChoose: ["Work at the heart of every organization", "Growing HR-tech transformation", "People-centric career", "Path to CHRO leadership"],
    skills: ["Recruitment & Talent Acquisition", "HRIS Systems", "Labour Law", "Performance Management", "Communication"],
    paths: [
      { title: "Talent Acquisition", desc: "Source, recruit, and onboard great people." },
      { title: "HR Business Partner (HRBP)", desc: "Align HR strategy with business goals." },
      { title: "CHRO", desc: "Chief Human Resources Officer \u2014 C-suite leadership." }
    ],
    timeline: [
      { year: "Class 11-12", title: "Any Stream", desc: "Commerce or arts with good communication skills." },
      { year: "Year 1-3", title: "BBA / BA / B.Com", desc: "Undergraduate with HR-focused subjects." },
      { year: "Year 3-5", title: "MBA (HR)", desc: "XLRI Jamshedpur is India's top HR-focused B-school." },
      { year: "Year 4+", title: "Specialization", desc: "Recruitment, L&D, compensation, or HR analytics." }
    ],
    exams: ["XAT (for XLRI)", "CAT (for IIMs)", "SNAP (for Symbiosis)"],
    colleges: ["XLRI Jamshedpur", "Tata Institute of Social Sciences", "IIM Ahmedabad", "Symbiosis", "SCMHRD Pune"],
    budgetColleges: ["TISS Mumbai (low fees)", "Regional MBA colleges", "IGNOU HR certifications"],
    abroad: ["Cornell ILR School", "Michigan Ross", "LSE", "Wharton", "INSEAD"],
    investment: "\u20B95L - \u20B925L for MBA in India.",
    salaryExpectations: [
      { level: "HR Executive (0-2 yrs)", amount: "\u20B93L - \u20B97L / year" },
      { level: "HR Manager / HRBP (3-6 yrs)", amount: "\u20B910L - \u20B925L / year" },
      { level: "HR Head / CHRO", amount: "\u20B930L - \u20B980L / year" }
    ],
    dailyWork: ["Screening resumes and interviewing candidates", "Onboarding new employees", "Handling grievances and conflicts", "Running performance reviews", "Policy and compliance management"],
    firstOpportunity: "HR intern or recruitment coordinator roles at staffing agencies or large corporates.",
    whoShould: ["People-oriented, empathetic communicators", "Good listeners with emotional intelligence", "Those who enjoy organizational problem-solving"],
    whoShouldAvoid: ["Introverts who dislike people interaction", "Those who need highly technical or creative work", "Anyone who can't handle ambiguity in people situations"],
    harshReality: "HR is often the first department to be cut during layoffs. Senior HR roles are highly political. Without an MBA from a top school, salary growth is slow.",
    industryInsights: "HR-tech (Darwinbox, Keka, Workday) is transforming the function. HR professionals who understand people analytics and AI-driven recruitment have significantly better career prospects."
  },
  {
    id: "pilot",
    title: "Commercial Pilot",
    category: "Aviation & Transport",
    description: "Fly commercial aircraft and cargo planes \u2014 a glamorous, high-skill career in the skies.",
    icon: Plane,
    stats: { salary: "\u20B910L - \u20B980L+", demand: "High", difficulty: "High" },
    whyChoose: ["Among the most glamorous careers", "Very high mid-career salaries", "Explore the world as part of the job", "Strong demand with India's aviation boom"],
    skills: ["Flight Operations", "Navigation", "Meteorology", "Aircraft Systems", "English Proficiency"],
    paths: [
      { title: "Commercial Airline Pilot", desc: "Fly passengers on domestic and international routes." },
      { title: "Cargo Pilot", desc: "Fly freight \u2014 often better hours, good pay." },
      { title: "Corporate / Charter Pilot", desc: "Fly private jets for HNIs and corporations." }
    ],
    timeline: [
      { year: "Class 11-12", title: "PCM Stream", desc: "Physics and Math are mandatory. Perfect eyesight required." },
      { year: "Year 1-2", title: "Student Pilot License", desc: "SPL from DGCA-approved flying school." },
      { year: "Year 2-3", title: "Commercial Pilot License (CPL)", desc: "250+ flying hours required for CPL." },
      { year: "Year 3+", title: "Type Rating + Airline", desc: "Airlines sponsor type rating \u2014 join as First Officer." }
    ],
    exams: ["DGCA Medical Examination", "DGCA Written Tests (Air Regulations, Navigation, Meteorology, Technical)"],
    colleges: ["Indira Gandhi RAI Chandigarh", "NFTI Gondia", "CAE Oxford Aviation India", "Bombay Flying Club"],
    budgetColleges: ["Government flying clubs (Mumbai, Delhi) \u2014 cheaper but longer queues"],
    abroad: ["Embry-Riddle USA", "L3 Harris UK", "CAE Australia", "ATP Flight School USA"],
    investment: "\u20B940L - \u20B980L for CPL in India. \u20B960L - \u20B91Cr abroad. Airlines then sponsor type rating.",
    salaryExpectations: [
      { level: "First Officer (0-3 yrs)", amount: "\u20B910L - \u20B918L / year" },
      { level: "Senior First Officer (4-7 yrs)", amount: "\u20B925L - \u20B960L / year" },
      { level: "Captain (8+ yrs)", amount: "\u20B960L - \u20B91.5Cr / year" }
    ],
    dailyWork: ["Pre-flight checks", "Coordinating with ATC", "Flying routes", "Managing in-flight systems", "Post-flight paperwork"],
    firstOpportunity: "Cadet programs by IndiGo, Air India, or direct CPL \u2192 First Officer at regional airlines.",
    whoShould: ["Disciplined, calm-under-pressure individuals", "People fascinated by aviation and travel", "Those with excellent communication and English"],
    whoShouldAvoid: ["Anyone with eyesight or medical issues (strict DGCA norms)", "People who dislike responsibility for others' safety", "Those who need a fixed-city lifestyle"],
    harshReality: "The \u20B960-80L CPL investment is front-loaded \u2014 you earn low as First Officer for 3-4 years. Airlines have been known to shut down (Kingfisher, Jet) leaving pilots stranded mid-career.",
    industryInsights: "India needs 9,000 pilots by 2030 (CAPA report). IndiGo's massive fleet expansion and new airlines like Akasa have created strong demand. This is one of the best times to become a pilot in India."
  },
  {
    id: "fashion-designer",
    title: "Fashion Designer",
    category: "Creative & Design",
    description: "Create clothing, accessories, and fashion collections that blend aesthetics, culture, and commercial appeal.",
    icon: Scissors,
    stats: { salary: "\u20B92.5L - \u20B925L+", demand: "Medium", difficulty: "High" },
    whyChoose: ["Creative expression through fashion", "India's booming textile and fashion industry", "Own brand / label potential", "Growing global interest in Indian fashion"],
    skills: ["Sketching & Illustration", "Textile Knowledge", "Trend Research", "Pattern Making", "CAD for Fashion"],
    paths: [
      { title: "Apparel Designer", desc: "Design ready-to-wear collections for brands." },
      { title: "Haute Couture / Bridal", desc: "High-end bespoke designs for weddings and shows." },
      { title: "Own Fashion Label", desc: "Build a brand around your aesthetic vision." }
    ],
    timeline: [
      { year: "Class 11-12", title: "Any Stream", desc: "Arts preferred. Build portfolio of sketches and designs." },
      { year: "Year 1-4", title: "B.Des (Fashion)", desc: "NIFT, NID, or Pearl Academy degree." },
      { year: "Year 3-4", title: "Internships", desc: "Work with established designers like Manish Malhotra, Sabyasachi." },
      { year: "Year 5+", title: "Own Label or Brand", desc: "Many designers launch their own label within 5 years." }
    ],
    exams: ["NIFT Entrance (GAT + CAT + Situation Test)", "NID DAT", "UCEED (for B.Des at IITs)"],
    colleges: ["NIFT Delhi", "NID Ahmedabad", "Pearl Academy Delhi", "Symbiosis Design", "IIAD Delhi"],
    budgetColleges: ["State fashion and design institutes", "NIFT campuses in smaller cities"],
    abroad: ["Central Saint Martins London", "Parsons New York", "ESMOD Paris", "Fashion Institute of Technology NY"],
    investment: "\u20B95L - \u20B915L for B.Des in India.",
    salaryExpectations: [
      { level: "Design Assistant (0-2 yrs)", amount: "\u20B92.5L - \u20B96L / year" },
      { level: "Designer (3-5 yrs)", amount: "\u20B98L - \u20B920L / year" },
      { level: "Design Head / Own Brand", amount: "\u20B925L - \u20B91Cr / year" }
    ],
    dailyWork: ["Sketching design concepts", "Fabric sourcing and selection", "Pattern cutting and fitting", "Trend analysis", "Photoshoots and lookbook creation"],
    firstOpportunity: "Internships at fashion houses, styling studios, or apparel companies during college.",
    whoShould: ["Highly creative with a strong sense of aesthetics", "Trend-aware, culturally curious individuals", "Those passionate about clothing, fabrics, and style"],
    whoShouldAvoid: ["Those who dislike manual craft work", "People who need quick financial returns", "Anyone who can't handle slow brand building"],
    harshReality: "India's fashion industry is glamorous but notoriously underpaid at junior levels. Assisting top designers pays very little. Own label success takes 5-8 years of loss-making before profitability.",
    industryInsights: "Indian bridal wear is a \u20B980,000 Cr market. Sustainable and handloom fashion is gaining global traction. D2C fashion brands (House of Masaba, Rare Rabbit) are disrupting traditional retail."
  },
  {
    id: "photographer",
    title: "Photographer / Videographer",
    category: "Creative & Media",
    description: "Capture the world through your lens \u2014 from weddings and portraits to commercial campaigns and documentaries.",
    icon: Camera,
    stats: { salary: "\u20B92L - \u20B925L+", demand: "Medium", difficulty: "Medium" },
    whyChoose: ["Creative freedom and expression", "High demand for wedding and commercial work", "Freelance potential", "Global content creation economy"],
    skills: ["Camera & Lighting Techniques", "Adobe Lightroom & Premiere", "Composition", "Client Management", "Social Media Portfolio"],
    paths: [
      { title: "Wedding / Portrait Photographer", desc: "High-demand, high-income in India's wedding market." },
      { title: "Commercial Photographer", desc: "Shoot for brands, magazines, and advertising." },
      { title: "Documentary Filmmaker", desc: "Tell real-world stories through video." }
    ],
    timeline: [
      { year: "Class 11-12", title: "Any Stream", desc: "Start shooting immediately \u2014 camera is the best classroom." },
      { year: "Year 1-3", title: "Formal Education (Optional)", desc: "NID, FTII, or photography schools \u2014 portfolio is key." },
      { year: "Year 2-3", title: "Assisting + Portfolio", desc: "Work as a photo assistant to a known photographer." },
      { year: "Year 3+", title: "Own Clientele", desc: "Build client base via Instagram and word-of-mouth." }
    ],
    exams: ["NID DAT (if pursuing formal design path)", "FTII entrance (for filmmaking)"],
    colleges: ["NID Ahmedabad", "FTII Pune", "Symbiosis", "Delhi College of Photography", "Light & Life Academy Ooty"],
    budgetColleges: ["Online courses (Skillshare, Udemy)", "Self-taught with portfolio \u2014 very viable"],
    abroad: ["Brooks Institute USA", "New York Film Academy", "SAE Institute", "ICP New York"],
    investment: "\u20B91L - \u20B95L for camera equipment. \u20B92L - \u20B910L for formal education if pursued.",
    salaryExpectations: [
      { level: "Assistant / Junior (0-2 yrs)", amount: "\u20B92L - \u20B95L / year" },
      { level: "Mid-Level Freelancer (3-5 yrs)", amount: "\u20B96L - \u20B918L / year" },
      { level: "Senior / Commercial", amount: "\u20B925L - \u20B9unlimited / year" }
    ],
    dailyWork: ["Shooting sessions", "Photo editing in Lightroom", "Client communication", "Instagram portfolio management", "Equipment maintenance"],
    firstOpportunity: "Assist a professional wedding or commercial photographer. Shoot for free for friends and build portfolio.",
    whoShould: ["Visual storytellers with an eye for light and composition", "Patient, detail-oriented individuals", "Entrepreneurial people comfortable with freelance uncertainty"],
    whoShouldAvoid: ["Those who dislike equipment handling or outdoor work", "People who need predictable monthly income", "Anyone uncomfortable with rejection from clients"],
    harshReality: "Smartphone cameras have commoditized basic photography. Survival requires either premium positioning (luxury weddings) or specializing in commercial/advertising work. Building to \u20B910L+ takes 3-5 years.",
    industryInsights: "India's wedding market is \u20B94 Lakh Cr \u2014 wedding photographers at the premium end earn \u20B95-15L per wedding. Brand content and Instagram photography for D2C brands is a new high-income stream."
  },
  {
    id: "event-manager",
    title: "Event Manager",
    category: "Business & Hospitality",
    description: "Plan, coordinate, and execute events \u2014 from corporate conferences to large-scale weddings and concerts.",
    icon: CalendarDays,
    stats: { salary: "\u20B92.5L - \u20B925L+", demand: "Medium", difficulty: "Medium" },
    whyChoose: ["Dynamic, no-two-days-alike career", "India's massive events and wedding market", "Strong networking opportunities", "High income potential with own firm"],
    skills: ["Project Management", "Vendor & Budget Management", "Communication", "Logistics Coordination", "Crisis Management"],
    paths: [
      { title: "Corporate Event Manager", desc: "Plan conferences, product launches, and townhalls." },
      { title: "Wedding Planner", desc: "Coordinate India's extravagant wedding celebrations." },
      { title: "Concert / Entertainment Manager", desc: "Handle music concerts, shows, and large-scale events." }
    ],
    timeline: [
      { year: "Class 11-12", title: "Any Stream", desc: "Organize college events \u2014 great practical training." },
      { year: "Year 1-3", title: "BBA / Event Management Diploma", desc: "NIEM, Amity, or hospitality management programs." },
      { year: "Year 3-4", title: "Internships & Coordination", desc: "Work as event coordinator with an established agency." },
      { year: "Year 5+", title: "Own Agency", desc: "Many event managers start their own firm after 5-6 years." }
    ],
    exams: ["Hotel Management entrance (NCHMCT JEE)", "BBA entrance exams"],
    colleges: ["NIEM Mumbai", "Amity University", "IGNOU Event Management", "Symbiosis", "IHM Aurangabad"],
    budgetColleges: ["IGNOU event management certification", "State hospitality institutes"],
    abroad: ["George Washington University", "UNLV Hospitality", "Glion Institute Switzerland", "Les Roches"],
    investment: "\u20B92L - \u20B910L for formal education. Bootstrapping with personal clients is viable.",
    salaryExpectations: [
      { level: "Coordinator (0-2 yrs)", amount: "\u20B92.5L - \u20B96L / year" },
      { level: "Manager (3-5 yrs)", amount: "\u20B98L - \u20B920L / year" },
      { level: "Director / Own Agency", amount: "\u20B925L - \u20B960L / year" }
    ],
    dailyWork: ["Vendor calls and negotiations", "Site visits and setup coordination", "Budget tracking", "Client brief sessions", "On-ground event execution"],
    firstOpportunity: "Intern at event agencies or wedding planning companies. Volunteer for large college festivals.",
    whoShould: ["Organized people who love managing multiple moving parts", "Energetic, people-oriented individuals", "Those who thrive under pressure and chaos"],
    whoShouldAvoid: ["Those who dislike irregular hours", "People who need a calm, predictable environment", "Anyone who struggles with high-pressure last-minute problem-solving"],
    harshReality: "Event management looks glamorous but involves extreme stress, late nights, and difficult clients. The salary trajectory is slow unless you start your own venture or specialize in luxury events.",
    industryInsights: "India's MICE (Meetings, Incentives, Conferences, Exhibitions) market is growing at 15% annually. Destination weddings and experiential events are the premium segment \u2014 wedding planners charging \u20B95-20L per event."
  },
  {
    id: "hotel-management",
    title: "Hotel Management / Hospitality",
    category: "Business & Hospitality",
    description: "Manage the operations, guest experience, and business of hotels, restaurants, and hospitality brands.",
    icon: Hotel,
    stats: { salary: "\u20B92.5L - \u20B930L+", demand: "Medium", difficulty: "Medium" },
    whyChoose: ["Global career with opportunities everywhere", "Leadership from young age", "Travel perks and international postings", "India's tourism boom"],
    skills: ["Guest Relations", "F&B Management", "Housekeeping Operations", "Front Office", "Revenue Management"],
    paths: [
      { title: "Hotel Operations Manager", desc: "Run the day-to-day of a full-service hotel." },
      { title: "Restaurant / F&B Manager", desc: "Manage food and beverage operations." },
      { title: "Revenue / Yield Manager", desc: "Optimize room pricing and hotel profitability." }
    ],
    timeline: [
      { year: "Class 11-12", title: "Any Stream", desc: "Good communication skills matter more than stream." },
      { year: "Year 1-3", title: "B.Sc Hotel Management", desc: "NCHMCT JEE for IHMs. 3-year program." },
      { year: "Year 2-3", title: "Industrial Training", desc: "6-month training at a 5-star hotel \u2014 very important." },
      { year: "Year 4+", title: "Management Trainee", desc: "Fast-track management program at hotel chains." }
    ],
    exams: ["NCHMCT JEE (National Hotel Management Joint Entrance Exam)"],
    colleges: ["IHM Pusa Delhi", "IHM Aurangabad", "Oberoi STEP Program", "Taj SATS", "Christ Bangalore"],
    budgetColleges: ["Government IHMs across India (\u20B950K - \u20B92L fees)", "State hospitality institutes"],
    abroad: ["Glion Institute Switzerland", "Les Roches", "Cornell Hotel Administration", "EHL Switzerland"],
    investment: "\u20B92L - \u20B910L for IHM in India. Oberoi STEP is free with stipend.",
    salaryExpectations: [
      { level: "Management Trainee (0-2 yrs)", amount: "\u20B92.5L - \u20B96L / year" },
      { level: "Manager (3-6 yrs)", amount: "\u20B98L - \u20B920L / year" },
      { level: "GM / VP Operations", amount: "\u20B925L - \u20B970L / year" }
    ],
    dailyWork: ["Morning briefings with department heads", "Guest complaint resolution", "Inspecting rooms and kitchens", "Reviewing revenue reports", "Team training"],
    firstOpportunity: "Industrial training at 5-star hotels during college. Oberoi STEP and Taj Management Trainee programs are the most prestigious.",
    whoShould: ["Service-minded people who love making guests happy", "People who enjoy food, travel, and operations", "Good communicators with a positive attitude"],
    whoShouldAvoid: ["Those who dislike shift work, weekends, and holidays", "People who need work-life balance early on", "Anyone who dislikes customer-facing pressure"],
    harshReality: "Hotel management involves working on Christmas, Diwali, and New Year \u2014 when everyone else is celebrating. Early career salaries are low. Progress requires moving cities (and countries).",
    industryInsights: "India's domestic tourism has hit record levels post-COVID. Budget hotels (OYO, FabHotels) and luxury resorts (IHCL, ITC) are both expanding. Revenue management is the highest-paying hotel function."
  },
  {
    id: "social-worker",
    title: "Social Worker / NGO",
    category: "Social Sciences",
    description: "Work with communities, marginalized groups, and NGOs to create social change and development.",
    icon: Heart,
    stats: { salary: "\u20B92L - \u20B920L+", demand: "Stable", difficulty: "Medium" },
    whyChoose: ["Deep sense of purpose and fulfillment", "Work on causes that matter", "International development opportunities", "Policy-shaping impact"],
    skills: ["Community Development", "Project Management", "Fundraising", "Report Writing", "Communication"],
    paths: [
      { title: "NGO Program Officer", desc: "Design and implement social programs." },
      { title: "CSR Manager", desc: "Manage corporate social responsibility for large companies." },
      { title: "Policy Researcher", desc: "Research and advise on government social policy." }
    ],
    timeline: [
      { year: "Class 11-12", title: "Any Stream", desc: "Arts and social sciences preferred." },
      { year: "Year 1-3", title: "BA Social Work / Sociology", desc: "Undergraduate in social work, sociology, or related fields." },
      { year: "Year 3-5", title: "MSW (Master of Social Work)", desc: "TISS is the gold standard for social work in India." },
      { year: "Year 5+", title: "Field Work", desc: "Ground-level implementation with NGOs or UN agencies." }
    ],
    exams: ["TISS Entrance (TISS-NET)", "CUET for central universities", "State social work entrance exams"],
    colleges: ["TISS Mumbai", "Delhi School of Social Work", "Jamia Millia Delhi", "NLSIU Bangalore", "Christ Bangalore"],
    budgetColleges: ["Government universities with social work programs", "Ignou MSW \u2014 affordable distance learning"],
    abroad: ["Columbia SIPA", "LSE", "Oxford", "University of Chicago", "Brandeis University"],
    investment: "\u20B91L - \u20B98L for MSW in India. International NGO roles often sponsor training.",
    salaryExpectations: [
      { level: "Field Worker / Intern (0-2 yrs)", amount: "\u20B92L - \u20B95L / year" },
      { level: "Program Officer (3-5 yrs)", amount: "\u20B95L - \u20B915L / year" },
      { level: "Director / CSR Head", amount: "\u20B915L - \u20B940L / year" }
    ],
    dailyWork: ["Community meetings and field visits", "Grant writing and donor reporting", "Program design and monitoring", "Stakeholder coordination", "Research and documentation"],
    firstOpportunity: "Field internships with NGOs during MSW. UN agencies, UNICEF, and Teach For India hire freshers.",
    whoShould: ["Compassionate, mission-driven individuals", "Resilient people who can handle emotional work", "Those who prioritize impact over income"],
    whoShouldAvoid: ["Those who need high financial returns quickly", "People who get emotionally drained easily", "Anyone who lacks patience for slow systemic change"],
    harshReality: "Social work salaries are significantly lower than corporate careers. Grant-funded NGOs face funding uncertainty. The emotional toll of working with trauma and poverty is real and underestimated.",
    industryInsights: "CSR roles in corporates pay 3x more than NGO roles for the same work. International development agencies (World Bank, UNDP, USAID) offer excellent pay for experienced professionals."
  },
  {
    id: "teacher",
    title: "Teacher / Educator",
    category: "Education",
    description: "Shape the next generation through teaching in schools, coaching institutes, or online platforms.",
    icon: BookOpen,
    stats: { salary: "\u20B92L - \u20B920L+", demand: "High", difficulty: "Low" },
    whyChoose: ["Deeply fulfilling sense of impact", "Job stability \u2014 especially government schools", "Summer vacations and school holidays", "Growing EdTech income multiplier"],
    skills: ["Subject Expertise", "Communication & Clarity", "Lesson Planning", "Student Psychology", "Digital Teaching Tools"],
    paths: [
      { title: "School Teacher", desc: "Teach in CBSE/ICSE or government schools." },
      { title: "Coaching Institute Faculty", desc: "Teach at institutes like FIITJEE, Allen, Aakash." },
      { title: "Online Educator / YouTuber", desc: "Build a subject-specific audience and monetize teaching." }
    ],
    timeline: [
      { year: "Class 11-12", title: "Any Stream", desc: "Master your chosen subject deeply." },
      { year: "Year 1-3", title: "Graduation (Subject-specific)", desc: "B.Sc, B.A., B.Com in your teaching subject." },
      { year: "Year 3-4", title: "B.Ed Degree", desc: "Bachelor of Education \u2014 mandatory for school teaching." },
      { year: "Year 4+", title: "TET / CTET / School", desc: "Clear Teacher Eligibility Test for government or private schools." }
    ],
    exams: ["CTET (Central Teacher Eligibility Test)", "State TET exams", "CUET for subject graduation"],
    colleges: ["Any university + B.Ed college", "DIET (District Institute of Education and Training)", "Regional Institute of Education", "IGNOU B.Ed"],
    budgetColleges: ["Government B.Ed colleges (\u20B910K - \u20B950K fees)", "IGNOU distance B.Ed"],
    abroad: ["University of Helsinki", "Stanford Graduate School of Education", "UCL Institute of Education", "Harvard Graduate School of Education"],
    investment: "\u20B950K - \u20B93L for B.Ed in India.",
    salaryExpectations: [
      { level: "Private School Teacher (0-3 yrs)", amount: "\u20B92L - \u20B95L / year" },
      { level: "Senior Teacher / HOD (5-10 yrs)", amount: "\u20B95L - \u20B915L / year" },
      { level: "Government Teacher / Principal", amount: "\u20B98L - \u20B920L / year + benefits" }
    ],
    dailyWork: ["Lesson preparation", "Classroom teaching", "Correcting assignments and tests", "Parent-teacher meetings", "Extracurricular supervision"],
    firstOpportunity: "Teaching assistant roles, tuition classes, or substitute teaching while pursuing B.Ed.",
    whoShould: ["Patient, communicative people who love children or youth", "Subject enthusiasts who enjoy sharing knowledge", "Those who value impact over income"],
    whoShouldAvoid: ["Those who dislike repetition or structured environments", "People who need high early income", "Anyone who finds children's energy overwhelming"],
    harshReality: "Private school teacher salaries in India are shockingly low \u2014 often \u20B915K-\u20B925K/month. Government school jobs (via TET) are well-paid and stable but very competitive. The real money is in coaching institutes or online teaching.",
    industryInsights: "Star teachers on Unacademy and PhysicsWallah earn \u20B950L - \u20B93Cr annually. Khan Academy's model has proven that great teachers can reach millions. Building a subject-specific YouTube channel is the biggest income multiplier for educators today."
  },
  {
    id: "ed-tech",
    title: "Ed-Tech / Online Educator",
    category: "Education & Technology",
    description: "Create online courses, teach on platforms like Unacademy or YouTube, and build an educational brand.",
    icon: Monitor,
    stats: { salary: "\u20B93L - \u20B950L+", demand: "High", difficulty: "Medium" },
    whyChoose: ["Scalable income \u2014 teach once, reach millions", "Location independence", "Explosive EdTech market in India", "Own brand and audience building"],
    skills: ["Video Production & Editing", "Content Creation", "LMS Tools (Teachable, Thinkific)", "SEO & Marketing", "Teaching & Communication"],
    paths: [
      { title: "Platform Educator", desc: "Teach on Unacademy, Vedantu, BYJU's, or PhysicsWallah." },
      { title: "Course Creator", desc: "Build and sell courses on Udemy, Teachable, or own website." },
      { title: "Ed-Tech Founder", desc: "Start an EdTech company targeting a learning niche." }
    ],
    timeline: [
      { year: "Year 1", title: "Subject Mastery", desc: "Deep expertise in your teaching domain." },
      { year: "Year 1-2", title: "Content Creation Start", desc: "Begin a YouTube channel or create a pilot course." },
      { year: "Year 2-3", title: "Audience Building", desc: "Consistent content \u2192 community \u2192 paid subscribers." },
      { year: "Year 3+", title: "Monetization", desc: "Platform deals, sponsorships, courses, or consultancy." }
    ],
    exams: ["No specific exams \u2014 expertise and content quality drive success"],
    colleges: ["Skill-based \u2014 any degree", "IIM for business side", "IITs for STEM teaching"],
    budgetColleges: ["Self-taught + YouTube route \u2014 zero cost to start"],
    abroad: ["Stanford, MIT (for EdX/Coursera inspiration)", "Harvard Graduate School of Education"],
    investment: "\u20B920K - \u20B91L for camera, microphone, and editing software to start.",
    salaryExpectations: [
      { level: "Early Phase (0-2 yrs)", amount: "\u20B93L - \u20B98L / year" },
      { level: "Growing Educator (3-5 yrs)", amount: "\u20B910L - \u20B925L / year" },
      { level: "Star Educator / Founder", amount: "\u20B930L - \u20B9Crores / year" }
    ],
    dailyWork: ["Recording and editing videos", "Answering student doubts online", "Content calendar planning", "Marketing and SEO work", "Platform analytics review"],
    firstOpportunity: "Upload your first 10 videos on YouTube for free. Apply to teach on Unacademy or Vedantu \u2014 they onboard quality educators actively.",
    whoShould: ["Educators with entrepreneurial mindset", "People who love teaching + technology", "Self-motivated content creators"],
    whoShouldAvoid: ["Those who dislike being on camera", "People who need immediate income stability", "Anyone uncomfortable with solo, self-directed work"],
    harshReality: "90% of YouTube educators never cross 1,000 subscribers. The top 1% (PhysicsWallah, Unacademy stars) earn crores, but they represent an extreme exception. Consistent content for 2-3 years before real income is the reality.",
    industryInsights: "India's EdTech market is $7.5B and growing. After BYJU's collapse, content-led authentic educators are winning over VC-funded, marketing-heavy platforms. Quality content + trust = the new EdTech moat."
  },
  {
    id: "journalist",
    title: "Journalist / Media",
    category: "Media & Communication",
    description: "Report, investigate, and communicate news and stories that inform and shape public opinion.",
    icon: Newspaper,
    stats: { salary: "\u20B92.5L - \u20B925L+", demand: "Stable", difficulty: "Medium" },
    whyChoose: ["Front-row seat to history", "Influence public discourse", "Diverse beats \u2014 sports, politics, tech, business", "Digital journalism is growing"],
    skills: ["Writing & Reporting", "Research & Fact-Checking", "Video Production", "Digital Tools", "Source Building"],
    paths: [
      { title: "Print / Digital Journalist", desc: "Write for newspapers, magazines, or news websites." },
      { title: "TV Journalist / Anchor", desc: "Report for television news channels." },
      { title: "Investigative Journalist", desc: "Deep-dive investigations for premium publications." }
    ],
    timeline: [
      { year: "Class 11-12", title: "Humanities Stream", desc: "English, Political Science \u2014 start reading newspapers daily." },
      { year: "Year 1-3", title: "BA English / Journalism", desc: "Undergraduate degree in mass communication or journalism." },
      { year: "Year 3-5", title: "PG Diploma / Masters", desc: "IIMC, ACJ, or Symbiosis postgraduate programs." },
      { year: "Year 4+", title: "Beat Coverage", desc: "Cover a specific beat \u2014 politics, business, sports, or tech." }
    ],
    exams: ["IIMC Entrance Exam", "AJK MCRC Jamia entrance", "Xavier's Mumbai entrance"],
    colleges: ["IIMC Delhi", "Symbiosis Pune", "AJK MCRC Jamia", "Xavier's Mumbai", "Makhanlal Chaturvedi University"],
    budgetColleges: ["IIMC Delhi (\u20B960K fees)", "Government mass communication colleges", "State journalism institutes"],
    abroad: ["Columbia Journalism School", "Northwestern Medill", "Cardiff Journalism", "Reuters Institute Oxford"],
    investment: "\u20B91L - \u20B95L for mass communication in India.",
    salaryExpectations: [
      { level: "Reporter / Correspondent (0-2 yrs)", amount: "\u20B92.5L - \u20B96L / year" },
      { level: "Senior Reporter / Editor (3-6 yrs)", amount: "\u20B98L - \u20B920L / year" },
      { level: "Editor-in-Chief / Anchor", amount: "\u20B925L - \u20B980L / year" }
    ],
    dailyWork: ["Sourcing and verifying stories", "Interviewing sources", "Writing and editing copy", "Social media publishing", "Meeting broadcast deadlines"],
    firstOpportunity: "Internships at local newspapers, digital news portals (The Wire, Scroll, Inc42), or regional TV channels.",
    whoShould: ["Curious, communicative people who love current affairs", "Strong writers with an instinct for stories", "Those who can work under deadline pressure"],
    whoShouldAvoid: ["Those who dislike public scrutiny or irregular hours", "People who need a calm, structured routine", "Anyone uncomfortable with controversial topics"],
    harshReality: "Traditional journalism jobs are shrinking as ad revenues collapse. Salaries at most Indian media houses are shockingly low. Press freedom rankings show India is a challenging environment for investigative reporters.",
    industryInsights: "Independent digital journalism (The Ken, The Morning Context, Newslaundry) and newsletter journalism are growing. Journalists who build personal audiences on social media earn 3-5x their publication salary."
  },
  {
    id: "public-relations",
    title: "Public Relations (PR)",
    category: "Media & Communication",
    description: "Manage the public image and communications of brands, individuals, and organizations.",
    icon: MessageSquare,
    stats: { salary: "\u20B93L - \u20B930L+", demand: "Medium", difficulty: "Medium" },
    whyChoose: ["Blend of communication, strategy, and crisis management", "Work with exciting brands and personalities", "Growing corporate communications demand", "Celebrity and influencer PR is booming"],
    skills: ["Media Relations", "Press Release Writing", "Crisis Communication", "Social Media Management", "Networking"],
    paths: [
      { title: "Corporate PR Manager", desc: "Manage communications for a company's public image." },
      { title: "Celebrity / Entertainment PR", desc: "Handle PR for actors, athletes, or public figures." },
      { title: "PR Agency Head", desc: "Lead a PR consultancy firm." }
    ],
    timeline: [
      { year: "Class 11-12", title: "Any Stream", desc: "Humanities preferred. English writing must be excellent." },
      { year: "Year 1-3", title: "BA / B.Com + Communications", desc: "Mass communication or journalism undergraduate." },
      { year: "Year 3-5", title: "MBA / PG in PR / IIMC", desc: "Postgraduate specialization in communications or PR." },
      { year: "Year 4+", title: "Client Management", desc: "Build a portfolio of clients and media relationships." }
    ],
    exams: ["IIMC Entrance", "Mass communication university entrances"],
    colleges: ["Symbiosis SIMC Pune", "IIMC Delhi", "Xavier's Mumbai", "Amity University", "Leeds University"],
    budgetColleges: ["IIMC Delhi", "State mass communication colleges"],
    abroad: ["NYU", "Boston University", "USC Annenberg", "Leeds", "Manchester University"],
    investment: "\u20B92L - \u20B910L for PG in India.",
    salaryExpectations: [
      { level: "PR Executive (0-2 yrs)", amount: "\u20B93L - \u20B97L / year" },
      { level: "Senior PR Manager (3-5 yrs)", amount: "\u20B910L - \u20B925L / year" },
      { level: "Communications Director / Head", amount: "\u20B930L - \u20B980L / year" }
    ],
    dailyWork: ["Writing and distributing press releases", "Media pitching calls", "Social media monitoring", "Crisis response planning", "Client strategy meetings"],
    firstOpportunity: "PR internships at agencies like Edelman, Adfactors, or Weber Shandwick. Corporate communications intern roles.",
    whoShould: ["Excellent communicators with strong networking skills", "People who are media-savvy and proactive", "Crisis-ready, calm-under-fire personalities"],
    whoShouldAvoid: ["Introverts uncomfortable with constant communication", "People who dislike working with difficult clients", "Those who want structured, solo, analytical work"],
    harshReality: "PR is highly relational \u2014 it runs on relationships and favors. Agency work involves extreme client pressure and thin margins. Corporate PR is more stable but gets cut quickly during downturns.",
    industryInsights: "Digital PR and influencer relations are now larger than traditional media PR. Brands are shifting budgets from press releases to social media storytelling. PR professionals who understand SEO and content strategy earn significantly more."
  },
  {
    id: "nutritionist",
    title: "Nutritionist / Dietitian",
    category: "Health & Wellness",
    description: "Help individuals and organizations optimize their health through science-based nutrition and diet planning.",
    icon: Apple,
    stats: { salary: "\u20B92.5L - \u20B925L+", demand: "Medium", difficulty: "Medium" },
    whyChoose: ["Booming health and wellness industry", "Work independently or with sports teams", "Help people transform their lives", "Growing corporate wellness demand"],
    skills: ["Nutrition Science", "Clinical Assessment", "Meal Planning", "Counselling", "Regulatory Affairs"],
    paths: [
      { title: "Clinical Dietitian", desc: "Work with hospitals treating diet-related diseases." },
      { title: "Sports Nutritionist", desc: "Optimize performance nutrition for athletes." },
      { title: "Corporate Wellness Consultant", desc: "Design nutrition programs for companies and teams." }
    ],
    timeline: [
      { year: "Class 11-12", title: "PCB Stream", desc: "Biology and chemistry are essential foundations." },
      { year: "Year 1-3", title: "B.Sc Nutrition / Dietetics", desc: "3-year undergraduate degree from recognized college." },
      { year: "Year 3-5", title: "M.Sc Dietetics", desc: "Specialization in clinical, sports, or community nutrition." },
      { year: "Year 5+", title: "Practice", desc: "Private practice, hospital, or corporate wellness roles." }
    ],
    exams: ["State nutrition/dietetics entrance exams", "NEET (if pursuing medical nutrition path)"],
    colleges: ["AIIMS", "Amity University", "Manipal", "Sri Ramachandra University", "Kasturba Medical"],
    budgetColleges: ["Government home science colleges", "State agricultural universities with home science"],
    abroad: ["University of Toronto", "University of Melbourne", "King's College London", "NYU", "Tufts University"],
    investment: "\u20B92L - \u20B98L for B.Sc + M.Sc in India.",
    salaryExpectations: [
      { level: "Junior Dietitian (0-2 yrs)", amount: "\u20B92.5L - \u20B96L / year" },
      { level: "Clinical / Sports (3-5 yrs)", amount: "\u20B96L - \u20B916L / year" },
      { level: "Consultant / Senior", amount: "\u20B920L - \u20B950L / year" }
    ],
    dailyWork: ["One-on-one diet counselling sessions", "Creating personalized meal plans", "Monitoring patient progress", "Corporate nutrition workshops", "Research and content creation"],
    firstOpportunity: "Hospital internship as part of degree. Sports academy nutritionist positions. Online nutrition coaching.",
    whoShould: ["Science lovers passionate about food and health", "Patient counsellors who enjoy one-on-one work", "Entrepreneurial individuals who want to build a private practice"],
    whoShouldAvoid: ["Those who dislike clinical or counselling settings", "People who need large-team environments", "Anyone who wants rapid career progression"],
    harshReality: "The nutritionist market is flooded with uncertified coaches and influencers who undercut qualified dietitians. Building credibility requires certification and a strong online presence.",
    industryInsights: "Celebrity nutritionists and Instagram coaches earn \u20B950L-\u20B91Cr annually through courses and brand deals. Sports nutrition for IPL, ISL, and Pro Kabaddi teams is a niche high-income segment."
  },
  {
    id: "fitness-trainer",
    title: "Fitness Trainer / Sports Coach",
    category: "Health & Wellness",
    description: "Train individuals and teams to achieve peak physical performance and wellbeing.",
    icon: Dumbbell,
    stats: { salary: "\u20B92L - \u20B920L+", demand: "Medium", difficulty: "Medium" },
    whyChoose: ["Work in a field you're passionate about", "Flexible, independent career", "Growing gym and fitness industry", "Build your own academy"],
    skills: ["Exercise Science", "Personal Training Techniques", "Nutrition Basics", "CSCS / ACE Certification", "Client Motivation"],
    paths: [
      { title: "Personal Trainer", desc: "Train individual clients in gyms or privately." },
      { title: "Sports Coach", desc: "Train athletes in cricket, football, athletics, or combat sports." },
      { title: "Own Fitness Academy", desc: "Start a gym, online fitness program, or sports academy." }
    ],
    timeline: [
      { year: "Class 11-12", title: "Any Stream + Sports", desc: "Be physically active. Represent school or district level sports." },
      { year: "Year 1-3", title: "B.P.Ed / B.Sc Sports Science", desc: "NIS Patiala, LNUPE, or sports science degree." },
      { year: "Year 2-3", title: "Certifications", desc: "ACE, NSCA-CSCS, or CrossFit certifications \u2014 internationally valued." },
      { year: "Year 4+", title: "Client Building", desc: "Build clientele through gym, Instagram, or referrals." }
    ],
    exams: ["NIS Patiala entrance", "LNUPE Gwalior entrance", "State sports education entrances"],
    colleges: ["NIS Patiala", "LNUPE Gwalior", "Amity University", "Manipal", "SAI affiliated institutes"],
    budgetColleges: ["Government sports colleges", "SAI Training Centres (free for sportspersons)"],
    abroad: ["IMG Academy USA", "Loughborough University", "Leeds Beckett", "NSCA Programs USA"],
    investment: "\u20B91L - \u20B95L for degree. \u20B920K - \u20B91L for international certifications.",
    salaryExpectations: [
      { level: "Junior Trainer (0-2 yrs)", amount: "\u20B92L - \u20B95L / year" },
      { level: "Head Trainer (3-6 yrs)", amount: "\u20B95L - \u20B915L / year" },
      { level: "Own Academy / Online Brand", amount: "\u20B920L - \u20B9unlimited / year" }
    ],
    dailyWork: ["One-on-one or group training sessions", "Program design and tracking", "Nutritional guidance", "Social media content for growth", "Equipment and facility management"],
    firstOpportunity: "Junior trainer at a local gym or sports club. Online personal training via Instagram.",
    whoShould: ["Physically active, motivating individuals", "People passionate about fitness and sports science", "Entrepreneurial self-starters who want to build their own brand"],
    whoShouldAvoid: ["Those who dislike physical work or early mornings", "People who need a fixed high income from day one", "Anyone uncomfortable with client dependency"],
    harshReality: "Gym trainer salaries are very low (\u20B912K-\u20B920K/month) in India. Real income comes from building a personal brand on Instagram and launching online programs. Without a social media presence, growth is very slow.",
    industryInsights: "India's fitness market is \u20B97,000 Cr and growing at 25% annually. Online personal training and fitness apps have created new income streams. Cult.fit and similar chains have made fitness more mainstream."
  },
  {
    id: "game-developer",
    title: "Game Developer",
    category: "Technology & Gaming",
    description: "Create video games \u2014 design worlds, mechanics, and experiences that entertain millions globally.",
    icon: Gamepad2,
    stats: { salary: "\u20B93L - \u20B935L+", demand: "Growing", difficulty: "High" },
    whyChoose: ["Work on something you love \u2014 games!", "India's mobile gaming market is exploding", "Creative + technical blend", "Global market \u2014 work for studios worldwide"],
    skills: ["Unity or Unreal Engine", "C++ or C#", "3D Modeling (Blender)", "Game Design Principles", "Physics Engines"],
    paths: [
      { title: "Mobile Game Developer", desc: "Build casual and mid-core games for Android/iOS." },
      { title: "PC / Console Game Developer", desc: "Work at AAA studios on big-budget titles." },
      { title: "Game Designer", desc: "Design mechanics, levels, and player experience." }
    ],
    timeline: [
      { year: "Class 11-12", title: "PCM / CS", desc: "Programming fundamentals are non-negotiable." },
      { year: "Year 1-3", title: "B.Tech CS or Game Design Degree", desc: "Specialized game design from ICAT, Arena, or Arena Animation." },
      { year: "Year 2-3", title: "Build Games", desc: "Create 3-5 personal games as portfolio \u2014 more important than degree." },
      { year: "Year 3+", title: "Studio or Indie", desc: "Join a game studio or launch an independent game." }
    ],
    exams: ["JEE Main (for CS degree)", "ICAT Chennai entrance", "Arena Animation program entrance"],
    colleges: ["MAAC", "Arena Animation", "VIT", "Manipal", "SRM \u2014 specialized: ICAT Chennai"],
    budgetColleges: ["Self-taught with Unity (free) + YouTube + Steam indie route"],
    abroad: ["USC Games", "DigiPen Institute", "Full Sail University", "Abertay Dundee", "MIT Media Lab"],
    investment: "\u20B93L - \u20B910L for specialized game design programs in India.",
    salaryExpectations: [
      { level: "Junior Developer (0-2 yrs)", amount: "\u20B93L - \u20B98L / year" },
      { level: "Mid Developer (3-5 yrs)", amount: "\u20B912L - \u20B930L / year" },
      { level: "Senior / Lead Developer", amount: "\u20B935L - \u20B91Cr / year" }
    ],
    dailyWork: ["Coding game mechanics in Unity/Unreal", "Bug testing and playtesting", "Art asset integration", "Performance optimization", "Collaborating with artists and designers"],
    firstOpportunity: "Game jams (48-72 hour game competitions), indie game publishing on itch.io, or joining small mobile game studios.",
    whoShould: ["Creative + technical thinkers who love games", "Problem-solvers who enjoy interactive systems", "Self-motivated learners comfortable with both art and code"],
    whoShouldAvoid: ["Those who want only artistic or only coding work", "People who need a structured 9-5 environment", "Anyone who can't commit to continuous self-learning"],
    harshReality: "India has very few AAA game studios \u2014 most serious game developers either work at small mobile studios or go abroad. Salaries are 30-40% lower than equivalent software engineering roles.",
    industryInsights: "India's gaming market reached $3.7B in 2023 \u2014 mobile gaming drives 90% of it. Krafton, nCore Games, and Dream Sports are scaling up. Indian-made mobile games are finally competing globally."
  },
  {
    id: "blockchain-developer",
    title: "Blockchain Developer",
    category: "Technology",
    description: "Build decentralized applications, smart contracts, and Web3 infrastructure on blockchain networks.",
    icon: Link2,
    stats: { salary: "\u20B96L - \u20B980L+", demand: "Emerging", difficulty: "Very High" },
    whyChoose: ["Among the highest-paid niche in tech globally", "Cutting-edge, frontier technology", "Decentralized finance (DeFi) is a new financial system", "Strong global remote opportunities"],
    skills: ["Solidity (Smart Contracts)", "Ethereum / Polygon", "Web3.js / Ethers.js", "Cryptography", "DeFi Protocols"],
    paths: [
      { title: "Smart Contract Developer", desc: "Write and audit Solidity contracts on Ethereum." },
      { title: "DeFi Engineer", desc: "Build decentralized finance protocols and dApps." },
      { title: "Blockchain Architect", desc: "Design enterprise blockchain solutions." }
    ],
    timeline: [
      { year: "Year 1-2", title: "CS Fundamentals", desc: "Strong programming background \u2014 Python, JS, computer science basics." },
      { year: "Year 2-3", title: "Blockchain Certifications", desc: "Coursera Blockchain, ConsenSys Academy, B9Lab." },
      { year: "Year 2-3", title: "Build on Testnet", desc: "Deploy real smart contracts on Ethereum testnet \u2014 portfolio builder." },
      { year: "Year 3+", title: "Web3 Projects", desc: "Contribute to open-source DeFi or NFT projects on GitHub." }
    ],
    exams: ["No specific exams \u2014 certifications from ConsenSys, Coursera", "Ethereum Developer Certification"],
    colleges: ["IIT Bombay", "BITS Pilani", "NIT \u2014 mainly certification-based through ConsenSys, Coursera, B9Lab"],
    budgetColleges: ["100% self-taught via Coursera (free audit), Ethereum documentation, and GitHub"],
    abroad: ["MIT", "Cornell Tech", "University of Nicosia", "ConsenSys Academy", "NUS Singapore"],
    investment: "Minimal \u2014 mostly online certifications (\u20B920K-\u20B92L). Strong CS degree from IIT/NIT is the base.",
    salaryExpectations: [
      { level: "Junior Blockchain Dev (0-2 yrs)", amount: "\u20B96L - \u20B915L / year" },
      { level: "Senior Dev / Auditor (3-5 yrs)", amount: "\u20B920L - \u20B950L / year" },
      { level: "Architect / Protocol Lead", amount: "\u20B960L - \u20B92Cr / year" }
    ],
    dailyWork: ["Writing Solidity smart contracts", "Security audits of contracts", "Frontend Web3 integration", "Reading DeFi protocol documentation", "Community and Discord participation"],
    firstOpportunity: "Hackathons (ETHGlobal, Devfolio), open-source contributions, or bootcamp projects that lead to job offers.",
    whoShould: ["Strong CS background with interest in decentralized systems", "Finance + technology crossover thinkers", "Those comfortable with a rapidly evolving, uncertain landscape"],
    whoShouldAvoid: ["Those who dislike a rapidly changing tech landscape", "People who need traditional job structures", "Anyone who wants immediate job security"],
    harshReality: "The crypto market is extremely volatile \u2014 job opportunities expand and collapse with market cycles. The 2022 crypto winter eliminated thousands of blockchain jobs in months. Skills are transferable, but job market is unpredictable.",
    industryInsights: "Web3 gaming, real-world asset tokenization, and cross-border payments are the most legitimate long-term blockchain use cases. Indian developers are well-represented in global Web3 communities."
  },
  {
    id: "environmental-scientist",
    title: "Environmental Scientist",
    category: "Science & Environment",
    description: "Study and protect the natural environment through research, policy work, and sustainability consulting.",
    icon: Leaf,
    stats: { salary: "\u20B93L - \u20B925L+", demand: "Growing", difficulty: "Medium" },
    whyChoose: ["Work on the most critical challenge of our time \u2014 climate change", "Growing policy and consulting demand", "International opportunities with UN, WWF, UNEP", "Interdisciplinary field bridging science and policy"],
    skills: ["GIS & Remote Sensing", "Environmental Law & Policy", "Data Analysis", "Field Research", "Report Writing"],
    paths: [
      { title: "Environmental Consultant", desc: "Advise companies on environmental impact and compliance." },
      { title: "Climate Researcher", desc: "Work with research institutes or universities on climate science." },
      { title: "Policy Analyst", desc: "Shape environmental regulations for governments or think tanks." }
    ],
    timeline: [
      { year: "Class 11-12", title: "PCB or PCM", desc: "Science stream \u2014 biology, geography, environmental studies." },
      { year: "Year 1-3", title: "B.Sc Environmental Science", desc: "IIT, JNU, or state universities." },
      { year: "Year 3-5", title: "M.Sc / M.Tech Environment", desc: "Specialization in climate, ecology, or environmental engineering." },
      { year: "Year 5+", title: "Research / Consulting", desc: "PhD, policy work, or environmental consulting firms." }
    ],
    exams: ["JEE Main (for IIT programs)", "CUET for central universities", "GATE Environmental Engineering"],
    colleges: ["IIT Bombay", "JNU Delhi", "Delhi University", "TERI University", "SRM Chennai"],
    budgetColleges: ["State science colleges", "Government environmental research institutes"],
    abroad: ["University of Edinburgh", "ETH Zurich", "UC Davis", "University of Melbourne", "Stanford Earth"],
    investment: "\u20B92L - \u20B910L for M.Sc in India. PhD often fully funded.",
    salaryExpectations: [
      { level: "Research Associate (0-2 yrs)", amount: "\u20B93L - \u20B97L / year" },
      { level: "Environmental Scientist (3-5 yrs)", amount: "\u20B98L - \u20B920L / year" },
      { level: "Consultant / Director", amount: "\u20B925L - \u20B960L / year" }
    ],
    dailyWork: ["Field surveys and sample collection", "Environmental impact assessments", "Data analysis and reporting", "Government liaison", "Policy brief writing"],
    firstOpportunity: "Research internships at TERI, CSE Delhi, or government environmental agencies. NGO fieldwork positions.",
    whoShould: ["Science lovers genuinely concerned about climate and environment", "Those who enjoy fieldwork and research", "Policy-minded individuals who want systemic change"],
    whoShouldAvoid: ["Those who dislike slow-paced research or fieldwork", "People who need high early incomes", "Anyone who wants immediate visible impact"],
    harshReality: "Environmental science is a field where passion often outpaces pay \u2014 especially in India. Government agencies and NGOs pay poorly. Real income comes from corporate sustainability consulting or international organizations.",
    industryInsights: "ESG (Environmental, Social, Governance) reporting is now mandatory for India's top 1,000 companies. This has created massive demand for environmental consultants. Carbon credits and green finance are emerging high-income areas."
  },
  {
    id: "biotechnologist",
    title: "Biotechnologist",
    category: "Science & Research",
    description: "Apply biological sciences and technology to solve problems in medicine, agriculture, and industry.",
    icon: FlaskConical,
    stats: { salary: "\u20B93L - \u20B930L+", demand: "Growing", difficulty: "High" },
    whyChoose: ["Frontier science \u2014 vaccines, gene editing, synthetic biology", "Strong research and pharma sector demand", "Global opportunities in biotech", "Post-COVID biotech boom"],
    skills: ["Molecular Biology", "Lab Techniques (PCR, ELISA, etc.)", "Bioinformatics", "Research Writing", "Data Analysis"],
    paths: [
      { title: "Research Scientist", desc: "Work in labs developing vaccines, drugs, or genetic tools." },
      { title: "Bioinformatics Analyst", desc: "Analyze biological data using computational tools." },
      { title: "Biotech Startup Founder", desc: "Build companies in diagnostics, drug discovery, or agri-biotech." }
    ],
    timeline: [
      { year: "Class 11-12", title: "PCB Stream", desc: "Biology and chemistry are core foundations." },
      { year: "Year 1-3", title: "B.Sc / B.Tech Biotechnology", desc: "IISc, IIT, JNU, or specialized biotech programs." },
      { year: "Year 3-5", title: "M.Sc / M.Tech", desc: "Research-focused master's in molecular biology, bioinformatics, etc." },
      { year: "Year 5+", title: "PhD / Industry", desc: "PhD for research roles. Industry roles in pharma or diagnostics." }
    ],
    exams: ["JEE Main (for B.Tech Biotech)", "CUET / GATE Biotechnology", "DBT-JRF (for research fellowships)"],
    colleges: ["IISc Bangalore", "IIT Bombay", "JNU Delhi", "Amity University", "VIT Vellore"],
    budgetColleges: ["Government biotech departments at central universities", "IIT/NIT biotech programs"],
    abroad: ["MIT", "Johns Hopkins", "UC San Diego", "Imperial College London", "ETH Zurich"],
    investment: "\u20B93L - \u20B915L for M.Sc in India. PhD comes with fellowship stipend (\u20B925K-\u20B935K/month).",
    salaryExpectations: [
      { level: "Research Associate (0-2 yrs)", amount: "\u20B93L - \u20B98L / year" },
      { level: "Scientist (3-5 yrs)", amount: "\u20B910L - \u20B925L / year" },
      { level: "Principal Scientist / Lead", amount: "\u20B930L - \u20B980L / year" }
    ],
    dailyWork: ["Lab experiments and protocols", "Data analysis and interpretation", "Research paper writing", "Literature reviews", "Collaboration with cross-functional teams"],
    firstOpportunity: "Research internships at IISc, CCMB, NCBS, or biotech companies like Biocon, Serum Institute.",
    whoShould: ["Science enthusiasts with patience for long research cycles", "Lab-oriented detail-focused individuals", "Those motivated by scientific discovery over money"],
    whoShouldAvoid: ["Those who dislike slow research timelines", "People who want immediate job stability and high income", "Anyone who can't handle repetitive experimental work"],
    harshReality: "Biotech PhDs in India earn \u20B925K-\u20B935K/month as stipends \u2014 for 5-6 years. Industry roles pay better but are fewer in number. Without PhD or M.Tech, options are very limited.",
    industryInsights: "India's biopharma sector is the world's largest vaccine manufacturer. Serum Institute, Biocon, and Sun Pharma are scaling massively. Gene therapy, CRISPR, and mRNA technologies are the next wave."
  },
  {
    id: "supply-chain",
    title: "Supply Chain / Logistics Manager",
    category: "Operations & Logistics",
    description: "Manage the end-to-end flow of goods, from raw materials to final delivery \u2014 the backbone of every business.",
    icon: Truck,
    stats: { salary: "\u20B94L - \u20B935L+", demand: "High", difficulty: "Medium" },
    whyChoose: ["Every industry needs supply chain expertise", "Growing e-commerce logistics boom", "International career opportunities", "High-demand, recession-resistant function"],
    skills: ["SAP / ERP Systems", "Demand Planning", "Procurement", "Warehousing & Inventory", "Excel & Analytical Tools"],
    paths: [
      { title: "Procurement Manager", desc: "Source and negotiate with suppliers globally." },
      { title: "Logistics Manager", desc: "Manage warehouses, freight, and last-mile delivery." },
      { title: "VP Supply Chain", desc: "Lead the entire supply chain strategy for a large company." }
    ],
    timeline: [
      { year: "Class 11-12", title: "Any Stream", desc: "Math and geography \u2014 understanding movement of goods." },
      { year: "Year 1-3", title: "B.Tech / BBA / B.Com", desc: "Any technical or management undergraduate degree." },
      { year: "Year 3-5", title: "MBA / PGDM (SCM)", desc: "NITIE Mumbai is India's top supply chain B-school." },
      { year: "Year 4+", title: "SAP Certification", desc: "SAP MM/WM/SD certifications are highly valued by employers." }
    ],
    exams: ["CAT (for MBA)", "CMAT", "NITIE PGDISEM entrance"],
    colleges: ["IIM Ahmedabad", "NITIE Mumbai", "Symbiosis SIBM", "Great Lakes Chennai", "IMT Ghaziabad"],
    budgetColleges: ["NITIE Mumbai (government institute \u2014 low fees)", "NIT MBA programs"],
    abroad: ["Michigan Ross", "MIT SCM Program", "Cranfield UK", "NUS Singapore", "INSEAD"],
    investment: "\u20B95L - \u20B920L for MBA/PGDM in India.",
    salaryExpectations: [
      { level: "Executive / Analyst (0-2 yrs)", amount: "\u20B94L - \u20B910L / year" },
      { level: "Manager (3-6 yrs)", amount: "\u20B912L - \u20B930L / year" },
      { level: "Senior Manager / VP SCM", amount: "\u20B935L - \u20B980L / year" }
    ],
    dailyWork: ["Coordinating with suppliers and vendors", "Tracking inventory levels", "Analyzing demand forecasts", "Resolving delivery delays", "Negotiating contracts"],
    firstOpportunity: "Management trainee roles at FMCG or e-commerce companies. Supply chain analyst at Amazon, Flipkart, or HUL.",
    whoShould: ["Operational thinkers who love process and efficiency", "People who enjoy cross-functional coordination", "Detail-oriented planners with analytical skills"],
    whoShouldAvoid: ["Those who dislike coordination-heavy, cross-functional roles", "People who prefer solo, deep-focus work", "Anyone who can't handle ambiguity and last-minute changes"],
    harshReality: "Supply chain jobs require extreme coordination across teams \u2014 it's high-pressure when things go wrong (delays, strikes, shortages). SAP knowledge is often mandatory but takes months to learn on the job.",
    industryInsights: "India's logistics market is \u20B914 Lakh Cr and growing 10% annually. E-commerce and quick-commerce (Zepto, Blinkit) have created massive demand for last-mile and supply chain talent."
  },
  {
    id: "interior-designer",
    title: "Interior Designer",
    category: "Design & Built Environment",
    description: "Transform spaces \u2014 homes, offices, hospitality, and retail \u2014 into functional and beautiful environments.",
    icon: Layers,
    stats: { salary: "\u20B92.5L - \u20B925L+", demand: "Medium", difficulty: "Medium" },
    whyChoose: ["Creative career with tangible, visible results", "Real estate boom driving strong demand", "Own studio / freelance potential", "India's luxury interior market is growing"],
    skills: ["AutoCAD", "SketchUp & 3Ds Max", "Material Knowledge", "Space Planning", "Client Management"],
    paths: [
      { title: "Residential Interior Designer", desc: "Design home interiors \u2014 high demand with India's housing boom." },
      { title: "Commercial Interior Designer", desc: "Offices, retail stores, and hospitality spaces." },
      { title: "Own Design Studio", desc: "Build an independent studio after 5-8 years of experience." }
    ],
    timeline: [
      { year: "Class 11-12", title: "Any Stream", desc: "Arts preferred. Start sketching spaces and studying design." },
      { year: "Year 1-4", title: "B.Des Interior Design", desc: "NID, CEPT, JJ School, Pearl Academy, or Raffles." },
      { year: "Year 3-4", title: "Portfolio + Internships", desc: "Work with established design firms on real projects." },
      { year: "Year 5+", title: "Own Projects", desc: "Take independent client projects while building reputation." }
    ],
    exams: ["NID DAT", "UCEED (IIT programs)", "CEPT entrance exam"],
    colleges: ["NID Ahmedabad", "CEPT Ahmedabad", "JJ School of Art Bombay", "Pearl Academy", "Raffles Mumbai"],
    budgetColleges: ["State art and architecture colleges", "IGNOU design certification"],
    abroad: ["Savannah SCAD", "Pratt Institute", "Royal College of Art", "Politecnico Milano"],
    investment: "\u20B93L - \u20B912L for B.Des in India.",
    salaryExpectations: [
      { level: "Junior Designer (0-2 yrs)", amount: "\u20B92.5L - \u20B96L / year" },
      { level: "Interior Designer (3-5 yrs)", amount: "\u20B98L - \u20B920L / year" },
      { level: "Senior / Own Studio", amount: "\u20B925L - \u20B9unlimited / year" }
    ],
    dailyWork: ["Client briefings and site visits", "Creating design concepts and mood boards", "3D renderings in SketchUp/3Ds Max", "Coordinating contractors and vendors", "Material sourcing and procurement"],
    firstOpportunity: "Internship at interior design studios or architecture firms. Assist senior designers on residential projects.",
    whoShould: ["Creative thinkers with spatial imagination", "People who love home aesthetics and design trends", "Detail-oriented individuals with strong visualization skills"],
    whoShouldAvoid: ["Those who dislike frequent client revisions", "People who can't handle project delays", "Anyone uncomfortable with contractor and vendor coordination"],
    harshReality: "Client revisions are never-ending \u2014 interior design is a service business where the client's taste overrides your creativity. Margins are thin unless you position yourself as luxury. Building a reputation takes 5-8 years.",
    industryInsights: "India's luxury real estate segment is booming \u2014 premium apartment buyers want full interior fit-outs. Online interior design platforms (HomeLane, Livspace) have created a new employment stream for designers at scale."
  },
  {
    id: "actuary",
    title: "Actuary",
    category: "Finance",
    description: "Use mathematics and statistics to assess financial risk for insurance companies, pension funds, and banks.",
    icon: PieChart,
    stats: { salary: "\u20B96L - \u20B980L+", demand: "High", difficulty: "Very High" },
    whyChoose: ["Among the highest-paid math-based careers", "Critical function in insurance and finance", "Globally recognized qualification", "High job security \u2014 low supply of actuaries"],
    skills: ["Statistics & Probability", "Excel & R / Python", "Risk Modeling", "Financial Mathematics", "CT / SA Exam Series"],
    paths: [
      { title: "Life Insurance Actuary", desc: "Price life insurance products and assess mortality risk." },
      { title: "General Insurance Actuary", desc: "Work with property, health, and casualty insurance." },
      { title: "Pension Fund Actuary", desc: "Manage retirement benefit liabilities for companies." }
    ],
    timeline: [
      { year: "Class 11-12", title: "PCM Stream", desc: "Exceptional math skills \u2014 this is a math-first career." },
      { year: "Year 1-3", title: "B.Sc Math / Stats / B.Com", desc: "Actuarial-friendly undergrad: math, stats, or commerce." },
      { year: "Year 2-7", title: "IAI Exams (India)", desc: "Institute of Actuaries of India \u2014 CT, CA, SA exam series. Takes 5-8 years typically." },
      { year: "Year 4+", title: "Associate / Fellow Actuary", desc: "Associate (100+ exam points) and Fellow (full qualification)." }
    ],
    exams: ["IAI CT1-CT9 and CA, SA exam series", "IFoA (UK) exams \u2014 internationally recognized"],
    colleges: ["IIT, SRCC, St. Xavier's for undergrad", "Certification: Institute of Actuaries of India (IAI)"],
    budgetColleges: ["Delhi University B.Sc Math \u2192 self-study IAI exams", "Coaching: IFRS-based coaching institutes"],
    abroad: ["LSE", "Heriot-Watt University (top for actuarial science)", "University of Waterloo", "UConn", "University of Melbourne"],
    investment: "\u20B92L - \u20B910L for undergrad. \u20B91L - \u20B93L for IAI exam fees.",
    salaryExpectations: [
      { level: "Actuarial Analyst (0-2 yrs)", amount: "\u20B96L - \u20B914L / year" },
      { level: "Associate Actuary (3-6 yrs)", amount: "\u20B920L - \u20B950L / year" },
      { level: "Fellow / Chief Actuary", amount: "\u20B960L - \u20B92Cr / year" }
    ],
    dailyWork: ["Building actuarial pricing models", "Risk assessment reports", "Liability valuations", "Regulatory compliance submissions", "Board presentations on risk exposure"],
    firstOpportunity: "Actuarial analyst roles at LIC, IRDAI, or private insurers (HDFC Life, ICICI Prudential). Often hired before completing all exams.",
    whoShould: ["Math and statistics lovers with high patience", "Detail-oriented analytical thinkers", "Those who enjoy long-term credential building and career security"],
    whoShouldAvoid: ["Those who dislike long certification paths", "People who need creative or social work", "Anyone uncomfortable with data-heavy, model-driven work"],
    harshReality: "The actuarial exam journey takes 7-10 years to complete fully. Most people never finish \u2014 the exam failure rate is very high. Until you're a Fellow, you're in a long, slow-moving qualification process.",
    industryInsights: "India has only ~500 fully qualified Fellows \u2014 in a country of 1.4 billion. This extreme supply shortage means qualified actuaries command exceptional salaries. IRDAI and new insurance players are creating strong demand."
  },
  {
    id: "pharmacist",
    title: "Pharmacist",
    category: "Healthcare",
    description: "Ensure safe medication use, manage drug supply chains, and advise on pharmaceutical therapy.",
    icon: Pill,
    stats: { salary: "\u20B93L - \u20B925L+", demand: "Medium", difficulty: "Medium" },
    whyChoose: ["Part of the essential healthcare system", "Own pharmacy / medical store potential", "Growing pharma industry demand", "Lower study burden than MBBS"],
    skills: ["Pharmacology", "Drug Interaction Knowledge", "Clinical Skills", "Regulatory Affairs", "Patient Counselling"],
    paths: [
      { title: "Community Pharmacist", desc: "Run a retail pharmacy or medical store." },
      { title: "Hospital Pharmacist", desc: "Manage drug dispensing and clinical support in hospitals." },
      { title: "Pharma Industry Roles", desc: "Drug regulatory affairs, quality control, or medical rep." }
    ],
    timeline: [
      { year: "Class 11-12", title: "PCB or PCM", desc: "Biology and chemistry are essential." },
      { year: "Year 1-4", title: "B.Pharm Degree", desc: "4-year pharmacy degree from a PCI-approved college." },
      { year: "Year 4-5", title: "M.Pharm (Optional)", desc: "Post-grad specialization in clinical, industrial, or regulatory pharmacy." },
      { year: "Year 4+", title: "Licensing & Practice", desc: "Register with State Pharmacy Council to practice." }
    ],
    exams: ["NEET (some states for pharmacy entrance)", "GPAT (for M.Pharm admission)"],
    colleges: ["Manipal College of Pharmaceutical Sciences", "JSS Mysore", "Amrita University", "SRM University", "Jamia Hamdard Delhi"],
    budgetColleges: ["Government pharmacy colleges", "State university affiliated colleges"],
    abroad: ["University of Toronto", "Monash University Australia", "King's College London", "UNC Chapel Hill"],
    investment: "\u20B95L - \u20B925L for B.Pharm in India.",
    salaryExpectations: [
      { level: "Pharmacist / Analyst (0-2 yrs)", amount: "\u20B93L - \u20B97L / year" },
      { level: "Senior Pharmacist (3-6 yrs)", amount: "\u20B98L - \u20B920L / year" },
      { level: "Regulatory / Own Pharmacy", amount: "\u20B925L - \u20B960L / year" }
    ],
    dailyWork: ["Drug dispensing and counselling", "Prescription verification", "Inventory management", "Drug interaction checks", "Patient medication education"],
    firstOpportunity: "Hospital pharmacy internship during degree. Junior pharmacist at Apollo, Fortis, or Max hospitals. Medical rep at pharma companies.",
    whoShould: ["Science lovers with attention to detail", "People who care about patient safety", "Those interested in the pharmaceutical industry beyond just dispensing"],
    whoShouldAvoid: ["Those who dislike repetitive clinical environments", "People who want dynamic, creative careers", "Anyone uncomfortable with regulatory compliance work"],
    harshReality: "Community pharmacy (medical store) is flooded and margins are very thin. Hospital pharmacy pays low. Real income growth comes from regulatory affairs or pharma company roles \u2014 which require M.Pharm or additional certifications.",
    industryInsights: "India's pharma industry is the world's 3rd largest by volume. Drug regulatory affairs professionals are in massive demand as global regulators (FDA, EMA) require India-specific expertise. Clinical pharmacists in hospital systems are an emerging high-value role."
  }
];
export const quizQuestions = [
  {
    question: "What kind of tasks energise you the most?",
    subtitle: "Pick the one that feels most natural to you.",
    options: [
      { text: "Solving logic puzzles, coding, or crunching numbers", careers: { engineer: 3, "data-scientist": 3, "chartered-accountant": 2, architect: 1 } },
      { text: "Drawing, designing, or creating visual things", careers: { designer: 3, architect: 3, "content-creator": 2 } },
      { text: "Talking, persuading, arguing, or presenting to people", careers: { lawyer: 3, startup: 2, "digital-marketer": 2, "product-manager": 1 } },
      { text: "Listening, empathising, and helping people emotionally", careers: { psychologist: 3, doctor: 2, lawyer: 1 } }
    ]
  },
  {
    question: "Which school subject came most naturally to you?",
    subtitle: "Be honest \u2014 the one you actually enjoyed, not the one you studied.",
    options: [
      { text: "Maths, Physics, and Computers", careers: { engineer: 3, "data-scientist": 3, architect: 2, "chartered-accountant": 1 } },
      { text: "Biology and Chemistry", careers: { doctor: 3, psychologist: 1 } },
      { text: "Accounts, Economics, or Business Studies", careers: { "chartered-accountant": 3, startup: 2, "product-manager": 2, "digital-marketer": 1 } },
      { text: "English, Arts, Psychology, or Social Sciences", careers: { lawyer: 2, "content-creator": 3, psychologist: 2, "digital-marketer": 1 } }
    ]
  },
  {
    question: "How long are you willing to study before you start earning?",
    options: [
      { text: "6+ years \u2014 I want a prestigious, respected profession", careers: { doctor: 3, lawyer: 3, "chartered-accountant": 2 } },
      { text: "3\u20134 years of college, then straight to work", careers: { engineer: 3, architect: 3, "data-scientist": 2, designer: 2 } },
      { text: "I'd rather learn fast \u2014 internships, online courses, then hustle", careers: { "digital-marketer": 3, "content-creator": 3, startup: 3, "product-manager": 1 } }
    ]
  },
  {
    question: "Pick your ideal work environment:",
    options: [
      { text: "Quiet desk, headphones on \u2014 deep focus mode", careers: { engineer: 3, "data-scientist": 3, "chartered-accountant": 2 } },
      { text: "Creative studio or open workspace \u2014 making things look good", careers: { designer: 3, architect: 3, "content-creator": 2 } },
      { text: "Fast-paced office \u2014 meetings, stakeholders, decisions all day", careers: { "product-manager": 3, startup: 3, "digital-marketer": 2 } },
      { text: "Hospital, clinic, courtroom, or counselling room", careers: { doctor: 3, lawyer: 3, psychologist: 3 } }
    ]
  },
  {
    question: "How do you feel about financial risk and uncertainty?",
    options: [
      { text: "I hate it \u2014 I want security and a predictable income", careers: { doctor: 2, lawyer: 2, "chartered-accountant": 3 } },
      { text: "Calculated risk is fine \u2014 if the data supports it", careers: { "data-scientist": 3, engineer: 2, "product-manager": 2 } },
      { text: "I love it \u2014 high risk, high reward is my mindset", careers: { startup: 3, "content-creator": 2, "digital-marketer": 2 } },
      { text: "Creative risk excites me \u2014 artistic uncertainty is part of the job", careers: { designer: 3, architect: 3, "content-creator": 2 } }
    ]
  },
  {
    question: "When you face a tough problem, you typically:",
    options: [
      { text: "Pull up data, build a spreadsheet, and analyse it logically", careers: { "data-scientist": 3, "chartered-accountant": 3, engineer: 2 } },
      { text: "Talk to the people involved and understand their emotions", careers: { psychologist: 3, doctor: 2, lawyer: 1 } },
      { text: "Sketch, prototype, or brainstorm unconventional ideas", careers: { designer: 3, architect: 2, startup: 2, "content-creator": 1 } },
      { text: "Build a structure, a roadmap, or a process to solve it", careers: { "product-manager": 3, lawyer: 2, architect: 2, engineer: 1 } }
    ]
  },
  {
    question: "What kind of impact do you want your work to have?",
    options: [
      { text: "Directly save or heal people \u2014 medicine or mental health", careers: { doctor: 3, psychologist: 3 } },
      { text: "Build a product or company that millions of people use", careers: { startup: 3, engineer: 3, "digital-marketer": 2 } },
      { text: "Create something beautiful \u2014 art, design, or architecture", careers: { designer: 3, architect: 3, "content-creator": 2 } },
      { text: "Solve systemic problems \u2014 financial, legal, or data-driven", careers: { lawyer: 3, "chartered-accountant": 3, "data-scientist": 2 } }
    ]
  },
  {
    question: "How do you feel about working with people vs. working alone?",
    options: [
      { text: "Alone \u2014 deep focus is where I do my best work", careers: { "data-scientist": 3, engineer: 3, "chartered-accountant": 2 } },
      { text: "With people all day \u2014 I get energy from conversations", careers: { doctor: 3, psychologist: 3, "product-manager": 2 } },
      { text: "Lead a small team, then work solo to execute", careers: { startup: 3, architect: 2, designer: 2 } },
      { text: "Influence a large audience from behind a screen", careers: { "content-creator": 3, "digital-marketer": 3, lawyer: 1 } }
    ]
  },
  {
    question: "Which of these best describes your relationship with technology?",
    options: [
      { text: "I love building \u2014 I want to code or work with data", careers: { engineer: 3, "data-scientist": 3 } },
      { text: "I use tech daily but don't want to code", careers: { "product-manager": 3, "digital-marketer": 2, "content-creator": 2 } },
      { text: "I use it to design and create visuals", careers: { designer: 3, architect: 2, "content-creator": 1 } },
      { text: "It's just a tool \u2014 my real work is with people", careers: { doctor: 3, lawyer: 3, psychologist: 3, "chartered-accountant": 1 } }
    ]
  },
  {
    question: "What type of income pattern would you prefer?",
    options: [
      { text: "Stable, predictable monthly income from day one", careers: { "chartered-accountant": 3, lawyer: 2, doctor: 2 } },
      { text: "Good salary + flexibility \u2014 work from anywhere", careers: { engineer: 3, "data-scientist": 3, "product-manager": 2 } },
      { text: "Low start, but massive potential \u2014 commissions or equity", careers: { startup: 3, "digital-marketer": 2, "content-creator": 2 } },
      { text: "Income grows with skill and reputation over time", careers: { designer: 3, architect: 3, psychologist: 2, lawyer: 1 } }
    ]
  },
  {
    question: "How important is social status and prestige to you?",
    options: [
      { text: "Very important \u2014 I want a career people deeply respect", careers: { doctor: 3, lawyer: 3, "chartered-accountant": 2 } },
      { text: "Moderately \u2014 I want respect in my field, not the whole world", careers: { engineer: 2, "data-scientist": 2, architect: 2, designer: 2 } },
      { text: "Not much \u2014 freedom, impact, and income matter more to me", careers: { startup: 3, "content-creator": 2, "digital-marketer": 2 } },
      { text: "I want to be seen as a trusted person \u2014 an advisor or guide", careers: { psychologist: 3, "product-manager": 2, lawyer: 1 } }
    ]
  },
  {
    question: "Pick the career story that excites you most:",
    options: [
      { text: "NEET cleared, joined AIIMS, now a specialist saving lives daily", careers: { doctor: 3, psychologist: 1 } },
      { text: "Built a startup from scratch, raised funding, scaling to millions", careers: { startup: 3, engineer: 1, "digital-marketer": 1 } },
      { text: "Award-winning designer whose work is featured in global brands", careers: { designer: 3, "content-creator": 1 } },
      { text: "CA who now advises Fortune 500 companies on tax & financial strategy", careers: { "chartered-accountant": 3, lawyer: 1 } }
    ]
  },
  {
    question: "How comfortable are you with ambiguity and constant change?",
    options: [
      { text: "I thrive in chaos \u2014 fast adaptation is my superpower", careers: { startup: 3, "digital-marketer": 3, "content-creator": 2 } },
      { text: "I prefer clear rules and structure to operate within", careers: { lawyer: 3, "chartered-accountant": 3, doctor: 2, architect: 1 } },
      { text: "Some structure + room to experiment is perfect for me", careers: { engineer: 2, designer: 2, "product-manager": 2, "data-scientist": 2 } },
      { text: "I read people and situations to navigate ambiguity", careers: { psychologist: 3, startup: 1, lawyer: 1 } }
    ]
  },
  {
    question: "Honestly \u2014 which comes more naturally to you?",
    options: [
      { text: "Math, logic, and systematic thinking", careers: { engineer: 3, "data-scientist": 3, "chartered-accountant": 2, architect: 1 } },
      { text: "Creativity, aesthetics, and storytelling", careers: { designer: 3, architect: 2, "content-creator": 3, "digital-marketer": 1 } },
      { text: "Leadership, persuasion, and relationship building", careers: { startup: 3, lawyer: 2, "product-manager": 2, "digital-marketer": 1 } },
      { text: "Compassion, emotional intelligence, and patience", careers: { psychologist: 3, doctor: 3, lawyer: 1 } }
    ]
  },
  {
    question: "Finally \u2014 which sounds most like your perfect day at work?",
    subtitle: "Trust your gut on this one.",
    options: [
      { text: "Diagnosing a patient, listening deeply, changing someone's day", careers: { doctor: 3, psychologist: 2 } },
      { text: "Building and shipping code or a data model that thousands use", careers: { engineer: 3, "data-scientist": 3, "product-manager": 1 } },
      { text: "Pitching a creative campaign, growing brand presence online", careers: { "digital-marketer": 3, "content-creator": 3, startup: 1 } },
      { text: "Working on a building design or UI \u2014 presenting, refining, perfecting", careers: { architect: 3, designer: 3 } },
      { text: "Closing a deal, winning a legal argument, or closing an audit", careers: { lawyer: 3, "chartered-accountant": 3, startup: 1 } }
    ]
  }
];
export const pricingFeatures = [
  "Full access to your chosen career roadmap (you pick 1)",
  "Career Discovery Quiz & personalized results",
  "College and entrance exam insights for your career",
  "Unfiltered 'Harsh Reality' check for your industry",
  "Salary progression data (India & Abroad)",
  "Mentor video discussions for your chosen career",
  "Save roadmap to your personal dashboard"
];
export const mentorVideos = [
  {
    id: "v1",
    careerId: "doctor",
    title: "NEET to AIIMS \u2014 My 3-Year Journey & What Nobody Tells You",
    mentor: "Dr. Priya Sharma",
    mentorRole: "MBBS, AIIMS Delhi | 4th Year Resident",
    duration: "38:22",
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=640&q=80",
    views: "1.2L",
    tag: "Reality Check"
  },
  {
    id: "v2",
    careerId: "doctor",
    title: "Day in the Life of a Doctor \u2014 Work Hours, Salary & Burnout",
    mentor: "Dr. Arjun Menon",
    mentorRole: "General Physician | 8 Years Experience",
    duration: "44:10",
    thumbnail: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=640&q=80",
    views: "87K",
    tag: "Day in Life"
  },
  {
    id: "v3",
    careerId: "doctor",
    title: "MBBS vs BDS vs Pharmacy \u2014 Which Medical Career is Right for You?",
    mentor: "Dr. Kavya Nair",
    mentorRole: "Career Counsellor & Ex-AIIMS Student",
    duration: "29:45",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=640&q=80",
    views: "2.1L",
    tag: "Career Comparison"
  },
  {
    id: "v4",
    careerId: "engineer",
    title: "IIT Graduate at Google \u2014 How I Got Here & Is It Worth It?",
    mentor: "Rahul Gupta",
    mentorRole: "Software Engineer, Google | IIT Bombay Alumnus",
    duration: "52:18",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=640&q=80",
    views: "3.4L",
    tag: "Success Story"
  },
  {
    id: "v5",
    careerId: "engineer",
    title: "The Harsh Truth About Software Engineering in India in 2025",
    mentor: "Sneha Patel",
    mentorRole: "Senior SDE, Flipkart | 7 Years in Tech",
    duration: "41:05",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=640&q=80",
    views: "1.8L",
    tag: "Reality Check"
  },
  {
    id: "v6",
    careerId: "engineer",
    title: "How to Get a \u20B920L+ Package Straight Out of College",
    mentor: "Vikram Singh",
    mentorRole: "Ex-Amazon Engineer | Now Placement Coach",
    duration: "1:02:33",
    thumbnail: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=640&q=80",
    views: "5.2L",
    tag: "Career Strategy"
  },
  {
    id: "v7",
    careerId: "lawyer",
    title: "From CLAT to a Top Law Firm \u2014 My Honest Journey",
    mentor: "Anika Roy",
    mentorRole: "Associate Lawyer, AZB & Partners | NLU Delhi",
    duration: "47:30",
    thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=640&q=80",
    views: "64K",
    tag: "Success Story"
  },
  {
    id: "v8",
    careerId: "lawyer",
    title: "Corporate Law vs Litigation \u2014 Which Should You Choose?",
    mentor: "Adv. Rohan Mehra",
    mentorRole: "Senior Advocate, Bombay High Court",
    duration: "35:14",
    thumbnail: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=640&q=80",
    views: "49K",
    tag: "Career Comparison"
  },
  {
    id: "v9",
    careerId: "startup-founder",
    title: "I Failed 2 Startups Before Building a \u20B910Cr Company \u2014 Here's What I Learned",
    mentor: "Akash Joshi",
    mentorRole: "Founder & CEO, Edify Ventures | 2x Startup Founder",
    duration: "1:14:22",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=640&q=80",
    views: "4.7L",
    tag: "Founder Story"
  },
  {
    id: "v10",
    careerId: "startup-founder",
    title: "How to Get Funded by a VC in India \u2014 A Raw Conversation",
    mentor: "Meera Iyer",
    mentorRole: "Partner, Blume Ventures | Angel Investor",
    duration: "58:45",
    thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=640&q=80",
    views: "2.3L",
    tag: "Funding & Investors"
  },
  {
    id: "v11",
    careerId: "data-scientist",
    title: "Data Scientist at Microsoft \u2014 My Day, My Salary, My Honest Advice",
    mentor: "Deepak Verma",
    mentorRole: "Data Scientist, Microsoft | IISc Bangalore",
    duration: "49:17",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&q=80",
    views: "1.5L",
    tag: "Day in Life"
  },
  {
    id: "v12",
    careerId: "data-scientist",
    title: "Is an MS in Data Science Abroad Worth \u20B950 Lakhs?",
    mentor: "Pooja Krishnan",
    mentorRole: "MS Data Science, Stanford | Now at Meta",
    duration: "55:09",
    thumbnail: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=640&q=80",
    views: "3.1L",
    tag: "Abroad Study"
  },
  {
    id: "v13",
    careerId: "product-manager",
    title: "How I Became a PM at Swiggy Without a CS Degree",
    mentor: "Nikhil Arora",
    mentorRole: "Product Manager, Swiggy | Commerce Graduate",
    duration: "43:52",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=640&q=80",
    views: "2.8L",
    tag: "Career Switch"
  },
  {
    id: "v14",
    careerId: "product-manager",
    title: "What a PM Actually Does All Day \u2014 Honest Breakdown",
    mentor: "Shreya Kapoor",
    mentorRole: "Senior PM, Cashfree | Ex-McKinsey",
    duration: "38:00",
    thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=640&q=80",
    views: "1.9L",
    tag: "Day in Life"
  },
  {
    id: "v15",
    careerId: "content-creator",
    title: "0 to 1 Million Subscribers \u2014 The Unglamorous Truth",
    mentor: "Rishi Malhotra",
    mentorRole: "YouTuber | 1.3M Subscribers | Finance Niche",
    duration: "1:08:44",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=640&q=80",
    views: "6.4L",
    tag: "Creator Story"
  },
  {
    id: "v16",
    careerId: "content-creator",
    title: "Making \u20B95 Lakh/Month from Content \u2014 My Revenue Breakdown",
    mentor: "Tanya Sharma",
    mentorRole: "Creator, 800K Followers | Lifestyle & Education",
    duration: "32:15",
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=640&q=80",
    views: "4.2L",
    tag: "Income & Monetization"
  },
  {
    id: "v17",
    careerId: "designer",
    title: "Self-Taught Designer to Design Lead at a Unicorn Startup",
    mentor: "Aryan Bose",
    mentorRole: "Design Lead, CRED | Self-Taught Designer",
    duration: "46:30",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=640&q=80",
    views: "1.1L",
    tag: "Success Story"
  },
  {
    id: "v18",
    careerId: "designer",
    title: "NID vs Self-Taught vs Bootcamp \u2014 Which is Best for UI/UX in India?",
    mentor: "Priyanka Das",
    mentorRole: "UX Designer, Zepto | NID Graduate",
    duration: "40:58",
    thumbnail: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=640&q=80",
    views: "89K",
    tag: "Career Comparison"
  },
  {
    id: "v19",
    careerId: "digital-marketer",
    title: "How I Built a \u20B910L/Month Freelance Digital Marketing Business",
    mentor: "Sahil Khanna",
    mentorRole: "Digital Marketing Freelancer & Educator | 8 Years",
    duration: "51:40",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=640&q=80",
    views: "3.8L",
    tag: "Income & Monetization"
  },
  {
    id: "v20",
    careerId: "digital-marketer",
    title: "SEO vs Paid Ads vs Social Media \u2014 Which Skill Should You Learn First?",
    mentor: "Nidhi Agarwal",
    mentorRole: "Head of Growth, Meesho | Ex-UrbanClap",
    duration: "38:15",
    thumbnail: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=640&q=80",
    views: "2.1L",
    tag: "Career Strategy"
  },
  {
    id: "v21",
    careerId: "digital-marketer",
    title: "Working at a Digital Agency vs In-House \u2014 The Honest Difference",
    mentor: "Rohan Chawla",
    mentorRole: "Digital Marketing Manager, Nykaa | 5 Years Experience",
    duration: "29:50",
    thumbnail: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=640&q=80",
    views: "98K",
    tag: "Reality Check"
  },
  {
    id: "v22",
    careerId: "chartered-accountant",
    title: "CA Final at 21 \u2014 How I Cleared It in First Attempt",
    mentor: "CA Ananya Srivastava",
    mentorRole: "Chartered Accountant | AIR 12, CA Final",
    duration: "1:02:10",
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=640&q=80",
    views: "4.5L",
    tag: "Success Story"
  },
  {
    id: "v23",
    careerId: "chartered-accountant",
    title: "What a CA Actually Earns \u2014 Salary Breakdown by City & Experience",
    mentor: "CA Vivek Sharma",
    mentorRole: "Partner, Mid-size CA Firm | 12 Years Experience",
    duration: "44:30",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&q=80",
    views: "2.7L",
    tag: "Day in Life"
  },
  {
    id: "v24",
    careerId: "chartered-accountant",
    title: "Big 4 vs Own CA Firm vs Corporate Job \u2014 Which is Better?",
    mentor: "CA Priya Mehta",
    mentorRole: "Ex-Deloitte | Now runs own practice",
    duration: "55:00",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=640&q=80",
    views: "1.9L",
    tag: "Career Comparison"
  },
  {
    id: "v25",
    careerId: "architect",
    title: "Architecture in India \u2014 The Brutal Reality Nobody Talks About",
    mentor: "Ar. Kiran Bhat",
    mentorRole: "Principal Architect | 14 Years Experience",
    duration: "47:22",
    thumbnail: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=640&q=80",
    views: "1.3L",
    tag: "Reality Check"
  },
  {
    id: "v26",
    careerId: "architect",
    title: "From CEPT to Working in a Top Firm \u2014 My Architecture Journey",
    mentor: "Ar. Meghna Tiwari",
    mentorRole: "Architect, Studio Lotus | CEPT Graduate",
    duration: "39:05",
    thumbnail: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=640&q=80",
    views: "76K",
    tag: "Success Story"
  },
  {
    id: "v27",
    careerId: "psychologist",
    title: "Becoming a Psychologist in India \u2014 Everything You Need to Know",
    mentor: "Dr. Aditi Sharma",
    mentorRole: "Clinical Psychologist, NIMHANS | PhD Psychology",
    duration: "58:30",
    thumbnail: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=640&q=80",
    views: "2.4L",
    tag: "Career Comparison"
  },
  {
    id: "v28",
    careerId: "psychologist",
    title: "My Day as a Therapist \u2014 Sessions, Burnout & What Makes It Worth It",
    mentor: "Prateek Narang",
    mentorRole: "Counselling Psychologist | Private Practice, Delhi",
    duration: "41:18",
    thumbnail: "https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?w=640&q=80",
    views: "1.1L",
    tag: "Day in Life"
  }
];
