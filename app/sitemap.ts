import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { NICHES } from "@/lib/niches";
import { sanityFetch } from "@/sanity/fetch";
import { POST_SLUGS_QUERY } from "@/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await sanityFetch<{ slug: string; updatedAt?: string }[]>({
    query: POST_SLUGS_QUERY,
    tags: ["post"],
    fallback: [],
  });

  const posts: MetadataRoute.Sitemap = slugs.map(({ slug, updatedAt }) => ({
    url: `${SITE_URL}/insights/${slug}`,
    ...(updatedAt ? { lastModified: updatedAt } : {}),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...NICHES.map((n) => ({
      url: `${SITE_URL}/${n.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/insights`, changeFrequency: "weekly", priority: 0.8 },
    ...posts,
  ];
}
