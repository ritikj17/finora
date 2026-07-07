/**
 * src/lib/format.ts
 *
 * Shared formatting utilities — single source of truth.
 * Eliminates the duplicate formatCurrency defined in 3+ components.
 */

/**
 * Formats a number as a USD currency string.
 * e.g. 1234.5 → "$1,234.50"
 */
export function formatCurrency(
  value: number,
  options?: { maximumFractionDigits?: number }
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: options?.maximumFractionDigits ?? 2,
  }).format(value);
}

/**
 * Formats a number as a percentage string.
 * e.g. 0.75 → "75%" or 75 → "75%"
 */
export function formatPercent(value: number, isDecimal = false): string {
  const numericValue = isDecimal ? value * 100 : value;
  return `${numericValue.toFixed(1)}%`;
}

/**
 * Formats a large number with K/M suffix.
 * e.g. 1500 → "$1.5k", 1200000 → "$1.2M"
 */
export function formatCompactCurrency(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}k`;
  }
  return formatCurrency(value);
}

/**
 * Returns a sign prefix string for a transaction amount.
 * e.g. type="INCOME" → "+" | type="EXPENSE" → "-"
 */
export function getTransactionSign(type: string): "+" | "-" {
  return type === "INCOME" ? "+" : "-";
}

/**
 * Calculates savings rate as a percentage.
 * Returns 0 if income is 0 to avoid division by zero.
 */
export function calculateSavingsRate(income: number, expense: number): number {
  if (income === 0) return 0;
  return Math.max(0, ((income - expense) / income) * 100);
}
