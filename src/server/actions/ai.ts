// src/server/actions/ai.ts
"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { generateWithFallback } from "@/server/ai/router";
import { CATEGORIZATION_SYSTEM_PROMPT } from "@/server/ai/prompts/categorization";
import { TransactionRepository } from "@/server/repositories/transaction.repo";
import { revalidatePath } from "next/cache";

/**
 * Server Action: Categorize all uncategorized transactions for the logged-in user.
 *
 * Uses the Gemini AI router (with exponential backoff + model fallback) to batch-classify
 * transaction descriptions into standardized budget categories.
 */
export async function categorizeTransactions() {
  try {
    // 1. Authenticate
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { error: "Unauthorized" };
    }

    // 2. Fetch only uncategorized transactions for this user
    const allTransactions = await TransactionRepository.getByUserId(
      session.user.id,
      500
    );
    const uncategorized = allTransactions.filter((t) => !t.category);

    if (uncategorized.length === 0) {
      return { success: true, count: 0 };
    }

    // 3. Construct the AI payload (strip PII / unnecessary fields)
    const aiPayload = uncategorized.map((t) => ({
      transactionId: t.id,
      description: t.description,
      amount: t.amount,
      type: t.type,
      date: t.date.toISOString().split("T")[0],
    }));

    // 4. Call Gemini via the fallback router (handles retries + model fallback)
    const aiResponseText = await generateWithFallback(
      JSON.stringify(aiPayload),
      {
        systemInstruction: CATEGORIZATION_SYSTEM_PROMPT,
        temperature: 0.0, // Maximum determinism for categorization
      }
    );

    // 5. Parse and validate the response schema
    const parsedData = JSON.parse(aiResponseText);

    if (
      !parsedData.categorizations ||
      !Array.isArray(parsedData.categorizations)
    ) {
      throw new Error("AI returned an invalid schema structure.");
    }

    // 6. Batch update categories in the database (user-scoped for security)
    await TransactionRepository.batchUpdateCategories(
      session.user.id,
      parsedData.categorizations
    );

    // 7. Revalidate the dashboard so server components re-fetch fresh data
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/transactions");

    return { success: true, count: parsedData.categorizations.length };
  } catch (error) {
    console.error("[AI Categorize Action] Error:", error);
    return { error: "Failed to categorize transactions with AI." };
  }
}
