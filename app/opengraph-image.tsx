import { ImageResponse } from "next/og";

export const alt = "InterLister — One catalog. Every marketplace.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const markets = [
  { name: "Amazon", color: "#ff9f1c" },
  { name: "Flipkart", color: "#2f7bff" },
  { name: "Meesho", color: "#f0409c" },
];

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
          padding: 72,
          background:
            "radial-gradient(circle at 70% 20%, rgba(79,125,255,0.45), transparent 55%), radial-gradient(circle at 15% 90%, rgba(139,108,255,0.35), transparent 50%), #04050a",
          color: "#f4f6ff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontWeight: 600 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "linear-gradient(135deg, #4f7dff, #2fd9f4 55%, #8b6cff)",
            }}
          />
          InterLister
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>One catalog.</div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: -4,
              lineHeight: 1.1,
              backgroundImage: "linear-gradient(90deg, #bcd0ff, #6fe3ff, #a58dff)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Every marketplace.
          </div>
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 26, color: "#a3abc2" }}>
          {markets.map((m) => (
            <div
              key={m.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 20px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: 99, background: m.color }} />
              {m.name}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
