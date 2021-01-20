import App from './app';
import dependencyInjectorLoader from './loaders/dependencyInjector';
import { Container } from 'typedi';

// Registering dependencies
dependencyInjectorLoader();

async function startServer() {
  const app = new App(Container.get('logger'));
  await app.init();
  app.listen();
}

startServer();
