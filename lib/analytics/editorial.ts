//////////////////////////////////////////////////////////////
// NATIONPATH ANALYTICS
// EDITORIAL ANALYTICS SERVICE
//
// Responsibilities:
// - Editorial content analytics
// - Editorial engagement tracking
// - Editorial dashboard summaries
// - Top editorial content
//
// IMPORTANT:
// - Uses central ArticleAnalyticsEvent
// - Does NOT create a separate Editorial analytics collection
// - Editorial content is identified by Article.isEditorial === true
// - Keeps Editorial analytics independent from News and Astro
//////////////////////////////////////////////////////////////

import { prisma } from "@/lib/prisma";

//////////////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////////////

export type EditorialAnalyticsEventType =
  | "view"
  | "open"
  | "read"
  | "scroll"
  | "like"
  | "reaction"
  | "share"
  | "video_play"
  | "video_complete";

export interface EditorialEventInput {
  articleId: string;

  eventType: EditorialAnalyticsEventType;

  userId?: string;

  sessionId?: string;

  path?: string;

  source?: string;

  referrer?: string;

  metadata?: Record<string, unknown>;
}

//////////////////////////////////////////////////////////////
// RECORD EDITORIAL EVENT
//////////////////////////////////////////////////////////////

export async function recordEditorialEvent(
  input: EditorialEventInput
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

  if (!articleId) {
    throw new Error("articleId is required");
  }

  if (!eventType) {
    throw new Error("eventType is required");
  }

  ////////////////////////////////////////////////////////////
  // VERIFY EDITORIAL ARTICLE
  ////////////////////////////////////////////////////////////

  const article =
    await prisma.article.findFirst({
      where: {
        id: articleId,
        isDeleted: false,
        isEditorial: true,
      },

      select: {
        id: true,
        isEditorial: true,
      },
    });

  if (!article) {
    throw new Error(
      "Editorial article not found"
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
                JSON.stringify(metadata)
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
  // Keep the existing Article counters synchronized.
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

        lastViewAt: new Date(),

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

  return event;
}

//////////////////////////////////////////////////////////////
// RECORD EDITORIAL VIEW
//////////////////////////////////////////////////////////////

export async function recordEditorialView(
  articleId: string,
  options?: Omit<
    EditorialEventInput,
    "articleId" | "eventType"
  >
) {
  return recordEditorialEvent({
    articleId,

    eventType: "view",

    ...options,
  });
}

//////////////////////////////////////////////////////////////
// RECORD EDITORIAL OPEN
//////////////////////////////////////////////////////////////

export async function recordEditorialOpen(
  articleId: string,
  options?: Omit<
    EditorialEventInput,
    "articleId" | "eventType"
  >
) {
  return recordEditorialEvent({
    articleId,

    eventType: "open",

    ...options,
  });
}

//////////////////////////////////////////////////////////////
// RECORD EDITORIAL READ
//////////////////////////////////////////////////////////////

export async function recordEditorialRead(
  articleId: string,
  options?: Omit<
    EditorialEventInput,
    "articleId" | "eventType"
  >
) {
  return recordEditorialEvent({
    articleId,

    eventType: "read",

    ...options,
  });
}

//////////////////////////////////////////////////////////////
// RECORD EDITORIAL SCROLL
//////////////////////////////////////////////////////////////

export async function recordEditorialScroll(
  articleId: string,
  options?: Omit<
    EditorialEventInput,
    "articleId" | "eventType"
  >
) {
  return recordEditorialEvent({
    articleId,

    eventType: "scroll",

    ...options,
  });
}

//////////////////////////////////////////////////////////////
// RECORD EDITORIAL LIKE
//////////////////////////////////////////////////////////////

export async function recordEditorialLike(
  articleId: string,
  options?: Omit<
    EditorialEventInput,
    "articleId" | "eventType"
  >
) {
  return recordEditorialEvent({
    articleId,

    eventType: "like",

    ...options,
  });
}

//////////////////////////////////////////////////////////////
// RECORD EDITORIAL SHARE
//////////////////////////////////////////////////////////////

export async function recordEditorialShare(
  articleId: string,
  options?: Omit<
    EditorialEventInput,
    "articleId" | "eventType"
  >
) {
  return recordEditorialEvent({
    articleId,

    eventType: "share",

    ...options,
  });
}

//////////////////////////////////////////////////////////////
// EDITORIAL ANALYTICS SUMMARY
//////////////////////////////////////////////////////////////

export async function getEditorialAnalyticsSummary(
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
  // EVENT AGGREGATION
  ////////////////////////////////////////////////////////////

  const events =
    await prisma.articleAnalyticsEvent.groupBy({
      by: ["eventType"],

      where: {
        createdAt: {
          gte: since,
        },

        article: {
          isEditorial: true,
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

  return {
    days,
    since,
    summary,
  };
}

//////////////////////////////////////////////////////////////
// TOP EDITORIAL CONTENT
//////////////////////////////////////////////////////////////

export async function getTopEditorialContent(
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

  const articles =
    await prisma.article.findMany({
      where: {
        isEditorial: true,

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

        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

  return articles;
}