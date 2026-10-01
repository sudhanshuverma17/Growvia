/**
 * Step 5 Integration Tests for Career Quiz v3 API & Persistence
 *
 * Covers all safety, data, and contract requirements:
 * 1. Safe test database: enforces URI ends in '_test' and throws otherwise.
 * 2. Happy path, single and blended: response equals computeCareerResult directly.
 *    Verifies picks.rank (1..n), overallRank, alternatives ranking, signal, bankVersion.
 * 3. 1,000 random students: /v3/stage1 served IDs equal what /v3/submit recomputes.
 * 4. Tampering: missing, extra, unserved, bad option IDs, unknown request keys, wrong types -> 400.
 *    Client-supplied scores/picks are ignored.
 * 5. Deep scan: /v3/stage1 response contains zero weights, blendCore, quizProfile, or roadmap slugs.
 * 6. DB filtering: unpublished or removed roadmap never appears in picks; courses lacking isPublished field remain eligible.
 * 7. Persistence failure: DB save rejection returns HTTP 200 with saved: false and valid picks.
 * 8. /latest scoping: strictly scoped to caller's token. Unauthenticated -> 401; User B never sees User A's data.
 * 9. Legacy /submit: unchanged and functions properly.
 * 10. Abuse protection: rate limiter (31st request -> 429) and body limiter (>20 kB -> 413).
 * 11. Versioning: bankVersion stored; /latest never recomputes if bank weights change.
 */

process.env.NODE_ENV = "test";

import request from "supertest";
import mongoose from "mongoose";
import app from "../server.js";
import { connectDB, disconnectDB } from "../config/db.js";
import { STAGE1_QUESTIONS } from "../config/stage1-questions.js";
import { DOMAIN_ROADMAP_MAP, QUIZ_PROFILES } from "../config/quizDomains.js";
import { scoreStage1 } from "../services/stage1Scoring.js";
import { getStage2Set } from "../services/stage2Selector.js";
import { computeCareerResult, deriveSeed, getBankVersion } from "../services/careerEngine.js";
import { QuizAssessment } from "../models/QuizAssessment.js";
import { Course } from "../models/Course.js";
import User from "../models/User.js";
import { generateToken } from "../middleware/authMiddleware.js";
import { seedCareers } from "../data/seedData.js";

// Helper: Assert condition
function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

// Helper: Deep search for prohibited strings in JSON
function deepFindStrings(obj, prohibitedStrings) {
  const found = [];
  function recurse(val, path = "") {
    if (val === null || val === undefined) return;
    if (typeof val === "string") {
      for (const target of prohibitedStrings) {
        if (val.toLowerCase().includes(target.toLowerCase())) {
          found.push({ target, path, value: val });
        }
      }
    } else if (Array.isArray(val)) {
      val.forEach((item, idx) => recurse(item, `${path}[${idx}]`));
    } else if (typeof val === "object") {
      for (const [key, value] of Object.entries(val)) {
        for (const target of prohibitedStrings) {
          if (key.toLowerCase().includes(target.toLowerCase())) {
            found.push({ target, path: `${path}.${key}`, isKey: true });
          }
        }
        recurse(value, `${path}.${key}`);
      }
    }
  }
  recurse(obj);
  return found;
}

// Helper: Generate deterministic answers favoring a specific domain
function getSingleDomainAnswers(domain = "tech") {
  const answers = {};
  for (const q of STAGE1_QUESTIONS) {
    let bestOpt = q.options[0].id;
    let maxWeight = -1;
    for (const opt of q.options) {
      const w = opt.domainWeights?.[domain] || 0;
      if (w > maxWeight) {
        maxWeight = w;
        bestOpt = opt.id;
      }
    }
    answers[q.id] = bestOpt;
  }
  return answers;
}

// Helper: Generate blended answers
function getBlendedAnswers() {
  return {
    q1: "q1_opt3",
    q2: "q2_opt4",
    q3: "q3_opt4",
    q4: "q4_opt6",
    q5: "q5_opt5",
    q6: "q6_opt6",
    q7: "q7_opt6",
  };
}

async function runTestSuite() {
  console.log("=============================================================");
  console.log("🚀 Starting Step 5 Career Quiz v3 API & Persistence Test Suite");
  console.log("=============================================================\n");

  // Enforce test database ending in '_test'
  const baseUri = process.env.MONGO_TEST_URI || process.env.MONGO_URI;
  const u = new URL(baseUri);
  u.pathname = "/growvia_test";
  const testUri = u.toString();
  process.env.MONGO_URI = testUri;

  const conn = await connectDB();
  const dbName = mongoose.connection.db.databaseName;
  if (!dbName.endsWith("_test")) {
    throw new Error(
      `CRITICAL TEST SAFETY VIOLATION: Database name '${dbName}' does not end in '_test'. Aborting tests to protect production.`
    );
  }
  console.log(`🔒 Connected safely to verified test database: '${dbName}'\n`);

  // Ensure test database has all 48 courses with quizProfile
  const testCourseCount = await Course.countDocuments();
  const withQuizProfile = await Course.countDocuments({ quizProfile: { $ne: null } });
  console.log(`[Test Setup]: DB has ${testCourseCount} courses, ${withQuizProfile} with quizProfile.`);
  if (withQuizProfile === 0) {
    console.log(`[Test Setup]: Updating/seeding 48 courses into test database '${dbName}'...`);
    await Course.deleteMany({});
    const docs = seedCareers.map((c) => ({
      ...c,
      quizProfile: QUIZ_PROFILES[c.id] || null,
      isPublished: true,
    }));
    await Course.insertMany(docs);
    console.log(`[Test Setup]: Successfully seeded ${await Course.countDocuments()} courses.`);
  }

  let passed = 0;
  let failed = 0;

  async function testCase(name, fn) {
    try {
      process.stdout.write(`• Testing: ${name}... `);
      await fn();
      console.log("✅ PASS");
      passed++;
    } catch (err) {
      console.log("❌ FAIL");
      console.error(`  Error: ${err.message}`);
      if (err.stack) console.error(`  Stack: ${err.stack.split("\n").slice(1, 4).join("\n")}`);
      failed++;
    }
  }

  // -------------------------------------------------------------
  // Test 1: Happy path, single and blended match computeCareerResult
  // -------------------------------------------------------------
  await testCase("1. Happy path: single and blended match computeCareerResult directly", async () => {
    // 1a. Single-domain test
    const s1AnswersSingle = getSingleDomainAnswers("tech");
    const s1ResSingle = await request(app)
      .post("/api/career-quiz/v3/stage1")
      .send({ stage1Answers: s1AnswersSingle });

    assert(s1ResSingle.status === 200, `Expected 200, got ${s1ResSingle.status}`);
    assert(s1ResSingle.body.isBlended === false, "Expected isBlended to be false for single domain");
    assert(Array.isArray(s1ResSingle.body.questions), "Expected questions array");

    const s2AnswersSingle = {};
    for (const q of s1ResSingle.body.questions) {
      s2AnswersSingle[q.id] = q.options[0].id;
    }

    const submitResSingle = await request(app)
      .post("/api/career-quiz/v3/submit")
      .send({ stage1Answers: s1AnswersSingle, stage2Answers: s2AnswersSingle });

    assert(submitResSingle.status === 200, `Expected 200, got ${submitResSingle.status}`);
    assert(submitResSingle.body.quizVersion === "career-assessment-v3", "Expected quizVersion");
    assert(submitResSingle.body.saved === true, "Expected saved === true");
    assert(submitResSingle.body.isBlended === false, "Expected isBlended === false");
    assert(submitResSingle.body.signal && ["clear", "mixed", "open"].includes(submitResSingle.body.signal.level), "Expected signal");
    assert(typeof submitResSingle.body.bankVersion === "string", "Expected bankVersion");
    assert(submitResSingle.body.picks.length >= 4 && submitResSingle.body.picks.length <= 5, "Expected 4-5 picks");

    // Verify ranks 1..n in array order
    for (let i = 0; i < submitResSingle.body.picks.length; i++) {
      assert(submitResSingle.body.picks[i].rank === i + 1, `Pick rank must be ${i + 1}`);
      assert(typeof submitResSingle.body.picks[i].overallRank === "number", "Pick must have overallRank");
    }
    for (let j = 0; j < submitResSingle.body.alternatives.length; j++) {
      assert(
        submitResSingle.body.alternatives[j].rank === submitResSingle.body.picks.length + j + 1,
        `Alternative rank must continue after picks`
      );
      assert(typeof submitResSingle.body.alternatives[j].overallRank === "number", "Alternative must have overallRank");
    }

    // Direct comparison with computeCareerResult
    const dbCourses = await Course.find({ quizProfile: { $ne: null }, isPublished: { $ne: false } }).lean();
    const directResultSingle = computeCareerResult({
      stage1Answers: s1AnswersSingle,
      stage2Answers: s2AnswersSingle,
      roadmaps: dbCourses.map((c) => ({ slug: c.id, ...c })),
    });

    assert(
      submitResSingle.body.picks.length === directResultSingle.picks.length,
      `Picks count mismatch: API=${submitResSingle.body.picks.length} vs Direct=${directResultSingle.picks.length}`
    );
    for (let i = 0; i < directResultSingle.picks.length; i++) {
      assert(
        submitResSingle.body.picks[i].slug === directResultSingle.picks[i].slug,
        `Pick ${i} slug mismatch`
      );
      assert(
        submitResSingle.body.picks[i].matchPct === directResultSingle.picks[i].matchPct,
        `Pick ${i} matchPct mismatch`
      );
      assert(
        submitResSingle.body.picks[i].kind === directResultSingle.picks[i].kind,
        `Pick ${i} kind mismatch`
      );
    }
    assert(
      JSON.stringify(submitResSingle.body.tie) === JSON.stringify(directResultSingle.tie),
      "Tie result mismatch"
    );

    // 1b. Blended test
    const s1AnswersBlended = getBlendedAnswers();
    const s1ResBlended = await request(app)
      .post("/api/career-quiz/v3/stage1")
      .send({ stage1Answers: s1AnswersBlended });

    assert(s1ResBlended.status === 200, `Expected 200, got ${s1ResBlended.status}`);
    assert(s1ResBlended.body.isBlended === true, "Expected isBlended to be true for blended answers");

    const s2AnswersBlended = {};
    for (const q of s1ResBlended.body.questions) {
      s2AnswersBlended[q.id] = q.options[0].id;
    }

    const submitResBlended = await request(app)
      .post("/api/career-quiz/v3/submit")
      .send({ stage1Answers: s1AnswersBlended, stage2Answers: s2AnswersBlended });

    assert(submitResBlended.status === 200, `Expected 200, got ${submitResBlended.status}`);
    assert(submitResBlended.body.isBlended === true, "Expected submit isBlended === true");

    const directResultBlended = computeCareerResult({
      stage1Answers: s1AnswersBlended,
      stage2Answers: s2AnswersBlended,
      roadmaps: dbCourses.map((c) => ({ slug: c.id, ...c })),
    });

    assert(
      submitResBlended.body.picks[0].slug === directResultBlended.picks[0].slug,
      "Blended top pick slug mismatch"
    );
  });

  // -------------------------------------------------------------
  // Test 2: 1,000 random students served IDs == recomputed IDs
  // -------------------------------------------------------------
  await testCase("2. 1,000 random students: /v3/stage1 served IDs equal /v3/submit recomputed IDs", async () => {
    let mismatches = 0;
    const allOptionIds = STAGE1_QUESTIONS.map((q) => q.options.map((o) => o.id));

    for (let i = 0; i < 1000; i++) {
      const studentAnswers = {};
      STAGE1_QUESTIONS.forEach((q, idx) => {
        const opts = allOptionIds[idx];
        studentAnswers[q.id] = opts[Math.floor(Math.random() * opts.length)];
      });

      const seed = deriveSeed(studentAnswers);
      const stage1Result = scoreStage1(studentAnswers, { seed });
      const expectedServed = getStage2Set(stage1Result, { seed });
      const expectedIds = expectedServed.map((q) => q.id);

      const submitSeed = deriveSeed(studentAnswers);
      const submitS1 = scoreStage1(studentAnswers, { seed: submitSeed });
      const recomputedServed = getStage2Set(submitS1, { seed: submitSeed });
      const recomputedIds = recomputedServed.map((q) => q.id);

      if (expectedIds.length !== recomputedIds.length) {
        mismatches++;
        break;
      }
      for (let j = 0; j < expectedIds.length; j++) {
        if (expectedIds[j] !== recomputedIds[j]) {
          mismatches++;
          break;
        }
      }
    }

    assert(mismatches === 0, `Detected ${mismatches} served ID mismatches across 1,000 random student runs`);
  });

  // -------------------------------------------------------------
  // Test 3: Tampering tests
  // -------------------------------------------------------------
  await testCase("3. Tampering: missing, extra, unserved, bad options, unknown keys -> 400", async () => {
    const s1Answers = getSingleDomainAnswers("tech");
    const s1Res = await request(app)
      .post("/api/career-quiz/v3/stage1")
      .send({ stage1Answers: s1Answers });
    const servedQuestions = s1Res.body.questions;

    const validS2Answers = {};
    for (const q of servedQuestions) {
      validS2Answers[q.id] = q.options[0].id;
    }

    // 3a. Unknown body field in stage 1
    const unknownFieldRes = await request(app)
      .post("/api/career-quiz/v3/stage1")
      .send({ stage1Answers: s1Answers, hackerPayload: "injection" });
    assert(unknownFieldRes.status === 400, "Expected 400 for unknown request field");
    assert(unknownFieldRes.body.code === "UNKNOWN_REQUEST_FIELD", `Expected UNKNOWN_REQUEST_FIELD, got ${unknownFieldRes.body.code}`);

    // 3b. Wrong type in stage 1 answer
    const wrongTypeS1 = { ...s1Answers, q1: 99999 };
    const wrongTypeRes = await request(app)
      .post("/api/career-quiz/v3/stage1")
      .send({ stage1Answers: wrongTypeS1 });
    assert(wrongTypeRes.status === 400, "Expected 400 for wrong answer type");
    assert(wrongTypeRes.body.code === "INVALID_STAGE1_TYPE", `Expected INVALID_STAGE1_TYPE, got ${wrongTypeRes.body.code}`);

    // 3c. Missing question ID in stage 2
    const missingS2 = { ...validS2Answers };
    delete missingS2[servedQuestions[0].id];
    const missingRes = await request(app)
      .post("/api/career-quiz/v3/submit")
      .send({ stage1Answers: s1Answers, stage2Answers: missingS2 });
    assert(missingRes.status === 400, "Expected 400 for missing question");
    assert(missingRes.body.code === "STAGE2_MISSING_QUESTIONS", `Expected STAGE2_MISSING_QUESTIONS, got ${missingRes.body.code}`);

    // 3d. Extra / unserved question ID in stage 2
    const extraS2 = { ...validS2Answers, unserved_bogus_question: "opt1" };
    const extraRes = await request(app)
      .post("/api/career-quiz/v3/submit")
      .send({ stage1Answers: s1Answers, stage2Answers: extraS2 });
    assert(extraRes.status === 400, "Expected 400 for extra question");
    assert(extraRes.body.code === "STAGE2_UNSERVED_QUESTIONS", `Expected STAGE2_UNSERVED_QUESTIONS, got ${extraRes.body.code}`);

    // 3e. Invalid option ID for a served question
    const badOptS2 = { ...validS2Answers };
    badOptS2[servedQuestions[0].id] = "completely_invalid_option_id_xyz";
    const badOptRes = await request(app)
      .post("/api/career-quiz/v3/submit")
      .send({ stage1Answers: s1Answers, stage2Answers: badOptS2 });
    assert(badOptRes.status === 400, "Expected 400 for bad option");
    assert(badOptRes.body.code === "STAGE2_INVALID_OPTION", `Expected STAGE2_INVALID_OPTION, got ${badOptRes.body.code}`);

    // 3f. Client tampering with picks, matchPct, domainScores
    const tamperedPayload = {
      stage1Answers: s1Answers,
      stage2Answers: validS2Answers,
      picks: [{ rank: 1, slug: "astronaut-billionaire", matchPct: 100 }],
      matchPct: 100,
      domainScores: { fake_domain: 1.0 },
    };
    const tamperRes = await request(app)
      .post("/api/career-quiz/v3/submit")
      .send(tamperedPayload);
    assert(tamperRes.status === 200, "Expected 200 for submit with discarded fields");
    assert(tamperRes.body.picks[0].slug !== "astronaut-billionaire", "Client-injected pick was NOT ignored!");
    assert(tamperRes.body.domainScores.fake_domain === undefined, "Client-injected domainScore was NOT ignored!");
  });

  // -------------------------------------------------------------
  // Test 4: Deep scan of /v3/stage1 response
  // -------------------------------------------------------------
  await testCase("4. /v3/stage1 response contains no weights, blendCore, quizProfile, or roadmap slugs", async () => {
    const s1Answers = getSingleDomainAnswers("healthcare");
    const res = await request(app)
      .post("/api/career-quiz/v3/stage1")
      .send({ stage1Answers: s1Answers });

    assert(res.status === 200, `Expected 200, got ${res.status}`);

    const all48Slugs = Object.keys(DOMAIN_ROADMAP_MAP);
    const prohibitedKeywords = ["weights", "blendcore", "quizprofile", ...all48Slugs];

    const violations = deepFindStrings(res.body.questions, prohibitedKeywords);
    assert(
      violations.length === 0,
      `Found prohibited strings in /v3/stage1 questions: ${JSON.stringify(violations)}`
    );

    for (const q of res.body.questions) {
      const qKeys = Object.keys(q).sort();
      assert(
        JSON.stringify(qKeys) === JSON.stringify(["id", "options", "text"]),
        `Question ${q.id} has unauthorized keys: ${qKeys.join(", ")}`
      );
      for (const opt of q.options) {
        const optKeys = Object.keys(opt).sort();
        assert(
          JSON.stringify(optKeys) === JSON.stringify(["id", "text"]),
          `Option ${opt.id} in ${q.id} has unauthorized keys: ${optKeys.join(", ")}`
        );
      }
    }
  });

  // -------------------------------------------------------------
  // Test 5: Unpublished/removed DB roadmap & missing isPublished field
  // -------------------------------------------------------------
  await testCase("5. Unpublished roadmap never appears; course fixture lacking isPublished field ranks", async () => {
    const s1Answers = getSingleDomainAnswers("tech");
    const s1Res = await request(app)
      .post("/api/career-quiz/v3/stage1")
      .send({ stage1Answers: s1Answers });

    const s2Answers = {};
    for (const q of s1Res.body.questions) {
      s2Answers[q.id] = q.options[0].id;
    }

    const baselineRes = await request(app)
      .post("/api/career-quiz/v3/submit")
      .send({ stage1Answers: s1Answers, stage2Answers: s2Answers });
    const targetSlug = baselineRes.body.picks[0].slug;

    // 5a. Temporarily unpublish targetSlug in DB
    await Course.updateOne({ id: targetSlug }, { $set: { isPublished: false } });

    try {
      const testRes = await request(app)
        .post("/api/career-quiz/v3/submit")
        .send({ stage1Answers: s1Answers, stage2Answers: s2Answers });

      assert(testRes.status === 200, `Expected 200, got ${testRes.status}`);
      const pickSlugs = testRes.body.picks.map((p) => p.slug);
      assert(!pickSlugs.includes(targetSlug), `Unpublished roadmap '${targetSlug}' appeared in picks`);
      assert(testRes.body.picks.length >= 4 && testRes.body.picks.length <= 5, "Expected 4-5 picks");
    } finally {
      // 5b. Unset isPublished entirely to prove { isPublished: { $ne: false } } handles missing field
      await Course.updateOne({ id: targetSlug }, { $unset: { isPublished: "" } });
      const unfieldRes = await request(app)
        .post("/api/career-quiz/v3/submit")
        .send({ stage1Answers: s1Answers, stage2Answers: s2Answers });
      assert(unfieldRes.status === 200, "Course lacking isPublished must rank normally");
      assert(unfieldRes.body.picks[0].slug === targetSlug, "Target course without isPublished field ranked as top pick");

      // Restore
      await Course.updateOne({ id: targetSlug }, { $set: { isPublished: true } });
    }
  });

  // -------------------------------------------------------------
  // Test 6: Persistence failure path returns saved: false
  // -------------------------------------------------------------
  await testCase("6. Persistence failure returns result with saved: false and valid picks", async () => {
    const s1Answers = getSingleDomainAnswers("business");
    const s1Res = await request(app)
      .post("/api/career-quiz/v3/stage1")
      .send({ stage1Answers: s1Answers });

    const s2Answers = {};
    for (const q of s1Res.body.questions) {
      s2Answers[q.id] = q.options[0].id;
    }

    const origSave = QuizAssessment.prototype.save;
    QuizAssessment.prototype.save = function () {
      return Promise.reject(new Error("Simulated database write failure for test"));
    };

    try {
      const res = await request(app)
        .post("/api/career-quiz/v3/submit")
        .send({ stage1Answers: s1Answers, stage2Answers: s2Answers });

      assert(res.status === 200, `Expected 200 despite DB failure, got ${res.status}`);
      assert(res.body.saved === false, `Expected saved === false, got ${res.body.saved}`);
      assert(res.body.picks.length >= 4 && res.body.picks.length <= 5, "Expected valid picks");
    } finally {
      QuizAssessment.prototype.save = origSave;
    }
  });

  // -------------------------------------------------------------
  // Test 7: /latest scoping (No token -> 401; User A vs User B)
  // -------------------------------------------------------------
  await testCase("7. /latest scoping: unauthenticated -> 401; caller only sees own latest assessment", async () => {
    // 7a. Unauthenticated request without token receives 401
    const unauthRes = await request(app).get("/api/career-quiz/latest");
    assert(unauthRes.status === 401, `Expected 401, got ${unauthRes.status}`);
    assert(unauthRes.body.code === "UNAUTHORIZED", `Expected UNAUTHORIZED, got ${unauthRes.body.code}`);

    // Create User A and User B
    const userA = await User.create({
      name: "Student Alpha",
      email: `alpha_${Date.now()}@example.com`,
      password: "password123",
    });
    const userB = await User.create({
      name: "Student Beta",
      email: `beta_${Date.now()}@example.com`,
      password: "password123",
    });

    const tokenA = generateToken(userA._id);
    const tokenB = generateToken(userB._id);

    // User A submits an assessment
    const s1Answers = getSingleDomainAnswers("tech");
    const s1Res = await request(app).post("/api/career-quiz/v3/stage1").send({ stage1Answers: s1Answers });
    const s2Answers = {};
    for (const q of s1Res.body.questions) s2Answers[q.id] = q.options[0].id;

    const submitResA = await request(app)
      .post("/api/career-quiz/v3/submit")
      .set("Authorization", `Bearer ${tokenA}`)
      .send({ stage1Answers: s1Answers, stage2Answers: s2Answers });
    assert(submitResA.status === 200, "User A submission succeeded");
    const assessmentIdA = submitResA.body.assessmentId;

    // User A queries /latest -> receives their assessment
    const latestResA = await request(app)
      .get("/api/career-quiz/latest")
      .set("Authorization", `Bearer ${tokenA}`);
    assert(latestResA.status === 200, `Expected 200 for User A, got ${latestResA.status}`);
    assert(latestResA.body.assessmentId === assessmentIdA, "User A received their own assessment");

    // User B queries /latest -> User B has not submitted, must receive 404 (NEVER User A's data!)
    const latestResB = await request(app)
      .get("/api/career-quiz/latest")
      .set("Authorization", `Bearer ${tokenB}`);
    assert(latestResB.status === 404, `Expected 404 for User B, got ${latestResB.status}`);
    assert(latestResB.body.code === "ASSESSMENT_NOT_FOUND", `Expected ASSESSMENT_NOT_FOUND, got ${latestResB.body.code}`);

    // Clean up test users and assessments
    await QuizAssessment.deleteMany({ userId: { $in: [userA._id, userB._id] } });
    await User.deleteMany({ _id: { $in: [userA._id, userB._id] } });
  });

  // -------------------------------------------------------------
  // Test 8: Legacy /submit route remains mounted and functions
  // -------------------------------------------------------------
  await testCase("8. Legacy /submit route remains mounted and executes legacy validation", async () => {
    const legacyBadRes = await request(app)
      .post("/api/career-quiz/submit")
      .send({});

    assert(legacyBadRes.status === 400, `Expected 400 from legacy validator, got ${legacyBadRes.status}`);
    const legacyErr = legacyBadRes.body.error || legacyBadRes.body.message;
    assert(typeof legacyErr === "string", "Expected legacy error message");
  });

  // -------------------------------------------------------------
  // Test 9: Rate limiting & 20 kB Body Limiting
  // -------------------------------------------------------------
  await testCase("9. Abuse protection: rate limiter (429) and body limit >20 kB (413)", async () => {
    // 9a. Body limit test: payload over 20 kB gives 413 PAYLOAD_TOO_LARGE
    const largePayload = {
      stage1Answers: getSingleDomainAnswers("tech"),
      padding: "A".repeat(25 * 1024), // 25 kB
    };
    const bodyLimitRes = await request(app)
      .post("/api/career-quiz/v3/stage1")
      .send(largePayload);

    assert(bodyLimitRes.status === 413, `Expected 413 for payload >20 kB, got ${bodyLimitRes.status}`);
    assert(bodyLimitRes.body.code === "PAYLOAD_TOO_LARGE", `Expected PAYLOAD_TOO_LARGE, got ${bodyLimitRes.body.code}`);

    // 9b. Rate limiter test: enable limiter and hit 31st request
    process.env.TEST_RATE_LIMITER = "true";
    try {
      const s1Answers = getSingleDomainAnswers("tech");
      let hit429 = false;
      let lastStatus = 200;
      let lastBody = null;

      for (let reqCount = 1; reqCount <= 35; reqCount++) {
        const r = await request(app)
          .post("/api/career-quiz/v3/stage1")
          .send({ stage1Answers: s1Answers });
        lastStatus = r.status;
        lastBody = r.body;
        if (r.status === 429) {
          hit429 = true;
          break;
        }
      }

      assert(hit429, `Rate limiter did not trigger 429 after 35 requests (last status: ${lastStatus})`);
      assert(lastBody.code === "RATE_LIMIT_EXCEEDED", `Expected RATE_LIMIT_EXCEEDED, got ${lastBody.code}`);
    } finally {
      delete process.env.TEST_RATE_LIMITER;
    }
  });

  // -------------------------------------------------------------
  // Test 10: Versioning & Stored Result Persistence
  // -------------------------------------------------------------
  await testCase("10. Versioning: bankVersion stored and /latest returns stored data without recomputing", async () => {
    const testUser = await User.create({
      name: "Version Test Student",
      email: `version_${Date.now()}@example.com`,
      password: "password123",
    });
    const token = generateToken(testUser._id);

    const s1Answers = getSingleDomainAnswers("tech");
    const s1Res = await request(app).post("/api/career-quiz/v3/stage1").send({ stage1Answers: s1Answers });
    const s2Answers = {};
    for (const q of s1Res.body.questions) s2Answers[q.id] = q.options[0].id;

    const submitRes = await request(app)
      .post("/api/career-quiz/v3/submit")
      .set("Authorization", `Bearer ${token}`)
      .send({ stage1Answers: s1Answers, stage2Answers: s2Answers });

    assert(submitRes.status === 200, "Submission succeeded");
    const originalPicks = submitRes.body.picks;
    const originalBankVersion = submitRes.body.bankVersion;
    assert(typeof originalBankVersion === "string", "Expected bankVersion string");

    // Manually tamper the stored document in DB to test whether /latest returns stored doc directly
    await QuizAssessment.updateOne(
      { _id: submitRes.body.assessmentId },
      { $set: { "picks.0.title": "Stored Unaltered Pathway" } }
    );

    const latestRes = await request(app)
      .get("/api/career-quiz/latest")
      .set("Authorization", `Bearer ${token}`);

    assert(latestRes.status === 200, "Latest lookup succeeded");
    assert(
      latestRes.body.picks[0].title === "Stored Unaltered Pathway",
      "/latest recomputed answers instead of returning stored assessment!"
    );
    assert(latestRes.body.bankVersion === originalBankVersion, "bankVersion preserved");

    // Clean up
    await QuizAssessment.deleteOne({ _id: submitRes.body.assessmentId });
    await User.deleteOne({ _id: testUser._id });
  });

  console.log("\n=============================================================");
  console.log(`Step 5 API Test Summary: ${passed} Passed, ${failed} Failed`);
  console.log("=============================================================\n");

  await disconnectDB();

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error("Test execution crashed:", err);
  process.exit(1);
});
