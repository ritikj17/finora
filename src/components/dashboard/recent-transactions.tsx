"use client";

import * as React from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: Date;
  type: string;
  category: string | null;
}

export function RecentTransactions({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return (
      <div className="flex p-8 items-center justify-center text-sm text-muted-foreground border rounded-xl bg-card">
        No recent transactions found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction, i) => (
        <motion.div
          key={transaction.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
          className="flex items-center justify-between p-4 rounded-xl border bg-card/50 hover:bg-card transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className={`size-10 rounded-full flex items-center justify-center border ${
              transaction.type === "INCOME" 
                ? "bg-primary/10 border-primary/20 text-primary" 
                : "bg-muted border-border text-muted-foreground"
            }`}>
              {transaction.type === "INCOME" ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{transaction.description}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">
                  {format(new Date(transaction.date), "MMM dd, yyyy")}
                </span>
                {transaction.category && (
                  <>
                    <span className="text-xs text-muted-foreground/50">•</span>
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {transaction.category}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={`font-semibold ${transaction.type === "INCOME" ? "text-primary" : "text-foreground"}`}>
            {transaction.type === "INCOME" ? "+" : "-"}${transaction.amount.toFixed(2)}
          </div>
        </motion.div>
      ))}
    </div>
  );
}