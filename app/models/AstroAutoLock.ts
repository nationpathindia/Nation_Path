//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO AUTOMATION
//
// ASTRO AUTO LOCK MODEL
//
// LOCKED PRODUCTION VERSION
//
// Purpose:
//
// Prevent duplicate Astro background generation.
//
// Used By:
//
// - Daily Horoscope Automation
// - Future Astro Workers
// - Background Jobs
// - Queue Workers
//
// Responsibilities:
//
// - Store distributed generation lock
// - Enforce unique lock key
// - Automatically clean expired locks
//
// NO:
//
// - Astrology calculation
// - Prediction logic
// - AI generation
//
//////////////////////////////////////////////////////////////

import mongoose, {
  Schema,
  Model,
} from "mongoose";

//////////////////////////////////////////////////////////////
// SCHEMA
//////////////////////////////////////////////////////////////

const AstroAutoLockSchema = new Schema(

  {

    //////////////////////////////////////////////////////////
    // LOCK KEY
    //
    // Example:
    //
    // astro-daily-horoscope-generation
    //
    // UNIQUE:
    // Only one active lock with the same key can exist.
    //////////////////////////////////////////////////////////

    key: {

      type:
        String,

      required:
        true,

      unique:
        true,

      index:
        true,

      trim:
        true,

    },

    //////////////////////////////////////////////////////////
    // LOCK CREATED TIME
    //////////////////////////////////////////////////////////

    createdAt: {

      type:
        Date,

      default:
        Date.now,

    },

    //////////////////////////////////////////////////////////
    // LOCK EXPIRATION
    //
    // Lock service controls this value.
    //
    // TTL index automatically removes the document after
    // expiresAt.
    //////////////////////////////////////////////////////////

    expiresAt: {

      type:
        Date,

      required:
        true,

      index:
        true,

    },

  },

  {

    //////////////////////////////////////////////////////////
    // MONGOOSE TIMESTAMPS
    //
    // Adds:
    //
    // createdAt
    // updatedAt
    //
    //////////////////////////////////////////////////////////

    timestamps:
      true,

  }

);

//////////////////////////////////////////////////////////////
// TTL INDEX
//
// MongoDB automatically removes expired lock documents.
//
// IMPORTANT:
//
// This is a cleanup mechanism.
//
// The actual lock safety still comes from:
//
// key + unique index
//
// and the lock.ts acquisition logic.
//
//////////////////////////////////////////////////////////////

AstroAutoLockSchema.index(

  {
    expiresAt:
      1,
  },

  {
    expireAfterSeconds:
      0,
  }

);

//////////////////////////////////////////////////////////////
// MODEL
//
// Prevent model recompilation during Next.js hot reload.
//
//////////////////////////////////////////////////////////////

const AstroAutoLock: Model<any> =

  mongoose.models.AstroAutoLock ||

  mongoose.model(

    "AstroAutoLock",

    AstroAutoLockSchema

  );

//////////////////////////////////////////////////////////////
// EXPORT
//////////////////////////////////////////////////////////////

export default AstroAutoLock;

