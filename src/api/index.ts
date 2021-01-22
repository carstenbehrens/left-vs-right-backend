import { Router } from 'express';
import news from './routes/news';
import healthcheck from './routes/healthcheck';

export default () => {
  const app = Router();
  news(app);
  healthcheck(app);

  return app;
};
