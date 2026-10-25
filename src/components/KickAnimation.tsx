import type { CSSProperties } from "react";
import type { Kicker } from "@/lib/questions";

/** Each point is exactly one metre, including a zero-distance miss. */
export function KickAnimation({ points, kicker, missed = false }: { points: number; kicker: Kicker; missed?: boolean }) {
  const motion = { "--dx": `${points * 8.6}px`, "--dy": `-${18 + points * 1.1}px` } as CSSProperties;
  const landing = 80 + points * 8.6;
  return <div className={`kick-pitch kit-${kicker.tier} ${!missed && points >= 90 ? "kick-shake" : ""}`} aria-label={missed ? `${kicker.name} swings and misses the ball` : `${kicker.name} kicks the ball ${points} metres`}>
    <svg viewBox="0 0 1000 225" role="img" aria-label={`${points} metre kick`} shapeRendering="crispEdges">
      <path d="M30 190h940M30 20v170M970 20v170" className="pitch-line" />
      {Array.from({ length: 11 }, (_, i) => <g key={i}><path d={`M${80 + i * 86} 182v16`} className="pitch-line" /><text x={80 + i * 86} y={217} textAnchor="middle" className="pitch-label">{i * 10}</text></g>)}
      {missed
        ? <text x={970} y={60} textAnchor="end" className="kick-result kick-miss">MISS!</text>
        : <g className="kick-marker"><path d={`M${landing} 60V190`} className="kick-marker-line" /><text x={Math.min(landing, 930)} y={52} textAnchor="middle" className="kick-result">{points} M</text></g>}
      <g className={missed ? "kicker-stumble" : undefined}>
        <path d="M36 106h22v5h5v17H31v-17h5z" className="sprite-hair" />
        <path d="M36 116h22v21H36zM41 137h12v7H41zM22 151h10v24H22z" className="sprite-skin" />
        <path d={kicker.tier === 0 ? "M28 142h38v35H28z" : "M32 142h30v31H32z"} className="sprite-shirt" />
        <path d="M32 171h30v11H32z" className="sprite-shorts" />
        <path d="M33 182h10v10H33z" className="sprite-skin" /><path d="M28 190h15v6H28z" className="sprite-boot" />
        <g className={missed ? "kick-leg whiff" : "kick-leg"}><path d="M50 181h10v10H50z" className="sprite-skin" /><path d="M50 189h17v6H50z" className="sprite-boot" /></g>
        <path d="M41 149h4v15h-4zM49 149h8v15h-8z" className="sprite-number" />
      </g>
      <g className={missed ? undefined : "ball-x"} style={motion}><g className={missed ? undefined : "ball-y"} style={motion}><path d="M76 178h10v3h3v10h-3v3H76v-3h-3v-10h3z" className="sprite-number" /><path d="M78 183h6v6h-6zM74 178h4v4h-4zM84 190h4v4h-4z" className="sprite-boot" /></g></g>
    </svg>
    <div className="kick-caption flex flex-wrap items-center justify-between gap-2 px-3 py-3 text-sm"><span className="text-muted-foreground">KICKER <b className="ml-2 text-foreground">{kicker.name}</b></span><span className={`font-display ${missed ? "text-destructive" : "text-primary"}`}>{missed ? "MISS" : `${points} M`}</span></div>
  </div>;
}