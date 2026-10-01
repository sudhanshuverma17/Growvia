import { connectDB, disconnectDB } from "../config/db.js";
import { QuizAssessment } from "../models/QuizAssessment.js";
import { Course } from "../models/Course.js";

async function main() {
  await connectDB();

  const idsToDelete = [
    "6abe8887c3054a789cfff954",
    "6abe8887c3054a789cfff958",
    "6abe8887c3054a789cfff95b",
    "6abe8887c3054a789cfff95f",
    "6abe894caedbd8149dd07894",
    "6abe894caedbd8149dd07898",
    "6abe894caedbd8149dd0789b",
    "6abe894caedbd8149dd0789e",
    "6abe894caedbd8149dd078a2",
    "6abe89c6cda03593db5ea0e0",
    "6abe8a08cda03593db5ea0e3",
  ];

  const res = await QuizAssessment.deleteMany({ _id: { $in: idsToDelete } });
  console.log("DELETED_COUNT:", res.deletedCount);

  const remainingV3 = await QuizAssessment.countDocuments({ quizVersion: "career-assessment-v3" });
  console.log("REMAINING_V3_COUNT:", remainingV3);

  const totalCourses = await Course.countDocuments();
  const eligibleCourses = await Course.countDocuments({ isPublished: { $ne: false }, quizProfile: { $ne: null } });
  console.log("TOTAL_COURSES:", totalCourses);
  console.log("ELIGIBLE_COURSES:", eligibleCourses);

  await disconnectDB();
}

main().catch(console.error);
