"use client";

import { useState, useEffect, useCallback } from "react";
import Editor from "@/components/Editor";
import Modal from "@/components/Modal";
import { useIdleDetection, useSuggestion } from "@/lib/hooks";

export default function SubtleBad({ demoText }: { demoText?: string | null }) {
  const [text, setText] = useState("");
  const isIdle = useIdleDetection(text, 1000);
  const { suggestion, loading, fetchSuggestion, clearSuggestion } =
    useSuggestion();

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

  const handleDismiss = useCallback(() => {
    setConfirmDismiss(true);
  }, []);

  const handleConfirmDismiss = useCallback(() => {
    clearSuggestion();
    setShowModal(false);
    setConfirmDismiss(false);
    setShowBanner(true);
  }, [clearSuggestion]);

  const handleCancelDismiss = useCallback(() => {
    setConfirmDismiss(false);
  }, []);

  return (
    <div>
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
