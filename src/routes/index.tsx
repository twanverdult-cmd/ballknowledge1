import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { ArrowRight, RotateCcw, Trophy } from "lucide-react";
import { QUESTIONS, RARITY_TIERS, ROUNDS, findAnswer, scoreFor, kickerFor, rarityLabel, type Answer, type Kicker } from "@/lib/questions";
import { KickAnimation } from "@/components/KickAnimation";
import { WarmUpCrew } from "@/components/WarmUp";
import { QuestionTimer } from "@/components/QuestionTimer";
import { PixelBall, PixelPitch, PixelPlayer } from "@/components/PixelPitch";
import { Button } from "@/components/ui/button";
import { drawMatch } from "@/lib/question-deck";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Ball Knowledge — The Pixel Football Quiz" },
    { name: "description", content: "Seven rounds. Name a footballer, find the rarest answer and send the ball up to 100 metres across a pixel pitch." },
    { property: "og:title", content: "Ball Knowledge — The Pixel Football Quiz" },
    { property: "og:description", content: "Everyone knows Messi. How deep does your football knowledge go? Play seven fresh rounds of Ball Knowledge." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Game,
});

type Result = { input: string; answer: Answer | undefined; points: number; kicker: Kicker; timedOut?: boolean };

function Game() {
  const deck = useRef<number[]>([]);
  const previousMatch = useRef<number[]>([]);
  const [order, setOrder] = useState(() => QUESTIONS.map((_, i) => i).slice(0, ROUNDS));
  const [idx, setIdx] = useState(-1);
  const [leaving, setLeaving] = useState(false);
  const transition = (change: () => void) => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => { change(); setLeaving(false); }, 320);
  };
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [revealed, setRevealed] = useState<Result | null>(null);
  const [notFound, setNotFound] = useState<string | null>(null);
  const questionIndex = order[idx];
  const q = questionIndex === undefined ? undefined : QUESTIONS[questionIndex];
  const total = results.reduce((sum, r) => sum + r.points, 0);
  const sorted = useMemo(() => q ? [...q.answers].sort((a, b) => b.pct - a.pct || a.name.localeCompare(b.name)) : [], [q]);
  const archiveCount = new Set(QUESTIONS.flatMap(q => q.answers.map(a => a.name))).size;
  const start = useCallback(() => {
    const match = drawMatch(QUESTIONS.length, deck.current, previousMatch.current);
    deck.current = match.remaining;
    previousMatch.current = match.order;
    setOrder(match.order); setResults([]); setRevealed(null); setInput(""); setIdx(0);
  }, []);
  const beginTraining = () => transition(start);
  const playAgain = () => transition(() => setIdx(-1));
  const reveal = (text: string, timedOut = false) => {
    if (!q || revealed) return;
    const answer = findAnswer(q, text); const points = scoreFor(answer);
    const result = { input: text.trim(), answer, points, kicker: kickerFor(points), timedOut };
    setRevealed(result); setResults(previous => [...previous, result]);
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !q) return;
    if (!findAnswer(q, input)) { setNotFound(input.trim()); setInput(""); return; }
    setNotFound(null); reveal(input);
  };
  const next = () => transition(() => { setRevealed(null); setNotFound(null); setInput(""); setIdx(i => i + 1); });

  return <main className={`game-world flex flex-col px-5 pb-5 pt-9 sm:px-10 ${revealed ? "zap" : ""}`}>
    <PixelPitch />
    <WarmUpCrew active={idx >= 0} />
    <header className="game-header mx-auto flex w-full max-w-5xl items-center justify-between gap-3 pb-5">
      <div className="pixel-brand min-w-0"><PixelBall /><h1 className="font-display text-lg sm:text-3xl">BALL <span className="text-primary">KNOWLEDGE</span></h1></div>
      <div className="scoreboard flex items-center gap-4 px-3 py-2 sm:px-5"><span className="text-lg text-muted-foreground">{idx < 0 ? "HIGH SCORE" : "SCORE"}</span><span className="font-display text-lg text-primary">{idx < 0 ? "700" : String(total).padStart(3, "0")}</span></div>
    </header>

    {idx === -1 && <section className={`screen-enter opening ${leaving ? "screen-leave" : ""} mx-auto w-full max-w-3xl text-center`}>
      <p className="opening-tag mb-4 font-display text-xl text-accent">THE NOT-SO-OBVIOUS FOOTBALL QUIZ</p>
      <h2 className="opening-title font-display">BALL<br /><span className="text-primary">KNOWLEDGE</span></h2>
      <p className="mt-5 text-lg">Everyone knows Messi. <span className="text-primary">Who knows Hleb?</span></p>
      <div className="my-7 flex items-center justify-center gap-5 font-display text-lg sm:gap-8"><span>7 ROUNDS</span><span className="text-border">/</span><span>100 M MAX</span></div>
      <Button onClick={beginTraining} className="match-button bob">BEGIN TRAINING <ArrowRight /></Button>
      <p className="mt-5 font-display text-xl text-muted-foreground">one in a million.</p>
      <div className="rarity-scale mt-5" aria-label="Answer rarity categories">{RARITY_TIERS.map((name, tier) => <span key={name} className={`rarity-badge tier-${tier}`}>{name}</span>)}</div>
      <div className="opening-art"><PixelPlayer tier={2} /><PixelBall /><PixelPlayer tier={4} /></div>
    </section>}

    {q && idx >= 0 && <section key={idx} className={`screen-enter ${leaving ? "screen-leave" : ""} mx-auto w-full max-w-2xl py-9 sm:py-12`}>
      <div className="mb-5 flex items-center justify-between"><p className="font-display text-lg text-accent">ROUND {idx + 1} <span className="text-muted-foreground">/ {ROUNDS}</span></p><div className="round-pips" aria-label={`Round ${idx + 1} of ${ROUNDS}`}>{order.map((_, i) => <span key={i} className={i < idx ? "played" : i === idx ? "current" : ""} />)}</div></div>
      <QuestionTimer key={idx} running={!revealed} onExpire={() => reveal(input, true)} />
      <h2 className="mb-7 mt-5 font-display text-2xl leading-relaxed sm:text-3xl">{q.prompt}</h2>
      <form onSubmit={submit} className={`flex gap-3 ${revealed && !revealed.answer ? "reject-shake" : ""}`}>
        <label htmlFor="player-answer" className="sr-only">Footballer name</label>
        <input id="player-answer" autoFocus key={idx} value={input} disabled={Boolean(revealed)} onChange={e => setInput(e.target.value)} placeholder="Enter a footballer's name…" autoComplete="off" className="game-input text-base sm:text-lg" />
        {!revealed && <Button type="submit" disabled={!input.trim()} className="match-button"><span className="hidden sm:inline">SHOOT</span><ArrowRight aria-label="Shoot" /></Button>}
      </form>
      {revealed && <div className="mt-7 space-y-5" aria-live="polite">
        <KickAnimation key={idx} points={revealed.points} kicker={revealed.kicker} missed={!revealed.answer} />
        <div className="flex items-center justify-between gap-4"><div><span key={`badge-${idx}`} className={`rarity-badge ${tierClass(revealed.points)}`}>{rarityLabel(revealed.points)}</span><p className="mt-2 text-lg font-semibold">{revealed.answer?.name ?? (revealed.input ? `“${revealed.input}”` : "No answer")}</p><p className={revealed.answer ? "mt-1 text-sm text-muted-foreground" : "mt-1 text-sm text-destructive"}>{revealed.answer ? verdict(revealed.points) : (revealed.timedOut && !revealed.input ? "Time's up! " : "Not found for this question. ") + "The kicker swings and misses the ball. No points."}</p>
          {revealed.answer && <p className={`mt-1 text-lg ${tierClass(revealed.points)}`}>~{formatPct(revealed.answer.pct)}% of fans would name this player</p>}</div><span key={idx} className={`score-slam shrink-0 font-display text-5xl ${tierClass(revealed.points)}`}>+{revealed.points}</span></div>
        <Button onClick={next} className="match-button rise">{idx + 1 < ROUNDS ? "NEXT ROUND" : "FINAL SCORE"}<ArrowRight /></Button>
        <details className="archive-list py-3 text-sm"><summary className="text-muted-foreground">Accepted players ({sorted.length})</summary><div className="mt-3 grid gap-x-5 sm:grid-cols-2">{sorted.map(a => <div key={a.name} className={`archive-name flex justify-between gap-3 py-2 ${a === revealed.answer ? "text-primary" : "text-foreground"}`}><span>{a.name}</span><b>{scoreFor(a)}</b></div>)}</div></details>
      </div>}
    </section>}

    {idx >= ROUNDS && <section className={`screen-enter ${leaving ? "screen-leave" : ""} mx-auto w-full max-w-2xl py-10 text-center`}>
      <Trophy className="mx-auto mb-4 h-8 w-8 text-primary" /><p className="font-display text-sm text-accent">FULL TIME</p>
      <h2 className={`bloom my-5 font-display text-7xl ${total >= 600 ? "tier-4 gold-chip" : "text-primary"}`}>{total}<span className="ml-3 text-lg text-muted-foreground">/ 700</span></h2>
      <p className="mb-7 text-lg">{verdict(total / ROUNDS)}</p>
      <ol className="mb-8 text-left">{results.map((r, i) => <li key={i} className="archive-name flex items-center justify-between gap-3 py-3"><span className="w-6 font-display text-lg text-muted-foreground">{i + 1}</span><span className="flex-1">{r.answer?.name ?? `✗ ${r.input || "no answer"}`}</span><span className={`font-display text-xl ${tierClass(r.points)}`}>{r.points} M</span></li>)}</ol>
      <Button onClick={playAgain} className="match-button secondary"><RotateCcw />PLAY AGAIN</Button>
    </section>}
    <footer className="match-footer mx-auto mt-auto flex w-full max-w-5xl flex-wrap justify-between gap-3 pt-4 text-lg text-muted-foreground"><span className="font-display">{archiveCount.toLocaleString("en-US")} PLAYERS · {QUESTIONS.length} CATEGORIES</span><span>Rarity scores are estimates, not live player statistics.</span></footer>
  </main>;
}

function formatPct(pct: number) {
  return pct >= 10 ? Math.round(pct) : Math.round(pct * 10) / 10;
}

function tierClass(points: number) {
  return points <= 0 ? "tier-miss" : `tier-${kickerFor(points).tier}`;
}

function verdict(points: number) {
  if (points >= 85) return "A proper football encyclopedia.";
  if (points >= 65) return "Now that's a deep cut!";
  if (points >= 40) return "Nice pick. Not the obvious one.";
  if (points > 0) return "Correct, but a crowd favourite.";
  return "Off target. There's always the next match.";
}