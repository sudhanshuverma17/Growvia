import React, { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronRight,
  Lock,
  Briefcase,
  GraduationCap,
  Globe,
  IndianRupee,
  Clock,
  Lightbulb,
  TrendingUp,
  BookOpen,
  Target,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
  }),
};

export function SectionHeading({ icon: Icon, title, badge }) {
  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center flex-shrink-0 shadow-sm shadow-amber-500/10">
          <Icon className="w-4 h-4 text-[#E5A855]" />
        </span>
        <span>{title}</span>
      </h2>
      {badge && (
        <span className="text-[11px] font-semibold text-[#E5A855] px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
          {badge}
        </span>
      )}
    </div>
  );
}

// ── REUSABLE TASK 5 LOCKED STATE OVERLAY ──
export function LockedBlock({
  title = "Unlock on Purchase",
  subtitle = "Unlock this roadmap to reveal deep milestones, salary breakdowns, and study guides.",
  badge = "Unlock on Purchase",
  careerId,
  children,
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-[#131316] shadow-xl mt-6 min-h-[250px] sm:min-h-[270px] flex flex-col justify-center">
      {/* Blurred background preview layer filling the container */}
      <div
        className="absolute inset-0 select-none pointer-events-none transition-all duration-300 overflow-hidden p-6"
        style={{ filter: "blur(6px)", opacity: 0.2 }}
        aria-hidden="true"
      >
        {children}
      </div>

      {/* Centered Lock Overlay in regular document flow so it NEVER clips and ALWAYS fits completely */}
      <div className="relative z-10 flex flex-col items-center justify-center py-7 sm:py-9 px-4 sm:px-6 text-center bg-black/75 backdrop-blur-[2px] w-full my-auto">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#E5A855] mb-2.5 shadow-lg shadow-amber-500/10 flex-shrink-0">
          <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5A855]" />
        </div>

        {badge && (
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#E5A855] px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-2">
            {badge}
          </span>
        )}

        <h4 className="text-base sm:text-lg font-bold text-white mb-1.5 max-w-xl px-2">
          {title}
        </h4>

        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-300/85 max-w-lg mb-4 sm:mb-5 leading-relaxed px-2">
            {subtitle}
          </p>
        )}

        <Button
          asChild
          size="sm"
          className="bg-[#E5A855] hover:bg-[#d99640] text-black font-bold text-xs sm:text-sm h-9 px-6 rounded-xl shadow-lg shadow-amber-500/25 hover:scale-[1.02] transition-all flex-shrink-0 cursor-pointer"
        >
          <Link href={`/pricing?career=${careerId}`}>
            <Lock className="w-3.5 h-3.5 mr-2" /> Unlock on Purchase — ₹199
          </Link>
        </Button>
      </div>
    </div>
  );
}

// ── 1. WHY CHOOSE THIS CAREER (Stays fully free) ──
export function WhyChooseSection({ whyChoose, hasAccess }) {
  if (!whyChoose || whyChoose.length === 0) return null;
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <SectionHeading icon={Lightbulb} title="Why Choose This Career?" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {whyChoose.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 bg-[#131316] border border-white/10 hover:border-white/20 rounded-xl p-4 transition-colors shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-slate-300 leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

// ── 2. CAREER PATHS & SPECIALISATIONS ──
export function CareerPathsSection({ paths, hasAccess, careerId }) {
  if (!paths || paths.length === 0) return null;

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <SectionHeading icon={Briefcase} title="Career Paths & Specialisations" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {paths.map((path, i) => (
          <div
            key={i}
            className="bg-[#131316] rounded-xl p-5 border border-white/10 hover:border-amber-500/30 transition-all shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="text-sm font-bold text-white mb-2">{path.title}</div>
              <div className="text-xs text-muted-foreground leading-relaxed mb-4">
                {path.desc}
              </div>
            </div>

            {hasAccess && path.detailedPath && path.detailedPath.length > 0 && (
              <div className="pt-3 border-t border-white/10 space-y-2.5 mt-auto">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#E5A855] flex items-center gap-1 mb-1">
                  <CheckCircle2 className="w-3 h-3 text-[#E5A855]" /> Step-by-Step Milestones
                </div>
                <div className="space-y-2">
                  {path.detailedPath.map((step, sIdx) => (
                    <div key={sIdx} className="p-2.5 rounded-lg bg-[#0d0d0f] border border-white/5 space-y-1">
                      <div className="text-[11px] font-bold text-white flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-amber-500/15 text-[#E5A855] flex items-center justify-center text-[10px] font-mono flex-shrink-0">
                          {sIdx + 1}
                        </span>
                        <span>{step.milestone}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug pl-5">
                        {step.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {!hasAccess && (
        <LockedBlock
          title="Specialisation Roadmaps & Action Milestones"
          subtitle="Unlock on purchase to reveal 4-stage execution milestones, certification paths, and service pricing guides."
          badge="Unlock on Purchase"
          careerId={careerId}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {paths.map((p, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-xs font-bold text-white">{p.title} Milestones</div>
                <div className="p-3 rounded-lg bg-[#0d0d0f] space-y-2">
                  <div className="h-3 bg-white/20 rounded w-3/4" />
                  <div className="h-2 bg-white/15 rounded w-full" />
                  <div className="h-2 bg-white/15 rounded w-5/6" />
                  <div className="h-3 bg-white/20 rounded w-2/3 mt-2" />
                  <div className="h-2 bg-white/15 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </LockedBlock>
      )}
    </motion.section>
  );
}

// ── 3. IS THIS CAREER RIGHT FOR YOU ──
export function RightForYouSection({
  whoShould,
  whoShouldAvoid,
  harshReality,
  incomeBreakdown,
  timelineToProfitability,
  clientsNeededForTarget,
  hasAccess,
  careerId,
}) {
  const hasFreeContent = (whoShould && whoShould.length > 0) || (whoShouldAvoid && whoShouldAvoid.length > 0) || harshReality;
  if (!hasFreeContent) return null;

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <SectionHeading icon={CheckCircle2} title="Is This Career Right for You?" />

      {/* Free Choose / Avoid Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-6">
        {whoShould && whoShould.length > 0 && (
          <div className="bg-[#131316] border border-emerald-500/25 rounded-2xl p-6 shadow-md">
            <h3 className="text-base font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Choose this if you…
            </h3>
            <ul className="space-y-3">
              {whoShould.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {whoShouldAvoid && whoShouldAvoid.length > 0 && (
          <div className="bg-[#131316] border border-red-500/25 rounded-2xl p-6 shadow-md">
            <h3 className="text-base font-bold text-red-400 mb-4 flex items-center gap-2">
              <XCircle className="w-4 h-4" /> Avoid this if you…
            </h3>
            <ul className="space-y-3">
              {whoShouldAvoid.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Free The Harsh Reality */}
      {harshReality && (
        <div className="bg-[#131316] border border-red-500/25 rounded-2xl p-6 shadow-md mb-6">
          <h3 className="text-base font-bold text-red-400 mb-2.5 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> The Harsh Reality
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">{harshReality}</p>
        </div>
      )}

      {/* Premium Content: Income Breakdown, Timeline to Profitability, Clients Needed */}
      {hasAccess ? (
        <div className="bg-[#131316] border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-[#E5A855]">
              <IndianRupee className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-base font-bold text-white">Financial & Profitability Breakdown</h4>
              <p className="text-xs text-muted-foreground">Unfiltered Indian city metrics and timeline to reliable income</p>
            </div>
          </div>

          {/* Tier 1 / 2 / 3 City Income Breakdown */}
          {incomeBreakdown && (
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#E5A855]" /> City-Wise Earning Potential (Tier 1 vs Tier 2 vs Tier 3)
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-[#0d0d0f] border border-white/10">
                  <div className="text-[11px] font-bold text-[#E5A855] uppercase tracking-wider mb-1">Tier-1 Metros</div>
                  <div className="text-xs text-slate-200 leading-relaxed">{incomeBreakdown.tier1}</div>
                </div>
                <div className="p-4 rounded-xl bg-[#0d0d0f] border border-white/10">
                  <div className="text-[11px] font-bold text-sky-400 uppercase tracking-wider mb-1">Tier-2 Cities</div>
                  <div className="text-xs text-slate-200 leading-relaxed">{incomeBreakdown.tier2}</div>
                </div>
                <div className="p-4 rounded-xl bg-[#0d0d0f] border border-white/10">
                  <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1">Tier-3 Towns</div>
                  <div className="text-xs text-slate-200 leading-relaxed">{incomeBreakdown.tier3}</div>
                </div>
              </div>
            </div>
          )}

          {/* Timeline to Profitability & Clients Needed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {timelineToProfitability && (
              <div className="p-4 rounded-xl bg-[#0d0d0f] border border-white/10 space-y-1.5">
                <div className="text-xs font-bold text-[#E5A855] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Timeline to Profitability
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{timelineToProfitability}</p>
              </div>
            )}
            {clientsNeededForTarget && (
              <div className="p-4 rounded-xl bg-[#0d0d0f] border border-white/10 space-y-1.5">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" /> Clients Needed for Target Income
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{clientsNeededForTarget}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <LockedBlock
          title="Income Breakdown & Timeline to Profitability"
          subtitle="Unlock on purchase to see real Tier 1, 2, and 3 city salary figures, break-even timelines, and client targets."
          badge="Unlock on Purchase"
          careerId={careerId}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-[#0d0d0f] space-y-2">
              <div className="h-3 bg-white/20 rounded w-1/2" />
              <div className="h-4 bg-white/25 rounded w-3/4" />
              <div className="h-2 bg-white/15 rounded w-full" />
            </div>
            <div className="p-4 rounded-xl bg-[#0d0d0f] space-y-2">
              <div className="h-3 bg-white/20 rounded w-1/2" />
              <div className="h-4 bg-white/25 rounded w-3/4" />
              <div className="h-2 bg-white/15 rounded w-full" />
            </div>
            <div className="p-4 rounded-xl bg-[#0d0d0f] space-y-2">
              <div className="h-3 bg-white/20 rounded w-1/2" />
              <div className="h-4 bg-white/25 rounded w-3/4" />
              <div className="h-2 bg-white/15 rounded w-full" />
            </div>
          </div>
        </LockedBlock>
      )}
    </motion.section>
  );
}

// ── 4. CORE SKILLS REQUIRED ──
export function CoreSkillsSection({ skills, skillsData, hasAccess, careerId }) {
  if (!skills || skills.length === 0) return null;
  const [selectedSkillIdx, setSelectedSkillIdx] = useState(0);

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <SectionHeading icon={TrendingUp} title="Core Skills Required" />

      {/* Free Tag List */}
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill, i) => (
          <button
            key={i}
            type="button"
            onClick={() => hasAccess && setSelectedSkillIdx(i)}
            className={`px-3.5 py-1.5 rounded-full text-xs transition-all ${
              hasAccess && selectedSkillIdx === i
                ? "bg-[#E5A855] text-black font-bold shadow-md shadow-amber-500/20"
                : "bg-[#131316] border border-white/10 hover:border-amber-500/30 text-slate-200"
            }`}
          >
            {skill}
          </button>
        ))}
      </div>

      {/* Premium How to Learn Blueprint */}
      {hasAccess ? (
        skillsData && skillsData.length > 0 && (
          <div className="bg-[#131316] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-[#E5A855]">
                  <BookOpen className="w-3.5 h-3.5" />
                </span>
                <span className="text-sm font-bold text-white">
                  How to Master: <span className="text-[#E5A855]">{skillsData[selectedSkillIdx]?.name || skills[selectedSkillIdx]}</span>
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground">Click any skill tag above to view its learning guide</span>
            </div>

            {skillsData[selectedSkillIdx]?.howToLearn && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0d0d0f] border border-white/5 space-y-2">
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Free Learning Resources
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {skillsData[selectedSkillIdx].howToLearn.freeResources?.map((res, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#0d0d0f] border border-white/5 space-y-2">
                  <div className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" /> Paid & Certified Resources
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {skillsData[selectedSkillIdx].howToLearn.paidResources?.map((res, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <span className="text-sky-400 font-bold">•</span>
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-[#0d0d0f] border border-white/5 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Estimated Investment:</span>
                  <span className="font-semibold text-white">{skillsData[selectedSkillIdx].howToLearn.estimatedCost}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#0d0d0f] border border-white/5 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Estimated Time to Master:</span>
                  <span className="font-semibold text-white">{skillsData[selectedSkillIdx].howToLearn.estimatedTime}</span>
                </div>
              </div>
            )}
          </div>
        )
      ) : (
        <LockedBlock
          title="Skill Learning Blueprints & Resources"
          subtitle="Unlock on purchase to reveal structured free & paid courses, estimated learning hours, and cost breakdowns."
          badge="Unlock on Purchase"
          careerId={careerId}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#0d0d0f] space-y-2">
              <div className="h-3 bg-white/20 rounded w-1/3" />
              <div className="h-2 bg-white/15 rounded w-full" />
              <div className="h-2 bg-white/15 rounded w-4/5" />
            </div>
            <div className="p-4 rounded-xl bg-[#0d0d0f] space-y-2">
              <div className="h-3 bg-white/20 rounded w-1/3" />
              <div className="h-2 bg-white/15 rounded w-full" />
              <div className="h-2 bg-white/15 rounded w-4/5" />
            </div>
          </div>
        </LockedBlock>
      )}
    </motion.section>
  );
}

// ── 5. KEY ENTRANCE EXAMS ──
export function EntranceExamsSection({ exams, examsData, hasAccess, careerId }) {
  if (!exams || exams.length === 0) return null;

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <SectionHeading icon={BookOpen} title="Key Entrance Exams" />

      {/* Free Exam Name List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {exams.map((exam, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-[#131316] border border-white/10 rounded-xl px-4 py-3 shadow-sm"
          >
            <div className="w-2 h-2 rounded-full bg-[#E5A855] flex-shrink-0" />
            <span className="text-sm text-slate-300 font-medium">{exam}</span>
          </div>
        ))}
      </div>

      {/* Premium Exam Breakdown */}
      {hasAccess ? (
        examsData && examsData.length > 0 && (
          <div className="space-y-4 pt-2">
            {examsData.map((ex, i) => (
              <div key={i} className="bg-[#131316] border border-white/10 rounded-2xl p-5 shadow-lg space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E5A855]" /> {ex.name}
                  </h4>
                  <span className="text-[11px] text-[#E5A855] bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full w-fit">
                    Deadline: {ex.applicationDeadline}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#0d0d0f] border border-white/5 space-y-1">
                    <div className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Syllabus Focus</div>
                    <p className="text-slate-300 leading-relaxed">{ex.syllabus}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0d0d0f] border border-white/5 space-y-1">
                    <div className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Cutoff Trend & Competition</div>
                    <p className="text-slate-300 leading-relaxed">{ex.cutoffTrend}</p>
                  </div>
                </div>

                {ex.prepResources && ex.prepResources.length > 0 && (
                  <div className="p-3 rounded-xl bg-[#0d0d0f] border border-white/5 space-y-1 text-xs">
                    <div className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">Recommended Prep Resources</div>
                    <ul className="space-y-1 pl-1 text-slate-300">
                      {ex.prepResources.map((res, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      ) : (
        <LockedBlock
          title="Exam Syllabus, Cutoffs & Prep Guides"
          subtitle="Unlock on purchase to view in-depth syllabus breakdowns, cutoff percentiles, deadlines, and study materials."
          badge="Unlock on Purchase"
          careerId={careerId}
        >
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-[#0d0d0f] space-y-2">
              <div className="h-3 bg-white/20 rounded w-1/4" />
              <div className="h-2 bg-white/15 rounded w-full" />
              <div className="h-2 bg-white/15 rounded w-3/4" />
            </div>
            <div className="p-4 rounded-xl bg-[#0d0d0f] space-y-2">
              <div className="h-3 bg-white/20 rounded w-1/4" />
              <div className="h-2 bg-white/15 rounded w-full" />
            </div>
          </div>
        </LockedBlock>
      )}
    </motion.section>
  );
}

// ── 6. WHERE TO STUDY ──
export function WhereToStudySection({ colleges, budgetColleges, abroad, collegesData, hasAccess, careerId }) {
  const hasColleges = (colleges && colleges.length > 0) || (budgetColleges && budgetColleges.length > 0) || (abroad && abroad.length > 0);
  if (!hasColleges) return null;

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <SectionHeading icon={GraduationCap} title="Where to Study" />

      {/* Free Institution Names Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-4">
        {colleges && colleges.length > 0 && (
          <div className="bg-[#131316] border border-white/10 rounded-2xl overflow-hidden shadow-md">
            <div className="px-5 py-3 bg-white/[0.03] border-b border-white/10">
              <div className="text-sm font-bold text-white">Top Colleges (India)</div>
            </div>
            <ul className="p-5 space-y-2.5">
              {colleges.map((c, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-center gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-[#E5A855] flex-shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {budgetColleges && budgetColleges.length > 0 && (
          <div className="bg-[#131316] border border-white/10 rounded-2xl overflow-hidden shadow-md">
            <div className="px-5 py-3 bg-white/[0.03] border-b border-white/10">
              <div className="text-sm font-bold text-white">Budget / Govt Options</div>
            </div>
            <ul className="p-5 space-y-2.5">
              {budgetColleges.map((c, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-center gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-[#E5A855] flex-shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {abroad && abroad.length > 0 && (
          <div className="bg-[#131316] border border-white/10 rounded-2xl overflow-hidden shadow-md">
            <div className="px-5 py-3 bg-white/[0.03] border-b border-white/10">
              <div className="text-sm font-bold text-white">Study Abroad Options</div>
            </div>
            <ul className="p-5 space-y-2.5">
              {abroad.map((c, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-[#E5A855] flex-shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Premium Institution Breakdown */}
      {hasAccess ? (
        collegesData && (
          <div className="space-y-4 pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#E5A855] flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#E5A855]" /> Institutional Fee Structures &amp; Placement Statistics
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ...(collegesData.topColleges || []),
                ...(collegesData.budgetColleges || []),
                ...(collegesData.abroad || [])
              ].slice(0, 8).map((inst, idx) => (
                <div key={idx} className="bg-[#131316] border border-white/10 rounded-xl p-4 space-y-2.5 shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-bold text-white">{inst.name}</div>
                      <span className="text-[10px] text-[#E5A855] font-semibold">{inst.category || "Institution"}</span>
                    </div>
                    {inst.applyLink && (
                      <a
                        href={inst.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-[#E5A855] hover:underline flex items-center gap-1 font-medium"
                      >
                        Apply <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-1.5 text-xs">
                    <div className="flex justify-between border-t border-white/5 pt-1.5">
                      <span className="text-muted-foreground">Estimated Fees:</span>
                      <span className="text-white font-medium">{inst.fees}</span>
                    </div>
                    <div className="flex justify-between border-t border-white/5 pt-1.5">
                      <span className="text-muted-foreground">Placement Record:</span>
                      <span className="text-emerald-400 font-medium">{inst.placementStats}</span>
                    </div>
                    <div className="border-t border-white/5 pt-1.5 text-slate-300">
                      <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Admission Pathway:</span>
                      <span>{inst.admissionSteps}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        <LockedBlock
          title="College Fees, Placement Stats & Admission Pathways"
          subtitle="Unlock on purchase to reveal actual annual tuition costs, average placement packages, and direct admission steps."
          badge="Unlock on Purchase"
          careerId={careerId}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#0d0d0f] space-y-2">
              <div className="h-3 bg-white/20 rounded w-1/2" />
              <div className="h-2 bg-white/15 rounded w-full" />
              <div className="h-2 bg-white/15 rounded w-3/4" />
            </div>
            <div className="p-4 rounded-xl bg-[#0d0d0f] space-y-2">
              <div className="h-3 bg-white/20 rounded w-1/2" />
              <div className="h-2 bg-white/15 rounded w-full" />
              <div className="h-2 bg-white/15 rounded w-3/4" />
            </div>
          </div>
        </LockedBlock>
      )}
    </motion.section>
  );
}

