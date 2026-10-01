import { connectDB, disconnectDB } from "../config/db.js";
import { QuizAssessment } from "../models/QuizAssessment.js";
import { Course } from "../models/Course.js";

async function main() {
  await connectDB();

  const assessments = await QuizAssessment.find({}).sort({ createdAt: -1 }).lean();
  console.log("TOTAL_ASSESSMENTS:", assessments.length);
  for (const a of assessments) {
    console.log(
      JSON.stringify({
        id: a._id?.toString(),
        quizVersion: a.quizVersion,
        engineVersion: a.engineVersion,
        userId: a.userId ? a.userId.toString() : null,
        createdAt: a.createdAt,
        picksCount: a.picks?.length || 0,
        topRecCount: a.topRecommendations?.length || 0,
      })
    );
  }

  const courseCount = await Course.countDocuments();
  const eligibleCount = await Course.countDocuments({ isPublished: { $ne: false }, quizProfile: { $ne: null } });
  const falsePublished = await Course.find({ isPublished: false }).lean();
  const allCourses = await Course.find({}, "id title isPublished quizProfile").lean();

  console.log("TOTAL_COURSES:", courseCount);
  console.log("ELIGIBLE_COURSES:", eligibleCount);
  console.log("UNPUBLISHED_COURSES:", falsePublished.map((c) => c.id));

  // Check if any original active flag exists on Course
  const sampleCourse = await Course.findOne().lean();
  console.log("COURSE_KEYS:", Object.keys(sampleCourse));

  await disconnectDB();
}

main().catch(console.error);
