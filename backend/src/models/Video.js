import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Video title is required"],
      trim: true,
    },
    mentor: {
      type: String,
      required: [true, "Mentor / speaker name is required"],
      trim: true,
    },
    mentorRole: {
      type: String,
      default: "Industry Professional",
      trim: true,
    },
    careerId: {
      type: String,
      required: [true, "Associated career identifier is required"],
      trim: true,
      index: true,
    },
    careerTitle: {
      type: String,
      default: "",
    },
    videoUrl: {
      type: String,
      required: [true, "Video URL is required"],
      trim: true,
    },
    thumbnail: {
      type: String,
      default: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=640&q=80",
    },
    duration: {
      type: String,
      default: "20:00",
    },
    views: {
      type: String,
      default: "1.5K",
    },
    tag: {
      type: String,
      default: "Reality Check",
      trim: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    price: {
      type: String,
      default: "Free", // e.g. "Free", "₹199", "₹499", "₹999"
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model("Video", videoSchema);

export default Video;
