import dns from "dns";
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { Course } from "../models/Course.js";
import { QUIZ_PROFILES, DOMAINS, cosineSimilarity } from "../config/quizDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });

export async function runMigration({ closeConnection = true } = {}) {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI environment variable is not defined in backend/.env");
  }

  console.log("\n========================================================");
  console.log("🚀 Starting Quiz Profile Migration for 48 Career Roadmaps");
  console.log("========================================================");

  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
  }

  const slugs = Object.keys(QUIZ_PROFILES);
  console.log(`📋 Found ${slugs.length} target roadmap profiles in quizDomains.js\n`);

  let updatedCount = 0;
  let missingCount = 0;
  const missingSlugs = [];

  for (const slug of slugs) {
    const profile = QUIZ_PROFILES[slug];
    const result = await Course.updateOne(
      { id: slug },
      { $set: { quizProfile: profile } }
    );

    if (result.matchedCount > 0) {
      updatedCount++;
      console.log(`  ✅ [${slug.padEnd(24)}] -> Domain: ${profile.domain.padEnd(20)} (tags: ${profile.tags.length})`);
    } else {
      missingCount++;
      missingSlugs.push(slug);
      console.warn(`  ⚠️ [${slug.padEnd(24)}] -> NOT FOUND in courses collection!`);
    }
  }

  console.log("\n--------------------------------------------------------");
  console.log(`📊 Migration Summary:`);
  console.log(`   Total Profiles in Registry: ${slugs.length}`);
  console.log(`   Successfully Updated in DB: ${updatedCount}`);
  console.log(`   Missing in DB:             ${missingCount}`);
  if (missingSlugs.length > 0) {
    console.warn(`   Missing slugs: ${missingSlugs.join(", ")}`);
  }
  console.log("--------------------------------------------------------");

  // Post-migration verification
  const dbCoursesWithProfile = await Course.countDocuments({
    "quizProfile.domain": { $exists: true, $ne: null },
  });
  console.log(`🔍 Total courses in MongoDB with valid quizProfile: ${dbCoursesWithProfile} / 48`);

  if (closeConnection) {
    await mongoose.disconnect();
    console.log("🔌 Database connection closed.\n");
  }

  return {
    totalProfiles: slugs.length,
    updatedCount,
    missingCount,
    missingSlugs,
    dbCoursesWithProfile,
  };
}

// Allow direct CLI execution
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  runMigration()
    .then((summary) => {
      if (summary.updatedCount === 48 && summary.missingCount === 0) {
        console.log("🎉 SUCCESS: All 48 roadmaps successfully migrated with quizProfile!");
        process.exit(0);
      } else {
        console.error("❌ FAILED: Not all roadmaps were updated properly.");
        process.exit(1);
      }
    })
    .catch((err) => {
      console.error("❌ Migration error:", err);
      process.exit(1);
    });
}
