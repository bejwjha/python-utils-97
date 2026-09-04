import { createHash, randomBytes } from 'crypto';

export const generateNonce = (length: number = 32): string => {
  return randomBytes(length).toString('hex');
};

export const hashPayload = (data: Record<string, any>): string => {
  const serialized = JSON.stringify(data, Object.keys(data).sort());
  return createHash('sha256').update(serialized).digest('hex');
};

export const validateAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const formatAmount = (amount: bigint, decimals: number = 18): string => {
  const divisor = BigInt(10) ** BigInt(decimals);
  const integer = amount / divisor;
  const fractional = amount % divisor;
  return `${integer}.${fractional.toString().padStart(decimals, '0')}`;
};

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const parseBigInt = (value: string | number): bigint => {
  try {
    return BigInt(value);
  } catch {
    return BigInt(0);
  }
};