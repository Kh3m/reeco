import { renderOgImage, OG_SIZE } from "@/lib/og";
import { generator } from "@/lib/niches";

export const alt = generator.meta.ogImageAlt;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: generator.label,
    lead: generator.hero.headline.lead,
    accent: generator.hero.headline.accent,
    footer: "Follow-up · Conversion · Customer journeys",
  });
}
