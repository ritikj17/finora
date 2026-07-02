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

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parsedRows, setParsedRows] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setParsedRows(null); // Reset on new file selection
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setIsParsing(true);

    Papa.parse(file, {
      header: true, // Assumes the first row of the CSV contains column names
      skipEmptyLines: true,
      complete: (results) => {
        setIsParsing(false);
        setParsedRows(results.data.length);
        
        // Log to console to verify our data structure before we build the backend
        console.log("Successfully parsed CSV:", results.data);
        console.log("CSV Headers identified:", results.meta.fields);
      },
      error: (error) => {
        setIsParsing(false);
        console.error("Error parsing CSV:", error);
        alert("Failed to parse CSV file. Please check the format.");
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
            {isParsing ? "Parsing Document..." : "Process Upload"}
          </Button>
          
          {parsedRows !== null && (
            <div className="mt-4 p-4 rounded-md bg-muted text-sm text-center text-muted-foreground">
              Successfully extracted <span className="font-bold text-foreground">{parsedRows}</span> transactions from the file. Check your browser console to view the raw JSON data!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
