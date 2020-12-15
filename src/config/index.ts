import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const config = {
  /**
   * The port the application will use
   */
  port: parseInt(process.env.PORT as string),
  /**
   * The MongoDB connection string
   */
  db: process.env.DB as string
};

export default config;
