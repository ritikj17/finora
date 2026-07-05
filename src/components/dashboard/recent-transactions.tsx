import * as React from "react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: string;
  category: string | null;
}

export function RecentTransactions({ transactions }: { transactions: Transaction[] }) {
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  if (transactions.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col h-full">
        <h3 className="font-semibold leading-none tracking-tight mb-6">Recent Activity</h3>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-muted-foreground mb-4">No transactions found.</p>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/transactions">Upload CSV</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold leading-none tracking-tight">Recent Activity</h3>
          <p className="text-sm text-muted-foreground mt-1">Your latest transactions.</p>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/transactions">View All</Link>
        </Button>
      </div>

      <div className="space-y-6 overflow-y-auto pr-2">
        {transactions.map((transaction) => {
          const isIncome = transaction.type === "INCOME";
          
          return (
            <div key={transaction.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Icon Wrapper */}
                <div className={`size-10 rounded-full flex items-center justify-center border ${
                  isIncome ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600" : "bg-secondary border-border text-muted-foreground"
                }`}>
                  {isIncome ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                  )}
                </div>
                
                {/* Details */}
                <div className="flex flex-col">
                  <span className="text-sm font-medium line-clamp-1">{transaction.description}</span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{format(new Date(transaction.date), "MMM dd, yyyy")}</span>
                    {transaction.category && (
                      <>
                        <span>•</span>
                        <span className="truncate max-w-[120px]">{transaction.category}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div className={`text-sm font-medium ${isIncome ? "text-emerald-500" : "text-foreground"}`}>
                {isIncome ? "+" : "-"}{formatCurrency(transaction.amount)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}