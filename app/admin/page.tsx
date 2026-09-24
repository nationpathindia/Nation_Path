"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import StatsGrid from "@/components/admin/dashboard/StatsGrid";
import TrafficChart from "@/components/admin/dashboard/TrafficChart";
import PublishingTrend from "@/components/admin/dashboard/PublishingTrend";
import CategoryPerformance from "@/components/admin/dashboard/CategoryPerformance";
import NewsroomPanel from "@/components/admin/dashboard/NewsroomPanel";
import PollOverview from "@/components/admin/dashboard/PollOverview";
import AstroStatus from "@/components/admin/dashboard/AstroStatus";
import ActivityFeed from "@/components/admin/dashboard/ActivityFeed";
import SystemHealth from "@/components/admin/dashboard/SystemHealth";
import AdsOverview from "@/components/admin/dashboard/AdsOverview";

interface DashboardData {
  stats: any;
  latest: any[];
  top: any[];
  trending: any[];
  viral: any[];
  activity: any[];
  charts: {
  dailyViews: any[];
  dailyViews90: any[];
  lifetimeViews: any[];
  publishingTrend: any[];
  publishingTrend7: any[];
  publishingDaily: any[];
  publishingLifetime: any[];
  categoryPerformance: any[];
};
  poll?: any;
  astro?: any;
  system?: any;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((error) => {
        console.error("Admin dashboard load failed:", error);
      });
  }, []);

  if (!data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="admin-card px-8 py-10 text-center">
          <div
            className="
              mx-auto
              mb-4
              w-10
              h-10
              rounded-full
              border-4
              border-[var(--admin-primary-soft)]
              border-t-[var(--admin-primary)]
              animate-spin
            "
          />

          <p className="text-sm font-semibold text-[var(--admin-text)]">
            Loading CMS Intelligence Center
          </p>

          <p className="text-xs text-[var(--admin-text-muted)] mt-1">
            Preparing newsroom intelligence...
          </p>
        </div>
      </div>
    );
  }

  const ads = {
    activeAds: data.stats?.activeAds || 0,
    adViews: data.stats?.adViews || 0,
    adClicks: data.stats?.adClicks || 0,
  };

  return (
    <div className="space-y-7 md:space-y-8">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}
      <section
        className="
          flex
          flex-col
          xl:flex-row
          xl:items-center
          xl:justify-between
          gap-5
        "
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="
                inline-flex
                items-center
                px-2.5
                py-1
                rounded-full
                bg-[var(--admin-primary-soft)]
                text-[10px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-[var(--admin-primary-dark)]
              "
            >
              CMS Command Center
            </span>

            <span
              className="
                w-1.5
                h-1.5
                rounded-full
                bg-[var(--admin-success)]
                animate-pulse
              "
            />
          </div>

          <h1
            className="
              text-2xl
              sm:text-3xl
              font-bold
              tracking-tight
              text-[var(--admin-text)]
            "
          >
            NationPath Intelligence Center
          </h1>

          <p
            className="
              text-sm
              text-[var(--admin-text-secondary)]
              mt-2
              max-w-2xl
            "
          >
            Newsroom, audience, publishing and platform intelligence.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/posts/create"
            className="
              inline-flex
              items-center
              justify-center
              px-5
              py-3
              rounded-xl
              bg-[var(--admin-primary)]
              hover:bg-[var(--admin-primary-dark)]
              text-white
              text-sm
              font-semibold
              shadow-sm
              hover:shadow-md
              transition-all
            "
          >
            + Create Article
          </Link>

          <Link
            href="/admin/polls"
            className="
              inline-flex
              items-center
              justify-center
              px-5
              py-3
              rounded-xl
              bg-white
              border
              border-[var(--admin-border)]
              hover:border-[var(--admin-primary)]
              hover:bg-[var(--admin-primary-soft)]
              text-[var(--admin-text)]
              text-sm
              font-semibold
              transition-all
            "
          >
            Manage Polls
          </Link>
        </div>
      </section>


      {/* =====================================================
          CORE METRICS
      ===================================================== */}
      <section>
        <StatsGrid stats={data.stats} />
      </section>


      {/* =====================================================
          TRAFFIC + PUBLISHING
      ===================================================== */}
      <section>
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
            mb-4
          "
        >
          <div>
            <h2
              className="
                text-base
                font-bold
                text-[var(--admin-text)]
              "
            >
              Audience & Publishing
            </h2>

            <p
              className="
                text-xs
                text-[var(--admin-text-muted)]
                mt-1
              "
            >
              Traffic movement and publishing activity.
            </p>
          </div>
        </div>

        <div
          className="
            grid
            xl:grid-cols-2
            gap-5
          "
        >
       <TrafficChart
  data={data.charts.dailyViews}
  lifetimeData={data.charts.lifetimeViews}
/>

        <PublishingTrend
  data={data.charts.publishingTrend}
  dailyData={data.charts.publishingDaily}
  lifetimeData={data.charts.publishingLifetime}
/>
        </div>
      </section>


      {/* =====================================================
          CATEGORY PERFORMANCE
      ===================================================== */}
      <section>
        <CategoryPerformance
          data={data.charts.categoryPerformance}
        />
      </section>


      {/* =====================================================
          NEWSROOM + INTELLIGENCE RAIL
      ===================================================== */}
      <section>
        <div className="mb-4">
          <h2
            className="
              text-base
              font-bold
              text-[var(--admin-text)]
            "
          >
            Newsroom Intelligence
          </h2>

          <p
            className="
              text-xs
              text-[var(--admin-text-muted)]
              mt-1
            "
          >
            Latest newsroom activity and platform modules.
          </p>
        </div>

        <div
          className="
            grid
            xl:grid-cols-[minmax(0,3fr)_360px]
            gap-5
            items-start
          "
        >
          <div className="min-w-0">
            <NewsroomPanel
              latest={data.latest}
            />
          </div>

          <div className="space-y-5 min-w-0">
            <ActivityFeed
              activity={data.activity}
            />

            <PollOverview
              poll={data.poll}
              recent={data.poll?.recent || []}
            />

            <AstroStatus
              astro={data.astro}
            />

            <AdsOverview
              ads={ads}
            />
          </div>
        </div>
      </section>


      {/* =====================================================
          REVENUE INTELLIGENCE
      ===================================================== */}
      <section
        className="
          rounded-2xl
          border
          border-[var(--admin-border)]
          bg-white
          shadow-[var(--admin-shadow-sm)]
          overflow-hidden
        "
      >
        <div
          className="
            h-1
            w-full
            bg-gradient-to-r
            from-[var(--admin-primary)]
            via-[var(--admin-primary-dark)]
            to-[var(--admin-success)]
          "
        />

        <div
          className="
            px-5
            sm:px-6
            py-5
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-5
          "
        >
          <div className="flex items-start gap-4">
            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-[var(--admin-primary-soft)]
                text-[var(--admin-primary-dark)]
                flex
                items-center
                justify-center
                font-bold
                text-lg
                shrink-0
              "
            >
              ₹
            </div>

            <div>
              <h2
                className="
                  font-bold
                  text-base
                  text-[var(--admin-text)]
                "
              >
                Revenue Intelligence
              </h2>

              <p
                className="
                  text-sm
                  text-[var(--admin-text-secondary)]
                  mt-1
                "
              >
                Subscription and payment analytics.
              </p>
            </div>
          </div>

          <div
            className="
              sm:text-right
              sm:min-w-[140px]
            "
          >
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.12em]
                font-semibold
                text-[var(--admin-text-muted)]
              "
            >
              Stripe Status
            </p>

            <div
              className="
                inline-flex
                items-center
                gap-2
                mt-1.5
              "
            >
              <span
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-[var(--admin-warning)]
                "
              />

              <p
                className="
                  text-sm
                  font-semibold
                  text-[var(--admin-text)]
                "
              >
                Not Connected
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          SYSTEM HEALTH
      ===================================================== */}
      <section>
        <SystemHealth
          system={data.system}
        />
      </section>

    </div>
  );
}

