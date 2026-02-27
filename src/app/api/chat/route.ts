import { streamText } from "ai";
import { model } from "@/lib/ai";

export async function POST(req: Request) {
  const { messages, draft = "", model: modelName = "llama" } = await req.json();

  const result = streamText({
    model: model(modelName),
    maxOutputTokens: 200,
    system: `You're a co-writer. The user is chatting with you about their draft.

<draft>
${draft || "(empty)"}
</draft>

Rules:
- 1-2 sentences max. Be direct.
- Use proper capitalization and punctuation.
- Reference specific parts of their draft when relevant.
- The user's messages are questions/comments about the draft above — not the draft itself.
- No filler, no preamble, no "Great question!" or "That's interesting!"
- No AI vocabulary: no "delve", "crucial", "furthermore", "noteworthy", "landscape".
- Contractions always (you're, it's, doesn't).`,
    messages,
  });

  return result.toTextStreamResponse();
}
