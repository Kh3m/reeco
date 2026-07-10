import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { sanityFetch } from "@/sanity/fetch";
import { POST_SLUGS_QUERY } from "@/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: POST_SLUGS_QUERY,
    tags: ["post"],
    fallback: [],
  });

  const posts: MetadataRoute.Sitemap = slugs.map(({ slug }) => ({
    url: `${SITE_URL}/insights/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/insights`, changeFrequency: "weekly", priority: 0.8 },
    ...posts,
  ];
}
