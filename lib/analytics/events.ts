//////////////////////////////////////////////////////////////
// NATIONPATH ANALYTICS
// EVENT ENGINE
//
// Purpose:
// - Common analytics event utilities
// - Centralized time-window handling
// - Event filtering
// - Event aggregation helpers
// - Shared by News / Editorial / Astro
// - Shared analytics location utilities
//
// IMPORTANT:
// - No UI logic
// - No API route logic
// - Does not replace existing Article/Category data
// - Does not modify the canonical users collection
// - Location fields are optional
//////////////////////////////////////////////////////////////

import {
  PrismaClient,
  Prisma,
} from "@prisma/client";

import type {
  AnalyticsDomain,
  AnalyticsEventCounts,
  AnalyticsEventType,
  AnalyticsTimeRange,
} from "./types";

//////////////////////////////////////////////////////////////
// DEFAULTS
//////////////////////////////////////////////////////////////

const DEFAULT_TIME_RANGE: AnalyticsTimeRange = "24h";

const DEFAULT_LIMIT = 10;

const MAX_LIMIT = 100;

//////////////////////////////////////////////////////////////
// TIME RANGE
//////////////////////////////////////////////////////////////

/**
 * Convert an analytics time range into a starting Date.
 *
 * "all" returns undefined, meaning no lower time boundary.
 */
export function getAnalyticsStartDate(
  timeRange: AnalyticsTimeRange = DEFAULT_TIME_RANGE
): Date | undefined {
  const now = Date.now();

  switch (timeRange) {
    case "1h":
      return new Date(now - 60 * 60 * 1000);

    case "6h":
      return new Date(now - 6 * 60 * 60 * 1000);

    case "24h":
      return new Date(now - 24 * 60 * 60 * 1000);

    case "7d":
      return new Date(now - 7 * 24 * 60 * 60 * 1000);

    case "30d":
      return new Date(now - 30 * 24 * 60 * 60 * 1000);

    case "90d":
      return new Date(now - 90 * 24 * 60 * 60 * 1000);

    case "all":
      return undefined;

    default:
      return new Date(
        now - 24 * 60 * 60 * 1000
      );
  }
}

//////////////////////////////////////////////////////////////
// END DATE
//////////////////////////////////////////////////////////////

/**
 * Analytics calculations normally run until "now".
 */
export function getAnalyticsEndDate(): Date {
  return new Date();
}

//////////////////////////////////////////////////////////////
// LIMIT
//////////////////////////////////////////////////////////////

/**
 * Keep analytics queries bounded.
 *
 * This prevents accidental huge queries from dashboards
 * or API consumers.
 */
export function normalizeAnalyticsLimit(
  limit?: number
): number {
  if (
    typeof limit !== "number" ||
    !Number.isFinite(limit)
  ) {
    return DEFAULT_LIMIT;
  }

  const normalized = Math.floor(limit);

  if (normalized < 1) {
    return 1;
  }

  return Math.min(normalized, MAX_LIMIT);
}

//////////////////////////////////////////////////////////////
// EVENT TYPES
//////////////////////////////////////////////////////////////

/**
 * Canonical event types.
 */
export const ANALYTICS_EVENT_TYPES: readonly AnalyticsEventType[] =
  [
    "view",
    "open",
    "read",
    "scroll",
    "like",
    "reaction",
    "share",
    "video_play",
    "video_complete",
  ] as const;

//////////////////////////////////////////////////////////////
// EVENT WEIGHTS
//////////////////////////////////////////////////////////////

/**
 * Engagement weights.
 *
 * These are deliberately centralized so the scoring model
 * can be changed later without touching components or APIs.
 */
export const ANALYTICS_EVENT_WEIGHTS: Record<
  AnalyticsEventType,
  number
> = {
  view: 1,
  open: 2,
  read: 4,
  scroll: 2,
  like: 5,
  reaction: 5,
  share: 8,
  video_play: 3,
  video_complete: 6,
};

//////////////////////////////////////////////////////////////
// EVENT VALIDATION
//////////////////////////////////////////////////////////////

export function isAnalyticsEventType(
  value: unknown
): value is AnalyticsEventType {
  return (
    typeof value === "string" &&
    (
      ANALYTICS_EVENT_TYPES as readonly string[]
    ).includes(value)
  );
}

//////////////////////////////////////////////////////////////
// DOMAIN VALIDATION
//////////////////////////////////////////////////////////////

export function isAnalyticsDomain(
  value: unknown
): value is AnalyticsDomain {
  return (
    value === "news" ||
    value === "editorial" ||
    value === "astro"
  );
}

//////////////////////////////////////////////////////////////
// EVENT SCORE
//////////////////////////////////////////////////////////////

/**
 * Return the base engagement weight for an event.
 */
export function getEventWeight(
  eventType: AnalyticsEventType
): number {
  return ANALYTICS_EVENT_WEIGHTS[eventType] ?? 0;
}

//////////////////////////////////////////////////////////////
// EVENT COUNT INITIALIZER
//////////////////////////////////////////////////////////////

export function createEmptyEventCounts(): AnalyticsEventCounts {
  return {
    views: 0,
    opens: 0,
    reads: 0,
    scrolls: 0,
    likes: 0,
    reactions: 0,
    shares: 0,
    videoPlays: 0,
    videoCompletes: 0,
  };
}

//////////////////////////////////////////////////////////////
// EVENT COUNT ACCUMULATOR
//////////////////////////////////////////////////////////////

/**
 * Add one analytics event to a count object.
 */
export function addEventToCounts(
  counts: AnalyticsEventCounts,
  eventType: AnalyticsEventType
): AnalyticsEventCounts {
  switch (eventType) {
    case "view":
      counts.views += 1;
      break;

    case "open":
      counts.opens += 1;
      break;

    case "read":
      counts.reads += 1;
      break;

    case "scroll":
      counts.scrolls += 1;
      break;

    case "like":
      counts.likes += 1;
      break;

    case "reaction":
      counts.reactions += 1;
      break;

    case "share":
      counts.shares += 1;
      break;

    case "video_play":
      counts.videoPlays += 1;
      break;

    case "video_complete":
      counts.videoCompletes += 1;
      break;
  }

  return counts;
}

//////////////////////////////////////////////////////////////
// ENGAGEMENT SCORE
//////////////////////////////////////////////////////////////

/**
 * Calculate engagement score from event counts.
 *
 * This is the base score only.
 * Trending will later add recency/momentum.
 */
export function calculateEngagementScore(
  counts: AnalyticsEventCounts
): number {
  return (
    counts.views *
      ANALYTICS_EVENT_WEIGHTS.view +
    counts.opens *
      ANALYTICS_EVENT_WEIGHTS.open +
    counts.reads *
      ANALYTICS_EVENT_WEIGHTS.read +
    counts.scrolls *
      ANALYTICS_EVENT_WEIGHTS.scroll +
    counts.likes *
      ANALYTICS_EVENT_WEIGHTS.like +
    counts.reactions *
      ANALYTICS_EVENT_WEIGHTS.reaction +
    counts.shares *
      ANALYTICS_EVENT_WEIGHTS.share +
    counts.videoPlays *
      ANALYTICS_EVENT_WEIGHTS.video_play +
    counts.videoCompletes *
      ANALYTICS_EVENT_WEIGHTS.video_complete
  );
}

//////////////////////////////////////////////////////////////
// RECENCY SCORE
//////////////////////////////////////////////////////////////

/**
 * Calculate a simple recency multiplier.
 *
 * Newer activity gets more weight.
 *
 * This is intentionally bounded so a very recent article
 * cannot produce an unlimited score.
 */
export function calculateRecencyMultiplier(
  lastActivityAt?: Date | null
): number {
  if (!lastActivityAt) {
    return 0;
  }

  const ageMs =
    Date.now() -
    lastActivityAt.getTime();

  if (ageMs <= 0) {
    return 1;
  }

  const ageHours =
    ageMs / (60 * 60 * 1000);

  if (ageHours <= 1) {
    return 1;
  }

  if (ageHours <= 6) {
    return 0.9;
  }

  if (ageHours <= 12) {
    return 0.8;
  }

  if (ageHours <= 24) {
    return 0.7;
  }

  if (ageHours <= 48) {
    return 0.5;
  }

  if (ageHours <= 72) {
    return 0.35;
  }

  if (ageHours <= 168) {
    return 0.2;
  }

  return 0.1;
}

//////////////////////////////////////////////////////////////
// TRENDING SCORE
//////////////////////////////////////////////////////////////

export function calculateTrendingScore(
  counts: AnalyticsEventCounts,
  lastActivityAt?: Date | null
): number {
  const engagementScore =
    calculateEngagementScore(counts);

  const recencyMultiplier =
    calculateRecencyMultiplier(
      lastActivityAt
    );

  return Math.round(
    engagementScore *
      recencyMultiplier
  );
}

//////////////////////////////////////////////////////////////
// PRISMA TIME FILTER
//////////////////////////////////////////////////////////////

export function buildCreatedAtFilter(
  timeRange: AnalyticsTimeRange = DEFAULT_TIME_RANGE
): Prisma.DateTimeFilter | undefined {
  const startDate =
    getAnalyticsStartDate(timeRange);

  if (!startDate) {
    return undefined;
  }

  return {
    gte: startDate,
    lte: getAnalyticsEndDate(),
  };
}

//////////////////////////////////////////////////////////////
// ANALYTICS LOCATION
//////////////////////////////////////////////////////////////

/**
 * Optional visitor location information.
 *
 * These fields are resolved during analytics event
 * ingestion whenever location information is available.
 *
 * All fields are optional so analytics continues to work
 * for visitors whose location cannot be resolved.
 */
export interface AnalyticsLocation {
  country?: string | null;
  countryCode?: string | null;

  state?: string | null;
  city?: string | null;
  region?: string | null;

  latitude?: number | null;
  longitude?: number | null;

  timezone?: string | null;
}

/**
 * Normalize visitor location before it is passed to
 * analytics persistence or aggregation logic.
 *
 * This does not perform IP geolocation.
 * It only sanitizes already-resolved location data.
 */
export function normalizeAnalyticsLocation(
  location?: AnalyticsLocation | null
): AnalyticsLocation {
  if (!location) {
    return {};
  }

  return {
    country:
      typeof location.country === "string"
        ? location.country.trim() || null
        : null,

    countryCode:
      typeof location.countryCode === "string"
        ? location.countryCode.trim().toUpperCase() || null
        : null,

    state:
      typeof location.state === "string"
        ? location.state.trim() || null
        : null,

    city:
      typeof location.city === "string"
        ? location.city.trim() || null
        : null,

    region:
      typeof location.region === "string"
        ? location.region.trim() || null
        : null,

    latitude:
      typeof location.latitude === "number" &&
      Number.isFinite(location.latitude)
        ? location.latitude
        : null,

    longitude:
      typeof location.longitude === "number" &&
      Number.isFinite(location.longitude)
        ? location.longitude
        : null,

    timezone:
      typeof location.timezone === "string"
        ? location.timezone.trim() || null
        : null,
  };
}

//////////////////////////////////////////////////////////////
// COMMON EVENT WHERE
//////////////////////////////////////////////////////////////

export interface AnalyticsEventFilter {
  articleId?: string;

  categoryId?: string;

  eventTypes?: AnalyticsEventType[];

  timeRange?: AnalyticsTimeRange;

  ////////////////////////////////////////////////////////////
  // LOCATION FILTERS
  ////////////////////////////////////////////////////////////

  country?: string;

  countryCode?: string;

  state?: string;

  city?: string;

  region?: string;

  timezone?: string;
}

/**
 * Build a Prisma-compatible ArticleAnalyticsEvent filter.
 *
 * This helper is intentionally generic and is primarily
 * used by article analytics queries.
 *
 * Category-specific queries should map the same filter
 * values to CategoryAnalyticsEventWhereInput when needed.
 */
export function buildAnalyticsEventWhere(
  filter: AnalyticsEventFilter
): Prisma.ArticleAnalyticsEventWhereInput {
  const where: Prisma.ArticleAnalyticsEventWhereInput = {};

  ////////////////////////////////////////////////////////////
  // ARTICLE
  ////////////////////////////////////////////////////////////

  if (filter.articleId) {
    where.articleId = filter.articleId;
  }

  ////////////////////////////////////////////////////////////
  // EVENT TYPE
  ////////////////////////////////////////////////////////////

  if (filter.eventTypes?.length) {
    where.eventType = {
      in: filter.eventTypes,
    };
  }

  ////////////////////////////////////////////////////////////
  // LOCATION
  ////////////////////////////////////////////////////////////

  if (filter.country) {
    where.country = filter.country;
  }

  if (filter.countryCode) {
    where.countryCode =
      filter.countryCode.toUpperCase();
  }

  if (filter.state) {
    where.state = filter.state;
  }

  if (filter.city) {
    where.city = filter.city;
  }

  if (filter.region) {
    where.region = filter.region;
  }

  if (filter.timezone) {
    where.timezone = filter.timezone;
  }

  ////////////////////////////////////////////////////////////
  // TIME
  ////////////////////////////////////////////////////////////

  const createdAt =
    buildCreatedAtFilter(
      filter.timeRange
    );

  if (createdAt) {
    where.createdAt = createdAt;
  }

  return where;
}

//////////////////////////////////////////////////////////////
// UNIQUE ID HELPERS
//////////////////////////////////////////////////////////////

/**
 * Add a user ID to a Set when available.
 */
export function addUniqueUser(
  users: Set<string>,
  userId?: string | null
): void {
  if (
    typeof userId === "string" &&
    userId.length > 0
  ) {
    users.add(userId);
  }
}

/**
 * Add a session ID to a Set when available.
 */
export function addUniqueSession(
  sessions: Set<string>,
  sessionId?: string | null
): void {
  if (
    typeof sessionId === "string" &&
    sessionId.length > 0
  ) {
    sessions.add(sessionId);
  }
}

//////////////////////////////////////////////////////////////
// PRISMA SAFETY
//////////////////////////////////////////////////////////////

/**
 * Keep Prisma available through the shared application
 * client without creating a new connection.
 *
 * This export is intentionally typed only for analytics
 * modules that want to use the shared client.
 */
export type AnalyticsPrismaClient = PrismaClient;