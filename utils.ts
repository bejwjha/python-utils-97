import * as fs from 'fs';
import * as path from 'path';

interface LoggerOptions {
  logFile: string;
  maxSize?: number;
  maxFiles?: number;
}

export function setupLogger(options: LoggerOptions): (message: string, level?: string) => void {
  const { logFile, maxSize = 5 * 1024 * 1024, maxFiles = 5 } = options;
  const logDir = path.dirname(logFile);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  const rotateLogs = (): void => {
    if (!fs.existsSync(logFile)) {
      return;
    }
    const stats = fs.statSync(logFile);
    if (stats.size <= maxSize) {
      return;
    }
    for (let i = maxFiles - 1; i > 0; i--) {
      const oldFile = `${logFile}.${i}`;
      const newFile = `${logFile}.${i + 1}`;
      if (fs.existsSync(oldFile)) {
        fs.renameSync(oldFile, newFile);
      }
    }
    fs.renameSync(logFile, `${logFile}.1`);
  };
  return (message: string, level: string = 'INFO'): void => {
    rotateLogs();
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level}] ${message}\n`;
    fs.appendFileSync(logFile, logEntry);
  };
}