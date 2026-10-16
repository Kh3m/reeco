import { renderOgImage, OG_SIZE } from "@/lib/og";
import { medspa } from "@/lib/niches";

export const alt = medspa.meta.ogImageAlt;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: medspa.label,
    lead: medspa.hero.headline.lead,
    accent: medspa.hero.headline.accent,
    footer: "Follow-up · Conversion · Customer journeys",
  });
}
