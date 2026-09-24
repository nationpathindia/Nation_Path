import { prisma } from '@/lib/prisma';

const MAX_ITEMS_PER_RUN = 60;

const CATEGORY_MAPPING: Record<string, string> = {
  Cricket: 'Sports',
  Football: 'Sports',
  Tennis: 'Sports',
  Basketball: 'Sports',
  Hockey: 'Sports',
  Badminton: 'Sports',

  Bollywood: 'Entertainment',
  Movies: 'Entertainment',
  Music: 'Entertainment',
  'Web Series': 'Entertainment',

  Markets: 'Business',
  Stocks: 'Business',
  Economy: 'Business',

  Science: 'Technology',
  Space: 'Technology',
  Gadgets: 'Technology',
};

const RSS_FEEDS = [
  {
    url: 'https://feeds.bbci.co.uk/news/world/asia/india/rss.xml',
    sourceName: 'BBC India',
    category: 'India',
  },
  {
    url: 'https://indianexpress.com/section/india/feed/',
    sourceName: 'Indian Express',
    category: 'India',
  },
  {
    url: 'https://www.thehindu.com/news/national/feeder/default.rss',
    sourceName: 'The Hindu National',
    category: 'India',
  },
  {
    url: 'https://feeds.bbci.co.uk/news/world/rss.xml',
    sourceName: 'BBC World',
    category: 'World',
  },
  {
    url: 'https://www.aljazeera.com/xml/rss/all.xml',
    sourceName: 'Al Jazeera',
    category: 'World',
  },
  {
    url: 'https://www.livemint.com/rss/feeds',
    sourceName: 'LiveMint',
    category: 'Business',
  },
  {
    url: 'https://economictimes.indiatimes.com/markets/stocks/rssfeeds/2146842.cms',
    sourceName: 'ET Markets',
    category: 'Business',
  },
  {
    url: 'https://www.business-standard.com/rss/home_page_top_stories.rss',
    sourceName: 'Business Standard',
    category: 'Business',
  },
  {
    url: 'https://www.espncricinfo.com/rss/news',
    sourceName: 'ESPN Cricinfo',
    category: 'Sports',
  },
  {
    url: 'https://timesofindia.indiatimes.com/sports/rssfeeds/2146842.cms',
    sourceName: 'TOI Sports',
    category: 'Sports',
  },
  {
    url: 'https://www.thehindu.com/sport/cricket/feeder/default.rss',
    sourceName: 'The Hindu Cricket',
    category: 'Sports',
  },
  {
    url: 'https://www.bollywoodhungama.com/rss/news.xml',
    sourceName: 'Bollywood Hungama',
    category: 'Entertainment',
  },
  {
    url: 'https://www.hindustantimes.com/feeds/entertainment/rss',
    sourceName: 'HT Entertainment',
    category: 'Entertainment',
  },
  {
    url: 'https://www.thehindu.com/news/science/feeder/default.rss',
    sourceName: 'The Hindu Science',
    category: 'Technology',
  },
  {
    url: 'https://gadgets360.com/rss/feeds',
    sourceName: 'NDTV Gadgets',
    category: 'Technology',
  },
];

interface RSSItem {
  title: string;
  link: string;
  pubDate: string | null;
  description: string;
  imageUrl: string | null;
}

interface RSSFeedConfig {
  url: string;
  sourceName: string;
  category: string;
}

interface IngestionStats {
  sourcesChecked: number;
  storiesFound: number;
  newItems: number;
  duplicatesRemoved: number;
  clustersCreated: number;
  draftsCreated: number;
  errors: string[];
}

function mapCategory(rawCategory: string): string {
  const normalized = rawCategory.trim();
  return CATEGORY_MAPPING[normalized] || normalized || 'General';
}

/**
 * Main RSS ingestion pipeline.
 *
 * Important:
 * - No Tavily calls.
 * - No web search enrichment.
 * - RSS source material is stored as source material only.
 * - Nothing is auto-published.
 * - Existing ingested items are never duplicated by source URL.
 */
export async function fetchAndIngestRSS(trigger: 'manual' | 'cron' | 'scheduled' = 'manual') {
  const startedAt = new Date();

  const stats: IngestionStats = {
    sourcesChecked: 0,
    storiesFound: 0,
    newItems: 0,
    duplicatesRemoved: 0,
    clustersCreated: 0,
    draftsCreated: 0,
    errors: [],
  };

  let runId: string | null = null;

  try {
    const ingestionRun = await prisma.ingestionRun.create({
      data: {
        startedAt,
        status: 'running',
        trigger,
      },
    });

    runId = ingestionRun.id;

    console.log(
      `🔄 NationPath RSS ingestion started (${trigger})`
    );

    for (const feed of RSS_FEEDS) {
      if (stats.newItems >= MAX_ITEMS_PER_RUN) {
        console.log(
          `🛑 Reached maximum limit of ${MAX_ITEMS_PER_RUN} new items.`
        );
        break;
      }

      stats.sourcesChecked++;

      try {
        console.log(
          `📡 Fetching RSS: ${feed.sourceName} (${feed.category})`
        );

        const rssResponse = await fetch(feed.url, {
          headers: {
            'User-Agent': 'NationPathBot/1.0',
            Accept:
              'application/rss+xml, application/xml, text/xml, */*',
          },
          signal: AbortSignal.timeout(10000),
        });

        if (!rssResponse.ok) {
          const message =
            `${feed.sourceName}: HTTP ${rssResponse.status}`;

          console.error(`❌ ${message}`);
          stats.errors.push(message);
          continue;
        }

        const rssText = await rssResponse.text();
        const items = extractRssItems(rssText);

        stats.storiesFound += items.length;

        console.log(
          `   Found ${items.length} items in ${feed.sourceName}`
        );

        for (const item of items) {
          if (stats.newItems >= MAX_ITEMS_PER_RUN) {
            break;
          }

          try {
            const normalized = normalizeRSSItem(item);

            if (!normalized.link || !normalized.title) {
              continue;
            }

            /**
             * First-level duplicate detection:
             * exact source URL.
             */
            const existingByUrl =
              await prisma.ingestedFeed.findUnique({
                where: {
                  sourceUrl: normalized.link,
                },
                select: {
                  id: true,
                },
              });

            if (existingByUrl) {
              stats.duplicatesRemoved++;
              continue;
            }

            /**
             * Second-level duplicate detection:
             * same normalized story fingerprint.
             *
             * We intentionally use a lightweight cluster key rather
             * than external search. This keeps ingestion cheap and
             * deterministic.
             */
            const clusterKey = createClusterKey(
              normalized.title
            );

            const existingCluster =
              await prisma.ingestedFeed.findFirst({
                where: {
                  clusterKey,
                },
                select: {
                  id: true,
                  coverageCount: true,
                  sourceCount: true,
                },
                orderBy: {
                  fetchedAt: 'desc',
                },
              });

            const mappedCategory = mapCategory(feed.category);

            const priorityScore = calculatePriorityScore(
              normalized.title,
              normalized.description,
              mappedCategory
            );

            /**
             * New story.
             */
            if (!existingCluster) {
              await prisma.ingestedFeed.create({
                data: {
                  title: normalized.title,
                  description: normalized.description,
                  sourceUrl: normalized.link,
                  imageUrl: normalized.imageUrl,

                  publishedAt:
                    normalized.pubDate || new Date(),

                  fetchedAt: new Date(),

                  status: 'pending',

                  priorityScore,

                  keywords: extractKeywords(
                    normalized.title
                  ),

                  trendingScore: calculateTrendingScore(
                    normalized.title,
                    normalized.description,
                    priorityScore
                  ),

                  popularityScore:
                    calculatePopularityScore(
                      normalized.title,
                      normalized.description,
                      priorityScore
                    ),

                  coverageCount: 1,
                  sourceCount: 1,

                  clusterKey,

                  firstDetectedAt: new Date(),
                  lastDetectedAt: new Date(),

                  source: {
                    connectOrCreate: {
                      where: {
                        rssUrl: feed.url,
                      },
                      create: {
                        name: feed.sourceName,
                        category: mappedCategory,
                        rssUrl: feed.url,
                      },
                    },
                  },
                },
              });

              stats.newItems++;
              stats.clustersCreated++;

              continue;
            }

            /**
             * Same story from another source/feed.
             *
             * Do NOT create another feed item.
             * Instead update coverage/source intelligence.
             */
            const existingSource =
              await prisma.ingestedFeed.findFirst({
                where: {
                  clusterKey,
                  source: {
                    rssUrl: feed.url,
                  },
                },
                select: {
                  id: true,
                },
              });

            if (existingSource) {
              stats.duplicatesRemoved++;
              continue;
            }

            const nextCoverage =
              (existingCluster.coverageCount || 1) + 1;

            const nextSourceCount =
              (existingCluster.sourceCount || 1) + 1;

            await prisma.ingestedFeed.update({
              where: {
                id: existingCluster.id,
              },
              data: {
                coverageCount: nextCoverage,
                sourceCount: nextSourceCount,

                trendingScore: Math.min(
                  100,
                  Math.max(
                    priorityScore,
                    Math.round(
                      priorityScore +
                        nextCoverage * 5 +
                        nextSourceCount * 3
                    )
                  )
                ),

                popularityScore: Math.min(
                  100,
                  Math.round(
                    priorityScore +
                      nextCoverage * 4 +
                      nextSourceCount * 2
                  )
                ),

                lastDetectedAt: new Date(),
              },
            });

            stats.duplicatesRemoved++;
          } catch (itemError) {
            const message =
              itemError instanceof Error
                ? itemError.message
                : 'Unknown item processing error';

            console.error(
              `⚠️ Failed to process RSS item "${item.title}":`,
              message
            );

            stats.errors.push(
              `${feed.sourceName}: ${message}`
            );
          }
        }
      } catch (feedError) {
        const message =
          feedError instanceof Error
            ? feedError.message
            : 'Unknown feed error';

        console.error(
          `❌ Failed RSS feed ${feed.sourceName}:`,
          message
        );

        stats.errors.push(
          `${feed.sourceName}: ${message}`
        );
      }
    }

    const finalStatus =
      stats.errors.length === 0
        ? 'completed'
        : stats.newItems > 0
          ? 'partial'
          : 'failed';

    await prisma.ingestionRun.update({
      where: {
        id: runId,
      },
      data: {
        completedAt: new Date(),
        status: finalStatus,

        sourcesChecked: stats.sourcesChecked,
        storiesFound: stats.storiesFound,
        newItems: stats.newItems,
        duplicatesRemoved: stats.duplicatesRemoved,
        clustersCreated: stats.clustersCreated,
        draftsCreated: stats.draftsCreated,

        errors:
          stats.errors.length > 0
            ? stats.errors
            : undefined,
      },
    });

    console.log(
      `✅ RSS ingestion completed: ` +
        `${stats.newItems} new, ` +
        `${stats.duplicatesRemoved} duplicates, ` +
        `${stats.sourcesChecked} sources`
    );

    return {
      success: true,
      added: stats.newItems,
      ...stats,
      runId,
      status: finalStatus,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'RSS ingestion failed';

    console.error(
      '❌ Fatal RSS ingestion error:',
      message
    );

    if (runId) {
      await prisma.ingestionRun
        .update({
          where: {
            id: runId,
          },
          data: {
            completedAt: new Date(),
            status: 'failed',
            sourcesChecked: stats.sourcesChecked,
            storiesFound: stats.storiesFound,
            newItems: stats.newItems,
            duplicatesRemoved:
              stats.duplicatesRemoved,
            clustersCreated:
              stats.clustersCreated,
            draftsCreated: stats.draftsCreated,
            errors: [
              ...stats.errors,
              message,
            ],
          },
        })
        .catch((updateError) => {
          console.error(
            'Failed to update ingestion run:',
            updateError
          );
        });
    }

    throw new Error(message);
  }
}

function normalizeRSSItem(item: RSSItem) {
  const title = cleanHtmlEntities(
    item.title || ''
  )
    .replace(/\s+/g, ' ')
    .trim();

  const description = cleanHtmlEntities(
    item.description || ''
  )
    .replace(/\s+/g, ' ')
    .trim();

  const link = cleanHtmlEntities(
    item.link || ''
  ).trim();

  let pubDate: Date | null = null;

  if (item.pubDate) {
    const parsedDate = new Date(item.pubDate);

    if (!Number.isNaN(parsedDate.getTime())) {
      pubDate = parsedDate;
    }
  }

  return {
    title,
    description:
      description.substring(0, 4000) || title,
    link,
    imageUrl: item.imageUrl
      ? cleanHtmlEntities(item.imageUrl).trim()
      : null,
    pubDate,
  };
}

function extractRssItems(
  xmlText: string
): RSSItem[] {
  const items: RSSItem[] = [];

  const itemRegex =
    /<item\b[\s\S]*?<\/item>/gi;

  const matches =
    xmlText.match(itemRegex) || [];

  for (const itemXml of matches) {
    const title =
      matchXmlValue(itemXml, 'title') ||
      'No Title';

    const link =
      matchXmlValue(itemXml, 'link') ||
      '';

    const pubDate =
      matchXmlValue(itemXml, 'pubDate') ||
      null;

    const description =
      matchXmlValue(
        itemXml,
        'description'
      ) || '';

    const imageUrl =
      matchAttribute(
        itemXml,
        'media:content',
        'url'
      ) ||
      matchAttribute(
        itemXml,
        'media:thumbnail',
        'url'
      ) ||
      matchAttribute(
        itemXml,
        'enclosure',
        'url'
      ) ||
      null;

    if (link) {
      items.push({
        title,
        link,
        pubDate,
        description,
        imageUrl,
      });
    }
  }

  return items;
}

function matchXmlValue(
  xml: string,
  tagName: string
): string | null {
  const escapedTag =
    tagName.replace(':', '\\:');

  const cdataRegex = new RegExp(
    `<${escapedTag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*<\\/${escapedTag}>`,
    'i'
  );

  const cdataMatch =
    xml.match(cdataRegex);

  if (cdataMatch?.[1]) {
    return cdataMatch[1];
  }

  const normalRegex = new RegExp(
    `<${escapedTag}[^>]*>([\\s\\S]*?)<\\/${escapedTag}>`,
    'i'
  );

  const normalMatch =
    xml.match(normalRegex);

  return normalMatch?.[1] || null;
}

function matchAttribute(
  xml: string,
  tagName: string,
  attributeName: string
): string | null {
  const escapedTag =
    tagName.replace(':', '\\:');

  const regex = new RegExp(
    `<${escapedTag}\\b[^>]*\\b${attributeName}=["']([^"']+)["'][^>]*>`,
    'i'
  );

  return xml.match(regex)?.[1] || null;
}

function extractKeywords(
  title: string
): string[] {
  const stopWords = new Set([
    'the',
    'and',
    'a',
    'to',
    'of',
    'in',
    'is',
    'for',
    'on',
    'with',
    'as',
    'by',
    'this',
    'that',
    'from',
    'has',
    'was',
    'are',
    'will',
    'after',
    'over',
    'into',
    'its',
    'their',
    'about',
    'says',
    'said',
  ]);

  return Array.from(
    new Set(
      title
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
        .split(/\s+/)
        .filter(
          (word) =>
            word.length > 3 &&
            !stopWords.has(word)
        )
    )
  ).slice(0, 8);
}

/**
 * Lightweight deterministic cluster key.
 *
 * This is intentionally not an AI decision.
 * It creates a normalized fingerprint from meaningful
 * title words so the same story appearing across sources
 * can be grouped together.
 */
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
    'india',
    'indian',
    'latest',
    'update',
    'updates',
    'breaking',
  ]);

  const words = title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .split(/\s+/)
    .filter(
      (word) =>
        word.length >= 4 &&
        !stopWords.has(word)
    );

  const uniqueWords = Array.from(
    new Set(words)
  ).slice(0, 8);

  return uniqueWords
    .sort()
    .join('-')
    .substring(0, 180);
}

function calculatePriorityScore(
  title: string,
  description: string,
  category: string
): number {
  let score = 50;

  const lowerText = (
    title +
    ' ' +
    description
  ).toLowerCase();

  const hotKeywords = [
    'breaking',
    'exclusive',
    'urgent',
    'election',
    'budget',
    'supreme court',
    'isro',
    'cricket',
    'scam',
    'probe',
    'parliament',
    'cabinet',
    'government',
    'prime minister',
    'president',
    'earthquake',
    'cyclone',
    'flood',
    'war',
    'attack',
    'stock market',
  ];

  for (const keyword of hotKeywords) {
    if (lowerText.includes(keyword)) {
      score += 5;
    }
  }

  const categoryWeights: Record<
    string,
    number
  > = {
    India: 5,
    World: 3,
    Business: 4,
    Sports: 2,
    Entertainment: 1,
    Technology: 3,
  };

  score +=
    categoryWeights[category] || 0;

  return Math.min(100, score);
}

function calculateTrendingScore(
  title: string,
  description: string,
  priorityScore: number
): number {
  const lowerText = (
    title +
    ' ' +
    description
  ).toLowerCase();

  let score = priorityScore;

  const trendSignals = [
    'breaking',
    'live',
    'latest',
    'just in',
    'developing',
    'alert',
    'major',
    'urgent',
  ];

  for (const signal of trendSignals) {
    if (lowerText.includes(signal)) {
      score += 4;
    }
  }

  return Math.min(100, score);
}

function calculatePopularityScore(
  title: string,
  description: string,
  priorityScore: number
): number {
  const lowerText = (
    title +
    ' ' +
    description
  ).toLowerCase();

  let score =
    Math.round(
      priorityScore * 0.7
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
    'ai',
    'isro',
  ];

  for (const signal of interestSignals) {
    if (lowerText.includes(signal)) {
      score += 3;
    }
  }

  return Math.min(100, score);
}

function cleanHtmlEntities(
  text: string
): string {
  return text
    .replace(
      /<!\[CDATA\[([\s\S]*?)\]\]>/g,
      '$1'
    )
    .replace(
      /&amp;/g,
      '&'
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
      /&quot;/g,
      '"'
    )
    .replace(
      /&#39;/g,
      "'"
    )
    .replace(
      /&#x27;/gi,
      "'"
    )
    .replace(
      /&#(\d+);/g,
      (_, code) =>
        String.fromCharCode(
          Number(code)
        )
    )
    .replace(
      /<[^>]+>/g,
      ' '
    )
    .replace(
      /\s+/g,
      ' '
    )
    .trim();
}