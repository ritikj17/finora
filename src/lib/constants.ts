/**
 * src/lib/constants.ts
 *
 * Single source of truth for application-wide constants.
 * Import from here instead of defining inline in components.
 */

/**
 * Canonical list of AI budget categories.
 * Must stay in sync with the AI categorization prompt in:
 * src/server/ai/prompts/categorization.ts
 */
export const CATEGORIES = [
  "Housing",
  "Transportation",
  "Food & Dining",
  "Utilities",
  "Insurance",
  "Healthcare",
  "Savings & Investments",
  "Personal Care",
  "Entertainment",
  "Miscellaneous",
] as const;

export type Category = (typeof CATEGORIES)[number];

/**
 * Transaction type enum values
 */
export const TRANSACTION_TYPES = ["INCOME", "EXPENSE"] as const;
export type TransactionType = (typeof TRANSACTION_TYPES)[number];

/**
 * Application routes
 */
export const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  DASHBOARD: "/dashboard",
  TRANSACTIONS: "/dashboard/transactions",
  ANALYTICS: "/dashboard/analytics",
  ADVISOR: "/dashboard/advisor",
  SETTINGS: "/dashboard/settings",
  HOW_IT_WORKS: "/how-it-works",
} as const;

/**
 * Chart color palette - premium fintech palette aligned with the indigo/blue theme
 */
export const CHART_COLORS = [
  "#6366f1", // indigo-500
  "#8b5cf6", // violet-500
  "#06b6d4", // cyan-500
  "#10b981", // emerald-500
  "#f59e0b", // amber-500
  "#ef4444", // red-500
  "#ec4899", // pink-500
  "#14b8a6", // teal-500
  "#f97316", // orange-500
  "#84cc16", // lime-500
] as const;

export const INCOME_COLOR = "#10b981"; // emerald-500
export const EXPENSE_COLOR = "#f43f5e"; // rose-500
