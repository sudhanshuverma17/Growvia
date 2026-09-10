import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import helmet from "helmet";
import compression from "compression";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { connectDB, disconnectDB } from "./config/db.js";
import courseRoutes from "./routes/courseRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import { authLimiter, apiLimiter } from "./middleware/rateLimiter.js";
import { Course } from "./models/Course.js";
import User from "./models/User.js";
import Video from "./models/Video.js";
import { seedCareers } from "./data/seedData.js";
import { seedVideos } from "./data/seedVideos.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendPublicPath = path.resolve(__dirname, "../public");
const fallbackDistPath = path.resolve(__dirname, "../../frontend/dist");

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";

// 1. Security Headers (Helmet) with tailored CSP for YouTube embeds & image sources
app.use(
  helmet({
    contentSecurityPolicy: isProduction
      ? {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https:"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
            imgSrc: [
              "'self'",
              "data:",
              "blob:",
              "https://images.unsplash.com",
              "https://img.youtube.com",
              "https://i.ytimg.com",
              "https://*.ytimg.com",
            ],
            frameSrc: [
              "'self'",
              "https://www.youtube.com",
              "https://www.youtube-nocookie.com",
              "https://player.vimeo.com",
            ],
            connectSrc: ["'self'", "*"],
          },
        }
      : false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// 2. Response Compression (Gzip)
app.use(compression());

// 3. Flexible CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5000",
  "http://127.0.0.1:5000",
  ...(process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",").map((s) => s.trim()) : []),
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      if (!isProduction && /^http:\/\/localhost(:\d+)?$/.test(origin)) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// 4. Body Parser & Logging
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(morgan(isProduction ? "combined" : "dev", {
  skip: (req) => req.url === "/api/health", // avoid log spam on health checks
}));

// 5. Rate Limiting (Brute-force & DDoS protection)
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);
app.use("/api", apiLimiter);

// 6. API Health Check Endpoint
app.get("/api/health", (req, res) => {
  const dbState = mongoose.connection.readyState;
  const stateMap = { 0: "disconnected", 1: "connected", 2: "connecting", 3: "disconnecting" };
  res.status(200).json({
    status: "ok",
    environment: process.env.NODE_ENV || "development",
    service: "Growvia API Backend",
    database: stateMap[dbState] || "unknown",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// 7. Mount Core API Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/videos", videoRoutes);

// 8. Unified Serving (Express serves compiled React frontend from backend/public)
const staticServingPath = fs.existsSync(path.join(backendPublicPath, "index.html"))
  ? backendPublicPath
  : fs.existsSync(path.join(fallbackDistPath, "index.html"))
  ? fallbackDistPath
  : null;

if (staticServingPath) {
  console.log(`[Frontend Serving]: Serving static frontend bundle from ${staticServingPath}`);
  app.use(
    express.static(staticServingPath, {
      maxAge: isProduction ? "1d" : 0,
      index: "index.html",
    })
  );

  // Client-side SPA routing fallback (return index.html for page routes)
  app.get("*", (req, res, next) => {
    // Skip API routes so API 404 handler can catch them
    if (req.originalUrl.startsWith("/api")) return next();

    // If requesting a missing asset/file (has an extension like .js, .css, .svg, .png), return 404 instead of index.html
    if (path.extname(req.path)) {
      return res.status(404).json({ error: `Asset not found: ${req.path}` });
    }

    res.sendFile(path.join(staticServingPath, "index.html"));
  });
}

// 9. 404 Handler for undefined API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: `API endpoint not found: ${req.originalUrl}` });
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

// 11. Database Seeder & Server Startup
let server;

const startServer = async () => {
  // Validate critical environment variables
  if (!process.env.JWT_SECRET) {
    console.warn("⚠️ [Security Warning]: JWT_SECRET is not set in environment variables! Using dev fallback.");
    process.env.JWT_SECRET = "growvia_dev_fallback_secret_key_2026";
  }

  await connectDB();

  // Auto-seed courses if database is empty
  try {
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      console.log(`[Auto-Seeder]: Database is empty. Seeding initial ${seedCareers.length} career roadmaps...`);
      await Course.insertMany(seedCareers);
      console.log(`[Auto-Seeder]: Seed complete! ${seedCareers.length} courses created.`);
    } else {
      console.log(`[Database Ready]: ${courseCount} courses available in MongoDB.`);
    }
  } catch (seedErr) {
    console.warn(`[Auto-Seeder Warning]: Could not seed courses: ${seedErr.message}`);
  }

  // Auto-seed default Admin user if none exists
  try {
    const adminEmail = (process.env.ADMIN_EMAIL || "admin@growvia.com").trim().toLowerCase();
    const adminUser = await User.findOne({ email: adminEmail });
    if (!adminUser) {
      console.log(`[Auto-Seeder]: Creating default Admin user for ${adminEmail}...`);
      await User.create({
        name: "Growvia Administrator",
        email: adminEmail,
        password: "Admin@1234",
        role: "admin",
      });
      console.log(`[Auto-Seeder]: Default Admin created: ${adminEmail} / Admin@1234`);
    } else {
      if (adminUser.role !== "admin") {
        adminUser.role = "admin";
        await adminUser.save();
      }
      console.log(`[Admin Ready]: Existing admin user (${adminUser.email}) verified.`);
    }
  } catch (userErr) {
    console.warn(`[Auto-Seeder Warning]: Could not seed admin user: ${userErr.message}`);
  }

  // Auto-seed initial Videos if collection is empty
  try {
    const videoCount = await Video.countDocuments();
    if (videoCount === 0) {
      console.log(`[Auto-Seeder]: Seeding ${seedVideos.length} mentor guidance videos...`);
      await Video.insertMany(seedVideos);
      console.log(`[Auto-Seeder]: Seed complete! ${seedVideos.length} videos created.`);
    } else {
      console.log(`[Database Ready]: ${videoCount} videos available in MongoDB.`);
    }
  } catch (vidErr) {
    console.warn(`[Auto-Seeder Warning]: Could not seed videos: ${vidErr.message}`);
  }

  server = app.listen(PORT, () => {
    console.log(`\n🚀 [Growvia Backend Server] running at http://localhost:${PORT}`);
    console.log(`🛡️ Security: Helmet HTTP headers active`);
    console.log(`⚡ Performance: Gzip compression & Route rate limiting active`);
    console.log(`📡 Auth Endpoints: http://localhost:${PORT}/api/auth`);
    console.log(`📡 Courses Endpoints: http://localhost:${PORT}/api/courses`);
    console.log(`📡 Videos Endpoints: http://localhost:${PORT}/api/videos`);
    console.log(`💚 Health Check: http://localhost:${PORT}/api/health\n`);
  });
};

// Graceful Shutdown Handlers
const gracefulShutdown = async (signal) => {
  console.log(`\n[Server]: Received ${signal}. Shutting down gracefully...`);
  if (server) {
    server.close(() => {
      console.log("[Server]: HTTP server closed.");
    });
  }
  await disconnectDB();
  process.exit(0);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

startServer();
