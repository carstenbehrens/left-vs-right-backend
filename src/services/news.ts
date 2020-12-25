import { Service, Inject } from 'typedi';
import axios from 'axios';
import config from '../config';
import { ILogger } from '../interfaces/ILogger';
import { IArticle } from '../interfaces/IArticle';

@Service()
export default class NewsService {
  constructor(@Inject('logger') private logger: ILogger) {}

  public async getNews(date: string, side: string): Promise<IArticle[]> {
    try {
      const requestConfig = {
        url: 'http://newsapi.org/v2/top-headlines',
        params: {
          sources: config.newsSource[side],
          apiKey: config.newsSource.apiKey,
          from: date,
          to: date,
          pageSize: 10
        }
      };

      const res = await axios.get(requestConfig.url, {
        params: requestConfig.params
      });

      if (res && res.data && res.data.articles) {
        return this.transform(res.data.articles);
      } else {
        throw new Error('Could not fetch correct data');
      }
    } catch (e) {
      this.logger.error(e);
      throw new Error('Could not fetch from news API');
    }
  }

  /**
   * Removes the content property from the articles returned from the news API
   * since we don't need it for our purposes.
   */
  private transform(data): IArticle[] {
    return data.map((article) => {
      delete article.content;
      return article;
    });
  }
}
