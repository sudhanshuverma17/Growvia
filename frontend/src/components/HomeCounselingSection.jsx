import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Calendar,
  Sparkles,
  ShieldCheck,
  Video,
  Clock,
  CheckCircle2,
  Target,
  Compass,
  FileText,
  Lock,
  ArrowRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import {
  ensureDayScheduleScript,
  openDayScheduleBooking,
  setupDayScheduleBookingListener,
} from "@/lib/dayschedule-listener";

/**
 * HomeCounselingSection
 *
 * Dedicated 1:1 Mentorship & Career Counseling section displayed on the homepage
 * directly above the Contact Us section.
 *
 * Entitlement Rule:
 * The "Get Counseling" action is accessible ONLY to users who have already purchased
 * at least one roadmap (or administrators). For guests and non-purchasers, the button
 * displays a locked badge and opens an educational upgrade modal explaining how to unlock it.
 */
export function HomeCounselingSection({ id = "counseling-section" } = {}) {
  const { user, token, isAuthenticated, isAdmin } = useAuth();
  const [lockModalOpen, setLockModalOpen] = useState(false);

  // Check if current user has purchased any roadmap
  const purchasedRoadmaps = Array.isArray(user?.purchasedRoadmaps)
    ? user.purchasedRoadmaps
    : [];
  const hasPurchased =
    isAuthenticated && (isAdmin || purchasedRoadmaps.length > 0);
  const purchasedCount = purchasedRoadmaps.length;

  useEffect(() => {
    // Pre-load DaySchedule script
    ensureDayScheduleScript();

    // Listen for confirmed bookings to sync with backend DB
    const cleanup = setupDayScheduleBookingListener({
      token,
      user,
      onBookingConfirmed: () => {
        // Automatically persisted to MongoDB backend
      },
    });

    return cleanup;
  }, [token, user]);

  const handleCounselingClick = () => {
    if (hasPurchased) {
      openDayScheduleBooking(user);
    } else {
      setLockModalOpen(true);
    }
  };

  return (
    <section
      id={id}
      className="scroll-mt-20 relative py-20 sm:py-28 bg-[#0a0a0c] text-foreground overflow-hidden selection:bg-amber-500/30 border-t border-white/[0.06]"
    >
      {/* Anchor alias so both #counseling and #counseling-section work seamlessly */}
      <div id="counseling" className="absolute -top-20 opacity-0 pointer-events-none" aria-hidden="true" />
      {/* ── ATMOSPHERIC BACKGROUND IMAGE & GRADIENTS ─────────── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45 sm:opacity-55 transition-opacity duration-700"
          style={{
            backgroundImage: "url('/images/counseling-bg.png')",
            backgroundPosition: "center center",
          }}
        />
        {/* Soft edge fade for seamless blending into neighboring sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c] via-black/40 to-[#0a0a0c]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c]/80 via-transparent to-[#0a0a0c]/80" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
        {/* ── TOP SECTION: MAIN BOOKING CARD ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-[#131316]/90 backdrop-blur-xl shadow-2xl p-6 sm:p-8 lg:p-10"
        >
          {/* Ambient Corner Radial Accents */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Left Content Area */}
            <div className="space-y-4 max-w-2xl">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#E5A855] bg-amber-500/10 border border-amber-500/25 px-3 py-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-[#E5A855]" />
                  Exclusive Premium Privilege
                </span>

                {hasPurchased ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Roadmap Purchaser Verified
                    {purchasedCount > 0 && ` (${purchasedCount} Active)`}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300/90 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
                    <Lock className="w-3 h-3 text-[#E5A855]" />
                    Unlocked on Roadmap Purchase
                  </span>
                )}
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                Schedule Your <span className="text-[#E5A855]">1:1 Mentorship</span> &amp; Career Counseling
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed">
                Connect directly with Mentor in a private strategy session. We review your personalized roadmap, break down transition hurdles, optimize your preparation plan, and address your biggest career questions.
              </p>

              {/* Value Feature Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0d0d0f] border border-white/5 text-xs">
                  <Video className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-slate-300">Live Google Meet Call</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0d0d0f] border border-white/5 text-xs">
                  <Clock className="w-4 h-4 text-[#E5A855] flex-shrink-0" />
                  <span className="text-slate-300">Flexible Time Slots</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0d0d0f] border border-white/5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span className="text-slate-300">Instant Calendar Sync</span>
                </div>
              </div>
            </div>

            {/* Right Action Panel */}
            <div className="flex flex-col items-center lg:items-end justify-center gap-3 bg-[#0d0d0f] p-6 rounded-2xl border border-white/10 lg:min-w-[280px] shadow-inner text-center lg:text-right">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#E5A855] shadow-lg shadow-amber-500/10 mb-1">
                <Calendar className="w-6 h-6 text-[#E5A855]" />
              </div>

              <div className="text-xs text-muted-foreground">
                Hosted via DaySchedule
              </div>

              {/* Button: Fully active for purchasers, locked state modal for non-purchasers */}
              {hasPurchased ? (
                <Button
                  id="home-get-counseling-btn"
                  size="lg"
                  onClick={handleCounselingClick}
                  className="w-full bg-[#E5A855] hover:bg-[#d99640] text-black font-extrabold text-sm sm:text-base h-12 px-6 rounded-xl shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-5 h-5 text-black" />
                  <span>Get Counseling</span>
                </Button>
              ) : (
                <Button
                  id="home-get-counseling-btn"
                  size="lg"
                  onClick={handleCounselingClick}
                  className="w-full bg-[#1b1915] hover:bg-[#25221b] border border-amber-500/40 text-amber-200 hover:text-white font-extrabold text-sm sm:text-base h-12 px-6 rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <Lock className="w-4 h-4 text-[#E5A855] group-hover:scale-110 transition-transform" />
                  <span>Get Counseling</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black bg-[#E5A855] px-1.5 py-0.5 rounded-md ml-1">
                    Locked
                  </span>
                </Button>
              )}

              <p className="text-[11px] text-muted-foreground/80 mt-1 max-w-[240px]">
                {hasPurchased
                  ? "Opens interactive DaySchedule booking popup. Meeting link generated automatically."
                  : "Available exclusively to roadmap purchasers. Unlock any roadmap to access."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── BOTTOM SECTION: WHAT WE COVER ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <Target className="w-6 h-6 text-[#E5A855]" />
                What We Cover in Your 1:1 Session
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Tailored guidance built around your specific roadmap and personal timeline.
              </p>
            </div>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-[#131316]/90 backdrop-blur-xl border border-white/10 hover:border-amber-500/30 transition-all shadow-lg space-y-3 group">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855] group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 text-[#E5A855]" />
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-[#E5A855] transition-colors">
                Roadmap Milestone Optimization
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tailor your study phases, prioritize high-leverage frameworks, and avoid time-wasting detours based on current market demands.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-[#131316]/90 backdrop-blur-xl border border-white/10 hover:border-emerald-500/30 transition-all shadow-lg space-y-3 group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5 text-emerald-400" />
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                Portfolio &amp; Resume Audit
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Live critique of your project repos, tech stack choices, and how to position your experience to pass recruiter screenings.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-[#131316]/90 backdrop-blur-xl border border-white/10 hover:border-sky-500/30 transition-all shadow-lg space-y-3 group">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-sky-400" />
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-sky-400 transition-colors">
                Job Search &amp; Interview Prep
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Actionable strategies for cold outreach, tech screening preparation, compensation expectations, and career transitions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── LOCKED STATE MODAL (FOR GUESTS & USERS WITHOUT PURCHASED ROADMAPS) ── */}
      {lockModalOpen && (
        <div
          onClick={() => setLockModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-[#131316] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 lg:p-9 animate-in zoom-in-95 duration-200 my-auto"
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setLockModalOpen(false)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-[#E5A855] text-[11px] font-bold uppercase tracking-wider mb-2.5">
                <Lock className="w-3.5 h-3.5 text-[#E5A855]" /> Premium Access Options
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
                Unlock Complete Career Guidance &amp; Mentorship
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-xl mx-auto leading-relaxed">
                Choose how you want to accelerate your career. Unlocking any complete roadmap for just ₹199 gives you full lifetime access and instantly activates your private 1-on-1 strategy call with Mentor.
              </p>
            </div>

            {/* Two Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              {/* Card 1: Unlock Any Roadmap (Current Component) */}
              <div className="relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-[#0d0d0f]/95 border border-white/10 hover:border-amber-500/30 transition-all shadow-xl group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-[#E5A855] group-hover:scale-105 transition-transform">
                      <Compass className="w-5 h-5 text-[#E5A855]" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#E5A855] bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
                      Lifetime Access · ₹199
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-1.5">
                    Complete Career Roadmap
                  </h4>
                  <p className="text-xs text-slate-300/90 leading-relaxed mb-4">
                    Self-paced mastery with exhaustive stage guides, actionable milestones, market salary insights, and 24/7 AI mentoring.
                  </p>

                  <div className="space-y-2.5 mb-6 pt-1 border-t border-white/5">
                    <div className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Full stage-by-stage learning roadmap &amp; exercises</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Unfiltered industry salary &amp; market reality checks</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Curated industry frameworks &amp; project repos</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>24/7 access to Vio AI personalized career advisor</span>
                    </div>
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full bg-[#E5A855] hover:bg-[#d99640] text-black font-bold text-xs sm:text-sm h-11 rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <Link
                    href={
                      isAuthenticated
                        ? "/roadmaps"
                        : `/login?redirect=${encodeURIComponent("/roadmaps")}`
                    }
                  >
                    <Lock className="w-4 h-4 text-black" />
                    <span>Unlock Any Roadmap for ₹199</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </Button>
              </div>

              {/* Card 2: 1:1 Career Counseling */}
              <div className="relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-[#0d0d0f]/95 border border-amber-500/35 hover:border-amber-500/50 transition-all shadow-xl shadow-amber-500/5 group overflow-hidden">
                {/* Subtle Amber Glow in Corner */}
                <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-amber-500/15 blur-2xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#E5A855] group-hover:scale-105 transition-transform">
                      <Video className="w-5 h-5 text-[#E5A855]" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      1:1 Strategy Session
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-1.5 flex items-center gap-1.5">
                    1:1 Career Strategy &amp; Counseling
                  </h4>
                  <p className="text-xs text-slate-300/90 leading-relaxed mb-4">
                    Private 1-on-1 video call on Google Meet with Mentor to audit your resume, customize your career path, and plan your career transition.
                  </p>

                  <div className="space-y-2.5 mb-6 pt-1 border-t border-white/5">
                    <div className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>45-minute private 1:1 video call on Google Meet</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Personalized career strategy &amp; timeline planning</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Live portfolio, GitHub &amp; resume audit</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Direct actionable job search &amp; interview guidance</span>
                    </div>
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-[#E5A855] to-[#f0b769] hover:from-[#d99640] hover:to-[#e5a855] text-black font-extrabold text-xs sm:text-sm h-11 rounded-xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <Link
                    href={
                      isAuthenticated
                        ? "/pricing?upgrade=counseling"
                        : `/login?redirect=${encodeURIComponent("/pricing?upgrade=counseling")}`
                    }
                  >
                    <Calendar className="w-4 h-4 text-black" />
                    <span>Get 1:1 Counseling</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Bottom Footer Notice & Cancel */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-xs text-slate-400 text-center sm:text-left">
                <Sparkles className="w-4 h-4 text-[#E5A855] flex-shrink-0" />
                <span>
                  Purchasing any single career roadmap for ₹199 automatically unlocks <strong className="text-white">both</strong> full roadmap access and your private 1:1 counseling session.
                </span>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={() => setLockModalOpen(false)}
                className="w-full sm:w-auto border-white/15 text-zinc-400 hover:text-white hover:bg-white/10 text-xs h-10 px-5 rounded-xl cursor-pointer"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default HomeCounselingSection;
