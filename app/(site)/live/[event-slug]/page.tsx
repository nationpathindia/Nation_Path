import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import AdRenderer from "@/components/ads/AdRendererClient";
import LiveStatusBadge from "@/components/live/LiveStatusBadge";
import LiveTimeline from "@/components/live/LiveTimeline";
import LiveSegmentTabs from "@/components/live/LiveSegmentTabs";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.nationpathindia.com";

/* =========================================================
   TYPES
========================================================= */

interface Props {
  params: Promise<{
    "event-slug": string;
  }>;
}

/* =========================================================
   EVENT
   Direct Prisma lookup avoids local → production API mismatch.
========================================================= */

async function getEvent(slug: string) {
  try {
    const event =
      await prisma.liveEvent.findFirst({
        where: {
          slug,
          showInLiveCenter: true,
          status: {
            not: "archived",
          },
        },

        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          segment: true,
          coverImage: true,
          coverImageAlt: true,
          status: true,
          isFeatured: true,
          showOnHomepage: true,
          showInLiveCenter: true,
          enableAutomation: true,
          startAt: true,
          endAt: true,
          updateCount: true,
          lastUpdateAt: true,
          lastPublishedAt: true,
          createdAt: true,
          updatedAt: true,

          seoTitle: true,
          seoDescription: true,
          seoKeywords: true,

          articleLinks: {
            orderBy: {
              priority: "asc",
            },
            select: {
              id: true,
              priority: true,
              isFeatured: true,
              article: {
                select: {
                  id: true,
                  title: true,
                  slug: true,
                },
              },
            },
          },
        },
      });

    return event;
  } catch (error) {
    console.error(
      "Live event lookup error:",
      error
    );

    return null;
  }
}

/* =========================================================
   INITIAL UPDATES
   Only published updates are shown publicly.
========================================================= */

async function getUpdates(eventId: string) {
  try {
    return await prisma.liveUpdate.findMany({
      where: {
        eventId,
        status: "published",
      },

      select: {
        id: true,
        eventId: true,
        headline: true,
        content: true,
        type: true,
        status: true,
        verificationStatus: true,
        isBreaking: true,
        isPinned: true,
        publishedAt: true,
        sourceName: true,
        sourceUrl: true,
        sourceType: true,
        imageUrl: true,
        imageAlt: true,
        videoUrl: true,
        embedUrl: true,
        isAutomated: true,
        createdAt: true,
        updatedAt: true,

        author: {
          select: {
            id: true,
            name: true,
          },
        },

        source: {
          select: {
            id: true,
            name: true,
            type: true,
            url: true,
            trustLevel: true,
          },
        },
      },

      orderBy: [
        {
          isPinned: "desc",
        },
        {
          publishedAt: "desc",
        },
        {
          createdAt: "desc",
        },
      ],

      take: 100,
    });
  } catch (error) {
    console.error(
      "Live updates lookup error:",
      error
    );

    return [];
  }
}

/* =========================================================
   DATE FORMAT
========================================================= */

function formatDate(
  value?: string | Date | null
) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { "event-slug": slug } =
    await params;

  const event = await getEvent(slug);

  if (!event) {
    return {
      title:
        "Live Coverage | Nation Path",
    };
  }

  const url =
    `${SITE_URL}/live/${event.slug}`;

  const title =
    event.seoTitle ||
    `${event.title} | Live Updates | Nation Path`;

  const description =
    event.seoDescription ||
    event.description ||
    `Follow live updates and continuous coverage of ${event.title} on Nation Path.`;

  const keywords =
    event.seoKeywords || undefined;

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: url,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title,
      description,
      url,
      siteName: "Nation Path",
      type: "article",
      locale: "en_IN",

      images: event.coverImage
        ? [
            {
              url: event.coverImage,
              alt:
                event.coverImageAlt ||
                event.title,
            },
          ]
        : [
            {
              url:
                `${SITE_URL}/logo.png`,
              width: 1200,
              height: 630,
              alt: event.title,
            },
          ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: event.coverImage
        ? [event.coverImage]
        : [`${SITE_URL}/logo.png`],
    },
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function LiveEventPage({
  params,
}: Props) {
  const { "event-slug": slug } =
    await params;

  const event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  const updates =
    await getUpdates(event.id);

  const latestUpdate =
    updates.find(
      (update) => update.isPinned
    ) ||
    updates[0] ||
    null;

  /* =======================================================
     LIVE BLOG STRUCTURED DATA
  ======================================================= */

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LiveBlogPosting",

    headline: event.title,

    description:
      event.description ||
      `Live coverage of ${event.title}.`,

    url:
      `${SITE_URL}/live/${event.slug}`,

    datePublished:
      event.startAt ||
      event.createdAt,

    dateModified:
      event.lastUpdateAt ||
      event.updatedAt ||
      event.startAt ||
      event.createdAt,

    coverageStartTime:
      event.startAt ||
      event.createdAt,

    ...(event.endAt
      ? {
          coverageEndTime:
            event.endAt,
        }
      : {}),

    image: event.coverImage
      ? [event.coverImage]
      : [`${SITE_URL}/logo.png`],

    author: {
      "@type": "Organization",
      name: "Nation Path",
      url: SITE_URL,
    },

    publisher: {
      "@type": "Organization",
      name: "Nation Path",
      url: SITE_URL,

      logo: {
        "@type": "ImageObject",
        url:
          `${SITE_URL}/logo.png`,
      },
    },

    articleBody:
      latestUpdate?.content ||
      event.description ||
      event.title,
  };

  /* =======================================================
     BREADCRUMB
  ======================================================= */

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
        name: "Live",
        item:
          `${SITE_URL}/live`,
      },

      {
        "@type": "ListItem",
        position: 3,
        name: event.title,
        item:
          `${SITE_URL}/live/${event.slug}`,
      },
    ],
  };

  return (
    <>
      {/* ===================================================
          STRUCTURED DATA
      =================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              structuredData
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

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

        {/* =================================================
            TOP AD
        ================================================= */}

        <div className="mb-8 flex justify-center">
          <AdRenderer
            placement="category_top"
          />
        </div>

        {/* =================================================
            SEGMENTS
        ================================================= */}

        <div className="mb-8">
          <LiveSegmentTabs
            active={event.segment}
          />
        </div>

        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <nav
          className="mb-6 text-sm text-slate-500"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="hover:text-[#163C80]"
          >
            Home
          </Link>

          <span className="mx-2">
            /
          </span>

          <Link
            href="/live"
            className="hover:text-[#163C80]"
          >
            Live
          </Link>

          <span className="mx-2">
            /
          </span>

          <span className="text-slate-700">
            {event.title}
          </span>
        </nav>

        {/* =================================================
            EVENT HEADER
        ================================================= */}

        <header className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {event.coverImage && (
            <div className="relative aspect-[21/9] max-h-[460px] overflow-hidden bg-slate-100">

              <img
                src={event.coverImage}
                alt={
                  event.coverImageAlt ||
                  event.title
                }
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-8 sm:left-8">

                <LiveStatusBadge
                  status={event.status}
                />

                <h1 className="mt-4 max-w-4xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                  {event.title}
                </h1>

              </div>
            </div>
          )}

          <div className="p-5 sm:p-8">

            {!event.coverImage && (
              <>
                <LiveStatusBadge
                  status={event.status}
                />

                <h1 className="mt-4 text-3xl font-black leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
                  {event.title}
                </h1>
              </>
            )}

            {event.description && (
              <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600">
                {event.description}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-4 border-t border-slate-100 pt-5 text-sm text-slate-500">

              <span>
                Segment:{" "}
                <strong className="text-slate-800">
                  {event.segment}
                </strong>
              </span>

              <span>
                Updates:{" "}
                <strong className="text-slate-800">
                  {event.updateCount || 0}
                </strong>
              </span>

              {event.startAt && (
                <span>
                  Started:{" "}
                  <strong className="text-slate-800">
                    {formatDate(
                      event.startAt
                    )}
                  </strong>
                </span>
              )}

              {event.lastUpdateAt && (
                <span>
                  Last updated:{" "}
                  <strong className="text-slate-800">
                    {formatDate(
                      event.lastUpdateAt
                    )}
                  </strong>
                </span>
              )}

            </div>
          </div>
        </header>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">

          {/* =================================================
              TIMELINE
          ================================================= */}

          <section className="lg:col-span-8">
            <LiveTimeline
              slug={event.slug}
              initialUpdates={updates}
            />
          </section>

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="lg:col-span-4">

            <div className="space-y-6 lg:sticky lg:top-24">

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <p className="text-xs font-bold uppercase tracking-widest text-[#EA661B]">
                  About this Live
                </p>

                <h2 className="mt-2 text-xl font-black text-slate-950">
                  Continuous Coverage
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Nation Path continuously
                  updates this live timeline
                  as verified developments
                  become available.
                </p>

              </div>

              <AdRenderer
                placement="category_sidebar"
              />

              {event.articleLinks?.length >
                0 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                  <p className="text-xs font-bold uppercase tracking-widest text-[#EA661B]">
                    Related Stories
                  </p>

                  <div className="mt-4 space-y-3">

                    {event.articleLinks.map(
                      (link) =>
                        link.article && (
                          <Link
                            key={link.id}
                            href={`/editorial/${link.article.slug}`}
                            className="block text-sm font-bold leading-6 text-slate-800 hover:text-[#163C80]"
                          >
                            {
                              link.article
                                .title
                            }
                          </Link>
                        )
                    )}

                  </div>
                </div>
              )}

            </div>
          </aside>

        </div>

        {/* =================================================
            BOTTOM AD
        ================================================= */}

        <div className="mt-14 flex justify-center">
          <AdRenderer
            placement="category_bottom"
          />
        </div>

      </main>
    </>
  );
}