import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { PrismaClient } from "@prisma/client";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Extract and sanitize the URL
const rawUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
const connectionString = rawUrl.replace(/['"]/g, '').trim();

if (!connectionString) {
  throw new Error("❌ DATABASE_URL is missing from your environment variables.");
}

// 💡 THE FIX: We use the native Node.js Postgres driver (pg) instead of the Neon 
// serverless driver. This uses standard TCP, parses URLs flawlessly, and satisfies 
// Prisma 7's strict requirement for an adapter.
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const categories = [
  "Housing",
  "Transportation",
  "Food & Dining",
  "Utilities",
  "Entertainment",
  "Software Subscriptions",
  "Healthcare",
];

const companies = ["Amazon", "Uber", "Whole Foods", "Netflix", "Vercel", "OpenAI", "Starbucks", "Delta Airlines"];

async function main() {
  console.log("🌱 Starting native database seed...");

  const user = await prisma.user.findFirst();

  if (!user) {
    console.error("❌ No user found. Please sign up through the UI first.");
    process.exit(1);
  }

  console.log(`👤 Found user: ${user.name} (${user.id})`);

  const deleted = await prisma.transaction.deleteMany({
    where: { userId: user.id },
  });
  console.log(`🗑️ Cleared ${deleted.count} old transactions.`);

  const transactionsToCreate = [];
  const now = new Date();

  // Add a base salary
  transactionsToCreate.push({
    userId: user.id,
    date: new Date(now.getFullYear(), now.getMonth(), 1),
    description: "Tech Corp Inc. Payroll",
    amount: 8500.00,
    type: "INCOME",
    category: "Income",
  });

  // Add random expenses
  for (let i = 0; i < 45; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date(now);
    date.setDate(now.getDate() - daysAgo);

    const category = categories[Math.floor(Math.random() * categories.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const amount = parseFloat((Math.random() * 190 + 10).toFixed(2));

    transactionsToCreate.push({
      userId: user.id,
      date,
      description: `${company} - ${category}`,
      amount,
      type: "EXPENSE",
      category,
    });
  }

  // Bulk Insert
  await prisma.transaction.createMany({
    data: transactionsToCreate,
  });

  console.log(`✅ Successfully seeded ${transactionsToCreate.length} transactions for ${user.name}.`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });