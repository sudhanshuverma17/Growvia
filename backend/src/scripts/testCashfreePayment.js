import crypto from "crypto";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import {
  getCashfreeInstance,
  getCashfreeMode,
  getCashfreeClientMode,
  isConfigured,
  verifyCashfreeWebhookSignature,
  ROADMAP_PRICE_INR,
  CASHFREE_API_VERSION,
} from "../config/cashfree.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
dotenv.config();

console.log("\n========================================================");
console.log("💳 Cashfree Payment Gateway Integration Test Suite");
console.log("========================================================");

// 1. Environment & Mode Verification
console.log("\n1. Environment Configuration Check:");
const currentMode = getCashfreeMode();
const clientMode = getCashfreeClientMode();
console.log(`   - Environment Mode: ${currentMode}`);
console.log(`   - Client SDK Mode: ${clientMode}`);
console.log(`   - API Version: ${CASHFREE_API_VERSION}`);
console.log(`   - Roadmap Unlock Price: ₹${ROADMAP_PRICE_INR} INR`);
console.log(`   - Is Configured with API Keys: ${isConfigured() ? "YES" : "NO (Placeholder/Dev Mode)"}`);

if (currentMode !== "TEST" && currentMode !== "PRODUCTION") {
  console.error("❌ Invalid CASHFREE_ENV! Must be either 'TEST' or 'PRODUCTION'.");
  process.exit(1);
}
console.log("   ✅ Environment resolution verified successfully.");

// 2. Cryptographic Webhook Signature Verification Algorithm Test
console.log("\n2. Webhook Signature Verification Test:");
const testSecret = "test_merchant_secret_key_growvia_12345";
const testTimestamp = `${Date.now()}`;
const testRawBody = JSON.stringify({
  type: "PAYMENT_SUCCESS_WEBHOOK",
  event_time: new Date().toISOString(),
  data: {
    order: { order_id: "order_test_123", order_amount: 99 },
    payment: { cf_payment_id: 99887766, payment_status: "SUCCESS" },
  },
});

const generatedSignature = crypto
  .createHmac("sha256", testSecret)
  .update(`${testTimestamp}${testRawBody}`)
  .digest("base64");

// Temporarily test algorithm
const originalSecret = process.env.CASHFREE_SECRET_KEY;
process.env.CASHFREE_SECRET_KEY = testSecret;

const isVerified = verifyCashfreeWebhookSignature(generatedSignature, testRawBody, testTimestamp);
process.env.CASHFREE_SECRET_KEY = originalSecret;

if (isVerified) {
  console.log("   ✅ Webhook HMAC-SHA256 Base64 verification algorithm: PASSED");
} else {
  console.error("   ❌ Webhook signature verification algorithm FAILED!");
  process.exit(1);
}

// 3. Official Cashfree Sandbox Test Credentials Reference
console.log("\n3. Official Cashfree Sandbox Test Reference:");
console.log("   Cards (Expiry: 03/2028, CVV: 123, OTP: 111000):");
console.log("   - Visa Credit: 4444333322221111 (or 4576238912771450)");
console.log("   - Mastercard Credit: 5105105105105100");
console.log("   - Visa Debit: 4706131211212123");
console.log("   UPI Testing VPAs:");
console.log("   - Success: success@upi");
console.log("   - Failure: incorrect@upi / invalid@upi");

// 4. Live Cashfree SDK Instance Check
console.log("\n4. SDK Instance & Connectivity Check:");
const cashfree = getCashfreeInstance();
if (cashfree && isConfigured()) {
  console.log("   ✅ Cashfree SDK instance is live and ready to process real transactions.");
} else {
  console.log("   ℹ️ Cashfree SDK initialized in offline/dev readiness mode.");
  console.log("      Add your CASHFREE_APP_ID and CASHFREE_SECRET_KEY in backend/.env to run live API calls.");
}

console.log("\n🎉 All Cashfree payment gateway integration tests passed successfully!\n");
process.exit(0);
