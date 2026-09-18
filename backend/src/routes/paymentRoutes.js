import express from "express";
import {
  createOrder,
  verifyPayment,
  bypassUnlockRoadmap,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Direct roadmap unlock bypass (no payment gateway invoked)
router.post("/bypass-unlock", protect, bypassUnlockRoadmap);

// Order creation & client-to-server verification
router.post("/create-order", protect, createOrder);
router.post("/verify", protect, verifyPayment);

export default router;
