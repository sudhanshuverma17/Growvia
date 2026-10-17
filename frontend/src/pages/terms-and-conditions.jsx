import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import {
  Scale,
  ShieldAlert,
  FileCheck,
  CreditCard,
  Ban,
  AlertTriangle,
  GraduationCap,
  Calendar,
  Lock,
  Mail,
  ChevronRight,
  Clock,
  Sparkles,
  BookOpen,
} from "lucide-react";

const SECTIONS = [
  { id: "acceptance-of-terms", title: "1. Acceptance of Terms" },
  { id: "services-description", title: "2. Description of Services" },
  { id: "educational-disclaimer", title: "3. Educational Disclaimer & No Job Guarantee" },
  { id: "user-accounts", title: "4. User Accounts & Security" },
  { id: "pricing-payments", title: "5. Pricing, Digital Purchases & Access" },
  { id: "refund-cancellation", title: "6. Refund & Cancellation Policy" },
  { id: "counseling-sessions", title: "7. 1:1 Counseling Terms & Conduct" },
  { id: "intellectual-property", title: "8. Intellectual Property & Prohibited Use" },
  { id: "third-party-services", title: "9. Third-Party Integrations" },
  { id: "limitation-liability", title: "10. Limitation of Liability" },
  { id: "indemnification", title: "11. Indemnification" },
  { id: "termination", title: "12. Account Termination" },
  { id: "governing-law", title: "13. Governing Law & Jurisdiction" },
  { id: "changes-to-terms", title: "14. Changes to Terms" },
  { id: "contact-information", title: "15. Contact Information" },
];

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState("acceptance-of-terms");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <Layout>
      <SEO
        title="Terms & Conditions — Honesvia"
        description="Official Terms and Conditions for Honesvia. Understand your rights, acceptable use, refund rules, and legal agreements when using our career guidance platform."
        canonical="https://honesvia.com/terms-and-conditions"
      />

      <div className="w-full min-h-[calc(100vh-5rem)] bg-[#0d0d0f] text-foreground -mt-20 pt-24 pb-20 -mb-20">
        {/* ── CINEMATIC HEADER BANNER ───────────────────────────────── */}
        <section className="relative w-full overflow-hidden border-b border-white/5 bg-black/60">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 md:pt-20 md:pb-16 text-center">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E5A855] px-3.5 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/5 mb-4">
              <Scale className="w-3.5 h-3.5" />
              TERMS OF SERVICE
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              Terms & <span className="text-[#E69D43]">Conditions</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Please read these Terms and Conditions carefully before using Honesvia. By accessing or using our website, you agree to be bound by these provisions.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#E5A855]" />
                <span>Effective Date: <strong>October 17, 2026</strong></span>
              </div>
              <span className="hidden sm:inline text-zinc-700">•</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E5A855]" />
                <span>Jurisdiction: <strong>Noida, Uttar Pradesh, India</strong></span>
              </div>
            </div>
          </div>
        </section>

        {/* ── MAIN CONTENT & NAVIGATION ────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* ── STICKY TABLE OF CONTENTS (DESKTOP) ────────────────── */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-28">
              <div className="rounded-2xl border border-white/10 bg-[#131316]/90 backdrop-blur-md p-6 shadow-xl max-h-[calc(100vh-8rem)] overflow-y-auto">
                <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-white/10 text-white font-semibold text-sm">
                  <FileCheck className="w-4 h-4 text-[#E5A855]" />
                  <span>Table of Contents</span>
                </div>
                <nav className="space-y-1 text-xs">
                  {SECTIONS.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => scrollToSection(e, sec.id)}
                      className={`flex items-center justify-between py-2 px-3 rounded-lg transition-all ${
                        activeSection === sec.id
                          ? "bg-amber-500/10 text-[#E5A855] font-semibold border-l-2 border-[#E5A855]"
                          : "text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span className="truncate pr-2">{sec.title}</span>
                      <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                        activeSection === sec.id ? "opacity-100 text-[#E5A855] translate-x-0.5" : "opacity-30"
                      }`} />
                    </a>
                  ))}
                </nav>

                <div className="mt-6 pt-5 border-t border-white/10 bg-amber-500/5 rounded-xl p-3.5 border border-amber-500/15">
                  <div className="text-[11px] font-medium text-zinc-300">
                    Need legal clarification?
                  </div>
                  <a
                    href="mailto:careerguidence99@gmail.com"
                    className="inline-flex items-center gap-1.5 text-xs text-[#E5A855] hover:underline font-semibold mt-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    careerguidence99@gmail.com
                  </a>
                </div>
              </div>
            </aside>

            {/* ── TERMS ARTICLE CONTENT ────────────────────────────── */}
            <main className="lg:col-span-8 space-y-12 text-zinc-300 leading-relaxed text-sm sm:text-base">

              {/* 1. Acceptance of Terms */}
              <section id="acceptance-of-terms" className="scroll-mt-28">
                <div className="rounded-2xl border border-white/10 bg-[#131316]/60 backdrop-blur-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855]">
                      <Scale className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      1. Acceptance of Terms
                    </h2>
                  </div>
                  
                  <p className="mb-4">
                    These Terms and Conditions (&quot;Terms&quot;, &quot;Agreement&quot;) constitute a legally binding agreement between you (whether personally or on behalf of an entity, &quot;you&quot;, &quot;student&quot;, or &quot;user&quot;) and <strong>Honesvia</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;, founded by <strong>Uttkarsh Baisla</strong>, having operations based in Noida, Uttar Pradesh, India), governing your access to and use of the website located at{" "}
                    <a href="https://honesvia.com" className="text-[#E5A855] hover:underline">
                      https://honesvia.com
                    </a>{" "}
                    as well as any related web interfaces, digital roadmaps, assessment tools, and video content.
                  </p>
                  <p className="mb-4">
                    By visiting our website, signing up for an account, or purchasing digital roadmap access, you acknowledge that you have read, understood, and agreed to be bound by these Terms and our{" "}
                    <Link href="/privacy-policy" className="text-[#E5A855] hover:underline font-semibold">
                      Privacy Policy
                    </Link>
                    . If you do not agree with any part of these Terms, you must discontinue use of the platform immediately.
                  </p>
                </div>
              </section>

              {/* 2. Description of Services */}
              <section id="services-description" className="scroll-mt-28">
                <div className="rounded-2xl border border-white/10 bg-[#131316]/60 backdrop-blur-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855]">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      2. Description of Services
                    </h2>
                  </div>

                  <p className="mb-4">
                    Honesvia provides an independent digital career guidance and educational resource hub designed for Indian students and aspiring professionals. Features include:
                  </p>

                  <ul className="list-disc pl-6 space-y-2 mb-4 text-zinc-300">
                    <li>
                      <strong>48+ Curated Career Roadmaps:</strong> Step-by-step career path breakdowns covering technology, design, finance, civil services, healthcare, marketing, creative professions, and competitive entrance examinations.
                    </li>
                    <li>
                      <strong>Career Discovery Quiz & AI Insights:</strong> Interactive assessment powered by Google Gemini AI to assist students in discovering career options that match their interests and stage of study.
                    </li>
                    <li>
                      <strong>Salary & Market Insights:</strong> Curated industry compensation benchmarks, hiring trends, and skill prerequisites relevant to the Indian employment landscape.
                    </li>
                    <li>
                      <strong>Mentor Masterclasses:</strong> Curated video insights from experienced industry mentors sharing real-world working conditions and career milestones.
                    </li>
                    <li>
                      <strong>1:1 Career Strategy Counseling:</strong> Premium personalized video guidance sessions with verified mentors via DaySchedule and Google Meet.
                    </li>
                  </ul>
                </div>
              </section>

              {/* 3. Educational Disclaimer */}
              <section id="educational-disclaimer" className="scroll-mt-28">
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-[#E5A855]">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      3. Educational Disclaimer & Zero Job Guarantee
                    </h2>
                  </div>

                  <div className="space-y-4 text-sm text-zinc-300">
                    <p>
                      <strong className="text-white">Strict Advisory:</strong> Honesvia is exclusively an <strong>informational and educational guidance platform</strong>. We are <strong>not</strong> a job placement agency, employment recruiter, licensed college admission agent, or staffing firm.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>No Placement or Employment Guarantees:</strong> Completing our roadmaps, scoring high on our career quiz, or participating in 1:1 counseling does not guarantee job placement, internship offers, college admissions, interview calls, or specific salary outcomes.
                      </li>
                      <li>
                        <strong>Salary Figures are Curated Estimates:</strong> All salary data, compensation ranges, and exam cut-offs represented on Honesvia are compiled from public market surveys and industry reporting. Actual compensation varies significantly based on individual capability, candidate portfolio, economic conditions, and employer policies.
                      </li>
                      <li>
                        <strong>Independent Career Decisions:</strong> You are solely responsible for verifying official academic requirements, degree eligibility, entrance exam dates, and evaluating career decisions before making educational or financial commitments.
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 4. User Accounts */}
              <section id="user-accounts" className="scroll-mt-28">
                <div className="rounded-2xl border border-white/10 bg-[#131316]/60 backdrop-blur-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855]">
                      <Lock className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      4. User Accounts & Security
                    </h2>
                  </div>

                  <p className="mb-4">
                    When you register an account on Honesvia:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4 text-zinc-300">
                    <li>
                      You must provide accurate, current, and complete registration information.
                    </li>
                    <li>
                      You are solely responsible for maintaining the confidentiality of your account credentials (email and password) and for all activities that occur under your account.
                    </li>
                    <li>
                      <strong>Prohibition of Account Sharing:</strong> Each account is licensed strictly for individual personal use. You may not sell, resell, transfer, lend, or share your account credentials with third parties or institutional cohorts.
                    </li>
                    <li>
                      You must notify us immediately at <a href="mailto:careerguidence99@gmail.com" className="text-[#E5A855] underline">careerguidence99@gmail.com</a> if you discover or suspect any unauthorized access or breach of security.
                    </li>
                  </ul>
                </div>
              </section>

              {/* 5. Pricing, Digital Purchases & Access */}
              <section id="pricing-payments" className="scroll-mt-28">
                <div className="rounded-2xl border border-white/10 bg-[#131316]/60 backdrop-blur-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855]">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      5. Pricing, Digital Purchases & Access
                    </h2>
                  </div>

                  <p className="mb-4">
                    Honesvia offers free exploration of career pathways alongside a premium digital purchase:
                  </p>
                  <div className="p-4 rounded-xl border border-white/10 bg-black/40 my-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-base">Lifetime Roadmap Access</span>
                      <span className="font-mono font-bold text-[#E5A855] text-lg">₹199 INR (One-Time)</span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Unlocks complete curriculum breakdowns for all 48+ career roadmaps, step-by-step milestones, preparation guides, and activates access to schedule personalized 1:1 strategy counseling sessions.
                    </p>
                  </div>

                  <ul className="list-disc pl-6 space-y-2 text-zinc-300 text-xs sm:text-sm">
                    <li>
                      <strong>Currency & Taxes:</strong> All fees are stated in Indian Rupees (INR) and are inclusive or exclusive of applicable GST as indicated at checkout.
                    </li>
                    <li>
                      <strong>Payment Processing:</strong> Transactions are securely executed through <strong>Cashfree Payments</strong>. By initiating a purchase, you agree to Cashfree’s user terms and RBI-mandated customer verification protocols.
                    </li>
                    <li>
                      <strong>Instant Digital Delivery:</strong> Access to all roadmaps and counseling booking features is granted automatically upon successful payment confirmation.
                    </li>
                  </ul>
                </div>
              </section>

              {/* 6. Refund & Cancellation Policy */}
              <section id="refund-cancellation" className="scroll-mt-28">
                <div className="rounded-2xl border border-white/10 bg-[#131316]/60 backdrop-blur-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855]">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      6. Refund & Cancellation Policy
                    </h2>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
                    <p>
                      Because Honesvia provides immediate, irrevocable access to digital proprietary roadmaps, learning structures, and counseling scheduling upon payment confirmation:
                    </p>
                    <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-zinc-200">
                      <strong className="text-red-400 font-semibold block mb-1">Non-Refundable Policy on Digital Goods:</strong>
                      All sales of the ₹199 Lifetime Access digital package are <strong>final and non-refundable</strong> once access is provisioned to your account.
                    </div>
                    <p>
                      <strong className="text-white">Eligible Exceptions:</strong>
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-400">
                      <li>
                        <strong>Duplicate Transactions:</strong> If technical error or double-click results in your card/UPI account being charged more than once for the same account, we will happily refund the duplicate charge.
                      </li>
                      <li>
                        <strong>Gateway Deduction Without Access:</strong> If money was deducted by Cashfree but your Honesvia account was not upgraded due to a webhook or network timeout, we will either manually upgrade your account immediately or issue a full refund upon verification.
                      </li>
                    </ul>
                    <p>
                      To request a review for duplicate charges, please email{" "}
                      <a href="mailto:careerguidence99@gmail.com" className="text-[#E5A855] underline font-semibold">
                        careerguidence99@gmail.com
                      </a>{" "}
                      within forty-eight (48) hours of the transaction, providing your registered email address and Cashfree transaction reference.
                    </p>
                  </div>
                </div>
              </section>

              {/* 7. 1:1 Counseling Terms & Conduct */}
              <section id="counseling-sessions" className="scroll-mt-28">
                <div className="rounded-2xl border border-white/10 bg-[#131316]/60 backdrop-blur-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855]">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      7. 1:1 Counseling Terms & Conduct
                    </h2>
                  </div>

                  <p className="mb-4">
                    For users eligible to book 1:1 career strategy calls:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-zinc-300 text-xs sm:text-sm">
                    <li>
                      <strong>Scheduling & Timeliness:</strong> Sessions are scheduled via our integrated DaySchedule tool and conducted on Google Meet. Please join promptly at the scheduled start time. Mentors will wait up to 10 minutes before marking the session as a missed appointment.
                    </li>
                    <li>
                      <strong>Rescheduling Notice:</strong> If you cannot attend a scheduled session, you must reschedule at least 12 hours prior to the call via the booking link.
                    </li>
                    <li>
                      <strong>Respectful Code of Conduct:</strong> Sessions must remain professional and constructive. Harassment, verbal abuse, inappropriate language, recording without consent, or illicit behavior during counseling calls will result in immediate termination of the call and permanent revocation of account privileges without refund.
                    </li>
                  </ul>
                </div>
              </section>

              {/* 8. Intellectual Property */}
              <section id="intellectual-property" className="scroll-mt-28">
                <div className="rounded-2xl border border-white/10 bg-[#131316]/60 backdrop-blur-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855]">
                      <Ban className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      8. Intellectual Property & Prohibited Use
                    </h2>
                  </div>

                  <p className="mb-4">
                    All content, features, and functionality on Honesvia—including but not limited to the 48+ roadmap architectures, text copy, graphic designs, logos, software code, UI layouts, and domain branding—are the proprietary intellectual property of Honesvia and founder Uttkarsh Baisla, protected by Indian and international copyright and trademark laws.
                  </p>

                  <h3 className="text-white font-semibold text-sm mt-4 mb-2">Permitted Limited License</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mb-4">
                    We grant you a non-exclusive, non-transferable, revocable license to access and view roadmap materials solely for your personal, non-commercial educational purposes.
                  </p>

                  <h3 className="text-white font-semibold text-sm mt-4 mb-2">Strictly Prohibited Conduct</h3>
                  <div className="p-4 rounded-xl border border-white/10 bg-black/40 text-xs sm:text-sm space-y-2 text-zinc-300">
                    <p>You agree that you shall NOT:</p>
                    <ul className="list-disc pl-6 space-y-1.5 text-zinc-400">
                      <li>Copy, republish, mirror, redistribute, or commercially exploit Honesvia roadmaps on any website, course portal, or Telegram/WhatsApp groups.</li>
                      <li>Use automated scrapers, web crawlers, bots, or extraction scripts to harvest data or curriculum details.</li>
                      <li>Circumvent or attempt to circumvent authentication gates, payment walls, or session security tokens.</li>
                      <li>Reverse engineer, decompile, or disassemble any portion of the Honesvia codebase or client bundles.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 9. Third-Party Integrations */}
              <section id="third-party-services" className="scroll-mt-28">
                <div className="rounded-2xl border border-white/10 bg-[#131316]/60 backdrop-blur-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855]">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      9. Third-Party Services & External Links
                    </h2>
                  </div>

                  <p className="mb-4">
                    Our platform integrates with or contains links to third-party services:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-zinc-300 text-xs sm:text-sm">
                    <li><strong>Cashfree:</strong> Payment facilitation and checkout handling.</li>
                    <li><strong>DaySchedule & Google Meet:</strong> Appointment calendar integration and video conferencing.</li>
                    <li><strong>YouTube:</strong> Embedded mentor masterclasses and day-in-the-life video insights.</li>
                    <li><strong>Google Gemini AI:</strong> Real-time assessment interpretation and conversational career insights.</li>
                  </ul>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-4">
                    Honesvia does not control and is not responsible for the availability, privacy practices, or content of these third-party services. Your interactions with third-party sites are governed solely by their respective terms and privacy policies.
                  </p>
                </div>
              </section>

              {/* 10. Limitation of Liability */}
              <section id="limitation-liability" className="scroll-mt-28">
                <div className="rounded-2xl border border-white/10 bg-[#131316]/60 backdrop-blur-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855]">
                      <Scale className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      10. Limitation of Liability
                    </h2>
                  </div>

                  <p className="mb-4 text-xs sm:text-sm">
                    To the maximum extent permitted by applicable Indian law, Honesvia, its founder, contractors, and affiliates shall not be liable for any indirect, punitive, incidental, special, or consequential damages—including but not limited to loss of profits, career opportunities, exam outcomes, employment prospects, or data—arising out of or in connection with your use of or inability to use the platform.
                  </p>
                  <div className="p-3.5 rounded-xl border border-white/10 bg-black/40 text-xs text-zinc-300">
                    <strong className="text-white">Liability Cap:</strong> In no event shall our total aggregate liability to you for all claims arising out of these Terms exceed the total amount actually paid by you to Honesvia in the preceding twelve (12) months, or <strong>₹199 INR</strong>, whichever is greater.
                  </div>
                </div>
              </section>

              {/* 11. Indemnification */}
              <section id="indemnification" className="scroll-mt-28">
                <div className="rounded-2xl border border-white/10 bg-[#131316]/60 backdrop-blur-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855]">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      11. Indemnification
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300">
                    You agree to defend, indemnify, and hold harmless Honesvia, its founder Uttkarsh Baisla, and affiliates from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or legal fees arising out of or relating to your violation of these Terms, your misuse of the platform, or your violation of any third-party intellectual property or privacy rights.
                  </p>
                </div>
              </section>

              {/* 12. Account Termination */}
              <section id="termination" className="scroll-mt-28">
                <div className="rounded-2xl border border-white/10 bg-[#131316]/60 backdrop-blur-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855]">
                      <Ban className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      12. Account Termination & Suspension
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 mb-3">
                    We reserve the right, without prior notice or liability, to suspend or terminate your account and restrict your access to Honesvia if:
                  </p>
                  <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm text-zinc-400">
                    <li>You breach any material provision of these Terms or our Privacy Policy.</li>
                    <li>You engage in fraudulent, unauthorized, abusive, or automated scraping activities.</li>
                    <li>Required to do so by court order, law enforcement directive, or Indian statutory authority.</li>
                  </ul>
                </div>
              </section>

              {/* 13. Governing Law & Jurisdiction */}
              <section id="governing-law" className="scroll-mt-28">
                <div className="rounded-2xl border border-white/10 bg-[#131316]/60 backdrop-blur-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855]">
                      <Scale className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      13. Governing Law & Jurisdiction
                    </h2>
                  </div>

                  <p className="mb-4 text-xs sm:text-sm">
                    These Terms shall be governed by, construed, and enforced in accordance with the <strong>laws of the Republic of India</strong>, without regard to its conflict of law principles.
                  </p>
                  <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs sm:text-sm text-zinc-300">
                    <strong className="text-white block mb-1">Exclusive Court Jurisdiction:</strong>
                    Any legal action, suit, or proceeding arising out of or related to these Terms, the platform, or payments shall be instituted exclusively in the competent courts located in <strong>Gautam Buddha Nagar (Noida), Uttar Pradesh, India</strong>. You irrevocably consent to the exclusive venue and personal jurisdiction of such courts.
                  </div>
                </div>
              </section>

              {/* 14. Changes to Terms */}
              <section id="changes-to-terms" className="scroll-mt-28">
                <div className="rounded-2xl border border-white/10 bg-[#131316]/60 backdrop-blur-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855]">
                      <Clock className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      14. Changes to Terms
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300">
                    We reserve the right to revise or replace these Terms at any time at our sole discretion. Any changes will become effective immediately upon posting to this URL with an updated <em>&quot;Effective Date&quot;</em>. By continuing to use Honesvia after revisions become effective, you agree to be bound by the revised Terms.
                  </p>
                </div>
              </section>

              {/* 15. Contact Information */}
              <section id="contact-information" className="scroll-mt-28">
                <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-[#131316] via-black to-[#131316] p-6 sm:p-8 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-[#E5A855]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      15. Contact & Support Details
                    </h2>
                  </div>

                  <p className="mb-6 text-xs sm:text-sm">
                    If you have questions, feedback, or concerns regarding these Terms and Conditions:
                  </p>

                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3 text-xs sm:text-sm">
                    <div>
                      <span className="text-zinc-400">Platform:</span>{" "}
                      <strong className="text-white">Honesvia (https://honesvia.com)</strong>
                    </div>
                    <div>
                      <span className="text-zinc-400">Founder & Operator:</span>{" "}
                      <strong className="text-white">Uttkarsh Baisla</strong>
                    </div>
                    <div>
                      <span className="text-zinc-400">Contact Email:</span>{" "}
                      <a href="mailto:careerguidence99@gmail.com" className="text-[#E5A855] hover:underline font-semibold">
                        careerguidence99@gmail.com
                      </a>
                    </div>
                    <div>
                      <span className="text-zinc-400">Location:</span>{" "}
                      <span className="text-white">Noida, Gautam Buddha Nagar, Uttar Pradesh, India</span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-4 items-center">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E5A855] hover:bg-[#c98e45] text-black font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                    >
                      <span>Contact Support</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/privacy-policy"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      <span>Read Privacy Policy</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </section>

            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
}
