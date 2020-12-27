import mongoose from 'mongoose';

const Article = new mongoose.Schema({
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
  side: String
});

export default mongoose.model('Article', Article);
