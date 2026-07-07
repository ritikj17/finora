import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export const metadata = {
  title: "Architecture & Flow | Finora",
  description: "See how Finora's AI categorizes transactions and builds budgets automatically.",
};

export default function HowItWorksPage() {
  const steps = [
    {
      id: "01",
      title: "Data Ingestion Pipeline",
      description: "Users upload bulk CSV bank statements. Client-side workers parse and sanitize rows before transmitting them securely to our server actions, ensuring zero malformed payloads enter the database.",
      visual: (
        <div className="relative size-full bg-card rounded-2xl border flex items-center justify-center overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-500 relative z-10"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15l3-3 3 3"/></svg>
        </div>
      ),
    },
    {
      id: "02",
      title: "Autonomous AI Categorization",
      description: "Our Gemini-powered backend engine processes unorganized transaction records. It cleans up ambiguous merchant strings and assigns accurate spending categories structured as strictly typed JSON.",
      visual: (
        <div className="relative size-full bg-card rounded-2xl border flex items-center justify-center overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary relative z-10"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z"/></svg>
        </div>
      ),
    },
    {
      id: "03",
      title: "Real-Time Budget Aggregations",
      description: "Relational database queries continuously calculate total categorized spending against user-defined limits. Visual progress components update dynamically with custom CSS thresholds.",
      visual: (
        <div className="relative size-full bg-card rounded-2xl border flex items-center justify-center overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-500 relative z-10"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
      ),
    },
    {
      id: "04",
      title: "Retrieval-Augmented Chat (RAG)",
      description: "When interacting with the AI Advisor, the application injects the user's latest 30-day financial summaries directly into the LLM context window to provide verifiable, mathematical guidance.",
      visual: (
        <div className="relative size-full bg-card rounded-2xl border flex items-center justify-center overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-500 relative z-10"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20 overflow-x-hidden">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Logo />
            <span className="font-semibold text-lg tracking-tight text-foreground">
              Finora
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="/how-it-works" className="text-primary transition-colors">Architecture</Link>
            <Link href="/#tech-stack" className="hover:text-primary transition-colors">Tech Stack</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25" asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center pt-24 pb-32">
        {/* Page Header */}
        <div className="w-full max-w-4xl text-center px-4 mb-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 relative z-10">
            System Architecture
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground relative z-10">
            How Finora processes raw transaction matrices into structured financial intelligence.
          </p>
        </div>

        {/* Alternating Steps */}
        <div className="w-full max-w-6xl mx-auto px-4 flex flex-col gap-24 md:gap-32">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={step.id} className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${!isEven ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 space-y-6">
                  <span className="text-6xl md:text-8xl font-black text-muted/30 -ml-2 select-none tracking-tighter">
                    {step.id}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                    {step.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="flex-1 w-full aspect-square md:aspect-[4/3] max-w-lg relative group">
                   <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-purple-600/30 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-500" />
                   {step.visual}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Call to Action */}
        <div className="w-full max-w-4xl text-center px-4 mt-32">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Ready to test the application?</h2>
          <Button size="lg" className="h-14 px-10 text-base" asChild>
             <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-muted-foreground text-sm">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
             <Logo className="size-6 shadow-none rounded-lg" />
             <span className="font-semibold text-foreground">Finora Portfolio Showcase</span>
          </div>
          <p>Engineered for full-stack performance and scalability.</p>
        </div>
      </footer>
    </div>
  );
}