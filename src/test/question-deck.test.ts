import { describe, expect, it } from "vitest";
import { drawMatch } from "@/lib/question-deck";
import { QUESTIONS, ROUNDS, findAnswer } from "@/lib/questions";

describe("fresh matches", () => {
  it("draws seven different questions per match", () => {
    const match = drawMatch(QUESTIONS.length);
    expect(match.order).toHaveLength(7);
    expect(new Set(match.order).size).toBe(7);
  });
  it("never repeats a question from the previous match, including deck refills", () => {
    let remaining: number[] = []; let previous: number[] = [];
    for (let i = 0; i < 50; i++) {
      const match = drawMatch(QUESTIONS.length, remaining, previous);
      expect(match.order.filter(index => previous.includes(index))).toEqual([]);
      remaining = match.remaining; previous = match.order;
    }
  });
  it("consumes unseen questions before reshuffling", () => {
    const first = drawMatch(QUESTIONS.length);
    const second = drawMatch(QUESTIONS.length, first.remaining, first.order);
    const third = drawMatch(QUESTIONS.length, second.remaining, second.order);
    expect(new Set([...first.order, ...second.order, ...third.order]).size).toBe(ROUNDS * 3);
  });
  it("accepts senior players in the new categories and rejects wrong membership", () => {
    const arsenal = QUESTIONS.find(q => q.answers.some(a => a.name === "Oleg Luzhny"));
    if (!arsenal) throw new Error("Missing Arsenal category");
    expect(findAnswer(arsenal, "Thierry Henry")?.name).toBe("Thierry Henry");
    expect(findAnswer(arsenal, "Wayne Rooney")).toBeUndefined();
  });
});