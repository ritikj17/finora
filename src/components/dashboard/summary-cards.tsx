import * as React from "react";

interface SummaryCardsProps {
  net: number;
  income: number;
  expense: number;
}

export function SummaryCards({ net, income, expense }: SummaryCardsProps) {
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Net Worth / Balance */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="tracking-tight text-sm font-medium">Net Cash Flow</h3>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        <div className="text-2xl font-bold">{formatCurrency(net)}</div>
        <p className="text-xs text-muted-foreground mt-1">For the selected period</p>
      </div>

      {/* Income */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="tracking-tight text-sm font-medium">Total Income</h3>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>
        </div>
        <div className="text-2xl font-bold">{formatCurrency(income)}</div>
        <p className="text-xs text-muted-foreground mt-1">Earnings and deposits</p>
      </div>

      {/* Expense */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="tracking-tight text-sm font-medium">Total Expenses</h3>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-500"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
        </div>
        <div className="text-2xl font-bold">{formatCurrency(expense)}</div>
        <p className="text-xs text-muted-foreground mt-1">Purchases and bills</p>
      </div>
    </div>
  );
}