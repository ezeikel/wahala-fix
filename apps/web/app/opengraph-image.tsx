import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "WahalaFix - Nigeria 311 Service for City Issues";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "linear-gradient(135deg, #0b3d2e 0%, #135d44 55%, #1a7a57 100%)",
        color: "#f6f5ee",
        padding: "64px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div
          style={{ fontSize: 56, fontWeight: 700, letterSpacing: "-0.02em" }}
        >
          WahalaFix
        </div>
        <div style={{ fontSize: 34, fontWeight: 600, maxWidth: 820 }}>
          Nigeria&apos;s 311 service for city issues
        </div>
        <div
          style={{
            fontSize: 26,
            opacity: 0.92,
            maxWidth: 920,
            lineHeight: 1.4,
          }}
        >
          Report potholes, broken streetlights, flooding, waste, and public
          safety concerns in seconds.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "12px" }}>
          {["Lagos", "Nigeria", "Civic Reporting"].map((label) => (
            <div
              key={label}
              style={{
                padding: "10px 16px",
                borderRadius: 999,
                background: "rgba(246, 245, 238, 0.16)",
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: "0.02em",
              }}
            >
              {label}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 18, opacity: 0.8 }}>wahalafix.app</div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
