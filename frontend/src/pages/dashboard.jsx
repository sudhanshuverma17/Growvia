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
  Sparkles,
  Trophy,
  Compass,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { courses } = useCourses();
  const { user, token, logout, isAdmin, toggleSaveRoadmap } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const [latestAssessment, setLatestAssessment] = useState(null);
  const [loadingAssessment, setLoadingAssessment] = useState(true);

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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="glass-card p-6 rounded-2xl sticky top-24 border border-white/10">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
                <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-lg">
                  {user?.name?.charAt(0).toUpperCase() || "S"}
                </div>
                <div>
                  <h3 className="font-bold text-white leading-tight">
                    {user?.name || "Student User"}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium border border-primary/20 flex items-center gap-1">
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
                {[
                  {
                    icon: ShieldCheck,
                    label: `Purchased (${purchasedCareers.length})`,
                    href: "#purchased-section",
                    highlight: purchasedCareers.length > 0,
                  },
                  { icon: Bookmark, label: "Saved Roadmaps", active: true },
                  { icon: Target, label: "Quiz Results", href: "/career-quiz" },
                  { icon: Award, label: "Certificates", active: false },
                  { icon: User, label: "Profile", active: false },
                  { icon: Settings, label: "Settings", active: false },
                ].map((item, i) =>
                  item.href ? (
                    <Link
                      key={i}
                      href={item.href}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors text-muted-foreground hover:bg-white/5 hover:text-white"
                    >
                      <item.icon className="w-4 h-4 text-primary" />
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      key={i}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
                        item.active
                          ? "bg-white/10 text-white font-medium shadow-sm"
                          : "text-muted-foreground hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <item.icon className="w-4 h-4 text-primary" />
                      {item.label}
                    </button>
                  )
                )}
              </nav>

              {isAdmin && (
                <div className="mt-6 pt-4 border-t border-white/10">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-primary/30 text-primary hover:bg-primary/10 rounded-xl text-xs h-9"
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
          <main className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Welcome, {user?.name?.split(" ")[0] || "Student"} 👋
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Here is your career progression and saved roadmaps.
                </p>
              </div>
            </div>

            {/* Purchased Roadmaps Section */}
            <div id="purchased-section" className="mb-10">
              <div className="flex justify-between items-end mb-6">
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
                    Your unlocked career roadmaps with full step-by-step clarity, college benchmarks, and mentor guides.
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary/30 text-primary hover:bg-primary/10 rounded-xl text-xs h-9"
                >
                  <Link href="/pricing">
                    <Zap className="w-3.5 h-3.5 mr-1.5 text-primary" /> Unlock More Careers
                  </Link>
                </Button>
              </div>

              {purchasedCareers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {purchasedCareers.map((career) => (
                    <div
                      key={career.id}
                      className="group relative bg-gradient-to-br from-card via-card to-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6 shadow-lg shadow-emerald-500/5 hover:border-emerald-400/50 transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                          <CareerIcon icon={career.icon} size={22} />
                        </div>
                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Unlocked
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
                        {career.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                        {career.description || "Comprehensive career curriculum with stages, colleges, and salary expectations."}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs">
                        <span className="text-muted-foreground font-medium">
                          {career.category} • {career.timeline?.length || 0} Stages
                        </span>
                        <Button
                          asChild
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs shadow-md shadow-emerald-600/20"
                        >
                          <Link href={`/roadmaps/${career.id}`}>
                            Open Roadmap <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-card/60 border border-dashed border-white/15 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        No Purchased Roadmaps Yet
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
                        Unlock lifetime access to any career path for just ₹99. Get uncompromised honest insights, semester breakdown, tier-1 vs budget colleges, and curated mentors.
                      </p>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="bg-primary text-primary-foreground font-bold rounded-xl text-xs sm:text-sm px-5 py-2.5 h-auto flex-shrink-0 shadow-lg shadow-primary/20"
                  >
                    <Link href="/pricing">
                      Explore Pricing & Unlock — ₹99 <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Saved Roadmaps */}
            <div className="mb-8">
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
                  className="text-sm text-primary hover:underline font-medium"
                >
                  Browse all roadmaps →
                </Link>
              </div>

              {/* Quiz Result Highlight inside Saved Roadmaps (only if not already purchased) */}
              {latestAssessment && topQuizRecommendation && !userPurchasedIds.includes(topQuizCareerId) && (
                <div className="mb-6 rounded-2xl border border-primary/30 bg-gradient-to-r from-card via-card to-primary/[0.05] p-5 sm:p-6 relative overflow-hidden shadow-lg shadow-primary/5">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/15 border border-amber-400/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 w-fit">
                          <Trophy className="w-3 h-3 text-amber-400" /> Career Quiz Recommendation
                        </span>
                        <span className="text-xs font-mono font-bold text-primary bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
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
                          "Top recommended career path based on your 10-question career assessment."}
                      </p>

                      {latestAssessment.traitScores && (
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="text-[11px] text-muted-foreground mr-1">
                            Key Traits:
                          </span>
                          {Object.entries(latestAssessment.traitScores)
                            .sort((a, b) => b[1] - a[1])
                            .slice(0, 3)
                            .map(([trait, score]) => (
                              <span
                                key={trait}
                                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-white/90 capitalize"
                              >
                                {trait}: <span className="text-primary font-mono">{score}%</span>
                              </span>
                            ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 flex-shrink-0 pt-2 lg:pt-0">
                      <Button
                        asChild
                        className="bg-primary text-primary-foreground font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-primary/20"
                      >
                        <Link href={topQuizRoadmapUrl}>
                          View Roadmap <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                        </Link>
                      </Button>

                      <Button
                        asChild
                        variant="outline"
                        className="border-white/15 hover:bg-white/5 bg-background text-white rounded-xl text-xs sm:text-sm"
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
                  <div className="bg-card border border-dashed border-white/10 rounded-2xl p-8 sm:p-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto mb-4">
                      <Bookmark className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">No Saved Roadmaps Yet</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                      You haven&apos;t bookmarked any career roadmaps yet. Explore our structured roadmaps and click &ldquo;Save Roadmap&rdquo; to track them here.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <Button asChild className="bg-primary text-primary-foreground font-semibold rounded-xl px-6">
                        <Link href="/roadmaps">
                          Explore Career Roadmaps <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="border-white/15 text-white hover:bg-white/5 rounded-xl px-5">
                        <Link href="/career-quiz">
                          Take Career Quiz <Sparkles className="w-3.5 h-3.5 ml-1.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border border-dashed border-white/10 rounded-2xl p-6 text-center">
                    <p className="text-xs text-muted-foreground mb-3">
                      Want to track other careers alongside your quiz recommendation? You can bookmark any roadmap while exploring.
                    </p>
                    <Button asChild variant="outline" className="border-white/15 text-white hover:bg-white/5 rounded-xl text-xs">
                      <Link href="/roadmaps">
                        Explore All 18 Roadmaps <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </Link>
                    </Button>
                  </div>
                )
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {savedCareers.map((career) => (
                    <Link key={career.id} href={`/roadmaps/${career.id}`}>
                      <div className="group block bg-card border border-white/5 rounded-2xl p-5 hover:bg-white/[0.02] hover:border-primary/30 transition-all cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white group-hover:text-primary transition-colors">
                            <CareerIcon icon={career.icon} size={20} />
                          </div>
                          <button
                            type="button"
                            onClick={(e) => handleRemoveBookmark(e, career.id, career.title)}
                            title="Remove from saved"
                            className="p-1.5 -mr-1.5 -mt-1.5 rounded-lg hover:bg-white/10 text-primary transition-colors"
                          >
                            <Bookmark className="w-5 h-5 fill-primary" />
                          </button>
                        </div>
                        <h3 className="font-bold text-white mb-1 group-hover:text-primary transition-colors">
                          {career.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {career.category} • {career.timeline?.length || 0} Stages
                        </p>
                      </div>
                    </Link>
                  ))}

                  {/* Explore more card */}
                  <Link href="/roadmaps">
                    <div className="h-full border-2 border-dashed border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center text-muted-foreground hover:text-white hover:border-white/30 transition-colors cursor-pointer min-h-[140px]">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-2">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium">Explore more careers</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-2xl border-l-2 border-l-primary border border-white/5">
                <h3 className="font-bold text-white mb-2">Need College Guidance?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Explore top tier and budget-friendly colleges for your chosen path.
                </p>
                <Button
                  variant="link"
                  asChild
                  className="text-primary p-0 h-auto font-semibold hover:no-underline hover:text-primary/80"
                >
                  <Link href="/roadmaps">
                    View College Benchmarks <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
              <div className="glass-card p-6 rounded-2xl border border-white/5">
                <h3 className="font-bold text-white mb-2">Resume & Portfolio Builder</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Build a professional industry-ready resume tailored to your target roadmaps.
                </p>
                <div className="inline-block px-3 py-1 bg-white/5 text-xs text-muted-foreground rounded-full border border-white/10">
                  Coming Soon
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}
