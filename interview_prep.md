# Interview Prep: Finora

Use this guide to confidently explain Finora during technical interviews. It highlights the most impressive engineering decisions that separate this project from generic portfolio apps.

---

## 💡 The "Elevator Pitch"
> "I built Finora, a production-grade personal finance SaaS that autonomously categorizes transactions using Google Gemini AI. It features a RAG-powered financial advisor, real-time budget tracking, and an edge-protected authentication system. I focused heavily on scalable architecture by implementing the Repository Pattern, Server Actions for data mutation, and an AI fallback router to guarantee high availability."

---

## 🎯 Key Talking Points & "Flexes"

### 1. "How did you structure the backend?" (The Repository Pattern)
**What to say:**
"Instead of scattering Prisma queries throughout my Next.js components, I implemented the **Repository Pattern**. I abstracted all database logic into classes like `TransactionRepository` and `BudgetRepository`. This decoupled the business logic from the ORM. If I ever needed to migrate from Prisma to Drizzle, I’d only have to update the repository layer, without touching a single React component."

### 2. "How does the AI Advisor actually know my data?" (RAG Implementation)
**What to say:**
"Generic AI wrappers hallucinate financial advice. I implemented **Retrieval-Augmented Generation (RAG)**. When a user sends a message, my server intercepts it, queries the PostgreSQL database for their last 30 days of categorized spending and active budget thresholds, and injects that real-time data into a hidden system prompt context window. The LLM is forced to answer based strictly on the injected mathematical context."

### 3. "How do you handle AI API rate limits or failures?" (Fault Tolerance)
**What to say:**
"AI APIs can be unreliable, so I built a custom AI router with **Exponential Backoff and Fallback**. If the primary model (`gemini-2.5-flash`) fails due to rate limiting or timeouts, my router catches the exception, waits dynamically, and seamlessly falls back to a heavier model (`gemini-2.5-pro`). The user never sees an error screen."

### 4. "How did you secure user data?" (Multi-layered Security)
**What to say:**
"Security is handled at three layers:
1. **Edge Middleware**: Using Better Auth, unauthenticated requests are intercepted at the Next.js edge network and bounced before they ever reach the Node.js server.
2. **Server Actions**: All form submissions use Server Actions strictly typed and validated by **Zod** to prevent malformed payloads.
3. **User-Scoped Queries**: Every single database query in the Repository layer enforces a `where: { userId: currentUserId }` clause, making cross-tenant data leaks structurally impossible."

---

## ❓ Potential Interviewer Questions

**Q: Why use Next.js Server Components instead of standard React with a REST API?**
**A:** "Server Components allow me to fetch data directly from PostgreSQL on the server and stream the rendered HTML to the client. This eliminates client-side loading spinners, drastically reduces the JavaScript bundle size, and improves SEO/performance since the browser doesn't have to wait to execute JS before fetching data."

**Q: Why did you extend the session timeout to 10 years?**
**A:** "For a personal finance dashboard, friction kills retention. By setting an effectively infinite session in Better Auth, users can bookmark their dashboard and instantly view their budget progress without the frustration of logging in every 7 days. Security is maintained because the session cookie is strictly `HttpOnly` and `Secure`, preventing XSS theft."

**Q: Tell me about a UI challenge you solved.**
**A:** "I wanted the app to feel incredibly premium. I completely overhauled the authentication pages into an animated 'Bento Box' 3D layout using Framer Motion, replaced the standard cursor with a custom glossy SVG for a native-app feel, and dynamically linked the unified Logo to route intelligently based on the user's active session state."
