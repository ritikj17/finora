import * as React from "react";
import { formatCurrency, calculateSavingsRate } from "@/lib/format";

interface SummaryCardsProps {
  net: number;
  income: number;
  expense: number;
}

interface StatCardProps {
  title: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
  iconColor: string;
  trend?: {
    value: string;
    positive: boolean;
  };
}

function StatCard({ title, value, subtext, icon, iconColor, trend }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm p-5 transition-all hover:shadow-md hover:border-border/80">
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div
          className={`size-8 rounded-lg flex items-center justify-center ${iconColor}`}
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        <div className="flex items-center gap-2">
          <p className="text-xs text-muted-foreground">{subtext}</p>
          {trend && (
            <span
              className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                trend.positive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
              }`}
              aria-label={`Trend: ${trend.value}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={trend.positive ? "" : "rotate-180"}
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
              {trend.value}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function SummaryCards({ net, income, expense }: SummaryCardsProps) {
  const savingsRate = calculateSavingsRate(income, expense);
  const isPositiveNet = net >= 0;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Net Cash Flow */}
      <StatCard
        title="Net Cash Flow"
        value={formatCurrency(net)}
        subtext="Last 30 days"
        iconColor={isPositiveNet ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/10 text-rose-600 dark:text-rose-400"}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        }
        trend={isPositiveNet ? { value: "Positive", positive: true } : { value: "Negative", positive: false }}
      />

      {/* Total Income */}
      <StatCard
        title="Total Income"
        value={formatCurrency(income)}
        subtext="Earnings and deposits"
        iconColor="bg-primary/10 text-primary"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>
        }
      />

      {/* Total Expenses */}
      <StatCard
        title="Total Expenses"
        value={formatCurrency(expense)}
        subtext="Purchases and bills"
        iconColor="bg-rose-500/10 text-rose-600 dark:text-rose-400"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
        }
      />

      {/* Savings Rate */}
      <StatCard
        title="Savings Rate"
        value={`${savingsRate.toFixed(1)}%`}
        subtext="Income retained"
        iconColor={
          savingsRate >= 20
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : savingsRate >= 10
            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
            : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
        }
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        }
        trend={
          savingsRate >= 20
            ? { value: "Healthy", positive: true }
            : savingsRate >= 10
            ? { value: "Moderate", positive: true }
            : { value: "Low", positive: false }
        }
      />
    </div>
  );
}