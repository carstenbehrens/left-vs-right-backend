import mongoose from 'mongoose';

async function dropAllCollections(connection: mongoose.Connection) {
  const collections = Object.keys(connection.collections);
  for (const collectionName of collections) {
    const collection = connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === 'ns not found') return;
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      if (error.message.includes('a background operation is currently running'))
        return;
    }
  }
}

export default dropAllCollections;
