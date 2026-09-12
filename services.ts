import { createHmac } from 'crypto';

export interface OrderPayload {
  symbol: string;
  side: 'BUY' | 'SELL';
  price: number;
  quantity: number;
  timestamp: number;
}

export interface SignedOrder extends OrderPayload {
  signature: string;
}

/**
 * Service providing crypto signing and validation utilities.
 */
export class CryptoService {
  private readonly secretKey: string;

  /**
   * @param secretKey - The secret API key used for HMAC signature generation.
   */
  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  /**
   * Generates an HMAC SHA256 signature for raw data.
   * @param data - String payload to sign.
   * @returns Hex-encoded HMAC signature.
   */
  public generateSignature(data: string): string {
    return createHmac('sha256', this.secretKey).update(data).digest('hex');
  }

  /**
   * Signs an order payload by serializing its fields.
   * @param payload - Order parameters to sign.
   * @returns Signed order object containing signature.
   */
  public signOrder(payload: OrderPayload): SignedOrder {
    const serialized = `${payload.symbol}:${payload.side}:${payload.price}:${payload.quantity}:${payload.timestamp}`;
    const signature = this.generateSignature(serialized);
    return { ...payload, signature };
  }

  /**
   * Validates whether a string is a valid EVM address.
   * @param address - Wallet address string.
   * @returns True if valid 20-byte hex EVM address.
   */
  public isValidEvmAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }
}