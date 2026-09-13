import { motion } from "framer-motion";

export function QuizProgress({ currentStep, totalSteps, category }) {
  const percentage = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className="w-full mb-3.5 sm:mb-4">
      {/* Top Header Information */}
      <div className="flex items-center justify-between text-xs mb-1.5">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px]">
            Question {currentStep + 1} of {totalSteps}
          </span>
          {category && (
            <span className="text-muted-foreground text-[11px] hidden sm:inline-block">
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
          className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full shadow-[0_0_8px_rgba(232,224,208,0.35)]"
          initial={{ width: `${(currentStep / totalSteps) * 100}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
