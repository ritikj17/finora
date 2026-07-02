// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // CRITICAL: This links your Tailwind styles

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finora | AI Financial Architect",
  description: "Your personal finance SaaS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}