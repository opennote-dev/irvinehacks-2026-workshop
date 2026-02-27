"use client";

import { useState, useCallback, useEffect } from "react";
import GhostText from "@/components/GhostText";
import { useIdleDetection, useSuggestion } from "@/lib/hooks";

export default function SubtleGood() {
  const [text, setText] = useState("");
  const isIdle = useIdleDetection(text, 2000);
  const { suggestion, loading, fetchSuggestion, clearSuggestion } =
    useSuggestion();

  useEffect(() => {
    if (isIdle && text.length >= 20) {
      fetchSuggestion(text);
    }
  }, [isIdle, text, fetchSuggestion]);

  const handleAccept = useCallback(() => {
    setText((prev) => prev + suggestion);
    clearSuggestion();
  }, [suggestion, clearSuggestion]);

  const handleDismiss = useCallback(() => {
    clearSuggestion();
  }, [clearSuggestion]);

  return (
    <div>
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
