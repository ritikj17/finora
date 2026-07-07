# Finora - AI-Powered Personal Finance SaaS

<div align="center">
  <img src="public/og-image.png" alt="Finora Dashboard" width="800" style="border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);" />
  <br/><br/>
  
  [![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io)
  [![PostgreSQL](https://img.shields.io/badge/Neon-Postgres-336791?style=for-the-badge&logo=postgresql)](https://neon.tech)
  [![Gemini](https://img.shields.io/badge/AI-Google_Gemini-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
  
  <strong>A production-quality full-stack fintech application built for massive impact.</strong>
</div>

---

## 🚀 Overview

**Finora** is a state-of-the-art personal finance SaaS that autonomously categorizes transactions using Google Gemini AI, tracks budgets in real-time, and delivers a RAG-powered financial advisor chat.

Engineered to production-quality standards, it features strict TypeScript, server-side data fetching, edge-level authentication middleware, repository pattern, and a flawless premium UI utilizing custom cursors, Framer Motion, and Tailwind CSS.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧠 **Autonomous AI Categorization** | Gemini batch-classifies bulk transactions into strictly typed budget categories. |
| 💬 **RAG Financial Advisor** | Chat injects your live financial data into the LLM context window for mathematically sound advice. |
| 📊 **Real-time Budget Tracking** | Set monthly limits per category with dynamic progress UI thresholds. |
| 📈 **Cash Flow Analytics** | Beautiful area charts and category breakdowns with Recharts. |
| 🔒 **Edge-Guard Auth** | Better Auth sessions guarded by Next.js Edge Middleware. "Infinite" 10-year session configuration. |
| 🎨 **Premium UI/UX** | Framer Motion animations, custom glossy cursor, Bento Box auth layouts, and strict Dark/Light modes. |

---

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Components)
- **Database**: [PostgreSQL](https://postgresql.org/) via [Neon](https://neon.tech)
- **ORM**: [Prisma 7](https://prisma.io/)
- **Auth**: [Better Auth](https://better-auth.com/)
- **AI**: Google Gemini (2.5 Flash / 2.5 Pro Fallback)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

---

## 🏗 Architecture & Design Decisions

- **Repository Pattern**: All DB interactions pass through typed repository classes (`TransactionRepository`, `BudgetRepository`). This insulates business logic from raw SQL and ORM changes.
- **RAG Context Injection**: The AI Advisor fetches your latest 30-day summary + active budgets and invisibly injects them into the LLM prompt, ensuring the AI relies on *your* math, not hallucinations.
- **Dynamic Vercel Trust**: The auth layer automatically syncs `trustedOrigins` with Vercel's dynamic preview URLs, preventing `403 Forbidden` errors across CI deployments.

---

## ⚙️ Getting Started

Follow these steps to set up Finora locally. *For deeper contribution guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md).*

### Prerequisites
- Node.js 20+
- pnpm 9+
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

## Made with ❤️ in India.
