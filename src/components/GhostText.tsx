"use client";

import { useRef, useCallback, useEffect, useState } from "react";

interface GhostTextProps {
  value: string;
  onChange: (text: string) => void;
  suggestion: string;
  onAccept: () => void;
  onDismiss: () => void;
  placeholder?: string;
}

export default function GhostText({
  value,
  onChange,
  suggestion,
  onAccept,
  onDismiss,
  placeholder,
}: GhostTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const sel = window.getSelection();
    const range = sel?.rangeCount ? sel.getRangeAt(0) : null;
    const cursorOffset = range ? range.startOffset : 0;

    const textNode = document.createTextNode(value);
    ref.current.innerHTML = "";
    ref.current.appendChild(textNode);

    if (suggestion) {
      const ghost = document.createElement("span");
      ghost.className = "ghost-text";
      ghost.textContent = suggestion;
      ghost.contentEditable = "false";
      ref.current.appendChild(ghost);
    }

    if (hasFocus && sel) {
      const newRange = document.createRange();
      const textNodes = Array.from(ref.current.childNodes).filter(
        (n) => n.nodeType === Node.TEXT_NODE
      );
      const targetNode = textNodes[0] || ref.current;
      const offset = Math.min(
        cursorOffset,
        targetNode.textContent?.length || 0
      );
      newRange.setStart(targetNode, offset);
      newRange.collapse(true);
      sel.removeAllRanges();
      sel.addRange(newRange);
    }
  }, [value, suggestion, hasFocus]);

  const handleInput = useCallback(() => {
    if (!ref.current) return;

    const nodes = Array.from(ref.current.childNodes);
    const realText = nodes
      .filter((n) => !((n as HTMLElement).classList?.contains("ghost-text")))
      .map((n) => n.textContent || "")
      .join("");

    onChange(realText);

    if (suggestion) {
      onDismiss();
    }
  }, [onChange, suggestion, onDismiss]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Tab" && suggestion) {
        e.preventDefault();
        onAccept();
      }
    },
    [suggestion, onAccept]
  );

  return (
    <div className="relative">
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        className="min-h-[180px] px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:border-foreground/20 whitespace-pre-wrap text-[15px] leading-7 text-foreground transition-colors"
      />
      {!value && !suggestion && (
        <div className="absolute top-3 left-4 text-muted pointer-events-none text-[15px] leading-7 select-none">
          {placeholder || "Start typing..."}
        </div>
      )}
    </div>
  );
}
