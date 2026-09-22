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

// Per-user rate limiter for Vio AI chatbot interactions (prevent abuse & manage LLM costs)
export const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: parseInt(process.env.CHAT_RATE_LIMIT || "20", 10), // Default: 20 messages per minute per user
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Rate limit specifically per authenticated user ID; fallback to client IP
    return req.user?._id ? `user_${req.user._id.toString()}` : `ip_${req.ip}`;
  },
  validate: {
    keyGeneratorIpFallback: false,
  },
  message: {
    error: "You have sent too many messages in a short time. Please wait a moment before sending another message.",
  },
  skip: (req) => process.env.NODE_ENV === "test",
});

export default { authLimiter, apiLimiter, chatLimiter };
