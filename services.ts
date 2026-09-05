import { createHash, randomBytes } from 'crypto';

export const generateNonce = (length: number = 32): string => {
  return randomBytes(length).toString('hex');
};

export const sha256 = (data: string): string => {
  return createHash('sha256').update(data).digest('hex');
};

export const signPayload = (payload: object, secret: string): string => {
  const message = JSON.stringify(payload);
  return createHash('sha256').update(message + secret).digest('hex');
};

export const formatCurrency = (amount: number, precision: number = 8): string => {
  return amount.toFixed(precision);
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const validateAddress = (address: string, pattern: RegExp): boolean => {
  return pattern.test(address);
};