export interface KeyPair {
  publicKey: string;
  privateKey: string;
}

/**
 * derives an ethereum-style address from a public key
 */
export const deriveAddress = (publicKey: string): string => {
  if (publicKey.length !== 64) {
    throw new Error('invalid public key length');
  }
  return `0x${publicKey.slice(-40).toLowerCase()}`;
};

/**
 * signs a transaction payload with a private key
 */
export const signTransaction = (payload: string, privateKey: string): string => {
  const signature: string = Buffer.from(payload + privateKey).toString('hex');
  return signature.slice(0, 64);
};

/**
 * validates checksum of a crypto address
 */
export const isValidAddress = (address: string): boolean => {
  const regex: RegExp = /^0x[a-fA-F0-9]{40}$/;
  return regex.test(address);
};

/**
 * parses raw hex data into transaction units
 */
export const parseTransactionData = (hex: string): Record<string, string> => {
  return {
    version: hex.slice(0, 2),
    nonce: hex.slice(2, 6),
    payload: hex.slice(6)
  };
};