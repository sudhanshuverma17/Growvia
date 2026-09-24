import fs from "fs";
import path from "path";
import crypto from "crypto";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { ContactMessage } from "../models/ContactMessage.js";
import { connectDB } from "../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fallbackStorePath = path.resolve(__dirname, "../data/messages-store.json");

// Helper to ensure fallback data file exists
const readFallbackStore = () => {
  try {
    if (fs.existsSync(fallbackStorePath)) {
      const data = fs.readFileSync(fallbackStorePath, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn("[Contact Controller Warning]: Could not read fallback store:", err.message);
  }
  return [];
};

const writeFallbackStore = (messages) => {
  try {
    const dir = path.dirname(fallbackStorePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fallbackStorePath, JSON.stringify(messages, null, 2), "utf-8");
  } catch (err) {
    console.warn("[Contact Controller Warning]: Could not write fallback store:", err.message);
  }
};

/**
 * @desc    Submit a new contact message
 * @route   POST /api/contact
 * @access  Public
 */
export const submitContactMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, message: "Please provide a valid email address" });
    }
    if (!subject || !subject.trim()) {
      return res.status(400).json({ success: false, message: "Subject is required" });
    }
    if (!message || message.trim().length < 5) {
      return res.status(400).json({ success: false, message: "Message must be at least 5 characters long" });
    }

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    let savedMessage = null;

    // 1. Attempt database write
    try {
      if (mongoose.connection.readyState !== 1) {
        await connectDB();
      }
      if (mongoose.connection.readyState === 1) {
        savedMessage = await ContactMessage.create({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone ? phone.trim() : "",
          subject: subject.trim(),
          message: message.trim(),
          ip: typeof ip === "string" ? ip.split(",")[0].trim() : "",
          status: "unread",
        });
      }
    } catch (dbErr) {
      console.warn("[Contact Controller]: MongoDB write skipped or failed, fallback active:", dbErr.message);
    }

    // 2. Fallback file store backup (guarantees zero data loss in all local/dev situations)
    const fallbackItem = {
      _id: savedMessage?._id ? savedMessage._id.toString() : `msg_${crypto.randomUUID()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : "",
      subject: subject.trim(),
      message: message.trim(),
      status: "unread",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const currentFallback = readFallbackStore();
    currentFallback.unshift(fallbackItem);
    writeFallbackStore(currentFallback);

    return res.status(201).json({
      success: true,
      message: "Thank you for reaching out! We've received your message and will get back to you shortly.",
      data: savedMessage || fallbackItem,
    });
  } catch (error) {
    console.error("[Contact Controller Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit message. Please try again or reach out directly at support@growvia.in",
      error: error.message,
    });
  }
};

/**
 * @desc    Get all contact messages
 * @route   GET /api/contact
 * @access  Private (Admin only)
 */
export const getContactMessages = async (req, res) => {
  try {
    let messages = [];

    // Attempt DB fetch
    try {
      if (mongoose.connection.readyState !== 1) {
        await connectDB();
      }
      if (mongoose.connection.readyState === 1) {
        messages = await ContactMessage.find().sort({ createdAt: -1 }).lean();
      }
    } catch (dbErr) {
      console.warn("[Contact Controller]: DB fetch warning:", dbErr.message);
    }

    // Merge with fallback file store to ensure all messages are visible
    const fileMessages = readFallbackStore();
    const existingIds = new Set(messages.map((m) => String(m._id)));

    for (const fm of fileMessages) {
      if (!existingIds.has(String(fm._id))) {
        messages.push(fm);
      }
    }

    // Sort descending by date
    messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const total = messages.length;
    const unreadCount = messages.filter((m) => m.status === "unread").length;

    return res.status(200).json({
      success: true,
      total,
      unreadCount,
      messages,
    });
  } catch (error) {
    console.error("[Contact Controller Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve messages",
      error: error.message,
    });
  }
};

/**
 * @desc    Update a message status (e.g. read, unread, replied)
 * @route   PATCH /api/contact/:id/status
 * @access  Private (Admin only)
 */
export const updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["unread", "read", "replied", "archived"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    let updated = null;

    // Update in MongoDB
    try {
      if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
        updated = await ContactMessage.findByIdAndUpdate(
          id,
          { status, updatedAt: new Date() },
          { new: true }
        ).lean();
      }
    } catch (dbErr) {
      console.warn("[Contact Controller]: DB update warning:", dbErr.message);
    }

    // Update in fallback store
    const fileMessages = readFallbackStore();
    const idx = fileMessages.findIndex((m) => String(m._id) === String(id));
    if (idx !== -1) {
      fileMessages[idx].status = status;
      fileMessages[idx].updatedAt = new Date().toISOString();
      writeFallbackStore(fileMessages);
      if (!updated) updated = fileMessages[idx];
    }

    return res.status(200).json({
      success: true,
      message: `Message status updated to ${status}`,
      data: updated,
    });
  } catch (error) {
    console.error("[Contact Controller Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update message status",
      error: error.message,
    });
  }
};

/**
 * @desc    Delete a message
 * @route   DELETE /api/contact/:id
 * @access  Private (Admin only)
 */
export const deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete from MongoDB
    try {
      if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
        await ContactMessage.findByIdAndDelete(id);
      }
    } catch (dbErr) {
      console.warn("[Contact Controller]: DB delete warning:", dbErr.message);
    }

    // Delete from fallback store
    const fileMessages = readFallbackStore();
    const filtered = fileMessages.filter((m) => String(m._id) !== String(id));
    writeFallbackStore(filtered);

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("[Contact Controller Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete message",
      error: error.message,
    });
  }
};
