import { CryptoPair, TradeResult } from './types';

/**
 * Orchestrates crypto exchange operations with validation
 */
export class ExchangeService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Executes a trade for a specific pair
   */
  public async executeTrade(pair: CryptoPair, amount: number): Promise<TradeResult> {
    if (amount <= 0) {
      throw new Error('Invalid trade amount');
    }

    const response = await fetch(`https://api.crypto.com/v1/trade`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ pair, amount }),
    });

    if (!response.ok) {
      throw new Error(`Trade failed: ${response.statusText}`);
    }

    return await response.json() as TradeResult;
  }

  /**
   * Formats trade execution logs
   */
  public formatLog(result: TradeResult): string {
    return `Executed ${result.id} at ${result.price}`;
  }
}