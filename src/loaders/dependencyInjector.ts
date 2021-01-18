import { Container } from 'typedi';
import Logger from './logger';

export default () => {
  const logger = new Logger();

  try {
    Container.set('logger', logger);

    logger.info(' DI container setup is done');
  } catch (e) {
    logger.error('Error on dependency injector loader: %o', e);
    throw e;
  }
};
