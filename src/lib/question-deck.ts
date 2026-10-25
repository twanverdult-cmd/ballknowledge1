import { ROUNDS } from "./questions";

function shuffle(items: number[], random: () => number) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const a = result[i]; const b = result[j];
    if (a !== undefined && b !== undefined) { result[i] = b; result[j] = a; }
  }
  return result;
}

export function drawMatch(count: number, remaining: number[] = [], previous: number[] = [], random = Math.random) {
  if (count < ROUNDS * 2) throw new Error("At least 14 questions are required for fresh consecutive matches.");
  const valid = [...new Set(remaining)].filter(index => index >= 0 && index < count && !previous.includes(index));
  const order = valid.slice(0, ROUNDS);
  let rest = valid.slice(ROUNDS);
  if (order.length < ROUNDS) {
    const refill = shuffle(Array.from({ length: count }, (_, i) => i).filter(i => !order.includes(i) && !previous.includes(i)), random);
    order.push(...refill.slice(0, ROUNDS - order.length));
    rest = shuffle(Array.from({ length: count }, (_, i) => i).filter(i => !order.includes(i)), random);
  }
  return { order, remaining: rest };
}