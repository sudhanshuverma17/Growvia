import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });
import { connectDB } from "../backend/src/config/db.js";
import { Course } from "../backend/src/models/Course.js";
import { seedCareers } from "../backend/src/data/seedData.js";

async function sync() {
  console.log("Connecting to MongoDB Atlas...");
  await connectDB();
  console.log(`Syncing ${seedCareers.length} enriched courses into MongoDB...`);

  let updatedCount = 0;
  for (const career of seedCareers) {
    const res = await Course.findOneAndUpdate(
      { id: career.id },
      {
        $set: {
          paths: career.paths,
          skillsData: career.skillsData,
          incomeBreakdown: career.incomeBreakdown,
          timelineToProfitability: career.timelineToProfitability,
          clientsNeededForTarget: career.clientsNeededForTarget,
          examsData: career.examsData,
          collegesData: career.collegesData,
          whyChoose: career.whyChoose,
          whoShould: career.whoShould,
          whoShouldAvoid: career.whoShouldAvoid,
          harshReality: career.harshReality,
        },
      },
      { new: true, upsert: true }
    );
    if (res) updatedCount++;
  }

  console.log(`✅ Successfully synced ${updatedCount} courses in MongoDB Atlas with rich data.`);
  process.exit(0);
}

sync().catch((err) => {
  console.error("Sync error:", err);
  process.exit(1);
});
