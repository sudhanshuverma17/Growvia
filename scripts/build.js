import { execSync } from "node:child_process";
import fs from "node:fs";

console.log("🚀 [Growvia Build]: Compiling frontend with Vite into backend/public...");
execSync("npm --prefix frontend run build", { stdio: "inherit" });

if (fs.existsSync("backend/public")) {
  console.log("📁 [Growvia Build]: Syncing compiled assets to public/ and dist/...");
  if (fs.existsSync("public")) fs.rmSync("public", { recursive: true, force: true });
  if (fs.existsSync("dist")) fs.rmSync("dist", { recursive: true, force: true });
  fs.cpSync("backend/public", "public", { recursive: true });
  fs.cpSync("backend/public", "dist", { recursive: true });
  console.log("✅ [Growvia Build]: Assets synced successfully. Ready for unified deployment!");
} else {
  console.error("❌ [Growvia Build Error]: backend/public was not created!");
  process.exit(1);
}
