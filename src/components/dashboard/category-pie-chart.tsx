"use client";

import * as React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface CategoryData {
  name: string;
  value: number;
}

const COLORS = [
  "#2563eb", "#db2777", "#059669", "#d97706", "#7c3aed", 
  "#0891b2", "#be123c", "#4d7c0f", "#a21caf", "#be185d"
];

export function CategoryPieChart({ data }: { data: CategoryData[] }) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col h-[400px] items-center justify-center text-center">
        <h3 className="font-semibold">No Category Data</h3>
        <p className="text-sm text-muted-foreground mt-2">Run AI Categorization to see your spending breakdown.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col h-[400px]">
      <div className="flex flex-col space-y-1.5 mb-2">
        <h3 className="font-semibold leading-none tracking-tight">Spending by Category</h3>
        <p className="text-sm text-muted-foreground">AI-classified expense breakdown.</p>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          {/* Added bottom margin to the chart container */}
          <PieChart margin={{ top: 0, right: 0, bottom: -11, left: 0 }}>
            <Pie
              data={data}
              cx="50%"
              cy="45%" /* Shifted the pie up slightly from 50% */
              innerRadius={75} /* Reduced slightly for proportion */
              outerRadius={105} /* Reduced from 120 to prevent bleeding into legend */
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: any) => `$${Number(value || 0).toFixed(2)}`}
              contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))' }}
            />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center" 
              wrapperStyle={{ 
                fontSize: '12px',
                paddingTop: '20px' /* Forced padding above the legend */
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}