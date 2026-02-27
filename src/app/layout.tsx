import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Making AI Feel Human",
  description: "3 UX principles for better AI interfaces",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <div className="flex-1">
          {children}
        </div>
        <footer className="py-8 text-center text-sm text-muted">
          Made by the <a href="https://opennote.me" className="underline hover:text-foreground transition-colors">Opennote</a> team for <a href="https://irvinehacks.com/" className="underline hover:text-foreground transition-colors">IrvineHacks 2026</a> · <a href="https://github.com/opennote-dev/irvinehacks-2026-workshop" className="underline hover:text-foreground transition-colors">GitHub</a>
        </footer>
      </body>
    </html>
  );
}
