import { useState } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { useVideos } from "@/context/video-context";
import { useCourses } from "@/context/course-context";
import {
  Video as VideoIcon,
  Plus,
  Search,
  Trash2,
  Edit2,
  Lock,
  CheckCircle2,
  ExternalLink,
  ArrowLeft,
  DollarSign,
  Play,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VideoManager() {
  const { videos, addVideo, updateVideo, deleteVideo } = useVideos();
  const { courses } = useCourses();

  const [search, setSearch] = useState("");
  const [filterCareer, setFilterCareer] = useState("all");
  const [filterTier, setFilterTier] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    title: "",
    mentor: "",
    mentorRole: "",
    careerId: courses[0]?.id || "engineer",
    careerTitle: courses[0]?.title || "Software Engineer",
    videoUrl: "",
    thumbnail: "",
    duration: "25:00",
    tag: "Reality Check",
    isPaid: false,
    price: "Free",
    description: "",
  };

  const [formData, setFormData] = useState(initialForm);

  // Filtered videos
  const filteredVideos = videos.filter((v) => {
    const matchesSearch =
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.mentor.toLowerCase().includes(search.toLowerCase());
    const matchesCareer = filterCareer === "all" || v.careerId === filterCareer;
    const matchesTier =
      filterTier === "all" ||
      (filterTier === "paid" && v.isPaid) ||
      (filterTier === "free" && !v.isPaid);

    return matchesSearch && matchesCareer && matchesTier;
  });

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (v) => {
    setEditingId(v._id || v.id);
    setFormData({
      title: v.title,
      mentor: v.mentor,
      mentorRole: v.mentorRole || "",
      careerId: v.careerId,
      careerTitle: v.careerTitle || "",
      videoUrl: v.videoUrl,
      thumbnail: v.thumbnail || "",
      duration: v.duration || "25:00",
      tag: v.tag || "Reality Check",
      isPaid: Boolean(v.isPaid),
      price: v.isPaid ? (v.price || "₹299") : "Free",
      description: v.description || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedCourse = courses.find((c) => c.id === formData.careerId);
    const payload = {
      ...formData,
      careerTitle: selectedCourse ? selectedCourse.title : formData.careerTitle,
      price: formData.isPaid ? (formData.price || "₹299") : "Free",
    };

    if (editingId) {
      await updateVideo(editingId, payload);
    } else {
      await addVideo(payload);
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      await deleteVideo(id);
    }
  };

  const totalVideos = videos.length;
  const paidCount = videos.filter((v) => v.isPaid).length;
  const freeCount = totalVideos - paidCount;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center text-xs text-muted-foreground hover:text-white mb-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Admin Console
            </Link>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                <VideoIcon className="w-5 h-5" />
              </span>
              Mentor Video Manager
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Upload, edit, and categorize guidance videos & paid masterclasses across all career paths.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleOpenNew}
              className="bg-primary text-primary-foreground font-semibold rounded-xl"
            >
              <Plus className="w-4 h-4 mr-2" /> Upload Video
            </Button>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Total Videos
            </p>
            <p className="text-3xl font-bold text-white mt-1">{totalVideos}</p>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
            <p className="text-xs text-emerald-400 font-medium uppercase tracking-wider">
              Free Guidance Videos
            </p>
            <p className="text-3xl font-bold text-emerald-300 mt-1">{freeCount}</p>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5">
            <p className="text-xs text-amber-400 font-medium uppercase tracking-wider">
              Paid Masterclasses
            </p>
            <p className="text-3xl font-bold text-amber-300 mt-1">{paidCount}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card p-4 rounded-2xl border border-white/10 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search title or mentor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background/50 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              value={filterCareer}
              onChange={(e) => setFilterCareer(e.target.value)}
              className="bg-background border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="all">All Careers</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>

            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              className="bg-background border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="all">All Access Tiers</option>
              <option value="free">Free Only</option>
              <option value="paid">Paid / Premium Only</option>
            </select>
          </div>
        </div>

        {/* Video Table */}
        <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 border-b border-white/10 text-xs text-muted-foreground uppercase font-medium">
                <tr>
                  <th className="px-5 py-4">Video & Title</th>
                  <th className="px-5 py-4">Mentor</th>
                  <th className="px-5 py-4">Career</th>
                  <th className="px-5 py-4">Access & Pricing</th>
                  <th className="px-5 py-4">Duration & Tag</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredVideos.map((v) => (
                  <tr key={v._id || v.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3 max-w-sm">
                        <div className="relative w-16 h-10 rounded-lg overflow-hidden bg-black/40 flex-shrink-0 border border-white/10">
                          <img
                            src={v.thumbnail}
                            alt=""
                            className="w-full h-full object-cover opacity-80"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Play className="w-3.5 h-3.5 text-white" />
                          </div>
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-white truncate">{v.title}</p>
                          <a
                            href={v.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-primary hover:underline inline-flex items-center gap-1"
                          >
                            Watch Link <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-white font-medium">{v.mentor}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[160px]">
                        {v.mentorRole}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/90">
                        {v.careerTitle || v.careerId}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {v.isPaid ? (
                        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25 font-semibold">
                          <Lock className="w-3 h-3" /> Paid ({v.price || "₹299"})
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                          <CheckCircle2 className="w-3 h-3" /> Free
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-xs text-white/80 font-mono">{v.duration}</p>
                      <p className="text-[11px] text-muted-foreground">{v.tag}</p>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(v)}
                          title="Edit Video"
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(v._id || v.id)}
                          title="Delete Video"
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredVideos.length === 0 && (
            <div className="py-16 text-center text-muted-foreground text-sm">
              No videos found matching your filters.
            </div>
          )}
        </div>
      </div>

      {/* ── ADD / EDIT VIDEO MODAL ────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#141416] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl my-8">
            <h2 className="text-2xl font-bold text-white mb-1">
              {editingId ? "Edit Video Details" : "Upload New Mentor Video"}
            </h2>
            <p className="text-xs text-muted-foreground mb-6">
              Configure video metadata, target career roadmap, and Free vs Paid access pricing.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white/90 mb-1">
                  Video Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Day in the Life of a Senior AI Engineer"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2.5 bg-background border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/90 mb-1">
                    Mentor / Speaker Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Priya Sharma"
                    value={formData.mentor}
                    onChange={(e) => setFormData({ ...formData, mentor: e.target.value })}
                    className="w-full px-3 py-2.5 bg-background border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/90 mb-1">
                    Mentor Role & Credentials
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Staff Engineer @ Google"
                    value={formData.mentorRole}
                    onChange={(e) => setFormData({ ...formData, mentorRole: e.target.value })}
                    className="w-full px-3 py-2.5 bg-background border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/90 mb-1">
                    Associated Career Roadmap *
                  </label>
                  <select
                    value={formData.careerId}
                    onChange={(e) => setFormData({ ...formData, careerId: e.target.value })}
                    className="w-full px-3 py-2.5 bg-background border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/90 mb-1">
                    Category Tag
                  </label>
                  <select
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full px-3 py-2.5 bg-background border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Reality Check">Reality Check</option>
                    <option value="Day in Life">Day in Life</option>
                    <option value="Career Strategy">Career Strategy</option>
                    <option value="Success Story">Success Story</option>
                    <option value="Masterclass">Masterclass</option>
                    <option value="Career Comparison">Career Comparison</option>
                    <option value="Income & Monetization">Income & Monetization</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/90 mb-1">
                    Video URL (YouTube or Direct Link) *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    className="w-full px-3 py-2.5 bg-background border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/90 mb-1">
                    Video Duration
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 35:20"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3 py-2.5 bg-background border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/90 mb-1">
                  Thumbnail Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full px-3 py-2.5 bg-background border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* ── ACCESS TIER: FREE VS PAID ───────────────────────────────── */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <label className="block text-xs font-semibold text-white">
                  Access Pricing & Monetization
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isPaid: false, price: "Free" })}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                      !formData.isPaid
                        ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400 shadow-sm"
                        : "border-white/10 bg-background/50 text-muted-foreground hover:text-white"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" /> Free to Watch
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        isPaid: true,
                        price: formData.price === "Free" ? "₹299" : formData.price,
                      })
                    }
                    className={`py-2.5 px-4 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                      formData.isPaid
                        ? "border-amber-500/40 bg-amber-500/15 text-amber-400 shadow-sm"
                        : "border-white/10 bg-background/50 text-muted-foreground hover:text-white"
                    }`}
                  >
                    <Lock className="w-4 h-4" /> Paid Masterclass
                  </button>
                </div>

                {formData.isPaid && (
                  <div className="pt-2">
                    <label className="block text-xs font-medium text-amber-300 mb-1">
                      Session Access Price (INR)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹299, ₹499"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-3 py-2 bg-background border border-amber-500/30 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <p className="text-[11px] text-muted-foreground mt-1">
                      Students will be prompted to unlock access for this masterclass.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="border-white/10 text-muted-foreground"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground font-semibold px-6"
                >
                  {editingId ? "Save Changes" : "Create Video"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
