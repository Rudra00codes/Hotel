/**
 * Retry utility for failed API calls
 * Implements exponential backoff strategy
 */

export interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  shouldRetry?: (error: unknown) => boolean;
  onRetry?: (attempt: number, error: unknown) => void;
}

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  baseDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
  shouldRetry: () => true,
  onRetry: () => {},
};

/**
 * Calculate delay with exponential backoff and jitter
 */
const calculateDelay = (attempt: number, baseDelay: number, maxDelay: number): number => {
  const exponentialDelay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
  // Add jitter (random variation) to prevent thundering herd
  const jitter = Math.random() * 0.3 * exponentialDelay;
  return exponentialDelay + jitter;
};

/**
 * Sleep for specified milliseconds
 */
const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Retry a function with exponential backoff
 * @param fn Function to retry
 * @param options Retry configuration options
 * @returns Promise with the function result
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let lastError: unknown;

  for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Check if we should retry
      if (attempt === opts.maxRetries || !opts.shouldRetry(error)) {
        throw error;
      }

      // Calculate delay and notify
      const delay = calculateDelay(attempt, opts.baseDelay, opts.maxDelay);
      opts.onRetry(attempt + 1, error);

      // Wait before retrying
      await sleep(delay);
    }
  }

  throw lastError;
}

/**
 * Check if error is retryable (network errors, 5xx status codes)
 */
export const isRetryableError = (error: unknown): boolean => {
  // Network errors
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return true;
  }

  // EmailJS specific errors
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    // Retry on timeout, network, or server errors
    if (
      message.includes('timeout') ||
      message.includes('network') ||
      message.includes('failed to fetch') ||
      message.includes('500') ||
      message.includes('502') ||
      message.includes('503') ||
      message.includes('504')
    ) {
      return true;
    }
  }

  // Don't retry on client errors (4xx)
  return false;
};

/**
 * Retry wrapper specifically for EmailJS calls
 */
export async function retryEmailSend<T>(
  fn: () => Promise<T>,
  onRetry?: (attempt: number) => void
): Promise<T> {
  return retryWithBackoff(fn, {
    maxRetries: 3,
    baseDelay: 2000,
    maxDelay: 8000,
    shouldRetry: isRetryableError,
    onRetry: (attempt, error) => {
      console.warn(`Email send attempt ${attempt} failed, retrying...`, error);
      onRetry?.(attempt);
    },
  });
}

/**
 * Retry wrapper for general API calls
 */
export async function retryApiCall<T>(
  fn: () => Promise<T>,
  options?: RetryOptions
): Promise<T> {
  return retryWithBackoff(fn, {
    maxRetries: 2,
    baseDelay: 1000,
    maxDelay: 5000,
    shouldRetry: isRetryableError,
    ...options,
  });
}
