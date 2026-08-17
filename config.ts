import { createLogger, format, transports } from 'winston';

const logFormat = format.combine(
  format.timestamp(),
  format.printf(({ timestamp, message }) => `${timestamp}: ${message}`)
);

const logger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new transports.File({ filename: 'error.log', level: 'error', maxsize: 1000000,}) ,
    new transports.File({ filename: 'combined.log', maxsize: 1000000,}) ,
    new transports.Console(),
  ],
});

export default logger;

process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled Rejection: ${reason}`);
});