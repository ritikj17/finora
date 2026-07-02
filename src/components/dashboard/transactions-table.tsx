"use client";

import * as React from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: string;
  category: string | null;
}

export function TransactionsTable({ transactions }: { transactions: Transaction[] }) {
  const [isCategorizing, setIsCategorizing] = React.useState(false);

  // Placeholder for our Sprint 9 action
  const handleAutoCategorize = async () => {
    setIsCategorizing(true);
    // Future API call to /api/ai/categorize will go here
    setTimeout(() => setIsCategorizing(false), 1500);
  };

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-xl bg-card text-center">
        <div className="size-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M2 12h20"/><path d="M12 2v20"/></svg>
        </div>
        <h3 className="text-lg font-semibold">No transactions found</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          Upload a CSV statement or connect your bank to start tracking your finances.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Transaction History</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleAutoCategorize}
          disabled={isCategorizing}
          className="gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          {isCategorizing ? "Categorizing..." : "Auto-Categorize Unassigned"}
        </Button>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-[150px]">Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow 
                key={transaction.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-medium">
                  {format(new Date(transaction.date), "MMM dd, yyyy")}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  {transaction.category ? (
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary/50 text-secondary-foreground">
                      {transaction.category}
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-dashed border-muted-foreground/50 px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                      Uncategorized
                    </span>
                  )}
                </TableCell>
                <TableCell className={`text-right font-medium ${transaction.type === "INCOME" ? "text-primary" : ""}`}>
                  {transaction.type === "INCOME" ? "+" : "-"}${transaction.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}