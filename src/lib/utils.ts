// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes safely, resolving any specificity conflicts.
 * * @param inputs - An array of class values, objects, or conditionals.
 * @returns A cleanly merged Tailwind class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}