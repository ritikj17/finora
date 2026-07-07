"use client";

import * as React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { formatCurrency } from "@/lib/format";
import { CHART_COLORS } from "@/lib/constants";

interface CategoryPieChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

export function CategoryPieChart({ data }: CategoryPieChartProps) {
  const chartData = data.filter((item) => item.value > 0);

  if (chartData.length === 0) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <div className="text-center">
          <div
            className="size-10 rounded-xl bg-muted flex items-center justify-center mx-auto mb-3"
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-muted-foreground"
            >
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
              <path d="M22 12A10 10 0 0 0 12 2v10z" />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground">
            No expense data for this period.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full mt-4" aria-label="Spending category pie chart">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="45%"
            innerRadius={72}
            outerRadius={96}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CHART_COLORS[index % CHART_COLORS.length]}
                aria-label={`${entry.name}: ${formatCurrency(entry.value)}`}
              />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border border-border bg-card p-2.5 shadow-lg flex items-center gap-2.5">
                    <div
                      className="size-3 rounded-full shrink-0"
                      style={{
                        backgroundColor:
                          CHART_COLORS[
                            chartData.findIndex(
                              (d) => d.name === payload[0].name
                            ) % CHART_COLORS.length
                          ],
                      }}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs font-semibold text-foreground">
                        {payload[0].name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatCurrency(Number(payload[0].value || 0))}
                      </p>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span className="text-xs font-medium text-foreground/80">
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}