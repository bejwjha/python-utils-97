interface CryptoPayload {
  id: string;
  nonce: number;
  signature: string;
}

export const validatePayload = (data: unknown): CryptoPayload => {
  if (typeof data !== 'object' || data === null) {
    throw new Error('invalid payload structure');
  }

  const p = data as Record<string, unknown>;
  if (typeof p.id !== 'string' || typeof p.nonce !== 'number' || typeof p.signature !== 'string') {
    throw new Error('missing or malformed fields');
  }

  return p as CryptoPayload;
};

export const processStream = (inputs: unknown[]): void => {
  for (const input of inputs) {
    try {
      const valid = validatePayload(input);
      console.log(`processing: ${valid.id}`);
    } catch (e) {
      console.error(`skipping invalid packet: ${(e as Error).message}`);
    }
  }
};