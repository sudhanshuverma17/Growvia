import mongoose from "mongoose";
import dns from "dns";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config();

// Ensure Node.js resolves MongoDB Atlas SRV records reliably across all network environments
if (!process.env.VERCEL) {
  try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  } catch (dnsErr) {
    // Ignore if running in an environment where setServers is restricted
  }
}

// Disable Mongoose query buffering so operations fail fast if disconnected instead of hanging serverless functions
mongoose.set("bufferCommands", false);

let cachedPromise = null;

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (cachedPromise) {
    try {
      return await cachedPromise;
    } catch {
      cachedPromise = null;
    }
  }

  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("\n❌ [MongoDB Error]: MONGO_URI is not set in environment variables!");
    return null;
  }

  try {
    const connectOptions = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000,
      maxPoolSize: 10,
    };

    // Only force IPv4 on local Windows dev without SRV
    if (process.platform === "win32" && !process.env.VERCEL) {
      connectOptions.family = 4;
    }

    cachedPromise = mongoose.connect(uri, connectOptions);

    const conn = await cachedPromise;

    console.log("[MongoDB]: Connected successfully.");

    mongoose.connection.on("error", (err) => {
      console.error(`[MongoDB Runtime Error]: ${err.message}`);
    });

    mongoose.connection.on("disconnected", () => {
      cachedPromise = null;
    });

    return conn;
  } catch (error) {
    cachedPromise = null;
    console.error(`\n❌ [MongoDB Connection Error]: ${error.message}`);
    return null;
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
  } catch (err) {
    console.error("[MongoDB]: Error during disconnect:", err);
  }
};

export default connectDB;
