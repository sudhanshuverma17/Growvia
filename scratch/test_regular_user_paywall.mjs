
async function testRegularUserPaywall() {
  const timestamp = Date.now();
  const testEmail = `freeuser_${timestamp}@growvia.com`;
  const testPassword = 'TestUser@1234';

  console.log(`1. Registering a brand-new regular user: ${testEmail}...`);
  const registerRes = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Free Test User',
      email: testEmail,
      password: testPassword,
      role: 'student'
    })
  });

  const registerData = await registerRes.json();
  if (!registerData.token) {
    console.error('Registration failed:', registerData);
    process.exit(1);
  }

  const token = registerData.token;
  console.log(`2. User registered successfully! Role: ${registerData.user?.role || 'student'}, Purchased: ${JSON.stringify(registerData.user?.purchasedRoadmaps || [])}`);

  console.log('\n3. Requesting GET /api/courses/engineer with Regular Free User Bearer Token...');
  const res = await fetch('http://localhost:5000/api/courses/engineer', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const course = await res.json();

  console.log(`\n--- RESULT FOR LOGGED-IN FREE USER ---`);
  console.log(`Course Title: ${course.title}`);
  console.log(`isUnlocked: ${course.isUnlocked}`);
  
  const stage1 = course.timeline[0];
  console.log(`Stage 1 Title: "${stage1.title}"`);
  console.log(`Stage 1 Keys in API response:`, Object.keys(stage1));
  console.log(`hasStageGuide flag:`, stage1.hasStageGuide);

  const richKeys = [
    'investment', 'actionItems', 'resources', 'checkpoint',
    'decisionPoints', 'warning', 'fallbackPlan', 'realWorldStats'
  ];

  let leakedFieldCount = 0;
  richKeys.forEach(key => {
    if (stage1[key] !== undefined) {
      console.error(`❌ LEAK DETECTED: field "${key}" is present! Value:`, stage1[key]);
      leakedFieldCount++;
    }
  });

  if (leakedFieldCount === 0 && course.isUnlocked === false) {
    console.log(`\n✅ SUCCESS 1: All 8 rich fields are stripped, and isUnlocked is FALSE for logged-in non-purchasing user!`);
  } else {
    console.error(`\n❌ FAILURE: Paywall failed to protect content for logged-in non-purchasing user.`);
    process.exit(1);
  }

  // 4. Now simulate user purchasing this roadmap (via direct DB update to purchasedRoadmaps using app connectDB)
  console.log('\n4. Simulating purchase of "engineer" for this user...');
  const User = (await import('../backend/src/models/User.js')).default;
  const { connectDB } = await import('../backend/src/config/db.js');
  await connectDB();
  const updatedUser = await User.findByIdAndUpdate(
    registerData.user._id,
    { $addToSet: { purchasedRoadmaps: 'engineer' } },
    { new: true }
  );
  console.log(`Updated user purchasedRoadmaps in DB:`, updatedUser.purchasedRoadmaps);

  // 5. Request course again with the same user's token
  console.log('5. Requesting GET /api/courses/engineer again with the SAME user token after purchase...');
  const resAfterPurchase = await fetch('http://localhost:5000/api/courses/engineer', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const courseAfterPurchase = await resAfterPurchase.json();

  console.log(`Course Title: ${courseAfterPurchase.title}`);
  console.log(`isUnlocked: ${courseAfterPurchase.isUnlocked}`);
  const stage1After = courseAfterPurchase.timeline[0];
  console.log(`Stage 1 actionItems count: ${stage1After.actionItems?.length}`);
  console.log(`Stage 1 investment:`, stage1After.investment);

  if (courseAfterPurchase.isUnlocked === true && stage1After.actionItems?.length > 0) {
    console.log(`\n✅ SUCCESS 2: Content unlocks immediately after purchase for the logged-in user!`);
  } else {
    console.error(`\n❌ FAILURE: Content failed to unlock after purchase.`);
    process.exit(1);
  }
}

testRegularUserPaywall().catch(err => {
  console.error('Error running test:', err);
  process.exit(1);
});
