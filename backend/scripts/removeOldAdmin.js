import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";
import User from "../src/models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables (.env from backend or root directory)
dotenv.config({ path: path.resolve(__dirname, "../.env") });
if (!process.env.MONGO_URI) {
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });
}

const removeOldAdmin = async () => {
  const targetEmail = process.argv[2];

  if (!targetEmail) {
    console.error("❌ Usage: node scripts/removeOldAdmin.js <temporary_admin_email>");
    console.error("   Example: node scripts/removeOldAdmin.js admin@growvia.com");
    process.exit(1);
  }

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("❌ [Error]: MONGO_URI is not defined in environment variables (.env).");
    process.exit(1);
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB.");

    const emailLower = targetEmail.trim().toLowerCase();
    const accountToDelete = await User.findOne({ email: emailLower });

    if (!accountToDelete) {
      console.error(`❌ [Error]: Account with email '${emailLower}' was not found in the database.`);
      await mongoose.disconnect();
      process.exit(1);
    }

    if (accountToDelete.role !== "admin") {
      console.error(
        `❌ [Error]: Account '${emailLower}' does not have the 'admin' role (current role: '${accountToDelete.role}').`
      );
      console.error("   This cleanup script only removes administrator accounts.");
      await mongoose.disconnect();
      process.exit(1);
    }

    // Check how many admins currently exist in the database
    const adminCount = await User.countDocuments({ role: "admin" });

    // Must refuse to run if that account is the only admin
    if (adminCount <= 1) {
      console.error(
        `\n❌ [Refused]: Cannot delete '${emailLower}' because it is the ONLY administrator account in the database (${adminCount} admin found).`
      );
      console.error(
        "   Safety check prevented account deletion. Please create the new admin account first via 'npm run seed:admin' before removing the temporary admin.\n"
      );
      await mongoose.disconnect();
      process.exit(1);
    }

    // Display account information to be deleted
    console.log("\n==================================================");
    console.log("          ACCOUNT SCHEDULED FOR DELETION          ");
    console.log("==================================================");
    console.log(`  ID:         ${accountToDelete._id}`);
    console.log(`  Name:       ${accountToDelete.name}`);
    console.log(`  Email:      ${accountToDelete.email}`);
    console.log(`  Role:       ${accountToDelete.role}`);
    console.log(`  Created At: ${accountToDelete.createdAt}`);
    console.log("==================================================\n");

    // Ask for explicit user confirmation
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const confirmation = await new Promise((resolve) => {
      rl.question(
        `Are you sure you want to permanently delete this administrator account (${emailLower})? (yes/no): `,
        (ans) => {
          rl.close();
          resolve(ans.trim().toLowerCase());
        }
      );
    });

    if (confirmation !== "yes" && confirmation !== "y") {
      console.log("\n🛑 Operation cancelled. No changes were made to the database.");
      await mongoose.disconnect();
      process.exit(0);
    }

    // Delete the target admin account
    await User.deleteOne({ _id: accountToDelete._id });

    console.log(`\n✅ Administrator account '${emailLower}' has been permanently deleted.`);

    const remainingAdmins = await User.find({ role: "admin" });
    console.log(
      `ℹ️  Remaining administrator account(s): ${remainingAdmins.map((a) => a.email).join(", ")}`
    );

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ [Error]:", error.message);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    process.exit(1);
  }
};

removeOldAdmin();
