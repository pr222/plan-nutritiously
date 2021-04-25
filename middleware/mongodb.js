/**
 * Soruce for code gotten from:
 * https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
 *
 * Derived with minor fixes for linting.
 */

import { MongoClient } from 'mongodb';

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  );
}

if (!MONGODB_DB) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local',
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) {
  global.mongo = { conn: null, promise: null };
  cached = global.mongo;
}

export default async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => ({
      client,
      db: client.db(MONGODB_DB),
    }));
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
