"use client";

import * as React from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/providers/toast-provider";
import { formatCurrency } from "@/lib/format";
import type { Transaction } from "@/types";

export function TransactionsTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isCategorizing, setIsCategorizing] = React.useState(false);

  const uncategorizedIds = React.useMemo(
    () => transactions.filter((t) => !t.category).map((t) => t.id),
    [transactions]
  );

  const handleAutoCategorize = async () => {
    if (uncategorizedIds.length === 0) return;
    setIsCategorizing(true);

    try {
      const response = await fetch("/api/ai/categorize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionIds: uncategorizedIds }),
      });

      if (!response.ok) {
        throw new Error("Categorization API returned an error.");
      }

      const data = await response.json();
      toast(
        `Successfully categorized ${data.categorizedCount} transactions!`,
        "success"
      );
      router.refresh();
    } catch (error) {
      console.error("[Categorization Failed]:", error);
      toast("Failed to auto-categorize. Please try again.", "error");
    } finally {
      setIsCategorizing(false);
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-xl bg-card text-center">
        <div
          className="size-12 rounded-full bg-muted flex items-center justify-center mb-4"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-1">No transactions yet</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Upload a CSV bank statement above to start tracking your finances.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Transaction History
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {transactions.length} transactions
            {uncategorizedIds.length > 0 && (
              <span className="ml-2 inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                <span
                  className="size-1.5 rounded-full bg-amber-500"
                  aria-hidden="true"
                />
                {uncategorizedIds.length} uncategorized
              </span>
            )}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleAutoCategorize}
          disabled={isCategorizing || uncategorizedIds.length === 0}
          className="gap-2"
          aria-label={
            isCategorizing
              ? "Categorizing transactions..."
              : uncategorizedIds.length > 0
              ? `Auto-categorize ${uncategorizedIds.length} uncategorized transactions`
              : "All transactions categorized"
          }
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
            className={isCategorizing ? "animate-spin" : ""}
          >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          </svg>
          {isCategorizing
            ? "Categorizing..."
            : uncategorizedIds.length > 0
            ? `AI Categorize (${uncategorizedIds.length})`
            : "All Categorized"}
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="w-[140px] font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Description</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="text-right font-semibold">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => {
              const isIncome = transaction.type === "INCOME";
              return (
                <TableRow
                  key={transaction.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(transaction.date), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell className="text-sm font-medium max-w-[280px] truncate">
                    {transaction.description}
                  </TableCell>
                  <TableCell>
                    {transaction.category ? (
                      <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-medium bg-secondary/60 text-secondary-foreground">
                        {transaction.category}
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full border border-dashed border-amber-400/50 px-2.5 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                        Pending AI
                      </span>
                    )}
                  </TableCell>
                  <TableCell
                    className={`text-right text-sm font-semibold ${
                      isIncome
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-foreground"
                    }`}
                  >
                    {isIncome ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}