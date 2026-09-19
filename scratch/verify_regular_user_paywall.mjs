import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to DB');

  const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
    purchasedRoadmaps: [String]
  }, { collection: 'users' });

  const User = mongoose.models.User || mongoose.model('User', UserSchema);

  let regularUser = await User.findOne({ role: 'user', purchasedRoadmaps: { $nin: ['engineer'] } });
  if (!regularUser) {
    regularUser = await User.create({
      name: 'Regular Test Free User',
      email: 'test_free_user_' + Date.now() + '@example.com',
      role: 'user',
      purchasedRoadmaps: []
    });
  }

  console.log('Tested Regular User:', {
    id: regularUser._id.toString(),
    email: regularUser.email,
    role: regularUser.role,
    purchasedRoadmaps: regularUser.purchasedRoadmaps
  });

  const token = jwt.sign(
    { id: regularUser._id.toString(), role: regularUser.role },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '1h' }
  );

  const res = await fetch('http://localhost:5000/api/courses/engineer', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await res.json();
  console.log('HTTP Status:', res.status);
  console.log('Course ID:', data.id);
  console.log('isUnlocked:', data.isUnlocked);
  console.log('Timeline Stages:', data.timeline?.length);

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

  let leakedFields = [];
  data.timeline.forEach((stage, idx) => {
    richFields.forEach(f => {
      if (stage[f] !== undefined) leakedFields.push({ stage: idx + 1, field: f });
    });
  });

  console.log('Leaked Rich Fields Count:', leakedFields.length);
  if (leakedFields.length === 0 && data.isUnlocked === false) {
    console.log('>>> PAYWALL TEST PASSED: Registered free user (non-admin, non-purchasing) received clean stripped payload with isUnlocked: false and 0 leaked fields.');
  } else {
    console.error('>>> PAYWALL TEST FAILED:', leakedFields);
  }

  // Also test when user DOES purchase the roadmap:
  regularUser.purchasedRoadmaps.push('engineer');
  await regularUser.save();

  const resUnlocked = await fetch('http://localhost:5000/api/courses/engineer', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const dataUnlocked = await resUnlocked.json();
  console.log('\n--- Post-Purchase Verification for Same User ---');
  console.log('isUnlocked:', dataUnlocked.isUnlocked);
  let stage1Fields = richFields.filter(f => dataUnlocked.timeline[0][f] !== undefined);
  console.log('Stage 1 Rich Fields Present:', stage1Fields.length, 'of', richFields.length);

  // Clean up
  regularUser.purchasedRoadmaps = regularUser.purchasedRoadmaps.filter(id => id !== 'engineer');
  await regularUser.save();
  console.log('Cleaned up test user roadmap purchase array.');

  await mongoose.disconnect();
}

run().catch(console.error);
