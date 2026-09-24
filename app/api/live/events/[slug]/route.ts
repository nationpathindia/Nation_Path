import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
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
        seoTitle: true,
        seoDescription: true,
        seoKeywords: true,
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

    return NextResponse.json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error("PUBLIC LIVE EVENT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load live event",
      },
      { status: 500 }
    );
  }
}