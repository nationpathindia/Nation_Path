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

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function cleanOptionalString(value: unknown): string | undefined {
  if (!isNonEmptyString(value)) {
    return undefined;
  }
  return value.trim();
}

//////////////////////////////////////////////////////////////
// HEADER HELPERS
//////////////////////////////////////////////////////////////

function getHeaderValue(request: NextRequest, names: string[]): string | undefined {
  for (const name of names) {
    const value = request.headers.get(name);
    if (isNonEmptyString(value)) {
      return value.trim();
    }
  }
  return undefined;
}

function getOptionalFloat(request: NextRequest, names: string[]): number | undefined {
  const value = getHeaderValue(request, names);
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

function getAnalyticsLocation(request: NextRequest) {
  const country = getHeaderValue(request, ["x-vercel-ip-country", "cf-ipcountry", "x-country"]);
  const countryCode = country ? country.toUpperCase() : undefined;
  const state = getHeaderValue(request, ["x-vercel-ip-country-region", "x-country-region", "x-region"]);
  const city = getHeaderValue(request, ["x-vercel-ip-city", "x-city"]);
  const region = getHeaderValue(request, ["x-vercel-ip-country-region", "x-region"]);
  const latitude = getOptionalFloat(request, ["x-vercel-ip-latitude", "x-latitude"]);
  const longitude = getOptionalFloat(request, ["x-vercel-ip-longitude", "x-longitude"]);
  const timezone = getHeaderValue(request, ["x-vercel-ip-timezone", "x-timezone"]);

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

function parseMetadata(value: unknown): Record<string, Prisma.InputJsonValue> | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (typeof value !== "object" || Array.isArray(value)) {
    throw new Error("metadata must be an object");
  }
  return value as Record<string, Prisma.InputJsonValue>;
}

//////////////////////////////////////////////////////////////
// REQUEST INFORMATION
//////////////////////////////////////////////////////////////

function getRequestInformation(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || undefined;
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || undefined;

  return { userAgent, ip };
}

//////////////////////////////////////////////////////////////
// AUDIENCE DETECTION
//////////////////////////////////////////////////////////////

function detectDevice(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (/ipad|tablet|playbook|silk/.test(ua) || (/android/.test(ua) && !/mobile/.test(ua))) {
    return "Tablet";
  }
  if (/mobi|iphone|ipod|android|blackberry|iemobile|opera mini|windows phone/.test(ua)) {
    return "Mobile";
  }
  return "Desktop";
}

function detectBrowser(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (/edg\//.test(ua)) return "Edge";
  if (/opr\//.test(ua)) return "Opera";
  if (/samsungbrowser\//.test(ua)) return "Samsung Internet";
  if (/chrome\//.test(ua) && !/edg\//.test(ua) && !/opr\//.test(ua)) return "Chrome";
  if (/firefox\//.test(ua)) return "Firefox";
  if (/safari\//.test(ua) && !/chrome\//.test(ua) && !/android/.test(ua)) return "Safari";
  if (/msie|trident\//.test(ua)) return "Internet Explorer";
  return "Other";
}

function detectOperatingSystem(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (/windows nt/.test(ua)) return "Windows";
  if (/iphone|ipad|ipod/.test(ua)) return "iOS";
  if (/android/.test(ua)) return "Android";
  if (/macintosh|mac os x/.test(ua)) return "macOS";
  if (/cros/.test(ua)) return "ChromeOS";
  if (/linux/.test(ua)) return "Linux";
  return "Other";
}

//////////////////////////////////////////////////////////////
// BUILD ANALYTICS METADATA
//////////////////////////////////////////////////////////////

function buildAnalyticsMetadata(
  metadata: Record<string, Prisma.InputJsonValue> | undefined,
  userAgent?: string
): Prisma.InputJsonValue | undefined {
  const baseMetadata = metadata ?? {};
  if (!userAgent) {
    return Object.keys(baseMetadata).length > 0 ? (baseMetadata as Prisma.InputJsonValue) : undefined;
  }

  return {
    ...baseMetadata,
    device: detectDevice(userAgent),
    browser: detectBrowser(userAgent),
    os: detectOperatingSystem(userAgent),
  } as Prisma.InputJsonValue;
}

//////////////////////////////////////////////////////////////
// POST
//////////////////////////////////////////////////////////////

export async function POST(request: NextRequest) {
  console.log("ANALYTICS EVENT ROUTE HIT");

  try {
    let body: AnalyticsEventBody;
    try {
      body = (await request.json()) as AnalyticsEventBody;
    } catch {
      return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
    }

    const eventType = typeof body.eventType === "string" ? body.eventType.trim().toLowerCase() : "";
    if (!eventType) {
      return NextResponse.json({ success: false, error: "eventType is required" }, { status: 400 });
    }
    if (!ALLOWED_EVENT_TYPES.has(eventType)) {
      return NextResponse.json({ success: false, error: "Unsupported analytics event" }, { status: 400 });
    }

    const articleId = cleanOptionalString(body.articleId);
    if (!articleId) {
      return NextResponse.json({ success: false, error: "articleId is required" }, { status: 400 });
    }

    const article = await prisma.article.findFirst({
      where: { id: articleId, isDeleted: false },
      select: { id: true, categoryId: true },
    });

    if (!article) {
      return NextResponse.json({ success: false, error: "Article not found" }, { status: 404 });
    }

    const userId = cleanOptionalString(body.userId);
    const sessionId = cleanOptionalString(body.sessionId);
    const path = cleanOptionalString(body.path);
    const source = cleanOptionalString(body.source);
    const referrer = cleanOptionalString(body.referrer);

    const requestInformation = getRequestInformation(request);
    
    // ✅ FIX: Yahan location variable ko properly declare kiya gaya hai
    const location = getAnalyticsLocation(request);

    let clientMetadata: Record<string, Prisma.InputJsonValue> | undefined;
    try {
      clientMetadata = parseMetadata(body.metadata);
    } catch {
      return NextResponse.json({ success: false, error: "metadata must be an object" }, { status: 400 });
    }

    const metadata = buildAnalyticsMetadata(clientMetadata, requestInformation.userAgent);

    console.log("==================================================");
    console.log("ANALYTICS AUDIENCE METADATA RESULT");
    console.log("==================================================");
    console.log({
      device: metadata && typeof metadata === "object" ? (metadata as Record<string, unknown>).device : undefined,
      browser: metadata && typeof metadata === "object" ? (metadata as Record<string, unknown>).browser : undefined,
      os: metadata && typeof metadata === "object" ? (metadata as Record<string, unknown>).os : undefined,
      userAgent: requestInformation.userAgent,
    });

    //////////////////////////////////////////////////////////
    // CREATE ARTICLE EVENT
    //////////////////////////////////////////////////////////

    const event = await prisma.articleAnalyticsEvent.create({
      data: {
        articleId,
        eventType,
        userId,
        sessionId,
        path,
        source,
        referrer,
        userAgent: requestInformation.userAgent,
        ip: requestInformation.ip,
        
        // ✅ Clean & Type-Safe Location Data
        country: location.country,
        countryCode: location.countryCode,
        state: location.state,
        city: location.city,
        region: location.region,
        latitude: location.latitude,
        longitude: location.longitude,
        timezone: location.timezone,
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
        metadata: true,
      },
    });

    //////////////////////////////////////////////////////////
    // CATEGORY ANALYTICS
    //////////////////////////////////////////////////////////

    if (article.categoryId && (eventType === "view" || eventType === "read")) {
      await prisma.categoryAnalyticsEvent.create({
        data: {
          categoryId: article.categoryId,
          eventType,
          userId,
          sessionId,
          path,
          source,
          referrer,
          userAgent: requestInformation.userAgent,
          ip: requestInformation.ip,
          
          // ✅ Clean & Type-Safe Location Data
          country: location.country,
          countryCode: location.countryCode,
          state: location.state,
          city: location.city,
          region: location.region,
          latitude: location.latitude,
          longitude: location.longitude,
          timezone: location.timezone,
          metadata,
        },
      });
    }

    //////////////////////////////////////////////////////////
    // ARTICLE VIEW METADATA
    //////////////////////////////////////////////////////////

    if (eventType === "view") {
      await prisma.article.update({
        where: { id: articleId },
        data: {
          lastViewAt: new Date(),
          trendingScore: { increment: 1 },
        },
      });
    }

    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch (error) {
    console.error("[Analytics] Event collection failed:", error);
    return NextResponse.json({ success: false, error: "Unable to record analytics event" }, { status: 500 });
  }
}