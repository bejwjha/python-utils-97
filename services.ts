import { CryptoConfig, WalletAccount } from './types';

export class CryptoService {
  private readonly config: CryptoConfig;

  constructor(config: CryptoConfig) {
    this.config = config;
  }

  public validateAddress(address: string): boolean {
    if (!address || typeof address !== 'string') {
      return false;
    }
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }

  public formatBalance(rawBalance: bigint, decimals: number = 18): string {
    const divisor = BigInt(10 ** decimals);
    const integerPart = rawBalance / divisor;
    const remainder = rawBalance % divisor;
    const fraction = remainder.toString().padStart(decimals, '0').slice(0, 4);
    return `${integerPart}.${fraction}`;
  }

  public async fetchAccountDetails(address: string): Promise<WalletAccount> {
    if (!this.validateAddress(address)) {
      throw new Error(`Invalid wallet address: ${address}`);
    }
    return {
      address,
      network: this.config.network,
      isActive: true,
      lastSyncTimestamp: Date.now()
    };
  }
}
