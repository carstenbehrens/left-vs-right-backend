import 'reflect-metadata'; // We need this in order to use @Decorators
import config from './config';
import express from 'express';
import mongoose from 'mongoose';
import mongooseLoader from './loaders/mongoose';
import expressLoader from './loaders/express';
import { ILogger } from './interfaces/ILogger';

class App {
  public app: express.Express;
  public port: string | number;
  public env: string;
  public dbConnection: mongoose.Connection;
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  public async init() {
    this.app = express();

    this.dbConnection = await mongooseLoader();
    this.logger.info('DB loaded and connected!');

    await expressLoader(this.app, this.logger);
    this.logger.info('Express loaded');
  }

  public getServer() {
    return this.app;
  }

  public getDbConnection() {
    return this.dbConnection;
  }

  public listen() {
    this.app
      .listen(config.port, () => {
        this.logger.info(`
      ################################################
      ️   Server listening on port: ${config.port} 
      ################################################
    `);
      })
      .on('error', (err) => {
        this.logger.error(err);
        process.exit(1);
      });
  }
}

export default App;
