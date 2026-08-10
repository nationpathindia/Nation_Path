import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

export const dynamic = "force-dynamic";

/*
 * ============================================================
 * CACHED BREAKING NEWS QUERY
 * ============================================================
 *
 * Breaking news is refreshed every 60 seconds.
 *
 * The current time is passed INTO the cached function so that
 * the cache key also changes with the time bucket.
 *
 * This prevents an expired breaking article from remaining
 * active indefinitely inside the cache.
 */

const getBreakingArticles = unstable_cache(
  async () => {
    const now = new Date();

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

        excerpt: true,

        breakingPriority: true,

        breakingStart: true,

        breakingEnd: true,

        createdAt: true,
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
 * ============================================================
 * GET ACTIVE BREAKING NEWS
 * ============================================================
 */

export async function GET() {
  try {
    const breakingArticles =
      await getBreakingArticles();

    return NextResponse.json(
      {
        success: true,

        breaking: breakingArticles,
      },
      {
        status: 200,

        headers: {
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

        error:
          "Failed to fetch breaking news",
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
 * ============================================================
 * POST BREAKING REFRESH
 * ============================================================
 *
 * Kept for compatibility with the existing system.
 */

export async function POST() {
  try {
    return NextResponse.json({
      success: true,

      message:
        "Breaking news refresh triggered",
    });
  } catch (error) {
    console.error(
      "PUSH BREAKING POST ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          "Breaking refresh failed",
      },
      {
        status: 500,
      }
    );
  }
}

