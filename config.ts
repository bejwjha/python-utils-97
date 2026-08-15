import { readFileSync, writeFileSync } from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

type Config = { apiKey: string; network: string; timeout: number; };

const defaultConfig: Config = {
    apiKey: process.env.API_KEY || '',
    network: process.env.NETWORK || 'mainnet',
    timeout: Number(process.env.TIMEOUT) || 5000,
};

function validateConfig(config: Config) {
    if (!config.apiKey) throw new Error('API key is required');
    if (!['mainnet', 'testnet'].includes(config.network)) throw new Error('Invalid network option');
    if (isNaN(config.timeout) || config.timeout <= 0) throw new Error('Invalid timeout value');
}

try {
    validateConfig(defaultConfig);
} catch (error) {
    console.error('Configuration validation error:', error.message);
    process.exit(1);
}

export default defaultConfig;
