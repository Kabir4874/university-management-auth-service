import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp as string);
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `(${date.toDateString()}) ${hour}:${minute} [${label}] ${level}: ${message}`;
});

export const infoLogger = createLogger({
  level: 'info',
  format: combine(label({ label: 'Success' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'successes',
        'um-%DATE%-success.log',
      ),
      datePattern: 'YYYY-DD-MM-HH-mm',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '15d',
    }),
  ],
});
export const erroLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'Error' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'errors',
        'um-%DATE%-error.log',
      ),
      datePattern: 'YYYY-DD-MM-HH-mm',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '15d',
    }),
  ],
});
