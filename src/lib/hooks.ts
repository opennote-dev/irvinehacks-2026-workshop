"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// useIdleDetection — The foundation of good timing
// ============================================================
// This is what makes Lesson 1 (Timing) work. Instead of reacting
// to every keystroke, we wait for the user to PAUSE.
//
// How it works:
//   - Every time `text` changes, reset a timer
//   - If `text` stays the same for `ms` milliseconds, set isIdle = true
//   - As soon as `text` changes again, isIdle goes back to false
//
// This is a simple debounce pattern, but it's the single biggest
// improvement between the "bad" and "good" demos. Used by:
//   - TimingGood (waits 1s before suggesting)
//   - InlineGood (waits 1s before showing ghost text)
//   - SubtleBad (even the bad subtle demo uses good timing!)
//   - SubtleGood (same)
// ============================================================
export function useIdleDetection(text: string, ms: number): boolean {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // User is typing — not idle
    setIsIdle(false);

    // Clear any existing timer
    if (timerRef.current) clearTimeout(timerRef.current);

    // Start a new timer — if text doesn't change for `ms`, they're idle
    timerRef.current = setTimeout(() => {
      setIsIdle(true);
    }, ms);

    // Cleanup on unmount or re-render
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, ms]);

  return isIdle;
}

// ============================================================
// useSuggestion — Manages fetching AI suggestions
// ============================================================
// Shared by all demos (bad and good). The hook itself is neutral —
// what makes the UX good or bad is WHEN and HOW the caller uses it.
//
// Key design decisions:
//   - AbortController cancels in-flight requests when a new one starts
//     (prevents stale suggestions from arriving out of order)
//   - Automatically prepends a space if the text doesn't end with whitespace
//   - clearSuggestion() also aborts any pending request
// ============================================================
export function useSuggestion() {
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const fetchSuggestion = useCallback(async (text: string) => {
    // Cancel any in-flight request so we don't get stale results
    if (abortRef.current) abortRef.current.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setSuggestion("");

    try {
      // Calls the /api/suggest endpoint (see src/app/api/suggest/route.ts)
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
        signal: controller.signal, // Allows us to cancel this request
      });

      if (!res.ok) throw new Error("Failed to fetch suggestion");

      const data = await res.json();
      const raw = data.suggestion;

      // Smart spacing: add a space before the suggestion if the text
      // doesn't already end with whitespace
      const needsSpace = text.length > 0 && !/\s$/.test(text);
      setSuggestion(needsSpace ? " " + raw : raw);
    } catch (e: unknown) {
      // Ignore AbortError — that's expected when we cancel requests
      if (e instanceof Error && e.name !== "AbortError") {
        console.error("Suggestion error:", e);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSuggestion = useCallback(() => {
    setSuggestion("");
    if (abortRef.current) abortRef.current.abort();
  }, []);

  return { suggestion, loading, fetchSuggestion, clearSuggestion };
}
