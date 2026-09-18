import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import {
  Trophy,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Compass,
  CheckCircle2,
  TrendingUp,
  Target,
  Share2,
  Check,
  Brain,
  Lightbulb,
  Lock,
  Layers,
  GraduationCap,
  Zap,
} from "lucide-react";

// The 10 standardized career dimensions
const DIMENSION_INFO = {
  technical: {
    label: "Technical & Systems",
    desc: "Coding, systems, infrastructure, algorithmic thinking",
    color: "from-blue-500 to-cyan-400",
  },
  analytical: {
    label: "Analytical & Logic",
    desc: "Data-driven deduction, metrics, pattern recognition",
    color: "from-indigo-500 to-purple-400",
  },
  creative: {
    label: "Creative & Design",
    desc: "Aesthetic intuition, visual thinking, original concepts",
    color: "from-amber-400 to-orange-400",
  },
  business: {
    label: "Business & Strategy",
    desc: "Market opportunities, commercial viability, growth ROI",
    color: "from-emerald-400 to-teal-400",
  },
  communication: {
    label: "Clear Communication",
    desc: "Storytelling, clarity, stakeholder persuasion, writing",
    color: "from-sky-400 to-blue-500",
  },
  leadership: {
    label: "Strategic Leadership",
    desc: "Inspiring teams, driving execution, ownership of vision",
    color: "from-amber-500 to-yellow-400",
  },
  research: {
    label: "In-depth Research",
    desc: "Methodological inquiry, literature exploration, scientific rigor",
    color: "from-violet-400 to-purple-500",
  },
  people: {
    label: "People & Empathy",
    desc: "Interpersonal warmth, relationship-building, psychological care",
    color: "from-rose-400 to-pink-400",
  },
  structured: {
    label: "Structure & Process",
    desc: "Disciplined execution, order, procedural reliability, compliance",
    color: "from-teal-400 to-cyan-500",
  },
  riskTaking: {
    label: "Innovation & Risk",
    desc: "Embracing ambiguity, bold experimentation, venture creation",
    color: "from-orange-500 to-rose-500",
  },
};

const FAMILY_LABELS = {
  technology: "Technology & Software",
  data: "Data & AI",
  design: "Design & Creative",
  business: "Business & Strategy",
  marketing: "Marketing & Growth",
  finance: "Finance & Accounting",
  healthcare: "Healthcare & Medicine",
  legal: "Law & Governance",
  media: "Media & Arts",
  engineering: "Core Engineering",
  education: "Education & Training",
  social: "Social Sciences",
  science: "Science & Research",
  operations: "Operations & Logistics",
  wellness: "Health & Wellness",
  hospitality: "Aviation & Hospitality",
};

export function CareerResults({ resultData, onRetake }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Normalize data whether it's from submission response or fetched assessment document
  const traits = resultData?.traitScores || resultData?.normalizedScores || {};
  const recommendations =
    resultData?.topRecommendations || resultData?.recommendations || [];
  const topCareer =
    resultData?.topMatch || recommendations[0] || {};
  const aiAnalysis = resultData?.aiAnalysis || {};
  const logicalProfile = aiAnalysis?.logicalProfile || resultData?.logicalProfile;

  // Confetti on mount
  useEffect(() => {
    try {
      const end = Date.now() + 2500;
      const interval = setInterval(() => {
        if (Date.now() > end) return clearInterval(interval);
        confetti({
          particleCount: 35,
          spread: 360,
          startVelocity: 25,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
          colors: ["#E8E0D0", "#38bdf8", "#f59e0b", "#10b981", "#ffffff"],
        });
      }, 250);
    } catch {
      // Ignore if canvas-confetti fails
    }
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast({
      title: "Link Copied!",
      description: "You can now share your career assessment profile.",
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const getTraitLevel = (score) => {
    if (score >= 75) return { label: "Exceptional", color: "text-emerald-400" };
    if (score >= 50) return { label: "Strong", color: "text-primary" };
    if (score >= 30) return { label: "Moderate", color: "text-amber-400" };
    return { label: "Developing", color: "text-muted-foreground" };
  };

  const getTopSlug = (career) => {
    return career?.roadmapId || career?.careerId || career?.id || "engineer";
  };

    const isTie = resultData?.tieBreaker?.isTie || topCareer?.isTie;

    return (
    <div className="space-y-12 py-4">
      {/* ── HEADER ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" /> Assessment Complete
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Your Career Recommendation Profile
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-3 leading-relaxed">
          Evaluated via cognitive reasoning analysis, multi-dimensional logical scoring,
          and verified Growvia database roadmaps.
        </p>
      </motion.div>

      {/* ── EVALUATED COGNITIVE PROFILE BANNER ─────────────────── */}
      {logicalProfile && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="rounded-3xl p-6 sm:p-8 border border-primary/20 bg-card/70 backdrop-blur-md shadow-xl relative overflow-hidden"
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/[0.04] rounded-full blur-[100px] pointer-events-none" />

          {/* Top Row: Badge & Category */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase font-bold tracking-wider text-primary bg-primary/10 border border-primary/25 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5" /> Evaluated Cognitive Profile
              </span>
            </div>
            <span className="text-xs text-muted-foreground font-mono bg-white/[0.03] px-3 py-1 rounded-full border border-white/5">
              Multi-Dimensional Cognitive Synthesis
            </span>
          </div>

          {/* Middle Row: Primary Style & Summary */}
          <div className="py-5 relative z-10 space-y-2.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {logicalProfile.primaryStyle || "Deductive Systems Thinker"}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground/90 leading-relaxed max-w-3xl">
              {logicalProfile.cognitiveSummary || aiAnalysis?.summary || "Your responses demonstrate an agile, structured approach to analyzing complex scenarios and executing decisive solutions."}
            </p>
          </div>

          {/* Bottom Row: Symmetrical 2-Column Reasoning & Strategy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 relative z-10">
            {/* Reasoning Card */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/30 transition-all duration-200">
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary mt-0.5">
                <Target className="w-4 h-4" />
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
                  Primary Reasoning Style
                </span>
                <p className="text-sm text-foreground/90 font-medium leading-snug">
                  {logicalProfile.reasoningStrength || "First-principles deconstruction"}
                </p>
              </div>
            </div>

            {/* Decision Strategy Card */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-400/30 transition-all duration-200">
              <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center flex-shrink-0 text-amber-400 mt-0.5">
                <Zap className="w-4 h-4" />
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                  Decision-Making Strategy
                </span>
                <p className="text-sm text-foreground/90 font-medium leading-snug">
                  {logicalProfile.decisionStrategy || "Deterministic verification"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── #1 TOP CAREER MATCH HIGHLIGHT ─────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="relative rounded-3xl p-6 sm:p-10 border border-primary/30 bg-gradient-to-b from-primary/[0.12] via-primary/[0.04] to-card/50 overflow-hidden shadow-[0_0_50px_rgba(232,224,208,0.08)]"
      >
        {/* Glow Accent */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                <Trophy className="w-3.5 h-3.5" /> {isTie ? "Top Match (Tie)" : "#1 Top Match"}
              </span>
              {topCareer.family && (
                <span className="text-xs text-primary/90 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 font-medium">
                  {FAMILY_LABELS[topCareer.family] || topCareer.family}
                </span>
              )}
              {topCareer.category && (
                <span className="text-xs text-muted-foreground px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                  {topCareer.category}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
              {topCareer.title || "Software Engineer"}
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mb-5">
              {topCareer.reason ||
                topCareer.llmReason ||
                topCareer.description ||
                aiAnalysis?.topCareer?.explanation ||
                aiAnalysis?.summary ||
                "Your responses demonstrate outstanding synergy with this career path."}
            </p>

            {/* Strengths tags */}
            {topCareer.keyStrengths && topCareer.keyStrengths.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {topCareer.keyStrengths.map((str, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-white/5 border border-white/10 text-white/80 px-2.5 py-1 rounded-lg"
                  >
                    ✓ {str}
                  </span>
                ))}
              </div>
            )}

            {/* Quick buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl px-6 shadow-md shadow-primary/20 cursor-pointer"
              >
                <Link href={topCareer.roadmapUrl || `/roadmaps/${getTopSlug(topCareer)}`}>
                  View Complete Roadmap <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              <Button
                variant="outline"
                onClick={handleCopyLink}
                className="border-white/10 hover:bg-white/5 text-white rounded-xl text-xs sm:text-sm cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2 text-emerald-400" /> Copied
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 mr-2" /> Share Profile
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Compatibility Score Circle / Indicator */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.04] border border-white/10 w-full sm:w-auto min-w-[200px] text-center">
            <div className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">
              Alignment Score
            </div>
            <div className="text-5xl font-black text-primary font-mono tracking-tight my-1">
              {topCareer.matchPercentage || topCareer.score || 92}%
            </div>
            <div className="text-xs text-emerald-400 font-medium flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> High Confidence Fit
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── 3–5 DIVERSE RECOMMENDED CAREER PATHS ────────────── */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" /> Top Recommended Career Directions
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Curated across distinct career families to offer diverse, viable paths with active roadmaps
            </p>
          </div>
          <Link
            href="/roadmaps"
            className="text-xs sm:text-sm text-primary hover:underline font-medium hidden sm:inline-block"
          >
            Explore all 48 roadmaps →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommendations.slice(0, 5).map((item, idx) => {
            const isTop = idx === 0;
            const isItemTie = item.isTie || (isTie && (idx === 0 || idx === 1));
            const rankText = isItemTie
              ? "Top Match (Tie)"
              : `${idx === 0 ? "1st" : idx === 1 ? "2nd" : idx === 2 ? "3rd" : `${idx + 1}th`} Match`;
            const badgeBg = isItemTie
              ? "bg-amber-400/20 text-amber-300 border-amber-400/30 ring-1 ring-amber-400/20"
              : idx === 0
              ? "bg-amber-400/20 text-amber-300 border-amber-400/30"
              : idx === 1
              ? "bg-slate-400/20 text-slate-200 border-slate-400/30"
              : idx === 2
              ? "bg-amber-700/20 text-amber-200 border-amber-700/30"
              : "bg-white/10 text-white/80 border-white/20";

            const slug = item.roadmapId || item.careerId || item.id;

            return (
              <motion.div
                key={slug || idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 + 0.15 }}
                className={`rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                  isTop || isItemTie
                    ? "bg-card border-primary/30 ring-1 ring-primary/20 shadow-lg shadow-primary/5"
                    : "bg-card/60 border-white/10 hover:border-white/20 hover:bg-card"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full border ${badgeBg}`}>
                      {rankText}
                    </span>
                    <span className="font-mono text-sm font-bold text-primary">
                      {item.matchPercentage || item.score}%
                    </span>
                  </div>

                  {item.family && (
                    <div className="mb-2">
                      <span className="text-[11px] font-medium text-primary/80 uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">
                        {FAMILY_LABELS[item.family] || item.family}
                      </span>
                    </div>
                  )}

                  <h4 className="text-lg font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-xs text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                    {item.reason || item.llmReason || item.description}
                  </p>

                  {/* Strengths */}
                  {item.keyStrengths && item.keyStrengths.length > 0 && (
                    <div className="mb-4">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block mb-1.5">
                        Key Strengths Needed
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.keyStrengths.slice(0, 2).map((str, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[11px] bg-white/[0.03] border border-white/10 text-white/70 px-2 py-0.5 rounded-md"
                          >
                            • {str}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  {/* Match Progress Bar */}
                  <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-full rounded-full ${
                        isTop ? "bg-primary" : "bg-white/40"
                      }`}
                      style={{
                        width: `${item.matchPercentage || item.score}%`,
                      }}
                    />
                  </div>

                  <Button
                    asChild
                    variant={isTop ? "default" : "outline"}
                    className={`w-full rounded-xl text-xs font-semibold h-10 cursor-pointer ${
                      isTop
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border-white/15 text-white hover:bg-white/5"
                    }`}
                  >
                    <Link href={item.roadmapUrl || `/roadmaps/${slug}`}>
                      View Roadmap <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── AI QUALITATIVE INSIGHTS & NEXT STEPS ───────────── */}
      {aiAnalysis && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Strengths & Growth Areas */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Profile Strengths & Focus Areas
                </h3>
                <p className="text-xs text-muted-foreground">
                  Synthesized qualitative analysis of your response patterns
                </p>
              </div>
            </div>

            {/* Strengths */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Core Strengths
              </h4>
              <ul className="space-y-2.5">
                {(aiAnalysis.strengths || [
                  "Strong orientation toward structured analytical problem solving",
                  "Enjoys designing mechanisms and seeing practical implementations",
                  "Persistent approach when untangling multi-stage challenges",
                ]).map((strength, i) => (
                  <li
                    key={i}
                    className="text-xs sm:text-sm text-foreground/90 flex items-start gap-2.5 bg-white/[0.02] p-3 rounded-xl border border-white/5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <span className="leading-relaxed">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Development Areas */}
            {aiAnalysis.developmentAreas && aiAnalysis.developmentAreas.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4" /> Growth & Expansion Areas
                </h4>
                <ul className="space-y-2.5">
                  {aiAnalysis.developmentAreas.map((area, i) => (
                    <li
                      key={i}
                      className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2.5 bg-white/[0.02] p-3 rounded-xl border border-white/5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Actionable Next Steps */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Actionable Next Steps
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Recommended milestones to turn assessment insights into progress
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {(aiAnalysis.nextSteps || [
                  "Review the recommended roadmap timeline and explore foundational concepts.",
                  "Complete an introductory starter tutorial to test day-to-day engagement.",
                  "Compare real-world work environments and compensation trajectories across your matches.",
                ]).map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 flex flex-col gap-2.5">
              <Button
                asChild
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl h-10 sm:h-11 text-xs sm:text-sm shadow-sm cursor-pointer"
              >
                <Link href={topCareer.roadmapUrl || `/roadmaps/${getTopSlug(topCareer)}`}>
                  Start Recommended Roadmap <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-white/15 text-white hover:bg-white/5 rounded-xl h-9 sm:h-10 text-xs sm:text-sm cursor-pointer"
              >
                <Link href="/videos">Browse Mentor Masterclasses</Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── 10-DIMENSION PROFILE BREAKDOWN ─────────────────── */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" /> Multi-Dimensional Profile Breakdown
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Normalized scores across the 10 standardized career dimensions (0–100 scale)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(DIMENSION_INFO).map(([dimKey, info]) => {
            const score = Math.min(100, Math.max(0, traits[dimKey] || 0));
            const level = getTraitLevel(score);

            return (
              <div
                key={dimKey}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-sm font-bold text-white">
                    {info.label}
                  </span>
                  <span className={`text-xs font-semibold ${level.color}`}>
                    {score}% • {level.label}
                  </span>
                </div>

                <p className="text-[11px] text-muted-foreground line-clamp-1 mb-3">
                  {info.desc}
                </p>

                {/* Progress bar */}
                <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden p-0.5">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${info.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── GUEST CTA BANNER (IF NOT LOGGED IN) ─────────────── */}
      {!user && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-primary/20 via-primary/10 to-card border border-primary/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary flex-shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">
                Save Your Career Assessment to Your Account
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                You took this quiz as a guest. Create a free Growvia account or sign in
                so you can revisit these results anytime on your student dashboard.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
            <Button
              asChild
              className="bg-primary text-primary-foreground font-bold rounded-xl w-full sm:w-auto cursor-pointer"
            >
              <Link href={`/login?redirect=${encodeURIComponent(typeof window !== "undefined" ? window.location.pathname + window.location.search : "/career-quiz")}`}>
                Sign in / Register
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* ── BOTTOM ACTIONS ─────────────────────────────────── */}
      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          variant="outline"
          onClick={onRetake}
          className="border-white/15 hover:bg-white/5 text-white rounded-xl px-6 w-full sm:w-auto cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 mr-2" /> Retake Assessment
        </Button>

        <Button
          asChild
          className="bg-primary text-primary-foreground font-bold rounded-xl px-8 w-full sm:w-auto cursor-pointer"
        >
          <Link href="/roadmaps">Explore All 48 Roadmaps</Link>
        </Button>
      </div>
    </div>
  );
}
