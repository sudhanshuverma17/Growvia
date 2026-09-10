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
