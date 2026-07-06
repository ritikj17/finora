import * as React from "react"
import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={cn("size-8 shadow-lg shadow-primary/20 rounded-2xl", className)} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="finora-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="#9333ea" /> {/* Tailwind purple-600 */}
        </linearGradient>
      </defs>
      
      {/* Background Plate */}
      <rect width="100" height="100" rx="24" fill="url(#finora-gradient)" />
      
      {/* Abstract 'F' */}
      <path d="M32 28h32v12H46v10h16v12H46v16H32V28z" fill="#ffffff" />
      
      {/* Fintech Geometric Accent Dot */}
      <circle cx="68" cy="70" r="8" fill="#ffffff" opacity="0.9" />
    </svg>
  )
}