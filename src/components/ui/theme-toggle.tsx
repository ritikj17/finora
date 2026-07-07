"use client";

import * as React from "react";
import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch
  React.useEffect(() => /* eslint-disable react-hooks/set-state-in-effect */ setMounted(true), []);
  if (!mounted) {
    return (
      <div
        className={cn(
          "h-9 w-24 rounded-full border border-border bg-muted animate-pulse",
          className
        )}
      />
    );
  }

  return (
    <div
      role="group"
      aria-label="Theme selection"
      className={cn(
        "relative flex items-center rounded-full border border-border bg-muted/50 p-1 w-24 h-9 cursor-pointer",
        className
      )}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <div 
        className={cn(
          "absolute inset-y-1 left-1 w-[44px] rounded-full bg-background shadow-sm transition-transform duration-300 ease-in-out",
          theme === "dark" ? "translate-x-[42px]" : "translate-x-0"
        )}
      />
      <div className="relative z-10 flex w-full text-[11px] font-medium uppercase tracking-wider text-muted-foreground select-none">
        <div className={cn("flex-1 text-center transition-colors duration-300", theme !== "dark" && "text-foreground")}>
          Light
        </div>
        <div className={cn("flex-1 text-center transition-colors duration-300", theme === "dark" && "text-foreground")}>
          Dark
        </div>
      </div>
    </div>
  );
}
