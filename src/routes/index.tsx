import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { QUESTIONS, findAnswer, scoreFor, type Answer } from "@/lib/questions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zeldzaam — hoe obscuur is jouw antwoord?" },
      { name: "description", content: "Quizspel: hoe zeldzamer je juiste antwoord, hoe meer punten." },
      { property: "og:title", content: "Zeldzaam — de quiz waar obscuur wint" },
      { property: "og:description", content: "Spanje is makkelijk. Saint Kitts en Nevis bewijst dat je het weet." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Game,
});

type Result = { input: string; answer?: Answer | undefined; points: number };

function shuffle<T>(a: T[]) {
  return [...a].sort(() => Math.random() - 0.5);
}

function Game() {
  const [order, setOrder] = useState(() => QUESTIONS.map((_, i) => i));
  const [idx, setIdx] = useState(-1);
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [revealed, setRevealed] = useState<Result | null>(null);

  const q = idx >= 0 && idx < order.length ? QUESTIONS[order[idx]!]! : null;
  const total = results.reduce((s, r) => s + r.points, 0);
  const sorted = useMemo(() => (q ? [...q.answers].sort((a, b) => b.pct - a.pct) : []), [q]);

  const start = () => {
    setOrder(shuffle(QUESTIONS.map((_, i) => i)));
    setResults([]);
    setRevealed(null);
    setInput("");
    setIdx(0);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q || revealed || !input.trim()) return;
    const answer = findAnswer(q, input);
    const r = { input, answer, points: scoreFor(answer) };
    setRevealed(r);
    setResults((p) => [...p, r]);
  };

  const next = () => {
    setRevealed(null);
    setInput("");
    setIdx((i) => i + 1);
  };

  return (
    <main className="min-h-screen bg-background text-foreground font-body flex flex-col items-center px-4 py-10">
      <header className="w-full max-w-2xl flex items-baseline justify-between mb-10">
        <h1 className="font-display text-4xl tracking-tight">
          Zeld<span className="text-primary">zaam</span>
        </h1>
        {idx >= 0 && <span className="font-display text-2xl tabular-nums">{total} pt</span>}
      </header>

      {idx === -1 && (
        <section className="max-w-2xl text-center space-y-6 mt-10">
          <p className="font-display text-5xl leading-tight">
            Iedereen kent Spanje.<br />
            <span className="text-primary">Wie kent Saint Kitts en Nevis?</span>
          </p>
          <p className="text-muted-foreground text-lg">
            Je krijgt {QUESTIONS.length} vragen. Geef één antwoord per vraag. Hoe zeldzamer je juiste antwoord, hoe meer punten (max 100).
          </p>
          <button onClick={start} className="btn-game">Start</button>
        </section>
      )}

      {q && (
        <section className="w-full max-w-2xl card-game">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
            Vraag {idx + 1} / {order.length}
          </p>
          <h2 className="font-display text-3xl mb-6">{q.prompt}</h2>
          <form onSubmit={submit} className="flex gap-3">
            <input
              autoFocus
              value={input}
              disabled={!!revealed}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Jouw antwoord…"
              className="flex-1 rounded-xl border-2 border-border bg-background px-4 py-3 text-lg outline-none focus:border-primary"
            />
            {!revealed && <button className="btn-game">Check</button>}
          </form>

          {revealed && (
            <div className="mt-6 space-y-5 animate-in fade-in slide-in-from-bottom-2">
              {revealed.answer ? (
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-muted-foreground">
                      {revealed.answer.name} — gegeven door ~{revealed.answer.pct}% van de spelers
                    </p>
                    <p className="font-display text-xl">{verdict(revealed.points)}</p>
                  </div>
                  <span className="font-display text-6xl text-primary tabular-nums">+{revealed.points}</span>
                </div>
              ) : (
                <p className="font-display text-xl text-destructive">
                  "{revealed.input}" telt niet (of kennen we niet). 0 punten.
                </p>
              )}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Alle antwoorden, van voor de hand liggend tot obscuur:</p>
                <div className="flex flex-wrap gap-2">
                  {sorted.map((a) => (
                    <span
                      key={a.name}
                      className={`chip ${a === revealed.answer ? "chip-hit" : ""}`}
                    >
                      {a.name} <b>{scoreFor(a)}</b>
                    </span>
                  ))}
                </div>
              </div>
              <button onClick={next} className="btn-game">
                {idx + 1 < order.length ? "Volgende" : "Uitslag"}
              </button>
            </div>
          )}
        </section>
      )}

      {idx >= order.length && (
        <section className="max-w-2xl w-full card-game text-center space-y-4">
          <p className="text-muted-foreground uppercase tracking-widest text-sm">Eindscore</p>
          <p className="font-display text-7xl text-primary">{total}</p>
          <p className="font-display text-2xl">{verdict(total / order.length)}</p>
          <ul className="text-left space-y-1">
            {results.map((r, i) => (
              <li key={i} className="flex justify-between border-b border-border py-1">
                <span>{r.answer?.name ?? `✗ ${r.input}`}</span>
                <span className="tabular-nums">{r.points}</span>
              </li>
            ))}
          </ul>
          <button onClick={start} className="btn-game">Nog een keer</button>
        </section>
      )}
    </main>
  );
}

function verdict(p: number) {
  if (p >= 85) return "Expertniveau. Niemand had dit.";
  if (p >= 65) return "Indrukwekkend obscuur!";
  if (p >= 40) return "Netjes, bovengemiddeld.";
  if (p > 0) return "Klopt, maar dat zei iedereen.";
  return "Helaas.";
}
