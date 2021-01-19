import { Container } from 'typedi';
import expressLoader from './express';
import mongooseLoader from './mongoose';
import dependencyInjectorLoader from './dependencyInjector';
import Logger from './logger';

// Registering dependencies
dependencyInjectorLoader();

async function init({ expressApp }) {
  const logger = Container.get(Logger);

  await mongooseLoader();
  logger.info('DB loaded and connected!');

  await expressLoader({ app: expressApp });
  logger.info('Express loaded');
}

export default init;
