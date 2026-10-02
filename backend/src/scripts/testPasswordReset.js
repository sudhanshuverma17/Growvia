import mongoose from "mongoose";
import dotenv from "dotenv";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import { connectDB, disconnectDB } from "../config/db.js";
import User from "../models/User.js";
import PasswordResetToken from "../models/PasswordResetToken.js";

async function runTests() {
  console.log("\n==================================================");
  console.log("🔒 Password Reset & Resend Flow Test Suite");
  console.log("==================================================");

  try {
    await connectDB();
    console.log("✅ Database connected successfully.");

    const testEmail = `test_reset_${Date.now()}@example.com`;
    const initialPassword = "initialPassword123";
    const newPassword = "newSecurePassword2026!";

    // 1. Create a test user
    console.log(`\n1. Creating test user: ${testEmail}...`);
    const user = await User.create({
      name: "Reset Tester",
      email: testEmail,
      password: initialPassword,
      role: "user",
    });
    console.log("   ✅ User created with ID:", user._id.toString());

    // Verify initial password match
    const initialMatch = await user.matchPassword(initialPassword);
    if (!initialMatch) throw new Error("Initial password did not match!");
    console.log("   ✅ Initial password verified with bcryptjs.");

    // 2. Generate a password reset token (simulating forgotPassword controller)
    console.log("\n2. Simulating forgot-password token creation...");
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    const tokenDoc = await PasswordResetToken.create({
      userId: user._id,
      tokenHash,
      expiresAt,
    });
    console.log("   ✅ Token record created in MongoDB.");
    console.log("   - Raw token length:", rawToken.length, "characters");
    console.log("   - Stored tokenHash:", tokenHash);
    console.log("   - Verified raw token is NOT in DB:", !tokenDoc.rawToken);
    console.log("   - Token expiry in:", Math.round((expiresAt - Date.now()) / 60000), "minutes");

    // 3. Verify lookup by token hash
    console.log("\n3. Testing token lookup and expiry check...");
    const lookupHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const foundRecord = await PasswordResetToken.findOne({
      tokenHash: lookupHash,
      expiresAt: { $gt: new Date() },
    });
    if (!foundRecord) throw new Error("Valid token could not be found!");
    console.log("   ✅ Active token record found by hash matching.");

    // 4. Test invalid token lookup
    const fakeHash = crypto.createHash("sha256").update("completelyWrongToken").digest("hex");
    const notFoundRecord = await PasswordResetToken.findOne({
      tokenHash: fakeHash,
      expiresAt: { $gt: new Date() },
    });
    if (notFoundRecord) throw new Error("Invalid token unexpectedly matched!");
    console.log("   ✅ Invalid token was correctly rejected.");

    // 5. Test expired token rejection
    const expiredToken = crypto.randomBytes(32).toString("hex");
    const expiredHash = crypto.createHash("sha256").update(expiredToken).digest("hex");
    await PasswordResetToken.create({
      userId: user._id,
      tokenHash: expiredHash,
      expiresAt: new Date(Date.now() - 1000), // expired 1 sec ago
    });
    const expiredFound = await PasswordResetToken.findOne({
      tokenHash: expiredHash,
      expiresAt: { $gt: new Date() },
    });
    if (expiredFound) throw new Error("Expired token was unexpectedly accepted!");
    console.log("   ✅ Expired token was correctly rejected ($gt: new Date()).");

    // 6. Complete password reset (updating user password)
    console.log("\n4. Resetting user password to new password...");
    user.password = newPassword;
    await user.save();
    await PasswordResetToken.deleteMany({ userId: user._id });
    console.log("   ✅ User password updated & tokens deleted.");

    // 7. Verify new password authentication with fresh query
    const updatedUser = await User.findById(user._id).select("+password");
    const oldMatch = await updatedUser.matchPassword(initialPassword);
    const newMatch = await updatedUser.matchPassword(newPassword);

    if (oldMatch) throw new Error("Old password still matched after reset!");
    if (!newMatch) throw new Error("New password did not match after reset!");
    console.log("   ✅ Old password is NO LONGER valid.");
    console.log("   ✅ New password correctly verified with bcryptjs.");

    // 8. Verify single-use: token has been deleted
    const tokensLeft = await PasswordResetToken.countDocuments({ userId: user._id });
    if (tokensLeft !== 0) throw new Error("Reset tokens were not deleted after password reset!");
    console.log("   ✅ Verified tokens deleted (count = 0). Single-use enforced.");

    // Clean up test user
    await User.findByIdAndDelete(user._id);
    await PasswordResetToken.deleteMany({ userId: user._id });
    console.log("\n🧹 Test cleanup complete.");
    console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY!\n");
  } catch (err) {
    console.error("\n❌ Test Failed:", err);
    process.exitCode = 1;
  } finally {
    await disconnectDB();
  }
}

runTests();
