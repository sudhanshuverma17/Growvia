import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../backend/.env") });

import { connectDB, disconnectDB } from "../backend/src/config/db.js";
import User from "../backend/src/models/User.js";
import PasswordResetToken from "../backend/src/models/PasswordResetToken.js";

async function check() {
  console.log("=== Checking User and Resend ===");
  await connectDB();

  const targetEmail = "vermaji1372005@gmail.com";
  const user = await User.findOne({ email: targetEmail.toLowerCase().trim() });

  if (!user) {
    console.log(`❌ User NOT found in database for email: ${targetEmail}`);
    const count = await User.countDocuments();
    console.log(`Total users in DB: ${count}`);
    const sampleUsers = await User.find({}).limit(5).select("email name");
    console.log("Sample users:", sampleUsers);
  } else {
    console.log(`✅ User FOUND in database:`, {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    const tokens = await PasswordResetToken.find({ userId: user._id });
    console.log(`Password reset tokens in DB for this user (${tokens.length}):`, tokens);
  }

  // Now test Resend API key directly
  const apiKey = process.env.RESEND_API_KEY;
  console.log(`\nTesting Resend API Key: ${apiKey?.slice(0, 8)}...`);
  const resend = new Resend(apiKey);

  try {
    const res = await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      to: targetEmail,
      subject: "Test from Honesvia",
      text: "This is a direct test email.",
    });
    console.log("Resend API response:", res);
  } catch (err) {
    console.error("Resend API threw error:", err);
  }

  await disconnectDB();
}

check();
