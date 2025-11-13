import type { Server } from 'http';
import mongoose from 'mongoose';
import app from './app.js';
import config from './config/index.js';
import { erroLogger, infoLogger } from './shared/logger.js';

process.on('uncaughtException', (error) => {
  erroLogger.error(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url);
    infoLogger.info('⛁ Database connected successfully');
    server = app.listen(config.port, () => {
      infoLogger.info(`Server is running on port: ${config.port}`);
    });
  } catch (error) {
    erroLogger.error('Failed to connect database', error);
  }
  process.on('unhandledRejection', (error) => {
    console.log('Unhandled Rejection is detected, we are closing server');
    if (server) {
      server.close(() => {
        erroLogger.error(error);
        process.exit(1);
      });
    }
    process.exit(1);
  });
}

bootstrap();

process.on('SIGTERM', () => {
  infoLogger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
