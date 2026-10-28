import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

// The link preview: the concept yard with the headline, so a shared link shows the product's output.
export const alt = "Stringline: every lead answered. You pay when they show.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const photo = await readFile(path.join(process.cwd(), "public/images/yard-concept.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#ffffff" }}>
        <div style={{ width: 560, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 34, fontWeight: 700, color: "#1c1d1f" }}>
            <div style={{ display: "flex", width: 36, height: 8, background: "#c2410c" }} />
            Stringline
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 60, fontWeight: 700, lineHeight: 1.02, color: "#1c1d1f", letterSpacing: -2 }}>
            <span>Every lead answered.</span>
            <span>You pay when they show.</span>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#55585c" }}>For hardscape and landscape crews</div>
        </div>
        <img src={src} alt="" width={640} height={630} style={{ width: 640, height: 630, objectFit: "cover", objectPosition: "60% 70%" }} />
      </div>
    ),
    size,
  );
}
