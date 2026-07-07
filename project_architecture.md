# Finora: Deep Dive Project Architecture

Finora is not just a standard CRUD app; it's a deeply integrated AI-driven SaaS platform engineered to production standards. This document breaks down how the entire system functions, from the edge to the database.

## 1. The Core Data Flow

When a user interacts with Finora, the data follows a strict path:
1. **Client (Browser)**: React components powered by Next.js App Router capture user input (e.g., uploading a CSV).
2. **Server Actions (Next.js)**: The input hits a Next.js Server Action (`src/server/actions/transactions.ts`).
3. **Validation**: The data is strictly parsed using Zod schemas (`src/lib/validations/`).
4. **AI Processing**: If the data needs categorization, the server calls the Gemini AI router (`src/server/ai/router.ts`).
5. **Repository Layer**: The processed data is passed to a Repository class (`src/server/repositories/TransactionRepository.ts`).
6. **Database (Prisma + Neon)**: The repository executes the Prisma query against the serverless Neon PostgreSQL database.

## 2. Technology Stack & Roles

### Next.js 16 (App Router)
- **Role**: The backbone of the application. It handles routing, server-side rendering (SSR), and API endpoints.
- **Why we used it**: Server Components allow us to fetch data directly from the database without exposing an API, reducing latency and client bundle size. Server Actions let us mutate data securely.

### Better Auth & Edge Middleware
- **Role**: Manages user sessions, cookies, and route protection.
- **Why we used it**: Better Auth is incredibly lightweight and runs perfectly on edge networks. Our middleware (`src/middleware.ts`) intercepts requests to `/dashboard/*` *before* they hit the server, instantly redirecting unauthenticated users. The session is configured to last 10 years, providing a frictionless UX.

### Prisma (ORM) & Neon (PostgreSQL)
- **Role**: Prisma translates TypeScript into SQL. Neon hosts the database.
- **Why we used it**: Prisma provides end-to-end type safety. If the database schema changes, the TypeScript compiler will immediately flag errors in our components. Neon's serverless architecture means the database scales automatically with traffic and supports instant branching for CI/CD.

### Google Gemini AI (RAG Implementation)
- **Role**: The brain behind transaction categorization and the financial advisor chat.
- **How it works**: 
  - **Categorization**: We send bulk transaction strings to Gemini, instructing it to return a strictly typed JSON array of categories.
  - **Advisor (RAG)**: Retrieval-Augmented Generation. When a user asks a question, we don't just send the question to the LLM. We first query the Prisma database for the user's spending data and active budgets. We stringify this data and inject it into a hidden system prompt. This guarantees the LLM answers using actual mathematical data rather than hallucinating.

## 3. Advanced Concepts Implemented

### The Repository Pattern
Instead of calling `prisma.transaction.findMany()` directly in our UI components, we created a `TransactionRepository` class. 
**Benefit**: This decouples our database logic from our UI. If we ever switch from Prisma to Drizzle, or Postgres to MongoDB, we only need to rewrite the Repository file—the rest of the app remains completely untouched.

### AI Fallback Router with Exponential Backoff
AI APIs fail. To prevent application crashes, we implemented `generateWithFallback()` in `src/server/ai/router.ts`.
**Benefit**: If `gemini-2.5-flash` rate-limits us, the system automatically waits (exponential backoff) and retries using `gemini-2.5-pro`. This guarantees high availability.

### Custom Glossy Cursors & Framer Motion
- We overrode the browser's default cursor with a custom SVG (`globals.css`), providing an immediate premium "app" feel.
- Framer motion is used for hardware-accelerated animations (`whileInView`, `stagger`) without freezing the main thread.
