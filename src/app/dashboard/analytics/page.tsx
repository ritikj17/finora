import * as React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { TransactionRepository } from "@/server/repositories/transaction.repo";
import { TrendChart } from "@/components/dashboard/trend-chart";
import { CategoryBarChart } from "@/components/dashboard/category-bar-chart";
import { subDays } from "date-fns";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Analytics | Finora",
  description: "Advanced financial forecasting and analytics.",
};

export default async function AnalyticsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  // Fetch 60 days of data for deeper analytics
  const endDate = new Date();
  const startDate = subDays(endDate, 60);

  // Run database queries concurrently
  const [cashFlowData, categoryData] = await Promise.all([
    TransactionRepository.getCashFlow(session.user.id, startDate, endDate),
    TransactionRepository.getCategoryBreakdown(session.user.id, startDate, endDate),
  ]);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto h-full p-4 sm:p-8">
      <div className="flex flex-col gap-1 mb-2">
        <h1 className="text-3xl font-bold tracking-tight">Advanced Analytics</h1>
        <p className="text-muted-foreground">
          Deep-dive into your financial trends over the last 60 days.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Trend Area Chart */}
        <div className="xl:col-span-2">
          <TrendChart data={cashFlowData} />
        </div>

        {/* Category Horizontal Bar Chart */}
        <div className="xl:col-span-2">
          <CategoryBarChart data={categoryData} />
        </div>
      </div>
    </div>
  );
}