import express from "express";
import { streamChat, getChatHistory, clearChatHistory } from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";
import { chatLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// All chat routes require logged-in authentication
router.use(protect);

// Stream token-by-token responses with per-user rate limiting
router.post("/stream", chatLimiter, streamChat);

// Retrieve persistent chat history for authenticated user
router.get("/history", getChatHistory);

// Clear persistent chat history for authenticated user
router.delete("/history", clearChatHistory);

export default router;
