import { PoliticalSpectrum } from '../types';

export interface IArticle {
  content?: string;
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  politicalSpectrum?: PoliticalSpectrum;
}
