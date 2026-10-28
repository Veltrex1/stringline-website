import { ImageResponse } from "next/og";

// The home-screen icon: the reversed mark on a graphite square, matching icon.svg.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#1c1d1f" }}>
        <svg width="180" height="180" viewBox="0 0 64 64">
          <g transform="translate(8 8) scale(0.75)">
            <line x1="13.06" y1="20.09" x2="50.94" y2="20.09" stroke="#ea5a1f" strokeWidth="3" strokeLinecap="round" />
            <g transform="rotate(-4 15.5 55)">
              <polygon points="12,10 19,10 19,47 15.5,55 12,47" fill="#f3f1ed" />
              <rect x="10" y="17" width="11" height="6" fill="#ea5a1f" />
            </g>
            <g transform="rotate(4 48.5 55)">
              <polygon points="45,10 52,10 52,47 48.5,55 45,47" fill="#f3f1ed" />
              <rect x="43" y="17" width="11" height="6" fill="#ea5a1f" />
            </g>
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
