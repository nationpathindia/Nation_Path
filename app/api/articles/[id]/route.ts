import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PostStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

/* =====================================================
   TYPES
===================================================== */

type RouteContext = {
  params: {
    id: string;
  };
};

type ImageGalleryItem = {
  url: string;
  alt: string;
  caption: string;
  isPrimary: boolean;
};

/* =====================================================
   UTILITIES
===================================================== */

function stripHtml(html: string) {
  return html?.replace(/<[^>]*>?/gm, "") || "";
}

function calculateReadingTime(content: string) {
  const clean = stripHtml(content)
    .replace(/\s+/g, " ")
    .trim();

  const words = clean ? clean.split(" ").length : 0;

  return Math.max(1, Math.ceil(words / 200));
}

function generateExcerpt(content: string) {
  const clean = stripHtml(content)
    .replace(/\s+/g, " ")
    .trim();

  if (!clean) {
    return "";
  }

  const words = clean.split(" ");

  const excerpt = words
    .slice(0, 35)
    .join(" ");

  return excerpt.length < clean.length
    ? `${excerpt}...`
    : excerpt;
}

/* =====================================================
   SLUG INTELLIGENCE
===================================================== */

function createBaseSlug(title: string) {
  const normalized = String(title || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  const slug = normalized
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug;
}

async function generateUniqueSlug(
  title: string,
  currentId?: string
) {
  const baseSlug = createBaseSlug(title);

  /*
   * Never create an empty slug.
   * The title is required by the article creation/update flow,
   * but this protects the route from malformed input.
   */
  if (!baseSlug) {
    return currentId
      ? `article-${currentId}`
      : `article-${Date.now()}`;
  }

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.article.findFirst({
      where: {
        slug,

        ...(currentId
          ? {
              NOT: {
                id: currentId,
              },
            }
          : {}),
      },
      select: {
        id: true,
      },
    });

    if (!existing) {
      break;
    }

    slug = `${baseSlug}-${counter++}`;
  }

  return slug;
}

/* =====================================================
   IMAGE INTELLIGENCE
===================================================== */

function normalizeImageGallery(
  images: any
): ImageGalleryItem[] {
  if (!Array.isArray(images)) {
    return [];
  }

  const gallery = images
    .filter(
      (img: any) =>
        img &&
        typeof img.url === "string" &&
        img.url.trim()
    )
    .slice(0, 5)
    .map(
      (img: any): ImageGalleryItem => ({
        url: img.url.trim(),

        alt:
          typeof img.alt === "string" &&
          img.alt.trim()
            ? img.alt.trim()
            : "NationPath Editorial Image",

        caption:
          typeof img.caption === "string"
            ? img.caption.trim()
            : "",

        isPrimary: Boolean(img.isPrimary),
      })
    );

  /*
   * Guarantee one primary image when gallery exists.
   */
  if (
    gallery.length &&
    !gallery.some((img) => img.isPrimary)
  ) {
    gallery[0].isPrimary = true;
  }

  /*
   * Guarantee only one primary image.
   */
  if (
    gallery.filter((img) => img.isPrimary).length > 1
  ) {
    let found = false;

    gallery.forEach((img) => {
      if (img.isPrimary) {
        if (found) {
          img.isPrimary = false;
        } else {
          found = true;
        }
      }
    });
  }

  return gallery;
}

/* =====================================================
   ARRAY INTELLIGENCE
===================================================== */

function normalizeArray(
  value: any,
  fallback: any
) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    return value
      .split("\n")
      .map((x: string) => x.trim())
      .filter(Boolean);
  }

  return fallback;
}

/* =====================================================
   STATUS INTELLIGENCE
===================================================== */

function isValidPostStatus(
  value: any
): value is PostStatus {
  return Object.values(PostStatus).includes(
    value as PostStatus
  );
}

function getDisplayStatus(article: any) {
  let displayStatus = article.status;

  if (
    article.status === PostStatus.approved &&
    article.publishedAt &&
    new Date(article.publishedAt) > new Date()
  ) {
    displayStatus = "scheduled";
  }

  return displayStatus;
}

/* =====================================================
   GET SINGLE ARTICLE
===================================================== */

export async function GET(
  req: Request,
  { params }: RouteContext
) {
  try {
    const id = params?.id?.trim();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Article ID required",
        },
        {
          status: 400,
        }
      );
    }

    const article =
      await prisma.article.findFirst({
        where: {
          id,
          isDeleted: false,
        },

        include: {
          category: true,
          author: true,
        },
      });

    if (!article) {
      return NextResponse.json(
        {
          success: false,
          error: "Article not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      article: {
        ...article,
        displayStatus: getDisplayStatus(article),
      },
    });
  } catch (error: any) {
    console.error(
      "GET ARTICLE ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Failed to fetch article",
      },
      {
        status: 500,
      }
    );
  }
}

/* =====================================================
   PATCH STATUS UPDATE
===================================================== */

export async function PATCH(
  req: Request,
  { params }: RouteContext
) {
  try {
    const id = params?.id?.trim();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Article ID required",
        },
        {
          status: 400,
        }
      );
    }

    const body = await req.json();

    if (!body.status) {
      return NextResponse.json(
        {
          success: false,
          error: "Status required",
        },
        {
          status: 400,
        }
      );
    }

    const value = String(body.status)
      .toLowerCase()
      .trim();

    if (!isValidPostStatus(value)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid article status",
        },
        {
          status: 400,
        }
      );
    }

    const existing =
      await prisma.article.findFirst({
        where: {
          id,
          isDeleted: false,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: "Article not found",
        },
        {
          status: 404,
        }
      );
    }

    const updated =
      await prisma.article.update({
        where: {
          id,
        },

        data: {
          status: value,
        },

        include: {
          category: true,
          author: true,
        },
      });

    return NextResponse.json({
      success: true,
      article: {
        ...updated,
        displayStatus:
          getDisplayStatus(updated),
      },
    });
  } catch (error: any) {
    console.error(
      "PATCH ARTICLE ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Status update failed",
      },
      {
        status: 500,
      }
    );
  }
}

/* =====================================================
   PUT UPDATE ARTICLE
===================================================== */

export async function PUT(
  req: Request,
  { params }: RouteContext
) {
  try {
    const id = params?.id?.trim();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Article ID required",
        },
        {
          status: 400,
        }
      );
    }

    const body = await req.json();

    /* =====================================================
       EXISTING ARTICLE
    ===================================================== */

    const existing =
      await prisma.article.findFirst({
        where: {
          id,
          isDeleted: false,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: "Article not found",
        },
        {
          status: 404,
        }
      );
    }

    /* =====================================================
       BASIC DATA
    ===================================================== */

    const title =
      body.title !== undefined
        ? String(body.title).trim()
        : existing.title;

    if (!title) {
      return NextResponse.json(
        {
          success: false,
          error: "Title required",
        },
        {
          status: 400,
        }
      );
    }

    const content =
      body.content !== undefined
        ? String(body.content)
        : existing.content;

    if (!content.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Content required",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       SLUG
       Existing slug remains untouched unless title changes.
    ===================================================== */

    const slug =
      body.title !== undefined &&
      title !== existing.title
        ? await generateUniqueSlug(
            title,
            id
          )
        : existing.slug;

    /* =====================================================
       IMAGES
    ===================================================== */

    const cleanImageGallery =
      Array.isArray(body.imageGallery)
        ? normalizeImageGallery(
            body.imageGallery
          )
        : normalizeImageGallery(
            existing.imageGallery
          );

    const primaryImage =
      cleanImageGallery.find(
        (img) => img.isPrimary
      ) ||
      cleanImageGallery[0];

    const cleanImages =
      Array.isArray(body.imageGallery)
        ? primaryImage
          ? [primaryImage.url]
          : []
        : Array.isArray(body.images)
        ? body.images
            .filter(
              (img: any) =>
                typeof img === "string" &&
                img.trim()
            )
            .map((img: string) =>
              img.trim()
            )
        : existing.images;

    /* =====================================================
       VIDEO NORMALIZATION
    ===================================================== */

    const videoUrl =
      body.videoUrl !== undefined
        ? body.videoUrl || null
        : existing.videoUrl;

    const videoEmbed =
      body.videoEmbed !== undefined
        ? body.videoEmbed || null
        : existing.videoEmbed;

    const videoThumbnail =
      body.videoThumbnail !== undefined
        ? body.videoThumbnail || null
        : existing.videoThumbnail;

    const videoTitle =
      body.videoTitle !== undefined
        ? body.videoTitle || null
        : existing.videoTitle;

    const videoPosition =
      body.videoPosition !== undefined
        ? body.videoPosition ||
          "middle"
        : existing.videoPosition;

    /* =====================================================
       BREAKING LOGIC
    ===================================================== */

    let breakingStart =
      existing.breakingStart;

    let breakingEnd =
      existing.breakingEnd;

    if (body.breaking === true) {
      const duration =
        Number(
          body.breakingDuration
        ) || 60;

      breakingStart = new Date();

      breakingEnd = new Date(
        Date.now() +
          duration * 60 * 1000
      );
    }

    if (body.breaking === false) {
      breakingStart = null;
      breakingEnd = null;
    }

    /* =====================================================
       INTELLIGENCE DATA
    ===================================================== */

    const keyHighlights =
      normalizeArray(
        body.keyHighlights,
        existing.keyHighlights
      );

    const keyTakeaways =
      normalizeArray(
        body.keyTakeaways,
        existing.keyTakeaways
      );

    const timeline =
      body.timeline !== undefined
        ? body.timeline
        : existing.timeline;

    const expertOpinion =
      body.expertOpinion !== undefined
        ? body.expertOpinion
        : existing.expertOpinion;

    const factCheck =
      body.factCheck !== undefined
        ? body.factCheck
        : existing.factCheck;

    const faqItems =
      Array.isArray(body.faqItems)
        ? body.faqItems
            .filter(
              (item: any) =>
                item &&
                item.question?.trim() &&
                item.answer?.trim()
            )
            .map((item: any) => ({
              question:
                item.question.trim(),
              answer:
                item.answer.trim(),
            }))
        : existing.faqItems;

    /* =====================================================
       SCHEDULE NORMALIZATION
    ===================================================== */

    let scheduledAt =
      existing.scheduledAt;

    if (
      body.scheduledAt !== undefined
    ) {
      if (body.scheduledAt) {
        const date = new Date(
          body.scheduledAt
        );

        if (isNaN(date.getTime())) {
          return NextResponse.json(
            {
              success: false,
              error:
                "Invalid scheduledAt date",
            },
            {
              status: 400,
            }
          );
        }

        scheduledAt = date;
      } else {
        scheduledAt = null;
      }
    }

    /* =====================================================
       PUBLISHED DATE
    ===================================================== */

    let publishedAt =
      existing.publishedAt;

    if (
      body.publishedAt !== undefined
    ) {
      if (body.publishedAt) {
        const date = new Date(
          body.publishedAt
        );

        if (isNaN(date.getTime())) {
          return NextResponse.json(
            {
              success: false,
              error:
                "Invalid publishedAt date",
            },
            {
              status: 400,
            }
          );
        }

        publishedAt = date;
      } else {
        publishedAt = null;
      }
    }

    /* =====================================================
       STATUS
    ===================================================== */

    let status =
      existing.status;

    if (body.status !== undefined) {
      const value = String(
        body.status
      )
        .toLowerCase()
        .trim();

      if (!isValidPostStatus(value)) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Invalid article status",
          },
          {
            status: 400,
          }
        );
      }

      status = value;
    }

    /* =====================================================
       CATEGORY
    ===================================================== */

    let categoryId =
      existing.categoryId;

    if (
      body.categoryId !== undefined
    ) {
      categoryId =
        body.categoryId || null;
    }

    /* =====================================================
       CATEGORY VALIDATION
    ===================================================== */

    if (categoryId) {
      const category =
        await prisma.category.findUnique(
          {
            where: {
              id: categoryId,
            },
          }
        );

      if (!category) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Invalid category",
          },
          {
            status: 400,
          }
        );
      }
    }

    /* =====================================================
       SEO
    ===================================================== */

    const excerpt =
      body.excerpt !== undefined
        ? body.excerpt ||
          generateExcerpt(content)
        : existing.excerpt ||
          generateExcerpt(content);

    const readingTime =
      body.readingTime !== undefined
        ? Number(body.readingTime)
        : existing.readingTime ||
          calculateReadingTime(content);

    const metaTitle =
      body.metaTitle !== undefined
        ? body.metaTitle ||
          title
        : existing.metaTitle ||
          title;

    const metaDescription =
      body.metaDescription !==
      undefined
        ? body.metaDescription ||
          generateExcerpt(content)
        : existing.metaDescription ||
          generateExcerpt(content);

    const metaKeywords =
      body.metaKeywords !== undefined
        ? body.metaKeywords
        : existing.metaKeywords ||
          title
            .toLowerCase()
            .split(/\s+/)
            .slice(0, 10)
            .join(",");

    /* =====================================================
       UPDATE ARTICLE
    ===================================================== */

    const updated =
      await prisma.article.update({
        where: {
          id,
        },

        data: {
          /* BASIC */

          title,

          slug,

          content,

          excerpt,

          /* MEDIA */

          images: cleanImages,

          imageGallery:
            cleanImageGallery,

          videoUrl,

          videoEmbed,

          videoThumbnail,

          videoTitle,

          videoPosition,

          /* NEWS CONTROLS */

          breaking:
            body.breaking !== undefined
              ? Boolean(
                  body.breaking
                )
              : existing.breaking,

          breakingStart,

          breakingEnd,

          breakingPriority:
            body.breakingPriority !==
            undefined
              ? Number(
                  body.breakingPriority
                )
              : existing.breakingPriority,

          flash:
            body.flash !== undefined
              ? Boolean(body.flash)
              : existing.flash,

          flashPriority:
            body.flashPriority !==
            undefined
              ? Number(
                  body.flashPriority
                )
              : existing.flashPriority,

          featured:
            body.featured !== undefined
              ? Boolean(
                  body.featured
                )
              : existing.featured,

          homepagePriority:
            body.homepagePriority !==
            undefined
              ? Number(
                  body.homepagePriority
                )
              : existing.homepagePriority,

          isEditorial:
            body.isEditorial !==
            undefined
              ? Boolean(
                  body.isEditorial
                )
              : existing.isEditorial,

          isAstrology:
            body.isAstrology !==
            undefined
              ? Boolean(
                  body.isAstrology
                )
              : existing.isAstrology,

          /* INTELLIGENCE */

          shortBrief:
            body.shortBrief !==
            undefined
              ? body.shortBrief
              : existing.shortBrief,

          background:
            body.background !==
            undefined
              ? body.background
              : existing.background,

          timeline,

          expertOpinion,

          factCheck,

          whatsNext:
            body.whatsNext !==
            undefined
              ? body.whatsNext
              : existing.whatsNext,

          keyHighlights,

          keyTakeaways,

          whyItMatters:
            body.whyItMatters !==
            undefined
              ? body.whyItMatters
              : existing.whyItMatters,

          sourceDesk:
            body.sourceDesk !==
            undefined
              ? body.sourceDesk
              : existing.sourceDesk,

          /* FAQ */

          faqItems,

          /* SEO */

          readingTime,

          metaTitle,

          metaDescription,

          metaKeywords,

          /* PUBLISHING */

          publishedAt,

          scheduledAt,

          status,

          /* CATEGORY */

          categoryId,
        },

        include: {
          category: true,
          author: true,
        },
      });

    return NextResponse.json({
      success: true,
      article: {
        ...updated,
        displayStatus:
          getDisplayStatus(updated),
      },
    });
  } catch (error: any) {
    console.error(
      "UPDATE ARTICLE ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Update failed",
      },
      {
        status: 500,
      }
    );
  }
}
/* =====================================================
   DELETE ARTICLE
   HARD DELETE — RECORD IS PERMANENTLY REMOVED
===================================================== */

export async function DELETE(
  req: Request,
  { params }: RouteContext
) {
  try {
    const id = params?.id?.trim();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Article ID required",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       CHECK ARTICLE EXISTS
    ===================================================== */

    const existing =
      await prisma.article.findFirst({
        where: {
          id,
          isDeleted: false,
        },
        select: {
          id: true,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: "Article not found",
        },
        {
          status: 404,
        }
      );
    }

    /* =====================================================
       HARD DELETE
       Permanently removes the article from database.
    ===================================================== */

    await prisma.article.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Article permanently deleted",
    });
  } catch (error: any) {
    console.error(
      "DELETE ARTICLE ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Delete failed",
      },
      {
        status: 500,
      }
    );
  }
}

