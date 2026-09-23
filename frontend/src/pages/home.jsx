import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import {
  ArrowRight,
  Braces,
  Target,
  ShieldAlert,
  Navigation,
  MapPin,
  Video,
  HelpCircle,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useCourses } from "@/context/course-context";
import { useAuth } from "@/context/auth-context";
import { CareerIcon } from "@/components/career-icon";
import { GrowviaLogoMark } from "@/components/GrowviaLogo";
import { getCareerCardImage, getCareerConciseDesc } from "@/lib/career-media";

const FEATURED_HOME_IDS = [
  "pharmacist",
  "actuary",
  "interior-designer",
  "supply-chain",
  "biotechnologist",
  "environmental-scientist",
  "engineer",
  "game-developer",
];

function Counter({ to, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 50);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) {
        setVal(to);
        clearInterval(timer);
      } else setVal(start);
    }, 28);
    return () => clearInterval(timer);
  }, [inView, to]);
  return <span ref={ref}>{val.toLocaleString("en-IN")}{suffix}</span>;
}

const MARQUEE_ITEMS = [
  "Medical Doctor",
  "Software Engineer",
  "Corporate Lawyer",
  "Data Scientist",
  "Product Manager",
  "Chartered Accountant",
  "Architect",
  "Content Creator",
  "UI/UX Designer",
  "Digital Marketer",
  "Psychologist",
  "Startup Founder",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Home() {
  const { courses } = useCourses();
  const { isAuthenticated } = useAuth();

  // Featured 8 roadmaps matching the reference design layout
  const featuredRoadmaps = useMemo(() => {
    const list = [];
    FEATURED_HOME_IDS.forEach((id) => {
      const found = courses.find((c) => c.id === id);
      if (found) list.push(found);
    });
    // Fall back to first 8 courses if not found
    if (list.length < 8) {
      courses.forEach((c) => {
        if (!list.find((item) => item.id === c.id) && list.length < 8) {
          list.push(c);
        }
      });
    }
    return list;
  }, [courses]);

  const getDisplayTitle = (career) => {
    if (career.id === "biotechnologist") return "Biomedical Scientist";
    return career.title;
  };

  const getDisplayCategory = (career) => {
    if (career.id === "biotechnologist") return "Science & Research";
    if (career.category === "Design & Built Environment") return "Design & Built Env.";
    return career.category || "General";
  };

  const getDisplaySalary = (career) => {
    if (career.id === "biotechnologist") return "₹3L - ₹20L+";
    if (career.id === "engineer") return "₹5L - ₹40L+";
    if (career.id === "game-developer") return "₹4L - ₹30L+";
    return career.stats?.salary || "₹4L - ₹25L+";
  };

  const getDisplayDemand = (career) => {
    if (career.id === "biotechnologist") return "Medium";
    if (career.id === "engineer") return "High";
    if (career.id === "game-developer") return "High";
    return career.stats?.demand || "High";
  };

  const getConciseDesc = (career) => {
    return getCareerConciseDesc(career);
  };

  return (
    <Layout>
      {/* ── HERO (CINEMATIC EDITORIAL) ────────────────────────── */}
      <section className="relative h-screen min-h-[600px] w-full flex flex-col justify-end overflow-hidden bg-black select-none">
        {/* Atmospheric Photography Background */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage: "url('/images/hero-cinematic.jpg')",
            backgroundPosition: "center bottom",
          }}
        />

        {/* Subtle Gradient Overlays: Lightened to reveal warm sunset tones & city lights */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 via-black/15 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

        {/* Center Watermark: Outlined Hexagon Logo Mark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex items-center justify-center">
          <GrowviaLogoMark
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 text-[#F5F0E8] drop-shadow-[0_4px_32px_rgba(0,0,0,0.85)]"
            strokeWidth={1.8}
          />
        </div>

        {/* Bottom-Left Content: Quote & CTA Buttons */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 pb-10 sm:pb-12 lg:pb-14">
          <div className="max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-6 leading-[1.15] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
            >
              Find Your Path.
              <br />
              <span className="text-[#F5F0E8]">Kill It in Life.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-3.5 sm:gap-4"
            >
              {/* Primary Solid Cream Pill Button */}
              <Link
                href="/roadmaps"
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-[#F5F0E8] text-[#121212] font-medium text-sm sm:text-base hover:bg-white transition-all duration-200 shadow-xl shadow-black/40 group cursor-pointer"
              >
                <span>Explore Roadmaps</span>
                <ArrowRight className="w-4 h-4 text-[#121212] transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              {/* Secondary Transparent Glass Outline Pill Button */}
              <Link
                href="/career-quiz"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3 rounded-full border border-white/30 bg-black/25 backdrop-blur-sm text-[#F5F0E8] font-medium text-sm sm:text-base hover:bg-white/10 hover:border-white/50 transition-all duration-200 shadow-lg shadow-black/20 cursor-pointer"
              >
                Take Career Quiz
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Seamless bottom transition */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-10" />
      </section>

      {/* ── MARQUEE TICKER ────────────────────────────────────── */}
      <div className="relative py-4 border-y border-white/[0.07] overflow-hidden bg-black">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div key={i} className="flex items-center gap-3 mx-6 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5F0E8]/70 shadow-[0_0_6px_rgba(245,240,232,0.3)]" />
              <span className="text-xs sm:text-sm font-medium text-white/60 whitespace-nowrap">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── STATS SECTION ─────────────────────────────────────── */}
      <section className="py-16 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: 48, suffix: "", label: "Career Roadmaps" },
              { value: 5000, suffix: "+", label: "Students Guided" },
              { value: 199, suffix: "", label: "Rupees Lifetime" },
              { value: 100, suffix: "%", label: "Unfiltered Truth" },
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="bg-[#0e0e11]/90 backdrop-blur-md border border-white/[0.08] hover:border-white/20 rounded-2xl px-6 py-7 text-center shadow-lg shadow-black/60 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-[#F5F0E8] mb-1.5 tracking-tight">
                  {s.suffix === "" && s.label === "Rupees Lifetime" ? "₹" : ""}
                  <Counter to={s.value} />
                  {s.suffix}
                </div>
                <div className="text-xs text-white/50 uppercase tracking-[0.16em] font-medium">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM SECTION ───────────────────────────────── */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#F5F0E8] px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-sm mb-4">
              THE PROBLEM
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight">
              Why Most Students Are <span className="text-[#F5F0E8]">Stuck</span>
            </h2>
            <p className="text-sm md:text-base text-white/60">
              The system was never designed to give honest career advice and path. We fix that.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Brain,
                title: "Too Many Options",
                desc: "Hundreds of careers exist, making it paralyzing to know where to begin.",
              },
              {
                icon: Target,
                title: "Wrong Guidance",
                desc: "Most advice comes from people who never worked the actual job.",
              },
              {
                icon: ShieldAlert,
                title: "Misleading Hype",
                desc: "Influencers sell dreams. We share real salaries on Day 1 and Year 10.",
              },
              {
                icon: Navigation,
                title: "No Clear Route",
                desc: "Knowing your goal isn't enough. You need the step-by-step roadmap to get there.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="bg-[#0e0e11]/90 backdrop-blur-md border border-white/[0.08] hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/60"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-5 text-[#F5F0E8]">
                  <item.icon size={20} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES STRIP ────────────────────────────────────── */}
      <section className="py-8 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: MapPin,
                label: "48 Career Roadmaps",
                desc: "Step-by-step guides with exams, tier-1 colleges & salary data.",
              },
              {
                icon: Video,
                label: "Mentor Video Talks",
                desc: "Real practicing professionals sharing unfiltered journeys.",
              },
              {
                icon: HelpCircle,
                label: "Free Career Quiz",
                desc: "Match your natural strengths in 10 fast questions.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#0e0e11]/90 backdrop-blur-md border border-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-lg shadow-black/40"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#F5F0E8] flex-shrink-0">
                  <f.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white mb-1">{f.label}</div>
                  <div className="text-xs text-white/60 leading-relaxed">{f.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ROADMAPS GRID ───────────────────────────── */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#F5F0E8] px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-sm mb-3">
                CURATED PATHWAYS
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Featured <span className="text-[#F5F0E8]">Roadmaps</span>
              </h2>
              <p className="text-sm text-white/60 mt-1 max-w-xl">
                Every career includes salary reality, entrance exams, top colleges, and day-to-day milestones.
              </p>
            </div>
            <Link
              href="/roadmaps"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/[0.04] text-xs sm:text-sm font-medium text-[#F5F0E8] hover:bg-white/10 hover:border-white/40 transition-all duration-200 group"
            >
              <span>Explore all 48 roadmaps</span>
              <ArrowRight className="w-4 h-4 text-[#F5F0E8] group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* 4-Column Compact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {featuredRoadmaps.map((career, i) => {
              const imageUrl = getCareerCardImage(career);
              const displayTitle = getDisplayTitle(career);
              const displayCategory = getDisplayCategory(career);
              const displaySalary = getDisplaySalary(career);
              const conciseDesc = getConciseDesc(career);

              return (
                <Link key={career.id} href={`/roadmaps/${career.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(i * 0.03, 0.3) }}
                    className="group relative flex flex-col justify-between h-full bg-[#0e0e11]/90 backdrop-blur-md border border-white/[0.08] hover:border-white/25 rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/80 cursor-pointer"
                  >
                    {/* Thematic Background Image Faded on Right */}
                    <div className="absolute right-0 top-0 bottom-0 w-[48%] pointer-events-none overflow-hidden rounded-r-2xl select-none">
                      <img
                        src={imageUrl}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover object-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                      />
                      {/* Gradient Mask to guarantee 100% text contrast on the left */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e11] via-[#0e0e11]/60 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e11]/85 via-transparent to-transparent" />
                    </div>

                    {/* Foreground Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Top Row: Icon + Category Pill */}
                      <div className="flex items-start justify-between gap-2 mb-3.5">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/90 group-hover:border-white/25 transition-colors shadow-sm">
                          <CareerIcon icon={career.icon} size={20} />
                        </div>
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-white/60 font-medium truncate max-w-[130px]">
                          {displayCategory}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 leading-snug group-hover:text-[#F5F0E8] transition-colors">
                        {displayTitle}
                      </h3>

                      {/* Concise Description: strictly 1-2 lines */}
                      <p className="text-xs text-white/60 line-clamp-2 leading-relaxed mb-5 min-h-[34px]">
                        {conciseDesc}
                      </p>

                      {/* Bottom Row: Metrics & CTA */}
                      <div className="pt-3 border-t border-white/[0.08] flex items-end justify-between gap-2 mt-auto">
                        {/* Salary */}
                        <div>
                          <div className="flex items-center gap-0.5 text-xs sm:text-sm font-bold text-white">
                            <span className="text-[#F5F0E8] font-bold text-sm">₹</span>
                            <span>{displaySalary.replace(/^₹/, "")}</span>
                          </div>
                          <span className="text-[10px] text-white/50 block leading-tight">
                            Avg. Salary
                          </span>
                        </div>

                        {/* View Roadmap CTA */}
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F5F0E8] group-hover:text-white transition-colors">
                          <span>View Roadmap</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#F5F0E8] group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL / FOUNDER NOTE ────────────────────────── */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative rounded-3xl border border-white/10 bg-[#0e0e11]/95 backdrop-blur-md p-8 md:p-12 text-center overflow-hidden shadow-2xl shadow-black/80"
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/[0.03] rounded-full blur-[90px] pointer-events-none" />
            <blockquote className="relative text-lg md:text-xl font-medium text-white/90 leading-relaxed italic mb-6 max-w-2xl mx-auto">
              &ldquo;Just 2 years ago I was completely blank — no direction, no clarity. Not everyone gets a lucky break. Growvia ensures you don&apos;t need one.&rdquo;
            </blockquote>
            <div className="relative flex items-center justify-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm font-bold text-[#F5F0E8] shadow-inner">
                UB
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">Uttkarsh Baisla</div>
                <div className="text-xs text-white/50">Founder of Growvia & Co-Founder of Adfrenzy Media</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────── */}
      <section className="py-24 bg-black relative overflow-hidden border-t border-white/[0.07]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,240,232,0.03),transparent_65%)] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#F5F0E8] px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-sm mb-4">
              START TODAY
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
              Stop Guessing.<br />
              <span className="text-[#F5F0E8]">Start Knowing.</span>
            </h2>
            <p className="text-sm md:text-base text-white/60 mb-8 max-w-lg mx-auto">
              Join 5,000+ Indian students who found their career path with clarity — for less than a pizza.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#F5F0E8] text-[#121212] hover:bg-white text-sm md:text-base h-12 px-8 rounded-full font-semibold shadow-xl shadow-black/50 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <Link href={isAuthenticated ? "/pricing" : `/login?redirect=${encodeURIComponent("/pricing")}`}>
                  Get Access for ₹199
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/25 bg-black/25 backdrop-blur-sm text-[#F5F0E8] hover:bg-white/10 hover:border-white/50 text-sm h-12 px-7 rounded-full transition-all duration-200 cursor-pointer"
              >
                <Link href="/roadmaps">Browse Free First →</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
