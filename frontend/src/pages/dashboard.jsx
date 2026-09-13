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
        console.warn("[Dashboard Quiz Fetch]:", err);
      } finally {
        setLoadingAssessment(false);
      }
    };

    fetchLatestAssessment();
  }, [token]);

  // Load only roadmaps explicitly saved by the user
  const userSavedIds = Array.isArray(user?.savedRoadmaps) ? user.savedRoadmaps : [];
  const savedCareers = courses.filter((c) => userSavedIds.includes(c.id));

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
                  { icon: Bookmark, label: "Saved Roadmaps", active: true },
                  { icon: Target, label: "Quiz Results", active: false },
                  { icon: Award, label: "Certificates", active: false },
                  { icon: User, label: "Profile", active: false },
                  { icon: Settings, label: "Settings", active: false },
                ].map((item, i) => (
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
                ))}
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

            {/* Career Assessment Dynamic Widget */}
            {loadingAssessment ? (
              <div className="bg-card/50 border border-white/5 rounded-2xl p-6 mb-8 animate-pulse flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-36 bg-white/10 rounded" />
                  <div className="h-6 w-56 bg-white/15 rounded" />
                </div>
                <div className="h-9 w-28 bg-white/10 rounded-xl" />
              </div>
            ) : latestAssessment ? (
              <div className="bg-gradient-to-r from-card via-card to-primary/[0.04] border border-primary/20 rounded-2xl p-6 mb-8 relative overflow-hidden group shadow-lg shadow-primary/5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:bg-primary/10 transition-colors" />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 flex items-center gap-1">
                        <Trophy className="w-3 h-3 text-amber-400" /> Top Career Match
                      </span>
                      {latestAssessment.createdAt && (
                        <span className="text-[11px] text-muted-foreground">
                          • Evaluated {new Date(latestAssessment.createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <h2 className="text-xl sm:text-2xl font-bold text-white">
                        {latestAssessment.topRecommendations?.[0]?.title ||
                          latestAssessment.aiAnalysis?.topCareer?.title ||
                          "Recommended Career"}
                      </h2>
                      <span className="text-xs font-mono font-bold text-primary bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                        {latestAssessment.topRecommendations?.[0]?.matchPercentage || 92}% Match
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 max-w-xl">
                      {latestAssessment.aiAnalysis?.summary ||
                        latestAssessment.topRecommendations?.[0]?.description ||
                        "Your profile aligns strongly with analytical reasoning and high-impact problem solving."}
                    </p>

                    {/* Top traits chips */}
                    {latestAssessment.traitScores && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-[11px] text-muted-foreground mr-1">
                          Core Traits:
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

                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 flex-shrink-0">
                    <Button
                      asChild
                      className="bg-primary text-primary-foreground font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-primary/20"
                    >
                      <Link
                        href={
                          latestAssessment.topRecommendations?.[0]?.roadmapUrl ||
                          `/roadmaps/${latestAssessment.topRecommendations?.[0]?.careerId || "software-engineer"}`
                        }
                      >
                        View Roadmap <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="border-white/15 hover:bg-white/5 bg-background text-white rounded-xl text-xs sm:text-sm"
                    >
                      <Link href="/career-quiz">Retake Assessment</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-card to-card border border-white/10 rounded-2xl p-6 mb-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold">
                      <Sparkles className="w-3.5 h-3.5" /> Career Assessment
                    </div>
                    <h2 className="text-lg font-bold text-white">
                      Find Your Best-Fit Career Path
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-lg">
                      Take our 10-question assessment to discover tailored roadmaps matched to your unique traits, strengths, and ambitions.
                    </p>
                  </div>
                  <Button
                    asChild
                    className="bg-primary text-primary-foreground font-bold rounded-xl flex-shrink-0"
                  >
                    <Link href="/career-quiz">
                      Take Assessment <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}

            {/* Saved Roadmaps */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Saved Roadmaps</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {savedCareers.length} career {savedCareers.length === 1 ? "path" : "paths"} bookmarked
                  </p>
                </div>
                <Link
                  href="/roadmaps"
                  className="text-sm text-primary hover:underline font-medium"
                >
                  Browse all roadmaps →
                </Link>
              </div>

              {savedCareers.length === 0 ? (
                <div className="bg-card border border-dashed border-white/10 rounded-2xl p-8 sm:p-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto mb-4">
                    <Bookmark className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">No Saved Roadmaps Yet</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                    You haven&apos;t bookmarked any career roadmaps yet. Explore our structured roadmaps and click &ldquo;Save Roadmap&rdquo; to track them here.
                  </p>
                  <Button asChild className="bg-primary text-primary-foreground font-semibold rounded-xl px-6">
                    <Link href="/roadmaps">
                      Explore Career Roadmaps <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
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
