import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { useCourses } from "@/context/course-context";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { apiUrl } from "@/lib/api-config";
import { CareerIcon } from "@/components/career-icon";
import {
  Bookmark,
  Target,
  Award,
  User,
  Settings,
  LogOut,
  ArrowRight,
  ShieldCheck,
  Compass,
  Trophy,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCareerCardImage, getCareerConciseDesc } from "@/lib/career-media";

export default function Dashboard() {
  const { courses } = useCourses();
  const { user, token, logout, isAdmin, toggleSaveRoadmap } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const [latestAssessment, setLatestAssessment] = useState(null);
  const [loadingAssessment, setLoadingAssessment] = useState(true);
  const [activeTab, setActiveTab] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("tab") === "saved" || params.get("save")) {
        return "saved";
      }
    } catch (e) {}
    return "purchased";
  });

  // Fetch latest career assessment for the user
  useEffect(() => {
    const fetchLatestAssessment = async () => {
      if (!token) {
        setLoadingAssessment(false);
        return;
      }
      try {
        const res = await fetch(apiUrl("/api/career-quiz/latest"), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data) {
            setLatestAssessment(data.data);
          }
        }
      } catch (err) {
        // No assessment found or network unavailable
      } finally {
        setLoadingAssessment(false);
      }
    };

    fetchLatestAssessment();
  }, [token]);

  // Automatically save roadmap if redirected from roadmap save action (?save=careerId)
  useEffect(() => {
    if (!token || !user || !toggleSaveRoadmap) return;
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const saveCareerId = searchParams.get("save");
      if (saveCareerId) {
        setActiveTab("saved");
        const isPurchased = Array.isArray(user?.purchasedRoadmaps) && user.purchasedRoadmaps.includes(saveCareerId);
        if (isPurchased) return;
        const isAlreadySaved = Array.isArray(user?.savedRoadmaps) && user.savedRoadmaps.includes(saveCareerId);
        if (!isAlreadySaved) {
          toggleSaveRoadmap(saveCareerId).then((saved) => {
            if (saved) {
              const targetCareer = courses.find((c) => c.id === saveCareerId);
              toast({
                title: "Roadmap Saved! 🎉",
                description: `Added "${targetCareer?.title || "chosen roadmap"}" to your dashboard.`,
              });
            }
          });
        }
      }
    } catch (err) {
      // Ignore
    }
  }, [token, user, courses]);

  // Load roadmaps purchased/unlocked by the user
  const userPurchasedIds = Array.isArray(user?.purchasedRoadmaps) ? user.purchasedRoadmaps : [];
  const purchasedCareers = courses.filter((c) => userPurchasedIds.includes(c.id));

  // Load only roadmaps explicitly saved by the user that are NOT already purchased
  const userSavedIds = Array.isArray(user?.savedRoadmaps) ? user.savedRoadmaps : [];
  const savedCareers = courses.filter(
    (c) => userSavedIds.includes(c.id) && !userPurchasedIds.includes(c.id)
  );

  // Extract quiz recommendation details if assessment exists
  const topQuizRecommendation = latestAssessment?.topRecommendations?.[0];
  const topQuizCareerId =
    topQuizRecommendation?.careerId || topQuizRecommendation?.id || "software-engineer";
  const topQuizRoadmapUrl =
    topQuizRecommendation?.roadmapUrl || `/roadmaps/${topQuizCareerId}`;

  const handleRemoveBookmark = async (e, careerId, careerTitle) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleSaveRoadmap(careerId);
    toast({
      title: "Roadmap Removed",
      description: `Removed "${careerTitle}" from your saved list.`,
    });
  };

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const getCardImage = (career) => {
    return getCareerCardImage(career);
  };

  const getDisplaySalary = (career) => {
    if (career.id === "biotechnologist") return "₹3L - ₹20L+";
    if (career.id === "engineer") return "₹5L - ₹40L+";
    if (career.id === "game-developer") return "₹4L - ₹30L+";
    return career.stats?.salary || "₹4L - ₹25L+";
  };

  const getConciseDesc = (career) => {
    return getCareerConciseDesc(career);
  };

  return (
    <Layout>
      <div className="w-full min-h-[calc(100vh-5rem)] bg-[#0d0d0f] text-foreground -mt-20 pt-28 pb-16 -mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full md:w-64 flex-shrink-0">
              <div className="bg-[#131316] p-6 rounded-2xl sticky top-24 border border-white/10 shadow-xl">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
                  <div className="w-12 h-12 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 font-bold text-lg">
                    {user?.name?.charAt(0).toUpperCase() || "S"}
                  </div>
                  <div>
                    <h3 className="font-bold text-white leading-tight">
                      {user?.name || "Student User"}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-medium border border-amber-500/20 flex items-center gap-1">
                        {isAdmin ? (
                          <>
                            <ShieldCheck className="w-3 h-3" /> Admin
                          </>
                        ) : (
                          "Student Member"
                        )}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-1 truncate max-w-[140px]">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <nav className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveTab("purchased")}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-colors ${
                      activeTab === "purchased"
                        ? "bg-white/10 text-white font-medium shadow-sm"
                        : "text-muted-foreground hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck className={`w-4 h-4 ${activeTab === "purchased" ? "text-amber-400" : "text-muted-foreground"}`} />
                      <span>Purchased</span>
                    </div>
                    {purchasedCareers.length > 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono font-bold">
                        {purchasedCareers.length}
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("saved")}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-colors ${
                      activeTab === "saved"
                        ? "bg-white/10 text-white font-medium shadow-sm"
                        : "text-muted-foreground hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Bookmark className={`w-4 h-4 ${activeTab === "saved" ? "text-amber-400" : "text-muted-foreground"}`} />
                      <span>Saved Roadmaps</span>
                    </div>
                    {savedCareers.length > 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-muted-foreground font-mono">
                        {savedCareers.length}
                      </span>
                    )}
                  </button>

                  <Link
                    href="/career-quiz"
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors text-muted-foreground hover:bg-white/5 hover:text-white"
                  >
                    <Target className="w-4 h-4 text-amber-400" />
                    <span>Quiz Results</span>
                  </Link>

                  {[
                    { icon: Award, label: "Certificates" },
                    { icon: User, label: "Profile" },
                    { icon: Settings, label: "Settings" },
                  ].map((item, i) => (
                    <button
                      key={i}
                      type="button"
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors text-muted-foreground/60 hover:bg-white/5 hover:text-muted-foreground cursor-not-allowed"
                    >
                      <item.icon className="w-4 h-4 text-muted-foreground/50" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>

                {isAdmin && (
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10 rounded-xl text-xs h-9"
                    >
                      <Link href="/admin">
                        <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                        Open Admin Studio
                      </Link>
                    </Button>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-white/10">
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Log out
                  </Button>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              {/* Header Greeting Banner */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E5A855] px-3 py-1 rounded-full border border-amber-500/25 bg-amber-500/5 mb-3">
                  STUDENT PORTAL
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Welcome back, <span className="text-[#E69D43]">{user?.name?.split(" ")[0] || "Student"} 👋</span>
                </h1>
                <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                  Track your unlocked career roadmaps, bookmarked paths, and guided progression.
                </p>
              </div>

              {/* Purchased Roadmaps Section */}
              {activeTab === "purchased" && (
                <div id="purchased-section" className="mb-10">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 w-fit">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          Lifetime Access
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                        Purchased Roadmaps
                        {purchasedCareers.length > 0 && (
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono font-bold">
                            {purchasedCareers.length} Unlocked
                          </span>
                        )}
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Your unlocked career roadmaps with stage breakdowns, college benchmarks, and mentor guides.
                      </p>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 rounded-xl text-xs h-9"
                    >
                      <Link href="/pricing">
                        <Zap className="w-3.5 h-3.5 mr-1.5 text-amber-400" /> Unlock More Careers
                      </Link>
                    </Button>
                  </div>

                  {purchasedCareers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {purchasedCareers.map((career) => {
                        const imageUrl = getCardImage(career);
                        const displaySalary = getDisplaySalary(career);
                        const conciseDesc = getConciseDesc(career);

                        return (
                          <div
                            key={career.id}
                            className="group relative flex flex-col justify-between bg-[#131316] border border-emerald-500/30 hover:border-emerald-400/50 rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-emerald-500/5"
                          >
                            {/* Thematic Background Image Faded on Right */}
                            <div className="absolute right-0 top-0 bottom-0 w-[48%] pointer-events-none overflow-hidden rounded-r-2xl select-none">
                              <img
                                src={imageUrl}
                                alt=""
                                loading="lazy"
                                className="w-full h-full object-cover object-center opacity-35 group-hover:opacity-55 group-hover:scale-105 transition-all duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-[#131316] via-[#131316]/55 to-transparent" />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#131316]/80 via-transparent to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col h-full">
                              <div className="flex justify-between items-start mb-3.5">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                                  <CareerIcon icon={career.icon} size={20} />
                                </div>
                                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Unlocked
                                </span>
                              </div>

                              <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
                                {career.title}
                              </h3>
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed min-h-[32px]">
                                {conciseDesc}
                              </p>

                              {/* Bottom Row: Salary & Action CTA (No demand metric) */}
                              <div className="flex items-end justify-between pt-3 border-t border-white/10 text-xs mt-auto">
                                <div>
                                  <div className="flex items-center gap-0.5 text-xs sm:text-sm font-bold text-white">
                                    <span className="text-amber-400 font-bold text-sm">₹</span>
                                    <span>{displaySalary}</span>
                                  </div>
                                  <span className="text-[10px] text-muted-foreground/75 block leading-tight">Avg. Salary</span>
                                </div>
                                <Button
                                  asChild
                                  size="sm"
                                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs h-8 px-3.5 shadow-md shadow-emerald-600/20"
                                >
                                  <Link href={`/roadmaps/${career.id}`}>
                                    Open Roadmap <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-[#131316] border border-dashed border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
                          <Zap className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1">
                            No Purchased Roadmaps Yet
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
                            Unlock lifetime access to any career path for just ₹199. Get uncompromised honest insights, stage milestones, tier-1 vs budget colleges, and curated mentors.
                          </p>
                        </div>
                      </div>

                      <Button
                        asChild
                        className="bg-[#F5F0E6] text-black font-bold rounded-xl text-xs sm:text-sm px-5 py-2.5 h-auto flex-shrink-0 shadow-lg shadow-black/40 hover:bg-white"
                      >
                        <Link href="/pricing">
                          Explore Pricing & Unlock — ₹199 <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Saved Roadmaps Section */}
              {activeTab === "saved" && (
                <div id="saved-section" className="mb-8">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-white">Saved Roadmaps</h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {latestAssessment
                          ? "Your career assessment recommendation and bookmarked paths"
                          : `${savedCareers.length} career ${savedCareers.length === 1 ? "path" : "paths"} bookmarked`}
                      </p>
                    </div>
                    <Link
                      href="/roadmaps"
                      className="text-xs sm:text-sm text-amber-400 hover:text-amber-300 font-semibold"
                    >
                      Browse all roadmaps →
                    </Link>
                  </div>

                  {/* Quiz Result Highlight inside Saved Roadmaps */}
                  {latestAssessment && topQuizRecommendation && !userPurchasedIds.includes(topQuizCareerId) && (
                    <div className="mb-6 rounded-2xl border border-amber-500/30 bg-[#131316] p-5 sm:p-6 relative overflow-hidden shadow-xl shadow-black/60">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/15 border border-amber-400/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 w-fit">
                              <Trophy className="w-3 h-3 text-amber-400" /> Career Quiz Recommendation
                            </span>
                            <span className="text-xs font-mono font-bold text-amber-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                              {topQuizRecommendation.matchPercentage || topQuizRecommendation.score || 92}% Match
                            </span>
                          </div>

                          <div className="flex items-center gap-2.5">
                            <h3 className="text-xl sm:text-2xl font-bold text-white">
                              {topQuizRecommendation.title}
                            </h3>
                            {topQuizRecommendation.category && (
                              <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-white/5 border border-white/10 hidden sm:inline">
                                {topQuizRecommendation.category}
                              </span>
                            )}
                          </div>

                          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 max-w-2xl leading-relaxed">
                            {topQuizRecommendation.description ||
                              latestAssessment.aiAnalysis?.summary ||
                              "Top recommended career path based on your career assessment."}
                          </p>
                        </div>

                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 flex-shrink-0 pt-2 lg:pt-0">
                          <Button
                            asChild
                            className="bg-[#F5F0E6] text-black font-bold rounded-xl text-xs sm:text-sm shadow-md hover:bg-white"
                          >
                            <Link href={topQuizRoadmapUrl}>
                              View Roadmap <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                            </Link>
                          </Button>

                          <Button
                            asChild
                            variant="outline"
                            className="border-white/15 hover:bg-white/5 bg-[#131316] text-white rounded-xl text-xs sm:text-sm"
                          >
                            <Link href="/career-quiz">Retake Quiz</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Saved Roadmaps Grid / Empty state */}
                  {savedCareers.length === 0 ? (
                    !latestAssessment ? (
                      <div className="bg-[#131316] border border-dashed border-white/10 rounded-2xl p-8 sm:p-12 text-center">
                        <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-4">
                          <Bookmark className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">No Saved Roadmaps Yet</h3>
                        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                          You haven&apos;t bookmarked any career roadmaps yet. Explore our structured roadmaps and click &ldquo;Save Roadmap&rdquo; to track them here.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                          <Button asChild className="bg-[#F5F0E6] text-black hover:bg-white font-semibold rounded-xl px-6">
                            <Link href="/roadmaps">
                              Explore Career Roadmaps <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="border-white/15 text-white hover:bg-white/5 rounded-xl px-5">
                            <Link href="/career-quiz">
                              Take Career Quiz <Compass className="w-3.5 h-3.5 ml-1.5" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-[#131316] border border-dashed border-white/10 rounded-2xl p-6 text-center">
                        <p className="text-xs text-muted-foreground mb-3">
                          Want to track other careers alongside your quiz recommendation? You can bookmark any roadmap while exploring.
                        </p>
                        <Button asChild variant="outline" className="border-white/15 text-white hover:bg-white/5 rounded-xl text-xs">
                          <Link href="/roadmaps">
                            Explore All 48 Roadmaps <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                          </Link>
                        </Button>
                      </div>
                    )
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {savedCareers.map((career) => {
                        const imageUrl = getCardImage(career);
                        const displaySalary = getDisplaySalary(career);
                        const conciseDesc = getConciseDesc(career);

                        return (
                          <div
                            key={career.id}
                            className="group relative flex flex-col justify-between bg-[#131316] border border-white/10 hover:border-white/25 rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-sm"
                          >
                            {/* Thematic Background Image Faded on Right */}
                            <div className="absolute right-0 top-0 bottom-0 w-[48%] pointer-events-none overflow-hidden rounded-r-2xl select-none">
                              <img
                                src={imageUrl}
                                alt=""
                                loading="lazy"
                                className="w-full h-full object-cover object-center opacity-35 group-hover:opacity-55 group-hover:scale-105 transition-all duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-[#131316] via-[#131316]/55 to-transparent" />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#131316]/80 via-transparent to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col h-full">
                              <div className="flex justify-between items-start mb-3.5">
                                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/90 group-hover:border-white/20 transition-colors shadow-sm">
                                  <CareerIcon icon={career.icon} size={20} />
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => handleRemoveBookmark(e, career.id, career.title)}
                                  title="Remove from saved"
                                  className="p-1.5 -mr-1 -mt-1 rounded-lg hover:bg-white/10 text-amber-400 transition-colors"
                                >
                                  <Bookmark className="w-5 h-5 fill-amber-400" />
                                </button>
                              </div>

                              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-200 transition-colors">
                                {career.title}
                              </h3>
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed min-h-[32px]">
                                {conciseDesc}
                              </p>

                              {/* Bottom Row: Salary & View Roadmap Link (No demand metric) */}
                              <div className="flex items-end justify-between pt-3 border-t border-white/10 text-xs mt-auto">
                                <div>
                                  <div className="flex items-center gap-0.5 text-xs sm:text-sm font-bold text-white">
                                    <span className="text-amber-400 font-bold text-sm">₹</span>
                                    <span>{displaySalary}</span>
                                  </div>
                                  <span className="text-[10px] text-muted-foreground/75 block leading-tight">Avg. Salary</span>
                                </div>

                                <Link
                                  href={`/roadmaps/${career.id}`}
                                  className="flex items-center gap-1 text-xs font-semibold text-amber-300/90 group-hover:text-amber-200 transition-colors"
                                >
                                  <span>View Roadmap</span>
                                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* Explore more card */}
                      <Link href="/roadmaps">
                        <div className="h-full bg-[#131316] border-2 border-dashed border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center text-muted-foreground hover:text-white hover:border-white/20 transition-colors cursor-pointer min-h-[140px]">
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-2">
                            <ArrowRight className="w-5 h-5" />
                          </div>
                          <span className="text-xs sm:text-sm font-medium">Explore more careers</span>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                <div className="bg-[#131316] p-6 rounded-2xl border-l-2 border-l-amber-400 border border-white/10 shadow-sm">
                  <h3 className="font-bold text-white mb-1.5 text-base">Need College Guidance?</h3>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                    Explore top tier and budget-friendly colleges for your chosen roadmap.
                  </p>
                  <Button
                    variant="link"
                    asChild
                    className="text-amber-400 p-0 h-auto font-semibold hover:no-underline hover:text-amber-300 text-xs"
                  >
                    <Link href="/roadmaps">
                      View College Benchmarks <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </Button>
                </div>
                <div className="bg-[#131316] p-6 rounded-2xl border border-white/10 shadow-sm">
                  <h3 className="font-bold text-white mb-1.5 text-base">Resume & Portfolio Builder</h3>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                    Build a professional industry-ready resume tailored to your target roadmaps.
                  </p>
                  <div className="inline-block px-3 py-1 bg-white/5 text-[11px] text-muted-foreground rounded-full border border-white/10 font-medium">
                    Coming Soon
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
}
