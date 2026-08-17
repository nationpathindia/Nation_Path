//////////////////////////////////////////////////////////////
// NATIONPATH ANALYTICS
// TRENDING SERVICE
//
// Responsibilities:
// - Calculate trending content from analytics events
// - Support News / Editorial / Astro
// - Time-decay based trending
// - View + read + share + like + reaction signals
// - Video engagement signals
// - Category filtering
//
// SOURCE OF TRUTH:
// - ArticleAnalyticsEvent
//
// IMPORTANT:
// - Existing Article.trendingScore is preserved
// - No new collection is created
// - Existing Article data is NOT modified
// - This service is READ-ONLY
//////////////////////////////////////////////////////////////

import { prisma } from "@/lib/prisma";
import { PostStatus } from "@prisma/client";

//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

export type TrendingContentType =
  | "all"
  | "news"
  | "editorial"
  | "astro";

export interface TrendingOptions {
  hours?: number;
  limit?: number;
  categoryId?: string;
  contentType?: TrendingContentType;
}

export interface TrendingArticle {
  id: string;
  title: string;
  slug: string;
  images: string[];
  views: number;
  likes: number;
  shares: number;
  trendingScore: number;
  createdAt: Date;

  category: {
    id: string;
    name: string;
    slug: string;
  } | null;

  analyticsScore: number;
}

//////////////////////////////////////////////////////////////
// EVENT WEIGHTS
//////////////////////////////////////////////////////////////

const EVENT_WEIGHTS: Record<string, number> = {
  view: 1,
  open: 1,
  read: 3,
  scroll: 2,
  like: 5,
  reaction: 4,
  share: 7,
  video_play: 3,
  video_complete: 6,
};

//////////////////////////////////////////////////////////////
// DEFAULTS
//////////////////////////////////////////////////////////////

const DEFAULT_HOURS = 24;
const DEFAULT_LIMIT = 10;

//////////////////////////////////////////////////////////////
// CONTENT FILTER
//////////////////////////////////////////////////////////////

function getContentFilter(
  contentType: TrendingContentType
) {
  switch (contentType) {
    case "astro":
      return {
        isAstrology: true,
      };

    case "editorial":
      return {
        isEditorial: true,
        isAstrology: false,
      };

    case "news":
      return {
        isEditorial: false,
        isAstrology: false,
      };

    case "all":
    default:
      return {};
  }
}

//////////////////////////////////////////////////////////////
// TRENDING
//////////////////////////////////////////////////////////////

export async function getTrending(
  options: TrendingOptions = {}
): Promise<TrendingArticle[]> {
  const {
    hours = DEFAULT_HOURS,
    limit = DEFAULT_LIMIT,
    categoryId,
    contentType = "all",
  } = options;

  ////////////////////////////////////////////////////////////
  // NORMALIZE OPTIONS
  ////////////////////////////////////////////////////////////

  const safeHours =
    Number.isFinite(hours) && hours > 0
      ? hours
      : DEFAULT_HOURS;

  const safeLimit =
    Number.isFinite(limit) && limit > 0
      ? Math.min(Math.floor(limit), 100)
      : DEFAULT_LIMIT;

  ////////////////////////////////////////////////////////////
  // TIME WINDOW
  ////////////////////////////////////////////////////////////

  const now = Date.now();

  const since = new Date(
    now -
      safeHours *
        60 *
        60 *
        1000
  );

  ////////////////////////////////////////////////////////////
  // ARTICLE FILTER
  //
  // Only currently published/approved content participates.
  // Scheduled/future articles are excluded.
  ////////////////////////////////////////////////////////////

  const articleFilter = {
    isDeleted: false,

    status: PostStatus.approved,

    publishedAt: {
      not: null,
      lte: new Date(now),
    },

    ...getContentFilter(contentType),

    ...(categoryId
      ? {
          categoryId,
        }
      : {}),
  };

  ////////////////////////////////////////////////////////////
  // GET RAW ANALYTICS EVENTS
  //
  // ArticleAnalyticsEvent is the source of truth.
  ////////////////////////////////////////////////////////////

  const events =
    await prisma.articleAnalyticsEvent.findMany({
      where: {
        createdAt: {
          gte: since,
        },

        article: articleFilter,
      },

      select: {
        articleId: true,
        eventType: true,
        createdAt: true,
      },
    });

  ////////////////////////////////////////////////////////////
  // NO EVENTS
  ////////////////////////////////////////////////////////////

  if (!events.length) {
    return [];
  }

  ////////////////////////////////////////////////////////////
  // CALCULATE TRENDING SCORE
  //
  // Exponential time decay:
  //
  // 0 hours  = 1.00
  // 6 hours  = ~0.78
  // 12 hours = ~0.61
  // 24 hours = ~0.37
  //
  // Formula:
  //
  // score = eventWeight × e^(-ageHours / 24)
  ////////////////////////////////////////////////////////////

  const scores =
    new Map<string, number>();

  for (const event of events) {
    const weight =
      EVENT_WEIGHTS[
        event.eventType
      ] ?? 0;

    if (weight <= 0) {
      continue;
    }

    const ageHours =
      Math.max(
        0,
        (
          now -
          event.createdAt.getTime()
        ) /
          (60 * 60 * 1000)
      );

    const decay =
      Math.exp(
        -ageHours / 24
      );

    const score =
      weight * decay;

    const current =
      scores.get(
        event.articleId
      ) ?? 0;

    scores.set(
      event.articleId,
      current + score
    );
  }

  ////////////////////////////////////////////////////////////
  // NO VALID SCORES
  ////////////////////////////////////////////////////////////

  if (scores.size === 0) {
    return [];
  }

  ////////////////////////////////////////////////////////////
  // RANK ARTICLES
  ////////////////////////////////////////////////////////////

  const rankedIds =
    Array.from(
      scores.entries()
    )
      .sort(
        (a, b) =>
          b[1] - a[1]
      )
      .slice(0, safeLimit)
      .map(
        ([articleId]) =>
          articleId
      );

  ////////////////////////////////////////////////////////////
  // FETCH ARTICLE DATA
  ////////////////////////////////////////////////////////////

  const articles =
    await prisma.article.findMany({
      where: {
        id: {
          in: rankedIds,
        },

        ...articleFilter,
      },

      select: {
        id: true,
        title: true,
        slug: true,
        images: true,
        views: true,
        likes: true,
        shares: true,
        trendingScore: true,
        createdAt: true,

        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

  ////////////////////////////////////////////////////////////
  // ARTICLE MAP
  ////////////////////////////////////////////////////////////

  const articleMap =
    new Map(
      articles.map(
        (article) => [
          article.id,
          article,
        ]
      )
    );

  ////////////////////////////////////////////////////////////
  // FINAL RESULT
  //
  // Preserve analytics ranking order.
  ////////////////////////////////////////////////////////////

  return rankedIds
    .map((articleId) => {
      const article =
        articleMap.get(
          articleId
        );

      if (!article) {
        return null;
      }

      return {
        ...article,

        analyticsScore:
          Math.round(
            (
              scores.get(
                articleId
              ) ?? 0
            ) * 100
          ) / 100,
      };
    })
    .filter(
      (
        article
      ): article is TrendingArticle =>
        article !== null
    );
}

//////////////////////////////////////////////////////////////
// TRENDING — LAST 1 HOUR
//////////////////////////////////////////////////////////////

export async function getTrending1Hour(
  limit = DEFAULT_LIMIT
) {
  return getTrending({
    hours: 1,
    limit,
  });
}

//////////////////////////////////////////////////////////////
// TRENDING — LAST 6 HOURS
//////////////////////////////////////////////////////////////

export async function getTrending6Hours(
  limit = DEFAULT_LIMIT
) {
  return getTrending({
    hours: 6,
    limit,
  });
}

//////////////////////////////////////////////////////////////
// TRENDING — LAST 24 HOURS
//////////////////////////////////////////////////////////////

export async function getTrending24Hours(
  limit = DEFAULT_LIMIT
) {
  return getTrending({
    hours: 24,
    limit,
  });
}

//////////////////////////////////////////////////////////////
// TRENDING — LAST 48 HOURS
//////////////////////////////////////////////////////////////

export async function getTrending48Hours(
  limit = DEFAULT_LIMIT
) {
  return getTrending({
    hours: 48,
    limit,
  });
}

//////////////////////////////////////////////////////////////
// TRENDING — LAST 7 DAYS
//////////////////////////////////////////////////////////////

export async function getTrending7Days(
  limit = DEFAULT_LIMIT
) {
  return getTrending({
    hours: 24 * 7,
    limit,
  });
}

//////////////////////////////////////////////////////////////
// TRENDING — ALL CONTENT
//////////////////////////////////////////////////////////////

export async function getTrendingAll(
  options: Omit<
    TrendingOptions,
    "contentType"
  > = {}
) {
  return getTrending({
    ...options,
    contentType: "all",
  });
}

//////////////////////////////////////////////////////////////
// TRENDING — NEWS
//////////////////////////////////////////////////////////////

export async function getTrendingNews(
  options: Omit<
    TrendingOptions,
    "contentType"
  > = {}
) {
  return getTrending({
    ...options,
    contentType: "news",
  });
}

//////////////////////////////////////////////////////////////
// TRENDING — EDITORIAL
//////////////////////////////////////////////////////////////

export async function getTrendingEditorial(
  options: Omit<
    TrendingOptions,
    "contentType"
  > = {}
) {
  return getTrending({
    ...options,
    contentType: "editorial",
  });
}

//////////////////////////////////////////////////////////////
// TRENDING — ASTRO
//////////////////////////////////////////////////////////////

export async function getTrendingAstro(
  options: Omit<
    TrendingOptions,
    "contentType"
  > = {}
) {
  return getTrending({
    ...options,
    contentType: "astro",
  });
}

//////////////////////////////////////////////////////////////
// TRENDING — CATEGORY
//////////////////////////////////////////////////////////////

export async function getTrendingCategory(
  categoryId: string,
  options: Omit<
    TrendingOptions,
    "categoryId"
  > = {}
) {
  return getTrending({
    ...options,
    categoryId,
  });
}