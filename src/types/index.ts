export type PoliticalSpectrum = 'left' | 'center' | 'right';

/**
 * The results of the getNews method of the NewsService
 */
export type Articles = {
  _id?: string;
  date: string;
  articles: [
    {
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
      politicalSpectrum: PoliticalSpectrum;
    }
  ];
};
