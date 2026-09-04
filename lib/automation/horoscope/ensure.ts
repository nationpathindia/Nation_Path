//////////////////////////////////////////////////////////////
//
// NATIONPATH AI AUTOMATION
//
// HOROSCOPE DAILY ENSURE SERVICE
//
// LOCKED PRODUCTION VERSION
//
// Responsibility:
//
// Viewer Request
//        ↓
// Check Today's Published Horoscope
//        ↓
// Exists → Return CMS
//
// Missing
//        ↓
// Generation Lock
//        ↓
// Full Automation Orchestrator
//        ↓
// Generate All Zodiac
//        ↓
// Publish
//        ↓
// Verify Requested Zodiac
//
//
//
// IMPORTANT:
//
// This file does NOT:
//
// - Load Zodiac Master
// - Generate horoscope content
// - Call generator directly
// - Call mapper
// - Call publisher
// - Calculate astrology
// - Modify prediction
// - Generate AI
//
// Orchestrator owns the complete generation pipeline.
//
//////////////////////////////////////////////////////////////

import {
  getHoroscopeByPeriod,
} from "@/lib/services/horoscopeContentService";

import {
  runHoroscopeAutomation,
} from "./orchestrator";

import {
  isHoroscopeGenerationRunning,
  acquireHoroscopeGenerationLock,
  releaseHoroscopeGenerationLock,
} from "./lock";

//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

export interface EnsureDailyHoroscopeResult {

  generated: boolean;

  generating: boolean;

  source:
    | "cms"
    | "automation";

  message?: string;

  zodiac?: string;

}

//////////////////////////////////////////////////////////////
// ENSURE TODAY HOROSCOPE
//////////////////////////////////////////////////////////////

export async function ensureDailyHoroscopeGenerated(

  zodiacSign: string,

  options?: {

    language?:
      | "english"
      | "hindi"
      | "marathi"
      | "tamil"
      | "telugu"
      | "nepali";

  }

): Promise<EnsureDailyHoroscopeResult> {

  const language =
    options?.language ||
    "english";

  const today =
    new Date();

  ////////////////////////////////////////////////////////////
  //
  // STEP 1
  //
  // CMS FIRST
  //
  // Never generate if today's published CMS content exists.
  //
  ////////////////////////////////////////////////////////////

  const existing =

    await getHoroscopeByPeriod(

      zodiacSign,

      "daily",

      today,

      language

    );

  if (existing) {

    return {

      generated:
        false,

      generating:
        false,

      source:
        "cms",

      zodiac:
        zodiacSign,

      message:
        "Today's horoscope already available",

    };

  }

  ////////////////////////////////////////////////////////////
  //
  // STEP 2
  //
  // CHECK ACTIVE DISTRIBUTED LOCK
  //
  ////////////////////////////////////////////////////////////

  const alreadyRunning =

    await isHoroscopeGenerationRunning();

  if (alreadyRunning) {

    return {

      generated:
        false,

      generating:
        true,

      source:
        "automation",

      zodiac:
        zodiacSign,

      message:
        "Preparing today's horoscope. Please wait.",

    };

  }

  ////////////////////////////////////////////////////////////
  //
  // STEP 3
  //
  // ACQUIRE DISTRIBUTED LOCK
  //
  ////////////////////////////////////////////////////////////

  const lockAcquired =

    await acquireHoroscopeGenerationLock();

  if (!lockAcquired) {

    return {

      generated:
        false,

      generating:
        true,

      source:
        "automation",

      zodiac:
        zodiacSign,

      message:
        "Today's horoscope generation is already running.",

    };

  }

  try {

    console.log(

      "🌌 TODAY'S HOROSCOPE MISSING — STARTING AUTOMATION",

      {

        zodiac:
          zodiacSign,

        date:
          today,

        language,

      }

    );

    //////////////////////////////////////////////////////////
    //
    // STEP 4
    //
    // FULL AUTOMATION
    //
    // Orchestrator owns:
    //
    // Zodiac Master
    //      ↓
    // Generator
    //      ↓
    // Mapper
    //      ↓
    // Publisher
    //
    //////////////////////////////////////////////////////////

    const result =

      await runHoroscopeAutomation({

        period:
          "daily",

        language,

        startDate:
          today,

        endDate:
          today,

      });

    //////////////////////////////////////////////////////////
    //
    // STEP 5
    //
    // AUTOMATION RESULT CHECK
    //
    //////////////////////////////////////////////////////////

    if (!result.success) {

      console.error(

        "[HOROSCOPE_AUTOMATION_PARTIAL_FAILURE]",

        {

          zodiac:
            zodiacSign,

          total:
            result.total,

          generated:
            result.generated,

          failed:
            result.failed,

        }

      );

    }

    //////////////////////////////////////////////////////////
    //
    // STEP 6
    //
    // VERIFY REQUESTED ZODIAC
    //
    // Always verify through CMS.
    //
    //////////////////////////////////////////////////////////

    const refreshed =

      await getHoroscopeByPeriod(

        zodiacSign,

        "daily",

        today,

        language

      );

    //////////////////////////////////////////////////////////
    //
    // SUCCESS
    //
    //////////////////////////////////////////////////////////

    return {

      generated:
        !!refreshed,

      generating:
        false,

      source:
        "automation",

      zodiac:
        zodiacSign,

      message:

        refreshed

          ? "Today's horoscope generated successfully"

          : "Generation completed but verification pending",

    };

  }

  catch (error) {

    console.error(

      "[HOROSCOPE_AUTOMATION_FAILED]",

      {

        zodiac:
          zodiacSign,

        error,

      }

    );

    return {

      generated:
        false,

      generating:
        false,

      source:
        "automation",

      zodiac:
        zodiacSign,

      message:
        "Unable to prepare today's horoscope.",

    };

  }

  finally {

    //////////////////////////////////////////////////////////
    //
    // STEP 7
    //
    // ALWAYS RELEASE LOCK
    //
    //////////////////////////////////////////////////////////

    await releaseHoroscopeGenerationLock();

  }

}

//////////////////////////////////////////////////////////////
// DEFAULT EXPORT
//////////////////////////////////////////////////////////////

export default {

  ensureDailyHoroscopeGenerated,

};

