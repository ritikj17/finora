import * as React from "react";

export const metadata = {
  title: "Authentication | Finora",
  description:
    "Sign in or create an account to access your financial dashboard.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full bg-background">
      {children}
    </main>
  );
}