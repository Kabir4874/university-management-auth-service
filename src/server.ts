import mongoose from 'mongoose';
import app from './app.js';
import config from './config/index.js';
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('⛁ Database connected successfully');
    app.listen(config.port, () => {
      console.log(`Server is running on port: ${config.port}`);
    });
  } catch (error) {
    console.log('Failed to connect database', error);
  }
}

bootstrap();
