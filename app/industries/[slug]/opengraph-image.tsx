import { ImageResponse } from "next/og";

import { INDUSTRIES, getIndustry } from "@/lib/industries";

export const runtime = "edge";
export const alt = "fizaki — AI lead systems for local businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const industry = getIndustry(params.slug);
  const accent = industry?.accent ?? "#2563EB";
  const accentAlt = industry?.accentAlt ?? "#06B6D4";
  const eyebrow = industry?.eyebrow ?? "";
  const lead = industry?.h1.lead ?? "fizaki";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundImage: `linear-gradient(140deg, ${accent} 0%, ${accentAlt} 100%)`,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
                fill="#FFFFFF"
              />
            </svg>
          </div>
          <span
            style={{
              fontSize: "32px",
              fontWeight: 600,
              fontStyle: "italic",
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            fizaki
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              letterSpacing: "0.14em",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "68px",
              lineHeight: 1.08,
              fontWeight: 500,
              fontStyle: "italic",
              fontFamily: "Georgia, serif",
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
              maxWidth: "1000px",
            }}
          >
            {lead}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
