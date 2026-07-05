// src/app/page.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  // Smooth scroll handler for anchor links
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20 overflow-x-hidden">
      {/* Navigation Bar - Glassmorphism */}
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
            <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="hover:text-primary transition-colors">How it Works</a>
            <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="hover:text-primary transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:inline-flex" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25" asChild>
              <Link href="/sign-in">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center pt-16">
        {/* Modern Hero Section */}
        <section className="w-full pt-32 pb-24 md:pt-40 md:pb-32 flex flex-col items-center justify-center text-center px-4 relative">
          {/* Animated Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="inline-flex items-center rounded-full border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 mb-8 relative z-10 backdrop-blur-sm">
            <span className="flex size-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Finora AI Advisor is now live
          </div>
          
          <h1 className="max-w-5xl text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 relative z-10 leading-tight">
            Financial clarity, <br className="hidden md:block" /> powered by <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">Intelligence.</span>
          </h1>
          
          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-10 relative z-10 leading-relaxed">
            Stop tracking expenses manually. Finora uses autonomous AI to categorize your transactions, forecast your cash flow, and keep your budgets on track.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
            <Button size="lg" className="h-14 px-8 text-base bg-foreground text-background hover:bg-foreground/90 shadow-xl transition-transform hover:scale-105" asChild>
              <Link href="/sign-in">Start for free</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base bg-background/50 backdrop-blur-sm border-border hover:bg-accent transition-transform hover:scale-105" asChild>
              <a href="#features" onClick={(e) => scrollToSection(e, 'features')}>Explore features</a>
            </Button>
          </div>
        </section>

        {/* Colorful Feature Grid */}
        <section id="features" className="w-full max-w-6xl mx-auto py-24 px-4 scroll-mt-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Everything you need to build wealth</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A complete suite of financial tools designed to automate the boring stuff so you can focus on the big picture.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col p-8 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="size-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Budgeting</h3>
              <p className="text-muted-foreground flex-1 leading-relaxed">
                Set dynamic limits for any category. Get visual alerts when you are close to exceeding your monthly allowance.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col p-8 rounded-3xl bg-gradient-to-b from-primary/5 to-transparent border border-primary/20 shadow-sm hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              </div>
              <div className="size-14 rounded-2xl bg-primary flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary/30 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10">AI Advisor</h3>
              <p className="text-muted-foreground flex-1 leading-relaxed relative z-10">
                Chat directly with your financial data. Ask questions about your spending habits and get personalized, data-driven advice.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col p-8 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="size-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Visual Analytics</h3>
              <p className="text-muted-foreground flex-1 leading-relaxed">
                Beautiful, interactive Recharts instantly break down your income vs. expenses, helping you spot trends instantly.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full max-w-6xl mx-auto py-24 px-4 scroll-mt-16 border-t">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Start for free, upgrade when you need advanced AI insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="flex flex-col p-8 rounded-3xl bg-card border shadow-sm">
              <h3 className="text-xl font-medium text-muted-foreground mb-2">Basic</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/ forever</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3"><svg className="text-primary size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> 100 Transactions/mo</li>
                <li className="flex items-center gap-3"><svg className="text-primary size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> Standard Categorization</li>
                <li className="flex items-center gap-3"><svg className="text-primary size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> Basic Dashboards</li>
              </ul>
              <Button variant="outline" className="w-full h-12" asChild>
                <Link href="/sign-in">Get Started</Link>
              </Button>
            </div>

            {/* Pro Tier */}
            <div className="flex flex-col p-8 rounded-3xl bg-card border-2 border-primary shadow-xl shadow-primary/10 relative scale-105 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                MOST POPULAR
              </div>
              <h3 className="text-xl font-medium text-primary mb-2">Pro</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold">$9</span>
                <span className="text-muted-foreground">/ month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3"><svg className="text-primary size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> Unlimited Transactions</li>
                <li className="flex items-center gap-3"><svg className="text-primary size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> Gemini AI Chat Advisor</li>
                <li className="flex items-center gap-3"><svg className="text-primary size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> Advanced Forecasting</li>
                <li className="flex items-center gap-3"><svg className="text-primary size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> Custom Budget Limits</li>
              </ul>
              <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white" asChild>
                <Link href="/sign-in">Upgrade to Pro</Link>
              </Button>
            </div>

            {/* Enterprise Tier */}
            <div className="flex flex-col p-8 rounded-3xl bg-card border shadow-sm lg:scale-100 sm:scale-100 scale-100 lg:-ml-4 z-0">
              <h3 className="text-xl font-medium text-muted-foreground mb-2">Enterprise</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-muted-foreground">/ month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3"><svg className="text-primary size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> Multiple Workspaces</li>
                <li className="flex items-center gap-3"><svg className="text-primary size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> API Access</li>
                <li className="flex items-center gap-3"><svg className="text-primary size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> Custom integrations</li>
              </ul>
              <Button variant="outline" className="w-full h-12" asChild>
                <Link href="/sign-in">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30 mt-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-muted-foreground text-sm">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
             <div className="size-6 rounded-md bg-muted-foreground/20 flex items-center justify-center text-foreground font-bold text-xs">F</div>
             <span className="font-semibold text-foreground">Finora</span>
          </div>
          <p>© {new Date().getFullYear()} Finora AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}