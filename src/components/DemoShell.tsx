"use client";

import { useState } from "react";

interface DemoShellProps {
  badDescription: string;
  goodDescription: string;
  badDemoText: string;
  goodDemoText: string;
  badDemoHint: string;
  goodDemoHint: string;
  bad: (demoText: string | null) => React.ReactNode;
  good: (demoText: string | null) => React.ReactNode;
}

export default function DemoShell({
  badDescription,
  goodDescription,
  badDemoText,
  goodDemoText,
  badDemoHint,
  goodDemoHint,
  bad,
  good,
}: DemoShellProps) {
  const [badLoaded, setBadLoaded] = useState(false);
  const [goodLoaded, setGoodLoaded] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-baseline justify-between mb-2">
          <div>
            <p className="text-xs font-medium text-accent-red uppercase tracking-wide">
              Bad
            </p>
            <p className="text-sm text-muted mt-1">{badDescription}</p>
          </div>
          {!badLoaded && (
            <button
              onClick={() => setBadLoaded(true)}
              className="shrink-0 ml-4 text-xs px-3 py-1.5 rounded-lg border border-border text-muted hover:text-foreground hover:border-foreground/20 transition-colors"
            >
              Load demo text
              <span className="text-muted/60 ml-1.5">{badDemoHint}</span>
            </button>
          )}
        </div>
        <div className="bg-surface border border-border rounded-xl p-2">
          {bad(badLoaded ? badDemoText : null)}
        </div>
      </div>
      <div>
        <div className="flex items-baseline justify-between mb-2">
          <div>
            <p className="text-xs font-medium text-accent-green uppercase tracking-wide">
              Good
            </p>
            <p className="text-sm text-muted mt-1">{goodDescription}</p>
          </div>
          {!goodLoaded && (
            <button
              onClick={() => setGoodLoaded(true)}
              className="shrink-0 ml-4 text-xs px-3 py-1.5 rounded-lg border border-border text-muted hover:text-foreground hover:border-foreground/20 transition-colors"
            >
              Load demo text
              <span className="text-muted/60 ml-1.5">{goodDemoHint}</span>
            </button>
          )}
        </div>
        <div className="bg-surface border border-border rounded-xl p-2">
          {good(goodLoaded ? goodDemoText : null)}
        </div>
      </div>
    </div>
  );
}
