import { GoogleGenerativeAI, Part } from '@google/generative-ai';

/**
 * Prioritized list of stable Gemini free-tier text models for classification.
 * gemini-2.0-flash-lite is the fastest and most stable free-tier option.
 * Older models are included as ultimate fallbacks.
 * NOTE: Do NOT include responseMimeType here as some older models don't support it —
 *       the system prompt already enforces JSON output format.
 */
const FALLBACK_MODELS_CLASSIFICATION = [
  'gemini-2.0-flash-lite',   // Fastest, most reliable free-tier
  'gemini-2.0-flash',        // Slightly heavier but still free-tier
  'gemini-1.5-flash',        // Proven stable fallback
  'gemini-1.5-flash-8b',     // Tiny, very high RPM limit
  'gemini-1.5-pro',          // Best quality, lower RPM
];

/**
 * Prioritized list for reasoning/RAG tasks.
 */
const FALLBACK_MODELS_REASONING = [
  'gemini-2.0-flash',        // Good reasoning, free tier
  'gemini-1.5-pro',          // Best quality for reasoning
  'gemini-2.0-flash-lite',   // Fast fallback
  'gemini-1.5-flash',        // Proven stable fallback
  'gemini-1.5-flash-8b',     // Last resort
];

export type TaskType = 'classification' | 'reasoning';

interface GenerationOptions {
  taskType?: TaskType;
  systemInstruction?: string;
  temperature?: number;
  // responseMimeType intentionally removed — causes 400 on some free-tier models
  // JSON output is enforced via the system prompt instead
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Extracts a meaningful error code from a Gemini API error object.
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
 * exponential backoff, and model fallbacks across free-tier models.
 *
 * Falls back through the model list on rate-limits (429) or server errors (5xx).
 * On client errors (4xx like 400 invalid argument), moves on immediately to next model.
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
            // No responseMimeType — JSON is enforced by the system prompt
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
        const isServerError = (code >= 500 && code < 600) || msg.includes('503') || msg.includes('overloaded');
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
          // Client error (e.g. 400 invalid model/param) — skip to next model immediately
          console.warn(`[AI Router] ${modelName} client error (${code}): ${msg}. Skipping...`);
          break;
        }
      }
    }
  }

  const errMsg = getErrorMessage(lastError);
  console.error('[AI Router] All models exhausted. Last error:', errMsg);
  throw new Error(`[AI Router] All fallback models failed. Last error: ${errMsg}`);
}
