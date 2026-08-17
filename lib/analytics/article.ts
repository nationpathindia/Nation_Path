//////////////////////////////////////////////////////////////
// NATIONPATH ANALYTICS
// ARTICLE ANALYTICS
//
// Responsibilities:
// - Most-read articles
// - Trending articles
// - Time-window based article analytics
// - Uses canonical Prisma analytics events
//
// Notes:
// - Preserves existing ArticleAnalyticsItem response shape
// - "all" means no createdAt time restriction
// - No comment system dependency
//////////////////////////////////////////////////////////////

import { prisma } from "@/lib/prisma";

import type {
  AnalyticsTimeRange,
  ArticleAnalyticsItem,
} from "./types";

/* =========================================================
   RANGE CONFIGURATION
========================================================= */

const RANGE_HOURS: Record<AnalyticsTimeRange, number> = {
  "1h": 1,
  "6h": 6,
  "24h": 24,
  "7d": 24 * 7,
  "30d": 24 * 30,
  "90d": 24 * 90,

  // "all" is handled separately.
  "all": 0,
};

/* =========================================================
   TIME WINDOW
========================================================= */

function getSince(
  range: AnalyticsTimeRange
): Date | null {
  if (range === "all") {
    return null;
  }

  const hours =
    RANGE_HOURS[range] ??
    RANGE_HOURS["24h"];

  return new Date(
    Date.now() -
      hours *
        60 *
        60 *
        1000
  );
}

/* =========================================================
   ARTICLE EVENT WEIGHTS
========================================================= */

const EVENT_WEIGHTS: Record<
  string,
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

/* =========================================================
   ARTICLE SELECT
========================================================= */

const ARTICLE_SELECT = {
  id: true,
  title: true,
  slug: true,
  images: true,
  views: true,
  isAstrology: true,
  isEditorial: true,

  category: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },
} as const;

/* =========================================================
   MOST READ
========================================================= */

export async function getMostReadArticles(
  range: AnalyticsTimeRange = "24h",
  limit = 10
): Promise<ArticleAnalyticsItem[]> {
  const since = getSince(range);

  const events =
    await prisma.articleAnalyticsEvent.groupBy({
      by: ["articleId"],

      where: {
        eventType: "view",

        ...(since
          ? {
              createdAt: {
                gte: since,
              },
            }
          : {}),
      },

      _count: {
        articleId: true,
      },

      orderBy: {
        _count: {
          articleId: "desc",
        },
      },

      take: limit,
    });

  if (!events.length) {
    return [];
  }

  const articleIds = events.map(
    (event) => event.articleId
  );

  const articles =
    await prisma.article.findMany({
      where: {
        id: {
          in: articleIds,
        },

        isDeleted: false,
      },

      select: ARTICLE_SELECT,
    });

  const articleMap = new Map(
    articles.map((article) => [
      article.id,
      article,
    ])
  );

  return events
    .map((event) => {
      const article =
        articleMap.get(
          event.articleId
        );

      if (!article) {
        return null;
      }

      return {
        id: article.id,

        title: article.title,

        slug: article.slug,

        images: article.images,

        views:
          event._count.articleId,

        category:
          article.category,

        isAstrology:
          article.isAstrology,

        isEditorial:
          article.isEditorial,
      };
    })
    .filter(
      (
        item
      ): item is ArticleAnalyticsItem =>
        item !== null
    );
}

/* =========================================================
   TRENDING ARTICLES
========================================================= */

export async function getTrendingArticles(
  range: AnalyticsTimeRange = "24h",
  limit = 10
): Promise<ArticleAnalyticsItem[]> {
  const since = getSince(range);

  const events =
    await prisma.articleAnalyticsEvent.groupBy({
      by: [
        "articleId",
        "eventType",
      ],

      where: {
        ...(since
          ? {
              createdAt: {
                gte: since,
              },
            }
          : {}),
      },

      _count: {
        articleId: true,
      },
    });

  if (!events.length) {
    return [];
  }

  /* -------------------------------------------------------
     CALCULATE TRENDING SCORE
  ------------------------------------------------------- */

  const scores = new Map<
    string,
    number
  >();

  for (const event of events) {
    const weight =
      EVENT_WEIGHTS[
        event.eventType
      ] ?? 0;

    if (weight === 0) {
      continue;
    }

    const eventScore =
      event._count.articleId *
      weight;

    scores.set(
      event.articleId,
      (scores.get(
        event.articleId
      ) ?? 0) + eventScore
    );
  }

  /* -------------------------------------------------------
     RANK ARTICLES
  ------------------------------------------------------- */

  const rankedIds =
    [...scores.entries()]
      .sort(
        (a, b) => b[1] - a[1]
      )
      .slice(0, limit);

  if (!rankedIds.length) {
    return [];
  }

  /* -------------------------------------------------------
     LOAD ARTICLES
  ------------------------------------------------------- */

  const articles =
    await prisma.article.findMany({
      where: {
        id: {
          in: rankedIds.map(
            ([articleId]) =>
              articleId
          ),
        },

        isDeleted: false,
      },

      select: ARTICLE_SELECT,
    });

  const articleMap = new Map(
    articles.map((article) => [
      article.id,
      article,
    ])
  );

  /* -------------------------------------------------------
     FINAL RESULT
  ------------------------------------------------------- */

  return rankedIds
    .map(
      ([articleId, score]) => {
        const article =
          articleMap.get(
            articleId
          );

        if (!article) {
          return null;
        }

        return {
          id: article.id,

          title: article.title,

          slug: article.slug,

          images: article.images,

          /*
           * Existing API contract uses "views"
           * for the calculated trending score.
           *
           * Preserve this shape for current
           * dashboard consumers.
           */
          views: score,

          category:
            article.category,

          isAstrology:
            article.isAstrology,

          isEditorial:
            article.isEditorial,
        };
      }
    )
    .filter(
      (
        item
      ): item is ArticleAnalyticsItem =>
        item !== null
    );
}

