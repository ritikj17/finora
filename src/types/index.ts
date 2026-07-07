/**
 * src/types/index.ts
 *
 * Shared TypeScript interfaces for the Finora application.
 * Import from here instead of defining inline in components.
 */

// ─── Transaction ────────────────────────────────────────────────────────────

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionSummary {
  totalIncome: number;
  totalExpense: number;
  net: number;
}

export interface CashFlowDataPoint {
  date: string;
  income: number;
  expense: number;
}

export interface CategoryDataPoint {
  name: string;
  value: number;
}

// ─── Budget ──────────────────────────────────────────────────────────────────

export interface BudgetWithProgress {
  id: string;
  category: string;
  limit: number;
  spent: number;
}

// ─── User ────────────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

// ─── AI / Chat ───────────────────────────────────────────────────────────────

export interface ChatMessage {
  role: "user" | "ai";
  content: string;
}

// ─── API Responses ───────────────────────────────────────────────────────────

export interface ApiSuccess<T = void> {
  success: true;
  data?: T;
}

export interface ApiError {
  error: string;
}

export type ApiResult<T = void> = ApiSuccess<T> | ApiError;
