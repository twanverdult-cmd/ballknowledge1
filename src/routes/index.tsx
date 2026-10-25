import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { ArrowRight, RotateCcw, Trophy } from "lucide-react";
import { QUESTIONS, ROUNDS, findAnswer, scoreFor, kickerFor, type Answer, type Kicker } from "@/lib/questions";
import { KickAnimation } from "@/components/KickAnimation";
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

type Result = { input: string; answer: Answer | undefined; points: number; kicker: Kicker };

function Game() {
  const deck = useRef<number[]>([]);
  const previousMatch = useRef<number[]>([]);
  const [order, setOrder] = useState(() => QUESTIONS.map((_, i) => i).slice(0, ROUNDS));
  const [idx, setIdx] = useState(-1);
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [revealed, setRevealed] = useState<Result | null>(null);
  const questionIndex = order[idx];
  const q = questionIndex === undefined ? undefined : QUESTIONS[questionIndex];
  const total = results.reduce((sum, r) => sum + r.points, 0);
  const sorted = useMemo(() => q ? [...q.answers].sort((a, b) => b.pct - a.pct || a.name.localeCompare(b.name)) : [], [q]);
  const archiveCount = new Set(QUESTIONS.flatMap(q => q.answers.map(a => a.name))).size;
  const start = () => {
    const match = drawMatch(QUESTIONS.length, deck.current, previousMatch.current);
    deck.current = match.remaining;
    previousMatch.current = match.order;
    setOrder(match.order); setResults([]); setRevealed(null); setInput(""); setIdx(0);
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q || revealed || !input.trim()) return;
    const answer = findAnswer(q, input); const points = scoreFor(answer);
    const result = { input: input.trim(), answer, points, kicker: kickerFor(points) };
    setRevealed(result); setResults(previous => [...previous, result]);
  };
  const next = () => { setRevealed(null); setInput(""); setIdx(i => i + 1); };

  return <main className="game-world flex flex-col px-5 pb-5 pt-9 sm:px-10">
    <PixelPitch />
    <header className="game-header mx-auto flex w-full max-w-5xl items-center justify-between gap-3 pb-5">
      <div className="pixel-brand min-w-0"><PixelBall /><h1 className="font-display text-xs sm:text-lg">BALL <span className="text-primary">KNOWLEDGE</span></h1></div>
      <div className="scoreboard flex items-center gap-4 px-3 py-2 sm:px-5"><span className="text-xs text-muted-foreground">{idx < 0 ? "HIGH SCORE" : "SCORE"}</span><span className="font-display text-lg text-primary">{idx < 0 ? "700" : String(total).padStart(3, "0")}</span></div>
    </header>

    {idx === -1 && <section className="opening mx-auto w-full max-w-3xl text-center">
      <p className="mb-4 font-display text-xs text-accent">THE NOT-SO-OBVIOUS FOOTBALL QUIZ</p>
      <h2 className="opening-title font-display">BALL<br /><span className="text-primary">KNOWLEDGE</span></h2>
      <p className="mt-5 text-lg">Everyone knows Messi. <span className="text-primary">Who knows Hleb?</span></p>
      <div className="my-7 flex items-center justify-center gap-5 font-display text-xs sm:gap-8"><span>7 ROUNDS</span><span className="text-border">/</span><span>100 M MAX</span></div>
      <Button onClick={start} className="match-button">KICK OFF <ArrowRight /></Button>
      <div className="opening-art"><PixelPlayer tier={2} /><PixelBall /><PixelPlayer tier={4} /></div>
    </section>}

    {q && idx >= 0 && <section className="mx-auto w-full max-w-2xl py-9 sm:py-12">
      <div className="mb-5 flex items-center justify-between"><p className="font-display text-xs text-accent">ROUND {idx + 1} <span className="text-muted-foreground">/ {ROUNDS}</span></p><div className="round-pips" aria-label={`Round ${idx + 1} of ${ROUNDS}`}>{order.map((_, i) => <span key={i} className={i < idx ? "played" : i === idx ? "current" : ""} />)}</div></div>
      <h2 className="mb-7 font-display text-2xl leading-relaxed sm:text-3xl">{q.prompt}</h2>
      <form onSubmit={submit} className="flex gap-3">
        <label htmlFor="player-answer" className="sr-only">Footballer name</label>
        <input id="player-answer" autoFocus key={idx} value={input} disabled={Boolean(revealed)} onChange={e => setInput(e.target.value)} placeholder="Enter a footballer's name…" autoComplete="off" className="game-input text-base sm:text-lg" />
        {!revealed && <Button type="submit" disabled={!input.trim()} className="match-button"><span className="hidden sm:inline">SHOOT</span><ArrowRight aria-label="Shoot" /></Button>}
      </form>
      {!revealed && <div className="mt-12 flex justify-center opacity-80"><PixelPlayer tier={1} className="h-24 w-16" /><PixelBall className="ml-4 mt-20 h-5 w-5" /></div>}
      {revealed && <div className="mt-7 space-y-5" aria-live="polite">
        <KickAnimation key={idx} points={revealed.points} kicker={revealed.kicker} />
        <div className="flex items-center justify-between gap-4"><div><p className="text-lg font-semibold">{revealed.answer?.name ?? `“${revealed.input}”`}</p><p className={revealed.answer ? "mt-1 text-sm text-muted-foreground" : "mt-1 text-sm text-destructive"}>{revealed.answer ? verdict(revealed.points) : "Not found for this question. No points this round."}</p></div><span className="shrink-0 font-display text-4xl text-primary">+{revealed.points}</span></div>
        <Button onClick={next} className="match-button">{idx + 1 < ROUNDS ? "NEXT ROUND" : "FINAL SCORE"}<ArrowRight /></Button>
        <details className="archive-list py-3 text-sm"><summary className="text-muted-foreground">Accepted players ({sorted.length})</summary><div className="mt-3 grid gap-x-5 sm:grid-cols-2">{sorted.map(a => <div key={a.name} className={`archive-name flex justify-between gap-3 py-2 ${a === revealed.answer ? "text-primary" : "text-foreground"}`}><span>{a.name}</span><b>{scoreFor(a)}</b></div>)}</div></details>
      </div>}
    </section>}

    {idx >= ROUNDS && <section className="mx-auto w-full max-w-2xl py-10 text-center">
      <Trophy className="mx-auto mb-4 h-8 w-8 text-primary" /><p className="font-display text-sm text-accent">FULL TIME</p>
      <h2 className="my-5 font-display text-6xl text-primary">{total}<span className="ml-3 text-lg text-muted-foreground">/ 700</span></h2>
      <p className="mb-7 text-lg">{verdict(total / ROUNDS)}</p>
      <ol className="mb-8 text-left">{results.map((r, i) => <li key={i} className="archive-name flex items-center justify-between gap-3 py-3"><span className="w-6 font-display text-xs text-muted-foreground">{i + 1}</span><span className="flex-1">{r.answer?.name ?? `✗ ${r.input}`}</span><span className="font-display text-primary">{r.points} M</span></li>)}</ol>
      <Button onClick={start} className="match-button"><RotateCcw />PLAY AGAIN</Button>
    </section>}
    <footer className="match-footer mx-auto mt-auto flex w-full max-w-5xl flex-wrap justify-between gap-3 pt-4 text-xs text-muted-foreground"><span className="font-display">{archiveCount.toLocaleString("en-US")} PLAYERS · {QUESTIONS.length} CATEGORIES</span><span>Rarity scores are estimates, not live player statistics.</span></footer>
  </main>;
}

function verdict(points: number) {
  if (points >= 85) return "A proper football encyclopedia.";
  if (points >= 65) return "Now that's a deep cut!";
  if (points >= 40) return "Nice pick. Not the obvious one.";
  if (points > 0) return "Correct, but a crowd favourite.";
  return "Off target. There's always the next match.";
}