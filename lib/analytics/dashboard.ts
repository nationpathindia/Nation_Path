import { prisma } from "@/lib/prisma";
import { PostStatus } from "@prisma/client";

import connectDB from "@/lib/mongodb";
import User from "@/app/models/User";

import type {
  AnalyticsTimeRange,
  ArticleAnalyticsItem,
  CategoryAnalyticsItem,
} from "./types";

import {
  getMostReadArticles,
  getTrendingArticles,
} from "./article";

import {
  getTrendingCategories,
} from "./category";

/* =========================================================
   NATIONPATH ANALYTICS
   DASHBOARD SERVICE

   LOCKED CANONICAL VERSION

   RESPONSIBILITIES
   ---------------------------------------------------------
   - Current public/live article counts
   - Current scheduled article counts
   - Today's calendar publishing count
   - Selected-period publishing count
   - Historical analytics
   - Analytics event data
   - Legacy Article aggregate compatibility
   - Overview metrics
   - Article event metrics
   - Category event metrics
   - Unique users
   - Unique sessions
   - Most Read
   - Trending
   - Trending Categories
   - News analytics
   - Editorial analytics
   - Astrology analytics
   - Traffic time-series
   - Location analytics

   ARCHITECTURE
   ---------------------------------------------------------
   - Existing analytics architecture ONLY
   - No duplicate analytics system
   - Raw analytics events remain canonical
   - Legacy Article counters remain compatibility data
   - This service does NOT create analytics events
   - This service does NOT modify Article
   - This service does NOT modify Category
   - This service does NOT redesign or replace existing
     analytics collection infrastructure

   PLATFORM SNAPSHOT
   ---------------------------------------------------------
   Always represents current platform state.

   Examples:
   - Published Articles = currently public/live
   - Scheduled Articles = currently scheduled
   - Total Articles = current public/live content
   - Categories = current categories
   - Total Users = current registered users
   - All-Time Views = lifetime analytics
   - Today's Articles = current India calendar-day publishing

   SELECTED ANALYTICS RANGE
   ---------------------------------------------------------
   Represents activity generated during:
   - 1h
   - 6h
   - 24h
   - 7d
   - 30d
   - 90d
   - all

   Examples:
   - Views
   - Opens
   - Reads
   - Shares
   - Reactions
   - Events
   - Unique Users
   - Unique Sessions
   - Published In Range

   PUBLIC ARTICLE RULE
   ---------------------------------------------------------
   Public/live:
     isDeleted = false
     status = approved
     AND (
       publishedAt <= now
       OR publishedAt = null
     )

   Scheduled:
     isDeleted = false
     status = approved
     AND publishedAt > now

   Existing public articles with publishedAt=null
   remain public/live.

   IMPORTANT
   ---------------------------------------------------------
   Do not create another analytics pipeline here.
   This file is dashboard/read-side aggregation only.
========================================================= */


/* =========================================================
   RANGE CONFIGURATION
========================================================= */

const RANGE_HOURS: Partial<
  Record<AnalyticsTimeRange, number>
> = {
  "1h": 1,
  "6h": 6,
  "24h": 24,
  "7d": 24 * 7,
  "30d": 24 * 30,
  "90d": 24 * 90,
};


/* =========================================================
   TYPES
========================================================= */

export interface AnalyticsEventBreakdown {
  totalEvents: number;

  views: number;
  opens: number;
  reads: number;
  scrolls: number;

  likes: number;
  reactions: number;
  shares: number;

  videoPlays: number;
  videoCompletes: number;
}


export interface AnalyticsLegacyTotals {
  views: number;
  likes: number;
  shares: number;
}


export interface AnalyticsPlatformSnapshot {
  /* Current platform content */
  totalArticles: number;
  liveArticles: number;
  scheduledArticles: number;

  totalCategories: number;

  newsArticles: number;
  editorialArticles: number;
  astroArticles: number;

  /* Calendar-day publishing */
  todayArticles: number;
  publishedToday: number;

  /* Current users */
  totalUsers: number;

  /*
   * Active users are analytics-period users.
   * They intentionally follow the selected dashboard range.
   */
  activeUsers: number;

  /* Lifetime analytics */
  allTimeEvents: number;
  allTimeViews: number;
  allTimeReads: number;
  allTimeShares: number;
  allTimeLikes: number;

  /* Compatibility */
  legacy: AnalyticsLegacyTotals;
}


export interface AnalyticsOverview
  extends AnalyticsEventBreakdown {
  range: AnalyticsTimeRange;

  articleEvents: number;
  categoryEvents: number;

  uniqueUsers: number;
  uniqueSessions: number;

  /* Articles published during selected range */
  publishedInRange: number;
}


export interface ContentTypeAnalytics
  extends AnalyticsEventBreakdown {
  contentType:
    | "news"
    | "editorial"
    | "astro";
}


/* =========================================================
   TRAFFIC
========================================================= */

export interface AnalyticsTrafficPoint {
  label: string;

  views: number;
  reads: number;
  opens: number;
}


/* =========================================================
   LOCATION
========================================================= */

export interface AnalyticsLocationItem {
  id: string;

  name: string;
  country: string | null;

  users: number;
  sessions: number;

  views: number;
  reads: number;
  events: number;

  percentage: number;
}


/* =========================================================
   COMPLETE DASHBOARD CONTRACT
========================================================= */

export interface AnalyticsDashboardData {
  platform: AnalyticsPlatformSnapshot;

  overview: AnalyticsOverview;

  traffic: AnalyticsTrafficPoint[];

  locations: AnalyticsLocationItem[];

  mostRead: ArticleAnalyticsItem[];

  trending: ArticleAnalyticsItem[];

  trendingCategories: CategoryAnalyticsItem[];

  news: ContentTypeAnalytics;

  editorial: ContentTypeAnalytics;

  astrology: ContentTypeAnalytics;
}


/* =========================================================
   RANGE HELPERS
========================================================= */

function getSince(
  range: AnalyticsTimeRange
): Date | null {
  if (range === "all") {
    return null;
  }

  const hours =
    RANGE_HOURS[range] ??
    RANGE_HOURS["24h"] ??
    24;

  return new Date(
    Date.now() -
      hours *
        60 *
        60 *
        1000
  );
}


function getCreatedAtFilter(
  since: Date | null
) {
  if (!since) {
    return {};
  }

  return {
    createdAt: {
      gte: since,
    },
  };
}


/* =========================================================
   INDIA CALENDAR-DAY RANGE
   ---------------------------------------------------------
   NationPath is India-focused.

   Use Asia/Kolkata explicitly instead of relying on the
   server's local timezone.
========================================================= */

function getTodayRange() {
  const now = new Date();

  const indiaDate = new Intl.DateTimeFormat(
    "en-CA",
    {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  ).format(now);

  const start = new Date(
    `${indiaDate}T00:00:00+05:30`
  );

  const end = new Date(
    `${indiaDate}T23:59:59.999+05:30`
  );

  return {
    start,
    end,
  };
}


/* =========================================================
   CANONICAL PUBLIC ARTICLE FILTER
========================================================= */

function getPublicArticleWhere() {
  const now = new Date();

  return {
    isDeleted: false,

    status: PostStatus.approved,

    OR: [
      {
        publishedAt: {
          lte: now,
        },
      },

      {
        publishedAt: null,
      },
    ],
  };
}


/* =========================================================
   CANONICAL SCHEDULED ARTICLE FILTER
========================================================= */

function getScheduledArticleWhere() {
  const now = new Date();

  return {
    isDeleted: false,

    status: PostStatus.approved,

    publishedAt: {
      gt: now,
    },
  };
}


/* =========================================================
   TRAFFIC BUCKET CONFIG
========================================================= */

function getTrafficBucketSize(
  range: AnalyticsTimeRange
): number {
  switch (range) {
    case "1h":
      return 5 * 60 * 1000;

    case "6h":
      return 30 * 60 * 1000;

    case "24h":
      return 60 * 60 * 1000;

    case "7d":
      return 24 * 60 * 60 * 1000;

    case "30d":
      return 24 * 60 * 60 * 1000;

    case "90d":
      return 24 * 60 * 60 * 1000;

    case "all":
    default:
      return 24 * 60 * 60 * 1000;
  }
}


/* =========================================================
   TRAFFIC LABEL
========================================================= */

function getTrafficLabel(
  date: Date,
  range: AnalyticsTimeRange
): string {
  if (
    range === "1h" ||
    range === "6h" ||
    range === "24h"
  ) {
    return date.toLocaleTimeString(
      "en-IN",
      {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }
    );
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
    }
  );
}


/* =========================================================
   FLOOR DATE
========================================================= */

function floorDate(
  date: Date,
  bucketSize: number
): Date {
  const timestamp = date.getTime();

  return new Date(
    Math.floor(
      timestamp /
        bucketSize
    ) *
      bucketSize
  );
}


/* =========================================================
   TRAFFIC TIME SERIES
========================================================= */

async function getTrafficTimeSeries(
  range: AnalyticsTimeRange,
  since: Date | null
): Promise<AnalyticsTrafficPoint[]> {
  const now = new Date();

  let start = since;

  if (!start) {
    const firstEvent =
      await prisma.articleAnalyticsEvent.findFirst({
        orderBy: {
          createdAt: "asc",
        },

        select: {
          createdAt: true,
        },
      });

    start =
      firstEvent?.createdAt ??
      now;
  }

  const bucketSize =
    getTrafficBucketSize(
      range
    );

  const events =
    await prisma.articleAnalyticsEvent.findMany({
      where: {
        createdAt: {
          gte: start,
          lte: now,
        },

        eventType: {
          in: [
            "view",
            "open",
            "read",
          ],
        },
      },

      select: {
        createdAt: true,
        eventType: true,
      },

      orderBy: {
        createdAt: "asc",
      },
    });

  const buckets =
    new Map<
      number,
      AnalyticsTrafficPoint
    >();

  const firstBucket =
    floorDate(
      start,
      bucketSize
    );

  const lastBucket =
    floorDate(
      now,
      bucketSize
    );

  for (
    let cursor =
      firstBucket.getTime();

    cursor <=
    lastBucket.getTime();

    cursor += bucketSize
  ) {
    const bucketDate =
      new Date(cursor);

    buckets.set(
      cursor,
      {
        label:
          getTrafficLabel(
            bucketDate,
            range
          ),

        views: 0,
        reads: 0,
        opens: 0,
      }
    );
  }

  for (const event of events) {
    const bucket =
      floorDate(
        event.createdAt,
        bucketSize
      );

    const point =
      buckets.get(
        bucket.getTime()
      );

    if (!point) {
      continue;
    }

    switch (
      event.eventType
    ) {
      case "view":
        point.views += 1;
        break;

      case "open":
        point.opens += 1;
        break;

      case "read":
        point.reads += 1;
        break;
    }
  }

  return Array.from(
    buckets.values()
  );
}


/* =========================================================
   LOCATION ANALYTICS
========================================================= */

async function getLocationAnalytics(
  since: Date | null
): Promise<AnalyticsLocationItem[]> {
  const events =
    await prisma.articleAnalyticsEvent.findMany({
      where: {
        ...getCreatedAtFilter(
          since
        ),
      },

      select: {
        eventType: true,

        userId: true,
        sessionId: true,

        country: true,
        countryCode: true,

        state: true,
        city: true,
        region: true,
      },
    });

  interface LocationAccumulator {
    id: string;

    name: string;
    country: string | null;

    users: Set<string>;
    sessions: Set<string>;

    views: number;
    reads: number;
    events: number;
  }

  const groups =
    new Map<
      string,
      LocationAccumulator
    >();

  for (const event of events) {
    const country =
      event.country?.trim() ||
      null;

    const countryCode =
      event.countryCode?.trim() ||
      "";

    const state =
      event.state?.trim() ||
      event.region?.trim() ||
      "";

    const city =
      event.city?.trim() ||
      "";

    if (
      !country &&
      !countryCode &&
      !state &&
      !city
    ) {
      continue;
    }

    const name =
      city ||
      state ||
      country ||
      countryCode ||
      "Unknown";

    const id =
      [
        countryCode ||
          country ||
          "unknown",
        state,
        city,
      ]
        .join("|")
        .toLowerCase();

    let group =
      groups.get(id);

    if (!group) {
      group = {
        id,

        name,

        country,

        users:
          new Set<string>(),

        sessions:
          new Set<string>(),

        views: 0,
        reads: 0,
        events: 0,
      };

      groups.set(
        id,
        group
      );
    }

    group.events += 1;

    if (event.userId) {
      group.users.add(
        event.userId
      );
    }

    if (event.sessionId) {
      group.sessions.add(
        event.sessionId
      );
    }

    if (
      event.eventType ===
      "view"
    ) {
      group.views += 1;
    }

    if (
      event.eventType ===
      "read"
    ) {
      group.reads += 1;
    }
  }

  const locations =
    Array.from(
      groups.values()
    ).map(
      (group) => ({
        id:
          group.id,

        name:
          group.name,

        country:
          group.country,

        users:
          group.users.size,

        sessions:
          group.sessions.size,

        views:
          group.views,

        reads:
          group.reads,

        events:
          group.events,

        percentage: 0,
      })
    );

  locations.sort(
    (a, b) => {
      if (
        b.views !==
        a.views
      ) {
        return (
          b.views -
          a.views
        );
      }

      if (
        b.events !==
        a.events
      ) {
        return (
          b.events -
          a.events
        );
      }

      return a.name.localeCompare(
        b.name
      );
    }
  );

  const maxViews =
    locations.reduce(
      (
        max,
        location
      ) =>
        Math.max(
          max,
          location.views
        ),
      0
    );

  for (
    const location of locations
  ) {
    location.percentage =
      maxViews > 0
        ? (
            location.views /
            maxViews
          ) *
          100
        : 0;
  }

  return locations.slice(
    0,
    10
  );
}


/* =========================================================
   EMPTY BREAKDOWN
========================================================= */

function emptyBreakdown(): AnalyticsEventBreakdown {
  return {
    totalEvents: 0,

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


/* =========================================================
   BUILD BREAKDOWN
========================================================= */

function buildBreakdown(
  events: Array<{
    eventType: string;
    count: number;
  }>
): AnalyticsEventBreakdown {
  const result =
    emptyBreakdown();

  for (const event of events) {
    const count =
      Number(event.count) || 0;

    if (count <= 0) {
      continue;
    }

    result.totalEvents +=
      count;

    switch (
      event.eventType
    ) {
      case "view":
        result.views += count;
        break;

      case "open":
        result.opens += count;
        break;

      case "read":
        result.reads += count;
        break;

      case "scroll":
        result.scrolls += count;
        break;

      case "like":
        result.likes += count;
        break;

      case "reaction":
        result.reactions +=
          count;
        break;

      case "share":
        result.shares += count;
        break;

      case "video_play":
        result.videoPlays +=
          count;
        break;

      case "video_complete":
        result.videoCompletes +=
          count;
        break;

      default:
        break;
    }
  }

  return result;
}


/* =========================================================
   ARTICLE EVENT BREAKDOWN
========================================================= */

async function getArticleEventBreakdown(
  since: Date | null
): Promise<AnalyticsEventBreakdown> {
  const events =
    await prisma.articleAnalyticsEvent.groupBy({
      by: [
        "eventType",
      ],

      where: {
        ...getCreatedAtFilter(
          since
        ),
      },

      _count: {
        eventType: true,
      },
    });

  return buildBreakdown(
    events.map(
      (event) => ({
        eventType:
          event.eventType,

        count:
          event._count
            .eventType,
      })
    )
  );
}


/* =========================================================
   CATEGORY EVENT BREAKDOWN
========================================================= */

async function getCategoryEventBreakdown(
  since: Date | null
): Promise<AnalyticsEventBreakdown> {
  const events =
    await prisma.categoryAnalyticsEvent.groupBy({
      by: [
        "eventType",
      ],

      where: {
        ...getCreatedAtFilter(
          since
        ),
      },

      _count: {
        eventType: true,
      },
    });

  return buildBreakdown(
    events.map(
      (event) => ({
        eventType:
          event.eventType,

        count:
          event._count
            .eventType,
      })
    )
  );
}


/* =========================================================
   UNIQUE USERS
========================================================= */

async function getUniqueUsers(
  since: Date | null
): Promise<number> {
  const [
    articleUsers,
    categoryUsers,
  ] = await Promise.all([
    prisma.articleAnalyticsEvent.findMany({
      where: {
        ...getCreatedAtFilter(
          since
        ),

        userId: {
          not: null,
        },
      },

      select: {
        userId: true,
      },

      distinct: [
        "userId",
      ],
    }),

    prisma.categoryAnalyticsEvent.findMany({
      where: {
        ...getCreatedAtFilter(
          since
        ),

        userId: {
          not: null,
        },
      },

      select: {
        userId: true,
      },

      distinct: [
        "userId",
      ],
    }),
  ]);

  const users =
    new Set<string>();

  for (
    const item of articleUsers
  ) {
    if (item.userId) {
      users.add(
        item.userId
      );
    }
  }

  for (
    const item of categoryUsers
  ) {
    if (item.userId) {
      users.add(
        item.userId
      );
    }
  }

  return users.size;
}


/* =========================================================
   UNIQUE SESSIONS
========================================================= */

async function getUniqueSessions(
  since: Date | null
): Promise<number> {
  const [
    articleSessions,
    categorySessions,
  ] = await Promise.all([
    prisma.articleAnalyticsEvent.findMany({
      where: {
        ...getCreatedAtFilter(
          since
        ),

        sessionId: {
          not: null,
        },
      },

      select: {
        sessionId: true,
      },

      distinct: [
        "sessionId",
      ],
    }),

    prisma.categoryAnalyticsEvent.findMany({
      where: {
        ...getCreatedAtFilter(
          since
        ),

        sessionId: {
          not: null,
        },
      },

      select: {
        sessionId: true,
      },

      distinct: [
        "sessionId",
      ],
    }),
  ]);

  const sessions =
    new Set<string>();

  for (
    const item of articleSessions
  ) {
    if (item.sessionId) {
      sessions.add(
        item.sessionId
      );
    }
  }

  for (
    const item of categorySessions
  ) {
    if (item.sessionId) {
      sessions.add(
        item.sessionId
      );
    }
  }

  return sessions.size;
}


/* =========================================================
   PUBLISHED ARTICLES IN SELECTED RANGE
========================================================= */

async function getPublishedArticlesInRange(
  range: AnalyticsTimeRange,
  since: Date | null
): Promise<number> {
  /*
   * "all" means all currently public/live content.
   *
   * We deliberately do NOT count scheduled content.
   */
  if (range === "all") {
    return prisma.article.count({
      where:
        getPublicArticleWhere(),
    });
  }

  if (!since) {
    return 0;
  }

  const now =
    new Date();

  /*
   * For normal ranges:
   *
   * - Articles with publishedAt are counted by publishedAt.
   * - Legacy public articles with publishedAt=null use
   *   createdAt as their historical fallback.
   */
  return prisma.article.count({
    where: {
      isDeleted: false,

      status:
        PostStatus.approved,

      OR: [
        {
          publishedAt: {
            gte: since,
            lte: now,
          },
        },

        {
          publishedAt: null,

          createdAt: {
            gte: since,
            lte: now,
          },
        },
      ],
    },
  });
}


/* =========================================================
   OVERVIEW
========================================================= */

export async function getAnalyticsOverview(
  range: AnalyticsTimeRange = "24h"
): Promise<AnalyticsOverview> {
  const since =
    getSince(range);

  const [
    articleBreakdown,
    categoryBreakdown,
    uniqueUsers,
    uniqueSessions,
    publishedInRange,
  ] = await Promise.all([
    getArticleEventBreakdown(
      since
    ),

    getCategoryEventBreakdown(
      since
    ),

    getUniqueUsers(
      since
    ),

    getUniqueSessions(
      since
    ),

    getPublishedArticlesInRange(
      range,
      since
    ),
  ]);

  return {
    range,

    articleEvents:
      articleBreakdown.totalEvents,

    categoryEvents:
      categoryBreakdown.totalEvents,

    totalEvents:
      articleBreakdown.totalEvents +
      categoryBreakdown.totalEvents,

    views:
      articleBreakdown.views,

    opens:
      articleBreakdown.opens,

    reads:
      articleBreakdown.reads,

    scrolls:
      articleBreakdown.scrolls,

    likes:
      articleBreakdown.likes,

    reactions:
      articleBreakdown.reactions,

    shares:
      articleBreakdown.shares,

    videoPlays:
      articleBreakdown.videoPlays,

    videoCompletes:
      articleBreakdown.videoCompletes,

    uniqueUsers,

    uniqueSessions,

    publishedInRange,
  };
}


/* =========================================================
   CONTENT TYPE FILTER
========================================================= */

function getContentTypeArticleFilter(
  contentType:
    | "news"
    | "editorial"
    | "astro"
) {
  const publicArticleFilter =
    getPublicArticleWhere();

  switch (
    contentType
  ) {
    case "astro":
      return {
        ...publicArticleFilter,

        isAstrology: true,
        isEditorial: false,
      };

    case "editorial":
      return {
        ...publicArticleFilter,

        isEditorial: true,
        isAstrology: false,
      };

    case "news":
    default:
      return {
        ...publicArticleFilter,

        isEditorial: false,
        isAstrology: false,
      };
  }
}


/* =========================================================
   CONTENT TYPE ANALYTICS
========================================================= */

async function getContentTypeAnalytics(
  since: Date | null,
  contentType:
    | "news"
    | "editorial"
    | "astro"
): Promise<ContentTypeAnalytics> {
  const articleFilter =
    getContentTypeArticleFilter(
      contentType
    );

  const events =
    await prisma.articleAnalyticsEvent.groupBy({
      by: [
        "eventType",
      ],

      where: {
        ...getCreatedAtFilter(
          since
        ),

        article:
          articleFilter,
      },

      _count: {
        eventType: true,
      },
    });

  return {
    contentType,

    ...buildBreakdown(
      events.map(
        (event) => ({
          eventType:
            event.eventType,

          count:
            event._count
              .eventType,
        })
      )
    ),
  };
}


/* =========================================================
   LEGACY ARTICLE TOTALS
========================================================= */

async function getLegacyArticleTotals(): Promise<AnalyticsLegacyTotals> {
  const result =
    await prisma.article.aggregate({
      where: {
        isDeleted: false,
      },

      _sum: {
        views: true,
        likes: true,
        shares: true,
      },
    });

  return {
    views:
      Number(
        result._sum.views
      ) || 0,

    likes:
      Number(
        result._sum.likes
      ) || 0,

    shares:
      Number(
        result._sum.shares
      ) || 0,
  };
}


/* =========================================================
   PLATFORM ARTICLE COUNTS
========================================================= */

async function getPlatformArticleCounts() {
  const {
    start: todayStart,
    end: todayEnd,
  } =
    getTodayRange();

  const liveArticleWhere =
    getPublicArticleWhere();

  const scheduledArticleWhere =
    getScheduledArticleWhere();


  /* =======================================================
     CONTENT TYPES
  ======================================================= */

  const newsWhere = {
    ...liveArticleWhere,

    isEditorial: false,
    isAstrology: false,
  };

  const editorialWhere = {
    ...liveArticleWhere,

    isEditorial: true,
    isAstrology: false,
  };

  const astroWhere = {
    ...liveArticleWhere,

    isAstrology: true,
    isEditorial: false,
  };


  /* =======================================================
     TODAY'S PUBLIC CONTENT

     India calendar day.

     Legacy publishedAt=null content created today is
     retained through the createdAt fallback.
  ======================================================= */

  const todayArticleWhere = {
    isDeleted: false,

    status:
      PostStatus.approved,

    OR: [
      {
        publishedAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },

      {
        publishedAt: null,

        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    ],
  };


  const [
    liveArticles,
    scheduledArticles,

    newsArticles,
    editorialArticles,
    astroArticles,

    todayArticles,
  ] = await Promise.all([
    prisma.article.count({
      where:
        liveArticleWhere,
    }),

    prisma.article.count({
      where:
        scheduledArticleWhere,
    }),

    prisma.article.count({
      where:
        newsWhere,
    }),

    prisma.article.count({
      where:
        editorialWhere,
    }),

    prisma.article.count({
      where:
        astroWhere,
    }),

    prisma.article.count({
      where:
        todayArticleWhere,
    }),
  ]);


  return {
    /*
     * Current public/live content.
     *
     * This is NOT "published during selected range".
     * Selected-range publishing is overview.publishedInRange.
     */
    totalArticles:
      liveArticles,

    liveArticles,

    scheduledArticles,

    newsArticles,

    editorialArticles,

    astroArticles,

    todayArticles,

    publishedToday:
      todayArticles,
  };
}


/* =========================================================
   PLATFORM ALL-TIME ANALYTICS
========================================================= */

async function getPlatformAnalyticsTotals() {
  const [
    articleEvents,
    categoryEvents,
    legacy,
  ] = await Promise.all([
    getArticleEventBreakdown(
      null
    ),

    getCategoryEventBreakdown(
      null
    ),

    getLegacyArticleTotals(),
  ]);

  /*
   * Raw event analytics is canonical.
   *
   * Legacy Article counters are retained only so that
   * existing historical data is not silently lost.
   *
   * Math.max() prevents a legacy counter migration from
   * causing the displayed lifetime total to decrease.
   */

  const allTimeViews =
    Math.max(
      articleEvents.views,
      legacy.views
    );

  const allTimeLikes =
    Math.max(
      articleEvents.likes,
      legacy.likes
    );

  const allTimeShares =
    Math.max(
      articleEvents.shares,
      legacy.shares
    );


  return {
    allTimeEvents:
      articleEvents.totalEvents +
      categoryEvents.totalEvents,

    allTimeViews,

    allTimeReads:
      articleEvents.reads,

    allTimeShares,

    allTimeLikes,

    legacy,
  };
}


/* =========================================================
   CANONICAL USER SNAPSHOT
========================================================= */

async function getPlatformUserTotals() {
  await connectDB();

  const [
    totalUsers,
  ] = await Promise.all([
    User.countDocuments(),
  ]);

  return {
    totalUsers,
  };
}


/* =========================================================
   PLATFORM SNAPSHOT
========================================================= */

async function getAnalyticsPlatformSnapshot(
  activeUsersRange: AnalyticsTimeRange
): Promise<AnalyticsPlatformSnapshot> {
  const [
    articleCounts,
    totalCategories,
    userTotals,
    analyticsTotals,
    activeUsers,
  ] = await Promise.all([
    getPlatformArticleCounts(),

    prisma.category.count(),

    getPlatformUserTotals(),

    getPlatformAnalyticsTotals(),

    /*
     * Active users are intentionally analytics-period users.
     * They are not the total registered-user count.
     */
    getUniqueUsers(
      getSince(
        activeUsersRange
      )
    ),
  ]);


  return {
    totalArticles:
      articleCounts.totalArticles,

    liveArticles:
      articleCounts.liveArticles,

    scheduledArticles:
      articleCounts.scheduledArticles,

    totalCategories,

    newsArticles:
      articleCounts.newsArticles,

    editorialArticles:
      articleCounts.editorialArticles,

    astroArticles:
      articleCounts.astroArticles,

    todayArticles:
      articleCounts.todayArticles,

    publishedToday:
      articleCounts.publishedToday,

    totalUsers:
      userTotals.totalUsers,

    activeUsers,

    allTimeEvents:
      analyticsTotals.allTimeEvents,

    allTimeViews:
      analyticsTotals.allTimeViews,

    allTimeReads:
      analyticsTotals.allTimeReads,

    allTimeShares:
      analyticsTotals.allTimeShares,

    allTimeLikes:
      analyticsTotals.allTimeLikes,

    legacy:
      analyticsTotals.legacy,
  };
}


/* =========================================================
   COMPLETE DASHBOARD
========================================================= */

export async function getAnalyticsDashboard(
  range: AnalyticsTimeRange = "24h"
): Promise<AnalyticsDashboardData> {
  const since =
    getSince(range);

  const [
    platform,
    overview,
    traffic,
    locations,
    mostRead,
    trending,
    trendingCategories,
    news,
    editorial,
    astrology,
  ] = await Promise.all([
    getAnalyticsPlatformSnapshot(
      range
    ),

    getAnalyticsOverview(
      range
    ),

    getTrafficTimeSeries(
      range,
      since
    ),

    getLocationAnalytics(
      since
    ),

    getMostReadArticles(
      range,
      10
    ),

    getTrendingArticles(
      range,
      10
    ),

    getTrendingCategories(
      range,
      10
    ),

    getContentTypeAnalytics(
      since,
      "news"
    ),

    getContentTypeAnalytics(
      since,
      "editorial"
    ),

    getContentTypeAnalytics(
      since,
      "astro"
    ),
  ]);


  return {
    platform,

    overview,

    traffic,

    locations,

    mostRead,

    trending,

    trendingCategories,

    news,

    editorial,

    astrology,
  };
}


/* =========================================================
   SIMPLE DASHBOARD SUMMARY
========================================================= */

export async function getAnalyticsSummary(
  range: AnalyticsTimeRange = "24h"
) {
  const [
    platform,
    overview,
  ] = await Promise.all([
    getAnalyticsPlatformSnapshot(
      range
    ),

    getAnalyticsOverview(
      range
    ),
  ]);


  return {
    range,


    /* =====================================================
       CURRENT PLATFORM CONTENT
    ===================================================== */

    totalArticles:
      platform.totalArticles,

    liveArticles:
      platform.liveArticles,

    scheduledArticles:
      platform.scheduledArticles,

    todayArticles:
      platform.todayArticles,

    publishedToday:
      platform.publishedToday,

    totalCategories:
      platform.totalCategories,

    newsArticles:
      platform.newsArticles,

    editorialArticles:
      platform.editorialArticles,

    astroArticles:
      platform.astroArticles,


    /* =====================================================
       USERS
    ===================================================== */

    totalUsers:
      platform.totalUsers,

    activeUsers:
      platform.activeUsers,


    /* =====================================================
       ALL-TIME ANALYTICS
    ===================================================== */

    allTimeEvents:
      platform.allTimeEvents,

    allTimeViews:
      platform.allTimeViews,

    allTimeReads:
      platform.allTimeReads,

    allTimeShares:
      platform.allTimeShares,

    allTimeLikes:
      platform.allTimeLikes,

    legacy:
      platform.legacy,


    /* =====================================================
       SELECTED PERIOD EVENTS
    ===================================================== */

    totalEvents:
      overview.totalEvents,

    articleEvents:
      overview.articleEvents,

    categoryEvents:
      overview.categoryEvents,

    views:
      overview.views,

    opens:
      overview.opens,

    reads:
      overview.reads,

    scrolls:
      overview.scrolls,

    shares:
      overview.shares,

    likes:
      overview.likes,

    reactions:
      overview.reactions,

    videoPlays:
      overview.videoPlays,

    videoCompletes:
      overview.videoCompletes,

    uniqueUsers:
      overview.uniqueUsers,

    uniqueSessions:
      overview.uniqueSessions,


    /* =====================================================
       SELECTED PERIOD PUBLISHING
    ===================================================== */

    publishedInRange:
      overview.publishedInRange,
  };
}