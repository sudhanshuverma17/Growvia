import { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout";
import { useCourses } from "@/context/course-context";
import { useVideos } from "@/context/video-context";
import { CareerIcon } from "@/components/career-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiUrl } from "@/lib/api-config";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ExternalLink,
  BookOpen,
  Milestone,
  LayoutDashboard,
  Layers,
  ArrowRight,
  TrendingUp,
  SlidersHorizontal,
  GraduationCap,
  Video as VideoIcon,
  Mail,
  CheckCircle2,
  Clock,
  RefreshCw,
  X,
  Phone,
  Send,
  Eye,
  MessageSquare,
  User,
  Inbox,
  Calendar,
  AlertCircle,
} from "lucide-react";

export default function AdminDashboard() {
  const { courses, deleteCourse } = useCourses();
  const { videos } = useVideos();
  const [, setLocation] = useLocation();

  // Tab State: "courses" | "messages"
  const [activeTab, setActiveTab] = useState("courses");

  // Courses Search & Filter State
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Messages State
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [messageSearch, setMessageSearch] = useState("");
  const [messageStatusFilter, setMessageStatusFilter] = useState("All");
  const [activeMessageModal, setActiveMessageModal] = useState(null);

  // Fetch messages from backend
  const fetchMessages = async () => {
    setLoadingMessages(true);
    try {
      const token = localStorage.getItem("growvia_token");
      const res = await fetch(apiUrl("/api/contact"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (err) {
      console.warn("Could not load contact messages:", err);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("growvia_token");
      const res = await fetch(apiUrl(`/api/contact/${id}/status`), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (String(m._id) === String(id) ? { ...m, status: newStatus } : m))
        );
        if (activeMessageModal && String(activeMessageModal._id) === String(id)) {
          setActiveMessageModal((prev) => ({ ...prev, status: newStatus }));
        }
        // Update unread count dynamically
        setUnreadCount((prev) =>
          newStatus === "unread" ? prev + 1 : Math.max(0, prev - 1)
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDeleteMessage = async (id, senderName) => {
    if (!window.confirm(`Are you sure you want to delete message from "${senderName}"?`)) return;
    try {
      const token = localStorage.getItem("growvia_token");
      const res = await fetch(apiUrl(`/api/contact/${id}`), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => String(m._id) !== String(id)));
        if (activeMessageModal && String(activeMessageModal._id) === String(id)) {
          setActiveMessageModal(null);
        }
      }
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  // Filtered Messages
  const filteredMessages = useMemo(() => {
    return messages.filter((m) => {
      const s = messageSearch.toLowerCase();
      const matchesSearch =
        !s ||
        m.name?.toLowerCase().includes(s) ||
        m.email?.toLowerCase().includes(s) ||
        m.subject?.toLowerCase().includes(s) ||
        m.message?.toLowerCase().includes(s) ||
        m.phone?.toLowerCase().includes(s);

      const matchesStatus =
        messageStatusFilter === "All" || m.status === messageStatusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [messages, messageSearch, messageStatusFilter]);

  // Extract unique categories for courses
  const categories = useMemo(() => {
    const set = new Set(["All"]);
    courses.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return Array.from(set);
  }, [courses]);

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchesSearch =
        search.trim() === "" ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase()) ||
        (c.description && c.description.toLowerCase().includes(search.toLowerCase()));

      const matchesCat =
        selectedCategory === "All" || c.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [courses, search, selectedCategory]);

  // Statistics for courses
  const stats = useMemo(() => {
    const totalRoadmaps = courses.reduce(
      (acc, c) => acc + (c.timeline?.length || 0),
      0
    );
    const customCount = courses.filter((c) => c.isCustom).length;
    return {
      totalCourses: courses.length,
      totalStages: totalRoadmaps,
      totalCategories: categories.length - 1,
      customCount,
      totalVideos: videos.length,
      paidVideos: videos.filter((v) => v.isPaid).length,
    };
  }, [courses, categories, videos]);

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteCourse(id);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const d = new Date(isoString);
    return d.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-primary text-xs font-semibold tracking-wider uppercase mb-1">
              <LayoutDashboard className="w-4 h-4" /> Admin Console
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-display text-white">
              {activeTab === "courses" ? "Course & Roadmap Management" : "Student Messages & Inquiries"}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {activeTab === "courses"
                ? "Add new courses, edit learning paths, and build detailed career roadmaps."
                : "View and respond to inquiries sent by students through the Contact Us page."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 text-xs font-semibold rounded-xl h-10 px-4"
            >
              <Link href="/admin/videos">
                <VideoIcon className="w-4 h-4 mr-2" />
                Manage Videos ({videos.length})
              </Link>
            </Button>

            {activeTab === "courses" ? (
              <Button
                onClick={() => setLocation("/admin/courses/new")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-sm shadow-lg shadow-primary/20 rounded-xl h-10"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Course
              </Button>
            ) : (
              <Button
                onClick={fetchMessages}
                variant="outline"
                className="border-white/15 hover:bg-white/10 text-white font-semibold text-sm rounded-xl h-10 gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${loadingMessages ? "animate-spin" : ""}`} />
                Refresh Messages
              </Button>
            )}
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 w-fit my-6">
          <button
            onClick={() => setActiveTab("courses")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "courses"
                ? "bg-[#C88A58]/25 text-[#F5E6D3] border border-[#C88A58]/60 shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Courses & Roadmaps ({courses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("messages")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "messages"
                ? "bg-[#C88A58]/25 text-[#F5E6D3] border border-[#C88A58]/60 shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Student Inquiries</span>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E5A869] text-black shadow-sm animate-pulse">
                {unreadCount} NEW
              </span>
            )}
          </button>
        </div>

        {/* ═══════════ TAB 1: COURSES & ROADMAPS ═══════════ */}
        {activeTab === "courses" && (
          <>
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-card border border-white/10 rounded-2xl p-5">
                <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-primary" /> Total Courses
                </div>
                <div className="text-3xl font-bold font-display text-white">
                  {stats.totalCourses}
                </div>
              </div>

              <div className="bg-card border border-white/10 rounded-2xl p-5">
                <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Milestone className="w-3.5 h-3.5 text-sky-400" /> Roadmap Stages
                </div>
                <div className="text-3xl font-bold font-display text-white">
                  {stats.totalStages}
                </div>
              </div>

              <div className="bg-card border border-white/10 rounded-2xl p-5">
                <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" /> Categories
                </div>
                <div className="text-3xl font-bold font-display text-white">
                  {stats.totalCategories}
                </div>
              </div>

              <div className="bg-card border border-white/10 rounded-2xl p-5">
                <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> Custom / Edited
                </div>
                <div className="text-3xl font-bold font-display text-white">
                  {stats.customCount}
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search courses, skills, categories..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 bg-card border-white/10 text-white placeholder:text-muted-foreground"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                <span className="text-xs text-muted-foreground flex items-center gap-1 whitespace-nowrap">
                  <SlidersHorizontal className="w-3 h-3" /> Category:
                </span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-card border border-white/10 text-white text-xs rounded-lg px-3 py-2 outline-none focus:border-primary/50"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-neutral-900 text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Courses Table */}
            <div className="bg-card border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 border-b border-white/10 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <tr>
                      <th className="py-4 px-6">Course</th>
                      <th className="py-4 px-4">Category</th>
                      <th className="py-4 px-4">Roadmap & Courses</th>
                      <th className="py-4 px-4">Salary Bracket</th>
                      <th className="py-4 px-4">Demand</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredCourses.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-muted-foreground">
                          No courses match your search criteria.
                          <div className="mt-3">
                            <Button
                              variant="link"
                              onClick={() => {
                                setSearch("");
                                setSelectedCategory("All");
                              }}
                              className="text-primary text-xs"
                            >
                              Clear search & filters
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredCourses.map((course) => {
                        const stageCount = course.timeline?.length || 0;
                        return (
                          <tr
                            key={course.id}
                            className="hover:bg-white/[0.02] transition-colors group"
                          >
                            {/* Course Info */}
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-105 transition-transform">
                                  <CareerIcon icon={course.icon} size={18} />
                                </div>
                                <div>
                                  <div className="font-semibold text-white flex items-center gap-2">
                                    {course.title}
                                    {course.isCustom && (
                                      <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">
                                        NEW
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-xs text-muted-foreground font-mono">
                                    /{course.id}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Category */}
                            <td className="py-4 px-4 text-white/80">
                              <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
                                {course.category || "General"}
                              </span>
                            </td>

                            {/* Roadmap Stages */}
                            <td className="py-4 px-4 text-white/80">
                              <span className="text-xs text-white/90">
                                {stageCount} stages
                              </span>
                            </td>

                            {/* Salary */}
                            <td className="py-4 px-4 text-white/80 font-mono text-xs">
                              {course.stats?.avgSalary || "₹ 4L - ₹25L+"}
                            </td>

                            {/* Demand */}
                            <td className="py-4 px-4">
                              <span
                                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                                  course.stats?.demand === "Very High"
                                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                    : course.stats?.demand === "High"
                                    ? "bg-sky-500/15 text-sky-400 border border-sky-500/30"
                                    : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                                }`}
                              >
                                {course.stats?.demand || "Medium"}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Link
                                  href={`/roadmaps/${course.id}`}
                                  target="_blank"
                                  className="p-2 rounded-lg text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
                                  title="View live public roadmap"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </Link>

                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    setLocation(`/admin/courses/${course.id}/edit`)
                                  }
                                  className="border-white/15 text-xs h-8 px-3 hover:bg-white/10 hover:text-white"
                                >
                                  <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
                                </Button>

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDelete(course.id, course.title)}
                                  className="text-destructive hover:text-destructive hover:bg-destructive/15 h-8 w-8 p-0"
                                  title="Delete Course"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              <div className="bg-white/[0.02] border-t border-white/5 px-6 py-3 text-xs text-muted-foreground flex justify-between items-center">
                <span>
                  Showing {filteredCourses.length} of {courses.length} courses
                </span>
                <span className="text-white/60">
                  Changes persist in your database & browser.
                </span>
              </div>
            </div>
          </>
        )}

        {/* ═══════════ TAB 2: STUDENT MESSAGES & INQUIRIES ═══════════ */}
        {activeTab === "messages" && (
          <div>
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-card border border-white/10 rounded-2xl p-5">
                <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Inbox className="w-3.5 h-3.5 text-primary" /> Total Inquiries
                </div>
                <div className="text-3xl font-bold font-display text-white">
                  {messages.length}
                </div>
              </div>

              <div className="bg-card border border-[#E5A869]/30 bg-[#E5A869]/[0.03] rounded-2xl p-5 shadow-[0_0_20px_rgba(229,168,105,0.08)]">
                <div className="text-[#E5A869] text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#E5A869]" /> Unread Messages
                </div>
                <div className="text-3xl font-bold font-display text-[#F5E6D3]">
                  {unreadCount}
                </div>
              </div>

              <div className="bg-card border border-white/10 rounded-2xl p-5">
                <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Replied Inquiries
                </div>
                <div className="text-3xl font-bold font-display text-white">
                  {messages.filter((m) => m.status === "replied").length}
                </div>
              </div>

              <div className="bg-card border border-white/10 rounded-2xl p-5">
                <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-sky-400" /> Unique Senders
                </div>
                <div className="text-3xl font-bold font-display text-white">
                  {new Set(messages.map((m) => m.email?.toLowerCase())).size}
                </div>
              </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search sender, email, subject, message..."
                  value={messageSearch}
                  onChange={(e) => setMessageSearch(e.target.value)}
                  className="pl-9 bg-card border-white/10 text-white placeholder:text-muted-foreground"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                <span className="text-xs text-muted-foreground flex items-center gap-1 whitespace-nowrap">
                  <SlidersHorizontal className="w-3 h-3" /> Status:
                </span>
                <select
                  value={messageStatusFilter}
                  onChange={(e) => setMessageStatusFilter(e.target.value)}
                  className="bg-card border border-white/10 text-white text-xs rounded-lg px-3 py-2 outline-none focus:border-primary/50"
                >
                  <option value="All" className="bg-neutral-900 text-white">All Inquiries</option>
                  <option value="unread" className="bg-neutral-900 text-white">Unread Only</option>
                  <option value="read" className="bg-neutral-900 text-white">Read</option>
                  <option value="replied" className="bg-neutral-900 text-white">Replied</option>
                </select>
              </div>
            </div>

            {/* Messages List Table */}
            <div className="bg-card border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 border-b border-white/10 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <tr>
                      <th className="py-4 px-6">Sender</th>
                      <th className="py-4 px-4">Subject</th>
                      <th className="py-4 px-4">Message Preview</th>
                      <th className="py-4 px-4">Received</th>
                      <th className="py-4 px-4">Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredMessages.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-16 text-center text-muted-foreground">
                          <Inbox className="w-10 h-10 mx-auto mb-3 opacity-30 text-white" />
                          <div className="text-base font-semibold text-white/90">No inquiries found</div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {messageSearch
                              ? "No messages match your search filter."
                              : "When students submit the Contact form, their inquiries appear here."}
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredMessages.map((msg) => {
                        const isUnread = msg.status === "unread";
                        return (
                          <tr
                            key={msg._id}
                            className={`hover:bg-white/[0.03] transition-colors group cursor-pointer ${
                              isUnread ? "bg-[#C88A58]/[0.04]" : ""
                            }`}
                            onClick={() => {
                              setActiveMessageModal(msg);
                              if (isUnread) {
                                handleUpdateStatus(msg._id, "read");
                              }
                            }}
                          >
                            {/* Sender Info */}
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-black/60 border border-[#C88A58]/40 flex items-center justify-center text-sm font-bold text-[#F5E6D3] shrink-0">
                                  {msg.name?.charAt(0)?.toUpperCase() || "S"}
                                </div>
                                <div>
                                  <div className="font-semibold text-white flex items-center gap-2">
                                    {msg.name}
                                    {isUnread && (
                                      <span className="w-2 h-2 rounded-full bg-[#E5A869] shadow-[0_0_6px_#E5A869]" />
                                    )}
                                  </div>
                                  <div className="text-xs text-muted-foreground font-mono">
                                    {msg.email}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Subject */}
                            <td className="py-4 px-4">
                              <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/90 font-medium">
                                {msg.subject}
                              </span>
                            </td>

                            {/* Message Preview */}
                            <td className="py-4 px-4 max-w-xs">
                              <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                                {msg.message}
                              </p>
                            </td>

                            {/* Date */}
                            <td className="py-4 px-4 text-xs text-zinc-400 whitespace-nowrap">
                              {formatDate(msg.createdAt)}
                            </td>

                            {/* Status */}
                            <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                              <select
                                value={msg.status}
                                onChange={(e) => handleUpdateStatus(msg._id, e.target.value)}
                                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border outline-none bg-neutral-900 cursor-pointer ${
                                  msg.status === "unread"
                                    ? "bg-[#E5A869]/15 text-[#E5A869] border-[#E5A869]/40"
                                    : msg.status === "replied"
                                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/40"
                                    : "bg-white/5 text-zinc-400 border-white/10"
                                }`}
                              >
                                <option value="unread" className="bg-neutral-900 text-[#E5A869]">Unread</option>
                                <option value="read" className="bg-neutral-900 text-zinc-300">Read</option>
                                <option value="replied" className="bg-neutral-900 text-emerald-400">Replied</option>
                              </select>
                            </td>

                            {/* Actions */}
                            <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-2">
                                {/* Reply via Email */}
                                <a
                                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                                  className="p-2 rounded-lg text-muted-foreground hover:text-[#E5A869] hover:bg-white/10 transition-colors"
                                  title="Reply via Email"
                                  onClick={() => handleUpdateStatus(msg._id, "replied")}
                                >
                                  <Send className="w-4 h-4" />
                                </a>

                                {/* View details */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveMessageModal(msg);
                                    if (isUnread) handleUpdateStatus(msg._id, "read");
                                  }}
                                  className="p-2 rounded-lg text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
                                  title="View Full Message"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>

                                {/* Delete */}
                                <button
                                  type="button"
                                  onClick={() => handleDeleteMessage(msg._id, msg.name)}
                                  className="p-2 rounded-lg text-destructive hover:text-destructive hover:bg-destructive/15 transition-colors"
                                  title="Delete Message"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              <div className="bg-white/[0.02] border-t border-white/5 px-6 py-3 text-xs text-muted-foreground flex justify-between items-center">
                <span>
                  Showing {filteredMessages.length} of {messages.length} inquiries
                </span>
                <span className="text-white/60">
                  Click any message row to view full details and respond.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════ MESSAGE DETAIL MODAL ═══════════ */}
        <AnimatePresence>
          {activeMessageModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-2xl rounded-[28px] border border-[#C88A58]/50 bg-[#0e1017] p-6 sm:p-8 shadow-[0_0_50px_rgba(200,138,88,0.25)] overflow-hidden"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setActiveMessageModal(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="flex items-start gap-4 mb-6 pr-8">
                  <div className="w-12 h-12 rounded-full bg-black/60 border border-[#C88A58]/50 flex items-center justify-center text-lg font-bold text-[#F5E6D3] shrink-0">
                    {activeMessageModal.name?.charAt(0)?.toUpperCase() || "S"}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {activeMessageModal.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 mt-1">
                      <span className="text-[#E5A869] font-medium">{activeMessageModal.email}</span>
                      {activeMessageModal.phone && (
                        <>
                          <span>•</span>
                          <span className="text-zinc-300">{activeMessageModal.phone}</span>
                        </>
                      )}
                      <span>•</span>
                      <span>{formatDate(activeMessageModal.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Subject Banner */}
                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                      Subject:
                    </span>
                    <span className="text-sm font-bold text-white">
                      {activeMessageModal.subject}
                    </span>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                      activeMessageModal.status === "unread"
                        ? "bg-[#E5A869]/20 text-[#E5A869]"
                        : activeMessageModal.status === "replied"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-white/10 text-zinc-300"
                    }`}
                  >
                    {activeMessageModal.status.toUpperCase()}
                  </span>
                </div>

                {/* Message Body */}
                <div className="mb-6">
                  <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold mb-2">
                    Message:
                  </div>
                  <div className="p-5 rounded-2xl bg-black/60 border border-white/10 text-sm text-zinc-200 leading-relaxed max-h-64 overflow-y-auto whitespace-pre-wrap select-text">
                    {activeMessageModal.message}
                  </div>
                </div>

                {/* Action Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400">Set Status:</span>
                    <select
                      value={activeMessageModal.status}
                      onChange={(e) => handleUpdateStatus(activeMessageModal._id, e.target.value)}
                      className="bg-neutral-900 border border-white/15 text-xs text-white rounded-lg px-2.5 py-1.5 outline-none"
                    >
                      <option value="unread">Unread</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleDeleteMessage(activeMessageModal._id, activeMessageModal.name)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-colors cursor-pointer"
                    >
                      Delete
                    </button>

                    <a
                      href={`mailto:${activeMessageModal.email}?subject=Re: ${encodeURIComponent(activeMessageModal.subject)}`}
                      onClick={() => handleUpdateStatus(activeMessageModal._id, "replied")}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5D8B8] hover:bg-[#fae4cc] text-[#121212] font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 text-[#121212]" />
                      <span>Reply via Email</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
