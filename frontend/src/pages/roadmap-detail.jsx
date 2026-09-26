import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { useToast } from "@/hooks/use-toast";

import { useCourses } from "@/context/course-context";
import { CareerIcon } from "@/components/career-icon";
import { mentorVideos } from "@/lib/mock-data";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronRight,
  Lock,
  Briefcase,
  GraduationCap,
  Globe,
  IndianRupee,
  Clock,
  MessageSquare,
  TrendingUp,
  BookOpen,
  Play,
  Pencil,
  ExternalLink,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Target,
  GitBranch,
  ShieldAlert,
  Wrench,
  Compass,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/auth-context";
import { useVideos } from "@/context/video-context";
import { VideoPlayerModal } from "@/components/video-player-modal";
import { getCareerHeroImage } from "@/lib/career-media";
import {
  WhyChooseSection,
  CareerPathsSection,
  RightForYouSection,
  CoreSkillsSection,
  EntranceExamsSection,
  WhereToStudySection,
} from "@/components/roadmap/RoadmapSections";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
  }),
};

const TAG_COLORS = {
  "Reality Check": "bg-red-500/15 text-red-400 border-red-500/20",
  "Day in Life": "bg-amber-500/15 text-amber-400 border-amber-500/20",
  "Success Story": "bg-green-500/15 text-green-400 border-green-500/20",
  "Career Strategy": "bg-sky-500/15 text-sky-400 border-sky-500/20",
  "Career Comparison": "bg-violet-500/15 text-violet-400 border-violet-500/20",
  "Income & Monetization": "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
};

const RESOURCE_TYPE_STYLES = {
  course: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  book: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  tool: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  documentation: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  other: "bg-white/10 text-white/80 border-white/20",
};

function SectionHeading({ icon: Icon, title, badge }) {
  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center flex-shrink-0 shadow-sm shadow-amber-500/10">
          <Icon className="w-4 h-4 text-[#E5A855]" />
        </span>
        <span>{title}</span>
      </h2>
      {badge && (
        <span className="text-[11px] font-semibold text-[#E5A855] px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
          {badge}
        </span>
      )}
    </div>
  );
}

export default function RoadmapDetail() {
  const { career: careerId } = useParams();
  const { getCourseById, refreshCourse } = useCourses();
  const { videos: allDbVideos } = useVideos();
  const { user, isAuthenticated, isAdmin, toggleSaveRoadmap } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [expandedStages, setExpandedStages] = useState({ 0: true });

  const toggleStage = (idx) => {
    setExpandedStages((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const career = getCourseById(careerId);

  useEffect(() => {
    if (careerId && (isAdmin || isAuthenticated)) {
      refreshCourse?.(careerId);
    }
  }, [careerId, isAdmin, isAuthenticated, refreshCourse]);

  const attachedVideos = Array.isArray(career?.videos) && career.videos.length > 0
    ? career.videos
    : [];
  const dbVideos = allDbVideos.filter((v) => v.careerId === careerId);
  const roadmapVideos = attachedVideos.length > 0 ? attachedVideos : dbVideos;

  const normalizedId =
    careerId?.toLowerCase() === "personal-trainer"
      ? "fitness-trainer"
      : careerId?.toLowerCase();

  const isSaved = Array.isArray(user?.savedRoadmaps) && user.savedRoadmaps.includes(careerId);
  const hasAccess =
    Boolean(isAdmin) ||
    Boolean(user?.isPremium) ||
    Boolean(user?.subscription?.status === "active") ||
    Boolean(
      Array.isArray(user?.purchasedRoadmaps) &&
        normalizedId &&
        user.purchasedRoadmaps.some(
          (id) =>
            id.toLowerCase() === normalizedId ||
            (career?.id && id.toLowerCase() === career.id.toLowerCase())
        )
    );
  const isPurchased = hasAccess;

  const handleSaveRoadmap = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in to Save Roadmaps",
        description: "Please log in or create an account to bookmark roadmaps to your personal student dashboard.",
      });
      setLocation(`/login?redirect=${encodeURIComponent(`/dashboard?save=${careerId}`)}`);
      return;
    }

    const saved = await toggleSaveRoadmap(career.id);
    toast({
      title: saved ? "Roadmap Saved!" : "Roadmap Removed",
      description: saved
        ? `Added "${career?.title}" to your student dashboard.`
        : `Removed "${career?.title}" from your saved list.`,
    });

    if (saved) {
      setLocation("/dashboard");
    }
  };

  if (!career) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto py-20 px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#131316] border border-white/10 flex items-center justify-center mx-auto mb-4 text-[#E5A855]">
            <Compass className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3">Career Not Found</h1>
          <p className="text-muted-foreground mb-8 text-sm">
            We couldn't find the roadmap you're looking for.
          </p>
          <Button asChild className="bg-[#E5A855] hover:bg-[#d99640] text-black font-bold rounded-xl px-6">
            <Link href="/roadmaps">Back to Roadmaps</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const heroBg = getCareerHeroImage(career);

  const timeline = career.timeline || [];
  const paths = career.paths || [];
  const whyChoose = career.whyChoose || [];
  const whoShould = career.whoShould || [];
  const whoShouldAvoid = career.whoShouldAvoid || [];
  const skills = career.skills || [];
  const exams = career.exams || [];
  const colleges = career.colleges || [];
  const budgetColleges = career.budgetColleges || [];
  const abroad = career.abroad || [];
  const salaryExpectations = career.salaryExpectations || [];
  const dailyWork = career.dailyWork || [];
  const coursesList = career.courses || [];

  return (
    <Layout>
      {/* ── ATMOSPHERIC HERO BANNER WITH THEMATIC CAREER PHOTOGRAPHY ── */}
      <section className="relative w-full overflow-hidden bg-[#0d0d0f] border-b border-white/10">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={heroBg}
            alt={career.title}
            className="w-full h-full object-cover object-center opacity-30 md:opacity-40 scale-105"
          />
          {/* Seamless Dark Vignette Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0f] via-[#0d0d0f]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0f]/70 via-transparent to-[#0d0d0f]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-10 sm:pb-16">
          {/* Top Navigation Bar */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link
              href="/roadmaps"
              className="inline-flex items-center text-xs sm:text-sm text-muted-foreground hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 text-[#E5A855] group-hover:-translate-x-0.5 transition-transform" /> Back to all careers
            </Link>

            <div className="flex items-center gap-2">
              {isPurchased && (
                <>
                  <Button
                    size="sm"
                    onClick={() => window.dispatchEvent(new CustomEvent("growvia:open-chat"))}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-xl shadow-md shadow-emerald-600/25 flex items-center gap-1.5 transition-all cursor-pointer h-8 px-3"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Ask Vio
                  </Button>

                  <Button
                    asChild
                    size="sm"
                    className="bg-[#E5A855] hover:bg-[#d99640] text-black font-semibold text-xs rounded-xl shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all cursor-pointer h-8 px-3"
                  >
                    <Link href={`/get-counseling?career=${career.id}`}>
                      <Calendar className="w-3.5 h-3.5" />
                      1:1 Counseling
                    </Link>
                  </Button>
                </>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveRoadmap}
                className={`text-xs h-8 px-3 transition-all ${
                  isSaved && isAuthenticated
                    ? "border-amber-500/40 bg-amber-500/10 text-[#E5A855] hover:bg-amber-500/20"
                    : "border-white/15 text-muted-foreground hover:text-white hover:bg-white/10"
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 mr-1.5 ${isSaved && isAuthenticated ? "fill-[#E5A855] text-[#E5A855]" : ""}`} />
                {isAuthenticated && isSaved ? "Saved to Dashboard" : "Save Roadmap"}
              </Button>

              {isAdmin && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-amber-500/30 text-[#E5A855] bg-amber-500/5 hover:bg-amber-500/15 text-xs h-8 px-3"
                >
                  <Link href={`/admin/courses/${career.id}/edit`}>
                    <Pencil className="w-3.5 h-3.5 mr-1.5" /> Edit in Admin
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Hero Header Content */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-start gap-6 mb-10"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#131316] border border-amber-500/30 flex items-center justify-center text-[#E5A855] flex-shrink-0 shadow-xl shadow-amber-500/10">
              <CareerIcon icon={career.icon} size={36} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E5A855] px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10">
                  {career.category}
                </span>
                {isPurchased ? (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Roadmap Unlocked · Vio Active
                  </span>
                ) : (
                  <span className="text-[10px] uppercase font-medium tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10 flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> Vio AI with Purchase
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-3">
                {career.title}
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground/90 leading-relaxed max-w-3xl">
                {career.description}
              </p>
            </div>
          </motion.div>

          {/* Quick Stats Grid */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
          >
            {[
              { label: "Avg. Salary", value: career.stats?.salary || "N/A" },
              { label: "Market Demand", value: career.stats?.demand || "High" },
              { label: "Difficulty", value: career.stats?.difficulty || "Medium" },
              { label: "Investment", value: career.investment || "Moderate" },
            ].map((s, i) => (
              <div key={i} className="bg-[#131316] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-lg hover:border-amber-500/30 transition-all">
                <div className="text-[10px] sm:text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">{s.label}</div>
                <div className="text-base sm:text-lg font-black text-white leading-tight">
                  {s.value}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT CONTAINER ──────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {/* ── STEP-BY-STEP LEARNING ROADMAP TIMELINE ──────────────── */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionHeading icon={Clock} title="Step-by-Step Learning Roadmap" badge={`${timeline.length} Stages`} />

          {timeline.length === 0 ? (
            <div className="p-8 text-center bg-[#131316] border border-white/10 rounded-2xl text-muted-foreground text-sm">
              No roadmap stages configured yet for this career.
              <div className="mt-3">
                <Button asChild size="sm" variant="outline" className="border-white/15 text-xs">
                  <Link href={`/admin/courses/${career.id}/edit`}>
                    <Pencil className="w-3.5 h-3.5 mr-1.5" /> Add Stages in Admin
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 relative before:absolute before:left-5 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              {timeline.map((step, i) => {
                const decisionPointsList = Array.isArray(step.decisionPoints)
                  ? step.decisionPoints.map((dp) =>
                      typeof dp === "string" ? { question: dp, options: [] } : dp
                    )
                  : step.decisionPoints && typeof step.decisionPoints === "object"
                  ? [
                      {
                        question:
                          step.decisionPoints.title ||
                          step.decisionPoints.question ||
                          "Path Decision",
                        options: (step.decisionPoints.options || []).map((o) => ({
                          choice: o.choice || o.name || o.title || "",
                          pros:
                            o.pros ||
                            (o.prosCons
                              ? o.prosCons
                                  .split("Cons:")[0]
                                  ?.replace("Pros:", "")
                                  .trim()
                              : ""),
                          cons:
                            o.cons ||
                            (o.prosCons ? o.prosCons.split("Cons:")[1]?.trim() : ""),
                          description: o.description || o.desc || "",
                        })),
                      },
                    ]
                  : [];

                const statsList = Array.isArray(step.realWorldStats)
                  ? step.realWorldStats
                  : step.realWorldStats && typeof step.realWorldStats === "object"
                  ? [
                      step.realWorldStats.avgSalary && {
                        label: "Average Compensation",
                        value: step.realWorldStats.avgSalary,
                      },
                      step.realWorldStats.timelineToHire && {
                        label: "Timeline to Placement / Hire",
                        value: step.realWorldStats.timelineToHire,
                      },
                      step.realWorldStats.competitionRatio && {
                        label: "Competition / Selection Ratio",
                        value: step.realWorldStats.competitionRatio,
                      },
                    ].filter(Boolean)
                  : [];

                const hasRichContent = Boolean(
                  (step.actionItems && step.actionItems.length > 0) ||
                  (step.resources && step.resources.length > 0) ||
                  (step.investment && (step.investment.time || step.investment.cost || step.investment.difficulty)) ||
                  Boolean(step.checkpoint) ||
                  decisionPointsList.length > 0 ||
                  step.warning ||
                  step.fallbackPlan ||
                  statsList.length > 0
                );
                const isExpanded = Boolean(expandedStages[i]);

                return (
                  <div key={i} className="relative flex items-start gap-4 sm:gap-5 pl-12 sm:pl-14">
                    <div className="absolute left-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-amber-500/40 bg-[#131316] flex items-center justify-center text-[#E5A855] text-xs sm:text-sm font-bold shadow-lg z-10">
                      {i + 1}
                    </div>
                    <div className="bg-[#131316] border border-white/10 p-5 sm:p-6 rounded-2xl flex-1 hover:border-amber-500/30 transition-all shadow-md">
                      {/* Bold Stage Heading */}
                      <div className="text-[11px] text-[#E5A855] font-bold tracking-widest uppercase mb-1">
                        {step.year || `Stage ${i + 1}`}
                      </div>

                      {/* Subtitle / Stage Title */}
                      <h4 className="text-base sm:text-lg font-bold text-white mb-1.5">
                        {step.title || ""}
                      </h4>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {step.desc || ""}
                      </p>

                      {/* ── PAID TIER: EXPANDABLE STAGE DEEP DIVE ── */}
                      {isPurchased ? (
                        hasRichContent && (
                          <div className="mt-4 pt-3 border-t border-white/5 space-y-2.5">
                            <div className="flex items-center">
                              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-[#E5A855] border border-amber-500/25 inline-flex items-center gap-1">
                                <BookOpen className="w-2.5 h-2.5" /> Stage Guide Available
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => toggleStage(i)}
                              className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/25 text-xs font-semibold text-[#E5A855] transition-all group cursor-pointer"
                            >
                              <span className="flex items-center gap-2">
                                <BookOpen className="w-3.5 h-3.5 text-[#E5A855]" />
                                {isExpanded
                                  ? "Hide Detailed Stage Guide"
                                  : "View Detailed Stage Guide & Resources"}
                              </span>
                              <span className="text-[11px] opacity-80 group-hover:opacity-100 flex items-center gap-1 font-normal">
                                {isExpanded ? (
                                  <>
                                    Collapse <ChevronUp className="w-3.5 h-3.5" />
                                  </>
                                ) : (
                                  <>
                                    Expand Guide <ChevronDown className="w-3.5 h-3.5" />
                                  </>
                                )}
                              </span>
                            </button>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.25, ease: "easeInOut" }}
                                  className="overflow-hidden"
                                >
                                  <div className="pt-4 space-y-4">
                                    {/* 1. Time & Cost Investment */}
                                    {step.investment &&
                                      (step.investment.time || step.investment.cost || step.investment.difficulty) && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                                          {step.investment.time && (
                                            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#0d0d0f] border border-white/8 text-xs">
                                              <Clock className="w-4 h-4 text-sky-400 flex-shrink-0" />
                                              <div>
                                                <span className="text-muted-foreground block text-[10px] uppercase font-semibold">
                                                  Estimated Time
                                                </span>
                                                <span className="text-white font-medium">
                                                  {step.investment.time}
                                                </span>
                                              </div>
                                            </div>
                                          )}
                                          {step.investment.cost && (
                                            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#0d0d0f] border border-white/8 text-xs">
                                              <IndianRupee className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                              <div>
                                                <span className="text-muted-foreground block text-[10px] uppercase font-semibold">
                                                  Expected Cost
                                                </span>
                                                <span className="text-white font-medium">
                                                  {step.investment.cost}
                                                </span>
                                              </div>
                                            </div>
                                          )}
                                          {step.investment.difficulty && (
                                            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#0d0d0f] border border-white/8 text-xs sm:col-span-2 lg:col-span-1">
                                              <Target className="w-4 h-4 text-amber-400 flex-shrink-0" />
                                              <div>
                                                <span className="text-muted-foreground block text-[10px] uppercase font-semibold">
                                                  Stage Difficulty
                                                </span>
                                                <span className="text-white font-medium">
                                                  {step.investment.difficulty}
                                                </span>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      )}

                                    {/* 2. Key Action Items & Exercises */}
                                    {step.actionItems && step.actionItems.length > 0 && (
                                      <div className="space-y-2">
                                        <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                          Key Action Items &amp; Exercises
                                        </h5>
                                        <div className="space-y-2">
                                          {step.actionItems.map((item, aIdx) => (
                                            <div
                                              key={aIdx}
                                              className="p-3 rounded-xl bg-[#0d0d0f] border border-white/8 hover:border-white/15 transition-colors"
                                            >
                                              <div className="text-xs font-semibold text-white flex items-start gap-2.5">
                                                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold mt-0.5 flex-shrink-0">
                                                  {aIdx + 1}
                                                </span>
                                                <span>{typeof item === "string" ? item : item.task || item.title || ""}</span>
                                              </div>
                                              {typeof item === "object" && item.detail && (
                                                <p className="text-xs text-muted-foreground mt-1.5 pl-6 leading-relaxed">
                                                  {item.detail}
                                                </p>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* 3. Helpful Resources */}
                                    {step.resources && step.resources.length > 0 && (
                                      <div className="space-y-2">
                                        <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                                          <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                                          Curated Stage Resources &amp; Tools
                                        </h5>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                          {step.resources.map((res, rIdx) => {
                                            const rName = res.name || res.title || "Resource";
                                            const rType = (res.type || "course").toLowerCase();
                                            const rNote = res.note || res.notes || "";
                                            const rUrl = res.url || res.link || "";

                                            return (
                                              <div
                                                key={rIdx}
                                                className="p-3.5 rounded-xl bg-[#0d0d0f] border border-white/8 hover:border-amber-500/30 transition-colors flex flex-col justify-between"
                                              >
                                                <div>
                                                  <div className="flex items-center justify-between gap-2 mb-1.5">
                                                    <span
                                                      className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${
                                                        RESOURCE_TYPE_STYLES[rType] ||
                                                        RESOURCE_TYPE_STYLES.other
                                                      }`}
                                                    >
                                                      {rType}
                                                    </span>
                                                    {rUrl && (
                                                      <a
                                                        href={rUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[#E5A855] hover:text-[#d99640] transition-colors"
                                                        title="Open resource"
                                                      >
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                      </a>
                                                    )}
                                                  </div>
                                                  <div className="text-xs font-bold text-white mb-1">
                                                    {rName}
                                                  </div>
                                                  {rNote && (
                                                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                                                      {rNote}
                                                    </p>
                                                  )}
                                                </div>
                                                {rUrl && (
                                                  <div className="mt-2.5 pt-2 border-t border-white/5">
                                                    <a
                                                      href={rUrl}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="text-[11px] text-[#E5A855] hover:underline font-medium inline-flex items-center gap-1"
                                                    >
                                                      Open Link <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                  </div>
                                                )}
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    )}

                                    {/* 4. Milestone Readiness Checkpoint */}
                                    {step.checkpoint && (
                                      <div className="p-3.5 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20 space-y-2">
                                        <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                                          <Target className="w-3.5 h-3.5 text-emerald-400" />
                                          Milestone Readiness Checkpoint
                                        </div>
                                        {typeof step.checkpoint === "string" ? (
                                          <div className="text-xs text-slate-300 leading-relaxed">
                                            <strong className="text-white font-semibold">Requirement: </strong>
                                            {step.checkpoint}
                                          </div>
                                        ) : (
                                          <>
                                            {step.checkpoint.criteria && (
                                              <div className="text-xs text-slate-300 leading-relaxed">
                                                <strong className="text-white font-semibold">
                                                  Ready to advance when:
                                                </strong>
                                                {Array.isArray(step.checkpoint.criteria) ? (
                                                  <ul className="list-disc list-inside space-y-1 mt-1 pl-1 text-slate-300">
                                                    {step.checkpoint.criteria.map((c, cIdx) => (
                                                      <li key={cIdx}>{c}</li>
                                                    ))}
                                                  </ul>
                                                ) : (
                                                  <span className="ml-1.5">{step.checkpoint.criteria}</span>
                                                )}
                                              </div>
                                            )}
                                            {step.checkpoint.deliverable && (
                                              <div className="text-xs text-slate-300 leading-relaxed pt-1">
                                                <strong className="text-emerald-300 font-semibold">
                                                  Core Deliverable / Proof of Work:{" "}
                                                </strong>
                                                {step.checkpoint.deliverable}
                                              </div>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    )}

                                    {/* 5. Branching & Decision Points */}
                                    {decisionPointsList.length > 0 && (
                                      <div className="space-y-2">
                                        <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                                          <GitBranch className="w-3.5 h-3.5 text-purple-400" />
                                          Branching Options &amp; Path Decisions
                                        </h5>
                                        <div className="space-y-3">
                                          {decisionPointsList.map((dp, dpIdx) => (
                                            <div
                                              key={dpIdx}
                                              className="p-3.5 rounded-xl bg-purple-500/[0.04] border border-purple-500/20 space-y-2.5"
                                            >
                                              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                                                <span className="text-purple-400 font-semibold">
                                                  Decision:
                                                </span>{" "}
                                                {dp.question}
                                              </div>
                                              {dp.options && dp.options.length > 0 && (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                                                  {dp.options.map((opt, oIdx) => (
                                                    <div
                                                      key={oIdx}
                                                      className="p-2.5 rounded-lg bg-[#0d0d0f] border border-white/5 space-y-1.5"
                                                    >
                                                      <div className="text-xs font-bold text-purple-300">
                                                        {opt.choice}
                                                      </div>
                                                      {opt.description && (
                                                        <p className="text-[11px] text-muted-foreground leading-snug">
                                                          {opt.description}
                                                        </p>
                                                      )}
                                                      {opt.pros && (
                                                        <div className="text-[11px] text-emerald-300 leading-snug">
                                                          <span className="font-semibold text-emerald-400">
                                                            ✓ Pros:{" "}
                                                          </span>
                                                          {opt.pros}
                                                        </div>
                                                      )}
                                                      {opt.cons && (
                                                        <div className="text-[11px] text-amber-300 leading-snug">
                                                          <span className="font-semibold text-amber-400">
                                                            ⚠ Cons:{" "}
                                                          </span>
                                                          {opt.cons}
                                                        </div>
                                                      )}
                                                    </div>
                                                  ))}
                                                </div>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* 6. Common Pitfalls & Mistakes */}
                                    {step.warning && (
                                      <div className="p-3.5 rounded-xl bg-amber-500/[0.06] border border-amber-500/25 flex items-start gap-2.5">
                                        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                                        <div className="text-xs space-y-1">
                                          <span className="font-bold text-amber-300 block uppercase tracking-wider text-[10px]">
                                            Common Pitfalls to Avoid
                                          </span>
                                          <p className="text-slate-300 leading-relaxed">
                                            {step.warning}
                                          </p>
                                        </div>
                                      </div>
                                    )}

                                    {/* 7. Fallback & Backup Plan */}
                                    {step.fallbackPlan && (
                                      <div className="p-3.5 rounded-xl bg-indigo-500/[0.05] border border-indigo-500/20 flex items-start gap-2.5">
                                        <ShieldAlert className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                                        <div className="text-xs space-y-1">
                                          <span className="font-bold text-indigo-300 block uppercase tracking-wider text-[10px]">
                                            Fallback &amp; Pivot Strategy (If Stuck or Overwhelmed)
                                          </span>
                                          <p className="text-slate-300 leading-relaxed">
                                            {step.fallbackPlan}
                                          </p>
                                        </div>
                                      </div>
                                    )}

                                    {/* 8. Real-World Data Points & Benchmarks */}
                                    {statsList.length > 0 && (
                                      <div className="space-y-2">
                                        <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                                          <TrendingUp className="w-3.5 h-3.5 text-[#E5A855]" />
                                          Real-World Stage Benchmarks
                                        </h5>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                          {statsList.map((stat, sIdx) => (
                                            <div
                                              key={sIdx}
                                              className="p-2.5 rounded-xl bg-[#0d0d0f] border border-white/8"
                                            >
                                              <div className="text-[10px] uppercase font-semibold text-muted-foreground">
                                                {stat.label}
                                              </div>
                                              <div className="text-sm font-bold text-white mt-0.5">
                                                {stat.value}
                                              </div>
                                              {stat.context && (
                                                <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">
                                                  {stat.context}
                                                </div>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )
                      ) : (
                        /* ── FREE TIER: LOCKED TEASER PREVIEW ── */
                        <div className="mt-4 p-4 rounded-xl bg-[#0d0d0f] border border-dashed border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2.5 text-muted-foreground">
                            <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-[#E5A855] flex-shrink-0">
                              <Lock className="w-3.5 h-3.5 text-[#E5A855]" />
                            </div>
                            <span className="leading-snug">
                              <strong className="text-white font-medium">
                                Detailed Stage Guide &amp; Resources Locked:
                              </strong>{" "}
                              Exercises, curated tools, milestone checkpoints &amp; salary benchmarks unlocked in full roadmap.
                            </span>
                          </div>
                          <Button
                            asChild
                            size="sm"
                            className="bg-[#E5A855] hover:bg-[#d99640] text-black font-bold text-xs h-8 px-4 flex-shrink-0 rounded-xl shadow-md shadow-amber-500/20"
                          >
                            <Link href={`/pricing?career=${career.id}`}>
                              <Lock className="w-3 h-3 mr-1.5" /> Unlock on Purchase
                            </Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.section>

        {/* ── RECOMMENDED COURSES & CERTIFICATIONS (OPTIONAL SECTION) ── */}
        {coursesList.length > 0 && (
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionHeading icon={GraduationCap} title="Recommended Courses & Certifications" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coursesList.map((course, i) => (
                <div
                  key={i}
                  className="bg-[#131316] rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-amber-500/30 transition-all flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-[#E5A855] border border-amber-500/20">
                        {course.provider || "Curated Course"}
                      </span>
                      {course.badge && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-white/90">
                          {course.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#E69D43] transition-colors">
                      {course.title}
                    </h3>

                    {course.description && (
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                        {course.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto text-xs">
                    <div className="flex items-center gap-2 text-muted-foreground flex-wrap">
                      {course.duration && <span>{course.duration}</span>}
                      {course.level && <span>• {course.level}</span>}
                      {course.price && (
                        <span className="text-emerald-400 font-medium">
                          • {course.price}
                        </span>
                      )}
                    </div>

                    {course.url ? (
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-[#E5A855] hover:text-[#d99640] transition-colors ml-2"
                      >
                        View Course <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-xs text-muted-foreground">Self Paced</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ── 1. WHY CHOOSE (FREE) ── */}
        <WhyChooseSection whyChoose={whyChoose} hasAccess={hasAccess} />

        {/* ── 2. CAREER PATHS & SPECIALISATIONS (CONDITIONAL FREE + PREMIUM) ── */}
        <CareerPathsSection paths={paths} hasAccess={hasAccess} careerId={career.id} />

        {/* ── 3. IS THIS CAREER RIGHT FOR YOU (CONDITIONAL FREE + PREMIUM) ── */}
        <RightForYouSection
          whoShould={whoShould}
          whoShouldAvoid={whoShouldAvoid}
          harshReality={career.harshReality}
          incomeBreakdown={career.incomeBreakdown}
          timelineToProfitability={career.timelineToProfitability}
          clientsNeededForTarget={career.clientsNeededForTarget}
          hasAccess={hasAccess}
          careerId={career.id}
        />

        {/* ── 4. CORE SKILLS REQUIRED (CONDITIONAL FREE + PREMIUM) ── */}
        <CoreSkillsSection
          skills={skills}
          skillsData={career.skillsData}
          hasAccess={hasAccess}
          careerId={career.id}
        />

        {/* ── 5. KEY ENTRANCE EXAMS (CONDITIONAL FREE + PREMIUM) ── */}
        <EntranceExamsSection
          exams={exams}
          examsData={career.examsData}
          hasAccess={hasAccess}
          careerId={career.id}
        />

        {/* ── 6. WHERE TO STUDY (CONDITIONAL FREE + PREMIUM) ── */}
        <WhereToStudySection
          colleges={colleges}
          budgetColleges={budgetColleges}
          abroad={abroad}
          collegesData={career.collegesData}
          hasAccess={hasAccess}
          careerId={career.id}
        />



        {/* ── SALARY PROGRESSION ─────────────────────────────────── */}
        {salaryExpectations.length > 0 && (
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionHeading icon={IndianRupee} title="Salary Progression" />
            <div className="bg-[#131316] border border-white/10 rounded-2xl overflow-hidden shadow-md">
              {salaryExpectations.map((sal, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-xs sm:text-sm text-slate-300 font-medium">{sal.level}</span>
                  <span className="text-xs sm:text-sm font-bold text-[#E5A855] bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                    {sal.amount}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ── DAY IN LIFE ────────────────────────────────────────── */}
        {dailyWork.length > 0 && (
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionHeading icon={Briefcase} title="What You'll Actually Do Day-to-Day" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dailyWork.map((task, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-[#131316] border border-white/10 rounded-xl px-4 py-3 shadow-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-[#E5A855] mt-1.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">{task}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ── FIRST OPPORTUNITY ──────────────────────────────────── */}
        {career.firstOpportunity && (
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-[#131316] border border-amber-500/25 rounded-2xl p-6 shadow-md">
              <h3 className="text-base font-bold text-[#E5A855] mb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#E5A855]" /> How to Land Your First Opportunity
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {career.firstOpportunity}
              </p>
            </div>
          </motion.section>
        )}

        {/* ── INDUSTRY INSIGHTS ──────────────────────────────────── */}
        {career.industryInsights && (
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-[#131316] border border-white/10 rounded-2xl p-6 shadow-md">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#E5A855]" /> Industry Insights
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {career.industryInsights}
              </p>
            </div>
          </motion.section>
        )}

        {/* ── MENTOR VIDEOS & MASTERCLASSES ─────────────────────── */}
        {roadmapVideos.length > 0 && (
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionHeading icon={Play} title="Mentor Guidance & Masterclasses" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {roadmapVideos.map((v, i) => (
                <div
                  key={v._id || v.id || i}
                  onClick={() => setSelectedVideo(v)}
                  className="group bg-[#131316] rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 block cursor-pointer"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={v.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=640&q=80"}
                      alt={v.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E5A855] group-hover:text-black transition-all duration-300">
                        <Play className="w-4 h-4 text-white fill-white group-hover:text-black group-hover:fill-black ml-0.5 transition-colors" />
                      </div>
                    </div>

                    {/* Tag badge */}
                    <span
                      className={`absolute top-2 left-2 text-xs px-2.5 py-0.5 rounded-full border ${
                        TAG_COLORS[v.tag] ?? "bg-white/10 text-white/70 border-white/20"
                      }`}
                    >
                      {v.tag || "Masterclass"}
                    </span>

                    {/* Free vs Paid badge */}
                    <div className="absolute top-2 right-2">
                      {v.isPaid ? (
                        <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-[#E5A855] text-black font-bold shadow-md shadow-amber-500/20">
                          <Lock className="w-2.5 h-2.5" /> {v.price || "₹299"}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/90 text-white font-bold shadow-md shadow-emerald-500/20">
                          <CheckCircle2 className="w-2.5 h-2.5" /> FREE
                        </span>
                      )}
                    </div>

                    {v.duration && (
                      <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-0.5 rounded font-mono">
                        {v.duration}
                      </span>
                    )}
                  </div>

                  <div className="p-4 sm:p-5">
                    <p className="text-sm font-bold text-white leading-snug mb-1.5 line-clamp-2 group-hover:text-[#E69D43] transition-colors">
                      {v.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {v.mentor} {v.mentorRole ? `· ${v.mentorRole}` : ""}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-3 pt-3 border-t border-white/5">
                      <span>{v.views || "1.2K"} views</span>
                      <span className="text-[#E5A855] font-semibold flex items-center gap-1">
                        Watch Video →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ── 1:1 COUNSELING EXCLUSIVE PRIVILEGE (PURCHASED ONLY) ──────────────────── */}
        {isPurchased && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-[#131316] border border-amber-500/30 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-[#E5A855] flex-shrink-0 mt-0.5">
                  <Calendar className="w-6 h-6 text-[#E5A855]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5A855] bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                      Exclusive Privilege
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Unlocked with {career.title}
                    </span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white">
                    Book Your 1:1 Counseling &amp; Strategy Call
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl leading-relaxed">
                    Have questions about this roadmap? Book a private 1-on-1 strategy session with Sudhanshu. Review your milestones, optimize your portfolio, and tailor your interview readiness.
                  </p>
                </div>
              </div>

              <Button
                asChild
                className="bg-[#E5A855] hover:bg-[#d99640] text-black font-bold text-xs sm:text-sm h-11 px-6 rounded-xl shadow-lg shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer"
              >
                <Link href={`/get-counseling?career=${career.id}`}>
                  <Calendar className="w-4 h-4 text-black" />
                  <span>Get 1:1 Counseling</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        )}

        {/* ── UNLOCKED BANNER OR PREMIUM TEASER ──────────────────── */}
        {isPurchased ? (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-emerald-950/40 via-[#131316] to-[#0d0d0f] border border-emerald-500/30 text-center shadow-2xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto mb-4">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" /> Lifetime Access Active
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
              {career.title} Roadmap is Unlocked
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-xs sm:text-sm leading-relaxed">
              Your full step-by-step curriculum and dedicated 24/7 AI Career Advisor, Vio, are active. Ask specific questions about colleges, milestones, or study plans anytime.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={() => window.dispatchEvent(new CustomEvent("growvia:open-chat"))}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full px-7 shadow-lg shadow-emerald-600/25 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 mr-2" /> Chat with Vio
              </Button>
              <Button
                asChild
                className="bg-[#E5A855] hover:bg-[#d99640] text-black font-bold rounded-full px-7 shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <Link href={`/get-counseling?career=${career.id}`}>
                  <Calendar className="w-4 h-4 mr-2" /> Book 1:1 Counseling
                </Link>
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-amber-950/20 via-[#131316] to-[#0d0d0f] border border-amber-500/30 text-center shadow-2xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-[#E5A855] mx-auto mb-4">
              <Lock className="w-6 h-6 text-[#E5A855]" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[#E5A855] text-[11px] font-semibold uppercase tracking-wider mb-2">
              LIFETIME ACCESS · ₹199
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
              Want the Complete Roadmap &amp; <span className="text-[#E69D43]">Vio AI</span>?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-xs sm:text-sm leading-relaxed">
              Unlock printable step-by-step guides, curated resource lists, preparation strategies, and your dedicated 24/7 AI Career Advisor, Vio — all for just ₹199.
            </p>
            <Button
              asChild
              className="bg-[#E5A855] hover:bg-[#d99640] text-black font-bold rounded-full px-8 shadow-lg shadow-amber-500/20"
            >
              <Link
                href={
                  isAuthenticated
                    ? `/pricing?career=${career.id}`
                    : `/login?redirect=${encodeURIComponent(`/pricing?career=${career.id}`)}`
                }
              >
                Unlock for ₹199
              </Link>
            </Button>
          </motion.div>
        )}
      </div>

      {/* Video Player / Paid Unlock Modal */}
      <VideoPlayerModal
        video={selectedVideo}
        isOpen={Boolean(selectedVideo)}
        onClose={() => setSelectedVideo(null)}
      />
    </Layout>
  );
}
