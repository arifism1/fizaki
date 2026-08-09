import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "fizaki — We make sure no lead slips through";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          backgroundImage:
            "linear-gradient(160deg, #2E3480 0%, #6B6FC4 42%, #C79FC2 72%, #F2C9B8 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "#22C55E",
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
              fontSize: "68px",
              lineHeight: 1.08,
              fontWeight: 600,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
              maxWidth: "980px",
            }}
          >
            Every missed call is money walking out the door.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              color: "rgba(255,255,255,0.88)",
              maxWidth: "820px",
            }}
          >
            AI systems that answer, qualify and book your leads in under 60 seconds.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
