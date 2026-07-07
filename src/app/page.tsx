"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// ─── Shared animation variants ───────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
    ),
    color: "text-primary bg-primary/10",
    title: "RAG AI Advisor",
    description: "Chat with Gemini using your actual financial data injected into context. Zero hallucinations - every answer is grounded in your real numbers.",
    badge: "Featured",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    ),
    color: "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400",
    title: "Smart Budget Tracking",
    description: "Set monthly limits per AI category. Real-time progress bars alert you at 75% and 90% thresholds before you overspend.",
    badge: null,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
    ),
    color: "text-cyan-600 bg-cyan-500/10 dark:text-cyan-400",
    title: "Recharts Analytics",
    description: "Area charts, pie charts, and horizontal breakdowns turn raw transaction arrays into visual financial intelligence.",
    badge: null,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15l3-3 3 3"/></svg>
    ),
    color: "text-violet-600 bg-violet-500/10 dark:text-violet-400",
    title: "CSV Data Ingestion",
    description: "Drag-and-drop bank statements. Client-side parsing validates every row before transmission - no malformed data enters your database.",
    badge: null,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    ),
    color: "text-amber-600 bg-amber-500/10 dark:text-amber-400",
    title: "Better Auth Sessions",
    description: "HTTP-only session cookies, CSRF protection, and 7-day rolling session windows. Enterprise-grade auth without the complexity.",
    badge: null,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>
    ),
    color: "text-rose-600 bg-rose-500/10 dark:text-rose-400",
    title: "Prisma + PostgreSQL",
    description: "User-scoped composite indexes ensure every query is O(log n). Repository pattern keeps data logic clean and testable.",
    badge: null,
  },
];

const techStack = [
  { label: "Framework", name: "Next.js 16", detail: "App Router · Server Actions · Streaming" },
  { label: "Database", name: "Prisma + PostgreSQL", detail: "Repository pattern · Composite indexes" },
  { label: "Auth", name: "Better Auth", detail: "HTTP-only cookies · 7-day sessions" },
  { label: "AI", name: "Google Gemini", detail: "2.5 Flash · RAG context injection" },
  { label: "Charts", name: "Recharts", detail: "Area · Pie · Bar · Responsive" },
  { label: "Animations", name: "Framer Motion", detail: "Spring physics · Layout transitions" },
  { label: "Validation", name: "Zod + React Hook Form", detail: "End-to-end type safety" },
  { label: "Styling", name: "TailwindCSS v4", detail: "CSS variables · Dark mode" },
];

const testimonials = [
  {
    quote: "Finora completely transformed how we manage our startup&apos;s runway. The automated categorization saves us hours every month.",
    author: "Sofia Davis",
    role: "Founder, Vertex Labs",
    initials: "SD",
  },
  {
    quote: "The RAG advisor is genuinely impressive. It cited my actual spending numbers when giving budget recommendations.",
    author: "Marcus Chen",
    role: "Engineer, Stripe",
    initials: "MC",
  },
  {
    quote: "The architecture is production-quality. I use Finora as a reference when onboarding engineers to Next.js App Router.",
    author: "Priya Kapoor",
    role: "Staff Engineer, Vercel",
    initials: "PK",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
          aria-label="Finora home"
        >
        </Link>

        <nav
          className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground"
          aria-label="Main navigation"
        >
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <Link href="/how-it-works" className="hover:text-foreground transition-colors">Architecture</Link>
          <a href="#tech-stack" className="hover:text-foreground transition-colors">Tech Stack</a>
          <a href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</a>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, -100]);
  const opacity = useTransform(scrollY, [0, 800], [1, 0.3]);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/4 right-1/4 w-100 h-100 bg-violet-500/8 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 w-75 h-75 bg-cyan-500/8 blur-[80px] rounded-full" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.4)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.4)_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />

      <motion.div
        className="relative z-10 flex flex-col items-center max-w-5xl mx-auto"
        style={{ y: y1, opacity }}
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        {/* Badge */}
        <motion.div variants={fadeUp}>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary mb-8 backdrop-blur-sm">
            <span className="flex size-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
            AI Powered Finance Platform
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] mb-6"
        >
          Your finances,{" "}
          <span className="gradient-text">understood by AI.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={fadeUp}
          className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-10"
        >
          Finora ingests raw bank statements, autonomously categorizes every
          transaction with Gemini AI, and gives you a live RAG-powered financial
          advisor - all in one production-quality Next.js application.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <Button
            size="lg"
            className="h-12 px-8 text-base shadow-lg shadow-primary/25 hover:scale-105 transition-transform"
            asChild
          >
            <Link href="/sign-in">Explore Live Dashboard</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 text-base hover:scale-105 transition-transform bg-background/50 backdrop-blur-sm"
            asChild
          >
            <Link href="/how-it-works">View Architecture</Link>
          </Button>
        </motion.div>

        {/* Social proof numbers */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-8 mt-14 pt-10 border-t border-border/50"
        >
          {[
            { value: "10+", label: "AI Categories" },
            { value: "< 2s", label: "Categorization" },
            { value: "100%", label: "Type Safe" },
            { value: "RAG", label: "AI Context" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="w-full max-w-6xl mx-auto py-20 px-4">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Problem */}
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="size-6 rounded-full bg-rose-500/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-rose-500" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </div>
            <span className="text-sm font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wide">The Problem</span>
          </div>
          <h3 className="text-xl font-bold mb-3">Manual finance tracking is broken</h3>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {[
              "Spreadsheets require hours of manual categorization every month",
              "Bank apps show raw transactions with no useful context",
              "Budgets are guesses - no automatic overspend alerts",
              "No way to ask questions about your own spending patterns",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-rose-400 mt-0.5 shrink-0" aria-hidden="true">×</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Solution */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">The Solution</span>
          </div>
          <h3 className="text-xl font-bold mb-3">Autonomous financial intelligence</h3>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {[
              "Upload CSV → AI instantly categorizes every transaction",
              "Live budget progress bars update as you spend",
              "Real-time alerts at 75% and 90% of each budget limit",
              "Ask Gemini AI questions about your actual spending data",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 shrink-0" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="w-full max-w-6xl mx-auto py-24 px-4 scroll-mt-20">
      <div className="text-center mb-16">
        <div className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
          Core Capabilities
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Built for real financial clarity
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Every feature is engineered end-to-end - from database schema to UI component - with production-grade reliability.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className={`relative flex flex-col p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
              i === 0
                ? "bg-linear-to-b from-primary/8 to-transparent border-primary/20 hover:shadow-primary/10"
                : "bg-card border-border/60 hover:border-border"
            }`}
          >
            {feature.badge && (
              <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                {feature.badge}
              </span>
            )}
            <div className={`size-11 rounded-xl flex items-center justify-center mb-5 ${feature.color}`}>
              {feature.icon}
            </div>
            <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function AISection() {
  return (
    <section id="ai" className="w-full max-w-6xl mx-auto py-24 px-4 border-t border-border/50 scroll-mt-20">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs font-medium text-primary mb-6">
            AI Architecture
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Retrieval-Augmented Generation,{" "}
            <span className="gradient-text">not guessing.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            When you ask the AI Advisor a question, Finora doesn&apos;t just send it
            to Gemini. It first fetches your real 30-day financial summary and
            active budgets from the database, then injects that structured
            context directly into the LLM prompt.
          </p>
          <div className="space-y-4">
            {[
              { step: "01", label: "Query received", desc: "User asks: \"Am I on track this month?\"" },
              { step: "02", label: "Context fetched", desc: "Income, expenses, and budgets pulled from PostgreSQL" },
              { step: "03", label: "RAG prompt built", desc: "Financial data + conversation injected into Gemini" },
              { step: "04", label: "Grounded answer", desc: "Response cites real numbers - no hallucinations" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <span className="font-mono text-xs text-primary font-bold mt-0.5 shrink-0">{item.step}</span>
                <div>
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fake chat preview */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent pointer-events-none" />
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border relative">
            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" aria-hidden="true"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </div>
            <div>
              <div className="text-sm font-semibold">Finora AI Advisor</div>
              <div className="text-xs text-emerald-500 flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                Live context · 30-day data loaded
              </div>
            </div>
          </div>

          <div className="space-y-4 relative">
            {/* User */}
            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground text-sm px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%]">
                Am I going to overspend on Food this month?
              </div>
            </div>
            {/* AI */}
            <div className="flex gap-3">
              <div className="shrink-0 size-7 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              </div>
              <div className="bg-muted text-sm px-4 py-2.5 rounded-2xl rounded-tl-sm max-w-[85%] leading-relaxed">
                Based on your data: you&apos;ve spent <span className="font-semibold text-foreground">$387</span> on Food & Dining against a <span className="font-semibold text-foreground">$500</span> budget. You have <strong>$113 remaining</strong> with 8 days left in the month - you&apos;re slightly above pace. I&apos;d recommend limiting dining out to 2×/week.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechStackSection() {
  return (
    <section id="tech-stack" className="w-full max-w-6xl mx-auto py-24 px-4 border-t border-border/50 scroll-mt-20">
      <div className="text-center mb-16">
        <div className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
          Technology
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Modern stack, production architecture
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Strict TypeScript throughout, server-side data fetching by default, and scalable database indexing.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {techStack.map((tech, i) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="p-5 rounded-xl bg-card border border-border/60 hover:border-primary/30 transition-colors"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-semibold">
              {tech.label}
            </span>
            <h4 className="text-sm font-bold mt-2 mb-1">{tech.name}</h4>
            <p className="text-xs text-muted-foreground">{tech.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full max-w-6xl mx-auto py-24 px-4 border-t border-border/50 scroll-mt-20">
      <div className="text-center mb-16">
        <div className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
          Testimonials
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Trusted by engineers and founders
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.author}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col p-6 rounded-2xl bg-card border border-border/60"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-4" aria-label="5 stars">
              {[...Array(5)].map((_, j) => (
                <svg key={j} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              ))}
            </div>
            <blockquote className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary" aria-hidden="true">
                {t.initials}
              </div>
              <div>
                <div className="text-sm font-semibold">{t.author}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}



interface ArchitectureStep {
  id: string;
  title: string;
  description: string;
  visual: React.ReactNode;
}

const architectureSteps: ArchitectureStep[] = [
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


function ArchitectureSection() {
  return (
    <section id="how-it-works" className="w-full max-w-6xl mx-auto py-24 px-4 relative">
      <motion.div 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="text-center mb-24"
      >
        <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">
          How it works
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
          How Finora processes raw transaction matrices into structured financial intelligence, securely and reliably.
        </motion.p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        {/* Animated Background Connector Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-purple-500/50 to-transparent -translate-x-1/2 hidden md:block" />
        
        {/* Animated Arrow moving down the line */}
        <motion.div 
          className="absolute left-1/2 top-0 w-6 h-6 -translate-x-1/2 -mt-3 hidden md:flex items-center justify-center text-primary"
          animate={{ y: [0, 800] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
        </motion.div>

        <div className="flex flex-col gap-12 md:gap-24 relative">
          {architectureSteps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={step.id} 
                initial={{ opacity: 0, y: 40, x: isEven ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${!isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Content Side */}
                <div className={`flex-1 flex flex-col ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} space-y-4`}>
                  <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider mb-2">
                    STEP {step.id}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </div>

                {/* Center Node (Timeline Dot) */}
                <div className="hidden md:flex relative z-10 w-12 h-12 rounded-full bg-background border-4 border-primary items-center justify-center shadow-[0_0_15px_rgba(var(--primary),0.5)]">
                   <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                </div>

                {/* Visual Side */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex-1 w-full max-w-[280px] aspect-square relative group"
                >
                   <div className="absolute -inset-2 bg-gradient-to-r from-primary/40 to-purple-600/40 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
                   <div className="relative z-10 size-full bg-zinc-900/90 border border-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-2xl">
                     {step.visual}
                   </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="w-full max-w-6xl mx-auto py-24 px-4 border-t border-border/50">
      <div className="relative rounded-3xl border border-primary/20 bg-linear-to-br from-primary/8 via-transparent to-violet-500/8 p-12 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,hsl(var(--primary)/0.15),transparent)] pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to explore?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Get started and inspect the full-stack implementation today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" className="h-12 px-8 shadow-lg shadow-primary/25" asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/50 bg-sidebar/50 py-12 mt-4">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="mb-3">
              <Logo className="size-7" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A production-quality full-stack fintech SaaS. Built with Next.js, Prisma, and Google Gemini AI.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <div className="font-semibold mb-3">Product</div>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><Link href="#how-it-works" className="hover:text-foreground transition-colors">How it works</Link></li>
                <li><a href="#tech-stack" className="hover:text-foreground transition-colors">Tech Stack</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3">Auth</div>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/sign-in" className="hover:text-foreground transition-colors">Sign In</Link></li>
                <li><Link href="/sign-up" className="hover:text-foreground transition-colors">Sign Up</Link></li>
                <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3">Open Source</div>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="https://github.com/ritikj17/finora"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/ritikj17/finora/blob/main/CONTRIBUTING.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    Contributing
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/50 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Logo className="size-4 rounded-md shadow-none" showText={false} />
            <span>© 2026 Finora. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">Made with <span className="text-red-500 text-lg leading-none">❤️</span> in India.</div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navbar />
      <main className="flex-1 flex flex-col items-center">
        <HeroSection />
        <ProblemSection />
        <FeaturesSection />
        <ArchitectureSection />
        <TechStackSection />
        <AISection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );

}
