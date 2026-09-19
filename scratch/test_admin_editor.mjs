import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

const BASE_URL = 'http://localhost:5000/api';

async function testAdminEditor() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to DB for admin editor check.\n');

  const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
    purchasedRoadmaps: [String]
  }, { collection: 'users' });

  const User = mongoose.models.User || mongoose.model('User', UserSchema);

  let adminUser = await User.findOne({ role: 'admin' });
  if (!adminUser) {
    adminUser = await User.create({
      name: 'Admin Test User',
      email: 'admin_test_' + Date.now() + '@example.com',
      role: 'admin'
    });
  }

  const adminToken = jwt.sign(
    { id: adminUser._id.toString(), role: 'admin' },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '1h' }
  );

  // 1. Fetch current chartered-accountant roadmap
  const resGet = await fetch(`${BASE_URL}/courses/chartered-accountant`, {
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  const course = await resGet.json();
  console.log(`Fetched course: ${course.id}, stages: ${course.timeline?.length}`);

  const originalTimeline = JSON.parse(JSON.stringify(course.timeline));
  const testTimeline = JSON.parse(JSON.stringify(course.timeline));

  // Modify stage 0 checkpoint
  const originalCheckpoint = testTimeline[0].checkpoint;
  testTimeline[0].checkpoint = originalCheckpoint + " [Admin Verified]";

  // 2. Perform PUT /api/courses/chartered-accountant
  console.log('Sending PUT /api/courses/chartered-accountant with updated checkpoint...');
  const resPut = await fetch(`${BASE_URL}/courses/chartered-accountant`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`
    },
    body: JSON.stringify({ timeline: testTimeline })
  });

  const updatedData = await resPut.json();
  console.log('PUT Response status:', resPut.status);
  console.log('Updated Stage 1 Checkpoint:', updatedData.timeline?.[0]?.checkpoint);

  if (resPut.status === 200 && updatedData.timeline?.[0]?.checkpoint.includes('[Admin Verified]')) {
    console.log('>>> ADMIN PUT UPDATE VERIFIED: Stage rich fields successfully updated via API.');
  } else {
    throw new Error('Admin PUT update failed!');
  }

  // 3. Restore original timeline
  console.log('Restoring original timeline...');
  const resRestore = await fetch(`${BASE_URL}/courses/chartered-accountant`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`
    },
    body: JSON.stringify({ timeline: originalTimeline })
  });
  const restoredData = await resRestore.json();
  console.log('Restoration status:', resRestore.status);
  console.log('Restored Stage 1 Checkpoint:', restoredData.timeline?.[0]?.checkpoint);

  if (resRestore.status === 200 && JSON.stringify(restoredData.timeline?.[0]?.checkpoint) === JSON.stringify(originalCheckpoint)) {
    console.log('>>> ADMIN RESTORATION VERIFIED: Original content intact.');
  } else {
    throw new Error('Admin restoration failed!');
  }

  await mongoose.disconnect();
}

testAdminEditor().catch(err => {
  console.error('Admin editor test failed:', err);
  process.exit(1);
});
