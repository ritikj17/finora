import { GoogleGenerativeAI, Part } from '@google/generative-ai';

/**
 * Prioritized fallback list of Gemini free-tier models available on this API key.
 * Order: fastest/cheapest first, most capable last (to preserve quota).
 *
 * Classification tasks (categorize transactions):
 *   - Start with the lightest/fastest model and escalate only on failure.
 *
 * Reasoning tasks (AI advisor / chat):
 *   - Start with the most capable model, fall back to lighter ones.
 */
const FALLBACK_MODELS_CLASSIFICATION = [
  'gemini-2.5-flash',         // Fast, reliable, free-tier — primary
  'gemini-2.5-flash-lite',    // Lightest model, highest RPM
  'gemini-3.1-flash-lite',    // Ultra-low latency fallback
  'gemini-3-flash-preview',   // Preview but capable
  'gemini-3.5-flash',         // Most capable — last resort
];

const FALLBACK_MODELS_REASONING = [
  'gemini-3.5-flash',         // Best reasoning, free-tier flagship
  'gemini-2.5-flash',         // Reliable, well-tested
  'gemini-3-flash-preview',   // Preview fallback
  'gemini-3.1-flash-lite',    // Lighter fallback
  'gemini-2.5-flash-lite',    // Lightest, last resort
];

export type TaskType = 'classification' | 'reasoning';

interface GenerationOptions {
  taskType?: TaskType;
  systemInstruction?: string;
  temperature?: number;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Extracts a numeric HTTP status code from a Gemini SDK error object.
 */
function getErrorCode(error: unknown): number {
  if (typeof error === 'object' && error !== null) {
    const e = error as Record<string, unknown>;
    if (typeof e.status === 'number') return e.status;
    if (typeof e.message === 'string') {
      const match = e.message.match(/\b(4\d\d|5\d\d)\b/);
      if (match) return parseInt(match[1], 10);
    }
  }
  return 0;
}

function getErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as { message: unknown }).message);
  }
  return String(error);
}

/**
 * Generates content using Gemini with automatic retries,
 * exponential backoff, and model fallbacks across all available free-tier models.
 *
 * - On rate-limits (429) or server errors (5xx): retries same model, then escalates.
 * - On client errors (4xx like 400 invalid param, 404 model not found): moves to next model immediately.
 * - JSON output is enforced via the system prompt — no responseMimeType needed.
 */
export async function generateWithFallback(
  prompt: string | (string | Part)[],
  options: GenerationOptions = {}
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables.');
  }
  const ai = new GoogleGenerativeAI(apiKey);

  const modelsToTry = options.taskType === 'reasoning'
    ? FALLBACK_MODELS_REASONING
    : FALLBACK_MODELS_CLASSIFICATION;

  const baseDelay = 1000;
  let lastError: unknown = null;

  for (const modelName of modelsToTry) {
    const maxAttemptsPerModel = 2;

    for (let attempt = 0; attempt < maxAttemptsPerModel; attempt++) {
      try {
        console.log(`[AI Router] Trying model: ${modelName} (attempt ${attempt + 1}/${maxAttemptsPerModel})`);

        const model = ai.getGenerativeModel({
          model: modelName,
          systemInstruction: options.systemInstruction,
          generationConfig: {
            temperature: options.temperature ?? 0.0,
          },
        });

        const result = await model.generateContent(prompt);
        const textResponse = result.response.text();

        if (!textResponse || textResponse.trim() === '') {
          throw new Error(`Empty response from ${modelName}`);
        }

        console.log(`[AI Router] Success with model: ${modelName}`);
        return textResponse;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        lastError = error;
        const code = getErrorCode(error);
        const msg = getErrorMessage(error);
        const isRateLimit = code === 429 || msg.includes('429') || msg.toLowerCase().includes('quota');
        const isServerError = (code >= 500 && code < 600) || msg.includes('503') || msg.toLowerCase().includes('overloaded');
        const isRetryable = isRateLimit || isServerError;

        if (isRetryable) {
          if (attempt < maxAttemptsPerModel - 1) {
            const backoffDelay = baseDelay * Math.pow(2, attempt);
            console.warn(`[AI Router] ${modelName} rate-limited/unavailable. Retrying in ${backoffDelay}ms...`);
            await delay(backoffDelay);
            continue;
          } else {
            console.warn(`[AI Router] ${modelName} exhausted. Moving to next model...`);
            break;
          }
        } else {
          // 404 model not found, 400 bad request, etc — skip immediately
          console.warn(`[AI Router] ${modelName} error (${code}): ${msg}. Skipping to next model...`);
          break;
        }
      }
    }
  }

  const errMsg = getErrorMessage(lastError);
  console.error('[AI Router] All models exhausted. Last error:', errMsg);
  throw new Error(`[AI Router] All fallback models failed. Last error: ${errMsg}`);
}
