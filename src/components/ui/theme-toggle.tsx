"use client";

import * as React from "react";
import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

const SystemIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="14" x="2" y="3" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

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
