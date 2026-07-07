"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  role: "user" | "ai";
  content: string;
}

// Suggested starter questions for new users
const SUGGESTED_QUESTIONS = [
  "Am I on track with my budget this month?",
  "What's my biggest spending category?",
  "How is my savings rate trending?",
  "Where should I cut spending?",
];

/**
 * Renders AI response text with basic markdown formatting.
 * Handles: **bold**, bullet points, numbered lists, and line breaks.
 */
function FormattedMessage({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <div className="space-y-1.5 leading-relaxed">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;

        // Bold formatting: **text** → <strong>text</strong>
        const formatted = line.replace(
          /\*\*(.*?)\*\*/g,
          '<strong class="font-semibold text-foreground">$1</strong>'
        );

        // Bullet points
        if (line.match(/^[-•*]\s/)) {
          return (
            <div
              key={i}
              className="flex items-start gap-2 ml-1"
            >
              <span className="text-primary mt-1 shrink-0 text-xs" aria-hidden="true">•</span>
              <span
                dangerouslySetInnerHTML={{
                  __html: formatted.replace(/^[-•*]\s/, ""),
                }}
              />
            </div>
          );
        }

        // Numbered lists
        const numberedMatch = line.match(/^(\d+)\.\s/);
        if (numberedMatch) {
          return (
            <div key={i} className="flex items-start gap-2 ml-1">
              <span className="text-primary mt-0.5 shrink-0 text-xs font-bold" aria-hidden="true">
                {numberedMatch[1]}.
              </span>
              <span
                dangerouslySetInnerHTML={{
                  __html: formatted.replace(/^\d+\.\s/, ""),
                }}
              />
            </div>
          );
        }

        return (
          <p
            key={i}
            dangerouslySetInnerHTML={{ __html: formatted }}
          />
        );
      })}
    </div>
  );
}

export function ChatInterface() {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: "ai",
      content:
        "Hello! I'm your **Finora AI Advisor**, powered by Google Gemini.\n\nI have access to your real 30-day cash flow data and active budgets, so every answer I give is grounded in your actual numbers — no guessing.\n\nWhat would you like to know about your finances?",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text?: string) => {
    const messageText = text ?? input.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = { role: "user", content: messageText };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error("Failed to fetch response");

      const data = await response.json();
      setMessages([
        ...newMessages,
        { role: "ai", content: data.response },
      ]);
    } catch (error) {
      console.error("[ChatInterface]:", error);
      setMessages([
        ...newMessages,
        {
          role: "ai",
          content:
            "I encountered a connection error. Please check your internet connection and try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  const showSuggestions = messages.length <= 1 && !isLoading;

  return (
    <div
      className="flex flex-col h-[calc(100vh-10rem)] border border-border rounded-xl bg-card shadow-sm overflow-hidden"
      role="region"
      aria-label="AI Financial Advisor Chat"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/20">
        <div
          className="size-8 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold">Finora AI Advisor</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <span
              className="size-1.5 rounded-full bg-emerald-500 animate-pulse"
              aria-hidden="true"
            />
            Live · 30-day context loaded
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-5 space-y-5"
        ref={scrollRef}
        aria-live="polite"
        aria-relevant="additions"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex gap-3 max-w-[85%] ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              <div
                className={`shrink-0 size-7 rounded-full flex items-center justify-center ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                }`}
                aria-hidden="true"
              >
                {msg.role === "user" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  </svg>
                )}
              </div>

              {/* Bubble */}
              <div
                className={`px-4 py-3 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-muted text-foreground rounded-tl-sm"
                }`}
                role={msg.role === "ai" ? "article" : undefined}
              >
                {msg.role === "ai" ? (
                  <FormattedMessage content={msg.content} />
                ) : (
                  msg.content
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex justify-start" aria-label="AI is thinking" aria-live="polite">
            <div className="flex gap-3">
              <div className="shrink-0 size-7 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              </div>
              <div className="px-4 py-3.5 rounded-2xl rounded-tl-sm bg-muted flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {/* Suggested questions */}
        {showSuggestions && (
          <div className="pt-2">
            <p className="text-xs text-muted-foreground mb-3 text-center">
              Suggested questions
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-left px-3 py-2.5 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={`Ask: ${q}`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="p-4 bg-background/60 backdrop-blur-sm border-t border-border">
        <form
          onSubmit={handleFormSubmit}
          className="flex gap-2"
          aria-label="Send message"
        >
          <Input
            ref={inputRef}
            placeholder="Ask about your spending, budgets, or cash flow..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1 h-10"
            aria-label="Message input"
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            size="sm"
            className="h-10 px-4"
            aria-label="Send message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="22" x2="11" y1="2" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </Button>
        </form>
      </div>
    </div>
  );
}