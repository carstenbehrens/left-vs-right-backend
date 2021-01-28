import { Document } from 'mongoose';
import { IArticle } from './IArticle';

export interface IArticles {
  date: string;
  articles: [IArticle];
}

export interface IArticlesDocument extends Document {
  date: string;
  articles: [IArticle];
}
