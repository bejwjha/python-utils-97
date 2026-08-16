import { Config } from './types';

export const defaultConfig: Config = {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    retryAttempts: 3,
};

export const validateConfig = (config: Partial<Config>): void => {
    if (typeof config.apiUrl !== 'string' || config.apiUrl.trim() === '') {
        throw new Error('Invalid API URL.');
    }
    if (typeof config.timeout !== 'number' || config.timeout <= 0) {
        throw new Error('Timeout must be a positive number.');
    }
    if (typeof config.retryAttempts !== 'number' || config.retryAttempts < 0) {
        throw new Error('Retry attempts must be a non-negative number.');
    }
};

export const getConfig = (customConfig: Partial<Config>): Config => {
    const config = { ...defaultConfig, ...customConfig };
    validateConfig(config);
    return config;
};
