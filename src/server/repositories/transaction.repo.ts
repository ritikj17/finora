import { prisma } from "@/lib/db";
import type { Transaction, Prisma } from "@prisma/client";
import { format, eachDayOfInterval } from "date-fns";

export type CreateTransactionInput = Omit<Transaction, "id" | "createdAt" | "updatedAt">;

export const TransactionRepository = {
  async getByUserId(userId: string, limit: number = 100): Promise<Transaction[]> {
    return prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      take: limit,
    });
  },

  async getByIds(userId: string, transactionIds: string[]): Promise<Transaction[]> {
    return prisma.transaction.findMany({
      where: { userId, id: { in: transactionIds } },
    });
  },

  async getSummary(userId: string, startDate: Date, endDate: Date) {
    const aggregations = await prisma.transaction.groupBy({
      by: ["type"],
      where: { userId, date: { gte: startDate, lte: endDate } },
      _sum: { amount: true },
    });

    let totalIncome = 0;
    let totalExpense = 0;

    for (const agg of aggregations) {
      if (agg.type === "INCOME") totalIncome += agg._sum.amount || 0;
      else if (agg.type === "EXPENSE") totalExpense += agg._sum.amount || 0;
    }

    return {
      totalIncome,
      totalExpense,
      net: totalIncome - totalExpense,
    };
  },

  /**
   * 👉 NEW: Fetch aggregated expenses grouped by AI category
   */
  async getCategoryBreakdown(userId: string, startDate: Date, endDate: Date) {
    const aggregations = await prisma.transaction.groupBy({
      by: ["category"],
      where: {
        userId,
        type: "EXPENSE",
        date: { gte: startDate, lte: endDate },
        category: { not: null },
      },
      _sum: { amount: true },
    });

    return aggregations
      .map((a) => ({
        name: a.category!,
        value: a._sum.amount || 0,
      }))
      .sort((a, b) => b.value - a.value);
  },

  /**
   * 👉 NEW: Fetch daily cash flow aggregations for charting
   */
  async getCashFlow(userId: string, startDate: Date, endDate: Date) {
    // Fetch raw transactions to group safely in memory (avoids Prisma/Postgres timezone edge cases)
    const transactions = await prisma.transaction.findMany({
      where: { userId, date: { gte: startDate, lte: endDate } },
      select: { date: true, amount: true, type: true },
    });

    // Create a map of all days in the interval initialized to 0
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const flowMap = new Map(
      days.map((day) => [format(day, "MMM dd"), { date: format(day, "MMM dd"), income: 0, expense: 0 }])
    );

    // Populate the map with actual data
    for (const t of transactions) {
      const dateKey = format(t.date, "MMM dd");
      const existing = flowMap.get(dateKey);
      if (existing) {
        if (t.type === "INCOME") existing.income += t.amount;
        else existing.expense += t.amount;
      }
    }

    return Array.from(flowMap.values());
  },

  async create(data: CreateTransactionInput): Promise<Transaction> {
    return prisma.transaction.create({ data });
  },

  async createMany(data: CreateTransactionInput[]): Promise<Prisma.BatchPayload> {
    return prisma.transaction.createMany({ data, skipDuplicates: true });
  },

  async batchUpdateCategories(userId: string, updates: { transactionId: string; category: string }[]): Promise<void> {
    const updatePromises = updates.map((update) =>
      prisma.transaction.updateMany({
        where: { id: update.transactionId, userId: userId },
        data: { category: update.category },
      })
    );
    await prisma.$transaction(updatePromises);
  },
  
  async delete(transactionId: string, userId: string): Promise<Transaction> {
    return prisma.transaction.delete({
      where: { id: transactionId, userId: userId },
    });
  }
};