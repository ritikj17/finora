type TokenBucket = {
  tokens: number;
  lastRefill: number;
};

// In-memory store for rate limits (suitable for single-instance Next.js deployments)
const buckets = new Map<string, TokenBucket>();

/**
 * Basic Token Bucket Rate Limiter
 * @param identifier - Unique identifier for the user (e.g., IP address or User ID)
 * @param limit - Maximum number of requests allowed in the window
 * @param windowMs - The time window in milliseconds (e.g., 60000 for 1 minute)
 * @returns boolean - true if the request is allowed, false if rate limited
 */
export function rateLimit(identifier: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const refillRate = limit / windowMs;
  
  let bucket = buckets.get(identifier);

  if (!bucket) {
    bucket = { tokens: limit, lastRefill: now };
    buckets.set(identifier, bucket);
  } else {
    const timePassed = now - bucket.lastRefill;
    const tokensToAdd = timePassed * refillRate;
    bucket.tokens = Math.min(limit, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;
  }

  if (bucket.tokens >= 1) {
    bucket.tokens -= 1;
    return true; // Allowed
  }

  return false; // Rate limited
}
