//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO HOROSCOPE CMS API
//
// CMS FIRST HOROSCOPE DELIVERY
//
// Supports:
//
// Daily Horoscope
// Weekly Horoscope
// Monthly Horoscope
// Yearly Horoscope
//
// FLOW:
//
// UI
//   ↓
// /api/astro/horoscope/cms
//   ↓
// Horoscope CMS Mongo
//   ↓
// Zodiac Master
//   ↓
// Complete CmsHoroscopeData
//   ↓
// Premium Experience UI
//
// LOCKED:
//
// ✅ CMS FIRST
// ✅ Zodiac Master for static zodiac identity
// ✅ No Swiss Ephemeris
// ✅ No calculation
// ✅ No prediction modification
// ✅ No AI generation here
//
//////////////////////////////////////////////////////////////

import { z } from "zod";

import {
  astroSuccess,
  astroError,
} from "@/lib/astro/api/response";

import {
  getHoroscopeByPeriod,
} from "@/lib/services/horoscopeContentService";

import {
  ensureDailyHoroscopeGenerated,
} from "@/lib/automation/horoscope";

//////////////////////////////////////////////////////////////
// RUNTIME
//////////////////////////////////////////////////////////////

export const runtime = "nodejs";

export const dynamic = "force-dynamic";

//////////////////////////////////////////////////////////////
// REQUEST CONTRACT
//////////////////////////////////////////////////////////////

const RequestSchema = z.object({
  zodiacSign: z
    .string()
    .trim()
    .toLowerCase()
    .min(1),

  horoscopeDate: z
    .coerce
    .date()
    .optional(),

  language: z
    .enum([
      "english",
      "hindi",
      "marathi",
      "tamil",
      "telugu",
      "nepali",
    ])
    .optional()
    .default("english"),

  period: z
    .enum([
      "daily",
      "weekly",
      "monthly",
      "yearly",
    ])
    .optional()
    .default("daily"),
});

//////////////////////////////////////////////////////////////
// DATE FORMATTER
//////////////////////////////////////////////////////////////

function formatDate(
  date?: Date
) {
  return (
    date ||
    new Date()
  )
    .toISOString()
    .split("T")[0];
}

//////////////////////////////////////////////////////////////
// POST
//////////////////////////////////////////////////////////////

export async function POST(
  req: Request
) {
  const startedAt =
    Date.now();

  try {
    ////////////////////////////////////////////////////////////
    // REQUEST PARSE
    ////////////////////////////////////////////////////////////

    const body =
      await req.json();

    const validated =
      RequestSchema.parse(
        body
      );

    console.log(
      "NATIONPATH HOROSCOPE CMS REQUEST",
      {
        zodiac:
          validated.zodiacSign,

        period:
          validated.period,

        language:
          validated.language,

        horoscopeDate:
          validated.horoscopeDate,
      }
    );

    ////////////////////////////////////////////////////////////
    // FETCH HOROSCOPE CMS CONTENT
    //
    // IMPORTANT:
    //
    // getHoroscopeByPeriod now receives the requested zodiac
    // and resolves Zodiac Master internally.
    //
    ////////////////////////////////////////////////////////////

    let content =
      await getHoroscopeByPeriod(
        validated.zodiacSign,
        validated.period,
        validated.horoscopeDate,
        validated.language
      );

    ////////////////////////////////////////////////////////////
    // AUTOMATION FALLBACK
    //
    // ONLY DAILY
    ////////////////////////////////////////////////////////////

    let automation =
      null;

    if (
      !content &&
      validated.period ===
        "daily"
    ) {
      console.log(
        "🌌 Daily horoscope missing. Triggering fallback.",
        {
          zodiac:
            validated.zodiacSign,
        }
      );

      automation =
        await ensureDailyHoroscopeGenerated(
          validated.zodiacSign,
          {
            language:
              validated.language,
          }
        );

      ////////////////////////////////////////////////////////////
      // FETCH CMS AGAIN
      ////////////////////////////////////////////////////////////

      if (
        automation.generated
      ) {
        content =
          await getHoroscopeByPeriod(
            validated.zodiacSign,
            validated.period,
            validated.horoscopeDate,
            validated.language
          );
      }
    }

    ////////////////////////////////////////////////////////////
    // COMPLETE DATA
    ////////////////////////////////////////////////////////////

    const completeContent =
      content || null;

    ////////////////////////////////////////////////////////////
    // ZODIAC MASTER DEBUG
    //
    // This MUST now come from:
    //
    // completeContent.zodiac
    //
    // No second source.
    //
    ////////////////////////////////////////////////////////////

    console.log(
      "NATIONPATH API ZODIAC MASTER:",
      JSON.stringify(
        completeContent?.zodiac ||
          null,
        null,
        2
      )
    );

    ////////////////////////////////////////////////////////////
    // FINAL DEBUG
    ////////////////////////////////////////////////////////////

    console.log(
      "NATIONPATH HOROSCOPE COMPLETE DATA",
      {
        zodiac:
          completeContent
            ?.zodiac
            ?.zodiac,

        hasZodiac:
          Boolean(
            completeContent
              ?.zodiac
          ),

        english:
          completeContent
            ?.zodiac
            ?.names
            ?.english,

        hindi:
          completeContent
            ?.zodiac
            ?.names
            ?.hindi,

        sanskrit:
          completeContent
            ?.zodiac
            ?.names
            ?.sanskrit,

        rashi:
          completeContent
            ?.zodiac
            ?.identity
            ?.rashi,

       nameInitials:
  completeContent
    ?.zodiac
    ?.nameInitials,
    
        explorerCount:
          completeContent
            ?.zodiacList
            ?.length || 0,
      }
    );

    ////////////////////////////////////////////////////////////
    // RESPONSE
    ////////////////////////////////////////////////////////////

    const response = {
      ////////////////////////////////////////////////////////////
      // REQUEST META
      ////////////////////////////////////////////////////////////

      zodiacSign:
        validated.zodiacSign,

      date:
        formatDate(
          validated.horoscopeDate
        ),

      language:
        completeContent
          ?.meta
          ?.language ||
        validated.language,

      period:
        completeContent
          ?.meta
          ?.period ||
        validated.period,

      ////////////////////////////////////////////////////////////
      // COMPLETE CMS DATA
      ////////////////////////////////////////////////////////////

      cms:
        completeContent,

      ////////////////////////////////////////////////////////////
      // AUTOMATION STATUS
      ////////////////////////////////////////////////////////////

      automation:
        automation,

      ////////////////////////////////////////////////////////////
      // EDITORIAL
      ////////////////////////////////////////////////////////////

      editorial:
        completeContent
          ?.editorial ||
        null,

      ////////////////////////////////////////////////////////////
      // PREMIUM EXPERIENCE
      ////////////////////////////////////////////////////////////

      experience:
        completeContent
          ? {
              hero:
                completeContent.hero,

              identity:
                completeContent.identity,

              traits:
                completeContent.traits,

              insights:
                completeContent.insights,

              planetaryInfluence:
                completeContent
                  .insights
                  ?.planetaryInfluence,

              luckyFactors:
                completeContent.lucky,

              remedy:
                completeContent.remedy,

              opportunities:
                completeContent
                  .vedic
                  ?.favorable,

              cautions:
                completeContent
                  .vedic
                  ?.avoid,

              premium:
                completeContent.premium,

              zodiac:
                completeContent.zodiac,
            }
          : null,

      ////////////////////////////////////////////////////////////
      // HOROSCOPE SECTIONS
      ////////////////////////////////////////////////////////////

      identity:
        completeContent
          ?.identity ||
        null,

      traits:
        completeContent
          ?.traits ||
        null,

      life:
        completeContent
          ?.life ||
        null,

      insights:
        completeContent
          ?.insights ||
        null,

      planets:
        completeContent
          ?.planets ||
        [],

      lucky:
        completeContent
          ?.lucky ||
        null,

      remedy:
        completeContent
          ?.remedy ||
        null,

      vedic:
        completeContent
          ?.vedic ||
        null,

      compatibility:
        completeContent
          ?.compatibility ||
        null,

      premium:
        completeContent
          ?.premium ||
        null,

      seo:
        completeContent
          ?.seo ||
        null,

      ////////////////////////////////////////////////////////////
      // ZODIAC EXPLORER
      ////////////////////////////////////////////////////////////

      zodiacList:
        completeContent
          ?.zodiacList ||
        [],

      ////////////////////////////////////////////////////////////
      // ZODIAC MASTER
      //
      // SINGLE AUTHORITATIVE VALUE.
      //
      ////////////////////////////////////////////////////////////

      zodiac:
        completeContent
          ?.zodiac ||
        null,

      ////////////////////////////////////////////////////////////
      // ENGINE SEPARATION
      ////////////////////////////////////////////////////////////

      prediction:
        null,

      ////////////////////////////////////////////////////////////
      // SYSTEM META
      ////////////////////////////////////////////////////////////

      meta: {
        source:
          "nationpath-astro-horoscope-cms",

        architecture:
          "cms-first-with-zodiac-master",

        version:
          "4.2",

        generatedAt:
          new Date()
            .toISOString(),

        responseTime:
          Date.now() -
          startedAt,
      },
    };

    ////////////////////////////////////////////////////////////
    // FINAL RESPONSE LOG
    ////////////////////////////////////////////////////////////

    console.log(
      "NATIONPATH HOROSCOPE CMS RESPONSE",
      {
        zodiac:
          response.zodiacSign,

        period:
          response.period,

        found:
          Boolean(
            completeContent
          ),

        hasZodiac:
          Boolean(
            response.zodiac
          ),

        zodiacMaster:
          response
            .zodiac
            ?.zodiac,

        english:
          response
            .zodiac
            ?.names
            ?.english,

        hindi:
          response
            .zodiac
            ?.names
            ?.hindi,

        sanskrit:
          response
            .zodiac
            ?.names
            ?.sanskrit,

        rashi:
          response
            .zodiac
            ?.identity
            ?.rashi,

       nameInitials:
  response
    .zodiac
    ?.nameInitials,

        automation:
          response.automation,

        explorerCount:
          response
            .zodiacList
            ?.length || 0,

        hasExperience:
          Boolean(
            response.experience
          ),
      }
    );

    ////////////////////////////////////////////////////////////
    // SUCCESS
    ////////////////////////////////////////////////////////////

    return astroSuccess(
      response,
      {
        source:
          "cms",

        version:
          "4.2",
      }
    );
  } catch (
    error
  ) {
    ////////////////////////////////////////////////////////////
    // ERROR
    ////////////////////////////////////////////////////////////

    console.error(
      "[HOROSCOPE_CMS_API_ERROR]",
      error
    );

    if (
      error instanceof
      z.ZodError
    ) {
      return astroError(
        "VALIDATION_ERROR",
        "Invalid horoscope CMS request",
        400,
        error.flatten()
      );
    }

    return astroError(
      "CMS_HOROSCOPE_FAILED",
      "Unable to load horoscope CMS content",
      500,
      error instanceof Error
        ? error.message
        : "Unknown error"
    );
  }
}