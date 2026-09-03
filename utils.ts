export interface RetryOptions {
  retries?: number;
  delay?: number;
  backoffFactor?: number;
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const { retries = 3, delay = 1000, backoffFactor = 2 } = options;
  let attempt = 0;
  let currentDelay = delay;

  while (true) {
    try {
      return await operation();
    } catch (error) {
      attempt++;
      if (attempt > retries) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, currentDelay));
      currentDelay *= backoffFactor;
    }
  }
}