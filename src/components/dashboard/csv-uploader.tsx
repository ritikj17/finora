"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { parseBankCSV } from "@/utils/csv-parser";
import { Button } from "@/components/ui/button";

export function CsvUploader() {
  const router = useRouter();
  const [isDragging, setIsDragging] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      alert("Please upload a valid CSV file.");
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
      alert(`Successfully imported ${data.insertedCount} transactions!`);
      
      // Refresh the page to show new data
      router.refresh();
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to process CSV file.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDrop = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  return (
    <div 
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
        isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 bg-card hover:bg-muted/30"
      }`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        accept=".csv" 
        className="hidden" 
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) processFile(e.target.files[0]);
        }}
      />
      
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="size-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Import Bank Statement</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Drag and drop your CSV here, or <span className="text-primary hover:underline cursor-pointer" onClick={() => fileInputRef.current?.click()}>browse files</span>.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2">
            Required columns: <code className="bg-muted px-1 py-0.5 rounded">Date, Description, Amount, Type</code>
          </p>
        </div>
        {isUploading && (
          <Button disabled variant="outline" size="sm" className="mt-2">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Processing...
          </Button>
        )}
      </div>
    </div>
  );
}