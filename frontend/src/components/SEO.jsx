import React from "react";
import { Helmet } from "react-helmet-async";

const DOMAIN = "https://honesvia.com";
const DEFAULT_TITLE = "Honesvia — India's Premier Career Roadmap & Mentor Guidance Platform";
const DEFAULT_DESCRIPTION =
  "Explore 48+ honest career roadmaps, real salary benchmarks, step-by-step milestones, and unfiltered mentor masterclasses tailored for Indian students.";
const DEFAULT_IMAGE = `${DOMAIN}/opengraph.jpg`;

/**
 * Reusable SEO Component using react-helmet-async.
 * Manages title, meta description, canonical URLs, robots directives,
 * OpenGraph, Twitter Cards, and Schema.org JSON-LD structured data.
 */
export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  noIndex = false,
  robots,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_IMAGE,
  ogType = "website",
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  twitterImage,
  schema,
  keywords,
}) {
  const finalTitle = title
    ? title.includes("Honesvia")
      ? title
      : `${title} | Honesvia`
    : DEFAULT_TITLE;

  const finalDescription = description || DEFAULT_DESCRIPTION;

  // Ensure absolute canonical URL without query parameters or session IDs
  let finalCanonical = canonical;
  if (!finalCanonical && typeof window !== "undefined") {
    const cleanPath = window.location.pathname.replace(/\/+$/, "") || "/";
    finalCanonical = `${DOMAIN}${cleanPath === "/" ? "" : cleanPath}`;
  } else if (!finalCanonical) {
    finalCanonical = DOMAIN;
  } else if (!finalCanonical.startsWith("http")) {
    const cleanPath = finalCanonical.startsWith("/") ? finalCanonical : `/${finalCanonical}`;
    finalCanonical = `${DOMAIN}${cleanPath.replace(/\/+$/, "") || "/"}`;
  }

  // Ensure ogImage is absolute
  const finalOgImage = ogImage.startsWith("http") ? ogImage : `${DOMAIN}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`;
  const finalTwitterImage = (twitterImage || finalOgImage).startsWith("http")
    ? twitterImage || finalOgImage
    : `${DOMAIN}${(twitterImage || finalOgImage).startsWith("/") ? "" : "/"}${twitterImage || finalOgImage}`;

  const robotsDirective = noIndex
    ? "noindex, nofollow"
    : robots || "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robotsDirective} />
      <meta name="googlebot" content={robotsDirective} />
      <link rel="canonical" href={finalCanonical} />

      {/* Open Graph / Facebook / WhatsApp / LinkedIn */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Honesvia" />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:title" content={ogTitle || finalTitle} />
      <meta property="og:description" content={ogDescription || finalDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:secure_url" content={finalOgImage} />
      <meta property="og:image:alt" content={ogTitle || finalTitle} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={finalCanonical} />
      <meta name="twitter:title" content={twitterTitle || ogTitle || finalTitle} />
      <meta name="twitter:description" content={twitterDescription || ogDescription || finalDescription} />
      <meta name="twitter:image" content={finalTwitterImage} />

      {/* JSON-LD Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}

export default SEO;
