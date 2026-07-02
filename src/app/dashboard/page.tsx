// src/app/dashboard/page.tsx
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CategorizeButton } from "@/components/categorize-button";
import { SpendingChart } from "@/components/spending-chart";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const transactions = await db.transaction.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "desc" },
  });

  // Analytics Math
  const totalBalance = transactions.reduce((acc, curr) => acc + curr.amount, 0);
  const transactionCount = transactions.length;
  const uncategorizedCount = transactions.filter((t) => !t.category).length;

  // Chart Data Preparation: Filter for expenses (negative amount), group by category, and make positive
  const expenses = transactions.filter((t) => t.amount < 0 && t.category);
  const groupedExpenses = expenses.reduce((acc, curr) => {
    const category = curr.category || "Other";
    acc[category] = (acc[category] || 0) + Math.abs(curr.amount);
    return acc;
  }, {} as Record<string, number>);

  // Convert to array format required by Recharts
  const chartData = Object.entries(groupedExpenses)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value); // Sort highest spending first

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, {session.user.name || "User"}. Here is your financial overview.
          </p>
        </div>
        {uncategorizedCount > 0 && <CategorizeButton />}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalBalance < 0 ? 'text-destructive' : ''}`}>
              {formatMoney(totalBalance)}
            </div>
            <p className="text-xs text-muted-foreground">Based on all uploaded statements</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactionCount}</div>
            <p className="text-xs text-muted-foreground">Processed records</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending AI Action</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{uncategorizedCount}</div>
            <p className="text-xs text-muted-foreground">Awaiting categorization</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid: Chart on Left, Table on Right */}
      <div className="grid gap-4 md:grid-cols-7 mt-8">
        {/* Chart Section */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Spending Insights</CardTitle>
            <CardDescription>Where your money went based on AI categories.</CardDescription>
          </CardHeader>
          <CardContent>
            <SpendingChart data={chartData} />
          </CardContent>
        </Card>

        {/* Table Section */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest financial transactions.</CardDescription>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="rounded-md border p-8 text-center text-muted-foreground bg-muted/50">
                No transactions found. Go to the Upload tab to import your CSV.
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <div className="grid grid-cols-4 bg-muted p-4 text-sm font-medium">
                  <div>Date</div>
                  <div className="col-span-2">Details</div>
                  <div className="text-right">Amount</div>
                </div>
                <div className="divide-y h-[280px] overflow-y-auto">
                  {transactions.slice(0, 15).map((t) => (
                    <div key={t.id} className="grid grid-cols-4 p-4 text-sm items-center hover:bg-muted/50 transition-colors">
                      <div className="text-muted-foreground text-xs">
                        {t.date.toLocaleDateString()}
                      </div>
                      <div className="col-span-2">
                        <div className="font-medium truncate pr-4">{t.description}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {t.category || "Uncategorized"}
                        </div>
                      </div>
                      <div className={`text-right font-medium ${t.amount < 0 ? 'text-foreground' : 'text-green-600'}`}>
                        {t.amount > 0 ? '+' : ''}{formatMoney(t.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
