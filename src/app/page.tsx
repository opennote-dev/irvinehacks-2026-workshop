import Link from "next/link";
import { ArrowRight } from "lucide-react";

const demos = [
    {
        number: 1,
        title: "Timing",
        description: "When should AI respond?",
        href: "/timing",
    },
    {
        number: 2,
        title: "Inline",
        description: "Where should suggestions appear?",
        href: "/inline",
    },
    {
        number: 3,
        title: "Subtle",
        description: "How assertive should AI be?",
        href: "/subtle",
    },
];

export default function Home() {
    return (
        <main className="max-w-5xl mx-auto px-6 py-16">
            <h1 className="text-3xl font-medium text-foreground mb-1 font-serif">
                Making AI Feel Human
            </h1>
            <p className="text-muted text-sm mb-10">
                3 UX principles for better AI interfaces.
            </p>

            <div className="grid gap-3">
                {demos.map((demo) => (
                    <Link
                        key={demo.href}
                        href={demo.href}
                        className="group flex items-center justify-between bg-surface border border-border rounded-xl px-5 py-4 hover:border-foreground/15 transition-colors"
                    >
                        <div className="flex items-baseline gap-3">
                            <span className="text-xs text-muted">
                                {demo.number}
                            </span>
                            <span className="text-foreground font-medium font-serif">
                                {demo.title}
                            </span>
                            <span className="text-sm text-muted">
                                {demo.description}
                            </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted group-hover:text-foreground transition-colors" />
                    </Link>
                ))}
            </div>
        </main>
    );
}
