import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";
import { apiUrl } from "@/lib/api-config";
import {
  QUIZ_QUESTIONS,
  generateQuizOptionOrder,
  applyQuizOptionOrder,
} from "@/config/quiz-questions";
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
const SHUFFLE_ORDER_KEY = "growvia_quiz_option_order_v1";

export default function Quiz() {
  const { token, isAuthenticated, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(0);
  const [questions, setQuestions] = useState(() => {
    try {
      const savedOrder =
        sessionStorage.getItem(SHUFFLE_ORDER_KEY) ||
        localStorage.getItem(SHUFFLE_ORDER_KEY);

      if (savedOrder) {
        const parsedOrder = JSON.parse(savedOrder);
        if (parsedOrder && typeof parsedOrder === "object" && Object.keys(parsedOrder).length > 0) {
          return applyQuizOptionOrder(QUIZ_QUESTIONS, parsedOrder);
        }
      }
    } catch {
      // Fallback on storage read error
    }

    // Generate fresh randomized option order per question for this quiz session
    const freshOrder = generateQuizOptionOrder(QUIZ_QUESTIONS);
    try {
      const serialized = JSON.stringify(freshOrder);
      sessionStorage.setItem(SHUFFLE_ORDER_KEY, serialized);
      localStorage.setItem(SHUFFLE_ORDER_KEY, serialized);
    } catch {
      // Ignore storage write error
    }
    return applyQuizOptionOrder(QUIZ_QUESTIONS, freshOrder);
  });

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
          // No saved server assessment available
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
        // Ignore corrupted storage
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
      // Ignore storage errors
    }
  }, [answers]);

  const currentQuestion = questions[currentStep] || QUIZ_QUESTIONS[0];
  const totalSteps = questions.length;
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

// Client-side fallback generator in case network or serverless function is temporarily offline
const generateClientFallbackResult = (userAnswers = {}) => {
  const categoryTotals = {
    medicine: 0,
    law: 0,
    technology: 0,
    design: 0,
    business: 0,
    finance: 0,
    engineering: 0,
    education: 0,
  };

  const categoryMeta = {
    medicine: {
      label: "Healthcare & Medicine",
      family: "healthcare",
      icon: "HeartPulse",
      slug: "doctor",
      title: "General Physician / Doctor",
      style: "Clinical Diagnostic & Healthcare Healer",
      reasoning: "Symptom diagnosis, patient care, and healing medicine",
      strategy: "Compassionate patient well-being and clinical accuracy",
    },
    law: {
      label: "Law & Governance",
      family: "legal",
      icon: "Scale",
      slug: "lawyer",
      title: "Advocate / Lawyer",
      style: "Analytical Legal & Justice Advocate",
      reasoning: "Policy research, rights advocacy, and ethical negotiation",
      strategy: "Principled fairness, truth, and systematic legal reasoning",
    },
    technology: {
      label: "Software & Technology",
      family: "technology",
      icon: "Code",
      slug: "engineer",
      title: "Software Engineer",
      style: "Deductive Systems & Software Architect",
      reasoning: "Algorithmic logic, computational problem solving, and software engineering",
      strategy: "Deterministic verification and scalable architecture",
    },
    design: {
      label: "Design & Creative Arts",
      family: "design",
      icon: "Palette",
      slug: "designer",
      title: "UI/UX & Product Designer",
      style: "Human-Centered Creative & Visual Designer",
      reasoning: "Visual storytelling, aesthetic intuition, and design imagination",
      strategy: "Harmonizing functional beauty with emotional resonance",
    },
    business: {
      label: "Business & Management",
      family: "business",
      icon: "Briefcase",
      slug: "product-manager",
      title: "Product & Business Manager",
      style: "Strategic Commercial & Enterprise Leader",
      reasoning: "Organizational leadership, strategic growth, and capital allocation",
      strategy: "Value creation, risk-adjusted returns, and team alignment",
    },
    finance: {
      label: "Finance & Accounting",
      family: "finance",
      icon: "TrendingUp",
      slug: "chartered-accountant",
      title: "Chartered Accountant (CA)",
      style: "Quantitative Financial & Risk Analyst",
      reasoning: "Financial auditing, capital governance, and tax optimization",
      strategy: "Fiscal accuracy, disciplined compliance, and risk mitigation",
    },
    engineering: {
      label: "Core Engineering",
      family: "engineering",
      icon: "Wrench",
      slug: "mechanical-engineer",
      title: "Mechanical Engineer",
      style: "Applied Engineering & Infrastructure Specialist",
      reasoning: "Physical mechanics, structural durability, and precision engineering",
      strategy: "Fail-safe engineering standards and reliable execution",
    },
    education: {
      label: "Education & Care",
      family: "education",
      icon: "GraduationCap",
      slug: "teacher",
      title: "Educator & Mentor",
      style: "Empathetic Educator & Transformational Mentor",
      reasoning: "Pedagogical communication, talent guidance, and teaching",
      strategy: "Holistic human development and values-driven encouragement",
    },
  };

  // 1. Accumulate weighted vectors with 60/40 interest vs academic split
  QUIZ_QUESTIONS.forEach((q) => {
    const userAns = userAnswers[q.id];
    if (!userAns) return;

    const multiplier = q.typeCategory === "academic" ? 0.8 : 1.2;
    const opt = (q.options || []).find((o) => o.id === userAns);
    if (opt && opt.scores) {
      Object.entries(opt.scores).forEach(([cat, pts]) => {
        if (categoryTotals[cat] !== undefined) {
          categoryTotals[cat] += pts * multiplier;
        }
      });
    }
  });

  // 2. Normalize to 0-100%
  const categoryScores = {};
  Object.keys(categoryTotals).forEach((cat) => {
    const raw = categoryTotals[cat] || 0;
    const max = 18;
    categoryScores[cat] = Math.min(98, Math.max(25, Math.round((raw / max) * 100)));
  });

  // 3. Rank categories descending & check for tie
  const ranked = Object.keys(categoryScores)
    .map((catKey) => ({
      category: catKey,
      ...categoryMeta[catKey],
      score: categoryScores[catKey],
      matchPercentage: categoryScores[catKey],
      isTie: false,
    }))
    .sort((a, b) => b.score - a.score);

  const margin = ranked.length >= 2 ? ranked[0].score - ranked[1].score : 0;
  const isTie = margin <= 5 && ranked[0].score > 30;

  if (isTie && ranked.length >= 2) {
    ranked[0].isTie = true;
    ranked[1].isTie = true;
  }

  // 4. Map top categories to recommendations
  const selected = ranked.slice(0, 4).map((item, idx) => ({
    id: item.slug,
    careerId: item.slug,
    roadmapId: item.slug,
    title: item.title,
    category: item.label,
    family: item.family,
    icon: item.icon,
    score: item.score,
    matchPercentage: item.matchPercentage,
    isTie: (idx === 0 || idx === 1) && isTie,
    roadmapUrl: `/roadmaps/${item.slug}`,
    keyStrengths: [
      `Strong aptitude in ${item.label}`,
      "Applied real-world problem solving",
      "Goal-driven disciplined execution",
    ],
    reason: isTie && idx < 2
      ? `Top match (Tie) with ${item.score}% compatibility based on your balanced problem-solving preferences.`
      : `High compatibility (${item.score}%) reflecting your natural preference for ${item.label}.`,
  }));

  const topMatch = selected[0] || {};
  const primaryStyle = topMatch.style || "Analytical Problem Solver";
  const reasoningStrength = topMatch.reasoning || "Structured problem deconstruction";
  const decisionStrategy = topMatch.strategy || "Evidence-based evaluation";

  const logicalProfile = {
    primaryStyle,
    reasoningStrength,
    decisionStrategy,
    cognitiveSummary: `Your responses highlight strong capability as a ${primaryStyle}. You excel at ${reasoningStrength.toLowerCase()} to solve complex challenges.`,
  };

  const topExplanation = isTie && selected[1]
    ? `You have a dual top match in both ${topMatch.title} and ${selected[1].title} (${topMatch.matchPercentage}% vs ${selected[1].matchPercentage}%), reflecting balanced strengths across both fields.`
    : `Your ${primaryStyle.toLowerCase()} mindset aligns naturally with the core problem-solving demands of ${topMatch.title}.`;

  return {
    id: `local-${Date.now()}`,
    quizVersion: "career-assessment-v2",
    categoryScores,
    traitScores: categoryScores,
    careerScores: selected,
    topRecommendations: selected,
    topMatch,
    tieBreaker: {
      isTie,
      margin,
      tiedCategories: isTie ? [ranked[0], ranked[1]] : [ranked[0]],
    },
    aiAnalysis: {
      logicalProfile,
      summary: isTie && selected[1]
        ? `Your assessment shows a dual top affinity: you are tied between ${topMatch.title} and ${selected[1].title}, combining strengths in ${topMatch.category} and ${selected[1].category}.`
        : `Your profile highlights strong aptitude as a ${primaryStyle.toLowerCase()} with primary strength in ${topMatch.category} (${topMatch.matchPercentage}% match).`,
      strengths: [
        `Strong compatibility in ${topMatch.category}`,
        `Natural aptitude for ${reasoningStrength.toLowerCase()}`,
        "Structured problem deconstruction and systematic execution",
        "Disciplined approach to high-responsibility decisions",
      ],
      topCareer: {
        name: topMatch.title,
        explanation: topExplanation,
      },
      topRecommendations: selected.map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        matchPercentage: item.matchPercentage,
        isTie: item.isTie,
        reason: item.reason,
      })),
      alternativeCareers: selected.slice(1).map((item) => ({
        name: item.title,
        explanation: `A strong alternative in the ${item.family} domain with ${item.matchPercentage}% compatibility.`,
      })),
      developmentAreas: [
        "Deepening practical hands-on project implementations",
        "Exploring industry certifications and professional networking",
      ],
      nextSteps: [
        `Explore the step-by-step roadmap for ${topMatch.title} on Growvia`,
        isTie && selected[1]
          ? `Compare day-to-day milestones with ${selected[1].title} to see which projects excite you most`
          : "Review core skill milestones and prerequisite foundations",
        "Start a guided real-world project to test your day-to-day interest",
      ],
    },
  };
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

      let assessmentData = null;

      try {
        const res = await fetch(apiUrl("/api/career-quiz/submit"), {
          method: "POST",
          headers,
          body: JSON.stringify({ answers }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data) {
            assessmentData = data.data;
          }
        }
      } catch (networkErr) {
        // Fall back seamlessly
      }

      // If backend was unreachable or returned an error, fallback seamlessly to client evaluation
      if (!assessmentData) {
        assessmentData = generateClientFallbackResult(answers);
      }

      // Successful assessment response
      setResultData(assessmentData);
      try {
        localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(assessmentData));
        sessionStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(assessmentData));
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(SHUFFLE_ORDER_KEY);
        sessionStorage.removeItem(SHUFFLE_ORDER_KEY);
      } catch {
        // Ignore storage errors
      }

      toast({
        title: "Assessment Evaluated!",
        description: "Your personalized career profile is ready.",
      });
    } catch (err) {
      const fallback = generateClientFallbackResult(answers);
      setResultData(fallback);
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
      localStorage.removeItem(SHUFFLE_ORDER_KEY);
      sessionStorage.removeItem(SHUFFLE_ORDER_KEY);
    } catch {
      // Ignore
    }

    // Generate a fresh shuffle for the new quiz session
    const freshOrder = generateQuizOptionOrder(QUIZ_QUESTIONS);
    try {
      const serialized = JSON.stringify(freshOrder);
      sessionStorage.setItem(SHUFFLE_ORDER_KEY, serialized);
      localStorage.setItem(SHUFFLE_ORDER_KEY, serialized);
    } catch {
      // Ignore
    }
    setQuestions(applyQuizOptionOrder(QUIZ_QUESTIONS, freshOrder));

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <div
        className={
          resultData
            ? "max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 min-h-[80vh]"
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
