"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Returns true after `ms` milliseconds of `text` not changing.
 * Resets whenever `text` changes.
 */
export function useIdleDetection(text: string, ms: number): boolean {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsIdle(false);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setIsIdle(true);
    }, ms);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, ms]);

  return isIdle;
}

/**
 * Fetches a suggestion from /api/suggest.
 * Cancels in-flight requests when a new one is made.
 */
export function useSuggestion() {
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const fetchSuggestion = useCallback(async (text: string) => {
    // Cancel any in-flight request
    if (abortRef.current) abortRef.current.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setSuggestion("");

    try {
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error("Failed to fetch suggestion");

      const data = await res.json();
      setSuggestion(data.suggestion);
    } catch (e: unknown) {
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
