import type { Metadata } from "next";
import { medspa } from "./medspa";
import { waterproofing } from "./waterproofing";
import { generator } from "./generator";
import type { NicheConfig } from "./types";

export type { NicheConfig, NicheVideo } from "./types";
export { medspa, waterproofing, generator };

/** All niche pages, MedSpa (the primary page) first. */
export const NICHES = [medspa, waterproofing, generator] as const;

export const NICHE_IDS = NICHES.map((n) => n.analyticsId) as [
  string,
  ...string[],
];

export function getNicheById(id: string): NicheConfig | undefined {
  return NICHES.find((n) => n.analyticsId === id);
}

/** Shared metadata builder so every niche page gets the same SEO fields. */
export function nicheMetadata(niche: NicheConfig): Metadata {
  const path = `/${niche.slug}`;
  const ogTitle = niche.meta.ogTitle ?? niche.meta.title;
  return {
    title: niche.meta.title,
    description: niche.meta.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title: ogTitle,
      description: niche.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: niche.meta.description,
    },
  };
}
