import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Quote, Target, Eye, Zap, Heart, BookOpen, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

// Distinct atmospheric study / collaboration photography for the About page hero
const ABOUT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&auto=format&fit=crop&q=80";

export default function About() {
  return (
    <Layout>
      <div className="w-full min-h-[calc(100vh-5rem)] bg-[#0d0d0f] text-foreground -mt-20 pt-20 pb-20 -mb-20">
        {/* ── CINEMATIC HERO BANNER ───────────────────────────────── */}
        <section className="relative w-full overflow-hidden border-b border-white/5 bg-black/60">
          {/* Distinct Atmospheric Study Photography Background */}
          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none select-none opacity-30"
            style={{
              backgroundImage: `url('${ABOUT_HERO_IMAGE}')`,
              backgroundPosition: "center 35%",
            }}
          />

          {/* Seamless Dark Vignette Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0f] via-[#0d0d0f]/85 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0f]/70 via-transparent to-[#0d0d0f] pointer-events-none" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 md:pt-20 md:pb-18 text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E5A855] px-3.5 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/5 mb-4"
            >
              OUR STORY & MISSION
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-4"
            >
              Built for the <span className="text-[#E69D43]">Confused Student</span>
              <br />we once were.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-sm sm:text-base md:text-lg text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed mb-8"
            >
              Every year, crores of Indian students choose careers based on hype, parental pressure, or outdated advice — without a single honest conversation about what the path really looks like. Growvia was built to change that.
            </motion.p>

            {/* Metric Counters */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium text-white/90"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#E69D43]" />
                <span>48 Roadmaps</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#E69D43]" />
                <span>5,000+ Students Guided</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#E69D43]" />
                <span>₹199 Lifetime Access</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FOUNDER SECTION ──────────────────────────────────────── */}
        <section className="py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E5A855] px-3.5 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/5 mb-3">
                THE FOUNDER
              </div>
            </div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative rounded-2xl border border-white/10 bg-[#131316] overflow-hidden p-7 sm:p-9 md:p-11 shadow-xl shadow-black/60"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative flex flex-col md:flex-row gap-8 items-start">
                {/* Avatar */}
                <div className="flex-shrink-0 flex flex-col items-center md:items-start">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-3xl md:text-4xl font-black text-amber-300 shadow-xl shadow-black/50">
                    UB
                  </div>
                  <div className="mt-3 text-center md:text-left">
                    <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                      Founder & CEO
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    Uttkarsh Baisla
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-5">
                    Founder of Growvia & Co-Founder of Adfrenzy Media
                  </p>

                  {/* Quote */}
                  <div className="relative mb-5">
                    <Quote className="absolute -top-1 -left-1 w-5 h-5 text-amber-500/30" />
                    <blockquote className="pl-6 text-base sm:text-lg text-white/90 italic leading-relaxed border-l-2 border-amber-500/40">
                      Just 2 years ago, I was completely blank — no direction, no clarity, no idea what I wanted to do with my life. Not everyone gets a lucky break. Growvia ensures you don&apos;t need one.
                    </blockquote>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
                    That confusion I felt — millions of Indian students are living it right now. Nobody tells them what a career actually looks like from the inside: the real salary, the real struggle, and the real timeline.
                  </p>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
                    Growvia is the answer to that problem. A platform where anyone can find the right career path and absolutely kill it in life.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {["Founder of Growvia", "Co-Founder, Adfrenzy Media", "Career Clarity", "India-First"].map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PROBLEM WE SAW VS OUR APPROACH ───────────────────────── */}
        <section className="py-6 pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Problem Card */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
                className="rounded-2xl border border-white/10 bg-[#131316] p-7 shadow-sm"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-amber-400" /> The Problem We Saw
                </h3>
                <ul className="space-y-3 text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  {[
                    "Students choose careers based on hype, not day-to-day reality.",
                    "Traditional career counselors charge ₹5,000–₹50,000 for superficial advice.",
                    "Online content is scattered, full of motivational fluff without actionable steps.",
                    "Nobody talks about the harsh realities — long hours, entry-level salaries, and dropouts.",
                    "Students in tier-2 and tier-3 towns lack direct access to senior industry mentors.",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="text-amber-400 mt-0.5 flex-shrink-0">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Approach Card */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
                className="rounded-2xl border border-white/10 bg-[#131316] p-7 shadow-sm"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-emerald-400" /> Our Approach
                </h3>
                <ul className="space-y-3 text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  {[
                    "Structured, stage-by-stage roadmaps for 48 in-demand careers in India.",
                    "Unfiltered 'Harsh Reality' benchmarks — clear expectations with zero sugarcoating.",
                    "Video guidance talks from practicing professionals, not theory coaches.",
                    "India-focused entrance coverage: NEET, JEE, CLAT, CAT, UPSC, CA, and design exams.",
                    "Priced at ₹199 so any student nationwide has uncompromised, equal access.",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── VALUES SECTION ───────────────────────────────────────── */}
        <section className="py-6 pb-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E5A855] px-3.5 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/5 mb-3">
                PRINCIPLES
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                What We Stand For
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                {
                  icon: Zap,
                  title: "Radical Honesty",
                  desc: "We never claim a path is effortless. Our harsh reality sections exist because students deserve honest facts, not false promises.",
                },
                {
                  icon: Heart,
                  title: "Student-First, Always",
                  desc: "Every roadmap, pricing decision, and tool is built around one simple question: 'Does this genuinely help a confused student?'",
                },
                {
                  icon: Target,
                  title: "India-Relevant, Always",
                  desc: "Built ground-up for Indian academics: entrance examinations, tier-1 vs budget colleges, and real local market compensation.",
                },
              ].map((val, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="rounded-2xl border border-white/10 bg-[#131316] p-6 hover:border-white/20 transition-all shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-4 text-[#E69D43]">
                    <val.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{val.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{val.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ───────────────────────────────────────────── */}
        <section className="pb-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-[#131316] p-10 md:p-14 text-center shadow-xl shadow-black/80"
            >
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E5A855] px-3.5 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/5 mb-4">
                GET STARTED
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight">
                Ready to find your <span className="text-[#E69D43]">career path?</span>
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
                Take the free quiz, explore a structured roadmap, or connect with practicing mentors today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#F5F0E6] text-black hover:bg-white text-sm h-12 px-8 rounded-full font-bold shadow-xl shadow-black/50 transition-all hover:scale-105"
                >
                  <Link href="/roadmaps">
                    Explore Roadmaps <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/5 text-sm h-12 px-8 rounded-full"
                >
                  <Link href="/career-quiz">Take the Free Quiz</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
