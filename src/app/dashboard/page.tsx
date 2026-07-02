import * as React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TransactionRepository } from "@/server/repositories/transaction.repo";
import { format, subDays, isSameDay } from "date-fns";

import { OverviewChart } from "@/components/dashboard/overview-chart";
import { CategoryChart } from "@/components/dashboard/category-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  // Fetch all transactions for the user
  const transactions = await TransactionRepository.getByUserId(session.user.id, 100);

  // 1. Calculate Top-Level Summaries
  const totalIncome = transactions
    .filter(t => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = transactions
    .filter(t => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);
    
  const netBalance = totalIncome - totalExpense;

  // 2. Data Processing for the Area Chart (Last 30 Days)
  const chartData = [];
  for (let i = 29; i >= 0; i--) {
    const targetDate = subDays(new Date(), i);
    const daysTransactions = transactions.filter(t => isSameDay(new Date(t.date), targetDate));
    
    chartData.push({
      date: targetDate.toISOString(),
      income: daysTransactions.filter(t => t.type === "INCOME").reduce((sum, t) => sum + t.amount, 0),
      expense: daysTransactions.filter(t => t.type === "EXPENSE").reduce((sum, t) => sum + t.amount, 0),
    });
  }

  // 3. Data Processing for Category Pie Chart (Expenses Only)
  const categoryMap = new Map<string, number>();
  transactions
    .filter(t => t.type === "EXPENSE" && t.category)
    .forEach(t => {
      const current = categoryMap.get(t.category as string) || 0;
      categoryMap.set(t.category as string, current + t.amount);
    });
    
  const categoryData = Array.from(categoryMap.entries()).map(([name, value]) => ({
    name,
    value,
  })).sort((a, b) => b.value - a.value); // Sort largest expenses first

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {session.user.name.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground mt-1">
          Here is your financial overview for the last 30 days.
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col justify-center">
          <p className="text-sm font-medium text-muted-foreground">Total Balance</p>
          <p className="text-3xl font-bold mt-2">${netBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col justify-center">
          <p className="text-sm font-medium text-muted-foreground">Total Income</p>
          <p className="text-3xl font-bold text-primary mt-2">+${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col justify-center">
          <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
          <p className="text-3xl font-bold text-red-500 mt-2">-${totalExpense.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
      </div>
      
      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 col-span-4 flex flex-col">
          <h3 className="text-lg font-semibold tracking-tight">Cash Flow</h3>
          <p className="text-sm text-muted-foreground">Income and expenses over time.</p>
          <OverviewChart data={chartData} />
        </div>
        
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 col-span-3 flex flex-col">
          <h3 className="text-lg font-semibold tracking-tight">Top Expenses</h3>
          <p className="text-sm text-muted-foreground">Where your money is going.</p>
          <CategoryChart data={categoryData} />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold tracking-tight">Recent Transactions</h3>
        </div>
        <RecentTransactions transactions={transactions.slice(0, 8)} />
      </div>
    </div>
  );
}