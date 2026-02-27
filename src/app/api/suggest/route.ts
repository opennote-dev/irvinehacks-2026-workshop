import { generateText } from "ai";
import { model } from "@/lib/ai";

export async function POST(req: Request) {
  const { text } = await req.json();

  const { text: suggestion } = await generateText({
    model: model("llama"),
    maxOutputTokens: 40,
    system: `Continue the user's text with a few words to one short sentence. Be brief.

Rules:
- Match their tone. Use proper capitalization and punctuation.
- No AI vocabulary: no "delve", "crucial", "furthermore", "landscape", "leverage".
- No meta-commentary. No quotes, no explanation, no preamble.
- Just write the next few words.`,
    prompt: text,
  });

  return Response.json({ suggestion: suggestion.trim() });
}
