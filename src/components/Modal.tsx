"use client";

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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-layered border border-border">
        {confirmDismiss ? (
          <>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Are you sure you don&apos;t want help?
            </h3>
            <p className="text-muted text-sm mb-4">
              Our AI worked really hard on this suggestion...
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={onCancelDismiss}
                className="px-4 py-2 bg-foreground text-bg text-sm rounded-lg hover:opacity-90 transition-opacity"
              >
                Show me the suggestion
              </button>
              <button
                onClick={onConfirmDismiss}
                className="px-4 py-2 border border-border text-sm rounded-lg hover:bg-surface transition-colors"
              >
                Dismiss anyway
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-lg font-medium text-foreground mb-2">
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
