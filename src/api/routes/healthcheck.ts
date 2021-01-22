import { Router, Request, Response, NextFunction } from 'express';
const route = Router();

export default (app: Router) => {
  app.use('/healthcheck', route);

  route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  });
};
