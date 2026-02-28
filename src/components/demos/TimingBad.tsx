"use client";

// ============================================================
// LESSON 1: TIMING — Bad Example
// ============================================================
// Problem: This fires an API call on EVERY single keystroke.
// Why it's bad:
//   - No debounce or idle detection — typing "hello" = 5 API calls
//   - Suggestions flicker constantly as new responses arrive
//   - Wastes API quota and adds server load
//   - Suggestions based on partial words are useless ("hel" -> ???)
//   - No minimum text length — even 1 character triggers a fetch
// ============================================================

import { useState, useEffect } from "react";
import Editor from "@/components/Editor";
import { useSuggestion } from "@/lib/hooks";

export default function TimingBad({ demoText }: { demoText?: string | null }) {
  const [text, setText] = useState("");
  const { suggestion, loading, fetchSuggestion } = useSuggestion();

  useEffect(() => {
    if (demoText) setText(demoText);
  }, [demoText]);

  // BAD: This effect runs every time `text` changes — i.e., every keystroke.
  // There's no debounce, no idle check, and no minimum length.
  // Compare this to TimingGood which waits for the user to pause.
  useEffect(() => {
    if (text.length > 0) {
      fetchSuggestion(text); // Fires on every keystroke!
    }
  }, [text, fetchSuggestion]);

  return (
    <div>
      <Editor value={text} onChange={setText} placeholder="Start typing..." />
      {/* BAD: Suggestion area flickers between "..." and the result constantly */}
      {(loading || suggestion) && (
        <p className="mt-3 text-sm text-muted">
          {loading ? "..." : suggestion}
        </p>
      )}
    </div>
  );
}
