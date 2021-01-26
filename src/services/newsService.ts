import { Service, Inject } from 'typedi';
import axios from 'axios';
import config from '../config';
import { ILogger } from '../interfaces/ILogger';
import { Articles, Article, PoliticalSpectrum } from '../types';

@Service()
export default class NewsService {
  constructor(@Inject('logger') private logger: ILogger) {}

  public async getNews(
    politicalSpectrum: PoliticalSpectrum,
    date: string
  ): Promise<Articles> {
    this.logger.info(`Request news from ${date}`);
    const res = await this.apiRequest(politicalSpectrum, date);

    if (res && res.data && res.data.articles) {
      return {
        date: date,
        articles: [...this.transform(res.data.articles, politicalSpectrum)]
      } as Articles;
    } else {
      throw new Error('Could not fetch correct data');
    }
  }

  /**
   * Removes the content property from the articles returned from the news API
   * since we don't need it for our purposes.
   */
  private transform(
    data: Array<Article>,
    politicalSpectrum: PoliticalSpectrum
  ): any {
    return data.map((article) => {
      delete article.content;
      return {
        ...article,
        politicalSpectrum
      };
    });
  }

  private async apiRequest(
    politicalSpectrum: PoliticalSpectrum,
    date: string
  ): Promise<any> {
    const requestConfig = {
      url: 'http://newsapi.org/v2/everything',
      params: {
        apiKey: config.newsSource.apiKey,
        from: date,
        to: date,
        language: 'en',
        pageSize: 10,
        sources: config.newsSource[politicalSpectrum],
        sortBy: 'popularity'
      }
    };
    try {
      const res = await axios.get(requestConfig.url, {
        params: requestConfig.params
      });
      return res;
    } catch (err) {
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        // Just return the error message of the API if we have one
        throw new Error(err.response.data.message);
      }
      throw new Error('Could not fetch from news API');
    }
  }
}
