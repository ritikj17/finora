import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { generateWithFallback } from "@/server/ai/router";
import { ADVISOR_SYSTEM_PROMPT } from "@/server/ai/prompts/advisor";
import { TransactionRepository } from "@/server/repositories/transaction.repo";
import { BudgetRepository } from "@/server/repositories/budget.repo";
import { subDays } from "date-fns";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { messages } = body; // Expecting an array of { role: 'user' | 'ai', content: string }

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required." }, { status: 400 });
    }

    // 1. Fetch the user's real-time financial context (Last 30 Days)
    const endDate = new Date();
    const startDate = subDays(endDate, 30);

    const [summary, budgets] = await Promise.all([
      TransactionRepository.getSummary(session.user.id, startDate, endDate),
      BudgetRepository.getBudgetsWithProgress(session.user.id),
    ]);

    // 2. Construct the RAG Payload
    const dataContext = {
      thirtyDaySummary: summary,
      activeBudgets: budgets.map(b => ({
        category: b.category,
        limit: b.limit,
        spent: b.spent,
        status: b.spent > b.limit ? "OVER BUDGET" : "ON TRACK"
      }))
    };

    // 3. Format the final prompt for Gemini
    // We stringify the context and append the conversation history so Gemini has full awareness.
    const fullPrompt = `
      CURRENT FINANCIAL CONTEXT:
      ${JSON.stringify(dataContext, null, 2)}

      CONVERSATION HISTORY:
      ${JSON.stringify(messages, null, 2)}
      
      INSTRUCTION:
      Respond to the final message in the conversation history as the AI Advisor.
    `;

    // 4. Generate Response (Using plain text instead of strict JSON for conversational UI)
    const aiResponseText = await generateWithFallback(fullPrompt, {
      systemInstruction: ADVISOR_SYSTEM_PROMPT,
      temperature: 0.7, // Slightly higher for conversational fluidity
      responseMimeType: "text/plain"
    });

    return NextResponse.json({ 
      success: true, 
      response: aiResponseText 
    });

  } catch (error) {
    console.error("[AI Chat Error]:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}