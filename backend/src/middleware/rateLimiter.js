import rateLimit from "express-rate-limit";

// Strict rate limiter for authentication routes (prevent brute-force password guessing)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 25, // limit each IP to 25 auth requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many authentication requests from this IP. Please try again after 15 minutes.",
  },
  skip: (req) => process.env.NODE_ENV === "test",
});

// General rate limiter for public API endpoints (prevent scraping & DDoS)
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP to 300 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests from this IP. Please try again after 15 minutes.",
  },
  skip: (req) => process.env.NODE_ENV === "test",
});

export default { authLimiter, apiLimiter };
