import { renderOgImage, OG_SIZE } from "@/lib/og";
import { waterproofing } from "@/lib/niches";

export const alt = waterproofing.meta.ogImageAlt;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: waterproofing.label,
    lead: waterproofing.hero.headline.lead,
    accent: waterproofing.hero.headline.accent,
    footer: "Follow-up · Conversion · Customer journeys",
  });
}
