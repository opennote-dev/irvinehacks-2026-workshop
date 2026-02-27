"use client";

import { useRef, useCallback } from "react";

interface EditorProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
}

export default function Editor({ value, onChange, placeholder }: EditorProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleInput = useCallback(() => {
    if (ref.current) {
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
