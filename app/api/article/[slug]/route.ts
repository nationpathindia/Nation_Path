import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PostStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

/* ================= GET SINGLE ARTICLE ================= */

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    if (!params?.slug) {
      return NextResponse.json(
        {
          success: false,
          error: "Article slug required",
        },
        { status: 400 }
      );
    }

    const article = await prisma.article.findFirst({
      where: {
        slug: params.slug,
        status: PostStatus.approved,
        isDeleted: false,
      },
      include: {
        category: true,

        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json(
        {
          success: false,
          error: "Article not found",
        },
        { status: 404 }
      );
    }

    /* ===== SAFE VIEW INCREMENT ===== */

    prisma.article
      .update({
        where: {
          id: article.id,
        },
        data: {
          views: {
            increment: 1,
          },
        },
      })
      .catch(() => {});

    return NextResponse.json({
      success: true,
      article,
    });
  } catch (error) {
    console.error("FETCH ARTICLE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch article",
      },
      { status: 500 }
    );
  }
}

