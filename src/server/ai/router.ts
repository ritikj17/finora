import { GoogleGenerativeAI, Part } from '@google/generative-ai';

// Initialize the singleton strictly on the server
if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined in the environment variables.');
}

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const FALLBACK_MODELS_CLASSIFICATION = [
  'gemini-1.5-flash',
  'gemini-2.0-flash-exp',
  'gemini-1.5-flash-8b',
  'gemini-1.5-pro',
  'gemini-2.0-pro-exp',
  'gemini-1.0-pro'
];

const FALLBACK_MODELS_REASONING = [
  'gemini-1.5-pro',
  'gemini-2.0-pro-exp',
  'gemini-2.0-flash-exp',
  'gemini-1.5-flash',
  'gemini-1.5-flash-8b',
  'gemini-1.0-pro'
];

export type TaskType = 'classification' | 'reasoning';

interface GenerationOptions {
  taskType?: TaskType;
  systemInstruction?: string;
  temperature?: number;
  responseMimeType?: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generates content using Gemini with automatic retries, 
 * exponential backoff, and model fallbacks across 6 free-tier models.
 */
export async function generateWithFallback(
  prompt: string | (string | Part)[],
  options: GenerationOptions = {}
): Promise<string> {
  const modelsToTry = options.taskType === 'reasoning' 
    ? FALLBACK_MODELS_REASONING 
    : FALLBACK_MODELS_CLASSIFICATION;
    
  const baseDelay = 1000;
  let lastError: unknown = null;

  for (let i = 0; i < modelsToTry.length; i++) {
    const modelName = modelsToTry[i];
    const maxAttemptsPerModel = 2; // Try each model up to 2 times before falling back to the next model

    for (let attempt = 0; attempt < maxAttemptsPerModel; attempt++) {
      try {
        console.log(`[AI Router] Attempting generation with model: ${modelName} (Attempt ${attempt + 1}/${maxAttemptsPerModel})`);
        
        const model = ai.getGenerativeModel({
          model: modelName,
          systemInstruction: options.systemInstruction,
          generationConfig: {
            temperature: options.temperature ?? 0.0,
            responseMimeType: options.responseMimeType ?? 'application/json',
          },
        });

        const result = await model.generateContent(prompt);
        const textResponse = result.response.text();
        
        if (!textResponse) {
          throw new Error(`Received empty response from ${modelName}.`);
        }

        return textResponse;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        lastError = error;
        const isRateLimit = error?.status === 429 || error?.message?.includes('429');
        const isServerError = error?.status >= 500 || error?.message?.includes('503');

        if (isRateLimit || isServerError) {
          if (attempt < maxAttemptsPerModel - 1) {
            const backoffDelay = baseDelay * Math.pow(2, attempt);
            console.warn(`[AI Router] ${modelName} failed (${error.message}). Retrying in ${backoffDelay}ms...`);
            await delay(backoffDelay);
            continue;
          } else {
            console.warn(`[AI Router] ${modelName} exhausted attempts. Falling back to next model...`);
            break; // Break inner loop, move to next model in the array
          }
        } else {
          // Fatal client error (e.g. 400), don't retry same model
          console.error(`[AI Router] Fatal client error with ${modelName}:`, error.message);
          break; // Move to next model just in case, though it might be a prompt issue
        }
      }
    }
  }
  
  console.error('[AI Router] Exhausted all fallback models. Last error:', lastError);
  throw lastError || new Error('[AI Router] Generation failed unexpectedly after trying all fallback models.');
}
