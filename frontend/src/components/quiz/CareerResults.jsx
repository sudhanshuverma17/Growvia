import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import {
  Trophy,
  Medal,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Compass,
  CheckCircle2,
  TrendingUp,
  Target,
  Share2,
  Copy,
  Check,
  Brain,
  Lightbulb,
  ExternalLink,
  Lock,
} from "lucide-react";

// Trait display metadata
const TRAIT_INFO = {
  technical: {
    label: "Technical Aptitude",
    desc: "Coding, systems, infrastructure, algorithmic thinking",
    color: "from-blue-500 to-cyan-400",
  },
  analytical: {
    label: "Analytical Reasoning",
    desc: "Data-driven problem solving, metrics, logic",
    color: "from-indigo-500 to-purple-400",
  },
  creative: {
    label: "Creative Expression",
    desc: "Design, aesthetic intuition, visual communication",
    color: "from-amber-400 to-orange-400",
  },
  business: {
    label: "Business Acumen",
    desc: "Strategy, market dynamics, monetization, ROI",
    color: "from-emerald-400 to-teal-400",
  },
  social: {
    label: "People & Empathy",
    desc: "Interpersonal warmth, relationship-building, team harmony",
    color: "from-rose-400 to-pink-400",
  },
  leadership: {
    label: "Strategic Leadership",
    desc: "Vision, team motivation, decision-making under uncertainty",
    color: "from-amber-500 to-yellow-400",
  },
  research: {
    label: "In-depth Research",
    desc: "Methodological inquiry, literature exploration, rigor",
    color: "from-violet-400 to-purple-500",
  },
  helping: {
    label: "Mentorship & Helping",
    desc: "Service, teaching, patient care, community uplift",
    color: "from-teal-400 to-cyan-500",
  },
  communication: {
    label: "Clear Communication",
    desc: "Storytelling, writing, stakeholder alignment",
    color: "from-sky-400 to-blue-500",
  },
};

export function CareerResults({ resultData, onRetake }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Normalize data whether it's from submission response or fetched assessment document
  const traits = resultData?.normalizedScores || resultData?.traitScores || {};
  const recommendations =
    resultData?.recommendations || resultData?.topRecommendations || [];
  const topCareer =
    resultData?.topMatch || resultData?.topCareer || recommendations[0] || {};
  const aiAnalysis = resultData?.aiAnalysis || {};

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
          Your Career DNA Profile
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-3 leading-relaxed">
          Synthesized across 10 multi-dimensional assessments, deterministic trait models,
          and Growvia&apos;s live career taxonomy.
        </p>
      </motion.div>

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
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                <Trophy className="w-3.5 h-3.5" /> #1 Recommended Path
              </span>
              {topCareer.category && (
                <span className="text-xs text-muted-foreground px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                  {topCareer.category}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
              {topCareer.title || "Software Engineering"}
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mb-6">
              {topCareer.description ||
                aiAnalysis?.summary ||
                "Your responses show an outstanding affinity for structured problem-solving, algorithmic thinking, and building high-impact technology systems."}
            </p>

            {/* Quick badges */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl px-6 shadow-md shadow-primary/20"
              >
                <Link href={topCareer.roadmapUrl || `/roadmaps/${topCareer.careerId || "software-engineer"}`}>
                  View Complete Roadmap <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              <Button
                variant="outline"
                onClick={handleCopyLink}
                className="border-white/10 hover:bg-white/5 text-white rounded-xl text-xs sm:text-sm"
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
              Compatibility Match
            </div>
            <div className="text-5xl font-black text-primary font-mono tracking-tight my-1">
              {topCareer.matchPercentage || topCareer.compatibilityScore || 92}%
            </div>
            <div className="text-xs text-emerald-400 font-medium flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> High Confidence Fit
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── TOP 3 CAREER RECOMMENDATIONS ───────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Top 3 Career Matches
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Ranked by multi-trait compatibility across your profile
            </p>
          </div>
          <Link
            href="/roadmaps"
            className="text-xs sm:text-sm text-primary hover:underline font-medium hidden sm:inline-block"
          >
            Explore all roadmaps →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recommendations.slice(0, 3).map((item, idx) => {
            const isTop = idx === 0;
            const rankLabel = idx === 0 ? "1st" : idx === 1 ? "2nd" : "3rd";
            const badgeBg =
              idx === 0
                ? "bg-amber-400/20 text-amber-300 border-amber-400/30"
                : idx === 1
                ? "bg-slate-400/20 text-slate-200 border-slate-400/30"
                : "bg-amber-700/20 text-amber-200 border-amber-700/30";

            return (
              <motion.div
                key={item.careerId || idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 + 0.2 }}
                className={`rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                  isTop
                    ? "bg-card border-primary/30 ring-1 ring-primary/20 shadow-lg shadow-primary/5"
                    : "bg-card/60 border-white/10 hover:border-white/20 hover:bg-card"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-extrabold px-2.5 py-1 rounded-full border ${badgeBg}`}
                    >
                      {rankLabel} Match
                    </span>
                    <span className="font-mono text-sm font-bold text-primary">
                      {item.matchPercentage || item.compatibilityScore}%
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-1.5 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div>
                  {/* Match Bar */}
                  <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-full rounded-full ${
                        isTop ? "bg-primary" : "bg-white/40"
                      }`}
                      style={{
                        width: `${item.matchPercentage || item.compatibilityScore}%`,
                      }}
                    />
                  </div>

                  <Button
                    asChild
                    variant={isTop ? "default" : "outline"}
                    className={`w-full rounded-xl text-xs font-semibold ${
                      isTop
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border-white/15 text-white hover:bg-white/5"
                    }`}
                  >
                    <Link href={item.roadmapUrl || `/roadmaps/${item.careerId}`}>
                      Explore Roadmap <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
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
                  Identified Strengths & Focus Areas
                </h3>
                <p className="text-xs text-muted-foreground">
                  Synthesized from your response patterns
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
                  "High capacity for structured logical and analytical reasoning",
                  "Enjoys architecting complex solutions and hands-on implementation",
                  "Persistent problem-solving mindset when facing technical roadblocks",
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
                    Recommended immediate milestones for your journey
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {(aiAnalysis.nextSteps || [
                  "Review the recommended roadmap timeline and bookmark stage 1 foundational concepts.",
                  "Build a small hands-on starter project to validate your interest and day-to-day engagement.",
                  "Browse mentor masterclasses to understand how industry practitioners navigate this domain.",
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
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl h-10 sm:h-11 text-xs sm:text-sm shadow-sm"
              >
                <Link href={topCareer.roadmapUrl || `/roadmaps/${topCareer.careerId || "software-engineer"}`}>
                  Begin Step 1 on Roadmap <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-white/15 text-white hover:bg-white/5 rounded-xl h-9 sm:h-10 text-xs sm:text-sm"
              >
                <Link href="/videos">Browse Mentor Masterclasses</Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── 9-TRAIT PERSONALITY & SKILL BREAKDOWN ───────────── */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" /> Trait & Aptitude Breakdown
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Normalized scoring across 9 primary career-fitness dimensions (0–100 scale)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(TRAIT_INFO).map(([traitKey, info]) => {
            const score = Math.min(100, Math.max(0, traits[traitKey] || 0));
            const level = getTraitLevel(score);

            return (
              <div
                key={traitKey}
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
                so you can revisit these results anytime on your dashboard.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
            <Button
              asChild
              className="bg-primary text-primary-foreground font-bold rounded-xl w-full sm:w-auto"
            >
              <Link href="/login">Sign in / Register</Link>
            </Button>
          </div>
        </div>
      )}

      {/* ── BOTTOM ACTIONS ─────────────────────────────────── */}
      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          variant="outline"
          onClick={onRetake}
          className="border-white/15 hover:bg-white/5 text-white rounded-xl px-6 w-full sm:w-auto"
        >
          <RotateCcw className="w-4 h-4 mr-2" /> Retake Assessment
        </Button>

        <Button
          asChild
          className="bg-primary text-primary-foreground font-bold rounded-xl px-8 w-full sm:w-auto"
        >
          <Link href="/roadmaps">Explore All 18 Roadmaps</Link>
        </Button>
      </div>
    </div>
  );
}
