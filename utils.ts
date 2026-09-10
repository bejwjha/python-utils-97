import { createHmac } from 'crypto';

export type HashAlgorithm = 'sha256' | 'sha512';

export interface CryptoConfig {
  secret: string;
  algorithm: HashAlgorithm;
}

export const generateSignature = (payload: string, config: CryptoConfig): string => {
  return createHmac(config.algorithm, config.secret)
    .update(payload)
    .digest('hex');
};

export const validateTimestamp = (timestamp: number, drift: number = 5000): boolean => {
  return Math.abs(Date.now() - timestamp) <= drift;
};

export const formatCurrency = (amount: number, precision: number = 8): string => {
  return amount.toFixed(precision);
};

export const parseJsonSafe = <T>(data: string): T | null => {
  try {
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
};