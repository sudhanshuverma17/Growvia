import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Quote, Target, Eye, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" }
  })
};
export default function About() {
  return <Layout>
      {
    /* ── HERO ─────────────────────────────────────────────────── */
  }
      <section className="relative overflow-hidden pt-20 pb-28">
        {
    /* Background glow */
  }
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
    variants={fadeUp}
    initial="hidden"
    animate="visible"
    custom={0}
    className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-muted-foreground mb-8"
  >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Our Story
          </motion.div>

          <motion.h1
    variants={fadeUp}
    initial="hidden"
    animate="visible"
    custom={1}
    className="text-5xl md:text-7xl font-bold leading-tight mb-6"
  >
            Built for the{" "}
            <span className="text-primary">Confused Student</span>
            <br />we once were.
          </motion.h1>

          <motion.p
    variants={fadeUp}
    initial="hidden"
    animate="visible"
    custom={2}
    className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
  >
            Every year, crores of Indian students choose careers based on family pressure, outdated advice, or current hype — without a single honest conversation about what the path really looks like. Growvia was built to change that.
          </motion.p>
        </div>
      </section>

      {
    /* ── STATS ────────────────────────────────────────────────── */
  }
      <section className="border-y border-white/10 bg-white/[0.015]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
    { value: "12+", label: "Career Roadmaps" },
    { value: "5,000+", label: "Students Guided" },
    { value: "100%", label: "Unfiltered Truth" },
    { value: "\u20B999", label: "Accessible to All" }
  ].map((stat, i) => <motion.div
    key={i}
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    custom={i}
  >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">{stat.label}</div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {
    /* ── FOUNDER SECTION ──────────────────────────────────────── */
  }
      <section className="py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="mb-6 text-center"
  >
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              The Founder
            </span>
          </motion.div>

          <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    custom={1}
    className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] overflow-hidden p-8 md:p-12"
  >
            {
    /* Decorative glow */
  }
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative flex flex-col md:flex-row gap-10 items-start">
              {
    /* Avatar */
  }
              <div className="flex-shrink-0 flex flex-col items-center md:items-start">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-primary/30 via-white/10 to-white/5 border border-white/15 flex items-center justify-center text-4xl font-bold text-white shadow-xl shadow-black/40">
                  UB
                </div>
                <div className="mt-4 text-center md:text-left">
                  <div className="text-xs font-semibold text-primary uppercase tracking-widest">Co-Founder & CEO</div>
                </div>
              </div>

              {
    /* Content */
  }
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-1">
                  Uttkarsh Baisa
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Co-Founder, Growvia · Also Co-Founder, Adfrenzy Media
                </p>

                {
    /* Quote */
  }
                <div className="relative mb-6">
                  <Quote className="absolute -top-1 -left-1 w-6 h-6 text-primary/40" />
                  <blockquote className="pl-7 text-lg md:text-xl text-white/80 italic leading-relaxed border-l-2 border-primary/30">
                    Just 2 years ago, I was completely blank — no direction, no clarity, no idea what I wanted to do with my life. I got lucky. An opportunity came my way that changed everything, and today I'm the co-founder of Adfrenzy Media. But not everyone gets that lucky break.
                  </blockquote>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  That confusion I felt — millions of Indian students are living it right now. They don't get real guidance. Nobody tells them what a career actually looks like from the inside — the real salary, the real struggle, the real timeline. So they end up on the wrong paths, wasting years, and crushing their own potential.
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  Growvia is the answer to that problem. <span className="text-white font-medium">A platform where anyone — without misdirection, without confusion — can find the right career for themselves and absolutely kill it in life.</span>
                </p>

                <div className="flex flex-wrap gap-2">
                  {["Co-Founder, Adfrenzy Media", "Career Guidance", "EdTech", "India-First"].map((tag) => <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
                      {tag}
                    </span>)}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {
    /* ── STORY / WHY ──────────────────────────────────────────── */
  }
      <section className="py-8 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    custom={0}
    className="rounded-2xl border border-white/10 bg-white/[0.02] p-8"
  >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" /> The Problem We Saw
              </h3>
              <ul className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                {[
    "Students choose careers based on hype, not reality.",
    "Career counsellors charge \u20B95,000\u2013\u20B950,000 for basic advice.",
    "Online content is scattered, motivational-fluff, and surface-level.",
    "Nobody talks about the harsh realities \u2014 the long hours, low entry salaries, intense competition.",
    "Students from tier-2 and tier-3 cities have zero access to quality guidance."
  ].map((item, i) => <li key={i} className="flex gap-2.5">
                    <span className="text-primary mt-0.5 flex-shrink-0">—</span>
                    {item}
                  </li>)}
              </ul>
            </motion.div>

            <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    custom={1}
    className="rounded-2xl border border-white/10 bg-white/[0.02] p-8"
  >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" /> Our Approach
              </h3>
              <ul className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                {[
    "Structured, step-by-step roadmaps for every major career in India.",
    "Honest 'Harsh Reality' sections \u2014 we don't sugarcoat.",
    "Real mentor videos from working professionals, not coaches.",
    "India-first \u2014 NEET, JEE, CLAT, NATA, ICAI \u2014 we cover what's relevant here.",
    "Priced at \u20B999 so a student in Bilaspur has the same access as one in Mumbai."
  ].map((item, i) => <li key={i} className="flex gap-2.5">
                    <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>)}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {
    /* ── VALUES ───────────────────────────────────────────────── */
  }
      <section className="py-8 pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="text-3xl font-bold text-white mb-10 text-center"
  >
            What We Stand For
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
    {
      icon: Zap,
      title: "Radical Honesty",
      desc: "We will never tell you a career is easy when it isn't. Our 'Harsh Reality' sections exist because students deserve truth, not false hope."
    },
    {
      icon: Heart,
      title: "Student-First, Always",
      desc: "Every decision we make \u2014 pricing, content, design \u2014 is made asking: 'Does this genuinely help a confused student?'"
    },
    {
      icon: Target,
      title: "India-Relevant, Always",
      desc: "We are not a foreign platform adapted for India. Growvia was designed from day one for Indian students, exams, colleges, and salaries."
    }
  ].map((val, i) => <motion.div
    key={i}
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    custom={i}
    className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 hover:border-primary/30 transition-colors"
  >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                  <val.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{val.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{val.desc}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {
    /* ── CTA ──────────────────────────────────────────────────── */
  }
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-12 md:p-16 text-center"
  >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to find your career path?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Take the free quiz, explore a roadmap, or watch a mentor video. Your career clarity starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary text-primary-foreground font-bold px-8 rounded-full hover:opacity-90">
                <Link href="/roadmaps">
                  Explore Roadmaps <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 px-8 rounded-full">
                <Link href="/quiz">Take the Free Quiz</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>;
}
