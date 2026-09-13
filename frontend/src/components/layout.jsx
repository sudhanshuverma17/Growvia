import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShieldCheck, User, LogOut, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

export function Layout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  const navLinks = isAuthenticated
    ? [
        { name: "Roadmaps", href: "/roadmaps" },
        { name: "Videos", href: "/videos" },
        { name: "Career Quiz", href: "/career-quiz" },
        { name: "Pricing", href: "/pricing" },
        { name: "About", href: "/about" },
      ]
    : [
        { name: "Roadmaps", href: "/roadmaps" },
        { name: "Career Quiz", href: "/career-quiz" },
        { name: "About", href: "/about" },
      ];

  const currentFullPath = typeof window !== "undefined" ? window.location.pathname + window.location.search : location;
  const loginHref = currentFullPath && currentFullPath !== "/" && !currentFullPath.startsWith("/login")
    ? `/login?redirect=${encodeURIComponent(currentFullPath)}`
    : "/login";

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/30">
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-white/10 py-3 shadow-lg shadow-black/20"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-display font-bold text-xl group-hover:scale-105 transition-transform">
              G
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-primary transition-colors">
              Growvia
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isAdmin && (
              <Link
                href="/admin"
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all font-semibold ${
                  location.startsWith("/admin")
                    ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                    : "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Studio
              </Link>
            )}

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-xs font-medium ${
                    location === "/dashboard"
                      ? "border-white/30 bg-white/10 text-white"
                      : "border-white/10 bg-white/5 text-white/90 hover:bg-white/10"
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-[10px]">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="max-w-[100px] truncate">{user?.name?.split(" ")[0]}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/10 text-muted-foreground uppercase font-semibold">
                    {user?.role}
                  </span>
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setLocation("/");
                  }}
                  title="Log out"
                  className="p-1.5 rounded-full text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href={loginHref}
                  className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                >
                  Log in
                </Link>
                <Button
                  asChild
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full px-5 text-sm"
                >
                  <Link href={loginHref}>Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-muted-foreground hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col justify-between pb-10"
          >
            <nav className="flex flex-col gap-5 text-lg font-display font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`border-b border-white/5 pb-3 ${
                    location === link.href ? "text-primary" : "text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {isAdmin && (
                <Link
                  href="/admin"
                  className={`border-b border-white/5 pb-3 flex items-center gap-2 ${
                    location.startsWith("/admin") ? "text-primary" : "text-white/90"
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 text-primary" /> Admin Studio
                </Link>
              )}

              {isAuthenticated && (
                <Link
                  href="/dashboard"
                  className={`border-b border-white/5 pb-3 flex items-center gap-2 ${
                    location === "/dashboard" ? "text-primary" : "text-white/90"
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5 text-primary" /> Student Dashboard
                </Link>
              )}
            </nav>

            <div className="flex flex-col gap-3 mt-6">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{user?.name}</div>
                      <div className="text-xs text-muted-foreground">{user?.email} • <span className="uppercase text-primary">{user?.role}</span></div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      logout();
                      setLocation("/");
                    }}
                    className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Log out
                  </Button>
                </div>
              ) : (
                <>
                  <Button asChild variant="outline" className="w-full border-white/20">
                    <Link href={loginHref}>Log in</Link>
                  </Button>
                  <Button asChild className="w-full bg-primary text-primary-foreground">
                    <Link href={loginHref}>Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-20">{children}</main>

      <footer className="border-t border-white/10 bg-black py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center gap-2 group mb-4">
                <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-sm">
                  G
                </div>
                <span className="font-display font-bold text-lg text-white">
                  Growvia
                </span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-xs">
                Helping Indian students find the right career path with absolute
                clarity, honest insights, and structured roadmaps.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/roadmaps" className="hover:text-primary">
                    Roadmaps
                  </Link>
                </li>
                {isAuthenticated && (
                  <>
                    <li>
                      <Link href="/videos" className="hover:text-primary">
                        Mentor Videos
                      </Link>
                    </li>
                    <li>
                      <Link href="/quiz" className="hover:text-primary">
                        Career Quiz
                      </Link>
                    </li>
                    <li>
                      <Link href="/pricing" className="hover:text-primary">
                        Pricing
                      </Link>
                    </li>
                  </>
                )}
                {isAdmin && (
                  <li>
                    <Link
                      href="/admin"
                      className="hover:text-primary text-primary/80 font-medium flex items-center gap-1.5"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" /> Admin Console
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Growvia. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Designed for ambitious students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
