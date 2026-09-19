import mongoose from 'mongoose';
import { Course } from '../backend/src/models/Course.js';

async function auditAllRoadmaps() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/growvia');
  const courses = await Course.find({}, { id: 1, title: 1, timeline: 1 }).sort({ id: 1 });
  
  console.log(`Total Courses Queried from MongoDB: ${courses.length}`);
  
  const counts = {};
  const nonFour = [];
  const fourStage = [];

  for (const c of courses) {
    const len = Array.isArray(c.timeline) ? c.timeline.length : 0;
    counts[len] = (counts[len] || 0) + 1;
    if (len !== 4) {
      nonFour.push({ id: c.id, title: c.title, stageCount: len });
    } else {
      fourStage.push({ id: c.id, title: c.title });
    }
  }

  console.log('Stage Count Distribution:');
  console.log(JSON.stringify(counts, null, 2));

  console.log('\nOutliers (!= 4 stages):');
  console.log(JSON.stringify(nonFour, null, 2));

  console.log(`\nIndividually Checked 4-Stage Roadmaps (${fourStage.length}):`);
  fourStage.forEach((r, idx) => {
    console.log(`${idx + 1}. [${r.id}] ${r.title}`);
  });

  await mongoose.disconnect();
}

auditAllRoadmaps().catch(console.error);
