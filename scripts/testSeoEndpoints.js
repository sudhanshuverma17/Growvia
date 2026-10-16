import http from "http";
import app from "../backend/src/server.js";

let server;
let port;

function fetchUrl(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}${path}`, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    }).on("error", reject);
  });
}

async function runTests() {
  console.log("=================================================");
  console.log("🧪 RUNNING HONESVIA PRODUCTION SEO VERIFICATION");
  console.log("=================================================\n");

  server = await new Promise((resolve) => {
    const s = app.listen(0, "127.0.0.1", () => {
      port = s.address().port;
      console.log(`🌐 Test server listening on http://127.0.0.1:${port}\n`);
      resolve(s);
    });
  });

  let passed = 0;
  let failed = 0;

  const test = (name, condition, details = "") => {
    if (condition) {
      console.log(`✅ [PASS]: ${name}`);
      passed++;
    } else {
      console.error(`❌ [FAIL]: ${name} ${details ? `(${details})` : ""}`);
      failed++;
    }
  };

  try {
    // 1. Robots.txt
    const robots = await fetchUrl("/robots.txt");
    test("GET /robots.txt returns 200", robots.statusCode === 200);
    test("GET /robots.txt content-type is text/plain", (robots.headers["content-type"] || "").includes("text/plain"));
    test("GET /robots.txt contains Sitemap: https://honesvia.com/sitemap.xml", robots.body.includes("Sitemap: https://honesvia.com/sitemap.xml"));
    test("GET /robots.txt contains Disallow: /api/", robots.body.includes("Disallow: /api/"));
    test("GET /robots.txt contains Disallow: /dashboard", robots.body.includes("Disallow: /dashboard"));

    // 3. Sitemap.xml
    const sitemap = await fetchUrl("/sitemap.xml");
    test("GET /sitemap.xml returns 200", sitemap.statusCode === 200);
    test("GET /sitemap.xml content-type is xml", (sitemap.headers["content-type"] || "").includes("xml"));
    test("GET /sitemap.xml has valid <urlset> root tag", sitemap.body.includes("<urlset") && sitemap.body.includes("</urlset>"));
    test("GET /sitemap.xml includes homepage", sitemap.body.includes("<loc>https://honesvia.com/</loc>"));
    test("GET /sitemap.xml includes /roadmaps", sitemap.body.includes("<loc>https://honesvia.com/roadmaps</loc>"));
    test("GET /sitemap.xml includes /roadmaps/doctor", sitemap.body.includes("<loc>https://honesvia.com/roadmaps/doctor</loc>"));
    test("GET /sitemap.xml excludes /login", !sitemap.body.includes("<loc>https://honesvia.com/login</loc>"));
    test("GET /sitemap.xml excludes /dashboard", !sitemap.body.includes("<loc>https://honesvia.com/dashboard</loc>"));
    test("GET /sitemap.xml excludes /admin", !sitemap.body.includes("<loc>https://honesvia.com/admin</loc>"));

    // Count URLs in sitemap
    const urlMatches = sitemap.body.match(/<loc>/g) || [];
    console.log(`ℹ️ [Sitemap Stats]: Found ${urlMatches.length} indexable public URLs in sitemap.xml`);

    // 4. API 404 Guard
    const api404 = await fetchUrl("/api/nonexistent-route-xyz");
    test("GET /api/nonexistent returns HTTP 404 JSON (NOT HTML)", api404.statusCode === 404 && (api404.headers["content-type"] || "").includes("application/json"));

    // 5. Homepage HTML SEO Metadata Injection
    const homeHtml = await fetchUrl("/");
    test("GET / returns HTTP 200 HTML", homeHtml.statusCode === 200 && (homeHtml.headers["content-type"] || "").includes("text/html"));
    test("GET / has updated title 'Honesvia — India's Career Guidance Platform'", homeHtml.body.includes("<title>Honesvia — India's Career Guidance Platform</title>") || homeHtml.body.includes("<title>Honesvia &mdash; India&#039;s Career Guidance Platform</title>") || homeHtml.body.includes("<title>Honesvia — India&#039;s Career Guidance Platform</title>"));
    test("GET / has canonical https://honesvia.com/", homeHtml.body.includes('href="https://honesvia.com/"'));
    test("GET / has OpenGraph og:site_name Honesvia", homeHtml.body.includes('property="og:site_name" content="Honesvia"'));
    test("GET / has Schema.org Organization JSON-LD", homeHtml.body.includes('"@type": "Organization"') || homeHtml.body.includes('"@type":"Organization"'));
    
    // Schema Disambiguation & Single Script Tag Check (CRITICAL)
    const jsonLdMatches = homeHtml.body.match(/<script\s+type=["']application\/ld\+json["']/gi) || [];
    test("GET / has exactly ONE JSON-LD script (NO DUPLICATE SCHEMAS)", jsonLdMatches.length === 1, `Found ${jsonLdMatches.length} script tags`);
    test("GET / schema contains disambiguatingDescription for Honestvia / HoneyVeda", homeHtml.body.includes("Honestvia Techsoft Private Limited") && homeHtml.body.includes("HoneyVeda"));
    test("GET / schema contains founder Uttkarsh Baisla", homeHtml.body.includes("Uttkarsh Baisla"));
    test("GET / schema contains areaServed India", homeHtml.body.includes('"name": "India"') || homeHtml.body.includes('"name":"India"'));

    // 6. Dynamic Route SEO: /roadmaps/doctor
    const doctorHtml = await fetchUrl("/roadmaps/doctor");
    test("GET /roadmaps/doctor returns 200 HTML", doctorHtml.statusCode === 200);
    test("GET /roadmaps/doctor injected title with 'Medical Doctor'", doctorHtml.body.includes("<title>Medical Doctor Career Roadmap"));
    test("GET /roadmaps/doctor has canonical https://honesvia.com/roadmaps/doctor", doctorHtml.body.includes('href="https://honesvia.com/roadmaps/doctor"'));
    test("GET /roadmaps/doctor has Course schema", doctorHtml.body.includes('"@type": "Course"') || doctorHtml.body.includes('"@type":"Course"'));
    const doctorJsonLdMatches = doctorHtml.body.match(/<script\s+type=["']application\/ld\+json["']/gi) || [];
    test("GET /roadmaps/doctor has exactly ONE JSON-LD script", doctorJsonLdMatches.length === 1, `Found ${doctorJsonLdMatches.length} script tags`);

    // 7. Dynamic Route SEO: /about
    const aboutHtml = await fetchUrl("/about");
    test("GET /about injected About title with brand identity", aboutHtml.body.includes("<title>About Honesvia — India's Career Guidance Platform</title>") || aboutHtml.body.includes("About Honesvia"));
    test("GET /about has canonical https://honesvia.com/about", aboutHtml.body.includes('href="https://honesvia.com/about"'));
    test("GET /about has visible brand disambiguation text", aboutHtml.body.includes("Honestvia Techsoft Private Limited") && aboutHtml.body.includes("HoneyVeda"));

    // 8. Private Route Protection: /dashboard
    const dashHtml = await fetchUrl("/dashboard");
    test("GET /dashboard injected 'noindex, nofollow'", dashHtml.body.includes('content="noindex, nofollow"'));

    // 9. Additional Public Routes
    const engineerHtml = await fetchUrl("/roadmaps/engineer");
    test("GET /roadmaps/engineer injected Software Engineer title", engineerHtml.body.includes("<title>Software Engineer Career Roadmap"));

    const quizHtml = await fetchUrl("/career-quiz");
    test("GET /career-quiz injected Career Assessment Quiz title", quizHtml.body.includes("<title>Career Assessment Quiz"));

    // 10. Additional Private Routes
    const loginHtml = await fetchUrl("/login");
    test("GET /login injected 'noindex, nofollow'", loginHtml.body.includes('content="noindex, nofollow"'));

    const adminHtml = await fetchUrl("/admin");
    test("GET /admin injected 'noindex, nofollow'", adminHtml.body.includes('content="noindex, nofollow"'));

    const pricingHtml = await fetchUrl("/pricing");
    test("GET /pricing injected 'noindex, nofollow'", pricingHtml.body.includes('content="noindex, nofollow"'));

    console.log("\n=================================================");
    console.log(`📊 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log("=================================================");

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error("Test execution failed:", err);
    process.exit(1);
  } finally {
    if (server) {
      server.close();
      process.exit(0);
    }
  }
}

runTests();
