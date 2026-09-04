import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

//////////////////////////////////////////////////////////////
//
// NATIONPATH ANALYTICS
// ARTICLE / EDITORIAL / ASTRO EVENT COLLECTION API
//
// SOURCE OF TRUTH:
// - ArticleAnalyticsEvent
//
// ALSO:
// - VIEW → Article.views compatibility counter
// - VIEW / READ → CategoryAnalyticsEvent
//
// IMPORTANT:
// - No analytics calculations here
// - No UI logic here
// - Analytics failure must never break the frontend
//
//////////////////////////////////////////////////////////////

type AnalyticsEventBody = {
  eventType?: unknown;
  articleId?: unknown;
  userId?: unknown;
  sessionId?: unknown;
  path?: unknown;
  source?: unknown;
  referrer?: unknown;
  metadata?: unknown;
};

const ALLOWED_EVENT_TYPES = new Set([
  "view",
  "read",
  "like",
  "reaction",
  "share",
  "video_play",
  "video_complete",
]);

//////////////////////////////////////////////////////////////
// STRING HELPERS
//////////////////////////////////////////////////////////////

function isNonEmptyString(
  value: unknown
): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
}

function cleanOptionalString(
  value: unknown
): string | undefined {
  if (!isNonEmptyString(value)) {
    return undefined;
  }

  return value.trim();
}

//////////////////////////////////////////////////////////////
// HEADER HELPERS
//////////////////////////////////////////////////////////////

function getHeaderValue(
  request: NextRequest,
  names: string[]
): string | undefined {
  for (const name of names) {
    const value = request.headers.get(name);

    if (isNonEmptyString(value)) {
      return value.trim();
    }
  }

  return undefined;
}

function getOptionalFloat(
  request: NextRequest,
  names: string[]
): number | undefined {
  const value = getHeaderValue(
    request,
    names
  );

  if (!value) {
    return undefined;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return undefined;
  }

  return parsed;
}

//////////////////////////////////////////////////////////////
// LOCATION
//////////////////////////////////////////////////////////////

function getAnalyticsLocation(
  request: NextRequest
) {
  const country = getHeaderValue(
    request,
    [
      "x-vercel-ip-country",
      "cf-ipcountry",
      "x-country",
    ]
  );

  const countryCode = country
    ? country.toUpperCase()
    : undefined;

  const state = getHeaderValue(
    request,
    [
      "x-vercel-ip-country-region",
      "x-country-region",
      "x-region",
    ]
  );

  const city = getHeaderValue(
    request,
    [
      "x-vercel-ip-city",
      "x-city",
    ]
  );

  const region = getHeaderValue(
    request,
    [
      "x-vercel-ip-country-region",
      "x-region",
    ]
  );

  const latitude = getOptionalFloat(
    request,
    [
      "x-vercel-ip-latitude",
      "x-latitude",
    ]
  );

  const longitude = getOptionalFloat(
    request,
    [
      "x-vercel-ip-longitude",
      "x-longitude",
    ]
  );

  const timezone = getHeaderValue(
    request,
    [
      "x-vercel-ip-timezone",
      "x-timezone",
    ]
  );

  return {
    country,
    countryCode,
    state,
    city,
    region,
    latitude,
    longitude,
    timezone,
  };
}

//////////////////////////////////////////////////////////////
// METADATA
//////////////////////////////////////////////////////////////

function parseMetadata(
  value: unknown
):
  | Prisma.InputJsonValue
  | undefined {
  if (
    value === undefined ||
    value === null
  ) {
    return undefined;
  }

  if (
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    throw new Error(
      "metadata must be an object"
    );
  }

  return value as Prisma.InputJsonValue;
}

//////////////////////////////////////////////////////////////
// REQUEST INFORMATION
//////////////////////////////////////////////////////////////

function getRequestInformation(
  request: NextRequest
) {
  const userAgent =
    request.headers.get(
      "user-agent"
    ) || undefined;

  const forwardedFor =
    request.headers.get(
      "x-forwarded-for"
    );

  const ip =
    forwardedFor
      ?.split(",")[0]
      ?.trim() ||
    request.headers.get(
      "x-real-ip"
    ) ||
    undefined;

  return {
    userAgent,
    ip,
  };
}

//////////////////////////////////////////////////////////////
// POST
//////////////////////////////////////////////////////////////

export async function POST(
  request: NextRequest
) {
  try {
    //////////////////////////////////////////////////////////
    // PARSE BODY
    //////////////////////////////////////////////////////////

    let body: AnalyticsEventBody;

    try {
      body =
        (await request.json()) as AnalyticsEventBody;
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON body",
        },
        {
          status: 400,
        }
      );
    }

    //////////////////////////////////////////////////////////
    // EVENT TYPE
    //////////////////////////////////////////////////////////

    const eventType =
      typeof body.eventType === "string"
        ? body.eventType
            .trim()
            .toLowerCase()
        : "";

    if (!eventType) {
      return NextResponse.json(
        {
          success: false,
          error: "eventType is required",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !ALLOWED_EVENT_TYPES.has(
        eventType
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Unsupported analytics event",
        },
        {
          status: 400,
        }
      );
    }

    //////////////////////////////////////////////////////////
    // ARTICLE
    //////////////////////////////////////////////////////////

    const articleId =
      cleanOptionalString(
        body.articleId
      );

    if (!articleId) {
      return NextResponse.json(
        {
          success: false,
          error:
            "articleId is required",
        },
        {
          status: 400,
        }
      );
    }

    const article =
      await prisma.article.findFirst({
        where: {
          id: articleId,
          isDeleted: false,
        },

        select: {
          id: true,
          categoryId: true,
        },
      });

    if (!article) {
      return NextResponse.json(
        {
          success: false,
          error: "Article not found",
        },
        {
          status: 404,
        }
      );
    }

    //////////////////////////////////////////////////////////
    // REQUEST DATA
    //////////////////////////////////////////////////////////

    const userId =
      cleanOptionalString(
        body.userId
      );

    const sessionId =
      cleanOptionalString(
        body.sessionId
      );

    const path =
      cleanOptionalString(
        body.path
      );

    const source =
      cleanOptionalString(
        body.source
      );

    const referrer =
      cleanOptionalString(
        body.referrer
      );

    //////////////////////////////////////////////////////////
    // METADATA
    //////////////////////////////////////////////////////////

    let metadata:
      | Prisma.InputJsonValue
      | undefined;

    try {
      metadata =
        parseMetadata(
          body.metadata
        );
    } catch {
      return NextResponse.json(
        {
          success: false,
          error:
            "metadata must be an object",
        },
        {
          status: 400,
        }
      );
    }

    //////////////////////////////////////////////////////////
    // REQUEST INFORMATION
    //////////////////////////////////////////////////////////

    const requestInformation =
      getRequestInformation(
        request
      );

    //////////////////////////////////////////////////////////
    // LOCATION
    //////////////////////////////////////////////////////////

    const location =
      getAnalyticsLocation(
        request
      );

    //////////////////////////////////////////////////////////
    // CREATE ARTICLE EVENT
    //////////////////////////////////////////////////////////

    const event =
      await prisma.articleAnalyticsEvent.create(
        {
          data: {
            articleId,

            eventType,

            userId,
            sessionId,

            path,
            source,
            referrer,

            userAgent:
              requestInformation.userAgent,

            ip:
              requestInformation.ip,

            country:
              location.country,

            countryCode:
              location.countryCode,

            state:
              location.state,

            city:
              location.city,

            region:
              location.region,

            latitude:
              location.latitude,

            longitude:
              location.longitude,

            timezone:
              location.timezone,

            metadata,
          },

          select: {
            id: true,
            articleId: true,
            eventType: true,

            country: true,
            countryCode: true,
            state: true,
            city: true,
            region: true,

            latitude: true,
            longitude: true,

            timezone: true,

            createdAt: true,
          },
        }
      );

    //////////////////////////////////////////////////////////
    // CATEGORY ANALYTICS
    //
    // Article VIEW / READ automatically contributes
    // to the article's category analytics.
    //
    //////////////////////////////////////////////////////////

    if (
      article.categoryId &&
      (
        eventType === "view" ||
        eventType === "read"
      )
    ) {
      await prisma.categoryAnalyticsEvent.create(
        {
          data: {
            categoryId:
              article.categoryId,

            eventType,

            userId,
            sessionId,

            path,
            source,
            referrer,

            userAgent:
              requestInformation.userAgent,

            ip:
              requestInformation.ip,

            country:
              location.country,

            countryCode:
              location.countryCode,

            state:
              location.state,

            city:
              location.city,

            region:
              location.region,

            latitude:
              location.latitude,

            longitude:
              location.longitude,

            timezone:
              location.timezone,

            metadata,
          },
        }
      );
    }

    //////////////////////////////////////////////////////////
    // ARTICLE COMPATIBILITY COUNTER
    //
    // Analytics dashboard does NOT use Article.views.
    //
    // Only VIEW increments the legacy/public counter.
    //
    //////////////////////////////////////////////////////////

    if (eventType === "view") {
      await prisma.article.update({
        where: {
          id: articleId,
        },

        data: {
          views: {
            increment: 1,
          },

          lastViewAt:
            new Date(),

          trendingScore: {
            increment: 1,
          },
        },
      });
    }

    //////////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////////

    return NextResponse.json(
      {
        success: true,
        event,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "[Analytics] Event collection failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to record analytics event",
      },
      {
        status: 500,
      }
    );
  }
}