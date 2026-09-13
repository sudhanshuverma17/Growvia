import { motion } from "framer-motion";
import { Check } from "lucide-react";

/**
 * Question Renderer supporting Single Select, Multi-Select (with max constraints),
 * 1–5 Rating Scale, and Scenario Selection.
 * Optimized for vertical viewport efficiency so all options and buttons remain visible without scrolling.
 */
export function QuestionRenderer({ question, value, onChange }) {
  if (!question) return null;

  // Single Select Question
  if (question.type === "single") {
    return (
      <div className="space-y-2 sm:space-y-2.5">
        {question.options.map((opt, i) => {
          const isSelected = value === opt.id;
          return (
            <motion.button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              whileHover={{ scale: 1.006 }}
              whileTap={{ scale: 0.994 }}
              className={`w-full text-left p-3 sm:py-3 sm:px-4 rounded-xl border transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer ${
                isSelected
                  ? "border-primary bg-primary/10 shadow-md shadow-primary/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0 ${
                      isSelected
                        ? "bg-primary text-primary-foreground font-bold"
                        : "bg-white/10 text-muted-foreground"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <h4 className="font-semibold text-white text-sm sm:text-[15px] leading-snug truncate sm:whitespace-normal">
                    {opt.title}
                  </h4>
                </div>
                {opt.desc && (
                  <p className="text-xs text-muted-foreground pl-7 mt-0.5 leading-normal line-clamp-1 sm:line-clamp-2">
                    {opt.desc}
                  </p>
                )}
              </div>

              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-white/20 bg-white/5"
                }`}
              >
                {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
              </div>
            </motion.button>
          );
        })}
      </div>
    );
  }

  // Multi-Select Question (e.g. Q5, Q7)
  if (question.type === "multiple") {
    const selectedArr = Array.isArray(value) ? value : [];
    const max = question.maxSelect || 8;

    const handleToggle = (optId) => {
      if (selectedArr.includes(optId)) {
        onChange(selectedArr.filter((id) => id !== optId));
      } else {
        if (selectedArr.length < max) {
          onChange([...selectedArr, optId]);
        }
      }
    };

    return (
      <div>
        {/* Selection Count Status */}
        <div className="flex justify-between items-center text-xs text-muted-foreground mb-2 px-0.5">
          <span className="text-[11px]">
            {question.maxSelect
              ? `Choose up to ${question.maxSelect} options`
              : "Select all that apply"}
          </span>
          <span className="font-mono text-primary font-medium text-xs">
            {selectedArr.length} {question.maxSelect ? `/ ${question.maxSelect}` : "selected"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
          {question.options.map((opt) => {
            const isSelected = selectedArr.includes(opt.id);
            const isMaxReached = !isSelected && selectedArr.length >= max;

            return (
              <motion.button
                key={opt.id}
                type="button"
                disabled={isMaxReached}
                onClick={() => handleToggle(opt.id)}
                whileHover={!isMaxReached ? { scale: 1.008 } : {}}
                whileTap={!isMaxReached ? { scale: 0.992 } : {}}
                className={`w-full text-left p-2.5 sm:p-3 rounded-xl border transition-all duration-150 flex items-center justify-between gap-2.5 ${
                  isMaxReached
                    ? "opacity-40 cursor-not-allowed border-white/5 bg-white/[0.01]"
                    : "cursor-pointer"
                } ${
                  isSelected
                    ? "border-primary bg-primary/10 shadow-sm shadow-primary/10"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    {opt.tag && (
                      <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-white/5 text-primary border border-primary/20 flex-shrink-0">
                        {opt.tag}
                      </span>
                    )}
                    <span className="text-xs sm:text-sm font-semibold text-white leading-tight truncate">
                      {opt.title}
                    </span>
                  </div>
                  {opt.desc && (
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight line-clamp-1">
                      {opt.desc}
                    </p>
                  )}
                </div>

                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-white/20 bg-white/5"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  // 1–5 Scale Rating Question (Q9)
  if (question.type === "rating") {
    const currentRating = Number(value) || 0;

    return (
      <div className="space-y-3">
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5">
          {question.scaleLabels.map((scale) => {
            const isSelected = currentRating === scale.value;
            return (
              <button
                key={scale.value}
                type="button"
                onClick={() => onChange(scale.value)}
                className={`py-2.5 sm:py-3 px-1 sm:px-2 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary/20 text-white shadow-md shadow-primary/15 scale-102"
                    : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/25 hover:text-white"
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold font-mono transition-colors ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-white/5 text-white"
                  }`}
                >
                  {scale.value}
                </div>
                <span className="text-[10px] sm:text-[11px] font-medium text-center leading-tight">
                  {scale.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Descriptive Feedback for Selected Rating */}
        {currentRating > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center text-xs text-muted-foreground"
          >
            <span className="text-white font-medium mr-1.5">
              Level {currentRating}:
            </span>
            {question.scaleLabels.find((s) => s.value === currentRating)?.note}
          </motion.div>
        )}
      </div>
    );
  }

  // Scenario Question (Q10)
  if (question.type === "scenario") {
    return (
      <div className="space-y-2 sm:space-y-2.5">
        {question.options.map((opt, i) => {
          const isSelected = value === opt.id;
          return (
            <motion.button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              whileHover={{ scale: 1.006 }}
              whileTap={{ scale: 0.994 }}
              className={`w-full text-left p-3 sm:py-3 sm:px-4 rounded-xl border transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer ${
                isSelected
                  ? "border-primary bg-gradient-to-r from-primary/15 to-primary/5 shadow-md shadow-primary/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] text-primary font-bold tracking-widest uppercase">
                    Path {i + 1}
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm sm:text-[15px] leading-snug">
                  {opt.title}
                </h4>
                {opt.desc && (
                  <p className="text-xs text-muted-foreground mt-0.5 leading-normal line-clamp-2">
                    {opt.desc}
                  </p>
                )}
              </div>

              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-white/20 bg-white/5"
                }`}
              >
                {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
              </div>
            </motion.button>
          );
        })}
      </div>
    );
  }

  return null;
}
