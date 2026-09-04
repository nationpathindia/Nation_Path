//////////////////////////////////////////////////////////////
//
// NATIONPATH PREDICTION API
//
// HOROSCOPE PREDICTION INTELLIGENCE EXPOSURE LAYER
//
// Pipeline:
//
// Request
//        ↓
// Horoscope Service
//        ↓
// Astro Engine
//        ↓
// Horoscope Snapshot
//        ↓
// Prediction Engine
//        ↓
// Language Intelligence
//        ↓
// Experience Intelligence
//        ↓
// API Response
//
// LOCKED:
//
// Calculation untouched.
// Astro engine untouched.
// Prediction engine untouched.
// AI remains inside Horoscope Service only.
//
// This API is an orchestration / exposure layer.
//
//////////////////////////////////////////////////////////////

import { z } from "zod";

//////////////////////////////////////////////////////////////
// HOROSCOPE SERVICE
//////////////////////////////////////////////////////////////

import {
  generateHoroscope,
} from "@/lib/services/horoscopeService";

//////////////////////////////////////////////////////////////
// PREDICTION ENGINE
//////////////////////////////////////////////////////////////

import {
  predictHoroscope,
} from "@/lib/astro/horoscope/prediction";

//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

import type {
  HoroscopeLanguage,
  HoroscopePlanet,
} from "@/lib/astro/horoscope/types";

//////////////////////////////////////////////////////////////
// EXPERIENCE INTELLIGENCE
//////////////////////////////////////////////////////////////

import {
  buildExperienceSections,
} from "@/lib/astro/horoscope/prediction/experience/experienceSections";

import {
  createFormattedExperience,
} from "@/lib/astro/horoscope/prediction/experience/formatter";

//////////////////////////////////////////////////////////////
// API RESPONSE
//////////////////////////////////////////////////////////////

import {
  astroSuccess,
  astroError,
} from "@/lib/astro/api/response";

import {
  ASTRO_API_ERRORS,
} from "@/lib/astro/api/errors";

//////////////////////////////////////////////////////////////
// RUNTIME
//////////////////////////////////////////////////////////////

export const runtime = "nodejs";

export const dynamic = "force-dynamic";

//////////////////////////////////////////////////////////////
// REQUEST VALIDATION
//////////////////////////////////////////////////////////////

const RequestSchema = z.object({

  ////////////////////////////////////////////////////////////
  // ZODIAC SIGN
  ////////////////////////////////////////////////////////////

  zodiacSign:
    z.string()
      .trim()
      .min(
        1,
        "zodiacSign is required"
      ),

  ////////////////////////////////////////////////////////////
  // HOROSCOPE DATE
  ////////////////////////////////////////////////////////////

  horoscopeDate:
    z.string()
      .transform(
        (
          value
        ) =>
          new Date(value)
      )
      .refine(
        (
          date
        ) =>
          !isNaN(
            date.getTime()
          ),
        {
          message:
            "Invalid horoscopeDate",
        }
      ),

  ////////////////////////////////////////////////////////////
  // LANGUAGE
  ////////////////////////////////////////////////////////////

  language:
    z.enum([
      "english",
      "hindi",
      "marathi",
      "tamil",
      "telugu",
      "nepali",

      "en",
      "hi",
      "ta",
      "te",
      "sa",
    ])
      .optional(),

});

//////////////////////////////////////////////////////////////
// LANGUAGE RESOLVER
//////////////////////////////////////////////////////////////

function resolveLanguage(
  value: string | undefined
): HoroscopeLanguage {

  if (!value) {
    return "english";
  }

  return value as HoroscopeLanguage;

}

//////////////////////////////////////////////////////////////
// ZODIAC NORMALIZER
//////////////////////////////////////////////////////////////
//
// IMPORTANT:
//
// This only normalizes the incoming zodiac identity.
//
// No zodiac calculation happens here.
//
// IMPORTANT REGEX:
//
// /^\/+|\/+$/g
//
//////////////////////////////////////////////////////////////

function normalizeZodiac(
  value: string
): string {

  return value
    .trim()
    .toLowerCase()
    .replace(
      /^\/+|\/+$/g,
      ""
    )
    .replace(
      /\s+/g,
      "-"
    )
    .replace(
      /_+/g,
      "-"
    );

}

//////////////////////////////////////////////////////////////
// REQUEST ID
//////////////////////////////////////////////////////////////

function createRequestId(): string {

  return (
    "astro_" +
    Date.now() +
    "_" +
    Math.random()
      .toString(36)
      .slice(2)
  );

}

//////////////////////////////////////////////////////////////
// POST
//////////////////////////////////////////////////////////////

export async function POST(
  req: Request
) {

  ////////////////////////////////////////////////////////////
  // REQUEST START
  ////////////////////////////////////////////////////////////

  const startedAt =
    Date.now();

  ////////////////////////////////////////////////////////////
  // REQUEST ID
  ////////////////////////////////////////////////////////////

  const requestId =
    createRequestId();

  ////////////////////////////////////////////////////////////
  // MAIN PIPELINE
  ////////////////////////////////////////////////////////////

  try {

    //////////////////////////////////////////////////////////
    // READ REQUEST
    //////////////////////////////////////////////////////////

    const body =
      await req.json();

    //////////////////////////////////////////////////////////
    // VALIDATE REQUEST
    //////////////////////////////////////////////////////////

    const validatedData =
      RequestSchema.parse(
        body
      );

    //////////////////////////////////////////////////////////
    // NORMALIZE ZODIAC
    //////////////////////////////////////////////////////////

    const zodiacSign =
      normalizeZodiac(
        validatedData.zodiacSign
      );

    //////////////////////////////////////////////////////////
    // RESOLVE LANGUAGE
    //////////////////////////////////////////////////////////

    const language =
      resolveLanguage(
        validatedData.language
      );

    //////////////////////////////////////////////////////////
    // REQUEST DEBUG
    //////////////////////////////////////////////////////////

    console.log(
      "🔥 NATIONPATH PREDICTION REQUEST",
      {
        requestId,

        zodiacSign,

        horoscopeDate:
          validatedData
            .horoscopeDate
            .toISOString(),

        language,
      }
    );

    //////////////////////////////////////////////////////////
    // HOROSCOPE SERVICE
    //////////////////////////////////////////////////////////
    //
    // zodiacSign is explicitly passed.
    //
    // generateHoroscope()
    //        ↓
    // Astro Engine
    //        ↓
    // HoroscopeResult
    //
    //////////////////////////////////////////////////////////

    const horoscope =
      await generateHoroscope({

        horoscopeDate:
          validatedData
            .horoscopeDate,

        language,

        zodiacSign,

      });

    //////////////////////////////////////////////////////////
    // HOROSCOPE RESULT VALIDATION
    //////////////////////////////////////////////////////////

    if (!horoscope) {

      throw new Error(
        "Horoscope generation returned no result"
      );

    }

    //////////////////////////////////////////////////////////
    // PLANET SNAPSHOT
    //////////////////////////////////////////////////////////
    //
    // Keep the type assertion separate.
    //
    // This avoids parser issues with complex
    // multiline type assertions inside function calls.
    //
    //////////////////////////////////////////////////////////

    const predictionPlanets =
      horoscope.planets as unknown as Record<
        string,
        HoroscopePlanet
      >;

    //////////////////////////////////////////////////////////
    // PLANET SNAPSHOT VALIDATION
    //////////////////////////////////////////////////////////

    if (
      !predictionPlanets ||
      Object.keys(
        predictionPlanets
      ).length === 0
    ) {

      throw new Error(
        "Horoscope returned no planetary snapshot"
      );

    }

    //////////////////////////////////////////////////////////
    // HOROSCOPE SNAPSHOT DEBUG
    //////////////////////////////////////////////////////////

    console.log(
      "🔥 PREDICTION HOROSCOPE SNAPSHOT",
      {
        requestId,

        requestedZodiac:
          zodiacSign,

        horoscopeZodiac:
          zodiacSign,

        hasPlanets:
          Boolean(
            horoscope.planets
          ),

        planetsCount:
          Object.keys(
            predictionPlanets
          ).length,

        planets:
          predictionPlanets,
      }
    );

    //////////////////////////////////////////////////////////
    // PREDICTION ENGINE
    //////////////////////////////////////////////////////////
    //
    // IMPORTANT:
    //
    // predictHoroscope() now accepts:
    //
    // 1. planetary snapshot
    // 2. language
    // 3. zodiacSign
    //
    // The zodiacSign MUST be forwarded here.
    //
    // This allows the prediction engine's:
    //
    // - Language Context Routing
    // - Life Area Context
    // - Narrative Intelligence
    // - Ranking Intelligence
    //
    // to receive the same zodiac identity.
    //
    // NO calculation modification.
    // NO planetary modification.
    //
    //////////////////////////////////////////////////////////

    const prediction =
      predictHoroscope(
        predictionPlanets,
        language,
        zodiacSign
      );

    //////////////////////////////////////////////////////////
    // PREDICTION DEBUG
    //////////////////////////////////////////////////////////

    console.log(
      "🔥 PREDICTION ENGINE RESULT",
      {
        requestId,

        zodiac:
          zodiacSign,

        language,

        predictionConfidence:
          prediction
            .predictionConfidence,

        ranking:
          prediction
            .predictionRanking
            ?.map(
              (
                item
              ) => ({

                title:
                  item.title,

                category:
                  item.category,

                score:
                  item.score,

                confidence:
                  item.confidence,

                impact:
                  item.impact,

              })
            ),

        rankingCount:
          prediction
            .predictionRanking
            ?.length
            ?? 0,

        naturalSummary:
          prediction
            .naturalSummary,

        balance:
          prediction
            .predictionBalance,

        quality:
          prediction
            .quality,

        engineMetadata:
          prediction
            .engineMetadata,

      }
    );

    //////////////////////////////////////////////////////////
    // EXPERIENCE INTELLIGENCE
    //////////////////////////////////////////////////////////
    //
    // Experience is an optional presentation intelligence
    // layer built from the prediction result.
    //
    // Prediction engine remains the source of truth.
    //
    //////////////////////////////////////////////////////////

    let experience:
      ReturnType<
        typeof createFormattedExperience
      >
      | null =
      null;

    try {

      ////////////////////////////////////////////////////////
      // BUILD EXPERIENCE SECTIONS
      ////////////////////////////////////////////////////////

      const sections =
        buildExperienceSections(
          prediction
        );

      ////////////////////////////////////////////////////////
      // FORMAT EXPERIENCE
      ////////////////////////////////////////////////////////

      experience =
        createFormattedExperience(
          sections
        );

      ////////////////////////////////////////////////////////
      // EXPERIENCE DEBUG
      ////////////////////////////////////////////////////////

      console.log(
        "🔥 EXPERIENCE INTELLIGENCE RESULT",
        {
          requestId,

          zodiac:
            zodiacSign,

          hasExperience:
            Boolean(
              experience
            ),

          experienceKeys:
            experience &&
            typeof experience === "object"
              ? Object.keys(
                  experience
                )
              : [],

        }
      );

    }
    catch (
      experienceError
    ) {

      ////////////////////////////////////////////////////////
      // EXPERIENCE IS OPTIONAL
      ////////////////////////////////////////////////////////

      console.warn(
        "[EXPERIENCE_LAYER_FAILED]",
        {
          requestId,

          zodiac:
            zodiacSign,

          error:
            experienceError,

        }
      );

    }

    //////////////////////////////////////////////////////////
    // API RESPONSE
    //////////////////////////////////////////////////////////

    const response =
      astroSuccess(

        {
          ////////////////////////////////////////////////////
          // PREDICTION RESULT
          ////////////////////////////////////////////////////

          ...prediction,

          ////////////////////////////////////////////////////
          // EXPERIENCE RESULT
          ////////////////////////////////////////////////////

          experience,

          ////////////////////////////////////////////////////
          // API META
          ////////////////////////////////////////////////////

          meta: {

            apiVersion:
              "v2",

            engine:
              "nationpath-horoscope-intelligence",

            requestId,

            generatedAt:
              new Date()
                .toISOString(),

            processingTime:
              Date.now()
              -
              startedAt,

            modules: [
              "calculation",
              "prediction",
              "language",
              "experience",
            ],

            futureReady: {

              weekly:
                true,

              monthly:
                true,

              premiumReports:
                true,

              aiPersonalization:
                true,

            },

          },

        },

        //////////////////////////////////////////////////////
        // REQUEST META
        //////////////////////////////////////////////////////

        {

          zodiacSign,

          requestedDate:
            validatedData
              .horoscopeDate
              .toISOString(),

          language,

        }

      );

    //////////////////////////////////////////////////////////
    // CACHE CONTROL
    //////////////////////////////////////////////////////////

    response.headers.set(
      "Cache-Control",
      "no-store"
    );

    //////////////////////////////////////////////////////////
    // SUCCESS LOG
    //////////////////////////////////////////////////////////

    console.log(
      "✅ NATIONPATH PREDICTION API SUCCESS",
      {
        requestId,

        zodiac:
          zodiacSign,

        language,

        rankingCount:
          prediction
            .predictionRanking
            ?.length
            ?? 0,

        hasExperience:
          Boolean(
            experience
          ),

        predictionConfidence:
          prediction
            .predictionConfidence,

        qualityScore:
          prediction
            .quality
            ?.qualityScore,

        processingTime:
          Date.now()
          -
          startedAt,

      }
    );

    //////////////////////////////////////////////////////////
    // RETURN
    //////////////////////////////////////////////////////////

    return response;

  }

  ////////////////////////////////////////////////////////////
  // ERROR HANDLING
  ////////////////////////////////////////////////////////////

  catch (
    error
  ) {

    //////////////////////////////////////////////////////////
    // ERROR LOG
    //////////////////////////////////////////////////////////

    console.error(
      "[PREDICTION_API_ERROR]",
      {
        requestId,

        error,
      }
    );

    //////////////////////////////////////////////////////////
    // ZOD VALIDATION ERROR
    //////////////////////////////////////////////////////////

    if (
      error instanceof z.ZodError
    ) {

      return astroError(

        "VALIDATION_ERROR",

        "Validation Error",

        400,

        error.flatten()

      );

    }

    //////////////////////////////////////////////////////////
    // INTERNAL ERROR
    //////////////////////////////////////////////////////////

    return astroError(

      ASTRO_API_ERRORS
        .INTERNAL_ERROR
        .code,

      ASTRO_API_ERRORS
        .INTERNAL_ERROR
        .message,

      500,

      error instanceof Error
        ? error.message
        : "Prediction generation failed"

    );

  }

}