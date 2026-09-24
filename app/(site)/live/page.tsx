import type { Metadata } from "next";
import AdRenderer from "@/components/ads/AdRendererClient";

import LiveSegmentTabs from "@/components/live/LiveSegmentTabs";
import LiveEventGrid from "@/components/live/LiveEventGrid";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://nationpathindia.com";

export const metadata: Metadata = {
  title: "Live Center | Live News & Continuous Updates | Nation Path India",
  description:
    "Follow live news, breaking developments and continuous updates from India, World, Sports and Business on Nation Path India.",
  alternates: {
    canonical: `${SITE_URL}/live`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Live Center | Nation Path India",
    description:
      "Live news, breaking developments and continuous updates from Nation Path India.",
    url: `${SITE_URL}/live`,
    siteName: "Nation Path India",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: "Nation Path India Live Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Center | Nation Path India",
    description:
      "Live news and continuous updates from Nation Path India.",
  },
};

interface ApiResponse {
  success?: boolean;
  data?: {
    events?: any[];
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  events?: any[];
}

async function getLiveEvents(): Promise<any[]> {
  try {
    const response = await fetch(
      `${SITE_URL}/api/live/events?limit=40`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return [];
    }

    const data: ApiResponse = await response.json();

    return data.data?.events || data.events || [];
  } catch {
    return [];
  }
}

export default async function LiveCenterPage() {
  const events = await getLiveEvents();

  const featuredEvents = events.filter(
    (event) =>
      event.isFeatured &&
      event.status === "live"
  );

  const liveEvents = events.filter(
    (event) =>
      event.status === "live"
  );

  const otherEvents = events.filter(
    (event) =>
      event.status !== "live"
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Nation Path Live Center",
    description:
      "Live news, breaking developments and continuous updates from Nation Path India.",
    url: `${SITE_URL}/live`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: events
        .slice(0, 20)
        .map((event, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: event.title,
          url: `${SITE_URL}/live/${event.slug}`,
        })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

        {/* HEADER */}

        <header className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-red-600">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-600" />
                Live Center
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                Live News &amp; Continuous Updates
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
                Follow developing stories, breaking events and
                continuously updated coverage from India, World,
                Sports and Business.
              </p>
            </div>

            <div className="shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Active Coverage
              </div>

              <div className="mt-1 text-2xl font-black text-slate-900">
                {liveEvents.length}
              </div>
            </div>
          </div>
        </header>

        {/* TOP AD */}

        <div className="mb-8 flex justify-center">
          <AdRenderer placement="category_top" />
        </div>

        {/* SEGMENTS */}

        <section className="mb-8">
          <LiveSegmentTabs active="live" />
        </section>

        {/* FEATURED */}

        {featuredEvents.length > 0 && (
          <section className="mb-10">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#EA661B]">
                  Featured Coverage
                </p>

                <h2 className="mt-1 text-2xl font-black text-slate-950">
                  Live Now
                </h2>
              </div>
            </div>

            <LiveEventGrid events={featuredEvents} />
          </section>
        )}

        {/* ALL LIVE */}

        <section className="mb-10">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-widest text-red-600">
              🔴 Live
            </p>

            <h2 className="mt-1 text-2xl font-black text-slate-950">
              Latest Live Coverage
            </h2>
          </div>

          <LiveEventGrid
            events={liveEvents}
          />
        </section>

        {/* SCHEDULED / OTHER */}

        {otherEvents.length > 0 && (
          <section>
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                More Coverage
              </p>

              <h2 className="mt-1 text-2xl font-black text-slate-950">
                Upcoming &amp; Ongoing Events
              </h2>
            </div>

            <LiveEventGrid
              events={otherEvents}
            />
          </section>
        )}

        {/* BOTTOM AD */}

        <div className="mt-14 flex justify-center">
          <AdRenderer placement="category_bottom" />
        </div>
      </main>
    </>
  );
}