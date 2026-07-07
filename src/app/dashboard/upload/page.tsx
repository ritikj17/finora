// src/app/dashboard/upload/page.tsx
"use client";

import { CsvUploader } from "@/components/dashboard/csv-uploader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UploadPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload Statements</h1>
        <p className="text-muted-foreground mt-2">
          Upload your bank CSV or PDF exports here. We will securely parse and categorize your transactions using AI.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Import Document</CardTitle>
          <CardDescription>
            Select a valid CSV or PDF file from your bank or credit card provider.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CsvUploader />
        </CardContent>
      </Card>
    </div>
  );
}
