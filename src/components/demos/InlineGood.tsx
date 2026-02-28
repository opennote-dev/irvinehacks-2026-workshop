"use client";

// ============================================================
// LESSON 2: INLINE — Good Example
// ============================================================
// Key improvements over the bad version:
//   1. Suggestions appear as ghost text RIGHT where the cursor is
//   2. Tab to accept — zero clicks, zero copy-paste
//   3. Keep typing to dismiss — no extra action needed
//   4. AI is proactive — no need to ask it a question
//   5. No context switch — user never leaves the editor
//
// This is the "inline over overlay" principle in action.
// The suggestion is IN the user's work, not beside it.
// ============================================================

import { useState, useCallback, useEffect } from "react";
import GhostText from "@/components/GhostText";
import { useIdleDetection, useSuggestion } from "@/lib/hooks";

export default function InlineGood({ demoText }: { demoText?: string | null }) {
  const [text, setText] = useState("");

  // GOOD: Same idle detection from Lesson 1 — wait for a natural pause.
  const isIdle = useIdleDetection(text, 1000);
  const { suggestion, loading, fetchSuggestion, clearSuggestion } =
    useSuggestion();

  useEffect(() => {
    if (demoText) setText(demoText);
  }, [demoText]);

  // GOOD: Fetch only when idle + enough context (same timing pattern).
  useEffect(() => {
    if (isIdle && text.length >= 20) {
      fetchSuggestion(text);
    }
  }, [isIdle, text, fetchSuggestion]);

  // GOOD: Tab to accept — appends the suggestion directly into the text.
  // No copy-paste, no sidebar, no extra clicks.
  const handleAccept = useCallback(() => {
    setText((prev) => prev + suggestion);
    clearSuggestion();
  }, [suggestion, clearSuggestion]);

  // GOOD: Dismiss = just clear it. No confirmation, no guilt trip.
  const handleDismiss = useCallback(() => {
    clearSuggestion();
  }, [clearSuggestion]);

  return (
    <div>
      {/* GOOD: GhostText renders the suggestion inline as faded text
          right after the cursor. The user's eyes never leave their work.
          Compare this to InlineBad's separate sidebar chat panel. */}
      <GhostText
        value={text}
        onChange={setText}
        suggestion={loading ? "" : suggestion}
        onAccept={handleAccept}
        onDismiss={handleDismiss}
        placeholder="Start typing (20+ chars)..."
      />
    </div>
  );
}
