import express from "express";
import { protect, requirePurchasedRoadmap } from "../middleware/authMiddleware.js";
import {
  getCounselingStatus,
  getUserBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  handleDayScheduleWebhook,
} from "../controllers/counselingController.js";

const router = express.Router();

/**
 * @route   POST /api/counseling/webhook
 * @desc    DaySchedule incoming webhook to automatically record bookings
 * @access  Public
 */
router.post("/webhook", handleDayScheduleWebhook);

/**
 * @route   GET /api/counseling/status
 * @desc    Get counseling eligibility status and booking configuration
 * @access  Protected (Requires authentication and purchased roadmap; returns 403 otherwise)
 */
router.get("/status", protect, requirePurchasedRoadmap, getCounselingStatus);

/**
 * @route   GET /api/counseling/bookings
 * @desc    Get user's scheduled 1:1 counseling bookings / reminders
 * @access  Protected
 */
router.get("/bookings", protect, getUserBookings);

/**
 * @route   POST /api/counseling/bookings
 * @desc    Schedule or record a new 1:1 counseling booking reminder
 * @access  Protected (Requires purchased roadmap or admin)
 */
router.post("/bookings", protect, createBooking);

/**
 * @route   PUT /api/counseling/bookings/:id
 * @desc    Update a counseling booking reminder (reschedule, edit meet link, notes)
 * @access  Protected
 */
router.put("/bookings/:id", protect, updateBooking);

/**
 * @route   DELETE /api/counseling/bookings/:id
 * @desc    Cancel / delete a counseling booking reminder
 * @access  Protected
 */
router.delete("/bookings/:id", protect, deleteBooking);

export default router;
