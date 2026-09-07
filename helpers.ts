export class CryptoError extends Error {
  constructor(public message: string, public code: string) {
    super(message);
    this.name = 'CryptoError';
  }
}

export const validateKey = (key: string | undefined): string => {
  if (!key || key.length < 32) {
    throw new CryptoError('invalid key length provided', 'ERR_INVALID_KEY');
  }
  return key;
};

export const safeParse = <T>(data: string): T | null => {
  try {
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
};

export const handleTransaction = async <T>(operation: () => Promise<T>): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown error';
    throw new CryptoError(`transaction failed: ${message}`, 'ERR_TX_FAILED');
  }
};