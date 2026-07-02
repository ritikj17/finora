// src/server/actions/ai.ts
"use server";

import { db } from "@/server/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { genAI } from "@/lib/ai";
import { revalidatePath } from "next/cache";

export async function categorizeTransactions() {
  try {
    // 1. Secure the route
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { error: "Unauthorized" };
    }

    // 2. Fetch only uncategorized transactions for this specific user
    const transactions = await db.transaction.findMany({
      where: { userId: session.user.id, category: null },
      select: { id: true, description: true, amount: true },
    });

    if (transactions.length === 0) {
      return { success: true, count: 0 };
    }

    // 3. Construct the strict prompt for the AI Agent
    const prompt = `
      You are a specialized financial categorization agent. 
      Review the following JSON list of transactions. 
      Assign a standard budgeting category (e.g., Food & Dining, Income, Entertainment, Utilities, Transport, Subscriptions) to each.
      
      Respond STRICTLY with a valid JSON array of objects. 
      Each object must have the exact 'id' from the input and a new 'category' string.
      Do not include any other text, markdown formatting, or explanations.
      
      Transactions:
      ${JSON.stringify(transactions)}
    `;

    // 4. Call Gemini 1.5 Flash (Optimized for speed and JSON tasks)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    let responseText = result.response.text();
    
    // 5. Sanitize and parse the AI response
    // AI sometimes wraps JSON in markdown blocks (```json) despite instructions, so we strip it.
    responseText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    const categorizedData = JSON.parse(responseText) as { id: string; category: string }[];

    // 6. Update the database securely
    let count = 0;
    for (const item of categorizedData) {
      await db.transaction.update({
        where: { id: item.id },
        data: { category: item.category },
      });
      count++;
    }

    // 7. Force Next.js to redraw the dashboard UI
    revalidatePath("/dashboard");
    
    return { success: true, count };
  } catch (error) {
    console.error("AI Categorization Error:", error);
    return { error: "Failed to process transactions with AI." };
  }
}
