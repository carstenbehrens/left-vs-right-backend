import { Service, Inject } from 'typedi';
import { ILogger } from '../interfaces/ILogger';
import { Articles } from '../types';
import ArticleModel from '../models/articles';

@Service()
export default class DBService {
  constructor(@Inject('logger') private logger: ILogger) {}

  public async get(date: string): Promise<any> {
    try {
      this.logger.info(`Trying to get article from date ${date}`);
      const articles = await ArticleModel.findOne({ date: date });

      return articles;
    } catch (err) {
      this.logger.error(err);
      throw new Error(`Could not get article from ${date} from DB`);
    }
  }

  public async save(articles: Articles): Promise<any> {
    try {
      this.logger.info('Trying to save new articles to DB');
      const articlesModel = new ArticleModel({
        ...articles
      });
      articlesModel.save();

      return;
    } catch (err) {
      this.logger.error(err);
      throw new Error('Could not save to DB');
    }
  }
}
