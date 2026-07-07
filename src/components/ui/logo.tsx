import * as React from "react"
import { cn } from "@/lib/utils"

export function Logo({ className, showText = false }: { className?: string; showText?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div 
        className={cn(
          "relative flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl overflow-hidden shadow-lg shadow-indigo-500/20", 
          className || "w-8 h-8"
        )}
      >
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity" />
        <svg 
          viewBox="0 0 24 24" 
          className="w-1/2 h-1/2 text-white" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 14L14 4L20 10L10 20L4 14Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 4V14H4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {showText && <span className="font-bold text-xl tracking-tight text-foreground">Finora</span>}
    </div>
  )
}