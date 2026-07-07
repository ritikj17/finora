"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/lib/format";
import { INCOME_COLOR, EXPENSE_COLOR } from "@/lib/constants";

interface TrendData {
  date: string;
  income: number;
  expense: number;
}

// Unique IDs - different from cash-flow-chart.tsx to avoid SVG gradient collisions
const GRADIENT_INCOME_ID = "trend-income";
const GRADIENT_EXPENSE_ID = "trend-expense";

export function TrendChart({ data }: { data: TrendData[] }) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col h-[420px] items-center justify-center text-center">
        <div className="size-12 rounded-xl bg-muted flex items-center justify-center mb-4" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
        </div>
        <h3 className="font-semibold">No Trend Data</h3>
        <p className="text-sm text-muted-foreground mt-1.5 max-w-xs">
          Add transactions to see your historical cash flow trends.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col h-[420px]">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-semibold leading-none tracking-tight">
            Cash Flow Trends
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            60-day historical income vs. expenses
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground" aria-hidden="true">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-500" />
            Income
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-rose-500" />
            Expenses
          </span>
        </div>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            aria-label="60-day trend area chart"
          >
            <defs>
              <linearGradient id={GRADIENT_INCOME_ID} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={INCOME_COLOR} stopOpacity={0.25} />
                <stop offset="95%" stopColor={INCOME_COLOR} stopOpacity={0} />
              </linearGradient>
              <linearGradient id={GRADIENT_EXPENSE_ID} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={EXPENSE_COLOR} stopOpacity={0.25} />
                <stop offset="95%" stopColor={EXPENSE_COLOR} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(var(--border))"
              strokeOpacity={0.6}
            />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              tickFormatter={(v) => `$${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid hsl(var(--border))",
                backgroundColor: "hsl(var(--card))",
                color: "hsl(var(--card-foreground))",
                fontSize: "12px",
                padding: "10px 14px",
              }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any, name: any) => [
                formatCurrency(value),
                name === "income" ? "Income" : "Expenses",
              ]}
              labelStyle={{ color: "hsl(var(--muted-foreground))", fontSize: "11px", marginBottom: "4px" }}
            />
            <Area
              type="monotone"
              dataKey="income"
              name="income"
              stroke={INCOME_COLOR}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#${GRADIENT_INCOME_ID})`}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0, fill: INCOME_COLOR }}
            />
            <Area
              type="monotone"
              dataKey="expense"
              name="expense"
              stroke={EXPENSE_COLOR}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#${GRADIENT_EXPENSE_ID})`}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0, fill: EXPENSE_COLOR }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}