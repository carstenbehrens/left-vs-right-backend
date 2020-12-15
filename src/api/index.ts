import { Router } from 'express';
import index from './routes/index';

export default () => {
  const app = Router();
  index(app);

  return app;
};
