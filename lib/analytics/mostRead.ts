//////////////////////////////////////////////////////////////
// NATIONPATH ANALYTICS
// MOST READ SERVICE
//
// Responsibilities:
// - Calculate Most Read content from analytics events
// - Support News / Editorial / Astro
// - Time-window based readership
// - Category filtering
// - Return article data required by UI
//
// IMPORTANT:
// - Analytics events are the source of truth
// - Does NOT create another database collection
// - Does NOT depend only on Article.views
// - Existing Article data remains untouched
//////////////////////////////////////////////////////////////

import { prisma } from "@/lib/prisma";

//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

export type AnalyticsContentType =
  | "all"
  | "news"
  | "editorial"
  | "astro";

export interface MostReadOptions {
  days?: number;

  limit?: number;

  categoryId?: string;

  contentType?: AnalyticsContentType;
}

export interface MostReadArticle {
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
// CONTENT FILTER
//////////////////////////////////////////////////////////////

function getContentFilter(
  contentType: AnalyticsContentType
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

    default:
      return {};
  }
}

//////////////////////////////////////////////////////////////
// GET MOST READ
//////////////////////////////////////////////////////////////

export async function getMostRead(
  options: MostReadOptions = {}
): Promise<MostReadArticle[]> {
  const {
    days = 24,
    limit = 10,
    categoryId,
    contentType = "all",
  } = options;

  ////////////////////////////////////////////////////////////
  // DATE WINDOW
  ////////////////////////////////////////////////////////////

  const since =
    new Date(
      Date.now() -
        days *
          24 *
          60 *
          60 *
          1000
    );

  ////////////////////////////////////////////////////////////
  // ARTICLE FILTER
  ////////////////////////////////////////////////////////////

  const articleFilter = {
    isDeleted: false,

    status: "approved" as const,

    ...getContentFilter(contentType),

    ...(categoryId
      ? {
          categoryId,
        }
      : {}),
  };

  ////////////////////////////////////////////////////////////
  // ANALYTICS EVENTS
  //
  // VIEW = primary readership signal
  // READ = stronger engagement signal
  //
  // We intentionally keep the event source centralized.
  ////////////////////////////////////////////////////////////

  const eventGroups =
    await prisma.articleAnalyticsEvent.groupBy({
      by: [
        "articleId",
        "eventType",
      ],

      where: {
        createdAt: {
          gte: since,
        },

        eventType: {
          in: [
            "view",
            "read",
          ],
        },

        article: articleFilter,
      },

      _count: {
        _all: true,
      },
    });

  ////////////////////////////////////////////////////////////
  // BUILD ARTICLE SCORES
  ////////////////////////////////////////////////////////////

  const scores =
    new Map<
      string,
      {
        views: number;
        reads: number;
        score: number;
      }
    >();

  for (const group of eventGroups) {
    const articleId =
      group.articleId;

    const count =
      group._count._all;

    const current =
      scores.get(articleId) ?? {
        views: 0,
        reads: 0,
        score: 0,
      };

    if (
      group.eventType === "view"
    ) {
      current.views += count;

      current.score += count;
    }

    if (
      group.eventType === "read"
    ) {
      current.reads += count;

      // A completed/read engagement
      // is stronger than a simple page view.
      current.score +=
        count * 2;
    }

    scores.set(
      articleId,
      current
    );
  }

  ////////////////////////////////////////////////////////////
  // NO EVENTS
  ////////////////////////////////////////////////////////////

  if (scores.size === 0) {
    return [];
  }

  ////////////////////////////////////////////////////////////
  // SORT BY ANALYTICS SCORE
  ////////////////////////////////////////////////////////////

  const rankedIds =
    Array.from(
      scores.entries()
    )
      .sort(
        (a, b) =>
          b[1].score -
          a[1].score
      )
      .slice(0, limit)
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
  // RESTORE ANALYTICS RANKING ORDER
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

      const analytics =
        scores.get(
          articleId
        );

      return {
        ...article,

        analyticsScore:
          analytics?.score ?? 0,
      };
    })
    .filter(
      (
        article
      ): article is MostReadArticle =>
        article !== null
    );
}

//////////////////////////////////////////////////////////////
// MOST READ — LAST 24 HOURS
//////////////////////////////////////////////////////////////

export async function getMostRead24Hours(
  limit = 10
) {
  return getMostRead({
    days: 1,
    limit,
  });
}

//////////////////////////////////////////////////////////////
// MOST READ — LAST 7 DAYS
//////////////////////////////////////////////////////////////

export async function getMostRead7Days(
  limit = 10
) {
  return getMostRead({
    days: 7,
    limit,
  });
}

//////////////////////////////////////////////////////////////
// MOST READ — NEWS
//////////////////////////////////////////////////////////////

export async function getMostReadNews(
  options: Omit<
    MostReadOptions,
    "contentType"
  > = {}
) {
  return getMostRead({
    ...options,

    contentType: "news",
  });
}

//////////////////////////////////////////////////////////////
// MOST READ — EDITORIAL
//////////////////////////////////////////////////////////////

export async function getMostReadEditorial(
  options: Omit<
    MostReadOptions,
    "contentType"
  > = {}
) {
  return getMostRead({
    ...options,

    contentType: "editorial",
  });
}

//////////////////////////////////////////////////////////////
// MOST READ — ASTRO
//////////////////////////////////////////////////////////////

export async function getMostReadAstro(
  options: Omit<
    MostReadOptions,
    "contentType"
  > = {}
) {
  return getMostRead({
    ...options,

    contentType: "astro",
  });
}