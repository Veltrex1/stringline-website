// The Stringline mark (B3): two stakes angled 4° outward, the string tied off at each one.
export function Mark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="mark">
      <line x1="13.06" y1="20.08" x2="50.94" y2="20.08" style={{ stroke: "var(--accent)" }} strokeWidth="3" strokeLinecap="round" />
      <g transform="rotate(-4 15.5 55)">
        <polygon points="12,10 19,10 19,47 15.5,55 12,47" fill="currentColor" />
        <rect x="10" y="17" width="11" height="6" style={{ fill: "var(--accent)" }} />
      </g>
      <g transform="rotate(4 48.5 55)">
        <polygon points="45,10 52,10 52,47 48.5,55 45,47" fill="currentColor" />
        <rect x="43" y="17" width="11" height="6" style={{ fill: "var(--accent)" }} />
      </g>
    </svg>
  );
}
