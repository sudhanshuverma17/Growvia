import { useState, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { useCourses } from "@/context/course-context";
import { useVideos } from "@/context/video-context";
import { CareerIcon } from "@/components/career-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ExternalLink,
  BookOpen,
  Milestone,
  Sparkles,
  Layers,
  ArrowRight,
  TrendingUp,
  SlidersHorizontal,
  GraduationCap,
  Video as VideoIcon,
} from "lucide-react";

export default function AdminDashboard() {
  const { courses, deleteCourse } = useCourses();
  const { videos } = useVideos();
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Extract unique categories
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

  // Statistics
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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-primary text-xs font-semibold tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4" /> Admin Console
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-display text-white">
              Course & Roadmap Management
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Add new courses, edit learning paths, and build detailed career roadmaps.
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

            <Button
              onClick={() => setLocation("/admin/courses/new")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-sm shadow-lg shadow-primary/20 rounded-xl h-10"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Course
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
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
                                /roadmaps/{course.id}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-4">
                          <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/80">
                            {course.category}
                          </span>
                        </td>

                        {/* Roadmap Stages & Courses */}
                        <td className="py-4 px-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5">
                              <Milestone className="w-3.5 h-3.5 text-primary" />
                              <span className="font-semibold text-white">
                                {stageCount}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {stageCount === 1 ? "stage" : "stages"}
                              </span>
                            </div>
                            {course.courses && course.courses.length > 0 ? (
                              <div className="flex items-center gap-1.5 text-sky-400 text-xs font-medium">
                                <GraduationCap className="w-3.5 h-3.5" />
                                <span>{course.courses.length} courses</span>
                              </div>
                            ) : (
                              <span className="text-[11px] text-muted-foreground/60 italic">
                                Roadmap only
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Salary Bracket */}
                        <td className="py-4 px-4 text-xs font-mono text-white/90">
                          {course.stats?.salary || "N/A"}
                        </td>

                        {/* Demand */}
                        <td className="py-4 px-4">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-md font-medium ${
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
                            {/* View public roadmap */}
                            <Link
                              href={`/roadmaps/${course.id}`}
                              target="_blank"
                              className="p-2 rounded-lg text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
                              title="View live public roadmap"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>

                            {/* Edit course & roadmap */}
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

                            {/* Delete */}
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
              Changes persist in your browser & are ready for backend sync.
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
