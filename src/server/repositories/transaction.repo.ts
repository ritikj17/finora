import { prisma } from "@/lib/db";
import type { Transaction, Prisma } from "@prisma/client";

// Exclude auto-generated fields for insertion
export type CreateTransactionInput = Omit<Transaction, "id" | "createdAt" | "updatedAt">;

export const TransactionRepository = {
  /**
   * Fetch all transactions for a specific user, ordered by most recent.
   */
  async getByUserId(userId: string, limit: number = 100): Promise<Transaction[]> {
    return prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      take: limit,
    });
  },

  /**
   * Fetch specific transactions by their IDs, enforcing user ownership.
   */
  async getByIds(userId: string, transactionIds: string[]): Promise<Transaction[]> {
    return prisma.transaction.findMany({
      where: {
        userId,
        id: { in: transactionIds },
      },
    });
  },

  /**
   * Fetch a summarized grouping of income vs expenses for a specific date range.
   */
  async getSummary(userId: string, startDate: Date, endDate: Date) {
    const aggregations = await prisma.transaction.groupBy({
      by: ["type"],
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: {
        amount: true,
      },
    });

    let totalIncome = 0;
    let totalExpense = 0;

    for (const agg of aggregations) {
      if (agg.type === "INCOME") {
        totalIncome += agg._sum.amount || 0;
      } else if (agg.type === "EXPENSE") {
        totalExpense += agg._sum.amount || 0;
      }
    }

    return {
      totalIncome,
      totalExpense,
      net: totalIncome - totalExpense,
    };
  },

  /**
   * Create a single new transaction.
   */
  async create(data: CreateTransactionInput): Promise<Transaction> {
    return prisma.transaction.create({
      data,
    });
  },

  /**
   * Bulk insert transactions (useful for CSV uploads or AI generation).
   */
  async createMany(data: CreateTransactionInput[]): Promise<Prisma.BatchPayload> {
    return prisma.transaction.createMany({
      data,
      skipDuplicates: true,
    });
  },

  /**
   * Batch update categories for multiple transactions atomically.
   */
  async batchUpdateCategories(
    userId: string,
    updates: { transactionId: string; category: string }[]
  ): Promise<void> {
    const updatePromises = updates.map((update) =>
      prisma.transaction.updateMany({
        where: {
          id: update.transactionId,
          userId: userId, // Strict tenant isolation enforced on every update
        },
        data: {
          category: update.category,
        },
      })
    );

    // Execute atomically
    await prisma.$transaction(updatePromises);
  },
  
  /**
   * Delete a transaction verifying ownership.
   */
  async delete(transactionId: string, userId: string): Promise<Transaction> {
    return prisma.transaction.delete({
      where: {
        id: transactionId,
        userId: userId, // Enforce security constraint
      },
    });
  }
};