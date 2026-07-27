//////////////////////////////////////////////////////////////
// NATIONPATH MONGODB CONNECTION
// Astrology CMS Database Layer
//
// Responsibility:
// Connect MongoDB for Mongoose models.
//
// Does NOT:
// - handle Prisma
// - handle authentication
// - handle business logic
//////////////////////////////////////////////////////////////

import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI;


if (!MONGODB_URI) {

  throw new Error(
    "MONGODB_URI is not defined"
  );

}



interface MongoCache {

  conn: typeof mongoose | null;

  promise:
    Promise<typeof mongoose> | null;

}



declare global {

  var mongooseCache:
    MongoCache | undefined;

}



const cached =
  global.mongooseCache || {

    conn: null,

    promise: null,

  };



global.mongooseCache = cached;



export async function connectMongoDB() {


  if (cached.conn) {

    return cached.conn;

  }



  if (!cached.promise) {


    cached.promise = mongoose.connect(

      MONGODB_URI,

      {

        // Fix MongoDB Atlas DNS/SRV issues

        family: 4,


        // Connection timeout

        serverSelectionTimeoutMS: 10000,


        // Keep connection stable

        maxPoolSize: 10,


      }

    );


  }



  try {


    cached.conn =
      await cached.promise;



    console.log(
      "MongoDB Connected Successfully"
    );



    return cached.conn;



  } catch (error) {


    cached.promise = null;


    console.error(
      "MongoDB Connection Failed:",
      error
    );


    throw error;


  }


}



export default connectMongoDB;