import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Finora | AI-Powered Financial Intelligence",
  description: "Take control of your cash flow with autonomous AI categorization and smart budgeting.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl tracking-tighter">
              F
            </div>
            <span className="font-semibold text-lg tracking-tight text-foreground">
              Finora
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</Link>
            <Link href="/dashboard/analytics" className="hover:text-foreground transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-in">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full py-24 md:py-32 lg:py-40 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium text-primary bg-primary/5 mb-6 relative z-10">
            <span className="flex size-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Finora AI Advisor is now live
          </div>
          
          <h1 className="max-w-4xl text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 relative z-10">
            Financial clarity, <br className="hidden md:block" /> powered by <span className="text-primary">Intelligence.</span>
          </h1>
          
          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-10 relative z-10">
            Stop tracking expenses manually. Finora uses autonomous AI to categorize your transactions, forecast your cash flow, and keep your budgets on track.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
            <Button size="lg" className="h-12 px-8 text-base" asChild>
              <Link href="/sign-in">Start for free</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-background" asChild>
              <Link href="#features">Explore features</Link>
            </Button>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="w-full max-w-6xl mx-auto py-24 px-4 border-t">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Everything you need to build wealth</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A complete suite of financial tools designed to automate the boring stuff so you can focus on the big picture.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col p-6 rounded-2xl bg-card border shadow-sm">
              <div className="size-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Budgeting</h3>
              <p className="text-muted-foreground flex-1">
                Set dynamic limits for any category. Get visual alerts when you are close to exceeding your monthly allowance.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col p-6 rounded-2xl bg-card border shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              </div>
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">AI Advisor</h3>
              <p className="text-muted-foreground flex-1 relative z-10">
                Chat directly with your financial data. Ask questions about your spending habits and get personalized, data-driven advice.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col p-6 rounded-2xl bg-card border shadow-sm">