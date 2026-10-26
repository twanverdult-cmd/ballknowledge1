import { describe, it, expect } from "vitest";
import { QUESTIONS, ROUNDS, findAnswer, scoreFor, kickerFor } from "@/lib/questions";
const q = QUESTIONS[1]; // Barcelona
if (!q) throw new Error("Missing Barcelona question");
describe("scoring", () => {
  it("obscure player beats obvious one", () => {
    expect(scoreFor(findAnswer(q, "hleb"))).toBeGreaterThan(scoreFor(findAnswer(q, "Messi")));
  });
  it("wrong answer is 0", () => { expect(scoreFor(findAnswer(q, "Pietje Puk"))).toBe(0); });
  it("max is 100", () => { expect(Math.max(...QUESTIONS.flatMap((x) => x.answers.map(scoreFor)))).toBeLessThanOrEqual(100); });
  it("7 rounds", () => { expect(ROUNDS).toBe(7); expect(QUESTIONS.length).toBeGreaterThanOrEqual(7); });
  it("high score gets Messi or Ronaldo", () => {
    expect(kickerFor(95, 0.1).name).toBe("Lionel Messi");
    expect(kickerFor(10).tier).toBe(0);
  });
});

describe("expanded player archive", () => {
  it("accepts previously missing historical and current players", () => {
    const cases = [[0, "Samir Nasri"], [1, "Dani Olmo"], [1, "Ricardo Quaresma"], [2, "Kees Kist"], [3, "Toni Kroos"], [4, "Adriano"], [5, "Steven Pienaar"], [6, "David de Gea"], [7, "Joshua Kimmich"], [8, "Xabi Alonso"]] as const;
    for (const [index, name] of cases) {
      const question = QUESTIONS[index];
      if (!question) throw new Error(`Missing category ${index}`);
      expect(findAnswer(question, name)?.name).toBe(name);
    }
  });
  it("matches punctuation, accents and known alternate spellings", () => {
    expect(findAnswer(q, "johan cruyff")?.name).toBe("Johan Cruijff");
    expect(findAnswer(q, "Samuel Etoo")?.name).toBe("Samuel Eto'o");
    expect(findAnswer(q, "RUSTU RECBER")?.name).toBe("Rüştü Reçber");
  });
  it("does not accept players for the wrong club", () => {
    expect(findAnswer(q, "Steven Gerrard")).toBeUndefined();
    expect(findAnswer(q, "Keirrison")).toBeUndefined();
  });
  it("rejects ambiguous surnames", () => {
    expect(findAnswer({ prompt: "Example", answers: [{ name: "Thomas Müller", pct: 10 }, { name: "Gerd Müller", pct: 5 }] }, "muller")).toBeUndefined();
  });
  it("contains thousands of distinct player names", () => {
    expect(new Set(QUESTIONS.flatMap(question => question.answers.map(answer => answer.name))).size).toBeGreaterThan(5000);
  });
});

describe("1-100 rarity scale", () => {
  const sorted = [...q.answers].sort((a, b) => b.pct - a.pct);
  it("most common answer scores 1", () => { expect(scoreFor(sorted[0])).toBe(1); });
  it("the 20 least common answers score 100", () => {
    for (const a of sorted.slice(-20)) expect(scoreFor(a)).toBe(100);
  });
});
