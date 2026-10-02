import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../backend/.env") });

import { connectDB, disconnectDB } from "../backend/src/config/db.js";
import User from "../backend/src/models/User.js";
import PasswordResetToken from "../backend/src/models/PasswordResetToken.js";

async function generateLink() {
  await connectDB();
  const email = "vermaji1372005@gmail.com";
  const user = await User.findOne({ email });

  if (!user) {
    console.log("User not found!");
    return;
  }

  await PasswordResetToken.deleteMany({ userId: user._id });

  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
  const expiresAt = new Date(Date.now() + 3600000);

  await PasswordResetToken.create({
    userId: user._id,
    tokenHash,
    expiresAt,
  });

  const appUrl = (process.env.APP_URL || "https://honesvia.com").replace(/\/+$/, "");
  console.log("\n==================================================");
  console.log(`🔗 Fresh Reset Link for ${email}:`);
  console.log(`${appUrl}/reset-password?token=${rawToken}`);
  console.log(`Or local link:`);
  console.log(`http://localhost:3000/reset-password?token=${rawToken}`);
  console.log("==================================================\n");

  await disconnectDB();
}

generateLink();
