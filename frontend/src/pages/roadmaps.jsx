import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { useCourses } from "@/context/course-context";
import { CareerIcon } from "@/components/career-icon";
import {
  Search,
  BookOpen,
  Building2,
  BarChart3,
  ArrowRight,
  ChevronRight,
  X,
} from "lucide-react";
import { getCareerCardImage, getCareerConciseDesc } from "@/lib/career-media";

// Featured roadmap IDs matching the reference image layout
const FEATURED_ORDER = [
  "pharmacist",
  "actuary",
  "interior-designer",
  "supply-chain",
  "biotechnologist",
  "environmental-scientist",
  "engineer",
  "game-developer",
];

export default function Roadmaps() {
  const { courses } = useCourses();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const categoryScrollRef = useRef(null);
  const searchInputRef = useRef(null);

  // Ctrl+K keyboard shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Ordered categories matching user screenshot
  const categories = useMemo(() => {
    const preferredOrder = [
      "All",
      "Healthcare",
      "Finance",
      "Design & Built Environment",
      "Operations & Logistics",
      "Science & Research",
      "Science & Environment",
      "Technology",
      "Technology & Gaming",
    ];

    const extraCats = new Set();
    courses.forEach((c) => {
      if (c.category && !preferredOrder.includes(c.category)) {
        extraCats.add(c.category);
      }
    });

    return [...preferredOrder, ...Array.from(extraCats)];
  }, [courses]);

  // Filter and sort roadmaps
  const filtered = useMemo(() => {
    const matches = courses.filter((c) => {
      const matchSearch =
        search.trim() === "" ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        (c.category && c.category.toLowerCase().includes(search.toLowerCase())) ||
        (c.description && c.description.toLowerCase().includes(search.toLowerCase()));

      const matchCat =
        activeCategory === "All" ||
        c.category === activeCategory ||
        (activeCategory === "Science & Research" && c.id === "biotechnologist") ||
        (activeCategory === "Technology & Gaming" && c.id === "game-developer");

      return matchSearch && matchCat;
    });

    // When showing All without search, prioritize the featured order shown in the screenshot
    if (activeCategory === "All" && search.trim() === "") {
      return [...matches].sort((a, b) => {
        const indexA = FEATURED_ORDER.indexOf(a.id);
        const indexB = FEATURED_ORDER.indexOf(b.id);
        const scoreA = indexA !== -1 ? indexA : 999;
        const scoreB = indexB !== -1 ? indexB : 999;
        return scoreA - scoreB;
      });
    }

    return matches;
  }, [courses, search, activeCategory]);

  const scrollCategoriesRight = () => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({ left: 240, behavior: "smooth" });
    }
  };

  const getCardImage = (career) => {
    return getCareerCardImage(career);
  };

  const getDisplayTitle = (career) => {
    if (career.id === "biotechnologist") return "Biomedical Scientist";
    return career.title;
  };

  const getDisplayCategory = (career) => {
    if (career.id === "biotechnologist") return "Science & Research";
    if (career.category === "Design & Built Environment") return "Design & Built Env.";
    return career.category || "General";
  };

  const getDisplaySalary = (career) => {
    if (career.id === "biotechnologist") return "₹3L - ₹20L+";
    if (career.id === "engineer") return "₹5L - ₹40L+";
    if (career.id === "game-developer") return "₹4L - ₹30L+";
    return career.stats?.salary || "₹4L - ₹25L+";
  };

  const getDisplayDemand = (career) => {
    if (career.id === "biotechnologist") return "Medium";
    if (career.id === "engineer") return "High";
    if (career.id === "game-developer") return "High";
    return career.stats?.demand || "High";
  };

  const getConciseDesc = (career) => {
    return getCareerConciseDesc(career);
  };

  return (
    <Layout>
      <div className="w-full min-h-[calc(100vh-5rem)] bg-[#0d0d0f] text-foreground -mt-20 pt-20 pb-20 -mb-20">
        {/* ── CINEMATIC HERO BANNER ───────────────────────────────── */}
        <section className="relative w-full overflow-hidden border-b border-white/5 bg-black/60">
          {/* Atmospheric Photography Background */}
          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none select-none opacity-45"
            style={{
              backgroundImage: "url('/images/hero-cinematic.jpg')",
              backgroundPosition: "center 30%",
            }}
          />

          {/* Seamless Dark Vignette Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0f] via-[#0d0d0f]/85 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0f]/70 via-transparent to-[#0d0d0f] pointer-events-none" />

          {/* Hero Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 md:pt-20 md:pb-16">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              {/* Left Column: Heading & Stats */}
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E5A855] px-3.5 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/5 mb-4">
                  48 CAREER ROADMAPS
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none mb-3">
                  Career <span className="text-[#E69D43]">Roadmaps</span>
                </h1>

                <p className="text-lg sm:text-xl font-bold text-white/95 mb-2">
                  Find the path. Build the skills. Make it yours.
                </p>

                <p className="text-sm sm:text-base text-muted-foreground/90 max-w-xl mb-6 leading-relaxed">
                  Honest, detailed, and structured paths for the most in-demand careers in India.
                </p>

                {/* Metric counters */}
                <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm font-medium text-white/90">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#E69D43]" />
                    <span>48 Careers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#E69D43]" />
                    <span>20+ Industries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#E69D43]" />
                    <span>Beginner to Advanced</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Search Bar & Ambient Typography */}
              <div className="flex items-center justify-between lg:justify-end gap-6 w-full lg:w-auto">
                {/* Search Bar Input */}
                <div className="relative w-full sm:w-80 md:w-96 flex-shrink-0">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search careers, skills, or industries..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-20 py-3 bg-[#121215]/90 backdrop-blur-md border border-white/15 rounded-xl text-sm text-white placeholder:text-muted-foreground/70 focus:outline-none focus:border-amber-500/50 transition-colors shadow-2xl"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                    {search ? (
                      <button
                        onClick={() => setSearch("")}
                        className="pointer-events-auto p-1 hover:text-white text-muted-foreground transition-colors"
                        title="Clear search"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-muted-foreground">
                        Ctrl + K
                      </kbd>
                    )}
                  </div>
                </div>

                {/* Vertical Slogan (Shown on large screens) */}
                <div className="hidden xl:flex flex-col text-right text-amber-500/30 text-xs tracking-[0.25em] font-serif uppercase leading-loose select-none pointer-events-none pl-6 border-l border-white/5">
                  <span>A BRIGHTER</span>
                  <span className="font-bold text-amber-500/45">CAREER</span>
                  <span>A BRIGHTER</span>
                  <span className="font-bold text-amber-500/45">YOU</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MAIN CONTENT CONTAINER ─────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {/* Category Filter Pills Row with smooth horizontal scroll */}
          <div className="flex items-center gap-2 mb-8">
            <div
              ref={categoryScrollRef}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 flex-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs px-4 py-2 rounded-full border whitespace-nowrap transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-[#F5F0E6] text-black border-[#F5F0E6] font-semibold shadow-sm"
                      : "bg-[#16161a] border-white/10 text-muted-foreground hover:border-white/25 hover:text-white hover:bg-[#1a1a20]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Scroll Right Button */}
            <button
              onClick={scrollCategoriesRight}
              className="w-8 h-8 rounded-full bg-[#16161a] border border-white/10 hover:bg-[#1f1f26] hover:border-white/20 text-muted-foreground hover:text-white flex items-center justify-center flex-shrink-0 transition-colors shadow-sm"
              aria-label="Scroll categories right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Results count (When filtering) */}
          {(search || activeCategory !== "All") && (
            <p className="text-xs sm:text-sm text-muted-foreground mb-6">
              Showing <span className="text-white font-semibold">{filtered.length}</span> careers
              {activeCategory !== "All" && (
                <> in <span className="text-amber-300 font-medium">{activeCategory}</span></>
              )}
              {search && (
                <> matching &ldquo;<span className="text-white">{search}</span>&rdquo;</>
              )}
            </p>
          )}

          {/* ── 4-COLUMN COMPACT ROADMAP CARDS ────────────────────── */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground bg-[#16161a] border border-dashed border-white/10 rounded-2xl p-8">
              <p className="text-lg text-white/90 font-medium">No careers found matching your criteria</p>
              <p className="text-xs text-muted-foreground mt-1">Try another search term or clear active filters</p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {filtered.map((career, i) => {
                const imageUrl = getCardImage(career);
                const displayTitle = getDisplayTitle(career);
                const displayCategory = getDisplayCategory(career);
                const displaySalary = getDisplaySalary(career);
                const displayDemand = getDisplayDemand(career);
                const conciseDesc = getConciseDesc(career);
                const isHighDemand = displayDemand === "High" || displayDemand === "Very High";

                return (
                  <Link key={career.id} href={`/roadmaps/${career.id}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.02, 0.35) }}
                      className="group relative flex flex-col justify-between h-full bg-[#131316] border border-white/10 hover:border-white/25 rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/70 cursor-pointer"
                    >
                      {/* Thematic Background Image with Smooth Left Fade */}
                      <div className="absolute right-0 top-0 bottom-0 w-[48%] pointer-events-none overflow-hidden rounded-r-2xl select-none">
                        <img
                          src={imageUrl}
                          alt=""
                          loading="lazy"
                          className="w-full h-full object-cover object-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                        />
                        {/* Gradient Mask to ensure 100% text contrast on the left */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#131316] via-[#131316]/55 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#131316]/80 via-transparent to-transparent" />
                      </div>

                      {/* Foreground Content */}
                      <div className="relative z-10 flex flex-col h-full">
                        {/* Top Row: Square Icon Box + Category Pill */}
                        <div className="flex items-start justify-between gap-2 mb-3.5">
                          <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/90 group-hover:border-white/20 transition-colors shadow-sm">
                            <CareerIcon icon={career.icon} size={20} />
                          </div>
                          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground font-medium truncate max-w-[130px]">
                            {displayCategory}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 leading-snug group-hover:text-amber-200 transition-colors">
                          {displayTitle}
                        </h3>

                        {/* Concise Description: 1-2 sentences maximum, strictly never bulky */}
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-5 min-h-[34px]">
                          {conciseDesc}
                        </p>

                        {/* Bottom Row: Avg. Salary & View Roadmap Link */}
                        <div className="pt-3 border-t border-white/[0.08] flex items-end justify-between gap-2 mt-auto">
                          {/* Salary Metric */}
                          <div>
                            <div className="flex items-center gap-0.5 text-xs sm:text-sm font-bold text-white">
                              <span className="text-amber-400 font-bold text-sm">₹</span>
                              <span>{displaySalary}</span>
                            </div>
                            <span className="text-[10px] text-muted-foreground/75 block leading-tight">Avg. Salary</span>
                          </div>

                          {/* View Roadmap CTA */}
                          <div className="flex items-center gap-1 text-xs font-semibold text-amber-300/90 group-hover:text-amber-200 transition-colors">
                            <span>View Roadmap</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
