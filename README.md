<div align="center">
  <img src="public/banner.png" alt="Finora Banner" width="100%" />
</div>

<div align="center">

# Finora — Autonomous AI Finance Platform

**Upload your bank statements. Let AI do the rest.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-finora--gold--gamma.vercel.app-gold?style=for-the-badge&logo=vercel)](https://finora-gold-gamma.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io)
[![Google Gemini](https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev)

</div>

---

Finora is a production-ready, AI-powered personal finance SaaS built with modern web architecture. It autonomously ingests raw bank statements, categorizes every transaction using Google's Gemini AI, and provides a RAG-powered financial advisor that queries your **actual** spending data.

## ✨ Features

- **🤖 Autonomous Categorization** — Upload CSV or PDF bank statements and Gemini automatically categorizes 100% of transactions. Native document AI processes unstructured PDFs with zero templates.
- **💬 RAG-Powered AI Advisor** — Chat with your financial data in real-time. Every answer is grounded in your actual numbers — no hallucinations.
- **📊 Analytics Dashboard** — Visual breakdowns of income vs. expenses, category spend, and daily cash flow charts.
- **🎯 Live Budget Tracking** — Progress bars and real-time alerts as you approach budget limits.
- **🔐 Modern Authentication** — Secure email/password auth with session management via Better Auth.
- **⚡ Resilient AI Routing** — Custom fallback router across 5 Gemini models with exponential backoff and rate-limit handling.

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router + Turbopack) |
| **Database** | Serverless PostgreSQL via [Neon](https://neon.tech) |
| **ORM** | Prisma |
| **Auth** | [Better Auth](https://www.better-auth.com) |
| **AI** | Google Gemini (2.5 Flash · 3.5 Flash · multi-model fallback) |
| **Styling** | Tailwind CSS v4 · Framer Motion |
| **Deployment** | Vercel |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (`npm install -g pnpm`)
- A [Neon](https://neon.tech) PostgreSQL database URL
- A [Google AI Studio](https://aistudio.google.com) Gemini API key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ritikj17/finora.git
   cd finora
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root:
   ```env
   DATABASE_URL="postgres://user:password@endpoint.neon.tech/finora"
   BETTER_AUTH_SECRET="your-secure-secret-key"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   GEMINI_API_KEY="your-gemini-api-key"
   ```
   > Generate `BETTER_AUTH_SECRET` with: `openssl rand -base64 32`

4. **Push the database schema:**
   ```bash
   pnpm db:push
   ```

5. **Run the development server:**
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the app.

> 📖 **For detailed testing instructions**, see [HOW_TO_USE.md](HOW_TO_USE.md)

## 🏗 Architecture

```
finora/
├── src/
│   ├── app/
│   │   ├── (auth)/          # Sign-in, sign-up, forgot-password
│   │   ├── api/
│   │   │   ├── ai/          # categorize, chat, extract-pdf endpoints
│   │   │   ├── auth/        # Better Auth handler
│   │   │   ├── budgets/     # Budget CRUD
│   │   │   └── transactions/# Bulk transaction upload
│   │   └── dashboard/       # Protected dashboard pages
│   ├── server/
│   │   ├── ai/
│   │   │   ├── router.ts    # Multi-model fallback router
│   │   │   └── prompts/     # Categorization & extraction prompts
│   │   └── repositories/    # Prisma repository pattern
│   └── components/          # Reusable UI components
└── prisma/
    └── schema.prisma        # Database schema
```

### Key Design Decisions
- **Model Routing**: Routes classification tasks to `gemini-2.5-flash` (fast) and reasoning/RAG to `gemini-3.5-flash` (capable), with 5-model fallback chain.
- **Rate Limiting**: Custom token-bucket rate limiter on AI endpoints.
- **Type Safety**: End-to-end TypeScript from Prisma schema to React UI.
- **No `await headers()`**: All auth uses `req.headers` directly to avoid Next.js async boundary issues in serverless.

## 📄 License

Made with ❤️ in India.
