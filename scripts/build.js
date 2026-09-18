import { execSync } from "node:child_process";
import fs from "node:fs";

console.log("🚀 [Growvia Build]: Compiling frontend with Vite...");
execSync("npm --prefix frontend run build", { stdio: "inherit" });

console.log("📁 [Growvia Build]: Syncing compiled assets to dist/ for Vercel CDN...");
if (fs.existsSync("backend/public")) {
  fs.cpSync("backend/public", "dist", { recursive: true });
  console.log("✅ [Growvia Build]: Successfully created dist/ with", fs.readdirSync("dist").length, "items.");
} else {
  console.error("❌ [Growvia Build Error]: backend/public does not exist!");
  process.exit(1);
}
