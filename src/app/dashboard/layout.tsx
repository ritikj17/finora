import * as React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";

export const metadata = {
  title: "Dashboard | FinPilot AI",
  description: "Manage your financial transactions, analytics, and AI insights.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Extract the session securely on the server
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Fallback protection: If they bypassed the proxy somehow, kick them out
  if (!session || !session.user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header user={{ name: session.user.name, email: session.user.email }} />
        
        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}