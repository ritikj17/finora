import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { generateWithFallback } from "@/server/ai/router";
import { CATEGORIZATION_SYSTEM_PROMPT } from "@/server/ai/prompts/categorization";
import { TransactionRepository } from "@/server/repositories/transaction.repo";

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate natively via Better Auth (No proxy fetches needed!)
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse the request body (expecting an array of transaction IDs)
    const body = await req.json();
    const { transactionIds } = body;

    if (!Array.isArray(transactionIds) || transactionIds.length === 0) {
      return NextResponse.json({ error: "No transaction IDs provided" }, { status: 400 });
    }

    // 3. Fetch full transaction details from repository securely
    const transactions = await TransactionRepository.getByIds(session.user.id, transactionIds);

    if (transactions.length === 0) {
      return NextResponse.json({ error: "No valid transactions found." }, { status: 404 });
    }

    // 4. Construct AI Payload (strip PII/unnecessary fields to reduce token usage)
    const aiPayload = transactions.map(t => ({
      transactionId: t.id,
      description: t.description,
      amount: t.amount,
      type: t.type,
      date: t.date.toISOString().split('T')[0] // Only send YYYY-MM-DD
    }));

    // 5. Invoke Gemini via Fallback Router
    const aiResponseText = await generateWithFallback(JSON.stringify(aiPayload), {
      systemInstruction: CATEGORIZATION_SYSTEM_PROMPT,
      temperature: 0.0, // Force maximum determinism
      responseMimeType: "application/json"
    });

    // 6. Parse and validate JSON structure
    const parsedData = JSON.parse(aiResponseText);
    
    if (!parsedData.categorizations || !Array.isArray(parsedData.categorizations)) {
      throw new Error("AI returned an invalid schema structure.");
    }

    // 7. Batch Update the database securely
    await TransactionRepository.batchUpdateCategories(
      session.user.id, 
      parsedData.categorizations
    );

    return NextResponse.json({ 
      success: true, 
      categorizedCount: parsedData.categorizations.length 
    });

  } catch (error) {
    console.error("[AI Categorize Error]:", error);
    return NextResponse.json(
      { error: "Internal Server Error during categorization process." },
      { status: 500 }
    );
  }
}