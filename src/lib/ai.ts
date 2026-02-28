// ============================================================
// AI Model Configuration
// ============================================================
// We use two models for different purposes:
//
// 1. "llama" — Cerebras Llama 3.1 8B
//    - Used for inline suggestions (/api/suggest)
//    - Why: Cerebras is extremely fast (~100ms response time)
//    - Speed matters for inline suggestions — if the model is slow,
//      the ghost text appears after the user has already moved on
//    - A smaller model is fine here since we only need a few words
//
// 2. "claude" — Anthropic Claude Sonnet
//    - Used for the sidebar chat (/api/chat) in the "bad" inline demo
//    - More capable model for conversational interactions
//    - Speed matters less in a chat interface (user expects a moment)
//
// Key insight: Pick the model based on the UX context.
// Inline suggestions need SPEED. Chat needs QUALITY.
// ============================================================

import { cerebras } from "@ai-sdk/cerebras";
import { anthropic } from "@ai-sdk/anthropic";

export function model(name: "llama" | "claude") {
  if (name === "llama") return cerebras("llama3.1-8b");
  return anthropic("claude-sonnet-4-20250514");
}
