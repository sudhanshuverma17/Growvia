import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Server,
  UserCheck,
  FileText,
  AlertCircle,
  Mail,
  ChevronRight,
  Clock,
  Sparkles,
  HelpCircle,
} from "lucide-react";

const SECTIONS = [
  { id: "introduction", title: "1. Introduction & Overview" },
  { id: "information-collected", title: "2. Information We Collect" },
  { id: "how-we-use-information", title: "3. How We Use Information" },
  { id: "third-party-services", title: "4. Third-Party Processors" },
  { id: "cookies-storage", title: "5. Cookies & Local Storage" },
  { id: "data-retention", title: "6. Data Retention" },
  { id: "data-security", title: "7. Security Measures" },
  { id: "dpdpa-rights", title: "8. User Rights (DPDPA 2023)" },
  { id: "children-privacy", title: "9. Children's Privacy" },
  { id: "international-users", title: "10. International Visitors" },
  { id: "policy-updates", title: "11. Policy Changes" },
  { id: "contact-grievance", title: "12. Contact & Grievance Redressal" },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("introduction");

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
        title="Privacy Policy — Honesvia"
        description="Read the official Privacy Policy of Honesvia. Learn how we collect, use, and protect your personal information in compliance with India's Digital Personal Data Protection Act, 2023 (DPDPA)."
        canonical="https://honesvia.com/privacy-policy"
      />

      <div className="w-full min-h-[calc(100vh-5rem)] bg-[#0d0d0f] text-foreground -mt-20 pt-24 pb-20 -mb-20">
        {/* ── CINEMATIC HEADER BANNER ───────────────────────────────── */}
        <section className="relative w-full overflow-hidden border-b border-white/5 bg-black/60">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 md:pt-20 md:pb-16 text-center">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E5A855] px-3.5 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/5 mb-4">
              <Shield className="w-3.5 h-3.5" />
              LEGAL & PRIVACY TRANSPARENCY
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              Privacy <span className="text-[#E69D43]">Policy</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              We respect your right to privacy and are committed to safeguarding your personal data in accordance with India’s Digital Personal Data Protection Act, 2023 (DPDPA) and global best practices.
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
              <div className="rounded-2xl border border-white/10 bg-[#131316]/90 backdrop-blur-md p-6 shadow-xl">
                <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-white/10 text-white font-semibold text-sm">
                  <FileText className="w-4 h-4 text-[#E5A855]" />
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
                      <span>{sec.title}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                        activeSection === sec.id ? "opacity-100 text-[#E5A855] translate-x-0.5" : "opacity-30"
                      }`} />
                    </a>
                  ))}
                </nav>

                <div className="mt-6 pt-5 border-t border-white/10 bg-amber-500/5 rounded-xl p-3.5 border border-amber-500/15">
                  <div className="text-[11px] font-medium text-zinc-300">
                    Questions about your data?
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

            {/* ── POLICY ARTICLE CONTENT ───────────────────────────── */}
            <main className="lg:col-span-8 space-y-12 text-zinc-300 leading-relaxed text-sm sm:text-base">

              {/* 1. Introduction */}
              <section id="introduction" className="scroll-mt-28">
                <div className="rounded-2xl border border-white/10 bg-[#131316]/60 backdrop-blur-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855]">
                      <Shield className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      1. Introduction & Overview
                    </h2>
                  </div>
                  
                  <p className="mb-4">
                    Welcome to <strong>Honesvia</strong> (accessible at{" "}
                    <a href="https://honesvia.com" className="text-[#E5A855] hover:underline">
                      https://honesvia.com
                    </a>
                    , operated by founder <strong>Uttkarsh Baisla</strong>, based in Noida, Uttar Pradesh, India). Honesvia is an educational career guidance platform created to provide Indian students and aspiring professionals with honest roadmaps, salary insights, entrance exam blueprints, AI-assisted career assessments, and 1:1 strategy counseling.
                  </p>
                  <p className="mb-4">
                    This Privacy Policy details how we collect, store, process, protect, and disclose personal data when you interact with our website, create a student account, purchase our ₹199 Lifetime Access digital package, take our career assessment quiz, or communicate with our support team.
                  </p>
                  <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs sm:text-sm text-zinc-300 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-[#E5A855] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Statutory Compliance:</strong> This policy is formulated in strict accordance with the <strong>Digital Personal Data Protection Act, 2023 (DPDPA 2023)</strong> of India, the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. Information We Collect */}
              <section id="information-collected" className="scroll-mt-28">
                <div className="rounded-2xl border border-white/10 bg-[#131316]/60 backdrop-blur-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855]">
                      <Database className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      2. Information We Collect
                    </h2>
                  </div>

                  <p className="mb-4">
                    We collect only the minimum personal data necessary to provide you with functional career roadmaps, authenticated student accounts, counseling appointments, and customer support:
                  </p>

                  <h3 className="text-base font-semibold text-white mt-6 mb-2">A. Information You Provide Directly</h3>
                  <ul className="list-disc pl-6 space-y-2 mb-4 text-zinc-300">
                    <li>
                      <strong>Account Registration Credentials:</strong> When you register on Honesvia, we collect your full name, email address, and a securely hashed password.
                    </li>
                    <li>
                      <strong>Contact Inquiries:</strong> When you submit our contact form, we collect your name, email address, optional contact telephone number, subject category, and message body.
                    </li>
                    <li>
                      <strong>Career Quiz & Assessment Inputs:</strong> When you interact with our career discovery quiz, you submit educational stage (e.g. 10th, 12th, undergraduate), subject interests, preferred work styles, and career goals.
                    </li>
                    <li>
                      <strong>1:1 Counseling Booking Details:</strong> When you book a 1:1 strategy session through our integrated calendar (DaySchedule), you provide your preferred date, time slot, and session objectives.
                    </li>
                  </ul>

                  <h3 className="text-base font-semibold text-white mt-6 mb-2">B. Information Collected Automatically</h3>
                  <ul className="list-disc pl-6 space-y-2 mb-4 text-zinc-300">
                    <li>
                      <strong>Device & Technical Telemetry:</strong> Internet Protocol (IP) address, browser family and version, operating system, device screen resolution, referring/exit URLs, and access timestamps.
                    </li>
                    <li>
                      <strong>Platform Interaction:</strong> Roadmaps explored, saved careers, video masterclasses watched, and quiz results generated.
                    </li>
                  </ul>

                  <h3 className="text-base font-semibold text-white mt-6 mb-2">C. Payment Information (Zero Card Data Storage)</h3>
                  <p className="mb-2">
                    When you purchase our ₹199 Lifetime Access plan, payment processing is handled entirely by <strong>Cashfree Payments India Private Limited</strong>.
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-400 italic">
                    Honesvia <strong>never</strong> collects, sees, or stores your credit/debit card numbers, CVVs, net banking credentials, or UPI MPINs on our servers. Cashfree provides us solely with tokenized order confirmations, the transaction ID, payment status (SUCCESS/FAILED), and purchase amount.
                  </p>
                </div>
              </section>

              {/* 3. How We Use Information */}
              <section id="how-we-use-information" className="scroll-mt-28">
                <div className="rounded-2xl border border-white/10 bg-[#131316]/60 backdrop-blur-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855]">
                      <Eye className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      3. How We Use Your Information
                    </h2>
                  </div>

                  <p className="mb-4">
                    Your personal information is used exclusively for lawful educational and service-delivery purposes:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <div className="p-4 rounded-xl border border-white/10 bg-black/40">
                      <div className="text-white font-semibold text-sm mb-1">Student Account Management</div>
                      <p className="text-xs text-zinc-400">Authenticating sessions, managing profile preferences, saving bookmarked career roadmaps, and managing password resets.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 bg-black/40">
                      <div className="text-white font-semibold text-sm mb-1">Service Delivery & Gating</div>
                      <p className="text-xs text-zinc-400">Unlocking 48+ premium roadmaps upon receipt of payment confirmation and permitting access to 1:1 counseling scheduling.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 bg-black/40">
                      <div className="text-white font-semibold text-sm mb-1">AI Career Recommendations</div>
                      <p className="text-xs text-zinc-400">Analyzing quiz responses via our AI model to suggest aligned career roadmaps and educational pathways.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 bg-black/40">
                      <div className="text-white font-semibold text-sm mb-1">Customer Support & Inquiries</div>
                      <p className="text-xs text-zinc-400">Directly responding to questions, payment queries, or roadmap feedback submitted through our contact form.</p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400">
                    We <strong>never</strong> sell, rent, monetize, or trade your personal information with third-party data brokers or marketing affiliates.
                  </p>
                </div>
              </section>

              {/* 4. Third-Party Processors */}
              <section id="third-party-services" className="scroll-mt-28">
                <div className="rounded-2xl border border-white/10 bg-[#131316]/60 backdrop-blur-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855]">
                      <Server className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      4. Third-Party Services & Processors
                    </h2>
                  </div>

                  <p className="mb-4">
                    To deliver our web platform securely, Honesvia collaborates with reputable third-party infrastructure providers. We do not use third-party behavioral advertising pixels (such as Meta Pixel or Google AdSense). Below is the complete list of third-party processors utilized:
                  </p>

                  <div className="space-y-4 my-6">
                    <div className="p-4 rounded-xl border border-white/10 bg-black/40">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">Cashfree Payments</span>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/10 text-[#E5A855] border border-amber-500/20">Payment Gateway</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-2">
                        Processes RBI-compliant digital payments (UPI, Credit/Debit Cards, Netbanking) for our ₹199 Lifetime Access package. Cashfree maintains PCI-DSS Level 1 compliance.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-white/10 bg-black/40">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">Google Gemini AI</span>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">AI Career Guidance</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-2">
                        Powers our intelligent career assessment and conversational assistant (Vio AI). Only your anonymized quiz answers and career questions are transmitted to generate tailored career guidance; personal credentials or contact details are never shared.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-white/10 bg-black/40">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">Resend</span>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">Transactional Email</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-2">
                        Used exclusively for delivering transactional communications, such as password reset links and account verification emails. We do not send unsolicited promotional marketing blasts.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-white/10 bg-black/40">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">DaySchedule & Google Meet</span>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20">Counseling Scheduler</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-2">
                        Enables verified roadmap purchasers to schedule 1:1 career strategy sessions and receive automatic Google Meet calendar invites.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-white/10 bg-black/40">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">MongoDB Atlas & Cloud Hosting</span>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Database Infrastructure</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-2">
                        Stores encrypted student account records, contact inquiries, and purchase flags in secure enterprise cloud databases featuring automated backups and strict role-based access control.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-white/10 bg-black/40">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">YouTube Embeds</span>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">Educational Video Content</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-2">
                        Curated career masterclass videos are embedded from YouTube to provide students with unfiltered professional day-in-the-life perspectives.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 5. Cookies & Local Storage */}
              <section id="cookies-storage" className="scroll-mt-28">
                <div className="rounded-2xl border border-white/10 bg-[#131316]/60 backdrop-blur-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855]">
                      <Lock className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      5. Cookies & Local Storage Technologies
                    </h2>
                  </div>

                  <p className="mb-4">
                    Honesvia does not use third-party advertising tracking cookies or ad-network beacons. We use modern browser client storage solely for functional, security, and preference management:
                  </p>

                  <div className="overflow-x-auto my-4">
                    <table className="w-full text-left text-xs sm:text-sm border border-white/10 rounded-xl overflow-hidden">
                      <thead className="bg-white/5 text-white font-semibold">
                        <tr>
                          <th className="p-3 border-b border-white/10">Storage Key</th>
                          <th className="p-3 border-b border-white/10">Type</th>
                          <th className="p-3 border-b border-white/10">Purpose</th>
                          <th className="p-3 border-b border-white/10">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-zinc-300">
                        <tr>
                          <td className="p-3 font-mono text-xs text-[#E5A855]">honesvia_token</td>
                          <td className="p-3">LocalStorage</td>
                          <td className="p-3">Secure JSON Web Token (JWT) maintaining your active student session.</td>
                          <td className="p-3">Until sign out / 7 days</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono text-xs text-[#E5A855]">honesvia_user</td>
                          <td className="p-3">LocalStorage</td>
                          <td className="p-3">Cached basic profile details (name, email, role, purchase status).</td>
                          <td className="p-3">Until sign out</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono text-xs text-[#E5A855]">sidebar_state</td>
                          <td className="p-3">HTTP Cookie</td>
                          <td className="p-3">Remembers whether navigation sidebars are collapsed or expanded.</td>
                          <td className="p-3">7 days</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono text-xs text-[#E5A855]">honesvia_cookie_consent</td>
                          <td className="p-3">LocalStorage</td>
                          <td className="p-3">Records that you have reviewed our cookie and privacy notice banner.</td>
                          <td className="p-3">Persistent</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400 mt-2">
                    You can clear local storage and cookies at any time via your browser settings. Please note that clearing functional tokens will sign you out of your account.
                  </p>
                </div>
              </section>

              {/* 6. Data Retention */}
              <section id="data-retention" className="scroll-mt-28">
                <div className="rounded-2xl border border-white/10 bg-[#131316]/60 backdrop-blur-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855]">
                      <Clock className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      6. Data Retention
                    </h2>
                  </div>

                  <p className="mb-4">
                    We retain personal data only for as long as is necessary to fulfill the purposes set out in this Privacy Policy:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                    <li>
                      <strong>Account Data:</strong> Retained for the lifetime of your active student account. If you request account deletion, your credentials and profile are purged within 30 days.
                    </li>
                    <li>
                      <strong>Purchase & Order Records:</strong> Transaction identifiers and payment status flags are retained for 7 years to comply with statutory Indian tax, accounting, and legal requirements.
                    </li>
                    <li>
                      <strong>Contact Inquiries:</strong> Messages sent via the contact form are retained for up to 180 days to resolve student support requests, after which they are archived or deleted.
                    </li>
                    <li>
                      <strong>System Logs:</strong> Server connection logs are retained for 90 days for network diagnostic and cybersecurity forensics before being automatically purged.
                    </li>
                  </ul>
                </div>
              </section>

              {/* 7. Data Security */}
              <section id="data-security" className="scroll-mt-28">
                <div className="rounded-2xl border border-white/10 bg-[#131316]/60 backdrop-blur-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855]">
                      <Shield className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      7. Security Measures
                    </h2>
                  </div>

                  <p className="mb-4">
                    We implement industry-standard administrative, physical, and technical safeguards to protect your personal data against unauthorized access, alteration, disclosure, or destruction:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                    <div className="p-4 rounded-xl border border-white/10 bg-black/40">
                      <div className="text-white font-semibold text-sm mb-1">Cryptographic Password Hashing</div>
                      <p className="text-xs text-zinc-400">All user passwords are encrypted using high-cost bcrypt hashing before ever being stored.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 bg-black/40">
                      <div className="text-white font-semibold text-sm mb-1">Encrypted Data in Transit</div>
                      <p className="text-xs text-zinc-400">All communication between your browser and our servers is encrypted using modern TLS/HTTPS protocols.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 bg-black/40">
                      <div className="text-white font-semibold text-sm mb-1">Zero Financial Data Exposure</div>
                      <p className="text-xs text-zinc-400">Payment details are processed entirely off-server by Cashfree Payments via PCI-DSS compliant channels.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 bg-black/40">
                      <div className="text-white font-semibold text-sm mb-1">Role-Based Access Control</div>
                      <p className="text-xs text-zinc-400">Administrative and database access is restricted to authorized personnel via multi-factor authentication.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 8. DPDPA 2023 User Rights */}
              <section id="dpdpa-rights" className="scroll-mt-28">
                <div className="rounded-2xl border border-white/10 bg-[#131316]/60 backdrop-blur-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855]">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      8. Your Rights Under India's DPDPA 2023
                    </h2>
                  </div>

                  <p className="mb-4">
                    Under the <strong>Digital Personal Data Protection Act, 2023 (DPDPA)</strong> of India, you as a Data Principal hold specific statutory rights regarding your personal information:
                  </p>

                  <div className="space-y-3 my-4">
                    <div className="p-3.5 rounded-xl border border-white/10 bg-black/40">
                      <strong className="text-white text-sm">Right to Access Information:</strong>
                      <p className="text-xs text-zinc-400 mt-1">You may request a summary of the personal data we hold about you and details of any processing activities.</p>
                    </div>
                    <div className="p-3.5 rounded-xl border border-white/10 bg-black/40">
                      <strong className="text-white text-sm">Right to Correction & Erasure:</strong>
                      <p className="text-xs text-zinc-400 mt-1">You may request correction of inaccurate or misleading data, updating of incomplete data, or complete erasure of your personal data when it is no longer required.</p>
                    </div>
                    <div className="p-3.5 rounded-xl border border-white/10 bg-black/40">
                      <strong className="text-white text-sm">Right of Grievance Redressal:</strong>
                      <p className="text-xs text-zinc-400 mt-1">You have the right to readily accessible grievance redressal regarding any act or omission concerning our compliance with your data rights.</p>
                    </div>
                    <div className="p-3.5 rounded-xl border border-white/10 bg-black/40">
                      <strong className="text-white text-sm">Right to Nominate:</strong>
                      <p className="text-xs text-zinc-400 mt-1">You have the right to nominate an individual who, in the event of death or incapacity, shall exercise your data rights on your behalf.</p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400 mt-4">
                    To exercise any of these statutory rights, please send an email request to our designated Grievance Officer at{" "}
                    <a href="mailto:careerguidence99@gmail.com" className="text-[#E5A855] hover:underline font-semibold">
                      careerguidence99@gmail.com
                    </a>
                    . We will verify your identity and respond within thirty (30) business days.
                  </p>
                </div>
              </section>

              {/* 9. Children's Privacy */}
              <section id="children-privacy" className="scroll-mt-28">
                <div className="rounded-2xl border border-white/10 bg-[#131316]/60 backdrop-blur-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855]">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      9. Children's & Minor's Privacy
                    </h2>
                  </div>

                  <p className="mb-4">
                    Honesvia provides career guidance designed for high school students, college learners, and young adults. If you are under the age of 18 (a minor under Indian law), you must use Honesvia under the supervision or with the consent of a parent or lawful legal guardian.
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-400">
                    In compliance with the DPDPA 2023, we do not undertake behavioral tracking, targeted advertising, or harmful processing directed at children. If you believe a child under 13 has provided personal data without parental consent, please contact us immediately so we can remove the data.
                  </p>
                </div>
              </section>

              {/* 10. International Visitors */}
              <section id="international-users" className="scroll-mt-28">
                <div className="rounded-2xl border border-white/10 bg-[#131316]/60 backdrop-blur-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855]">
                      <Server className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      10. International Visitors (GDPR / CCPA Acknowledgement)
                    </h2>
                  </div>

                  <p className="mb-4">
                    Honesvia is primarily targeted at Indian students and early professionals. However, if you access our services from outside the Republic of India (such as the European Economic Area, United Kingdom, or United States):
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-zinc-300 text-xs sm:text-sm">
                    <li>
                      Your personal information may be transferred to and processed on secure cloud servers located in India and global cloud data centers compliant with standard data protection clauses.
                    </li>
                    <li>
                      <strong>EEA & UK Users (GDPR):</strong> We process your data under legitimate interest (providing career roadmaps) and contractual necessity (delivering purchased digital guides). You enjoy rights of access, rectification, objection, and data portability.
                    </li>
                    <li>
                      <strong>California Residents (CCPA/CPRA):</strong> We do not sell or share personal information for monetary or other valuable consideration.
                    </li>
                  </ul>
                </div>
              </section>

              {/* 11. Policy Changes */}
              <section id="policy-updates" className="scroll-mt-28">
                <div className="rounded-2xl border border-white/10 bg-[#131316]/60 backdrop-blur-sm p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855]">
                      <Clock className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      11. Changes to this Privacy Policy
                    </h2>
                  </div>

                  <p className="mb-4">
                    We may update this Privacy Policy from time to time to reflect operational modifications, platform enhancements, or evolving legal frameworks. When updates occur, the <em>"Effective Date"</em> at the top of this document will be amended.
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-400">
                    We encourage you to review this page periodically. Continued usage of Honesvia after updates are posted constitutes acceptance of the amended terms.
                  </p>
                </div>
              </section>

              {/* 12. Contact & Grievance Redressal */}
              <section id="contact-grievance" className="scroll-mt-28">
                <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-[#131316] via-black to-[#131316] p-6 sm:p-8 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-[#E5A855]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      12. Contact & Grievance Redressal
                    </h2>
                  </div>

                  <p className="mb-6">
                    In compliance with the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000, Honesvia has designated a Grievance Redressal Officer to address inquiries and privacy concerns:
                  </p>

                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3 text-xs sm:text-sm">
                    <div>
                      <span className="text-zinc-400">Platform:</span>{" "}
                      <strong className="text-white">Honesvia (https://honesvia.com)</strong>
                    </div>
                    <div>
                      <span className="text-zinc-400">Founder & Data Custodian:</span>{" "}
                      <strong className="text-white">Uttkarsh Baisla</strong>
                    </div>
                    <div>
                      <span className="text-zinc-400">Official Grievance Email:</span>{" "}
                      <a href="mailto:careerguidence99@gmail.com" className="text-[#E5A855] hover:underline font-semibold">
                        careerguidence99@gmail.com
                      </a>
                    </div>
                    <div>
                      <span className="text-zinc-400">Office Location:</span>{" "}
                      <span className="text-white">Noida, Gautam Buddha Nagar, Uttar Pradesh, India</span>
                    </div>
                    <div>
                      <span className="text-zinc-400">Response Turnaround:</span>{" "}
                      <span className="text-white">Within 30 business days</span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-4 items-center">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E5A855] hover:bg-[#c98e45] text-black font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                    >
                      <span>Reach Support Team</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/terms-and-conditions"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      <span>Read Terms & Conditions</span>
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
