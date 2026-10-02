import request from "supertest";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import app from "../server.js";
import { connectDB, disconnectDB } from "../config/db.js";
import User from "../models/User.js";
import PasswordResetToken from "../models/PasswordResetToken.js";

async function runApiTests() {
  console.log("\n==================================================");
  console.log("🚀 Testing /api/forgot-password & /api/reset-password HTTP APIs");
  console.log("==================================================");

  try {
    await connectDB();

    const testEmail = `apitest_${Date.now()}@example.com`;
    const initialPassword = "oldPassword123";
    const newPassword = "newPassword456!";

    // Create user
    const user = await User.create({
      name: "API Tester",
      email: testEmail,
      password: initialPassword,
      role: "user",
    });

    // 1. Test POST /api/forgot-password with non-existent email -> should succeed generically
    console.log("1. Testing forgot-password with non-existent email...");
    const resUnknown = await request(app)
      .post("/api/forgot-password")
      .send({ email: "doesnotexist@example.com" });
    if (resUnknown.status !== 200 || !resUnknown.body.success) {
      throw new Error(`Expected 200 with success: true, got ${resUnknown.status}: ${JSON.stringify(resUnknown.body)}`);
    }
    console.log("   ✅ Anti-enumeration: returns generic success message.");

    // 2. Test POST /api/forgot-password with valid email
    console.log("2. Testing forgot-password with existing user email...");
    const resExisting = await request(app)
      .post("/api/forgot-password")
      .send({ email: testEmail });
    if (resExisting.status !== 200 || !resExisting.body.success) {
      throw new Error(`Expected 200 with success: true, got ${resExisting.status}: ${JSON.stringify(resExisting.body)}`);
    }
    console.log("   ✅ Generic success response returned.");

    // Check token was stored in DB
    const tokenDoc = await PasswordResetToken.findOne({ userId: user._id });
    if (!tokenDoc) throw new Error("PasswordResetToken not found in database!");
    console.log("   ✅ Token hash stored in database. Stored hash:", tokenDoc.tokenHash);

    // 3. Test POST /api/reset-password with short password (< 8 chars)
    console.log("3. Testing reset-password with short password (< 8 chars)...");
    const resShort = await request(app)
      .post("/api/reset-password")
      .send({ token: "someDummyToken", newPassword: "short" });
    if (resShort.status !== 400) {
      throw new Error(`Expected 400 for short password, got ${resShort.status}`);
    }
    console.log("   ✅ Short password correctly rejected (400).");

    // 4. Test POST /api/reset-password with invalid token
    console.log("4. Testing reset-password with invalid token...");
    const resInvalid = await request(app)
      .post("/api/reset-password")
      .send({ token: "invalidtoken1234567890", newPassword: "ValidPassword123" });
    if (resInvalid.status !== 400) {
      throw new Error(`Expected 400 for invalid token, got ${resInvalid.status}`);
    }
    console.log("   ✅ Invalid token correctly rejected (400).");

    // 5. Generate a known rawToken and store hash for testing successful reset
    console.log("5. Testing successful password reset with valid token...");
    const knownRawToken = crypto.randomBytes(32).toString("hex");
    const knownHash = crypto.createHash("sha256").update(knownRawToken).digest("hex");
    await PasswordResetToken.deleteMany({ userId: user._id });
    await PasswordResetToken.create({
      userId: user._id,
      tokenHash: knownHash,
      expiresAt: new Date(Date.now() + 3600000),
    });

    const resSuccess = await request(app)
      .post("/api/reset-password")
      .send({ token: knownRawToken, newPassword: newPassword });
    if (resSuccess.status !== 200 || !resSuccess.body.success) {
      throw new Error(`Expected 200 success, got ${resSuccess.status}: ${JSON.stringify(resSuccess.body)}`);
    }
    console.log("   ✅ Reset password succeeded (200).");

    // Verify user can login with new password and cannot login with old
    const resOldLogin = await request(app)
      .post("/api/auth/login")
      .send({ email: testEmail, password: initialPassword });
    if (resOldLogin.status !== 401) {
      throw new Error("Old password should have been rejected!");
    }
    console.log("   ✅ Old password rejected during login (401).");

    const resNewLogin = await request(app)
      .post("/api/auth/login")
      .send({ email: testEmail, password: newPassword });
    if (resNewLogin.status !== 200 || !resNewLogin.body.token) {
      throw new Error("New password should have allowed login!");
    }
    console.log("   ✅ New password authenticated successfully (200) and returned JWT token!");

    // 6. Test token cannot be reused
    console.log("6. Testing single-use token reuse prevention...");
    const resReused = await request(app)
      .post("/api/reset-password")
      .send({ token: knownRawToken, newPassword: "anotherPassword123!" });
    console.log(`   [Response Status]: ${resReused.status}`, resReused.body);
    if (resReused.status !== 400 && resReused.status !== 429) {
      throw new Error(`Reused token should have been rejected (400 or 429), got ${resReused.status}`);
    }
    console.log("   ✅ Reused token / extra request correctly blocked!");

    // Cleanup
    await User.findByIdAndDelete(user._id);
    await PasswordResetToken.deleteMany({ userId: user._id });
    console.log("🧹 Cleanup complete.");

    console.log("\n🎉 ALL HTTP API TESTS PASSED!\n");
  } catch (err) {
    console.error("\n❌ API Test Failed:", err);
    process.exitCode = 1;
  } finally {
    await disconnectDB();
  }
}

runApiTests();
