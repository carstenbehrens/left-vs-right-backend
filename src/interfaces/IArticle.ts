/**
 * The results of the request to the news API
 */
export type IArticle = {
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
};

/**
 * The mongoose model of an news article
 */
export interface IArticleModel extends IArticle {
  _id: string;
}
