import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type ApplyAction =
  | "apply_all"
  | "apply_selected"
  | "discard"
  | "restore_original";

const ALLOWED_MODULES = [
  "mainStory",
  "brief",
  "keyHighlights",
  "keyTakeaways",
  "whyItMatters",
  "background",
  "expertOpinion",
  "whatsNext",
  "timeline",
  "factChecks",
  "faqs",
  "suggestedCategory",
  "seo",
  "data",
] as const;

type AllowedModule = (typeof ALLOWED_MODULES)[number];

type ChangeLogEntry = {
  id?: string;
  timestamp?: string;
  action?: string;
  modules?: string[];
  changes?: unknown[];
  qualityAssessment?: unknown;
  enhancedContent?: unknown;
  before?: unknown;
  after?: unknown;
  applied?: boolean;
  appliedAt?: string;
  discardedAt?: string;
  restoredAt?: string;
};

function cleanString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;

  const cleaned = value.trim();
  return cleaned.length > 0 ? cleaned : undefined;
}

function safeModules(value: unknown): AllowedModule[] {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (module): module is AllowedModule =>
      typeof module === "string" &&
      ALLOWED_MODULES.includes(module as AllowedModule)
  );
}

function asObject(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, unknown>;
}

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function createLogId(): string {
  return `enhance_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

function normalizeKeyHighlights(
  value: unknown
): string[] | undefined {
  if (!value) return undefined;

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") {
          return item.trim();
        }

        if (item && typeof item === "object") {
          const obj = item as Record<string, unknown>;

          const label =
            cleanString(obj.label) ||
            cleanString(obj.title) ||
            cleanString(obj.key);

          const text =
            cleanString(obj.value) ||
            cleanString(obj.text) ||
            cleanString(obj.description);

          if (label && text) {
            return `${label}: ${text}`;
          }

          return text || label || "";
        }

        return "";
      })
      .filter(Boolean);
  }

  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;

    return Object.entries(obj)
      .filter(
        ([, item]) =>
          item !== null && item !== undefined
      )
      .map(([key, item]) => {
        const label = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (char) => char.toUpperCase())
          .trim();

        if (typeof item === "string") {
          return `${label}: ${item.trim()}`;
        }

        if (
          typeof item === "number" ||
          typeof item === "boolean"
        ) {
          return `${label}: ${String(item)}`;
        }

        try {
          return `${label}: ${JSON.stringify(item)}`;
        } catch {
          return label;
        }
      })
      .filter(Boolean);
  }

  return undefined;
}

function normalizeKeyTakeaways(
  value: unknown
): string[] | undefined {
  if (!Array.isArray(value)) return undefined;

  return value
    .map((item) => {
      if (typeof item === "string") {
        return item.trim();
      }

      if (item && typeof item === "object") {
        const obj = item as Record<string, unknown>;

        return (
          cleanString(obj.text) ||
          cleanString(obj.point) ||
          cleanString(obj.title) ||
          ""
        );
      }

      return "";
    })
    .filter(Boolean);
}

function buildArticleUpdate(
  enhancedContent: Record<string, unknown>,
  modules: AllowedModule[]
): Record<string, unknown> {
  const update: Record<string, unknown> = {};

  if (modules.includes("mainStory")) {
    const value = cleanString(
      enhancedContent.mainStory
    );

    if (value) {
      update.content = value;
    }
  }

  if (modules.includes("brief")) {
    const value = cleanString(
      enhancedContent.brief
    );

    if (value) {
      update.shortBrief = value;
      update.excerpt = value;
    }
  }

  if (modules.includes("keyHighlights")) {
    const value = normalizeKeyHighlights(
      enhancedContent.keyHighlights
    );

    if (value && value.length > 0) {
      update.keyHighlights = value;
    }
  }

  if (modules.includes("keyTakeaways")) {
    const value = normalizeKeyTakeaways(
      enhancedContent.keyTakeaways
    );

    if (value && value.length > 0) {
      update.keyTakeaways = value;
    }
  }

  if (modules.includes("whyItMatters")) {
    const raw = enhancedContent.whyItMatters;

    if (typeof raw === "string") {
      const value = cleanString(raw);

      if (value) {
        update.whyItMatters = value;
      }
    } else if (
      raw &&
      typeof raw === "object"
    ) {
      update.whyItMatters = JSON.stringify(raw);
    }
  }

  if (modules.includes("background")) {
    const value = cleanString(
      enhancedContent.background
    );

    if (value) {
      update.background = value;
    }
  }

  if (modules.includes("expertOpinion")) {
    const value = enhancedContent.expertOpinion;

    if (
      value !== undefined &&
      value !== null
    ) {
      update.expertOpinion = cloneJson(value);
    }
  }

  if (modules.includes("whatsNext")) {
    const value = cleanString(
      enhancedContent.whatsNext
    );

    if (value) {
      update.whatsNext = value;
    }
  }

  if (modules.includes("timeline")) {
    const value = enhancedContent.timeline;

    if (
      value !== undefined &&
      value !== null
    ) {
      update.timeline = cloneJson(value);
    }
  }

  if (modules.includes("factChecks")) {
    const value =
      enhancedContent.factChecks ??
      enhancedContent.factCheck;

    if (
      value !== undefined &&
      value !== null
    ) {
      update.factCheck = cloneJson(value);
    }
  }

  if (modules.includes("faqs")) {
    const value =
      enhancedContent.faqs ??
      enhancedContent.faqItems;

    if (
      value !== undefined &&
      value !== null
    ) {
      update.faqItems = cloneJson(value);
    }
  }

  if (modules.includes("seo")) {
    const seoTitle =
      cleanString(
        enhancedContent.seoTitle
      ) ||
      cleanString(
        enhancedContent.metaTitle
      );

    const metaDescription = cleanString(
      enhancedContent.metaDescription
    );

    const metaKeywords = cleanString(
      enhancedContent.metaKeywords
    );

    const slug =
      cleanString(
        enhancedContent.urlSlug
      ) ||
      cleanString(
        enhancedContent.slug
      );

    if (seoTitle) {
      update.metaTitle = seoTitle;
    }

    if (metaDescription) {
      update.metaDescription =
        metaDescription;
    }

    if (metaKeywords) {
      update.metaKeywords =
        metaKeywords;
    }

    if (slug) {
      update.slug = slug;
    }
  }

  /*
   * suggestedCategory is deliberately not
   * applied from free-form AI text.
   *
   * Category is a relational field and must
   * be resolved explicitly before changing
   * categoryId.
   */

  return update;
}

function buildRestoreUpdate(
  snapshot: Record<string, unknown>
): Record<string, unknown> {
  const update: Record<string, unknown> = {};

  const stringFields = [
    "title",
    "slug",
    "content",
    "excerpt",
    "shortBrief",
    "whyItMatters",
    "background",
    "whatsNext",
    "metaTitle",
    "metaDescription",
    "metaKeywords",
  ];

  for (const field of stringFields) {
    const value = snapshot[field];

    if (typeof value === "string") {
      update[field] = value;
    }
  }

  const arrayFields = [
    "keyHighlights",
    "keyTakeaways",
    "tags",
  ];

  for (const field of arrayFields) {
    const value = snapshot[field];

    if (Array.isArray(value)) {
      update[field] = cloneJson(value);
    }
  }

  const jsonFields = [
    "timeline",
    "factCheck",
    "faqItems",
    "expertOpinion",
  ];

  for (const field of jsonFields) {
    if (
      Object.prototype.hasOwnProperty.call(
        snapshot,
        field
      )
    ) {
      update[field] = cloneJson(
        snapshot[field]
      );
    }
  }

  return update;
}

function parseChangeLog(
  value: unknown
): ChangeLogEntry[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is ChangeLogEntry =>
      !!item &&
      typeof item === "object" &&
      !Array.isArray(item)
  );
}

function jsonSafe(value: unknown): any {
  if (
    value === undefined ||
    value === null
  ) {
    return null;
  }

  try {
    return cloneJson(value);
  } catch {
    return null;
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const articleId = cleanString(
      body.articleId
    );

    const action = cleanString(
      body.action
    ) as ApplyAction | undefined;

    const requestedModules = safeModules(
      body.modulesToApply ??
        body.modules
    );

    if (!articleId) {
      return NextResponse.json(
        {
          success: false,
          error: "articleId is required.",
        },
        { status: 400 }
      );
    }

    if (
      !action ||
      ![
        "apply_all",
        "apply_selected",
        "discard",
        "restore_original",
      ].includes(action)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid action. Use apply_all, apply_selected, discard, or restore_original.",
        },
        { status: 400 }
      );
    }

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
          error: "Article not found.",
        },
        { status: 404 }
      );
    }

    if (!article.aiGenerated) {
      return NextResponse.json(
        {
          success: false,
          error:
            "This article was not generated by AI and cannot use the enhancement workflow.",
        },
        { status: 400 }
      );
    }

    if (article.status !== "draft") {
      return NextResponse.json(
        {
          success: false,
          error:
            "Only draft AI articles can be enhanced or restored.",
        },
        { status: 400 }
      );
    }

    const existingChangeLog =
      parseChangeLog(
        article.aiChangeLog
      );

    /*
     * ========================================================
     * DISCARD
     * ========================================================
     *
     * Discard never modifies article content.
     */
    if (action === "discard") {
      const now =
        new Date().toISOString();

      const nextChangeLog =
        existingChangeLog.map(
          (entry) => {
            if (
              entry.action ===
                "enhance_preview" &&
              entry.applied !== true &&
              !entry.discardedAt
            ) {
              return {
                ...entry,
                applied: false,
                discardedAt: now,
              };
            }

            return entry;
          }
        );

      await prisma.article.update({
        where: {
          id: articleId,
        },
        data: {
          aiEnhanced: false,
          aiChangeLog:
            nextChangeLog as any,
        },
      });

      return NextResponse.json({
        success: true,
        action,
        articleId,
        applied: false,
        message:
          "Enhancement discarded. Article content was not changed.",
      });
    }

    /*
     * ========================================================
     * RESTORE ORIGINAL
     * ========================================================
     */
    if (
      action === "restore_original"
    ) {
      const snapshot =
        asObject(
          article.aiOriginalSnapshot
        );

      if (
        Object.keys(snapshot)
          .length === 0
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Original snapshot is not available for this article.",
          },
          { status: 400 }
        );
      }

      const restoreUpdate =
        buildRestoreUpdate(
          snapshot
        );

      if (
        Object.keys(restoreUpdate)
          .length === 0
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Original snapshot does not contain restorable article content.",
          },
          { status: 400 }
        );
      }

      const now = new Date();

      const restoredLog: ChangeLogEntry =
        {
          id: createLogId(),
          timestamp:
            now.toISOString(),
          action:
            "restore_original",
          modules: [
            ...ALLOWED_MODULES,
          ],
          applied: true,
          restoredAt:
            now.toISOString(),
        };

      const nextChangeLog = [
        ...existingChangeLog,
        restoredLog,
      ].slice(-50);

      const restoreData: Record<
        string,
        unknown
      > = {
        ...restoreUpdate,

        aiEnhanced: false,
        aiEnhancedAt: null,
        aiEnhancementVersion: null,

        aiQualityScore:
          typeof snapshot.aiQualityScore ===
          "number"
            ? snapshot.aiQualityScore
            : null,

        aiQualityBreakdown:
          snapshot.aiQualityBreakdown !==
            undefined &&
          snapshot.aiQualityBreakdown !==
            null
            ? jsonSafe(
                snapshot.aiQualityBreakdown
              )
            : null,

        aiQualityFlags:
          Array.isArray(
            snapshot.aiQualityFlags
          )
            ? cloneJson(
                snapshot.aiQualityFlags
              )
            : [],

        aiChangeLog:
          nextChangeLog as any,

        lastEditedAt: now,
      };

      /*
       * IMPORTANT:
       *
       * aiOriginalSnapshot is intentionally
       * NOT included here.
       *
       * The original snapshot remains the
       * permanent baseline.
       */
      const updated =
        await prisma.article.update({
          where: {
            id: articleId,
          },
          data:
            restoreData as any,
          select: {
            id: true,
            title: true,
            slug: true,
            status: true,

            aiEnhanced: true,
            aiEnhancedAt: true,
            aiEnhancementVersion:
              true,

            aiQualityScore: true,
            aiQualityBreakdown:
              true,
            aiQualityFlags: true,

            aiOriginalSnapshot:
              true,
            aiChangeLog: true,

            lastEditedAt: true,
          },
        });

      return NextResponse.json({
        success: true,
        action,
        articleId,
        applied: true,
        restored: true,
        article: updated,
        message:
          "Original AI-generated article restored successfully.",
      });
    }

    /*
     * ========================================================
     * FIND PENDING PREVIEW
     * ========================================================
     */
    const pendingPreview =
      [...existingChangeLog]
        .reverse()
        .find(
          (entry) =>
            entry.action ===
              "enhance_preview" &&
            entry.applied !== true &&
            !entry.discardedAt
        );

    if (!pendingPreview) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No pending enhancement preview found. Generate an enhancement preview first.",
        },
        { status: 400 }
      );
    }

    /*
     * ========================================================
     * GET SERVER-STORED ENHANCED CONTENT
     * ========================================================
     */
    const storedEnhancedContent =
      asObject(
        pendingPreview.enhancedContent
      );

    let enhancedContent =
      storedEnhancedContent;

    /*
     * Backward-compatible fallback:
     * if enhancedContent was stored inside
     * "after", use it.
     */
    if (
      Object.keys(
        enhancedContent
      ).length === 0
    ) {
      enhancedContent =
        asObject(
          pendingPreview.after
        );
    }

    if (
      Object.keys(
        enhancedContent
      ).length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Enhanced content is missing from the pending preview. Please generate the enhancement preview again.",
        },
        { status: 400 }
      );
    }

    /*
     * ========================================================
     * MODULE SELECTION
     * ========================================================
     */
    let modulesToApply: AllowedModule[];

    if (action === "apply_all") {
      modulesToApply =
        safeModules(
          pendingPreview.modules
        );

      if (
        modulesToApply.length === 0
      ) {
        modulesToApply = [
          ...ALLOWED_MODULES,
        ];
      }
    } else {
      modulesToApply =
        requestedModules;

      if (
        modulesToApply.length === 0
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Select at least one module to apply.",
          },
          { status: 400 }
        );
      }

      const previewModules =
        safeModules(
          pendingPreview.modules
        );

      if (
        previewModules.length > 0
      ) {
        modulesToApply =
          modulesToApply.filter(
            (module) =>
              previewModules.includes(
                module
              )
          );
      }

      if (
        modulesToApply.length === 0
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "None of the selected modules are present in the enhancement preview.",
          },
          { status: 400 }
        );
      }
    }

    /*
     * ========================================================
     * BUILD SAFE ARTICLE UPDATE
     * ========================================================
     */
    const articleUpdate =
      buildArticleUpdate(
        enhancedContent,
        modulesToApply
      );

    if (
      Object.keys(articleUpdate)
        .length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No applicable article fields were found for the selected modules.",
        },
        { status: 400 }
      );
    }

    /*
     * ========================================================
     * SLUG COLLISION PROTECTION
     * ========================================================
     */
    if (
      typeof articleUpdate.slug ===
      "string"
    ) {
      const requestedSlug =
        articleUpdate.slug.trim();

      if (
        requestedSlug &&
        requestedSlug !==
          article.slug
      ) {
        const existingSlugArticle =
          await prisma.article.findFirst(
            {
              where: {
                slug: requestedSlug,
                id: {
                  not: articleId,
                },
              },
              select: {
                id: true,
              },
            }
          );

        if (existingSlugArticle) {
          delete articleUpdate.slug;
        }
      }
    }

    /*
     * ========================================================
     * QUALITY DATA
     * ========================================================
     */
    const qualityAssessment =
      asObject(
        pendingPreview.qualityAssessment
      );

    const score =
      typeof qualityAssessment.score ===
      "number"
        ? Math.max(
            0,
            Math.min(
              100,
              Math.round(
                qualityAssessment.score
              )
            )
          )
        : undefined;

    const breakdown =
      qualityAssessment.breakdown !==
      undefined
        ? jsonSafe(
            qualityAssessment.breakdown
          )
        : undefined;

    const flags =
      Array.isArray(
        qualityAssessment.flags
      )
        ? cloneJson(
            qualityAssessment.flags
          )
        : undefined;

    const now = new Date();

    /*
     * ========================================================
     * CHANGE LOG
     * ========================================================
     */
    const previewUpdated =
      existingChangeLog.map(
        (entry) => {
          if (
            entry.id ===
            pendingPreview.id
          ) {
            return {
              ...entry,
              applied: true,
              appliedAt:
                now.toISOString(),
            };
          }

          return entry;
        }
      );

    const appliedLog: ChangeLogEntry =
      {
        id: createLogId(),
        timestamp:
          now.toISOString(),
        action:
          action === "apply_all"
            ? "enhance_apply_all"
            : "enhance_apply_selected",
        modules:
          modulesToApply,
        changes:
          Array.isArray(
            pendingPreview.changes
          )
            ? cloneJson(
                pendingPreview.changes
              )
            : [],
        qualityAssessment:
          jsonSafe(
            pendingPreview.qualityAssessment
          ),
        applied: true,
        appliedAt:
          now.toISOString(),
      };

    const nextChangeLog = [
      ...previewUpdated,
      appliedLog,
    ].slice(-50);

    /*
     * ========================================================
     * FINAL DATABASE UPDATE
     * ========================================================
     */
    const data: Record<
      string,
      unknown
    > = {
      ...articleUpdate,

      aiEnhanced: true,
      aiEnhancedAt: now,
      aiEnhancementVersion:
        "gemini-enhancement-v1",

      aiChangeLog:
        nextChangeLog as any,

      lastEditedAt: now,
    };

    if (score !== undefined) {
      data.aiQualityScore = score;
    }

    if (
      breakdown !== undefined
    ) {
      data.aiQualityBreakdown =
        breakdown;
    }

    if (flags !== undefined) {
      data.aiQualityFlags = flags;
    }

    /*
     * IMPORTANT:
     *
     * aiOriginalSnapshot is NEVER
     * overwritten during Apply.
     *
     * Article remains draft.
     * No auto-publish.
     */
    const updated =
      await prisma.article.update({
        where: {
          id: articleId,
        },
        data: data as any,
        select: {
          id: true,
          title: true,
          slug: true,
          status: true,

          content: true,
          excerpt: true,
          shortBrief: true,

          keyHighlights: true,
          keyTakeaways: true,

          whyItMatters: true,
          background: true,
          timeline: true,

          expertOpinion: true,
          factCheck: true,
          faqItems: true,

          whatsNext: true,

          metaTitle: true,
          metaDescription: true,
          metaKeywords: true,

          aiGenerated: true,
          aiEnhanced: true,
          aiEnhancedAt: true,
          aiEnhancementVersion:
            true,

          aiQualityScore: true,
          aiQualityBreakdown:
            true,
          aiQualityFlags: true,

          /*
           * Verify that the permanent
           * original snapshot is still
           * present after Apply.
           */
          aiOriginalSnapshot:
            true,

          aiChangeLog: true,
          lastEditedAt: true,
        },
      });

    return NextResponse.json({
      success: true,
      action,
      articleId,
      modules: modulesToApply,
      applied: true,

      /*
       * Indicates whether some modules
       * were intentionally not applied.
       */
      partial:
        action === "apply_selected",

      article: updated,

      changes: Array.isArray(
        pendingPreview.changes
      )
        ? pendingPreview.changes
        : [],

      message:
        action === "apply_all"
          ? "All available AI enhancements applied successfully."
          : "Selected AI enhancements applied successfully.",
    });
  } catch (error: unknown) {
    console.error(
      "[AI ENHANCE APPLY] Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to apply AI enhancement.",
      },
      { status: 500 }
    );
  }
}