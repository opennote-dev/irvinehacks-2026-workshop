"use client";

// ============================================================
// LESSON 1: TIMING — Good Example
// ============================================================
// Key improvements over the bad version:
//   1. useIdleDetection — waits 1 second of no typing before fetching
//   2. Minimum 20 characters — ensures enough context for a useful suggestion
//   3. Clears suggestion when user resumes typing — no stale text
//
// Result: Suggestions only appear at natural pauses, feel like
// the AI is "reading your mind" instead of spamming you.
// ============================================================

import { useState, useEffect } from "react";
import Editor from "@/components/Editor";
import { useIdleDetection, useSuggestion } from "@/lib/hooks";

export default function TimingGood({ demoText }: { demoText?: string | null }) {
  const [text, setText] = useState("");

  // GOOD: Wait 1 second after the user stops typing before considering a suggestion.
  // This is the core of the "timing" principle — don't interrupt mid-thought.
  const isIdle = useIdleDetection(text, 1000);

  const { suggestion, loading, fetchSuggestion, clearSuggestion } =
    useSuggestion();

  useEffect(() => {
    if (demoText) setText(demoText);
  }, [demoText]);

  // GOOD: Only fetch when BOTH conditions are met:
  //   1. User has paused typing (isIdle = true)
  //   2. There's enough text for meaningful context (>= 20 chars)
  // This eliminates spam requests and produces better suggestions.
  useEffect(() => {
    if (isIdle && text.length >= 20) {
      fetchSuggestion(text);
    }
  }, [isIdle, text, fetchSuggestion]);

  // GOOD: When the user starts typing again, clear any visible suggestion.
  // Stale suggestions are worse than no suggestion at all.
  useEffect(() => {
    if (!isIdle && suggestion) {
      clearSuggestion();
    }
  }, [isIdle, suggestion, clearSuggestion]);

  return (
    <div>
      <Editor value={text} onChange={setText} placeholder="Start typing (20+ chars)..." />
      {(loading || suggestion) && (
        <p className="mt-3 text-sm text-muted suggestion-fade-in">
          {loading ? "..." : suggestion}
        </p>
      )}
    </div>
  );
}
