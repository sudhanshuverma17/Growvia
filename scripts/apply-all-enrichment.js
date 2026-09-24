import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { enrichCareer } from "./enrich-all-roadmaps.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

async function run() {
  console.log("Loading careers from frontend/src/lib/mock-data.js...");
  const mockDataModule = await import("../frontend/src/lib/mock-data.js");
  const origCareers = mockDataModule.careers;
  console.log(`Found ${origCareers.length} careers in mock-data.js.`);

  // Read the original mock-data.js text to preserve the header import and everything after careers array
  const mockDataPath = path.join(rootDir, "frontend", "src", "lib", "mock-data.js");
  const mockDataContent = fs.readFileSync(mockDataPath, "utf-8");

  const headerLineMatch = mockDataContent.match(/^(import\s*\{[^}]+\}\s*from\s*"lucide-react";)/m);
  const headerLine = headerLineMatch
    ? headerLineMatch[1]
    : `import { HeartPulse, Code, Scale, Lightbulb, ChartLine, Compass, Video, Briefcase, TrendingUp, Calculator, Building2, Brain, Cpu, Shield, Cloud, Palette, Film, Smile, Activity, DollarSign, ChartNoAxesColumn, Landmark, Star, HardHat, Settings, UsersRound, Megaphone, UserCheck, Plane, Scissors, Camera, CalendarDays, Hotel, Heart, BookOpen, Monitor, Newspaper, MessageSquare, Apple, Dumbbell, Gamepad2, Link2, Leaf, FlaskConical, Truck, Layers, ChartPie, Pill } from "lucide-react";`;

  // Find where export const quizQuestions begins
  const quizIndex = mockDataContent.indexOf("export const quizQuestions = [");
  if (quizIndex === -1) {
    throw new Error("Could not locate quizQuestions export in mock-data.js");
  }
  const trailingContent = mockDataContent.substring(quizIndex);

  // Enrich each career
  const enrichedCareersForMockData = origCareers.map((c) => {
    const iconName = c.icon?.displayName || c.icon?.name || (typeof c.icon === "string" ? c.icon : "Briefcase");
    const enriched = enrichCareer(c);
    return {
      ...enriched,
      icon: `__ICON_REF__${iconName}__`,
    };
  });

  // Stringify careers
  let serializedMockCareers = JSON.stringify(enrichedCareersForMockData, null, 2);
  // Replace "__ICON_REF__Name__" with Name (unquoted)
  serializedMockCareers = serializedMockCareers.replace(/"icon":\s*"__ICON_REF__([A-Za-z0-9_]+)__"/g, "icon: $1");

  const newMockDataContent = `${headerLine}\nexport const careers = ${serializedMockCareers};\n\n${trailingContent}`;

  fs.writeFileSync(mockDataPath, newMockDataContent, "utf-8");
  console.log(`✅ Successfully updated ${mockDataPath}`);

  // Now update backend/src/data/seedData.js
  const seedDataPath = path.join(rootDir, "backend", "src", "data", "seedData.js");
  const enrichedCareersForSeedData = origCareers.map((c) => {
    const iconName = c.icon?.displayName || c.icon?.name || (typeof c.icon === "string" ? c.icon : "Briefcase");
    const enriched = enrichCareer(c);
    return {
      ...enriched,
      icon: iconName,
    };
  });

  const serializedSeedCareers = JSON.stringify(enrichedCareersForSeedData, null, 2);
  const newSeedDataContent = `export const seedCareers = ${serializedSeedCareers};\n`;
  fs.writeFileSync(seedDataPath, newSeedDataContent, "utf-8");
  console.log(`✅ Successfully updated ${seedDataPath}`);
}

run().catch((err) => {
  console.error("Error applying enrichment:", err);
  process.exit(1);
});
