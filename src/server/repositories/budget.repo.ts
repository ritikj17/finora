import { prisma } from "@/lib/db";
import { startOfMonth, endOfMonth } from "date-fns";

export const BudgetRepository = {
  /**
   * Upserts a budget limit for a specific category.
   */
  async upsertBudget(userId: string, category: string, amount: number) {
    // We use a unique constraint on [userId, category] in the schema
    // Prisma's upsert doesn't perfectly support composite uniques without a dedicated ID in some DBs,
    // so we handle it via findFirst + create/update for maximum compatibility across SQL dialects.
    const existing = await prisma.budget.findFirst({
      where: { userId, category },
    });

    if (existing) {
      return prisma.budget.update({
        where: { id: existing.id },
        data: { amount },
      });
    }

    return prisma.budget.create({
      data: {
        userId,
        category,
        amount,
      },
    });
  },

  /**
   * Fetches all budgets for a user and calculates how much has been spent 
   * in the current month against each category limit.
   */
  async getBudgetsWithProgress(userId: string) {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    // 1. Fetch user's defined budget limits
    const budgets = await prisma.budget.findMany({
      where: { userId },
      orderBy: { amount: "desc" },
    });

    if (budgets.length === 0) return [];

    // 2. Fetch current month's spending grouped by those specific categories
    const budgetCategories = budgets.map((b) => b.category);
    
    const spending = await prisma.transaction.groupBy({
      by: ["category"],
      where: {
        userId,
        type: "EXPENSE",
        date: { gte: monthStart, lte: monthEnd },
        category: { in: budgetCategories },
      },
      _sum: { amount: true },
    });

    // 3. Map the spending data to a dictionary for O(1) lookups
    const spendingMap = new Map(
      spending.map((s) => [s.category, s._sum.amount || 0])
    );

    // 4. Combine limits with actual spent amounts
    return budgets.map((budget) => ({
      id: budget.id,
      category: budget.category,
      limit: budget.amount,
      spent: spendingMap.get(budget.category) || 0,
    }));
  }
};