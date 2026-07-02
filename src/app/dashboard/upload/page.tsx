// src/app/dashboard/upload/page.tsx
"use client";

import { useState } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { saveTransactions, ParsedTransaction } from "@/server/actions/transactions";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [saveResult, setSaveResult] = useState<{ success?: boolean; count?: number; error?: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setSaveResult(null); 
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setIsParsing(true);
    setSaveResult(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const parsedData = results.data as ParsedTransaction[];
        
        // Send the parsed JSON to our Next.js Server Action
        const response = await saveTransactions(parsedData);
        
        setSaveResult(response);
        setIsParsing(false);
      },
      error: (error) => {
        setIsParsing(false);
        console.error("Error parsing CSV:", error);
        setSaveResult({ error: "Failed to read the CSV file. Please check the format." });
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload Statements</h1>
        <p className="text-muted-foreground mt-2">
          Upload your bank CSV exports here. We will securely parse and categorize your transactions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Import CSV</CardTitle>
          <CardDescription>
            Select a valid CSV file from your bank or credit card provider.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="csv-file">Bank Statement File</Label>
            <Input
              id="csv-file"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              disabled={isParsing}
            />
          </div>
          <Button 
            onClick={handleUpload} 
            disabled={!file || isParsing}
            className="w-full"
          >
            {isParsing ? "Processing & Saving..." : "Process Upload"}
          </Button>
          
          {saveResult?.success && (
            <div className="mt-4 p-4 rounded-md bg-green-500/15 text-sm text-center text-green-600 font-medium">
              Successfully saved {saveResult.count} transactions to your account!
            </div>
          )}

          {saveResult?.error && (
            <div className="mt-4 p-4 rounded-md bg-destructive/15 text-sm text-center text-destructive font-medium">
              {saveResult.error}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
