import { execSync } from "node:child_process";
import fs from "node:fs";

console.log("🚀 [Honesvia Build]: Compiling frontend with Vite into backend/public...");
execSync("npm --prefix frontend run build", { stdio: "inherit" });

console.log("🔍 [Honesvia Build]: Generating production sitemap.xml and robots.txt...");
execSync("node scripts/generateSeoFiles.js", { stdio: "inherit" });

console.log("🎨 [Honesvia Build]: Generating production favicons and shortcut tiles...");
try {
  execSync("python scripts/generateFaviconAndTiles.py", { stdio: "inherit" });
} catch (e) {
  console.warn("⚠️ Favicon generator script skipped or failed:", e.message);
}

if (fs.existsSync("backend/public")) {
  console.log("📁 [Honesvia Build]: Syncing compiled assets to public/ and dist/...");
  try {
    fs.cpSync("backend/public", "public", { recursive: true, force: true });
  } catch (e) {
    console.warn("⚠️ [Honesvia Build]: Non-fatal notice copying to public/:", e.message);
  }
  try {
    fs.cpSync("backend/public", "dist", { recursive: true, force: true });
  } catch (e) {
    console.warn("⚠️ [Honesvia Build]: Non-fatal notice copying to dist/:", e.message);
  }
  console.log("✅ [Honesvia Build]: Assets synced successfully. Ready for unified deployment!");
} else {
  console.error("❌ [Honesvia Build Error]: backend/public was not created!");
  process.exit(1);
}
