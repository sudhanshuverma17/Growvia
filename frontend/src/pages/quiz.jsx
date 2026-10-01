import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";
import { apiUrl } from "@/lib/api-config";
import { STAGE1_QUESTIONS } from "@/config/stage1-questions";
import { QuizProgress } from "@/components/quiz/QuizProgress";
import { QuestionRenderer } from "@/components/quiz/QuestionRenderer";
import { QuizLoading } from "@/components/quiz/QuizLoading";
import { QuizTransition } from "@/components/quiz/QuizTransition";
import { CareerResults } from "@/components/quiz/CareerResults";
import { PageLoader } from "@/components/page-loader";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Compass,
  AlertCircle,
  RotateCcw,
} from "lucide-react";

const PROGRESS_STORAGE_KEY = "growvia_quiz_v3";
const RESULT_STORAGE_KEY = "growvia_last_quiz_result_v3";
const LEGACY_RESULT_STORAGE_KEY = "growvia_last_quiz_result";

export default function Quiz() {
  const { token, loading: authLoading } = useAuth();
  const { toast } = useToast();

  // Multi-stage state
  const [stage, setStage] = useState(1); // 1 or 2
  const [currentStep, setCurrentStep] = useState(0);
  const [stage1Answers, setStage1Answers] = useState({});
  const [stage2Answers, setStage2Answers] = useState({});
  const [stage2Questions, setStage2Questions] = useState([]);

  // Transition & evaluation states
  const [isTransitioningToStage2, setIsTransitioningToStage2] = useState(false);
  const [transitionError, setTransitionError] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Initial assessment retrieval check
  const [checkingExisting, setCheckingExisting] = useState(true);
  const [resultData, setResultData] = useState(null);

  // Restore existing result or resume in-progress quiz on mount
  useEffect(() => {
    if (authLoading) return;

    let isMounted = true;

    const restoreOrFetch = async () => {
      // 1. Check if user already has an in-progress quiz session
      try {
        const savedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
        if (savedProgress) {
          const parsed = JSON.parse(savedProgress);
          if (parsed && typeof parsed === "object") {
            const hasS1Answers = parsed.stage1Answers && Object.keys(parsed.stage1Answers).length > 0;
            const hasS2Answers = parsed.stage2Answers && Object.keys(parsed.stage2Answers).length > 0;

            if (hasS1Answers || hasS2Answers) {
              setStage(parsed.stage === 2 && Array.isArray(parsed.stage2Questions) && parsed.stage2Questions.length > 0 ? 2 : 1);
              setCurrentStep(typeof parsed.currentStep === "number" ? parsed.currentStep : 0);
              setStage1Answers(parsed.stage1Answers || {});
              setStage2Answers(parsed.stage2Answers || {});
              setStage2Questions(Array.isArray(parsed.stage2Questions) ? parsed.stage2Questions : []);
              setCheckingExisting(false);
              return;
            }
          }
        }
      } catch (err) {
        // Continue to check results if in-progress progress read fails
      }

      // 2. If logged in, query backend for latest saved assessment
      if (token) {
        try {
          const res = await fetch(apiUrl("/api/career-quiz/latest"), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            // Accepts top-level v3 payload or data wrapper
            const assessment = data?.picks || data?.quizVersion ? data : (data?.data || null);
            if (assessment && isMounted) {
              setResultData(assessment);
              try {
                localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(assessment));
              } catch {}
              setCheckingExisting(false);
              return;
            }
          }
        } catch (err) {
          // No saved server assessment available
        }
      }

      // 3. Check localStorage for previously completed result
      try {
        const savedResult =
          localStorage.getItem(RESULT_STORAGE_KEY) ||
          localStorage.getItem(LEGACY_RESULT_STORAGE_KEY) ||
          sessionStorage.getItem(RESULT_STORAGE_KEY);
        if (savedResult && isMounted) {
          setResultData(JSON.parse(savedResult));
        }
      } catch (err) {
        // Ignore corrupted storage
      } finally {
        if (isMounted) {
          setCheckingExisting(false);
        }
      }
    };

    restoreOrFetch();

    return () => {
      isMounted = false;
    };
  }, [token, authLoading]);

  // Auto-save in-progress quiz state whenever answers or step change
  useEffect(() => {
    if (resultData || checkingExisting) return;

    try {
      const hasAnyAnswers =
        Object.keys(stage1Answers).length > 0 || Object.keys(stage2Answers).length > 0;

      if (hasAnyAnswers) {
        const payload = {
          stage,
          currentStep,
          stage1Answers,
          stage2Answers,
          stage2Questions,
        };
        localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(payload));
      }
    } catch (err) {
      // Ignore storage write error
    }
  }, [stage, currentStep, stage1Answers, stage2Answers, stage2Questions, resultData, checkingExisting]);

  // Current question resolution based on stage
  const currentQuestion =
    stage === 1
      ? STAGE1_QUESTIONS[currentStep] || STAGE1_QUESTIONS[0]
      : stage2Questions[currentStep] || stage2Questions[0];

  const currentStageTotal =
    stage === 1 ? STAGE1_QUESTIONS.length : Math.max(1, stage2Questions.length);

  const totalQuestionsOverall =
    STAGE1_QUESTIONS.length + (stage2Questions.length > 0 ? stage2Questions.length : 7);

  const overallStepIndex = stage === 1 ? currentStep : STAGE1_QUESTIONS.length + currentStep;

  const isLastQuestionOfStage = currentStep === currentStageTotal - 1;

  // Answer validation for current question
  const currentAnswer =
    stage === 1
      ? stage1Answers[currentQuestion?.id]
      : stage2Answers[currentQuestion?.id];

  const canProceed = () => {
    if (!currentQuestion) return false;
    if (currentAnswer === undefined || currentAnswer === null) return false;

    if (currentQuestion.type === "multiple") {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0;
    }

    return typeof currentAnswer === "string" && currentAnswer.trim().length > 0;
  };

  const handleAnswerChange = useCallback(
    (value) => {
      setSubmitError(null);
      if (stage === 1) {
        setStage1Answers((prev) => ({
          ...prev,
          [currentQuestion.id]: value,
        }));
      } else {
        setStage2Answers((prev) => ({
          ...prev,
          [currentQuestion.id]: value,
        }));
      }
    },
    [stage, currentQuestion?.id]
  );

  // Transition from Stage 1 to Stage 2
  const handleStage1Complete = async () => {
    setIsTransitioningToStage2(true);
    setTransitionError(null);

    try {
      const res = await fetch(apiUrl("/api/career-quiz/v3/stage1"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stage1Answers }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success || !Array.isArray(data?.questions) || data.questions.length === 0) {
        throw new Error(data?.error || "Failed to curate pathway questions from your Stage 1 responses.");
      }

      setStage2Questions(data.questions);
      setStage(2);
      setCurrentStep(0);
      setIsTransitioningToStage2(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setIsTransitioningToStage2(true);
      setTransitionError(err.message || "An unexpected network error occurred. Please try again.");
    }
  };

  // Submit full quiz assessment to server (Zero client scoring fallback)
  const handleSubmit = async () => {
    setIsEvaluating(true);
    setSubmitError(null);

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(apiUrl("/api/career-quiz/v3/submit"), {
        method: "POST",
        headers,
        body: JSON.stringify({
          stage1Answers,
          stage2Answers,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data) {
        throw new Error(
          data?.error || "The server was unable to evaluate your assessment. Please retry."
        );
      }

      // Successful assessment response from server authority
      setResultData(data);
      try {
        localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(data));
        localStorage.removeItem(PROGRESS_STORAGE_KEY);
      } catch {
        // Ignore storage errors
      }

      toast({
        title: "Assessment Evaluated!",
        description: "Your personalized career profile is ready.",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitError(
        err.message || "Unable to reach the career scoring service. Please check your network and retry."
      );
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNext = () => {
    if (!canProceed()) return;

    if (stage === 1) {
      if (!isLastQuestionOfStage) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        handleStage1Complete();
      }
    } else {
      if (!isLastQuestionOfStage) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (stage === 1) {
      if (currentStep > 0) {
        setCurrentStep((prev) => prev - 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      if (currentStep > 0) {
        setCurrentStep((prev) => prev - 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Step back to last question of Stage 1
        setStage(1);
        setCurrentStep(STAGE1_QUESTIONS.length - 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleRetake = () => {
    setStage(1);
    setCurrentStep(0);
    setStage1Answers({});
    setStage2Answers({});
    setStage2Questions([]);
    setResultData(null);
    setSubmitError(null);
    setTransitionError(null);
    setIsTransitioningToStage2(false);

    try {
      localStorage.removeItem(PROGRESS_STORAGE_KEY);
      localStorage.removeItem(RESULT_STORAGE_KEY);
      localStorage.removeItem(LEGACY_RESULT_STORAGE_KEY);
      sessionStorage.removeItem(RESULT_STORAGE_KEY);
    } catch {
      // Ignore
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <div className="w-full min-h-screen bg-[#0a0a0c] text-foreground relative overflow-hidden -mt-20 pt-28 pb-20 -mb-20">
        {/* Atmospheric Photography Background for Quiz Results */}
        {resultData && (
          <div className="absolute top-0 left-0 right-0 h-[640px] pointer-events-none select-none overflow-hidden z-0">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-45"
              style={{
                backgroundImage: "url('/images/quiz-results-bg.jpg')",
                backgroundPosition: "center 25%",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-[#0a0a0c]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
            <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#0a0a0c] to-transparent" />
          </div>
        )}

        <div
          className={`relative z-10 ${
            resultData
              ? "max-w-6xl mx-auto px-4 sm:px-6 py-4 md:py-8"
              : "max-w-2xl mx-auto px-3 sm:px-6 py-2 sm:py-4"
          }`}
        >
          {checkingExisting ? (
            /* Checking previous assessment profile */
            <PageLoader label="Retrieving your career assessment profile..." />
          ) : isEvaluating ? (
            /* Evaluating state during server scoring */
            <QuizLoading />
          ) : isTransitioningToStage2 ? (
            /* Smooth Transition between Stage 1 & Stage 2 */
            <QuizTransition
              error={transitionError}
              onRetry={handleStage1Complete}
              onBack={() => {
                setIsTransitioningToStage2(false);
                setTransitionError(null);
                setStage(1);
                setCurrentStep(STAGE1_QUESTIONS.length - 1);
              }}
            />
          ) : resultData ? (
            /* Results presentation */
            <CareerResults resultData={resultData} onRetake={handleRetake} />
          ) : (
            /* Career Assessment Wizard - 2-Stage Adaptive Flow */
            <div>
              {/* Slim Header & Action bar */}
              <div className="flex items-center justify-between text-xs mb-2 sm:mb-2.5 px-0.5">
                <div className="flex items-center gap-1.5 font-bold text-white text-xs">
                  <Compass className="w-3.5 h-3.5 text-primary" /> Career Assessment
                  <span className="text-muted-foreground text-[11px] font-normal hidden sm:inline">
                    • Stage {stage} of 2
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleRetake}
                  className="text-[11px] text-muted-foreground hover:text-white transition-colors cursor-pointer"
                >
                  Reset
                </button>
              </div>

              {/* Progress Bar showing overall progress and stage label */}
              <QuizProgress
                currentStep={overallStepIndex}
                totalSteps={totalQuestionsOverall}
                stage={stage}
                stageLabel={
                  stage === 1
                    ? "Stage 1: Discovering Interests"
                    : "Stage 2: Exploring Pathways"
                }
                category={currentQuestion?.category || (stage === 1 ? "Discovery" : "Deep Dive")}
              />

              {/* Error banner if submission failed (with explicit retry, no client-side faking) */}
              {submitError && (
                <div className="mb-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                    <span>{submitError}</span>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleSubmit}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-semibold px-4 h-8 self-end sm:self-auto cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3 mr-1.5" /> Retry Submission
                  </Button>
                </div>
              )}

              {/* Question Card */}
              {currentQuestion && (
                <div className="bg-[#16161a] p-4 sm:p-5 md:p-6 rounded-2xl border border-white/10 relative shadow-xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${stage}-${currentQuestion.id}`}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] sm:text-[11px] font-bold text-primary tracking-wider uppercase bg-primary/10 px-2.5 py-0.5 rounded-md border border-primary/20">
                          Question {currentStep + 1} of {currentStageTotal}
                        </span>
                        <span className="text-[11px] text-muted-foreground font-mono">
                          {stage === 1 ? `Stage 1 Discovery` : `Stage 2 Deep Dive`}
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1.5 leading-snug">
                        {currentQuestion.question || currentQuestion.text}
                      </h2>

                      {(currentQuestion.description || currentQuestion.subtitle) && (
                        <p className="text-xs text-muted-foreground mb-3 leading-normal font-light">
                          {currentQuestion.description || currentQuestion.subtitle}
                        </p>
                      )}

                      {/* Interactive Options Renderer */}
                      <QuestionRenderer
                        question={currentQuestion}
                        value={currentAnswer}
                        onChange={handleAnswerChange}
                      />

                      {currentQuestion.whyThisQuestion && (
                        <div className="mt-3 pt-2.5 border-t border-white/5 flex items-start gap-1.5 text-[11px] text-muted-foreground/80">
                          <span className="font-semibold text-white/70 flex-shrink-0">
                            Why this question?
                          </span>
                          <span className="text-white/60">{currentQuestion.whyThisQuestion}</span>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Footer */}
                  <div className="mt-4 sm:mt-5 pt-3 sm:pt-3.5 border-t border-white/10 flex items-center justify-between gap-3">
                    <div>
                      {stage === 2 || currentStep > 0 ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleBack}
                          className="text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl text-xs h-9 px-3 cursor-pointer"
                        >
                          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Previous
                        </Button>
                      ) : (
                        <div />
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        disabled={!canProceed()}
                        onClick={handleNext}
                        size="sm"
                        className={`rounded-xl font-bold transition-all shadow-sm h-9 sm:h-10 px-5 sm:px-6 text-xs sm:text-sm cursor-pointer ${
                          canProceed()
                            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20"
                            : "bg-white/10 text-white/40 cursor-not-allowed border border-white/5"
                        }`}
                      >
                        {stage === 2 && isLastQuestionOfStage ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> See My Career Results
                          </>
                        ) : stage === 1 && isLastQuestionOfStage ? (
                          <>
                            Explore Pathways <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                          </>
                        ) : (
                          <>
                            Continue <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
