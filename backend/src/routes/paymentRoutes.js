import express from "express";
import {
  createOrder,
  verifyPayment,
  handleCashfreeWebhook,
  paymentCallback,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Order creation & client-to-server verification (Protected)
router.post("/create-order", protect, createOrder);
router.post("/verify", protect, verifyPayment);

// Cashfree post-payment callback handler (Closes popup window & notifies main tab)
router.get("/callback", paymentCallback);

// Health check / probe for Cashfree webhook endpoint (GET / HEAD)
router.get("/webhook", (req, res) => {
  res.status(200).json({ status: "OK", message: "Cashfree webhook endpoint is active" });
});

// Cashfree Server-to-Server Webhook (Public, Cryptographically Signature-verified)
router.post("/webhook", handleCashfreeWebhook);

export default router;
