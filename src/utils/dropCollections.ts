import mongoose from 'mongoose';

async function dropAllCollections(connection: mongoose.Connection) {
  const collections = Object.keys(connection.collections);
  for (const collectionName of collections) {
    const collection = connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      if (error.message === 'ns not found') return;
      if (error.message.includes('a background operation is currently running'))
        return;
    }
  }
}

export default dropAllCollections;
