// src/server/actions/transactions.ts
"use server";

import { db } from "@/server/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export type ParsedTransaction = {
  Date: string;
  Description: string;
  Amount: string;
  Type: string;
};

export async function saveTransactions(transactions: ParsedTransaction[]) {
  try {
    // 1. Secure the route: Get the user session from the request headers
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { error: "Unauthorized. Please log in." };
    }

    // 2. Format the raw CSV data into our Prisma Types
    const formattedData = transactions.map((t) => ({
      userId: session.user.id,
      date: new Date(t.Date),
      description: t.Description,
      amount: parseFloat(t.Amount),
      type: t.Type,
    }));

    // 3. Bulk insert into the Neon database
    const result = await db.transaction.createMany({
      data: formattedData,
      skipDuplicates: true,
    });

    return { success: true, count: result.count };
  } catch (error) {
    console.error("Database Insertion Error:", error);
    return { error: "Failed to save transactions to the database." };
  }
}
