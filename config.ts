import fs from 'fs';
import path from 'path';

interface Config {
    apiKey: string;
    apiSecret: string;
    timeout: number;
}

const defaultConfig: Config = {
    apiKey: 'default-key',
    apiSecret: 'default-secret',
    timeout: 5000,
};

const loadConfig = (configPath: string): Config => {
    try {
        const fullPath = path.resolve(configPath);
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        const userConfig = JSON.parse(fileContent) as Partial<Config>;
        return { ...defaultConfig, ...userConfig };
    } catch (error) {
        console.error('Error loading config:', error);
        return defaultConfig;
    }
};

export default loadConfig;
