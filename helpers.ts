export interface NetworkRetryOptions {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  backoffFactor: number;
  shouldRetry: (error: Error) => boolean;
}

const defaultOptions: NetworkRetryOptions = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  backoffFactor: 2,
  shouldRetry: (error: Error) => {
    return error.message.includes('network') || error.message.includes('timeout');
  }
};

export async function retryNetworkOperation<T>(
  operation: () => Promise<T>,
  options: Partial<NetworkRetryOptions> = {}
): Promise<T> {
  const opts = { ...defaultOptions, ...options };
  let lastError: Error | undefined;
  for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err as Error;
      if (attempt === opts.maxRetries || !opts.shouldRetry(lastError)) {
        throw lastError;
      }
      const delay = Math.min(
        opts.baseDelay * Math.pow(opts.backoffFactor, attempt),
        opts.maxDelay
      );
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw lastError!;
}

export function createCryptoApiClient(baseUrl: string) {
  return {
    fetchData: async (endpoint: string) => {
      return retryNetworkOperation(async () => {
        const response = await fetch(`${baseUrl}/${endpoint}`);
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      });
    }
  };
}