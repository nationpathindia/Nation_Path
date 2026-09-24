import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Parser from 'rss-parser';

const parser = new Parser();

const MAX_TOPIC_ITEMS = 15;
const TOPIC_SOURCE_URL = 'https://virtual-topic-search';

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    if (
      typeof topic !== 'string' ||
      !topic.trim()
    ) {
      return NextResponse.json(
        { error: 'Topic required' },
        { status: 400 }
      );
    }

    const normalizedTopic = topic.trim();

    console.log(
      `🔍 Fetching news for topic: "${normalizedTopic}"`
    );

    const searchQuery =
      encodeURIComponent(normalizedTopic);

    const feed = await parser.parseURL(
      `https://news.google.com/rss/search?q=${searchQuery}&hl=en-IN&gl=IN&ceid=IN:en`
    );

    let addedCount = 0;
    let duplicateCount = 0;
    let oldCount = 0;

    const last24Hours = new Date(
      Date.now() - 24 * 60 * 60 * 1000
    );

    for (const item of feed.items) {
      if (addedCount >= MAX_TOPIC_ITEMS) {
        console.log(
          `🛑 Reached topic limit of ${MAX_TOPIC_ITEMS}.`
        );
        break;
      }

      const link =
        item.link ||
        item.guid ||
        '';

      if (!link) {
        continue;
      }

      const existing =
        await prisma.ingestedFeed.findUnique({
          where: {
            sourceUrl: link,
          },
          select: {
            id: true,
          },
        });

      if (existing) {
        duplicateCount++;
        continue;
      }

      const pubDate = item.pubDate
        ? new Date(item.pubDate)
        : new Date();

      if (
        Number.isNaN(pubDate.getTime()) ||
        pubDate < last24Hours
      ) {
        oldCount++;
        continue;
      }

      const title =
        cleanText(item.title || 'Untitled');

      const description =
        cleanText(
          item.contentSnippet ||
            item.content ||
            item.summary ||
            ''
        ) || title;

      const topicWords =
        extractTopicWords(normalizedTopic);

      const textToCheck = (
        `${title} ${description}`
      ).toLowerCase();

      const matchedKeywords =
        topicWords.filter((word) =>
          textToCheck.includes(
            word.toLowerCase()
          )
        );

      const priorityScore =
        calculatePriorityScore(
          title,
          description,
          matchedKeywords.length
        );

      const trendingScore =
        calculateTrendingScore(
          title,
          description,
          priorityScore,
          matchedKeywords.length
        );

      const popularityScore =
        calculatePopularityScore(
          title,
          description,
          priorityScore,
          matchedKeywords.length
        );

      const clusterKey =
        createClusterKey(title);

      const sourceName =
        extractGoogleNewsSource(
          item.title || ''
        );

      await prisma.ingestedFeed.create({
        data: {
          title,

          description:
            description.substring(0, 4000),

          sourceUrl: link,

          imageUrl:
            (item as any).enclosure?.url ||
            null,

          priorityScore,

          trendingScore,

          popularityScore,

          coverageCount: 1,

          sourceCount: 1,

          clusterKey,

          firstDetectedAt: new Date(),

          lastDetectedAt: new Date(),

          keywords:
            matchedKeywords.length > 0
              ? matchedKeywords.slice(0, 8)
              : topicWords.slice(0, 8),

          status: 'pending',

          publishedAt: pubDate,

          fetchedAt: new Date(),

          source: {
            connectOrCreate: {
              where: {
                rssUrl:
                  TOPIC_SOURCE_URL,
              },

              create: {
                name:
                  sourceName ||
                  'Trending Topic Search',

                category: 'Trending',

                rssUrl:
                  TOPIC_SOURCE_URL,
              },
            },
          },
        },
      });

      addedCount++;
    }

    console.log(
      `✅ Topic ingestion completed: ` +
        `${addedCount} added, ` +
        `${duplicateCount} duplicates, ` +
        `${oldCount} old items`
    );

    return NextResponse.json({
      success: true,

      added: addedCount,

      duplicates: duplicateCount,

      skippedOld: oldCount,

      topic: normalizedTopic,

      message:
        `Found ${addedCount} news items for "${normalizedTopic}"`,
    });
  } catch (error) {
    console.error(
      '❌ Topic ingestion failed:',
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch topic news',
      },
      { status: 500 }
    );
  }
}

function extractTopicWords(
  topic: string
): string[] {
  const stopWords = new Set([
    'the',
    'and',
    'for',
    'with',
    'from',
    'into',
    'about',
    'latest',
    'news',
    'update',
    'updates',
    'india',
    'indian',
  ]);

  return Array.from(
    new Set(
      topic
        .toLowerCase()
        .replace(
          /[^\p{L}\p{N}\s-]/gu,
          ' '
        )
        .split(/\s+/)
        .filter(
          (word) =>
            word.length > 3 &&
            !stopWords.has(word)
        )
    )
  ).slice(0, 8);
}

function calculatePriorityScore(
  title: string,
  description: string,
  keywordMatches: number
): number {
  const text = (
    `${title} ${description}`
  ).toLowerCase();

  let score = 50;

  score +=
    Math.min(
      keywordMatches * 7,
      28
    );

  const prioritySignals = [
    'breaking',
    'exclusive',
    'urgent',
    'supreme court',
    'government',
    'parliament',
    'election',
    'budget',
    'prime minister',
    'president',
    'attack',
    'earthquake',
    'cyclone',
    'major',
  ];

  for (const signal of prioritySignals) {
    if (text.includes(signal)) {
      score += 4;
    }
  }

  return Math.min(100, score);
}

function calculateTrendingScore(
  title: string,
  description: string,
  priorityScore: number,
  keywordMatches: number
): number {
  const text = (
    `${title} ${description}`
  ).toLowerCase();

  let score =
    Math.round(
      priorityScore * 0.75
    );

  score +=
    Math.min(
      keywordMatches * 3,
      15
    );

  const trendSignals = [
    'breaking',
    'live',
    'developing',
    'just in',
    'latest',
    'alert',
  ];

  for (const signal of trendSignals) {
    if (text.includes(signal)) {
      score += 4;
    }
  }

  return Math.min(100, score);
}

function calculatePopularityScore(
  title: string,
  description: string,
  priorityScore: number,
  keywordMatches: number
): number {
  const text = (
    `${title} ${description}`
  ).toLowerCase();

  let score =
    Math.round(
      priorityScore * 0.7
    );

  score +=
    Math.min(
      keywordMatches * 4,
      20
    );

  const interestSignals = [
    'prime minister',
    'president',
    'supreme court',
    'election',
    'cricket',
    'bollywood',
    'market',
    'stock',
    'technology',
    'artificial intelligence',
    'ai',
    'isro',
  ];

  for (const signal of interestSignals) {
    if (text.includes(signal)) {
      score += 3;
    }
  }

  return Math.min(100, score);
}

function createClusterKey(
  title: string
): string {
  const stopWords = new Set([
    'the',
    'and',
    'for',
    'with',
    'from',
    'into',
    'after',
    'over',
    'says',
    'said',
    'will',
    'has',
    'have',
    'this',
    'that',
    'about',
    'latest',
    'update',
    'updates',
    'breaking',
    'india',
    'indian',
  ]);

  const words = title
    .toLowerCase()
    .replace(
      /[^\p{L}\p{N}\s-]/gu,
      ' '
    )
    .split(/\s+/)
    .filter(
      (word) =>
        word.length >= 4 &&
        !stopWords.has(word)
    );

  return Array.from(
    new Set(words)
  )
    .slice(0, 8)
    .sort()
    .join('-')
    .substring(0, 180);
}

function extractGoogleNewsSource(
  title: string
): string | null {
  const parts = title.split(
    /\s[-–—]\s/
  );

  if (parts.length < 2) {
    return null;
  }

  const source =
    parts[parts.length - 1]
      ?.trim();

  if (
    !source ||
    source.length > 100
  ) {
    return null;
  }

  return source;
}

function cleanText(
  text: string
): string {
  return text
    .replace(
      /<!\[CDATA\[([\s\S]*?)\]\]>/g,
      '$1'
    )
    .replace(
      /<[^>]+>/g,
      ' '
    )
    .replace(
      /&amp;/g,
      '&'
    )
    .replace(
      /&quot;/g,
      '"'
    )
    .replace(
      /&#39;/g,
      "'"
    )
    .replace(
      /&lt;/g,
      '<'
    )
    .replace(
      /&gt;/g,
      '>'
    )
    .replace(
      /\s+/g,
      ' '
    )
    .trim();
}