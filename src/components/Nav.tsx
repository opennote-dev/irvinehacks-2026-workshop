"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/timing", label: "Timing" },
    { href: "/inline", label: "Inline" },
    { href: "/subtle", label: "Subtle" },
];

export default function Nav() {
    const pathname = usePathname();

    return (
        <nav className="border-b border-border bg-surface/50">
            <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
                <Link
                    href="/"
                    className="font-semibold text-foreground tracking-tight font-serif"
                >
                    Making AI Feel Human
                </Link>
                <div className="flex gap-1">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                                    isActive
                                        ? "bg-foreground text-bg font-medium"
                                        : "text-muted hover:text-foreground hover:bg-surface"
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
