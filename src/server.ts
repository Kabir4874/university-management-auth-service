import mongoose from 'mongoose';
import app from './app.js';
import config from './config/index.js';
import { erroLogger, infLogger } from './shared/logger.js';

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url);
    infLogger.info('⛁ Database connected successfully');
    app.listen(config.port, () => {
      infLogger.info(`Server is running on port: ${config.port}`);
    });
  } catch (error) {
    erroLogger.error('Failed to connect database', error);
  }
}

bootstrap();
