import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShieldCheck, User, LogOut, LayoutDashboard, BookOpen, Users, Linkedin, Github, Instagram, Youtube } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { GrowviaLogo } from "@/components/GrowviaLogo";

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

  const navLinks = [
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
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-3.5 shadow-lg shadow-black/40"
            : "bg-transparent border-b border-transparent py-5 md:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex justify-between items-center">
          <GrowviaLogo markClassName="w-6 h-6 text-white" textClassName="text-xl font-light tracking-[0.04em] text-white" />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            <nav className="flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm tracking-normal transition-colors ${
                    location === link.href
                      ? "text-white font-medium"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {isAdmin && (
              <Link
                href="/admin"
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all font-semibold ${
                  location.startsWith("/admin")
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin
              </Link>
            )}

            {/* Vertical Divider */}
            <div className="h-4 w-px bg-white/25 select-none mx-1" aria-hidden="true" />

            {/* Auth Actions */}
            <div className="flex items-center gap-6">
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#F5F0E6] text-[#121212] text-sm font-medium tracking-tight hover:bg-white transition-all shadow-sm duration-200"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href={loginHref}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    href={loginHref}
                    className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#F5F0E6] text-[#121212] text-sm font-medium tracking-tight hover:bg-white transition-all shadow-sm duration-200"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white/80 hover:text-white"
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
                  <Button asChild className="w-full bg-[#F5F0E6] text-[#121212] hover:bg-white rounded-full font-medium">
                    <Link href="/dashboard">Go to Dashboard</Link>
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

      <main className={`flex-1 ${location === "/" ? "pt-0" : "pt-20"}`}>{children}</main>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className={`relative border-t border-[#C88A58]/25 bg-[#0e1017]/85 backdrop-blur-xl pt-16 pb-12 overflow-hidden select-none ${location === "/" ? "mt-0" : "mt-20"}`}>
        {/* Glowing Top Divider Flare */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E5A869]/50 to-transparent pointer-events-none" />

        {/* Clear Ambient Cosmic Background with enhanced luminosity */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-45 select-none"
          style={{
            backgroundImage: "url('/images/problem-bg.png')",
            backgroundPosition: "center 75%",
          }}
        />
        {/* Subtle luminous ambient warmth so it's lighter and clearer than the upper section */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e1017]/40 via-[#10131e]/50 to-[#0e1017]/70 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[550px] h-[380px] bg-[radial-gradient(ellipse_at_top_right,rgba(229,168,105,0.18),transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-[radial-gradient(ellipse_at_bottom_left,rgba(229,168,105,0.12),transparent_70%)] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Column 1: Brand & Socials */}
            <div className="lg:col-span-5 flex flex-col justify-between pr-0 lg:pr-8 border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0">
              <div>
                <div className="mb-4">
                  <GrowviaLogo
                    markClassName="w-8 h-8 text-white"
                    textClassName="text-2xl font-bold tracking-tight text-white"
                  />
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mb-6">
                  Helping Indian students find the right career path with absolute
                  clarity, honest insights, and structured roadmaps.
                </p>
              </div>

              {/* Social Icons (LinkedIn, GitHub, Instagram, YouTube) */}
              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full bg-[#121318]/90 border border-white/15 hover:border-[#C88A58]/60 hover:bg-[#1c1d24] text-white/80 hover:text-white flex items-center justify-center transition-all shadow-md group"
                >
                  <Linkedin className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 rounded-full bg-[#121318]/90 border border-white/15 hover:border-[#C88A58]/60 hover:bg-[#1c1d24] text-white/80 hover:text-white flex items-center justify-center transition-all shadow-md group"
                >
                  <Github className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-[#121318]/90 border border-white/15 hover:border-[#C88A58]/60 hover:bg-[#1c1d24] text-white/80 hover:text-white flex items-center justify-center transition-all shadow-md group"
                >
                  <Instagram className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-10 h-10 rounded-full bg-[#121318]/90 border border-white/15 hover:border-[#C88A58]/60 hover:bg-[#1c1d24] text-white/80 hover:text-white flex items-center justify-center transition-all shadow-md group"
                >
                  <Youtube className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Column 2 & 3: Platform & Company (Clean, no boxes, transparent) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 pl-0 lg:pl-6">
              {/* Platform Section */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-[#E5A869]">
                    <BookOpen className="w-5 h-5 text-[#E5A869]" strokeWidth={1.8} />
                  </div>
                  <h4 className="text-base font-bold text-white tracking-tight">Platform</h4>
                </div>
                <ul className="space-y-3.5 text-sm text-zinc-400">
                  <li>
                    <Link href="/roadmaps" className="hover:text-white transition-colors block">
                      Roadmaps
                    </Link>
                  </li>
                  <li>
                    <Link href="/career-quiz" className="hover:text-white transition-colors block">
                      Career Quiz
                    </Link>
                  </li>
                  <li>
                    <Link href="/videos" className="hover:text-white transition-colors block">
                      Mentor Videos
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="hover:text-white transition-colors block">
                      Pricing
                    </Link>
                  </li>
                  {isAdmin && (
                    <li className="pt-1">
                      <Link
                        href="/admin"
                        className="hover:text-[#E5A869] text-[#E5A869]/80 font-medium flex items-center gap-1.5 text-xs"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" /> Admin Console
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

              {/* Company Section */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-[#E5A869]">
                    <Users className="w-5 h-5 text-[#E5A869]" strokeWidth={1.8} />
                  </div>
                  <h4 className="text-base font-bold text-white tracking-tight">Company</h4>
                </div>
                <ul className="space-y-3.5 text-sm text-zinc-400">
                  <li>
                    <Link href="/about" className="hover:text-white transition-colors block">
                      About Us
                    </Link>
                  </li>
                  <li>
                    {location === "/" ? (
                      <a
                        href="#contact"
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById("contact");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="hover:text-white transition-colors block cursor-pointer"
                      >
                        Contact
                      </a>
                    ) : (
                      <Link href="/#contact" className="hover:text-white transition-colors block">
                        Contact
                      </Link>
                    )}
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-white transition-colors block">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-white transition-colors block">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Slogan with glowing line */}
          <div className="border-t border-white/[0.08] mt-12 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <p>© {new Date().getFullYear()} Growvia. All rights reserved.</p>
            <div className="flex items-center gap-3">
              <span className="w-10 h-[2px] bg-gradient-to-r from-transparent to-[#E5A869] shadow-[0_0_8px_#E5A869]" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] text-zinc-400/90 select-none">
                Find Your Path. Kill It in Life.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
