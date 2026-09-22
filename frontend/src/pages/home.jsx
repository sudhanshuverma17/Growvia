import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Brain, Target, ShieldAlert, Navigation, MapPin, Video, HelpCircle, Star } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useCourses } from "@/context/course-context";
import { useAuth } from "@/context/auth-context";
import { CareerIcon } from "@/components/career-icon";
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
  "CA",
  "Architect",
  "Content Creator",
  "UI/UX Designer",
  "Digital Marketer",
  "Psychologist",
  "Startup Founder"
];
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] } })
};
export default function Home() {
  const { courses } = useCourses();
  const { isAuthenticated } = useAuth();
  return <Layout>

    {
      /* ── HERO ──────────────────────────────────────────────── */
    }
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">

      {
        /* Dot grid background */
      }
      <div className="absolute inset-0 dot-grid opacity-100 pointer-events-none" />

      {
        /* Radial vignette over grid */
      }
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,transparent_40%,hsl(var(--background))_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_40%_at_50%_0%,transparent_40%,hsl(var(--background))_100%)] pointer-events-none" />

      {
        /* Floating orbs */
      }
      <div className="orb orb-1 top-[-100px] left-[-150px]" />
      <div className="orb orb-2 bottom-[-80px] right-[-120px]" />
      <div className="orb orb-3 top-[30%] right-[10%]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        {
          /* Badge */
        }
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-sm text-muted-foreground mb-8 section-tag"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
          </span>
          India's Honest Career Guidance Platform
        </motion.div>

        {
          /* Headline */
        }
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-[5.5rem] font-extrabold tracking-[-0.03em] leading-[1.05] mb-6"
        >
          <span className="text-white">Find Your Path.</span>
          <br />
          <span className="shimmer-text">Kill It in Life.</span>
        </motion.h1>

        {
          /* Subtext */
        }
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Honest roadmaps, unfiltered mentor videos, and real salary data for 12+ careers — built specifically for Indian students who deserve clarity.
        </motion.p>

        {
          /* CTAs */
        }
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button asChild size="lg" className="btn-premium bg-primary text-primary-foreground text-base h-13 px-8 rounded-full font-bold shadow-[0_0_50px_-10px_rgba(232,224,208,0.4)] hover:shadow-[0_0_70px_-10px_rgba(232,224,208,0.55)] hover:scale-[1.03] transition-all duration-300">
            <Link href="/roadmaps">
              Explore Roadmaps <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-base h-13 px-8 rounded-full border-white/15 hover:bg-white/5 text-white hover:border-white/30 transition-all duration-300">
            <Link href="/quiz">Take Free Career Quiz</Link>
          </Button>
        </motion.div>

        {
          /* Social proof mini row */
        }
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          <div className="flex -space-x-2">
            {["A", "B", "C", "D", "E"].map((l, i) => <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center text-[10px] font-bold text-white/70">{l}</div>)}
          </div>
          <span>5,000+ students guided</span>
          <div className="hidden sm:flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
            <span className="text-muted-foreground ml-1">4.9/5</span>
          </div>
        </motion.div>
      </div>

      {
        /* Bottom fade */
      }
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>

    {
      /* ── MARQUEE TICKER ────────────────────────────────────── */
    }
    <div className="relative py-5 border-y border-white/[0.07] overflow-hidden bg-white/[0.015]">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      <div className="marquee-track">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => <div key={i} className="flex items-center gap-3 mx-6 shrink-0">
          <span className="w-1 h-1 rounded-full bg-primary/60" />
          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{item}</span>
        </div>)}
      </div>
    </div>

    {
      /* ── STATS ─────────────────────────────────────────────── */
    }
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
          {[
            { value: 12, suffix: "+", label: "Career Roadmaps" },
            { value: 5e3, suffix: "+", label: "Students Guided" },
            { value: 199, suffix: "", label: "Rupees Only" },
            { value: 100, suffix: "%", label: "No Sugarcoating" }
          ].map((s, i) => <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
            className="bg-background/80 px-6 py-8 text-center"
          >
            <div className="text-4xl md:text-5xl font-extrabold text-white mb-1 tracking-tight">
              {s.suffix === "" && s.label === "Rupees Only" ? "\u20B9" : ""}
              <Counter to={s.value} />{s.suffix}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-[0.12em]">{s.label}</div>
          </motion.div>)}
        </div>
      </div>
    </section>

    {
      /* ── PROBLEM SECTION ───────────────────────────────────── */
    }
    <section className="py-20 relative overflow-hidden">
      {
        /* Subtle orb */
      }
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="section-tag mb-5 mx-auto w-fit">The Problem</div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Why Most Students Are <span className="text-gradient-primary">Stuck</span>
          </h2>
          <p className="text-muted-foreground">The system was never designed to give you honest career advice and path. We fix that.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Brain, title: "Too Many Options", desc: "Thousands of careers exist, making it paralyzing to choose where to begin." },
            { icon: Target, title: "Wrong Guidance", desc: "Most advice comes from people who've never done the job \u2014 parents, relatives, Google." },
            { icon: ShieldAlert, title: "Misleading Content", desc: "Influencers sell dreams. We show you the actual salary on Day 1 and Year 10." },
            { icon: Navigation, title: "No Clear Path", desc: "Knowing your destination isn't enough. You need the step-by-step route to get there." }
          ].map((item, i) => <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
            className="glow-card p-6"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-5 text-primary">
              <item.icon size={20} />
            </div>
            <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </motion.div>)}
        </div>
      </div>
    </section>

    {
      /* ── FEATURES STRIP ────────────────────────────────────── */
    }
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glow-line mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { icon: MapPin, label: "12 Career Roadmaps", desc: "Step-by-step guides with exams, colleges & salary data" },
            { icon: Video, label: "Mentor Video Talks", desc: "Real professionals sharing unfiltered journeys" },
            { icon: HelpCircle, label: "Free Career Quiz", desc: "Find your best-fit career in 2 minutes" }
          ].map((f, i) => <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
            className="flex flex-col items-center gap-3 p-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.09] flex items-center justify-center text-primary mb-1">
              <f.icon className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-white">{f.label}</div>
            <div className="text-xs text-muted-foreground max-w-[180px]">{f.desc}</div>
          </motion.div>)}
        </div>
        <div className="glow-line mt-12" />
      </div>
    </section>

    {
      /* ── CAREER GRID ───────────────────────────────────────── */
    }
    <section className="py-20 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-12"
        >
          <div>
            <div className="section-tag mb-4">Explore Careers</div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
              12 Deep-Dive <span className="text-gradient-primary">Roadmaps</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">Every career includes salary reality, entrance exams, top colleges, and what a real day looks like.</p>
          </div>
          <Link href="/roadmaps" className="text-primary/80 font-medium hover:text-primary flex items-center gap-1 mt-4 md:mt-0 text-sm transition-colors group">
            View all roadmaps <ArrowRight className="ml-0.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.slice(0, 8).map((career, i) => <Link key={career.id} href={`/roadmaps/${career.id}`}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.5}
              className="glow-card p-6 h-full cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.09] flex items-center justify-center mb-4 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300">
                <CareerIcon icon={career.icon} size={20} />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">{career.title}</h3>
              <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{career.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-full text-muted-foreground">{career.stats?.salary || "N/A"}</span>
                <span className="text-primary text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  Open <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          </Link>)}
        </div>
      </div>
    </section>

    {
      /* ── TESTIMONIAL / QUOTE ───────────────────────────────── */
    }
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative rounded-3xl border border-white/[0.08] bg-white/[0.02] p-10 md:p-14 text-center overflow-hidden"
        >
          <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/6 rounded-full blur-[60px] pointer-events-none" />
          <blockquote className="relative text-xl md:text-2xl font-medium text-white/80 leading-relaxed italic mb-6 max-w-2xl mx-auto">
            "Just 2 years ago I was completely blank — no direction, no clarity. Not everyone gets a lucky break. Growvia ensures they don't need one."
          </blockquote>
          <div className="relative flex items-center justify-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/30 to-white/5 border border-white/15 flex items-center justify-center text-sm font-bold text-white">
              UB
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-white">Uttkarsh Baisa</div>
              <div className="text-xs text-muted-foreground">Founder of Growvia & Co-Founder of Adfrenzy Media</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {
      /* ── CTA ───────────────────────────────────────────────── */
    }
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(232,224,208,0.04)_0%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="section-tag mb-6 mx-auto w-fit">Start Today</div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4 leading-[1.1]">
            Stop Guessing.<br />
            <span className="shimmer-text">Start Knowing.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
            Join 5,000+ Indian students who found their career path with clarity — for less than a pizza.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="btn-premium bg-primary text-primary-foreground text-base h-13 px-10 rounded-full font-bold shadow-[0_0_50px_-12px_rgba(232,224,208,0.5)] hover:shadow-[0_0_70px_-10px_rgba(232,224,208,0.65)] hover:scale-105 transition-all duration-300">
              <Link href={isAuthenticated ? "/pricing" : `/login?redirect=${encodeURIComponent("/pricing")}`}>
                Get Access for ₹199
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-muted-foreground hover:text-white text-sm h-13 px-6 rounded-full">
              <Link href="/roadmaps">Browse Free First →</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>

  </Layout>;
}
