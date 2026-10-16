import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * On-brand 1200x630 social card: cream canvas, black ink headline, gold accent.
 * Shared by the site default and the niche landing pages.
 */
export function renderOgImage({
  eyebrow,
  lead,
  accent,
  footer,
}: {
  eyebrow: string;
  lead: string;
  accent?: string;
  footer: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f1e7",
          padding: "72px 80px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 700, fontFamily: "sans-serif" }}>
            <span style={{ color: "#111111" }}>Ree</span>
            <span style={{ color: "#D4AF37" }}>Co</span>
          </div>
          <div style={{ width: 48, height: 2, background: "#D4AF37" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#7a5c0f",
              fontFamily: "sans-serif",
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 64, color: "#111111", lineHeight: 1.08, maxWidth: 1020 }}>
            {lead}
          </div>
          {accent && (
            <div style={{ fontSize: 64, color: "#7a5c0f", lineHeight: 1.08, fontStyle: "italic" }}>
              {accent}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#4b473f",
            borderTop: "1px solid #ddd4c2",
            paddingTop: 24,
            fontFamily: "sans-serif",
          }}
        >
          {footer}
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
