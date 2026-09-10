import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Play, Lock, CheckCircle2, Search, Plus, Sparkles, Video as VideoIcon } from "lucide-react";
import { Layout } from "@/components/layout";
import { useVideos } from "@/context/video-context";
import { useCourses } from "@/context/course-context";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { VideoPlayerModal } from "@/components/video-player-modal";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" },
  }),
};

export default function Videos() {
  const { videos, isLoading } = useVideos();
  const { courses } = useCourses();
  const { isAdmin } = useAuth();

  const [activeCareer, setActiveCareer] = useState("all");
  const [accessFilter, setAccessFilter] = useState("all"); // "all" | "free" | "paid"
  const [search, setSearch] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Filter videos
  const filteredVideos = videos.filter((v) => {
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

  const freeCount = videos.filter((v) => !v.isPaid).length;
  const paidCount = videos.filter((v) => v.isPaid).length;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-muted-foreground mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Real Conversations. No Filters. Free & Paid Masterclasses.
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Mentor <span className="text-gradient-primary">Guidance & Video Talks</span>
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
              Unfiltered video insights from practicing doctors, engineers, designers, founders, and consultants.
              Explore free guidance talks or unlock deep-dive masterclasses.
            </p>
          </div>

          {isAdmin && (
            <div className="flex-shrink-0">
              <Button
                asChild
                className="bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg shadow-primary/20"
              >
                <Link href="/admin/videos">
                  <Plus className="w-4 h-4 mr-2" />
                  Upload & Manage Videos
                </Link>
              </Button>
            </div>
          )}
        </motion.div>

        {/* Filter Controls Row */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
          {/* Access Filter Pills: All / Free / Paid */}
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setAccessFilter("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                accessFilter === "all"
                  ? "bg-primary text-primary-foreground shadow-sm"
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
                  ? "bg-amber-500 text-black shadow-sm"
                  : "text-amber-400 hover:text-amber-300"
              }`}
            >
              <Lock className="w-3.5 h-3.5" /> Paid Masterclasses ({paidCount})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topic or speaker..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Career Filter Pills */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="flex flex-wrap gap-2 mb-10 pb-2 overflow-x-auto"
        >
          <button
            onClick={() => setActiveCareer("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
              activeCareer === "all"
                ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20 font-semibold"
                : "bg-white/5 text-muted-foreground border-white/10 hover:border-white/30 hover:text-white"
            }`}
          >
            All Careers
          </button>
          {courses.map((career) => (
            <button
              key={career.id}
              onClick={() => setActiveCareer(career.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                activeCareer === career.id
                  ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20 font-semibold"
                  : "bg-white/5 text-muted-foreground border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              {career.title}
            </button>
          ))}
        </motion.div>

        {/* Video Grid */}
        <motion.div
          key={`${activeCareer}-${accessFilter}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                className="group rounded-2xl overflow-hidden border border-white/10 bg-card hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail area */}
                  <div className="relative aspect-video overflow-hidden bg-white/[0.025]">
                    <img
                      src={slot.thumbnail}
                      alt={slot.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
                    />

                    {/* Centered Play Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-13 h-13 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-all duration-300 shadow-xl">
                        <Play
                          className="w-5 h-5 text-white ml-0.5 group-hover:text-primary-foreground"
                          fill="currentColor"
                        />
                      </div>
                    </div>

                    {/* Duration badge */}
                    {slot.duration && (
                      <div className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[11px] px-2 py-0.5 rounded-md font-mono">
                        {slot.duration}
                      </div>
                    )}

                    {/* Category Tag on top-left */}
                    {slot.tag && (
                      <div className="absolute top-2.5 left-2.5 text-[11px] px-2.5 py-0.5 rounded-full border bg-black/60 backdrop-blur-sm text-white/90 border-white/20 font-medium">
                        {slot.tag}
                      </div>
                    )}

                    {/* Free vs Paid Badge on top-right */}
                    <div className="absolute top-2.5 right-2.5">
                      {slot.isPaid ? (
                        <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/90 text-black font-bold shadow-md shadow-amber-500/20">
                          <Lock className="w-3 h-3" /> {slot.price || "₹299"}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/90 text-white font-bold shadow-md shadow-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" /> FREE
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content area */}
                  <div className="p-5">
                    <h3 className="font-bold text-white text-base leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {slot.title}
                    </h3>

                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
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
                <div className="px-5 pb-4 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="text-[11px] font-medium text-primary/90">
                    {slot.careerTitle || slot.careerId}
                  </span>
                  <span className="text-[11px] text-white/50">{slot.views || "1.2K"} views</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-20 text-muted-foreground text-sm">
            <VideoIcon className="w-10 h-10 mx-auto mb-3 opacity-30" />
            No videos found matching your selected filters.
          </div>
        )}
      </div>

      {/* Video Player / Paid Unlock Modal */}
      <VideoPlayerModal
        video={selectedVideo}
        isOpen={Boolean(selectedVideo)}
        onClose={() => setSelectedVideo(null)}
      />
    </Layout>
  );
}
