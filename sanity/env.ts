/**
 * Sanity environment configuration.
 *
 * The site is built to work even before a Sanity project exists: when
 * `projectId` is unset, `isSanityConfigured` is false and the fetch layer
 * returns empty data instead of calling the API. Set the env vars (see
 * .env.example) to go live.
 */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-19";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/** Studio URL, used for stega/preview links. */
export const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "/studio";

export const isSanityConfigured = projectId.length > 0;
