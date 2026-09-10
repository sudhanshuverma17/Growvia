import mongoose from "mongoose";
import dns from "dns";

// Ensure Node.js resolves MongoDB Atlas SRV records reliably across all network environments
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (dnsErr) {
  // Ignore if running in an environment where setServers is restricted
}

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/growvia";

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      family: 4, // Force IPv4 for faster, reliable connection on Windows
    });

    console.log(`[MongoDB Connected]: ${conn.connection.host} (${conn.connection.name})`);

    mongoose.connection.on("error", (err) => {
      console.error(`[MongoDB Runtime Error]: ${err.message}`);
    });

    mongoose.connection.on("disconnected", () => {
      // Only warn if the entire connection pool is disconnected
      if (mongoose.connection.readyState === 0) {
        console.warn("[MongoDB]: Connection disconnected. Attempting reconnect...");
      }
    });

    mongoose.connection.on("reconnected", () => {
      console.log("[MongoDB]: Connection re-established.");
    });

    return conn;
  } catch (error) {
    console.error(`\n❌ [MongoDB Connection Error]: ${error.message}`);
    if (uri.includes(".mongodb.net")) {
      console.error(`💡 [MongoDB Atlas Tip]:`);
      console.error(`   1. Verify your username and password in MONGO_URI.`);
      console.error(`   2. In MongoDB Atlas -> Network Access, ensure IP '0.0.0.0/0' is allowed.`);
      console.error(`   3. If your password has special characters, ensure they are URL-encoded.\n`);
    } else {
      console.error(`   Ensure local MongoDB service is running or check your MONGO_URI in backend/.env\n`);
    }
    return null;
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("[MongoDB]: Disconnected cleanly for graceful shutdown.");
  } catch (err) {
    console.error("[MongoDB]: Error during disconnect:", err);
  }
};

export default connectDB;
