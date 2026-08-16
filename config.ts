import fs from 'fs';
import path from 'path';

interface Config {
  apiKey: string;
  apiSecret: string;
  endpoint: string;
}

const DEFAULT_CONFIG: Config = {
  apiKey: 'defaultApiKey',
  apiSecret: 'defaultApiSecret',
  endpoint: 'https://api.default.com',
};

function loadConfig(filePath: string): Config {
  try {
    const configPath = path.resolve(filePath);
    const fileContent = fs.readFileSync(configPath, 'utf-8');
    const userConfig = JSON.parse(fileContent);
    return { ...DEFAULT_CONFIG, ...userConfig };
  } catch (error) {
    console.error('Could not load config, using defaults:', error);
    return DEFAULT_CONFIG;
  }
}

export { loadConfig, Config };