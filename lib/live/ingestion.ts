import { XMLParser } from "fast-xml-parser";
import {
  LiveSourceType,
  LiveUpdateStatus,
  LiveUpdateType,
  LiveVerificationStatus,
} from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { fetchESPNAsiaCupMatches } from "@/lib/live/providers/espncricinfo";

const MAX_ITEMS_PER_RUN = 10;

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  trimValues: true,
  removeNSPrefix: false,
  parseTagValue: false,
  parseAttributeValue: false,
});

type NormalizedItem = {
  title: string;
  description: string;
  url: string | null;
  imageUrl: string | null;
  publishedAt: Date | null;
  sourceName: string;
  sourceType: LiveSourceType;
  externalId?: string | null;
};

function text(value: unknown): string {
  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value).trim();
  }

  if (value && typeof value === "object") {
    const objectValue = value as Record<string, unknown>;

    if ("#text" in objectValue) {
      return String(objectValue["#text"] ?? "").trim();
    }

    if ("__cdata" in objectValue) {
      return String(objectValue["__cdata"] ?? "").trim();
    }
  }

  return "";
}

function parseDate(value: unknown): Date | null {
  const raw = text(value);

  if (!raw) {
    return null;
  }

  const date = new Date(raw);

  return Number.isNaN(date.getTime()) ? null : date;
}

function cleanHtml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function extractLink(value: unknown): string | null {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    return value.trim() || null;
  }

  if (Array.isArray(value)) {
    for (const candidate of value) {
      const link = extractLink(candidate);

      if (link) {
        return link;
      }
    }

    return null;
  }

  if (typeof value === "object") {
    const objectValue = value as Record<string, unknown>;

    const href =
      objectValue["@_href"] ||
      objectValue.href ||
      objectValue["#text"];

    if (typeof href === "string") {
      return href.trim() || null;
    }
  }

  return null;
}

function extractImage(item: any): string | null {
  const candidates = [
    item?.["media:content"],
    item?.["media:thumbnail"],
    item?.enclosure,
    item?.image,
  ];

  for (const candidate of candidates) {
    if (!candidate) {
      continue;
    }

    const values = Array.isArray(candidate)
      ? candidate
      : [candidate];

    for (const media of values) {
      if (typeof media === "string") {
        const value = media.trim();

        if (value) {
          return value;
        }
      }

      if (media && typeof media === "object") {
        const objectValue = media as Record<string, unknown>;

        const url =
          objectValue["@_url"] ||
          objectValue["@_href"] ||
          objectValue.url ||
          objectValue.href;

        if (typeof url === "string" && url.trim()) {
          return url.trim();
        }
      }
    }
  }

  return null;
}

function normalizeItem(
  item: any,
  sourceName: string
): NormalizedItem | null {
  const title = cleanHtml(
    text(
      item?.title ||
        item?.["dc:title"] ||
        item?.["media:title"]
    )
  );

  if (!title) {
    return null;
  }

  const description = cleanHtml(
    text(
      item?.description ||
        item?.summary ||
        item?.["content:encoded"] ||
        item?.["content"] ||
        item?.content
    )
  );

  const url =
    extractLink(item?.link) ||
    extractLink(item?.guid) ||
    extractLink(item?.id);

  const publishedAt = parseDate(
    item?.pubDate ||
      item?.published ||
      item?.updated ||
      item?.["dc:date"]
  );

  return {
    title,
    description,
    url,
    imageUrl: extractImage(item),
    publishedAt,
    sourceName,
    sourceType: LiveSourceType.rss,
  };
}

function asArray<T>(
  value: T | T[] | undefined | null
): T[] {
  if (value == null) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

function getItems(parsed: any): any[] {
  const rssChannels = asArray(parsed?.rss?.channel);

  for (const channel of rssChannels) {
    const items = asArray(channel?.item);

    if (items.length > 0) {
      return items;
    }
  }

  const feedEntries = asArray(parsed?.feed?.entry);

  if (feedEntries.length > 0) {
    return feedEntries;
  }

  const rssItem = parsed?.rss?.item;

  if (rssItem) {
    return asArray(rssItem);
  }

  return [];
}

async function fetchXml(url: string): Promise<string> {
  const controller = new AbortController();

  const timeout = setTimeout(
    () => controller.abort(),
    20000
  );

  try {
    const response = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      redirect: "follow",
      headers: {
        Accept:
          "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
        "User-Agent":
          "Mozilla/5.0 (compatible; NationPath-LiveCenter/1.0; +https://www.nationpathindia.com)",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      cache: "no-store",
    });

    const finalUrl = response.url || url;

    const contentType =
      response.headers.get("content-type") || "";

    const contentLength =
      response.headers.get("content-length") || "";

    const body = await response.text();

    console.log("[Live RSS] Fetch result:", {
      requestedUrl: url,
      finalUrl,
      status: response.status,
      statusText: response.statusText,
      contentType: contentType || "unknown",
      contentLength: contentLength || "unknown",
      bodyLength: body.length,
    });

    if (!response.ok) {
      throw new Error(
        `RSS fetch failed: HTTP ${response.status} ${response.statusText} | finalUrl=${finalUrl} | contentType=${contentType || "unknown"}`
      );
    }

    if (!body.trim()) {
      throw new Error(
        `RSS fetch returned an empty response: HTTP ${response.status} | finalUrl=${finalUrl} | contentType=${contentType || "unknown"} | contentLength=${contentLength || "unknown"} | bodyLength=0`
      );
    }

    const trimmed = body.trim();

    const looksLikeXml =
      /^\s*<\?xml/i.test(trimmed) ||
      /^\s*<rss[\s>]/i.test(trimmed) ||
      /^\s*<feed[\s>]/i.test(trimmed) ||
      /^\s*<rdf:RDF[\s>]/i.test(trimmed);

    if (!looksLikeXml) {
      const preview = trimmed
        .replace(/\s+/g, " ")
        .slice(0, 300);

      throw new Error(
        `RSS endpoint returned non-XML content | finalUrl=${finalUrl} | contentType=${contentType || "unknown"} | bodyLength=${body.length} | preview=${preview}`
      );
    }

    return body;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error(
          `RSS fetch timed out after 20 seconds: ${url}`
        );
      }

      throw error;
    }

    throw new Error("Unknown RSS fetch error");
  } finally {
    clearTimeout(timeout);
  }
}

function matchesKeywords(
  item: NormalizedItem,
  keywords: string[],
  excludeKeywords: string[],
  matchMode: string
): boolean {
  const haystack =
    `${item.title} ${item.description}`.toLowerCase();

  const excluded = excludeKeywords.some(
    (keyword) =>
      keyword &&
      haystack.includes(keyword.toLowerCase())
  );

  if (excluded) {
    return false;
  }

  if (keywords.length === 0) {
    return true;
  }

  const matches = keywords.filter(
    (keyword) =>
      keyword &&
      haystack.includes(keyword.toLowerCase())
  );

  return matchMode === "all"
    ? matches.length === keywords.length
    : matches.length > 0;
}

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function similarity(a: string, b: string): number {
  const aWords = new Set(
    normalizeTitle(a)
      .split(" ")
      .filter(Boolean)
  );

  const bWords = new Set(
    normalizeTitle(b)
      .split(" ")
      .filter(Boolean)
  );

  if (!aWords.size || !bWords.size) {
    return 0;
  }

  let intersection = 0;

  for (const word of aWords) {
    if (bWords.has(word)) {
      intersection++;
    }
  }

  return (
    intersection /
    Math.max(aWords.size, bWords.size)
  );
}

async function isDuplicate(
  eventId: string,
  item: NormalizedItem
): Promise<boolean> {
  const existing = await prisma.liveUpdate.findMany({
    where: {
      eventId,
      status: {
        not: LiveUpdateStatus.archived,
      },
    },
    select: {
      id: true,
      headline: true,
      content: true,
      sourceUrl: true,
      automationMeta: true,
    },
    take: 100,
    orderBy: {
      createdAt: "desc",
    },
  });

  if (
    item.url &&
    existing.some(
      (update) => update.sourceUrl === item.url
    )
  ) {
    return true;
  }

  if (item.externalId) {
    const externalDuplicate = existing.some(
      (update) => {
        const meta = update.automationMeta;

        if (
          !meta ||
          typeof meta !== "object" ||
          Array.isArray(meta)
        ) {
          return false;
        }

        return (
          (meta as Record<string, unknown>)
            .externalId === item.externalId
        );
      }
    );

    if (externalDuplicate) {
      return true;
    }
  }

  return existing.some((update) => {
    const existingTitle =
      update.headline ||
      update.content.slice(0, 300);

    return (
      similarity(item.title, existingTitle) >= 0.88
    );
  });
}

function selectLatestItems(
  items: NormalizedItem[]
): NormalizedItem[] {
  return items
    .sort((a, b) => {
      const aTime =
        a.publishedAt?.getTime() ?? 0;

      const bTime =
        b.publishedAt?.getTime() ?? 0;

      return bTime - aTime;
    })
    .slice(0, MAX_ITEMS_PER_RUN);
}

async function ingestItems(
  items: NormalizedItem[],
  eventId: string,
  sourceId: string,
  rule: {
    keywords: string[];
    excludeKeywords: string[];
    matchMode: string;
    autoPublish: boolean;
    requireVerification: boolean;
    autoBreaking: boolean;
    autoSummarize: boolean;
    autoDeduplicate: boolean;
  }
) {
  let accepted = 0;
  let published = 0;
  let duplicates = 0;
  let skipped = 0;

  for (const item of items) {
    if (
      !matchesKeywords(
        item,
        rule.keywords,
        rule.excludeKeywords,
        rule.matchMode
      )
    ) {
      skipped++;
      continue;
    }

    const duplicate = await isDuplicate(
      eventId,
      item
    );

    if (duplicate) {
      duplicates++;
      continue;
    }

    accepted++;

    const verificationStatus =
      rule.requireVerification
        ? LiveVerificationStatus.under_review
        : LiveVerificationStatus.unverified;

    const shouldPublish =
      rule.autoPublish &&
      !rule.requireVerification;

    const updateStatus =
      shouldPublish
        ? LiveUpdateStatus.published
        : LiveUpdateStatus.draft;

    const now = new Date();

    const update =
      await prisma.liveUpdate.create({
        data: {
          eventId,

          headline: item.title,

          content:
            item.description ||
            item.title,

          type: LiveUpdateType.update,

          status: updateStatus,

          verificationStatus,

          isBreaking: rule.autoBreaking,

          isPinned: false,

          publishedAt: shouldPublish
            ? now
            : null,

          sourceName: item.sourceName,

          sourceUrl: item.url,

          sourceType: item.sourceType,

          sourceId,

          imageUrl: item.imageUrl,

          isAutomated: true,

          automationMeta: {
            sourceId,

            sourceName: item.sourceName,

            sourceType: item.sourceType,

            externalId:
              item.externalId ?? null,

            fetchedAt:
              now.toISOString(),

            publishedAt:
              item.publishedAt?.toISOString() ??
              null,

            autoPublish:
              rule.autoPublish,

            requireVerification:
              rule.requireVerification,

            autoBreaking:
              rule.autoBreaking,

            autoSummarize:
              rule.autoSummarize,

            latestOnly: true,

            maxItemsPerRun:
              MAX_ITEMS_PER_RUN,
          },
        },
      });

    published +=
      update.status ===
      LiveUpdateStatus.published
        ? 1
        : 0;

    await prisma.liveEvent.update({
      where: {
        id: eventId,
      },

      data: {
        updateCount: {
          increment: 1,
        },

        lastUpdateAt: now,

        ...(update.status ===
        LiveUpdateStatus.published
          ? {
              lastPublishedAt: now,
            }
          : {}),
      },
    });
  }

  return {
    fetched: items.length,
    accepted,
    published,
    duplicates,
    skipped,
  };
}

async function ingestRssSource(
  source: {
    id: string;
    name: string;
    rssUrl: string | null;
    url: string | null;
  },
  eventId: string,
  rule: {
    keywords: string[];
    excludeKeywords: string[];
    matchMode: string;
    autoPublish: boolean;
    requireVerification: boolean;
    autoBreaking: boolean;
    autoSummarize: boolean;
    autoDeduplicate: boolean;
  }
) {
  const feedUrl =
    source.rssUrl ||
    source.url;

  if (!feedUrl) {
    throw new Error(
      "RSS source has no feed URL"
    );
  }

  const xml = await fetchXml(feedUrl);

  let parsed: any;

  try {
    parsed = parser.parse(xml);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown XML parser error";

    throw new Error(
      `RSS XML parsing failed: ${message}`
    );
  }

  const rawItems = getItems(parsed);

  if (rawItems.length === 0) {
    throw new Error(
      "RSS feed returned no <item> or Atom <entry> records"
    );
  }

  const normalizedItems = rawItems
    .map((item) =>
      normalizeItem(
        item,
        source.name
      )
    )
    .filter(
      (item): item is NormalizedItem =>
        Boolean(item)
    );

  if (normalizedItems.length === 0) {
    throw new Error(
      "RSS feed contained records, but none had a usable title"
    );
  }

  const items =
    selectLatestItems(
      normalizedItems
    );

  console.log(
    "[Live RSS] Latest-only selection:",
    {
      sourceId: source.id,
      sourceName: source.name,
      feedItems:
        normalizedItems.length,
      processing: items.length,
      maxPerRun:
        MAX_ITEMS_PER_RUN,
    }
  );

  return ingestItems(
    items,
    eventId,
    source.id,
    rule
  );
}

async function ingestApiSource(
  source: {
    id: string;
    name: string;
  },
  eventId: string,
  rule: {
    keywords: string[];
    excludeKeywords: string[];
    matchMode: string;
    autoPublish: boolean;
    requireVerification: boolean;
    autoBreaking: boolean;
    autoSummarize: boolean;
    autoDeduplicate: boolean;
  }
) {
  console.log(
    "[Live API] Starting ESPNcricinfo ingestion:",
    {
      sourceId: source.id,
      sourceName: source.name,
      eventId,
    }
  );

  const apiItems =
    await fetchESPNAsiaCupMatches();

  const normalizedItems: NormalizedItem[] =
    apiItems.map((item) => ({
      title: item.title,
      description: item.description,
      url: item.url,
      imageUrl: item.imageUrl,
      publishedAt: item.publishedAt,
      sourceName:
        item.sourceName ||
        "ESPNcricinfo",
      sourceType:
        LiveSourceType.api,
      externalId:
        item.externalId,
    }));

  const items =
    selectLatestItems(
      normalizedItems
    );

  console.log(
    "[Live API] ESPNcricinfo selection:",
    {
      sourceId: source.id,
      sourceName: source.name,
      fetched:
        normalizedItems.length,
      processing: items.length,
      maxPerRun:
        MAX_ITEMS_PER_RUN,
    }
  );

  return ingestItems(
    items,
    eventId,
    source.id,
    rule
  );
}

export async function ingestLiveSource(
  sourceId: string,
  eventId: string,
  rule: {
    keywords: string[];
    excludeKeywords: string[];
    matchMode: string;
    autoPublish: boolean;
    requireVerification: boolean;
    autoBreaking: boolean;
    autoSummarize: boolean;
    autoDeduplicate: boolean;
  }
) {
  const source =
    await prisma.liveSource.findUnique({
      where: {
        id: sourceId,
      },
    });

  if (!source) {
    throw new Error(
      "Live source not found"
    );
  }

  if (!source.isActive) {
    throw new Error(
      "Live source is disabled"
    );
  }

  /*
   * ============================================================
   * SOURCE DISPATCH
   * ============================================================
   *
   * RSS:
   *   Existing RSS ingestion remains unchanged.
   *
   * API:
   *   Dedicated provider adapter.
   *
   * Other source types:
   *   Intentionally remain unsupported until their dedicated
   *   adapters are implemented.
   */
  if (
    source.type ===
    LiveSourceType.rss
  ) {
    return ingestRssSource(
      {
        id: source.id,
        name: source.name,
        rssUrl: source.rssUrl,
        url: source.url,
      },
      eventId,
      rule
    );
  }

  if (
    source.type ===
    LiveSourceType.api
  ) {
    return ingestApiSource(
      {
        id: source.id,
        name: source.name,
      },
      eventId,
      rule
    );
  }

  return {
    fetched: 0,
    accepted: 0,
    published: 0,
    duplicates: 0,
    skipped: 0,
    message:
      "Source type requires its dedicated adapter",
  };
}