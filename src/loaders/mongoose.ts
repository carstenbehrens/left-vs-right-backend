import mongoose from 'mongoose';
import config from '../config';

export default async (): Promise<mongoose.Connection> => {
  const { env, dbTest, dbProd } = config;

  const connection = await mongoose.connect(
    env === 'production' ? dbProd : dbTest,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  );
  return connection.connection;
};
