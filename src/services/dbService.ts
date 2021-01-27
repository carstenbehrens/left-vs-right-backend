import { Service, Inject } from 'typedi';
import { ILogger } from '../interfaces/ILogger';
import { Articles } from '../types';
import ArticleModel from '../models/articles';

@Service()
export default class DBService {
  constructor(@Inject('logger') private logger: ILogger) {}

  public async get(date: string): Promise<object> {
    try {
      this.logger.info(`Get article from date ${date} from DB`);
      const articles = await ArticleModel.findOne({ date: date });

      return articles;
    } catch (e) {
      this.logger.error(e);
      throw new Error(`Could not get article from ${date} from DB`);
    }
  }

  public async save(articles: Articles): Promise<void> {
    try {
      this.logger.info('Save new articles to DB');
      const articlesModel = new ArticleModel({
        ...articles
      });
      await articlesModel.save();
      return;
    } catch (e) {
      this.logger.error(e);
      throw new Error('Could not save to DB');
    }
  }
}
