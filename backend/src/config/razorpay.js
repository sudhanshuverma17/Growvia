import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
dotenv.config();

const keyId = process.env.RAZORPAY_KEY_ID?.trim() || "";
const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim() || "";

const isPlaceholderKey =
  !keyId ||
  !keySecret 

let razorpayInstance = null;

if (!isPlaceholderKey) {
  try {
    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
    console.log("💳 [Razorpay]: SDK initialized with live/test key ID:", keyId);
  } catch (err) {
    console.error("❌ [Razorpay]: Failed to initialize Razorpay SDK:", err.message);
  }
} else {
  console.log(
    "ℹ️ [Razorpay]: Running with Dev/Mock Razorpay handler. Configure real keys in backend/.env for live Razorpay checkout."
  );
}

export const getRazorpayInstance = () => razorpayInstance;

export const isConfigured = () => Boolean(razorpayInstance);

/**
 * Verifies Razorpay payment signature
 * HMAC-SHA256(order_id + "|" + payment_id, secret)
 */
export const verifyRazorpaySignature = ({
  orderId,
  paymentId,
  signature,
}) => {
  if (!orderId || !paymentId || !signature) return false;

  // In local dev/mock test mode with placeholder keys, allow verified dev test payments
  if (isPlaceholderKey && (signature.startsWith("dev_mock_sig_") || signature === "valid_dev_signature")) {
    return true;
  }

  const secret = process.env.RAZORPAY_KEY_SECRET || "GrowviaRazorpayDevSecret1234";
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return expectedSignature === signature;
};

/**
 * Verifies Razorpay Webhook signature
 * HMAC-SHA256(raw_body_string, webhook_secret)
 */
export const verifyRazorpayWebhookSignature = (rawBody, signature, webhookSecret) => {
  if (!rawBody || !signature) return false;
  const secret = webhookSecret || process.env.RAZORPAY_WEBHOOK_SECRET || "";
  if (!secret) {
    console.warn("⚠️ [Razorpay Webhook]: RAZORPAY_WEBHOOK_SECRET is not configured in .env");
    return false;
  }

  try {
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(typeof rawBody === "string" ? rawBody : rawBody.toString("utf8"))
      .digest("hex");

    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, "utf8"),
      Buffer.from(signature, "utf8")
    );
  } catch (err) {
    console.error("❌ [Razorpay Webhook]: Signature validation error:", err.message);
    return false;
  }
};

export default razorpayInstance;
