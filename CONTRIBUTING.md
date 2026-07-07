# Contributing to Finora

Thank you for your interest in contributing to Finora! This document outlines the technical workflow, repository structure, and guidelines necessary to get a local development environment running smoothly.

## 1. Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js**: v20 or higher.
- **pnpm**: v9 or higher (we strictly use pnpm for dependency management).
- **PostgreSQL**: Access to a Postgres database (we recommend [Neon](https://neon.tech) for serverless branching).
- **Git**: For version control.

## 2. Local Environment Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/finora.git
   cd finora
   ```

2. **Install Dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**
   Copy the example environment file and fill in your details:
   ```bash
   cp .env.example .env
   ```
   *Note: You will need a `DATABASE_URL` from Neon, a `BETTER_AUTH_SECRET` (generate using `openssl rand -base64 32`), and a `GEMINI_API_KEY` from Google AI Studio.*

4. **Initialize the Database:**
   We use Prisma as our ORM. Push the schema to your development database and run the seed script:
   ```bash
   pnpm db:migrate
   pnpm db:generate
   pnpm db:seed
   ```

5. **Run the Development Server:**
   ```bash
   pnpm dev
   ```
   The application will be available at `http://localhost:3000`.

## 3. Project Architecture

Finora is built on a strict, highly scalable foundation using Next.js 16 App Router.

### The Repository Pattern
We abstract all Prisma database logic behind repository classes located in `src/server/repositories/`. 
- **DO NOT** query `db` directly inside your Server Actions or Route Handlers.
- **DO** inject or instantiate the relevant repository (e.g., `TransactionRepository`) to maintain testability and separation of concerns.

### Authentication & Middleware
We use **Better Auth**. The core configuration is in `src/lib/auth.ts`.
- The edge middleware (`src/middleware.ts`) protects all routes under `/dashboard`. 
- Never perform heavy cryptographic operations in edge middleware; rely on Better Auth's session validation logic.

### AI Integration (RAG)
The Gemini integration uses a custom fallback router (`src/server/ai/router.ts`). 
- When modifying AI prompts, ensure you do not break the strict JSON schema required by `responseSchema`. 
- Always test AI features using both the `gemini-2.5-flash` and `gemini-2.5-pro` fallbacks.

## 4. Coding Standards

- **Strict TypeScript**: No `any` types. Ensure all interfaces and types are properly defined in `src/types/` or co-located with their features.
- **Tailwind v4**: We use the new Tailwind v4 engine. Avoid deeply nested arbitrary values (`-[...]`) if a semantic class exists.
- **Framer Motion**: Use the shared `fadeUp` and `stagger` variants exported in page components where possible to maintain consistent animation timings.
- **Linting**: Before opening a PR, ensure your code passes `pnpm typecheck` and `pnpm lint`.

## 5. Opening a Pull Request

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes following the coding standards.
3. Commit using conventional commits (e.g., `feat: add new chart`, `fix: resolve auth bug`).
4. Push to your fork and open a Pull Request against the `main` branch.
5. Provide a clear description of the problem solved and any UI changes (screenshots are appreciated).

Welcome to the Finora team!
