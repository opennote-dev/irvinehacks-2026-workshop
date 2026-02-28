// ============================================================
// /api/suggest — Inline Suggestion Endpoint
// ============================================================
// This powers the ghost text suggestions in the "good" demos.
// Called by the useSuggestion hook in src/lib/hooks.ts.
//
// Design decisions:
//   - Non-streaming (returns complete JSON) — ghost text needs the
//     full suggestion at once, not token by token
//   - maxOutputTokens: 40 — keeps suggestions SHORT (a few words
//     to one sentence). Long suggestions feel overwhelming.
//   - Uses Cerebras Llama for speed — inline suggestions must feel
//     instant or they arrive after the user has moved on
//   - System prompt bans AI-sounding words ("delve", "crucial") to
//     make suggestions feel like natural continuations of the user's voice
// ============================================================

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
