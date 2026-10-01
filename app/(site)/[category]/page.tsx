import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AdRenderer from "@/components/ads/AdRendererClient";

import CategoryHeader from "@/components/category/CategoryHeader";
import CategoryHero from "@/components/category/CategoryHero";
import CategoryLatest from "@/components/category/CategoryLatest";
import CategorySidebar from "@/components/category/CategorySidebar";
import ArticleAnalyticsTracker from "@/components/analytics/ArticleAnalyticsTracker";

/* =====================================================
   PAGE CONFIGURATION (Fast ISR for Fresh Content)
===================================================== */
export const revalidate = 120; // 2 Minutes cache

interface Props {
  params: Promise<{
    category: string;
  }>;
}

/* =====================================================
   SITE URL
===================================================== */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nationpathindia.com";

/* =====================================================
   CACHED CATEGORY FETCH (Deduplicates Query)
===================================================== */
const getCategory = cache(async (slug: string) => {
  try {
    return await prisma.category.findUnique({
      where: {
        slug,
      },
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
});

/* =====================================================
   SEO METADATA
===================================================== */
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return {
      title: "Category Not Found | Nation Path India",
    };
  }

  const url = `${SITE_URL}/${category.slug}`;

  return {
    title: `${category.name} News, Latest Updates & Analysis | Nation Path India`,

    description: `Get the latest ${category.name} news, breaking updates, expert analysis, and important national coverage from Nation Path India.`,

    alternates: {
      canonical: url,
    },

    robots: {
      index: true,
      follow: true,
    },

    keywords: [
      `${category.name} news India`,
      `latest ${category.name} updates`,
      `breaking ${category.name} news`,
      `${category.name} analysis`,
      `${category.name} stories India`,
      "Nation Path India",
      "independent journalism India",
      "trusted news platform",
    ],

    openGraph: {
      title: `${category.name} News | Nation Path India`,
      description: `Latest ${category.name} news, breaking stories, and expert opinion pieces on Nation Path India.`,
      url,
      siteName: "Nation Path India",
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: `${SITE_URL}/logo.png`,
          width: 1200,
          height: 630,
          alt: `${category.name} News | Nation Path India`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${category.name} News | Nation Path India`,
      description: `Latest ${category.name} news and breaking stories from Nation Path India.`,
      images: [`${SITE_URL}/logo.png`],
    },
  };
}

/* =====================================================
   CATEGORY PAGE COMPONENT
===================================================== */
export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  let articles: any[] = [];
  let mostRead: any[] = [];

  /* =====================================================
     DATABASE FETCH WITH SAFETY FALLBACKS
  ===================================================== */
  try {
    const [articlesData, mostReadData] = await Promise.all([
      prisma.article.findMany({
        where: {
          categoryId: category.id,
          status: "approved",
          isDeleted: false,
          isAstrology: false,
          OR: [
            { publishedAt: null },
            { publishedAt: { lte: new Date() } },
          ],
        },
        include: {
          category: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 40,
      }),

      prisma.article.findMany({
        where: {
          status: "approved",
          isDeleted: false,
          OR: [
            { publishedAt: null },
            { publishedAt: { lte: new Date() } },
          ],
        },
        include: {
          category: true,
        },
        orderBy: {
          views: "desc",
        },
        take: 5,
      }),
    ]);

    articles = articlesData || [];
    mostRead = mostReadData || [];
  } catch (error) {
    console.error("Category Page Database Error:", error);
  }

  const categoryUrl = `${SITE_URL}/${category.slug}`;

  /* =====================================================
     ITEM LIST SCHEMA
  ===================================================== */
  const itemList = articles.slice(0, 10).map((article: any, index: number) => ({
    "@type": "ListItem",
    position: index + 1,
    name: article.title,
    url: `${SITE_URL}/${article.category?.slug || category.slug}/${article.slug}`,
  }));

  /* =====================================================
     STRUCTURED DATA SCHEMA
  ===================================================== */
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": categoryUrl,
        url: categoryUrl,
        name: `${category.name} News`,
        description: `Latest ${category.name} news, breaking updates, analysis and stories from Nation Path India.`,
        isPartOf: {
          "@type": "WebSite",
          name: "Nation Path India",
          url: SITE_URL,
        },
        publisher: {
          "@type": "NewsMediaOrganization",
          name: "Nation Path India",
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/logo.png`,
          },
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: itemList,
        },
      },
      {
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
            item: categoryUrl,
          },
        ],
      },
    ],
  };

  /* =====================================================
     ARTICLE SLICING
  ===================================================== */
  const heroArticles = articles.slice(0, 4);
  const latestArticles = articles.slice(4);

  return (
    <>
      {/* ANALYTICS TRACKER */}
      <ArticleAnalyticsTracker
        type="category"
        categoryId={category.id}
        categoryUrl={`/${category.slug}`}
      />

      {/* STRUCTURED DATA SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* CATEGORY HEADER */}
        <CategoryHeader
          name={category.name}
          description={`Latest ${category.name} news, breaking developments, expert analysis and in-depth coverage from Nation Path India.`}
        />

        {/* TOP AD SLOT */}
        <div className="flex justify-center mb-10">
          <AdRenderer placement="category_top" />
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* MAIN CONTENT */}
          <section className="lg:col-span-8 space-y-10">
            {heroArticles.length > 0 ? (
              <CategoryHero articles={heroArticles} />
            ) : (
              <div className="p-8 text-center bg-gray-50 border rounded-lg text-gray-500">
                No recent stories available in {category.name} right now.
              </div>
            )}

            {latestArticles.length > 0 && (
              <CategoryLatest articles={latestArticles} />
            )}
          </section>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4">
            <CategorySidebar
              mostRead={mostRead}
              categoryName={category.name}
            />
          </aside>
        </div>

        {/* BOTTOM AD SLOT */}
        <div className="flex justify-center mt-16">
          <AdRenderer placement="category_bottom" />
        </div>
      </main>
    </>
  );
}