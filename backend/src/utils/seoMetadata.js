import { seedCareers } from "../data/seedData.js";

const DOMAIN = "https://honesvia.com";
const DEFAULT_IMAGE = `${DOMAIN}/opengraph.jpg`;

const ORGANIZATION_SCHEMA = {
  "@type": "Organization",
  "@id": `${DOMAIN}/#organization`,
  name: "Honesvia",
  alternateName: ["Honesvia Career Platform", "Honesvia India"],
  url: `${DOMAIN}/`,
  logo: `${DOMAIN}/images/honesvia-logo-512.png`,
  image: `${DOMAIN}/images/honesvia-logo-512.png`,
  description:
    "Honesvia is an Indian career guidance platform that helps students discover career paths, explore roadmaps, understand salary expectations, and access relevant learning resources.",
  disambiguatingDescription:
    "Honesvia is an Indian online career guidance and educational roadmap platform founded by Uttkarsh Baisla. Honesvia is an independent student guidance platform and is not affiliated with Honestvia Techsoft Private Limited, HoneyVeda, or any IT outsourcing or agricultural consumer product brands.",
  slogan: "India's Career Guidance Platform",
  founder: {
    "@type": "Person",
    name: "Uttkarsh Baisla"
  },
  areaServed: {
    "@type": "Country",
    name: "India"
  },
  audience: {
    "@type": "Audience",
    audienceType: "Indian Students & Early Professionals"
  },
  knowsAbout: [
    "Career Guidance in India",
    "Student Career Roadmaps",
    "Salary Insights in India",
    "Higher Education Entrance Exams",
    "Mentor Guidance"
  ]
};

const WEBSITE_SCHEMA = {
  "@type": "WebSite",
  "@id": `${DOMAIN}/#website`,
  url: `${DOMAIN}/`,
  name: "Honesvia",
  description:
    "India's Career Guidance Platform — Explore 48+ career roadmaps, salary insights, and mentor guidance for Indian students.",
  inLanguage: "en-IN",
  publisher: { "@id": `${DOMAIN}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: `${DOMAIN}/roadmaps?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

const DEFAULT_METADATA = {
  title: "Honesvia — India's Career Guidance Platform",
  description:
    "Honesvia helps Indian students discover career paths, explore roadmaps, understand salary expectations, and access relevant learning resources across 48+ careers.",
  canonical: `${DOMAIN}/`,
  ogType: "website",
  ogImage: DEFAULT_IMAGE,
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  schema: {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION_SCHEMA,
      WEBSITE_SCHEMA,
      {
        "@type": "WebPage",
        "@id": `${DOMAIN}/#webpage`,
        url: `${DOMAIN}/`,
        name: "Honesvia — India's Career Guidance Platform",
        description:
          "Honesvia helps Indian students discover career paths, explore roadmaps, understand salary expectations, and access relevant learning resources across 48+ careers.",
        isPartOf: { "@id": `${DOMAIN}/#website` },
        about: { "@id": `${DOMAIN}/#organization` },
        inLanguage: "en-IN"
      }
    ]
  }
};

// Map of static public routes
const STATIC_ROUTE_METADATA = {
  "/": DEFAULT_METADATA,
  "/roadmaps": {
    title: "Career Roadmaps Directory — Explore 48+ Career Paths | Honesvia",
    description:
      "Browse 48+ comprehensive, transparent career roadmaps across Engineering, Healthcare, Business, Creative Arts, Aviation, and Law tailored for Indian students.",
    canonical: `${DOMAIN}/roadmaps`,
    ogType: "website",
    ogImage: DEFAULT_IMAGE,
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        ORGANIZATION_SCHEMA,
        WEBSITE_SCHEMA,
        {
          "@type": "CollectionPage",
          "@id": `${DOMAIN}/roadmaps#webpage`,
          url: `${DOMAIN}/roadmaps`,
          name: "Career Roadmaps Directory — Explore 48+ Career Paths | Honesvia",
          description:
            "Browse 48+ comprehensive, transparent career roadmaps across Engineering, Healthcare, Business, Creative Arts, Aviation, and Law tailored for Indian students.",
          isPartOf: { "@id": `${DOMAIN}/#website` },
          publisher: { "@id": `${DOMAIN}/#organization` },
          inLanguage: "en-IN"
        }
      ]
    }
  },
  "/career-quiz": {
    title: "Career Assessment Quiz — Discover Your Ideal Career Path | Honesvia",
    description:
      "Take our free 5-minute psychometric career assessment quiz to match your cognitive strengths, interests, and personality with 48+ high-growth careers.",
    canonical: `${DOMAIN}/career-quiz`,
    ogType: "website",
    ogImage: DEFAULT_IMAGE,
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        ORGANIZATION_SCHEMA,
        WEBSITE_SCHEMA,
        {
          "@type": "WebPage",
          "@id": `${DOMAIN}/career-quiz#webpage`,
          url: `${DOMAIN}/career-quiz`,
          name: "Career Assessment Quiz — Discover Your Ideal Career Path | Honesvia",
          description:
            "Take our free 5-minute psychometric career assessment quiz to match your cognitive strengths, interests, and personality with 48+ high-growth careers.",
          isPartOf: { "@id": `${DOMAIN}/#website` },
          about: { "@id": `${DOMAIN}/#organization` },
          inLanguage: "en-IN"
        }
      ]
    }
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
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        ORGANIZATION_SCHEMA,
        WEBSITE_SCHEMA,
        {
          "@type": "WebPage",
          "@id": `${DOMAIN}/videos#webpage`,
          url: `${DOMAIN}/videos`,
          name: "Mentor Video Masterclasses — Unfiltered Career Advice | Honesvia",
          description:
            "Watch authentic video masterclasses from real professionals in India sharing day-to-day realities, actual salary expectations, and practical career roadmaps.",
          isPartOf: { "@id": `${DOMAIN}/#website` },
          about: { "@id": `${DOMAIN}/#organization` },
          inLanguage: "en-IN"
        }
      ]
    }
  },
  "/about": {
    title: "About Honesvia — India's Career Guidance Platform",
    description:
      "Learn about Honesvia, an Indian career guidance platform founded by Uttkarsh Baisla to help students discover career paths, explore roadmaps, understand salary expectations, and access learning resources.",
    canonical: `${DOMAIN}/about`,
    ogType: "website",
    ogImage: DEFAULT_IMAGE,
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        ORGANIZATION_SCHEMA,
        WEBSITE_SCHEMA,
        {
          "@type": "AboutPage",
          "@id": `${DOMAIN}/about#webpage`,
          url: `${DOMAIN}/about`,
          name: "About Honesvia — India's Career Guidance Platform",
          description:
            "Learn about Honesvia, an Indian career guidance platform founded by Uttkarsh Baisla to help students discover career paths, explore roadmaps, understand salary expectations, and access learning resources.",
          isPartOf: { "@id": `${DOMAIN}/#website` },
          about: { "@id": `${DOMAIN}/#organization` },
          inLanguage: "en-IN"
        }
      ]
    }
  },
  "/contact": {
    title: "Contact Us — Honesvia",
    description:
      "Have questions regarding career roadmaps, counseling sessions, or guidance? Contact the Honesvia team for student support.",
    canonical: `${DOMAIN}/contact`,
    ogType: "website",
    ogImage: DEFAULT_IMAGE,
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        ORGANIZATION_SCHEMA,
        WEBSITE_SCHEMA,
        {
          "@type": "ContactPage",
          "@id": `${DOMAIN}/contact#webpage`,
          url: `${DOMAIN}/contact`,
          name: "Contact Us — Honesvia",
          description:
            "Have questions regarding career roadmaps, counseling sessions, or guidance? Contact the Honesvia team for student support.",
          isPartOf: { "@id": `${DOMAIN}/#website` },
          about: { "@id": `${DOMAIN}/#organization` },
          inLanguage: "en-IN"
        }
      ]
    }
  },
  "/contact-us": {
    title: "Contact Us — Honesvia",
    description:
      "Have questions regarding career roadmaps, counseling sessions, or guidance? Contact the Honesvia team for student support.",
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
          "@graph": [
            ORGANIZATION_SCHEMA,
            WEBSITE_SCHEMA,
            {
              "@type": "Course",
              "@id": `${DOMAIN}/roadmaps/${careerId}#course`,
              name: `${career.title} Career Roadmap`,
              description,
              provider: { "@id": `${DOMAIN}/#organization` },
              url: `${DOMAIN}/roadmaps/${careerId}`,
              isAccessibleForFree: true,
              inLanguage: "en-IN",
              occupationalCredentialAwarded: `${career.title} Certification & Career Readiness`,
              hasCourseInstance: {
                "@type": "CourseInstance",
                courseMode: "Online",
                courseWorkload: "Self-paced roadmap"
              }
            }
          ]
        }
      };
    }
  }

  // Fallback to default
  return {
    ...DEFAULT_METADATA,
    canonical: cleanPath === "/" ? `${DOMAIN}/` : `${DOMAIN}${cleanPath}`
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

  // CRITICAL FIX: Remove ANY existing inline JSON-LD script from index.html template
  // to prevent duplicate Schema.org blocks or conflicting @graph entries
  updatedHtml = updatedHtml.replace(/<script\s+type=["']application\/ld\+json["'][\s\S]*?<\/script>/gi, "");

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
