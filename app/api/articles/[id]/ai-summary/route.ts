import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

import {
  generateArticleSummary,
} from "@/lib/article-ai/summary.generator";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/* =========================================================
   TYPES
========================================================= */

interface Props {
  params: Promise<{
    id: string;
  }>;
}

type AISummary = {
  overview: string;
  impact: string;
  takeaway: string;
};

/* =========================================================
   HELPERS
========================================================= */

/**
 * Safely normalize an existing JSON summary.
 *
 * This protects us from malformed/old aiSummary data
 * already stored in MongoDB.
 */
function normalizeAISummary(
  value: unknown,
): AISummary | null {
  if (
    !value ||
    typeof value !== "object"
  ) {
    return null;
  }

  const summary =
    value as Record<
      string,
      unknown
    >;

  const overview =
    typeof summary.overview === "string"
      ? summary.overview.trim()
      : "";

  const impact =
    typeof summary.impact === "string"
      ? summary.impact.trim()
      : "";

  const takeaway =
    typeof summary.takeaway === "string"
      ? summary.takeaway.trim()
      : "";

  if (
    !overview &&
    !impact &&
    !takeaway
  ) {
    return null;
  }

  return {
    overview,
    impact,
    takeaway,
  };
}

/* =========================================================
   POST — ON DEMAND AI SUMMARY
=========================================================

   FLOW:

   User taps AI Summary
          ↓
   POST /api/articles/[id]/ai-summary
          ↓
   Find article
          ↓
   Existing aiSummary?
      ↓              ↓
     YES             NO
      ↓              ↓
   Return         Generate
   cached            ↓
                     Save
                       ↓
                  Return

   forceRegenerate=true
          ↓
   Skip existing cache
          ↓
   Generate fresh summary

========================================================= */

export async function POST(
  req: Request,
  {
    params,
  }: Props,
) {
  try {
    /* =====================================================
       ARTICLE ID
    ===================================================== */

    const {
      id,
    } = await params;

    const articleId =
      id?.trim();

    if (!articleId) {
      return NextResponse.json(
        {
          success: false,
          summary: null,
          error:
            "Article ID required.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       REQUEST BODY
    ===================================================== */

    let forceRegenerate =
      false;

    try {
      const body =
        await req.json();

      forceRegenerate =
        body?.forceRegenerate ===
        true;
    } catch {
      /*
       * Empty request body is valid.
       *
       * Default:
       * forceRegenerate = false
       */
    }

    /* =====================================================
       FIND ARTICLE
    ===================================================== */

    const article =
      await prisma.article.findUnique({
        where: {
          id: articleId,
        },

        select: {
          id: true,
          title: true,
          excerpt: true,
          content: true,

          aiSummary: true,
          aiGenerated: true,
          aiVersion: true,
          generatedAt: true,

          isDeleted: true,
          isEditorial: true,
          isAstrology: true,
          status: true,
          publishedAt: true,
        },
      });

    /* =====================================================
       ARTICLE NOT FOUND
    ===================================================== */

    if (!article) {
      return NextResponse.json(
        {
          success: false,
          summary: null,
          error:
            "Article not found.",
        },
        {
          status: 404,
        },
      );
    }

    /* =====================================================
       PUBLIC ARTICLE PROTECTION
    ===================================================== */

    if (
      article.isDeleted ||
      article.isEditorial ||
      article.isAstrology
    ) {
      return NextResponse.json(
        {
          success: false,
          summary: null,
          error:
            "AI Summary is not available for this article.",
        },
        {
          status: 403,
        },
      );
    }

    /* =====================================================
       PUBLISHED ARTICLE PROTECTION
    ===================================================== */

    const now =
      new Date();

    if (
      article.publishedAt &&
      article.publishedAt > now
    ) {
      return NextResponse.json(
        {
          success: false,
          summary: null,
          error:
            "AI Summary is not available for scheduled articles.",
        },
        {
          status: 403,
        },
      );
    }

    /* =====================================================
       CHECK EXISTING SUMMARY
    ===================================================== */

    const existingSummary =
      normalizeAISummary(
        article.aiSummary,
      );

    /*
     * IMPORTANT:
     *
     * Unless forceRegenerate=true,
     * NEVER generate the same summary again.
     */
    if (
      existingSummary &&
      !forceRegenerate
    ) {
      return NextResponse.json(
        {
          success: true,

          summary:
            existingSummary,

          cached: true,

          aiVersion:
            article.aiVersion ||
            "v1",

          generatedAt:
            article.generatedAt
              ? article.generatedAt.toISOString()
              : null,
        },
        {
          status: 200,

          headers: {
            "Cache-Control":
              "private, no-store",

            "Content-Type":
              "application/json",
          },
        },
      );
    }

    /* =====================================================
       ARTICLE CONTENT VALIDATION
    ===================================================== */

    const title =
      article.title?.trim() ||
      "";

    const excerpt =
      article.excerpt?.trim() ||
      "";

    const content =
      article.content?.trim() ||
      "";

    if (
      !title &&
      !excerpt &&
      !content
    ) {
      return NextResponse.json(
        {
          success: false,
          summary: null,
          error:
            "Article does not contain enough content to generate a summary.",
        },
        {
          status: 422,
        },
      );
    }

    /* =====================================================
       GENERATE SUMMARY
    ===================================================== */

    const generated =
      generateArticleSummary({
        title,
        excerpt,
        content,
      });

    const summary: AISummary = {
      overview:
        typeof generated?.overview ===
        "string"
          ? generated.overview.trim()
          : "",

      impact:
        typeof generated?.impact ===
        "string"
          ? generated.impact.trim()
          : "",

      takeaway:
        typeof generated?.takeaway ===
        "string"
          ? generated.takeaway.trim()
          : "",
    };

    /* =====================================================
       GENERATION VALIDATION
    ===================================================== */

    if (
      !summary.overview &&
      !summary.impact &&
      !summary.takeaway
    ) {
      return NextResponse.json(
        {
          success: false,
          summary: null,
          error:
            "AI Summary generation returned empty content.",
        },
        {
          status: 500,
        },
      );
    }

    /* =====================================================
       SAVE SUMMARY
    ===================================================== */

    const generatedAt =
      new Date();

    await prisma.article.update({
      where: {
        id: article.id,
      },

      data: {
        aiSummary: {
          overview:
            summary.overview,

          impact:
            summary.impact,

          takeaway:
            summary.takeaway,
        },

        aiGenerated: true,

        aiVersion: "v1",

        generatedAt,
      },
    });

    /* =====================================================
       RESPONSE
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        summary,

        cached: false,

        aiVersion: "v1",

        generatedAt:
          generatedAt.toISOString(),
      },
      {
        status: 200,

        headers: {
          "Cache-Control":
            "private, no-store",

          "Content-Type":
            "application/json",
        },
      },
    );
  } catch (error: any) {
    console.error(
      "AI SUMMARY API ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        summary: null,

        error:
          error?.message ||
          "Failed to generate AI Summary.",
      },
      {
        status: 500,

        headers: {
          "Cache-Control":
            "no-store",

          "Content-Type":
            "application/json",
        },
      },
    );
  }
}