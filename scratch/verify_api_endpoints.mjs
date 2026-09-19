import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

const BASE_URL = 'http://localhost:5000/api';
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

const sampleRoadmaps = [
  { id: 'data-scientist', expectedStages: 3, type: '3-stage' },
  { id: 'designer', expectedStages: 3, type: '3-stage' },
  { id: 'doctor', expectedStages: 4, type: '4-stage' },
  { id: 'pilot', expectedStages: 4, type: '4-stage' },
  { id: 'civil-services', expectedStages: 4, type: '4-stage' },
  { id: 'chartered-accountant', expectedStages: 5, type: '5-stage' }
];

async function runApiTests() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to DB for token generation.\n');

  const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
    purchasedRoadmaps: [String]
  }, { collection: 'users' });

  const User = mongoose.models.User || mongoose.model('User', UserSchema);

  // Admin user
  let adminUser = await User.findOne({ role: 'admin' });
  if (!adminUser) {
    adminUser = await User.create({
      name: 'Admin Test User',
      email: 'admin_test_' + Date.now() + '@example.com',
      role: 'admin'
    });
  }

  // Regular non-purchasing user
  let regularUser = await User.findOne({ role: 'user', purchasedRoadmaps: { $size: 0 } });
  if (!regularUser) {
    regularUser = await User.create({
      name: 'Regular Test User',
      email: 'user_test_' + Date.now() + '@example.com',
      role: 'user',
      purchasedRoadmaps: []
    });
  }

  const adminToken = jwt.sign(
    { id: adminUser._id.toString(), role: 'admin' },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '1h' }
  );

  const regularToken = jwt.sign(
    { id: regularUser._id.toString(), role: 'user' },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '1h' }
  );

  console.log('--- RUNNING API ENDPOINT CHECKS ---');
  let failures = 0;

  for (const item of sampleRoadmaps) {
    console.log(`\nTesting ${item.id} (${item.type}, expected ${item.expectedStages} stages):`);

    // 1. Unauthenticated request
    const resUnauth = await fetch(`${BASE_URL}/courses/${item.id}`);
    const dataUnauth = await resUnauth.json();

    if (resUnauth.status !== 200) {
      console.error(`  [Unauth] HTTP error ${resUnauth.status}`);
      failures++;
    }
    if (dataUnauth.timeline.length !== item.expectedStages) {
      console.error(`  [Unauth] Stage length mismatch: got ${dataUnauth.timeline.length}, expected ${item.expectedStages}`);
      failures++;
    }
    if (dataUnauth.isUnlocked !== false) {
      console.error(`  [Unauth] isUnlocked should be false, got ${dataUnauth.isUnlocked}`);
      failures++;
    }
    let unauthLeaked = 0;
    dataUnauth.timeline.forEach(st => {
      richFields.forEach(f => {
        if (st[f] !== undefined) unauthLeaked++;
      });
    });
    if (unauthLeaked > 0) {
      console.error(`  [Unauth] Leaked ${unauthLeaked} rich fields!`);
      failures++;
    } else {
      console.log(`  [Unauth] OK: isUnlocked=false, all rich fields stripped, hasStageGuide=${dataUnauth.timeline[0]?.hasStageGuide}`);
    }

    // 2. Regular logged-in non-purchasing user
    const resRegular = await fetch(`${BASE_URL}/courses/${item.id}`, {
      headers: { Authorization: `Bearer ${regularToken}` }
    });
    const dataRegular = await resRegular.json();

    if (dataRegular.isUnlocked !== false) {
      console.error(`  [Regular] isUnlocked should be false, got ${dataRegular.isUnlocked}`);
      failures++;
    }
    let regularLeaked = 0;
    dataRegular.timeline.forEach(st => {
      richFields.forEach(f => {
        if (st[f] !== undefined) regularLeaked++;
      });
    });
    if (regularLeaked > 0) {
      console.error(`  [Regular] Leaked ${regularLeaked} rich fields to regular user!`);
      failures++;
    } else {
      console.log(`  [Regular] OK: isUnlocked=false, 0 leaked fields`);
    }

    // 3. Admin user
    const resAdmin = await fetch(`${BASE_URL}/courses/${item.id}`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const dataAdmin = await resAdmin.json();

    if (dataAdmin.isUnlocked !== true) {
      console.error(`  [Admin] isUnlocked should be true, got ${dataAdmin.isUnlocked}`);
      failures++;
    }
    let adminMissing = 0;
    dataAdmin.timeline.forEach(st => {
      richFields.forEach(f => {
        if (!st[f]) adminMissing++;
      });
    });
    if (adminMissing > 0) {
      console.error(`  [Admin] Missing ${adminMissing} rich fields on unlocked payload!`);
      failures++;
    } else {
      console.log(`  [Admin] OK: isUnlocked=true, 100% of rich fields present across all ${item.expectedStages} stages`);
    }
  }

  console.log('\n--- API ENDPOINT RESULTS ---');
  if (failures === 0) {
    console.log('>>> ALL API ENDPOINT CHECKS PASSED: 3-stage, 4-stage, and 5-stage roadmaps behave with 100% paywall integrity.');
  } else {
    console.error(`>>> API CHECKS FAILED: ${failures} issues detected.`);
    process.exit(1);
  }

  await mongoose.disconnect();
}

runApiTests().catch(err => {
  console.error(err);
  process.exit(1);
});
