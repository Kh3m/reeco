import type { QueryParams } from "next-sanity";
import { client } from "./client";
import { isSanityConfigured } from "./env";

const DEFAULT_REVALIDATE = 60; // seconds — ISR window for published content

/**
 * Fetch from Sanity with revalidation + cache tags. Returns `fallback` (default
 * `null`) without hitting the network when Sanity isn't configured yet, so the
 * site builds and renders cleanly pre-launch.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = DEFAULT_REVALIDATE,
  fallback = null as T,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
  fallback?: T;
}): Promise<T> {
  if (!isSanityConfigured) {
    return fallback;
  }

  // Time-based revalidation keeps content fresh without webhooks; tags allow
  // optional on-demand revalidation later.
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate, tags },
    });
  } catch (err) {
    // A Sanity/network hiccup shouldn't crash the page — log it and fall back
    // to empty content so the site stays up and self-heals on revalidation.
    console.error("[sanityFetch] query failed, returning fallback:", err);
    return fallback;
  }
}
