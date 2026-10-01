import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { GrowviaLogoMark } from "@/components/GrowviaLogo";
import { DOMAIN_LABELS } from "@/config/quiz-domains";
import {
  ArrowRight,
  RotateCcw,
  Compass,
  CheckCircle2,
  Target,
  Share2,
  Check,
  Brain,
  Lightbulb,
  Lock,
  Layers,
  Sparkles,
  Globe,
  Zap,
} from "lucide-react";

// Standardized 10 career dimensions definition
const DIMENSION_INFO = {
  technical: {
    label: "Technical & Systems",
    desc: "Computing systems, infrastructure, algorithmic reasoning",
    color: "from-sky-300 via-blue-200 to-white",
  },
  analytical: {
    label: "Analytical & Logic",
    desc: "Data interpretation, pattern discovery, structured deduction",
    color: "from-indigo-300 via-purple-200 to-white",
  },
  creative: {
    label: "Creative & Design",
    desc: "Aesthetic intuition, visual thinking, original concepts",
    color: "from-[#F5F0E8] via-amber-100 to-white",
  },
  business: {
    label: "Business & Strategy",
    desc: "Market dynamics, commercial viability, growth allocation",
    color: "from-emerald-300 via-teal-100 to-white",
  },
  communication: {
    label: "Clear Communication",
    desc: "Storytelling, clarity, stakeholder persuasion, writing",
    color: "from-cyan-300 via-blue-100 to-white",
  },
  leadership: {
    label: "Strategic Leadership",
    desc: "Inspiring teams, driving execution, ownership of vision",
    color: "from-amber-300 via-yellow-100 to-white",
  },
  research: {
    label: "In-depth Research",
    desc: "Methodological inquiry, literature exploration, scientific rigor",
    color: "from-violet-300 via-purple-100 to-white",
  },
  people: {
    label: "People & Empathy",
    desc: "Interpersonal warmth, relationship-building, collaborative care",
    color: "from-rose-300 via-pink-100 to-white",
  },
  structured: {
    label: "Structure & Process",
    desc: "Disciplined execution, order, procedural reliability, compliance",
    color: "from-teal-300 via-cyan-100 to-white",
  },
  riskTaking: {
    label: "Innovation & Risk",
    desc: "Embracing ambiguity, bold experimentation, agile iteration",
    color: "from-orange-300 via-amber-100 to-white",
  },
};

export function CareerResults({ resultData, onRetake }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Normalize data whether it's v3 payload, database document, or normalized legacy
  const traits = resultData?.traitScores || resultData?.normalizedScores || {};
  const picks =
    resultData?.picks && resultData.picks.length > 0
      ? resultData.picks
      : resultData?.topRecommendations || [];
  const topCareer = picks[0] || {};
  const analysis = resultData?.analysis || resultData?.aiAnalysis || {};
  const logicalProfile = analysis?.logicalProfile || resultData?.logicalProfile;
  const signal = resultData?.signal || { level: "mixed" };

  // Confetti celebration on mount
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
    if (score >= 75) return { label: "Exceptional", color: "text-[#F5F0E8] font-bold" };
    if (score >= 50) return { label: "Strong", color: "text-white/90 font-medium" };
    if (score >= 30) return { label: "Moderate", color: "text-white/60" };
    return { label: "Developing", color: "text-white/40" };
  };

  const getPickSlug = (career) => {
    return career?.slug || career?.roadmapId || career?.careerId || career?.id || "engineer";
  };

  // Find fact-grounded rationale for a specific pick
  const getPickRationale = (career) => {
    const slug = getPickSlug(career);
    if (Array.isArray(analysis?.pickRationales)) {
      const match = analysis.pickRationales.find((r) => r.slug === slug);
      if (match?.reason) return match.reason;
    } else if (analysis?.pickRationales && typeof analysis.pickRationales === "object") {
      if (analysis.pickRationales[slug]) return analysis.pickRationales[slug];
    }
    return career.whyMatch || career.reason || career.llmReason || career.description || "High alignment based on your stage 1 and stage 2 responses.";
  };

  const isTie = resultData?.tie?.isTie || resultData?.tieBreaker?.isTie || topCareer?.isTie;

  // Signal indicator styling
  const renderSignalBadge = () => {
    const level = signal.level || "mixed";
    if (level === "clear") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
          <Target className="w-3.5 h-3.5" /> High Directional Confidence
        </span>
      );
    }
    if (level === "open") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-semibold">
          <Globe className="w-3.5 h-3.5" /> Exploratory Multi-Disciplinary Horizon
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-[#E5A855] text-xs font-semibold">
        <Sparkles className="w-3.5 h-3.5" /> Balanced Cross-Domain Affinities
      </span>
    );
  };

  return (
    <div className="space-y-12 py-4">
      {/* ── HEADER ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-3xl mx-auto pt-2 pb-4"
      >
        {/* Outlined Growvia Hexagon Mark Watermark */}
        <div className="flex justify-center mb-5">
          <GrowviaLogoMark
            className="w-16 h-16 sm:w-20 sm:h-20 text-[#F5F0E8]/70 drop-shadow-[0_4px_28px_rgba(0,0,0,0.85)]"
            strokeWidth={1.8}
          />
        </div>

        {/* Assessment & Signal Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/15 bg-black/40 backdrop-blur-md text-[#F5F0E8] text-xs font-medium tracking-wide shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Adaptive Assessment Complete</span>
          </div>
          {renderSignalBadge()}
        </div>

        {/* Cinematic Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15] mb-3 drop-shadow-[0_2px_16px_rgba(0,0,0,0.8)]">
          Your Career Assessment Profile
        </h1>
        <p className="text-[#F5F0E8]/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
          Synthesized via two-stage adaptive cognitive scoring, multi-domain affinity mapping,
          and verified Growvia career roadmaps.
        </p>

        {/* Quick Header Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={onRetake}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm text-white/80 hover:text-white hover:border-white/40 hover:bg-white/10 text-xs font-medium transition-all cursor-pointer shadow-md"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Retake Assessment
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm text-white/80 hover:text-white hover:border-white/40 hover:bg-white/10 text-xs font-medium transition-all cursor-pointer shadow-md"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Link Copied
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" /> Share Profile
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* ── EVALUATED COGNITIVE PROFILE BANNER ─────────────────── */}
      {logicalProfile && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl p-6 sm:p-8 border border-white/10 bg-[#121215]/85 backdrop-blur-xl shadow-2xl shadow-black/50 relative overflow-hidden"
        >
          {/* Top Row: Badge & Category */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase font-bold tracking-wider text-[#F5F0E8] bg-white/5 border border-white/15 px-3.5 py-1 rounded-full flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-[#F5F0E8]" /> Evaluated Cognitive Profile
              </span>
            </div>
            <span className="text-xs text-[#F5F0E8]/70 font-mono bg-white/[0.03] px-3.5 py-1 rounded-full border border-white/10">
              Multi-Dimensional Cognitive Synthesis
            </span>
          </div>

          {/* Middle Row: Primary Style & Summary */}
          <div className="py-6 relative z-10 space-y-2.5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              {logicalProfile.primaryStyle || "Deductive Systems Architect"}
            </h2>
            <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-3xl font-light">
              {logicalProfile.cognitiveSummary || analysis?.summary || "Your responses demonstrate an agile, structured approach to analyzing complex scenarios and executing decisive solutions."}
            </p>
          </div>

          {/* Bottom Row: Symmetrical 2-Column Reasoning & Strategy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 relative z-10">
            {/* Reasoning Card */}
            <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-200">
              <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 text-[#F5F0E8] mt-0.5">
                <Target className="w-4 h-4" />
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5F0E8]/80 block">
                  Primary Reasoning Style
                </span>
                <p className="text-sm text-white font-medium leading-snug">
                  {logicalProfile.reasoningStrength || "First-principles deconstruction"}
                </p>
              </div>
            </div>

            {/* Decision Strategy Card */}
            <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-200">
              <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 text-[#F5F0E8] mt-0.5">
                <Zap className="w-4 h-4" />
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5F0E8]/80 block">
                  Decision-Making Strategy
                </span>
                <p className="text-sm text-white font-medium leading-snug">
                  {logicalProfile.decisionStrategy || "Deterministic verification and modular decomposition"}
                </p>
              </div>
            </div>
          </div>

          {/* Interest Themes Section (3 Themes) */}
          {Array.isArray(analysis?.interestThemes) && analysis.interestThemes.length > 0 && (
            <div className="mt-6 pt-5 border-t border-white/10 relative z-10">
              <span className="text-[11px] uppercase font-bold tracking-wider text-[#F5F0E8]/80 block mb-3">
                Core Interest Themes
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {analysis.interestThemes.slice(0, 3).map((theme, tIdx) => (
                  <div
                    key={tIdx}
                    className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 text-xs sm:text-[13px] text-white/90 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {tIdx + 1}
                    </span>
                    <span className="leading-snug font-light">{theme}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* ── ALL RECOMMENDED CAREER PATHS (GRID) ────────────── */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-[#F5F0E8]" /> Top Recommended Career Directions
            </h3>
            <p className="text-xs sm:text-sm text-white/60 mt-0.5 font-light">
              Curated across distinct career families with active step-by-step Growvia roadmaps
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/roadmaps"
              className="text-xs sm:text-sm text-[#F5F0E8] hover:underline font-medium"
            >
              Explore all 48 roadmaps →
            </Link>
          </div>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            picks.length <= 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
          } gap-4 sm:gap-5`}
        >
          {picks.slice(0, 5).map((item, idx) => {
            const isItemTie = item.isTie || (isTie && idx < 2);
            const isWildcard = item.kind === "wildcard";
            const isExplore = item.kind === "explore";

            let rankBadgeText = `${item.rank || idx + 1}${
              (item.rank || idx + 1) === 1 ? "st" : (item.rank || idx + 1) === 2 ? "nd" : (item.rank || idx + 1) === 3 ? "rd" : "th"
            } Match`;
            let rankBadgeStyle = "bg-white/5 text-white/70 border-white/10";

            if (isWildcard) {
              rankBadgeText = "✨ You Might Also Explore";
              rankBadgeStyle = "bg-purple-500/15 text-purple-300 border-purple-500/30 font-semibold shadow-sm";
            } else if (isExplore) {
              rankBadgeText = "🌐 Cross-Domain Discovery";
              rankBadgeStyle = "bg-cyan-500/15 text-cyan-300 border-cyan-500/30 font-semibold shadow-sm";
            } else if (isItemTie) {
              rankBadgeText = "Top Match (Tie)";
              rankBadgeStyle = "bg-[#F5F0E8]/15 text-[#F5F0E8] border-[#F5F0E8]/30 font-semibold";
            } else if (idx === 0) {
              rankBadgeText = "Top Match";
              rankBadgeStyle = "bg-[#F5F0E8]/15 text-[#F5F0E8] border-[#F5F0E8]/30 font-semibold";
            }

            const slug = getPickSlug(item);
            const matchPercentage = item.matchPct || item.matchPercentage || item.score || 75;
            const domainLabel = DOMAIN_LABELS[item.domain] || item.domain || DOMAIN_LABELS[item.family] || item.family || item.category || "General";
            const rationale = getPickRationale(item);

            return (
              <motion.div
                key={slug || idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 + 0.15 }}
                className={`rounded-3xl border bg-[#121215]/80 hover:bg-[#16161c] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-xl shadow-black/40 group ${
                  isWildcard
                    ? "border-purple-500/20 hover:border-purple-500/40"
                    : isExplore
                    ? "border-cyan-500/20 hover:border-cyan-500/40"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full border ${rankBadgeStyle}`}>
                      {rankBadgeText}
                    </span>
                    <span className="font-mono text-sm font-bold text-[#F5F0E8]">
                      {matchPercentage}%
                    </span>
                  </div>

                  {domainLabel && (
                    <div className="mb-2">
                      <span className="text-[10px] font-medium text-white/70 uppercase tracking-wider bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                        {domainLabel}
                      </span>
                    </div>
                  )}

                  <h4 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug group-hover:text-[#F5F0E8] transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-xs text-white/70 mb-4 line-clamp-3 leading-relaxed font-light">
                    {rationale}
                  </p>

                  {/* Strengths / Tag highlights if available */}
                  {item.keyStrengths && item.keyStrengths.length > 0 && (
                    <div className="mb-4">
                      <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider block mb-1.5">
                        Key Strengths Needed
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.keyStrengths.slice(0, 2).map((str, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[11px] bg-white/[0.04] border border-white/10 text-white/80 px-2.5 py-0.5 rounded-full"
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
                  <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-full rounded-full ${
                        isWildcard
                          ? "bg-gradient-to-r from-purple-400 to-pink-300"
                          : isExplore
                          ? "bg-gradient-to-r from-cyan-400 to-sky-200"
                          : "bg-[#F5F0E8]"
                      }`}
                      style={{
                        width: `${matchPercentage}%`,
                      }}
                    />
                  </div>

                  {/* Roadmap Action Button */}
                  <Button
                    asChild
                    className="w-full bg-[#F5F0E8] text-[#121212] hover:bg-white rounded-full text-xs font-semibold h-10 cursor-pointer shadow-md shadow-black/30 group-hover:shadow-lg transition-all duration-200"
                  >
                    <Link href={item.roadmapUrl || `/roadmaps/${slug}`}>
                      <span>View Roadmap</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── AI QUALITATIVE INSIGHTS & NEXT STEPS ───────────── */}
      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Strengths & Skills This Path Rewards */}
          <div className="bg-[#121215]/80 p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 shadow-xl shadow-black/40">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[#F5F0E8]">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Core Strengths & Skills Rewarded
                </h3>
                <p className="text-xs text-white/60 font-light">
                  Qualitative synthesis of your response patterns and pathway requirements
                </p>
              </div>
            </div>

            {/* Core Strengths */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F0E8] mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Natural Affinities & Strengths
              </h4>
              <ul className="space-y-2.5">
                {(analysis.strengths || [
                  "Strong orientation toward structured analytical problem solving",
                  "Enjoys designing mechanisms and seeing practical implementations",
                  "Persistent approach when untangling multi-stage challenges",
                ]).map((strength, i) => (
                  <li
                    key={i}
                    className="text-xs sm:text-sm text-white/90 flex items-start gap-2.5 bg-white/[0.02] p-3 rounded-2xl border border-white/5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <span className="leading-relaxed font-light">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills This Path Rewards */}
            {(analysis.developmentAreas || analysis.skillsRewarded) && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F0E8]/80 mb-1 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-300" /> Skills This Path Rewards
                </h4>
                <p className="text-[11px] text-white/50 mb-3 font-light">
                  Key capabilities emphasized in your top recommended career trajectories
                </p>
                <ul className="space-y-2.5">
                  {(analysis.developmentAreas || analysis.skillsRewarded).slice(0, 2).map((skill, i) => (
                    <li
                      key={i}
                      className="text-xs sm:text-sm text-white/80 flex items-start gap-2.5 bg-white/[0.02] p-3 rounded-2xl border border-white/5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-300/80 mt-2 flex-shrink-0" />
                      <span className="leading-relaxed font-light">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Actionable Next Steps */}
          <div className="bg-[#121215]/80 p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between shadow-xl shadow-black/40">
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[#F5F0E8]">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Actionable Next Steps
                  </h3>
                  <p className="text-xs text-white/60 font-light">
                    Recommended milestones to turn assessment insights into tangible progress
                  </p>
                </div>
              </div>

              <div className="space-y-3.5">
                {(analysis.nextSteps || [
                  `Explore foundational milestones for ${topCareer.title || "your top match"} on the Growvia roadmap.`,
                  "Complete an introductory starter tutorial to test day-to-day engagement.",
                  "Review real-world work environments and compensation trajectories across your matches.",
                ]).slice(0, 3).map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5"
                  >
                    <div className="w-6 h-6 rounded-full bg-white/10 border border-white/15 text-[#F5F0E8] font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-light">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                className="flex-1 bg-[#F5F0E8] text-[#121212] hover:bg-white font-semibold rounded-full h-11 text-xs sm:text-sm shadow-md cursor-pointer transition-all"
              >
                <Link href={topCareer.roadmapUrl || `/roadmaps/${getPickSlug(topCareer)}`}>
                  Start Recommended Roadmap <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/20 bg-black/30 backdrop-blur-sm text-[#F5F0E8] hover:bg-white/10 hover:border-white/40 rounded-full h-11 text-xs sm:text-sm cursor-pointer transition-all"
              >
                <Link href="/videos">Browse Mentor Masterclasses</Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── 10-DIMENSION PROFILE BREAKDOWN (STRICTLY "Profile of your top matches") ── */}
      <div className="bg-[#121215]/80 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl shadow-black/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <Brain className="w-6 h-6 text-[#F5F0E8]" /> Profile of your top matches
            </h3>
            <p className="text-xs sm:text-sm text-white/60 mt-1 font-light">
              Dimensions emphasized across your recommended career trajectories (0–100 scale)
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
                  <span className={`text-xs ${level.color}`}>
                    {score}% • {level.label}
                  </span>
                </div>

                <p className="text-[11px] text-white/50 line-clamp-1 mb-3 font-light">
                  {info.desc}
                </p>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
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
        <div className="p-6 sm:p-8 rounded-3xl bg-[#121215]/80 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-black/40">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[#F5F0E8] flex-shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">
                Save Your Career Assessment to Your Account
              </h4>
              <p className="text-xs sm:text-sm text-white/60 max-w-xl font-light">
                You took this quiz as a guest. Create a free Growvia account or sign in
                so you can revisit these results anytime on your student dashboard.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
            <Button
              asChild
              className="bg-[#F5F0E8] text-[#121212] hover:bg-white font-semibold rounded-full px-7 py-3 w-full sm:w-auto cursor-pointer shadow-md shadow-black/30 transition-all"
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
          className="border-white/20 bg-black/30 backdrop-blur-sm text-[#F5F0E8] hover:bg-white/10 hover:border-white/40 rounded-full px-7 h-12 w-full sm:w-auto cursor-pointer text-sm font-medium transition-all"
        >
          <RotateCcw className="w-4 h-4 mr-2" /> Retake Assessment
        </Button>

        <Button
          asChild
          className="bg-[#F5F0E8] text-[#121212] hover:bg-white font-semibold rounded-full px-8 h-12 w-full sm:w-auto cursor-pointer text-sm shadow-xl shadow-black/30 transition-all"
        >
          <Link href="/roadmaps">Explore All 48 Roadmaps</Link>
        </Button>
      </div>
    </div>
  );
}
