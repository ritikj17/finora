"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error for monitoring
    console.error("[Global Error]:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center text-foreground font-sans antialiased">
        <div className="mb-6">
          <Logo className="size-12 mx-auto" />
        </div>
        <p className="text-sm font-mono text-destructive font-bold mb-3 uppercase tracking-widest">
          Error
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          Something went wrong
        </h1>
        <p className="text-muted-foreground max-w-sm mb-8">
          An unexpected error occurred. Our team has been notified. Please try
          again.
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground/50 font-mono mb-6">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex items-center gap-3">
          <Button onClick={reset}>Try Again</Button>
          <Button variant="outline" onClick={() => (window.location.href = "/")}>
            Go Home
          </Button>
        </div>
      </body>
    </html>
  );
}
