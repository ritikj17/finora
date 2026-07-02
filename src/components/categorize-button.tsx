// src/components/categorize-button.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { categorizeTransactions } from "@/server/actions/ai";

export function CategorizeButton() {
  const [isPending, setIsPending] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; count?: number; error?: string } | null>(null);

  const handleCategorize = async () => {
    setIsPending(true);
    setResult(null);
    
    // Call the Gemini AI Server Action
    const response = await categorizeTransactions();
    
    setResult(response);
    setIsPending(false);
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <Button onClick={handleCategorize} disabled={isPending} className="bg-indigo-600 hover:bg-indigo-700 text-white">
        {isPending ? "AI is Analyzing..." : "Categorize with AI"}
      </Button>
      
      {result?.success && result.count !== undefined && (
        <span className="text-sm text-green-600 font-medium">
          Categorized {result.count} items!
        </span>
      )}
      
      {result?.error && (
        <span className="text-sm text-destructive font-medium">
          {result.error}
        </span>
      )}
    </div>
  );
}
