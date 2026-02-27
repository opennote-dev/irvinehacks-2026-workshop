"use client";

import { useState, useEffect } from "react";
import Editor from "@/components/Editor";
import { useIdleDetection, useSuggestion } from "@/lib/hooks";

export default function TimingGood({ demoText }: { demoText?: string | null }) {
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
