import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PostStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

/* =====================================================
   UTILITIES
===================================================== */

function stripHtml(html: string) {
  return html?.replace(/<[^>]*>?/gm, "") || "";
}

function generateExcerpt(content: string) {
  const clean = stripHtml(content)
    .replace(/\s+/g, " ")
    .trim();

  if (!clean) return "";

  const words = clean.split(" ");

  const excerpt = words
    .slice(0, 35)
    .join(" ");

  return excerpt.length < clean.length
    ? `${excerpt}...`
    : excerpt;
}

function calculateReadingTime(content: string) {
  const clean = stripHtml(content)
    .replace(/\s+/g, " ")
    .trim();

  const words = clean
    ? clean.split(" ").length
    : 0;

  return Math.max(
    1,
    Math.ceil(words / 200)
  );
}

/* =====================================================
   SLUG INTELLIGENCE
===================================================== */

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
async function generateUniqueSlug(
  source: string,
  currentId?: string
) {
  const baseSlug = normalizeSlug(source);

  if (!baseSlug) {
    return "";
  }

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const where: any = {
      slug,
    };

    if (currentId) {
      where.NOT = {
        id: currentId,
      };
    }

    const existing =
      await prisma.article.findFirst({
        where,
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

type ImageGalleryItem = {
  url: string;
  alt: string;
  caption: string;
  isPrimary: boolean;
};

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

        isPrimary: Boolean(
          img.isPrimary
        ),
      })
    );

  if (
    gallery.length &&
    !gallery.some(
      (img) => img.isPrimary
    )
  ) {
    gallery[0].isPrimary = true;
  }

  if (
    gallery.filter(
      (img) => img.isPrimary
    ).length > 1
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
   GET ARTICLES
===================================================== */

export async function GET(req: Request) {
  try {
    const { searchParams } =
      new URL(req.url);

    const page = Math.max(
      Number(searchParams.get("page")) || 1,
      1
    );

    const limit = Math.min(
      Number(searchParams.get("limit")) || 20,
      50
    );

    const status =
      searchParams.get("status");

    const search =
      searchParams.get("search") || "";

    const editorial =
      searchParams.get("editorial");

    const type =
      searchParams.get("type");

    const category =
      searchParams.get("category");

    const slug =
      searchParams.get("slug");

    const skip = (page - 1) * limit;

    const where: any = {
      isDeleted: false,
    };

    /* =================================================
       SLUG FILTER
    ================================================= */

    if (slug) {
      where.slug = normalizeSlug(slug);
    }

    /* =================================================
       STATUS FILTER
    ================================================= */

    if (status) {
      const value =
        status.toLowerCase();

      if (
        Object.values(PostStatus).includes(
          value as PostStatus
        )
      ) {
        where.status = value;
      }
    }

    /* =================================================
       SEARCH
    ================================================= */

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          excerpt: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    /* =================================================
       EDITORIAL
    ================================================= */

    if (editorial === "true") {
      where.isEditorial = true;
    }

    if (editorial === "false") {
      where.isEditorial = false;
    }

    /* =================================================
       TYPE
    ================================================= */

    if (type === "editorial") {
      where.isEditorial = true;
    }

    if (type === "news") {
      where.isEditorial = false;
      where.isAstrology = false;
    }

    /* =================================================
       CATEGORY
    ================================================= */

    if (category) {
      where.category = {
        name: {
          equals: category,
          mode: "insensitive",
        },
      };
    }

    /* =================================================
       DATABASE
    ================================================= */

    const [
      articles,
      total,
    ] = await Promise.all([
      prisma.article.findMany({
        where,
        skip,
        take: limit,

        orderBy: {
          createdAt: "desc",
        },

        include: {
          category: true,
          author: true,
        },
      }),

      prisma.article.count({
        where,
      }),
    ]);

    /* =================================================
       DISPLAY STATUS INTELLIGENCE
       Database status remains unchanged
    ================================================= */

    const formattedArticles =
      articles.map((article: any) => {
        let displayStatus =
          article.status;

        if (
          article.status ===
            PostStatus.approved &&
          article.publishedAt &&
          new Date(
            article.publishedAt
          ) > new Date()
        ) {
          displayStatus = "scheduled";
        }

        return {
          ...article,
          displayStatus,
        };
      });

    return NextResponse.json({
      success: true,

      articles:
        formattedArticles,

      pagination: {
        page,
        limit,
        total,
        totalPages:
          Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error(
      "GET ARTICLES ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Server error",
      },
      {
        status: 500,
      }
    );
  }
}

/* =====================================================
   CREATE ARTICLE
===================================================== */

export async function POST(req: Request) {
  try {
    const body =
      await req.json();

    const isEditorial =
      Boolean(body.isEditorial);

    /*
      Draft autosave is intentionally allowed
      to create an incomplete article.

      Content/category become mandatory only
      when creating a non-draft article.
    */
    const isDraft =
      typeof body.status === "string" &&
      body.status.toLowerCase() === "draft";

    const content =
      typeof body.content === "string"
        ? body.content
        : "";

    /* =================================================
       BASIC VALIDATION
    ================================================= */

    if (!body.title?.trim()) {
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

    if (
      !isDraft &&
      !content.trim()
    ) {
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

    if (
      !isDraft &&
      !isEditorial &&
      !body.categoryId
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Category required",
        },
        {
          status: 400,
        }
      );
    }

    /* =================================================
       CATEGORY VALIDATION
    ================================================= */

    if (
      body.categoryId &&
      !isEditorial
    ) {
      const category =
        await prisma.category.findUnique({
          where: {
            id: body.categoryId,
          },
        });

      if (!category) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid category",
          },
          {
            status: 400,
          }
        );
      }
    }

    /* =================================================
       CUSTOM / AUTO SLUG
    ================================================= */

    const requestedSlug =
      typeof body.slug === "string"
        ? body.slug.trim()
        : "";

    const slugSource =
      requestedSlug ||
      body.title.trim();

    const slug =
      await generateUniqueSlug(
        slugSource
      );

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to generate valid slug",
        },
        {
          status: 400,
        }
      );
    }

    /* =================================================
       IMAGE INTELLIGENCE
    ================================================= */

    const imageGallery =
      normalizeImageGallery(
        body.imageGallery
      );

    const primaryImage =
      imageGallery.find(
        (img) => img.isPrimary
      ) || imageGallery[0];

    const images =
      primaryImage
        ? [primaryImage.url]
        : Array.isArray(body.images)
        ? body.images
            .filter(
              (img: any) =>
                typeof img === "string" &&
                img.trim()
            )
            .map(
              (img: string) =>
                img.trim()
            )
        : [];

    /* =================================================
       BREAKING
    ================================================= */

    let breakingStart:
      | null
      | Date = null;

    let breakingEnd:
      | null
      | Date = null;

    if (body.breaking) {
      const duration =
        Number(
          body.breakingDuration
        ) || 60;

      breakingStart =
        new Date();

      breakingEnd =
        new Date(
          Date.now() +
            duration *
              60 *
              1000
        );
    }

    /* =================================================
       PUBLISH DATE
    ================================================= */

    let publishedAt:
      | null
      | Date = null;

    /*
      Incoming publishedAt handling:

      null / empty / missing
        = no explicit schedule

      valid date
        = explicit publish/schedule date
    */
    if (
      body.publishedAt !== undefined &&
      body.publishedAt !== null &&
      body.publishedAt !== ""
    ) {
      const date =
        new Date(
          body.publishedAt
        );

      if (
        !isNaN(
          date.getTime()
        )
      ) {
        publishedAt = date;
      }
    }

    /* =================================================
       STATUS
    ================================================= */

    let validStatus:
      PostStatus =
      PostStatus.pending;

    if (body.status) {
      const value =
        body.status.toLowerCase();

      if (
        Object.values(
          PostStatus
        ).includes(
          value as PostStatus
        )
      ) {
        validStatus =
          value as PostStatus;

        /*
          PERMANENT PUBLISH RULE

          approved + no explicit date
            = Publish Now

          approved + explicit future date
            = Scheduled Publish
        */
        if (
          value === PostStatus.approved &&
          !publishedAt
        ) {
          publishedAt =
            new Date();
        }
      }
    }

    /*
      Autosave always creates a draft
      and must never accidentally publish.
    */
    if (isDraft) {
      validStatus =
        PostStatus.draft;

      publishedAt = null;
    }

    /* =================================================
       CREATE
    ================================================= */

    const article =
      await prisma.article.create({
        data: {
          /* BASIC */

          title:
            body.title.trim(),

          slug,

          content,

          excerpt:
            body.excerpt ||
            generateExcerpt(
              content
            ),

          /* IMAGE STORAGE */

          images,

          imageGallery:
            imageGallery.length
              ? imageGallery
              : undefined,

          /* VIDEO */

          videoUrl:
            body.videoUrl || null,

          videoTitle:
            body.videoTitle || null,

          videoPosition:
            body.videoPosition ||
            "middle",

          /* FLAGS */

          breaking:
            Boolean(
              body.breaking
            ),

          breakingStart,

          breakingEnd,

          flash:
            Boolean(body.flash),

          featured:
            Boolean(
              body.featured
            ),

          isEditorial,

          isAstrology:
            Boolean(
              body.isAstrology
            ),

          breakingPriority:
            Number(
              body.breakingPriority
            ) || 0,

          flashPriority:
            Number(
              body.flashPriority
            ) || 0,

          homepagePriority:
            Number(
              body.homepagePriority
            ) || 0,

          /* ARTICLE INTELLIGENCE */

          keyHighlights:
            Array.isArray(
              body.keyHighlights
            )
              ? body.keyHighlights.filter(
                  (item: any) =>
                    typeof item ===
                      "string" &&
                    item.trim()
                )
              : [],

          whyItMatters:
            body.whyItMatters ||
            null,

          shortBrief:
            body.shortBrief ||
            null,

          background:
            body.background ||
            null,

          timeline:
            body.timeline ||
            null,

          expertOpinion:
            body.expertOpinion ||
            null,

          factCheck:
            body.factCheck ||
            null,

          whatsNext:
            body.whatsNext ||
            null,

          keyTakeaways:
            Array.isArray(
              body.keyTakeaways
            )
              ? body.keyTakeaways.filter(
                  (item: any) =>
                    typeof item ===
                      "string" &&
                    item.trim()
                )
              : [],

          sourceDesk:
            body.sourceDesk ||
            null,

          /* FAQ */

          faqItems:
            Array.isArray(
              body.faqItems
            )
              ? body.faqItems
                  .filter(
                    (item: any) =>
                      item.question?.trim() &&
                      item.answer?.trim()
                  )
                  .map(
                    (item: any) => ({
                      question:
                        item.question.trim(),

                      answer:
                        item.answer.trim(),
                    })
                  )
              : [],

          /* SEO */

          readingTime:
            body.readingTime
              ? Number(
                  body.readingTime
                )
              : calculateReadingTime(
                  content
                ),

          metaTitle:
            body.metaTitle ||
            body.title,

          metaDescription:
            body.metaDescription ||
            generateExcerpt(
              content
            ),

          metaKeywords:
            body.metaKeywords ||
            body.title
              .toLowerCase()
              .split(" ")
              .slice(0, 10)
              .join(","),

          /* PUBLISH */

          publishedAt,

          status:
            validStatus,

          categoryId:
            isEditorial
              ? null
              : body.categoryId || null,
        },

        include: {
          category: true,
          author: true,
        },
      });

    return NextResponse.json({
      success: true,
      article,
    });
  } catch (error: any) {
    console.error(
      "CREATE ARTICLE ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Server error",
      },
      {
        status: 500,
      }
    );
  }
}

/* =====================================================
   UPDATE ARTICLE
===================================================== */

export async function PATCH(req: Request) {
  try {
    const body =
      await req.json();

    if (!body.id) {
      return NextResponse.json(
        {
          success: false,
          error: "ID required",
        },
        {
          status: 400,
        }
      );
    }

    const updateData: any = {};

    /* =================================================
       BASIC / SLUG UPDATE
    ================================================= */

    if (
      typeof body.title === "string" &&
      body.title.trim()
    ) {
      updateData.title =
        body.title.trim();
    }

    /*
      Slug changes ONLY when explicitly supplied.
      Existing article URLs remain untouched otherwise.
    */

    if (
      typeof body.slug === "string"
    ) {
      const requestedSlug =
        body.slug.trim();

      if (!requestedSlug) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Slug cannot be empty",
          },
          {
            status: 400,
          }
        );
      }

      const slug =
        await generateUniqueSlug(
          requestedSlug,
          body.id
        );

      if (!slug) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Invalid slug",
          },
          {
            status: 400,
          }
        );
      }

      updateData.slug = slug;
    }

    /* =================================================
       CONTENT / EXCERPT
    ================================================= */

    if (
      typeof body.content === "string"
    ) {
      updateData.content =
        body.content;

      if (
        !("excerpt" in body)
      ) {
        updateData.excerpt =
          generateExcerpt(
            body.content
          );
      }
    }

    if (
      typeof body.excerpt === "string"
    ) {
      updateData.excerpt =
        body.excerpt;
    }

    /* =================================================
       VIDEO UPDATE
    ================================================= */

    if ("videoUrl" in body) {
      updateData.videoUrl =
        body.videoUrl || null;
    }

    if ("videoTitle" in body) {
      updateData.videoTitle =
        body.videoTitle || null;
    }

    if ("videoPosition" in body) {
      updateData.videoPosition =
        body.videoPosition ||
        "middle";
    }

    /* =================================================
       IMAGE GALLERY
    ================================================= */

    if (
      Array.isArray(
        body.imageGallery
      )
    ) {
      const imageGallery =
        normalizeImageGallery(
          body.imageGallery
        );

      const primaryImage =
        imageGallery.find(
          (img) =>
            img.isPrimary
        ) ||
        imageGallery[0];

      updateData.imageGallery =
        imageGallery.length
          ? imageGallery
          : undefined;

      updateData.images =
        primaryImage
          ? [primaryImage.url]
          : [];
    }

    /* =================================================
       STATUS + PUBLISH DATE
    ================================================= */

    let statusChangedToApproved =
      false;

    if (body.status) {
      const value =
        body.status.toLowerCase();

      if (
        Object.values(PostStatus).includes(
          value as PostStatus
        )
      ) {
        updateData.status =
          value as PostStatus;

        statusChangedToApproved =
          value === PostStatus.approved;
      }
    }

    /*
      PERMANENT PUBLISH RULE

      approved + publishedAt:null
        = Publish Now

      approved + future date
        = Scheduled

      draft/pending + null
        = no published date

      Explicit valid date
        = preserve supplied date
    */

    if (
      body.publishedAt !== undefined
    ) {
      if (
        body.publishedAt === null ||
        body.publishedAt === ""
      ) {
        if (
          statusChangedToApproved
        ) {
          updateData.publishedAt =
            new Date();
        } else {
          updateData.publishedAt =
            null;
        }
      } else {
        const date =
          new Date(
            body.publishedAt
          );

        if (
          !isNaN(
            date.getTime()
          )
        ) {
          updateData.publishedAt =
            date;
        }
      }
    } else if (
      statusChangedToApproved
    ) {
      /*
        Frontend did not send a publish date.
        Approved therefore means Publish Now.
      */
      updateData.publishedAt =
        new Date();
    }

    /* =================================================
       FLAGS
    ================================================= */

    if (
      typeof body.featured ===
      "boolean"
    ) {
      updateData.featured =
        body.featured;
    }

    if (
      typeof body.breaking ===
      "boolean"
    ) {
      updateData.breaking =
        body.breaking;

      if (body.breaking) {
        const duration =
          Number(
            body.breakingDuration
          ) || 60;

        updateData.breakingStart =
          new Date();

        updateData.breakingEnd =
          new Date(
            Date.now() +
              duration *
                60 *
                1000
          );
      } else {
        updateData.breakingStart =
          null;

        updateData.breakingEnd =
          null;
      }
    }

    if (
      typeof body.flash ===
      "boolean"
    ) {
      updateData.flash =
        body.flash;
    }

    if (
      typeof body.isEditorial ===
      "boolean"
    ) {
      updateData.isEditorial =
        body.isEditorial;

      if (body.isEditorial) {
        updateData.categoryId =
          null;
      }
    }

    if (
      typeof body.isAstrology ===
      "boolean"
    ) {
      updateData.isAstrology =
        body.isAstrology;
    }

    /* =================================================
       PRIORITIES
    ================================================= */

    if (
      body.breakingPriority !==
      undefined
    ) {
      updateData.breakingPriority =
        Number(
          body.breakingPriority
        ) || 0;
    }

    if (
      body.flashPriority !==
      undefined
    ) {
      updateData.flashPriority =
        Number(
          body.flashPriority
        ) || 0;
    }

    if (
      body.homepagePriority !==
      undefined
    ) {
      updateData.homepagePriority =
        Number(
          body.homepagePriority
        ) || 0;
    }

    /* =================================================
       CATEGORY
    ================================================= */

    if (
      body.categoryId !==
      undefined
    ) {
      if (
        body.categoryId === null
      ) {
        updateData.categoryId =
          null;
      } else {
        const category =
          await prisma.category.findUnique(
            {
              where: {
                id: body.categoryId,
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

        updateData.categoryId =
          body.categoryId;
      }
    }

    /* =================================================
       SEO
    ================================================= */

    if (
      body.readingTime !==
      undefined
    ) {
      updateData.readingTime =
        Number(
          body.readingTime
        ) || 1;
    }

    if (
      body.metaTitle !==
      undefined
    ) {
      updateData.metaTitle =
        body.metaTitle ||
        null;
    }

    if (
      body.metaDescription !==
      undefined
    ) {
      updateData.metaDescription =
        body.metaDescription ||
        null;
    }

    if (
      body.metaKeywords !==
      undefined
    ) {
      updateData.metaKeywords =
        body.metaKeywords ||
        null;
    }

    /* =================================================
       ARTICLE INTELLIGENCE
    ================================================= */

    if (
      Array.isArray(
        body.keyHighlights
      )
    ) {
      updateData.keyHighlights =
        body.keyHighlights.filter(
          (item: any) =>
            typeof item ===
              "string" &&
            item.trim()
        );
    }

    if (
      "whyItMatters" in body
    ) {
      updateData.whyItMatters =
        body.whyItMatters ||
        null;
    }

    if (
      "shortBrief" in body
    ) {
      updateData.shortBrief =
        body.shortBrief ||
        null;
    }

    if (
      "background" in body
    ) {
      updateData.background =
        body.background ||
        null;
    }

    if (
      "timeline" in body
    ) {
      updateData.timeline =
        body.timeline ||
        null;
    }

    if (
      "expertOpinion" in body
    ) {
      updateData.expertOpinion =
        body.expertOpinion ||
        null;
    }

    if (
      "factCheck" in body
    ) {
      updateData.factCheck =
        body.factCheck ||
        null;
    }

    if (
      "whatsNext" in body
    ) {
      updateData.whatsNext =
        body.whatsNext ||
        null;
    }

    if (
      Array.isArray(
        body.keyTakeaways
      )
    ) {
      updateData.keyTakeaways =
        body.keyTakeaways.filter(
          (item: any) =>
            typeof item ===
              "string" &&
            item.trim()
        );
    }

    if (
      "sourceDesk" in body
    ) {
      updateData.sourceDesk =
        body.sourceDesk ||
        null;
    }

    /* =================================================
       FAQ
    ================================================= */

    if (
      Array.isArray(
        body.faqItems
      )
    ) {
      updateData.faqItems =
        body.faqItems
          .filter(
            (item: any) =>
              item.question?.trim() &&
              item.answer?.trim()
          )
          .map(
            (item: any) => ({
              question:
                item.question.trim(),

              answer:
                item.answer.trim(),
            })
          );
    }

    /* =================================================
       SAFETY
    ================================================= */

    if (
      Object.keys(
        updateData
      ).length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No valid fields to update",
        },
        {
          status: 400,
        }
      );
    }

    /* =================================================
       UPDATE
    ================================================= */

    const article =
      await prisma.article.update({
        where: {
          id: body.id,
        },

        data: updateData,

        include: {
          category: true,
          author: true,
        },
      });

    return NextResponse.json({
      success: true,
      article,
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
   PERMANENT DELETE

   - Deletes article analytics events
   - Deletes article permanently
   - No soft delete
   - Archived articles are untouched
===================================================== */

export async function DELETE(req: Request) {
  try {
    const body =
      await req.json();

    if (!body.id) {
      return NextResponse.json(
        {
          success: false,
          error: "ID required",
        },
        {
          status: 400,
        }
      );
    }

    const articleId =
      body.id;

    await prisma.$transaction([
      // Delete all analytics events belonging to this article
      prisma.articleAnalyticsEvent.deleteMany({
        where: {
          articleId,
        },
      }),

      // Permanently delete the article itself
      prisma.article.delete({
        where: {
          id: articleId,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
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