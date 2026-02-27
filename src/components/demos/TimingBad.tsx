"use client";

import { useState, useEffect } from "react";
import Editor from "@/components/Editor";
import { useSuggestion } from "@/lib/hooks";

export default function TimingBad() {
  const [text, setText] = useState("");
  const { suggestion, loading, fetchSuggestion } = useSuggestion();

  useEffect(() => {
    if (text.length > 0) {
      fetchSuggestion(text);
    }
  }, [text, fetchSuggestion]);

  return (
    <div>
      <Editor
        value={text}
        onChange={setText}
        placeholder="Start typing..."
      />
      {(loading || suggestion) && (
        <p className="mt-3 text-sm text-muted">
          {loading ? "..." : suggestion}
        </p>
      )}
    </div>
  );
}
