import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

interface MongoCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongoCache | undefined;
}

const cached: MongoCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

export async function connectMongoDB() {
  // Reuse only an actually connected Mongoose instance.
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // If the cached connection is no longer usable, clear it.
  if (cached.conn && mongoose.connection.readyState !== 1) {
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      family: 4,
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 10,
    });
  }

  try {
    cached.conn = await cached.promise;

    console.log("MongoDB Connected Successfully");

    return cached.conn;
  } catch (error) {
    cached.conn = null;
    cached.promise = null;

    console.error("MongoDB Connection Failed:", error);

    throw error;
  }
}

export default connectMongoDB;