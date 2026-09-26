import React from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { GetCounselingWidget } from "@/components/GetCounselingWidget";
import { useAuth } from "@/context/auth-context";
import {
  Calendar,
  Sparkles,
  ShieldCheck,
  Video,
  Clock,
  ArrowRight,
  Compass,
  FileText,
  Target,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GetCounselingPage() {
  const { user } = useAuth();
  const purchasedCount = Array.isArray(user?.purchasedRoadmaps)
    ? user.purchasedRoadmaps.length
    : 0;

  return (
    <Layout>
      <div className="w-full min-h-screen bg-[#0d0d0f] text-foreground -mt-20 pt-28 pb-20 selection:bg-amber-500/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Top Breadcrumb & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Link href="/dashboard" className="hover:text-white transition-colors">
                Dashboard
              </Link>
              <span>/</span>
              <span className="text-[#E5A855] font-semibold">1:1 Counseling</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Purchased Roadmap Verified ({purchasedCount} Active)
              </span>
            </div>
          </div>

          {/* Main Booking Card Widget */}
          <section id="booking-widget-section">
            <GetCounselingWidget variant="card" />
          </section>

          {/* What to Expect in Your Session */}
          <section className="space-y-6">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-6 rounded-2xl bg-[#131316] border border-white/10 hover:border-amber-500/30 transition-all shadow-lg space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855]">
                  <Compass className="w-5 h-5 text-[#E5A855]" />
                </div>
                <h4 className="text-base font-bold text-white">Roadmap Milestone Optimization</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tailor your study phases, prioritize high-leverage frameworks, and avoid time-wasting detours based on current market demands.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#131316] border border-white/10 hover:border-emerald-500/30 transition-all shadow-lg space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <FileText className="w-5 h-5 text-emerald-400" />
                </div>
                <h4 className="text-base font-bold text-white">Portfolio & Resume Audit</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Live critique of your project repos, tech stack choices, and how to position your experience to pass recruiter screenings.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#131316] border border-white/10 hover:border-sky-500/30 transition-all shadow-lg space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <Sparkles className="w-5 h-5 text-sky-400" />
                </div>
                <h4 className="text-base font-bold text-white">Job Search & Interview Prep</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Actionable strategies for cold outreach, tech screening preparation, compensation expectations, and career transitions.
                </p>
              </div>
            </div>
          </section>

          {/* 3 Simple Steps */}
          <section className="bg-[#131316] border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#E5A855]" />
              How Booking Works
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/30 text-[#E5A855] font-bold text-sm flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white mb-1">Pick a Convenient Time</h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Click "Get Counseling" to open DaySchedule's interactive calendar and choose an open slot that fits your schedule.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/30 text-[#E5A855] font-bold text-sm flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white mb-1">Automatic Google Meet Link</h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    DaySchedule generates a secure Google Meet link and sends calendar invitations directly to your email inbox.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/30 text-[#E5A855] font-bold text-sm flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white mb-1">Join the 1:1 Video Session</h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Hop on the video call ready with questions about your roadmap, portfolio, or career strategy for personalized mentorship.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Return to Dashboard Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <Link
              href="/dashboard"
              className="text-xs text-muted-foreground hover:text-white transition-colors flex items-center gap-1.5"
            >
              ← Return to Student Dashboard
            </Link>

            <Link
              href="/roadmaps"
              className="text-xs text-[#E5A855] hover:underline flex items-center gap-1.5 font-medium"
            >
              Explore All Career Roadmaps <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
