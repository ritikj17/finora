import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { generateWithFallback } from "@/server/ai/router";
import { rateLimit } from "@/server/api/rate-limit";

const PDF_EXTRACTION_PROMPT = `
You are an expert financial data extraction AI.
Your task is to extract all transactions from this bank statement PDF and output them as a strict JSON array.
Each transaction must follow this exact schema:
{
  "date": "YYYY-MM-DD",
  "description": "Cleaned up vendor or transaction name",
  "amount": number (positive for income, negative for expenses, or just positive if type is specified),
  "type": "INCOME" or "EXPENSE"
}

RULES:
- Return ONLY the JSON array.
- Do not wrap in markdown blocks like \`\`\`json.
- If no transactions are found, return [].
- Make sure to correctly infer INCOME vs EXPENSE based on the amount or column.
`;

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate Limit: 5 PDF extractions per minute
    const ip = (await headers()).get("x-forwarded-for") ?? "127.0.0.1";
    if (!rateLimit(ip, 5, 60000)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await req.json();
    const { base64Pdf } = body;

    if (!base64Pdf) {
      return NextResponse.json({ error: "No PDF data provided" }, { status: 400 });
    }

    const payload = [
      {
        inlineData: {
          data: base64Pdf,
          mimeType: "application/pdf"
        }
      },
      "Extract the transactions from this bank statement."
    ];

    const aiResponseText = await generateWithFallback(payload, {
      taskType: "classification",
      systemInstruction: PDF_EXTRACTION_PROMPT,
      temperature: 0.0,
      responseMimeType: "application/json"
    });

    try {
      const transactions = JSON.parse(aiResponseText);
      return NextResponse.json({ success: true, transactions });
    } catch (parseError) {
      console.error("[PDF Extraction Parse Error]:", parseError);
      return NextResponse.json({ error: "Failed to parse AI output into JSON." }, { status: 500 });
    }

  } catch (error) {
    console.error("[PDF Extraction Error]:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
