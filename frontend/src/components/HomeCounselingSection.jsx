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
export function HomeCounselingSection() {
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
      id="counseling-section"
      className="relative py-20 sm:py-28 bg-[#0a0a0c] text-foreground overflow-hidden selection:bg-amber-500/30 border-t border-white/[0.06]"
    >
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
                Connect directly with Uttkarsh in a private strategy session. We review your personalized roadmap, break down transition hurdles, optimize your preparation plan, and address your biggest career questions.
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#131316] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
            {/* Modal Close Button */}
            <button
              onClick={() => setLockModalOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header with Icon and Badge */}
            <div className="text-center mb-6">
              <div className="relative w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#E5A855] mx-auto mb-4 shadow-lg shadow-amber-500/10">
                <Calendar className="w-8 h-8 text-[#E5A855]" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#131316] border border-amber-500/40 flex items-center justify-center">
                  <Lock className="w-3 h-3 text-[#E5A855]" />
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-[#E5A855] text-[11px] font-bold uppercase tracking-wider mb-2.5">
                <Lock className="w-3 h-3" /> Unlocked with Roadmap Purchase
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                1:1 Career Strategy &amp; Counseling
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 max-w-md mx-auto leading-relaxed">
                Unlock any full career roadmap for just ₹199 to instantly activate your private 1-on-1 strategy session with Uttkarsh.
              </p>
            </div>

            {/* Perks List */}
            <div className="space-y-3 mb-6 bg-[#0d0d0f] border border-white/5 rounded-2xl p-4 sm:p-5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#E5A855] mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> What&apos;s Included in Your 1:1 Session:
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-white font-medium">45-Minute Private Video Call</strong>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Direct 1-on-1 strategy call on Google Meet with automatic calendar invites.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-white font-medium">Personalized Roadmap Review</strong>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Tailor your stages, target salary brackets, and avoid time-wasting study paths.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-white font-medium">College, Portfolio &amp; Resume Audit</strong>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Get actionable feedback to optimize your admission chances and job readiness.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-white font-medium">Full Lifetime Roadmap Access</strong>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    All detailed stage guides, exercises, and 24/7 Vio AI advisor included.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
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

              <Button
                type="button"
                variant="outline"
                onClick={() => setLockModalOpen(false)}
                className="w-full sm:w-auto border-white/15 text-zinc-400 hover:text-white hover:bg-white/10 text-xs h-11 px-5 rounded-xl cursor-pointer"
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
