import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { quizQuestions, careers } from "@/lib/mock-data";
import { ArrowRight, RotateCcw, Trophy, Medal, Star } from "lucide-react";
export default function Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const handleAnswer = (careerScores, optionIdx) => {
    if (selected !== null) return;
    setSelected(optionIdx);
    setTimeout(() => {
      setScores((prev) => {
        const next = { ...prev };
        Object.entries(careerScores).forEach(([careerId, pts]) => {
          next[careerId] = (next[careerId] || 0) + pts;
        });
        return next;
      });
      if (currentStep < quizQuestions.length - 1) {
        setCurrentStep((curr) => curr + 1);
        setSelected(null);
      } else {
        setIsFinished(true);
        triggerConfetti();
      }
    }, 280);
  };
  const triggerConfetti = () => {
    const duration = 3e3;
    const end = Date.now() + duration;
    const interval = setInterval(() => {
      if (Date.now() > end) return clearInterval(interval);
      const particleCount = 50 * ((end - Date.now()) / duration);
      confetti({ particleCount, spread: 360, startVelocity: 28, ticks: 60, origin: { x: Math.random(), y: Math.random() - 0.2 }, colors: ["#E8E0D0", "#ffffff", "#1a1a1a"] });
    }, 220);
  };
  const getTopCareers = () => {
    return careers.map((c) => ({ career: c, score: scores[c.id] || 0 })).sort((a, b) => b.score - a.score).slice(0, 5);
  };
  const resetQuiz = () => {
    setCurrentStep(0);
    setScores({});
    setIsFinished(false);
    setSelected(null);
  };
  const progress = (currentStep + 1) / quizQuestions.length * 100;
  const q = quizQuestions[currentStep];
  const rankIcons = [
    { icon: Trophy, color: "text-amber-400", label: "Top Match", bg: "bg-amber-400/10 border-amber-400/25" },
    { icon: Medal, color: "text-slate-300", label: "2nd Match", bg: "bg-white/5 border-white/15" },
    { icon: Medal, color: "text-amber-700", label: "3rd Match", bg: "bg-white/5 border-white/10" },
    { icon: Star, color: "text-primary/80", label: "4th Match", bg: "bg-white/[0.03] border-white/8" },
    { icon: Star, color: "text-primary/60", label: "5th Match", bg: "bg-white/[0.02] border-white/6" }
  ];
  return <Layout>
      <div className="max-w-2xl mx-auto px-4 py-16 md:py-24 min-h-[75vh]">

        {!isFinished ? <div>
            {
    /* Header */
  }
            <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center mb-10"
  >
              <div className="section-tag mb-4 mx-auto w-fit">Career Discovery Quiz</div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Find Your Best-Fit Career
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                {quizQuestions.length} questions · ~3 minutes · No signup needed
              </p>
            </motion.div>

            {
    /* Progress Bar */
  }
            <div className="mb-8">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>Question {currentStep + 1} of {quizQuestions.length}</span>
                <span>{Math.round(progress)}% done</span>
              </div>
              <div className="w-full h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
                <motion.div
    className="h-full bg-primary rounded-full"
    initial={{ width: 0 }}
    animate={{ width: `${progress}%` }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  />
              </div>
              {
    /* Step dots */
  }
              <div className="flex justify-between mt-2 px-0.5">
                {quizQuestions.map((_, i) => <div
    key={i}
    className={`h-1 rounded-full transition-all duration-300 ${i < currentStep ? "bg-primary" : i === currentStep ? "bg-primary/60" : "bg-white/10"}`}
    style={{ width: `${92 / quizQuestions.length}%` }}
  />)}
              </div>
            </div>

            {
    /* Question Card */
  }
            <div className="glow-card p-7 md:p-10 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/4 rounded-full blur-[60px] pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
    key={currentStep}
    initial={{ opacity: 0, x: 24 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -24 }}
    transition={{ duration: 0.22, ease: "easeOut" }}
  >
                  <div className="text-xs font-semibold text-primary/70 uppercase tracking-widest mb-3">
                    Q{currentStep + 1} / {quizQuestions.length}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2 leading-snug">
                    {q.question}
                  </h2>
                  {q.subtitle && <p className="text-sm text-muted-foreground mb-6">{q.subtitle}</p>}
                  {!q.subtitle && <div className="mb-6" />}

                  <div className="space-y-3">
                    {q.options.map((option, i) => <button
    key={i}
    onClick={() => handleAnswer(option.careers, i)}
    disabled={selected !== null}
    className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 group relative overflow-hidden ${selected === i ? "border-primary bg-primary/10 text-white" : selected !== null ? "border-white/5 bg-white/[0.02] text-muted-foreground opacity-40 cursor-default" : "border-white/10 bg-white/[0.03] text-foreground hover:bg-white/[0.07] hover:border-primary/40 hover:text-white cursor-pointer"}`}
  >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full border flex-shrink-0 flex items-center justify-center text-xs font-bold transition-colors ${selected === i ? "bg-primary border-primary text-primary-foreground" : "border-white/20 text-muted-foreground"}`}>
                              {String.fromCharCode(65 + i)}
                            </div>
                            <span className="text-sm leading-relaxed">{option.text}</span>
                          </div>
                          <ArrowRight className={`w-4 h-4 flex-shrink-0 transition-all duration-200 ${selected === i ? "text-primary opacity-100 translate-x-0" : "text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`} />
                        </div>
                      </button>)}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div> : (
    /* ── RESULTS ────────────────────────────────────────── */
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-5">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Your Top Career Matches
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Based on your answers across {quizQuestions.length} questions, here are the careers that align most with your personality, interests, and strengths.
              </p>
            </div>

            {
      /* Top 5 Results */
    }
            <div className="space-y-4 mb-10">
              {getTopCareers().map(({ career, score }, i) => {
      const rank = rankIcons[i];
      const maxScore = getTopCareers()[0].score || 1;
      const pct = Math.round(score / maxScore * 100);
      return <motion.div
        key={career.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.1, duration: 0.4 }}
        className={`rounded-2xl border p-5 ${rank.bg} ${i === 0 ? "ring-1 ring-primary/20" : ""}`}
      >
                    <div className="flex items-start gap-4">
                      {
        /* Rank icon */
      }
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${i === 0 ? "bg-amber-400/15" : "bg-white/5"}`}>
                        <rank.icon className={`w-5 h-5 ${rank.color}`} />
                      </div>

                      {
        /* Content */
      }
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2">
                            {i === 0 && <span className="text-xs bg-primary text-primary-foreground font-bold px-2 py-0.5 rounded-full">
                                Best Match
                              </span>}
                            <h3 className="text-base font-bold text-white">{career.title}</h3>
                          </div>
                          <span className="text-xs text-muted-foreground flex-shrink-0">{pct}% match</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{career.description}</p>

                        {
        /* Match bar */
      }
                        <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden mb-3">
                          <motion.div
        className={`h-full rounded-full ${i === 0 ? "bg-primary" : "bg-white/30"}`}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ delay: i * 0.1 + 0.3, duration: 0.6, ease: "easeOut" }}
      />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="bg-white/5 border border-white/8 px-2 py-0.5 rounded-full">{career.stats.salary}</span>
                            <span className="bg-white/5 border border-white/8 px-2 py-0.5 rounded-full">{career.stats.demand} Demand</span>
                          </div>
                          <Link
        href={`/roadmaps/${career.id}`}
        className={`flex items-center gap-1 text-xs font-semibold transition-colors ${i === 0 ? "text-primary hover:text-primary/80" : "text-muted-foreground hover:text-white"}`}
      >
                            View Roadmap <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>;
    })}
            </div>

            {
      /* Action buttons */
    }
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
      variant="outline"
      onClick={resetQuiz}
      className="border-white/15 hover:bg-white/5 text-white rounded-full px-6"
    >
                <RotateCcw className="w-4 h-4 mr-2" /> Retake Quiz
              </Button>
              <Button asChild className="bg-primary text-primary-foreground font-bold rounded-full px-8 hover:opacity-90">
                <Link href="/pricing">Unlock a Roadmap — ₹99</Link>
              </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-6">
              Want to explore all 12 careers? <Link href="/roadmaps" className="text-primary hover:underline">Browse all roadmaps →</Link>
            </p>
          </motion.div>
  )}
      </div>
    </Layout>;
}
