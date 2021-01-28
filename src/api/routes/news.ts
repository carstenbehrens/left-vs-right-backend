import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import NewsService from '../../services/newsService';
import DBService from '../../services/dbService';
import { body, validationResult } from 'express-validator';
import { PoliticalSpectrum } from '../../types';
import ImageService from '../../services/imageService';
import { IArticles, IArticlesDocument } from '../../interfaces/IArticles';
const route = Router();

export default (app: Router) => {
  app.use('/news', route);

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
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const articles = await getNewsArticles(
          req.body.date as string,
          req.body.politicalSpectrum as PoliticalSpectrum
        );

        return res.send(articles);
      } catch (e) {
        return next(e);
      }
    }
  );
};

async function getNewsArticles(
  date: string,
  politicalSpectrum: PoliticalSpectrum
): Promise<IArticlesDocument> {
  // Try to get the news articles from DB first
  const dbServiceInstance = Container.get(DBService);
  const articlesFromDB = await dbServiceInstance.get(date);

  if (articlesFromDB) {
    return articlesFromDB;
  }

  // Get news articles from News API
  const newsServiceInstance = Container.get(NewsService);
  const articles = await newsServiceInstance.getNews(politicalSpectrum, date);

  // Save the image associated with the article to an server
  const imageServiceInstance = Container.get(ImageService);

  // Upload the images to our server
  const transformedArticles = await Promise.all(
    articles.articles.map(async (article) => {
      return {
        ...article,
        urlToImage: await imageServiceInstance.save(article.urlToImage)
      };
    })
  );

  // Compose final result
  const result = {
    ...articles,
    articles: transformedArticles
  } as IArticles;

  // Save news articles to DB
  const savedArticles = await dbServiceInstance.save(result);

  return savedArticles;
}
