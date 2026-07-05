import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { BudgetRepository } from "@/server/repositories/budget.repo";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { category, amount } = body;

    if (!category || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid payload. Category and positive amount required." }, 
        { status: 400 }
      );
    }

    const budget = await BudgetRepository.upsertBudget(
      session.user.id,
      category,
      amount
    );

    return NextResponse.json({ success: true, budget });

  } catch (error) {
    console.error("[Budget API Error]:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}