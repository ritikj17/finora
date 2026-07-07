"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { BudgetModal } from "@/components/dashboard/budget-modal";
import { formatCurrency } from "@/lib/format";
import type { BudgetWithProgress } from "@/types";

interface BudgetProgressProps {
  budgets: BudgetWithProgress[];
}

export function BudgetProgress({ budgets }: BudgetProgressProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  if (budgets.length === 0) {
    return (
      <>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col items-center justify-center text-center h-full min-h-[280px]">
          <div
            className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary"
            aria-hidden="true"
          >
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
            >
              <path d="M12 2v20" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <h3 className="font-semibold mb-1">No Budgets Set</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Set monthly limits on your spending categories to stay on track.
          </p>
          <Button
            className="mt-5"
            onClick={() => setIsModalOpen(true)}
            aria-label="Create your first budget"
          >
            Create First Budget
          </Button>
        </div>
        <BudgetModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col h-full">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-semibold leading-none tracking-tight">
              Monthly Budgets
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {budgets.length} active budget{budgets.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            aria-label="Add new budget"
          >
            + Add
          </Button>
        </div>

        <div className="space-y-5 flex-1 overflow-y-auto pr-0.5" role="list" aria-label="Budget list">
          {budgets.map((budget) => {
            const percentage = Math.min(
              (budget.spent / budget.limit) * 100,
              100
            );
            const isExceeded = budget.spent > budget.limit;
            const isWarning = percentage >= 75 && !isExceeded;

            const barColor = isExceeded
              ? "bg-rose-500"
              : isWarning
              ? "bg-amber-500"
              : "bg-emerald-500";

            return (
              <div
                key={budget.id}
                className="flex flex-col gap-2"
                role="listitem"
                aria-label={`${budget.category} budget: ${formatCurrency(budget.spent)} of ${formatCurrency(budget.limit)} spent`}
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{budget.category}</span>
                  <div className="flex items-center gap-2">
                    {isExceeded && (
                      <span
                        className="text-[10px] text-rose-500 font-bold uppercase tracking-wide"
                        role="alert"
                      >
                        Over!
                      </span>
                    )}
                    {isWarning && (
                      <span
                        className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold"
                        role="status"
                      >
                        {percentage.toFixed(0)}%
                      </span>
                    )}
                    <span className="text-muted-foreground text-xs">
                      <strong
                        className={`font-semibold ${isExceeded ? "text-rose-500" : "text-foreground"}`}
                      >
                        {formatCurrency(budget.spent)}
                      </strong>{" "}
                      / {formatCurrency(budget.limit)}
                    </span>
                  </div>
                </div>

                <div
                  className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
                  role="progressbar"
                  aria-valuenow={Math.round(percentage)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${budget.category} spending progress`}
                >
                  <div
                    className={`h-full transition-all duration-700 ease-out rounded-full ${barColor}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BudgetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}