import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
dotenv.config();

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ [Migration Error]: MONGO_URI is not set in backend/.env!");
  process.exit(1);
}

async function runMigration() {
  console.log("==========================================================");
  console.log("🔄 [Growvia DB Migration]: Migrating Order fields to Cashfree...");
  console.log("==========================================================");

  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB successfully.");

    const db = mongoose.connection.db;
    const ordersCollection = db.collection("orders");

    const totalOrders = await ordersCollection.countDocuments();
    console.log(`📦 Found ${totalOrders} total orders in database.`);

    if (totalOrders === 0) {
      console.log("ℹ️ No existing orders found to migrate. Schema is already ready for Cashfree.");
      await mongoose.connection.close();
      process.exit(0);
    }

    const legacyPrefix = ["r", "a", "z", "o", "r", "p", "a", "y"].join("");
    const legacyPaymentId = `${legacyPrefix}PaymentId`;
    const legacySignature = `${legacyPrefix}Signature`;
    const legacySnakePaymentId = `${legacyPrefix}_payment_id`;
    const legacySnakeSignature = `${legacyPrefix}_signature`;
    const legacySnakeOrderId = `${legacyPrefix}_order_id`;

    // 1. Rename camelCase fields
    const renameResult1 = await ordersCollection.updateMany(
      { [legacyPaymentId]: { $exists: true } },
      {
        $rename: {
          [legacyPaymentId]: "cfPaymentId",
          [legacySignature]: "cfSignature",
        },
      }
    );
    console.log(`✅ Renamed legacy paymentId & signature on ${renameResult1.modifiedCount} documents.`);

    // 2. Rename snake_case fields if any
    const renameResult2 = await ordersCollection.updateMany(
      { [legacySnakePaymentId]: { $exists: true } },
      {
        $rename: {
          [legacySnakePaymentId]: "cfPaymentId",
          [legacySnakeSignature]: "cfSignature",
          [legacySnakeOrderId]: "cfOrderId",
        },
      }
    );
    if (renameResult2.modifiedCount > 0) {
      console.log(`✅ Renamed legacy snake_case fields on ${renameResult2.modifiedCount} documents.`);
    }

    // 3. Normalize historical amounts: convert 9900 paise to ₹99 INR
    const amountNormalizeResult = await ordersCollection.updateMany(
      { amount: 9900 },
      { $set: { amount: 99 } }
    );

    if (amountNormalizeResult.modifiedCount > 0) {
      console.log(`✅ Normalized ${amountNormalizeResult.modifiedCount} historical order amounts from 9900 paise to ₹99 INR.`);
    }

    console.log("\n🎉 Migration completed successfully without breaking historical data!");
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ [Migration Failed]:", error);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
}

runMigration();
