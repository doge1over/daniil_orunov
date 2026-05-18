import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0b",
          color: "#f5f5f5",
          padding: "72px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "Inter, system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -200,
            width: 700,
            height: 700,
            borderRadius: 999,
            background: "radial-gradient(closest-side, rgba(196,247,75,0.35), transparent)",
            filter: "blur(40px)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, fontWeight: 600 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#c4f74b",
              color: "#0a0a0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 900,
              letterSpacing: -2,
              paddingBottom: 2,
            }}
          >
            //
          </div>
          <div style={{ display: "flex" }}>
            <span>orunov</span>
            <span style={{ color: "#c4f74b" }}>.</span>
            <span>studio</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 16,
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1.5,
            }}
          >
            <span>Сайты на Next.js</span>
            <span style={{ background: "#c4f74b", color: "#0a0a0b", padding: "0 14px", borderRadius: 8 }}>
              под ключ
            </span>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#a1a1aa", maxWidth: 980 }}>
            {`${site.name} · веб-разработчик · TypeScript · фиксированная цена`}
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 22, color: "#a1a1aa" }}>
          <span style={{ display: "flex", padding: "10px 16px", borderRadius: 10, border: "1px solid #2e2e33" }}>
            Лендинг от 50 000 ₽
          </span>
          <span style={{ display: "flex", padding: "10px 16px", borderRadius: 10, border: "1px solid #2e2e33" }}>
            Срок от 1 недели
          </span>
          <span style={{ display: "flex", padding: "10px 16px", borderRadius: 10, border: "1px solid #2e2e33" }}>
            Гарантия 60 дней
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
