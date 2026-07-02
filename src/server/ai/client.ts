import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure the API key is present
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey && process.env.NODE_ENV === "production") {
  throw new Error("GEMINI_API_KEY is missing from environment variables.");
}

// Instantiate the singleton client
export const genAI = new GoogleGenerativeAI(apiKey || "");

// Export standard model configurations to ensure consistency across the app
export const AI_MODELS = {
  // Use flash for fast, high-volume tasks like categorization
  FAST: "gemini-2.5-flash",
  // Use pro for complex reasoning like financial forecasting
  REASONING: "gemini-2.5-pro",
};