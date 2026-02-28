"use client";

// ============================================================
// LESSON 3: SUBTLE — Good Example
// ============================================================
// Key improvements over the bad version:
//   1. No modal — suggestion appears as quiet ghost text inline
//   2. No confirmation to dismiss — just keep typing and it's gone
//   3. No banner, no nag, no guilt — AI gives back screen space immediately
//   4. Saying "no" costs ZERO effort (keep typing = dismiss)
//   5. Saying "yes" costs minimal effort (Tab = accept)
//
// The principle: "The default state should be: AI is invisible.
// It earns screen space by being useful, and gives it back
// immediately when it's not."
//
// Notice this component is nearly identical to InlineGood —
// good timing + inline + subtle all reinforce each other.
// ============================================================

import { useState, useCallback, useEffect } from "react";
import GhostText from "@/components/GhostText";
import { useIdleDetection, useSuggestion } from "@/lib/hooks";

export default function SubtleGood({ demoText }: { demoText?: string | null }) {
  const [text, setText] = useState("");
  const isIdle = useIdleDetection(text, 1000);
  const { suggestion, loading, fetchSuggestion, clearSuggestion } =
    useSuggestion();

  useEffect(() => {
    if (demoText) setText(demoText);
  }, [demoText]);

  useEffect(() => {
    if (isIdle && text.length >= 20) {
      fetchSuggestion(text);
    }
  }, [isIdle, text, fetchSuggestion]);

  // GOOD: Accept = append text. That's it. No modal to close, no state to reset.
  const handleAccept = useCallback(() => {
    setText((prev) => prev + suggestion);
    clearSuggestion();
  }, [suggestion, clearSuggestion]);

  // GOOD: Dismiss = clear it. No "are you sure?", no guilt, no banner.
  // The AI just quietly goes away.
  const handleDismiss = useCallback(() => {
    clearSuggestion();
  }, [clearSuggestion]);

  return (
    <div>
      {/* GOOD: Ghost text — present but never pushy. The user barely notices
          the AI is there until they want it. Compare this to SubtleBad's
          full-screen modal with guilt-trip dismiss flow. */}
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
