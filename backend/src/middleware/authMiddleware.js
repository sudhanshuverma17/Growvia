import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Generate JWT Token
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// Protect routes - verify JWT token
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "User associated with this token no longer exists",
        });
      }

      // Synchronize role dynamically with ADMIN_EMAIL in .env
      const configuredAdminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
      if (configuredAdminEmail) {
        req.user.role = req.user.email.toLowerCase() === configuredAdminEmail ? "admin" : "user";
      }

      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Token is invalid or has expired",
        error: error.message,
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. No authentication token provided",
    });
  }
};

// Role-based authorization guard
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: User role '${req.user?.role || "guest"}' is not authorized to perform this action`,
      });
    }
    next();
  };
};

// Optional protect - attaches req.user if valid token provided, but does not block guests
export const optionalProtect = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      const configuredAdminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
      if (req.user && configuredAdminEmail) {
        req.user.role = req.user.email.toLowerCase() === configuredAdminEmail ? "admin" : "user";
      }
    } catch (err) {
      req.user = null;
    }
  }
  next();
};

// Verify user has purchased at least one roadmap (or is admin)
export const requirePurchasedRoadmap = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required to access counseling services",
    });
  }

  const isAdmin = req.user.role === "admin";
  const purchasedRoadmaps = Array.isArray(req.user.purchasedRoadmaps)
    ? req.user.purchasedRoadmaps
    : [];

  if (!isAdmin && purchasedRoadmaps.length === 0) {
    return res.status(403).json({
      success: false,
      message: "Forbidden: 1:1 Counseling is an exclusive premium feature reserved for students who have purchased a roadmap.",
      code: "ROADMAP_PURCHASE_REQUIRED",
    });
  }

  next();
};


