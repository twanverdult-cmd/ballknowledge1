import { describe, it, expect } from "vitest";
import { QUESTIONS, findAnswer, scoreFor } from "@/lib/questions";
const q = QUESTIONS[0];
describe("scoring", () => {
  it("rare answer beats obvious one", () => {
    expect(scoreFor(findAnswer(q, "saint kitts en nevis"))).toBeGreaterThan(scoreFor(findAnswer(q, "Spanje")));
  });
  it("wrong answer is 0", () => { expect(scoreFor(findAnswer(q, "Frankrijk"))).toBe(0); });
});
