import { renderOgImage, OG_SIZE } from "@/lib/og";

export const alt = "ReeCo — Customer Journeys, Retention & Growth Systems";
export const size = OG_SIZE;
export const contentType = "image/png";

// Site-wide default social share image.
export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Customer journeys",
    lead: "Most businesses don't have a traffic problem.",
    accent: "They have a customer journey problem.",
    footer: "Customer Journeys · Retention · Growth Systems",
  });
}
