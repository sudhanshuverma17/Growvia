import { Link, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { useCourses } from "@/context/course-context";
import { useAuth } from "@/context/auth-context";
import { CareerIcon } from "@/components/career-icon";
import { Bookmark, Target, Award, User, Settings, LogOut, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { courses } = useCourses();
  const { user, logout, isAdmin } = useAuth();
  const [, setLocation] = useLocation();

  // Load user saved roadmaps or fallback to first 2 courses as preview
  const userSavedIds = Array.isArray(user?.savedRoadmaps) && user.savedRoadmaps.length > 0
    ? user.savedRoadmaps
    : [];

  const savedCareers = userSavedIds.length > 0
    ? courses.filter((c) => userSavedIds.includes(c.id))
    : courses.slice(0, 2);

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

            {/* Quiz Result Widget */}
            <div className="bg-gradient-to-r from-card to-card border border-white/5 rounded-2xl p-6 mb-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:bg-primary/10 transition-colors" />
              <h2 className="text-lg font-bold mb-2 relative z-10 text-white">
                Career Assessment Insights
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">
                    Your personality score strongly aligns with:
                  </p>
                  <p className="text-xl font-bold text-primary">
                    Technology & Digital Innovation
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/20 hover:bg-white/5 bg-background rounded-xl"
                >
                  <Link href="/quiz">Retake Assessment</Link>
                </Button>
              </div>
            </div>

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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {savedCareers.map((career) => (
                  <Link key={career.id} href={`/roadmaps/${career.id}`}>
                    <div className="group block bg-card border border-white/5 rounded-2xl p-5 hover:bg-white/[0.02] hover:border-primary/30 transition-all cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white group-hover:text-primary transition-colors">
                          <CareerIcon icon={career.icon} size={20} />
                        </div>
                        <Bookmark className="w-5 h-5 text-primary fill-primary" />
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
