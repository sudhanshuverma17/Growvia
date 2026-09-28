import mongoose from "mongoose";

const counselingBookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    userEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    mentorName: {
      type: String,
      default: "Sudhanshu Verma",
      trim: true,
    },
    sessionTitle: {
      type: String,
      default: "1:1 Career Strategy & Roadmap Mentorship",
      trim: true,
    },
    roadmapTitle: {
      type: String,
      default: "General Career Strategy",
      trim: true,
    },
    scheduledDate: {
      type: Date,
      required: [true, "Scheduled date and time are required"],
    },
    durationMinutes: {
      type: Number,
      default: 45,
    },
    meetLink: {
      type: String,
      required: [true, "Meeting link is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
    bookingReference: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const CounselingBooking = mongoose.model("CounselingBooking", counselingBookingSchema);

export default CounselingBooking;
