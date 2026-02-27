"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Editor from "@/components/Editor";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function InlineBad({ demoText }: { demoText?: string | null }) {
  const [text, setText] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (demoText) setText(demoText);
  }, [demoText]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = useCallback(async () => {
    if (!chatInput.trim() || isLoading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: chatInput,
    };

    setMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsLoading(true);

    try {
      const chatMessages = [
        ...messages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
        { role: "user" as const, content: chatInput },
      ];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatMessages, draft: text }),
      });

      const responseText = await res.text();

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: responseText,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Error getting response.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [chatInput, text, isLoading, messages]);

  return (
    <div>
      <div className="flex gap-4 h-[280px]">
        <div className="flex-1 [&>div]:h-full [&>div>div]:!min-h-0 [&>div>div]:h-full">
          <Editor value={text} onChange={setText} placeholder="Write here..." />
        </div>
        <div className="w-[280px] flex flex-col rounded-lg border border-border bg-white">
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
            {messages.length === 0 && (
              <p className="text-xs text-muted/40">Ask something about your text...</p>
            )}
            {messages.map((m) => (
              <div key={m.id}>
                <p className="text-[10px] text-muted/60 mb-0.5">
                  {m.role === "user" ? "You" : "AI"}
                </p>
                <p className="text-xs leading-relaxed text-foreground">
                  {m.content}
                </p>
              </div>
            ))}
            {isLoading && <p className="text-xs text-muted">...</p>}
            <div ref={messagesEndRef} />
          </div>
          <div className="px-3 py-2.5 border-t border-border">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask..."
                className="flex-1 text-xs px-0 py-0 bg-transparent border-none focus:outline-none placeholder:text-muted/40"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="text-xs text-muted hover:text-foreground disabled:opacity-40 transition-colors"
              >
                &uarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
