import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  toggleSaveRoadmap,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, loginUser);
router.get("/me", protect, getMe);
router.post("/save-roadmap", protect, toggleSaveRoadmap);

export default router;
