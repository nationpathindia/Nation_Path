import { NextRequest, NextResponse } from "next/server";
import { LiveUpdateStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Math.max(
      Number(searchParams.get("page") || "1"),
      1
    );

    const limit = Math.min(
      Math.max(Number(searchParams.get("limit") || "30"), 1),
      100
    );

    const event = await prisma.liveEvent.findFirst({
      where: {
        slug: params.slug,
        showInLiveCenter: true,
        status: {
          not: "archived",
        },
      },
      select: {
        id: true,
      },
    });

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          error: "Live event not found",
        },
        { status: 404 }
      );
    }

    const where = {
      eventId: event.id,
      status: LiveUpdateStatus.published,
    };

    const [updates, total] = await Promise.all([
      prisma.liveUpdate.findMany({
        where,
        select: {
          id: true,
          headline: true,
          content: true,
          type: true,
          verificationStatus: true,
          isBreaking: true,
          isPinned: true,
          publishedAt: true,
          sourceName: true,
          sourceUrl: true,
          imageUrl: true,
          imageAlt: true,
          videoUrl: true,
          embedUrl: true,
          isAutomated: true,
          createdAt: true,
          author: {
            select: {
              name: true,
            },
          },
          source: {
            select: {
              name: true,
              type: true,
            },
          },
        },
        orderBy: [
          {
            isPinned: "desc",
          },
          {
            publishedAt: "desc",
          },
        ],
        skip: (page - 1) * limit,
        take: limit,
      }),

      prisma.liveUpdate.count({
        where,
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: updates,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("PUBLIC LIVE UPDATES ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load live updates",
      },
      { status: 500 }
    );
  }
}