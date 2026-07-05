"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format } from "date-fns";

interface TrendData {
  date: string;
  income: number;
  expense: number;
}

export function TrendChart({ data }: { data: TrendData[] }) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col h-[400px] items-center justify-center text-center">
        <h3 className="font-semibold">No Trend Data</h3>
        <p className="text-sm text-muted-foreground mt-2">Add transactions to see your historical trends.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col h-[450px]">
      <div className="flex flex-col space-y-1.5 mb-6">
        <h3 className="font-semibold leading-none tracking-tight">Cash Flow Trends</h3>
        <p className="text-sm text-muted-foreground">30-day historical view of money in vs. money out.</p>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(val) => format(new Date(val), "MMM dd")}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              tickFormatter={(val) => `$${val}`}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dx={-10}
            />
            <Tooltip 
              labelFormatter={(label) => format(new Date(label), "MMMM dd, yyyy")}
              formatter={(value: number) => [`$${value.toFixed(2)}`, undefined]}
              contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))' }}
            />
            <Area 
              type="monotone" 
              dataKey="income" 
              name="Income"
              stroke="#10b981" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorIncome)" 
            />
            <Area 
              type="monotone" 
              dataKey="expense" 
              name="Expenses"
              stroke="#f43f5e" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorExpense)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}