// src/server/actions/transactions.ts
"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { TransactionRepository } from "@/server/repositories/transaction.repo";
import { revalidatePath } from "next/cache";

export interface ParsedTransaction {
  Date: string;
  Description: string;
  Amount: string;
  Type: string;
}

/**
 * Server Action: Save a batch of transactions parsed from a CSV file.
 *
 * Validates the session, maps raw CSV columns to the DB schema,
 * and bulk-inserts with duplicate skipping.
 */
export async function saveTransactions(transactions: ParsedTransaction[]) {
  try {
    // 1. Authenticate
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { error: "Unauthorized. Please log in." };
    }

    if (!Array.isArray(transactions) || transactions.length === 0) {
      return { error: "No valid transactions provided." };
    }

    // 2. Map raw CSV fields to the Prisma schema format
    const formattedData = transactions
      .map((t) => ({
        userId: session.user.id,
        date: new Date(t.Date),
        description: t.Description?.trim() || "Unknown",
        amount: Math.abs(parseFloat(t.Amount)),
        type: t.Type?.toUpperCase() === "INCOME" ? "INCOME" : "EXPENSE",
        category: null as string | null,
      }))
      .filter((t) => !isNaN(t.amount) && !isNaN(t.date.getTime()));

    if (formattedData.length === 0) {
      return { error: "No valid rows found after parsing. Check your CSV format." };
    }

    // 3. Bulk insert (skipDuplicates to be idempotent)
    const result = await TransactionRepository.createMany(formattedData);

    // 4. Revalidate to reflect new data
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/transactions");

    return { success: true, count: result.count };
  } catch (error) {
    console.error("[Save Transactions Action] Error:", error);
    return { error: "Failed to save transactions to the database." };
  }
}
