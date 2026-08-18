import { createLogger, format, transports } from 'winston';
import { DateTime } from 'luxon';

const logFormat = format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        logFormat
    ),
    transports: [
        new transports.File({
            filename: 'error.log',
            level: 'error',
            maxsize: 5242880,
            maxFiles: '5d',
            tailable: true,
        }),
        new transports.File({
            filename: 'combined.log',
            maxsize: 5242880,
            maxFiles: '5d',
            tailable: true,
        }),
        new transports.Console()
    ]
});

export default logger;
