import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import NewsService from '../../services/news';
import DBService from '../../services/db';
import { body, validationResult } from 'express-validator';
import { ILogger } from '../../interfaces/ILogger';
import { PoliticalSpectrum } from '../../types';
const route = Router();

export default (app: Router) => {
  app.use('/', route);

  /* GET home page. */
  route.get(
    '/',
    body('date')
      .isDate({ format: 'YYYY-MM-DD' })
      .withMessage(
        'Date should be provided with the following value: YYYY-MM-DD e.g. 2020-10-15'
      ),
    body('politicalSpectrum')
      .isString()
      .withMessage(
        'PoliticalSpectrum should with the following value: right | left e.g. left'
      ),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: ILogger = Container.get('logger');
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const dbServiceInstance = Container.get(DBService);

        const date = req.body.date as string;
        const politicalSpectrum = req.body
          .politicalSpectrum as PoliticalSpectrum;

        // Get news from DB
        const dbArticles = await dbServiceInstance.get(date);

        if (dbArticles) {
          return res.send(dbArticles);
        }

        // Get news from News API
        const newsServiceInstance = Container.get(NewsService);
        const articles = await newsServiceInstance.getNews(
          politicalSpectrum,
          date
        );

        // Save news to DB
        dbServiceInstance.save(articles);

        return res.send(articles);
      } catch (err) {
        logger.error(err);
        return next(err);
      }
    }
  );
};
