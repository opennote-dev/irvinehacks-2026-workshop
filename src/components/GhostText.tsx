"use client";

// ============================================================
// GhostText — The core "good" UI pattern
// ============================================================
// This component is what makes inline suggestions work. It extends
// a contentEditable div to show AI suggestions as faded text right
// after the user's cursor.
//
// Used by: InlineGood, SubtleGood (the "good" demos for Lessons 2 & 3)
//
// Key interactions:
//   - Tab → accept the suggestion (appends to text)
//   - Keep typing → dismiss the suggestion (it disappears silently)
//   - No buttons, no modals, no clicks needed
//
// This is the "inline over overlay" and "make it subtle" principles
// working together in a single component.
// ============================================================

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

  // Render the editor content: real text + ghost suggestion
  useEffect(() => {
    if (!ref.current) return;

    // Save cursor position before we modify the DOM
    const sel = window.getSelection();
    const range = sel?.rangeCount ? sel.getRangeAt(0) : null;
    const cursorOffset = range ? range.startOffset : 0;

    // Rebuild the contentEditable content:
    // 1. A text node with the user's actual text
    const textNode = document.createTextNode(value);
    ref.current.innerHTML = "";
    ref.current.appendChild(textNode);

    // 2. If there's a suggestion, append it as a non-editable span
    //    with the "ghost-text" CSS class (faded, gray appearance)
    if (suggestion) {
      const ghost = document.createElement("span");
      ghost.className = "ghost-text";
      ghost.textContent = suggestion;
      ghost.contentEditable = "false"; // User can't edit the ghost text
      ref.current.appendChild(ghost);
    }

    // Restore cursor position so typing isn't interrupted
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

  // When the user types, extract only the real text (ignore ghost spans)
  // and dismiss any active suggestion — typing = "no thanks"
  const handleInput = useCallback(() => {
    if (!ref.current) return;

    // Filter out the ghost-text span to get only what the user typed
    const nodes = Array.from(ref.current.childNodes);
    const realText = nodes
      .filter((n) => !((n as HTMLElement).classList?.contains("ghost-text")))
      .map((n) => n.textContent || "")
      .join("");

    onChange(realText);

    // Any typing dismisses the suggestion — zero-effort "no"
    if (suggestion) {
      onDismiss();
    }
  }, [onChange, suggestion, onDismiss]);

  // Tab key = accept the suggestion
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Tab" && suggestion) {
        e.preventDefault(); // Don't move focus away
        onAccept(); // Append suggestion to text
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
