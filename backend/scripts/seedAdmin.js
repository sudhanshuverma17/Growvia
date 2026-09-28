import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import User from "../src/models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables (.env from backend or root directory)
dotenv.config({ path: path.resolve(__dirname, "../.env") });
if (!process.env.MONGO_URI) {
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });
}

const seedAdmin = async () => {
  const mongoUri = process.env.MONGO_URI;
  const adminName = (process.env.ADMIN_NAME || "").trim();
  const adminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD;

  if (!mongoUri) {
    console.error("❌ [Seed Admin Error]: MONGO_URI is not defined in environment variables (.env).");
    process.exit(1);
  }

  if (!adminName || !adminEmail || !adminPassword) {
    console.error("❌ [Seed Admin Error]: Required environment variables are missing in .env:");
    if (!adminName) console.error("   - ADMIN_NAME is missing or empty");
    if (!adminEmail) console.error("   - ADMIN_EMAIL is missing or empty");
    if (!adminPassword) console.error("   - ADMIN_INITIAL_PASSWORD is missing or empty");
    process.exit(1);
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB.");

    // Check existing admin accounts in the database
    const existingAdmins = await User.find({ role: "admin" });

    // If an admin with the configured ADMIN_EMAIL already exists, exit without changes
    const alreadyConfiguredAdmin = existingAdmins.find(
      (a) => a.email.toLowerCase() === adminEmail
    );

    if (alreadyConfiguredAdmin) {
      console.log(`ℹ️ [Seed Admin]: An admin already exists with email: ${alreadyConfiguredAdmin.email}. Exiting without changes.`);
      await mongoose.disconnect();
      process.exit(0);
    }

    if (existingAdmins.length > 0) {
      console.log(
        `ℹ️ [Seed Admin]: Found temporary admin account(s): ${existingAdmins.map((a) => a.email).join(", ")}.`
      );
      console.log(`Provisioning new seeded administrator: ${adminEmail}...`);
    } else {
      console.log(`Provisioning administrator account for: ${adminEmail}...`);
    }

    // Create the new admin account; let the pre-save hook in User.js hash the password
    const adminUser = new User({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });

    // Mark as intentional admin seeding so pre-save hook allows creation during migration
    adminUser.$locals = { isSeedingAdmin: true };

    await adminUser.save();

    console.log("\n🎉 Administrator account created successfully!");
    console.log("--------------------------------------------------");
    console.log(`  Name:  ${adminUser.name}`);
    console.log(`  Email: ${adminUser.email}`);
    console.log(`  Role:  ${adminUser.role}`);
    console.log(`  ID:    ${adminUser._id}`);
    console.log("--------------------------------------------------");

    if (existingAdmins.length > 0) {
      console.log(
        `\n⚠️  Notice: Temporary admin account '${existingAdmins[0].email}' is still present.`
      );
      console.log(
        `   To delete it now, run: node scripts/removeOldAdmin.js ${existingAdmins[0].email}\n`
      );
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ [Seed Admin Error]:", error.message);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    process.exit(1);
  }
};

seedAdmin();
