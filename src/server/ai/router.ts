import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the singleton strictly on the server
if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined in the environment variables.');
}

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const MODELS = {
  PRIMARY: 'gemini-2.5-flash',
  FALLBACK: 'gemini-1.5-flash',
} as const;

interface GenerationOptions {
  systemInstruction?: string;
  temperature?: number;
  responseMimeType?: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generates content using Gemini with automatic retries, 
 * exponential backoff, and model fallbacks for rate limits/server errors.
 */
export async function generateWithFallback(
  prompt: string,
  options: GenerationOptions = {}
): Promise<string> {
  const maxRetries = 3;
  const baseDelay = 1000;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Use fallback model on the final attempt if we are struggling
      const modelName = attempt === maxRetries - 1 ? MODELS.FALLBACK : MODELS.PRIMARY;
      
      const model = ai.getGenerativeModel({
        model: modelName,
        systemInstruction: options.systemInstruction,
        generationConfig: {
          temperature: options.temperature ?? 0.0, // Default to 0 for deterministic outputs
          responseMimeType: options.responseMimeType ?? 'application/json',
        },
      });

      const result = await model.generateContent(prompt);
      const textResponse = result.response.text();
      
      if (!textResponse) {
        throw new Error('Received empty response from Gemini API.');
      }

      return textResponse;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const isRateLimit = error?.status === 429 || error?.message?.includes('429');
      const isServerError = error?.status >= 500 || error?.message?.includes('503');

      if ((isRateLimit || isServerError) && attempt < maxRetries - 1) {
        const backoffDelay = baseDelay * Math.pow(2, attempt);
        console.warn(
          `[AI Router] Attempt ${attempt + 1} failed (${error.message}). Retrying with backoff: ${backoffDelay}ms...`
        );
        await delay(backoffDelay);
        continue;
      }
      
      console.error('[AI Router] Exhausted retries or encountered fatal client error:', error);
      throw error;
    }
  }
  
  throw new Error('[AI Router] Generation failed unexpectedly after all retries.');
}
