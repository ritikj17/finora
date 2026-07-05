import * as React from "react";
import Link from "next/link";

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
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Left Side - Branding & Aesthetics */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-zinc-900/20 mix-blend-multiply" />

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link
            href="/"
            className="flex items-center gap-2 group transition-opacity hover:opacity-80"
          >
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl tracking-tighter">
              F
            </div>
            <span className="font-semibold text-xl tracking-tight text-zinc-100">
              Finora
            </span>
          </Link>
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Finora completely transformed how we manage our startup's
              runway. The automated categorization and predictive modeling saved
              us hundreds of hours.&rdquo;
            </p>
            <footer className="text-sm text-zinc-400">
              Sofia Davis, Founder at Vertex
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Right Side - Form Container */}
      <div className="p-4 lg:p-8 flex items-center justify-center h-screen lg:h-auto">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {children}
        </div>
      </div>
    </div>
  );
}
