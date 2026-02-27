"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";

interface DemoLayoutProps {
  number: number;
  title: string;
  principle: string;
  description: string;
  insight: string;
  children: React.ReactNode;
  takeaway: string;
}

export default function DemoLayout({
  title,
  description,
  insight,
  children,
  takeaway,
}: DemoLayoutProps) {
  const [key, setKey] = useState(0);

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-foreground mb-1">{title}</h1>
          <p className="text-sm text-muted">{description}</p>
          {insight && (
            <p className="text-sm text-muted mt-2 italic">{insight}</p>
          )}
        </div>
        <button
          onClick={() => setKey((k) => k + 1)}
          className="shrink-0 ml-4 p-1.5 text-muted hover:text-foreground transition-colors"
          title="Reset demo"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div key={key}>
        {children}
      </div>

      <p className="mt-8 text-sm text-muted">
        <span className="font-medium text-foreground">Takeaway:</span>{" "}
        {takeaway}
      </p>
    </main>
  );
}
