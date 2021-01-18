import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("Couldn't find .env file️");
}

const config = {
  /**
   * The port the application will use
   */
  port: parseInt(process.env.PORT as string),
  /**
   * The MongoDB connection string
   */
  env: process.env.NODE_ENV as string,
  dbProd: process.env.DB_PROD as string,
  dbTest: process.env.DB_TEST as string,
  newsSource: {
    apiKey: process.env.API_KEY,
    right: 'fox-news, breitbart-news',
    left: 'cnn, nbc-news'
  },
  cloud: {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
  }
};

export default config;
