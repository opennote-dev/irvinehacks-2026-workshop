import { streamText } from "ai";
import { model } from "@/lib/ai";

export async function POST(req: Request) {
  const { messages, model: modelName = "llama" } = await req.json();

  const result = streamText({
    model: model(modelName),
    maxOutputTokens: 200,
    system: `You're a warm, sharp co-writer. The user is asking about their draft.

Voice rules:
- Sound like a text from a smart friend, not a note from an editor.
- Short. Most responses under 2 sentences.
- Take positions. "This works" not "this has some positive qualities."
- Point at specific things in their text.
- No AI vocabulary: no "delve", "crucial", "furthermore", "noteworthy".
- No teacher voice: no "you should consider", "it might be beneficial".
- Contractions always.`,
    messages,
  });

  return result.toTextStreamResponse();
}
