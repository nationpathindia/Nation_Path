// app/editorial/[slug]/page.tsx

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

import AdRenderer from "@/components/ads/AdRendererClient";
import ArticleAnalyticsTracker from "@/components/analytics/ArticleAnalyticsTracker";
import ArticleIntelligence from "@/components/article/ArticleIntelligence";
import ArticleReadingProgress from "@/components/article/ArticleReadingProgress";
import EditorialHeader from "@/components/editorial/EditorialHeader";
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

import { cloudinaryImageUrl } from "@/lib/cloudinary-image";

export const dynamic = "force-dynamic";

export const revalidate = 0;

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

interface Props {
  params: Promise<{
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

function getGallery(article: any): ImageGalleryItem[] {
  return Array.isArray(article?.imageGallery)
    ? article.imageGallery
    : [];
}

/*
|--------------------------------------------------------------------------
| OPTIMIZED GALLERY
|--------------------------------------------------------------------------
*/

function getOptimizedGallery(
  gallery: ImageGalleryItem[]
): ImageGalleryItem[] {
  return gallery.map((image: ImageGalleryItem) => ({
    ...image,
    url: cloudinaryImageUrl(image.url, 1200),
  }));
}

/*
|--------------------------------------------------------------------------
| OPTIMIZED PRIMARY IMAGE
|--------------------------------------------------------------------------
*/

function getOptimizedPrimaryImage(article: any) {
  const primaryImage = getPrimaryImage(article);

  if (!primaryImage) {
    return null;
  }

  return cloudinaryImageUrl(primaryImage, 1200);
}

/*
|--------------------------------------------------------------------------
| METADATA
|--------------------------------------------------------------------------
*/

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const article = await prisma.article.findFirst({
    where: {
      slug,
      status: "approved",
      isDeleted: false,
      isEditorial: true,
      ...isPublishedFilter(),
    },

    include: {
      category: true,
    },
  });

  if (!article) {
    return {
      title: "NationPath Insight | Nation Path India",
    };
  }

  const primaryImage =
    getOptimizedPrimaryImage(article);

  const title =
    article.metaTitle ||
    article.title;

  const description =
    article.metaDescription ||
    article.excerpt ||
    "NationPath Insight provides deep analysis, context and perspectives on important stories.";

  const canonical =
    `${SITE_URL}/editorial/${article.slug}`;

  return {
    title,

    description,

    alternates: {
      canonical,
    },

    robots: {
      index: true,
      follow: true,
    },

    keywords: [
      "NationPath Insight",
      "Editorial",
      "Analysis",
      "Opinion",
      "Nation Path India",
      article.title,
    ],

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

export default async function EditorialArticle({
  params,
}: Props) {
  const { slug } = await params;

  /*
  |--------------------------------------------------------------------------
  | EDITORIAL FETCH
  |--------------------------------------------------------------------------
  */

  const article = await prisma.article.findFirst({
    where: {
      slug,

      status: "approved",

      isDeleted: false,

      isEditorial: true,

      ...isPublishedFilter(),
    },

    include: {
      category: true,
    },
  });

  if (!article) {
    return notFound();
  }

  /*
  |--------------------------------------------------------------------------
  | PUBLISHED DATE SAFETY
  |--------------------------------------------------------------------------
  */

  if (
    article.publishedAt &&
    article.publishedAt > new Date()
  ) {
    return notFound();
  }

  /*
  |--------------------------------------------------------------------------
  | IMAGE DATA
  |--------------------------------------------------------------------------
  */

  const gallery = getGallery(article);

  const optimizedGallery =
    getOptimizedGallery(gallery);

  const primaryImage =
    getOptimizedPrimaryImage(article);

  /*
  |--------------------------------------------------------------------------
  | VIEW TRACKING
  |--------------------------------------------------------------------------
  */

  try {
    await prisma.article.update({
      where: {
        id: article.id,
      },

      data: {
        views: {
          increment: 1,
        },

        lastViewAt: new Date(),

        trendingScore: {
          increment: 1,
        },
      },
    });
  } catch (error) {
    console.error(
      "EDITORIAL VIEW UPDATE ERROR:",
      error
    );
  }

  /*
  |--------------------------------------------------------------------------
  | MOST READ NEWS ARTICLES
  |--------------------------------------------------------------------------
  */

  const mostRead =
    await prisma.article.findMany({
      where: {
        status: "approved",

        isDeleted: false,

        isEditorial: false,

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
  | RELATED EDITORIALS
  |--------------------------------------------------------------------------
  */

  const related =
    await prisma.article.findMany({
      where: {
        status: "approved",

        isDeleted: false,

        isEditorial: true,

        ...isPublishedFilter(),

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
  | NEXT EDITORIAL
  |--------------------------------------------------------------------------
  */

  const nextEditorial =
    await prisma.article.findFirst({
      where: {
        status: "approved",

        isDeleted: false,

        isEditorial: true,

        ...isPublishedFilter(),

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
    cleanText(article.content || "")
      .split(" ")
      .filter(Boolean)
      .length;

  const readingTime = Math.max(
    1,
    Math.ceil(wordCount / 200)
  );

  /*
  |--------------------------------------------------------------------------
  | EDITORIAL URL
  |--------------------------------------------------------------------------
  */

  const editorialUrl =
    `${SITE_URL}/editorial/${article.slug}`;

  /*
  |--------------------------------------------------------------------------
  | KEYWORDS
  |--------------------------------------------------------------------------
  */

  const keywords = [
    "NationPath Insight",
    "Editorial",
    "Analysis",
    "Opinion",
    article.title,
    article.excerpt || "",
    "Nation Path India",
  ];

  /*
  |--------------------------------------------------------------------------
  | EDITORIAL ARTICLE SCHEMA
  |--------------------------------------------------------------------------
  */

  const editorialSchema = {
    "@context": "https://schema.org",

    "@type": "Article",

    "@id": editorialUrl,

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

    articleSection: "NationPath Insight",

    inLanguage: "en-IN",

    wordCount,

    timeRequired:
      `PT${readingTime}M`,

    mainEntityOfPage: {
      "@type": "WebPage",

      "@id": editorialUrl,
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

        name: "NationPath Insight",

        item: `${SITE_URL}/editorial`,
      },

      {
        "@type": "ListItem",

        position: 3,

        name: article.title,

        item: editorialUrl,
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
          "@context": "https://schema.org",

          "@type": "FAQPage",

          mainEntity:
            article.faqItems
              .filter(
                (item: any) =>
                  item.question &&
                  item.answer
              )
              .map((item: any) => ({
                "@type": "Question",

                name: item.question,

                acceptedAnswer: {
                  "@type": "Answer",

                  text: item.answer.replace(
                    /<[^>]+>/g,
                    ""
                  ),
                },
              })),
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
            JSON.stringify(
              editorialSchema
            ),
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
          {/* ================= READING PROGRESS ================= */}

          <ArticleReadingProgress />

          {/* ================= ANALYTICS ================= */}

         <ArticleAnalyticsTracker
  type="editorial"
  articleId={article.id}
  articleUrl={`/${article.category.slug}/${article.slug}`}
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
              href="/editorial"
              className="
                transition
                hover:text-[#163C80]
              "
            >
              NationPath Insight
            </Link>

            <span className="mx-2">
              /
            </span>

            <span>
              {article.title}
            </span>
          </nav>

          {/* ================= EDITORIAL HEADER ================= */}

          <EditorialHeader
            article={article}
            readingTime={readingTime}
          />

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

          {/* ================= EDITORIAL HERO ================= */}

          <ArticleHero
            imageGallery={optimizedGallery}
            images={article.images}
            title={article.title}
            shareUrl={editorialUrl}
            articleId={article.id}
          />

          {/* ================= AI SUMMARY ================= */}

          {article.aiSummary && (
            <ArticleAISummary
              categoryName="NationPath Insight"
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
            content={article.content}
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

          {/* ================= NEXT EDITORIAL ================= */}

          <ArticleNextStory
            article={nextEditorial}
          />

          {/* ================= ASTRO CROSS PRODUCT ================= */}

          <ArticleAstroBanner
            categoryName={
              article.category?.name ||
              "NationPath Insight"
            }
            categorySlug={
              article.category?.slug ||
              "editorial"
            }
          />

          {/* ================= RELATED EDITORIALS ================= */}

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