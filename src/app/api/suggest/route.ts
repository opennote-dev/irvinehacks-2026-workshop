import { generateText } from "ai";
import { model } from "@/lib/ai";

export async function POST(req: Request) {
  const { text } = await req.json();

  const { text: suggestion } = await generateText({
    model: model("llama"),
    maxOutputTokens: 80,
    system: `You're a sharp co-writer sitting next to someone. Continue their text naturally — 1-2 sentences max.

Rules:
- Match their tone and energy. If they're casual, be casual. If formal, adjust.
- Use proper capitalization and punctuation. Write like a normal person, not all lowercase.
- No AI vocabulary: never use "delve", "crucial", "furthermore", "landscape", "leverage", "robust".
- No meta-commentary: never say "I think", "I noticed", "here's a suggestion".
- Contractions always (you're, it's, doesn't).
- Just write the next words. No quotes, no explanation, no preamble.`,
    prompt: text,
  });

  return Response.json({ suggestion: suggestion.trim() });
}
