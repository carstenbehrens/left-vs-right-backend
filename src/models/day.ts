import IDay from '../interfaces/IDay';
import mongoose from 'mongoose';

const Day = new mongoose.Schema({
  date: Date,
  images: [
    {
      name: String,
      alt: String,
      img: {
        data: Buffer,
        contentType: String
      }
    }
  ]
});

export default mongoose.model<IDay & mongoose.Document>('Day', Day);
