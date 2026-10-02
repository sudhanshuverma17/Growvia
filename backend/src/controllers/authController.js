import mongoose from "mongoose";
import crypto from "crypto";
import User from "../models/User.js";
import PasswordResetToken from "../models/PasswordResetToken.js";
import { connectDB, getLastConnectionError } from "../config/db.js";
import { generateToken } from "../middleware/authMiddleware.js";
import { sendPasswordResetEmail } from "../services/emailService.js";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    // Ignore any role provided in request body; users always register as "user"
    const { name, email, password } = req.body;

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
        details: getLastConnectionError() || "Database is offline or unreachable",
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

    // Users always register with role "user"; admin accounts cannot be created via registration
    const user = await User.create({
      name: name.trim(),
      email: emailLower,
      password,
      role: "user",
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
        purchasedRoadmaps: user.purchasedRoadmaps || [],
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
        details: getLastConnectionError() || "Database is offline or unreachable",
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
        purchasedRoadmaps: user.purchasedRoadmaps || [],
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



    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        savedRoadmaps: user.savedRoadmaps,
        purchasedRoadmaps: user.purchasedRoadmaps || [],
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

// @desc    Initiate password reset (Generate single-use token, store hash, send Resend email)
// @route   POST /api/forgot-password or POST /api/auth/forgot-password
// @access  Public (Rate-limited to 5 requests / 15 mins per IP)
export const forgotPassword = async (req, res) => {
  const genericResponse = {
    success: true,
    message:
      "If an account with that email address exists, password reset instructions have been sent.",
  };

  try {
    const { email } = req.body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    const emailLower = email.toLowerCase().trim();
    const user = await User.findOne({ email: emailLower });

    if (!user) {
      // Prevent user enumeration: always return the generic success response
      return res.status(200).json(genericResponse);
    }

    // 1. Invalidate any existing password reset tokens for this user
    await PasswordResetToken.deleteMany({ userId: user._id });

    // 2. Generate cryptographically secure random token (32 bytes = 64 hex characters)
    const rawToken = crypto.randomBytes(32).toString("hex");

    // 3. Store ONLY its SHA-256 hash in the database with 1-hour expiry
    const tokenHash = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await PasswordResetToken.create({
      userId: user._id,
      tokenHash,
      expiresAt,
    });

    // 4. Resolve base app URL for the password reset link
    let refererOrigin = "";
    try {
      if (req.headers.referer) {
        refererOrigin = new URL(req.headers.referer).origin;
      }
    } catch {}

    const clientOrigin = (
      req.body?.frontendOrigin ||
      req.headers.origin ||
      refererOrigin ||
      ""
    )
      .trim()
      .replace(/\/+$/, "");

    const isLocal = (url) =>
      !url || url.includes("localhost") || url.includes("127.0.0.1");

    let appUrl = "";
    if (clientOrigin && isLocal(clientOrigin)) {
      // Prioritize localhost during local dev so email links open locally
      appUrl = clientOrigin;
    } else if (process.env.APP_URL) {
      appUrl = process.env.APP_URL.trim()
        .split(",")[0]
        .trim()
        .replace(/\/+$/, "");
    } else if (clientOrigin) {
      appUrl = clientOrigin;
    } else {
      appUrl = "https://honesvia.com";
    }

    const resetUrl = `${appUrl}/reset-password?token=${rawToken}`;

    // 5. Send email via Resend in try/catch (never leak errors to client)
    try {
      await sendPasswordResetEmail({
        to: user.email,
        resetUrl,
        userName: user.name || "Student",
      });
    } catch (emailErr) {
      console.error(
        "[ForgotPassword Email Dispatch Error]:",
        emailErr.message || emailErr
      );
    }

    return res.status(200).json(genericResponse);
  } catch (error) {
    console.error("[ForgotPassword Error]:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

// @desc    Complete password reset (Verify token hash, validate password, update hash)
// @route   POST /api/reset-password or POST /api/auth/reset-password
// @access  Public (Rate-limited to 5 requests / 15 mins per IP)
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || typeof token !== "string" || !token.trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing password reset token.",
      });
    }

    if (
      !newPassword ||
      typeof newPassword !== "string" ||
      newPassword.length < 8
    ) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    // 1. Hash incoming token with SHA-256 to compare with stored hash
    const tokenHash = crypto
      .createHash("sha256")
      .update(token.trim())
      .digest("hex");

    // 2. Query PasswordResetToken record that has not expired
    const resetRecord = await PasswordResetToken.findOne({
      tokenHash,
      expiresAt: { $gt: new Date() },
    });

    if (!resetRecord) {
      return res.status(400).json({
        success: false,
        message:
          "This password reset link is invalid or has expired. Please request a new one.",
      });
    }

    // 3. Find the associated user
    const user = await User.findById(resetRecord.userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "The account associated with this reset link could not be found.",
      });
    }

    // 4. Update the user password (triggers existing bcryptjs pre-save hook on User model)
    user.password = newPassword;
    await user.save();

    // 5. Delete all reset tokens for this user (single-use enforcement)
    await PasswordResetToken.deleteMany({ userId: user._id });

    console.log(
      `🔑 [Password Reset]: Password reset completed for user: ${user.email}`
    );

    return res.status(200).json({
      success: true,
      message:
        "Your password has been reset successfully. You can now log in with your new password.",
    });
  } catch (error) {
    console.error("[ResetPassword Error]:", error);
    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while resetting your password. Please try again.",
    });
  }
};

