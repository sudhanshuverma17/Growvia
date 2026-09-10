import mongoose from "mongoose";
import dns from "dns";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });

const uri = process.env.MONGO_URI;

console.log("\n==================================================");
console.log("🔍 Testing MongoDB Connection...");
console.log("==================================================");

if (!uri) {
  console.error("❌ Error: MONGO_URI is not set in backend/.env!");
  process.exit(1);
}

// Mask password in logs
const maskedUri = uri.replace(/(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@.+)/, "$1******$3");
console.log(`Connecting to: ${maskedUri}\n`);

const testConnection = async () => {
  const startTime = Date.now();
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    const latency = Date.now() - startTime;
    console.log(`✅ MongoDB Connection Successful! (${latency}ms)`);
    console.log(`📡 Cluster Host: ${conn.connection.host}`);
    console.log(`📁 Database Name: ${conn.connection.name}`);

    // Ping the admin database
    const pingResult = await conn.connection.db.admin().ping();
    console.log(`⚡ Ping Status:`, pingResult);

    // List collections
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(`📊 Existing Collections (${collections.length}):`, collections.map(c => c.name).join(", ") || "(none yet)");

    console.log("\n🎉 Your MongoDB Atlas database is fully operational and ready for Growvia!\n");
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error(`\n❌ MongoDB Connection Failed! (${Date.now() - startTime}ms)`);
    console.error(`Error Message: ${err.message}\n`);

    console.log("🛠️ Troubleshooting Tips for MongoDB Atlas:");
    if (err.message.includes("bad auth") || err.message.includes("Authentication failed")) {
      console.log("  👉 Authentication Failed: Check your username and password in MONGO_URI.");
      console.log("     Make sure special characters in the password are URL-encoded (e.g., @ becomes %40).");
    } else if (err.message.includes("ETIMEOUT") || err.message.includes("querySrv") || err.message.includes("Server selection timed out")) {
      console.log("  👉 Network / IP Whitelist: Ensure your current IP is added in MongoDB Atlas -> Network Access.");
      console.log("     To allow access from anywhere, add '0.0.0.0/0'.");
    } else if (err.message.includes("ENOTFOUND")) {
      console.log("  👉 Cluster Not Found: Double check the cluster hostname in your connection string.");
    } else {
      console.log("  👉 General Tip: Verify your connection string in backend/.env matches the format:");
      console.log("     mongodb+srv://<username>:<password>@<cluster>.mongodb.net/growvia?retryWrites=true&w=majority");
    }
    console.log("");
    process.exit(1);
  }
};

testConnection();
