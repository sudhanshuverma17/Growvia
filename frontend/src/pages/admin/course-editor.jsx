import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "wouter";
import { Layout } from "@/components/layout";
import { useCourses } from "@/context/course-context";
import { useVideos } from "@/context/video-context";
import { ICON_OPTIONS, CareerIcon } from "@/components/career-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Milestone,
  BookOpen,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  ExternalLink,
  DollarSign,
  AlertTriangle,
  Info,
  Link2,
  Video as VideoIcon,
  Lock,
  Search,
  X,
  Check,
  Play,
  Film,
  FolderPlus,
  ChevronDown,
  ChevronUp,
  Clock,
  Target,
  GitBranch,
  ShieldAlert,
  TrendingUp,
  IndianRupee,
} from "lucide-react";

const STANDARD_CATEGORIES = [
  "Technology",
  "Healthcare",
  "Business & Management",
  "Finance",
  "Legal",
  "Creative & Design",
  "Creative & Media",
  "Engineering",
  "Government & Public Service",
  "Education",
  "Aviation & Transport",
  "Science & Research",
  "Social Sciences",
  "Operations & Logistics",
];

export default function CourseEditor() {
  const { id: editCourseId } = useParams();
  const [, setLocation] = useLocation();
  const { getCourseById, addCourse, updateCourse } = useCourses();
  const { videos: uploadedVideos } = useVideos();

  const isEditing = Boolean(editCourseId);
  const existingCourse = isEditing ? getCourseById(editCourseId) : null;

  const [activeTab, setActiveTab] = useState("general"); // "general" | "roadmap" | "courses" | "videos" | "paths" | "metadata"
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [createdSlug, setCreatedSlug] = useState(null);

  // Video Picker Modal State
  const [showVideoPicker, setShowVideoPicker] = useState(false);
  const [pickerSearch, setPickerSearch] = useState("");
  const [pickerFilter, setPickerFilter] = useState("all"); // "all" | "career" | "free" | "paid"

  // Roadmap Stage Guides Accordion state (admin)
  const [expandedStageGuides, setExpandedStageGuides] = useState({});
  const toggleStageGuide = (idx) => {
    setExpandedStageGuides((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    id: "",
    category: "Technology",
    customCategory: "",
    icon: "Code",
    description: "",
    stats: {
      salary: "₹6L - ₹20L+",
      demand: "High",
      difficulty: "Medium",
    },
    // Roadmap Timeline
    timeline: [
      {
        year: "Stage 1",
        title: "Foundation & Core Basics",
        desc: "Master the fundamental concepts, tools, and prerequisite skills.",
        actionItems: [],
        resources: [],
        investment: { time: "", cost: "" },
        checkpoint: { criteria: "", deliverable: "" },
        decisionPoints: [],
        fallbackPlan: "",
        warning: "",
        realWorldStats: [],
      },
      {
        year: "Stage 2",
        title: "Hands-on Practical Training",
        desc: "Build real projects, practice standard workflows, and gain hands-on proficiency.",
        actionItems: [],
        resources: [],
        investment: { time: "", cost: "" },
        checkpoint: { criteria: "", deliverable: "" },
        decisionPoints: [],
        fallbackPlan: "",
        warning: "",
        realWorldStats: [],
      },
      {
        year: "Stage 3",
        title: "Specialization & Portfolio",
        desc: "Develop advanced domain depth, earn certifications, and assemble proof of work.",
        actionItems: [],
        resources: [],
        investment: { time: "", cost: "" },
        checkpoint: { criteria: "", deliverable: "" },
        decisionPoints: [],
        fallbackPlan: "",
        warning: "",
        realWorldStats: [],
      },
      {
        year: "Stage 4",
        title: "Industry Entry & Growth",
        desc: "Target entry-level roles, internships, campus placements, and continuous upskilling.",
        actionItems: [],
        resources: [],
        investment: { time: "", cost: "" },
        checkpoint: { criteria: "", deliverable: "" },
        decisionPoints: [],
        fallbackPlan: "",
        warning: "",
        realWorldStats: [],
      },
    ],
    // Optional Related Courses / Certifications for this Roadmap
    courses: [],
    // Related Videos / Masterclasses for this Roadmap (Free / Paid)
    videos: [],
    // Specialization Paths
    paths: [
      {
        title: "Core Specialist",
        desc: "Deep focus on primary industry workflows and standards.",
      },
    ],
    // Skills (comma-separated string for easy editing)
    skillsString: "Problem Solving, Critical Thinking, Analytical Reasoning",
    // Exams & Colleges
    examsString: "National Entrance Test, State Eligibility Exam",
    collegesString: "Top National Universities, Premier State Institutes",
    // Salary expectations
    salaryExpectations: [
      { level: "Fresher / Entry Level", amount: "₹4L - ₹8L / year" },
      { level: "Mid Level (3-5 yrs)", amount: "₹10L - ₹20L / year" },
      { level: "Senior / Specialist (7+ yrs)", amount: "₹25L - ₹50L+ / year" },
    ],
    // Fit criteria
    whoShouldString: "Curious learners, Self-driven individuals, Problem solvers",
    whoShouldAvoidString: "People looking for zero effort, Unwilling to upskill",
    harshReality: "Competition is high and real-world execution matters far more than just credentials.",
    investment: "₹2 Lakhs - ₹10 Lakhs",
    firstOpportunity: "Internships, freelance projects, and campus recruitment.",
  });

  // Populate form if editing
  useEffect(() => {
    if (isEditing && existingCourse) {
      // Find matching icon
      const iconKey = existingCourse.icon;
      const iconName = ICON_OPTIONS[iconKey] ? iconKey : "Code";

      setFormData({
        title: existingCourse.title || "",
        id: existingCourse.id || "",
        category: STANDARD_CATEGORIES.includes(existingCourse.category)
          ? existingCourse.category
          : "Other",
        customCategory: STANDARD_CATEGORIES.includes(existingCourse.category)
          ? ""
          : existingCourse.category || "",
        icon: iconName,
        description: existingCourse.description || "",
        stats: {
          salary: existingCourse.stats?.salary || "₹6L - ₹20L+",
          demand: existingCourse.stats?.demand || "High",
          difficulty: existingCourse.stats?.difficulty || "Medium",
        },
        timeline:
          existingCourse.timeline && existingCourse.timeline.length > 0
            ? existingCourse.timeline.map((st, idx) => ({
                year: st.year || `Stage ${idx + 1}`,
                title: st.title || "",
                desc: st.desc || "",
                actionItems: Array.isArray(st.actionItems) ? st.actionItems : [],
                resources: Array.isArray(st.resources) ? st.resources : [],
                investment: {
                  time: st.investment?.time || "",
                  cost: st.investment?.cost || "",
                },
                checkpoint: {
                  criteria: st.checkpoint?.criteria || "",
                  deliverable: st.checkpoint?.deliverable || "",
                },
                decisionPoints: Array.isArray(st.decisionPoints)
                  ? st.decisionPoints.map((dp) => ({
                      question: dp.question || "",
                      options: Array.isArray(dp.options) ? dp.options : [],
                    }))
                  : [],
                fallbackPlan: st.fallbackPlan || "",
                warning: st.warning || "",
                realWorldStats: Array.isArray(st.realWorldStats) ? st.realWorldStats : [],
              }))
            : [
                {
                  year: "Stage 1",
                  title: "Foundation",
                  desc: "Start with core concepts and prerequisites.",
                  actionItems: [],
                  resources: [],
                  investment: { time: "", cost: "" },
                  checkpoint: { criteria: "", deliverable: "" },
                  decisionPoints: [],
                  fallbackPlan: "",
                  warning: "",
                  realWorldStats: [],
                },
              ],
        courses: Array.isArray(existingCourse.courses) ? existingCourse.courses : [],
        videos: Array.isArray(existingCourse.videos) ? existingCourse.videos : [],
        paths: existingCourse.paths || [],
        skillsString: (existingCourse.skills || []).join(", "),
        examsString: (existingCourse.exams || []).join(", "),
        collegesString: (existingCourse.colleges || []).join(", "),
        salaryExpectations:
          existingCourse.salaryExpectations &&
          existingCourse.salaryExpectations.length > 0
            ? existingCourse.salaryExpectations
            : [
                { level: "Entry Level", amount: "₹4L - ₹8L / year" },
                { level: "Mid Level", amount: "₹10L - ₹20L / year" },
                { level: "Senior Level", amount: "₹25L+ / year" },
              ],
        whoShouldString: (existingCourse.whoShould || []).join(", "),
        whoShouldAvoidString: (existingCourse.whoShouldAvoid || []).join(", "),
        harshReality: existingCourse.harshReality || "",
        investment: existingCourse.investment || "",
        firstOpportunity: existingCourse.firstOpportunity || "",
      });
    }
  }, [isEditing, existingCourse]);

  // Handle Title change -> auto generate slug if new
  const handleTitleChange = (val) => {
    if (!isEditing && (!formData.id || formData.id === slugify(formData.title))) {
      setFormData((prev) => ({
        ...prev,
        title: val,
        id: slugify(val),
      }));
    } else {
      setFormData((prev) => ({ ...prev, title: val }));
    }
  };

  const slugify = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  /* ── Roadmap Stages Handlers ── */
  const handleAddStage = () => {
    const nextStageNum = formData.timeline.length + 1;
    setFormData((prev) => ({
      ...prev,
      timeline: [
        ...prev.timeline,
        {
          year: `Stage ${nextStageNum}`,
          title: "New Milestones & Practical Execution",
          desc: "Key tasks, skills, and deliverables for this phase.",
          actionItems: [],
          resources: [],
          investment: { time: "", cost: "" },
          checkpoint: { criteria: "", deliverable: "" },
          decisionPoints: [],
          fallbackPlan: "",
          warning: "",
          realWorldStats: [],
        },
      ],
    }));
  };

  const handleUpdateStage = (index, field, value) => {
    setFormData((prev) => {
      const newTimeline = [...prev.timeline];
      newTimeline[index] = { ...newTimeline[index], [field]: value };
      return { ...prev, timeline: newTimeline };
    });
  };

  const handleUpdateStageNested = (stageIdx, parentField, field, value) => {
    setFormData((prev) => {
      const newTimeline = [...prev.timeline];
      newTimeline[stageIdx] = {
        ...newTimeline[stageIdx],
        [parentField]: {
          ...(newTimeline[stageIdx][parentField] || {}),
          [field]: value,
        },
      };
      return { ...prev, timeline: newTimeline };
    });
  };

  const handleAddStageListItem = (stageIdx, listName, defaultItem) => {
    setFormData((prev) => {
      const newTimeline = [...prev.timeline];
      const currentList = Array.isArray(newTimeline[stageIdx][listName])
        ? newTimeline[stageIdx][listName]
        : [];
      newTimeline[stageIdx] = {
        ...newTimeline[stageIdx],
        [listName]: [...currentList, defaultItem],
      };
      return { ...prev, timeline: newTimeline };
    });
  };

  const handleUpdateStageListItem = (stageIdx, listName, itemIdx, field, value) => {
    setFormData((prev) => {
      const newTimeline = [...prev.timeline];
      const currentList = [...(newTimeline[stageIdx][listName] || [])];
      currentList[itemIdx] = { ...currentList[itemIdx], [field]: value };
      newTimeline[stageIdx] = {
        ...newTimeline[stageIdx],
        [listName]: currentList,
      };
      return { ...prev, timeline: newTimeline };
    });
  };

  const handleRemoveStageListItem = (stageIdx, listName, itemIdx) => {
    setFormData((prev) => {
      const newTimeline = [...prev.timeline];
      const currentList = (newTimeline[stageIdx][listName] || []).filter((_, i) => i !== itemIdx);
      newTimeline[stageIdx] = {
        ...newTimeline[stageIdx],
        [listName]: currentList,
      };
      return { ...prev, timeline: newTimeline };
    });
  };

  const handleAddDecisionOption = (stageIdx, dpIdx) => {
    setFormData((prev) => {
      const newTimeline = [...prev.timeline];
      const dps = [...(newTimeline[stageIdx].decisionPoints || [])];
      const opts = [...(dps[dpIdx]?.options || [])];
      opts.push({ choice: "", pros: "", cons: "" });
      dps[dpIdx] = { ...dps[dpIdx], options: opts };
      newTimeline[stageIdx] = { ...newTimeline[stageIdx], decisionPoints: dps };
      return { ...prev, timeline: newTimeline };
    });
  };

  const handleUpdateDecisionOption = (stageIdx, dpIdx, optIdx, field, value) => {
    setFormData((prev) => {
      const newTimeline = [...prev.timeline];
      const dps = [...(newTimeline[stageIdx].decisionPoints || [])];
      const opts = [...(dps[dpIdx]?.options || [])];
      opts[optIdx] = { ...opts[optIdx], [field]: value };
      dps[dpIdx] = { ...dps[dpIdx], options: opts };
      newTimeline[stageIdx] = { ...newTimeline[stageIdx], decisionPoints: dps };
      return { ...prev, timeline: newTimeline };
    });
  };

  const handleRemoveDecisionOption = (stageIdx, dpIdx, optIdx) => {
    setFormData((prev) => {
      const newTimeline = [...prev.timeline];
      const dps = [...(newTimeline[stageIdx].decisionPoints || [])];
      const opts = (dps[dpIdx]?.options || []).filter((_, i) => i !== optIdx);
      dps[dpIdx] = { ...dps[dpIdx], options: opts };
      newTimeline[stageIdx] = { ...newTimeline[stageIdx], decisionPoints: dps };
      return { ...prev, timeline: newTimeline };
    });
  };

  const handleRemoveStage = (index) => {
    setFormData((prev) => ({
      ...prev,
      timeline: prev.timeline.filter((_, i) => i !== index),
    }));
  };

  const handleMoveStage = (index, direction) => {
    setFormData((prev) => {
      const newTimeline = [...prev.timeline];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newTimeline.length) return prev;
      const temp = newTimeline[index];
      newTimeline[index] = newTimeline[targetIndex];
      newTimeline[targetIndex] = temp;
      return { ...prev, timeline: newTimeline };
    });
  };

  /* ── Related Courses Handlers ── */
  const handleAddCourse = () => {
    setFormData((prev) => ({
      ...prev,
      courses: [
        ...prev.courses,
        {
          title: "",
          provider: "Coursera / edX / Official",
          url: "",
          level: "Beginner",
          duration: "8 Weeks",
          price: "Free",
          badge: "Featured",
          description: "",
        },
      ],
    }));
  };

  const handleUpdateCourse = (index, field, value) => {
    setFormData((prev) => {
      const newCourses = [...prev.courses];
      newCourses[index] = { ...newCourses[index], [field]: value };
      return { ...prev, courses: newCourses };
    });
  };

  const handleRemoveCourse = (index) => {
    setFormData((prev) => ({
      ...prev,
      courses: prev.courses.filter((_, i) => i !== index),
    }));
  };

  const handleMoveCourse = (index, direction) => {
    setFormData((prev) => {
      const newCourses = [...prev.courses];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newCourses.length) return prev;
      const temp = newCourses[index];
      newCourses[index] = newCourses[targetIndex];
      newCourses[targetIndex] = temp;
      return { ...prev, courses: newCourses };
    });
  };

  /* ── Related Videos Handlers (Attached from Uploaded Videos Library) ── */
  const isVideoAttached = (video) => {
    const vId = video._id || video.id;
    return (formData.videos || []).some(
      (v) =>
        (vId && v.videoId === vId) ||
        (video.videoUrl && v.videoUrl === video.videoUrl) ||
        (video.title && v.title === video.title)
    );
  };

  const handleAttachVideo = (video) => {
    if (isVideoAttached(video)) return;
    const newAttached = {
      videoId: video._id || video.id || "",
      title: video.title,
      mentor: video.mentor || "",
      mentorRole: video.mentorRole || "Industry Professional",
      videoUrl: video.videoUrl,
      thumbnail: video.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=640&q=80",
      duration: video.duration || "25:00",
      tag: video.tag || "Reality Check",
      isPaid: Boolean(video.isPaid),
      price: video.isPaid ? (video.price || "₹299") : "Free",
      description: video.description || "",
    };
    setFormData((prev) => ({
      ...prev,
      videos: [...(prev.videos || []), newAttached],
    }));
  };

  const handleDetachVideo = (index) => {
    setFormData((prev) => ({
      ...prev,
      videos: (prev.videos || []).filter((_, i) => i !== index),
    }));
  };

  const handleToggleAttachVideo = (video) => {
    const vId = video._id || video.id;
    const existingIndex = (formData.videos || []).findIndex(
      (v) =>
        (vId && v.videoId === vId) ||
        (video.videoUrl && v.videoUrl === video.videoUrl) ||
        (video.title && v.title === video.title)
    );
    if (existingIndex >= 0) {
      handleDetachVideo(existingIndex);
    } else {
      handleAttachVideo(video);
    }
  };

  const handleMoveVideo = (index, direction) => {
    setFormData((prev) => {
      const newVideos = [...(prev.videos || [])];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newVideos.length) return prev;
      const temp = newVideos[index];
      newVideos[index] = newVideos[targetIndex];
      newVideos[targetIndex] = temp;
      return { ...prev, videos: newVideos };
    });
  };

  /* ── Specialization Paths Handlers ── */
  const handleAddPath = () => {
    setFormData((prev) => ({
      ...prev,
      paths: [
        ...prev.paths,
        {
          title: "Specialization Track",
          desc: "Description of this specialized focus area.",
        },
      ],
    }));
  };

  const handleUpdatePath = (index, field, value) => {
    setFormData((prev) => {
      const newPaths = [...prev.paths];
      newPaths[index] = { ...newPaths[index], [field]: value };
      return { ...prev, paths: newPaths };
    });
  };

  const handleRemovePath = (index) => {
    setFormData((prev) => ({
      ...prev,
      paths: prev.paths.filter((_, i) => i !== index),
    }));
  };

  /* ── Salary Ladder Handlers ── */
  const handleUpdateSalary = (index, field, value) => {
    setFormData((prev) => {
      const newSalaries = [...prev.salaryExpectations];
      newSalaries[index] = { ...newSalaries[index], [field]: value };
      return { ...prev, salaryExpectations: newSalaries };
    });
  };

  const handleAddSalaryTier = () => {
    setFormData((prev) => ({
      ...prev,
      salaryExpectations: [
        ...prev.salaryExpectations,
        { level: "Specialist Level", amount: "₹20L+ / year" },
      ],
    }));
  };

  const handleRemoveSalaryTier = (index) => {
    setFormData((prev) => ({
      ...prev,
      salaryExpectations: prev.salaryExpectations.filter((_, i) => i !== index),
    }));
  };

  /* ── Submit / Save ── */
  const handleSave = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter a course title.");
      return;
    }

    const category =
      formData.category === "Other"
        ? formData.customCategory || "General"
        : formData.category;

    const parseCommaSeparated = (str) =>
      str
        ? str
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

    const payload = {
      title: formData.title.trim(),
      id: formData.id.trim() || slugify(formData.title),
      category,
      icon: formData.icon,
      description: formData.description.trim(),
      stats: formData.stats,
      timeline: (formData.timeline || []).map((st) => ({
        year: st.year?.trim() || "",
        title: st.title?.trim() || "",
        desc: st.desc?.trim() || "",
        actionItems: (st.actionItems || [])
          .filter((a) => a && a.task && a.task.trim())
          .map((a) => ({ task: a.task.trim(), detail: a.detail?.trim() || "" })),
        resources: (st.resources || [])
          .filter((r) => r && r.name && r.name.trim())
          .map((r) => ({
            name: r.name.trim(),
            type: r.type || "course",
            url: r.url?.trim() || "",
            note: r.note?.trim() || "",
          })),
        investment: {
          time: st.investment?.time?.trim() || "",
          cost: st.investment?.cost?.trim() || "",
        },
        checkpoint: {
          criteria: st.checkpoint?.criteria?.trim() || "",
          deliverable: st.checkpoint?.deliverable?.trim() || "",
        },
        decisionPoints: (st.decisionPoints || [])
          .filter((dp) => dp && dp.question && dp.question.trim())
          .map((dp) => ({
            question: dp.question.trim(),
            options: (dp.options || [])
              .filter((o) => o && o.choice && o.choice.trim())
              .map((o) => ({
                choice: o.choice.trim(),
                pros: o.pros?.trim() || "",
                cons: o.cons?.trim() || "",
              })),
          })),
        fallbackPlan: st.fallbackPlan?.trim() || "",
        warning: st.warning?.trim() || "",
        realWorldStats: (st.realWorldStats || [])
          .filter((s) => s && s.label && s.label.trim())
          .map((s) => ({
            label: s.label.trim(),
            value: s.value?.trim() || "",
            context: s.context?.trim() || "",
          })),
      })),
      // Filter out any empty course items
      courses: formData.courses.filter((c) => c.title && c.title.trim()),
      // Filter out any empty video items
      videos: (formData.videos || []).filter((v) => v.title && v.title.trim()),
      paths: formData.paths,
      skills: parseCommaSeparated(formData.skillsString),
      exams: parseCommaSeparated(formData.examsString),
      colleges: parseCommaSeparated(formData.collegesString),
      salaryExpectations: formData.salaryExpectations,
      whoShould: parseCommaSeparated(formData.whoShouldString),
      whoShouldAvoid: parseCommaSeparated(formData.whoShouldAvoidString),
      harshReality: formData.harshReality,
      investment: formData.investment,
      firstOpportunity: formData.firstOpportunity,
    };

    if (isEditing) {
      updateCourse(editCourseId, payload);
      setSaveSuccess(true);
      setCreatedSlug(payload.id);
      setTimeout(() => setSaveSuccess(false), 4000);
    } else {
      const created = addCourse(payload);
      setCreatedSlug(created.id);
      setSaveSuccess(true);
      setTimeout(() => {
        setLocation("/admin");
      }, 1500);
    }
  };

  // Uploaded videos filtering for the video picker modal
  const careerSlug = formData.id || slugify(formData.title);
  const careerMatchingVideos = (uploadedVideos || []).filter(
    (v) =>
      (v.careerId && (v.careerId === careerSlug || v.careerId === formData.id)) ||
      (v.careerTitle && formData.title && v.careerTitle.toLowerCase() === formData.title.toLowerCase())
  );
  const freeVideosList = (uploadedVideos || []).filter((v) => !v.isPaid);
  const paidVideosList = (uploadedVideos || []).filter((v) => v.isPaid);

  const filteredPickerVideos = (uploadedVideos || []).filter((v) => {
    // Filter category
    if (pickerFilter === "career") {
      const match =
        (v.careerId && (v.careerId === careerSlug || v.careerId === formData.id)) ||
        (v.careerTitle && formData.title && v.careerTitle.toLowerCase() === formData.title.toLowerCase());
      if (!match) return false;
    } else if (pickerFilter === "free") {
      if (v.isPaid) return false;
    } else if (pickerFilter === "paid") {
      if (!v.isPaid) return false;
    }

    // Search query
    if (pickerSearch.trim()) {
      const q = pickerSearch.toLowerCase().trim();
      const matchTitle = v.title?.toLowerCase().includes(q);
      const matchMentor = v.mentor?.toLowerCase().includes(q);
      const matchTag = v.tag?.toLowerCase().includes(q);
      const matchCareer =
        v.careerTitle?.toLowerCase().includes(q) || v.careerId?.toLowerCase().includes(q);
      if (!matchTitle && !matchMentor && !matchTag && !matchCareer) return false;
    }

    return true;
  });

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/admin")}
            className="text-muted-foreground hover:text-white pl-0"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Admin Console
          </Button>

          {isEditing && (
            <Button asChild variant="outline" size="sm" className="border-white/10 text-xs">
              <Link href={`/roadmaps/${editCourseId}`} target="_blank">
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> View Live Roadmap
              </Link>
            </Button>
          )}
        </div>

        {/* Title & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />{" "}
              {isEditing ? "Edit Course & Roadmap" : "Create New Course & Roadmap"}
            </div>
            <h1 className="text-3xl font-bold font-display text-white">
              {formData.title || (isEditing ? "Edit Course" : "New Course")}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Configure career details, roadmap stages, and optional online courses.
            </p>
          </div>

          {saveSuccess && (
            <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-xl text-sm font-semibold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" /> Saved successfully!
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 mb-8 overflow-x-auto gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("general")}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "general"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" /> 1. Course Information
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("roadmap")}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "roadmap"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-white"
            }`}
          >
            <Milestone className="w-4 h-4" /> 2. Roadmap Stages ({formData.timeline.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("courses")}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "courses"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-white"
            }`}
          >
            <GraduationCap className="w-4 h-4" /> 3. Related Courses ({formData.courses.length} Optional)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("videos")}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "videos"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-white"
            }`}
          >
            <VideoIcon className="w-4 h-4" /> 4. Related Videos ({(formData.videos || []).length} Free/Paid)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("paths")}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "paths"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-white"
            }`}
          >
            <Briefcase className="w-4 h-4" /> 5. Tracks & Skills
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("metadata")}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "metadata"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-white"
            }`}
          >
            <DollarSign className="w-4 h-4" /> 6. Exams & Salary
          </button>
        </div>

        <form onSubmit={handleSave}>
          {/* TAB 1: GENERAL INFO */}
          {activeTab === "general" && (
            <div className="space-y-6 bg-card border border-white/10 rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase text-muted-foreground mb-2">
                    Course / Career Title *
                  </label>
                  <Input
                    type="text"
                    required
                    placeholder="e.g. AI & Machine Learning Engineer"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="bg-neutral-900 border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-muted-foreground mb-2">
                    URL Slug / ID
                  </label>
                  <div className="flex items-center">
                    <span className="text-xs text-muted-foreground font-mono bg-white/5 border border-r-0 border-white/10 px-3 py-2.5 rounded-l-md">
                      /roadmaps/
                    </span>
                    <Input
                      type="text"
                      placeholder="ai-ml-engineer"
                      value={formData.id}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, id: slugify(e.target.value) }))
                      }
                      className="bg-neutral-900 border-white/10 text-white rounded-l-none font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase text-muted-foreground mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, category: e.target.value }))
                    }
                    className="w-full bg-neutral-900 border border-white/10 text-white text-sm rounded-md px-3 py-2.5 outline-none focus:border-primary"
                  >
                    {STANDARD_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                    <option value="Other">Other (Type custom below)</option>
                  </select>

                  {formData.category === "Other" && (
                    <Input
                      type="text"
                      placeholder="Enter custom category name"
                      value={formData.customCategory}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, customCategory: e.target.value }))
                      }
                      className="mt-3 bg-neutral-900 border-white/10 text-white"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-muted-foreground mb-2">
                    Course Icon
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-primary flex-shrink-0">
                      <CareerIcon icon={formData.icon} size={22} />
                    </div>
                    <select
                      value={formData.icon}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, icon: e.target.value }))
                      }
                      className="w-full bg-neutral-900 border border-white/10 text-white text-sm rounded-md px-3 py-2.5 outline-none focus:border-primary"
                    >
                      {ICON_OPTIONS.map((opt) => (
                        <option key={opt.name} value={opt.name}>
                          {opt.label} ({opt.name})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-muted-foreground mb-2">
                  Course Description
                </label>
                <Textarea
                  rows={3}
                  placeholder="Provide a clear, inspiring overview of what this career/course entails..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, description: e.target.value }))
                  }
                  className="bg-neutral-900 border-white/10 text-white leading-relaxed"
                />
              </div>

              {/* Stats Bar */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-4">
                  Quick Stats Badges
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">
                      Salary Range
                    </label>
                    <Input
                      type="text"
                      placeholder="₹6L - ₹25L+"
                      value={formData.stats.salary}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          stats: { ...p.stats, salary: e.target.value },
                        }))
                      }
                      className="bg-neutral-900 border-white/10 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">
                      Industry Demand
                    </label>
                    <select
                      value={formData.stats.demand}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          stats: { ...p.stats, demand: e.target.value },
                        }))
                      }
                      className="w-full bg-neutral-900 border border-white/10 text-white text-sm rounded-md px-3 py-2 outline-none"
                    >
                      <option value="Very High">Very High</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Stable">Stable</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">
                      Difficulty Level
                    </label>
                    <select
                      value={formData.stats.difficulty}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          stats: { ...p.stats, difficulty: e.target.value },
                        }))
                      }
                      className="w-full bg-neutral-900 border border-white/10 text-white text-sm rounded-md px-3 py-2 outline-none"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Very High">Very High</option>
                      <option value="Extreme">Extreme</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ROADMAP BUILDER */}
          {activeTab === "roadmap" && (
            <div className="space-y-6">
              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Milestone className="w-5 h-5 text-primary" /> Roadmap Timeline Builder
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Add step-by-step milestones (e.g. Class 11-12, Year 1-2, Final Year, First Job) to guide the student.
                  </p>
                </div>

                <Button
                  type="button"
                  onClick={handleAddStage}
                  className="bg-primary text-primary-foreground font-semibold text-xs h-9"
                >
                  <Plus className="w-4 h-4 mr-1.5" /> Add Stage
                </Button>
              </div>

              <div className="space-y-4">
                {formData.timeline.map((stage, idx) => (
                  <div
                    key={idx}
                    className="bg-card border border-white/10 rounded-2xl p-5 relative group hover:border-white/20 transition-colors shadow-lg"
                  >
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                          Stage {idx + 1}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          disabled={idx === 0}
                          onClick={() => handleMoveStage(idx, "up")}
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-white"
                          title="Move stage up"
                        >
                          <MoveUp className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          disabled={idx === formData.timeline.length - 1}
                          onClick={() => handleMoveStage(idx, "down")}
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-white"
                          title="Move stage down"
                        >
                          <MoveDown className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveStage(idx)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/15"
                          title="Delete this stage"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">
                          Phase / Timing
                        </label>
                        <Input
                          type="text"
                          placeholder="e.g. Class 11-12, Months 1-6"
                          value={stage.year}
                          onChange={(e) =>
                            handleUpdateStage(idx, "year", e.target.value)
                          }
                          className="bg-neutral-900 border-white/10 text-white font-mono text-xs"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-muted-foreground mb-1">
                          Stage Title
                        </label>
                        <Input
                          type="text"
                          placeholder="e.g. Master Core Computer Science & Algorithms"
                          value={stage.title}
                          onChange={(e) =>
                            handleUpdateStage(idx, "title", e.target.value)
                          }
                          className="bg-neutral-900 border-white/10 text-white font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">
                        Detailed Guidance & Action Steps
                      </label>
                      <Textarea
                        rows={2}
                        placeholder="Explain what to study, key tools, projects, and benchmarks for this phase..."
                        value={stage.desc}
                        onChange={(e) =>
                          handleUpdateStage(idx, "desc", e.target.value)
                        }
                        className="bg-neutral-900 border-white/10 text-white text-sm"
                      />
                    </div>

                    {/* Paid Tier Stage Deep Dive Content */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => toggleStageGuide(idx)}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-primary/10 hover:bg-primary/15 border border-primary/25 text-left transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                          <div>
                            <div className="text-xs font-bold text-white flex items-center gap-2">
                              Paid Tier Stage Content (Advanced Guidance)
                              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-primary/20 text-primary">
                                Paid Feature
                              </span>
                            </div>
                            <div className="text-[11px] text-muted-foreground mt-0.5">
                              Add action items, resources, checkpoints, branching choices, pitfalls, fallback & salary metrics.
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-primary font-medium flex items-center gap-1">
                          {expandedStageGuides[idx] ? (
                            <>Collapse <ChevronUp className="w-4 h-4" /></>
                          ) : (
                            <>Expand Editor <ChevronDown className="w-4 h-4" /></>
                          )}
                        </div>
                      </button>

                      {expandedStageGuides[idx] && (
                        <div className="mt-4 space-y-5 p-4 rounded-xl bg-black/40 border border-white/10">
                          {/* 1. Time & Cost Investment */}
                          <div>
                            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-sky-400" /> Stage Investment & Time Commitment
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] text-muted-foreground mb-1">
                                  Estimated Time Commitment
                                </label>
                                <Input
                                  type="text"
                                  placeholder="e.g. 6-9 Months (15-20 hrs/week)"
                                  value={stage.investment?.time || ""}
                                  onChange={(e) =>
                                    handleUpdateStageNested(idx, "investment", "time", e.target.value)
                                  }
                                  className="bg-neutral-900 border-white/10 text-white text-xs"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-muted-foreground mb-1">
                                  Estimated Cost
                                </label>
                                <Input
                                  type="text"
                                  placeholder="e.g. Free - ₹5,000 (Certifications optional)"
                                  value={stage.investment?.cost || ""}
                                  onChange={(e) =>
                                    handleUpdateStageNested(idx, "investment", "cost", e.target.value)
                                  }
                                  className="bg-neutral-900 border-white/10 text-white text-xs"
                                />
                              </div>
                            </div>
                          </div>

                          {/* 2. Action Items & Exercises */}
                          <div className="pt-3 border-t border-white/5">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Action Items & Exercises
                              </h5>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleAddStageListItem(idx, "actionItems", { task: "", detail: "" })
                                }
                                className="h-7 text-[11px] border-white/15 text-white"
                              >
                                <Plus className="w-3 h-3 mr-1" /> Add Task
                              </Button>
                            </div>
                            {(!stage.actionItems || stage.actionItems.length === 0) ? (
                              <p className="text-xs text-muted-foreground italic py-1">
                                No specific action items added yet. Click &quot;Add Task&quot; above.
                              </p>
                            ) : (
                              <div className="space-y-2">
                                {stage.actionItems.map((item, aIdx) => (
                                  <div key={aIdx} className="p-3 rounded-lg bg-neutral-900/80 border border-white/10 space-y-2">
                                    <div className="flex items-center gap-2">
                                      <Input
                                        type="text"
                                        placeholder="Task title (e.g. Build 3 full-stack applications)"
                                        value={item.task}
                                        onChange={(e) =>
                                          handleUpdateStageListItem(idx, "actionItems", aIdx, "task", e.target.value)
                                        }
                                        className="bg-black/50 border-white/10 text-white text-xs flex-1 font-medium"
                                      />
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleRemoveStageListItem(idx, "actionItems", aIdx)}
                                        className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </Button>
                                    </div>
                                    <Textarea
                                      rows={2}
                                      placeholder="Specific guidance, requirements, or instructions for this exercise..."
                                      value={item.detail || ""}
                                      onChange={(e) =>
                                        handleUpdateStageListItem(idx, "actionItems", aIdx, "detail", e.target.value)
                                      }
                                      className="bg-black/50 border-white/10 text-white text-xs"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 3. Helpful Resources */}
                          <div className="pt-3 border-t border-white/5">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5 text-sky-400" /> Helpful Resources (Courses, Books, Tools, Docs)
                              </h5>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleAddStageListItem(idx, "resources", {
                                    name: "",
                                    type: "course",
                                    url: "",
                                    note: "",
                                  })
                                }
                                className="h-7 text-[11px] border-white/15 text-white"
                              >
                                <Plus className="w-3 h-3 mr-1" /> Add Resource
                              </Button>
                            </div>
                            {(!stage.resources || stage.resources.length === 0) ? (
                              <p className="text-xs text-muted-foreground italic py-1">
                                No stage resources added yet. Click &quot;Add Resource&quot; above.
                              </p>
                            ) : (
                              <div className="space-y-2">
                                {stage.resources.map((res, rIdx) => (
                                  <div key={rIdx} className="p-3 rounded-lg bg-neutral-900/80 border border-white/10 space-y-2">
                                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                                      <div className="sm:col-span-6">
                                        <Input
                                          type="text"
                                          placeholder="Resource name (e.g. CS50x Harvard)"
                                          value={res.name}
                                          onChange={(e) =>
                                            handleUpdateStageListItem(idx, "resources", rIdx, "name", e.target.value)
                                          }
                                          className="bg-black/50 border-white/10 text-white text-xs font-medium"
                                        />
                                      </div>
                                      <div className="sm:col-span-3">
                                        <select
                                          value={res.type || "course"}
                                          onChange={(e) =>
                                            handleUpdateStageListItem(idx, "resources", rIdx, "type", e.target.value)
                                          }
                                          className="w-full bg-black/50 border border-white/10 text-white text-xs rounded-md px-2.5 py-2 outline-none h-9"
                                        >
                                          <option value="course">Course</option>
                                          <option value="book">Book</option>
                                          <option value="tool">Tool</option>
                                          <option value="documentation">Documentation</option>
                                          <option value="other">Other</option>
                                        </select>
                                      </div>
                                      <div className="sm:col-span-3 flex items-center gap-1">
                                        <Input
                                          type="text"
                                          placeholder="URL (https://...)"
                                          value={res.url || ""}
                                          onChange={(e) =>
                                            handleUpdateStageListItem(idx, "resources", rIdx, "url", e.target.value)
                                          }
                                          className="bg-black/50 border-white/10 text-white text-xs flex-1"
                                        />
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => handleRemoveStageListItem(idx, "resources", rIdx)}
                                          className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 flex-shrink-0"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </Button>
                                      </div>
                                    </div>
                                    <Input
                                      type="text"
                                      placeholder="Short note or tip (e.g. Best for algorithmic fundamentals, completely free)"
                                      value={res.note || ""}
                                      onChange={(e) =>
                                        handleUpdateStageListItem(idx, "resources", rIdx, "note", e.target.value)
                                      }
                                      className="bg-black/50 border-white/10 text-white text-xs"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 4. Readiness Checkpoint */}
                          <div className="pt-3 border-t border-white/5">
                            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <Target className="w-3.5 h-3.5 text-emerald-400" /> Milestone Readiness Checkpoint
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] text-muted-foreground mb-1">
                                  How to know you&apos;re ready to move to next stage
                                </label>
                                <Textarea
                                  rows={2}
                                  placeholder="e.g. Can solve LeetCode medium problems and explain time complexity without looking at solutions"
                                  value={stage.checkpoint?.criteria || ""}
                                  onChange={(e) =>
                                    handleUpdateStageNested(idx, "checkpoint", "criteria", e.target.value)
                                  }
                                  className="bg-neutral-900 border-white/10 text-white text-xs"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] text-muted-foreground mb-1">
                                  Core Deliverable / Proof of Work
                                </label>
                                <Textarea
                                  rows={2}
                                  placeholder="e.g. Deployed web project with user auth and persistent PostgreSQL database"
                                  value={stage.checkpoint?.deliverable || ""}
                                  onChange={(e) =>
                                    handleUpdateStageNested(idx, "checkpoint", "deliverable", e.target.value)
                                  }
                                  className="bg-neutral-900 border-white/10 text-white text-xs"
                                />
                              </div>
                            </div>
                          </div>

                          {/* 5. Branching & Decision Points */}
                          <div className="pt-3 border-t border-white/5">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                                <GitBranch className="w-3.5 h-3.5 text-purple-400" /> Branching & Decision Points
                              </h5>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleAddStageListItem(idx, "decisionPoints", {
                                    question: "",
                                    options: [{ choice: "", pros: "", cons: "" }],
                                  })
                                }
                                className="h-7 text-[11px] border-white/15 text-white"
                              >
                                <Plus className="w-3 h-3 mr-1" /> Add Decision Point
                              </Button>
                            </div>
                            {(!stage.decisionPoints || stage.decisionPoints.length === 0) ? (
                              <p className="text-xs text-muted-foreground italic py-1">
                                No branching decisions added yet. (Optional)
                              </p>
                            ) : (
                              <div className="space-y-3">
                                {stage.decisionPoints.map((dp, dpIdx) => (
                                  <div key={dpIdx} className="p-3 rounded-lg bg-neutral-900/80 border border-purple-500/20 space-y-3">
                                    <div className="flex items-center gap-2">
                                      <Input
                                        type="text"
                                        placeholder="Decision question (e.g. Choose Specialization: Frontend vs Backend vs Full-Stack)"
                                        value={dp.question}
                                        onChange={(e) =>
                                          handleUpdateStageListItem(idx, "decisionPoints", dpIdx, "question", e.target.value)
                                        }
                                        className="bg-black/50 border-white/10 text-white text-xs flex-1 font-semibold"
                                      />
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleRemoveStageListItem(idx, "decisionPoints", dpIdx)}
                                        className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </Button>
                                    </div>

                                    {/* Decision Options */}
                                    <div className="pl-3 border-l-2 border-purple-500/30 space-y-2">
                                      <div className="flex items-center justify-between">
                                        <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                                          Options / Paths:
                                        </span>
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => handleAddDecisionOption(idx, dpIdx)}
                                          className="h-6 text-[10px] text-purple-300 hover:text-white"
                                        >
                                          <Plus className="w-3 h-3 mr-1" /> Add Option
                                        </Button>
                                      </div>
                                      {(dp.options || []).map((opt, optIdx) => (
                                        <div key={optIdx} className="p-2.5 rounded bg-black/40 border border-white/5 space-y-2">
                                          <div className="flex items-center gap-2">
                                            <Input
                                              type="text"
                                              placeholder="Option name (e.g. Backend Engineering)"
                                              value={opt.choice}
                                              onChange={(e) =>
                                                handleUpdateDecisionOption(idx, dpIdx, optIdx, "choice", e.target.value)
                                              }
                                              className="bg-black/50 border-white/10 text-white text-xs flex-1 font-medium"
                                            />
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="sm"
                                              onClick={() => handleRemoveDecisionOption(idx, dpIdx, optIdx)}
                                              className="h-7 w-7 p-0 text-destructive"
                                            >
                                              <Trash2 className="w-3 h-3" />
                                            </Button>
                                          </div>
                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            <Input
                                              type="text"
                                              placeholder="Pros (e.g. High salary, architectural depth)"
                                              value={opt.pros || ""}
                                              onChange={(e) =>
                                                handleUpdateDecisionOption(idx, dpIdx, optIdx, "pros", e.target.value)
                                              }
                                              className="bg-black/50 border-emerald-500/30 text-emerald-300 text-xs"
                                            />
                                            <Input
                                              type="text"
                                              placeholder="Cons (e.g. Abstract, less visual feedback)"
                                              value={opt.cons || ""}
                                              onChange={(e) =>
                                                handleUpdateDecisionOption(idx, dpIdx, optIdx, "cons", e.target.value)
                                              }
                                              className="bg-black/50 border-amber-500/30 text-amber-300 text-xs"
                                            />
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 6. Pitfalls & Warning Callout */}
                          <div className="pt-3 border-t border-white/5">
                            <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Common Pitfalls / Things People Get Wrong
                            </h5>
                            <Textarea
                              rows={2}
                              placeholder="e.g. Getting trapped in tutorial hell without writing code from scratch, or memorizing syntax instead of problem solving..."
                              value={stage.warning || ""}
                              onChange={(e) => handleUpdateStage(idx, "warning", e.target.value)}
                              className="bg-neutral-900 border-amber-500/20 text-white text-xs"
                            />
                          </div>

                          {/* 7. Fallback / Backup Plan */}
                          <div className="pt-3 border-t border-white/5">
                            <h5 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" /> Fallback / Pivot Plan (What if stuck or failing this stage)
                            </h5>
                            <Textarea
                              rows={2}
                              placeholder="e.g. If DSA proves too hard right now, pivot to QA Automation, Salesforce, or low-code development while studying fundamentals part-time..."
                              value={stage.fallbackPlan || ""}
                              onChange={(e) => handleUpdateStage(idx, "fallbackPlan", e.target.value)}
                              className="bg-neutral-900 border-indigo-500/20 text-white text-xs"
                            />
                          </div>

                          {/* 8. Real-World Metrics & Market Data */}
                          <div className="pt-3 border-t border-white/5">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                                <TrendingUp className="w-3.5 h-3.5 text-primary" /> Real-World Data Points & Benchmarks
                              </h5>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleAddStageListItem(idx, "realWorldStats", {
                                    label: "",
                                    value: "",
                                    context: "",
                                  })
                                }
                                className="h-7 text-[11px] border-white/15 text-white"
                              >
                                <Plus className="w-3 h-3 mr-1" /> Add Metric
                              </Button>
                            </div>
                            {(!stage.realWorldStats || stage.realWorldStats.length === 0) ? (
                              <p className="text-xs text-muted-foreground italic py-1">
                                No real-world stats added yet. (Optional)
                              </p>
                            ) : (
                              <div className="space-y-2">
                                {stage.realWorldStats.map((stat, sIdx) => (
                                  <div key={sIdx} className="p-2.5 rounded-lg bg-neutral-900/80 border border-white/10 flex flex-col sm:flex-row items-center gap-2">
                                    <Input
                                      type="text"
                                      placeholder="Metric (e.g. Avg Time Taken)"
                                      value={stat.label}
                                      onChange={(e) =>
                                        handleUpdateStageListItem(idx, "realWorldStats", sIdx, "label", e.target.value)
                                      }
                                      className="bg-black/50 border-white/10 text-white text-xs sm:w-1/3"
                                    />
                                    <Input
                                      type="text"
                                      placeholder="Value (e.g. 6-9 Months)"
                                      value={stat.value}
                                      onChange={(e) =>
                                        handleUpdateStageListItem(idx, "realWorldStats", sIdx, "value", e.target.value)
                                      }
                                      className="bg-black/50 border-white/10 text-white text-xs sm:w-1/3 font-semibold"
                                    />
                                    <Input
                                      type="text"
                                      placeholder="Context (e.g. Consistent 15 hrs/wk)"
                                      value={stat.context || ""}
                                      onChange={(e) =>
                                        handleUpdateStageListItem(idx, "realWorldStats", sIdx, "context", e.target.value)
                                      }
                                      className="bg-black/50 border-white/10 text-white text-xs flex-1"
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleRemoveStageListItem(idx, "realWorldStats", sIdx)}
                                      className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 flex-shrink-0"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddStage}
                  className="border-dashed border-white/20 text-muted-foreground hover:text-white text-xs w-full py-6"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Next Roadmap Stage
                </Button>
              </div>
            </div>
          )}

          {/* TAB 3: RELATED COURSES (OPTIONAL) */}
          {activeTab === "courses" && (
            <div className="space-y-6">
              {/* Informational Guidance Banner */}
              <div className="bg-sky-500/10 border border-sky-500/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-sky-400" /> Related Courses & Certifications
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
                      Optional
                    </span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
                    Add curated online courses, degrees, or certifications relevant to this career. 
                    <strong className="text-white ml-1">If you don't add any courses, the roadmap detail page will simply show the roadmap only.</strong>
                  </p>
                </div>

                <Button
                  type="button"
                  onClick={handleAddCourse}
                  className="bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs h-9"
                >
                  <Plus className="w-4 h-4 mr-1.5" /> Add Course
                </Button>
              </div>

              {formData.courses.length === 0 ? (
                <div className="bg-card border border-white/10 rounded-2xl p-10 text-center text-muted-foreground">
                  <BookOpen className="w-10 h-10 text-white/20 mx-auto mb-3" />
                  <h4 className="text-white font-semibold mb-1">No Courses Added Yet</h4>
                  <p className="text-xs max-w-md mx-auto mb-4 leading-relaxed">
                    This roadmap will display without a courses section on the public site. You can add recommended online courses or bootcamps below at any time.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddCourse}
                    className="border-white/15 text-xs text-white"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add First Course
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.courses.map((c, cIdx) => (
                    <div
                      key={cIdx}
                      className="bg-card border border-white/10 rounded-2xl p-5 relative group hover:border-white/20 transition-colors shadow-lg"
                    >
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs">
                            {cIdx + 1}
                          </span>
                          <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                            Course {cIdx + 1}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            disabled={cIdx === 0}
                            onClick={() => handleMoveCourse(cIdx, "up")}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-white"
                            title="Move course up"
                          >
                            <MoveUp className="w-4 h-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            disabled={cIdx === formData.courses.length - 1}
                            onClick={() => handleMoveCourse(cIdx, "down")}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-white"
                            title="Move course down"
                          >
                            <MoveDown className="w-4 h-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveCourse(cIdx)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/15"
                            title="Delete this course"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1">
                            Course Title *
                          </label>
                          <Input
                            type="text"
                            placeholder="e.g. CS50: Introduction to Computer Science"
                            value={c.title}
                            onChange={(e) =>
                              handleUpdateCourse(cIdx, "title", e.target.value)
                            }
                            className="bg-neutral-900 border-white/10 text-white font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1">
                            Platform / University / Provider
                          </label>
                          <Input
                            type="text"
                            placeholder="e.g. Harvard University (edX) or Coursera"
                            value={c.provider}
                            onChange={(e) =>
                              handleUpdateCourse(cIdx, "provider", e.target.value)
                            }
                            className="bg-neutral-900 border-white/10 text-white text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                            <Link2 className="w-3 h-3 text-sky-400" /> Course Link URL
                          </label>
                          <Input
                            type="url"
                            placeholder="https://edx.org/course/..."
                            value={c.url}
                            onChange={(e) =>
                              handleUpdateCourse(cIdx, "url", e.target.value)
                            }
                            className="bg-neutral-900 border-white/10 text-white text-xs font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1">
                            Difficulty Level
                          </label>
                          <select
                            value={c.level || "Beginner"}
                            onChange={(e) =>
                              handleUpdateCourse(cIdx, "level", e.target.value)
                            }
                            className="w-full bg-neutral-900 border border-white/10 text-white text-xs rounded-md px-3 py-2 outline-none"
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="All Levels">All Levels</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1">
                            Price / Fee
                          </label>
                          <Input
                            type="text"
                            placeholder="e.g. Free, Free Audit, ₹499"
                            value={c.price}
                            onChange={(e) =>
                              handleUpdateCourse(cIdx, "price", e.target.value)
                            }
                            className="bg-neutral-900 border-white/10 text-white text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1">
                            Estimated Duration
                          </label>
                          <Input
                            type="text"
                            placeholder="e.g. 10-12 Weeks (6 hrs/wk)"
                            value={c.duration}
                            onChange={(e) =>
                              handleUpdateCourse(cIdx, "duration", e.target.value)
                            }
                            className="bg-neutral-900 border-white/10 text-white text-xs"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-medium text-muted-foreground mb-1">
                            Highlight Badge
                          </label>
                          <Input
                            type="text"
                            placeholder="e.g. Foundational, Hands-on, Industry Certified"
                            value={c.badge}
                            onChange={(e) =>
                              handleUpdateCourse(cIdx, "badge", e.target.value)
                            }
                            className="bg-neutral-900 border-white/10 text-white text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">
                          Brief Course Description / Syllabus Highlights
                        </label>
                        <Textarea
                          rows={2}
                          placeholder="Summary of what the student will learn from this specific course..."
                          value={c.description}
                          onChange={(e) =>
                            handleUpdateCourse(cIdx, "description", e.target.value)
                          }
                          className="bg-neutral-900 border-white/10 text-white text-xs"
                        />
                      </div>
                    </div>
                  ))}

                  <div className="text-center pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddCourse}
                      className="border-dashed border-white/20 text-muted-foreground hover:text-white text-xs w-full py-5"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Another Course
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: RELATED VIDEOS (ATTACH FROM UPLOADED LIBRARY ONLY) */}
          {activeTab === "videos" && (
            <div className="space-y-6">
              {/* Informational Guidance Banner */}
              <div className="bg-gradient-to-r from-primary/10 to-amber-500/10 border border-primary/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <VideoIcon className="w-5 h-5 text-primary" /> Related Videos & Masterclasses
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-primary/20 text-primary">
                      From Uploaded Library
                    </span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
                    Attach videos directly from your library of uploaded videos. 
                    <strong className="text-white ml-1">Manual external YouTube links are disabled</strong> — all videos must be managed in the Video Studio to maintain verified links and custom Free/Paid tiers.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Button
                    type="button"
                    onClick={() => {
                      setPickerFilter("all");
                      setPickerSearch("");
                      setShowVideoPicker(true);
                    }}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs h-9 shadow-md shadow-primary/20"
                  >
                    <FolderPlus className="w-4 h-4 mr-1.5" /> Attach Uploaded Video
                  </Button>
                  <Button
                    asChild
                    type="button"
                    variant="outline"
                    className="border-white/15 text-white hover:bg-white/10 text-xs h-9"
                  >
                    <Link href="/admin/videos" target="_blank">
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Video Studio
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Video List */}
              {(!formData.videos || formData.videos.length === 0) ? (
                <div className="bg-card border border-dashed border-white/15 rounded-2xl p-10 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3 text-primary">
                    <Film className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-semibold text-white mb-1">
                    No Videos Attached to this Roadmap
                  </h4>
                  <p className="text-xs text-muted-foreground max-w-md mx-auto mb-5 leading-relaxed">
                    Attach verified videos from your library of {(uploadedVideos || []).length} uploaded videos. Students will be able to watch free guidance videos directly or purchase paid masterclasses.
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <Button
                      type="button"
                      onClick={() => {
                        setPickerFilter("all");
                        setPickerSearch("");
                        setShowVideoPicker(true);
                      }}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold"
                    >
                      <Plus className="w-4 h-4 mr-1.5" /> Select from Uploaded Videos
                    </Button>
                    <Button
                      asChild
                      type="button"
                      variant="outline"
                      className="border-white/15 text-xs text-white"
                    >
                      <Link href="/admin/videos" target="_blank">
                        <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Upload New Video in Studio
                      </Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.videos.map((vid, vIdx) => (
                    <div
                      key={vid.videoId || vid.videoUrl || vIdx}
                      className="bg-card border border-white/10 rounded-2xl p-4 sm:p-5 relative group hover:border-white/25 transition-colors shadow-lg"
                    >
                      {/* Top Header of Card */}
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                            {vIdx + 1}
                          </span>
                          <span className="text-xs font-semibold text-white/90">
                            Roadmap Video #{vIdx + 1}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
                            <Check className="w-2.5 h-2.5 text-emerald-400" /> Sourced from Uploaded Library
                          </span>
                          {vid.isPaid ? (
                            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold">
                              <Lock className="w-2.5 h-2.5" /> Paid Masterclass ({vid.price || "₹299"})
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold">
                              <CheckCircle2 className="w-2.5 h-2.5" /> Free to Watch
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            disabled={vIdx === 0}
                            onClick={() => handleMoveVideo(vIdx, "up")}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-white"
                            title="Move up"
                          >
                            <MoveUp className="w-4 h-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            disabled={vIdx === (formData.videos.length - 1)}
                            onClick={() => handleMoveVideo(vIdx, "down")}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-white"
                            title="Move down"
                          >
                            <MoveDown className="w-4 h-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDetachVideo(vIdx)}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-red-400 hover:bg-red-400/10"
                            title="Detach video from this roadmap"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Video Card Content (Read-only, sourced from Uploaded Video) */}
                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        {/* Thumbnail */}
                        <div className="relative w-full sm:w-44 aspect-video rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                          <img
                            src={vid.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=640&q=80"}
                            alt={vid.title}
                            className="w-full h-full object-cover opacity-85"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                              <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                            </div>
                          </div>
                          {vid.duration && (
                            <span className="absolute bottom-1.5 right-1.5 text-[10px] bg-black/80 font-mono text-white px-1.5 py-0.5 rounded">
                              {vid.duration}
                            </span>
                          )}
                        </div>

                        {/* Metadata details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-white mb-1 leading-snug">
                            {vid.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
                            <span className="text-white/80 font-medium">{vid.mentor}</span>
                            {vid.mentorRole && <span>• {vid.mentorRole}</span>}
                          </p>

                          <div className="flex items-center gap-2 flex-wrap text-[11px]">
                            <span className="px-2 py-0.5 rounded bg-white/5 text-muted-foreground border border-white/10 font-medium">
                              Tag: {vid.tag || "Reality Check"}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-white/5 text-muted-foreground border border-white/10 font-mono">
                              Duration: {vid.duration || "N/A"}
                            </span>
                            {vid.description && (
                              <span className="text-muted-foreground text-xs line-clamp-1 italic max-w-sm">
                                "{vid.description}"
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="text-center pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setPickerFilter("all");
                        setPickerSearch("");
                        setShowVideoPicker(true);
                      }}
                      className="border-dashed border-white/20 text-muted-foreground hover:text-white text-xs w-full py-5 hover:border-primary/40"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Attach Another Uploaded Video
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: SPECIALIZATION PATHS & SKILLS */}
          {activeTab === "paths" && (
            <div className="space-y-6">
              {/* Specialization Paths */}
              <div className="bg-card border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" /> Career Tracks / Roles
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Sub-roles or specialization avenues within this field.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddPath}
                    className="border-white/15 text-xs"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Track
                  </Button>
                </div>

                <div className="space-y-4">
                  {formData.paths.map((p, pIdx) => (
                    <div
                      key={pIdx}
                      className="bg-white/[0.02] border border-white/5 rounded-xl p-4 relative"
                    >
                      <div className="flex justify-between items-start gap-3 mb-2">
                        <Input
                          type="text"
                          placeholder="Role title (e.g. Frontend Engineer)"
                          value={p.title}
                          onChange={(e) =>
                            handleUpdatePath(pIdx, "title", e.target.value)
                          }
                          className="bg-neutral-900 border-white/10 text-white font-semibold text-sm max-w-sm"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemovePath(pIdx)}
                          className="text-muted-foreground hover:text-destructive h-8 w-8 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <Input
                        type="text"
                        placeholder="Brief summary of duties and responsibilities..."
                        value={p.desc}
                        onChange={(e) =>
                          handleUpdatePath(pIdx, "desc", e.target.value)
                        }
                        className="bg-neutral-900 border-white/10 text-white text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Skills */}
              <div className="bg-card border border-white/10 rounded-2xl p-6">
                <h3 className="text-base font-bold text-white mb-1">Core Skills</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Enter key skills as comma-separated values (e.g. System Design, Python, React, Teamwork)
                </p>
                <Textarea
                  rows={3}
                  value={formData.skillsString}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, skillsString: e.target.value }))
                  }
                  className="bg-neutral-900 border-white/10 text-white text-sm"
                  placeholder="Python, Problem Solving, Data Structures, Git..."
                />
              </div>

              {/* Fit Criteria */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-green-500/5 border border-green-500/15 rounded-2xl p-6">
                  <h4 className="text-sm font-bold text-green-400 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Who Should Choose This
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">Comma-separated traits</p>
                  <Textarea
                    rows={3}
                    value={formData.whoShouldString}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, whoShouldString: e.target.value }))
                    }
                    className="bg-neutral-900 border-white/10 text-white text-xs"
                    placeholder="Logical thinkers, Creative minds..."
                  />
                </div>

                <div className="bg-red-500/5 border border-red-500/15 rounded-2xl p-6">
                  <h4 className="text-sm font-bold text-red-400 mb-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Who Should Avoid This
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">Comma-separated traits</p>
                  <Textarea
                    rows={3}
                    value={formData.whoShouldAvoidString}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        whoShouldAvoidString: e.target.value,
                      }))
                    }
                    className="bg-neutral-900 border-white/10 text-white text-xs"
                    placeholder="People who dislike reading, Those wanting 9-5 predictability..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: EXAMS, COLLEGES & SALARIES */}
          {activeTab === "metadata" && (
            <div className="space-y-6">
              {/* Salary Ladder */}
              <div className="bg-card border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-primary" /> Salary Progression Milestones
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Compensation expectations at different career levels in India.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddSalaryTier}
                    className="border-white/15 text-xs"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Tier
                  </Button>
                </div>

                <div className="space-y-3">
                  {formData.salaryExpectations.map((sal, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-3"
                    >
                      <Input
                        type="text"
                        placeholder="Level (e.g. Fresher)"
                        value={sal.level}
                        onChange={(e) =>
                          handleUpdateSalary(sIdx, "level", e.target.value)
                        }
                        className="bg-neutral-900 border-white/10 text-white text-xs font-semibold max-w-xs"
                      />
                      <Input
                        type="text"
                        placeholder="Amount (e.g. ₹6L - ₹12L / year)"
                        value={sal.amount}
                        onChange={(e) =>
                          handleUpdateSalary(sIdx, "amount", e.target.value)
                        }
                        className="bg-neutral-900 border-white/10 text-white text-xs font-mono"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSalaryTier(sIdx)}
                        className="text-muted-foreground hover:text-destructive h-8 w-8 p-0 flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Entrance Exams & Colleges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-card border border-white/10 rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-white mb-1">Key Entrance Exams</h3>
                  <p className="text-xs text-muted-foreground mb-3">Comma-separated exam names</p>
                  <Textarea
                    rows={3}
                    value={formData.examsString}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, examsString: e.target.value }))
                    }
                    className="bg-neutral-900 border-white/10 text-white text-xs"
                    placeholder="JEE Main, BITSAT, GATE..."
                  />
                </div>

                <div className="bg-card border border-white/10 rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-white mb-1">Top Colleges & Institutes</h3>
                  <p className="text-xs text-muted-foreground mb-3">Comma-separated institute names</p>
                  <Textarea
                    rows={3}
                    value={formData.collegesString}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, collegesString: e.target.value }))
                    }
                    className="bg-neutral-900 border-white/10 text-white text-xs"
                    placeholder="IIT Bombay, BITS Pilani, IIIT Hyderabad..."
                  />
                </div>
              </div>

              {/* Reality & Investment */}
              <div className="bg-card border border-white/10 rounded-2xl p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                    The Harsh Reality (Honest Assessment)
                  </label>
                  <Textarea
                    rows={2}
                    value={formData.harshReality}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, harshReality: e.target.value }))
                    }
                    className="bg-neutral-900 border-white/10 text-white text-sm"
                    placeholder="Unfiltered reality about stress, hours, competition, or tech changes..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                      Estimated Degree / Learning Investment
                    </label>
                    <Input
                      type="text"
                      value={formData.investment}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, investment: e.target.value }))
                      }
                      className="bg-neutral-900 border-white/10 text-white text-xs"
                      placeholder="e.g. ₹5 Lakhs (Govt) to ₹20 Lakhs (Private)"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1">
                      First Job / Opportunity Route
                    </label>
                    <Input
                      type="text"
                      value={formData.firstOpportunity}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          firstOpportunity: e.target.value,
                        }))
                      }
                      className="bg-neutral-900 border-white/10 text-white text-xs"
                      placeholder="e.g. Campus placement, open source, hackathons"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sticky Bottom Action Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4 bg-background/95 backdrop-blur-md p-4 rounded-2xl border shadow-2xl z-30">
            <div className="text-xs text-muted-foreground">
              {isEditing ? (
                <span>
                  Editing <strong className="text-white">{formData.title}</strong> (
                  <strong className="text-white">{formData.timeline.length}</strong> stages,{" "}
                  <strong className="text-white">{formData.courses.length}</strong> courses)
                </span>
              ) : (
                <span>
                  Creating new course with{" "}
                  <strong className="text-white">{formData.timeline.length}</strong> stages,{" "}
                  <strong className="text-white">{formData.courses.length}</strong> courses
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setLocation("/admin")}
                className="text-muted-foreground hover:text-white text-xs flex-1 sm:flex-initial"
              >
                Cancel
              </Button>

              {isEditing && (
                <Button
                  asChild
                  type="button"
                  variant="outline"
                  className="border-white/20 text-xs flex-1 sm:flex-initial"
                >
                  <Link href={`/roadmaps/${editCourseId}`} target="_blank">
                    <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Preview Live
                  </Link>
                </Button>
              )}

              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-xs px-6 shadow-lg shadow-primary/20 flex-1 sm:flex-initial"
              >
                <Save className="w-4 h-4 mr-2" />
                {isEditing ? "Update Course & Roadmap" : "Save Course & Roadmap"}
              </Button>
            </div>
          </div>
        </form>

        {/* VIDEO PICKER MODAL (ATTACH FROM UPLOADED VIDEOS ONLY) */}
        {showVideoPicker && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            <div className="bg-card border border-white/15 rounded-2xl w-full max-w-4xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="p-5 border-b border-white/10 flex items-start justify-between gap-4 bg-white/5">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <VideoIcon className="w-5 h-5 text-primary" /> Select Uploaded Videos to Attach
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Choose from {(uploadedVideos || []).length} videos uploaded in the Video Studio. External links are disabled to preserve verified content.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowVideoPicker(false)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search & Filter Bar */}
              <div className="p-4 border-b border-white/10 bg-neutral-950/60 space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <Input
                    type="text"
                    placeholder="Search by title, mentor name, category, or career..."
                    value={pickerSearch}
                    onChange={(e) => setPickerSearch(e.target.value)}
                    className="bg-neutral-900 border-white/10 pl-10 text-xs text-white"
                  />
                  {pickerSearch && (
                    <button
                      type="button"
                      onClick={() => setPickerSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setPickerFilter("all")}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                      pickerFilter === "all"
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "bg-white/5 text-muted-foreground hover:text-white border border-white/10"
                    }`}
                  >
                    All Uploaded ({(uploadedVideos || []).length})
                  </button>

                  {careerMatchingVideos.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setPickerFilter("career")}
                      className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                        pickerFilter === "career"
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "bg-white/5 text-muted-foreground hover:text-white border border-white/10"
                      }`}
                    >
                      Matched to This Career ({careerMatchingVideos.length})
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setPickerFilter("free")}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                      pickerFilter === "free"
                        ? "bg-emerald-500 text-white font-semibold"
                        : "bg-white/5 text-muted-foreground hover:text-white border border-white/10"
                    }`}
                  >
                    Free Guidance ({freeVideosList.length})
                  </button>

                  <button
                    type="button"
                    onClick={() => setPickerFilter("paid")}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                      pickerFilter === "paid"
                        ? "bg-amber-500 text-black font-semibold"
                        : "bg-white/5 text-muted-foreground hover:text-white border border-white/10"
                    }`}
                  >
                    Paid Masterclasses ({paidVideosList.length})
                  </button>
                </div>
              </div>

              {/* Notice Bar for Video Studio Link */}
              <div className="px-5 py-2.5 bg-primary/5 border-b border-white/5 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  Showing {filteredPickerVideos.length} uploaded videos. Currently attached:{" "}
                  <strong className="text-white">{(formData.videos || []).length}</strong>
                </span>
                <Link
                  href="/admin/videos"
                  target="_blank"
                  className="text-primary hover:underline flex items-center gap-1 font-medium"
                >
                  Upload New Video in Studio <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              {/* Videos List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
                {filteredPickerVideos.length === 0 ? (
                  <div className="py-12 text-center text-muted-foreground">
                    <VideoIcon className="w-10 h-10 text-white/20 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-white">No uploaded videos match your search</p>
                    <p className="text-xs mt-1">Try changing your search keywords or filter tab.</p>
                  </div>
                ) : (
                  filteredPickerVideos.map((video) => {
                    const attached = isVideoAttached(video);
                    return (
                      <div
                        key={video._id || video.id}
                        className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                          attached
                            ? "bg-primary/10 border-primary/40 shadow-sm"
                            : "bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/[0.07]"
                        }`}
                      >
                        {/* Video Preview */}
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="relative w-28 aspect-video rounded-lg overflow-hidden bg-black/40 shrink-0 border border-white/10">
                            <img
                              src={video.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=640&q=80"}
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute bottom-1 right-1 text-[9px] bg-black/80 font-mono text-white px-1 py-0.2 rounded">
                              {video.duration || "20:00"}
                            </span>
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              {video.isPaid ? (
                                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                                  <Lock className="w-2.5 h-2.5" /> {video.price || "₹299"}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                                  <CheckCircle2 className="w-2.5 h-2.5" /> Free
                                </span>
                              )}
                              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-muted-foreground border border-white/10">
                                {video.tag || "Reality Check"}
                              </span>
                              {video.careerTitle && (
                                <span className="text-[10px] text-primary/80 font-medium">
                                  {video.careerTitle}
                                </span>
                              )}
                            </div>

                            <h4 className="text-xs sm:text-sm font-semibold text-white truncate max-w-md">
                              {video.title}
                            </h4>
                            <p className="text-[11px] text-muted-foreground truncate">
                              {video.mentor} {video.mentorRole ? `• ${video.mentorRole}` : ""}
                            </p>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="shrink-0 w-full sm:w-auto flex justify-end">
                          {attached ? (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleToggleAttachVideo(video)}
                              className="border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30 text-xs h-8 group/btn"
                            >
                              <span className="group-hover/btn:hidden flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5" /> Attached
                              </span>
                              <span className="hidden group-hover/btn:flex items-center gap-1.5">
                                <Trash2 className="w-3.5 h-3.5" /> Detach
                              </span>
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              size="sm"
                              onClick={() => handleAttachVideo(video)}
                              className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-8"
                            >
                              <Plus className="w-3.5 h-3.5 mr-1" /> Attach Video
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-white/10 bg-neutral-950/80 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  <strong className="text-white">{(formData.videos || []).length}</strong> videos attached to this roadmap
                </span>
                <Button
                  type="button"
                  onClick={() => setShowVideoPicker(false)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs px-5"
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
