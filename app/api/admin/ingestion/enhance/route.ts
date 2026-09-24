import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  enhanceNewsIntelligence,
} from "@/lib/nationpath-ai/news-engine/generator";

// ============================================================
// DEFAULT ENHANCEMENT MODULES
// ============================================================

const DEFAULT_MODULES = [
  "mainStory",
  "brief",
  "keyTakeaways",
  "keyHighlights",
  "whyItMatters",
  "whatsNext",
  "background",
  "expertOpinion",
  "suggestedCategory",
  "timeline",
  "factChecks",
  "faqs",
  "seo",
  "data",
];

// ============================================================
// HELPERS
// ============================================================

function cleanString(value: unknown): string {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function safeModules(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [...DEFAULT_MODULES];
  }

  const modules = Array.from(
    new Set(
      value.filter(
        (item): item is string =>
          typeof item === "string" &&
          DEFAULT_MODULES.includes(item)
      )
    )
  );

  return modules.length > 0
    ? modules
    : [...DEFAULT_MODULES];
}

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function buildOriginalSnapshot(article: any) {
  return {
    capturedAt: new Date().toISOString(),

    articleId: article.id,

    title: article.title,
    slug: article.slug,
    content: article.content,
    excerpt: article.excerpt,

    shortBrief: article.shortBrief,

    keyHighlights: article.keyHighlights,
    whyItMatters: article.whyItMatters,
    background: article.background,
    timeline: article.timeline,
    factCheck: article.factCheck,
    whatsNext: article.whatsNext,
    keyTakeaways: article.keyTakeaways,
    faqItems: article.faqItems,
    expertOpinion: article.expertOpinion,

    metaTitle: article.metaTitle,
    metaDescription: article.metaDescription,
    metaKeywords: article.metaKeywords,

    tags: article.tags,

    aiQualityScore: article.aiQualityScore,
    aiQualityBreakdown:
      article.aiQualityBreakdown,
    aiQualityFlags:
      article.aiQualityFlags,

    aiEnhanced: article.aiEnhanced,
    aiEnhancedAt: article.aiEnhancedAt,
    aiEnhancementVersion:
      article.aiEnhancementVersion,
  };
}

function buildCurrentArticlePayload(
  article: any
) {
  return {
    title: article.title,
    slug: article.slug,
    content: article.content,
    excerpt: article.excerpt,

    shortBrief: article.shortBrief,

    keyHighlights: article.keyHighlights,
    whyItMatters: article.whyItMatters,
    background: article.background,
    timeline: article.timeline,
    factCheck: article.factCheck,
    whatsNext: article.whatsNext,
    keyTakeaways: article.keyTakeaways,
    faqItems: article.faqItems,
    expertOpinion: article.expertOpinion,

    metaTitle: article.metaTitle,
    metaDescription:
      article.metaDescription,
    metaKeywords:
      article.metaKeywords,

    tags: article.tags,

    aiQualityScore:
      article.aiQualityScore,

    aiQualityBreakdown:
      article.aiQualityBreakdown,

    aiQualityFlags:
      article.aiQualityFlags,
  };
}

function createPreviewId(): string {
  return `enhance-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

// ============================================================
// POST — ENHANCE PREVIEW
// ============================================================

export async function POST(
  req: NextRequest
) {
  let articleId = "";

  try {
    const body = await req.json();

    articleId = cleanString(
      body.articleId
    );

    const modulesToEnhance =
      safeModules(
        body.modulesToEnhance
      );

    const isEditorial =
      body.isEditorial === true;

    // ========================================================
    // 1. VALIDATE REQUEST
    // ========================================================

    if (!articleId) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Article ID is required.",
        },
        { status: 400 }
      );
    }

    // ========================================================
    // 2. FETCH ARTICLE
    // ========================================================

    const article =
      await prisma.article.findUnique({
        where: {
          id: articleId,
        },

        include: {
          category: true,

          ingestedFeeds: {
            include: {
              source: true,
            },
          },
        },
      });

    if (!article) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Article not found.",
        },
        { status: 404 }
      );
    }

    // ========================================================
    // 3. AI-GENERATED ONLY
    // ========================================================

    if (!article.aiGenerated) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Enhancement is available only for AI-generated articles.",
        },
        { status: 400 }
      );
    }

    // ========================================================
    // 4. DRAFT ONLY
    // ========================================================

    if (article.status !== "draft") {
      return NextResponse.json(
        {
          success: false,
          error:
            "Only draft articles can be enhanced.",
        },
        { status: 400 }
      );
    }

    // ========================================================
    // 5. ORIGINAL SOURCE MATERIAL
    // ========================================================

    const sourceFeed =
      article.ingestedFeeds?.[0];

    if (!sourceFeed) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Original ingestion source not found for this article.",
        },
        { status: 400 }
      );
    }

    const sourceName =
      sourceFeed.source?.name ||
      "Unknown";

    const sourceCategory =
      sourceFeed.source?.category ||
      article.category?.name ||
      "General";

    const sourceKeywords =
      sourceFeed.keywords
        ?.join(", ") ||
      "None";

    const originalSource = `
Source: ${sourceName}

Category: ${sourceCategory}

Keywords: ${sourceKeywords}

Title:
${sourceFeed.title}

Original Description:
${
  sourceFeed.description ||
  sourceFeed.title
}

Original Source URL:
${
  sourceFeed.sourceUrl ||
  "Not available"
}
`.trim();

    // ========================================================
    // 6. CURRENT ARTICLE
    // ========================================================

    const currentArticle =
      buildCurrentArticlePayload(
        article
      );

    // ========================================================
    // 7. PERMANENT ORIGINAL SNAPSHOT
    // ========================================================

    /*
     * IMPORTANT:
     *
     * The original snapshot represents the
     * first article state before any AI
     * enhancement is applied.
     *
     * If one already exists, it is NEVER
     * replaced.
     */

    const hasExistingSnapshot =
      article.aiOriginalSnapshot !==
        null &&
      article.aiOriginalSnapshot !==
        undefined;

    const originalSnapshot =
      hasExistingSnapshot
        ? cloneJson(
            article.aiOriginalSnapshot
          )
        : buildOriginalSnapshot(
            article
          );

    // ========================================================
    // 8. GEMINI ENHANCEMENT
    // ========================================================

    console.log(
      `✨ Starting AI enhancement preview: ${article.id}`
    );

    console.log(
      `Modules: ${modulesToEnhance.join(
        ", "
      )}`
    );

    const enhancement =
      await enhanceNewsIntelligence(
        article.title,
        originalSource,
        currentArticle,
        modulesToEnhance,
        isEditorial
      );

    // ========================================================
    // 9. VALIDATE GEMINI RESULT
    // ========================================================

    if (
      !enhancement ||
      !enhancement.enhancedContent
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "AI enhancement returned no enhanced content.",
        },
        { status: 500 }
      );
    }

    if (
      !enhancement.qualityAssessment
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "AI enhancement returned no quality assessment.",
        },
        { status: 500 }
      );
    }

    // ========================================================
    // 10. PREPARE BEFORE / AFTER
    // ========================================================

    const before =
      cloneJson(
        currentArticle
      );

    const after =
      cloneJson(
        enhancement.enhancedContent
      );

    const changes =
      cloneJson(
        enhancement.changes || []
      );

    const qualityAssessment =
      cloneJson(
        enhancement.qualityAssessment
      );

    // ========================================================
    // 11. CREATE PREVIEW ENTRY
    // ========================================================

    const previewId =
      createPreviewId();

    const enhancementEntry = {
      id: previewId,

      createdAt:
        new Date().toISOString(),

      action:
        "enhance_preview",

      modules:
        [...modulesToEnhance],

      /*
       * EXACT GEMINI OUTPUT
       *
       * Apply API uses this instead
       * of running Gemini again.
       */
      enhancedContent: after,

      /*
       * BEFORE STATE
       *
       * Used for UI and audit trail.
       */
      before,

      /*
       * AFTER STATE
       *
       * Exact generated preview.
       */
      after,

      /*
       * Human-readable module changes.
       */
      changes,

      /*
       * Backend quality assessment.
       */
      qualityAssessment,

      /*
       * Not applied yet.
       */
      applied: false,
    };

    // ========================================================
    // 12. EXISTING CHANGE LOG
    // ========================================================

    const previousChangeLog =
      Array.isArray(
        article.aiChangeLog
      )
        ? cloneJson(
            article.aiChangeLog
          )
        : [];

    /*
     * Keep audit history bounded.
     *
     * Latest preview remains available.
     */
    const nextChangeLog = [
      ...previousChangeLog,
      enhancementEntry,
    ].slice(-50);

    // ========================================================
    // 13. DATABASE UPDATE
    // ========================================================

    /*
     * IMPORTANT:
     *
     * We DO NOT update:
     *
     * - content
     * - excerpt
     * - shortBrief
     * - keyHighlights
     * - keyTakeaways
     * - whyItMatters
     * - background
     * - timeline
     * - factCheck
     * - faqItems
     * - expertOpinion
     * - whatsNext
     * - SEO fields
     *
     * Preview means preview only.
     */

    const updateData: Record<
      string,
      unknown
    > = {
      /*
       * Permanent original snapshot:
       * only create if missing.
       */
      aiOriginalSnapshot:
        hasExistingSnapshot
          ? article.aiOriginalSnapshot
          : originalSnapshot,

      /*
       * Latest quality result belongs
       * to the latest generated preview.
       */
      aiQualityScore:
        qualityAssessment.score,

      aiQualityBreakdown:
        qualityAssessment.breakdown,

      aiQualityFlags:
        qualityAssessment.flags,

      /*
       * Still not applied.
       */
      aiEnhanced: false,

      /*
       * Full preview + audit history.
       */
      aiChangeLog:
        nextChangeLog,
    };

    await prisma.article.update({
      where: {
        id: article.id,
      },

      data: updateData as any,
    });

    // ========================================================
    // 14. RESPONSE
    // ========================================================

    console.log(
      `✅ AI enhancement preview saved: ${previewId}`
    );

    return NextResponse.json({
      success: true,

      data: {
        articleId:
          article.id,

        title:
          article.title,

        previewId,

        modules:
          modulesToEnhance,

        /*
         * Original/current article state
         * before enhancement.
         */
        before,

        /*
         * Exact Gemini-generated output.
         */
        after,

        /*
         * Human-readable change list.
         */
        changes,

        /*
         * Backend quality score.
         */
        qualityAssessment,

        /*
         * Enhancement is still not
         * applied to article content.
         */
        aiEnhanced: false,

        applied: false,

        /*
         * Indicates whether this request
         * created the permanent baseline.
         */
        snapshotCreated:
          !hasExistingSnapshot,

        /*
         * Apply API can identify the
         * exact preview through this ID.
         */
        previewStored: true,
      },

      message:
        "AI enhancement preview generated and securely stored. No article content has been applied.",
    });
  } catch (error: unknown) {
    console.error(
      "❌ AI Article Enhancement Failed:",
      {
        articleId,
        error,
      }
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Failed to enhance article.",
      },
      { status: 500 }
    );
  }
}