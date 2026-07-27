export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: {
        views: "desc",
      },
      take: 50,
      select: {
        id: true,
        title: true,
        slug: true,
        views: true,
        createdAt: true,
      },
    });

    const now = Date.now();

    const rising = articles
      .map((article) => {
        const ageHours = Math.max(
          1,
          (now - new Date(article.createdAt).getTime()) /
            (1000 * 60 * 60)
        );

        const score =
          (article.views || 0) / (ageHours + 2);

        return {
          id: article.id,
          title: article.title,
          slug: article.slug,
          views: article.views || 0,
          score: Number(score.toFixed(2)),
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    return NextResponse.json(rising);

  } catch (error) {
    console.error("Rising API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch rising articles",
      },
      {
        status: 500,
      }
    );
  }
}