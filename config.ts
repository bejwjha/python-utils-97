export interface CryptoConfig {
  network: 'mainnet' | 'testnet';
  rpcEndpoint: string;
  timeout: number;
  retryAttempts: number;
}

export const DEFAULT_CONFIG: CryptoConfig = {
  network: 'mainnet',
  rpcEndpoint: 'https://api.crypto-utils.io',
  timeout: 5000,
  retryAttempts: 3,
};

export const getEnvironmentConfig = (env: string = 'mainnet'): CryptoConfig => ({
  ...DEFAULT_CONFIG,
  network: env === 'testnet' ? 'testnet' : 'mainnet',
  rpcEndpoint: env === 'testnet' 
    ? 'https://testnet.crypto-utils.io' 
    : DEFAULT_CONFIG.rpcEndpoint,
});