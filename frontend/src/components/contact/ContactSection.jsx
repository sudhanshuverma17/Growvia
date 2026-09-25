import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth-context";
import { apiUrl } from "@/lib/api-config";
import {
  Mail,
  Phone,
  MapPin,
  Users,
  ArrowRight,
  User,
  Tag,
  MessageSquare,
  Lock,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

const SUBJECT_OPTIONS = [
  "Career Roadmap Guidance",
  "General Inquiry",
  "Mentor Video Masterclasses",
  "Pricing & Lifetime Access (₹199)",
  "Partnership & Mentorship",
  "Technical Support",
  "Feedback & Suggestions",
  "Other",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function ContactSection({ id = "contact", isStandalonePage = false, className = "" }) {
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Career Roadmap Guidance",
    message: "",
  });

  // Prefill logged-in student details if available
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!form.email.trim()) {
      setErrorMsg("Please enter your email address.");
      return;
    }
    if (!form.message.trim() || form.message.trim().length < 5) {
      setErrorMsg("Please enter a message of at least 5 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(apiUrl("/api/contact"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send message. Please try again.");
      }

      setSuccess(true);
      setForm({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        subject: "Career Roadmap Guidance",
        message: "",
      });
    } catch (err) {
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id={id}
      className={`relative ${
        isStandalonePage
          ? "min-h-[calc(100vh-80px)] py-16 md:py-24"
          : "py-24 md:py-32"
      } bg-black overflow-hidden select-none flex items-center ${className}`}
    >
      {/* Planetary Horizon Glow Background */}
      <div
        className="absolute inset-0 bg-cover pointer-events-none opacity-95"
        style={{
          backgroundImage: "url('/images/problem-bg.png')",
          backgroundPosition: "left bottom",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Ambient Cosmic Orbits & Star Nodes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute -left-64 -top-32 w-[680px] h-[680px] rounded-full border border-[#C88A58]/20" />
        <div className="absolute -right-40 top-1/4 w-[750px] h-[750px] rounded-full border border-[#C88A58]/25" />
        <div className="absolute -right-20 top-1/3 w-[550px] h-[550px] rounded-full border border-[#C88A58]/15" />

        {/* Star flare points along orbits */}
        <div className="absolute left-[5%] top-[18%] w-2 h-2 rounded-full bg-[#E5A869] shadow-[0_0_10px_#E5A869]" />
        <div className="absolute left-[38%] top-[8%] w-1.5 h-1.5 rounded-full bg-[#E5A869] shadow-[0_0_8px_#E5A869]" />
        <div className="absolute right-[46%] bottom-[32%] w-2 h-2 rounded-full bg-[#E5A869] shadow-[0_0_12px_#E5A869]" />
        <div className="absolute right-[12%] top-[15%] w-1.5 h-1.5 rounded-full bg-[#E5A869] shadow-[0_0_8px_#E5A869]" />
        <div className="absolute right-[4%] bottom-[48%] w-2 h-2 rounded-full bg-[#E5A869] shadow-[0_0_10px_#E5A869]" />

        {/* Ambient Warm Golden Radial Flare */}
        <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(200,138,88,0.14),transparent_70%)]" />
      </div>

      {/* Soft edge blend for top transition */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black via-black/40 to-transparent pointer-events-none" />
      {/* Soft edge blend for bottom transition toward footer */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ── LEFT COLUMN: CONTACT DETAILS & COMMUNITY ────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={0}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div>
              {/* Pill Tag: CONTACT US */}
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F5E6D3] px-3.5 py-1.5 rounded-full border border-[#C88A58]/50 bg-black/40 backdrop-blur-md mb-6 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5A869] shadow-[0_0_6px_#E5A869]" />
                <span>CONTACT US</span>
              </div>

              {/* Main Headline */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08] mb-4">
                Let&apos;s Build
                <br />
                <span className="bg-gradient-to-r from-[#FCE8D3] via-[#F5D0A9] to-[#E5A869] bg-clip-text text-transparent">
                  Your Future Together.
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-zinc-300/85 leading-relaxed max-w-lg mb-9">
                Have questions, feedback, or need guidance? We&apos;re here to help
                you at every step of your career journey.
              </p>

              {/* 3 Contact Info Rows */}
              <div className="space-y-6 mb-10">
                {/* 1. Email Us */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-black/50 border border-[#C88A58]/50 shadow-[0_0_16px_rgba(200,138,88,0.22)] flex items-center justify-center text-[#F5E6D3] shrink-0 group-hover:border-[#E5A869] group-hover:scale-105 transition-all">
                    <Mail className="w-5 h-5 text-[#F5E6D3]" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-base font-bold text-white leading-tight">Email Us</div>
                    <div className="text-xs text-zinc-400 mt-0.5 leading-snug">
                      For general queries and support
                    </div>
                    <a
                      href="mailto:support@growvia.in"
                      className="text-sm font-semibold text-[#E5A869] hover:text-[#f8caa0] transition-colors inline-block mt-0.5"
                    >
                      support@growvia.in
                    </a>
                  </div>
                </div>

                {/* 2. Call Us */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-black/50 border border-[#C88A58]/50 shadow-[0_0_16px_rgba(200,138,88,0.22)] flex items-center justify-center text-[#F5E6D3] shrink-0 group-hover:border-[#E5A869] group-hover:scale-105 transition-all">
                    <Phone className="w-5 h-5 text-[#F5E6D3]" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-base font-bold text-white leading-tight">Call Us</div>
                    <div className="text-xs text-zinc-400 mt-0.5 leading-snug">
                      Mon – Sat, 10:00 AM – 6:00 PM
                    </div>
                    <a
                      href="tel:+919876543210"
                      className="text-sm font-semibold text-white/90 hover:text-white transition-colors inline-block mt-0.5"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                {/* 3. Our Location */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-black/50 border border-[#C88A58]/50 shadow-[0_0_16px_rgba(200,138,88,0.22)] flex items-center justify-center text-[#F5E6D3] shrink-0 group-hover:border-[#E5A869] group-hover:scale-105 transition-all">
                    <MapPin className="w-5 h-5 text-[#F5E6D3]" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-base font-bold text-white leading-tight">Our Location</div>
                    <div className="text-sm text-white/90 mt-0.5 leading-snug">
                      Noida, Uttar Pradesh, India
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">(Remote First)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Join Our Community Glass Card */}
            <Link href="/roadmaps">
              <div className="group rounded-[22px] bg-black/35 backdrop-blur-md border border-white/12 hover:border-[#C88A58]/50 p-4 sm:p-5 flex items-center justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/40 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-black/50 border border-[#C88A58]/50 shadow-[0_0_14px_rgba(200,138,88,0.2)] flex items-center justify-center text-[#F5E6D3] shrink-0 group-hover:border-[#E5A869] transition-colors">
                    <Users className="w-5 h-5 text-[#F5E6D3]" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold text-white group-hover:text-[#F5E6D3] transition-colors">
                      Join Our Community
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5 leading-snug">
                      Connect with 5,000+ students on their career journey.
                    </div>
                    {/* 5 Avatar Circles */}
                    <div className="flex items-center -space-x-2 mt-2">
                      <img
                        src="/images/avatar-1.png"
                        alt="Student"
                        className="w-6 h-6 rounded-full border-2 border-black object-cover"
                      />
                      <img
                        src="/images/avatar-2.png"
                        alt="Student"
                        className="w-6 h-6 rounded-full border-2 border-black object-cover"
                      />
                      <img
                        src="/images/avatar-3.png"
                        alt="Student"
                        className="w-6 h-6 rounded-full border-2 border-black object-cover"
                      />
                      <img
                        src="/images/avatar-4.png"
                        alt="Student"
                        className="w-6 h-6 rounded-full border-2 border-black object-cover"
                      />
                      <div className="w-6 h-6 rounded-full border-2 border-black bg-[#C88A58] flex items-center justify-center text-[9px] font-bold text-black">
                        +5k
                      </div>
                    </div>
                  </div>
                </div>

                {/* Circular Arrow Button */}
                <div className="w-10 h-10 rounded-full border border-white/15 group-hover:border-[#C88A58]/60 group-hover:bg-[#C88A58]/15 flex items-center justify-center text-zinc-400 group-hover:text-[#F5E6D3] transition-all shrink-0 ml-3">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* ── RIGHT COLUMN: SEND US A MESSAGE FORM CARD ──────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={1}
            className="lg:col-span-6"
          >
            <div className="relative rounded-[28px] sm:rounded-[34px] border border-[#C88A58]/40 bg-black/35 backdrop-blur-xl p-7 sm:p-10 md:p-11 shadow-[0_0_55px_rgba(200,138,88,0.18),0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden">
              {/* Glowing Top Flare Accent */}
              <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#E5A869]/80 to-transparent shadow-[0_0_12px_#E5A869]" />

              {/* Card Header */}
              <div className="mb-6">
                <span className="text-[11px] font-semibold tracking-[0.25em] text-[#C88A58] uppercase block mb-1.5">
                  SEND US A MESSAGE
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  We&apos;d Love to Hear From You
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Fill out the form and we&apos;ll get back to you as soon as possible.
                </p>
              </div>

              {/* Success Banner */}
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#E5A869]/15 border border-[#C88A58]/60 flex items-center justify-center text-[#E5A869] mb-4 shadow-[0_0_24px_rgba(200,138,88,0.3)]">
                    <CheckCircle2 className="w-8 h-8 text-[#E5A869]" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Message Sent Successfully!</h4>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-sm mx-auto leading-relaxed mb-6">
                    Thank you for reaching out. Your message has been sent to our team, and we will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2.5 rounded-full border border-[#C88A58]/50 bg-black/40 hover:bg-[#C88A58]/20 text-xs sm:text-sm font-semibold text-[#F5E6D3] transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Error Banner */}
                  {errorMsg && (
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Row 1: Your Name & Your Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 hover:border-white/20 focus:border-[#C88A58]/60 focus:bg-black/60 outline-none text-sm text-white placeholder:text-zinc-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                        <input
                          type="email"
                          required
                          placeholder="Your Email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 hover:border-white/20 focus:border-[#C88A58]/60 focus:bg-black/60 outline-none text-sm text-white placeholder:text-zinc-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Your Phone (Optional) & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                        <input
                          type="tel"
                          placeholder="Your Phone (Optional)"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 hover:border-white/20 focus:border-[#C88A58]/60 focus:bg-black/60 outline-none text-sm text-white placeholder:text-zinc-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Subject Dropdown */}
                    <div>
                      <div className="relative">
                        <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                        <select
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          className="w-full pl-10 pr-8 py-3 rounded-xl bg-black/40 border border-white/10 hover:border-white/20 focus:border-[#C88A58]/60 focus:bg-black/60 outline-none text-sm text-white placeholder:text-zinc-500 transition-all appearance-none cursor-pointer"
                        >
                          {SUBJECT_OPTIONS.map((opt) => (
                            <option key={opt} value={opt} className="bg-neutral-900 text-white">
                              {opt}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Message Textarea */}
                  <div>
                    <div className="relative">
                      <div className="absolute left-3.5 top-3.5 text-zinc-400 pointer-events-none">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <textarea
                        required
                        rows={4}
                        placeholder="Your Message"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 hover:border-white/20 focus:border-[#C88A58]/60 focus:bg-black/60 outline-none text-sm text-white placeholder:text-zinc-500 transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 sm:py-4 rounded-full bg-[#F5D8B8] hover:bg-[#fae4cc] text-[#121212] font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(245,216,184,0.3)] hover:shadow-[0_0_40px_rgba(245,216,184,0.5)] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#121212]" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <ArrowRight className="w-4 h-4 text-[#121212] transition-transform duration-200 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Privacy Note */}
                  <div className="flex items-center justify-center gap-2 text-xs text-zinc-400 pt-2">
                    <Lock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>We respect your privacy. Your information is safe with us.</span>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
