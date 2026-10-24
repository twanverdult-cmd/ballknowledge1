import { describe, it, expect } from "vitest";
import { QUESTIONS, ROUNDS, findAnswer, scoreFor, kickerFor } from "@/lib/questions";
const q = QUESTIONS[1]!; // Barcelona
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
