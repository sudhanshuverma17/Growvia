import mongoose from "mongoose";
import dns from "dns";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config();

 

// Disable Mongoose query buffering so operations fail fast if disconnected instead of hanging serverless functions
mongoose.set("bufferCommands", false);

let cachedPromise = null;
let lastConnectionError = null;

export const getLastConnectionError = () => lastConnectionError;

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    lastConnectionError = null;
    return mongoose.connection;
  }

  if (cachedPromise) {
    try {
      const conn = await cachedPromise;
      lastConnectionError = null;
      return conn;
    } catch {
      cachedPromise = null;
    }
  }

  let uri = process.env.MONGO_URI ? process.env.MONGO_URI.trim() : "";
  if ((uri.startsWith('"') && uri.endsWith('"')) || (uri.startsWith("'") && uri.endsWith("'"))) {
    uri = uri.slice(1, -1).trim();
  }

  if (!uri) {
    lastConnectionError = "MONGO_URI is not set in environment variables. Please configure MONGO_URI in Vercel Project Settings.";
    console.error("\n❌ [MongoDB Error]: MONGO_URI is not set in environment variables!");
    return null;
  }

  try {
    const connectOptions = {
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    };

    // Only force IPv4 on local Windows dev without SRV
    if (process.platform === "win32" && !process.env.VERCEL) {
      connectOptions.family = 4;
    }

    cachedPromise = mongoose.connect(uri, connectOptions);

    const conn = await cachedPromise;
    lastConnectionError = null;

    console.log("[MongoDB]: Connected successfully.");

    mongoose.connection.on("error", (err) => {
      lastConnectionError = err.message;
      console.error(`[MongoDB Runtime Error]: ${err.message}`);
    });

    mongoose.connection.on("disconnected", () => {
      cachedPromise = null;
    });

    return conn;
  } catch (error) {
    cachedPromise = null;
    lastConnectionError = error.message;
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
