import { createHash } from 'crypto';

export const hexToUint8Array = (hex: string): Uint8Array => {
  return new Uint8Array(hex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));
};

export const uint8ArrayToHex = (buffer: Uint8Array): string => {
  return Array.from(buffer)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

export const sha256 = (data: string | Uint8Array): string => {
  return createHash('sha256').update(data).digest('hex');
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const validateAddress = (address: string, prefix: string): boolean => {
  const regex = new RegExp(`^${prefix}[a-zA-Z0-9]{32,44}$`);
  return regex.test(address);
};

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};