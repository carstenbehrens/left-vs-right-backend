import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import NewsService from '../../services/news';
import { query, validationResult } from 'express-validator';
import { ILogger } from '../../interfaces/ILogger';
const route = Router();

export default (app: Router) => {
  app.use('/', route);

  /* GET home page. */
  route.get(
    '/',
    query('date')
      .isDate({ format: 'YYYY-MM-DD' })
      .withMessage(
        'Date should be provided as a value of a date query param with the following format: YYYY-MM-DD e.g. ?date=2020-10-15'
      ),
    query('side')
      .isIn(['left', 'right'])
      .withMessage(
        'Side should be provided as a value of a side query param e.g. ?side=left or ?side=right'
      ),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: ILogger = Container.get('logger');
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const date = req.query.date as string;
        const side = req.query.side as string;
        const newsServiceInstance = Container.get(NewsService);
        const results = await newsServiceInstance.getNews(date, side);

        return res.send({ results });
      } catch (err) {
        logger.error(err);
        return next(err);
      }
    }
  );
};
