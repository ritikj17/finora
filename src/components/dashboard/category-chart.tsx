"use client";

import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface CategoryChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

// A premium palette for categorical data
const COLORS = [
  "hsl(var(--primary))",
  "#3b82f6", // Blue
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#8b5cf6", // Violet
  "#ec4899", // Pink
  "#64748b", // Slate
];

export function CategoryChart({ data }: CategoryChartProps) {
  // Filter out any zero values
  const chartData = data.filter((item) => item.value > 0);

  if (chartData.length === 0) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center text-sm text-muted-foreground">
        No expense data for this period.
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-md flex items-center gap-2">
                    <div 
                      className="size-3 rounded-full" 
                      style={{ backgroundColor: payload[0].payload.fill }}
                    />
                    <span className="text-sm font-medium">
                      {payload[0].name}: ${payload[0].value.toFixed(2)}
                    </span>
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
            formatter={(value) => <span className="text-xs font-medium text-foreground">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}