import type { Kicker } from "@/lib/questions";

const SHIRT = ["var(--kit-0)", "var(--kit-1)", "var(--kit-2)", "var(--kit-3)", "var(--kit-4)"];

/** Speler trapt de bal; afstand in meters = punten. */
export function KickAnimation({ points, kicker }: { points: number; kicker: Kicker }) {
  // veld: speler op x=40, 100m = x 40..940
  const dist = Math.max(points, 3) * 9;
  const height = 20 + points * 1.4;
  const belly = kicker.tier === 0;
  return (
    <div className="pitch rounded-xl overflow-hidden border-2 border-foreground">
      <svg viewBox="0 0 1000 220" className="w-full h-auto block">
        {Array.from({ length: 11 }, (_, i) => (
          <g key={i}>
            <line x1={40 + i * 90} x2={40 + i * 90} y1={160} y2={200} className="pitch-line" />
            <text x={40 + i * 90} y={215} textAnchor="middle" className="pitch-label">{i * 10}</text>
          </g>
        ))}
        <line x1={0} x2={1000} y1={190} y2={190} className="pitch-line" />
        {/* speler */}
        <g transform="translate(30 0)">
          <circle cx={0} cy={110} r={11} className="skin" />
          {kicker.tier === 4 && <path d="M-11 106 Q0 92 11 106" className="hair" />}
          <ellipse cx={0} cy={belly ? 142 : 138} rx={belly ? 17 : 11} ry={20} style={{ fill: SHIRT[kicker.tier] }} />
          <line x1={-4} y1={156} x2={-8} y2={190} className="limb" />
          <g className="kick-leg">
            <line x1={4} y1={156} x2={10} y2={190} className="limb" />
          </g>
        </g>
        {/* bal */}
        <g className="ball-x" style={{ ["--dx" as string]: `${dist}px` }}>
          <g className="ball-y" style={{ ["--dy" as string]: `-${height}px` }}>
            <circle cx={50} cy={184} r={6} className="ball" />
          </g>
        </g>
      </svg>
      <div className="flex justify-between px-4 py-2 text-sm bg-card">
        <span>Trap door: <b>{kicker.name}</b></span>
        <span className="tabular-nums font-bold">{points} meter</span>
      </div>
    </div>
  );
}
