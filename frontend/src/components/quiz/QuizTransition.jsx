import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Compass, Sparkles, Loader2, CheckCircle2, AlertCircle, RotateCcw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuizTransition({ error, onRetry, onBack }) {
  const steps = [
    "Analyzing your scenario preferences...",
    "Calibrating multi-domain affinities...",
    "Curating tailored pathway questions...",
  ];

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (error) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 700);

    return () => clearInterval(timer);
  }, [error, steps.length]);

  return (
    <div className="bg-[#16161a] p-6 sm:p-8 md:p-10 rounded-3xl border border-white/10 relative shadow-2xl overflow-hidden text-center max-w-xl mx-auto">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Stage Transition Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-6">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Stage 1 Complete • Transitioning to Stage 2</span>
      </div>

      {/* Glowing Central Icon */}
      <div className="relative mx-auto w-20 h-20 mb-6 flex items-center justify-center">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/25 to-primary/5 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_50px_rgba(232,224,208,0.25)]">
          <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: "12s" }} />
        </div>
        <div className="absolute -inset-2 rounded-3xl border border-primary/20 animate-ping pointer-events-none opacity-30" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">
        Finding your best fit...
      </h2>
      <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mb-8 font-light leading-relaxed">
        We are synthesizing your discovery answers to serve a tailored deep-dive into your strongest career pathways.
      </p>

      {error ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs sm:text-sm flex items-start gap-3 text-left">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold block text-red-200">Unable to load pathway questions</span>
              <p className="text-xs text-red-300/80 leading-relaxed font-light">{error}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              type="button"
              onClick={onRetry}
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-bold px-6 h-10 text-xs cursor-pointer shadow-md"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-2" /> Try Again
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={onBack}
              className="w-full sm:w-auto text-muted-foreground hover:text-white rounded-full text-xs h-10 px-5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Review Stage 1 Answers
            </Button>
          </div>
        </motion.div>
      ) : (
        /* Progress Steps */
        <div className="w-full max-w-sm mx-auto space-y-3 text-left">
          {steps.map((step, idx) => {
            const isDone = activeStep > idx;
            const isCurrent = activeStep === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.12 }}
                className={`flex items-center gap-3 p-3 rounded-2xl border transition-all duration-200 ${
                  isDone
                    ? "border-emerald-500/25 bg-emerald-500/5 text-white"
                    : isCurrent
                    ? "border-primary/40 bg-primary/10 text-white shadow-sm"
                    : "border-white/5 bg-white/[0.01] text-muted-foreground opacity-40"
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
      )}
    </div>
  );
}
