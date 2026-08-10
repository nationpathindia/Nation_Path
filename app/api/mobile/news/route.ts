import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PostStatus } from "@prisma/client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/* =========================================================
CORS
========================================================= */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
};

/* =========================================================
TYPES
========================================================= */

type ImageGalleryItem = {
  url: string;
  alt: string;
  caption: string;
  isPrimary: boolean;
};

type MobileFaqItem = {
  question: string;
  answer: string;
};

type MobileAuthor = {
  id: string;
  name: string | null;
};

type MobileArticle = {
  id: string;
  title: string;
  slug: string;

  content: string | null;

  excerpt: string | null;

  image: string | null;

  images: string[];

  imageGallery: ImageGalleryItem[];

  category: {
    id: string;
    name: string;
    slug: string | null;
  } | null;

  author: MobileAuthor | null;

  videoUrl: string | null;
  videoTitle: string | null;
  videoPosition: string | null;

  publishedAt: string | null;
  createdAt: string;

  breaking: boolean;
  featured: boolean;
  flash: boolean;

  homepagePriority: number;
  breakingPriority: number;
  flashPriority: number;

  readingTime: number | null;

  keyHighlights: string[];

  whyItMatters: string | null;
  shortBrief: string | null;

  background: string | null;
  timeline: unknown;
  expertOpinion: unknown;
  factCheck: unknown;
  whatsNext: string | null;

  keyTakeaways: string[];

  sourceDesk: string | null;

  faqItems: MobileFaqItem[];

  metaTitle: string | null;
  metaDescription: string | null;
};

/* =========================================================
OPTIONS / CORS PREFLIGHT
========================================================= */

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

/* =========================================================
URL CLEANER
========================================================= */

function cleanImageUrl(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  let url = value.trim();

  if (!url) {
    return null;
  }

  const markdownMatch = url.match(
    /^\[[^\]]+\]\((https?:\/\/[^)]+)\)$/,
  );

  if (markdownMatch?.[1]) {
    url = markdownMatch[1].trim();
  }

  if (url.startsWith("[") && url.includes("](") && url.endsWith(")")) {
    const start = url.indexOf("](");

    if (start !== -1) {
      const extracted = url.slice(start + 2, -1).trim();

      if (
        extracted.startsWith("http://") ||
        extracted.startsWith("https://")
      ) {
        url = extracted;
      }
    }
  }

  const htmlMatch = url.match(
    /href=["'](https?:\/\/[^"']+)["']/i,
  );

  if (htmlMatch?.[1]) {
    url = htmlMatch[1].trim();
  }

  url = url.replace(/^["']+|["']+$/g, "").trim();

  if (
    !url.startsWith("http://") &&
    !url.startsWith("https://")
  ) {
    return null;
  }

  return url;
}

/* =========================================================
STRING HELPERS
========================================================= */

function cleanString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const cleaned = value.trim();

  return cleaned || null;
}

function cleanStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is string =>
        typeof item === "string" && item.trim().length > 0,
    )
    .map((item) => item.trim());
}

/* =========================================================
IMAGE GALLERY NORMALIZER
========================================================= */

function normalizeImageGallery(article: any): ImageGalleryItem[] {
  const source = Array.isArray(article?.imageGallery)
    ? article.imageGallery
    : [];

  const gallery = source
    .filter(
      (image: any) =>
        image &&
        typeof image.url === "string" &&
        image.url.trim(),
    )
    .slice(0, 5)
    .map((image: any): ImageGalleryItem | null => {
      const url = cleanImageUrl(image.url);

      if (!url) {
        return null;
      }

      return {
        url,
        alt:
          cleanString(image.alt) ||
          "NationPath News",
        caption:
          cleanString(image.caption) || "",
        isPrimary: Boolean(image.isPrimary),
      };
    })
    .filter(
      (image): image is ImageGalleryItem =>
        Boolean(image),
    );

  if (
    gallery.length > 0 &&
    !gallery.some((image) => image.isPrimary)
  ) {
    gallery[0].isPrimary = true;
  }

  let primaryFound = false;

  for (const image of gallery) {
    if (image.isPrimary) {
      if (primaryFound) {
        image.isPrimary = false;
      } else {
        primaryFound = true;
      }
    }
  }

  return gallery;
}

/* =========================================================
LEGACY IMAGES
========================================================= */

function normalizeImages(article: any): string[] {
  if (!Array.isArray(article?.images)) {
    return [];
  }

  return article.images
    .map((image: unknown) =>
      cleanImageUrl(image),
    )
    .filter(
      (image: string | null): image is string =>
        Boolean(image),
    );
}

/* =========================================================
PRIMARY IMAGE
========================================================= */

function getPrimaryImage(
  article: any,
  gallery: ImageGalleryItem[],
  images: string[],
): string | null {
  const primary =
    gallery.find((image) => image.isPrimary) ||
    gallery[0];

  if (primary?.url) {
    return primary.url;
  }

  if (images.length > 0) {
    return images[0];
  }

  return null;
}

/* =========================================================
FAQ NORMALIZER
========================================================= */

function normalizeFaqItems(
  value: unknown,
): MobileFaqItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item: any) =>
        item &&
        typeof item.question === "string" &&
        typeof item.answer === "string" &&
        item.question.trim() &&
        item.answer.trim(),
    )
    .map((item: any) => ({
      question: item.question.trim(),
      answer: item.answer.trim(),
    }));
}

/* =========================================================
DATE SAFE HELPER
========================================================= */

function safeISOString(
  value: unknown,
): string | null {
  if (!value) {
    return null;
  }

  const date = new Date(value as any);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}

/* =========================================================
ARTICLE MAPPER
========================================================= */

function mapArticle(article: any): MobileArticle {
  const imageGallery =
    normalizeImageGallery(article);

  const images =
    normalizeImages(article);

  const image =
    getPrimaryImage(
      article,
      imageGallery,
      images,
    );

  return {
    id: article.id,

    title:
      article.title || "",

    slug:
      article.slug || "",

    /*
     * IMPORTANT:
     * Full article body.
     * Never truncate this value.
     */
    content:
      typeof article.content === "string"
        ? article.content
        : null,

    excerpt:
      cleanString(article.excerpt),

    image,

    images,

    imageGallery,

    category:
      article.category
        ? {
            id: article.category.id,
            name: article.category.name,
            slug:
              article.category.slug ||
              null,
          }
        : null,

    author:
      article.author
        ? {
            id: article.author.id,
            name:
              cleanString(
                article.author.name,
              ),
          }
        : null,

    videoUrl:
      cleanString(article.videoUrl),

    videoTitle:
      cleanString(article.videoTitle),

    videoPosition:
      cleanString(article.videoPosition),

    publishedAt:
      safeISOString(article.publishedAt),

    createdAt:
      safeISOString(article.createdAt) ||
      new Date(0).toISOString(),

    breaking:
      Boolean(article.breaking),

    featured:
      Boolean(article.featured),

    flash:
      Boolean(article.flash),

    homepagePriority:
      Number(article.homepagePriority) || 0,

    breakingPriority:
      Number(article.breakingPriority) || 0,

    flashPriority:
      Number(article.flashPriority) || 0,

    readingTime:
      typeof article.readingTime === "number"
        ? article.readingTime
        : null,

    keyHighlights:
      cleanStringArray(
        article.keyHighlights,
      ),

    whyItMatters:
      cleanString(article.whyItMatters),

    shortBrief:
      cleanString(article.shortBrief),

    background:
      cleanString(article.background),

    timeline:
      article.timeline ?? null,

    expertOpinion:
      article.expertOpinion ?? null,

    factCheck:
      article.factCheck ?? null,

    whatsNext:
      cleanString(article.whatsNext),

    keyTakeaways:
      cleanStringArray(
        article.keyTakeaways,
      ),

    sourceDesk:
      cleanString(article.sourceDesk),

    faqItems:
      normalizeFaqItems(
        article.faqItems,
      ),

    metaTitle:
      cleanString(article.metaTitle),

    metaDescription:
      cleanString(article.metaDescription),
  };
}

/* =========================================================
PUBLIC MOBILE ARTICLE WHERE
========================================================= */

const publicArticleWhere = {
  isDeleted: false,
  isEditorial: false,
  isAstrology: false,
  status: PostStatus.approved,
  publishedAt: {
    not: null,
    lte: new Date(),
  },
};

/* =========================================================
ARTICLE DETAIL SELECT
========================================================= */

const articleSelect = {
  id: true,

  title: true,

  slug: true,

  content: true,

  excerpt: true,

  images: true,

  imageGallery: true,

  category: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },

  author: {
    select: {
      id: true,
      name: true,
    },
  },

  videoUrl: true,
  videoTitle: true,
  videoPosition: true,

  publishedAt: true,
  createdAt: true,

  breaking: true,
  featured: true,
  flash: true,

  homepagePriority: true,
  breakingPriority: true,
  flashPriority: true,

  readingTime: true,

  keyHighlights: true,

  whyItMatters: true,
  shortBrief: true,

  background: true,
  timeline: true,
  expertOpinion: true,
  factCheck: true,
  whatsNext: true,

  keyTakeaways: true,

  sourceDesk: true,

  faqItems: true,

  metaTitle: true,
  metaDescription: true,
};

/* =========================================================
GET MOBILE NEWS
========================================================= */

export async function GET(req: Request) {
  try {
    const { searchParams } =
      new URL(req.url);

    /* =====================================================
       ARTICLE DETAIL
    ===================================================== */

    const articleId =
      searchParams.get("id")?.trim() || "";

    const articleSlug =
      searchParams.get("slug")?.trim() || "";

    if (articleId || articleSlug) {
      const identifier =
        articleId || articleSlug;

      const article =
        await prisma.article.findFirst({
          where: {
            AND: [
              publicArticleWhere,
              {
                OR: [
                  {
                    id: identifier,
                  },
                  {
                    slug: identifier,
                  },
                ],
              },
            ],
          },

          select: articleSelect,
        });

      if (!article) {
        return NextResponse.json(
          {
            success: false,
            articles: [],
            pagination: {
              page: 1,
              limit: 1,
              total: 0,
              totalPages: 0,
              hasNextPage: false,
              hasPreviousPage: false,
            },
            error:
              "Article not found.",
          },
          {
            status: 404,
            headers: {
              ...corsHeaders,
              "Content-Type":
                "application/json",
            },
          },
        );
      }

      return NextResponse.json(
        {
          success: true,

          articles: [
            mapArticle(article),
          ],

          pagination: {
            page: 1,
            limit: 1,
            total: 1,
            totalPages: 1,
            hasNextPage: false,
            hasPreviousPage: false,
          },

          filters: {
            section: "article",
            category: null,
            search: null,
          },
        },
        {
          status: 200,
          headers: {
            ...corsHeaders,

            "Cache-Control":
              "public, s-maxage=30, stale-while-revalidate=60",

            "Content-Type":
              "application/json",
          },
        },
      );
    }

    /* =====================================================
       PAGINATION
    ===================================================== */

    const rawPage =
      Number(
        searchParams.get("page"),
      );

    const rawLimit =
      Number(
        searchParams.get("limit"),
      );

    const page =
      Number.isFinite(rawPage) &&
      rawPage > 0
        ? Math.floor(rawPage)
        : 1;

    const limit =
      Number.isFinite(rawLimit) &&
      rawLimit > 0
        ? Math.min(
            Math.floor(rawLimit),
            30,
          )
        : 20;

    const skip =
      (page - 1) * limit;

    /* =====================================================
       FILTERS
    ===================================================== */

    const category =
      searchParams
        .get("category")
        ?.trim() || "";

    const search =
      searchParams
        .get("search")
        ?.trim() || "";

    const section =
      searchParams
        .get("section")
        ?.trim()
        .toLowerCase() ||
      "home";

    /* =====================================================
       PUBLIC MOBILE NEWS FILTER
    ===================================================== */

    const where: any = {
      ...publicArticleWhere,
    };

    /* =====================================================
       CATEGORY FILTER
    ===================================================== */

    if (category) {
      where.category = {
        is: {
          OR: [
            {
              slug: {
                equals:
                  category,
                mode: "insensitive",
              },
            },
            {
              name: {
                equals:
                  category,
                mode: "insensitive",
              },
            },
          ],
        },
      };
    }

    /* =====================================================
       SEARCH
    ===================================================== */

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

    /* =====================================================
       DEFAULT HOME ORDER
    ===================================================== */

    let orderBy: any[] = [
      {
        breaking: "desc",
      },
      {
        breakingPriority: "desc",
      },
      {
        featured: "desc",
      },
      {
        homepagePriority: "desc",
      },
      {
        publishedAt: "desc",
      },
      {
        createdAt: "desc",
      },
    ];

    /* =====================================================
       LATEST
    ===================================================== */

    if (section === "latest") {
      orderBy = [
        {
          publishedAt: "desc",
        },
        {
          createdAt: "desc",
        },
      ];
    }

    /* =====================================================
       BREAKING
    ===================================================== */

    if (section === "breaking") {
      where.breaking = true;

      orderBy = [
        {
          breakingPriority: "desc",
        },
        {
          publishedAt: "desc",
        },
        {
          createdAt: "desc",
        },
      ];
    }

    /* =====================================================
       FEATURED
    ===================================================== */

    if (section === "featured") {
      where.featured = true;

      orderBy = [
        {
          homepagePriority: "desc",
        },
        {
          publishedAt: "desc",
        },
        {
          createdAt: "desc",
        },
      ];
    }

    /* =====================================================
       DATABASE
    ===================================================== */

    const [
      articles,
      total,
    ] = await Promise.all([
      prisma.article.findMany({
        where,

        skip,

        take: limit,

        orderBy,

        select: {
          id: true,

          title: true,

          slug: true,

          excerpt: true,

          images: true,

          imageGallery: true,

          category: {
            select: {
              id: true,

              name: true,

              slug: true,
            },
          },

          publishedAt: true,

          createdAt: true,

          breaking: true,

          featured: true,

          flash: true,

          homepagePriority: true,

          breakingPriority: true,

          flashPriority: true,

          readingTime: true,

          keyHighlights: true,

          whyItMatters: true,

          shortBrief: true,

          background: true,

          timeline: true,

          expertOpinion: true,

          factCheck: true,

          whatsNext: true,

          keyTakeaways: true,

          sourceDesk: true,

          faqItems: true,

          metaTitle: true,

          metaDescription: true,
        },
      }),

      prisma.article.count({
        where,
      }),
    ]);

    /* =====================================================
       FORMAT
    ===================================================== */

    const formattedArticles =
      articles.map(
        mapArticle,
      );

    /* =====================================================
       RESPONSE
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        articles:
          formattedArticles,

        pagination: {
          page,

          limit,

          total,

          totalPages:
            Math.ceil(
              total / limit,
            ),

          hasNextPage:
            page * limit <
            total,

          hasPreviousPage:
            page > 1,
        },

        filters: {
          section,

          category:
            category || null,

          search:
            search || null,
        },
      },
      {
        status: 200,

        headers: {
          ...corsHeaders,

          "Cache-Control":
            "public, s-maxage=30, stale-while-revalidate=60",

          "Content-Type":
            "application/json",
        },
      },
    );
  } catch (error: any) {
    console.error(
      "MOBILE NEWS API ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        articles: [],

        pagination: {
          page: 1,

          limit: 20,

          total: 0,

          totalPages: 0,

          hasNextPage: false,

          hasPreviousPage: false,
        },

        error:
          error?.message ||
          "Unable to load NationPath mobile news.",
      },
      {
        status: 500,

        headers: {
          ...corsHeaders,

          "Content-Type":
            "application/json",
        },
      },
    );
  }
}