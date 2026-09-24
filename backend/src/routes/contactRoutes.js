import express from "express";
import {
  submitContactMessage,
  getContactMessages,
  updateMessageStatus,
  deleteContactMessage,
} from "../controllers/contactController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public message submission
router.post("/", submitContactMessage);

// Admin only endpoints
router.get("/", protect, authorize("admin"), getContactMessages);
router.patch("/:id/status", protect, authorize("admin"), updateMessageStatus);
router.delete("/:id", protect, authorize("admin"), deleteContactMessage);

export default router;
