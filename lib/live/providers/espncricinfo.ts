import { LiveSourceType } from "@prisma/client";

const ESPN_BASE_URL =
  "https://hs-consumer-api.espncricinfo.com/v1";

type ESPNMatch = {
  id?: string;
  slug?: string;
  name?: string;
  status?: string;
  statusText?: string;
  startTime?: string;
  series?: {
    name?: string;
  };
  teams?: Array<{
    name?: string;
  }>;
};

export type ESPNLiveItem = {
  title: string;
  description: string;
  url: string | null;
  imageUrl: string | null;
  publishedAt: Date | null;
  sourceName: string;
  sourceType: LiveSourceType;
  externalId: string | null;
};

function safeDate(value: unknown): Date | null {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

function cleanText(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/\s+/g, " ")
    .trim();
}

function getMatchName(match: ESPNMatch): string {
  const directName = cleanText(match.name);

  if (directName) {
    return directName;
  }

  const teams = Array.isArray(match.teams)
    ? match.teams
        .map((team) => cleanText(team?.name))
        .filter(Boolean)
    : [];

  return teams.join(" vs ");
}

function getSeriesName(match: ESPNMatch): string {
  return cleanText(match.series?.name);
}

function getMatchStatus(match: ESPNMatch): string {
  return (
    cleanText(match.statusText) ||
    cleanText(match.status) ||
    ""
  );
}

function isAsiaCupMatch(match: ESPNMatch): boolean {
  const haystack = [
    getMatchName(match),
    getSeriesName(match),
  ]
    .join(" ")
    .toLowerCase();

  return (
    haystack.includes("asia cup") ||
    haystack.includes("t20 asia cup")
  );
}

async function fetchJson<T>(
  url: string
): Promise<T> {
  const controller = new AbortController();

  const timeout = setTimeout(
    () => controller.abort(),
    20000
  );

  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (compatible; NationPath-LiveCenter/1.0; +https://www.nationpathindia.com)",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      cache: "no-store",
    });

    const body = await response.text();

    console.log("[Live ESPN] Fetch result:", {
      requestedUrl: url,
      finalUrl: response.url || url,
      status: response.status,
      contentType:
        response.headers.get("content-type") || "unknown",
      bodyLength: body.length,
    });

    if (!response.ok) {
      throw new Error(
        `ESPN fetch failed: HTTP ${response.status} ${response.statusText}`
      );
    }

    if (!body.trim()) {
      throw new Error(
        "ESPN returned an empty response"
      );
    }

    try {
      return JSON.parse(body) as T;
    } catch {
      throw new Error(
        "ESPN returned non-JSON content"
      );
    }
  } catch (error) {
    if (
      error instanceof Error &&
      error.name === "AbortError"
    ) {
      throw new Error(
        `ESPN fetch timed out after 20 seconds: ${url}`
      );
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchESPNAsiaCupMatches(): Promise<
  ESPNLiveItem[]
> {
  const url =
    `${ESPN_BASE_URL}/pages/matches/live?lang=en`;

  const payload = await fetchJson<any>(url);

  const matches: ESPNMatch[] = Array.isArray(
    payload?.matches
  )
    ? payload.matches
    : Array.isArray(payload?.content)
      ? payload.content
      : [];

  const asiaCupMatches = matches.filter(
    isAsiaCupMatch
  );

  console.log("[Live ESPN] Asia Cup filter:", {
    totalMatches: matches.length,
    asiaCupMatches: asiaCupMatches.length,
  });

  return asiaCupMatches.map((match) => {
    const title =
      getMatchName(match) ||
      "Asia Cup 2026 Live Update";

    const seriesName = getSeriesName(match);
    const status = getMatchStatus(match);

    const description = [
      seriesName,
      status,
    ]
      .filter(Boolean)
      .join(" • ");

    const externalId =
      cleanText(match.id) ||
      cleanText(match.slug) ||
      null;

    return {
      title,
      description,
      url: externalId
        ? `https://www.espncricinfo.com/series/${externalId}`
        : null,
      imageUrl: null,
      publishedAt:
        safeDate(match.startTime),
      sourceName: "ESPNcricinfo",
      sourceType: LiveSourceType.api,
      externalId,
    };
  });
}