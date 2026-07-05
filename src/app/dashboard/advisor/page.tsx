// src/app/dashboard/advisor/page.tsx
import * as React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ChatInterface } from "@/components/dashboard/chat-interface";

export const metadata = {
  title: "AI Advisor | Finora",
  description: "Chat with your personal financial AI.",
};

export default async function AdvisorPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto h-full p-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">AI Advisor</h1>
        <p className="text-muted-foreground">
          Ask questions about your spending, get budget recommendations, and analyze your cash flow.
        </p>
      </div>

      <ChatInterface />
    </div>
  );
}