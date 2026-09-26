import { requirePurchasedRoadmap } from "../middleware/authMiddleware.js";
import { getCounselingStatus } from "../controllers/counselingController.js";

function createMockRes() {
  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.body = data;
      return this;
    },
  };
  return res;
}

console.log("=================================================");
console.log("TEST SUITE: Counseling Access Control Verification");
console.log("=================================================");

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    throw new Error(message);
  }
  passedTests++;
  console.log(`✅ PASSED: ${message}`);
}

// TEST 1: Unauthenticated request should be rejected by middleware with 401
{
  const req = { user: null };
  const res = createMockRes();
  let nextCalled = false;

  requirePurchasedRoadmap(req, res, () => {
    nextCalled = true;
  });

  assert(res.statusCode === 401, "Middleware rejects unauthenticated user with 401");
  assert(!nextCalled, "Middleware does not call next() for unauthenticated user");
}

// TEST 2: User with empty purchasedRoadmaps should be rejected with 403 Forbidden
{
  const req = {
    user: {
      _id: "user123",
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      purchasedRoadmaps: [],
    },
  };
  const res = createMockRes();
  let nextCalled = false;

  requirePurchasedRoadmap(req, res, () => {
    nextCalled = true;
  });

  assert(res.statusCode === 403, "Middleware returns 403 Forbidden for user with purchasedRoadmaps = []");
  assert(res.body?.code === "ROADMAP_PURCHASE_REQUIRED", "Middleware error code is ROADMAP_PURCHASE_REQUIRED");
  assert(!nextCalled, "Middleware does not call next() for non-purchaser");
}

// TEST 3: User with undefined purchasedRoadmaps should be rejected with 403 Forbidden
{
  const req = {
    user: {
      _id: "user456",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
    },
  };
  const res = createMockRes();
  let nextCalled = false;

  requirePurchasedRoadmap(req, res, () => {
    nextCalled = true;
  });

  assert(res.statusCode === 403, "Middleware returns 403 Forbidden for user with undefined purchasedRoadmaps");
  assert(!nextCalled, "Middleware does not call next() for user with undefined purchasedRoadmaps");
}

// TEST 4: User with purchasedRoadmaps should PASS middleware
{
  const req = {
    user: {
      _id: "user789",
      name: "Alice Purchaser",
      email: "alice@example.com",
      role: "user",
      purchasedRoadmaps: ["software-engineer"],
    },
  };
  const res = createMockRes();
  let nextCalled = false;

  requirePurchasedRoadmap(req, res, () => {
    nextCalled = true;
  });

  assert(nextCalled === true, "Middleware calls next() for eligible purchaser");
  assert(res.statusCode === null, "Middleware does not return error status for eligible purchaser");
}

// TEST 5: Admin should PASS middleware even if purchasedRoadmaps is empty
{
  const req = {
    user: {
      _id: "admin001",
      name: "Administrator",
      email: "admin@growvia.com",
      role: "admin",
      purchasedRoadmaps: [],
    },
  };
  const res = createMockRes();
  let nextCalled = false;

  requirePurchasedRoadmap(req, res, () => {
    nextCalled = true;
  });

  assert(nextCalled === true, "Middleware calls next() for admin user");
}

// TEST 6: Counseling Controller returns 403 for non-purchaser
{
  const req = {
    user: {
      role: "user",
      purchasedRoadmaps: [],
    },
  };
  const res = createMockRes();

  await getCounselingStatus(req, res);

  assert(res.statusCode === 403, "Controller returns 403 Forbidden for non-purchaser");
  assert(res.body?.hasAccess === false, "Controller returns hasAccess: false for non-purchaser");
}

// TEST 7: Counseling Controller returns 200 and bookingUrl for purchaser
{
  const req = {
    user: {
      role: "user",
      purchasedRoadmaps: ["cloud-architect"],
    },
  };
  const res = createMockRes();

  await getCounselingStatus(req, res);

  assert(res.statusCode === 200, "Controller returns 200 OK for purchaser");
  assert(res.body?.hasAccess === true, "Controller returns hasAccess: true for purchaser");
  assert(
    res.body?.bookingUrl === "https://sudhanshu-verma.dayschedule.com/meeting-with-sudhanshu",
    "Controller returns correct bookingUrl"
  );
}

console.log("=================================================");
console.log(`RESULTS: ${passedTests}/${totalTests} tests PASSED!`);
console.log("=================================================");
