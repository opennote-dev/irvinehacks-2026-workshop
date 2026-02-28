"use client";

// ============================================================
// Modal — The "bad" suggestion UI (used by SubtleBad)
// ============================================================
// This is an anti-pattern component. It demonstrates everything
// wrong with pushy AI interfaces:
//
//   1. Full-screen overlay blocks the editor — can't keep writing
//   2. "AI Suggestion Available!" demands immediate attention
//   3. Clicking "Dismiss" doesn't dismiss — it triggers a SECOND
//      confirmation: "Are you sure you don't want help?"
//   4. Guilt-trip copy: "Our AI worked really hard on this suggestion..."
//   5. The "keep suggestion" button is styled as primary (dark),
//      the "dismiss anyway" button is styled as secondary (subtle) —
//      nudging the user toward accepting
//
// Compare this to GhostText.tsx which achieves the same goal
// (showing a suggestion) with zero interruption.
// ============================================================

interface ModalProps {
    open: boolean;
    onAccept: () => void;
    onDismiss: () => void;
    suggestion: string;
    confirmDismiss?: boolean;
    onConfirmDismiss?: () => void;
    onCancelDismiss?: () => void;
}

export default function Modal({
    open,
    onAccept,
    onDismiss,
    suggestion,
    confirmDismiss,
    onConfirmDismiss,
    onCancelDismiss,
}: ModalProps) {
    if (!open) return null;

    return (
        // BAD: Full-screen dark overlay blocks everything behind it
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-layered border border-border">
                {confirmDismiss ? (
                    // BAD: Second screen — guilt-trip the user for saying "no"
                    <>
                        <h3 className="text-lg font-medium text-foreground mb-2 font-serif">
                            Are you sure you don&apos;t want help?
                        </h3>
                        <p className="text-muted text-sm mb-4">
                            {/* BAD: Emotional manipulation to make users feel bad about dismissing */}
                            Our AI worked really hard on this suggestion...
                        </p>
                        <div className="flex gap-3 justify-end">
                            {/* BAD: "Keep it" is styled as the primary action (dark button) */}
                            <button
                                onClick={onCancelDismiss}
                                className="px-4 py-2 bg-foreground text-bg text-sm rounded-lg hover:opacity-90 transition-opacity"
                            >
                                Show me the suggestion
                            </button>
                            {/* BAD: "Dismiss" is styled as secondary (border-only button) */}
                            <button
                                onClick={onConfirmDismiss}
                                className="px-4 py-2 border border-border text-sm rounded-lg hover:bg-surface transition-colors"
                            >
                                Dismiss anyway
                            </button>
                        </div>
                    </>
                ) : (
                    // BAD: First screen — interrupt with a big announcement
                    <>
                        <h3 className="text-lg font-medium text-foreground mb-2 font-serif">
                            AI Suggestion Available!
                        </h3>
                        <p className="text-muted text-sm mb-4 whitespace-pre-wrap">
                            {suggestion}
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={onAccept}
                                className="px-4 py-2 bg-foreground text-bg text-sm rounded-lg hover:opacity-90 transition-opacity"
                            >
                                Accept
                            </button>
                            <button
                                onClick={onDismiss}
                                className="px-4 py-2 border border-border text-sm rounded-lg hover:bg-surface transition-colors"
                            >
                                Dismiss
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
