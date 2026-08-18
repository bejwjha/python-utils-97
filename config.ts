export interface Config {
  apiUrl: string;
  timeout: number;
  retryCount: number;
}

const config: Config = {
  apiUrl: 'https://api.crypto.example.com',
  timeout: 5000,
  retryCount: 3,
};

export function getConfig(): Config {
  return config;
}

export function updateConfig(newConfig: Partial<Config>): void {
  Object.assign(config, newConfig);
}

export function validateConfig(cfg: Config): boolean {
  return typeof cfg.apiUrl === 'string' &&
         typeof cfg.timeout === 'number' &&
         typeof cfg.retryCount === 'number';
}