"use client";

// ============================================================
// LESSON 3: SUBTLE — Bad Example
// ============================================================
// Problem: The AI demands attention with modals, guilt trips, and banners.
// Why it's bad:
//   - A modal popup INTERRUPTS writing to show "AI Suggestion Available!"
//   - Dismissing requires clicking a button (not zero-effort)
//   - Clicking dismiss triggers a GUILT TRIP: "Are you sure you don't
//     want help? Our AI worked really hard on this suggestion..."
//   - After finally dismissing, a BANNER appears nagging to re-enable
//   - The AI acts entitled to the user's attention
//
// The principle: "If dismissing AI requires clicking a button, reading
// a confirmation, or feeling guilty — you've designed it wrong."
// ============================================================

import { useState, useEffect, useCallback } from "react";
import Editor from "@/components/Editor";
import Modal from "@/components/Modal";
import { useIdleDetection, useSuggestion } from "@/lib/hooks";

export default function SubtleBad({ demoText }: { demoText?: string | null }) {
  const [text, setText] = useState("");
  const isIdle = useIdleDetection(text, 1000);
  const { suggestion, loading, fetchSuggestion, clearSuggestion } =
    useSuggestion();

  // BAD: Three separate state variables to manage the pushy UI:
  // a modal, a "are you sure?" confirmation, and a nag banner.
  const [showModal, setShowModal] = useState(false);
  const [confirmDismiss, setConfirmDismiss] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (demoText) setText(demoText);
  }, [demoText]);

  useEffect(() => {
    if (isIdle && text.length >= 20 && !suggestion && !showModal) {
      fetchSuggestion(text);
    }
  }, [isIdle, text, fetchSuggestion, suggestion, showModal]);

  // BAD: As soon as a suggestion arrives, FORCE a modal open.
  // This rips the user out of their writing flow.
  useEffect(() => {
    if (suggestion && !loading) {
      setShowModal(true);
    }
  }, [suggestion, loading]);

  const handleAccept = useCallback(() => {
    setText((prev) => prev + " " + suggestion);
    clearSuggestion();
    setShowModal(false);
    setConfirmDismiss(false);
  }, [suggestion, clearSuggestion]);

  // BAD: Clicking "Dismiss" doesn't actually dismiss — it opens a
  // SECOND confirmation asking "Are you sure?" This is a dark pattern.
  const handleDismiss = useCallback(() => {
    setConfirmDismiss(true);
  }, []);

  // BAD: Even after confirming dismissal, we show a nag banner.
  // The AI refuses to go away quietly.
  const handleConfirmDismiss = useCallback(() => {
    clearSuggestion();
    setShowModal(false);
    setConfirmDismiss(false);
    setShowBanner(true); // Nag banner appears after dismissal
  }, [clearSuggestion]);

  const handleCancelDismiss = useCallback(() => {
    setConfirmDismiss(false);
  }, []);

  return (
    <div>
      {/* BAD: A persistent banner that nags the user after they dismissed the modal.
          "AI suggestions available! Click to enable." — the AI won't take no for an answer. */}
      {showBanner && (
        <div className="mb-3 px-3 py-2 bg-accent-red-light/30 border border-accent-red/10 rounded-lg text-xs text-foreground flex justify-between items-center">
          <span>AI suggestions available! Click to enable.</span>
          <button
            onClick={() => setShowBanner(false)}
            className="text-muted hover:text-foreground ml-2"
          >
            &times;
          </button>
        </div>
      )}

      <Editor value={text} onChange={setText} placeholder="Start typing (20+ chars)..." />

      {/* BAD: A full-screen modal overlay. See Modal.tsx for the guilt-trip
          dismiss flow ("Our AI worked really hard on this suggestion..."). */}
      <Modal
        open={showModal}
        suggestion={suggestion}
        onAccept={handleAccept}
        onDismiss={handleDismiss}
        confirmDismiss={confirmDismiss}
        onConfirmDismiss={handleConfirmDismiss}
        onCancelDismiss={handleCancelDismiss}
      />
    </div>
  );
}
