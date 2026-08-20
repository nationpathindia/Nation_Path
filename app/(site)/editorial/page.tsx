import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

import AdRenderer from "@/components/ads/AdRendererClient";

import EditorialLandingHeader from "@/components/editorial/EditorialLandingHeader";
import EditorialHero from "@/components/editorial/EditorialHero";
import EditorialLatest from "@/components/editorial/EditorialLatest";
import EditorialSidebar from "@/components/editorial/EditorialSidebar";

export const dynamic = "force-dynamic";

export const revalidate = 0;

/* =====================================================
   SITE URL
===================================================== */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://nationpathindia.com";

/* =====================================================
   PUBLISHED FILTER
===================================================== */

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

/* =====================================================
   SEO METADATA
===================================================== */

export const metadata: Metadata = {
  title:
    "NationPath Insight | Analysis, Context & Perspectives",

  description:
    "Deep analysis, context and perspectives behind the stories shaping India and the world from NationPath Insight.",

  keywords: [
    "NationPath Insight",
    "Editorial",
    "Editorial News",
    "India Analysis",
    "Political Analysis",
    "News Analysis",
    "Opinion",
    "In Depth Analysis",
    "Nation Path India",
  ],

  alternates: {
    canonical: `${SITE_URL}/editorial`,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",

    title:
      "NationPath Insight | Analysis, Context & Perspectives",

    description:
      "Deep analysis, context and perspectives behind the stories shaping India and the world.",

    url: `${SITE_URL}/editorial`,

    siteName: "Nation Path India",

    locale: "en_IN",

    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: "NationPath Insight",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "NationPath Insight | Analysis, Context & Perspectives",

    description:
      "Deep analysis, context and perspectives behind the stories shaping India and the world.",

    images: [`${SITE_URL}/logo.png`],
  },
};

/* =====================================================
   PAGE
===================================================== */

export default async function EditorialLandingPage() {
  /* =====================================================
     EDITORIAL ARTICLES
  ===================================================== */

  const articles =
    await prisma.article.findMany({
      where: {
        status: "approved",

        isDeleted: false,

        isEditorial: true,

        isAstrology: false,

        ...isPublishedFilter(),
      },

      include: {
        category: true,
      },

      orderBy: [
        {
          publishedAt: "desc",
        },
        {
          createdAt: "desc",
        },
      ],

      take: 40,
    });

  /* =====================================================
     MOST READ EDITORIALS
  ===================================================== */

  const mostRead =
    await prisma.article.findMany({
      where: {
        status: "approved",

        isDeleted: false,

        isEditorial: true,

        isAstrology: false,

        ...isPublishedFilter(),
      },

      include: {
        category: true,
      },

      orderBy: [
        {
          views: "desc",
        },
        {
          trendingScore: "desc",
        },
        {
          createdAt: "desc",
        },
      ],

      take: 5,
    });

  /* =====================================================
     ARTICLE GROUPS
  ===================================================== */

  const heroArticles =
    articles.slice(0, 4);

  const latestArticles =
    articles.slice(4);

  /* =====================================================
     EDITORIAL URL
  ===================================================== */

  const editorialUrl =
    `${SITE_URL}/editorial`;

  /* =====================================================
     ITEM LIST
  ===================================================== */

  const itemList =
    articles
      .slice(0, 10)
      .map(
        (
          article: any,
          index: number
        ) => ({
          "@type": "ListItem",

          position: index + 1,

          name: article.title,

          url:
            `${SITE_URL}/editorial/${article.slug}`,
        })
      );

  /* =====================================================
     COLLECTION PAGE SCHEMA
  ===================================================== */

  const structuredData = {
    "@context": "https://schema.org",

    "@type": "CollectionPage",

    "@id": `${editorialUrl}#collection`,

    name: "NationPath Insight",

    headline:
      "NationPath Insight | Analysis, Context & Perspectives",

    description:
      "Deep analysis, context and perspectives behind the stories shaping India and the world.",

    url: editorialUrl,

    inLanguage: "en-IN",

    isPartOf: {
      "@type": "WebSite",

      "@id": `${SITE_URL}#website`,

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

    mainEntity: {
      "@type": "ItemList",

      itemListOrder:
        "https://schema.org/ItemListOrderDescending",

      numberOfItems:
        itemList.length,

      itemListElement:
        itemList,
    },
  };

  /* =====================================================
     BREADCRUMB SCHEMA
  ===================================================== */

  const breadcrumbSchema = {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    "@id":
      `${editorialUrl}#breadcrumb`,

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

        item: editorialUrl,
      },
    ],
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <>
      {/* =================================================
          COLLECTION PAGE SCHEMA
      ================================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              structuredData
            ),
        }}
      />

      {/* =================================================
          BREADCRUMB SCHEMA
      ================================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              breadcrumbSchema
            ),
        }}
      />

      {/* =================================================
          EDITORIAL LANDING PAGE
      ================================================= */}

      <main
        className="
          mx-auto
          max-w-7xl
          px-4
          py-10
          sm:px-6
          lg:px-8
        "
      >
        {/* =================================================
            EDITORIAL HEADER
        ================================================= */}

        <EditorialLandingHeader />

        {/* =================================================
            TOP AD
        ================================================= */}

        <div
          className="
            mb-10
            flex
            justify-center
          "
        >
          <AdRenderer
            placement="category_top"
          />
        </div>

        {/* =================================================
            CONTENT GRID
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-10
            lg:grid-cols-12
          "
        >
          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <section
            className="
              space-y-10
              lg:col-span-8
            "
          >
            {/* =================================================
                FEATURED EDITORIALS
            ================================================= */}

            {heroArticles.length > 0 && (
              <EditorialHero
                articles={
                  heroArticles
                }
              />
            )}

            {/* =================================================
                LATEST EDITORIALS
            ================================================= */}

            {latestArticles.length > 0 && (
              <EditorialLatest
                articles={
                  latestArticles
                }
              />
            )}

            {/* =================================================
                EMPTY STATE
            ================================================= */}

            {articles.length === 0 && (
              <div
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-6
                  py-12
                  text-center
                "
              >
                <h2
                  className="
                    text-xl
                    font-semibold
                    text-gray-900
                  "
                >
                  No editorial stories yet
                </h2>

                <p
                  className="
                    mt-2
                    text-sm
                    text-gray-500
                  "
                >
                  New NationPath Insight
                  stories will appear here.
                </p>
              </div>
            )}
          </section>

          {/* =================================================
              MOST READ SIDEBAR
          ================================================= */}

          <aside
            className="
              lg:col-span-4
            "
          >
            <EditorialSidebar
              mostRead={
                mostRead
              }
            />
          </aside>
        </div>

        {/* =================================================
            BOTTOM AD
        ================================================= */}

        <div
          className="
            mt-16
            flex
            justify-center
          "
        >
          <AdRenderer
            placement="category_bottom"
          />
        </div>
      </main>
    </>
  );
}