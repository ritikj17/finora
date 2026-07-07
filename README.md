# Finora — AI-Powered Personal Finance SaaS

<div align="center">
  <img src="public/og-image.png" alt="Finora Dashboard" width="800" />
  <br/><br/>
  <strong>A production-quality full-stack fintech application built for portfolio impact.</strong>
  <br/>
  Next.js · Prisma · PostgreSQL · Google Gemini AI · Better Auth
</div>

---

## Overview

**Finora** is a full-stack personal finance SaaS that autonomously categorizes transactions using Google Gemini AI, tracks budgets in real-time, and delivers a RAG-powered financial advisor chat.

It is engineered to production-quality standards — strict TypeScript, server-side data fetching, edge-level authentication middleware, repository pattern, and CI/CD via GitHub Actions.

---

## Features

| Feature | Description |
|---|---|
| **AI Categorization** | Gemini batch-classifies transactions into 10 budget categories |
| **RAG Financial Advisor** | Chat injects your real financial data into the LLM context window |
| **Budget Tracking** | Set monthly limits per category with real-time progress bars |
| **Cash Flow Analytics** | Area charts and category breakdowns with Recharts |
| **CSV Import** | Drag-and-drop bank statement ingestion with client-side validation |
| **Theme Toggle** | Light / Dark / System preference support |
| **Edge Auth** | Better Auth sessions with Next.js edge middleware guard |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Server Components, Server Actions) |
| **Database** | PostgreSQL via Neon serverless |
| **ORM** | Prisma 7 with `@prisma/adapter-pg` |
| **Authentication** | Better Auth (HTTP-only cookies, 7-day sessions) |
| **AI** | Google Gemini 2.5 Flash / Pro with exponential backoff |
| **Charts** | Recharts (AreaChart, PieChart, BarChart) |
| **Animations** | Framer Motion |
| **Validation** | Zod + React Hook Form |
| **Styling** | TailwindCSS v4 + CSS custom properties |
| **Package Manager** | pnpm |

---

## Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Sign-in / Sign-up pages
│   ├── api/                # API routes (AI, budgets, transactions)
│   ├── dashboard/          # Authenticated dashboard pages
│   ├── how-it-works/       # Architecture showcase page
│   └── page.tsx            # Public landing page
├── components/
│   ├── dashboard/          # Dashboard-specific components
│   └── ui/                 # Primitive UI components
├── lib/
│   ├── auth.ts             # Better Auth server config
│   ├── auth-client.ts      # Better Auth client config
│   ├── constants.ts        # CATEGORIES, CHART_COLORS, ROUTES
│   ├── format.ts           # formatCurrency, calculateSavingsRate
│   └── utils.ts            # Tailwind cn() utility
├── middleware.ts            # Edge auth guard for /dashboard/*
├── providers/              # ThemeProvider, ToastProvider
├── server/
│   ├── ai/                 # Gemini client, router, prompts
│   ├── actions/            # Server actions (ai, transactions)
│   ├── db/                 # Prisma singleton
│   └── repositories/       # TransactionRepository, BudgetRepository
└── types/                  # Shared TypeScript interfaces
```

### Key Design Decisions

**Repository Pattern**: All database operations go through typed repository classes (`TransactionRepository`, `BudgetRepository`). This decouples business logic from raw SQL and makes testing trivial.

**AI Router with Fallback**: `generateWithFallback()` retries with exponential backoff across model versions. Gemini 2.5 Flash for speed, 2.5 Pro as fallback.

**Retrieval-Augmented Generation**: The AI advisor fetches the user's 30-day summary + active budgets from the database and injects them into the Gemini prompt before every response. Every answer is grounded in real data.

**User-Scoped Queries**: Every database query includes a `userId` filter. It's structurally impossible to access another user's data.

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL database (recommend [Neon](https://neon.tech) — free tier available)
- Google AI API key from [aistudio.google.com](https://aistudio.google.com)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/finora.git
cd finora

# 2. Install dependencies
pnpm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your values

# 4. Generate Prisma client and run migrations
pnpm prisma generate
pnpm prisma migrate dev

# 5. (Optional) Seed with demo data
# First, sign up through the UI, then:
pnpm db:seed

# 6. Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

```env
# PostgreSQL connection string (from Neon or local)
DATABASE_URL="postgresql://user:password@host:5432/finora"

# Google Gemini API key (from aistudio.google.com)
GEMINI_API_KEY="your-gemini-api-key"

# Better Auth secret (generate with: openssl rand -base64 32)
BETTER_AUTH_SECRET="your-secret-32-chars"

# App URL (used for metadata and auth redirects)
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### CSV Format

To import transactions, upload a CSV with these exact headers:

```csv
Date,Description,Amount,Type
2024-01-15,Amazon Prime,14.99,EXPENSE
2024-01-01,Tech Corp Payroll,8500.00,INCOME
```

---

## Development

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm typecheck    # TypeScript type checking
pnpm db:seed      # Seed database with demo data
pnpm db:studio    # Open Prisma Studio
```

---

## Deployment

This app is optimized for [Vercel](https://vercel.com). The `vercel.json` automatically runs `prisma generate` before each build.

**Required environment variables on Vercel:**
- `DATABASE_URL`
- `GEMINI_API_KEY`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL` (your production URL)
- `NEXT_PUBLIC_APP_URL` (your production URL)

---

## License

MIT © Finora. See [LICENSE](LICENSE).
