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
  max: 3000, // generous limit so active student dashboard polling and bookings are never blocked
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests from this IP. Please try again after 15 minutes.",
  },
  skip: (req) =>
    process.env.NODE_ENV === "test" ||
    req.ip === "127.0.0.1" ||
    req.ip === "::1" ||
    req.ip === "::ffff:127.0.0.1" ||
    (req.path && req.path.startsWith("/counseling")) ||
    (req.originalUrl && req.originalUrl.includes("/counseling")),
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

// Rate limiter for Career Quiz v3 submissions and stage queries (about 30 requests/min per IP)
export const quizLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many quiz requests from this IP. Please wait a minute before trying again.",
    code: "RATE_LIMIT_EXCEEDED",
  },
  skip: (req) => process.env.NODE_ENV === "test" && !process.env.TEST_RATE_LIMITER,
});

// Strict rate limiter for password reset endpoints (5 requests per 15 mins per IP)
export const passwordResetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many password reset requests from this IP. Please try again after 15 minutes.",
  },
  skip: (req) => process.env.NODE_ENV === "test" && !process.env.TEST_RATE_LIMITER,
});

export default { authLimiter, apiLimiter, chatLimiter, quizLimiter, passwordResetLimiter };
