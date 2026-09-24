import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Play,
  Lock,
  CheckCircle2,
  Search,
  Plus,
  Video as VideoIcon,
  Eye,
  SlidersHorizontal,
  ArrowRight,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { useVideos } from "@/context/video-context";
import { useCourses } from "@/context/course-context";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { VideoPlayerModal } from "@/components/video-player-modal";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.35, ease: "easeOut" },
  }),
};

// Distinct thematic hero background for Mentor Videos (Podcast & broadcast studio setting)
const HERO_STUDIO_BG =
  "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=2000&q=80";

export default function Videos() {
  const { videos, isLoading } = useVideos();
  const { courses } = useCourses();
  const { isAdmin } = useAuth();

  const [activeCareer, setActiveCareer] = useState("all");
  const [accessFilter, setAccessFilter] = useState("all"); // "all" | "free" | "paid"
  const [search, setSearch] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Filter videos
  const filteredVideos = useMemo(() => {
    return videos.filter((v) => {
      const matchesCareer = activeCareer === "all" || v.careerId === activeCareer;
      const matchesAccess =
        accessFilter === "all" ||
        (accessFilter === "free" && !v.isPaid) ||
        (accessFilter === "paid" && v.isPaid);
      const matchesSearch =
        search.trim() === "" ||
        v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.mentor.toLowerCase().includes(search.toLowerCase()) ||
        (v.careerTitle && v.careerTitle.toLowerCase().includes(search.toLowerCase()));

      return matchesCareer && matchesAccess && matchesSearch;
    });
  }, [videos, activeCareer, accessFilter, search]);

  const freeCount = videos.filter((v) => !v.isPaid).length;
  const paidCount = videos.filter((v) => v.isPaid).length;

  return (
    <Layout>
      <div className="w-full min-h-[calc(100vh-5rem)] bg-[#0d0d0f] text-foreground -mt-20 pt-20 pb-20 -mb-20">
        {/* ── CINEMATIC HERO BANNER ───────────────────────────────── */}
        <section className="relative w-full overflow-hidden border-b border-white/5 bg-black/60">
          {/* Atmospheric Studio Photography Background */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 transform scale-105 pointer-events-none"
            style={{ backgroundImage: `url(${HERO_STUDIO_BG})` }}
          />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f] via-[#0d0d0f]/80 to-[#0d0d0f]/45 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0f]/90 via-transparent to-[#0d0d0f]/90 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12 sm:pb-16 z-10">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
              <div>
                {/* Golden Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5A855]/10 border border-[#E5A855]/25 text-[#E5A855] text-xs font-medium tracking-wide mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5A855] animate-pulse" />
                  Unfiltered Industry Insights · Real Conversations · Masterclasses
                </div>

                {/* Dual-Tone Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-[1.15]">
                  Mentor Guidance &{" "}
                  <span className="text-[#E69D43]">Video Masterclasses</span>
                </h1>

                {/* Concise Subtitle */}
                <p className="text-sm sm:text-base text-muted-foreground/90 max-w-2xl leading-relaxed">
                  Real video insights from practicing doctors, engineers, designers, founders, and consultants across India.
                  Explore free guidance talks or unlock deep-dive masterclasses.
                </p>
              </div>

              {isAdmin && (
                <div className="flex-shrink-0">
                  <Button
                    asChild
                    className="bg-[#E69D43] hover:bg-[#E69D43]/90 text-black font-semibold rounded-xl shadow-lg shadow-[#E69D43]/20"
                  >
                    <Link href="/admin/videos">
                      <Plus className="w-4 h-4 mr-2" />
                      Upload & Manage Videos
                    </Link>
                  </Button>
                </div>
              )}
            </motion.div>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-8 pt-6 border-t border-white/[0.08] text-xs text-muted-foreground">
              <span className="text-white font-medium flex items-center gap-1.5">
                <VideoIcon className="w-4 h-4 text-amber-400" />
                {videos.length} Total Sessions
              </span>
              <span className="text-white/20">•</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {freeCount} Free Talks
              </span>
              <span className="text-white/20">•</span>
              <span className="text-amber-400 font-medium flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-amber-400" />
                {paidCount} Premium Masterclasses
              </span>
            </div>
          </div>
        </section>

        {/* ── FILTER & SEARCH SECTION ────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
            {/* Access Filter Pills: All / Free / Paid */}
            <div className="flex items-center gap-2 bg-[#131316] p-1.5 rounded-xl border border-white/10">
              <button
                onClick={() => setAccessFilter("all")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  accessFilter === "all"
                    ? "bg-[#F5F0E6] text-black shadow-sm"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                All Videos ({videos.length})
              </button>
              <button
                onClick={() => setAccessFilter("free")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  accessFilter === "free"
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "text-emerald-400 hover:text-emerald-300"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Free ({freeCount})
              </button>
              <button
                onClick={() => setAccessFilter("paid")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  accessFilter === "paid"
                    ? "bg-[#E69D43] text-black shadow-sm"
                    : "text-amber-400 hover:text-amber-300"
                }`}
              >
                <Lock className="w-3.5 h-3.5" /> Paid Masterclasses ({paidCount})
              </button>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search topic or mentor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#131316] border border-white/10 rounded-xl text-xs text-white placeholder-muted-foreground focus:outline-none focus:border-[#E5A855]/60 focus:ring-1 focus:ring-[#E5A855]/60 transition-colors"
              />
            </div>
          </div>

          {/* Career Filter Pills */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="flex items-center gap-2 mb-8 pb-2 overflow-x-auto no-scrollbar"
          >
            <button
              onClick={() => setActiveCareer("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs transition-all whitespace-nowrap border ${
                activeCareer === "all"
                  ? "bg-[#F5F0E6] text-black border-[#F5F0E6] font-semibold shadow-sm"
                  : "bg-[#131316] text-muted-foreground border-white/10 hover:border-white/25 hover:text-white"
              }`}
            >
              All Careers
            </button>
            {courses.map((career) => (
              <button
                key={career.id}
                onClick={() => setActiveCareer(career.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs transition-all whitespace-nowrap border ${
                  activeCareer === career.id
                    ? "bg-[#F5F0E6] text-black border-[#F5F0E6] font-semibold shadow-sm"
                    : "bg-[#131316] text-muted-foreground border-white/10 hover:border-white/25 hover:text-white"
                }`}
              >
                {career.title}
              </button>
            ))}
          </motion.div>

          {/* ── VIDEO GRID ────────────────────────────────────────── */}
          <motion.div
            key={`${activeCareer}-${accessFilter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {filteredVideos.map((slot, i) => {
              return (
                <motion.div
                  key={slot._id || slot.id || i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  onClick={() => setSelectedVideo(slot)}
                  className="group relative flex flex-col justify-between h-full bg-[#131316] border border-white/10 hover:border-white/25 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/70 cursor-pointer"
                >
                  <div>
                    {/* Thumbnail Area */}
                    <div className="relative aspect-video overflow-hidden bg-black/40">
                      <img
                        src={slot.thumbnail}
                        alt={slot.title}
                        loading="lazy"
                        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />

                      {/* Subtle Dark Vignette on Thumbnail */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#131316] via-transparent to-black/40 opacity-70 pointer-events-none" />

                      {/* Centered Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E69D43] group-hover:border-[#E69D43] transition-all duration-300 shadow-xl">
                          <Play
                            className="w-4 h-4 text-white ml-0.5 group-hover:text-black transition-colors"
                            fill="currentColor"
                          />
                        </div>
                      </div>

                      {/* Duration Badge */}
                      {slot.duration && (
                        <div className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-sm text-white text-[11px] px-2 py-0.5 rounded-md font-mono border border-white/10">
                          {slot.duration}
                        </div>
                      )}

                      {/* Category Tag on top-left */}
                      {slot.tag && (
                        <div className="absolute top-2.5 left-2.5 text-[11px] px-2.5 py-0.5 rounded-full border bg-black/70 backdrop-blur-md text-white/90 border-white/20 font-medium">
                          {slot.tag}
                        </div>
                      )}

                      {/* Free vs Paid Badge on top-right */}
                      <div className="absolute top-2.5 right-2.5">
                        {slot.isPaid ? (
                          <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-[#E69D43] text-black font-bold shadow-md shadow-[#E69D43]/20">
                            <Lock className="w-3 h-3" /> {slot.price || "₹299"}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-bold shadow-md shadow-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3" /> FREE
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-5">
                      <h3 className="font-bold text-white text-base leading-snug mb-2.5 group-hover:text-amber-200 transition-colors line-clamp-2 min-h-[2.6rem]">
                        {slot.title}
                      </h3>

                      {/* Mentor Profile */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center text-xs font-bold text-amber-300 flex-shrink-0">
                          {slot.mentor
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2) || "M"}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white truncate">
                            {slot.mentor}
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate">
                            {slot.mentorRole}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Career path & View count */}
                  <div className="px-5 py-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-muted-foreground mt-auto">
                    <span className="text-[11px] font-medium text-amber-300/90 truncate max-w-[170px]">
                      {slot.careerTitle || slot.careerId}
                    </span>
                    <span className="text-[11px] text-white/50 flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {slot.views || "1.2K"} views
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-20 bg-[#131316] border border-dashed border-white/10 rounded-2xl p-8 mt-6">
              <VideoIcon className="w-10 h-10 mx-auto mb-3 opacity-30 text-amber-400" />
              <p className="text-base text-white/90 font-medium">No videos found matching your selected filters</p>
              <p className="text-xs text-muted-foreground mt-1">Try another search term or reset active filters</p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCareer("all");
                  setAccessFilter("all");
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>

        {/* Video Player / Paid Unlock Modal */}
        <VideoPlayerModal
          video={selectedVideo}
          isOpen={Boolean(selectedVideo)}
          onClose={() => setSelectedVideo(null)}
        />
      </div>
    </Layout>
  );
}

