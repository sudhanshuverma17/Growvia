import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { useCourses } from "@/context/course-context";
import { CareerIcon } from "@/components/career-icon";
import { Search } from "lucide-react";

export default function Roadmaps() {
  const { courses } = useCourses();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const set = new Set(["All"]);
    courses.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return Array.from(set);
  }, [courses]);

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch =
        search.trim() === "" ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        (c.category && c.category.toLowerCase().includes(search.toLowerCase())) ||
        (c.description && c.description.toLowerCase().includes(search.toLowerCase()));

      const matchCat =
        activeCategory === "All" || c.category === activeCategory;

      return matchSearch && matchCat;
    });
  }, [courses, search, activeCategory]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="section-tag mb-3">{courses.length} Career Roadmaps</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Career Roadmaps</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Honest, detailed, and structured paths for the most in-demand careers in India.
            </p>
          </div>

          <div className="relative w-full md:w-80 flex-shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search careers, skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-card border border-white/10 rounded-xl text-sm text-white placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary font-semibold"
                  : "border-white/10 text-muted-foreground hover:border-white/30 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        {(search || activeCategory !== "All") && (
          <p className="text-sm text-muted-foreground mb-6">
            Showing <span className="text-white font-semibold">{filtered.length}</span> careers
            {activeCategory !== "All" && (
              <> in <span className="text-primary">{activeCategory}</span></>
            )}
            {search && (
              <> matching "<span className="text-white">{search}</span>"</>
            )}
          </p>
        )}

        {/* Career Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No careers found for "{search}"</p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-4 text-primary hover:underline text-sm"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((career, i) => (
              <Link key={career.id} href={`/roadmaps/${career.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.03, 0.5) }}
                  className="group flex flex-col h-full bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-white group-hover:text-primary group-hover:bg-primary/10 transition-all duration-200">
                      <CareerIcon icon={career.icon} size={22} />
                    </div>
                    <span className="text-[10px] text-muted-foreground bg-white/[0.04] border border-white/8 px-2 py-1 rounded-full leading-tight text-right max-w-[100px]">
                      {career.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {career.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-5 flex-grow leading-relaxed line-clamp-3">
                    {career.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-white/5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Avg. Salary</span>
                      <span className="font-semibold text-white">
                        {career.stats?.salary || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Demand</span>
                      <span
                        className={`font-semibold ${
                          career.stats?.demand === "Very High"
                            ? "text-green-400"
                            : career.stats?.demand === "High"
                            ? "text-emerald-400"
                            : career.stats?.demand === "Growing"
                            ? "text-blue-400"
                            : "text-muted-foreground"
                        }`}
                      >
                        {career.stats?.demand || "Medium"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
