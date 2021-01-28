import mongoose from 'mongoose';

export const ArticlesSchema = new mongoose.Schema({
  date: String,
  articles: [
    {
      source: {
        id: String,
        name: String
      },
      author: String,
      title: String,
      description: String,
      url: String,
      urlToImage: String,
      publishedAt: String,
      politicalSpectrum: String
    }
  ]
});

export default mongoose.model('Articles', ArticlesSchema);
