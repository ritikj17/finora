"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";

interface CategoryData {
  name: string;
  value: number;
}

const COLORS = [
  "#2563eb", "#db2777", "#059669", "#d97706", "#7c3aed", 
  "#0891b2", "#be123c", "#4d7c0f", "#a21caf", "#be185d"
];

export function CategoryBarChart({ data }: { data: CategoryData[] }) {
  // Sort data descending so the highest expense is at the top
  const sortedData = [...data].sort((a, b) => a.value - b.value);

  if (data.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col h-[450px] items-center justify-center text-center">
        <h3 className="font-semibold">No Category Data</h3>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col h-[450px]">
      <div className="flex flex-col space-y-1.5 mb-6">
        <h3 className="font-semibold leading-none tracking-tight">Category Breakdown</h3>
        <p className="text-sm text-muted-foreground">Highest spending areas ranked by volume.</p>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sortedData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              type="number"
              tickFormatter={(val) => `$${val}`}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              dataKey="name" 
              type="category"
              stroke="hsl(var(--foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={100}
            />
            <Tooltip 
              cursor={{ fill: 'hsl(var(--muted))' }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, "Spent"]}
              contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))' }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[(sortedData.length - 1 - index) % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}