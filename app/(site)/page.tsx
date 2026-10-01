import { prisma } from "@/lib/prisma";
import { PostStatus } from "@prisma/client";
import type { Metadata } from "next";

import {
  getActiveHomepageCategories,
} from "@/config/homepageCategories";

/*
====================================================
 HOMEPAGE COMPONENTS
====================================================
*/
import FuturePlatformBanner from "@/components/home/FuturePlatformBanner";
import AdRenderer from "@/components/ads/AdRendererClient";
import LeadStory from "@/components/home/LeadStory";
import BreakingSpotlight from "@/components/home/BreakingSpotlight";
import FeaturedGrid from "@/components/home/FeaturedGrid";
import CategoryBlock from "@/components/home/CategoryBlock";
import PollOfDay from "@/components/home/PollOfDay";
import LatestNews from "@/components/home/LatestNews";
import EditorialSection from "@/components/home/EditorialSection";

/*
====================================================
 SIDEBAR COMPONENTS
====================================================
*/
import TrendingTopics from "@/components/sidebar/TrendingTopics";
import WeatherWidget from "@/components/sidebar/WeatherWidget";
import TrendingNews from "@/components/sidebar/TrendingNews";
import MostRead from "@/components/sidebar/MostRead";
import TopStories from "@/components/sidebar/TopStories";

/*
====================================================
 PAGE CONFIG
====================================================
*/
export const revalidate = 60;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://nationpathindia.com";

/*
====================================================
 PUBLISHED ARTICLE FILTER
====================================================
*/
function publishedFilter() {
  const now = new Date();

  return {
    OR: [
      {
        publishedAt: {
          not: null,
          lte: now,
        },
      },
      {
        publishedAt: null,
      },
    ],
  };
}

/*
====================================================
 SEO METADATA
====================================================
*/
export const metadata: Metadata = {
  title:
    "Nation Path India | Breaking News, India Updates & Trusted Stories",

  description:
    "Nation Path India brings breaking news, India updates, politics, defence, business, technology, science, sports, and astro intelligence stories from across India.",

  metadataBase: new URL(SITE_URL),

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  keywords: [
    // Core Brand & Primary Identity
    "Nation Path India",
    "independent digital journalism India",
    "trusted news platform India",

    // High CTR & Volume News Keywords
    "breaking news India",
    "national affairs India",
    "politics news India",
    "defence news India",
    "Indian economy and business updates",
    "technology news India",
    "science and space updates India",
    "sports news India",

    // Astro Intelligence Keywords
    "Vedic astrology insights",
    "daily horoscope India",
    "planetary transits and horoscope",
    "astro intelligence predictions",

    // High E-E-A-T & Editorial Keywords
    "editorial news analysis India",
    "in-depth news explained",
    "fact verified digital journalism",
    "knowledge platform India",
  ],

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Nation Path India",

    title:
      "Nation Path India | Independent News, Astro Intelligence & Knowledge Platform",

    description:
      "Independent journalism, intelligence-based content and future digital experiences from India.",

    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: "Nation Path India",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Nation Path India | News, Astro Intelligence & Knowledge Platform",

    description:
      "Independent journalism, national affairs, astrology intelligence and knowledge experiences from India.",

    images: [`${SITE_URL}/logo.png`],
  },
};

/*
====================================================
 HOMEPAGE COMPONENT
====================================================
*/
export default async function Home() {
  let articles: any[] = [];
  let mostRead: any[] = [];
  let editorials: any[] = [];
  let liveEvent: any = null;

  /*
  ====================================================
   OPTIMIZED HOMEPAGE DATABASE FETCH
  ====================================================
  */
  try {
    const [
      articlesData,
      mostReadData,
      editorialsData,
      liveEventData,
    ] = await Promise.all([
      /*
      ==================================================
       LATEST NEWS
      ==================================================
      */
      prisma.article.findMany({
        where: {
          status: PostStatus.approved,
          isDeleted: false,
          isEditorial: false,
          isAstrology: false,
          ...publishedFilter(),
        },
        include: {
          category: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 40,
      }),

      /*
      ==================================================
       MOST READ
      ==================================================
      */
      prisma.article.findMany({
        where: {
          status: PostStatus.approved,
          isDeleted: false,
          ...publishedFilter(),
        },
        include: {
          category: true,
        },
        orderBy: {
          views: "desc",
        },
        take: 5,
      }),

      /*
      ==================================================
       EDITORIAL
      ==================================================
      */
      prisma.article.findMany({
        where: {
          status: PostStatus.approved,
          isDeleted: false,
          isEditorial: true,
          ...publishedFilter(),
        },
        include: {
          category: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 6,
      }),

      /*
      ==================================================
       LIVE CENTER — HOMEPAGE SPOTLIGHT
      ==================================================
      */
      prisma.liveEvent.findFirst({
        where: {
          status: "live",
          showInLiveCenter: true,
        },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          segment: true,
          coverImage: true,
          lastUpdateAt: true,
          updateCount: true,
          isFeatured: true,
          showOnHomepage: true,
        },
        orderBy: [
          {
            isFeatured: "desc",
          },
          {
            lastUpdateAt: "desc",
          },
          {
            startAt: "desc",
          },
        ],
      }),
    ]);

    articles = articlesData || [];
    mostRead = mostReadData || [];
    editorials = editorialsData || [];
    liveEvent = liveEventData || null;
  } catch (error) {
    console.error("Homepage Data Error:", error);
  }

  /*
  ====================================================
   HOMEPAGE DATA PREPARATION
  ====================================================
  */
  const hero = articles[0] || null;
  const topStories = articles.slice(1, 5);
  const featureGrid = articles.slice(5, 10);
  const latest = articles.slice(10, 22);

  const homepageCategories = getActiveHomepageCategories();

  const getCategoryArticles = (
    slug: string,
    limit: number = 4
  ) => {
    return articles
      .filter(
        (article: any) => article?.category?.slug === slug
      )
      .slice(0, limit);
  };

  /*
  ====================================================
   BREAKING NEWS DATA
  ====================================================
  */
  const breaking = articles
    .slice(0, 10)
    .map((article: any) => ({
      id: String(article.id),
      title: article.title,
      slug: article.slug,
      excerpt:
        article.excerpt ||
        article.content
          ?.replace(/<[^>]+>/g, "")
          .slice(0, 160) ||
        "",
      category: {
        name: article.category?.name || "News",
        slug: article.category?.slug || "",
      },
      views: article.views || 0,
    }));

  /*
  ====================================================
   SEO STRUCTURED DATA
  ====================================================
  */
  const itemList = articles
    .slice(0, 10)
    .map((article: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      name: article.title,
      url: `${SITE_URL}/${article.category?.slug || "news"}/${article.slug}`,
    }));

  const homepageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsMediaOrganization",
        name: "Nation Path India",
        url: SITE_URL,
        description:
          "Nation Path India is an independent digital newsroom delivering trusted journalism, national affairs coverage and meaningful stories from India.",
        sameAs: [
          "https://www.youtube.com/@NationPathIndia",
          "https://www.facebook.com/profile.php?id=61587529251948",
          "https://www.instagram.com/nationpathindia/",
          "https://x.com/nationpathindia",
        ],
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo.png`,
        },
      },
      {
        "@type": "WebSite",
        name: "Nation Path India",
        url: SITE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ItemList",
        name: "Latest News from Nation Path India",
        itemListElement: itemList,
      },
    ],
  };

  /*
  ====================================================
   RENDER
  ====================================================
  */
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageSchema),
        }}
      />

      <main
        id="main-content"
        className="news-container"
      >
        {/* TOP AD SLOT */}
        <div className="flex justify-center mb-8">
          <AdRenderer placement="homepage_top" />
        </div>

        {/* BRAND INTRO */}
        <section className="mb-12">
          <h1 className="font-[var(--news-heading-font)] text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-[-0.02em] text-[var(--news-text)] max-w-5xl">
            Nation Path India - Independent Journalism, News & Intelligence Platform
          </h1>

          <p className="news-body mt-4 max-w-3xl">
            Covering politics, defence, international affairs, economy, business, technology, science, sports, astrology intelligence and knowledge experiences shaping India.
          </p>
        </section>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT CONTENT AREA */}
          <div className="lg:col-span-8 space-y-14">
            {hero && <LeadStory article={hero} />}

            <BreakingSpotlight
              items={breaking}
              liveEvent={liveEvent}
            />

            {featureGrid.length > 0 && (
              <FeaturedGrid articles={featureGrid} />
            )}

            {/* DYNAMIC CATEGORY SECTIONS */}
            {homepageCategories.map((category) => {
              const categoryArticles = getCategoryArticles(
                category.slug
              );

              if (!categoryArticles.length) return null;

              return (
                <CategoryBlock
                  key={category.slug}
                  title={category.title}
                  slug={category.slug}
                  description={category.description}
                  articles={categoryArticles}
                />
              );
            })}

            {/* ENGAGEMENT MODULE */}
            <section className="mt-0">
              <PollOfDay />
            </section>

            <div className="flex justify-center py-3 sm:py-4">
              <AdRenderer placement="homepage_mid" />
            </div>

            {latest.length > 0 && (
              <LatestNews articles={latest} />
            )}

            {editorials.length > 0 && (
              <EditorialSection articles={editorials} />
            )}
          </div>

          {/* SIDEBAR AREA */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 h-fit">
            <TrendingTopics />
            <WeatherWidget />
            <TrendingNews />
            <MostRead articles={mostRead} />
            <TopStories articles={topStories} />

            <div className="flex justify-center">
              <AdRenderer placement="homepage_sidebar_top" />
            </div>
          </aside>
        </div>

        {/* FUTURE PLATFORM BANNER */}
        <section className="mt-16">
          <FuturePlatformBanner />
        </section>

        {/* BOTTOM AD SLOT */}
        <div className="flex justify-center my-4 sm:my-6">
          <AdRenderer placement="homepage_bottom" />
        </div>
      </main>
    </>
  );
}