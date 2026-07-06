"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20 overflow-x-hidden">
      {/* Navigation Bar */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-xl tracking-tighter shadow-lg shadow-primary/20">
              F
            </div>
            <span className="font-semibold text-lg tracking-tight text-foreground">
              Finora
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-primary transition-colors">Features</a>
            <Link href="/how-it-works" className="hover:text-primary transition-colors">Architecture</Link>
            <a href="#tech-stack" onClick={(e) => scrollToSection(e, 'tech-stack')} className="hover:text-primary transition-colors">Tech Stack</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:inline-flex" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25" asChild>
              <Link href="/sign-in">Launch App Demo</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center pt-16">
        {/* Hero Section */}
        <section className="w-full pt-32 pb-24 md:pt-40 md:pb-32 flex flex-col items-center justify-center text-center px-4 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="inline-flex items-center rounded-full border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 mb-8 relative z-10 backdrop-blur-sm">
            <span className="flex size-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Full-Stack Engineering Showcase
          </div>
          
          <h1 className="max-w-5xl text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 relative z-10 leading-tight">
            Autonomous financial <br className="hidden md:block" /> intelligence, powered by <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">Gemini AI.</span>
          </h1>
          
          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-10 relative z-10 leading-relaxed">
            A production-ready full-stack web application demonstrating RAG data ingestion, autonomous transaction categorization, and dynamic cash flow forecasting.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
            <Button size="lg" className="h-14 px-8 text-base bg-foreground text-background hover:bg-foreground/90 shadow-xl transition-transform hover:scale-105" asChild>
              <Link href="/sign-in">Explore Live Dashboard</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base bg-background/50 backdrop-blur-sm border-border hover:bg-accent transition-transform hover:scale-105" asChild>
              <a href="#tech-stack" onClick={(e) => scrollToSection(e, 'tech-stack')}>View System Architecture</a>
            </Button>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="w-full max-w-6xl mx-auto py-24 px-4 scroll-mt-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Core Capabilities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Engineered from the ground up to automate raw transaction processing into actionable financial insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col p-8 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="size-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Dynamic Budget Tracking</h3>
              <p className="text-muted-foreground flex-1 leading-relaxed">
                Uses strict Zod schema validation to persist custom category allowances with real-time progress bar rendering.
              </p>
            </div>

            <div className="flex flex-col p-8 rounded-3xl bg-gradient-to-b from-primary/5 to-transparent border border-primary/20 shadow-sm hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
              <div className="size-14 rounded-2xl bg-primary flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary/30 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10">RAG AI CFO Advisor</h3>
              <p className="text-muted-foreground flex-1 leading-relaxed relative z-10">
                Injects aggregated relational database payloads directly into Gemini system prompts for zero-hallucination chat context.
              </p>
            </div>

            <div className="flex flex-col p-8 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="size-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Recharts Analytics Suite</h3>
              <p className="text-muted-foreground flex-1 leading-relaxed">
                Aggregates high-volume transaction arrays into responsive multi-series SVG area charts and horizontal breakdowns.
              </p>
            </div>
          </div>
        </section>

        {/* Tech Stack Breakdown Section */}
        <section id="tech-stack" className="w-full max-w-6xl mx-auto py-24 px-4 scroll-mt-16 border-t">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Built with Modern Architecture</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Designed with strict TypeScript type safety, server-side data fetching, and scalable database indexing.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl bg-card border flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-primary mb-4 font-semibold">Framework</span>
              <div>
                <h4 className="text-lg font-bold mb-1">Next.js 15 App Router</h4>
                <p className="text-sm text-muted-foreground">Server Actions, parallel routing, and optimized Suspense streaming.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-card border flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-primary mb-4 font-semibold">Database</span>
              <div>
                <h4 className="text-lg font-bold mb-1">Prisma & PostgreSQL</h4>
                <p className="text-sm text-muted-foreground">Relational schema design with foreign key constraints and user-scoped indexing.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-card border flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-primary mb-4 font-semibold">Authentication</span>
              <div>
                <h4 className="text-lg font-bold mb-1">Better Auth</h4>
                <p className="text-sm text-muted-foreground">Secure HTTP-only session cookies with client-side state hooks.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-card border flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-primary mb-4 font-semibold">AI Intelligence</span>
              <div>
                <h4 className="text-lg font-bold mb-1">Google Gemini API</h4>
                <p className="text-sm text-muted-foreground">Autonomous JSON categorization engine and natural language conversational interfaces.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30 mt-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-muted-foreground text-sm">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
             <div className="size-6 rounded-md bg-muted-foreground/20 flex items-center justify-center text-foreground font-bold text-xs">F</div>
             <span className="font-semibold text-foreground">Finora Portfolio Project</span>
          </div>
          <p>Engineered for performance, scalability, and clean UX.</p>
        </div>
      </footer>
    </div>
  );
}