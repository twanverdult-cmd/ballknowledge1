import { PixelBall, PixelPlayer } from "@/components/PixelPitch";

const CREW = [
  { move: "crew-stretch", tier: 1, className: "" },
  { move: "crew-run", tier: 2, className: "" },
  { move: "crew-juggle", tier: 3, className: "hidden sm:flex" },
  { move: "crew-hop", tier: 4, className: "" },
] as const;

/** Little players along the bottom of the screen: they stand still until training begins, then warm up. */
export function WarmUpCrew({ active }: { active: boolean }) {
  return <div className={`crew ${active ? "crew-active" : ""}`} aria-hidden="true">
    {CREW.map(({ move, tier, className }, i) => <div key={i} className={`crew-lane ${className}`}>
      <div className={`crew-mover ${move}`}>
        <PixelPlayer tier={tier} className="crew-player" />
        {move === "crew-juggle" && <PixelBall className="crew-ball" />}
      </div>
    </div>)}
  </div>;
}
