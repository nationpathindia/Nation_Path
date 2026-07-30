import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const query = searchParams.get("q")?.trim() || "";
    const category = searchParams.get("category");
    const page = Number(searchParams.get("page") || 1);

    const limit = 10;
    const skip = (page - 1) * limit;

    if (!query) {
      return NextResponse.json({
        success: true,
        articles: [],
        pagination: {
          page,
          limit,
          total: 0,
          totalPages: 0,
        },
      });
    }

    const where: any = {
      status: "approved",
      isDeleted: false,

      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          excerpt: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          tags: {
            has: query,
          },
        },
      ],
    };

    if (category) {
      where.categoryId = category;
    }

    const [
      articles,
      total,
    ] = await Promise.all([
      prisma.article.findMany({
        where,

        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          images: true,
          publishedAt: true,
          views: true,
          trendingScore: true,

          category: {
            select: {
              name: true,
              slug: true,
            },
          },

          author: {
            select: {
              name: true,
            },
          },
        },

        orderBy: [
          {
            trendingScore: "desc",
          },
          {
            publishedAt: "desc",
          },
        ],

        skip,
        take: limit,
      }),

      prisma.article.count({
        where,
      }),
    ]);

    return NextResponse.json({
      success: true,

      articles,

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error(
      "Search API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to search articles",
      },
      {
        status: 500,
      }
    );
  }
}