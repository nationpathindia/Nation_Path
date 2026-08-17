import { prisma } from "@/lib/prisma";

import type { AnalyticsTimeRange } from "./types";

/* =====================================================
   NATIONPATH ANALYTICS
   TOPIC ANALYTICS SERVICE

   Canonical topic-level analytics.

   Source:
   - Article.tags[]

   Ranking:
   - ArticleAnalyticsEvent

   Supports:
   - News
   - Editorial
   - Astrology

   IMPORTANT:
   - Topics are NOT categories.
   - Topics come from Article.tags.
   - No separate topic collection is created.
   - No Article records are modified.
   - No analytics events are created here.
===================================================== */

/* =====================================================
   RANGE CONFIG
===================================================== */

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

/* =====================================================
   EVENT WEIGHTS
===================================================== */

const EVENT_WEIGHTS: Record<string, number> = {
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

/* =====================================================
   TYPES
===================================================== */

export interface TopicAnalyticsItem {
  id: string;
  name: string;
  slug: string;
  score: number;
  articles: number;
  views: number;
  reads: number;
  shares: number;
}

/* =====================================================
   HELPERS
===================================================== */

/**
 * Returns null for "all".
 *
 * This is important because "all" should not accidentally
 * become a very large/zero time window.
 */
function getSince(
  range: AnalyticsTimeRange
): Date | null {
  if (range === "all") {
    return null;
  }

  const hours =
    RANGE_HOURS[range] ??
    RANGE_HOURS["24h"];

  if (!hours) {
    return null;
  }

  return new Date(
    Date.now() -
      hours *
        60 *
        60 *
        1000
  );
}

/* =====================================================
   TOPIC NORMALIZATION
===================================================== */

function normalizeTopic(
  value: string
): string {
  return value
    .trim()
    .replace(/\s+/g, " ");
}

/**
 * Canonical comparison key.
 *
 * Example:
 * "India Budget"
 * "india budget"
 * " INDIA   BUDGET "
 *
 * all resolve to:
 * "india budget"
 */
function topicKey(
  value: string
): string {
  return normalizeTopic(value)
    .toLowerCase();
}

/* =====================================================
   TOPIC SLUG
===================================================== */

function topicSlug(
  value: string
): string {
  return topicKey(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* =====================================================
   DATE FILTER HELPER
===================================================== */

function createdAtFilter(
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

/* =====================================================
   TRENDING TOPICS
===================================================== */

export async function getTrendingTopics(
  range: AnalyticsTimeRange = "24h",
  limit = 10
): Promise<TopicAnalyticsItem[]> {
  const since = getSince(range);

  /* ---------------------------------------------
     ARTICLE EVENTS
  --------------------------------------------- */

  const events =
    await prisma.articleAnalyticsEvent.groupBy({
      by: [
        "articleId",
        "eventType",
      ],

      where: {
        ...createdAtFilter(since),
      },

      _count: {
        articleId: true,
      },
    });

  if (!events.length) {
    return [];
  }

  /* ---------------------------------------------
     ARTICLE IDS
  --------------------------------------------- */

  const articleIds = [
    ...new Set(
      events.map(
        (event) =>
          event.articleId
      )
    ),
  ];

  /* ---------------------------------------------
     ARTICLES + TAGS
  --------------------------------------------- */

  const articles =
    await prisma.article.findMany({
      where: {
        id: {
          in: articleIds,
        },

        isDeleted: false,
      },

      select: {
        id: true,
        tags: true,
      },
    });

  if (!articles.length) {
    return [];
  }

  /* ---------------------------------------------
     ARTICLE LOOKUP
  --------------------------------------------- */

  const articleMap =
    new Map(
      articles.map(
        (article) => [
          article.id,
          article,
        ]
      )
    );

  /* ---------------------------------------------
     TOPIC STATS
  --------------------------------------------- */

  type TopicStats = {
    name: string;
    slug: string;
    score: number;
    articles: Set<string>;
    views: number;
    reads: number;
    shares: number;
  };

  const topics =
    new Map<
      string,
      TopicStats
    >();

  /* ---------------------------------------------
     AGGREGATE EVENTS INTO TOPICS
  --------------------------------------------- */

  for (const event of events) {
    const article =
      articleMap.get(
        event.articleId
      );

    if (!article) {
      continue;
    }

    if (
      !Array.isArray(
        article.tags
      ) ||
      article.tags.length === 0
    ) {
      continue;
    }

    const count =
      event._count.articleId;

    const weight =
      EVENT_WEIGHTS[
        event.eventType
      ] ?? 0;

    if (weight === 0) {
      continue;
    }

    /*
     * Prevent duplicate tags on the same article
     * from multiplying the same event.
     */
    const uniqueTags =
      new Map<
        string,
        string
      >();

    for (
      const rawTag of article.tags
    ) {
      if (
        typeof rawTag !==
        "string"
      ) {
        continue;
      }

      const name =
        normalizeTopic(
          rawTag
        );

      if (!name) {
        continue;
      }

      const key =
        topicKey(name);

      if (!key) {
        continue;
      }

      if (
        !uniqueTags.has(key)
      ) {
        uniqueTags.set(
          key,
          name
        );
      }
    }

    for (
      const [
        key,
        name,
      ] of uniqueTags
    ) {
      const slug =
        topicSlug(name);

      if (!slug) {
        continue;
      }

      let stats =
        topics.get(key);

      if (!stats) {
        stats = {
          name,
          slug,
          score: 0,
          articles:
            new Set<string>(),
          views: 0,
          reads: 0,
          shares: 0,
        };

        topics.set(
          key,
          stats
        );
      }

      stats.articles.add(
        article.id
      );

      stats.score +=
        count * weight;

      if (
        event.eventType ===
        "view"
      ) {
        stats.views +=
          count;
      }

      if (
        event.eventType ===
        "read"
      ) {
        stats.reads +=
          count;
      }

      if (
        event.eventType ===
        "share"
      ) {
        stats.shares +=
          count;
      }
    }
  }

  /* ---------------------------------------------
     RANK
  --------------------------------------------- */

  return [
    ...topics.values(),
  ]
    .map((topic) => ({
      id: topic.slug,
      name: topic.name,
      slug: topic.slug,
      score: topic.score,
      articles:
        topic.articles.size,
      views: topic.views,
      reads: topic.reads,
      shares: topic.shares,
    }))
    .sort(
      (a, b) => {
        if (
          b.score !==
          a.score
        ) {
          return (
            b.score -
            a.score
          );
        }

        if (
          b.views !==
          a.views
        ) {
          return (
            b.views -
            a.views
          );
        }

        return (
          a.name.localeCompare(
            b.name
          )
        );
      }
    )
    .slice(
      0,
      Math.max(0, limit)
    );
}

/* =====================================================
   TOPIC PERFORMANCE
===================================================== */

export async function getTopicPerformance(
  topic: string,
  range: AnalyticsTimeRange = "24h"
) {
  const since =
    getSince(range);

  const normalizedTopic =
    normalizeTopic(topic);

  const key =
    topicKey(
      normalizedTopic
    );

  const slug =
    topicSlug(
      normalizedTopic
    );

  if (!key) {
    return {
      topic: "",
      slug: "",
      range,
      score: 0,
      articles: 0,
      views: 0,
      reads: 0,
      shares: 0,
    };
  }

  /* ---------------------------------------------
     FIND CANDIDATE ARTICLES
  --------------------------------------------- */

  const articles =
    await prisma.article.findMany({
      where: {
        isDeleted: false,

        tags: {
          has:
            normalizedTopic,
        },
      },

      select: {
        id: true,
        tags: true,
      },
    });

  /*
   * Prisma "has" is exact-match.
   *
   * Because older articles may contain different
   * casing/spacing, perform canonical matching
   * in TypeScript as well.
   */
  const matchingArticleIds =
    articles
      .filter(
        (article) =>
          Array.isArray(
            article.tags
          ) &&
          article.tags.some(
            (rawTag) =>
              typeof rawTag ===
                "string" &&
              topicKey(
                rawTag
              ) === key
          )
      )
      .map(
        (article) =>
          article.id
      );

  if (
    !matchingArticleIds.length
  ) {
    return {
      topic:
        normalizedTopic,
      slug,
      range,
      score: 0,
      articles: 0,
      views: 0,
      reads: 0,
      shares: 0,
    };
  }

  /* ---------------------------------------------
     EVENTS
  --------------------------------------------- */

  const events =
    await prisma.articleAnalyticsEvent.groupBy({
      by: ["eventType"],

      where: {
        articleId: {
          in:
            matchingArticleIds,
        },

        ...createdAtFilter(
          since
        ),
      },

      _count: {
        eventType: true,
      },
    });

  /* ---------------------------------------------
     AGGREGATE
  --------------------------------------------- */

  let score = 0;
  let views = 0;
  let reads = 0;
  let shares = 0;

  for (
    const event of events
  ) {
    const count =
      event._count
        .eventType;

    const weight =
      EVENT_WEIGHTS[
        event.eventType
      ] ?? 0;

    score +=
      count * weight;

    if (
      event.eventType ===
      "view"
    ) {
      views += count;
    }

    if (
      event.eventType ===
      "read"
    ) {
      reads += count;
    }

    if (
      event.eventType ===
      "share"
    ) {
      shares += count;
    }
  }

  return {
    topic:
      normalizedTopic,
    slug,
    range,
    score,
    articles:
      matchingArticleIds.length,
    views,
    reads,
    shares,
  };
}

/* =====================================================
   TOPIC LIST
===================================================== */

export async function getTopics(
  limit = 50
): Promise<
  Array<{
    name: string;
    slug: string;
  }>
> {
  const articles =
    await prisma.article.findMany({
      where: {
        isDeleted: false,
      },

      select: {
        tags: true,
      },
    });

  /*
   * key -> display name
   */
  const topics =
    new Map<
      string,
      string
    >();

  for (
    const article of articles
  ) {
    if (
      !Array.isArray(
        article.tags
      )
    ) {
      continue;
    }

    for (
      const rawTag of
        article.tags
    ) {
      if (
        typeof rawTag !==
        "string"
      ) {
        continue;
      }

      const name =
        normalizeTopic(
          rawTag
        );

      if (!name) {
        continue;
      }

      const key =
        topicKey(name);

      const slug =
        topicSlug(name);

      if (
        !key ||
        !slug
      ) {
        continue;
      }

      /*
       * Keep the first clean display name,
       * while matching remains case-insensitive.
       */
      if (
        !topics.has(key)
      ) {
        topics.set(
          key,
          name
        );
      }
    }
  }

  return [
    ...topics.entries(),
  ]
    .map(
      ([key, name]) => ({
        name,
        slug:
          topicSlug(name),
      })
    )
    .sort(
      (a, b) =>
        a.name.localeCompare(
          b.name
        )
    )
    .slice(
      0,
      Math.max(0, limit)
    );
}