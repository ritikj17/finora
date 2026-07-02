"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-50 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-blue-500/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen opacity-50" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8 text-center max-w-4xl flex flex-col items-center">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8"
        >
          <span className="flex size-2 rounded-full bg-primary mr-2 animate-pulse" />
          FinPilot AI 2.0 is now live
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6"
        >
          Navigate your finances with <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
            AI precision.
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl"
        >
          Automate your accounting, forecast your runway, and get actionable financial insights in real-time. Built for modern startups scaling fast.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8" asChild>
            <Link href="/signup">Start for Free</Link>
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-12 px-8" asChild>
            <Link href="#demo">Watch the Demo</Link>
          </Button>
        </motion.div>

        {/* Dashboard Preview Placeholder / Image Wrapper */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="mt-16 w-full rounded-xl border border-border/50 bg-background/50 p-2 shadow-2xl backdrop-blur-sm"
        >
          <div className="aspect-[16/9] rounded-lg bg-muted flex items-center justify-center border border-border overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-background to-muted/20" />
            {/* You will replace this SVG with your actual dashboard screenshot later */}
            <svg
              className="size-24 text-muted-foreground/30 relative z-10"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}