import { seedCareers } from "../data/seedData.js";

const DOMAIN = "https://honesvia.com";
const DEFAULT_IMAGE = `${DOMAIN}/opengraph.jpg`;

const DEFAULT_METADATA = {
  title: "Honesvia — India's Premier Career Roadmap & Mentor Guidance Platform",
  description:
    "Clear, honest career roadmaps, real salary insights, step-by-step progression milestones, and unfiltered mentor masterclasses across 48+ careers for Indian students.",
  canonical: DOMAIN,
  ogType: "website",
  ogImage: DEFAULT_IMAGE,
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  schema: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${DOMAIN}/#organization`,
        name: "Honesvia",
        url: DOMAIN,
        logo: `${DOMAIN}/images/honesvia-icon.png`,
        description:
          "India's premier career guidance and learning roadmap platform for students and early professionals.",
        sameAs: [
          "https://www.linkedin.com/company/honesvia",
          "https://www.instagram.com/honesvia",
          "https://www.youtube.com/@honesvia"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${DOMAIN}/#website`,
        url: DOMAIN,
        name: "Honesvia",
        publisher: { "@id": `${DOMAIN}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${DOMAIN}/roadmaps?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }
    ]
  }
};

// Map of static public routes
const STATIC_ROUTE_METADATA = {
  "/": DEFAULT_METADATA,
  "/roadmaps": {
    title: "Career Roadmaps — Explore 48+ Career Paths & Milestones | Honesvia",
    description:
      "Browse 48+ comprehensive, transparent career roadmaps across Engineering, Healthcare, Business, Creative Arts, Aviation, and Law tailored for Indian students.",
    canonical: `${DOMAIN}/roadmaps`,
    ogType: "website",
    ogImage: DEFAULT_IMAGE,
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Honesvia Career Roadmaps Directory",
      description: "Comprehensive step-by-step career roadmaps for 48+ professions in India.",
      url: `${DOMAIN}/roadmaps`,
      publisher: {
        "@type": "Organization",
        name: "Honesvia",
        url: DOMAIN
      }
    }
  },
  "/career-quiz": {
    title: "Career Assessment Quiz — Discover Your Ideal Career Path | Honesvia",
    description:
      "Take our free 5-minute psychometric career assessment quiz to match your cognitive strengths, interests, and personality with 48+ high-growth careers.",
    canonical: `${DOMAIN}/career-quiz`,
    ogType: "website",
    ogImage: DEFAULT_IMAGE,
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  },
  "/quiz": {
    title: "Career Assessment Quiz — Discover Your Ideal Career Path | Honesvia",
    description:
      "Take our free 5-minute psychometric career assessment quiz to match your cognitive strengths, interests, and personality with 48+ high-growth careers.",
    canonical: `${DOMAIN}/career-quiz`,
    ogType: "website",
    ogImage: DEFAULT_IMAGE,
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  },
  "/videos": {
    title: "Mentor Video Masterclasses — Unfiltered Career Advice | Honesvia",
    description:
      "Watch authentic video masterclasses from real professionals in India sharing day-to-day realities, actual salary expectations, and practical career roadmaps.",
    canonical: `${DOMAIN}/videos`,
    ogType: "website",
    ogImage: DEFAULT_IMAGE,
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  },
  "/about": {
    title: "About Honesvia — Honest, Actionable Career Guidance for Indian Students",
    description:
      "Learn about Honesvia's mission: cutting through career noise and misinformation with verified salary benchmarks, transparent educational roadmaps, and mentor guidance.",
    canonical: `${DOMAIN}/about`,
    ogType: "website",
    ogImage: DEFAULT_IMAGE,
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  },
  "/contact": {
    title: "Contact Us — Get in Touch with Honesvia",
    description:
      "Have questions regarding career roadmaps, counseling sessions, or partnerships? Contact the Honesvia team for responsive support.",
    canonical: `${DOMAIN}/contact`,
    ogType: "website",
    ogImage: DEFAULT_IMAGE,
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  },
  "/contact-us": {
    title: "Contact Us — Get in Touch with Honesvia",
    description:
      "Have questions regarding career roadmaps, counseling sessions, or partnerships? Contact the Honesvia team for responsive support.",
    canonical: `${DOMAIN}/contact`,
    ogType: "website",
    ogImage: DEFAULT_IMAGE,
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  }
};

// Private / Gated routes that must be excluded from indexing
const PRIVATE_ROUTE_PREFIXES = [
  "/dashboard",
  "/admin",
  "/login",
  "/forgot-password",
  "/reset-password",
  "/pricing",
  "/get-counseling",
  "/api"
];

/**
 * Resolves metadata for an incoming pathname.
 */
export function getRouteMetadata(pathname) {
  const cleanPath = pathname.replace(/\/+$/, "") || "/";

  // Check if private
  const isPrivate = PRIVATE_ROUTE_PREFIXES.some(
    (prefix) => cleanPath === prefix || cleanPath.startsWith(`${prefix}/`)
  );

  if (isPrivate) {
    return {
      title: "Honesvia",
      description: "Secure Student Portal — Honesvia",
      canonical: `${DOMAIN}${cleanPath}`,
      robots: "noindex, nofollow",
      ogType: "website",
      ogImage: DEFAULT_IMAGE
    };
  }

  // Check static routes
  if (STATIC_ROUTE_METADATA[cleanPath]) {
    return STATIC_ROUTE_METADATA[cleanPath];
  }

  // Check /roadmaps/:career dynamic routes
  const roadmapMatch = cleanPath.match(/^\/roadmaps\/([a-zA-Z0-9_-]+)$/);
  if (roadmapMatch) {
    const careerId = roadmapMatch[1];
    const career = seedCareers.find((c) => c.id === careerId);

    if (career) {
      const salaryInfo = career.stats?.salary ? ` (${career.stats.salary})` : "";
      const description = career.description
        ? `${career.title} Career Roadmap in India: ${career.description} Includes real salary benchmarks${salaryInfo}, required entrance exams, and step-by-step milestones.`
        : `Complete step-by-step career roadmap for ${career.title} in India. Understand salary packages${salaryInfo}, required skills, college selection, and career pathways.`;

      return {
        title: `${career.title} Career Roadmap — Salary, Exams, Colleges & Skills | Honesvia`,
        description,
        canonical: `${DOMAIN}/roadmaps/${careerId}`,
        ogType: "article",
        ogImage: DEFAULT_IMAGE,
        robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        schema: {
          "@context": "https://schema.org",
          "@type": "Course",
          name: `${career.title} Career Roadmap`,
          description,
          provider: {
            "@type": "Organization",
            name: "Honesvia",
            url: DOMAIN,
            sameAs: `${DOMAIN}/about`
          },
          url: `${DOMAIN}/roadmaps/${careerId}`,
          isAccessibleForFree: true,
          occupationalCredentialAwarded: `${career.title} Certification & Career Readiness`,
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "Online",
            courseWorkload: "Self-paced roadmap"
          }
        }
      };
    }
  }

  // Fallback to default
  return {
    ...DEFAULT_METADATA,
    canonical: `${DOMAIN}${cleanPath}`
  };
}

/**
 * Injects SEO tags into the raw HTML template string.
 */
export function injectSeoMetadata(htmlTemplate, pathname) {
  const meta = getRouteMetadata(pathname);

  let updatedHtml = htmlTemplate;

  // 1. Replace <title>...</title>
  if (meta.title) {
    updatedHtml = updatedHtml.replace(
      /<title>[\s\S]*?<\/title>/i,
      `<title>${escapeHtml(meta.title)}</title>`
    );
  }

  // 2. Replace or insert meta description
  if (meta.description) {
    const descTag = `<meta name="description" content="${escapeHtml(meta.description)}" />`;
    if (/<meta\s+name=["']description["'][^>]*>/i.test(updatedHtml)) {
      updatedHtml = updatedHtml.replace(/<meta\s+name=["']description["'][^>]*>/i, descTag);
    } else {
      updatedHtml = updatedHtml.replace("</head>", `  ${descTag}\n</head>`);
    }
  }

  // 3. Replace or insert robots
  const robotsTag = `<meta name="robots" content="${meta.robots || 'index, follow'}" />\n    <meta name="googlebot" content="${meta.robots || 'index, follow'}" />`;
  if (/<meta\s+name=["']robots["'][^>]*>/i.test(updatedHtml)) {
    updatedHtml = updatedHtml.replace(/<meta\s+name=["']robots["'][^>]*>/i, robotsTag);
  } else {
    updatedHtml = updatedHtml.replace("</head>", `  ${robotsTag}\n</head>`);
  }

  // 4. Replace or insert canonical
  if (meta.canonical) {
    const canonicalTag = `<link rel="canonical" href="${meta.canonical}" />`;
    if (/<link\s+rel=["']canonical["'][^>]*>/i.test(updatedHtml)) {
      updatedHtml = updatedHtml.replace(/<link\s+rel=["']canonical["'][^>]*>/i, canonicalTag);
    } else {
      updatedHtml = updatedHtml.replace("</head>", `  ${canonicalTag}\n</head>`);
    }
  }

  // 5. OpenGraph Tags
  const ogTags = `
    <meta property="og:type" content="${meta.ogType || 'website'}" />
    <meta property="og:site_name" content="Honesvia" />
    <meta property="og:url" content="${meta.canonical}" />
    <meta property="og:title" content="${escapeHtml(meta.title)}" />
    <meta property="og:description" content="${escapeHtml(meta.description)}" />
    <meta property="og:image" content="${meta.ogImage || DEFAULT_IMAGE}" />
    <meta property="og:image:secure_url" content="${meta.ogImage || DEFAULT_IMAGE}" />
    <meta property="og:image:alt" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${meta.canonical}" />
    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
    <meta name="twitter:image" content="${meta.ogImage || DEFAULT_IMAGE}" />`;

  // Remove existing OG and Twitter tags to prevent duplicate meta
  updatedHtml = updatedHtml.replace(/<meta\s+property=["']og:[^"']*["'][^>]*>/gi, "");
  updatedHtml = updatedHtml.replace(/<meta\s+name=["']twitter:[^"']*["'][^>]*>/gi, "");

  // 6. JSON-LD Schema
  let schemaTag = "";
  if (meta.schema) {
    schemaTag = `\n    <script type="application/ld+json">\n${JSON.stringify(meta.schema, null, 2)}\n    </script>`;
  }

  updatedHtml = updatedHtml.replace("</head>", `${ogTags}${schemaTag}\n</head>`);

  return updatedHtml;
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
