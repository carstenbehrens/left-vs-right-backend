import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../config';

export default async (): Promise<Db> => {
  const { env, dbTest, dbProd } = config;

  const connection = await mongoose.connect(
    env === 'production' ? dbProd : dbTest,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  );
  return connection.connection.db;
};
