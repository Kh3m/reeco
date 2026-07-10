/** Canonical site constants, shared across metadata, sitemap, and JSON-LD. */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const SITE_NAME = "ReeCo";

export const SITE_TITLE =
  "ReeCo — Customer Journeys, Retention & Growth Systems";

export const SITE_DESCRIPTION =
  "ReeCo helps businesses uncover revenue leaks, improve customer journeys, increase retention, and build systems that drive long-term growth.";

/** Lead-magnet PDF, served from /public. Regenerate via `npm run generate:checklist`. */
export const LEAD_MAGNET_PDF = "/reeco-customer-journey-checklist.pdf";
