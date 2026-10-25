import type { Kicker } from "@/lib/questions";

export function PixelPlayer({ tier = 4, legend = "Messi", className = "" }: { tier?: Kicker["tier"]; legend?: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 36" className={`pixel-player kit-${tier} ${className}`} aria-hidden="true" shapeRendering="crispEdges">
      <path d="M7 1h10v3h2v8H5V4h2z" className="sprite-hair" />
      <path d="M7 5h10v9H7zM9 14h6v3H9z" className="sprite-skin" />
      <path d="M7 5h8v2H7zM5 7h2v4H5z" className="sprite-hair" />
      <path d="M5 16h14v12H5zM2 18h3v7H2zM19 18h3v7h-3z" className="sprite-shirt" />
      <path d="M2 25h3v4H2zM19 25h3v4h-3zM6 30h4v4H6zM14 30h4v4h-4z" className="sprite-skin" />
      <path d="M5 27h14v4H5z" className="sprite-shorts" />
      <path d="M4 34h6v2H4zM14 34h7v2h-7z" className="sprite-boot" />
      <path d={legend.includes("Ronaldo") ? "M10 19h5v2h-2v4h-2v-4h-1z" : "M8 19h2v6H8zM12 19h4v6h-4z"} className="sprite-number" />
    </svg>
  );
}

export function PixelBall({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 16 16" className={`pixel-ball ${className}`} aria-hidden="true" shapeRendering="crispEdges"><path d="M4 0h8v2h2v2h2v8h-2v2h-2v2H4v-2H2v-2H0V4h2V2h2z" className="sprite-number" /><path d="M6 5h5v5H6zM3 1h4v3H3zM12 3h3v4h-3zM1 9h3v4H1zM9 12h4v3H9z" className="sprite-boot" /></svg>;
}

export function PixelPitch() {
  return <div className="field-backdrop" aria-hidden="true">
    <div className="pixel-stands" />
    <Floodlight side="left" />
    <Floodlight side="right" />
    <svg viewBox="0 0 1200 900" preserveAspectRatio="none" className="field-markings" shapeRendering="crispEdges">
      <path d="M70 60H1130V840H70zM600 60V840M70 250H240V650H70M1130 250H960V650H1130M70 350H140V550H70M1130 350H1060V550H1130" />
      <path d="M540 350h120v20h40v40h20v80h-20v40h-40v20H540v-20h-40v-40h-20v-80h20v-40h40z" />
      <rect x="594" y="444" width="12" height="12" />
    </svg>
  </div>;
}

function Floodlight({ side }: { side: "left" | "right" }) {
  return <svg viewBox="0 0 14 45" className={`floodlight floodlight-${side}`} shapeRendering="crispEdges">
    <path d="M6 12h2v33H6z" fill="#1b3050" />
    <path d="M0 0h14v10H0z" fill="#101d33" />
    <path d="M1 1h2v2H1zM4 1h2v2H4zM7 1h2v2H7zM10 1h2v2h-2zM1 5h2v2H1zM4 5h2v2H4zM7 5h2v2H7zM10 5h2v2h-2z" fill="#e8f1ff" />
  </svg>;
}
