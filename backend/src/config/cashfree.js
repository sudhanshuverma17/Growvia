import { Cashfree, CFEnvironment } from "cashfree-pg";
import crypto from "crypto";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
dotenv.config();

// Global single source of truth for single roadmap unlock pricing (in INR)
export const ROADMAP_PRICE_INR = Number(process.env.ROADMAP_PRICE_INR) || 99;

// Cashfree PG API Version (Current recommended stable version is 2025-01-01)
export const CASHFREE_API_VERSION = process.env.CASHFREE_API_VERSION || "2025-01-01";

const cleanEnvValue = (val) => {
  if (!val) return "";
  let clean = String(val).trim();
  if ((clean.startsWith('"') && clean.endsWith('"')) || (clean.startsWith("'") && clean.endsWith("'"))) {
    clean = clean.slice(1, -1).trim();
  }
  return clean;
};

export const isProductionMode = () => {
  const envMode = cleanEnvValue(process.env.CASHFREE_ENV).toUpperCase();
  return envMode === "PRODUCTION";
};

export const getCashfreeMode = () => (isProductionMode() ? "PRODUCTION" : "TEST");
export const getCashfreeClientMode = () => (isProductionMode() ? "production" : "sandbox");

export const isConfigured = () => {
  const id = cleanEnvValue(process.env.CASHFREE_APP_ID);
  const secret = cleanEnvValue(process.env.CASHFREE_SECRET_KEY);
  if (!id || !secret) return false;
  const isPlaceholder =
    id.includes("your_cashfree") ||
    id.includes("placeholder") ||
    id.startsWith("<") ||
    secret.includes("your_cashfree") ||
    secret.includes("placeholder") ||
    secret.startsWith("<");
  return !isPlaceholder;
};

let cashfreeInstance = null;

export const getCashfreeInstance = () => {
  if (!isConfigured()) {
    return null;
  }
  const id = cleanEnvValue(process.env.CASHFREE_APP_ID);
  const secret = cleanEnvValue(process.env.CASHFREE_SECRET_KEY);
  const environment = isProductionMode() ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX;

  if (
    !cashfreeInstance ||
    cashfreeInstance._appId !== id ||
    cashfreeInstance._secretKey !== secret ||
    cashfreeInstance._env !== environment
  ) {
    try {
      cashfreeInstance = new Cashfree(environment, id, secret);
      cashfreeInstance.XApiVersion = CASHFREE_API_VERSION;
      cashfreeInstance._appId = id;
      cashfreeInstance._secretKey = secret;
      cashfreeInstance._env = environment;

      Cashfree.XClientId = id;
      Cashfree.XClientSecret = secret;
      Cashfree.XEnvironment = environment;
    } catch (err) {
      console.error(`❌ [Cashfree PG]: Failed to initialize SDK: ${err.message}`);
      return null;
    }
  }
  return cashfreeInstance;
};

// Initial log on module startup
if (isConfigured()) {
  const instance = getCashfreeInstance();
  if (instance) {
    console.log(`💳 [Cashfree PG]: SDK initialized successfully in ${getCashfreeMode()} mode (API Version: ${CASHFREE_API_VERSION}).`);
  }
} else {
  console.log(
    `ℹ️ [Cashfree PG]: Running in ${getCashfreeMode()} mode. Valid CASHFREE_APP_ID and CASHFREE_SECRET_KEY are not yet configured in backend/.env.`
  );
}

/**
 * Verifies Cashfree Webhook Signature
 * Specification: HMAC-SHA256(timestamp + rawBody, secretKey) in Base64
 *
 * @param {string} signature - Value of "x-webhook-signature" header
 * @param {string|Buffer} rawBody - Raw unparsed request body
 * @param {string} timestamp - Value of "x-webhook-timestamp" header
 * @returns {boolean}
 */
export const verifyCashfreeWebhookSignature = (signature, rawBody, timestamp) => {
  if (!signature || !rawBody || !timestamp) return false;

  const secret = process.env.CASHFREE_SECRET_KEY?.trim() || "";
  if (!secret) {
    console.warn("⚠️ [Cashfree Webhook]: CASHFREE_SECRET_KEY is not set in .env.");
    return false;
  }

  const rawBodyString = Buffer.isBuffer(rawBody)
    ? rawBody.toString("utf8")
    : typeof rawBody === "string"
    ? rawBody
    : JSON.stringify(rawBody);

  try {
    // 1. If SDK instance has built-in verification, attempt it
    if (cashfreeInstance && typeof cashfreeInstance.PGVerifyWebhookSignature === "function") {
      try {
        const sdkResult = cashfreeInstance.PGVerifyWebhookSignature(signature, rawBodyString, timestamp);
        if (sdkResult === true) return true;
      } catch (sdkErr) {
        // Fall back to standard cryptographic verification below
      }
    }

    // 2. Standard Cashfree HMAC-SHA256 Base64 calculation
    const payload = `${timestamp}${rawBodyString}`;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("base64");

    const sigBuffer = Buffer.from(signature, "utf8");
    const expectedBuffer = Buffer.from(expectedSignature, "utf8");

    if (sigBuffer.length !== expectedBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(sigBuffer, expectedBuffer);
  } catch (err) {
    console.error(`❌ [Cashfree Webhook]: Error verifying signature (${getCashfreeMode()} mode):`, err.message);
    return false;
  }
};

export default cashfreeInstance;
