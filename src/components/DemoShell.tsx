"use client";

interface DemoShellProps {
  badDescription: string;
  goodDescription: string;
  bad: React.ReactNode;
  good: React.ReactNode;
}

export default function DemoShell({
  badDescription,
  goodDescription,
  bad,
  good,
}: DemoShellProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium text-accent-red uppercase tracking-wide">
          Bad
        </p>
        <p className="text-sm text-muted mt-1 mb-2">{badDescription}</p>
        <div className="bg-surface border border-border rounded-xl p-2">
          {bad}
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-accent-green uppercase tracking-wide">
          Good
        </p>
        <p className="text-sm text-muted mt-1 mb-2">{goodDescription}</p>
        <div className="bg-surface border border-border rounded-xl p-2">
          {good}
        </div>
      </div>
    </div>
  );
}
