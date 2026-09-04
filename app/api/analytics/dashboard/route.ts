import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type AnalyticsRange = "24h" | "7d" | "30d" | "lifetime";

type DateRange = {
  range: AnalyticsRange;
  currentStart: Date | null;
  currentEnd: Date;
  previousStart: Date | null;
  previousEnd: Date | null;
};

function getRange(value: string | null): DateRange {
  const now = new Date();

  if (value === "lifetime") {
    return {
      range: "lifetime",
      currentStart: null,
      currentEnd: now,
      previousStart: null,
      previousEnd: null,
    };
  }

  if (value === "30d") {
    const currentStart = new Date(now);
    currentStart.setDate(currentStart.getDate() - 30);

    const previousStart = new Date(currentStart);
    previousStart.setDate(previousStart.getDate() - 30);

    return {
      range: "30d",
      currentStart,
      currentEnd: now,
      previousStart,
      previousEnd: currentStart,
    };
  }

  if (value === "7d") {
    const currentStart = new Date(now);
    currentStart.setDate(currentStart.getDate() - 7);

    const previousStart = new Date(currentStart);
    previousStart.setDate(previousStart.getDate() - 7);

    return {
      range: "7d",
      currentStart,
      currentEnd: now,
      previousStart,
      previousEnd: currentStart,
    };
  }

  const currentStart = new Date(now);
  currentStart.setHours(currentStart.getHours() - 24);

  const previousStart = new Date(currentStart);
  previousStart.setHours(previousStart.getHours() - 24);

  return {
    range: "24h",
    currentStart,
    currentEnd: now,
    previousStart,
    previousEnd: currentStart,
  };
}

function safeNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : 0;
}

function percentage(part: number, total: number): number {
  if (!total) return 0;

  return Number(((part / total) * 100).toFixed(1));
}

function changePercent(
  current: number,
  previous: number
): number {
  if (!previous) {
    return current > 0 ? 100 : 0;
  }

  return Number(
    (((current - previous) / previous) * 100).toFixed(1)
  );
}

function sumBy<T>(
  items: T[],
  getter: (item: T) => number | null | undefined
): number {
  return items.reduce(
    (sum, item) => sum + safeNumber(getter(item)),
    0
  );
}

function uniqueCount(values: string[]): number {
  return new Set(values.filter(Boolean)).size;
}

function buildEventDateWhere(
  start: Date | null,
  end: Date
) {
  if (!start) {
    return {};
  }

  return {
    createdAt: {
      gte: start,
      lt: end,
    },
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const rangeParam = searchParams.get("range");

    const {
      range,
      currentStart,
      currentEnd,
      previousStart,
      previousEnd,
    } = getRange(rangeParam);

    /**
     * ============================================================
     * LIFETIME NEWS DATABASE SNAPSHOT
     * ============================================================
     *
     * Canonical NationPath News:
     *
     * isDeleted  = false
     * isEditorial = false
     * isAstrology = false
     *
     * IMPORTANT:
     * These counts are lifetime DB snapshots and are NOT affected
     * by 24h / 7d / 30d / lifetime event range.
     */

    const [
      totalNewsArticles,
      publishedNewsArticles,

      rawArticleCount,
      deletedArticleCount,
      editorialArticleCount,
      astrologyArticleCount,
    ] = await Promise.all([
      prisma.article.count({
        where: {
          isDeleted: false,
          isEditorial: false,
          isAstrology: false,
        },
      }),

      prisma.article.count({
        where: {
          isDeleted: false,
          isEditorial: false,
          isAstrology: false,
          status: "approved",
          publishedAt: {
            not: null,
          },
        },
      }),

      /**
       * Raw Article count.
       *
       * Used only to diagnose:
       * 711 raw articles vs 698 analytics news.
       */
      prisma.article.count(),

      prisma.article.count({
        where: {
          isDeleted: true,
        },
      }),

      prisma.article.count({
        where: {
          isDeleted: false,
          isEditorial: true,
        },
      }),

      prisma.article.count({
        where: {
          isDeleted: false,
          isEditorial: false,
          isAstrology: true,
        },
      }),
    ]);

    /**
     * ============================================================
     * EXACT NEWS COUNT DIFFERENCE
     * ============================================================
     *
     * This identifies every Article record that exists in the raw
     * Article collection but is excluded from canonical News Total.
     */

    const excludedNewsArticles = await prisma.article.findMany({
      where: {
        OR: [
          {
            isDeleted: true,
          },
          {
            isEditorial: true,
          },
          {
            isAstrology: true,
          },
        ],
      },

      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        isDeleted: true,
        isEditorial: true,
        isAstrology: true,
        publishedAt: true,
        createdAt: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    const newsCountDifference =
      rawArticleCount - totalNewsArticles;

    console.log(
      "=================================================="
    );
    console.log("ANALYTICS NEWS COUNT DEBUG");
    console.log(
      "=================================================="
    );

    console.log({
      rawArticleCount,
      analyticsNewsTotal: totalNewsArticles,
      difference: newsCountDifference,

      deletedArticleCount,
      editorialArticleCount,
      astrologyArticleCount,

      excludedArticlesCount:
        excludedNewsArticles.length,
    });

    console.log(
      "ARTICLES EXCLUDED FROM ANALYTICS NEWS TOTAL:"
    );

    console.table(
      excludedNewsArticles.map((article) => ({
        id: article.id,
        title: article.title,
        slug: article.slug,
        status: article.status,
        isDeleted: article.isDeleted,
        isEditorial: article.isEditorial,
        isAstrology: article.isAstrology,
        publishedAt: article.publishedAt,
      }))
    );

    console.log(
      "=================================================="
    );

    /**
     * ============================================================
     * ARTICLE ANALYTICS EVENTS
     * ============================================================
     *
     * lifetime:
     *   no createdAt filter
     *
     * 24h / 7d / 30d:
     *   selected period only
     */

    const [
      currentArticleEvents,
      previousArticleEvents,
      currentCategoryEvents,
      previousCategoryEvents,
    ] = await Promise.all([
      prisma.articleAnalyticsEvent.findMany({
        where: buildEventDateWhere(
          currentStart,
          currentEnd
        ),
      }),

      range === "lifetime"
        ? Promise.resolve([])
        : prisma.articleAnalyticsEvent.findMany({
            where: buildEventDateWhere(
              previousStart,
              previousEnd!
            ),
          }),

      prisma.categoryAnalyticsEvent.findMany({
        where: buildEventDateWhere(
          currentStart,
          currentEnd
        ),
      }),

      range === "lifetime"
        ? Promise.resolve([])
        : prisma.categoryAnalyticsEvent.findMany({
            where: buildEventDateWhere(
              previousStart,
              previousEnd!
            ),
          }),
    ]);

    /**
     * ============================================================
     * BASIC EVENT COUNTS
     * ============================================================
     */

    const currentViews = currentArticleEvents.filter(
      (event) => event.eventType === "view"
    ).length;

    const previousViews = previousArticleEvents.filter(
      (event) => event.eventType === "view"
    ).length;

    const currentReads = currentArticleEvents.filter(
      (event) => event.eventType === "read"
    ).length;

    const previousReads = previousArticleEvents.filter(
      (event) => event.eventType === "read"
    ).length;

    const currentLikes = currentArticleEvents.filter(
      (event) => event.eventType === "like"
    ).length;

    const previousLikes = previousArticleEvents.filter(
      (event) => event.eventType === "like"
    ).length;

    const currentShares = currentArticleEvents.filter(
      (event) => event.eventType === "share"
    ).length;

    const previousShares = previousArticleEvents.filter(
      (event) => event.eventType === "share"
    ).length;

    const currentReactions = currentArticleEvents.filter(
      (event) => event.eventType === "reaction"
    ).length;

    const previousReactions =
      previousArticleEvents.filter(
        (event) => event.eventType === "reaction"
      ).length;

    /**
     * ============================================================
     * VIDEO
     *
     * Kept in backend response for compatibility.
     * Current Analytics KPI UI does NOT surface video.
     * ============================================================
     */

    const currentVideoPlays =
      currentArticleEvents.filter(
        (event) => event.eventType === "video_play"
      ).length;

    const previousVideoPlays =
      previousArticleEvents.filter(
        (event) => event.eventType === "video_play"
      ).length;

    const currentVideoCompletes =
      currentArticleEvents.filter(
        (event) => event.eventType === "video_complete"
      ).length;

    const previousVideoCompletes =
      previousArticleEvents.filter(
        (event) => event.eventType === "video_complete"
      ).length;

    /**
     * ============================================================
     * SESSIONS / USERS
     * ============================================================
     */

    const currentSessionIds = currentArticleEvents
      .map((event) => event.sessionId)
      .filter(
        (value): value is string => Boolean(value)
      );

    const previousSessionIds = previousArticleEvents
      .map((event) => event.sessionId)
      .filter(
        (value): value is string => Boolean(value)
      );

    const currentUserIds = currentArticleEvents
      .map((event) => event.userId)
      .filter(
        (value): value is string => Boolean(value)
      );

    const previousUserIds = previousArticleEvents
      .map((event) => event.userId)
      .filter(
        (value): value is string => Boolean(value)
      );

    const currentSessions =
      uniqueCount(currentSessionIds);

    const previousSessions =
      uniqueCount(previousSessionIds);

    const currentUsers =
      uniqueCount(currentUserIds);

    const previousUsers =
      uniqueCount(previousUserIds);

    const currentAnonymousSessions =
      uniqueCount(
        currentArticleEvents
          .filter((event) => !event.userId)
          .map((event) => event.sessionId)
          .filter(
            (value): value is string => Boolean(value)
          )
      );

    const previousAnonymousSessions =
      uniqueCount(
        previousArticleEvents
          .filter((event) => !event.userId)
          .map((event) => event.sessionId)
          .filter(
            (value): value is string => Boolean(value)
          )
      );

    /**
     * ============================================================
     * READ INTELLIGENCE
     * ============================================================
     */

    const readEvents = currentArticleEvents.filter(
      (event) => event.eventType === "read"
    );

    const previousReadEvents =
      previousArticleEvents.filter(
        (event) => event.eventType === "read"
      );

    const totalReadDuration = sumBy(
      readEvents,
      (event) => event.readDuration
    );

    const previousTotalReadDuration = sumBy(
      previousReadEvents,
      (event) => event.readDuration
    );

    const totalReadPercentage = sumBy(
      readEvents,
      (event) => event.readPercentage
    );

    const previousTotalReadPercentage = sumBy(
      previousReadEvents,
      (event) => event.readPercentage
    );

    const avgReadDuration = readEvents.length
      ? totalReadDuration / readEvents.length
      : 0;

    const previousAvgReadDuration =
      previousReadEvents.length
        ? previousTotalReadDuration /
          previousReadEvents.length
        : 0;

    const avgReadPercentage = readEvents.length
      ? totalReadPercentage / readEvents.length
      : 0;

    const previousAvgReadPercentage =
      previousReadEvents.length
        ? previousTotalReadPercentage /
          previousReadEvents.length
        : 0;

    const readRate = percentage(
      currentReads,
      currentViews
    );

    const previousReadRate = percentage(
      previousReads,
      previousViews
    );

    /**
     * ============================================================
     * ENGAGEMENT
     * ============================================================
     */

    const currentEngagementActions =
      currentLikes +
      currentShares +
      currentReactions;

    const previousEngagementActions =
      previousLikes +
      previousShares +
      previousReactions;

    const engagementRate = percentage(
      currentEngagementActions,
      currentViews
    );

    const previousEngagementRate = percentage(
      previousEngagementActions,
      previousViews
    );

    /**
     * ============================================================
     * CATEGORY ANALYTICS
     * ============================================================
     */

    const categoryViews =
      currentCategoryEvents.filter(
        (event) => event.eventType === "view"
      ).length;

    const categoryOpens =
      currentCategoryEvents.filter(
        (event) => event.eventType === "open"
      ).length;

    const categoryReads =
      currentCategoryEvents.filter(
        (event) => event.eventType === "read"
      ).length;

    const categoryScrolls =
      currentCategoryEvents.filter(
        (event) => event.eventType === "scroll"
      ).length;

    /**
     * ============================================================
     * ARTICLE IDS
     * ============================================================
     */

    const articleIds = Array.from(
      new Set(
        currentArticleEvents
          .map((event) => event.articleId)
          .filter(
            (value): value is string => Boolean(value)
          )
      )
    );
const articles = articleIds.length
  ? await prisma.article.findMany({
      where: {
        id: {
          in: articleIds,
        },
      },

      select: {
        id: true,
        title: true,
        slug: true,
        category: {
          select: {
            slug: true,
            name: true,
          },
        },
        status: true,
        isEditorial: true,
        isAstrology: true,
        publishedAt: true,
      },
    })
  : [];

    const articleMap = new Map(
      articles.map((article) => [
        article.id,
        article,
      ])
    );

    /**
     * ============================================================
     * CONTENT PERFORMANCE
     * ============================================================
     */

    const contentMap = new Map<
      string,
      {
        articleId: string;
        title: string;
        slug: string;
        category: string | null;

        views: number;
        reads: number;
        likes: number;
        shares: number;
        reactions: number;

        videoPlays: number;
        videoCompletes: number;

        readDuration: number;
        readPercentage: number;

        isEditorial: boolean;
        isAstrology: boolean;
        publishedAt: Date | null;
      }
    >();

    for (const event of currentArticleEvents) {
      if (!event.articleId) continue;

      const article = articleMap.get(
        event.articleId
      );

      if (!article) continue;

      const existing =
        contentMap.get(event.articleId) ?? {
          articleId: event.articleId,
          title: article.title,
          slug: article.slug,
          category:
  article.category?.slug ||
  article.category?.name ||
  null,

          views: 0,
          reads: 0,
          likes: 0,
          shares: 0,
          reactions: 0,

          videoPlays: 0,
          videoCompletes: 0,

          readDuration: 0,
          readPercentage: 0,

          isEditorial: article.isEditorial,
          isAstrology: article.isAstrology,
          publishedAt: article.publishedAt,
        };

      switch (event.eventType) {
        case "view":
          existing.views += 1;
          break;

        case "read":
          existing.reads += 1;
          existing.readDuration += safeNumber(
            event.readDuration
          );
          existing.readPercentage += safeNumber(
            event.readPercentage
          );
          break;

        case "like":
          existing.likes += 1;
          break;

        case "share":
          existing.shares += 1;
          break;

        case "reaction":
          existing.reactions += 1;
          break;

        case "video_play":
          existing.videoPlays += 1;
          break;

        case "video_complete":
          existing.videoCompletes += 1;
          break;
      }

      contentMap.set(
        event.articleId,
        existing
      );
    }

    const contentPerformance = Array.from(
      contentMap.values()
    ).map((item) => ({
      ...item,

      readRate: percentage(
        item.reads,
        item.views
      ),

      engagementRate: percentage(
        item.likes +
          item.shares +
          item.reactions,
        item.views
      ),

      videoCompletionRate: percentage(
        item.videoCompletes,
        item.videoPlays
      ),

      avgReadDuration: item.reads
        ? item.readDuration / item.reads
        : 0,

      avgReadPercentage: item.reads
        ? item.readPercentage / item.reads
        : 0,
    }));

    /**
     * ============================================================
     * CONTENT TYPES
     * ============================================================
     */

    const newsContent =
      contentPerformance.filter(
        (item) =>
          !item.isEditorial &&
          !item.isAstrology
      );

    const editorialContent =
      contentPerformance.filter(
        (item) => item.isEditorial
      );

    const astrologyContent =
      contentPerformance.filter(
        (item) => item.isAstrology
      );

    /**
     * ============================================================
     * CONTENT SUMMARY
     * ============================================================
     */

    function summarizeContent(
      items: typeof contentPerformance
    ) {
      const views = sumBy(
        items,
        (item) => item.views
      );

      const reads = sumBy(
        items,
        (item) => item.reads
      );

      const likes = sumBy(
        items,
        (item) => item.likes
      );

      const shares = sumBy(
        items,
        (item) => item.shares
      );

      const reactions = sumBy(
        items,
        (item) => item.reactions
      );

      const videoPlays = sumBy(
        items,
        (item) => item.videoPlays
      );

      const videoCompletes = sumBy(
        items,
        (item) => item.videoCompletes
      );

      const readDuration = sumBy(
        items,
        (item) => item.readDuration
      );

      const readPercentage = sumBy(
        items,
        (item) => item.readPercentage
      );

      return {
        views,
        reads,
        likes,
        shares,
        reactions,

        videoPlays,
        videoCompletes,

        readRate: percentage(
          reads,
          views
        ),

        engagementRate: percentage(
          likes +
            shares +
            reactions,
          views
        ),

        videoCompletionRate: percentage(
          videoCompletes,
          videoPlays
        ),

        avgReadDuration: reads
          ? readDuration / reads
          : 0,

        avgReadPercentage: reads
          ? readPercentage / reads
          : 0,
      };
    }

    /**
     * ============================================================
     * CONTENT RANKINGS
     * ============================================================
     */

    const mostRead = [...newsContent]
      .sort(
        (a, b) => b.reads - a.reads
      )
      .slice(0, 10);

    const topContent = [...newsContent]
      .sort(
        (a, b) => b.views - a.views
      )
      .slice(0, 10);

    const trending = [...newsContent]
      .sort((a, b) => {
        const scoreA =
          a.views +
          a.reads * 2 +
          a.likes * 3 +
          a.shares * 4 +
          a.reactions * 2;

        const scoreB =
          b.views +
          b.reads * 2 +
          b.likes * 3 +
          b.shares * 4 +
          b.reactions * 2;

        return scoreB - scoreA;
      })
      .slice(0, 10);

    /**
     * ============================================================
     * CATEGORY PERFORMANCE
     * ============================================================
     */

    const categoryMap = new Map<
      string,
      {
        category: string;
        views: number;
        reads: number;
        likes: number;
        shares: number;
        reactions: number;
      }
    >();

    for (const item of newsContent) {
      const category =
        item.category ||
        "Uncategorized";

      const existing =
        categoryMap.get(category) ?? {
          category,
          views: 0,
          reads: 0,
          likes: 0,
          shares: 0,
          reactions: 0,
        };

      existing.views += item.views;
      existing.reads += item.reads;
      existing.likes += item.likes;
      existing.shares += item.shares;
      existing.reactions += item.reactions;

      categoryMap.set(
        category,
        existing
      );
    }

    const categoryPerformance =
      Array.from(
        categoryMap.values()
      )
        .map((item) => ({
          ...item,

          readRate: percentage(
            item.reads,
            item.views
          ),

          engagementRate: percentage(
            item.likes +
              item.shares +
              item.reactions,
            item.views
          ),
        }))
        .sort(
          (a, b) => b.views - a.views
        );

    /**
     * ============================================================
     * TRAFFIC
     * ============================================================
     */

    const trafficMap = new Map<
      string,
      {
        date: string;
        views: number;
        reads: number;
      }
    >();

    for (const event of currentArticleEvents) {
      const date = event.createdAt
        .toISOString()
        .slice(0, 10);

      const existing =
        trafficMap.get(date) ?? {
          date,
          views: 0,
          reads: 0,
        };

      if (
        event.eventType === "view"
      ) {
        existing.views += 1;
      }

      if (
        event.eventType === "read"
      ) {
        existing.reads += 1;
      }

      trafficMap.set(
        date,
        existing
      );
    }

    const traffic = Array.from(
      trafficMap.values()
    ).sort((a, b) =>
      a.date.localeCompare(
        b.date
      )
    );

    /**
     * ============================================================
     * LOCATION
     * ============================================================
     */

    const locationMap = new Map<
      string,
      {
        country: string;
        region: string;
        city: string;
        views: number;
        reads: number;
        users: Set<string>;
      }
    >();

    for (const event of currentArticleEvents) {
      const country =
        event.country ||
        "Unknown";

      const region =
        event.region ||
        "Unknown";

      const city =
        event.city ||
        "Unknown";

      const key = `${country}|${region}|${city}`;

      const existing =
        locationMap.get(key) ?? {
          country,
          region,
          city,
          views: 0,
          reads: 0,
          users: new Set<string>(),
        };

      if (
        event.eventType === "view"
      ) {
        existing.views += 1;
      }

      if (
        event.eventType === "read"
      ) {
        existing.reads += 1;
      }

      if (event.userId) {
        existing.users.add(
          event.userId
        );
      }

      locationMap.set(
        key,
        existing
      );
    }

    const locations =
      Array.from(
        locationMap.values()
      )
        .map((item) => ({
          country:
            item.country,

          region:
            item.region,

          city:
            item.city,

          views:
            item.views,

          reads:
            item.reads,

          users:
            item.users.size,
        }))
        .sort(
          (a, b) =>
            b.views - a.views
        );

    /**
     * ============================================================
     * ACQUISITION SOURCE
     * ============================================================
     */

    const sourceMap = new Map<
      string,
      {
        source: string;
        medium: string;
        campaign: string;
        views: number;
        reads: number;
      }
    >();

    for (const event of currentArticleEvents) {
      const source =
        event.source ||
        "Direct";

      const medium =
  typeof event.metadata === "object" &&
  event.metadata !== null &&
  "medium" in event.metadata &&
  typeof event.metadata.medium === "string"
    ? event.metadata.medium
    : "none";

const campaign = event.campaign || "none";

      const key =
        `${source}|${medium}|${campaign}`;

      const existing =
        sourceMap.get(key) ?? {
          source,
          medium,
          campaign,
          views: 0,
          reads: 0,
        };

      if (
        event.eventType === "view"
      ) {
        existing.views += 1;
      }

      if (
        event.eventType === "read"
      ) {
        existing.reads += 1;
      }

      sourceMap.set(
        key,
        existing
      );
    }

    const sources =
      Array.from(
        sourceMap.values()
      ).sort(
        (a, b) =>
          b.views - a.views
      );

    /**
     * ============================================================
     * SUMMARIES
     * ============================================================
     */

    const newsSummary =
      summarizeContent(
        newsContent
      );

    const editorialSummary =
      summarizeContent(
        editorialContent
      );

    const astrologySummary =
      summarizeContent(
        astrologyContent
      );

    /**
     * ============================================================
     * LIFETIME DEBUG META
     * ============================================================
     */

    const newsCountDebug = {
      rawArticleCount,

      analyticsNewsTotal:
        totalNewsArticles,

      difference:
        newsCountDifference,

      deletedArticleCount,

      editorialArticleCount,

      astrologyArticleCount,

      excludedArticlesCount:
        excludedNewsArticles.length,

      excludedArticles:
        excludedNewsArticles.map(
          (article) => ({
            id: article.id,
            title: article.title,
            slug: article.slug,
            status: article.status,
            isDeleted:
              article.isDeleted,
            isEditorial:
              article.isEditorial,
            isAstrology:
              article.isAstrology,
            publishedAt:
              article.publishedAt,
            createdAt:
              article.createdAt,
          })
        ),
    };

    /**
     * ============================================================
     * FINAL RESPONSE
     * ============================================================
     */

    return NextResponse.json({
      success: true,

      data: {
        range,

        /**
         * ========================================================
         * OVERVIEW
         * ========================================================
         */

        overview: {
          views: currentViews,
          reads: currentReads,

          sessions:
            currentSessions,

          users:
            currentUsers,

          likes:
            currentLikes,

          shares:
            currentShares,

          reactions:
            currentReactions,

          videoPlays:
            currentVideoPlays,

          videoCompletes:
            currentVideoCompletes,

          readRate,

          engagementRate,

          changes:
            range === "lifetime"
              ? {
                  views: 0,
                  reads: 0,
                  sessions: 0,
                  users: 0,
                  likes: 0,
                  shares: 0,
                  reactions: 0,
                  readRate: 0,
                  engagementRate: 0,
                }
              : {
                  views:
                    changePercent(
                      currentViews,
                      previousViews
                    ),

                  reads:
                    changePercent(
                      currentReads,
                      previousReads
                    ),

                  sessions:
                    changePercent(
                      currentSessions,
                      previousSessions
                    ),

                  users:
                    changePercent(
                      currentUsers,
                      previousUsers
                    ),

                  likes:
                    changePercent(
                      currentLikes,
                      previousLikes
                    ),

                  shares:
                    changePercent(
                      currentShares,
                      previousShares
                    ),

                  reactions:
                    changePercent(
                      currentReactions,
                      previousReactions
                    ),

                  readRate:
                    changePercent(
                      readRate,
                      previousReadRate
                    ),

                  engagementRate:
                    changePercent(
                      engagementRate,
                      previousEngagementRate
                    ),
                },
        },

        /**
         * ========================================================
         * NEWS
         *
         * total/published = LIFETIME DB SNAPSHOT
         * reads = selected analytics range
         * ========================================================
         */

        news: {
          ...newsSummary,

          total:
            totalNewsArticles,

          published:
            publishedNewsArticles,

          reads:
            newsSummary.reads,
        },

        /**
         * ========================================================
         * EDITORIAL
         * ========================================================
         */

        editorial: {
          ...editorialSummary,
        },

        /**
         * ========================================================
         * ASTROLOGY
         * ========================================================
         */

        astrology: {
          ...astrologySummary,
        },

        /**
         * ========================================================
         * PLATFORM
         * ========================================================
         */

        platform: {
          views:
            currentViews,

          reads:
            currentReads,

          /**
           * Lifetime DB counts.
           */
          newsTotal:
            totalNewsArticles,

          newsPublished:
            publishedNewsArticles,

          newsReads:
            newsSummary.reads,

          sessions:
            currentSessions,

          users:
            currentUsers,

          anonymousSessions:
            currentAnonymousSessions,

          categoryViews,

          categoryOpens,

          categoryReads,

          categoryScrolls,

          likes:
            currentLikes,

          shares:
            currentShares,

          reactions:
            currentReactions,

          /**
           * Backend compatibility only.
           * Current UI does not show video KPI.
           */
          videoPlays:
            currentVideoPlays,

          videoCompletes:
            currentVideoCompletes,

          readRate,

          engagementRate,

          videoCompletionRate:
            percentage(
              currentVideoCompletes,
              currentVideoPlays
            ),
        },

        /**
         * ========================================================
         * TRAFFIC
         * ========================================================
         */

        traffic,

        /**
         * ========================================================
         * LOCATIONS
         * ========================================================
         */

        locations,

        /**
         * ========================================================
         * SOURCES
         * ========================================================
         */

        sources,

        /**
         * ========================================================
         * CONTENT
         * ========================================================
         */

        contentPerformance,

        mostRead,

        trending,

        topContent,

        categoryPerformance,

        /**
         * ========================================================
         * META
         * ========================================================
         */

        meta: {
          source:
            "ArticleAnalyticsEvent + CategoryAnalyticsEvent + Article DB snapshot",

          generatedAt:
            new Date().toISOString(),

          range,

          /**
           * Lifetime News count diagnostic.
           *
           * This is what we need to identify the
           * 711 vs 698 difference.
           */
          newsCountDebug,
        },
      },
    });
  } catch (error) {
    console.error(
      "Analytics dashboard error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to load analytics dashboard.",
      },
      {
        status: 500,
      }
    );
  }
}