import * as React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { TransactionRepository } from "@/server/repositories/transaction.repo";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { CashFlowChart } from "@/components/dashboard/cash-flow-chart";
import { CategoryPieChart } from "@/components/dashboard/category-pie-chart";
import { subDays } from "date-fns";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard | Finora",
  description: "Your financial overview and analytics.",
};

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  // Calculate Date Range (Last 30 Days)
  const endDate = new Date();
  const startDate = subDays(endDate, 30);

  // Fetch Aggregated Analytics concurrently for performance
  const [summary, cashFlowData, categoryData] = await Promise.all([
    TransactionRepository.getSummary(session.user.id, startDate, endDate),
    TransactionRepository.getCashFlow(session.user.id, startDate, endDate),
    TransactionRepository.getCategoryBreakdown(
      session.user.id,
      startDate,
      endDate,
    ),
  ]);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto h-full p-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Financial Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome back, {session.user.name || "User"}. Here is your 30-day
          summary.
        </p>
      </div>

      <SummaryCards
        net={summary.net}
        income={summary.totalIncome}
        expense={summary.totalExpense}
      />

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <div className="lg:col-span-4">
          <CashFlowChart data={cashFlowData} />
        </div>
        <div className="lg:col-span-3">
          <CategoryPieChart data={categoryData} />
        </div>
      </div>
    </div>
  );
}
