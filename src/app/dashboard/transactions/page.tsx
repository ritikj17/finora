import * as React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { TransactionsTable } from "@/components/dashboard/transactions-table";
import { TransactionRepository } from "@/server/repositories/transaction.repo";
import { CsvUploader } from "@/components/dashboard/csv-uploader"; // 👉 NEW IMPORT

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Transactions | FinPilot AI",
  description: "View and manage your financial transactions.",
};

export default async function TransactionsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  const transactions = await TransactionRepository.getByUserId(session.user.id, 500);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto h-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">
          Manage your cash flow and review AI categorizations.
        </p>
      </div>

      {/* 👉 NEW UPLOADER MOUNTED HERE */}
      <CsvUploader />

      <TransactionsTable transactions={transactions} />
    </div>
  );
}