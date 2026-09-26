import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Calendar, Video, Clock, CheckCircle2, Sparkles, Shield, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const DAYSCHEDULE_SCRIPT_URL =
  "https://cdn.jsdelivr.net/npm/dayschedule-widget@latest/dist/dayschedule-widget.min.js";
const DAYSCHEDULE_SCRIPT_ID = "dayschedule-widget-script";
const COUNSELING_BOOKING_URL =
  "https://sudhanshu-verma.dayschedule.com/meeting-with-sudhanshu";

/**
 * GetCounselingWidget
 *
 * Core booking component for 1:1 career counseling sessions.
 * Dynamically injects DaySchedule's widget script on mount, cleans it up on unmount,
 * and calls window.daySchedule.initPopupWidget({ url: '...' }) on click.
 */
export function GetCounselingWidget({
  variant = "card", // "card" | "button" | "banner"
  className = "",
  buttonClassName = "",
  buttonText = "Get Counseling",
  linkHref = null,
}) {
  const [isScriptReady, setIsScriptReady] = useState(false);

  useEffect(() => {
    let scriptElement = document.getElementById(DAYSCHEDULE_SCRIPT_ID);
    let wasCreated = false;

    const handleLoad = () => {
      setIsScriptReady(true);
    };

    if (!scriptElement) {
      scriptElement = document.createElement("script");
      scriptElement.id = DAYSCHEDULE_SCRIPT_ID;
      scriptElement.src = DAYSCHEDULE_SCRIPT_URL;
      scriptElement.async = true;
      scriptElement.defer = true;
      scriptElement.onload = handleLoad;
      document.body.appendChild(scriptElement);
      wasCreated = true;
    } else {
      if (typeof window !== "undefined" && window.daySchedule) {
        setIsScriptReady(true);
      } else {
        scriptElement.addEventListener("load", handleLoad);
      }
    }

    return () => {
      // Clean up script on unmount to avoid duplicate tags or memory leaks
      if (wasCreated && scriptElement && scriptElement.parentNode) {
        scriptElement.removeEventListener("load", handleLoad);
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, []);

  const handleOpenBooking = () => {
    if (
      typeof window !== "undefined" &&
      window.daySchedule &&
      typeof window.daySchedule.initPopupWidget === "function"
    ) {
      window.daySchedule.initPopupWidget({
        url: COUNSELING_BOOKING_URL,
      });
    } else {
      // Polling fallback if script is in final initialization stage
      let attempts = 0;
      const pollTimer = setInterval(() => {
        attempts++;
        if (
          typeof window !== "undefined" &&
          window.daySchedule &&
          typeof window.daySchedule.initPopupWidget === "function"
        ) {
          clearInterval(pollTimer);
          window.daySchedule.initPopupWidget({
            url: COUNSELING_BOOKING_URL,
          });
        } else if (attempts >= 10) {
          clearInterval(pollTimer);
          // Fallback to opening hosted booking page if popup object not found
          window.open(COUNSELING_BOOKING_URL, "_blank", "noopener,noreferrer");
        }
      }, 100);
    }
  };

  // 1. Bare Button Variant (for toolbars, compact headers, or inline placements)
  if (variant === "button") {
    if (linkHref) {
      return (
        <Button
          asChild
          className={`bg-[#E5A855] hover:bg-[#d99640] text-black font-bold text-xs sm:text-sm h-9 px-4 rounded-xl shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer ${buttonClassName}`}
        >
          <Link href={linkHref}>
            <Calendar className="w-4 h-4 text-black" />
            <span>{buttonText}</span>
          </Link>
        </Button>
      );
    }
    return (
      <Button
        id="get-counseling-btn"
        onClick={handleOpenBooking}
        className={`bg-[#E5A855] hover:bg-[#d99640] text-black font-bold text-xs sm:text-sm h-9 px-4 rounded-xl shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer ${buttonClassName}`}
      >
        <Calendar className="w-4 h-4 text-black" />
        <span>{buttonText}</span>
      </Button>
    );
  }

  // 2. Banner Variant (e.g., inside Dashboard or header alert)
  if (variant === "banner") {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-[#131316] to-[#131316] p-5 sm:p-6 shadow-xl ${className}`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[#E5A855] flex-shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5 text-[#E5A855]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5A855] bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                  Included With Your Roadmap
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Unlocked
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Book Your 1:1 Career Strategy Session
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 max-w-xl">
                Get personalized advice, resume and roadmap review, and strategic guidance directly from Sudhanshu.
              </p>
            </div>
          </div>

          {linkHref ? (
            <Button
              asChild
              className={`bg-[#E5A855] hover:bg-[#d99640] text-black font-bold text-xs sm:text-sm h-10 px-5 rounded-xl shadow-lg shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${buttonClassName}`}
            >
              <Link href={linkHref}>
                <Calendar className="w-4 h-4 text-black" />
                <span>{buttonText}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </Link>
            </Button>
          ) : (
            <Button
              id="get-counseling-btn"
              onClick={handleOpenBooking}
              className={`bg-[#E5A855] hover:bg-[#d99640] text-black font-bold text-xs sm:text-sm h-10 px-5 rounded-xl shadow-lg shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${buttonClassName}`}
            >
              <Calendar className="w-4 h-4 text-black" />
              <span>{buttonText}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  // 3. Full Featured Card Variant (Default for /get-counseling page & dedicated sections)
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-amber-500/30 bg-[#131316] shadow-2xl p-6 sm:p-8 lg:p-10 ${className}`}
    >
      {/* Background Decorative Ambient Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-4 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#E5A855] bg-amber-500/10 border border-amber-500/25 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#E5A855]" />
              Exclusive Premium Privilege
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-full">
              <Shield className="w-3 h-3" /> Roadmap Purchaser Verified
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            Schedule Your <span className="text-[#E5A855]">1:1 Mentorship</span> & Career Counseling
          </h2>

          <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed">
            Connect directly with Sudhanshu Verma in a private strategy session. We review your personalized roadmap, break down transition hurdles, optimize your preparation plan, and address your biggest career questions.
          </p>

          {/* Value Highlights */}
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

        {/* Action Panel */}
        <div className="flex flex-col items-center lg:items-end justify-center gap-3 bg-[#0d0d0f] p-6 rounded-2xl border border-white/10 lg:min-w-[280px] shadow-inner text-center lg:text-right">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#E5A855] shadow-lg shadow-amber-500/10 mb-1">
            <Calendar className="w-6 h-6 text-[#E5A855]" />
          </div>

          <div className="text-xs text-muted-foreground">
            Hosted via DaySchedule
          </div>

          <Button
            id="get-counseling-btn"
            size="lg"
            onClick={handleOpenBooking}
            className={`w-full bg-[#E5A855] hover:bg-[#d99640] text-black font-extrabold text-sm sm:text-base h-12 px-6 rounded-xl shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer ${buttonClassName}`}
          >
            <Calendar className="w-5 h-5 text-black" />
            <span>{buttonText}</span>
          </Button>

          <p className="text-[11px] text-muted-foreground/80 mt-1 max-w-[240px]">
            Opens interactive DaySchedule booking popup. Meeting link generated automatically.
          </p>
        </div>
      </div>
    </div>
  );
}

export default GetCounselingWidget;
