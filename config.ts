export interface CryptoConfig {
  network: 'mainnet' | 'testnet';
  rpcUrl: string;
  timeoutMs: number;
  retryAttempts: number;
  maxGasPriceGwei: number;
}

const DEFAULT_CONFIG: CryptoConfig = {
  network: 'mainnet',
  rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/demo',
  timeoutMs: 5000,
  retryAttempts: 3,
  maxGasPriceGwei: 100,
};

export class ConfigLoader {
  private currentConfig: CryptoConfig;

  constructor(initialConfig?: Partial<CryptoConfig>) {
    this.currentConfig = { ...DEFAULT_CONFIG, ...initialConfig };
  }

  public get<K extends keyof CryptoConfig>(key: K): CryptoConfig[K] {
    return this.currentConfig[key];
  }

  public set(overrides: Partial<CryptoConfig>): CryptoConfig {
    this.currentConfig = { ...this.currentConfig, ...overrides };
    return { ...this.currentConfig };
  }

  public getAll(): Readonly<CryptoConfig> {
    return Object.freeze({ ...this.currentConfig });
  }

  public reset(): CryptoConfig {
    this.currentConfig = { ...DEFAULT_CONFIG };
    return { ...this.currentConfig };
  }
}

export const defaultConfig = DEFAULT_CONFIG;
