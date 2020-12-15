import { Router, Request, Response, NextFunction } from 'express';
const route = Router();

export default (app: Router) => {
  app.use('/', route);

  /* GET home page. */
  route.get('/', function (req: Request, res: Response, next: NextFunction) {
    res.send({ msg: 'This is working great' });
  });
};
