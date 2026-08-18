import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PostStatus, Prisma } from "@prisma/client";

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
   OPTIONS
========================================================= */

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

/* =========================================================
   HELPERS
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

  const htmlMatch = url.match(
    /href=["'](https?:\/\/[^"']+)["']/i,
  );

  if (htmlMatch?.[1]) {
    url = htmlMatch[1].trim();
  }

  url = url
    .replace(/^["']+|["']+$/g, "")
    .trim();

  if (
    !url.startsWith("http://") &&
    !url.startsWith("https://")
  ) {
    return null;
  }

  return url;
}

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
        typeof item === "string" &&
        item.trim().length > 0,
    )
    .map((item) => item.trim());
}

/* =========================================================
   IMAGE GALLERY
========================================================= */

function normalizeImageGallery(
  article: any,
): ImageGalleryItem[] {
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
    .map(
      (image: any): ImageGalleryItem | null => {
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
      },
    )
    .filter(
      (image): image is ImageGalleryItem =>
        Boolean(image),
    );

  if (
    gallery.length > 0 &&
    !gallery.some(
      (image) => image.isPrimary,
    )
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

function normalizeImages(
  article: any,
): string[] {
  if (!Array.isArray(article?.images)) {
    return [];
  }

  return article.images
    .map((image: unknown) =>
      cleanImageUrl(image),
    )
    .filter(
      (image): image is string =>
        Boolean(image),
    );
}

/* =========================================================
   PRIMARY IMAGE
========================================================= */

function getPrimaryImage(
  gallery: ImageGalleryItem[],
  images: string[],
): string | null {
  const primary =
    gallery.find(
      (image) => image.isPrimary,
    ) || gallery[0];

  if (primary?.url) {
    return primary.url;
  }

  return images[0] || null;
}

/* =========================================================
   FAQ
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
   DATE
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

function mapArticle(
  article: any,
): MobileArticle {
  const imageGallery =
    normalizeImageGallery(article);

  const images =
    normalizeImages(article);

  const image =
    getPrimaryImage(
      imageGallery,
      images,
    );

  return {
    id: article.id,

    title:
      article.title || "",

    slug:
      article.slug || "",

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
      cleanString(
        article.videoUrl,
      ),

    videoTitle:
      cleanString(
        article.videoTitle,
      ),

    videoPosition:
      cleanString(
        article.videoPosition,
      ),

    publishedAt:
      safeISOString(
        article.publishedAt,
      ),

    createdAt:
      safeISOString(
        article.createdAt,
      ) ||
      new Date(0).toISOString(),

    breaking:
      Boolean(article.breaking),

    featured:
      Boolean(article.featured),

    flash:
      Boolean(article.flash),

    homepagePriority:
      Number(
        article.homepagePriority,
      ) || 0,

    breakingPriority:
      Number(
        article.breakingPriority,
      ) || 0,

    flashPriority:
      Number(
        article.flashPriority,
      ) || 0,

    readingTime:
      typeof article.readingTime ===
      "number"
        ? article.readingTime
        : null,

    keyHighlights:
      cleanStringArray(
        article.keyHighlights,
      ),

    whyItMatters:
      cleanString(
        article.whyItMatters,
      ),

    shortBrief:
      cleanString(
        article.shortBrief,
      ),

    background:
      cleanString(
        article.background,
      ),

    timeline:
      article.timeline ?? null,

    expertOpinion:
      article.expertOpinion ?? null,

    factCheck:
      article.factCheck ?? null,

    whatsNext:
      cleanString(
        article.whatsNext,
      ),

    keyTakeaways:
      cleanStringArray(
        article.keyTakeaways,
      ),

    sourceDesk:
      cleanString(
        article.sourceDesk,
      ),

    faqItems:
      normalizeFaqItems(
        article.faqItems,
      ),

    metaTitle:
      cleanString(
        article.metaTitle,
      ),

    metaDescription:
      cleanString(
        article.metaDescription,
      ),
  };
}

/* =========================================================
   PUBLIC ARTICLE FILTER
========================================================= */

const publicArticleWhere = {
  isDeleted: false,
  isEditorial: false,
  isAstrology: false,
  status: PostStatus.approved,
};

/* =========================================================
   ARTICLE SELECT
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
   OBJECT ID
========================================================= */

function isValidObjectId(
  value: string,
): boolean {
  return /^[a-fA-F0-9]{24}$/.test(value);
}

/* =========================================================
   PUBLICATION FILTER
========================================================= */

/*
  Public mobile rule:

  1. approved
  2. not deleted
  3. not editorial
  4. not astrology
  5. publishedAt <= now
  6. OR publishedAt is null

  Future scheduled articles are NEVER returned.
*/

function publicPublishedFilter(
  now: Date,
) {
  return {
    OR: [
      {
        publishedAt: {
          lte: now,
        },
      },
      {
        publishedAt: null,
      },
    ],
  };
}

/* =========================================================
   BREAKING ORDER
========================================================= */

/*
  IMPORTANT:

  Breaking Bar must ALWAYS show the latest created
  breaking article first.

  breakingPriority is intentionally NOT used here.

  Priority order:

  1. createdAt DESC
  2. publishedAt DESC
  3. id DESC

  This guarantees that the newest breaking article
  comes first even if an older article has a higher
  breakingPriority.
*/

const breakingOrderBy: Prisma.ArticleOrderByWithRelationInput[] = [
  {
    createdAt: "desc",
  },
  {
    publishedAt: "desc",
  },
  {
    id: "desc",
  },
];

/* =========================================================
   GET MOBILE NEWS
========================================================= */

export async function GET(
  req: Request,
) {
  try {
    const { searchParams } =
      new URL(req.url);

    const now = new Date();

    /* =====================================================
       ARTICLE DETAIL
    ===================================================== */

    const articleId =
      searchParams
        .get("id")
        ?.trim() || "";

    const articleSlug =
      searchParams
        .get("slug")
        ?.trim() || "";

    if (
      articleId ||
      articleSlug
    ) {
      const conditions: any[] = [];

      if (
        articleId &&
        isValidObjectId(articleId)
      ) {
        conditions.push({
          id: articleId,
        });
      }

      if (articleSlug) {
        conditions.push({
          slug: articleSlug,
        });
      }

      if (!conditions.length) {
        return NextResponse.json(
          {
            success: false,
            articles: [],
            error:
              "Invalid article ID or slug.",
          },
          {
            status: 400,
            headers: {
              ...corsHeaders,
              "Cache-Control":
                "no-store",
            },
          },
        );
      }

      const article =
        await prisma.article.findFirst({
          where: {
            ...publicArticleWhere,

            OR: conditions,

            AND: [
              publicPublishedFilter(
                now,
              ),
            ],
          },

          select:
            articleSelect,
        });

      if (!article) {
        return NextResponse.json(
          {
            success: false,
            articles: [],
            error:
              "Article not found.",
          },
          {
            status: 404,
            headers: {
              ...corsHeaders,
              "Cache-Control":
                "no-store",
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
              "no-store",
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
      (page - 1) *
      limit;

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
       MAIN WHERE
    ===================================================== */

    const where: any = {
      ...publicArticleWhere,

      AND: [
        publicPublishedFilter(
          now,
        ),
      ],
    };

    /* =====================================================
       CATEGORY
    ===================================================== */

    if (category) {
      where.AND.push({
        category: {
          is: {
            OR: [
              {
                slug: {
                  equals:
                    category,
                  mode:
                    "insensitive",
                },
              },
              {
                name: {
                  equals:
                    category,
                  mode:
                    "insensitive",
                },
              },
            ],
          },
        },
      });
    }

    /* =====================================================
       SEARCH
    ===================================================== */

    if (search) {
      where.AND.push({
        OR: [
          {
            title: {
              contains:
                search,
              mode:
                "insensitive",
            },
          },
          {
            excerpt: {
              contains:
                search,
              mode:
                "insensitive",
            },
          },
        ],
      });
    }

    /* =====================================================
       DEFAULT ORDER
    ===================================================== */

    let orderBy: any[] = [
      {
        createdAt:
          "desc",
      },
      {
        publishedAt:
          "desc",
      },
      {
        id:
          "desc",
      },
    ];

    /* =====================================================
       HOME

       Home is CURRENT-FIRST.

       featured/homepagePriority do NOT control
       main home article ordering.

       Dedicated featuredArticles is returned separately.
    ===================================================== */

    if (
      section === "home"
    ) {
      orderBy = [
        {
          createdAt:
            "desc",
        },
        {
          publishedAt:
            "desc",
        },
        {
          id:
            "desc",
        },
      ];
    }

    /* =====================================================
       LATEST
    ===================================================== */

    if (
      section === "latest"
    ) {
      orderBy = [
        {
          createdAt:
            "desc",
        },
        {
          publishedAt:
            "desc",
        },
        {
          id:
            "desc",
        },
      ];
    }

    /* =====================================================
       FEATURED
    ===================================================== */

    if (
      section === "featured"
    ) {
      where.AND.push({
        featured:
          true,
      });

      orderBy = [
        {
          homepagePriority:
            "desc",
        },
        {
          createdAt:
            "desc",
        },
        {
          publishedAt:
            "desc",
        },
        {
          id:
            "desc",
        },
      ];
    }

    /* =====================================================
       BREAKING

       IMPORTANT:

       Latest created breaking article ALWAYS comes first.

       breakingPriority is NOT used for Breaking ordering.
    ===================================================== */

    if (
      section === "breaking"
    ) {
      where.AND.push({
        breaking:
          true,
      });

      orderBy =
        breakingOrderBy;
    }

    /* =====================================================
       FLASH
    ===================================================== */

    if (
      section === "flash"
    ) {
      where.AND.push({
        flash:
          true,
      });

      orderBy = [
        {
          flashPriority:
            "desc",
        },
        {
          createdAt:
            "desc",
        },
        {
          publishedAt:
            "desc",
        },
        {
          id:
            "desc",
        },
      ];
    }

    /* =====================================================
       MAIN DATABASE QUERY
    ===================================================== */

    const [
      articles,
      total,
    ] =
      await Promise.all([
        prisma.article.findMany({
          where,

          skip,

          take:
            limit,

          orderBy,

          select:
            articleSelect,
        }),

        prisma.article.count({
          where,
        }),
      ]);

    const formattedArticles =
      articles.map(
        mapArticle,
      );

    /* =====================================================
       HOME LATEST ARTICLES

       Used by Home screen independently.

       NOT affected by featured or homepagePriority.
    ===================================================== */

    let latestArticles:
      MobileArticle[] = [];

    if (
      section === "home"
    ) {
      const latestWhere: any = {
        ...publicArticleWhere,

        AND: [
          publicPublishedFilter(
            now,
          ),
        ],
      };

      const latestResults =
        await prisma.article.findMany({
          where:
            latestWhere,

          take: 10,

          orderBy: [
            {
              createdAt:
                "desc",
            },
            {
              publishedAt:
                "desc",
            },
            {
              id:
                "desc",
            },
          ],

          select:
            articleSelect,
        });

      latestArticles =
        latestResults.map(
          mapArticle,
        );
    }

    /* =====================================================
       BREAKING ARTICLES

       Independent from Home feed.

       IMPORTANT:

       This is the source for the Home Breaking Bar.

       Latest created breaking article ALWAYS comes first.

       breakingPriority is intentionally ignored.
    ===================================================== */

    let breakingArticles:
      MobileArticle[] = [];

    if (
      section !== "breaking"
    ) {
      const breakingWhere: any = {
        ...publicArticleWhere,

        breaking:
          true,

        AND: [
          publicPublishedFilter(
            now,
          ),
        ],
      };

      const breakingResults =
        await prisma.article.findMany({
          where:
            breakingWhere,

          take: 5,

          orderBy:
            breakingOrderBy,

          select:
            articleSelect,
        });

      breakingArticles =
        breakingResults.map(
          mapArticle,
        );
    }

    /* =====================================================
       FEATURED ARTICLES

       Independent from Home ordering.
    ===================================================== */

    let featuredArticles:
      MobileArticle[] = [];

    if (
      section === "home"
    ) {
      const featuredWhere: any = {
        ...publicArticleWhere,

        featured:
          true,

        AND: [
          publicPublishedFilter(
            now,
          ),
        ],
      };

      const featuredResults =
        await prisma.article.findMany({
          where:
            featuredWhere,

          take: 5,

          orderBy: [
            {
              homepagePriority:
                "desc",
            },
            {
              createdAt:
                "desc",
            },
            {
              publishedAt:
                "desc",
            },
            {
              id:
                "desc",
            },
          ],

          select:
            articleSelect,
        });

      featuredArticles =
        featuredResults.map(
          mapArticle,
        );
    }

    /* =====================================================
       RESPONSE
    ===================================================== */

    return NextResponse.json(
      {
        success:
          true,

        /*
          Main requested feed.
        */
        articles:
          formattedArticles,

        /*
          Dedicated Home feeds.
        */
        latestArticles,

        breakingArticles,

        featuredArticles,

        /*
          Backward compatibility.

          Breaking Bar should consume this value.
        */
        breakingArticle:
          breakingArticles[0] ||
          null,

        pagination: {
          page,

          limit,

          total,

          totalPages:
            Math.ceil(
              total /
                limit,
            ),

          hasNextPage:
            page *
              limit <
            total,

          hasPreviousPage:
            page > 1,
        },

        filters: {
          section,

          category:
            category ||
            null,

          search:
            search ||
            null,
        },

        meta: {
          apiVersion:
            "mobile-v3",

          generatedAt:
            new Date().toISOString(),
        },
      },

      {
        status: 200,

        headers: {
          ...corsHeaders,

          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",

          Pragma:
            "no-cache",

          Expires:
            "0",

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
        success:
          false,

        articles: [],

        latestArticles: [],

        breakingArticles: [],

        featuredArticles: [],

        breakingArticle:
          null,

        pagination: {
          page: 1,
          limit: 20,
          total: 0,
          totalPages: 0,
          hasNextPage:
            false,
          hasPreviousPage:
            false,
        },

        error:
          error?.message ||
          "Unable to load NationPath mobile news.",
      },

      {
        status: 500,

        headers: {
          ...corsHeaders,

          "Cache-Control":
            "no-store",

          "Content-Type":
            "application/json",
        },
      },
    );
  }
}