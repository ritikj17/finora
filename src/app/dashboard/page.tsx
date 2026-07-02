import * as React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  // We fetch the session again to personalize the greeting. 
  // Next.js caches this aggressively, so it won't hit the database twice.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {session?.user?.name?.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground mt-1">
          Here is your financial overview for {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}.
        </p>
      </div>

      {/* Grid for upcoming Data Cards (Sprint 6) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col gap-2 h-32 animate-pulse">
            <div className="h-4 w-1/2 bg-muted rounded"></div>
            <div className="h-8 w-3/4 bg-muted rounded mt-auto"></div>
          </div>
        ))}
      </div>
      
      {/* Container for upcoming Chart / Tables */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 col-span-4 h-96 animate-pulse">
          <div className="h-4 w-1/3 bg-muted rounded mb-4"></div>
          <div className="h-full w-full bg-muted/50 rounded"></div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 col-span-3 h-96 animate-pulse">
          <div className="h-4 w-1/2 bg-muted rounded mb-4"></div>
          <div className="h-full w-full bg-muted/50 rounded"></div>
        </div>
      </div>
    </div>
  );
}