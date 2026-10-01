import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { error: "Article slug required" },
        { status: 400 }
      );
    }

    // Direct single-query update (No double database hits)
    const updated = await prisma.article.update({
      where: { slug },
      data: {
        views: {
          increment: 1,
        },
        lastViewAt: new Date(),
      },
      select: {
        views: true,
      },
    });

    return NextResponse.json({
      success: true,
      views: updated.views,
    });
  } catch (error: any) {
    // Record not found in Prisma throws P2025
    if (error?.code === "P2025") {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    console.error("View update error:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}