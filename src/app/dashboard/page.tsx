// src/app/dashboard/page.tsx
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  // 1. Secure Server-Side Authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  // 2. Fetch User Data directly from the database
  const transactions = await db.transaction.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "desc" },
  });

  // 3. Calculate Analytics
  const totalBalance = transactions.reduce((acc, curr) => acc + curr.amount, 0);
  const transactionCount = transactions.length;
  const uncategorizedCount = transactions.filter((t) => !t.category).length;

  // Currency Formatter Utility
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {session.user.name || "User"}. Here is your financial overview.
        </p>
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
            <p className="text-xs text-muted-foreground">
              Based on all uploaded statements
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactionCount}</div>
            <p className="text-xs text-muted-foreground">
              Processed records
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending AI Action</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{uncategorizedCount}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting categorization
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions Table Preview */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        {transactions.length === 0 ? (
          <div className="rounded-md border p-8 text-center text-muted-foreground bg-muted/50">
            No transactions found. Go to the Upload tab to import your CSV.
          </div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <div className="grid grid-cols-4 bg-muted p-4 text-sm font-medium">
              <div>Date</div>
              <div className="col-span-2">Description</div>
              <div className="text-right">Amount</div>
            </div>
            <div className="divide-y">
              {transactions.slice(0, 5).map((t) => (
                <div key={t.id} className="grid grid-cols-4 p-4 text-sm items-center hover:bg-muted/50 transition-colors">
                  <div className="text-muted-foreground">
                    {t.date.toLocaleDateString()}
                  </div>
                  <div className="col-span-2 font-medium truncate pr-4">
                    {t.description}
                  </div>
                  <div className={`text-right font-medium ${t.amount < 0 ? 'text-foreground' : 'text-green-600'}`}>
                    {t.amount > 0 ? '+' : ''}{formatMoney(t.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
