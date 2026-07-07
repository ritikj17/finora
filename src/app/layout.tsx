// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { ToastProvider } from "@/providers/toast-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// ─── Metadata ────────────────────────────────────────────────────────────────

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://finora.app";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "Finora — AI-Powered Personal Finance",
    template: "%s | Finora",
  },
  description:
    "Finora automatically categorizes your transactions, tracks budgets, and delivers personalized financial insights powered by Google Gemini AI.",
  keywords: [
    "personal finance",
    "AI financial advisor",
    "budget tracker",
    "transaction categorization",
    "Gemini AI",
    "fintech",
    "expense tracker",
    "cash flow",
  ],
  authors: [{ name: "Finora" }],
  creator: "Finora",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: "Finora",
    title: "Finora — AI-Powered Personal Finance",
    description:
      "Automatically categorize transactions, track budgets, and get AI-powered financial insights. Built with Next.js, Prisma, and Google Gemini.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Finora — AI-Powered Personal Finance Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Finora — AI-Powered Personal Finance",
    description:
      "Automatically categorize transactions, track budgets, and get AI-powered financial insights.",
    images: ["/og-image.png"],
    creator: "@finora_app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#040d21" },
  ],
};

// ─── Layout ─────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen bg-background text-foreground theme-transition`}
      >
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}