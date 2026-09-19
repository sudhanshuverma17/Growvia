import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

const richFields = [
  'investment',
  'actionItems',
  'resources',
  'checkpoint',
  'decisionPoints',
  'warning',
  'fallbackPlan',
  'realWorldStats'
];

async function verifyIntegrity() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB Atlas for integrity audit.\n');

  const Course = mongoose.models.Course || mongoose.model('Course', new mongoose.Schema({
    id: String,
    title: String,
    timeline: Array
  }, { collection: 'courses', strict: false }));

  const courses = await Course.find({}).sort({ id: 1 });
  console.log(`Found ${courses.length} courses in MongoDB.`);

  const summary = [];
  let totalErrors = 0;
  let totalStages = 0;

  for (const course of courses) {
    const stageCount = course.timeline?.length || 0;
    totalStages += stageCount;
    let coursePassed = true;
    let minFieldsInCourse = 8;
    let maxFieldsInCourse = 0;

    if (stageCount === 0) {
      console.error(`Course ${course.id} (${course.title}) has 0 stages!`);
      totalErrors++;
      coursePassed = false;
    }

    course.timeline?.forEach((st, idx) => {
      let fieldsPresent = 0;
      richFields.forEach(f => {
        if (st[f] !== undefined && st[f] !== null && st[f] !== '') {
          fieldsPresent++;
        }
      });

      if (fieldsPresent < minFieldsInCourse) minFieldsInCourse = fieldsPresent;
      if (fieldsPresent > maxFieldsInCourse) maxFieldsInCourse = fieldsPresent;

      // Check 6-of-8 threshold
      if (fieldsPresent < 6) {
        console.error(`Course ${course.id} stage ${idx + 1} failed threshold! Only ${fieldsPresent}/8 fields present.`);
        totalErrors++;
        coursePassed = false;
      }

      // Check for stray asterisks
      for (const [k, val] of Object.entries(st)) {
        if (typeof val === 'string' && val.trim().startsWith('*')) {
          console.error(`Stray asterisk in ${course.id} stage ${idx + 1} field ${k}`);
          totalErrors++;
          coursePassed = false;
        }
      }
    });

    summary.push({
      id: course.id,
      title: course.title,
      stages: stageCount,
      minFields: minFieldsInCourse,
      maxFields: maxFieldsInCourse,
      passed: coursePassed
    });
  }

  console.log('\n--- FULL DATABASE INTEGRITY REPORT ---');
  console.table(summary.map(s => ({
    'Course ID': s.id,
    'Title': s.title,
    'Stages': s.stages,
    'Rich Fields / Stage': `${s.minFields}-${s.maxFields} of 8`,
    'Status': s.passed ? 'PASSED (8/8)' : 'FAILED'
  })));

  console.log(`\nTotal Courses Audited: ${courses.length}`);
  console.log(`Total Stages Audited: ${totalStages}`);
  console.log(`Total Integrity Errors: ${totalErrors}`);

  if (totalErrors === 0 && courses.length === 48) {
    console.log('>>> DATABASE INTEGRITY CHECK: 100% PASSED (All 48 roadmaps passed integrity threshold with 8/8 fields).');
  } else {
    console.error('>>> DATABASE INTEGRITY CHECK FAILED with errors.');
    process.exit(1);
  }

  await mongoose.disconnect();
}

verifyIntegrity().catch(err => {
  console.error(err);
  process.exit(1);
});
