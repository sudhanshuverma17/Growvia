import { motion } from "framer-motion";
import { Sparkles, Compass } from "lucide-react";

export function QuizProgress({
  currentStep,
  totalSteps = 14,
  stage = 1,
  stageLabel,
  category,
}) {
  const safeTotal = Math.max(1, totalSteps);
  const percentage = Math.min(100, Math.round(((currentStep + 1) / safeTotal) * 100));

  const resolvedStageLabel =
    stageLabel ||
    (stage === 1
      ? "Stage 1: Discovering Interests"
      : "Stage 2: Exploring Pathways");

  return (
    <div className="w-full mb-3.5 sm:mb-4">
      {/* Top Header Information */}
      <div className="flex flex-wrap items-center justify-between text-xs mb-1.5 gap-2">
        <div className="flex items-center gap-2">
          {/* Stage Badge */}
          <span className="font-semibold text-white px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] flex items-center gap-1.5">
            {stage === 1 ? (
              <Compass className="w-3 h-3 text-primary" />
            ) : (
              <Sparkles className="w-3 h-3 text-amber-300" />
            )}
            <span>{resolvedStageLabel}</span>
          </span>

          <span className="text-muted-foreground text-[11px] hidden sm:inline-block">
            • Question {currentStep + 1} of {safeTotal}
          </span>
          {category && (
            <span className="text-muted-foreground/75 text-[11px] hidden md:inline-block">
              • {category}
            </span>
          )}
        </div>

        <div className="font-mono text-primary font-bold text-xs sm:text-sm">
          {percentage}% Complete
        </div>
      </div>

      {/* Animated Bar Track */}
      <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden border border-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-primary/80 via-primary to-amber-200 rounded-full shadow-[0_0_8px_rgba(232,224,208,0.35)]"
          initial={{ width: `${(currentStep / safeTotal) * 100}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

