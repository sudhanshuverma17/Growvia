import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import compression from "compression";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { fileURLToPath } from "url";

import { connectDB, disconnectDB, getLastConnectionError } from "./config/db.js";
import courseRoutes from "./routes/courseRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import counselingRoutes from "./routes/counselingRoutes.js";
import { authLimiter, apiLimiter } from "./middleware/rateLimiter.js";
import { Course } from "./models/Course.js";
import User from "./models/User.js";
import Video from "./models/Video.js";
import { seedCareers } from "./data/seedData.js";

dotenv.config({ path: process.env.DOTENV_CONFIG_PATH || undefined });

const isProduction = process.env.NODE_ENV === "production";

// 1. JWT_SECRET Validation
if (!process.env.JWT_SECRET) {
  if (isProduction) {
    console.error("FATAL: JWT_SECRET environment variable is not set. Refusing to start in production without it.");
    process.exit(1);
  } else {
    // In development only: generate a cryptographically random secret at runtime if .env is missing
    process.env.JWT_SECRET = crypto.randomBytes(32).toString("hex");
    console.warn("⚠️ [Dev Warning]: JWT_SECRET is not set in environment variables! Generated temporary runtime secret for development.");
  }
}

// 2. FRONTEND_URL Validation (Required for dynamic Cashfree return_url & CORS)
const frontendUrl = (process.env.FRONTEND_URL || process.env.CLIENT_URL)?.trim();
if (!frontendUrl) {
  console.error(
    "\n❌ [FATAL CONFIG ERROR]: FRONTEND_URL environment variable is not defined!\n" +
    "   Cashfree payment gateway return_url and CORS security require an explicit frontend URL.\n" +
    "   Please add FRONTEND_URL to your backend/.env file:\n" +
    "     - Local Development (Unified Server): FRONTEND_URL=http://localhost:5000\n" +
    "     - Local Development (Vite Dev):       FRONTEND_URL=http://localhost:3000\n" +
    "     - Production Domain:                  FRONTEND_URL=https://your-domain.com\n"
  );
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendPublicPath = path.resolve(__dirname, "../public");
const fallbackDistPath = path.resolve(__dirname, "../../frontend/dist");

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Security Headers (Helmet) configured for JSON API
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// 2. Response Compression (Gzip)
app.use(compression());

// 3. Flexible CORS supporting separate frontend deployment
const allowedOrigins = [
  "http://localhost:5000",
  "http://127.0.0.1:5000",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(",").map((s) => s.trim()) : []),
  ...(process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",").map((s) => s.trim()) : []),
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        return callback(null, origin);
      }
      return callback(null, origin);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  })
);

// Trust first proxy (essential for reverse proxies like Render, Vercel, Nginx, Cloudflare to preserve HTTPS headers)
app.set("trust proxy", 1);

// 4. Body Parser (with rawBody retention for cryptographically verifying Cashfree Webhooks)
app.use(
  express.json({
    limit: "2mb",
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

// 5. Rate Limiting (Brute-force & DDoS protection)
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);
app.use("/api", apiLimiter);

// 6. API Health Check Endpoint (supports both /api/health and /health)
app.get(["/api/health", "/health"], async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    try {
      await connectDB();
    } catch {}
  }
  const dbState = mongoose.connection.readyState;
  const stateMap = { 0: "disconnected", 1: "connected", 2: "connecting", 3: "disconnecting" };
  res.status(200).json({
    status: "ok",
    environment: process.env.NODE_ENV || "development",
    service: "Growvia API Backend",
    database: stateMap[dbState] || "unknown",
    hasMongoUri: Boolean(process.env.MONGO_URI),
    lastDbError: getLastConnectionError(),
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// 7. Database auto-seed helper & serverless connection middleware
let isSeeded = false;
export const seedInitialData = async () => {
  if (isSeeded) return;
  isSeeded = true;

  try {
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      console.log(`[Auto-Seeder]: Database is empty. Seeding initial ${seedCareers.length} career roadmaps...`);
      await Course.insertMany(seedCareers);
      console.log(`[Auto-Seeder]: Seed complete! ${seedCareers.length} courses created.`);
    }
  } catch (seedErr) {
    console.warn(`[Auto-Seeder Warning]: Could not seed courses: ${seedErr.message}`);
  }
};

// Ensure database connection for serverless invocations (e.g. on Vercel)
app.use(async (req, res, next) => {
  if (req.path.startsWith("/api") && mongoose.connection.readyState !== 1) {
    try {
      const conn = await connectDB();
      if (conn && mongoose.connection.readyState === 1) {
        await seedInitialData();
      }
    } catch (err) {
      console.warn("[Serverless DB Warning]:", err.message);
    }
  }
  next();
});

// 8. Mount Core API Routes under /api prefix
const mountCoreRoutes = (prefix = "/api") => {
  app.use(`${prefix}/auth`, authRoutes);
  app.use(`${prefix}/courses`, courseRoutes);
  app.use(`${prefix}/videos`, videoRoutes);
  app.use(`${prefix}/career-quiz`, quizRoutes);
  app.use(`${prefix}/payment`, paymentRoutes);
  app.use(`${prefix}/chat`, chatRoutes);
  app.use(`${prefix}/contact`, contactRoutes);
  app.use(`${prefix}/counseling`, counselingRoutes);
};

mountCoreRoutes("/api");

// 8. Static Frontend Serving from public folder
const candidatePublicPaths = [
  path.resolve(__dirname, "../public"),
  path.resolve(process.cwd(), "backend/public"),
  path.resolve(process.cwd(), "public"),
  path.resolve(__dirname, "../../frontend/dist"),
  path.resolve(process.cwd(), "dist"),
];

const staticServingPath = candidatePublicPaths.find((p) =>
  fs.existsSync(path.join(p, "index.html"))
);

if (staticServingPath) {
  // Serve static assets (JS, CSS, images) from the public folder
  app.use(
    express.static(staticServingPath, {
      maxAge: isProduction ? "1d" : 0,
      index: "index.html",
    })
  );

  // Client-side SPA routing fallback: serve index.html for page navigation
  app.get("*", (req, res, next) => {
    // Skip API routes and health endpoint so API handlers and 404 can catch them
    if (req.originalUrl.startsWith("/api") || req.originalUrl.startsWith("/health")) {
      return next();
    }

    // If requesting a missing asset/file (has an extension like .js, .css, .svg, .png), return 404
    // Allow /index.html to be served rather than being blocked as a missing asset
    if (path.extname(req.path) && req.path !== "/index.html") {
      return res.status(404).json({ error: `Asset not found: ${req.path}` });
    }

    // Otherwise serve index.html for SPA routes (e.g. /, /roadmaps, /dashboard, /pricing, /quiz)
    res.sendFile(path.join(staticServingPath, "index.html"), (err) => {
      if (err && !res.headersSent) {
        res.status(500).json({ error: "Failed to render application page", message: err.message });
      }
    });
  });
} else {
  // Fallback root endpoint if public frontend bundle is not found
  app.get("/", (req, res) => {
    res.status(200).json({
      status: "ok",
      service: "Growvia API Backend",
      message: "Growvia Backend API is online. Frontend static files were not located.",
      database: mongoose.connection.readyState === 1 ? "connected" : "connecting",
      timestamp: new Date().toISOString(),
    });
  });
}

// 9. 404 Handler for undefined API routes
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: `API route not found: ${req.method} ${req.originalUrl}`,
  });
});

// 10. Global Error Handler (Sanitized for production)
app.use((err, req, res, next) => {
  console.error("[Server Error]:", err.stack || err);
  const status = err.status || 500;
  const errorResponse = {
    error: err.message || "Internal Server Error",
  };
  if (!isProduction) {
    errorResponse.stack = err.stack;
  }
  res.status(status).json(errorResponse);
});

// 12. Server Startup & Export
let server;

const closeServer = () => {
  return new Promise((resolve) => {
    if (!server) return resolve();
    server.close((err) => {
      if (err) console.error("[Server]: Error closing HTTP server:", err.message);
      else console.log("[Server]: HTTP server closed & port released.");
      resolve();
    });
  });
};

const startServer = async () => {
  try {
    await connectDB();
    await seedInitialData();

    server = app.listen(PORT, () => {
      console.log(`🚀 [Growvia Backend Server] running at http://localhost:${PORT}`);
    });

    server.on("error", async (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(
          `\n⚠️ [Server Port Conflict]: Port ${PORT} is currently in use by another process.\n` +
          `   Another terminal or background node instance is holding port ${PORT}.\n`
        );
        process.exit(1);
      } else {
        console.error("[Server Listen Error]:", err);
        process.exit(1);
      }
    });
  } catch (err) {
    console.error("[Server Startup Error]:", err);
    process.exit(1);
  }
};

// Graceful Shutdown Handlers
const gracefulShutdown = async (signal) => {
  console.log(`\n[Server]: Received ${signal}. Shutting down gracefully...`);
  await closeServer();
  await disconnectDB();
  process.exit(0);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.once("SIGUSR2", async () => {
  console.log("\n[Server]: Nodemon restart (SIGUSR2). Releasing port...");
  await closeServer();
  await disconnectDB();
  process.kill(process.pid, "SIGUSR2");
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("[Server Unhandled Rejection]:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("[Server Uncaught Exception]:", err);
});

// Only run standalone HTTP listener if not running in a serverless environment (like Vercel)
const isServerless = Boolean(
  process.env.VERCEL ||
  process.env.VERCEL_ENV ||
  process.env.NOW_REGION ||
  process.env.AWS_LAMBDA_FUNCTION_NAME
);

if (!isServerless) {
  startServer();
}

export default app;
