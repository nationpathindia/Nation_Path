// app/[category]/[slug]/page.tsx

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

import AdRenderer from "@/components/ads/AdRendererClient";
import ArticleAnalyticsTracker from "@/components/analytics/ArticleAnalyticsTracker";
import ArticleIntelligence from "@/components/article/ArticleIntelligence";
import ArticleReadingProgress from "@/components/article/ArticleReadingProgress";
import ArticleHeader from "@/components/article/ArticleHeader";
import ArticleHero from "@/components/article/ArticleHero";
import ArticleAISummary from "@/components/article/ArticleAISummary";
import ArticleBody from "@/components/article/ArticleBody";
import ArticleFAQ from "@/components/article/ArticleFAQ";
import ArticleRelated from "@/components/article/ArticleRelated";
import ArticleNextStory from "@/components/article/ArticleNextStory";
import ArticleSidebar from "@/components/article/ArticleSidebar";
import ArticleAstroBanner from "@/components/article/ArticleAstroBanner";
import ArticleShortBrief from "@/components/article/ArticleShortBrief";
import ArticleWhatsNext from "@/components/article/ArticleWhatsNext";

import {
  cloudinaryImageUrl,
} from "@/lib/cloudinary-image";

export const dynamic = "force-dynamic";

export const revalidate = 0;

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

interface Props {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

type ImageGalleryItem = {
  url: string;
  alt?: string;
  caption?: string;
  isPrimary?: boolean;
};

/*
|--------------------------------------------------------------------------
| SITE URL
|--------------------------------------------------------------------------
*/

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://nationpathindia.com";

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

function isPublishedFilter() {
  return {
    OR: [
      {
        publishedAt: {
          equals: null,
        },
      },
      {
        publishedAt: {
          lte: new Date(),
        },
      },
    ],
  };
}

function cleanText(html: string) {
  return html
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/*
|--------------------------------------------------------------------------
| PRIMARY IMAGE
|--------------------------------------------------------------------------
|
| Priority:
| 1. imageGallery primary image
| 2. first imageGallery image
| 3. legacy images[0]
|
*/

function getPrimaryImage(article: any) {
  const gallery: ImageGalleryItem[] = Array.isArray(
    article?.imageGallery
  )
    ? article.imageGallery
    : [];

  return (
    gallery.find(
      (img: ImageGalleryItem) => img?.isPrimary
    )?.url ||
    gallery[0]?.url ||
    article?.images?.[0] ||
    null
  );
}

/*
|--------------------------------------------------------------------------
| GALLERY
|--------------------------------------------------------------------------
*/

function getGallery(
  article: any
): ImageGalleryItem[] {
  return Array.isArray(article?.imageGallery)
    ? article.imageGallery
    : [];
}

/*
|--------------------------------------------------------------------------
| OPTIMIZED GALLERY
|--------------------------------------------------------------------------
|
| Cloudinary:
|   f_auto
|   q_auto
|   responsive width
|
| Non-Cloudinary URLs remain untouched.
|
*/

function getOptimizedGallery(
  gallery: ImageGalleryItem[]
): ImageGalleryItem[] {
  return gallery.map(
    (image: ImageGalleryItem) => ({
      ...image,
      url: cloudinaryImageUrl(
        image.url,
        1200
      ),
    })
  );
}

/*
|--------------------------------------------------------------------------
| OPTIMIZED PRIMARY IMAGE
|--------------------------------------------------------------------------
*/

function getOptimizedPrimaryImage(
  article: any
) {
  const primaryImage =
    getPrimaryImage(article);

  if (!primaryImage) {
    return null;
  }

  return cloudinaryImageUrl(
    primaryImage,
    1200
  );
}

/*
|--------------------------------------------------------------------------
| METADATA
|--------------------------------------------------------------------------
*/

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const {
    category: categorySlug,
    slug,
  } = await params;

  const category =
    await prisma.category.findUnique({
      where: {
        slug: categorySlug,
      },
    });

  if (!category) {
    return {
      title: "Nation Path India",
    };
  }

  const article =
    await prisma.article.findFirst({
      where: {
        slug,
        categoryId: category.id,
        status: "approved",
        isDeleted: false,
        isAstrology: false,
        ...isPublishedFilter(),
      },
    });

  if (!article) {
    return {
      title: "Nation Path India",
    };
  }

  const primaryImage =
    getOptimizedPrimaryImage(article);

  const canonical =
    `${SITE_URL}/${category.slug}/${article.slug}`;

  const title =
    article.metaTitle ||
    article.title;

  const description =
    article.metaDescription ||
    article.excerpt ||
    `Read latest ${category.name} updates from Nation Path India.`;

  return {
    title,

    description,

    keywords: [
      category.name,
      article.title,
      "Nation Path India",
      "India News",
      "Breaking News",
    ],

    alternates: {
      canonical,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      type: "article",

      title,

      description,

      url: canonical,

      siteName: "Nation Path India",

      locale: "en_IN",

      publishedTime:
        article.publishedAt?.toISOString(),

      modifiedTime:
        article.updatedAt?.toISOString(),

      images: primaryImage
        ? [
            {
              url: primaryImage,
              width: 1200,
              height: 675,
              alt: article.title,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      images: primaryImage
        ? [primaryImage]
        : [],
    },
  };
}

/*
|--------------------------------------------------------------------------
| PAGE
|--------------------------------------------------------------------------
*/

export default async function ArticlePage({
  params,
}: Props) {
  const {
    category: categorySlug,
    slug,
  } = await params;

/*
|--------------------------------------------------------------------------
| CATEGORY
|--------------------------------------------------------------------------
*/

  const category =
    await prisma.category.findUnique({
      where: {
        slug: categorySlug,
      },
    });

  if (!category) {
    return notFound();
  }

/*
|--------------------------------------------------------------------------
| ARTICLE FETCH
|--------------------------------------------------------------------------
*/

  const article =
    await prisma.article.findFirst({
      where: {
        slug,
        categoryId: category.id,
        status: "approved",
        isDeleted: false,
        isAstrology: false,
        ...isPublishedFilter(),
      },

      include: {
        category: true,
      },
    });

  if (!article) {
    return notFound();
  }

  if (
    article.publishedAt &&
    article.publishedAt > new Date()
  ) {
    return notFound();
  }
/* =====================================================
   ARTICLE VIEW COUNT
===================================================== */

const updatedArticle = await prisma.article.update({
  where: {
    id: article.id,
  },

  data: {
    views: {
      increment: 1,
    },
  },

  select: {
    views: true,
  },
});

article.views = updatedArticle.views;
/*
|--------------------------------------------------------------------------
| IMAGE DATA
|--------------------------------------------------------------------------
*/

  const gallery =
    getGallery(article);

  const optimizedGallery =
    getOptimizedGallery(gallery);

  const primaryImage =
    getOptimizedPrimaryImage(article);

  const mostRead =
    await prisma.article.findMany({
      where: {
        status: "approved",
        isDeleted: false,
        isAstrology: false,
        ...isPublishedFilter(),

        NOT: {
          id: article.id,
        },
      },

      orderBy: [
        {
          trendingScore: "desc",
        },

        {
          views: "desc",
        },

        {
          createdAt: "desc",
        },
      ],

      take: 5,

      include: {
        category: true,
      },
    });

/*
|--------------------------------------------------------------------------
| RELATED STORIES
|--------------------------------------------------------------------------
*/

  const related =
    await prisma.article.findMany({
      where: {
        status: "approved",
        isDeleted: false,
        isAstrology: false,
        ...isPublishedFilter(),

        categoryId: category.id,

        NOT: {
          id: article.id,
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 6,

      include: {
        category: true,
      },
    });

/*
|--------------------------------------------------------------------------
| NEXT STORY
|--------------------------------------------------------------------------
*/

  const nextArticle =
    await prisma.article.findFirst({
      where: {
        status: "approved",
        isDeleted: false,
        isAstrology: false,
        ...isPublishedFilter(),

        categoryId: category.id,

        id: {
          not: article.id,
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      include: {
        category: true,
      },
    });

/*
|--------------------------------------------------------------------------
| READING TIME
|--------------------------------------------------------------------------
*/

  const wordCount =
    cleanText(
      article.content || ""
    )
      .split(" ")
      .filter(Boolean)
      .length;

  const readingTime = Math.max(
    1,
    Math.ceil(wordCount / 200)
  );

/*
|--------------------------------------------------------------------------
| ARTICLE URL
|--------------------------------------------------------------------------
*/

  const articleUrl =
    `${SITE_URL}/${category.slug}/${article.slug}`;

  const keywords = [
    category.name,
    article.title,
    article.excerpt || "",
    "Nation Path India",
    "India News",
    "Breaking News",
  ];

/*
|--------------------------------------------------------------------------
| NEWS SCHEMA
|--------------------------------------------------------------------------
*/

  const newsSchema = {
    "@context": "https://schema.org",

    "@type": "NewsArticle",

    "@id": articleUrl,

    headline: article.title,

    description:
      article.metaDescription ||
      article.excerpt ||
      "",

    keywords,

    image: primaryImage
      ? [
          {
            "@type": "ImageObject",

            url: primaryImage,

            width: 1200,

            height: 675,

            caption: article.title,
          },
        ]
      : [],

    datePublished: (
      article.publishedAt ||
      article.createdAt
    ).toISOString(),

    dateModified: (
      article.updatedAt ||
      article.createdAt
    ).toISOString(),

    articleSection: category.name,

    inLanguage: "en-IN",

    wordCount,

    timeRequired:
      `PT${readingTime}M`,

    mainEntityOfPage: {
      "@type": "WebPage",

      "@id": articleUrl,
    },

    author: {
      "@type": "Organization",

      name: "Nation Path India",

      url: SITE_URL,
    },

    publisher: {
      "@type": "Organization",

      name: "Nation Path India",

      url: SITE_URL,

      logo: {
        "@type": "ImageObject",

        url: `${SITE_URL}/logo.png`,
      },
    },
  };

/*
|--------------------------------------------------------------------------
| BREADCRUMB SCHEMA
|--------------------------------------------------------------------------
*/

  const breadcrumbSchema = {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",

        position: 1,

        name: "Home",

        item: SITE_URL,
      },

      {
        "@type": "ListItem",

        position: 2,

        name: category.name,

        item:
          `${SITE_URL}/${category.slug}`,
      },

      {
        "@type": "ListItem",

        position: 3,

        name: article.title,

        item: articleUrl,
      },
    ],
  };

/*
|--------------------------------------------------------------------------
| FAQ SCHEMA
|--------------------------------------------------------------------------
*/

  const faqSchema =
    Array.isArray(article.faqItems) &&
    article.faqItems.length > 0
      ? {
          "@context":
            "https://schema.org",

          "@type": "FAQPage",

          mainEntity:
            article.faqItems
              .filter(
                (item: any) =>
                  item.question &&
                  item.answer
              )
              .map(
                (item: any) => ({
                  "@type": "Question",

                  name: item.question,

                  acceptedAnswer: {
                    "@type": "Answer",

                    text:
                      item.answer.replace(
                        /<[^>]+>/g,
                        ""
                      ),
                  },
                })
              ),
        }
      : null;

/*
|--------------------------------------------------------------------------
| RENDER
|--------------------------------------------------------------------------
*/

  return (
    <div
      className="
        mx-auto
        max-w-7xl
        px-4
        py-8
        sm:px-6
        sm:py-12
        lg:px-8
      "
    >

      {/* ================= SCHEMA ================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(newsSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              breadcrumbSchema
            ),
        }}
      />

      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                faqSchema
              ),
          }}
        />
      )}

      <div
        className="
          grid
          grid-cols-1
          gap-10
          lg:grid-cols-[minmax(0,1fr)_360px]
          lg:gap-14
        "
      >

        <main>

          {/* READING PROGRESS */}

          <ArticleReadingProgress />
 <ArticleAnalyticsTracker
  type="article"
  articleId={article.id}
  articleUrl={articleUrl}
/>
          {/* ================= BREADCRUMB ================= */}

          <nav
            className="
              mb-6
              text-xs
              uppercase
              tracking-wide
              text-gray-500
            "
          >

            <Link
              href="/"
              className="
                transition
                hover:text-[#163C80]
              "
            >
              Home
            </Link>

            <span className="mx-2">
              /
            </span>

            <Link
              href={`/${category.slug}`}
              className="
                transition
                hover:text-[#163C80]
              "
            >
              {category.name}
            </Link>

            <span className="mx-2">
              /
            </span>

            <span>
              {article.title}
            </span>

          </nav>

          {/* ================= TOP AD ================= */}

          <div
            className="
              my-8
              flex
              justify-center
            "
          >
            <AdRenderer
              placement="article_top"
            />
          </div>

          {/* ================= HEADER ================= */}

          <ArticleHeader
            article={article}
            category={category}
            readingTime={readingTime}
          />

          {/* ================= HERO ================= */}

          <ArticleHero
  imageGallery={optimizedGallery}
  images={article.images}
  title={article.title}
  shareUrl={articleUrl}
  articleId={article.id}
/>

          {/* ================= AI SUMMARY ================= */}

          {article.aiSummary && (
            <ArticleAISummary
              categoryName={
                category.name
              }
              summary={
                article.aiSummary as any
              }
            />
          )}

          {/* ================= SHORT BRIEF ================= */}

          <ArticleShortBrief
            shortBrief={
              article.shortBrief || ""
            }
          />

          {/* ================= ARTICLE INTELLIGENCE ================= */}

          <ArticleIntelligence
            background={
              article.background
            }
            timeline={
              article.timeline
            }
            expertOpinion={
              article.expertOpinion
            }
            factCheck={
              article.factCheck
            }
            keyTakeaways={
              article.keyTakeaways
            }
            sourceDesk={
              typeof article.sourceDesk ===
              "string"
                ? article.sourceDesk
                : null
            }
          />

          {/* ================= ARTICLE BODY ================= */}

          <ArticleBody
            content={
              article.content
            }
            keyHighlights={
              article.keyHighlights
            }
            whyItMatters={
              article.whyItMatters
            }
            video={
              article.videoUrl
                ? {
                    url:
                      article.videoUrl,

                    title:
                      article.videoTitle,

                    position:
                      article.videoPosition as
                        | "top"
                        | "middle"
                        | "bottom",
                  }
                : null
            }
          />

          {/* ================= WHAT'S NEXT ================= */}

          <ArticleWhatsNext
            whatsNext={
              article.whatsNext || ""
            }
          />

          {/* ================= FAQ ================= */}

          {Array.isArray(
            article.faqItems
          ) &&
            article.faqItems.length > 0 && (
              <ArticleFAQ
                faqItems={
                  article.faqItems as any
                }
              />
            )}

          {/* ================= BOTTOM AD ================= */}

          <div
            className="
              mt-7
              mb-0
              flex
              justify-center
            "
          >
            <AdRenderer
              placement="article_bottom"
            />
          </div>

          {/* ================= NEXT STORY ================= */}

          <ArticleNextStory
            article={nextArticle}
          />

          {/* ================= ASTRO CROSS PRODUCT ================= */}

          <ArticleAstroBanner
            categoryName={
              category.name
            }
            categorySlug={
              category.slug
            }
          />

          {/* ================= RELATED ================= */}

          <ArticleRelated
            articles={related}
          />

        </main>

        {/* ================= SIDEBAR ================= */}

        <ArticleSidebar
          mostRead={mostRead}
        />

      </div>
    </div>
  );
}

