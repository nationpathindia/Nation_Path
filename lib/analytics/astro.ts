//////////////////////////////////////////////////////////////
// NATIONPATH ANALYTICS
// ASTRO ANALYTICS SERVICE
//
// Responsibilities:
// - Astro content analytics
// - Astro article/content events
// - Astro engagement tracking
// - Astro dashboard aggregation helpers
//
// Architecture:
// - Uses central ArticleAnalyticsEvent structure
// - Does NOT create a separate Astro analytics collection
// - Uses existing Article + Analytics architecture
// - Astro content is identified by Article.isAstrology
// - No comment-system dependency
//////////////////////////////////////////////////////////////

import { prisma } from "@/lib/prisma";

//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

export type AstroAnalyticsEventType =
  | "view"
  | "open"
  | "read"
  | "scroll"
  | "like"
  | "reaction"
  | "share"
  | "video_play"
  | "video_complete";

export interface AstroEventInput {
  articleId: string;

  eventType: AstroAnalyticsEventType;

  userId?: string;

  sessionId?: string;

  path?: string;

  source?: string;

  referrer?: string;

  metadata?: Record<string, unknown>;
}

//////////////////////////////////////////////////////////////
// RECORD ASTRO EVENT
//////////////////////////////////////////////////////////////

export async function recordAstroEvent(
  input: AstroEventInput
) {
  const {
    articleId,
    eventType,
    userId,
    sessionId,
    path,
    source,
    referrer,
    metadata,
  } = input;

  ////////////////////////////////////////////////////////////
  // VALIDATION
  ////////////////////////////////////////////////////////////

  if (!articleId) {
    throw new Error(
      "articleId is required"
    );
  }

  if (!eventType) {
    throw new Error(
      "eventType is required"
    );
  }

  ////////////////////////////////////////////////////////////
  // VERIFY ASTRO ARTICLE
  ////////////////////////////////////////////////////////////

  const article =
    await prisma.article.findFirst({
      where: {
        id: articleId,
        isDeleted: false,
        isAstrology: true,
      },

      select: {
        id: true,
        isAstrology: true,
      },
    });

  if (!article) {
    throw new Error(
      "Astro article not found"
    );
  }

  ////////////////////////////////////////////////////////////
  // CREATE CENTRAL ANALYTICS EVENT
  ////////////////////////////////////////////////////////////

  const event =
    await prisma.articleAnalyticsEvent.create({
      data: {
        articleId,

        eventType,

        userId:
          userId || undefined,

        sessionId:
          sessionId || undefined,

        path:
          path || undefined,

        source:
          source || undefined,

        referrer:
          referrer || undefined,

        metadata:
          metadata
            ? JSON.parse(
                JSON.stringify(
                  metadata
                )
              )
            : undefined,
      },

      select: {
        id: true,
        articleId: true,
        eventType: true,
        createdAt: true,
      },
    });

  ////////////////////////////////////////////////////////////
  // ARTICLE AGGREGATES
  //
  // Raw analytics events remain the detailed source.
  // Article counters are maintained for fast reads.
  ////////////////////////////////////////////////////////////

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

  ////////////////////////////////////////////////////////////
  // LIKE
  ////////////////////////////////////////////////////////////

  if (eventType === "like") {
    await prisma.article.update({
      where: {
        id: articleId,
      },

      data: {
        likes: {
          increment: 1,
        },
      },
    });
  }

  ////////////////////////////////////////////////////////////
  // SHARE
  ////////////////////////////////////////////////////////////

  if (eventType === "share") {
    await prisma.article.update({
      where: {
        id: articleId,
      },

      data: {
        shares: {
          increment: 1,
        },
      },
    });
  }

  ////////////////////////////////////////////////////////////
  // RETURN CREATED EVENT
  ////////////////////////////////////////////////////////////

  return event;
}

//////////////////////////////////////////////////////////////
// RECORD ASTRO VIEW
//////////////////////////////////////////////////////////////

export async function recordAstroView(
  articleId: string,
  options?: Omit<
    AstroEventInput,
    "articleId" | "eventType"
  >
) {
  return recordAstroEvent({
    articleId,
    eventType: "view",
    ...options,
  });
}

//////////////////////////////////////////////////////////////
// RECORD ASTRO OPEN
//////////////////////////////////////////////////////////////

export async function recordAstroOpen(
  articleId: string,
  options?: Omit<
    AstroEventInput,
    "articleId" | "eventType"
  >
) {
  return recordAstroEvent({
    articleId,
    eventType: "open",
    ...options,
  });
}

//////////////////////////////////////////////////////////////
// RECORD ASTRO READ
//////////////////////////////////////////////////////////////

export async function recordAstroRead(
  articleId: string,
  options?: Omit<
    AstroEventInput,
    "articleId" | "eventType"
  >
) {
  return recordAstroEvent({
    articleId,
    eventType: "read",
    ...options,
  });
}

//////////////////////////////////////////////////////////////
// RECORD ASTRO SCROLL
//////////////////////////////////////////////////////////////

export async function recordAstroScroll(
  articleId: string,
  options?: Omit<
    AstroEventInput,
    "articleId" | "eventType"
  >
) {
  return recordAstroEvent({
    articleId,
    eventType: "scroll",
    ...options,
  });
}

//////////////////////////////////////////////////////////////
// RECORD ASTRO LIKE
//////////////////////////////////////////////////////////////

export async function recordAstroLike(
  articleId: string,
  options?: Omit<
    AstroEventInput,
    "articleId" | "eventType"
  >
) {
  return recordAstroEvent({
    articleId,
    eventType: "like",
    ...options,
  });
}

//////////////////////////////////////////////////////////////
// RECORD ASTRO SHARE
//////////////////////////////////////////////////////////////

export async function recordAstroShare(
  articleId: string,
  options?: Omit<
    AstroEventInput,
    "articleId" | "eventType"
  >
) {
  return recordAstroEvent({
    articleId,
    eventType: "share",
    ...options,
  });
}

//////////////////////////////////////////////////////////////
// ASTRO ANALYTICS SUMMARY
//////////////////////////////////////////////////////////////

export async function getAstroAnalyticsSummary(
  options?: {
    days?: number;
  }
) {
  const days =
    options?.days ?? 30;

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
  // CENTRAL ARTICLE EVENTS
  ////////////////////////////////////////////////////////////

  const events =
    await prisma.articleAnalyticsEvent.groupBy({
      by: ["eventType"],

      where: {
        createdAt: {
          gte: since,
        },

        article: {
          isAstrology: true,
          isDeleted: false,
        },
      },

      _count: {
        _all: true,
      },
    });

  ////////////////////////////////////////////////////////////
  // SUMMARY
  ////////////////////////////////////////////////////////////

  const summary = {
    views: 0,
    opens: 0,
    reads: 0,
    scrolls: 0,
    likes: 0,
    shares: 0,
    reactions: 0,
    videoPlays: 0,
    videoCompletes: 0,
  };

  for (const event of events) {
    const count =
      event._count._all;

    switch (event.eventType) {
      case "view":
        summary.views += count;
        break;

      case "open":
        summary.opens += count;
        break;

      case "read":
        summary.reads += count;
        break;

      case "scroll":
        summary.scrolls += count;
        break;

      case "like":
        summary.likes += count;
        break;

      case "share":
        summary.shares += count;
        break;

      case "reaction":
        summary.reactions += count;
        break;

      case "video_play":
        summary.videoPlays += count;
        break;

      case "video_complete":
        summary.videoCompletes += count;
        break;
    }
  }

  ////////////////////////////////////////////////////////////
  // RETURN SUMMARY
  ////////////////////////////////////////////////////////////

  return {
    days,
    since,
    summary,
  };
}

//////////////////////////////////////////////////////////////
// TOP ASTRO CONTENT
//////////////////////////////////////////////////////////////

export async function getTopAstroContent(
  options?: {
    days?: number;
    limit?: number;
  }
) {
  const days =
    options?.days ?? 30;

  const limit =
    options?.limit ?? 10;

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
  // TOP ASTRO ARTICLES
  ////////////////////////////////////////////////////////////

  const articles =
    await prisma.article.findMany({
      where: {
        isAstrology: true,

        isDeleted: false,

        status: "approved",

        createdAt: {
          gte: since,
        },
      },

      orderBy: [
        {
          views: "desc",
        },

        {
          trendingScore: "desc",
        },
      ],

      take: limit,

      select: {
        id: true,

        title: true,

        slug: true,

        views: true,

        likes: true,

        shares: true,

        trendingScore: true,

        createdAt: true,

        zodiacSign: true,

        horoscopeDate: true,

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
  // RETURN
  ////////////////////////////////////////////////////////////

  return articles;
}

