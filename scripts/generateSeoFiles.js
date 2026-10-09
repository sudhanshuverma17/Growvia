import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { seedCareers } from "../backend/src/data/seedData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const today = new Date().toISOString().split("T")[0];

const staticPages = [
  { path: "", changefreq: "daily", priority: "1.0" },
  { path: "roadmaps", changefreq: "weekly", priority: "0.9" },
  { path: "career-quiz", changefreq: "monthly", priority: "0.9" },
  { path: "videos", changefreq: "weekly", priority: "0.8" },
  { path: "about", changefreq: "monthly", priority: "0.7" },
  { path: "contact", changefreq: "monthly", priority: "0.7" },
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

for (const p of staticPages) {
  const url = p.path ? `https://honesvia.com/${p.path}` : "https://honesvia.com/";
  xml += `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>
`;
}

for (const career of seedCareers) {
  xml += `  <url>
    <loc>https://honesvia.com/roadmaps/${career.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
}

xml += `</urlset>
`;

const robotsTxt = `# ==============================================================================
# Honesvia Robots.txt — Production Search Engine Directives
# Website: https://honesvia.com
# ==============================================================================

User-agent: *
Allow: /
Allow: /roadmaps
Allow: /roadmaps/*
Allow: /career-quiz
Allow: /videos
Allow: /about
Allow: /contact
Allow: /images/
Allow: /assets/
Allow: /favicon*
Allow: /robots.txt
Allow: /sitemap.xml

# Protected student areas, personalized dashboards & internal APIs
Disallow: /api/
Disallow: /dashboard
Disallow: /dashboard/
Disallow: /admin
Disallow: /admin/
Disallow: /get-counseling
Disallow: /pricing
Disallow: /login
Disallow: /forgot-password
Disallow: /reset-password

# Sitemap Index
Sitemap: https://honesvia.com/sitemap.xml
Host: https://honesvia.com
`;

const targets = [
  path.join(rootDir, "frontend/public"),
  path.join(rootDir, "backend/public"),
  path.join(rootDir, "public"),
];

for (const dir of targets) {
  if (fs.existsSync(dir)) {
    fs.writeFileSync(path.join(dir, "sitemap.xml"), xml, "utf8");
    fs.writeFileSync(path.join(dir, "robots.txt"), robotsTxt, "utf8");
    console.log(`✅ [SEO Generator]: Updated sitemap.xml & robots.txt in ${path.relative(rootDir, dir)}`);
  }
}

export { xml as sitemapXml, robotsTxt };
