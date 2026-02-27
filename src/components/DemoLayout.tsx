import Link from "next/link";

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
  children,
  takeaway,
}: DemoLayoutProps) {
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <Link
        href="/"
        className="text-sm text-muted hover:text-foreground transition-colors mb-8 inline-block"
      >
        &larr; Back
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-medium text-foreground mb-1">{title}</h1>
        <p className="text-sm text-muted">{description}</p>
      </div>

      {children}

      <p className="mt-8 text-sm text-muted">
        <span className="font-medium text-foreground">Takeaway:</span>{" "}
        {takeaway}
      </p>
    </main>
  );
}
