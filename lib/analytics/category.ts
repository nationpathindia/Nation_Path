//////////////////////////////////////////////////////////////
// NATIONPATH ANALYTICS
// CATEGORY ANALYTICS
//
// Canonical category-level analytics queries.
//
// Responsibilities:
// - Category views
// - Category engagement
// - Trending categories/topics
// - Time-window based ranking
// - Editorial + Astrology compatible
// - Safe category fallback when event volume is zero
//
// IMPORTANT:
// - Uses shared analytics utilities from ./events
// - No duplicate event weights
// - No UI logic
// - Does not modify Category
//////////////////////////////////////////////////////////////

import { prisma } from "@/lib/prisma";

import type {
  AnalyticsTimeRange,
} from "./types";

import {
  getAnalyticsStartDate,
  getAnalyticsEndDate,
  getEventWeight,
} from "./events";

//////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////

function buildTimeFilter(
  range: AnalyticsTimeRange = "24h"
) {
  const startDate =
    getAnalyticsStartDate(range);

  if (!startDate) {
    return undefined;
  }

  return {
    gte: startDate,
    lte: getAnalyticsEndDate(),
  };
}

//////////////////////////////////////////////////////////////
// RESULT
//////////////////////////////////////////////////////////////

export interface TrendingCategoryItem {
  id: string;
  name: string;
  slug: string;
  score: number;
}

//////////////////////////////////////////////////////////////
// NORMALIZE LIMIT
//////////////////////////////////////////////////////////////

function normalizeLimit(
  limit: number
): number {
  return Number.isFinite(limit)
    ? Math.max(
        1,
        Math.min(
          100,
          Math.floor(limit)
        )
      )
    : 10;
}

//////////////////////////////////////////////////////////////
// TRENDING CATEGORIES
//////////////////////////////////////////////////////////////
//
// IMPORTANT:
//
// This function MUST return real categories even when
// the selected analytics window contains zero events.
//
// Ranking priority:
//
// 1. Direct category analytics events
// 2. Article analytics events mapped to categories
// 3. Legacy article counters
// 4. Category table itself as zero-score fallback
//
// Therefore the dashboard can display actual categories
// instead of incorrectly showing an empty state.
//

export async function getTrendingCategories(
  range: AnalyticsTimeRange = "24h",
  limit = 10
): Promise<TrendingCategoryItem[]> {
  const createdAt =
    buildTimeFilter(range);

  const normalizedLimit =
    normalizeLimit(limit);

  ////////////////////////////////////////////////////////////
  // LOAD REAL CATEGORIES FIRST
  ////////////////////////////////////////////////////////////

  const categories =
    await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
      },

      orderBy: {
        name: "asc",
      },

      take: 100,
    });

  ////////////////////////////////////////////////////////////
  // NO CATEGORIES IN DATABASE
  ////////////////////////////////////////////////////////////

  if (!categories.length) {
    return [];
  }

  ////////////////////////////////////////////////////////////
  // CATEGORY EVENTS
  ////////////////////////////////////////////////////////////

  const categoryEvents =
    await prisma.categoryAnalyticsEvent.groupBy({
      by: [
        "categoryId",
        "eventType",
      ],

      where: {
        ...(createdAt
          ? {
              createdAt,
            }
          : {}),
      },

      _count: {
        categoryId: true,
      },
    });

  ////////////////////////////////////////////////////////////
  // ARTICLE EVENTS
  ////////////////////////////////////////////////////////////

  const articleEvents =
    await prisma.articleAnalyticsEvent.groupBy({
      by: [
        "articleId",
        "eventType",
      ],

      where: {
        ...(createdAt
          ? {
              createdAt,
            }
          : {}),
      },

      _count: {
        articleId: true,
      },
    });

  ////////////////////////////////////////////////////////////
  // ARTICLE IDS
  ////////////////////////////////////////////////////////////

  const articleIds = [
    ...new Set(
      articleEvents
        .map(
          (event) =>
            event.articleId
        )
        .filter(Boolean)
    ),
  ];

  ////////////////////////////////////////////////////////////
  // ARTICLE → CATEGORY MAP
  ////////////////////////////////////////////////////////////

  const articles =
    articleIds.length
      ? await prisma.article.findMany({
          where: {
            id: {
              in: articleIds,
            },

            isDeleted: false,

            categoryId: {
              not: null,
            },
          },

          select: {
            id: true,
            categoryId: true,
          },
        })
      : [];

  const articleCategoryMap =
    new Map<string, string>();

  for (const article of articles) {
    if (article.categoryId) {
      articleCategoryMap.set(
        article.id,
        article.categoryId
      );
    }
  }

  ////////////////////////////////////////////////////////////
  // VALID CATEGORY IDS
  ////////////////////////////////////////////////////////////

  const validCategoryIds =
    new Set(
      categories.map(
        (category) =>
          category.id
      )
    );

  ////////////////////////////////////////////////////////////
  // SCORES
  ////////////////////////////////////////////////////////////

  const scores =
    new Map<string, number>();

  ////////////////////////////////////////////////////////////
  // DIRECT CATEGORY EVENTS
  ////////////////////////////////////////////////////////////

  for (const event of categoryEvents) {
    if (
      !validCategoryIds.has(
        event.categoryId
      )
    ) {
      continue;
    }

    const weight =
      getEventWeight(
        event.eventType as Parameters<
          typeof getEventWeight
        >[0]
      );

    if (weight === 0) {
      continue;
    }

    const score =
      event._count.categoryId *
      weight;

    scores.set(
      event.categoryId,
      (scores.get(
        event.categoryId
      ) ?? 0) + score
    );
  }

  ////////////////////////////////////////////////////////////
  // ARTICLE EVENTS → CATEGORY
  ////////////////////////////////////////////////////////////

  for (const event of articleEvents) {
    const categoryId =
      articleCategoryMap.get(
        event.articleId
      );

    if (
      !categoryId ||
      !validCategoryIds.has(
        categoryId
      )
    ) {
      continue;
    }

    const weight =
      getEventWeight(
        event.eventType as Parameters<
          typeof getEventWeight
        >[0]
      );

    if (weight === 0) {
      continue;
    }

    const score =
      event._count.articleId *
      weight;

    scores.set(
      categoryId,
      (scores.get(
        categoryId
      ) ?? 0) + score
    );
  }

  ////////////////////////////////////////////////////////////
  // FALLBACK SCORE
  ////////////////////////////////////////////////////////////
  //
  // Categories with no analytics activity remain at score 0.
  //
  // This is intentional.
  //
  // We DO NOT invent analytics.
  //

  for (const category of categories) {
    if (!scores.has(category.id)) {
      scores.set(
        category.id,
        0
      );
    }
  }

  ////////////////////////////////////////////////////////////
  // RANK
  ////////////////////////////////////////////////////////////

  return categories
    .map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      score:
        scores.get(
          category.id
        ) ?? 0,
    }))
    .sort((a, b) => {
      // Highest actual analytics score first.
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      // Stable deterministic fallback.
      return a.name.localeCompare(
        b.name
      );
    })
    .slice(
      0,
      normalizedLimit
    );
}

//////////////////////////////////////////////////////////////
// CATEGORY PERFORMANCE
//////////////////////////////////////////////////////////////

export async function getCategoryPerformance(
  categoryId: string,
  range: AnalyticsTimeRange = "24h"
) {
  const createdAt =
    buildTimeFilter(range);

  const events =
    await prisma.categoryAnalyticsEvent.groupBy({
      by: [
        "eventType",
      ],

      where: {
        categoryId,

        ...(createdAt
          ? {
              createdAt,
            }
          : {}),
      },

      _count: {
        eventType: true,
      },
    });

  const result: Record<
    string,
    number
  > = {};

  for (const event of events) {
    result[event.eventType] =
      event._count.eventType;
  }

  return {
    categoryId,

    range,

    events: result,

    total:
      Object.values(result).reduce(
        (sum, value) =>
          sum + value,
        0
      ),
  };
}

//////////////////////////////////////////////////////////////
// CATEGORY VIEW COUNT
//////////////////////////////////////////////////////////////

export async function getCategoryViews(
  categoryId: string,
  range: AnalyticsTimeRange = "24h"
): Promise<number> {
  const createdAt =
    buildTimeFilter(range);

  return prisma.categoryAnalyticsEvent.count({
    where: {
      categoryId,

      eventType: "view",

      ...(createdAt
        ? {
            createdAt,
          }
        : {}),
    },
  });
}