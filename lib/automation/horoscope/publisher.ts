//////////////////////////////////////////////////////////////
//
// NATIONPATH HOROSCOPE PUBLISHER
//
// CMS Publishing Layer
//
// Responsibility:
//
// Mapped Horoscope CMS Data
//          ↓
// IST Date Normalization
//          ↓
// Mongo Horoscope Collection
//          ↓
// Published Content
//
// Does NOT:
// - Generate content
// - Calculate astrology
// - Call AI
//
// Only CMS persistence + publish lifecycle.
//
//////////////////////////////////////////////////////////////

import Horoscope from "@/app/models/Horoscope";

import {
  connectMongoDB,
} from "@/lib/mongodb";

//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

type HoroscopePublishPayload = {
  zodiac: string;

  slug: string;

  meta?: {
    period?: string;
    language?: string;
    status?: string;

    startDate?: Date | string;
    endDate?: Date | string;

    slugDate?: string;

    publishedAt?: Date | string;
    scheduledAt?: Date | string;
    archivedAt?: Date | string;

    version?: string;
    contentVersion?: number;
    priority?: number;

    featured?: Record<string, boolean>;
    visibility?: Record<string, boolean>;
  };

  [key: string]: any;
};

//////////////////////////////////////////////////////////////
// DATE NORMALIZER
//////////////////////////////////////////////////////////////

function normalizeDate(
  value: Date | string | undefined,
  fallback = new Date()
): Date {

  if (value instanceof Date) {

    if (!Number.isNaN(value.getTime())) {
      return value;
    }

    return fallback;
  }

  if (typeof value === "string") {

    const parsed =
      new Date(value);

    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  return fallback;
}

//////////////////////////////////////////////////////////////
// INDIA DATE RANGE
//
// Horoscope business date:
// Asia/Kolkata (IST)
//
// MongoDB stores UTC automatically.
//
//////////////////////////////////////////////////////////////

function getIndianDayRange(
  date: Date = new Date()
) {

  const formatter =
    new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
    );

  const parts =
    formatter.formatToParts(date);

  const year =
    parts.find(
      p => p.type === "year"
    )?.value;

  const month =
    parts.find(
      p => p.type === "month"
    )?.value;

  const day =
    parts.find(
      p => p.type === "day"
    )?.value;

  if (
    !year ||
    !month ||
    !day
  ) {
    throw new Error(
      "Unable to resolve Indian business date"
    );
  }

  const start =
    new Date(
      `${year}-${month}-${day}T00:00:00+05:30`
    );

  const end =
    new Date(
      `${year}-${month}-${day}T23:59:59.999+05:30`
    );

  return {
    start,
    end,
  };
}

//////////////////////////////////////////////////////////////
// IST SLUG DATE
//
// Example:
// 2026-08-27
//
//////////////////////////////////////////////////////////////

function getIndianSlugDate(
  date: Date = new Date()
): string {

  const formatter =
    new Intl.DateTimeFormat(
      "en-CA",
      {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
    );

  return formatter.format(date);
}

//////////////////////////////////////////////////////////////
// PUBLISH HOROSCOPE
//////////////////////////////////////////////////////////////

export async function publishHoroscope(
  payload: HoroscopePublishPayload
) {

  try {

    //////////////////////////////////////////////////////////
    // DATABASE
    //////////////////////////////////////////////////////////

    await connectMongoDB();

    //////////////////////////////////////////////////////////
    // PUBLISH TIMESTAMP
    //
    // This is the actual time the document is published.
    //////////////////////////////////////////////////////////

    const publishedAt =
      new Date();

    //////////////////////////////////////////////////////////
    // BUSINESS DATE
    //
    // IMPORTANT:
    //
    // Use payload.meta.startDate when provided.
    //
    // DO NOT blindly use new Date().
    //
    //////////////////////////////////////////////////////////

    const businessDate =
      normalizeDate(
        payload?.meta?.startDate,
        publishedAt
      );

    //////////////////////////////////////////////////////////
    // IST DAY RANGE
    //////////////////////////////////////////////////////////

    const {
      start,
      end,
    } =
      getIndianDayRange(
        businessDate
      );

    //////////////////////////////////////////////////////////
    // IST SLUG DATE
    //////////////////////////////////////////////////////////

    const slugDate =
      getIndianSlugDate(
        businessDate
      );

    //////////////////////////////////////////////////////////
    // NORMALIZE META
    //////////////////////////////////////////////////////////

    const meta = {

      ...(payload?.meta || {}),

      status:
        "published",

      startDate:
        start,

      endDate:
        end,

      slugDate,

      publishedAt,

      scheduledAt:
        payload?.meta?.scheduledAt
          ? normalizeDate(
              payload.meta.scheduledAt
            )
          : publishedAt,

    };

    //////////////////////////////////////////////////////////
    // CLEAN PAYLOAD
    //////////////////////////////////////////////////////////

    const {
      createdBy,
      updatedBy,
      meta: _payloadMeta,

      ...content
    } =
      payload;

    //////////////////////////////////////////////////////////
    // FINAL CMS DOCUMENT
    //////////////////////////////////////////////////////////

    const cmsDocument = {

      ...content,

      meta,

      updatedBy:
        "nationpath-ai",

    };

    //////////////////////////////////////////////////////////
    // PUBLISH KEY
    //
    // Same zodiac + slug + IST business date
    // resolves the existing published document.
    //
    //////////////////////////////////////////////////////////

    const query = {

      zodiac:
        payload.zodiac,

      slug:
        payload.slug,

      "meta.slugDate":
        slugDate,

    };

    //////////////////////////////////////////////////////////
    // UPSERT
    //////////////////////////////////////////////////////////

    const horoscope =
      await Horoscope.findOneAndUpdate(

        query,

        {

          $set:
            cmsDocument,

          $setOnInsert: {

            createdBy:
              "nationpath-ai",

          },

        },

        {

          upsert: true,

          new: true,

          setDefaultsOnInsert: true,

        }

      );

    //////////////////////////////////////////////////////////
    // SAFETY CHECK
    //////////////////////////////////////////////////////////

    if (!horoscope) {

      throw new Error(
        "Horoscope publish failed: document was not created"
      );

    }

    //////////////////////////////////////////////////////////
    // LOG
    //////////////////////////////////////////////////////////

    console.log(
      "HOROSCOPE IST PUBLISH WINDOW",
      {
        businessDate,

        start,

        end,

        slugDate,

        publishedAt,
      }
    );

    console.log(
      "HOROSCOPE PUBLISHED",
      {

        zodiac:
          horoscope.zodiac,

        slug:
          horoscope.slug,

        period:
          horoscope.meta?.period,

        language:
          horoscope.meta?.language,

        status:
          horoscope.meta?.status,

        startDate:
          horoscope.meta?.startDate,

        endDate:
          horoscope.meta?.endDate,

        slugDate:
          horoscope.meta?.slugDate,

        publishedAt:
          horoscope.meta?.publishedAt,

        nameInitials:
          (horoscope as any)
            ?.nameInitials,

        nameInitialsCount:
          Array.isArray(
            (horoscope as any)
              ?.nameInitials
          )
            ? (
                horoscope as any
              )
                .nameInitials
                .length
            : 0,

      }
    );

    //////////////////////////////////////////////////////////
    // RETURN
    //////////////////////////////////////////////////////////

    return horoscope;

  }

  catch(error) {

    console.error(
      "[HOROSCOPE_PUBLISH_ERROR]",
      error
    );

    throw error;

  }

}

//////////////////////////////////////////////////////////////
// DEFAULT EXPORT
//////////////////////////////////////////////////////////////

export default {

  publishHoroscope,

};