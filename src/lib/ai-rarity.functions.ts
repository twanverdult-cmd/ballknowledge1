import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type AiVerdict = { valid: boolean; name: string; points: number; reason: string };

/** Asks Lovable AI whether a name fits the question and how rare it is (1 = most named, 100 = deep cut). */
export const rateAnswerWithAi = createServerFn({ method: "POST" })
  .inputValidator(z.object({ prompt: z.string().min(1).max(200), name: z.string().min(1).max(80) }))
  .handler(async ({ data }): Promise<AiVerdict | { error: string }> => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) return { error: "AI is not configured." };
    const { createOpenAI } = await import("@ai-sdk/openai");
    const { streamText } = await import("ai");
    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });
    try {
      const result = streamText({
        model: provider.responses("openai/gpt-6-astra"),
        system:
          "You judge answers in a football trivia game. Decide if the typed name is a real professional footballer who fits the question (allow small typos and surname-only answers if unambiguous). " +
          "Rate rarity from 1 to 100: 1 = the single most common answer fans would give, 100 = only the most obscure players (the rarest ~20 possible answers). " +
          'Reply ONLY with JSON: {"valid":boolean,"name":"full canonical name","points":integer 1-100,"reason":"short English reason"}.',
        prompt: `Question: ${data.prompt}\nTyped answer: ${data.name}`,
        providerOptions: { openai: { store: false, forceReasoning: true, reasoningEffort: "low", reasoningSummary: "auto", include: ["reasoning.encrypted_content"] } },
      });
      const text = await result.text;
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
