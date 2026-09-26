import express from "express";
import { protect, requirePurchasedRoadmap } from "../middleware/authMiddleware.js";
import { getCounselingStatus } from "../controllers/counselingController.js";

const router = express.Router();

/**
 * @route   GET /api/counseling/status
 * @desc    Get counseling eligibility status and booking configuration
 * @access  Protected (Requires authentication and purchased roadmap; returns 403 otherwise)
 */
router.get("/status", protect, requirePurchasedRoadmap, getCounselingStatus);

export default router;
