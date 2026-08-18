import fs from 'fs';
import path from 'path';

interface ConfigOptions {
  apiKey: string;
  dbUri: string;
  port: number;
}

const defaultConfig: ConfigOptions = {
  apiKey: 'defaultApiKey',
  dbUri: 'mongodb://localhost:27017/default',
  port: 3000,
};

function loadConfig(filePath: string): ConfigOptions {
  const fullPath = path.resolve(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    const fileConfig = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
    return { ...defaultConfig, ...fileConfig };
  }
  return defaultConfig;
}

export { loadConfig, ConfigOptions };