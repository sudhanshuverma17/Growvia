import mongoose from "mongoose";
import CounselingBooking from "../models/CounselingBooking.js";
import User from "../models/User.js";

/**
 * Counseling Controller
 * Verifies access status and manages 1:1 counseling bookings and reminders.
 * Gated strictly to users who have purchased at least one roadmap (or admin).
 */

// @desc    Get counseling eligibility status and booking configuration
// @route   GET /api/counseling/status
// @access  Protected (Requires purchased roadmap or admin)
export const getCounselingStatus = async (req, res) => {
  try {
    const isAdmin = req.user.role === "admin";
    const purchasedRoadmaps = Array.isArray(req.user.purchasedRoadmaps)
      ? req.user.purchasedRoadmaps
      : [];

    const hasAccess = isAdmin || purchasedRoadmaps.length > 0;

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        hasAccess: false,
        message:
          "Forbidden: 1:1 Counseling is an exclusive premium feature reserved for students who have purchased a roadmap.",
        code: "ROADMAP_PURCHASE_REQUIRED",
      });
    }

    return res.status(200).json({
      success: true,
      hasAccess: true,
      message: "Eligible for 1:1 Counseling session",
      bookingUrl: "https://uttkarsh.dayschedule.com/meeting-with-uttkarsh",
      purchasedRoadmaps,
    });
  } catch (error) {
    console.error("[Counseling Status Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Server error checking counseling status",
      error: error.message,
    });
  }
};

// @desc    Get current user's 1:1 counseling bookings / reminders
// @route   GET /api/counseling/bookings
// @access  Protected
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookings = await CounselingBooking.find({ userId })
      .sort({ scheduledDate: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("[Get Bookings Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Server error retrieving counseling bookings",
      error: error.message,
    });
  }
};

// @desc    Create a new 1:1 counseling booking reminder
// @route   POST /api/counseling/bookings
// @access  Protected (Requires purchased roadmap or admin)
export const createBooking = async (req, res) => {
  try {
    const {
      scheduledDate,
      meetLink,
      sessionTitle,
      mentorName,
      roadmapTitle,
      durationMinutes,
      notes,
      bookingReference,
    } = req.body;

    if (!scheduledDate) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid scheduledDate for the 1:1 counseling session",
      });
    }

    const parsedDate = new Date(scheduledDate);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format provided for scheduledDate",
      });
    }

    const finalMeetLink = (meetLink || "").trim() || "https://uttkarsh.dayschedule.com/meeting-with-uttkarsh";

    // Check for existing booking to prevent duplicates
    let existing = null;
    if (bookingReference && bookingReference.trim()) {
      existing = await CounselingBooking.findOne({
        userId: req.user._id,
        bookingReference: bookingReference.trim(),
      });
    }

    if (!existing) {
      const windowStart = new Date(parsedDate.getTime() - 15 * 60 * 1000);
      const windowEnd = new Date(parsedDate.getTime() + 15 * 60 * 1000);
      existing = await CounselingBooking.findOne({
        userId: req.user._id,
        scheduledDate: { $gte: windowStart, $lte: windowEnd },
        status: { $ne: "cancelled" },
      });
    }

    if (existing) {
      if (finalMeetLink && existing.meetLink !== finalMeetLink) {
        existing.meetLink = finalMeetLink;
        await existing.save();
      }
      return res.status(200).json({
        success: true,
        message: "Counseling session reminder already recorded",
        booking: existing,
      });
    }

    const booking = await CounselingBooking.create({
      userId: req.user._id,
      userEmail: req.user.email,
      userName: req.user.name || "Student",
      mentorName: mentorName ? mentorName.trim() : "Uttkarsh",
      sessionTitle: sessionTitle ? sessionTitle.trim() : "1:1 Career Strategy & Mentorship with Uttkarsh",
      roadmapTitle: roadmapTitle ? roadmapTitle.trim() : "General Career Strategy",
      scheduledDate: parsedDate,
      durationMinutes: durationMinutes ? Number(durationMinutes) : 45,
      meetLink: finalMeetLink,
      status: "scheduled",
      notes: notes ? notes.trim() : "",
      bookingReference: bookingReference ? bookingReference.trim() : "",
    });

    return res.status(201).json({
      success: true,
      message: "Counseling session reminder booked successfully",
      booking,
    });
  } catch (error) {
    console.error("[Create Booking Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Server error creating counseling booking",
      error: error.message,
    });
  }
};

// @desc    Update an existing counseling booking reminder
// @route   PUT /api/counseling/bookings/:id
// @access  Protected
export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await CounselingBooking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Counseling booking not found",
      });
    }

    // Verify ownership or admin privileges
    if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You do not have permission to modify this booking",
      });
    }

    const {
      scheduledDate,
      meetLink,
      sessionTitle,
      mentorName,
      roadmapTitle,
      durationMinutes,
      status,
      notes,
    } = req.body;

    if (scheduledDate) {
      const parsedDate = new Date(scheduledDate);
      if (!isNaN(parsedDate.getTime())) {
        booking.scheduledDate = parsedDate;
      }
    }

    if (meetLink !== undefined) booking.meetLink = meetLink.trim();
    if (sessionTitle !== undefined) booking.sessionTitle = sessionTitle.trim();
    if (mentorName !== undefined) booking.mentorName = mentorName.trim();
    if (roadmapTitle !== undefined) booking.roadmapTitle = roadmapTitle.trim();
    if (durationMinutes !== undefined) booking.durationMinutes = Number(durationMinutes);
    if (status !== undefined) booking.status = status;
    if (notes !== undefined) booking.notes = notes.trim();

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Counseling booking updated successfully",
      booking,
    });
  } catch (error) {
    console.error("[Update Booking Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Server error updating counseling booking",
      error: error.message,
    });
  }
};

// @desc    Delete / Cancel a counseling booking reminder
// @route   DELETE /api/counseling/bookings/:id
// @access  Protected
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await CounselingBooking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Counseling booking not found",
      });
    }

    // Verify ownership or admin privileges
    if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You do not have permission to delete this booking",
      });
    }

    await CounselingBooking.deleteOne({ _id: booking._id });

    return res.status(200).json({
      success: true,
      message: "Counseling booking removed successfully",
    });
  } catch (error) {
    console.error("[Delete Booking Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Server error deleting counseling booking",
      error: error.message,
    });
  }
};

// @desc    DaySchedule Webhook endpoint for automated booking sync
// @route   POST /api/counseling/webhook
// @access  Public
export const handleDayScheduleWebhook = async (req, res) => {
  try {
    const payload = req.body || {};
    console.log("[DaySchedule Webhook Received]:", JSON.stringify(payload, null, 2));

    const booking = payload.booking || payload.data || payload;
    const inviteeEmail =
      booking.invitee?.email ||
      booking.attendee?.email ||
      booking.user?.email ||
      booking.email ||
      payload.email;

    if (!inviteeEmail) {
      return res.status(200).json({
        success: true,
        message: "Webhook received, no email found to map",
      });
    }

    const user = await User.findOne({
      email: { $regex: new RegExp(`^${inviteeEmail.trim()}$`, "i") },
    });

    if (!user) {
      console.log(`[DaySchedule Webhook]: No Growvia user found with email ${inviteeEmail}`);
      return res.status(200).json({
        success: true,
        message: "User not found in Growvia, skipped",
      });
    }

    const scheduledDate =
      booking.start_at ||
      booking.startTime ||
      booking.start ||
      new Date(Date.now() + 24 * 3600 * 1000);

    const meetLink =
      booking.location?.join_url ||
      booking.join_url ||
      (typeof booking.location === "string" && booking.location.startsWith("http")
        ? booking.location
        : null) ||
      booking.meeting_url ||
      "https://meet.google.com/qmv-sgyt-zkw";

    const bookingRef = String(booking._id || booking.id || booking.booking_id || "").trim();

    // Check for existing booking to prevent duplicates
    let existingBooking = null;
    if (bookingRef) {
      existingBooking = await CounselingBooking.findOne({
        userId: user._id,
        bookingReference: bookingRef,
      });
    }

    if (!existingBooking) {
      const parsedWebhookDate = new Date(scheduledDate);
      const windowStart = new Date(parsedWebhookDate.getTime() - 15 * 60 * 1000);
      const windowEnd = new Date(parsedWebhookDate.getTime() + 15 * 60 * 1000);
      existingBooking = await CounselingBooking.findOne({
        userId: user._id,
        scheduledDate: { $gte: windowStart, $lte: windowEnd },
        status: { $ne: "cancelled" },
      });
    }

    if (existingBooking) {
      if (meetLink && existingBooking.meetLink !== meetLink) {
        existingBooking.meetLink = meetLink;
        await existingBooking.save();
      }
      console.log(`[DaySchedule Webhook]: Existing booking matched for ${user.email}:`, existingBooking._id);
      return res.status(200).json({ success: true, booking: existingBooking });
    }

    const newBooking = await CounselingBooking.create({
      userId: user._id,
      userEmail: user.email,
      userName: user.name || "Student",
      mentorName: booking.host?.name || "Uttkarsh",
      sessionTitle: booking.event?.name || "1:1 Career Strategy & Mentorship with Uttkarsh",
      roadmapTitle:
        (user.purchasedRoadmaps && user.purchasedRoadmaps[0]) || "General Career Strategy",
      scheduledDate: new Date(scheduledDate),
      durationMinutes: booking.duration || 45,
      meetLink,
      status: "scheduled",
      notes: "Automatically synced from DaySchedule booking confirmation",
      bookingReference: bookingRef,
    });

    console.log(`[DaySchedule Webhook]: Successfully created booking for ${user.email}:`, newBooking._id);
    return res.status(201).json({ success: true, booking: newBooking });
  } catch (error) {
    console.error("[DaySchedule Webhook Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Webhook processing error",
      error: error.message,
    });
  }
};

