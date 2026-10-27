import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type AiVerdict = { valid: boolean; name: string; points: number; reason: string };

/** Asks Lovable AI whether a name fits the question and how rare it is (1 = most named, 100 = deep cut). */
export const rateAnswerWithAi = createServerFn({ method: "POST" })
  .inputValidator(z.object({ prompt: z.string().min(1).max(200), name: z.string().min(1).max(80) }))
  .handler(async ({ data }): Promise<AiVerdict | { error: string }> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) return { error: "AI is not configured." };
    try {
      // Fast lightweight model so the VAR check answers in about a second.
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "X-Lovable-AIG-SDK": "fetch" },
        body: JSON.stringify({
          model: "google/gemini-3.1-flash-lite",
          messages: [
            { role: "system", content:
              "You judge answers in a football trivia game. Decide if the typed name is a real professional footballer who fits the question (allow small typos and surname-only answers if unambiguous). " +
              "Rate rarity from 1 to 100: 1 = the single most common answer fans would give, use the full range smoothly; the 5 most common answers = 1, the 5 rarest possible answers = 100. " +
              'Reply ONLY with JSON: {"valid":boolean,"name":"full canonical name","points":integer 1-100,"reason":"short English reason"}.' },
            { role: "user", content: `Question: ${data.prompt}\nTyped answer: ${data.name}` },
          ],
        }),
      });
      if (!res.ok) throw Object.assign(new Error(`AI ${res.status}`), { statusCode: res.status });
      const body = await res.json() as { choices?: { message?: { content?: string } }[] };
      const text = body.choices?.[0]?.message?.content ?? "";
      const json = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1));
      const points = Math.max(1, Math.min(100, Math.round(Number(json.points) || 1)));
      return { valid: Boolean(json.valid), name: String(json.name || data.name).slice(0, 80), points, reason: String(json.reason || "").slice(0, 200) };
    } catch (error) {
      const status = (error as { statusCode?: number }).statusCode;
      if (status === 402) return { error: "AI credits are used up." };
      if (status === 429) return { error: "AI is busy, try again in a moment." };
      console.error("AI rarity failed", error);
      return { error: "AI check failed." };
    }
  });
