# Finora - Autonomous AI Finance Platform

![Finora Banner](/public/noise.png)

Finora is a production-ready, AI-powered personal finance SaaS built with modern web architecture. It autonomously ingests raw bank statements, categorizes every transaction using Google's Gemini AI, and provides a RAG-powered financial advisor to query your actual spending data.

## Features
- **Autonomous Categorization**: Upload CSV or PDF statements, and Gemini automatically categorizes 100% of transactions. Gemini's native document AI processes unstructured PDFs with zero templates required.
- **RAG-Powered AI Advisor**: Chat with your financial data in real-time.
- **Live Budget Tracking**: Progress bars and real-time alerts as you approach budget limits.
- **Modern Authentication**: Powered by Better Auth with secure credentials.
- **Dynamic UI**: Glossy, micro-animated user interfaces built with Tailwind CSS and Framer Motion.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Database**: Serverless PostgreSQL via Neon
- **ORM**: Prisma
- **Auth**: Better Auth
- **AI**: Google Gemini (2.5-flash & 2.5-pro)
- **Styling**: Tailwind CSS v4 & Framer Motion

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm
- A Neon PostgreSQL Database URL
- A Google Gemini API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ritikj17/finora.git
   cd finora
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory and add the following keys:
   ```env
   DATABASE_URL="postgres://user:password@endpoint.neon.tech/finora"
   BETTER_AUTH_SECRET="your-secure-secret-key"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   GEMINI_API_KEY="your-gemini-api-key"
   ```

4. Push Database Schema:
   ```bash
   pnpm db:push
   ```

5. Run the Development Server:
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture

Finora implements robust production practices including:
- **Model Routing**: Dynamically routes simple tasks to `gemini-2.5-flash` for speed, and complex RAG tasks to `gemini-2.5-pro` for deep reasoning.
- **Rate Limiting**: Custom token-bucket rate limiting on AI API endpoints to prevent abuse.
- **Type Safety**: End-to-end type safety from the Prisma database up to the React UI.

## License
Made with ❤️ in India.
