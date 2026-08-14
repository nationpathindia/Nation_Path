import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

export const dynamic = "force-dynamic";

/*
============================================================
BREAKING NEWS CACHE
============================================================

- Cache window: 60 seconds
- Cache key changes every 60-second bucket
- This prevents an expired breaking article from staying
  cached indefinitely.
- Only the fields required by BreakingNewsBar are returned.
============================================================
*/

const getBreakingArticles = unstable_cache(
  async (timeBucket: number) => {
    /*
     * Use the beginning of the current cache bucket.
     *
     * The bucket is part of the unstable_cache key because it
     * is passed as an argument to this cached function.
     */
    const now = new Date(timeBucket * 60_000);

    return prisma.article.findMany({
      where: {
        breaking: true,
        isDeleted: false,
        status: "approved",

        breakingEnd: {
          gt: now,
        },
      },

      select: {
        id: true,
        title: true,
        slug: true,
      },

      orderBy: [
        {
          breakingPriority: "desc",
        },
        {
          createdAt: "desc",
        },
      ],

      take: 10,
    });
  },

  ["nationpath-breaking-news"],

  {
    revalidate: 60,
    tags: ["breaking-news"],
  }
);

/*
============================================================
GET ACTIVE BREAKING NEWS
============================================================
*/

export async function GET() {
  try {
    /*
     * 60-second cache bucket.
     *
     * Example:
     * 10:25:xx -> bucket 10:25
     * 10:26:xx -> new cache key
     */
    const timeBucket = Math.floor(Date.now() / 60_000);

    const breakingArticles =
      await getBreakingArticles(timeBucket);

    return NextResponse.json(
      {
        success: true,
        breaking: breakingArticles,
      },
      {
        status: 200,

        headers: {
          /*
           * CDN/browser cache can reuse the response for 60s
           * and serve stale content while refreshing.
           */
          "Cache-Control":
            "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error) {
    console.error(
      "PUSH BREAKING GET ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        breaking: [],
        error: "Failed to fetch breaking news",
      },
      {
        status: 500,

        headers: {
          "Cache-Control":
            "public, s-maxage=10, stale-while-revalidate=30",
        },
      }
    );
  }
}

/*
============================================================
POST BREAKING REFRESH
============================================================

Kept for compatibility with the existing system.
============================================================
*/

export async function POST() {
  try {
    return NextResponse.json({
      success: true,
      message: "Breaking news refresh triggered",
    });
  } catch (error) {
    console.error(
      "PUSH BREAKING POST ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Breaking refresh failed",
      },
      {
        status: 500,
      }
    );
  }
}

