import express from "express";
import {
  submitCareerQuiz,
  getLatestAssessment,
  getAssessmentById,
} from "../controllers/quizController.js";
import { protect, optionalProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Submit quiz (saves to user profile if logged in, or anonymous if guest)
router.post("/submit", optionalProtect, submitCareerQuiz);

// Get authenticated student's latest assessment
router.get("/latest", protect, getLatestAssessment);

// Get assessment by ID
router.get("/:id", getAssessmentById);

export default router;
