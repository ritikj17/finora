import { db } from "@/server/db";
import { startOfMonth, endOfMonth } from "date-fns";

export const BudgetRepository = {
  /**
   * Retrieves all budgets for a user
   */
  async getByUserId(userId: string) {
    return db.budget.findMany({
      where: { userId },
      orderBy: { category: "asc" },
    });
  },

  /**
   * Upserts a budget for a given category and user.
   */
  async upsertBudget(userId: string, category: string, amount: number) {
    const existing = await db.budget.findFirst({
      where: { userId, category },
    });

    if (existing) {
      return db.budget.update({
        where: { id: existing.id },
        data: { amount },
      });
    }

    return db.budget.create({
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
    const budgets = await db.budget.findMany({
      where: { userId },
      orderBy: { amount: "desc" },
    });

    if (budgets.length === 0) return [];

    // 2. Fetch current month's spending grouped by those specific categories
    const budgetCategories = budgets.map((b) => b.category);
    
    const spending = await db.transaction.groupBy({
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