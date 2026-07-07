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

interface CashFlowData {
  date: string;
  income: number;
  expense: number;
}

// Unique IDs to avoid SVG gradient collisions with other chart components on the same page
const GRADIENT_INCOME_ID = "cashflow-income";
const GRADIENT_EXPENSE_ID = "cashflow-expense";

export function CashFlowChart({ data }: { data: CashFlowData[] }) {
  if (data.length === 0) return null;

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col h-[360px]">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold leading-none tracking-tight">
            Cash Flow Overview
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Income vs. expenses over the last 30 days.
          </p>
        </div>
        <div
          className="flex items-center gap-4 text-xs text-muted-foreground"
          aria-hidden="true"
        >
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
            aria-label="Cash flow area chart"
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
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
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