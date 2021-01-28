import { Service, Inject } from 'typedi';
import axios, { AxiosResponse } from 'axios';
import config from '../config';
import { ILogger } from '../interfaces/ILogger';
import { PoliticalSpectrum } from '../types';
import { IArticles } from '../interfaces/IArticles';
import { IArticle } from '../interfaces/IArticle';

@Service()
export default class NewsService {
  constructor(@Inject('logger') private logger: ILogger) {}

  public async getNews(
    politicalSpectrum: PoliticalSpectrum,
    date: string
  ): Promise<IArticles> {
    this.logger.info(`Request news from ${date}`);
    const res = await this.apiRequest(politicalSpectrum, date);

    if (res && res.data && res.data.articles) {
      return {
        date: date,
        articles: [...this.transform(res.data.articles, politicalSpectrum)]
      } as IArticles;
    } else {
      throw new Error('Could not fetch correct data');
    }
  }

  private transform(
    data: Array<IArticle>,
    politicalSpectrum: PoliticalSpectrum
  ): IArticle[] {
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
  ): Promise<AxiosResponse> {
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
    } catch (e) {
      if (e && e.response && e.response.data && e.response.data.message) {
        // Just return the error message of the API if we have one
        throw new Error(e.response.data.message);
      }
      throw new Error('Could not fetch from news API');
    }
  }
}
