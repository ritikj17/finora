"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { parseBankCSV } from "@/utils/csv-parser";
import { useToast } from "@/providers/toast-provider";

export function CsvUploader() {
  const router = useRouter();
  const { toast } = useToast();
  const [isDragging, setIsDragging] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      toast("Please upload a valid CSV file.", "error");
      return;
    }

    setIsUploading(true);

    try {
      const text = await file.text();
      const parsedTransactions = parseBankCSV(text);

      if (parsedTransactions.length === 0) {
        throw new Error("No valid transactions found in the CSV.");
      }

      const response = await fetch("/api/transactions/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactions: parsedTransactions }),
      });

      if (!response.ok) throw new Error("Server rejected the upload.");

      const data = await response.json();
      toast(
        `Successfully imported ${data.insertedCount} transactions!`,
        "success"
      );

      // Refresh the page to show new data
      router.refresh();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to process CSV file.";
      console.error("[CsvUploader]", error);
      toast(message, "error");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDrop = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files?.[0]) {
        processFile(e.dataTransfer.files[0]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload CSV file - click or drag and drop"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          fileInputRef.current?.click();
        }
      }}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 outline-none ${
        isDragging
          ? "border-primary bg-primary/5 scale-[1.01]"
          : "border-border hover:border-primary/40 bg-card hover:bg-muted/30"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        accept=".csv"
        className="hidden"
        ref={fileInputRef}
        aria-hidden="true"
        onChange={(e) => {
          if (e.target.files?.[0]) processFile(e.target.files[0]);
        }}
      />

      <div className="flex flex-col items-center justify-center gap-3 pointer-events-none">
        <div
          className={`size-12 rounded-xl flex items-center justify-center transition-colors ${
            isDragging
              ? "bg-primary/20 text-primary"
              : "bg-muted text-muted-foreground"
          }`}
          aria-hidden="true"
        >
          {isUploading ? (
            <svg
              className="animate-spin size-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-sm text-foreground">
            {isUploading ? "Processing..." : "Import Bank Statement"}
          </h3>
          {!isUploading && (
            <>
              <p className="text-sm text-muted-foreground mt-1">
                Drag and drop your CSV, or{" "}
                <span className="text-primary font-medium">browse files</span>
              </p>
              <p className="text-xs text-muted-foreground/70 mt-2">
                Required columns:{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  Date, Description, Amount, Type
                </code>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}