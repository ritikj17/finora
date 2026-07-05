"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { BudgetModal } from "@/components/dashboard/budget-modal";

interface BudgetProgressProps {
  budgets: {
    id: string;
    category: string;
    limit: number;
    spent: number;
  }[];
}

export function BudgetProgress({ budgets }: BudgetProgressProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  // --- EMPTY STATE UI (0 Budgets) ---
  if (budgets.length === 0) {
    return (
      <>
        <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col items-center justify-center text-center h-full min-h-[300px]">
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <h3 className="font-semibold">No Budgets Set</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs">
            Take control of your cash flow by setting monthly limits on your top categories.
          </p>
          <Button variant="outline" className="mt-6" onClick={() => setIsModalOpen(true)}>
            Create First Budget
          </Button>
        </div>
        <BudgetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    );
  }

  // --- POPULATED STATE UI (1+ Budgets) ---
  return (
    <>
      <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold leading-none tracking-tight">Monthly Budgets</h3>
            <p className="text-sm text-muted-foreground mt-1">Track your spending limits.</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(true)}>
            + Add
          </Button>
        </div>

        <div className="space-y-6 flex-1 overflow-y-auto pr-2">
          {budgets.map((budget) => {
            const percentage = Math.min((budget.spent / budget.limit) * 100, 100);
            
            let colorClass = "bg-emerald-500";
            if (percentage >= 90) colorClass = "bg-rose-500";
            else if (percentage >= 75) colorClass = "bg-amber-500";

            return (
              <div key={budget.id} className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{budget.category}</span>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">{formatCurrency(budget.spent)}</strong> / {formatCurrency(budget.limit)}
                  </span>
                </div>
                
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div 
                    className={`h-full transition-all duration-500 ease-in-out ${colorClass}`} 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                
                {percentage >= 100 && (
                  <span className="text-[10px] text-rose-500 font-semibold tracking-wide uppercase">
                    Limit Exceeded
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <BudgetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}