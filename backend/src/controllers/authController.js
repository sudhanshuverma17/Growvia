import mongoose from "mongoose";
import User from "../models/User.js";
import { connectDB } from "../config/db.js";
import { generateToken } from "../middleware/authMiddleware.js";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: name, email, and password",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Database connection temporarily unavailable. Please try again in a few moments.",
      });
    }

    const emailLower = email.toLowerCase().trim();
    const userExists = await User.findOne({ email: emailLower });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "An account with this email address already exists",
      });
    }

    // Admin verification: only the email configured in ADMIN_EMAIL is granted admin privileges
    const configuredAdminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    const isConfiguredAdmin = Boolean(configuredAdminEmail && emailLower === configuredAdminEmail);
    const userRole = isConfiguredAdmin ? "admin" : "user";

    const user = await User.create({
      name: name.trim(),
      email: emailLower,
      password,
      role: userRole,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        savedRoadmaps: user.savedRoadmaps,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("[Register Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message,
    });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const emailLower = email.toLowerCase().trim();

    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Database connection temporarily unavailable. Please try again in a few moments.",
      });
    }

    const user = await User.findOne({ email: emailLower }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Enforce & synchronize role with ADMIN_EMAIL in .env
    const configuredAdminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    if (configuredAdminEmail) {
      const shouldBeAdmin = user.email.toLowerCase() === configuredAdminEmail;
      const expectedRole = shouldBeAdmin ? "admin" : "user";
      if (user.role !== expectedRole) {
        user.role = expectedRole;
        await user.save();
      }
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        savedRoadmaps: user.savedRoadmaps,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("[Login Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private (Requires token)
export const getMe = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify role matches configured ADMIN_EMAIL
    const configuredAdminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    if (configuredAdminEmail) {
      const shouldBeAdmin = user.email.toLowerCase() === configuredAdminEmail;
      const expectedRole = shouldBeAdmin ? "admin" : "user";
      if (user.role !== expectedRole) {
        user.role = expectedRole;
        await user.save();
      }
    }

    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        savedRoadmaps: user.savedRoadmaps,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("[GetMe Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Server error retrieving user profile",
      error: error.message,
    });
  }
};

// @desc    Toggle save/bookmark roadmap for user
// @route   POST /api/auth/save-roadmap
// @access  Private (Requires token)
export const toggleSaveRoadmap = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "courseId is required",
      });
    }

    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const existsIndex = user.savedRoadmaps.indexOf(courseId);
    let isSaved = false;

    if (existsIndex > -1) {
      user.savedRoadmaps.splice(existsIndex, 1);
      isSaved = false;
    } else {
      user.savedRoadmaps.push(courseId);
      isSaved = true;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      isSaved,
      savedRoadmaps: user.savedRoadmaps,
      message: isSaved ? "Roadmap saved to profile" : "Roadmap removed from saved list",
    });
  } catch (error) {
    console.error("[Toggle Save Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Server error updating saved roadmaps",
      error: error.message,
    });
  }
};
