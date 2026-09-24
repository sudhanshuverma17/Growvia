import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, Brain } from "lucide-react";

export function QuizLoading() {
  const steps = [
    "Analyzing your responses...",
    "Understanding your strengths...",
    "Matching career paths...",
    "Preparing your personalized insights...",
  ];

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 650);

    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Animated Orb / Icon */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_50px_rgba(232,224,208,0.2)]">
          <Brain className="w-10 h-10 animate-pulse" />
        </div>
        <div className="absolute -inset-2 rounded-3xl border border-primary/20 animate-ping pointer-events-none opacity-40" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 flex items-center gap-2 justify-center">
        <Brain className="w-6 h-6 text-primary" /> Evaluating Your Profile
      </h2>
      <p className="text-sm text-muted-foreground max-w-sm mb-10">
        Our deterministic trait scoring engine and AI model are synthesizing your answers.
      </p>

      {/* Progressive Step Sequence */}
      <div className="w-full max-w-xs space-y-3.5 text-left">
        {steps.map((step, idx) => {
          const isDone = activeStep > idx;
          const isCurrent = activeStep === idx;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                isDone
                  ? "border-emerald-500/20 bg-emerald-500/5 text-white"
                  : isCurrent
                  ? "border-primary/30 bg-primary/10 text-white"
                  : "border-white/5 bg-white/[0.01] text-muted-foreground opacity-50"
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 text-primary animate-spin flex-shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0" />
              )}
              <span className="text-xs font-medium">{step}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
