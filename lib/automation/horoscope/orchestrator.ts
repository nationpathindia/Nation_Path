//////////////////////////////////////////////////////////////
//
// NATIONPATH AI AUTOMATION
//
// HOROSCOPE AUTOMATION ORCHESTRATOR
//
// LOCKED PRODUCTION VERSION
//
// Flow:
//
// Scheduler / Ensure
//        ↓
// Orchestrator
//        ↓
// Zodiac Master
//        ↓
// Generator
//        ↓
// Mapper
//        ↓
// Publisher
//        ↓
// Horoscope CMS
//
// Responsibility:
// ONLY workflow orchestration.
//
// NO:
// - Astrology calculation
// - Swiss Ephemeris
// - Planet calculation
// - Prediction modification
// - AI generation
// - Duplicate CMS transformation
//
//////////////////////////////////////////////////////////////

import Horoscope from "@/app/models/Horoscope";

import Zodiac from "@/app/models/Zodiac";

import connectDB from "@/lib/mongodb";

import {
  generateAutomatedHoroscope,
} from "./generator";

import {
  publishHoroscope,
} from "./publisher";

//////////////////////////////////////////////////////////////
// INPUT
//////////////////////////////////////////////////////////////

export interface HoroscopeAutomationInput {

  period?:
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly";

  language?:
    | "english"
    | "hindi"
    | "marathi"
    | "tamil"
    | "telugu"
    | "nepali";

  startDate: Date;

  endDate: Date;

}

//////////////////////////////////////////////////////////////
// LOAD ZODIAC MASTER
//
// SINGLE SOURCE OF STATIC ZODIAC DATA.
//
// Scheduler does NOT access DB.
//
// Ensure does NOT need to duplicate this logic.
//
// Orchestrator owns the automation snapshot.
//
//////////////////////////////////////////////////////////////

async function getAutomationZodiacList() {

  const zodiacList =

    await Zodiac.find({

      status: "published",

    })

      .select({

        zodiac: 1,

        slug: 1,

        names: 1,

        symbol: 1,

        element: 1,

        rulingPlanet: 1,

        identity: 1,

        nameInitials: 1,

        media: 1,

      })

      .lean();

  return zodiacList;
}

//////////////////////////////////////////////////////////////
// ARCHIVE PREVIOUS ACTIVE HOROSCOPES
//////////////////////////////////////////////////////////////

async function archivePreviousHoroscopes(

  input: HoroscopeAutomationInput

) {

  const currentSlugDate =

    new Intl.DateTimeFormat(

      "en-CA",

      {

        timeZone: "Asia/Kolkata",

      }

    ).format(input.startDate);

  const result =

    await Horoscope.updateMany(

      {

        "meta.period":
          input.period || "daily",

        "meta.language":
          input.language || "english",

        "meta.status":
          "published",

        "meta.slugDate":
          {
            $ne: currentSlugDate,
          },

      },

      {

        $set: {

          "meta.status":
            "archived",

          "meta.archivedAt":
            new Date(),

          updatedBy:
            "nationpath-ai",

        },

      }

    );

  return result;
}

//////////////////////////////////////////////////////////////
// MAIN AUTOMATION
//////////////////////////////////////////////////////////////

export async function runHoroscopeAutomation(

  input: HoroscopeAutomationInput

) {

  await connectDB();

  ////////////////////////////////////////////////////////////
  // STEP 0
  //
  // LOAD CANONICAL ZODIAC MASTER
  ////////////////////////////////////////////////////////////

  const zodiacList =

    await getAutomationZodiacList();

  if (!zodiacList.length) {

    throw new Error(

      "No published Zodiac Master records found"

    );

  }

  ////////////////////////////////////////////////////////////
  // STEP 1
  //
  // ARCHIVE PREVIOUS ACTIVE CONTENT
  ////////////////////////////////////////////////////////////

  await archivePreviousHoroscopes(

    input

  );

  ////////////////////////////////////////////////////////////
  // STEP 2
  //
  // GENERATE → MAP → PUBLISH
  ////////////////////////////////////////////////////////////

  const documents: any[] = [];

  let generated = 0;

  let failed = 0;

  for (const zodiacMaster of zodiacList) {

    try {

      const zodiac =
        zodiacMaster.zodiac;

      if (!zodiac) {

        throw new Error(

          "Zodiac Master record missing zodiac"

        );

      }

      ////////////////////////////////////////////////////////
      // MASTER SNAPSHOT
      //
      // nameInitials comes directly from Zodiac Master.
      //
      ////////////////////////////////////////////////////////

      const masterSnapshot = {

        ...zodiacMaster,

        nameInitials:

          Array.isArray(
            zodiacMaster.nameInitials
          )

            ? zodiacMaster.nameInitials

            : [],

      };

      ////////////////////////////////////////////////////////
      // GENERATOR
      ////////////////////////////////////////////////////////

      const automationResult =

        await generateAutomatedHoroscope({

          zodiac,

          zodiacMaster:
            masterSnapshot,

          date:
            input.startDate,

          period:
            input.period || "daily",

          language:
            input.language || "english",

        });

      ////////////////////////////////////////////////////////
      // PUBLISH
      //
      // Mapper output goes directly to publisher.
      //
      // NO SECOND TRANSFORMATION.
      // NO SECOND nameInitials injection.
      //
      ////////////////////////////////////////////////////////

      const published =

        await publishHoroscope(

          automationResult.cms

        );

      documents.push(

        published

      );

      generated++;

      console.log(

        "✅ HOROSCOPE AUTOMATION COMPLETE",

        {

          zodiac,

          period:
            input.period || "daily",

          language:
            input.language || "english",

          nameInitialsCount:

            Array.isArray(
              published?.nameInitials
            )

              ? published.nameInitials.length

              : 0,

        }

      );

    }

    catch(error) {

      failed++;

      console.error(

        `❌ HOROSCOPE AUTOMATION FAILED: ${
          zodiacMaster?.zodiac || "unknown"
        }`,

        error

      );

    }

  }

  ////////////////////////////////////////////////////////////
  // RESULT
  ////////////////////////////////////////////////////////////

  return {

    success:
      failed === 0,

    total:
      zodiacList.length,

    generated,

    failed,

    data:
      documents,

    completedAt:
      new Date(),

  };

}

//////////////////////////////////////////////////////////////
// DEFAULT EXPORT
//////////////////////////////////////////////////////////////

export default {

  runHoroscopeAutomation,

};

