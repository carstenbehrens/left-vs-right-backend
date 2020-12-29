import mongoose from 'mongoose';

/*
  image: [
    {
      name: String,
      alt: String,
      img: {
        data: Buffer,
        contentType: String
      }
    }
  ],
*/

const ArticlesSchema = new mongoose.Schema({
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
