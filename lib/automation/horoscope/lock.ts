//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO AUTOMATION
//
// HOROSCOPE GENERATION LOCK
//
// LOCKED PRODUCTION VERSION
//
// Responsibilities:
//
// - Prevent duplicate horoscope generation
// - Allow expired locks to be recovered
// - Release active generation lock
//
// NO:
//
// - Astrology calculation
// - Prediction logic
// - AI generation
//
//////////////////////////////////////////////////////////////

import AstroAutoLock from "@/app/models/AstroAutoLock";

import {
  connectMongoDB,
} from "@/lib/mongodb";

//////////////////////////////////////////////////////////////
// CONFIG
//////////////////////////////////////////////////////////////

const LOCK_KEY =
  "astro-daily-horoscope-generation";

const LOCK_TIMEOUT =
  15 * 60 * 1000;

//////////////////////////////////////////////////////////////
// CHECK ACTIVE LOCK
//////////////////////////////////////////////////////////////

export async function isHoroscopeGenerationRunning() {

  await connectMongoDB();

  const lock =

    await AstroAutoLock.findOne({

      key:
        LOCK_KEY,

      expiresAt: {
        $gt: new Date(),
      },

    })

      .lean();

  return !!lock;
}

//////////////////////////////////////////////////////////////
// ACQUIRE LOCK
//
// Behaviour:
//
// 1. Remove expired lock if present.
// 2. Attempt to create new lock.
// 3. Unique key prevents concurrent acquisition.
//
// IMPORTANT:
//
// Only MongoDB duplicate-key means another process
// already acquired the lock.
//
// Other database/system errors are re-thrown.
//
//////////////////////////////////////////////////////////////

export async function acquireHoroscopeGenerationLock() {

  await connectMongoDB();

  const now =
    new Date();

  const expiresAt =

    new Date(

      now.getTime()
      +
      LOCK_TIMEOUT

    );

  ////////////////////////////////////////////////////////////
  // REMOVE EXPIRED LOCK
  ////////////////////////////////////////////////////////////

  await AstroAutoLock.deleteOne({

    key:
      LOCK_KEY,

    expiresAt: {
      $lte: now,
    },

  });

  ////////////////////////////////////////////////////////////
  // CREATE ACTIVE LOCK
  ////////////////////////////////////////////////////////////

  try {

    await AstroAutoLock.create({

      key:
        LOCK_KEY,

      createdAt:
        now,

      expiresAt,

    });

    console.log(
      "🔒 HOROSCOPE GENERATION LOCK ACQUIRED",
      {
        key:
          LOCK_KEY,

        createdAt:
          now,

        expiresAt,
      }
    );

    return true;

  }

  catch (error: any) {

    //////////////////////////////////////////////////////////
    // DUPLICATE KEY
    //
    // Another process acquired the lock first.
    //////////////////////////////////////////////////////////

    if (
      error?.code === 11000
      ||
      (
        error?.name === "MongoServerError"
        &&
        error?.code === 11000
      )
    ) {

      console.log(
        "🔒 HOROSCOPE GENERATION LOCK ALREADY ACTIVE",
        {
          key:
            LOCK_KEY,
        }
      );

      return false;
    }

    //////////////////////////////////////////////////////////
    // REAL DATABASE / INFRASTRUCTURE ERROR
    //
    // Never hide an actual MongoDB/system failure.
    //////////////////////////////////////////////////////////

    throw error;
  }
}

//////////////////////////////////////////////////////////////
// RELEASE LOCK
//
// Always called from ensure.ts finally block.
//
// Removes only the horoscope generation lock.
//
//////////////////////////////////////////////////////////////

export async function releaseHoroscopeGenerationLock() {

  await connectMongoDB();

  const result =

    await AstroAutoLock.deleteOne({

      key:
        LOCK_KEY,

    });

  console.log(
    "🔓 HOROSCOPE GENERATION LOCK RELEASED",
    {
      key:
        LOCK_KEY,

      deleted:
        result.deletedCount,
    }
  );

  return result;
}

//////////////////////////////////////////////////////////////
// DEFAULT EXPORT
//////////////////////////////////////////////////////////////

export default {

  isHoroscopeGenerationRunning,

  acquireHoroscopeGenerationLock,

  releaseHoroscopeGenerationLock,

};

