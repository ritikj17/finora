import { PrismaClient } from "@prisma/client";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";

// Required for the Neon serverless driver to work within Node.js (Next.js server)
neonConfig.webSocketConstructor = ws;

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error("DATABASE_URL is not defined in your environment variables.");
  }

  // Initialize the serverless connection pool using Neon
  const pool = new Pool({ connectionString });
  
  // Wrap the pool in Prisma's Neon adapter
  const adapter = new PrismaNeon(pool);
  
  // Prisma v7 explicitly requires this adapter to be provided
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}