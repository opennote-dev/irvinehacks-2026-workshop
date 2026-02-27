import { cerebras } from "@ai-sdk/cerebras";
import { anthropic } from "@ai-sdk/anthropic";

export function model(name: "llama" | "claude") {
  if (name === "llama") return cerebras("llama3.1-8b");
  return anthropic("claude-sonnet-4-20250514");
}
