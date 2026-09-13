import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB, disconnectDB } from "../config/db.js";
import { Course } from "../models/Course.js";
import User from "../models/User.js";
import Video from "../models/Video.js";
import { seedCareers } from "../data/seedData.js";
import { seedVideos } from "../data/seedVideos.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });

const runSeed = async () => {
  console.log("\n🌱 Starting database seeding...");
  const conn = await connectDB();
  if (!conn) {
    console.error("❌ Failed to connect to MongoDB. Aborting seed.");
    process.exit(1);
  }

  try {
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      console.log(`[Seed]: Seeding ${seedCareers.length} career roadmaps...`);
      await Course.insertMany(seedCareers);
      console.log(`✅ Seeded ${seedCareers.length} courses.`);
    } else {
      console.log(`ℹ️ Courses already exist (${courseCount} found).`);
    }

    const adminEmail = (process.env.ADMIN_EMAIL || "admin@growvia.com").trim().toLowerCase();
    const adminUser = await User.findOne({ email: adminEmail });
    if (!adminUser) {
      console.log(`[Seed]: Creating default Admin user for ${adminEmail}...`);
      await User.create({
        name: "Growvia Administrator",
        email: adminEmail,
        password: "Admin@1234",
        role: "admin",
      });
      console.log(`✅ Default Admin user created: ${adminEmail} / Admin@1234`);
    } else {
      if (adminUser.role !== "admin") {
        adminUser.role = "admin";
        await adminUser.save();
      }
      console.log(`ℹ️ Admin user (${adminEmail}) already exists.`);
    }

    const videoCount = await Video.countDocuments();
    if (videoCount === 0) {
      console.log(`[Seed]: Seeding ${seedVideos.length} mentor guidance videos...`);
      await Video.insertMany(seedVideos);
      console.log(`✅ Seeded ${seedVideos.length} videos.`);
    } else {
      console.log(`ℹ️ Videos already exist (${videoCount} found).`);
    }

    console.log("\n🎉 Database seeding process completed successfully!\n");
  } catch (err) {
    console.error("❌ Error during seeding:", err);
  } finally {
    await disconnectDB();
    process.exit(0);
  }
};

runSeed();
