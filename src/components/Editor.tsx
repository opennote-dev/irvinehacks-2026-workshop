"use client";

// ============================================================
// Editor — Basic contentEditable text editor
// ============================================================
// A simple rich-text-free editor used by the "bad" demos and
// TimingGood. It has NO suggestion capabilities — just a plain
// text input area.
//
// Used by: TimingBad, TimingGood, InlineBad, SubtleBad
// NOT used by: InlineGood, SubtleGood (they use GhostText instead)
//
// The "good" inline/subtle demos swap this out for GhostText,
// which adds the ghost-text suggestion layer on top.
// ============================================================

import { useRef, useCallback, useEffect } from "react";

interface EditorProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
}

export default function Editor({ value, onChange, placeholder }: EditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Track whether we caused the change (to avoid infinite loops)
  const isInternalChange = useRef(false);

  // Sync external value changes into the contentEditable div
  useEffect(() => {
    if (ref.current && !isInternalChange.current) {
      if (ref.current.textContent !== value) {
        ref.current.textContent = value;
      }
    }
    isInternalChange.current = false;
  }, [value]);

  // When the user types, push the new text up to the parent
  const handleInput = useCallback(() => {
    if (ref.current) {
      isInternalChange.current = true;
      onChange(ref.current.textContent || "");
    }
  }, [onChange]);

  return (
    <div className="relative">
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className="min-h-[180px] px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:border-foreground/20 whitespace-pre-wrap text-[15px] leading-7 text-foreground transition-colors"
        data-placeholder={placeholder || "Start typing..."}
      />
      {!value && (
        <div className="absolute top-3 left-4 text-muted pointer-events-none text-[15px] leading-7 select-none">
          {placeholder || "Start typing..."}
        </div>
      )}
    </div>
  );
}
