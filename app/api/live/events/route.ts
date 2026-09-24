import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const segment = searchParams.get("segment");
    const search = searchParams.get("search")?.trim();
    const featured = searchParams.get("featured");

    const page = Math.max(
      Number(searchParams.get("page") || "1"),
      1
    );

    const limit = Math.min(
      Math.max(Number(searchParams.get("limit") || "20"), 1),
      50
    );

    const where: any = {
      showInLiveCenter: true,
      status: {
        in: ["live", "scheduled"],
      },
    };

    if (segment && segment !== "all") {
      where.segment = segment;
    }

    if (featured === "true") {
      where.isFeatured = true;
    }

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    const [events, total] = await Promise.all([
      prisma.liveEvent.findMany({
        where,
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          segment: true,
          coverImage: true,
          coverImageAlt: true,
          status: true,
          isFeatured: true,
          showOnHomepage: true,
          startAt: true,
          endAt: true,
          updateCount: true,
          lastUpdateAt: true,
          lastPublishedAt: true,
        },
        orderBy: [
          {
            status: "asc",
          },
          {
            isFeatured: "desc",
          },
          {
            lastUpdateAt: "desc",
          },
          {
            startAt: "desc",
          },
        ],
        skip: (page - 1) * limit,
        take: limit,
      }),

      prisma.liveEvent.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: events,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("PUBLIC LIVE EVENTS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load live events",
      },
      { status: 500 }
    );
  }
}