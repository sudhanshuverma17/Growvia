import mongoose from "mongoose";

const timelineStageSchema = new mongoose.Schema({
  year: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, default: "" },
}, { _id: false });

const relatedCourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  provider: { type: String, default: "" },
  url: { type: String, default: "" },
  level: { type: String, default: "Beginner" },
  duration: { type: String, default: "" },
  price: { type: String, default: "Free" },
  badge: { type: String, default: "" },
  description: { type: String, default: "" },
  videoUrl: { type: String, default: "" },
  isPaid: { type: Boolean, default: false },
}, { _id: false });

const courseVideoSchema = new mongoose.Schema({
  videoId: { type: String, default: "" },
  title: { type: String, required: true },
  mentor: { type: String, default: "" },
  mentorRole: { type: String, default: "" },
  videoUrl: { type: String, required: true },
  thumbnail: { type: String, default: "" },
  duration: { type: String, default: "" },
  isPaid: { type: Boolean, default: false },
  price: { type: String, default: "Free" },
  tag: { type: String, default: "Masterclass" },
  description: { type: String, default: "" },
}, { _id: false });

const specializationPathSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, default: "" },
}, { _id: false });

const salaryTierSchema = new mongoose.Schema({
  level: { type: String, required: true },
  amount: { type: String, required: true },
}, { _id: false });

const courseSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Course category is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "Briefcase",
    },
    stats: {
      salary: { type: String, default: "₹6L - ₹20L+" },
      demand: { type: String, default: "High" },
      difficulty: { type: String, default: "Medium" },
    },
    timeline: [timelineStageSchema],
    courses: [relatedCourseSchema],
    videos: [courseVideoSchema],
    paths: [specializationPathSchema],
    whyChoose: [{ type: String }],
    skills: [{ type: String }],
    exams: [{ type: String }],
    colleges: [{ type: String }],
    budgetColleges: [{ type: String }],
    abroad: [{ type: String }],
    investment: { type: String, default: "" },
    salaryExpectations: [salaryTierSchema],
    dailyWork: [{ type: String }],
    firstOpportunity: { type: String, default: "" },
    whoShould: [{ type: String }],
    whoShouldAvoid: [{ type: String }],
    harshReality: { type: String, default: "" },
    industryInsights: { type: String, default: "" },
    isCustom: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Virtual or method to convert MongoDB document cleanly for client
courseSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

export const Course = mongoose.model("Course", courseSchema);
