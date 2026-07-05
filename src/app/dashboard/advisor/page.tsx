import * as React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Analytics | Finora",
  description: "Advanced financial forecasting and analytics.",
};

export default async function AnalyticsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto h-full p-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Advanced Analytics</h1>
        <p className="text-muted-foreground">
          Deep-dive into your financial trends and AI forecasting.
        </p>
      </div>

      <div className="rounded-xl border border-dashed bg-card/50 p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
        </div>
        <h2 className="text-xl font-bold tracking-tight mb-2">Pro Analytics Coming Soon</h2>
        <p className="text-muted-foreground max-w-md mb-6">
          We are currently building advanced forecasting models, custom date-range reporting, and exportable tax documents.
        </p>
        <Button asChild>
          <Link href="/dashboard">Return to Overview</Link>
        </Button>
      </div>
    </div>
  );
}