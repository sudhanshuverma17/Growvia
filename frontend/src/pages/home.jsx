import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import {
  ArrowRight,
  Target,
  Navigation,
  MapPin,
  Video,
  HelpCircle,
  Brain,
  Shield,
  Briefcase,
  Clock,
  Layers,
  Truck,
  FlaskConical,
  Leaf,
  Code,
  Gamepad2,
  GraduationCap,
  BarChart3,
  Compass,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useCourses } from "@/context/course-context";
import { useAuth } from "@/context/auth-context";
import { GrowviaLogoMark } from "@/components/GrowviaLogo";
import { getCareerCardImage, getCareerConciseDesc } from "@/lib/career-media";

const FEATURED_ROADMAPS_CONFIG = [
  {
    id: "pharmacist",
    title: "Pharmacist",
    category: "Healthcare",
    salary: "₹ 3L - ₹25L+",
    icon: Briefcase,
    desc: "Ensure safe medication use, manage drug supply chains, and advise on patient care.",
  },
  {
    id: "actuary",
    title: "Actuary",
    category: "Finance",
    salary: "₹ 6L - ₹80L+",
    icon: Clock,
    desc: "Use mathematics and statistics to assess financial risk for insurance companies.",
  },
  {
    id: "interior-designer",
    title: "Interior Designer",
    category: "Design & Built Env.",
    salary: "₹ 2.5L - ₹25L+",
    icon: Layers,
    desc: "Transform spaces — homes, offices, hospitality, and retail into functional and beautiful environments.",
  },
  {
    id: "supply-chain",
    title: "Supply Chain / Logistics Manager",
    category: "Operations & Logistics",
    salary: "₹ 4L - ₹35L+",
    icon: Truck,
    desc: "Manage the end-to-end flow of goods, from raw materials to final delivery.",
  },
  {
    id: "biotechnologist",
    title: "Biomedical Scientist",
    category: "Science & Research",
    salary: "₹ 3L - ₹20L+",
    icon: FlaskConical,
    desc: "Work on disease diagnosis, research, and development of new treatments and therapies.",
  },
  {
    id: "environmental-scientist",
    title: "Environmental Scientist",
    category: "Science & Environment",
    salary: "₹ 3L - ₹25L+",
    icon: Leaf,
    desc: "Study environmental systems and develop solutions for a sustainable future.",
  },
  {
    id: "engineer",
    title: "Software Engineer",
    category: "Technology",
    salary: "₹ 5L - ₹40L+",
    icon: Code,
    desc: "Design, develop, and maintain software applications that power the digital world.",
  },
  {
    id: "game-developer",
    title: "Game Developer",
    category: "Technology & Gaming",
    salary: "₹ 4L - ₹30L+",
    icon: Gamepad2,
    desc: "Create immersive gaming experiences using programming, design, and creativity.",
  },
];

const FOUNDER_QUOTE = {
  quoteBefore: "Just 2 years ago I was completely blank — ",
  quoteHighlight1: "no direction, no clarity.",
  quoteMiddle: " Not everyone gets a lucky break. Growvia ensures ",
  quoteHighlight2: "you don’t need one.",
  quoteAfter: "",
  author: "Uttkarsh Baisla",
  role: "Founder of Growvia & Co-Founder of Adfrenzy Media",
  initials: "UB",
};

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

  // Sync courses with config items
  const featuredCards = useMemo(() => {
    return FEATURED_ROADMAPS_CONFIG.map((item) => {
      const match = courses.find((c) => c.id === item.id);
      return {
        ...item,
        course: match || null,
        imageUrl: getCareerCardImage(match || { id: item.id }),
        desc: item.desc || (match ? getCareerConciseDesc(match) : ""),
      };
    });
  }, [courses]);

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

        {/* Subtle Gradient Overlays */}
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
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5A869]/70 shadow-[0_0_6px_rgba(229,168,105,0.4)]" />
              <span className="text-xs sm:text-sm font-medium text-white/60 whitespace-nowrap">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── STATS SECTION ─────────────────────────────────────── */}
      <section className="py-14 bg-black relative overflow-hidden select-none">
        {/* Subtle warm ambient glow behind stats */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,138,88,0.08),transparent_75%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                className="bg-black/35 backdrop-blur-md border border-white/12 hover:border-[#C88A58]/50 hover:bg-black/45 rounded-2xl px-6 py-7 text-center shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-[#F5E6D3] mb-1.5 tracking-tight">
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
      <section className="py-24 relative overflow-hidden bg-black select-none">
        {/* Background Image: Planet Horizon & Orbit Star (Image 2) */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-95"
          style={{
            backgroundImage: "url('/images/problem-bg.png')",
            backgroundPosition: "center 20%",
          }}
        />
        {/* Soft edge blend top and bottom */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black via-black/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            {/* Centered Tag with Left/Right Accent Lines */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#C88A58]/50" />
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#C88A58] uppercase">
                THE PROBLEM
              </span>
              <span className="w-8 h-[1px] bg-[#C88A58]/50" />
            </div>

            {/* Title with Gold Accent */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
              Why Most Students <span className="text-[#E5A869]">Are Stuck</span>
            </h2>

            {/* Subheading */}
            <p className="text-xs sm:text-sm md:text-base text-zinc-300/80 max-w-xl mx-auto">
              The system was never designed to give honest career advice and path. We fix that.
            </p>
          </motion.div>

          {/* 4 Problem Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8">
            {[
              {
                num: "01",
                icon: Brain,
                title: "Too Many Options",
                desc: "Hundreds of careers exist, making it paralyzing to know where to begin.",
              },
              {
                num: "02",
                icon: Target,
                title: "Wrong Guidance",
                desc: "Most advice comes from people who never worked the actual job.",
              },
              {
                num: "03",
                icon: Shield,
                title: "Misleading Hype",
                desc: "Influencers sell dreams. We share real salaries on Day 1 and Year 10.",
              },
              {
                num: "04",
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
                className="bg-black/35 backdrop-blur-md border border-white/12 hover:border-[#C88A58]/50 hover:bg-black/45 rounded-[20px] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(200,138,88,0.18)] relative group overflow-hidden"
              >
                {/* Top Row: Icon + Watermark Number */}
                <div className="flex items-center justify-between mb-6">
                  {/* Glowing Copper Border Circle Icon */}
                  <div className="w-12 h-12 rounded-full bg-black/50 border border-[#C88A58]/50 shadow-[0_0_16px_rgba(200,138,88,0.22)] flex items-center justify-center text-[#F5E6D3] group-hover:border-[#E5A869] transition-colors">
                    <item.icon className="w-5 h-5 text-[#F5E6D3]" strokeWidth={2} />
                  </div>

                  {/* Watermark Number */}
                  <span className="text-3xl sm:text-4xl font-light text-white/[0.15] group-hover:text-[#C88A58]/35 transition-colors font-serif select-none">
                    {item.num}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 tracking-tight group-hover:text-[#F5E6D3] transition-colors">
                  {item.title}
                </h3>

                {/* Card Body */}
                <p className="text-xs sm:text-[13px] text-zinc-300/80 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Center Divider Line */}
          <div className="w-12 h-[1.5px] bg-[#C88A58]/45 mx-auto my-8 md:my-10 rounded-full" />

          {/* 3 Quick-Action Feature Pills */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {[
              {
                icon: MapPin,
                title: "48 Career Roadmaps",
                desc: "Step-by-step guides with exams, tier-1 colleges & salary data.",
                href: "/roadmaps",
              },
              {
                icon: Video,
                title: "Mentor Video Talks",
                desc: "Real practicing professionals sharing unfiltered journeys.",
                href: "/videos",
              },
              {
                icon: HelpCircle,
                title: "Free Career Quiz",
                desc: "Match your natural strengths in 10 fast questions.",
                href: "/career-quiz",
              },
            ].map((f, i) => (
              <Link key={i} href={f.href}>
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i + 4}
                  className="group flex items-center justify-between p-4 sm:p-5 rounded-[20px] bg-black/35 backdrop-blur-md border border-white/12 hover:border-[#C88A58]/50 hover:bg-black/45 transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-black/40 cursor-pointer h-full"
                >
                  {/* Left: Glowing Icon Badge & Text */}
                  <div className="flex items-center gap-3.5 pr-2">
                    <div className="w-11 h-11 rounded-full bg-black/50 border border-[#C88A58]/50 shadow-[0_0_14px_rgba(200,138,88,0.2)] flex items-center justify-center text-[#F5E6D3] shrink-0 group-hover:border-[#E5A869] transition-colors">
                      <f.icon className="w-5 h-5 text-[#F5E6D3]" strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-bold text-white group-hover:text-[#F5E6D3] transition-colors leading-tight">
                        {f.title}
                      </div>
                      <div className="text-[11px] sm:text-xs text-zinc-300/80 mt-1 leading-snug">
                        {f.desc}
                      </div>
                    </div>
                  </div>

                  {/* Right: Circular Arrow Button */}
                  <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 group-hover:border-[#C88A58]/60 group-hover:bg-[#C88A58]/15 flex items-center justify-center text-zinc-400 group-hover:text-[#F5E6D3] transition-all shrink-0 ml-2">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ROADMAPS SECTION ───────────────────────── */}
      <section className="py-24 relative overflow-hidden bg-black select-none">
        {/* Background Image: Architectural Sunset Terrace (Image 4) */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-55"
          style={{
            backgroundImage: "url('/images/featured-roadmaps-bg.jpg')",
            backgroundPosition: "center top",
          }}
        />
        {/* Atmospheric Gradients - deep cinematic contrast matching the Hero section */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/45 to-black pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-black via-black/60 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-5"
          >
            <div>
              {/* CURATED PATHWAYS Tag with glowing dot */}
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E5A869] px-3.5 py-1.5 rounded-full border border-[#C88A58]/40 bg-black/50 backdrop-blur-sm mb-3 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5A869] shadow-[0_0_6px_#E5A869]" />
                <span>CURATED PATHWAYS</span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                Featured <span className="text-[#E5A869]">Roadmaps</span>
              </h2>

              {/* Subheading */}
              <p className="text-xs sm:text-sm text-zinc-300/85 mt-1.5 max-w-xl">
                Every career includes salary reality, entrance exams, top colleges, and day-to-day milestones.
              </p>
            </div>

            {/* Top-Right "Explore all 48 roadmaps" Pill Button */}
            <Link
              href="/roadmaps"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C88A58]/50 bg-black/55 backdrop-blur-md hover:bg-[#C88A58]/20 hover:border-[#E5A869] text-xs sm:text-sm font-semibold text-[#F5E6D3] transition-all duration-200 group shadow-lg shadow-black/50 cursor-pointer"
            >
              <span>Explore all 48 roadmaps</span>
              <ArrowRight className="w-4 h-4 text-[#E5A869] group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* 8 Featured Roadmaps Cards Grid (2 rows of 4) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {featuredCards.map((career, i) => {
              const IconComp = career.icon;

              return (
                <Link key={career.id} href={`/roadmaps/${career.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(i * 0.03, 0.25) }}
                    className="group relative flex flex-col justify-between h-[230px] bg-[#0c0d12]/75 backdrop-blur-xl border border-white/10 hover:border-[#C88A58]/55 hover:bg-[#0c0d12]/90 rounded-[20px] p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.85),0_0_20px_rgba(200,138,88,0.15)] cursor-pointer"
                  >
                    {/* Thematic Background Image Faded on Right */}
                    <div className="absolute right-0 top-0 bottom-0 w-[52%] pointer-events-none overflow-hidden rounded-r-[20px] select-none">
                      <img
                        src={career.imageUrl}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover object-center opacity-45 group-hover:opacity-65 group-hover:scale-105 transition-all duration-500"
                      />
                      {/* Gradient Mask to guarantee flawless text contrast */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>

                    {/* Foreground Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Top Row: Icon + Category Pill */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="w-9 h-9 rounded-full bg-black/40 border border-[#C88A58]/40 group-hover:border-[#E5A869] flex items-center justify-center text-[#F5E6D3] shadow-sm shrink-0 transition-colors">
                          <IconComp className="w-4 h-4 text-[#F5E6D3]" strokeWidth={1.8} />
                        </div>
                        <span className="text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full bg-white/[0.08] border border-white/12 text-white/80 font-medium truncate max-w-[145px]">
                          {career.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-[17px] font-bold text-white mb-1.5 leading-snug group-hover:text-[#F5E6D3] transition-colors truncate">
                        {career.title}
                      </h3>

                      {/* Concise Description: exactly 2 lines */}
                      <p className="text-xs text-zinc-300/90 line-clamp-2 leading-relaxed mb-4 min-h-[34px]">
                        {career.desc}
                      </p>

                      {/* Bottom Row: Salary & CTA */}
                      <div className="pt-3 border-t border-white/10 flex items-end justify-between gap-2 mt-auto">
                        {/* Salary */}
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-white">
                            {career.salary}
                          </div>
                          <span className="text-[10px] text-zinc-400 block leading-tight">
                            Avg. Salary
                          </span>
                        </div>

                        {/* View Roadmap CTA */}
                        <div className="flex items-center gap-1 text-xs font-semibold text-[#E5A869] group-hover:text-white transition-colors">
                          <span>View Roadmap</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#E5A869] group-hover:translate-x-1 transition-transform" />
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

      {/* ── TESTIMONIAL SECTION (IMAGE 5) ────────────────────── */}
      <section className="py-24 bg-black relative overflow-hidden select-none">
        {/* Orbital Cosmic Glow Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Orbital Curves */}
          <div className="absolute -left-64 -top-32 w-[600px] h-[600px] rounded-full border border-[#C88A58]/20" />
          <div className="absolute -right-48 -bottom-48 w-[720px] h-[720px] rounded-full border border-[#C88A58]/25" />
          <div className="absolute -right-32 -bottom-32 w-[550px] h-[550px] rounded-full border border-[#C88A58]/15" />

          {/* Star Nodes along Orbits */}
          <div className="absolute left-[8%] top-[25%] w-1.5 h-1.5 rounded-full bg-[#E5A869] shadow-[0_0_8px_#E5A869]" />
          <div className="absolute left-[6%] bottom-[35%] w-2 h-2 rounded-full bg-[#E5A869] shadow-[0_0_12px_#E5A869]" />
          <div className="absolute right-[6%] top-[20%] w-2 h-2 rounded-full bg-[#E5A869] shadow-[0_0_10px_#E5A869]" />
          <div className="absolute right-[8%] bottom-[28%] w-1.5 h-1.5 rounded-full bg-[#E5A869] shadow-[0_0_8px_#E5A869]" />

          {/* Ambient Warm Radial Flare */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(200,138,88,0.12),transparent_70%)]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative flex items-center justify-center">
            {/* Central Luxury Founder Testimonial Card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative w-full rounded-[26px] sm:rounded-[32px] border border-[#C88A58]/40 bg-black/35 backdrop-blur-md p-8 sm:p-12 md:p-14 text-center sm:text-left overflow-visible shadow-[0_0_45px_rgba(200,138,88,0.18),0_20px_50px_rgba(0,0,0,0.6)] hover:border-[#C88A58]/60 transition-colors"
            >
              {/* Glowing Top Flare Line */}
              <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#E5A869]/80 to-transparent shadow-[0_0_12px_#E5A869]" />

              {/* Quotation Marks Medallion Badge at Top Center */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-black/60 border border-[#C88A58]/60 shadow-[0_0_20px_rgba(200,138,88,0.25)] backdrop-blur-md flex items-center justify-center text-[#E5A869] z-20">
                <span className="text-2xl font-serif font-black tracking-tight text-[#E5A869] leading-none select-none">
                  “ ”
                </span>
              </div>

              {/* Quote Content */}
              <div className="mt-2">
                {/* Quote Body */}
                <blockquote className="text-lg sm:text-xl md:text-2xl font-serif italic text-white/95 leading-relaxed sm:leading-loose max-w-3xl mb-8">
                  &ldquo; {FOUNDER_QUOTE.quoteBefore}
                  <span className="text-[#E5A869] font-semibold">
                    {FOUNDER_QUOTE.quoteHighlight1}
                  </span>
                  {FOUNDER_QUOTE.quoteMiddle}
                  <span className="text-[#E5A869] font-semibold">
                    {FOUNDER_QUOTE.quoteHighlight2}
                  </span>
                  {FOUNDER_QUOTE.quoteAfter} &rdquo;
                </blockquote>

                {/* Author Row */}
                <div className="flex items-center justify-center sm:justify-start gap-3.5">
                  {/* Avatar Circle with Gold Rim */}
                  <div className="w-12 h-12 rounded-full border border-[#C88A58]/60 bg-black/60 backdrop-blur-sm flex items-center justify-center text-sm font-bold text-[#F5E6D3] shadow-inner shrink-0 tracking-wider">
                    {FOUNDER_QUOTE.initials}
                  </div>
                  <div className="text-left">
                    <div className="text-sm sm:text-base font-bold text-white leading-tight">
                      {FOUNDER_QUOTE.author}
                    </div>
                    <div className="text-xs text-zinc-300/80 mt-0.5 leading-snug">
                      {FOUNDER_QUOTE.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Decorative Indicator (matching design) */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="w-12 sm:w-16 h-[1px] bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5A869] shadow-[0_0_10px_#E5A869]" />
            <span className="w-2 h-2 rounded-full bg-white/30" />
            <span className="w-2 h-2 rounded-full bg-white/30" />
            <div className="w-12 sm:w-16 h-[1px] bg-white/20" />
          </div>
        </div>
      </section>

      {/* ── CTA BANNER (IMAGE 1 & 2) ───────────────────────────── */}
      <section className="py-28 md:py-36 bg-black relative overflow-hidden select-none">
        {/* Background Image: Cosmic Dual Orbit Sunrise (Image 2) */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-100"
          style={{
            backgroundImage: "url('/images/cta-orbit-bg.jpg')",
            backgroundPosition: "center center",
          }}
        />

        {/* Ambient Gradient Overlays for seamless blending */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          {/* Floating Orbit Icons (matching Image 1) */}
          {/* Top-Left: Graduation Cap */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="hidden sm:flex absolute left-2 sm:left-6 md:left-12 lg:left-16 top-8 sm:top-12 lg:top-14 w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-black/40 backdrop-blur-md border border-[#C88A58]/60 shadow-[0_0_24px_rgba(200,138,88,0.3)] items-center justify-center text-[#F5E6D3] z-20"
          >
            <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-[#F5E6D3]" strokeWidth={1.8} />
          </motion.div>

          {/* Bottom-Left: Bar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="hidden sm:flex absolute left-4 sm:left-10 md:left-16 lg:left-20 bottom-14 sm:bottom-20 lg:bottom-22 w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-black/40 backdrop-blur-md border border-[#C88A58]/60 shadow-[0_0_24px_rgba(200,138,88,0.3)] items-center justify-center text-[#F5E6D3] z-20"
          >
            <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 text-[#F5E6D3]" strokeWidth={1.8} />
          </motion.div>

          {/* Top-Right: Compass */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="hidden sm:flex absolute right-2 sm:right-6 md:right-12 lg:left-auto lg:right-16 top-16 sm:top-24 lg:top-26 w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-black/40 backdrop-blur-md border border-[#C88A58]/60 shadow-[0_0_24px_rgba(200,138,88,0.3)] items-center justify-center text-[#F5E6D3] z-20"
          >
            <Compass className="w-6 h-6 sm:w-7 sm:h-7 text-[#F5E6D3]" strokeWidth={1.8} />
          </motion.div>

          {/* Bottom-Right: Briefcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
            className="hidden sm:flex absolute right-4 sm:right-10 md:right-16 lg:left-auto lg:right-20 bottom-10 sm:bottom-16 lg:bottom-18 w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-black/40 backdrop-blur-md border border-[#C88A58]/60 shadow-[0_0_24px_rgba(200,138,88,0.3)] items-center justify-center text-[#F5E6D3] z-20"
          >
            <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-[#F5E6D3]" strokeWidth={1.8} />
          </motion.div>

          {/* Central Main Content */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative z-10 max-w-2xl mx-auto"
          >
            {/* Tag: START TODAY with glowing amber dot */}
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F5E6D3] px-4 py-1.5 rounded-full border border-[#C88A58]/50 bg-black/40 backdrop-blur-md mb-6 shadow-lg shadow-black/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5A869] shadow-[0_0_6px_#E5A869]" />
              <span>START TODAY</span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] mb-4">
              Stop Guessing.
              <br />
              <span className="bg-gradient-to-r from-[#FCE8D3] via-[#F5D0A9] to-[#E5A869] bg-clip-text text-transparent">
                Start Knowing.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base text-zinc-300/80 max-w-xl mx-auto mb-9 leading-relaxed">
              Join 5,000+ Indian students who found their career path with clarity — for less than a pizza.
            </p>

            {/* Primary Action Button */}
            <div className="flex items-center justify-center">
              <Link
                href={isAuthenticated ? "/pricing" : `/login?redirect=${encodeURIComponent("/pricing")}`}
                className="group inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#F5D8B8] hover:bg-[#fae4cc] text-[#121212] font-bold text-sm sm:text-base shadow-[0_0_35px_rgba(245,216,184,0.35)] hover:shadow-[0_0_45px_rgba(245,216,184,0.55)] transition-all duration-200 hover:scale-[1.03] cursor-pointer"
              >
                <span>Get Access for ₹199</span>
                <ArrowRight className="w-4 h-4 text-[#121212] transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Social Proof: 4 Indian Students Avatars + Text */}
            <div className="mt-8 sm:mt-10 flex items-center justify-center gap-3.5">
              <div className="flex items-center -space-x-2.5 overflow-hidden py-1">
                <img
                  src="/images/avatar-1.png"
                  alt="Student"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-black object-cover shadow-sm"
                />
                <img
                  src="/images/avatar-2.png"
                  alt="Student"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-black object-cover shadow-sm"
                />
                <img
                  src="/images/avatar-3.png"
                  alt="Student"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-black object-cover shadow-sm"
                />
                <img
                  src="/images/avatar-4.png"
                  alt="Student"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-black object-cover shadow-sm"
                />
              </div>
              <div className="text-left">
                <div className="text-sm sm:text-base font-bold text-white leading-tight">
                  5,000+
                </div>
                <div className="text-[11px] sm:text-xs text-zinc-400 leading-tight">
                  Indian students
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
