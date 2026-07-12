"use client";

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useSession } from "@/lib/auth-client"

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  const { data: session } = useSession();
  const href = session ? "/dashboard" : "/";

  return (
    <Link href={href} className="flex items-center gap-2 group">
      <div 
        className={cn(
          "relative flex items-center justify-center rounded-xl overflow-hidden shadow-lg shadow-indigo-500/20 border border-white/5 group-hover:border-white/40 group-hover:ring-2 group-hover:ring-indigo-400/50 group-hover:shadow-[0_0_20px_rgba(129,140,248,0.4)] transition-all duration-300", 
          className || "w-8 h-8"
        )}
        style={{ background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)" }}
      >
        {/* Bold italic "F" matching the OG image logo */}
        <svg
          viewBox="0 0 24 24"
          className="w-[58%] h-[58%]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="2"
            y="19"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="20"
            fontWeight="900"
            fontStyle="italic"
            fill="white"
          >
            F
          </text>
        </svg>
      </div>
      {showText && <span className="font-bold text-xl tracking-tight text-foreground">Finora</span>}
    </Link>
  )
}