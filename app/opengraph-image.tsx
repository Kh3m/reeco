import { ImageResponse } from "next/og";

export const alt = "ReeCo — Customer Journeys, Retention & Growth Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Site-wide default social share image, generated on-brand (black + gold).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 44, fontWeight: 700 }}>
          <span style={{ color: "#ffffff" }}>Ree</span>
          <span style={{ color: "#D4AF37" }}>Co</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div
            style={{
              fontSize: 60,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.1,
              maxWidth: 980,
            }}
          >
            {"Most businesses don't have a traffic problem."}
          </div>
          <div
            style={{
              fontSize: 60,
              fontWeight: 700,
              color: "#D4AF37",
              lineHeight: 1.1,
            }}
          >
            {"They have a customer journey problem."}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#a1a1aa" }}>
          {"Customer Journeys · Retention · Growth Systems"}
        </div>
      </div>
    ),
    { ...size },
  );
}
