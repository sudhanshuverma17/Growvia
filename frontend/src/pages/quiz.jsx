import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";
import { apiUrl } from "@/lib/api-config";
import { QUIZ_QUESTIONS } from "@/config/quiz-questions";
import { QuizProgress } from "@/components/quiz/QuizProgress";
import { QuestionRenderer } from "@/components/quiz/QuestionRenderer";
import { QuizLoading } from "@/components/quiz/QuizLoading";
import { CareerResults } from "@/components/quiz/CareerResults";
import { PageLoader } from "@/components/page-loader";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Compass,
  AlertCircle,
} from "lucide-react";

const STORAGE_KEY = "growvia_quiz_answers_v1";
const RESULT_STORAGE_KEY = "growvia_last_quiz_result";

export default function Quiz() {
  const { token, isAuthenticated, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isEvaluating, setIsEvaluating] = useState(false);
  const [checkingExisting, setCheckingExisting] = useState(true);
  const [resultData, setResultData] = useState(() => {
    try {
      const savedResult =
        localStorage.getItem(RESULT_STORAGE_KEY) ||
        sessionStorage.getItem(RESULT_STORAGE_KEY);
      return savedResult ? JSON.parse(savedResult) : null;
    } catch {
      return null;
    }
  });
  const [errorMessage, setErrorMessage] = useState(null);

  // Check if user has already taken the quiz (backend for members, localStorage for guests)
  useEffect(() => {
    if (authLoading) return;

    let isMounted = true;

    const checkExistingAssessment = async () => {
      // 1. If user is logged in, query the backend for their latest saved assessment
      if (token) {
        try {
          const res = await fetch(apiUrl("/api/career-quiz/latest"), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            if (data.success && data.data && isMounted) {
              setResultData(data.data);
              try {
                localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(data.data));
              } catch {}
              setCheckingExisting(false);
              return;
            }
          }
        } catch (err) {
          console.warn("[Quiz]: Could not fetch latest assessment from backend:", err);
        }
      }

      // 2. If guest or no server record found, check localStorage
      try {
        const saved =
          localStorage.getItem(RESULT_STORAGE_KEY) ||
          sessionStorage.getItem(RESULT_STORAGE_KEY);
        if (saved && isMounted) {
          setResultData(JSON.parse(saved));
        }
      } catch (err) {
        console.warn("[Quiz]: Local storage parse error:", err);
      } finally {
        if (isMounted) {
          setCheckingExisting(false);
        }
      }
    };

    checkExistingAssessment();

    return () => {
      isMounted = false;
    };
  }, [token, authLoading]);

  // Save answers to localStorage whenever they change
  useEffect(() => {
    try {
      if (answers && Object.keys(answers).length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
      }
    } catch (err) {
      console.warn("[Quiz Storage Error]:", err);
    }
  }, [answers]);

  const currentQuestion = QUIZ_QUESTIONS[currentStep];
  const totalSteps = QUIZ_QUESTIONS.length;
  const isLastQuestion = currentStep === totalSteps - 1;

  // Answer validation for current question
  const currentAnswer = answers[currentQuestion?.id];
  const canProceed = () => {
    if (currentAnswer === undefined || currentAnswer === null) return false;

    if (currentQuestion.type === "multiple") {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0;
    }

    if (currentQuestion.type === "rating") {
      const num = Number(currentAnswer);
      return !isNaN(num) && num >= 1 && num <= 5;
    }

    return typeof currentAnswer === "string" && currentAnswer.trim().length > 0;
  };

  const handleAnswerChange = useCallback(
    (value) => {
      setErrorMessage(null);
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: value,
      }));
    },
    [currentQuestion?.id]
  );

  const handleNext = () => {
    if (!canProceed()) return;

    if (!isLastQuestion) {
      setCurrentStep((prev) => Math.min(totalSteps - 1, prev + 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => Math.max(0, prev - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    setIsEvaluating(true);
    setErrorMessage(null);

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(apiUrl("/api/career-quiz/submit"), {
        method: "POST",
        headers,
        body: JSON.stringify({ answers }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to calculate career assessment");
      }

      // Successful assessment response
      setResultData(data.data);
      try {
        localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(data.data));
        sessionStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(data.data));
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignore storage errors
      }

      toast({
        title: "Assessment Evaluated!",
        description: "Your personalized career profile is ready.",
      });
    } catch (err) {
      console.error("[Quiz Submission Error]:", err);
      setErrorMessage(
        err.message || "Network error. Please ensure the backend server is reachable."
      );
      toast({
        title: "Submission Error",
        description: err.message || "Could not process assessment.",
        variant: "destructive",
      });
    } finally {
      setIsEvaluating(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentStep(0);
    setResultData(null);
    setErrorMessage(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(RESULT_STORAGE_KEY);
      sessionStorage.removeItem(RESULT_STORAGE_KEY);
    } catch {
      // Ignore
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <div
        className={
          resultData
            ? "max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12 min-h-[80vh]"
            : "max-w-2xl mx-auto px-3 sm:px-6 py-2 sm:py-4"
        }
      >
        {checkingExisting ? (
          /* Checking previous assessment profile */
          <PageLoader label="Retrieving your career assessment profile..." />
        ) : isEvaluating ? (
          /* Evaluating state */
          <QuizLoading />
        ) : resultData ? (
          /* Results presentation */
          <CareerResults resultData={resultData} onRetake={handleRetake} />
        ) : (
          /* 10-Question Wizard - Compact to fit within viewport */
          <div>
            {/* Slim Header & Action bar */}
            <div className="flex items-center justify-between text-xs mb-2 sm:mb-2.5 px-0.5">
              <div className="flex items-center gap-1.5 font-bold text-white text-xs">
                <Compass className="w-3.5 h-3.5 text-primary" /> Career Assessment
                <span className="text-muted-foreground text-[11px] font-normal hidden sm:inline">
                  • 10 Questions
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

            {/* Compact Progress Bar */}
            <QuizProgress
              currentStep={currentStep}
              totalSteps={totalSteps}
              category={currentQuestion.category}
            />

            {/* Error banner if any */}
            {errorMessage && (
              <div className="mb-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Question Card */}
            <div className="glass-card p-4 sm:p-5 md:p-6 rounded-2xl border border-white/10 relative shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] sm:text-[11px] font-bold text-primary tracking-wider uppercase bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">
                      Question {currentStep + 1} of {totalSteps}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {currentQuestion.category}
                    </span>
                  </div>

                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 leading-snug">
                    {currentQuestion.question}
                  </h2>

                  {(currentQuestion.description || currentQuestion.subtitle) && (
                    <p className="text-xs text-muted-foreground mb-3 leading-normal">
                      {currentQuestion.description || currentQuestion.subtitle}
                    </p>
                  )}

                  {/* Interactive Options Renderer */}
                  <QuestionRenderer
                    question={currentQuestion}
                    value={currentAnswer}
                    onChange={handleAnswerChange}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Footer */}
              <div className="mt-4 sm:mt-5 pt-3 sm:pt-3.5 border-t border-white/10 flex items-center justify-between gap-3">
                <div>
                  {currentStep > 0 ? (
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
                    {isLastQuestion ? (
                      <>
                        <Sparkles className="w-3.5 h-3.5 mr-1.5" /> See My Career Results
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
          </div>
        )}
      </div>
    </Layout>
  );
}
