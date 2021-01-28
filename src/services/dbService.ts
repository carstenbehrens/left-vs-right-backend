import { Service, Inject } from 'typedi';
import { ILogger } from '../interfaces/ILogger';
import { IArticles, IArticlesDocument } from '../interfaces/IArticles';
import ArticleModel from '../models/articles';

@Service()
export default class DBService {
  constructor(@Inject('logger') private logger: ILogger) {}

  public async get(date: string): Promise<IArticlesDocument> {
    try {
      this.logger.info(`Get article from date ${date} from DB`);
      const articles = await ArticleModel.findOne({ date: date });

      return articles as IArticlesDocument;
    } catch (e) {
      this.logger.error(e);
      throw new Error(`Could not get article from ${date} from DB`);
    }
  }

  public async save(articles: IArticles): Promise<IArticlesDocument> {
    try {
      this.logger.info('Save new articles to DB');
      const articlesModel = new ArticleModel({
        ...articles
      });
      const savedArticles = await articlesModel.save();

      return savedArticles as IArticlesDocument;
    } catch (e) {
      this.logger.error(e);
      throw new Error('Could not save to DB');
    }
  }
}
