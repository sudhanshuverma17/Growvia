import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import CounselingBooking from "../models/CounselingBooking.js";
import User from "../models/User.js";

async function seedUserBooking() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const targetEmails = [
      "student@growvia.com",
      "vermaji1372005@gmail.com",
      "student@gmail.com",
      "user856003@gmail.com",
      "yguptas174@gmail.com",
    ];

    const users = await User.find({ email: { $in: targetEmails } });
    console.log(`Found ${users.length} target users.`);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(16, 30, 0, 0); // 4:30 PM

    for (const u of users) {
      const existing = await CounselingBooking.findOne({ userId: u._id });
      if (!existing) {
        const doc = await CounselingBooking.create({
          userId: u._id,
          userEmail: u.email,
          userName: u.name || "Student",
          mentorName: "Sudhanshu Verma",
          sessionTitle: "1:1 Career Strategy & Roadmap Review",
          roadmapTitle:
            u.purchasedRoadmaps && u.purchasedRoadmaps[0]
              ? `${u.purchasedRoadmaps[0].charAt(0).toUpperCase() + u.purchasedRoadmaps[0].slice(1)} Roadmap Strategy`
              : "Actuary & Career Strategy",
          scheduledDate: tomorrow,
          durationMinutes: 45,
          meetLink: "https://meet.google.com/qmv-sgyt-zkw",
          status: "scheduled",
          notes: "Booked via DaySchedule with Sudhanshu Verma. Google Meet link confirmed.",
        });
        console.log(`✅ Created counseling booking for ${u.email}:`, doc._id);
      } else {
        console.log(`ℹ️ User ${u.email} already has a booking:`, existing._id);
      }
    }

    const allBookings = await CounselingBooking.find();
    console.log("Total counseling bookings in DB:", allBookings.length);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding booking:", error);
    process.exit(1);
  }
}

seedUserBooking();
