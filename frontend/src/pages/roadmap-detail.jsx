import { useState } from "react";
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
  Sparkles,
  TrendingUp,
  BookOpen,
  Play,
  Pencil,
  ExternalLink,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth-context";
import { useVideos } from "@/context/video-context";
import { VideoPlayerModal } from "@/components/video-player-modal";



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

function SectionHeading({ icon: Icon, title }) {
  return (
    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
      <span className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-primary" />
      </span>
      {title}
    </h2>
  );
}

export default function RoadmapDetail() {
  const { career: careerId } = useParams();
  const { getCourseById } = useCourses();
  const { videos: allDbVideos } = useVideos();
  const { user, isAuthenticated, isAdmin, toggleSaveRoadmap } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const career = getCourseById(careerId);

  const attachedVideos = Array.isArray(career?.videos) && career.videos.length > 0
    ? career.videos
    : [];
  const dbVideos = allDbVideos.filter((v) => v.careerId === careerId);
  const roadmapVideos = attachedVideos.length > 0 ? attachedVideos : dbVideos;

  const isSaved = Array.isArray(user?.savedRoadmaps) && user.savedRoadmaps.includes(careerId);

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
        <div className="max-w-3xl mx-auto py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Career Not Found</h1>
          <p className="text-muted-foreground mb-8">
            We couldn't find the roadmap you're looking for.
          </p>
          <Button asChild>
            <Link href="/roadmaps">Back to Roadmaps</Link>
          </Button>
        </div>
      </Layout>
    );
  }

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/roadmaps"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to all careers
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveRoadmap}
              className={`text-xs transition-all ${
                isSaved && isAuthenticated
                  ? "border-primary bg-primary/10 text-primary hover:bg-primary/20"
                  : "border-white/15 text-muted-foreground hover:text-white hover:bg-white/10"
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 mr-1.5 ${isSaved && isAuthenticated ? "fill-primary text-primary" : ""}`} />
              {isAuthenticated && isSaved ? "Saved to Dashboard" : "Save Roadmap"}
            </Button>

            {isAdmin && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-primary/30 text-primary bg-primary/5 hover:bg-primary/15 text-xs"
              >
                <Link href={`/admin/courses/${career.id}/edit`}>
                  <Pencil className="w-3.5 h-3.5 mr-1.5" /> Edit in Admin
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-start gap-6 mb-10"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0 shadow-lg shadow-primary/10">
            <CareerIcon icon={career.icon} size={38} />
          </div>
          <div>
            <div className="text-sm text-primary font-semibold mb-1 uppercase tracking-widest">
              {career.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {career.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {career.description}
            </p>
          </div>
        </motion.div>

        {/* ── QUICK STATS ────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14"
        >
          {[
            { label: "Avg. Salary", value: career.stats?.salary || "N/A" },
            { label: "Market Demand", value: career.stats?.demand || "High" },
            { label: "Difficulty", value: career.stats?.difficulty || "Medium" },
            { label: "Investment", value: career.investment || "Moderate" },
          ].map((s, i) => (
            <div key={i} className="glass-card p-4 rounded-2xl">
              <div className="text-xs text-muted-foreground mb-1">{s.label}</div>
              <div className="text-base font-bold text-white leading-tight">
                {s.value}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── STEP-BY-STEP LEARNING ROADMAP TIMELINE ──────────────── */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-14"
        >
          <SectionHeading icon={Clock} title="Step-by-Step Learning Roadmap" />

          {timeline.length === 0 ? (
            <div className="p-8 text-center bg-white/[0.02] border border-white/10 rounded-2xl text-muted-foreground text-sm">
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
              {timeline.map((step, i) => (
                <div key={i} className="relative flex items-start gap-5 pl-14">
                  <div className="absolute left-0 w-10 h-10 rounded-full border border-primary/40 bg-card flex items-center justify-center text-primary text-sm font-bold shadow z-10">
                    {i + 1}
                  </div>
                  <div className="glass-card p-5 rounded-xl flex-1 hover:border-primary/30 transition-colors">
                    <div className="text-xs text-primary font-bold tracking-widest uppercase mb-1">
                      {step.year}
                    </div>
                    <h4 className="text-base font-bold text-white mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
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
            className="mb-14"
          >
            <SectionHeading icon={GraduationCap} title="Recommended Courses & Certifications" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coursesList.map((course, i) => (
                <div
                  key={i}
                  className="glass-card rounded-2xl p-5 border border-white/10 hover:border-primary/30 transition-all flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25">
                        {course.provider || "Curated Course"}
                      </span>
                      {course.badge && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-white/90">
                          {course.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-primary transition-colors">
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
                        className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary/80 transition-colors ml-2"
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

        {/* ── WHY CHOOSE ─────────────────────────────────────────── */}
        {whyChoose.length > 0 && (
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14"
          >
            <SectionHeading icon={Sparkles} title="Why Choose This Career?" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {whyChoose.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white/[0.03] border border-white/8 rounded-xl p-4"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ── CAREER PATHS ───────────────────────────────────────── */}
        {paths.length > 0 && (
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14"
          >
            <SectionHeading icon={Briefcase} title="Career Paths & Specialisations" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {paths.map((path, i) => (
                <div
                  key={i}
                  className="glass-card rounded-xl p-5 border border-white/10 hover:border-primary/30 transition-colors"
                >
                  <div className="text-sm font-bold text-white mb-2">
                    {path.title}
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    {path.desc}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ── FIT CHECK ──────────────────────────────────────────── */}
        {(whoShould.length > 0 || whoShouldAvoid.length > 0) && (
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14"
          >
            <SectionHeading icon={CheckCircle2} title="Is This Career Right for You?" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {whoShould.length > 0 && (
                <div className="bg-green-500/5 border border-green-500/15 rounded-2xl p-6">
                  <h3 className="text-base font-bold text-green-400 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Choose this if you…
                  </h3>
                  <ul className="space-y-3">
                    {whoShould.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />{" "}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {whoShouldAvoid.length > 0 && (
                <div className="bg-red-500/5 border border-red-500/15 rounded-2xl p-6">
                  <h3 className="text-base font-bold text-red-400 mb-4 flex items-center gap-2">
                    <XCircle className="w-4 h-4" /> Avoid this if you…
                  </h3>
                  <ul className="space-y-3">
                    {whoShouldAvoid.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />{" "}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.section>
        )}

        {/* ── HARSH REALITY ──────────────────────────────────────── */}
        {career.harshReality && (
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-destructive mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> The Harsh Reality
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {career.harshReality}
              </p>
            </div>
          </motion.section>
        )}

        {/* ── CORE SKILLS ────────────────────────────────────────── */}
        {skills.length > 0 && (
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14"
          >
            <SectionHeading icon={TrendingUp} title="Core Skills Required" />
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white hover:bg-white/10 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {/* ── ENTRANCE EXAMS ─────────────────────────────────────── */}
        {exams.length > 0 && (
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14"
          >
            <SectionHeading icon={BookOpen} title="Key Entrance Exams" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {exams.map((exam, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3"
                >
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{exam}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ── COLLEGES ───────────────────────────────────────────── */}
        {(colleges.length > 0 || budgetColleges.length > 0 || abroad.length > 0) && (
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14"
          >
            <SectionHeading icon={GraduationCap} title="Where to Study" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {colleges.length > 0 && (
                <div className="bg-card border border-white/10 rounded-2xl overflow-hidden">
                  <div className="px-5 py-3 bg-white/5 border-b border-white/10">
                    <div className="text-sm font-bold text-white">Top Colleges (India)</div>
                  </div>
                  <ul className="p-5 space-y-2.5">
                    {colleges.map((c, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {budgetColleges.length > 0 && (
                <div className="bg-card border border-white/10 rounded-2xl overflow-hidden">
                  <div className="px-5 py-3 bg-white/5 border-b border-white/10">
                    <div className="text-sm font-bold text-white">Budget / Govt Options</div>
                  </div>
                  <ul className="p-5 space-y-2.5">
                    {budgetColleges.map((c, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {abroad.length > 0 && (
                <div className="bg-card border border-white/10 rounded-2xl overflow-hidden">
                  <div className="px-5 py-3 bg-white/5 border-b border-white/10">
                    <div className="text-sm font-bold text-white">Study Abroad Options</div>
                  </div>
                  <ul className="p-5 space-y-2.5">
                    {abroad.map((c, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.section>
        )}

        {/* ── SALARY PROGRESSION ─────────────────────────────────── */}
        {salaryExpectations.length > 0 && (
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14"
          >
            <SectionHeading icon={IndianRupee} title="Salary Progression" />
            <div className="bg-card border border-white/10 rounded-2xl overflow-hidden">
              {salaryExpectations.map((sal, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center px-6 py-4 border-b border-white/5 last:border-0"
                >
                  <span className="text-sm text-muted-foreground">{sal.level}</span>
                  <span className="text-sm font-bold text-white bg-white/5 px-3 py-1 rounded-full">
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
            className="mb-14"
          >
            <SectionHeading icon={Briefcase} title="What You'll Actually Do Day-to-Day" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dailyWork.map((task, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3"
                >
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{task}</span>
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
            className="mb-14"
          >
            <div className="bg-primary/8 border border-primary/20 rounded-2xl p-6">
              <h3 className="text-base font-bold text-primary mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> How to Land Your First Opportunity
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
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
            className="mb-14"
          >
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" /> Industry Insights
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
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
            className="mb-14"
          >
            <SectionHeading icon={Play} title="Mentor Guidance & Masterclasses" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {roadmapVideos.map((v, i) => (
                <div
                  key={v._id || v.id || i}
                  onClick={() => setSelectedVideo(v)}
                  className="group glass-card rounded-xl overflow-hidden border border-white/10 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 block cursor-pointer"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={v.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=640&q=80"}
                      alt={v.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                        <Play className="w-4 h-4 text-white fill-white ml-0.5" />
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
                        <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/90 text-black font-bold shadow-md shadow-amber-500/20">
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

                  <div className="p-4">
                    <p className="text-sm font-semibold text-white leading-snug mb-1.5 line-clamp-2 group-hover:text-primary transition-colors">
                      {v.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {v.mentor} {v.mentorRole ? `· ${v.mentorRole}` : ""}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-2 pt-2 border-t border-white/5">
                      <span>{v.views || "1.2K"} views</span>
                      <span className="text-primary font-medium flex items-center gap-1">
                        Watch Video →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ── PREMIUM TEASER ─────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 text-center"
        >
          <Lock className="w-10 h-10 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">
            Want the Complete Roadmap?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm">
            Unlock printable step-by-step guides, curated resource lists,
            preparation strategies, and personalised tips — all for just ₹99.
          </p>
          <Button
            asChild
            className="bg-primary text-primary-foreground font-bold rounded-full px-8"
          >
            <Link
              href={
                isAuthenticated
                  ? `/pricing?career=${career.id}`
                  : `/login?redirect=${encodeURIComponent(`/pricing?career=${career.id}`)}`
              }
            >
              Unlock for ₹99
            </Link>
          </Button>
        </motion.div>
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

