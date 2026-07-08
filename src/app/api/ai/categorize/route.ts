import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { generateWithFallback } from "@/server/ai/router";
import { CATEGORIZATION_SYSTEM_PROMPT } from "@/server/ai/prompts/categorization";
import { TransactionRepository } from "@/server/repositories/transaction.repo";
import { rateLimit } from "@/server/api/rate-limit";

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate natively via Better Auth
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate Limit: 10 requests per minute for categorization
    const ip = req.headers.get("x-forwarded-for") ?? session.user.id;
    if (!rateLimit(ip, 10, 60000)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // 2. Parse the request body
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
      date: t.date.toISOString().split('T')[0]
    }));

    // 5. Invoke Gemini via Fallback Router
    const aiResponseText = await generateWithFallback(JSON.stringify(aiPayload), {
      taskType: "classification",
      systemInstruction: CATEGORIZATION_SYSTEM_PROMPT,
      temperature: 0.0,
    });

    // 6. Parse and validate JSON structure
    const cleanJSON = aiResponseText.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanJSON);

    if (!parsedData.categorizations || !Array.isArray(parsedData.categorizations)) {
      throw new Error(`AI returned invalid schema. Response was: ${aiResponseText.slice(0, 200)}`);
    }

    // 7. Batch Update the database (using Promise.all to avoid Prisma transaction timeout)
    await TransactionRepository.batchUpdateCategories(
      session.user.id,
      parsedData.categorizations
    );

    return NextResponse.json({
      success: true,
      categorizedCount: parsedData.categorizations.length
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[AI Categorize Error]:", message);
    return NextResponse.json(
      { error: "Internal Server Error during categorization process." },
      { status: 500 }
    );
  }
}