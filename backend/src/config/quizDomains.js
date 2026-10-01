/**
 * Centralized Career Domains & Quiz Profile Registry for Growvia
 * Defines the 11 Core Domains and hand-calibrated 10-dimensional trait vectors
 * for all 48 career roadmaps.
 *
 * IMPORTANT: Trait vectors must NOT be the in-domain discriminator.
 * Stage 2 option weights and tags do that job.
 * Traits are used only for the 10-dimension display and as a very weak last-resort tiebreaker.
 */

// 1. The 11 Core Career Domains
export const DOMAINS = [
  "tech",
  "healthcare",
  "business",
  "finance",
  "creative",
  "media",
  "engineering",
  "law_gov",
  "education_social",
  "aviation_hospitality",
  "science",
];

// User-friendly descriptive labels for domains
export const DOMAIN_LABELS = {
  tech: "Technology & Software",
  healthcare: "Healthcare & Medicine",
  business: "Business & Management",
  finance: "Finance & Accounting",
  creative: "Design & Creative Arts",
  media: "Media & Communication",
  engineering: "Core Engineering",
  law_gov: "Law & Governance",
  education_social: "Education & Social Impact",
  aviation_hospitality: "Aviation & Hospitality",
  science: "Science & Environment",
};

// 2. Slug -> { domain, secondaryDomain } Mapping for all 48 Roadmaps
export const DOMAIN_ROADMAP_MAP = {
  // Tech (7)
  engineer: { domain: "tech", secondaryDomain: null },
  "ai-ml-engineer": { domain: "tech", secondaryDomain: null },
  "data-scientist": { domain: "tech", secondaryDomain: null },
  cybersecurity: { domain: "tech", secondaryDomain: null },
  "cloud-architect": { domain: "tech", secondaryDomain: null },
  "blockchain-developer": { domain: "tech", secondaryDomain: null },
  "game-developer": { domain: "tech", secondaryDomain: null },

  // Healthcare (7)
  doctor: { domain: "healthcare", secondaryDomain: null },
  dentist: { domain: "healthcare", secondaryDomain: null },
  physiotherapist: { domain: "healthcare", secondaryDomain: null },
  pharmacist: { domain: "healthcare", secondaryDomain: null },
  nutritionist: { domain: "healthcare", secondaryDomain: null },
  psychologist: { domain: "healthcare", secondaryDomain: null },
  "fitness-trainer": { domain: "healthcare", secondaryDomain: null },

  // Business (7)
  "startup-founder": { domain: "business", secondaryDomain: null },
  "product-manager": { domain: "business", secondaryDomain: "tech" },
  "mba-manager": { domain: "business", secondaryDomain: null },
  "marketing-manager": { domain: "business", secondaryDomain: null },
  "digital-marketer": { domain: "business", secondaryDomain: null },
  "human-resources": { domain: "business", secondaryDomain: null },
  "supply-chain": { domain: "business", secondaryDomain: null },

  // Finance (4)
  "chartered-accountant": { domain: "finance", secondaryDomain: null },
  "investment-banker": { domain: "finance", secondaryDomain: null },
  "financial-analyst": { domain: "finance", secondaryDomain: null },
  actuary: { domain: "finance", secondaryDomain: "tech" },

  // Creative (5)
  designer: { domain: "creative", secondaryDomain: "tech" },
  "graphic-designer": { domain: "creative", secondaryDomain: null },
  architect: { domain: "creative", secondaryDomain: "engineering" },
  "interior-designer": { domain: "creative", secondaryDomain: null },
  "fashion-designer": { domain: "creative", secondaryDomain: null },

  // Media (5)
  "content-creator": { domain: "media", secondaryDomain: null },
  "film-director": { domain: "media", secondaryDomain: null },
  photographer: { domain: "media", secondaryDomain: null },
  journalist: { domain: "media", secondaryDomain: null },
  "public-relations": { domain: "media", secondaryDomain: null },

  // Engineering (2)
  "mechanical-engineer": { domain: "engineering", secondaryDomain: null },
  "civil-engineer": { domain: "engineering", secondaryDomain: null },

  // Law & Governance (3)
  lawyer: { domain: "law_gov", secondaryDomain: null },
  "civil-services": { domain: "law_gov", secondaryDomain: null },
  "army-officer": { domain: "law_gov", secondaryDomain: null },

  // Education & Social (3)
  teacher: { domain: "education_social", secondaryDomain: null },
  "ed-tech": { domain: "education_social", secondaryDomain: "tech" },
  "social-worker": { domain: "education_social", secondaryDomain: null },

  // Aviation & Hospitality (3)
  pilot: { domain: "aviation_hospitality", secondaryDomain: null },
  "hotel-management": { domain: "aviation_hospitality", secondaryDomain: null },
  "event-manager": { domain: "aviation_hospitality", secondaryDomain: null },

  // Science (2)
  biotechnologist: { domain: "science", secondaryDomain: "healthcare" },
  "environmental-scientist": { domain: "science", secondaryDomain: null },
};

// 3. Complete Hand-Tuned Quiz Profiles for all 48 Roadmaps
// All traits are normalized 0.0 - 1.0 across the 10 core dimensions:
// [technical, analytical, creative, business, communication, leadership, research, people, structured, riskTaking]
export const QUIZ_PROFILES = {
  // ==========================================
  // 1. TECH (7 Roadmaps)
  // ==========================================
  engineer: {
    domain: "tech",
    secondaryDomain: null,
    traits: { technical: 0.95, analytical: 0.65, creative: 0.55, business: 0.20, communication: 0.35, leadership: 0.30, research: 0.20, people: 0.15, structured: 0.68, riskTaking: 0.40 },
    tags: ["software-engineering", "fullstack", "system-design", "coding", "web-apps"],
  },
  "ai-ml-engineer": {
    domain: "tech",
    secondaryDomain: null,
    traits: { technical: 0.82, analytical: 0.98, creative: 0.20, business: 0.15, communication: 0.25, leadership: 0.15, research: 0.96, people: 0.10, structured: 0.45, riskTaking: 0.50 },
    tags: ["machine-learning", "neural-networks", "deep-learning", "mathematics", "data-modeling"],
  },
  "data-scientist": {
    domain: "tech",
    secondaryDomain: null,
    traits: { technical: 0.55, analytical: 0.95, creative: 0.15, business: 0.82, communication: 0.78, leadership: 0.35, research: 0.75, people: 0.35, structured: 0.45, riskTaking: 0.20 },
    tags: ["data-analytics", "predictive-modeling", "business-insights", "statistics", "python-sql"],
  },
  cybersecurity: {
    domain: "tech",
    secondaryDomain: null,
    traits: { technical: 0.88, analytical: 0.82, creative: 0.05, business: 0.20, communication: 0.40, leadership: 0.20, research: 0.60, people: 0.10, structured: 0.98, riskTaking: 0.05 },
    tags: ["infosec", "network-defense", "compliance", "penetration-testing", "security-audits"],
  },
  "cloud-architect": {
    domain: "tech",
    secondaryDomain: null,
    traits: { technical: 0.90, analytical: 0.60, creative: 0.15, business: 0.75, communication: 0.65, leadership: 0.82, research: 0.20, people: 0.40, structured: 0.88, riskTaking: 0.25 },
    tags: ["cloud-infrastructure", "devops", "scalability", "enterprise-architecture", "aws-azure"],
  },
  "blockchain-developer": {
    domain: "tech",
    secondaryDomain: null,
    traits: { technical: 0.94, analytical: 0.80, creative: 0.20, business: 0.55, communication: 0.20, leadership: 0.25, research: 0.65, people: 0.10, structured: 0.45, riskTaking: 0.95 },
    tags: ["web3", "cryptography", "smart-contracts", "ethereum-solidity", "decentralized-finance"],
  },
  "game-developer": {
    domain: "tech",
    secondaryDomain: null,
    traits: { technical: 0.75, analytical: 0.40, creative: 0.98, business: 0.15, communication: 0.40, leadership: 0.25, research: 0.10, people: 0.25, structured: 0.30, riskTaking: 0.72 },
    tags: ["game-engine", "unity-unreal", "3d-mechanics", "interactive-entertainment", "animation"],
  },

  // ==========================================
  // 2. HEALTHCARE (7 Roadmaps)
  // ==========================================
  doctor: {
    domain: "healthcare",
    secondaryDomain: null,
    traits: { technical: 0.35, analytical: 0.94, creative: 0.10, business: 0.15, communication: 0.78, leadership: 0.70, research: 0.85, people: 0.86, structured: 0.88, riskTaking: 0.20 },
    tags: ["medicine", "diagnosis", "clinical-treatment", "hospital-care", "patient-healing"],
  },
  dentist: {
    domain: "healthcare",
    secondaryDomain: null,
    traits: { technical: 0.72, analytical: 0.60, creative: 0.75, business: 0.72, communication: 0.55, leadership: 0.50, research: 0.20, people: 0.78, structured: 0.92, riskTaking: 0.12 },
    tags: ["oral-surgery", "dental-care", "clinic-practice", "dexterity", "aesthetic-dentistry"],
  },
  physiotherapist: {
    domain: "healthcare",
    secondaryDomain: null,
    traits: { technical: 0.42, analytical: 0.42, creative: 0.18, business: 0.32, communication: 0.85, leadership: 0.38, research: 0.25, people: 0.98, structured: 0.65, riskTaking: 0.12 },
    tags: ["physical-rehabilitation", "sports-injuries", "body-mobility", "manual-therapy", "ergonomics"],
  },
  pharmacist: {
    domain: "healthcare",
    secondaryDomain: null,
    traits: { technical: 0.52, analytical: 0.85, creative: 0.05, business: 0.45, communication: 0.52, leadership: 0.25, research: 0.75, people: 0.55, structured: 0.98, riskTaking: 0.05 },
    tags: ["pharmacology", "drug-safety", "dispensing", "biomedical-dosage", "toxicology"],
  },
  nutritionist: {
    domain: "healthcare",
    secondaryDomain: null,
    traits: { technical: 0.10, analytical: 0.48, creative: 0.52, business: 0.68, communication: 0.95, leadership: 0.35, research: 0.50, people: 0.85, structured: 0.75, riskTaking: 0.18 },
    tags: ["dietetics", "metabolic-health", "meal-design", "wellness-consulting", "preventative-health"],
  },
  psychologist: {
    domain: "healthcare",
    secondaryDomain: null,
    traits: { technical: 0.08, analytical: 0.82, creative: 0.35, business: 0.18, communication: 0.95, leadership: 0.35, research: 0.92, people: 0.98, structured: 0.40, riskTaking: 0.15 },
    tags: ["mental-health", "counseling", "behavioral-therapy", "psychological-assessment", "empathy"],
  },
  "fitness-trainer": {
    domain: "healthcare",
    secondaryDomain: null,
    traits: { technical: 0.20, analytical: 0.25, creative: 0.30, business: 0.68, communication: 0.88, leadership: 0.94, research: 0.15, people: 0.85, structured: 0.72, riskTaking: 0.60 },
    tags: ["exercise-coaching", "strength-conditioning", "athletic-performance", "discipline", "motivation"],
  },

  // ==========================================
  // 3. BUSINESS (7 Roadmaps)
  // ==========================================
  "startup-founder": {
    domain: "business",
    secondaryDomain: null,
    traits: { technical: 0.52, analytical: 0.65, creative: 0.65, business: 0.95, communication: 0.85, leadership: 0.98, research: 0.40, people: 0.55, structured: 0.20, riskTaking: 0.98 },
    tags: ["venture-creation", "fundraising", "market-disruption", "executive-leadership", "rapid-growth"],
  },
  "product-manager": {
    domain: "business",
    secondaryDomain: "tech",
    traits: { technical: 0.82, analytical: 0.82, creative: 0.55, business: 0.82, communication: 0.92, leadership: 0.88, research: 0.60, people: 0.72, structured: 0.65, riskTaking: 0.45 },
    tags: ["product-lifecycle", "tech-roadmaps", "user-experience", "metrics-kpis", "prioritization"],
  },
  "mba-manager": {
    domain: "business",
    secondaryDomain: null,
    traits: { technical: 0.15, analytical: 0.88, creative: 0.25, business: 0.98, communication: 0.80, leadership: 0.92, research: 0.45, people: 0.68, structured: 0.90, riskTaking: 0.45 },
    tags: ["general-management", "corporate-strategy", "p-and-l", "operations", "stakeholder-alignment"],
  },
  "marketing-manager": {
    domain: "business",
    secondaryDomain: null,
    traits: { technical: 0.15, analytical: 0.45, creative: 0.88, business: 0.88, communication: 0.96, leadership: 0.72, research: 0.45, people: 0.65, structured: 0.65, riskTaking: 0.55 },
    tags: ["brand-building", "campaign-strategy", "consumer-insights", "creative-storytelling", "market-reach"],
  },
  "digital-marketer": {
    domain: "business",
    secondaryDomain: null,
    traits: { technical: 0.62, analytical: 0.95, creative: 0.50, business: 0.82, communication: 0.55, leadership: 0.20, research: 0.45, people: 0.18, structured: 0.75, riskTaking: 0.48 },
    tags: ["performance-marketing", "seo-sem", "social-ads", "analytics-dashboards", "conversion-funnels"],
  },
  "human-resources": {
    domain: "business",
    secondaryDomain: null,
    traits: { technical: 0.08, analytical: 0.35, creative: 0.25, business: 0.58, communication: 0.95, leadership: 0.70, research: 0.30, people: 0.98, structured: 0.82, riskTaking: 0.15 },
    tags: ["talent-management", "organizational-culture", "employee-relations", "hiring", "conflict-resolution"],
  },
  "supply-chain": {
    domain: "business",
    secondaryDomain: null,
    traits: { technical: 0.62, analytical: 0.88, creative: 0.08, business: 0.82, communication: 0.52, leadership: 0.62, research: 0.35, people: 0.38, structured: 0.98, riskTaking: 0.15 },
    tags: ["logistics", "global-procurement", "inventory-optimization", "warehousing", "operations-efficiency"],
  },

  // ==========================================
  // 4. FINANCE (4 Roadmaps)
  // ==========================================
  "chartered-accountant": {
    domain: "finance",
    secondaryDomain: null,
    traits: { technical: 0.25, analytical: 0.80, creative: 0.02, business: 0.78, communication: 0.50, leadership: 0.40, research: 0.35, people: 0.42, structured: 0.98, riskTaking: 0.04 },
    tags: ["auditing", "taxation", "statutory-compliance", "financial-accounting", "corporate-governance"],
  },
  "investment-banker": {
    domain: "finance",
    secondaryDomain: null,
    traits: { technical: 0.40, analytical: 0.88, creative: 0.25, business: 0.98, communication: 0.90, leadership: 0.85, research: 0.68, people: 0.52, structured: 0.75, riskTaking: 0.85 },
    tags: ["mergers-and-acquisitions", "ipo", "corporate-finance", "capital-markets", "high-stakes-negotiation"],
  },
  "financial-analyst": {
    domain: "finance",
    secondaryDomain: null,
    traits: { technical: 0.52, analytical: 0.98, creative: 0.15, business: 0.94, communication: 0.55, leadership: 0.35, research: 0.90, people: 0.28, structured: 0.62, riskTaking: 0.42 },
    tags: ["financial-modeling", "equity-research", "market-analysis", "valuation", "excel-vba"],
  },
  actuary: {
    domain: "finance",
    secondaryDomain: "tech",
    traits: { technical: 0.85, analytical: 0.98, creative: 0.05, business: 0.52, communication: 0.25, leadership: 0.18, research: 0.88, people: 0.10, structured: 0.92, riskTaking: 0.08 },
    tags: ["actuarial-science", "probability-statistics", "risk-pricing", "insurance-models", "financial-mathematics"],
  },

  // ==========================================
  // 5. CREATIVE (5 Roadmaps)
  // ==========================================
  designer: {
    domain: "creative",
    secondaryDomain: "tech",
    traits: { technical: 0.68, analytical: 0.68, creative: 0.92, business: 0.52, communication: 0.75, leadership: 0.48, research: 0.82, people: 0.82, structured: 0.48, riskTaking: 0.42 },
    tags: ["ui-ux", "figma-prototyping", "user-experience", "interaction-design", "design-systems"],
  },
  "graphic-designer": {
    domain: "creative",
    secondaryDomain: null,
    traits: { technical: 0.45, analytical: 0.20, creative: 0.98, business: 0.35, communication: 0.70, leadership: 0.25, research: 0.25, people: 0.35, structured: 0.42, riskTaking: 0.55 },
    tags: ["branding", "visual-communication", "typography", "illustrator-photoshop", "layout-design"],
  },
  architect: {
    domain: "creative",
    secondaryDomain: "engineering",
    traits: { technical: 0.82, analytical: 0.85, creative: 0.86, business: 0.50, communication: 0.68, leadership: 0.70, research: 0.55, people: 0.35, structured: 0.96, riskTaking: 0.28 },
    tags: ["architectural-design", "spatial-planning", "cad-3d", "building-physics", "structural-aesthetics"],
  },
  "interior-designer": {
    domain: "creative",
    secondaryDomain: null,
    traits: { technical: 0.25, analytical: 0.42, creative: 0.95, business: 0.75, communication: 0.90, leadership: 0.58, research: 0.30, people: 0.88, structured: 0.72, riskTaking: 0.42 },
    tags: ["interior-spaces", "lighting-materials", "space-styling", "client-projects", "residential-commercial"],
  },
  "fashion-designer": {
    domain: "creative",
    secondaryDomain: null,
    traits: { technical: 0.20, analytical: 0.15, creative: 0.98, business: 0.78, communication: 0.62, leadership: 0.65, research: 0.42, people: 0.45, structured: 0.30, riskTaking: 0.86 },
    tags: ["apparel-design", "textiles", "fashion-collections", "trendsetting", "draping-garments"],
  },

  // ==========================================
  // 6. MEDIA (5 Roadmaps)
  // ==========================================
  "content-creator": {
    domain: "media",
    secondaryDomain: null,
    traits: { technical: 0.55, analytical: 0.40, creative: 0.92, business: 0.85, communication: 0.94, leadership: 0.42, research: 0.35, people: 0.65, structured: 0.22, riskTaking: 0.92 },
    tags: ["digital-content", "video-production", "youtube-social", "audience-building", "personal-brand"],
  },
  "film-director": {
    domain: "media",
    secondaryDomain: null,
    traits: { technical: 0.68, analytical: 0.55, creative: 0.98, business: 0.50, communication: 0.90, leadership: 0.98, research: 0.65, people: 0.85, structured: 0.65, riskTaking: 0.75 },
    tags: ["film-direction", "cinematic-storytelling", "screenplay", "actor-coaching", "post-production"],
  },
  photographer: {
    domain: "media",
    secondaryDomain: null,
    traits: { technical: 0.82, analytical: 0.25, creative: 0.95, business: 0.50, communication: 0.58, leadership: 0.30, research: 0.20, people: 0.62, structured: 0.48, riskTaking: 0.50 },
    tags: ["photography", "camera-lighting", "visual-framing", "photo-editing", "commercial-shoots"],
  },
  journalist: {
    domain: "media",
    secondaryDomain: null,
    traits: { technical: 0.25, analytical: 0.82, creative: 0.60, business: 0.25, communication: 0.98, leadership: 0.45, research: 0.98, people: 0.80, structured: 0.55, riskTaking: 0.75 },
    tags: ["investigative-journalism", "news-reporting", "interviewing", "story-investigation", "public-affairs"],
  },
  "public-relations": {
    domain: "media",
    secondaryDomain: null,
    traits: { technical: 0.10, analytical: 0.55, creative: 0.65, business: 0.90, communication: 0.98, leadership: 0.75, research: 0.48, people: 0.96, structured: 0.70, riskTaking: 0.45 },
    tags: ["pr-communications", "media-outreach", "crisis-communication", "brand-reputation", "press-management"],
  },

  // ==========================================
  // 7. ENGINEERING (2 Roadmaps)
  // ==========================================
  "mechanical-engineer": {
    domain: "engineering",
    secondaryDomain: null,
    traits: { technical: 0.95, analytical: 0.90, creative: 0.52, business: 0.25, communication: 0.35, leadership: 0.45, research: 0.58, people: 0.20, structured: 0.85, riskTaking: 0.35 },
    tags: ["thermodynamics", "cad-solidworks", "machines-engines", "manufacturing", "robotics-hardware"],
  },
  "civil-engineer": {
    domain: "engineering",
    secondaryDomain: null,
    traits: { technical: 0.78, analytical: 0.80, creative: 0.38, business: 0.62, communication: 0.70, leadership: 0.82, research: 0.42, people: 0.58, structured: 0.96, riskTaking: 0.25 },
    tags: ["structural-engineering", "construction-site", "urban-infrastructure", "surveying", "project-supervision"],
  },

  // ==========================================
  // 8. LAW & GOVERNANCE (3 Roadmaps)
  // ==========================================
  lawyer: {
    domain: "law_gov",
    secondaryDomain: null,
    traits: { technical: 0.15, analytical: 0.96, creative: 0.35, business: 0.82, communication: 0.98, leadership: 0.62, research: 0.96, people: 0.60, structured: 0.82, riskTaking: 0.35 },
    tags: ["corporate-law", "contracts-drafting", "court-advocacy", "statutory-interpretation", "legal-disputes"],
  },
  "civil-services": {
    domain: "law_gov",
    secondaryDomain: null,
    traits: { technical: 0.18, analytical: 0.78, creative: 0.25, business: 0.50, communication: 0.88, leadership: 0.98, research: 0.65, people: 0.96, structured: 0.96, riskTaking: 0.40 },
    tags: ["ias-ips", "district-governance", "public-administration", "policy-implementation", "bureaucracy"],
  },
  "army-officer": {
    domain: "law_gov",
    secondaryDomain: null,
    traits: { technical: 0.45, analytical: 0.68, creative: 0.10, business: 0.10, communication: 0.75, leadership: 0.98, research: 0.30, people: 0.75, structured: 0.98, riskTaking: 0.92 },
    tags: ["military-command", "tactical-operations", "defense-readiness", "unwavering-discipline", "courage"],
  },

  // ==========================================
  // 9. EDUCATION & SOCIAL (3 Roadmaps)
  // ==========================================
  teacher: {
    domain: "education_social",
    secondaryDomain: null,
    traits: { technical: 0.25, analytical: 0.55, creative: 0.70, business: 0.15, communication: 0.95, leadership: 0.70, research: 0.60, people: 0.95, structured: 0.95, riskTaking: 0.10 },
    tags: ["pedagogy", "curriculum-delivery", "student-mentorship", "classroom-teaching", "concept-mastery"],
  },
  "ed-tech": {
    domain: "education_social",
    secondaryDomain: "tech",
    traits: { technical: 0.75, analytical: 0.70, creative: 0.82, business: 0.88, communication: 0.90, leadership: 0.75, research: 0.45, people: 0.70, structured: 0.60, riskTaking: 0.78 },
    tags: ["online-education", "course-creation", "educational-technology", "digital-learning", "e-learning-business"],
  },
  "social-worker": {
    domain: "education_social",
    secondaryDomain: null,
    traits: { technical: 0.08, analytical: 0.45, creative: 0.38, business: 0.25, communication: 0.88, leadership: 0.65, research: 0.55, people: 0.98, structured: 0.55, riskTaking: 0.70 },
    tags: ["grassroots-development", "ngo-activism", "community-welfare", "human-rights", "social-impact"],
  },

  // ==========================================
  // 10. AVIATION & HOSPITALITY (3 Roadmaps)
  // ==========================================
  pilot: {
    domain: "aviation_hospitality",
    secondaryDomain: null,
    traits: { technical: 0.92, analytical: 0.82, creative: 0.08, business: 0.20, communication: 0.70, leadership: 0.78, research: 0.25, people: 0.32, structured: 0.98, riskTaking: 0.12 },
    tags: ["aviation", "cockpit-operations", "flight-navigation", "safety-procedures", "aircraft-systems"],
  },
  "hotel-management": {
    domain: "aviation_hospitality",
    secondaryDomain: null,
    traits: { technical: 0.15, analytical: 0.48, creative: 0.45, business: 0.90, communication: 0.94, leadership: 0.82, research: 0.20, people: 0.96, structured: 0.88, riskTaking: 0.25 },
    tags: ["luxury-hospitality", "resort-management", "guest-relations", "food-and-beverage", "front-office"],
  },
  "event-manager": {
    domain: "aviation_hospitality",
    secondaryDomain: null,
    traits: { technical: 0.35, analytical: 0.55, creative: 0.92, business: 0.80, communication: 0.92, leadership: 0.88, research: 0.38, people: 0.82, structured: 0.60, riskTaking: 0.75 },
    tags: ["event-production", "experiential-marketing", "wedding-planning", "stage-logistics", "vendor-management"],
  },

  // ==========================================
  // 11. SCIENCE (2 Roadmaps)
  // ==========================================
  biotechnologist: {
    domain: "science",
    secondaryDomain: "healthcare",
    traits: { technical: 0.85, analytical: 0.94, creative: 0.38, business: 0.35, communication: 0.45, leadership: 0.38, research: 0.98, people: 0.25, structured: 0.85, riskTaking: 0.42 },
    tags: ["genetic-engineering", "molecular-biology", "biopharma-research", "laboratory-assays", "biochemistry"],
  },
  "environmental-scientist": {
    domain: "science",
    secondaryDomain: null,
    traits: { technical: 0.52, analytical: 0.85, creative: 0.45, business: 0.42, communication: 0.80, leadership: 0.60, research: 0.95, people: 0.72, structured: 0.65, riskTaking: 0.45 },
    tags: ["ecology", "sustainability", "climate-science", "environmental-policy", "field-conservation"],
  },
};

/**
 * Calculates cosine similarity between two 10-dimensional trait vectors.
 * Returns value between 0.0 and 1.0.
 */
export function cosineSimilarity(traitsA = {}, traitsB = {}) {
  const keys = [
    "technical",
    "analytical",
    "creative",
    "business",
    "communication",
    "leadership",
    "research",
    "people",
    "structured",
    "riskTaking",
  ];

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (const k of keys) {
    const valA = Number(traitsA[k]) || 0;
    const valB = Number(traitsB[k]) || 0;
    dotProduct += valA * valB;
    normA += valA * valA;
    normB += valB * valB;
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Helper to retrieve domain information for a given roadmap slug
 */
export function getRoadmapDomain(slug) {
  if (!slug) return null;
  return DOMAIN_ROADMAP_MAP[slug] || null;
}

/**
 * Helper to retrieve all roadmap slugs belonging to a specific primary domain
 */
export function getRoadmapsByDomain(domain) {
  if (!domain) return [];
  return Object.entries(DOMAIN_ROADMAP_MAP)
    .filter(([, meta]) => meta.domain === domain)
    .map(([slug]) => slug);
}

/**
 * Single authoritative course profile provider and dynamic fallback inferrer.
 * If the course has an explicit quizProfile from MongoDB, formats and returns it.
 * Otherwise, infers domain, secondaryDomain, and calibrated traits using the 11-domain taxonomy.
 */
export function inferCourseProfile(course = {}) {
  const DIMENSION_KEYS = [
    "technical",
    "analytical",
    "creative",
    "business",
    "communication",
    "leadership",
    "research",
    "people",
    "structured",
    "riskTaking",
  ];

  // 1. If course already has a quizProfile from MongoDB, use it directly
  if (course.quizProfile && course.quizProfile.domain) {
    const qp = course.quizProfile;
    const dims100 = {};
    for (const k of DIMENSION_KEYS) {
      dims100[k] = Math.round(((qp.traits && qp.traits[k]) ?? 0.5) * 100);
    }
    return {
      domain: qp.domain,
      secondaryDomain: qp.secondaryDomain || null,
      family: qp.domain,
      title: course.title || "Career Roadmap",
      category: course.category || DOMAIN_LABELS[qp.domain] || "Career",
      icon: course.icon || "Briefcase",
      description: course.description || `Master the career roadmap for ${course.title || "this career"}.`,
      dimensions: dims100,
      traits: qp.traits,
      tags: qp.tags || [],
      quizProfile: qp,
      keyStrengths: course.skills?.slice(0, 3) || ["Professional competence", "Problem solving"],
      skillsToDevelop: ["Foundational domain concepts", "Practical project implementation"],
    };
  }

  // 2. Fallback dynamic inference using the 11 domains
  const category = (course.category || "").toLowerCase();
  const title = (course.title || "").toLowerCase();
  const skills = (course.skills || []).map((s) => s.toLowerCase());

  let domain = "tech";
  let secondaryDomain = null;

  const defaultTraits = {
    technical: 0.50,
    analytical: 0.50,
    creative: 0.50,
    business: 0.50,
    communication: 0.50,
    leadership: 0.50,
    research: 0.50,
    people: 0.50,
    structured: 0.50,
    riskTaking: 0.50,
  };

  // Domain detection
  if (category.includes("health") || category.includes("med") || title.includes("doctor") || title.includes("nurse") || title.includes("dentist")) {
    domain = "healthcare";
    defaultTraits.people = 0.85;
    defaultTraits.analytical = 0.80;
    defaultTraits.structured = 0.85;
    defaultTraits.technical = 0.40;
  } else if (category.includes("finance") || category.includes("account") || title.includes("bank") || title.includes("audit") || title.includes("tax")) {
    domain = "finance";
    defaultTraits.analytical = 0.90;
    defaultTraits.structured = 0.92;
    defaultTraits.business = 0.85;
    defaultTraits.riskTaking = 0.20;
  } else if (category.includes("law") || category.includes("legal") || category.includes("gov") || title.includes("lawyer") || title.includes("ias") || title.includes("civil")) {
    domain = "law_gov";
    defaultTraits.communication = 0.92;
    defaultTraits.analytical = 0.88;
    defaultTraits.structured = 0.88;
    defaultTraits.research = 0.85;
  } else if (category.includes("design") || category.includes("creative") || category.includes("art") || title.includes("designer") || title.includes("architect")) {
    domain = "creative";
    defaultTraits.creative = 0.95;
    defaultTraits.communication = 0.75;
    defaultTraits.analytical = 0.40;
    if (title.includes("architect")) secondaryDomain = "engineering";
    if (title.includes("ui") || title.includes("ux")) secondaryDomain = "tech";
  } else if (category.includes("media") || category.includes("film") || title.includes("creator") || title.includes("journal") || title.includes("video")) {
    domain = "media";
    defaultTraits.creative = 0.90;
    defaultTraits.communication = 0.95;
    defaultTraits.riskTaking = 0.70;
  } else if (category.includes("engineer") || title.includes("civil engineer") || title.includes("mechanical") || title.includes("robotics")) {
    domain = "engineering";
    defaultTraits.technical = 0.90;
    defaultTraits.analytical = 0.85;
    defaultTraits.structured = 0.88;
  } else if (category.includes("educat") || category.includes("teach") || category.includes("social") || title.includes("teacher")) {
    domain = "education_social";
    defaultTraits.people = 0.92;
    defaultTraits.communication = 0.90;
    defaultTraits.structured = 0.75;
    if (title.includes("ed-tech") || category.includes("tech")) secondaryDomain = "tech";
  } else if (category.includes("aviation") || category.includes("pilot") || category.includes("hotel") || category.includes("hospitality") || title.includes("event")) {
    domain = "aviation_hospitality";
    defaultTraits.structured = 0.85;
    defaultTraits.communication = 0.85;
    defaultTraits.people = 0.80;
  } else if (category.includes("science") || category.includes("bio") || category.includes("environ") || title.includes("biotech")) {
    domain = "science";
    defaultTraits.research = 0.95;
    defaultTraits.analytical = 0.88;
    defaultTraits.technical = 0.70;
    if (title.includes("bio")) secondaryDomain = "healthcare";
  } else if (category.includes("business") || category.includes("manage") || category.includes("market") || title.includes("founder") || title.includes("product")) {
    domain = "business";
    defaultTraits.business = 0.92;
    defaultTraits.leadership = 0.88;
    defaultTraits.communication = 0.85;
    if (title.includes("product")) secondaryDomain = "tech";
  } else {
    // Default to tech
    domain = "tech";
    defaultTraits.technical = 0.90;
    defaultTraits.analytical = 0.80;
    defaultTraits.structured = 0.70;
  }

  // Adjust for skills keywords
  if (skills.some((s) => s.includes("code") || s.includes("python") || s.includes("software"))) {
    defaultTraits.technical = Math.min(0.95, defaultTraits.technical + 0.15);
  }
  if (skills.some((s) => s.includes("lead") || s.includes("strategy") || s.includes("manage"))) {
    defaultTraits.leadership = Math.min(0.95, defaultTraits.leadership + 0.15);
  }
  if (skills.some((s) => s.includes("design") || s.includes("art") || s.includes("creative"))) {
    defaultTraits.creative = Math.min(0.95, defaultTraits.creative + 0.15);
  }

  const tags = (course.skills && course.skills.length > 0)
    ? course.skills.slice(0, 5).map((s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-"))
    : [domain, (course.category || "career").toLowerCase().replace(/[^a-z0-9]+/g, "-")];

  const dims100 = {};
  for (const k of DIMENSION_KEYS) {
    dims100[k] = Math.round((defaultTraits[k] || 0.5) * 100);
  }

  const inferredProfile = {
    domain,
    secondaryDomain,
    traits: defaultTraits,
    tags,
  };

  return {
    domain,
    secondaryDomain,
    family: domain,
    title: course.title || "Career Roadmap",
    category: course.category || DOMAIN_LABELS[domain] || "Career",
    icon: course.icon || "Briefcase",
    description: course.description || `Master the career roadmap for ${course.title || "this career"}.`,
    dimensions: dims100,
    traits: defaultTraits,
    tags,
    quizProfile: inferredProfile,
    keyStrengths: course.skills?.slice(0, 3) || ["Professional competence", "Problem solving"],
    skillsToDevelop: ["Foundational domain concepts", "Practical project implementation"],
  };
}
