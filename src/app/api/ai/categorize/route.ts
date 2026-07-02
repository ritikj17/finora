import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";
import { genAI, AI_MODELS } from "@/server/ai/client";
import { TransactionRepository } from "@/server/repositories/transaction.repo";

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate the request via Better Auth proxy check
    const { data: session } = await betterFetch<Session>(
      "/api/auth/get-session",
      {
        baseURL: req.nextUrl.origin,
        headers: { cookie: req.headers.get("cookie") || "" },
      }
    );

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse the request body (expecting an array of transaction IDs to process)
    const body = await req.json();
    const { transactionIds } = body;

    if (!Array.isArray(transactionIds) || transactionIds.length === 0) {
      return NextResponse.json({ error: "No transaction IDs provided" }, { status: 400 });
    }

    // Next Sprint: We will fetch these specific transactions from the repo,
    // construct a structured JSON prompt, send it to Gemini, and save the categories.
    
    // For now, we confirm the architecture is securely wired.
    return NextResponse.json({ 
      success: true, 
      message: "AI Architecture successfully wired. Ready for Gemini payload processing." 
    });

  } catch (error) {
    console.error("[AI Categorize Error]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}