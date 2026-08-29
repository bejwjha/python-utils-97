export enum CryptoAlgorithm {
  AES = 'AES-256',
  RSA = 'RSA-2048',
  ECDSA = 'ECDSA',
}
export interface Key {
  id: string;
  type: 'public' | 'private' | 'secret';
  data: Uint8Array;
  algorithm: CryptoAlgorithm;
}
export type HashAlgorithm = 'SHA-256' | 'SHA-512' | 'SHA-3';
export interface SignatureResult {
  signature: Uint8Array;
  algorithm: CryptoAlgorithm;
  timestamp: number;
}
export type CryptoOperation = 'encrypt' | 'decrypt' | 'sign' | 'verify' | 'hash';
export interface OperationResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  operation: CryptoOperation;
}
export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: bigint;
  signature: Uint8Array;
  timestamp: number;
}
export const DEFAULT_KEY_SIZE: number = 32;
export const SUPPORTED_ALGORITHMS: CryptoAlgorithm[] = [CryptoAlgorithm.AES, CryptoAlgorithm.RSA, CryptoAlgorithm.ECDSA];
export function isValidKey(key: Key): boolean {
  return key.data.length > 0 && SUPPORTED_ALGORITHMS.includes(key.algorithm);
}
export function validateAlgorithm(alg: string): alg is CryptoAlgorithm {
  return SUPPORTED_ALGORITHMS.includes(alg as CryptoAlgorithm);
}
export class KeyManager {
  private keys: Map<string, Key> = new Map();
  addKey(key: Key): void {
    if (!isValidKey(key)) {
      throw new Error('Invalid key');
    }
    this.keys.set(key.id, key);
  }
  getKey(id: string): Key | undefined {
    return this.keys.get(id);
  }
  removeKey(id: string): boolean {
    return this.keys.delete(id);
  }
  listKeys(): Key[] {
    return Array.from(this.keys.values());
  }
}