import fs from 'fs';

interface Config {
  apiKey: string;
  timeout: number;
  retries: number;
}

const defaultConfig: Config = {
  apiKey: 'default_api_key',
  timeout: 5000,
  retries: 3,
};

function loadConfig(filePath: string): Config {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const jsonConfig = JSON.parse(data);
    return { ...defaultConfig, ...jsonConfig };
  } catch (error) {
    console.warn('Could not load config, using defaults:', error);
    return defaultConfig;
  }
}

export { loadConfig, Config };