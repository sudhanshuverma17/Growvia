import express from "express";
import {
  submitCareerQuiz,
  getAssessmentById,
} from "../controllers/quizController.js";
import {
  getStage1Questions,
  submitQuizV3,
  getLatestAssessmentV3,
} from "../controllers/quizV3Controller.js";
import { protect, optionalProtect } from "../middleware/authMiddleware.js";
import { quizLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// Middleware to enforce 20 kB payload limit on v3 endpoints
const check20kbLimit = (req, res, next) => {
  const len = req.rawBody ? req.rawBody.length : parseInt(req.headers["content-length"] || "0", 10);
  if (len > 20 * 1024) {
    return res.status(413).json({
      success: false,
      error: "Request payload exceeds size limit (20 kB).",
      code: "PAYLOAD_TOO_LARGE",
    });
  }
  next();
};

// Career Quiz v3 Routes (Step 5)
// Rate limited to ~30 req/min per IP with 20 kB body limit
router.post(
  "/v3/stage1",
  check20kbLimit,
  quizLimiter,
  getStage1Questions
);

router.post(
  "/v3/submit",
  check20kbLimit,
  quizLimiter,
  optionalProtect,
  submitQuizV3
);

// Extended latest assessment route (supports v3 and normalizes legacy v2)
router.get("/latest", optionalProtect, getLatestAssessmentV3);

// Legacy v2 Routes (untouched and maintained until Step 7)
router.post("/submit", optionalProtect, submitCareerQuiz);

// Get assessment by ID
router.get("/:id", getAssessmentById);

export default router;
