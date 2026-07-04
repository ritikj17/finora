import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { TransactionRepository } from "@/server/repositories/transaction.repo";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { transactions } = body;

    if (!Array.isArray(transactions) || transactions.length === 0) {
      return NextResponse.json({ error: "No valid transactions provided." }, { status: 400 });
    }

    // Map the incoming payload to our Prisma schema requirements
    const payload = transactions.map((t: any) => ({
      userId: session.user.id,
      date: new Date(t.date),
      description: t.description,
      amount: Number(t.amount),
      type: t.type === "INCOME" ? "INCOME" : "EXPENSE",
      category: null, // Always null on upload so AI can process them
    }));

    const result = await TransactionRepository.createMany(payload);

    return NextResponse.json({ 
      success: true, 
      insertedCount: result.count 
    });

  } catch (error: any) {
    console.error("[Bulk Upload Error]:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}